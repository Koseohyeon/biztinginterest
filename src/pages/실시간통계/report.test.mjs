import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import { createServer } from 'vite';

const server = await createServer({
  configLoader: 'runner',
  server: { middlewareMode: true, watch: null, ws: false },
});
after(() => server.close());

const {
  COLLECTING_LABEL, DEMO_CODE, createPreviewReport, formatCount, formatRate, getDays,
  getDemographics, getResidence, getTopDemographicReaction, parseReport, ratio, validatePreviewCode,
} = await server.ssrLoadModule('/src/pages/실시간통계/reportData.ts');

const campaign = {
  campaignName: ' 테스트 캠페인 ',
  sendDate: '2026-11-22',
  sendType: '통합유형',
  updatedAt: '2026-11-24T04:30:00+09:00',
};

test('rejects malformed campaign metadata', () => {
  for (const input of [
    null,
    { ...campaign, campaignName: ' ' },
    { ...campaign, sendDate: '2026-02-30' },
    { ...campaign, sendType: '' },
    { ...campaign, updatedAt: 'invalid' },
  ]) {
    assert.throws(() => parseReport(input), /리포트 기본 정보/);
  }
});

test('falls back to complete segment totals and preserves explicit summary zeroes', () => {
  const list = [
    { age: '20대', totSuccessCnt: '4', totReactCnt: '1' },
    { age: '30대', totSuccessCnt: 6, totReactCnt: 2 },
  ];
  const fromSegments = parseReport({ ...campaign, list, summary: { readCount: -1 } });
  assert.equal(fromSegments.name, '테스트 캠페인');
  assert.deepEqual([fromSegments.delivered, fromSegments.readCount, fromSegments.reactionCount], [10, null, 3]);

  const summary = parseReport({ ...campaign, list, summary: { deliveredCount: 0, readCount: 0, reactionCount: 0 } });
  assert.deepEqual([summary.delivered, summary.readCount, summary.reactionCount], [0, 0, 0]);

  const incomplete = parseReport({ ...campaign, list: [...list, { age: '40대', totSuccessCnt: ' ' }] });
  assert.deepEqual([incomplete.delivered, incomplete.readCount, incomplete.reactionCount], [null, null, null]);
});

test('formats missing values separately from zero and avoids dividing by zero', () => {
  assert.equal(formatCount(null), COLLECTING_LABEL);
  assert.equal(formatRate(null), COLLECTING_LABEL);
  assert.equal(formatCount(0), '0');
  assert.equal(formatRate(ratio(0, 10)), '0.0%');
  assert.equal(ratio(0, 0), null);
  assert.equal(ratio(null, 10), null);
});

test('first daily result releases at 04:30 KST, preserving partial data and zero', () => {
  const daily = [{ date: campaign.sendDate, readCount: '0', reactionCount: '1.5' }];
  const at = (updatedAt) => getDays(parseReport({ ...campaign, daily, updatedAt }));
  const [before] = at('2026-11-23T04:29:59+09:00');
  const [released, next] = at('2026-11-22T19:30:00Z');
  assert.deepEqual(before, {
    date: '2026-11-22', aggregationDate: '2026-11-23',
    dailyRead: null, dailyReaction: null, hasDailyData: false,
  });
  assert.deepEqual(released, { ...before, dailyRead: 0, hasDailyData: true });
  assert.equal(next.hasDailyData, false);
});

test('keeps seven days and ignores invalid, future, and out-of-period rows', () => {
  const dated = (date, readCount) => ({ date, readCount });
  const report = parseReport({ ...campaign, daily: [
    dated('2026-11-21', 2), dated('2026-02-30', 3),
    dated('2026-11-24', 5), dated('2026-11-22', 6),
    dated('2026-11-25', 8), dated('2026-11-29', 9), dated('2026-11-22', 0),
  ] });
  assert.deepEqual(report.daily.map(({ date, readCount }) => [date, readCount]), [
    ['2026-11-22', 0], ['2026-11-24', 5],
  ]);
  const days = getDays(report);
  assert.equal(days.length, 7);
  assert.equal(days.at(-1).date, '2026-11-28');
  assert.equal(days.at(-1).aggregationDate, '2026-11-29');
  assert.equal(days[2].hasDailyData, false);

  const late = parseReport({ ...campaign, updatedAt: '2026-11-30T04:30:00+09:00',
    daily: [dated('2026-11-28', 7), dated('2026-11-29', 9)] });
  assert.deepEqual(late.daily.map(({ date }) => date), ['2026-11-28']);
});

test('demographics include only measured age groups and group unknown sex separately', () => {
  const { segments } = parseReport({ ...campaign, list: [
    { age: ' 30대 ', sexCd: 2, totSuccessCnt: 2 },
    { age: '~10대', sexCd: '1', totSuccessCnt: '1' },
    { age: '30대', sexCd: '', totSuccessCnt: 1 },
    { age: '40대', sexCd: 2, totSuccessCnt: 0 },
    { age: '60대~', totSuccessCnt: 'invalid' },
  ] });
  assert.deepEqual(getDemographics(segments), {
    ageShares: [{ label: '~10대', share: 25 }, { label: '30대', share: 75 }],
    sexShares: [{ label: '남성', share: 25 }, { label: '여성', share: 50 }, { label: '미분류', share: 25 }],
  });
  assert.deepEqual(getDemographics([]), { ageShares: [], sexShares: [] });
});

test('reaction insight ranks complete age and sex groups by their weighted rate, including ties', () => {
  const { segments } = parseReport({ ...campaign, list: [
    { age: '40대', sexCd: 1, totSuccessCnt: 10, totReactCnt: 10 },
    { age: '40대', sexCd: '1', totSuccessCnt: 40, totReactCnt: 0 },
    { age: '30대', sexCd: 2, totSuccessCnt: 50, totReactCnt: 10 },
    { age: '50대', sexCd: 2, totSuccessCnt: 1000, totReactCnt: 100 },
    { age: '20대', sexCd: 1, totSuccessCnt: 10, totReactCnt: 10 },
    { age: '20대', sexCd: 1, totSuccessCnt: 100 },
    { age: '60대~', sexCd: '', totSuccessCnt: 2, totReactCnt: 2 },
  ] });
  assert.deepEqual(getTopDemographicReaction(segments), { rate: 20, groups: ['40대 남성', '30대 여성'] });
});

test('reaction insight distinguishes unavailable rates from measured zero', () => {
  const { segments } = parseReport({ ...campaign, list: [
    { age: '20대', sexCd: 1, totSuccessCnt: 10 },
    { age: '30대', sexCd: 2, totSuccessCnt: 0, totReactCnt: 0 },
    { age: '40대', sexCd: 2, totSuccessCnt: 10, totReactCnt: 0 },
  ] });
  assert.equal(getTopDemographicReaction([]), null);
  assert.equal(getTopDemographicReaction(segments.slice(0, 2)), null);
  assert.deepEqual(getTopDemographicReaction(segments), { rate: 0, groups: ['40대 여성'] });
});

test('regional aliases merge with weighted rate and missing denominators do not display a ratio', () => {
  const { areas } = parseReport({ ...campaign, areaStats: { list: [
    { area: '서울특별시', totSuccessCnt: 10, totReactCnt: 2 },
    { area: ' 서울 ', totSuccessCnt: 30, totReactCnt: 3 },
    { area: '제주특별자치도', totSuccessCnt: 10, totReactRatio: '0.0' },
    { area: '부산광역시', totSuccessCnt: 0, totReactRatio: 20 },
  ] } });
  assert.deepEqual(getResidence(areas), [
    { area: '서울', reactionRate: 12.5, share: 80 },
    { area: '제주', reactionRate: 0, share: 20 },
    { area: '부산', reactionRate: null, share: 0 },
  ]);
  assert.equal(getResidence([...areas, { area: '광주', delivered: null, reactions: null, reactionRate: null }])[0].share, null);
});

test('preview code handles incomplete and incorrect entries and accepts retries', () => {
  for (const value of ['', '123', '12a456', '1234567']) {
    assert.match(validatePreviewCode(value), /숫자 6자리/);
  }
  for (let attempt = 0; attempt < 6; attempt += 1) {
    assert.match(validatePreviewCode('000000'), /인증번호가 맞지 않아요/);
  }
  assert.equal(validatePreviewCode(DEMO_CODE), '');
});

test('preview loads the sample audience and shows collected and pending dates together', () => {
  const report = createPreviewReport(new Date('2026-11-24T09:00:00+09:00'));
  const days = getDays(report);
  assert.equal(report.sentOn, '2026-11-22');
  assert.equal(days.filter((day) => day.hasDailyData).length, 2);
  assert.equal(days.length, 7);
  assert.ok(report.delivered > 0 && report.segments.length > 0 && report.areas.length > 0);
  const insight = getTopDemographicReaction(report.segments);
  assert.deepEqual(insight.groups, ['40대 남성']);
  assert.equal(formatRate(insight.rate), '8.93%');
});

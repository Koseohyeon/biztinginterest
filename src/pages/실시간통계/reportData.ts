import demoDemographics from './demo-demographics.json';
import demoResidence from './demo-residence.json';

export const DAYS = 7;
export const COLLECTING_LABEL = '집계 중';
export const IPHONE_RCS_READ_NOTE = '통합유형의 경우 아이폰 RCS는 읽음 확인 설정이 기본적으로 꺼져 있어, 메시지를 읽어도 읽음으로 집계되지 않을 수 있어요. 표시된 읽음률은 실제와 다를 수 있습니다.';
export const DAILY_SCHEDULE_NOTE = '발송일 다음 날부터 매일 오전 4시 30분(한국시간)에 전날 성과를 집계해요.';
export const DEMO_CODE = '246810';
export const REPORT_PATH = '/real-time-statistics';
export const BIZTING_URL = 'https://www.bizting.co.kr';
export const CONTACT = 'tf@biztalk.co.kr';

type Snapshot = {
  date: string;
  readCount: number | null;
  reactionCount: number | null;
};

type ReactionStats = {
  delivered: number | null;
  reactions: number | null;
  reactionRate: number | null;
};

type Segment = Omit<ReactionStats, 'reactionRate'> & {
  age: string;
  sex: string;
};

type Area = ReactionStats & {
  area: string;
};

export type ResidenceRow = {
  area: string;
  share: number | null;
  reactionRate: number | null;
};

export type Report = {
  name: string;
  sentOn: string;
  sendType: string;
  updatedAt: string;
  delivered: number | null;
  readCount: number | null;
  reactionCount: number | null;
  daily: Snapshot[];
  segments: Segment[];
  areas: Area[];
};

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? value as Record<string, unknown> : {};
}

function count(value: unknown) {
  const number = numeric(value);
  return number !== null && Number.isSafeInteger(number) ? number : null;
}

function numeric(value: unknown) {
  if (typeof value !== 'number' && (typeof value !== 'string' || !value.trim())) return null;
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : null;
}

function isoDay(value: unknown): value is string {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)
    && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().startsWith(value);
}

export function dateAt(day: string, offset: number) {
  const date = new Date(day);
  date.setUTCDate(date.getUTCDate() + offset);
  return date.toISOString().slice(0, 10);
}

const koreaDate = new Intl.DateTimeFormat('sv-SE', {
  timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit',
});

export function koreaDay(date = new Date()) {
  return koreaDate.format(date);
}

export function dailyReleaseAt(aggregationDay: string) {
  return Date.parse(aggregationDay + 'T04:30:00+09:00');
}

export function ratio(part: number | null, total: number | null) {
  return part !== null && total !== null && total > 0 ? part / total * 100 : null;
}

const rates = new Intl.NumberFormat('ko-KR', { minimumFractionDigits: 1, maximumFractionDigits: 2 });
const counts = new Intl.NumberFormat('ko-KR');
export const formatRate = (value: number | null) => value === null ? COLLECTING_LABEL : rates.format(value) + '%';
export const formatCount = (value: number | null) => value === null ? COLLECTING_LABEL : counts.format(value);
export const formatDay = (value: string) => value.replaceAll('-', '.');
export const shortDay = (value: string) => value.slice(5).replace('-', '/');

function parseSegments(value: unknown): Segment[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((row: unknown) => {
    const { age, sexCd, totSuccessCnt, totReactCnt } = record(row);
    if (typeof age !== 'string' || !age.trim()) return [];
    return [{
      age: age.trim(),
      sex: sexCd === '1' || sexCd === 1 ? '남성' : sexCd === '2' || sexCd === 2 ? '여성' : '미분류',
      delivered: count(totSuccessCnt),
      reactions: count(totReactCnt),
    }];
  });
}

const areaNames: Record<string, string> = {
  서울특별시: '서울', 부산광역시: '부산', 대구광역시: '대구', 인천광역시: '인천',
  광주광역시: '광주', 대전광역시: '대전', 울산광역시: '울산', 세종특별자치시: '세종',
  경기도: '경기', 강원도: '강원', 강원특별자치도: '강원', 충청북도: '충북', 충청남도: '충남',
  전라북도: '전북', 전북특별자치도: '전북', 전라남도: '전남', 경상북도: '경북', 경상남도: '경남',
  제주도: '제주', 제주특별자치도: '제주',
};

function parseAreas(value: unknown): Area[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((row: unknown) => {
    const { area, totSuccessCnt, totReactCnt, totReactRatio } = record(row);
    if (typeof area !== 'string' || !area.trim()) return [];
    const name = area.trim();
    return [{
      area: Object.hasOwn(areaNames, name) ? areaNames[name] : name,
      delivered: count(totSuccessCnt),
      reactions: count(totReactCnt),
      reactionRate: numeric(totReactRatio),
    }];
  });
}

function total<T>(items: T[], select: (item: T) => number | null) {
  if (!items.length) return null;
  let sum = 0;
  for (const item of items) {
    const value = select(item);
    if (value === null) return null;
    sum += value;
  }
  return sum;
}

export function parseReport(input: unknown): Report {
  const { campaignName, sendDate, sendType, updatedAt, summary, daily, list, areaStats } = record(input);
  if (typeof campaignName !== 'string' || !campaignName.trim() || !isoDay(sendDate)
    || typeof sendType !== 'string' || !sendType.trim()
    || typeof updatedAt !== 'string' || !Number.isFinite(Date.parse(updatedAt))) {
    throw new Error('리포트 기본 정보가 올바르지 않아요.');
  }
  const segments = parseSegments(list);
  const summaryRecord = record(summary);
  const snapshots = new Map<string, Snapshot>();
  const lastDay = dateAt(sendDate, DAYS - 1);
  const asOfDay = koreaDay(new Date(updatedAt));
  if (Array.isArray(daily)) {
    for (const row of daily) {
      const { date, readCount, reactionCount } = record(row);
      if (!isoDay(date) || date < sendDate || date > lastDay || date > asOfDay) continue;
      snapshots.set(date, { date, readCount: count(readCount), reactionCount: count(reactionCount) });
    }
  }

  return {
    name: campaignName.trim(),
    sentOn: sendDate,
    sendType: sendType.trim(),
    updatedAt,
    delivered: count(summaryRecord.deliveredCount) ?? total(segments, (row) => row.delivered),
    readCount: count(summaryRecord.readCount),
    reactionCount: count(summaryRecord.reactionCount) ?? total(segments, (row) => row.reactions),
    daily: Array.from(snapshots.values()).sort((left, right) => left.date.localeCompare(right.date)),
    segments,
    areas: parseAreas(record(areaStats).list ?? list),
  };
}

export function getDays(report: Report) {
  const snapshots = new Map(report.daily.map((snapshot) => [snapshot.date, snapshot]));
  const asOf = Date.parse(report.updatedAt);

  return Array.from({ length: DAYS }, (_, index) => {
    const date = dateAt(report.sentOn, index);
    const aggregationDate = dateAt(date, 1);
    const snapshot = asOf >= dailyReleaseAt(aggregationDate) ? snapshots.get(date) : undefined;
    const dailyRead = snapshot?.readCount ?? null;
    const dailyReaction = snapshot?.reactionCount ?? null;
    return {
      date,
      aggregationDate,
      dailyRead,
      dailyReaction,
      hasDailyData: dailyRead !== null || dailyReaction !== null,
    };
  });
}

export type ReportDays = ReturnType<typeof getDays>;

function segmentRate(rows: ReactionStats[]) {
  if (rows.length === 1) {
    const [row] = rows;
    if (row.delivered === 0) return null;
    return row.reactionRate ?? ratio(row.reactions, row.delivered);
  }
  return ratio(total(rows, (row) => row.reactions), total(rows, (row) => row.delivered));
}

export function getDemographics(segments: Segment[]) {
  const countsByAge = new Map<string, number>();
  const countsBySex = new Map<string, number>();
  let classified = 0;
  for (const { age, sex, delivered } of segments) {
    if (delivered === null || delivered === 0) continue;
    classified += delivered;
    countsByAge.set(age, (countsByAge.get(age) ?? 0) + delivered);
    countsBySex.set(sex, (countsBySex.get(sex) ?? 0) + delivered);
  }
  const ages = Array.from(countsByAge.keys(), (label) => ({
    label,
    lowerBound: label.startsWith('~') ? 0 : Number(label.match(/\d+/)?.[0] ?? Infinity),
  })).sort((left, right) => left.lowerBound - right.lowerBound || left.label.localeCompare(right.label, 'ko'));
  const sexes = ['남성', '여성', '미분류'].filter((sex) => countsBySex.has(sex));
  return {
    ageShares: ages.map(({ label }) => ({
      label,
      share: ratio(countsByAge.get(label) ?? null, classified),
    })),
    sexShares: sexes.map((sex) => ({
      label: sex,
      share: ratio(countsBySex.get(sex) ?? null, classified),
    })),
  };
}

export function getTopDemographicReaction(segments: Segment[]) {
  const cohorts = new Map<string, Segment[]>();
  for (const segment of segments) {
    if (segment.sex === '미분류' || segment.delivered === 0) continue;
    const label = segment.age + ' ' + segment.sex;
    const rows = cohorts.get(label) ?? [];
    rows.push(segment);
    cohorts.set(label, rows);
  }

  let topRate: number | null = null;
  let groups: string[] = [];
  for (const [label, rows] of cohorts) {
    const rate = ratio(total(rows, (row) => row.reactions), total(rows, (row) => row.delivered));
    if (rate === null) continue;
    if (topRate === null || rate > topRate) {
      topRate = rate;
      groups = [label];
    } else if (rate === topRate) {
      groups.push(label);
    }
  }
  return topRate === null ? null : { rate: topRate, groups };
}

export function getResidence(areas: Area[]): ResidenceRow[] {
  const grouped = new Map<string, Area[]>();
  for (const row of areas) {
    const rows = grouped.get(row.area) ?? [];
    rows.push(row);
    grouped.set(row.area, rows);
  }
  const classified = total(areas, (row) => row.delivered);
  return Array.from(grouped, ([area, rows]) => ({
    area,
    reactionRate: segmentRate(rows),
    share: ratio(total(rows, (row) => row.delivered), classified),
  }));
}

export function validatePreviewCode(code: string) {
  if (!/^\d{6}$/.test(code)) return '인증번호 숫자 6자리를 입력해 주세요.';
  return code === DEMO_CODE ? '' : '인증번호가 맞지 않아요. 미리보기 인증번호를 다시 확인해 주세요.';
}

export function createPreviewReport(now = new Date()) {
  const sendDate = dateAt(koreaDay(now), -2);
  return parseReport({
    campaignName: '11월 고객 감사 혜택 안내',
    sendType: '통합유형',
    sendDate,
    updatedAt: now.toISOString(),
    summary: { readCount: 1638, reactionCount: 154 },
    daily: [
      { date: sendDate, readCount: 730, reactionCount: 46 },
      { date: dateAt(sendDate, 1), readCount: 560, reactionCount: 65 },
      { date: dateAt(sendDate, 2), readCount: 348, reactionCount: 43 },
    ],
    list: demoDemographics.list,
    areaStats: demoResidence,
  });
}

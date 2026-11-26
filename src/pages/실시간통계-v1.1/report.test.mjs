import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import { createServer } from 'vite';

const server = await createServer({
  configLoader: 'runner',
  server: { middlewareMode: true, watch: null, ws: false },
});
after(() => server.close());

const {
  createPreviewReport, previewCampaigns, getDays, linkExpiresOn, isFinal, formatDateWithWeekday, formatUpdatedAt, readRate, refreshRemaining, uniqueRecipientMessage,
} = await server.ssrLoadModule('/src/pages/실시간통계-v1.1/reportData.ts');

test('applies the refresh limit until exactly five minutes after a successful refresh', () => {
  assert.equal(refreshRemaining(null, 1000), 0);
  assert.equal(refreshRemaining(1000, 1000), 300_000);
  assert.equal(refreshRemaining(1000, 300_999), 1);
  assert.equal(refreshRemaining(1000, 301_000), 0);
  assert.equal(refreshRemaining(1000, 301_001), 0);
  assert.equal(refreshRemaining(NaN, 301_000), 0);
  assert.equal(refreshRemaining(301_001, 301_000), 0);
});

test('formats weekdays and uses Korean time across midnight', () => {
  assert.equal(formatDateWithWeekday('2026-11-26'), '2026.11.26 (목)');
  assert.equal(formatDateWithWeekday('2026-11-26', true), '11/26 (목)');
  assert.equal(formatUpdatedAt('2026-11-25T15:01:00Z'), '11/26 (목) 00:01');
});

test('distinguishes requested messages, successful sends and unique recipients', () => {
  const report = createPreviewReport(new Date('2026-11-26T10:00:00+09:00'));
  assert.deepEqual([report.targeted, report.delivered, report.uniqueRecipients], [3200, 3023, 3023]);
  assert.equal(uniqueRecipientMessage(report), '3,023명에게 중복 없이 발송했어요.');
  assert.equal(uniqueRecipientMessage({ ...report, uniqueRecipients: 3000 }), '중복을 제외한 3,000명에게 발송했어요.');
  assert.equal(uniqueRecipientMessage({ ...report, uniqueRecipients: null }), null);
});

test('uses only the RCS delivery count for the read rate', () => {
  const report = createPreviewReport();
  assert.equal(readRate(report, 1250), 50);
  assert.equal(readRate({ ...report, rcsDelivered: null }, 1250), null);
  assert.equal(readRate({ ...report, rcsDelivered: 0 }, 0), null);
});

test('builds the campaigns of one send date for each preview state', () => {
  const now = new Date('2026-11-26T10:00:00+09:00');
  const campaigns = previewCampaigns('multi', now);
  assert.equal(campaigns.length, 3);
  assert.equal(new Set(campaigns.map((row) => row.sentOn)).size, 1);
  assert.equal(new Set(campaigns.map((row) => row.id)).size, 3);
  assert.equal(previewCampaigns('single', now).length, 1);
  assert.equal(previewCampaigns('final', now).every((row) => isFinal(row)), true);
});

test('marks the result final after the last aggregation and keeps the link for 10 days', () => {
  assert.equal(linkExpiresOn('2026-11-26'), '2026-12-06');
  assert.equal(isFinal({ sentOn: '2026-11-01', updatedAt: '2026-11-08T04:29:00+09:00' }), false);
  assert.equal(isFinal({ sentOn: '2026-11-01', updatedAt: '2026-11-08T04:30:00+09:00' }), true);
});

test('lists daily statistics from the send date', () => {
  const now = new Date('2026-11-26T10:00:00+09:00');
  for (const report of previewCampaigns('multi', now)) {
    const days = getDays(report);
    assert.equal(days.length, 7);
    assert.equal(days[0].date, report.sentOn);
    assert.deepEqual(days.map((day) => day.hasDailyData), [true, true, false, false, false, false, false]);
  }
  for (const report of previewCampaigns('final', now)) {
    assert.equal(getDays(report).at(-1).cumulativeRead, report.readCount);
  }
});

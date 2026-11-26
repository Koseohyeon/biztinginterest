import {
  createPreviewReport as basePreviewReport, DAYS, dailyReleaseAt, dateAt, formatCount, formatDay,
  koreaDay, ratio, shortDay,
} from '../실시간통계/reportData';
import type { Report as BaseReport } from '../실시간통계/reportData';

export {
  BIZTING_URL, COLLECTING_LABEL, CONTACT, DAYS, DEMO_CODE, dailyReleaseAt, dateAt,
  formatCount, formatRate, getDays, getDemographics, getResidence, getTopDemographicReaction, ratio, validatePreviewCode,
} from '../실시간통계/reportData';

export const REPORT_PATH = '/real-time-statistics-v1.1';
const REFRESH_INTERVAL_MS = 5 * 60 * 1000;
/** 링크와 인증번호는 발송일 + 10일까지 열 수 있다. */
export const LINK_VALID_DAYS = 10;
export const MAX_CODE_ATTEMPTS = 5;
export const LOCK_MINUTES = 10;
/** 지역, 연령·성별 데이터는 발송 후 96시간 동안만 수집한다. */
export const AUDIENCE_HOURS = 96;
const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
const koreaClock = new Intl.DateTimeFormat('ko-KR', {
  timeZone: 'Asia/Seoul', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
});

export type Report = BaseReport & {
  id: string;
  sendTime: string;
  targeted: number | null;
  uniqueRecipients: number | null;
};

/** 발송일부터의 예시 일간값. 마지막 날짜의 값은 현재 읽음수, 반응수와 같다. */
function withDaily(report: Report, shares: number[]): Report {
  const part = (total: number | null, share: number) => total === null ? null : Math.round(total * share);
  return {
    ...report,
    daily: shares.map((share, index) => ({
      date: dateAt(report.sentOn, index),
      readCount: part(report.readCount, share),
      reactionCount: part(report.reactionCount, share),
    })),
  };
}

const LIVE_SHARES = [0.45, 0.79, 1];
const FINAL_SHARES = [0.45, 0.79, 0.9, 0.94, 0.97, 0.99, 1];

export function createPreviewReport(now = new Date()): Report {
  return {
    ...basePreviewReport(now),
    id: '1',
    sendTime: '10:00',
    targeted: 3200,
    rcsDelivered: 2500,
    uniqueRecipients: 3023,
  };
}

/** 같은 발송일의 캠페인 묶음. 지역, 연령·성별 예시 데이터는 캠페인끼리 같다. */
export function createPreviewCampaigns(now = new Date()): Report[] {
  const first = createPreviewReport(now);
  const campaigns = [
    first,
    {
      ...first, id: '2', name: '주말 한정 쿠폰 안내', sendTime: '13:00',
      targeted: 5000, delivered: 4768, rcsDelivered: 3900, uniqueRecipients: 4768, readCount: 2184, reactionCount: 196,
    },
    {
      ...first, id: '3', name: '신규 매장 오픈 이벤트', sendTime: '17:30',
      targeted: 2000, delivered: 1911, rcsDelivered: 1540, uniqueRecipients: 1911, readCount: 702, reactionCount: 58,
    },
  ];
  return campaigns.map((report) => withDaily(report, LIVE_SHARES));
}

export type PreviewState = 'multi' | 'single' | 'final';

/** 목업에서 확인할 화면 상태별 예시 묶음 */
export function previewCampaigns(state: PreviewState, now = new Date()): Report[] {
  if (state === 'single') return [createPreviewReport(now)];
  const campaigns = createPreviewCampaigns(now);
  if (state === 'multi') return campaigns;
  const sentOn = dateAt(koreaDay(now), -(DAYS + 1));
  return campaigns.map((report) => withDaily({ ...report, sentOn }, FINAL_SHARES));
}

export function linkExpiresOn(sentOn: string) {
  return dateAt(sentOn, LINK_VALID_DAYS);
}

/** 수집 7일의 마지막 집계(8일차 04:30)가 끝났는지 여부 */
export function isFinal({ sentOn, updatedAt }: Pick<Report, 'sentOn' | 'updatedAt'>) {
  return Date.parse(updatedAt) >= dailyReleaseAt(dateAt(sentOn, DAYS));
}

export function formatDateWithWeekday(day: string, short = false) {
  const weekday = weekdays[new Date(day).getUTCDay()];
  return (short ? shortDay(day) : formatDay(day)) + ' (' + weekday + ')';
}

export function formatUpdatedAt(timestamp: string) {
  const date = new Date(timestamp);
  return formatDateWithWeekday(koreaDay(date), true) + ' ' + koreaClock.format(date);
}

export function readRate(report: Report, reads = report.readCount) {
  return ratio(reads, report.rcsDelivered);
}

export function refreshRemaining(last: number | null, now: number) {
  return last === null || !Number.isFinite(last) || last > now
    ? 0 : Math.max(0, REFRESH_INTERVAL_MS - (now - last));
}

export function uniqueRecipientMessage({ uniqueRecipients, delivered }: Pick<Report, 'uniqueRecipients' | 'delivered'>) {
  if (uniqueRecipients === null) return null;
  if (uniqueRecipients === 0) return '아직 발송에 성공한 수신자가 없어요.';
  const recipients = formatCount(uniqueRecipients) + '명';
  return uniqueRecipients === delivered
    ? recipients + '에게 중복 없이 발송했어요.'
    : '중복을 제외한 ' + recipients + '에게 발송했어요.';
}

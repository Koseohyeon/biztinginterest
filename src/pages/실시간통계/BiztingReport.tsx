import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ComponentType, FormEvent } from 'react';
import { NavLink, useMatch } from 'react-router-dom';
import {
  Activity, ArrowUpRight, BarChart3, CalendarDays, ChartNoAxesCombined, ChevronRight,
  Clock3, Eye, FileChartColumn, Info, LockKeyhole, Mail, MapPinned, MousePointerClick, RefreshCw,
} from 'lucide-react';
import logo from './bizting-logo.png';
import authArtwork from './auth-analytics-glass.webp';
import InfoTip from './InfoTip';
import { ReportLoading, ReportLoadError } from './ReportLoadState';
import type { ReportChartProps } from './ReportCharts';
import {
  BIZTING_URL, CONTACT, DAILY_SCHEDULE_NOTE, DAYS, DEMO_CODE, IPHONE_RCS_READ_NOTE, REPORT_PATH, ReportError,
  dailyReleaseAt, dateAt, formatCount, formatDay, formatRate, getDays, isDemo, koreaDay, openReport, ratio, refreshReport,
} from './reportData';
import type { Report, ReportIssue } from './reportData';
import './report.css';

const title = '비즈팅 실시간 통계리포트';
const dailyPath = REPORT_PATH + '/daily';
const residencePath = REPORT_PATH + '/residence';
const ReportCharts = lazy<ComponentType<ReportChartProps>>(() =>
  import('./ReportCharts').catch(() => ({ default: ReportLoadError })),
);
const updatedTime = new Intl.DateTimeFormat('ko-KR', {
  timeZone: 'Asia/Seoul', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false,
});
const issueMessage: Record<ReportIssue, string> = {
  incorrect: '인증번호가 맞지 않아요. 받은 메시지에서 번호를 다시 확인해 주세요.',
  expired: '인증이 만료됐어요. 최신 메시지의 인증번호로 다시 확인해 주세요.',
  limited: isDemo ? '여러 번 잘못 입력하셨어요. 30초 후 다시 시도해 주세요.' : '요청이 많아요. 잠시 후 다시 시도해 주세요.',
  unavailable: '리포트를 불러오지 못했어요. 연결 상태를 확인하고 다시 시도해 주세요.',
  invalid: '리포트 데이터를 표시할 수 없어요. 잠시 후 다시 시도해 주세요.',
  missing: '해당 리포트를 찾을 수 없어요. 받은 메시지의 링크를 다시 확인해 주세요.',
};
const getIssue = (error: unknown) => error instanceof ReportError ? error.issue : 'unavailable';

function BiztingLink() {
  return <a className="tw-report-outlink" href={BIZTING_URL} target="_blank" rel="noopener noreferrer">비즈팅 바로가기 <ArrowUpRight size={16} aria-hidden="true" /></a>;
}

function Verification({ onOpen, notice }: { onOpen: (report: Report) => void; notice: string }) {
  const [code, setCode] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const feedback = error || notice;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    if (!/^\d{6}$/.test(code)) {
      setError('인증번호 숫자 6자리를 입력해 주세요.');
      input.current?.focus();
      return;
    }
    setPending(true);
    setError('');
    try {
      onOpen(await openReport(code));
    } catch (problem) {
      setError(issueMessage[getIssue(problem)]);
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="tw-report-shell tw-report-auth">
      <div className="tw-report-auth-layout">
        <section className="tw-report-auth-intro" aria-labelledby="tw-report-auth-title">
          <div className="tw-report-auth-content">
            <h1 id="tw-report-auth-title">비즈팅 실시간 <span>통계리포트</span></h1>
            <p>발송한 캠페인의 성과를 실시간으로 확인할 수 있어요.</p>
          </div>
          <div className="tw-report-auth-visual" aria-hidden="true">
            <img src={authArtwork} alt="" width={960} height={640} />
          </div>
        </section>
        <section className="tw-report-auth-form" aria-labelledby="tw-report-form-title">
          <div className="tw-report-title-icon"><LockKeyhole size={21} aria-hidden="true" /></div>
          <h2 id="tw-report-form-title">인증번호를 입력해 주세요</h2>
          <p>발송된 알림톡 내 적힌 숫자 6자리를 입력하면 통계를 볼 수 있어요.</p>
          <form onSubmit={submit} noValidate>
            <label htmlFor="tw-report-code">인증번호</label>
            <div className="tw-report-otp">
              <input ref={input} id="tw-report-code" type="text" inputMode="numeric" autoComplete="one-time-code"
                value={code} aria-invalid={!!error} aria-required="true"
                aria-describedby={feedback ? 'tw-report-code-error' : isDemo ? 'tw-report-demo-code' : undefined}
                readOnly={pending}
                onChange={(event) => {
                  setCode(event.target.value.replace(/\D/g, '').slice(0, 6));
                  setError('');
                }} />
              <div className="tw-report-code-boxes" aria-hidden="true">
                {Array.from({ length: 6 }, (_, index) => (
                  <span key={index} data-next={index === code.length || (code.length === 6 && index === 5)}>{code[index] ? '•' : ''}</span>
                ))}
              </div>
            </div>
            {feedback && <p className="tw-report-error" id="tw-report-code-error" role="alert">{feedback}</p>}
            {isDemo && <p className="tw-report-demo-code" id="tw-report-demo-code">미리보기 인증번호 <strong>{DEMO_CODE}</strong></p>}
            <button className="tw-report-primary" type="submit" disabled={pending}>
              {pending ? '인증 확인 중…' : '인증하고 리포트 보기'} <ChevronRight size={18} aria-hidden="true" />
            </button>
          </form>
          <div className="tw-report-auth-help"><Info size={17} aria-hidden="true" /><p>비즈팅에 로그인한 뒤 <strong>[발송메시지 확인]</strong>에서도 발송일부터 7일간의 성과를 확인할 수 있어요.</p></div>
        </section>
      </div>
    </main>
  );
}

function MetricCards({ report }: { report: Report }) {
  const isIntegrated = report.sendType.includes('통합');
  const reads = ratio(report.readCount, report.delivered);
  const responses = ratio(report.reactionCount, report.delivered);
  const metrics = [
    { label: '읽음률', icon: Eye, tone: 'blue', value: formatRate(reads), meter: reads,
      hint: '발송 성공 건 중 메시지를 열어본 비율이에요.', detail: '발송 성공 건 기준', read: true },
    { label: '반응률', icon: MousePointerClick, tone: 'purple', value: formatRate(responses), meter: responses,
      hint: '발송 성공 건 중 메시지 본문의 URL이나 버튼을 클릭한 비율이에요.', detail: '발송 성공 건 기준', read: false },
    { label: '읽음수', icon: FileChartColumn, tone: 'blue', value: formatCount(report.readCount), meter: null,
      hint: '메시지를 열어본 건수예요.', detail: '현재까지 누적', read: true },
    { label: '반응수', icon: Activity, tone: 'purple', value: formatCount(report.reactionCount), meter: null,
      hint: '메시지 본문의 URL이나 버튼을 클릭해 집계된 반응 건수예요.', detail: '현재까지 누적', read: false },
  ];
  return (
    <section aria-labelledby="tw-report-summary-title">
      <div className="tw-report-overview-heading">
        <h2 id="tw-report-summary-title">실시간 데이터</h2>
        <span>발송 성공 <strong>{formatCount(report.delivered)}{report.delivered === null ? '' : '건'}</strong></span>
      </div>
      <div className="tw-report-metrics">
        {metrics.map(({ label, icon: Icon, tone, value, meter, hint, detail, read }) => (
          <article className="tw-report-card tw-report-metric" data-tone={tone} key={label}>
            <div className="tw-report-metric-heading">
              <span className="tw-report-metric-icon"><Icon size={18} aria-hidden="true" /></span>
              <h3>{label}</h3>
              <InfoTip label={label} note={read && isIntegrated ? IPHONE_RCS_READ_NOTE : undefined}>{hint}</InfoTip>
            </div>
            <div className="tw-report-metric-value">{value}{meter === null && label.endsWith('수') && value !== '—' && <small>건</small>}</div>
            {meter !== null && <div className="tw-report-meter" aria-hidden="true"><i style={{ width: Math.min(meter, 100) + '%' }} /></div>}
            <p>{value === '—' ? '집계 가능한 데이터 없음' : detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ReportNotes({ report, daily }: { report: Report; daily: boolean }) {
  return (
    <aside className="tw-report-notice" aria-labelledby="tw-report-notice-title">
      <Info size={20} aria-hidden="true" />
      <div>
        <h2 id="tw-report-notice-title">통계 확인 전 참고해 주세요</h2>
        <ul>
          <li>{daily ? DAILY_SCHEDULE_NOTE : '실시간 통계는 발송 당일부터 7일간 수집돼요.'} 최종 성과는 7일차 집계가 끝난 뒤 확인해 주세요.</li>
          {report.sendType.includes('통합') && <li>{IPHONE_RCS_READ_NOTE}</li>}
          <li>비즈팅에 로그인한 뒤 <strong>[발송메시지 확인]</strong>에서도 7일간의 통계를 볼 수 있어요.</li>
        </ul>
      </div>
    </aside>
  );
}

export default function BiztingReport() {
  const daily = !!useMatch(dailyPath);
  const residence = !!useMatch(residencePath);
  const [report, setReport] = useState<Report | null>(null);
  const [notice, setNotice] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const updateInProgress = useRef(false);
  const requestVersion = useRef(0);
  const lastDailyAttempt = useRef<{ batch: number; retryAt: number } | null>(null);
  const batchAsOf = Date.parse(report?.updatedAt ?? '');
  const lastDay = report ? dateAt(report.sentOn, DAYS - 1) : '';
  const firstDailyDay = report ? dateAt(report.sentOn, 1) : '';
  const lastDailyDay = lastDay ? dateAt(lastDay, 1) : '';
  const liveComplete = !!lastDay && koreaDay() > lastDay;

  useEffect(() => {
    const previous = document.title;
    document.title = title;
    return () => { document.title = previous; };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [daily, residence]);

  const refresh = useCallback(async () => {
    if (updateInProgress.current) return;
    updateInProgress.current = true;
    const version = requestVersion.current;
    setRefreshing(true);
    setNotice('');
    try {
      const updated = await refreshReport();
      if (version === requestVersion.current) setReport(updated);
    } catch (problem) {
      if (version !== requestVersion.current) return;
      const issue = getIssue(problem);
      if (issue === 'expired') setReport(null);
      setNotice(issueMessage[issue]);
    } finally {
      if (version === requestVersion.current) {
        updateInProgress.current = false;
        setRefreshing(false);
      }
    }
  }, []);

  const days = useMemo(() => report ? getDays(report) : [], [report]);
  const verified = !!report;
  useEffect(() => {
    if (isDemo || daily || !verified || liveComplete) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') void refresh();
    }, 60_000);
    return () => window.clearInterval(timer);
  }, [daily, liveComplete, refresh, verified]);

  useEffect(() => {
    if (!daily || !firstDailyDay || !lastDailyDay) return;
    let timer: number | undefined;

    function schedule() {
      window.clearTimeout(timer);
      const now = Date.now();
      const today = koreaDay(new Date(now));
      const todayBatch = dailyReleaseAt(today);
      const lastBatch = dailyReleaseAt(lastDailyDay);
      const released = Math.min(lastBatch, now >= todayBatch ? todayBatch : dailyReleaseAt(dateAt(today, -1)));
      const firstBatch = dailyReleaseAt(firstDailyDay);
      const nextBatch = Math.max(firstBatch, now < todayBatch ? todayBatch : dailyReleaseAt(dateAt(today, 1)));
      let wakeAt = nextBatch <= lastBatch ? nextBatch : Infinity;

      if (document.visibilityState === 'visible' && released >= firstBatch && released > batchAsOf) {
        const previous = lastDailyAttempt.current;
        const alreadyRequested = previous?.batch === released;
        const retryAt = alreadyRequested ? previous.retryAt : now;
        if (retryAt <= now) {
          lastDailyAttempt.current = { batch: released, retryAt: alreadyRequested ? Infinity : now + 60_000 };
          void refresh();
        }
        wakeAt = Math.min(wakeAt, lastDailyAttempt.current?.retryAt ?? Infinity);
      }
      if (Number.isFinite(wakeAt)) timer = window.setTimeout(schedule, Math.min(wakeAt - now, 86_400_000));
    }

    schedule();
    document.addEventListener('visibilitychange', schedule);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('visibilitychange', schedule);
    };
  }, [batchAsOf, daily, firstDailyDay, lastDailyDay, refresh]);

  function closeReport() {
    requestVersion.current += 1;
    lastDailyAttempt.current = null;
    updateInProgress.current = false;
    setRefreshing(false);
    setReport(null);
    setNotice('');
    window.scrollTo(0, 0);
  }

  const updatedLabel = report ? updatedTime.format(new Date(report.updatedAt)) : '';

  const latestDaily = daily ? days.filter((day) => day.state === 'available').at(-1) : undefined;
  const dailyUpdatedLabel = latestDaily
    ? formatDay(latestDaily.aggregationDate) + ' 04:30 기준'
    : batchAsOf < dailyReleaseAt(firstDailyDay) ? '첫 집계 예정' : '집계 데이터 대기';
  const timestampLabel = daily ? dailyUpdatedLabel : updatedLabel + ' 기준';

  return (
    <div className="tw-report tw-font-sans">
      {!report && <header className="tw-report-header">
        <div className="tw-report-shell tw-report-header-row">
          <img src={logo} alt="비즈팅" width={105} height={32} />
          <BiztingLink />
        </div>
      </header>}
      {!report ? <Verification notice={notice} onOpen={(value) => {
        lastDailyAttempt.current = null;
        setNotice('');
        setReport(value);
        window.scrollTo(0, 0);
      }} /> : (
        <div className="tw-report-dashboard">
          <aside className="tw-report-sidebar">
            <div className="tw-report-sidebar-brand">
              <img src={logo} alt="비즈팅" width={105} height={32} />
              <div className="tw-report-sidebar-mobile-link"><BiztingLink /></div>
            </div>
            <nav className="tw-report-nav" aria-label="통계 보기">
              <NavLink to={REPORT_PATH} end><Activity size={19} aria-hidden="true" /> 실시간통계</NavLink>
              <NavLink to={dailyPath} end><CalendarDays size={19} aria-hidden="true" /> 일간통계</NavLink>
              <NavLink to={residencePath} end><MapPinned size={19} aria-hidden="true" /> 지역 통계</NavLink>
            </nav>
            <div className="tw-report-sidebar-links">
              <BiztingLink />
              <a href={'mailto:' + CONTACT}><Mail size={17} aria-hidden="true" /> 리포트 문의</a>
              <button className="tw-report-close" type="button" onClick={closeReport}><LockKeyhole size={16} aria-hidden="true" /> 리포트 닫기</button>
            </div>
          </aside>
          <main className="tw-report-main">
            <section className="tw-report-hero" aria-labelledby="tw-report-main-title">
              <span className="tw-report-hero-icon"><ChartNoAxesCombined size={23} aria-hidden="true" /></span>
              <h1 id="tw-report-main-title">{title}</h1>
              <p>{daily ? '날짜별로 집계된 캠페인 성과를 확인하세요.' : residence ? '추정거주지 기준으로 지역별 성과를 확인하세요.' : '캠페인의 발송 성과를 7일 동안 살펴보세요.'}</p>
              <dl className="tw-report-campaign">
                <div><dt>발송일자</dt><dd>{formatDay(report.sentOn)}</dd></div>
                <div><dt>캠페인명</dt><dd>{report.name}</dd></div>
                <div><dt>발송유형</dt><dd>{report.sendType}</dd></div>
                <div><dt>집계 기간</dt><dd>{formatDay(daily ? firstDailyDay : report.sentOn)} ~ {formatDay(daily ? lastDailyDay : lastDay)}</dd></div>
              </dl>
            </section>
            <div className="tw-report-timestamp-row">
              {daily && <span className="tw-report-daily-schedule"><CalendarDays size={15} aria-hidden="true" /> 다음 날부터 매일 오전 4시 30분 갱신</span>}
              <div className="tw-report-updated">
                <span role="status"><Clock3 size={14} aria-hidden="true" /> {refreshing ? '갱신 중…' : timestampLabel}</span>
                <button type="button" disabled={refreshing} aria-label="통계 새로고침" onClick={() => void refresh()}><RefreshCw size={16} aria-hidden="true" /></button>
              </div>
            </div>
            {notice && <p className="tw-report-error tw-report-refresh-error" role="alert">{notice}</p>}
            {!daily && !residence && <MetricCards report={report} />}
            <Suspense fallback={<ReportLoading />}>
              <ReportCharts report={report} days={days} view={daily ? 'daily' : residence ? 'region' : 'live'} />
            </Suspense>
            <ReportNotes report={report} daily={daily} />
            <button className="tw-report-close tw-report-mobile-close" type="button" onClick={closeReport}><LockKeyhole size={16} aria-hidden="true" /> 리포트 닫기</button>
          </main>
        </div>
      )}
      <footer className="tw-report-footer">
        <div className="tw-report-shell tw-report-footer-row">
          <span><BarChart3 size={15} aria-hidden="true" /> 비즈팅 캠페인 통계</span>
          <a href={'mailto:' + CONTACT}>리포트 문의 · {CONTACT}</a>
        </div>
      </footer>
    </div>
  );
}

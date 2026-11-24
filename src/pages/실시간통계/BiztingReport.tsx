import { lazy, startTransition, Suspense, useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { NavLink, useMatch, useNavigate } from 'react-router-dom';
import {
  Activity, ArrowUpRight, BarChart3, CalendarDays, ChartNoAxesCombined, ChevronRight,
  Clock3, Eye, FileChartColumn, Info, LockKeyhole, Mail, MapPinned, MousePointerClick, RefreshCw,
} from 'lucide-react';
import logo from './bizting-logo.png';
import authArtwork from './auth-analytics-glass.webp';
import InfoTip from './InfoTip';
import { ReportLoading, ReportLoadError } from './ReportLoadState';
import {
  BIZTING_URL, COLLECTING_LABEL, CONTACT, DAYS, DEMO_CODE, IPHONE_RCS_READ_NOTE, REPORT_PATH,
  createPreviewReport, dailyReleaseAt, dateAt, formatCount, formatDay, formatRate, getDays, ratio, readRate, validatePreviewCode,
} from './reportData';
import type { Report } from './reportData';
import './report.css';

const title = '비즈팅 실시간 통계리포트';
const dailyPath = REPORT_PATH + '/daily';
const residencePath = REPORT_PATH + '/residence';
const ReportCharts = lazy(() => import('./ReportCharts').catch(() => ({ default: ReportLoadError })));
const EstimatedResidence = lazy(() => import('./EstimatedResidence').catch(() => ({ default: ReportLoadError })));
const updatedTime = new Intl.DateTimeFormat('ko-KR', {
  timeZone: 'Asia/Seoul', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false,
});

function BiztingLink() {
  return <a className="tw-report-outlink" href={BIZTING_URL} target="_blank" rel="noopener noreferrer">비즈팅 바로가기 <ArrowUpRight size={16} aria-hidden="true" /></a>;
}

function Verification({ onOpen }: { onOpen: (report: Report) => void }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const input = useRef<HTMLInputElement>(null);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = validatePreviewCode(code);
    if (message) {
      setError(message);
      input.current?.focus();
      return;
    }
    onOpen(createPreviewReport());
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
                aria-describedby={error ? 'tw-report-code-error' : 'tw-report-demo-code'}
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
            {error && <p className="tw-report-error" id="tw-report-code-error" role="alert">{error}</p>}
            <p className="tw-report-demo-code" id="tw-report-demo-code">미리보기 인증번호 <strong>{DEMO_CODE}</strong></p>
            <button className="tw-report-primary" type="submit">
              인증하고 리포트 보기 <ChevronRight size={18} aria-hidden="true" />
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
  const readBasis = report.rcsDelivered === null ? '발송 성공 건' : 'RCS 발송 성공 건';
  const reads = readRate(report);
  const responses = ratio(report.reactionCount, report.delivered);
  const metrics = [
    { label: '읽음률', icon: Eye, tone: 'blue', value: formatRate(reads), meter: reads,
      hint: readBasis + ' 중 메시지를 열어본 비율이에요.', detail: readBasis + ' 기준', read: true },
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
            <div className="tw-report-metric-value" data-collecting={value === COLLECTING_LABEL}>
              {value}{label.endsWith('수') && value !== COLLECTING_LABEL && <small>건</small>}
            </div>
            {meter !== null && <div className="tw-report-meter" aria-hidden="true"><i style={{ width: Math.min(meter, 100) + '%' }} /></div>}
            {value !== COLLECTING_LABEL && <p>{detail}</p>}
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
          <li>
            {daily ? '발송일부터 7일간의 데이터가 모두 집계되면 최종 누적 성과를 확인할 수 있어요.'
              : '실시간 통계는 발송 당일부터 7일간 수집돼요. 최종 성과는 7일차 집계가 끝난 뒤 확인해 주세요.'}
          </li>
          {report.sendType.includes('통합') && <li>{IPHONE_RCS_READ_NOTE}</li>}
          <li>비즈팅에 로그인한 뒤 <strong>[발송메시지 확인]</strong>에서도 7일간의 통계를 볼 수 있어요.</li>
        </ul>
      </div>
    </aside>
  );
}

export default function BiztingReport() {
  const navigate = useNavigate();
  const daily = !!useMatch(dailyPath);
  const residence = !!useMatch(residencePath);
  const [report, setReport] = useState<Report | null>(null);
  const batchAsOf = Date.parse(report?.updatedAt ?? '');
  const lastDay = report ? dateAt(report.sentOn, DAYS - 1) : '';
  const firstDailyDay = report ? dateAt(report.sentOn, 1) : '';
  const lastDailyDay = lastDay ? dateAt(lastDay, 1) : '';
  const firstBatch = dailyReleaseAt(firstDailyDay);

  useEffect(() => {
    const previous = document.title;
    document.title = title;
    return () => { document.title = previous; };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [daily, residence]);

  const days = daily && report ? getDays(report) : [];
  const updatedLabel = report ? updatedTime.format(new Date(report.updatedAt)) : '';

  const latestDaily = days.filter((day) => day.hasDailyData).at(-1);
  const timestampLabel = daily
    ? latestDaily ? formatDay(latestDaily.aggregationDate) + ' 04:30 기준' : COLLECTING_LABEL
    : updatedLabel + ' 기준';

  return (
    <div className="tw-report tw-font-sans">
      {!report && <header className="tw-report-header">
        <div className="tw-report-shell tw-report-header-row">
          <img src={logo} alt="비즈팅" width={105} height={32} />
          <BiztingLink />
        </div>
      </header>}
      {!report ? <Verification onOpen={(value) => {
        startTransition(() => {
          navigate(REPORT_PATH, { replace: true });
          setReport(value);
        });
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
            </div>
          </aside>
          <main className="tw-report-main">
            <section className="tw-report-hero" aria-labelledby="tw-report-main-title">
              <span className="tw-report-hero-icon"><ChartNoAxesCombined size={23} aria-hidden="true" /></span>
              <h1 id="tw-report-main-title">{title}</h1>
              <p>{daily ? '발송일부터 쌓인 읽음과 반응을 날짜별로 확인하세요.' : residence ? '추정거주지 기준으로 지역별 성과를 확인하세요.' : '캠페인의 발송 성과를 7일 동안 살펴보세요.'}</p>
              <dl className="tw-report-campaign">
                <div><dt>발송일자</dt><dd>{formatDay(report.sentOn)}</dd></div>
                <div><dt>캠페인명</dt><dd>{report.name}</dd></div>
                <div><dt>발송유형</dt><dd>{report.sendType}</dd></div>
                <div><dt>집계 기간</dt><dd>{formatDay(daily ? firstDailyDay : report.sentOn)} ~ {formatDay(daily ? lastDailyDay : lastDay)}</dd></div>
              </dl>
            </section>
            <div className="tw-report-timestamp-row">
              {!residence && (
                <p className="tw-report-schedule-note">
                  <Info size={16} aria-hidden="true" />
                  <span>{daily ? '발송일 다음 날부터 누적 성과를 확인할 수 있어요.' : '정확한 통계는 발송일 다음 날부터 집계돼요.'}</span>
                </p>
              )}
              <div className="tw-report-updated">
                <span role="status"><Clock3 size={14} aria-hidden="true" /> {timestampLabel}</span>
                <button type="button" aria-label="통계 새로고침" onClick={() => setReport({ ...report, updatedAt: new Date().toISOString() })}>
                  <RefreshCw size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
            <Suspense fallback={<ReportLoading />}>
              {daily ? <ReportCharts report={report} days={days} dailyStarted={batchAsOf >= firstBatch} />
                : residence ? <EstimatedResidence report={report} /> : <MetricCards report={report} />}
            </Suspense>
            <ReportNotes report={report} daily={daily} />
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

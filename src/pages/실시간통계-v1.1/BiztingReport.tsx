import { lazy, startTransition, Suspense, useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Navigate, NavLink, useMatch, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Activity, ArrowUpRight, BarChart3, CalendarDays, ChartNoAxesCombined, ChevronRight, Clock3, Eye, FileChartColumn,
  Info, LockKeyhole, Mail, MapPinned, MousePointerClick, RefreshCw, Send, Target, TimerOff, Users,
} from 'lucide-react';
import logo from '../실시간통계/bizting-logo.png';
import authArtwork from '../실시간통계/auth-analytics-glass.webp';
import InfoTip from '../실시간통계/InfoTip';
import CampaignPicker from './CampaignPicker';
import { ReportLoading, ReportLoadError } from '../실시간통계/ReportLoadState';
import {
  AUDIENCE_HOURS, BIZTING_URL, COLLECTING_LABEL, CONTACT, DEMO_CODE, LINK_VALID_DAYS, LOCK_MINUTES,
  MAX_CODE_ATTEMPTS, REPORT_PATH,
  dailyReleaseAt, dateAt, formatCount, formatDateWithWeekday, formatRate, formatUpdatedAt, isFinal, linkExpiresOn,
  previewCampaigns, ratio, readRate, refreshRemaining, uniqueRecipientMessage, validatePreviewCode,
} from './reportData';
import type { Report } from './reportData';
import '../실시간통계/report.css';
import './report-v11.css';

const title = '비즈팅 실시간 통계리포트';
const expiredPath = REPORT_PATH + '/expired';
const lastRefreshKey = 'bizting-report-v1.1:last-refresh';
const DailyStats = lazy(() => import('./DailyStats').catch(() => ({ default: ReportLoadError })));
const EstimatedResidence = lazy(() => import('./EstimatedResidence').catch(() => ({ default: ReportLoadError })));
const Demographics = lazy(() => import('./Demographics').catch(() => ({ default: ReportLoadError })));

function BiztingLink() {
  return <a className="tw-report-outlink" href={BIZTING_URL} target="_blank" rel="noopener noreferrer">비즈팅 바로가기 <ArrowUpRight size={16} aria-hidden="true" /></a>;
}

function Verification({ onOpen }: { onOpen: (campaigns: Report[]) => void }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [failures, setFailures] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const locked = failures >= MAX_CODE_ATTEMPTS;
  const [params] = useSearchParams();

  useEffect(() => {
    if (!locked) return;
    const timer = window.setTimeout(() => {
      setFailures(0);
      setError('');
    }, LOCK_MINUTES * 60 * 1000);
    return () => window.clearTimeout(timer);
  }, [locked]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (locked) return;
    if (code.length !== 6) {
      setError('인증번호 숫자 6자리를 입력해 주세요.');
      input.current?.focus();
      return;
    }
    if (!validatePreviewCode(code)) {
      // 다른 화면 상태는 주소 뒤에 ?preview=single 또는 ?preview=final 을 붙여 확인해요.
      const preview = params.get('preview');
      onOpen(previewCampaigns(preview === 'single' || preview === 'final' ? preview : 'multi'));
      return;
    }
    const next = failures + 1;
    setFailures(next);
    setCode('');
    setError(next >= MAX_CODE_ATTEMPTS
      ? `인증번호를 ${MAX_CODE_ATTEMPTS}회 잘못 입력했어요. ${LOCK_MINUTES}분 뒤에 다시 시도해 주세요.`
      : `인증번호가 맞지 않아요. ${MAX_CODE_ATTEMPTS - next}회 더 입력할 수 있어요.`);
    input.current?.focus();
  }

  return (
    <main className="tw-report-shell tw-report-auth">
      <div className="tw-report-auth-layout">
        <section className="tw-report-auth-intro" aria-labelledby="tw-report-auth-title">
          <div className="tw-report-auth-content">
            <h1 id="tw-report-auth-title">비즈팅 실시간 <span>통계리포트</span></h1>
            <p>하루 동안 발송한 캠페인의 성과를 한 곳에서 확인할 수 있어요.</p>
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
                value={code} disabled={locked} aria-invalid={!!error} aria-required="true"
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
            <button className="tw-report-primary" type="submit" disabled={locked}>
              인증하고 리포트 보기 <ChevronRight size={18} aria-hidden="true" />
            </button>
          </form>
          <div className="tw-report-auth-help"><Info size={17} aria-hidden="true" /><p>이 링크와 인증번호는 <strong>발송일부터 {LINK_VALID_DAYS}일 뒤</strong>까지 사용할 수 있어요.</p></div>
        </section>
      </div>
    </main>
  );
}

function MetricCards({ report, final }: { report: Report; final: boolean }) {
  const reads = readRate(report);
  const successRate = ratio(report.delivered, report.targeted);
  const audience = uniqueRecipientMessage(report);
  const responses = ratio(report.reactionCount, report.delivered);
  const metrics = [
    { label: '읽음률', icon: Eye, tone: 'blue', value: formatRate(reads), meter: reads,
      hint: 'RCS 발송 성공 건 중 메시지를 열어본 비율이에요.', detail: 'RCS 발송 기준', unit: '' },
    { label: '반응률', icon: MousePointerClick, tone: 'purple', value: formatRate(responses), meter: responses,
      hint: '발송 성공 건 중 메시지 본문의 URL이나 버튼을 클릭한 비율이에요.', detail: '전체 발송 성공 건 기준', unit: '' },
    { label: '읽음수', icon: FileChartColumn, tone: 'blue', value: formatCount(report.readCount), meter: null,
      hint: '발송한 RCS 메시지를 열어본 건수예요.', detail: 'RCS 발송 기준', unit: '건' },
    { label: '반응수', icon: Activity, tone: 'purple', value: formatCount(report.reactionCount), meter: null,
      hint: '메시지 본문의 URL이나 버튼을 클릭해 집계된 반응 건수예요.', detail: '현재까지 누적', unit: '건' },
  ];
  return (
    <section aria-labelledby="tw-report-summary-title">
      <div className="tw-report-overview-heading">
        <h2 id="tw-report-summary-title">{final ? '최종 결과' : '실시간 데이터'}</h2>
      </div>
      <div className="tw-report-metrics tw-report-send-metrics">
        <article className="tw-report-card tw-report-metric" data-tone="blue">
          <div className="tw-report-metric-heading">
            <span className="tw-report-metric-icon"><Target size={18} aria-hidden="true" /></span>
            <h3>목표 발송 건수</h3>
          </div>
          <div className="tw-report-metric-value" data-collecting={report.targeted === null}>
            {formatCount(report.targeted)}{report.targeted !== null && <small>건</small>}
          </div>
          <p>발송을 요청한 건수</p>
        </article>
        <article className="tw-report-card tw-report-metric" data-tone="blue">
          <div className="tw-report-metric-heading">
            <span className="tw-report-metric-icon"><Send size={18} aria-hidden="true" /></span>
            <h3>발송 성공</h3>
          </div>
          <div className="tw-report-metric-value" data-collecting={report.delivered === null}>
            {formatCount(report.delivered)}{report.delivered !== null && <small>건</small>}
          </div>
          {successRate !== null && <p>목표의 {formatRate(successRate)} 달성</p>}
        </article>
      </div>
      {audience && (
        <p className="tw-report-delivery-audience"><Users size={17} aria-hidden="true" /><strong>{audience}</strong></p>
      )}
      <div className="tw-report-metrics">
        {metrics.map(({ label, icon: Icon, tone, value, meter, hint, detail, unit }) => (
          <article className="tw-report-card tw-report-metric" data-tone={tone} key={label}>
            <div className="tw-report-metric-heading">
              <span className="tw-report-metric-icon"><Icon size={18} aria-hidden="true" /></span>
              <h3>{label}</h3>
              <InfoTip label={label}>{hint}</InfoTip>
            </div>
            <div className="tw-report-metric-value" data-collecting={value === COLLECTING_LABEL}>
              {value}{unit && value !== COLLECTING_LABEL && <small>{unit}</small>}
            </div>
            {meter !== null && <div className="tw-report-meter" aria-hidden="true"><i style={{ width: Math.min(meter, 100) + '%' }} /></div>}
            {value !== COLLECTING_LABEL && <p>{detail}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}

function Expired() {
  return (
    <main className="tw-report-shell tw-report-expired">
      <div className="tw-report-card">
        <span className="tw-report-title-icon"><TimerOff size={21} aria-hidden="true" /></span>
        <h1>열람 기간이 끝났어요</h1>
        <p>통계 링크는 발송일부터 {LINK_VALID_DAYS}일 뒤까지 열 수 있어요.</p>
        <p>읽음·반응 통계는 비즈팅에 로그인한 뒤 <strong>[발송메시지 확인]</strong>에서 확인해 주세요.</p>
        <a className="tw-report-primary" href={BIZTING_URL} target="_blank" rel="noopener noreferrer">비즈팅에서 확인하기 <ArrowUpRight size={17} aria-hidden="true" /></a>
      </div>
    </main>
  );
}

function ReportNotes({ sentOn }: { sentOn: string }) {
  return (
    <aside className="tw-report-notice" aria-labelledby="tw-report-notice-title">
      <Info size={20} aria-hidden="true" />
      <div>
        <h2 id="tw-report-notice-title">통계 확인 전 참고해 주세요</h2>
        <ul>
          <li>통계는 발송일부터 7일간 수집돼요. 최종 성과는 7일차 집계가 끝난 뒤 확인해 주세요.</li>
          <li>이 링크는 <strong>{formatDateWithWeekday(linkExpiresOn(sentOn))}</strong>까지 열 수 있어요.</li>
          <li>지역 통계와 연령·성별 분석은 발송 후 {AUDIENCE_HOURS}시간 동안 수집한 데이터예요.</li>
        </ul>
      </div>
    </aside>
  );
}

export default function BiztingReport() {
  const navigate = useNavigate();
  const expired = !!useMatch(expiredPath);
  const detail = useMatch(REPORT_PATH + '/c/:id/*');
  const [campaigns, setCampaigns] = useState<Report[] | null>(null);
  const lastRefreshAt = useRef<number | null>(null);
  const refreshDialog = useRef<HTMLDialogElement>(null);

  const first = campaigns?.[0];
  const multiple = (campaigns?.length ?? 0) > 1;
  const report = campaigns?.find(({ id }) => id === detail?.params.id);
  const tab = detail?.params['*'] ?? '';
  const daily = tab === 'daily';
  const residence = tab === 'residence';
  const demographics = tab === 'demographics';
  const final = !!first && isFinal(first);
  const demographicsReady = !!report && Date.parse(report.updatedAt) >= dailyReleaseAt(dateAt(report.sentOn, 1));
  const pathname = detail?.pathname;

  useEffect(() => {
    const previous = document.title;
    document.title = title + ' v1.1';
    return () => { document.title = previous; };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, tab]);

  function refreshReport() {
    if (!campaigns) return;
    const now = Date.now();
    let last = lastRefreshAt.current;
    try {
      const saved = window.localStorage.getItem(lastRefreshKey);
      const savedTime = saved === null ? NaN : Number(saved);
      if (Number.isFinite(savedTime) && savedTime <= now && (last === null || savedTime > last)) last = savedTime;
    } catch {
      // The open report still enforces the limit if browser storage is unavailable.
    }
    if (refreshRemaining(last, now) > 0) {
      refreshDialog.current?.showModal();
      return;
    }
    lastRefreshAt.current = now;
    try {
      window.localStorage.setItem(lastRefreshKey, String(now));
    } catch {
      // The in-memory timestamp covers retries while this page is open.
    }
    const updatedAt = new Date(now).toISOString();
    setCampaigns(campaigns.map((campaign) => ({ ...campaign, updatedAt })));
  }

  return (
    <div className="tw-report tw-report-v11 tw-font-sans">
      {(expired || !campaigns) && <header className="tw-report-header">
        <div className="tw-report-shell tw-report-header-row">
          <img src={logo} alt="비즈팅" width={105} height={32} />
          <BiztingLink />
        </div>
      </header>}
      {expired ? <Expired /> : !campaigns || !first ? <Verification onOpen={(value) => {
        startTransition(() => {
          navigate(REPORT_PATH + '/c/' + value[0].id, { replace: true });
          setCampaigns(value);
        });
        window.scrollTo(0, 0);
      }} /> : !report ? <Navigate to={REPORT_PATH + '/c/' + first.id} replace /> : (
        <div className="tw-report-dashboard">
          <aside className="tw-report-sidebar">
            <div className="tw-report-sidebar-brand">
              <img src={logo} alt="비즈팅" width={105} height={32} />
              <div className="tw-report-sidebar-mobile-link"><BiztingLink /></div>
            </div>
            <nav className="tw-report-nav" aria-label="통계 보기">
              <NavLink to={REPORT_PATH + '/c/' + report.id} end><Activity size={19} aria-hidden="true" /> 실시간통계</NavLink>
              <NavLink to={REPORT_PATH + '/c/' + report.id + '/daily'}><CalendarDays size={19} aria-hidden="true" /> 일간통계</NavLink>
              <NavLink to={REPORT_PATH + '/c/' + report.id + '/residence'}><MapPinned size={19} aria-hidden="true" /> 지역 통계</NavLink>
              <NavLink to={REPORT_PATH + '/c/' + report.id + '/demographics'}><Users size={19} aria-hidden="true" /> 연령·성별 분석</NavLink>
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
              <p>{daily ? '발송일부터 날짜별 읽음과 반응을 확인하세요.' : residence ? '지역별 발송 성과를 확인하세요.' : demographics ? '연령과 성별에 따른 수신자 구성을 확인하세요.' : '캠페인의 발송 성과를 7일 동안 살펴보세요.'}</p>
              {multiple && (
                <CampaignPicker campaigns={campaigns} selected={report}
                  onSelect={(id) => navigate(REPORT_PATH + '/c/' + id + (tab && '/' + tab), { replace: true })} />
              )}
              <dl className="tw-report-campaign">
                <div><dt>발송일자</dt><dd><time dateTime={report.sentOn}>{formatDateWithWeekday(report.sentOn)} {report.sendTime}</time></dd></div>
                {!multiple && <div><dt>캠페인명</dt><dd>{report.name}</dd></div>}
                <div><dt>열람 가능 기간</dt><dd>{formatDateWithWeekday(linkExpiresOn(first.sentOn))}까지</dd></div>
              </dl>
            </section>
            <div className="tw-report-timestamp-row">
              <div className="tw-report-updated">
                <span role="status"><Clock3 size={14} aria-hidden="true" /> {formatUpdatedAt(first.updatedAt) + ' 기준'}</span>
                {!final && (
                  <button type="button" aria-label="통계 새로고침" onClick={refreshReport}>
                    <RefreshCw size={16} aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
            <Suspense fallback={<ReportLoading />}>
              {daily ? <DailyStats report={report} />
                : residence ? <EstimatedResidence key={report.id} report={report} />
                  : demographics ? <Demographics segments={demographicsReady ? report.segments : []} pending={!demographicsReady} />
                    : <MetricCards report={report} final={final} />}
            </Suspense>
            <ReportNotes sentOn={first.sentOn} />
            <dialog ref={refreshDialog} className="tw-report-refresh-dialog" aria-labelledby="tw-report-refresh-title" aria-describedby="tw-report-refresh-message">
              <h2 id="tw-report-refresh-title">통계가 이미 업데이트됐어요</h2>
              <p id="tw-report-refresh-message">마지막 새로고침 후 5분이 지나면 다시 시도해 주세요.</p>
              <form method="dialog"><button className="tw-report-primary">확인</button></form>
            </dialog>
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

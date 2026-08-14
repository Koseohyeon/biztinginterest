import { useState, useMemo, useEffect, type ChangeEvent, type ReactNode } from "react";

type RegionData = Record<string, Record<string, string[]>>;

const REGION_DATA: RegionData = {
  "서울특별시": {
    "강남구": ["대치동", "역삼동", "삼성동", "논현동"],
    "마포구": ["서교동", "합정동", "연남동"],
    "송파구": ["잠실동", "문정동", "가락동"],
  },
  "경기도": {
    "성남시 분당구": ["정자동", "서현동", "수내동"],
    "고양시 일산동구": ["장항동", "백석동"],
  },
};

const BRANCH_OPTIONS = ["이지스터디카페 강남점", "이지스터디카페 홍대점", "이지스터디카페 분당점"];
const PHONE_OPTIONS = ["1670-0823", "1544-1234"];
const INTEREST_SEGMENTS = ["중학생 부모", "고등학생 부모", "대학생", "취준생"];
const COST_PER_SEND = 120;
const MAX_SEND = 1000;

// 발송/정책 관련 매직넘버 — 한 곳에서 관리 (EDMSx비즈팅 정기발송 정책 및 개발가이드 v1.0 기준)
const APPROVAL_LEAD_BUSINESS_DAYS = 2; // P-02: 요청 유효일(D) 다음날부터 영업일 2일 뒤 = 초회 계획 발송일
const STATS_NOTIFY_DAYS = 2; // 기능정의서 No.44: 발송일로부터 2일 경과 시점에 통계 집계(달력일 기준)
/* const CASH_PRECHECK_DAYS = 14; // 기능정의서 No.45: 발송 후 14일째 다음 회차 생성 시도 + 캐시 사전 확인
 */const TITLE_MAX_LENGTH = 30; // 메시지 제목 최대 글자수
const VAT_MULTIPLIER = 1.1; // 충전 결제금액 = 캐시 금액 × VAT_MULTIPLIER
const BIZTALKING_UNIT_PRICE = 120; // 비즈팅 발송 단가(원, VAT 별도) — 기능정의서 No.37

interface HeroDot {
  x: number;
  y: number;
  r: number;
  match: boolean;
  delay: string;
}

const HERO_DOTS: HeroDot[] = [
  { x: 62, y: 60, r: 7, match: true, delay: "0s" },
  { x: 156, y: 52, r: 6, match: false, delay: "0.3s" },
  { x: 168, y: 104, r: 7.5, match: true, delay: "0.6s" },
  { x: 54, y: 118, r: 5.5, match: false, delay: "0.9s" },
  { x: 94, y: 136, r: 7, match: true, delay: "1.2s" },
  { x: 142, y: 138, r: 5, match: false, delay: "0.45s" },
];

type Step = "landing" | "result" | "setup" | "done";

interface TemplateVariable {
  key: string;
  label: string;
  hint: string;
  options: string[];
  placeholder: string;
}

interface MessageTemplate {
  id: string;
  name: string;
  description: string;
  variables: TemplateVariable[];
  /** LMS 제목(타이틀) — 본문과 별도로 표시되며 치환 후 30자를 넘을 수 없다. */
  title: string;
  body: string;
}

const MESSAGE_TEMPLATES: MessageTemplate[] = [
  {
    id: "branch-intro",
    name: "매장 소개형(성과측정X)",
    description: "매장 특징을 소개하는 기본 템플릿",
    variables: [
      { key: "branch", label: "지점명", hint: "등록된 지점명을 불러왔어요. 목록에 없으면 직접 입력할 수 있어요.", options: BRANCH_OPTIONS, placeholder: "지점명을 선택하거나 입력하세요" },
      { key: "phone", label: "고객센터 번호", hint: "등록된 고객센터 번호를 불러왔어요. 목록에 없으면 직접 입력할 수 있어요.", options: PHONE_OPTIONS, placeholder: "전화번호를 입력해주세요 (예: 010-1234-5678)" },
    ],
    title: "{{branch}} 안내",
    body: `{{branch}}을 안내드립니다.

넓고 쾌적한 스터디카페를 찾고 계신가요? 네이버에서 '{{branch}}'을 검색하고, 지금 바로 최고의 학습 환경을 경험해 보세요.

■ 스터디카페 특징
· 커피, 차, 주스 등 음료 무제한 제공
· 24시간 연중무휴 운영
· 휴게실 내 샤워기 및 간편식 이용 가능
· 방음 스터디룸 완비

■ 고객센터
{{phone}}

무료 수신거부 1504`,
  },
  {
    id: "promo-event",
    name: "프로모션 안내",
    description: "할인·이벤트 혜택을 강조하는 템플릿",
    variables: [
      { key: "branch", label: "지점명", hint: "등록된 지점명을 불러왔어요. 목록에 없으면 직접 입력할 수 있어요.", options: BRANCH_OPTIONS, placeholder: "지점명을 선택하거나 입력하세요" },
      { key: "discount", label: "할인/혜택 내용", hint: "이번 프로모션 혜택을 입력해주세요.", options: ["첫 달 30% 할인", "1+1 이용권 증정", "가입비 무료"], placeholder: "혜택 내용을 입력하세요" },
      { key: "deadline", label: "행사 마감일", hint: "프로모션 종료일을 입력해주세요.", options: [], placeholder: "예: 2026-08-31" },
      { key: "phone", label: "고객센터 번호", hint: "등록된 고객센터 번호를 불러왔어요. 목록에 없으면 직접 입력할 수 있어요.", options: PHONE_OPTIONS, placeholder: "전화번호를 입력해주세요" },
    ],
    title: "{{branch}} 프로모션 안내",
    body: `[{{branch}}] 특별 프로모션 안내

지금 가입하면 {{discount}}!
이 혜택은 {{deadline}}까지만 제공돼요.

지금 바로 방문해서 쾌적한 학습 환경을 경험해보세요.

■ 고객센터
{{phone}}

무료 수신거부 1504`,
  },
  {
    id: "new-open",
    name: "매장소개형(성과측정O)",
    description: "신규 지점 오픈 소식을 알리는 템플릿",
    variables: [
      {
        key: "branch",
        label: "스터디카페명",
        hint: "등록된 스터디카페명을 불러왔어요. 목록에 없으면 직접 입력할 수 있어요.",
        options: BRANCH_OPTIONS,
        placeholder: "스터디카페명을 선택하거나 입력하세요",
      },
      {
        key: "url",
        label: "위치 확인 URL",
        hint: "위치 확인 페이지 URL을 입력해주세요. https://로 시작하는 주소만 입력할 수 있어요.",
        options: [],
        placeholder: "https://로 시작하는 URL을 입력해주세요",
      },
      {
        key: "phone",
        label: "고객센터 번호",
        hint: "등록된 고객센터 번호를 불러왔어요. 목록에 없으면 직접 입력할 수 있어요.",
        options: PHONE_OPTIONS,
        placeholder: "전화번호를 입력해주세요",
      },
    ],
    title: "{{branch}} 안내드립니다",
    body: `(광고)[SKT]{{branch}} 안내드립니다.

고객님 안녕하세요.

넓고 쾌적한 스터디카페를 찾고 계신가요?

지금 바로 방문하고 '{{branch}}'에서 최고의 학습 환경을 경험해 보세요!

■{{branch}} 특장점

- 커피, 차, 주스 등 음료 무제한 제공
- 24시간 연중무휴 운영
- 휴게 공간 분리 운영
- 1인 집중석
- 오픈형 학습존
- 프라이빗 독서실형 좌석 완비
- 무료 Wi-Fi
- 냉난방 최적화
- 출입 보안 시스템
- 방음 설계 및 저소음 공간

▶ 위치 확인하기:{{url}}

■문의: {{branch}}고객센터({{phone}})

※ 이 메시지는 SK텔레콤이 혜택/광고 수신에 동의하신 고객님께 발송되었습니다.

감사합니다.

무료 수신거부 1504`,
  },
];

function renderTemplateText(text: string, variables: TemplateVariable[], values: Record<string, string>): ReactNode[] {
  const varMap = new Map(variables.map((v) => [v.key, v]));
  return text.split(/(\{\{\w+\}\})/g).map((part, i) => {
    const match = part.match(/^\{\{(\w+)\}\}$/);
    if (!match) return <span key={i}>{part}</span>;
    const v = varMap.get(match[1]);
    const value = values[match[1]];
    return (
      <b key={i} className={highlightCls}>
        {value || (v ? `{${v.label}}` : part)}
      </b>
    );
  });
}

/** 화면 표시용이 아닌 순수 문자열 치환 — 글자수 계산 등에 사용 */
function substituteTemplateText(text: string, variables: TemplateVariable[], values: Record<string, string>): string {
  const varMap = new Map(variables.map((v) => [v.key, v]));
  return text.replace(/\{\{(\w+)\}\}/g, (_match, key: string) => {
    const v = varMap.get(key);
    return values[key] || (v ? `{${v.label}}` : "");
  });
}

function renderTemplateBody(template: MessageTemplate, values: Record<string, string>): ReactNode[] {
  return renderTemplateText(template.body, template.variables, values);
}

function renderTemplateTitle(template: MessageTemplate, values: Record<string, string>): ReactNode[] {
  return renderTemplateText(template.title, template.variables, values);
}

function hashCount(seedStr: string): number {
  let h = 0;
  for (let i = 0; i < seedStr.length; i++) h = (h * 31 + seedStr.charCodeAt(i)) >>> 0;
  return Math.min(700 + (h % 2200), MAX_SEND);
}

function addBusinessDays(date: Date, days: number): Date {
  const result = new Date(date);
  let added = 0;
  while (added < days) {
    result.setDate(result.getDate() + 1);
    const day = result.getDay();
    if (day !== 0 && day !== 6) added++;
  }
  return result;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const HOLIDAYS = new Set([
  "2026-08-17", // 광복절(8/15, 토) 대체공휴일
]);

// 주말+공휴일을 휴일로 판단(프로토타입 간소화). 실서비스는 business_calendar(공휴일 테이블) 조회로 대체.
function isBusinessDay(date: Date): boolean {
  const day = date.getDay();
  if (day === 0 || day === 6) return false;
  return !HOLIDAYS.has(formatDate(date));
}
function isValidHttpsUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:";
  } catch {
    return false;
  }
}
function nextBusinessDay(date: Date): Date {
  let d = new Date(date);
  while (!isBusinessDay(d)) d.setDate(d.getDate() + 1);
  return d;
}
function previousBusinessDay(date: Date): Date {
  let d = new Date(date);
  while (!isBusinessDay(d)) d.setDate(d.getDate() - 1);
  return d;
}

/**
 * P-04~P-06: 초회 계획 발송일의 '일(day-of-month)'을 anchor_day로 고정하고,
 * 대상 월(targetYear, targetMonth0)에서 그 날짜를 기준일로 삼는다.
 * - 그 달에 해당 일자가 없으면 말일 적용(P-05)
 * - 기준일이 휴일이면 다음 영업일로 이동하되, 그 이동이 다음 달로 넘어가면
 *   같은 달의 직전 영업일로 이동해 '달력월당 1회'를 보장한다(P-06)
 */
function monthlyPlannedDate(targetYear: number, targetMonth0: number, anchorDay: number): Date {
  const lastDay = new Date(targetYear, targetMonth0 + 1, 0).getDate();
  const day = Math.min(anchorDay, lastDay);
  const candidate = new Date(targetYear, targetMonth0, day);
  if (isBusinessDay(candidate)) return candidate;

  const forward = nextBusinessDay(addDays(candidate, 1));
  if (forward.getFullYear() === targetYear && forward.getMonth() === targetMonth0) return forward;
  return previousBusinessDay(addDays(candidate, -1));
}

/** 최초 발송일을 기준으로 '다음 달의 동일 anchor_day' 정기발송일을 계산한다(P-07: 실제 발송 지연과 무관하게 anchor_day 유지). */
function nextMonthlyRecurringDate(firstSendDate: Date): Date {
  const anchorDay = firstSendDate.getDate();
  let y = firstSendDate.getFullYear();
  let m0 = firstSendDate.getMonth() + 1;
  if (m0 > 11) { m0 = 0; y += 1; }
  return monthlyPlannedDate(y, m0, anchorDay);
}

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

const cardCls = "tw-bg-white tw-border tw-border-[#ECEDF1] tw-rounded-xl";
const sectionTitleCls = "tw-text-sm tw-font-medium tw-text-[#1F2430] tw-border-b tw-border-[#EEF0F3] tw-pb-2.5 tw-mb-1";
const primaryBtnCls = "tw-bg-[#2C5FF6] tw-text-white tw-border-none tw-rounded-lg tw-text-sm tw-font-medium tw-cursor-pointer tw-px-[22px] tw-py-[13px] disabled:tw-opacity-60 disabled:tw-cursor-not-allowed";
const secondaryBtnCls = "tw-bg-white tw-text-[#4A4F59] tw-border tw-border-[#E1E3E8] tw-rounded-lg tw-text-sm tw-cursor-pointer tw-px-5 tw-py-[11px]";
const inquiryBtnCls = "tw-bg-[#EEF4FF] tw-text-[#2C5FF6] tw-border tw-border-[#C7DBFF] tw-rounded-lg tw-text-xs tw-font-medium tw-cursor-pointer tw-px-4 tw-py-2 tw-mb-5";
const infoBoxCls = "tw-bg-[#EEF4FF] tw-text-[#2C5FF6] tw-text-[13px] tw-rounded-lg tw-px-4 tw-py-3 tw-leading-relaxed";
const chipCls = "tw-bg-[#F5F6FA] tw-text-[#4A4F59] tw-text-xs tw-px-3 tw-py-[5px] tw-rounded-full tw-border tw-border-[#ECEDF1]";
const highlightCls = "tw-bg-[#FFF3D6] tw-text-[#8A6100] tw-rounded tw-px-1 tw-py-0.5";
const fieldCls = "tw-w-full tw-h-[38px] tw-border tw-border-[#E1E3E8] tw-rounded-lg tw-px-2.5 tw-text-[13px] tw-text-[#1F2430] tw-bg-white";
const interestBoxCls = "tw-flex tw-flex-wrap tw-gap-1.5 tw-bg-[#F6F9FF] tw-border tw-border-[#DCE7FF] tw-rounded-lg tw-p-2.5";
const interestChipCls = "tw-bg-[#2C5FF6] tw-text-white tw-text-xs tw-px-2.5 tw-py-[5px] tw-rounded-full tw-font-medium";
const eyebrowBadgeCls = "tw-inline-block tw-text-xs tw-text-[#2C5FF6] tw-font-medium tw-bg-[#EEF4FF] tw-px-3 tw-py-[5px] tw-rounded-full tw-mb-1";
const overlayCls = "tw-absolute tw-inset-0 tw-bg-black/45 tw-flex tw-items-center tw-justify-center tw-z-50";
const toggleTrackCls = "tw-relative tw-w-9 tw-h-5 tw-rounded-full tw-border-none tw-p-0";
const toggleThumbCls = "tw-absolute tw-top-0.5 tw-left-[18px] tw-w-4 tw-h-4 tw-rounded-full tw-bg-white tw-transition-[left] tw-duration-150";
const consentRowCls = "tw-flex tw-items-center tw-gap-2 tw-text-sm tw-text-[#1F2430] tw-cursor-pointer";
const consentBoxCls = "tw-max-h-[90px] tw-overflow-y-auto tw-text-[11.5px] tw-text-[#9AA0AC] tw-leading-relaxed tw-bg-[#FAFBFC] tw-border tw-border-[#EEF0F3] tw-rounded-md tw-p-2.5 tw-mt-2";
const urgentBoxCls = "tw-bg-[#FFF3D6] tw-border tw-border-[#F0D999] tw-rounded-lg tw-p-4 tw-mb-5 tw-flex tw-flex-col tw-gap-2";
const urgentRowCls = "tw-text-[12.5px] tw-text-[#8A6100] tw-leading-relaxed";

const phoneFrameCls = "tw-max-w-[700px] tw-mx-auto tw-bg-white tw-rounded-[24px] tw-border tw-border-[#E5E7EB] tw-overflow-hidden tw-shadow-[0_2px_14px_rgba(0,0,0,0.06)]";
const phoneHeaderCls = "tw-flex tw-items-center tw-gap-2.5 tw-px-4 tw-pt-4 tw-pb-3 tw-border-b tw-border-[#F1F2F4]";
const phoneAvatarCls = "tw-w-9 tw-h-9 tw-rounded-full tw-bg-[#5A4FE0] tw-flex tw-items-center tw-justify-center tw-text-white tw-font-bold tw-text-sm tw-shrink-0";
const phoneBubbleCls = "tw-bg-[#F4F5F7] tw-rounded-[14px] tw-p-3.5 tw-text-[12px] tw-leading-[1.65] tw-text-[#26282B] tw-whitespace-pre-wrap";

interface FieldLabelProps {
  children: ReactNode;
  hint?: string;
}
function FieldLabel({ children, hint }: FieldLabelProps) {
  return (
    <div className="tw-mb-1.5">
      <div className="tw-text-[13px] tw-font-medium tw-text-[#1F2430]">{children}</div>
      {hint && <div className="tw-text-xs tw-text-[#9AA0AC] tw-mt-0.5">{hint}</div>}
    </div>
  );
}

/** 자동으로 채워져 수정할 수 없는 필드(발송 방식/발송 일시 등)를 라벨+회색 박스로 표시 */
function LockedField({ label, hint, value, locked, className = "tw-mb-3" }: { label: string; hint?: string; value: ReactNode; locked?: boolean; className?: string }) {
  return (
    <>
      <FieldLabel hint={hint}>{label}</FieldLabel>
      <div className={`${fieldCls} tw-flex tw-items-center tw-gap-1 tw-bg-[#F5F6FA] tw-text-[#767C88] ${className}`}>
        {value}{locked && " 🔒"}
      </div>
    </>
  );
}

interface ReadonlyRowProps {
  label: string;
  value: string;
  locked?: boolean;
}
function ReadonlyRow({ label, value, locked }: ReadonlyRowProps) {
  return (
    <div className="tw-flex tw-justify-between tw-text-[12.5px] tw-py-[5px] tw-text-[#767C88]">
      <span>{label}</span>
      <span className="tw-text-[#4A4F59] tw-flex tw-items-center tw-gap-1">{value}{locked && " 🔒"}</span>
    </div>
  );
}

interface DatalistFieldProps {
  listId: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  className?: string;
  onBlur?: () => void;
  invalid?: boolean;
  disabled?: boolean;
}
function DatalistField({ listId, value, onChange, options, placeholder, className = "tw-mb-4", onBlur, invalid = false, disabled = false }: DatalistFieldProps) {
  const base = "tw-w-full tw-h-[38px] tw-border tw-rounded-lg tw-px-2.5 tw-text-[13px] tw-bg-white";
  const borderColor = disabled ? "tw-border-[#E1E3E8] tw-text-[#9AA0AC] tw-bg-[#F5F6FA] tw-cursor-not-allowed" : invalid ? "tw-border-[#D94848] tw-text-[#D94848]" : "tw-border-[#E1E3E8] tw-text-[#1F2430]";
  return (
    <>
      <input
        list={listId}
        className={`${base} ${borderColor} ${className}`}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
      />
      <datalist id={listId}>{options.map((o) => <option key={o} value={o} />)}</datalist>
    </>
  );
}

function InterestChips() {
  return <>{INTEREST_SEGMENTS.map((s) => <span key={s} className={interestChipCls}>{s}</span>)}</>;
}

function Hero() {
  return (
    <div className="tw-relative tw-w-[220px] tw-h-[172px] tw-mx-auto tw-mb-1">
      <style>{`
        @keyframes dotFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        @keyframes sweepSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pinPop { 0% { transform: scale(0.85); } 50% { transform: scale(1.06); } 100% { transform: scale(1); } }
      `}</style>
      <svg viewBox="0 0 220 172" width="220" height="172">
        <circle cx="110" cy="94" r="22" className="tw-fill-[#2C5FF6]" opacity="0.16">
          <animate attributeName="r" values="22;62" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <circle cx="110" cy="94" r="22" className="tw-fill-[#2C5FF6]" opacity="0.16">
          <animate attributeName="r" values="22;62" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="110" cy="94" r="62" fill="none" className="tw-stroke-[#DCE7FF]" strokeWidth="1" />
        <circle cx="110" cy="94" r="44" fill="none" className="tw-stroke-[#C7DBFF]" strokeWidth="1" />

        <g style={{ transformOrigin: "110px 94px", animation: "sweepSpin 3.6s linear infinite" }}>
          <line x1="110" y1="94" x2="110" y2="34" className="tw-stroke-[#8AB0FF]" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
        </g>

        {HERO_DOTS.map((d, i) => (
          <g key={i} style={{ transformOrigin: `${d.x}px ${d.y}px`, animation: "dotFloat 2.6s ease-in-out infinite", animationDelay: d.delay }}>
            <circle cx={d.x} cy={d.y} r={d.r} className={d.match ? "tw-fill-[#2C5FF6]" : "tw-fill-[#DFE1E6]"} />
            {d.match && <circle cx={d.x} cy={d.y} r={d.r + 3.5} fill="none" className="tw-stroke-[#8AB0FF]" strokeWidth="1.2" opacity="0.6" />}
          </g>
        ))}

        <g style={{ transformOrigin: "110px 94px", animation: "pinPop 0.5s ease-out" }}>
          <path d="M110 62c-11.5 0-19.5 8.2-19.5 19.5 0 14.6 19.5 32.5 19.5 32.5s19.5-17.9 19.5-32.5C129.5 70.2 121.5 62 110 62z" className="tw-fill-[#2C5FF6]" />
          <circle cx="110" cy="81" r="7.5" className="tw-fill-white" />
        </g>
      </svg>
      <div className="tw-absolute tw-left-1/2 tw-bottom-1 tw-transform -tw-translate-x-1/2 tw-text-[11px] tw-font-medium tw-text-[#2C5FF6] tw-bg-[#EEF4FF] tw-px-2.5 tw-py-[3px] tw-rounded-full tw-whitespace-nowrap">
        실시간으로 관심 고객을 찾는 중
      </div>
    </div>
  );
}

interface SktMessageMockupProps {
  phoneNumber: string;
  title: ReactNode;
  titleLength: number;
  children: ReactNode;
}
function SktMessageMockup({ phoneNumber, title, titleLength, children }: SktMessageMockupProps) {
  const titleTooLong = titleLength > TITLE_MAX_LENGTH;
  return (
    <div className={phoneFrameCls}>
      <div className={phoneHeaderCls}>
        <div className={phoneAvatarCls}>T</div>
        <div className="tw-min-w-0 tw-flex-1">
          <div className="tw-flex tw-items-center tw-gap-1">
            <span className="tw-text-[13.5px] tw-font-bold tw-text-[#1B1D1F] tw-truncate">SK텔레콤 제휴</span>
          </div>
          <div className="tw-text-[11px] tw-text-[#9AA0AC]">{phoneNumber}</div>
        </div>
      </div>

      <div className="tw-px-4 tw-pt-3 tw-pb-4">
        <div className="tw-flex tw-items-center tw-gap-1 tw-mb-2">
          <span className="tw-text-[10.5px] tw-text-[#9AA0AC]">[Web발신] (광고)</span>
          <span className="tw-inline-flex tw-items-center tw-gap-0.5 tw-text-[10.5px] tw-text-[#2C5FF6] tw-font-medium">
            <span className="tw-w-3 tw-h-3 tw-rounded-full tw-bg-[#2C5FF6] tw-text-white tw-inline-flex tw-items-center tw-justify-center tw-text-[8px]">✓</span>
            확인된 발신번호
          </span>
        </div>
        <div className="tw-mb-1">
          <div className="tw-flex tw-items-center tw-justify-between tw-mb-0.5">
            <span className="tw-text-[10px] tw-text-[#9AA0AC]">제목</span>
            <span className={`tw-text-[10px] ${titleTooLong ? "tw-text-[#D94848] tw-font-medium" : "tw-text-[#B7BBC4]"}`}>{titleLength}/{TITLE_MAX_LENGTH}자</span>
          </div>
          <div className={`${phoneBubbleCls} tw-font-bold tw-py-2`}>{title}</div>
          {titleTooLong && (
            <div className="tw-text-[10.5px] tw-text-[#D94848] tw-mt-1">⚠ 제목이 30자를 초과했어요. 다시 한번 확인해주세요.</div>
          )}
        </div>
        <div className={phoneBubbleCls}>{children}</div>
      </div>

      <div className="tw-flex tw-justify-between tw-items-center tw-px-4 tw-pb-3 tw-text-[10px] tw-text-[#B7BBC4]">
        <span>오전 9:02</span>
        <span>무료 수신거부 1504</span>
      </div>
    </div>
  );
}

interface SideNavProps {
  onGoToCampaign: () => void;
  open: boolean;
  onClose: () => void;
  cashBalance: number;
  onOpenCharge: () => void;
}
function SideNav({ onGoToCampaign, open, onClose, cashBalance, onOpenCharge }: SideNavProps) {
  const Item = ({ label, active, badge }: { label: string; active?: boolean; badge?: string }) => (
    <div
      onClick={() => {
        if (label === "우리가게 광고하기") onGoToCampaign();
        onClose();
      }}
      className={`tw-text-sm tw-px-2.5 tw-py-2 tw-rounded-lg tw-cursor-pointer tw-flex tw-items-center tw-gap-1.5 tw-mb-0.5 ${active ? "tw-bg-[#EEF4FF] tw-text-[#2C5FF6] tw-font-medium" : "tw-text-[#4A4F59]"
        }`}
    >
      {label}
      {badge && <span className="tw-text-[9.5px] tw-bg-[#2C5FF6] tw-text-white tw-rounded-full tw-px-1.5 tw-py-px tw-font-medium">{badge}</span>}
    </div>
  );
  const Section = ({ title, children }: { title: string; children: ReactNode }) => (
    <div className="tw-mb-5.5">
      <div className="tw-text-[11px] tw-text-[#B7BBC4] tw-mb-1.5 tw-font-medium">{title}</div>
      {children}
    </div>
  );

  return (
    <div
      className={`app-sidebar${open ? " sidebar-open" : ""} tw-w-[220px] tw-bg-white tw-border-r tw-border-[#ECEDF1] tw-px-[18px] tw-py-6`}
    >
      <div className="tw-flex tw-justify-between tw-items-start tw-mb-6.5">
        <div>
          <div className="tw-text-base tw-font-medium tw-text-[#1F2430] tw-flex tw-items-center tw-gap-1.5">
            <span className="tw-text-[#1DBF9E]">◆</span> biztalk <span className="tw-text-[10px] tw-text-[#9AA0AC] tw-font-normal">CENTER</span>
          </div>
          <div className="tw-text-[13px] tw-font-medium tw-text-[#2C5FF6] tw-mt-0.5">× EDMS</div>
        </div>
        <button className="mobile-close-btn tw-bg-transparent tw-border-none tw-text-lg tw-text-[#9AA0AC] tw-cursor-pointer" onClick={onClose} aria-label="닫기">×</button>
      </div>

      <div className="tw-mb-6">
        <div className="tw-text-[13px] tw-text-[#4A4F59] tw-mb-2.5">edmsTEST 님</div>
        <div className="tw-text-[11.5px] tw-text-[#9AA0AC] tw-mb-1">보유 캐시</div>
        <div className="tw-flex tw-items-center tw-justify-between">
          <span className="tw-text-base tw-font-medium tw-text-[#1F2430]">{cashBalance.toLocaleString()} 캐시</span>
          <button
            className="tw-text-[11.5px] tw-border tw-border-[#E1E3E8] tw-rounded-full tw-px-2.5 tw-py-1 tw-bg-white tw-text-[#4A4F59] tw-cursor-pointer"
            onClick={onOpenCharge}
          >
            충전하기
          </button>
        </div>
      </div>

      <Section title="캐시"><Item label="캐시 충전" /></Section>
      <Section title="비즈팅"><Item label="우리가게 광고하기" active badge="NEW" /></Section>
      <Section title="통계"><Item label="메시지 발송 통계" /></Section>
      <Section title="1:1 문의"><Item label="문의하기" /></Section>
      <Section title="FAQ"><Item label="자주 묻는 질문" /></Section>
      <Section title="관리자">
        <Item label="고객사 통계" />
        <Item label="고객사 관리" />
        <Item label="고객사 캐시 관리" />
      </Section>
    </div>
  );
}

interface TopHeaderProps {
  title: string;
  onMenuClick: () => void;
}
function TopHeader({ title, onMenuClick }: TopHeaderProps) {
  return (
    <div className="app-header tw-flex tw-justify-between tw-items-center tw-px-8 tw-py-[18px] tw-border-b tw-border-[#ECEDF1] tw-bg-white">
      <div className="tw-flex tw-items-center tw-gap-2.5">
        <button
          className="mobile-menu-btn tw-bg-white tw-border tw-border-[#E1E3E8] tw-rounded-lg tw-w-[34px] tw-h-[34px] tw-text-[15px] tw-text-[#4A4F59] tw-cursor-pointer"
          onClick={onMenuClick}
          aria-label="메뉴 열기"
        >
          ☰
        </button>
        <div className="tw-text-xl tw-font-medium tw-text-[#1F2430]">{title}</div>
      </div>
      <div className="tw-flex tw-items-center tw-gap-3">
        <div className="tw-relative tw-text-lg tw-text-[#4A4F59]">
          🔔<span className="tw-absolute -tw-top-1 -tw-right-1.5 tw-text-[9px] tw-bg-[#D94848] tw-text-white tw-rounded-full tw-px-1 tw-py-px">3</span>
        </div>
        <div className="tw-flex tw-items-center tw-gap-1.5">
          <div className="tw-w-[26px] tw-h-[26px] tw-rounded-full tw-bg-[#E9F2FF] tw-flex tw-items-center tw-justify-center tw-text-xs tw-text-[#2C5FF6]">e</div>
          <span className="hide-on-mobile tw-text-[13px] tw-text-[#4A4F59]">edmsTEST 님</span>
        </div>
      </div>
    </div>
  );
}

function StepBar({ current }: { current: number }) {
  const steps = ["메시지 설정 및 결제", "발송하기"];
  return (
    <div className="tw-flex tw-items-center tw-gap-2 tw-my-[18px]">
      {steps.map((label, i) => (
        <div key={label} className="tw-flex tw-items-center tw-gap-2">
          <div
            className={`tw-flex tw-items-center tw-gap-1.5 tw-px-3 tw-py-1.5 tw-rounded-full tw-text-[13px] tw-font-medium ${i === current ? "tw-bg-[#2C5FF6] tw-text-white" : "tw-bg-[#F1F2F5] tw-text-[#8A8F99]"
              }`}
          >
            <span
              className={`tw-w-[18px] tw-h-[18px] tw-rounded-full tw-inline-flex tw-items-center tw-justify-center tw-text-[11px] ${i === current ? "tw-bg-white/25 tw-text-white" : "tw-bg-[#DFE1E6] tw-text-[#8A8F99]"
                }`}
            >
              {i + 1}
            </span>
            {label}
          </div>
          {i < steps.length - 1 && <div className="tw-w-7 tw-h-px tw-bg-[#DFE1E6]" />}
        </div>
      ))}
    </div>
  );
}

interface AlertModalProps {
  icon?: string;
  iconBg?: string;
  iconColor?: string;
  title: string;
  message: ReactNode;
  primaryLabel: string;
  onPrimary: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
}
/** 단일/2버튼 알럿 팝업 공용 컴포넌트 — 모수조회 실패, 등록 확인, 안내 알럿 등에서 재사용 */
function AlertModal({ icon = "!", iconBg = "#FFF3D6", iconColor = "#8A6100", title, message, primaryLabel, onPrimary, secondaryLabel, onSecondary }: AlertModalProps) {
  return (
    <div className={overlayCls}>
      <div className={`${cardCls} tw-w-[320px] tw-text-center tw-p-6`}>
        <div
          className="tw-w-10 tw-h-10 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mx-auto tw-mb-3.5 tw-text-lg tw-font-medium"
          style={{ background: iconBg, color: iconColor }}
        >
          {icon}
        </div>
        <div className="tw-text-[14.5px] tw-font-medium tw-text-[#1F2430] tw-mb-1.5">{title}</div>
        <div className="tw-text-[12.5px] tw-text-[#767C88] tw-mb-5 tw-leading-relaxed">{message}</div>
        <div className="tw-flex tw-gap-2">
          {secondaryLabel && (
            <button className={`${secondaryBtnCls} tw-flex-1`} onClick={onSecondary}>{secondaryLabel}</button>
          )}
          <button className={`${primaryBtnCls} tw-flex-1 tw-py-[11px]`} onClick={onPrimary}>{primaryLabel}</button>
        </div>
      </div>
    </div>
  );
}

const CHARGE_PRESETS = [10000, 30000, 50000, 100000, 120000, 200000, 300000];
const RATE_ALIMTALK = 15;
const RATE_SMS = 15;
const RATE_LMS = 30;

interface PaymentWindowProps {
  cashBalance: number;
  cost: number | null;
  onCharge: (amount: number) => void;
  onClose: () => void;
}
function PaymentWindow({ cashBalance, cost, onCharge, onClose }: PaymentWindowProps) {
  const [selected, setSelected] = useState(() => {
    if (cost == null) return 10000;
    const needed = Math.max(cost - cashBalance, 0);
    return CHARGE_PRESETS.find((p) => p >= needed) ?? CHARGE_PRESETS[CHARGE_PRESETS.length - 1];
  });
  const [method, setMethod] = useState<"card" | "transfer" | "deposit">("card");
  const [agreed, setAgreed] = useState(false);

  const insufficient = cost != null && cashBalance < cost;
  const payAmount = Math.round(selected * VAT_MULTIPLIER);
  const alimtalkCount = Math.floor(selected / RATE_ALIMTALK);
  const smsCount = Math.floor(selected / RATE_SMS);
  const lmsCount = Math.floor(selected / RATE_LMS);

  return (
    <div className={overlayCls}>
      <div className="tw-bg-white tw-rounded-xl tw-border tw-border-[#E5E7EB] tw-w-[380px] tw-max-h-[90vh] tw-overflow-y-auto tw-shadow-[0_8px_30px_rgba(0,0,0,0.18)]">
        <div className="tw-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2.5 tw-border-b tw-border-[#EEF0F3] tw-bg-[#F5F6FA] tw-rounded-t-xl">
          <span className="tw-w-2.5 tw-h-2.5 tw-rounded-full tw-bg-[#E1E3E8]" />
          <span className="tw-text-[11px] tw-text-[#767C88] tw-flex-1 tw-text-center">EDMS - Chrome</span>
          <button onClick={onClose} aria-label="닫기" className="tw-bg-transparent tw-border-none tw-text-sm tw-text-[#9AA0AC] tw-cursor-pointer">×</button>
        </div>
        <div className="tw-px-4 tw-py-1.5 tw-border-b tw-border-[#EEF0F3] tw-text-[10.5px] tw-text-[#9AA0AC]">🔒 biztalkpay.co.kr/pay/request</div>

        <div className="tw-p-5">
          <div className="tw-text-[16px] tw-font-medium tw-text-[#1F2430] tw-text-center tw-mb-4">충전하기</div>

          {insufficient && (
            <div className="tw-bg-[#FDEBEC] tw-text-[#D94848] tw-text-[12px] tw-rounded-lg tw-px-3 tw-py-2.5 tw-mb-4">
              ⚠ 금액이 부족합니다. 충전해주세요. (부족액 {Math.max(cost! - cashBalance, 0).toLocaleString()}원)
            </div>
          )}

          <div className="tw-text-[13px] tw-font-medium tw-text-[#1F2430] tw-mb-2">결제상품 선택</div>
          <div className="tw-grid tw-grid-cols-2 tw-gap-2 tw-mb-4">
            {CHARGE_PRESETS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setSelected(p)}
                className={`tw-text-[13px] tw-font-medium tw-rounded-lg tw-py-2.5 tw-border tw-cursor-pointer ${selected === p ? "tw-bg-[#1F2A5C] tw-text-white tw-border-[#1F2A5C]" : "tw-bg-white tw-text-[#4A4F59] tw-border-[#E1E3E8]"
                  }`}
              >
                {p.toLocaleString()} 캐시
              </button>
            ))}
          </div>

          <div className="tw-bg-[#FAFBFC] tw-border tw-border-[#EEF0F3] tw-rounded-lg tw-p-3 tw-mb-4">
            <div className="tw-text-[13px] tw-font-medium tw-text-[#1F2430] tw-mb-2">메시지 타입 별 발송 가능 건수</div>
            <div className="tw-text-[13px] tw-text-[#1F2430] tw-mb-2">
              비즈팅 <b className="tw-text-[#5B4FE0]">{Math.floor(selected / BIZTALKING_UNIT_PRICE).toLocaleString()}건</b>
              <span className="tw-text-[#DDE0E6] tw-mx-1.5">|</span>
              알림톡 <b className="tw-text-[#5B4FE0]">{alimtalkCount.toLocaleString()}건</b>
              <span className="tw-text-[#DDE0E6] tw-mx-1.5">|</span>
              SMS <b className="tw-text-[#5B4FE0]">{smsCount.toLocaleString()}건</b>
              <span className="tw-text-[#DDE0E6] tw-mx-1.5">|</span>
              LMS <b className="tw-text-[#5B4FE0]">{lmsCount.toLocaleString()}건</b>
            </div>
            <div className="tw-text-[12px] tw-text-[#767C88] tw-flex tw-items-start tw-gap-1">
              <span>•</span>
              <span>
                <b className="tw-text-[#4A4F59]">발송 단가</b>{" "}
                비즈팅 {BIZTALKING_UNIT_PRICE}원 <span className="tw-text-[#DDE0E6] tw-mx-0.5">|</span>
                알림톡 {RATE_ALIMTALK}원 <span className="tw-text-[#DDE0E6] tw-mx-0.5">|</span>
                SMS {RATE_SMS}원 <span className="tw-text-[#DDE0E6] tw-mx-0.5">|</span>
                LMS {RATE_LMS}원
              </span>
            </div>
          </div>

          <div className="tw-text-[13px] tw-font-medium tw-text-[#1F2430] tw-mb-2">결제방법 선택</div>
          <div className="tw-grid tw-grid-cols-3 tw-gap-1.5 tw-mb-3">
            {[
              { key: "card", label: "신용카드" },
              { key: "transfer", label: "실시간 계좌이체" },
              { key: "deposit", label: "무통장 입금" },
            ].map((m) => (
              <button
                key={m.key}
                type="button"
                onClick={() => setMethod(m.key as typeof method)}
                className={`tw-text-[11.5px] tw-font-medium tw-rounded-lg tw-py-2 tw-border tw-cursor-pointer ${method === m.key ? "tw-bg-[#1F2A5C] tw-text-white tw-border-[#1F2A5C]" : "tw-bg-white tw-text-[#4A4F59] tw-border-[#E1E3E8]"
                  }`}
              >
                {m.label}
              </button>
            ))}
          </div>
          <div className="tw-text-[10.5px] tw-text-[#B7BBC4] tw-mb-4 tw-leading-relaxed">카드사별로 결제 가능 금액이 상이하며, 한도 금액을 초과할 경우 승인되지 않습니다.</div>

          <div className="tw-flex tw-justify-between tw-items-end tw-border-t tw-border-[#EEF0F3] tw-pt-3 tw-mb-4">
            <div className="tw-text-[12px] tw-text-[#9AA0AC]">결제금액<br /><span className="tw-text-[10.5px]">(VAT 포함)</span></div>
            <div className="tw-text-[20px] tw-font-medium tw-text-[#1F2430]">{payAmount.toLocaleString()}원</div>
          </div>

          <label className="tw-flex tw-items-start tw-gap-2 tw-text-[11px] tw-text-[#4A4F59] tw-mb-4 tw-cursor-pointer">
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="tw-mt-0.5" />
            <span>발신번호 등록 계정은 담당자·발신번호 명의자·결제자 간 관계 확인 또는 소명을 요청받을 수 있음을 확인했습니다.</span>
          </label>

          <button
            className={`tw-w-full tw-py-[13px] tw-rounded-lg tw-text-white tw-text-sm tw-font-medium tw-border-none ${agreed ? "tw-bg-[#1F2A5C] tw-cursor-pointer" : "tw-bg-[#C7CBD6] tw-cursor-not-allowed"
              }`}
            disabled={!agreed}
            onClick={() => agreed && onCharge(selected)}
          >
            충전하기
          </button>
        </div>
      </div>
    </div>
  );
}

function ConsentModal({ onClose, onAgree }: { onClose: () => void; onAgree: (marketing: boolean) => void }) {
  const [all, setAll] = useState(false);
  const [terms, setTerms] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const toggleAll = (v: boolean) => { setAll(v); setTerms(v); setMarketing(v); };
  useEffect(() => { setAll(terms && marketing); }, [terms, marketing]);

  return (
    <div className={overlayCls}>
      <div className={`${cardCls} tw-w-[380px] tw-px-[22px] tw-pt-[22px] tw-pb-5`}>
        <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
          <div className="tw-text-[15px] tw-font-medium tw-text-[#1F2430]">광고 집행 동의</div>
          <button onClick={onClose} aria-label="닫기" className="tw-bg-transparent tw-border-none tw-text-base tw-text-[#9AA0AC] tw-cursor-pointer">×</button>
        </div>
        <div className="tw-text-[12.5px] tw-text-[#767C88] tw-mb-3.5">최초 결제 시 한 번만 확인하는 동의예요.</div>

        <label className={`${consentRowCls} tw-font-medium tw-text-[13.5px]`}>
          <input type="checkbox" checked={all} onChange={(e) => toggleAll(e.target.checked)} />
          전체 동의하기
        </label>
        <div className="tw-border-t tw-border-[#EEF0F3] tw-my-2.5" />
        <label className={consentRowCls}>
          <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} />
          서비스 이용약관 동의 <span className="tw-text-[#D94848] tw-ml-0.5">(필수)</span>
        </label>
        <div className={consentBoxCls}>
          본 서비스는 등록된 매장 정보와 타겟팅 조건을 바탕으로 문자 메시지 광고를 자동 발송합니다. 이용자는 발송 전 메시지 내용과 타겟팅 조건을 확인할 책임이 있으며, 관련 법령 및 통신사 정책을 준수해야 합니다. 발송된 메시지는 취소가 불가하며, 결제된 캐시는 발송 건수에 따라 차감됩니다. (예시 약관 문구입니다.)
        </div>
        <label className={`${consentRowCls} tw-mt-2.5`}>
          <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
          마케팅 정보 수신 동의 <span className="tw-text-[#9AA0AC] tw-ml-0.5">(선택)</span>
        </label>
        <div className={consentBoxCls}>
          이지스터디 비즈의 신규 기능, 프로모션, 광고 상품 관련 정보를 이메일, 문자, 알림톡으로 받아보실 수 있습니다. 동의하지 않아도 서비스 이용에는 제한이 없습니다. (예시 약관 문구입니다.)
        </div>
        <div className="tw-flex tw-gap-2 tw-mt-4.5">
          <button className={`${secondaryBtnCls} tw-flex-1`} onClick={onClose}>취소</button>
          <button
            className={`${primaryBtnCls} tw-flex-1 tw-py-[11px] ${terms ? "" : "tw-opacity-40 tw-cursor-not-allowed"}`}
            disabled={!terms}
            onClick={() => terms && onAgree(marketing)}
          >
            동의하고 결제 계속하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PotentialCustomerFlow() {
  const [step, setStep] = useState<Step>("landing");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const [showConfirmRegister, setShowConfirmRegister] = useState(false);
  const [showPaymentWindow, setShowPaymentWindow] = useState(false);
  const [showStillInsufficientAlert, setShowStillInsufficientAlert] = useState(false);
  const [paymentContext, setPaymentContext] = useState<"register" | "sidebar" | null>(null);
  const [showTitleLengthAlert, setShowTitleLengthAlert] = useState(false);
  const [showStopRecurringConfirm, setShowStopRecurringConfirm] = useState(false);
  const [showRequiredFieldsAlert, setShowRequiredFieldsAlert] = useState(false);
  const [cashBalance, setCashBalance] = useState(20000);
  const [hasAgreed, setHasAgreed] = useState(false);
  const [hasSentBefore, setHasSentBefore] = useState(false);
  const [recurring, setRecurring] = useState(true);

  const [sido, setSido] = useState("서울특별시");
  const [gu, setGu] = useState("강남구");
  const [dong, setDong] = useState("대치동");
  // 등록된 매장 주소를 자동으로 불러왔다고 가정하는 상태. 불러오지 못했거나 사용자가 다른 주소를 쓰고 싶을 때 false로 바꿔 직접 선택하게 한다.
  const [regionAutoLoaded, setRegionAutoLoaded] = useState(true);
  const [templateId, setTemplateId] = useState(MESSAGE_TEMPLATES[0].id);
  const template = MESSAGE_TEMPLATES.find((t) => t.id === templateId) ?? MESSAGE_TEMPLATES[0];
  const [variableValues, setVariableValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(MESSAGE_TEMPLATES[0].variables.map((v) => [v.key, v.options[0] ?? ""]))
  );

  const handleTemplateChange = (id: string) => {
    setTemplateId(id);
    const next = MESSAGE_TEMPLATES.find((t) => t.id === id);
    if (next) setVariableValues(Object.fromEntries(next.variables.map((v) => [v.key, v.options[0] ?? ""])));
  };

  const setVariable = (key: string, value: string) => setVariableValues((prev) => ({ ...prev, [key]: value }));

  const dongOptions = REGION_DATA[sido]?.[gu] ?? [];
  const sidoGuOptions = REGION_DATA[sido] ? Object.keys(REGION_DATA[sido]) : [];
  const regionMatched = Boolean(REGION_DATA[sido]?.[gu]?.includes(dong));
  const isActive = hasSentBefore && recurring;
  // 캠페인이 이미 등록되어 정기발송이 진행 중이면, 이미 발송된(승인요청된) 문구를 임의로 바꿀 수 없도록 잠근다.
  const isLocked = isActive;

  const today = useMemo(() => new Date(), []);
  const sendDateObj = useMemo(() => addBusinessDays(addDays(today, 1), APPROVAL_LEAD_BUSINESS_DAYS), [today]);
  const sendDate = useMemo(() => formatDate(sendDateObj), [sendDateObj]);
  const sendDateTime = `${sendDate} 오전 10시`;
  // No.44: 발송일로부터 2일(달력일) 경과 시점에 통계 집계 + 알림톡
  const statsNotifyDate = useMemo(() => formatDate(addDays(sendDateObj, STATS_NOTIFY_DAYS)), [sendDateObj]);
  /*  // No.45: 발송 후 14일째 다음 회차 생성을 미리 시도하며 캐시를 사전 확인(부족 시 안내 알림톡)
   const cashPrecheckDate = useMemo(() => formatDate(addDays(sendDateObj, CASH_PRECHECK_DAYS)), [sendDateObj]); */
  // P-04~P-07: 초회 발송일의 '일(day)'을 anchor_day로 고정해 다음 달 동일 기준일 계산(28일 고정 아님)
  const anchorDay = sendDateObj.getDate();
  const nextRecurringDate = useMemo(() => formatDate(nextMonthlyRecurringDate(sendDateObj)), [sendDateObj]);

  const audience = useMemo(() => hashCount(`${sido}-${gu}-${dong}`), [sido, gu, dong]);
  const cost = audience * COST_PER_SEND;

  const [animatedAudience, setAnimatedAudience] = useState(0);
  useEffect(() => {
    if (step !== "result") return;
    setAnimatedAudience(0);
    const duration = 700;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setAnimatedAudience(Math.round(audience * progress));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [step, audience]);

  const goToCampaign = () => setStep(hasSentBefore ? "setup" : "landing");

  const startExtraction = () => {
    setShowErrorAlert(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (Math.random() < 0.3) setShowErrorAlert(true);
      else setStep("result");
    }, 1100);
  };

  const proceedToPayment = () => {
    if (hasAgreed) setShowConfirmRegister(true);
    else setShowConsent(true);
  };
  const hasEmptyRequiredField = template.variables.some((v) => {
    const value = (variableValues[v.key] ?? "").trim();

    if (!value) return true;

    if (v.key === "url" && !isValidHttpsUrl(value)) {
      return true;
    }

    return false;
  });

  const handlePayClick = () => {
    if (hasEmptyRequiredField) {
      setShowRequiredFieldsAlert(true);
      return;
    }
    proceedToPayment();
  };

  const openChargeFromSidebar = () => {
    setPaymentContext("sidebar");
    setShowPaymentWindow(true);
  };

  const completeRegistration = () => {
    setCashBalance((prev) => prev - cost);
    setHasSentBefore(true);
    setRecurring(true);
    setStep("done");
  };

  // 캐시가 충분하면 결제창 없이 바로 등록을 완료하고, 부족하면 충전창을 띄운다.
  const confirmRegister = () => {
    setShowConfirmRegister(false);
    if (cashBalance >= cost) {
      completeRegistration();
    } else {
      setPaymentContext("register");
      setShowPaymentWindow(true);
    }
  };

  // 결제창에서 충전을 완료했을 때 — 충분히 충전됐으면 캠페인 등록을 완료 처리한다.
  // 아직 부족하면 등록은 절대 진행하지 않고, "여전히 부족합니다" 알럿을 띄운 뒤 결제창으로 그대로 돌아간다.
  const handleChargeComplete = (amount: number) => {
    const newBalance = cashBalance + amount;
    setCashBalance(newBalance);
    if (paymentContext === "sidebar") {
      setShowPaymentWindow(false);
      return;
    }
    if (newBalance >= cost) {
      setShowPaymentWindow(false);
      completeRegistration();
    } else {
      setShowStillInsufficientAlert(true);
    }
  };

  const renderedTitle = substituteTemplateText(template.title, template.variables, variableValues);

  const checkTitleLength = () => {
    if (renderedTitle.length > TITLE_MAX_LENGTH) setShowTitleLengthAlert(true);
  };

  const headerTitle = step === "landing" || step === "result" ? "우리가게 광고하기" : "새 메시지 만들기";

  const phoneVar = template.variables.find((v) => v.key === "phone");
  const previewPhoneNumber = (phoneVar ? variableValues[phoneVar.key] : "") || "1670-0823";

  return (
    <div className="app-shell tw-flex tw-min-h-[760px] tw-bg-[#F7F8FA] tw-[font-family:-apple-system,_'Pretendard',_sans-serif]">
      <style>{`
        @media (max-width: 860px) {
          .app-sidebar {
            position: fixed; top: 0; left: 0; height: 100%; z-index: 60;
            transform: translateX(-100%); transition: transform 0.2s ease;
            box-shadow: 2px 0 16px rgba(0,0,0,0.12);
          }
          .app-sidebar.sidebar-open { transform: translateX(0); }
          .mobile-menu-btn { display: inline-flex !important; }
          .mobile-close-btn { display: inline-block !important; }
          .sidebar-overlay.open { display: block; }
          .setup-grid { grid-template-columns: 1fr !important; }
          .app-content { padding: 16px !important; }
          .app-header { padding: 14px 16px !important; }
          .hero-card { padding: 32px 20px !important; }
          .hide-on-mobile { display: none !important; }
        }
        .mobile-menu-btn, .mobile-close-btn { display: none; }
        .sidebar-overlay { display: none; position: fixed; inset: 0; background: rgba(20,22,28,0.45); z-index: 55; }
        .landing-split { display: flex; flex-direction: column; gap: 28px; }
        @media (min-width: 760px) {
          .landing-split { flex-direction: row; align-items: center; gap: 48px; }
          .landing-split > div { flex: 1; }
        }
      `}</style>

      <SideNav onGoToCampaign={goToCampaign} open={sidebarOpen} onClose={() => setSidebarOpen(false)} cashBalance={cashBalance} onOpenCharge={openChargeFromSidebar} />
      <div className={`sidebar-overlay${sidebarOpen ? " open" : ""}`} onClick={() => setSidebarOpen(false)} />

      <div className="tw-flex-1 tw-flex tw-flex-col tw-min-w-0">
        <TopHeader title={headerTitle} onMenuClick={() => setSidebarOpen(true)} />

        <div className="app-content tw-px-8 tw-py-6 tw-flex-1 tw-relative tw-flex tw-flex-col">
          {(step === "landing" || step === "setup" || step === "done") && (
            <div className="tw-flex tw-justify-between tw-items-center">
              <StepBar current={step === "done" ? 1 : 0} />
              {/* 문의하기 클릭 시 좌측 사이드바의 '1:1 문의 > 문의하기' 화면으로 이동 (실제 라우팅은 별도 구현 필요) */}
              <button className={inquiryBtnCls}>문의하기</button>
            </div>
          )}

          {step === "landing" && (
            <div className="tw-flex-1 tw-flex tw-items-center tw-justify-center tw-py-4">
              <div className={`hero-card ${cardCls} tw-p-10 tw-max-w-[1040px] tw-w-full tw-relative tw-overflow-hidden`}>
                <div className="landing-split tw-relative">
                  <div className="tw-min-w-0">
                    <span className={eyebrowBadgeCls}>✦ 광고 시작하기 전에</span>
                    <div className="tw-text-[32px] tw-font-medium tw-text-[#1F2430] tw-mt-3 tw-mb-3 tw-leading-tight">
                      우리 가게 잠재고객은<br />몇 명일까?
                    </div>
                    <div className="tw-text-sm tw-text-[#767C88] tw-mb-7 tw-leading-relaxed">
                      주변 상권에서 우리 가게에 관심 가질 만한 고객만 골라
                      <br />실시간으로 몇 명인지 먼저 확인해보세요.
                    </div>

                    <div className="tw-flex tw-flex-col tw-gap-2.5 tw-mb-8">
                      {[
                        { icon: "⚡", text: "실시간으로 관심 고객군을 분석해요" },
                        { icon: "📍", text: "우리 동네 상권에 맞춰 타겟팅해요" },
                        { icon: "🆓", text: "지금 내 가게 잠재고객을 무료로 확인해보세요!" },
                      ].map((f) => (
                        <div key={f.text} className="tw-flex tw-items-center tw-gap-2.5">
                          <span className="tw-w-7 tw-h-7 tw-rounded-full tw-bg-[#EEF4FF] tw-flex tw-items-center tw-justify-center tw-text-[13px] tw-shrink-0">{f.icon}</span>
                          <span className="tw-text-[13px] tw-text-[#4A4F59]">{f.text}</span>
                        </div>
                      ))}
                    </div>

                    <button className={`${primaryBtnCls} tw-inline-flex tw-items-center tw-gap-2`} onClick={startExtraction} disabled={isLoading}>
                      {isLoading ? "조회 중..." : "우리 가게 잠재고객은 몇 명일까?"}
                      {!isLoading && <span>→</span>}
                    </button>
                  </div>

                  <div className="tw-bg-[#F6F9FF] tw-rounded-2xl tw-p-6 tw-min-w-0">
                    <Hero />
                    <div className={`${cardCls} tw-bg-white tw-p-4 tw-mt-1`}>
                      <div className="tw-flex tw-items-center tw-justify-between tw-mb-2">
                        <span className="tw-text-[11px] tw-text-[#9AA0AC]">이렇게 확인돼요</span>

                      </div>
                      <div className="tw-flex tw-items-baseline tw-gap-1 tw-mb-3">
                        <span className="tw-text-[26px] tw-font-medium tw-text-[#2C5FF6]">1,248</span>
                        <span className="tw-text-sm tw-text-[#1F2430]">명</span>
                      </div>
                      <div className="tw-flex tw-gap-1.5 tw-flex-wrap">
                        <span className={chipCls}>📍 서울특별시 강남구</span>
                        {INTEREST_SEGMENTS.map((s) => (
                          <span key={s} className={`${chipCls} tw-bg-[#EEF4FF] tw-text-[#1F4FD6] tw-border-[#D7E4FF]`}>{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === "result" && (
            <div className="tw-flex-1 tw-flex tw-items-center tw-justify-center tw-py-4">
              <div className={`hero-card ${cardCls} tw-pt-10 tw-px-8 tw-pb-10 tw-max-w-[620px] tw-w-full tw-relative tw-overflow-hidden`}>
                <div className="tw-absolute -tw-top-[50px] -tw-left-[50px] tw-w-[130px] tw-h-[130px] tw-rounded-full tw-bg-[#F6F9FF]" />
                <div className="tw-relative">
                  <div className={infoBoxCls}>우리 가게에 관심이 있을 법한 타겟군만 골라, 실시간으로 관심 고객을 추출합니다.</div>
                  <div className="tw-text-center tw-my-8">
                    <div className="tw-text-[13px] tw-text-[#9AA0AC] tw-mb-1.5">예상 잠재고객 수</div>
                    <div className="tw-text-[44px] tw-font-medium tw-text-[#2C5FF6]">
                      {animatedAudience.toLocaleString()}<span className="tw-text-lg tw-ml-1 tw-text-[#1F2430]">명</span>
                    </div>
                  </div>
                  <div className="tw-mb-7">
                    <div className={`tw-flex tw-gap-1.5 tw-justify-center tw-flex-wrap ${regionMatched ? "tw-mb-2.5" : "tw-mb-1.5"}`}>
                      {regionMatched && <span className={chipCls}>📍 {sido} {gu} {dong}</span>}
                    </div>
                    <div className="tw-flex tw-gap-1.5 tw-justify-center tw-flex-wrap">
                      <InterestChips />
                    </div>
                    {!regionMatched && (
                      <div className="tw-text-[11.5px] tw-text-[#B58A1E] tw-text-center tw-mt-2">
                        ‼ 등록된 지역 정보가 없어 관심고객군 기준으로만 추출했어요.
                      </div>
                    )}
                  </div>
                  <button className={`${primaryBtnCls} tw-w-full tw-py-[13px]`} onClick={() => setStep("setup")}>우리 가게 잠재고객에게 우리 가게 알리기</button>
                </div>
              </div>
            </div>
          )}

          {step === "setup" && (
            <>
              <div className="tw-max-w-[1040px] tw-mx-auto">
                <div className="setup-grid tw-grid tw-grid-cols-[1fr_300px] tw-gap-4 tw-items-start">
                  <div className={`${cardCls} tw-p-6`}>
                    <div className={sectionTitleCls}>메시지 구성 &amp; 타겟조건</div>

                    {isLocked && (
                      <div className="tw-flex tw-items-center tw-gap-1.5 tw-text-[12.5px] tw-font-medium tw-text-[#2C5FF6] tw-bg-[#EEF4FF] tw-rounded-lg tw-px-3 tw-py-2.5 tw-mt-3.5">
                        🔒 이미 등록된 캠페인의 발송 문구예요. 문구를 바꾸려면 정기발송을 종료한 뒤 다시 시작해주세요.
                      </div>
                    )}

                    <div className="tw-mt-3.5 tw-mb-4">
                      <FieldLabel hint="템플릿마다 아래 가변영역 항목이 달라져요.">템플릿 선택</FieldLabel>
                      <div className="tw-flex tw-flex-wrap tw-gap-1.5">
                        {MESSAGE_TEMPLATES.map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => !isLocked && handleTemplateChange(t.id)}
                            disabled={isLocked}
                            className={`tw-text-[12.5px] tw-font-medium tw-rounded-full tw-px-3.5 tw-py-1.5 tw-border ${isLocked ? "tw-cursor-not-allowed tw-opacity-70" : "tw-cursor-pointer"} ${t.id === templateId
                                ? "tw-bg-[#2C5FF6] tw-text-white tw-border-[#2C5FF6]"
                                : "tw-bg-[#F5F6FA] tw-text-[#4A4F59] tw-border-[#ECEDF1]"
                              }`}
                          >
                            {t.name}
                          </button>
                        ))}
                      </div>
                      {templateId === "branch-intro" && (
                        <div className="tw-text-[12px] tw-font-medium tw-text-[#D94848] tw-mt-2 tw-leading-relaxed">
                          해당 템플릿은 URL이 포함되지 않아 반응률 확인이 어렵습니다.<br />
                          반응률을 확인하시려면 동일한 내용의 '성과측정 O' 템플릿을 이용해 주세요.
                        </div>
                      )}
                    </div>
                    <div className="tw-w-[432px] tw-bg-[#EDEFF2] tw-rounded-xl tw-p-4 tw-mb-4 tw-mx-auto">
                      <SktMessageMockup phoneNumber={previewPhoneNumber} title={renderTemplateTitle(template, variableValues)} titleLength={renderedTitle.length}>
                        {renderTemplateBody(template, variableValues)}
                      </SktMessageMockup>
                    </div>

                    <FieldLabel hint="이 템플릿의 가변영역이에요. 값을 바꾸면 위 제목·본문 미리보기에 바로 반영돼요. 모든 항목은 필수 입력입니다.">가변영역</FieldLabel>
                    <div className="tw-flex tw-flex-col tw-gap-3.5 tw-mb-5">
                      {template.variables.map((v) => {
                        const value = variableValues[v.key] ?? "";
                        const isEmpty = value.trim() === "";
                        const autoLoadable = v.options.length > 0;

                        const isInvalidUrl =
                          v.key === "url" &&
                          value.trim() !== "" &&
                          !isValidHttpsUrl(value);

                        const isInvalid = isEmpty || isInvalidUrl;
                        return (
                          <div key={v.key}>
                            <div className="tw-flex tw-items-center tw-gap-1 tw-mb-1">
                              <span className="tw-text-[12.5px] tw-text-[#4A4F59]">{v.label}</span>
                              {!isLocked && <span className="tw-text-[10.5px] tw-text-[#D94848] tw-font-medium">*필수</span>}
                            </div>
                            <DatalistField
                              listId={`var-${template.id}-${v.key}`}
                              value={value}
                              onChange={(val) => setVariable(v.key, val)}
                              options={v.options}
                              placeholder={`{${v.label}}`}
                              className=""
                              invalid={isInvalid && !isLocked}
                              disabled={isLocked}
                              onBlur={v.key === "branch" ? checkTitleLength : undefined}
                            />
                            {isLocked ? (
                              <div className="tw-text-[11px] tw-text-[#9AA0AC] tw-mt-1">
                                🔒 발송 확정된 값이에요.
                              </div>
                            ) : isInvalidUrl ? (
                              <div className="tw-text-[11px] tw-text-[#D94848] tw-mt-1">
                                ⚠ https://로 시작하는 올바른 URL을 입력해주세요.
                              </div>
                            ) : isEmpty ? (
                              <div className="tw-text-[11px] tw-text-[#D94848] tw-mt-1">
                                ⚠ {autoLoadable ? "등록된 값을 불러오지 못했어요." : "자동으로 불러올 수 없는 값이에요."} 직접 입력해주세요.
                              </div>
                            ) : (
                              <div className="tw-text-[11px] tw-text-[#9AA0AC] tw-mt-1">
                                {v.hint}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="tw-border-t tw-border-[#EEF0F3] tw-pt-4">
                      <FieldLabel>관심고객군</FieldLabel>
                      <div className={interestBoxCls}><InterestChips /></div>
                      <div className="tw-text-[11.5px] tw-text-[#9AA0AC] tw-mt-1 tw-mb-4">우리 가게에 관심 가질 확률이 높은 고객군이에요. 예상 잠재고객 수를 결정하는 핵심 조건입니다.</div>

                      {regionAutoLoaded ? (
                        <>
                          <LockedField
                            label="지역"
                            hint={isLocked ? undefined : "등록된 매장 주소를 자동으로 불러왔어요. 다른 주소로 보내려면 직접 선택할 수 있어요."}
                            value={<>📍 {sido} {gu} {dong}</>}
                            locked
                            className="tw-mb-1.5"
                          />
                          {!isLocked && (
                            <button
                              type="button"
                              className="tw-text-[11.5px] tw-text-[#2C5FF6] tw-bg-transparent tw-border-none tw-p-0 tw-cursor-pointer tw-mb-3"
                              onClick={() => setRegionAutoLoaded(false)}
                            >
                              다른 지역인가요? 직접 선택하기 →
                            </button>
                          )}
                        </>
                      ) : (
                        <>
                          <FieldLabel hint="등록된 매장 주소를 자동으로 불러왔어요. 다른 주소로 보내려면 직접 선택할 수 있어요.">지역</FieldLabel>
                          <div className="tw-flex tw-gap-1.5 tw-mb-1">
                            <select
                              className={fieldCls}
                              value={sido}
                              disabled={isLocked}
                              onChange={(e) => {
                                const v = e.target.value;
                                setSido(v);
                                const firstGu = Object.keys(REGION_DATA[v])[0];
                                setGu(firstGu);
                                setDong(REGION_DATA[v][firstGu][0]);
                              }}
                            >
                              {Object.keys(REGION_DATA).map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <select
                              className={fieldCls}
                              value={gu}
                              disabled={isLocked}
                              onChange={(e) => {
                                const v = e.target.value;
                                setGu(v);
                                setDong(REGION_DATA[sido][v][0]);
                              }}
                            >
                              {sidoGuOptions.map((g) => <option key={g} value={g}>{g}</option>)}
                            </select>
                            <select className={fieldCls} value={dong} disabled={isLocked} onChange={(e) => setDong(e.target.value)}>
                              {dongOptions.map((d) => <option key={d} value={d}>{d}</option>)}
                            </select>
                          </div>
                          <div className={`tw-text-[11.5px] tw-mb-4 ${regionMatched ? "tw-text-[#3B8A5A]" : "tw-text-[#B58A1E]"}`}>
                            {regionMatched ? "✓ 지역이 설정되었습니다." : "‼ 등록된 지역 정보가 없어 관심고객군 기준으로 추출돼요."}
                          </div>
                        </>
                      )}

                      <LockedField label="발송 방식" value="RCS/일반 (텍스트)" />
                      <LockedField label="발송 일시" value={sendDateTime} locked className="tw-mb-1" />
                      <div className="tw-text-xs tw-text-[#B7BBC4] tw-mt-1.5">* 등록일 기준 영업일 +{APPROVAL_LEAD_BUSINESS_DAYS}일 뒤로 고정 발송됩니다.</div>
                    </div>
                  </div>

                  <div className={`${cardCls} tw-p-6`}>
                    <div className={sectionTitleCls}>결제 정보</div>

                    <div className="tw-flex tw-justify-between tw-items-center tw-mt-3.5 tw-mb-1.5">
                      <span className="tw-text-[13.5px] tw-font-medium tw-text-[#1F2430]">정기발송</span>
                      <button
                        onClick={() => isActive && setShowStopRecurringConfirm(true)}
                        className={`${toggleTrackCls} tw-bg-[#2C5FF6] ${isActive ? "tw-opacity-100 tw-cursor-pointer" : "tw-opacity-50 tw-cursor-not-allowed"}`}
                        aria-label="정기발송 토글"
                        disabled={!isActive}
                      >
                        <span className={toggleThumbCls} />
                      </button>
                    </div>
                    <div className="tw-text-xs tw-text-[#9AA0AC] tw-mb-4.5 tw-leading-relaxed">
                      {isActive
                        ? "* 정기발송이 진행 중이에요. OFF 시 다음 회차부터 중단되고, 이미 등록된 회차는 예정대로 발송돼요."
                        : "* 정기발송 전용 서비스예요. 결제하면 현재 정보로 정기발송이 바로 시작돼요."}
                    </div>

                  <div className="tw-text-xs tw-text-[#9AA0AC] tw-mb-1">예상 발송 건수</div>
                    <div className="tw-text-[22px] tw-font-medium tw-text-[#1F2430] tw-mb-4">{audience.toLocaleString()}건</div>
                    <div className="tw-text-xs tw-text-[#9AA0AC] tw-mb-1">예상 금액</div>
                    <div className="tw-text-[22px] tw-font-medium tw-text-[#2C5FF6] tw-mb-1">{cost.toLocaleString()}원</div>
                    <div className="tw-text-xs tw-text-[#9AA0AC] tw-mb-1">보유 캐시</div>
                    <div className="tw-text-[13px] tw-font-medium tw-text-[#4A4F59] tw-mb-4">{cashBalance.toLocaleString()} 캐시</div>
                    <div className="tw-text-xs tw-text-[#B7BBC4] tw-mb-5">(VAT 별도)</div>

                    {isActive && cashBalance < cost && (
                      <div className="tw-bg-[#FDEBEC] tw-text-[#D94848] tw-text-[12px] tw-rounded-lg tw-px-3 tw-py-2.5 tw-mb-3 tw-leading-relaxed">
                        ⚠ 다음 회차 발송에 필요한 캐시가 부족해요. 미리 충전해주세요. (부족액 {Math.max(cost - cashBalance, 0).toLocaleString()}원)
                      </div>
                    )}

                    {!isActive && (
                      <button className={`${primaryBtnCls} tw-w-full tw-py-[13px] tw-mb-2`} onClick={handlePayClick}>등록하기</button>
                    )}
                    <button className={`${secondaryBtnCls} tw-w-full tw-py-[13px]`} onClick={openChargeFromSidebar}>충전하기</button>
                  </div>
                </div>

                <div className={`${cardCls} tw-mt-8 tw-p-6 tw-bg-[#FFF9EC] tw-border-[#F5E4B8]`}>
                  <div className="tw-text-[13px] tw-font-medium tw-text-[#8A6100] tw-mb-2">안내사항</div>
                  <ul className="tw-m-0 tw-pl-4.5 tw-text-[12.5px] tw-text-[#8A6100] tw-leading-loose tw-list-disc">
                    <li>캠페인 집행 후 {STATS_NOTIFY_DAYS}일 뒤 통계가 알림톡으로 발송돼요.</li>
                    <li>정기발송은 최초 발송일의 날짜를 기준으로 매월 같은 날짜에 진행돼요. 영업일 (해당 월에 그 날짜가 없으면 말일에 발송,영업일이 아닐 경우 가장 가까운 영업일에 발송)</li>
                    <li>캐시가 부족하면 안내 알림톡이 발송되니 미리 충전해주세요.</li>
                    <li>캐시 부족이 자동발송이 2회 스킵되면 정기발송이 중지돼요.</li>
                    <li>정기발송을 증지하면 다음 회차부터 중단돼요 — 이미 등록된 회차는 예정대로 발송되며 취소가 어려워요.</li>
                    <li>발송은 최대 {MAX_SEND.toLocaleString()}건까지 가능하며, 모수 추출 결과에 따라 변동될 수 있어요.</li>
                    <li>성과측정X 템플릿은 URL이 포함되지 않아 반응률 확인이 어렵습니다. 반응률을 확인하시려면 동일한 내용의 ‘성과측정 O’ 템플릿을 이용해 주세요.</li>
                    <li>정기발송 캠페인은 발송 시점부터 +14일, +21일차에 생성 시도를 하므로, 해당 일에 생성 시 최소가 불가능합니다. </li>
                  </ul>
                </div>
              </div>
            </>
          )}

          {step === "done" && (
            <div className={`${cardCls} tw-p-11 tw-max-w-[600px] tw-mx-auto`}>
              <div className="tw-text-center tw-mb-6">
                <div className="tw-w-11 tw-h-11 tw-rounded-full tw-bg-[#E9F2FF] tw-flex tw-items-center tw-justify-center tw-mx-auto tw-mb-4 tw-text-[#2C5FF6] tw-text-xl tw-font-medium">✓</div>
                <div className="tw-text-lg tw-font-medium tw-text-[#1F2430]">결제가 완료됐어요</div>
              </div>

              <div className={urgentBoxCls}>
                <div className={urgentRowCls}>⚡ 다음회차부터 정기발송이 진행되며, <b>2회 연속 캐시 부족으로 발송이 스킵될 시 자동으로 중지돼요.</b></div>
                <div className={urgentRowCls}>⚡ 등록된 캠페인은 <b>취소할 수 없어요.</b></div>
                <div className={urgentRowCls}>⚡ 발송 통계는 카카오톡 <b>비즈팅 채널</b>로 발송됩니다.</div>
                <div className={urgentRowCls}>⚡ 다음 정기발송일이 영업일이 아닌 경우, <b>가장 가까운 영업일</b>에 발송됩니다.</div>
              </div>

              <div className={`${cardCls} tw-bg-[#FAFBFC] tw-p-4 tw-mb-5`}>
                <ReadonlyRow label="발송 일시" value={sendDateTime} locked />
                <ReadonlyRow label="발송 통계 알림톡" value={statsNotifyDate} />
                <ReadonlyRow label="정기발송 기준일" value={`매월 ${anchorDay}일`} />
                <ReadonlyRow label="다음 정기발송일" value={nextRecurringDate} />
              </div>
              <div className="tw-text-center">
                <button className={secondaryBtnCls} onClick={() => setStep("setup")}>메시지 설정으로 돌아가기</button>
              </div>
            </div>
          )}

          {showErrorAlert && (
            <AlertModal
              iconBg="#FDEBEC" iconColor="#D94848"
              title="모수를 추출하지 못했어요"
              message="지속적으로 모수추출이 되지 않을 경우, 1:1문의하기 혹은 문의하기 버튼을 통해 문의해주세요."
              secondaryLabel="닫기" onSecondary={() => setShowErrorAlert(false)}
              primaryLabel="다시 시도" onPrimary={startExtraction}
            />
          )}
          {showConsent && (
            <ConsentModal onClose={() => setShowConsent(false)} onAgree={() => { setHasAgreed(true); setShowConsent(false); setShowConfirmRegister(true); }} />
          )}
          {showConfirmRegister && (
            <AlertModal
              title="캠페인을 등록하시겠어요?"
              message={<>등록 후에는 캠페인을 취소할 수 없어요.<br />그래도 등록을 진행하시겠어요?</>}
              secondaryLabel="취소" onSecondary={() => setShowConfirmRegister(false)}
              primaryLabel="등록 진행하기" onPrimary={confirmRegister}
            />
          )}
          {showPaymentWindow && (
            <PaymentWindow
              cashBalance={cashBalance}
              cost={paymentContext === "register" ? cost : null}
              onCharge={handleChargeComplete}
              onClose={() => setShowPaymentWindow(false)}
            />
          )}
          {showStillInsufficientAlert && (
            <AlertModal
              title="캐시가 아직 부족해요"
              message={`충전 금액이 부족합니다. 추가충전을 진행해주세요. (부족액 ${Math.max(cost - cashBalance, 0).toLocaleString()}원)`}
              primaryLabel="확인" onPrimary={() => setShowStillInsufficientAlert(false)}
            />
          )}
          {showTitleLengthAlert && (
            <AlertModal
              title="제목 글자수를 확인해주세요"
              message={`메시지 제목이 ${TITLE_MAX_LENGTH}자를 넘었어요. 문자 발송 시 제목이 잘릴 수 있으니 다시 한번 확인해주세요.`}
              primaryLabel="확인" onPrimary={() => setShowTitleLengthAlert(false)}
            />
          )}
          {showStopRecurringConfirm && (
            <AlertModal
              icon="⏸" iconBg="#EEF4FF" iconColor="#2C5FF6"
              title="정기발송을 종료할까요?"
              message={
                <span className="tw-block tw-text-left">
                  <b>등록된 캠페인</b>: {sendDateTime} 예정대로 발송돼요.(취소 불가)<br />
                  <b>발송중단 캠페인</b>: {nextRecurringDate} 부터 발송되지 않아요.<br />
                  <b>마지막 발송일</b>: {sendDate}
                </span>
              }
              secondaryLabel="취소" onSecondary={() => setShowStopRecurringConfirm(false)}
              primaryLabel="정기발송 종료" onPrimary={() => { setRecurring(false); setShowStopRecurringConfirm(false); }}
            />
          )}
          {showRequiredFieldsAlert && (
            <AlertModal
              title="필수 입력값을 확인해주세요"
              message="가변영역은 모두 필수 입력 항목이에요. 비어 있거나 잘못 적힌 항목을 채워주세요."
              primaryLabel="확인" onPrimary={() => setShowRequiredFieldsAlert(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
import { useEffect, useRef, useMemo } from "react";
//[수정] 라입브러리 사용, 이미지 수정
import JsBarcode from 'jsbarcode';
import IMG_BOX from '../../assets/IMG_BOX.png'
import IMG_HERO from '../../assets/IMG_HERO.png'
import IMG_STICK from '../../assets/IMG_STICK.png'

// ─── Inline SVG Icons (lucide-style, no external dep) ───
const IconStore = () => (
  <svg className="tw-w-5 tw-h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l1-5h16l1 5"/>
    <path d="M3 9h18v11a1 1 0 01-1 1H4a1 1 0 01-1-1V9z"/>
    <path d="M9 21V12h6v9"/>
  </svg>
);
const IconUserPlus = () => (
  <svg className="tw-w-5 tw-h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <line x1="19" y1="8" x2="19" y2="14"/>
    <line x1="22" y1="11" x2="16" y2="11"/>
  </svg>
);
const IconShoppingBag = () => (
  <svg className="tw-w-5 tw-h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);
const IconGift = () => (
  <svg className="tw-w-5 tw-h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12"/>
    <rect x="2" y="7" width="20" height="5"/>
    <line x1="12" y1="22" x2="12" y2="7"/>
    <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/>
    <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/>
  </svg>
);
const IconCalendar = () => (
  <svg className="tw-w-4 tw-h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IconAlert = () => (
  <svg className="tw-w-4 tw-h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);
const IconGlobe = () => (
  <svg className="tw-w-5 tw-h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
  </svg>
);
const IconTag = () => (
  <svg className="tw-w-3.5 tw-h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);
const IconCheck = () => (
  <svg className="tw-w-3 tw-h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconClock = () => (
  <svg className="tw-w-6 tw-h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);
// [수정]JsBarcode 라이브러리 사용)
//[수정] URL ?code=XXX 파라미터로 받은 쿠폰 코드를 canvas에 CODE128 바코드로 렌더링
function useBarcode(code: string, canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    // code가 빈 문자열이면 바코드를 그리지 않음 (쿠폰 없는 경우)
    if (canvasRef.current && code) {
      JsBarcode(canvasRef.current, code, {
        format: "CODE128",   
        width: 2,            
        height: 80,          
        displayValue: false,
        background: "#ffffff",
        lineColor: "#1A1208",
      });
    }
  }, [code]); // code가 바뀔 때마다 재렌더링
}
// ─── Step Item ───
interface StepItemProps {
  num: number;
  label: string;
  sub?: string | null;
  icon: React.ReactNode;
}
const StepItem = ({ num, label, sub, icon }: StepItemProps) => (
  <div className="tw-flex tw-items-start tw-gap-3">
    <div className="tw-w-8 tw-h-8 tw-rounded-full tw-bg-[#C8000F] tw-text-white tw-flex tw-items-center tw-justify-center tw-flex-shrink-0 tw-shadow-[0_3px_10px_rgba(200,0,15,0.28)] tw-mt-0.5">
      <span className="tw-font-bold tw-text-[13px]" style={{fontFamily:"'Noto Sans KR',sans-serif"}}>{num}</span>
    </div>
    <div className="tw-flex-1 tw-pt-0.5">
      <p className="tw-text-[13.5px] tw-font-medium tw-text-[#1A1208] tw-leading-snug" style={{fontFamily:"'Noto Sans KR',sans-serif"}}>{label}</p>
      {sub && <p className="tw-text-[11px] tw-text-[#AAAAAA] tw-mt-0.5" style={{fontFamily:"'Noto Sans KR',sans-serif"}}>{sub}</p>}
    </div>
    <div className="tw-w-6 tw-h-6 tw-rounded-full tw-bg-[#FFF0F0] tw-flex tw-items-center tw-justify-center tw-text-[#C8000F] tw-flex-shrink-0 tw-mt-1">
      {icon}
    </div>
  </div>
);

// ─── Main Page Component ───
export default function JKJEventPage(){
  //[수정] searchParams: 매 렌더마다 재생성을 막기 위해 useMemo로 감싸기.
  //URL 쿼리 파라미터 ?code=XXX 에서 쿠폰 코드 읽어오기.
  const searchParams = useMemo(() =>
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams(""),
  []);
  // 실제 쿠폰 적용 시 FALLBACK_CODE 주석처리 (테스트용).
  const FALLBACK_CODE = "SKGUZESN49SEKQA2"; // ← 임시 테스트용 쿠폰 코드
  const couponCode: string = useMemo(() => {
    const codeParam = searchParams.get("code");
    return codeParam ? codeParam.toUpperCase() : FALLBACK_CODE; // URL 파라미터 없으면 임시 코드 표시
  }, [searchParams]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  //[수정] useBarcode 훅 호출
  useBarcode(couponCode, canvasRef);

  return (
    <div className="tw-min-h-screen tw-bg-[#F8F4EE] tw-overflow-x-hidden" style={{fontFamily:"'Noto Sans KR',sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;600;700;900&family=Noto+Sans+KR:wght@300;400;500;700&display=swap');
        @keyframes fadeDown{from{opacity:0;transform:translateY(-14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        .jkj-anim-down{animation:fadeDown 0.55s ease both}
        .jkj-anim-up{animation:fadeUp 0.55s ease both}
        .d1{animation-delay:0.1s}.d2{animation-delay:0.2s}.d3{animation-delay:0.3s}
        .d4{animation-delay:0.4s}.d5{animation-delay:0.5s}.d6{animation-delay:0.6s}.d7{animation-delay:0.7s}
        .ticket-cut-l{position:absolute;left:-14px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:#F8F4EE;border-radius:50%;box-shadow:inset -2px 0 5px rgba(200,0,15,0.08);z-index:2}
        .ticket-cut-r{position:absolute;right:-14px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:#F8F4EE;border-radius:50%;box-shadow:inset 2px 0 5px rgba(200,0,15,0.08);z-index:2}
      `}</style>

      {/* ── HERO ── */}
      <div className="tw-relative tw-overflow-hidden tw-pt-10 tw-pb-16 tw-px-5 tw-text-center"
        style={{background:"linear-gradient(160deg,#8B0008 0%,#C8000F 55%,#E01020 100%)"}}>
        {/* Top accent stripe */}
        <div className="tw-absolute tw-top-0 tw-left-0 tw-right-0 tw-h-[5px]"
          style={{background:"repeating-linear-gradient(90deg,#D4A843 0,#D4A843 12px,transparent 12px,transparent 22px)"}}/>
        {/* Ambient glow */}
        <div className="tw-absolute tw-inset-0 tw-pointer-events-none"
          style={{background:"radial-gradient(ellipse 60% 50% at 18% 28%,rgba(255,255,255,0.07) 0%,transparent 70%),radial-gradient(ellipse 45% 40% at 85% 72%,rgba(212,168,67,0.09) 0%,transparent 70%)"}}/>

        {/* Brand row */}
        <div className="tw-relative jkj-anim-down tw-flex tw-items-center tw-justify-center tw-gap-2.5 tw-mb-5">
          <div className="tw-w-1 tw-h-1 tw-rounded-full tw-bg-[#D4A843]"/>
          <span className="tw-text-[13px] tw-font-bold tw-text-white/90 tw-tracking-[3px]"
            style={{fontFamily:"'Noto Serif KR',serif"}}>
            JUNG KWAN JANG · 정관장
          </span>
          <div className="tw-w-1 tw-h-1 tw-rounded-full tw-bg-[#D4A843]"/>
        </div>

        {/* Badge */}
        <div className="jkj-anim-down d1 tw-inline-block tw-bg-[#D4A843] tw-text-[#8B0008] tw-text-[10px] tw-font-bold tw-tracking-[2px] tw-px-4 tw-py-1.5 tw-rounded-full tw-mb-4">
          JUNE 2026 · SPECIAL EVENT
        </div>

        {/* Title */}
        <h1 className="jkj-anim-down d2 tw-text-[30px] tw-font-black tw-text-white tw-leading-[1.25] tw-mb-2"
          style={{fontFamily:"'Noto Serif KR',serif"}}>
          6월 한정<br /><span className="tw-text-[#D4A843]">특별 증정</span> 이벤트
        </h1>
        <p className="jkj-anim-down d3 tw-text-[13px] tw-text-white/75 tw-leading-relaxed tw-mb-8">
          정관장  한국 홍삼의 정수<br />에브리타임 오리지널과 함께하세요!
        </p>

        {/* Product stack */}
        <div className="jkj-anim-up d4 tw-relative tw-flex tw-items-end tw-justify-center">
          <img src={IMG_BOX} alt="에브리타임 박스"
            className="tw-w-[130px] tw-h-[130px] tw-object-contain tw-relative tw-z-[1]"
            style={{transform:"rotate(-5deg) translateX(14px)",filter:"drop-shadow(0 12px 28px rgba(0,0,0,0.35))"}}/>
          <img src={IMG_HERO} alt="에브리타임 모델"
            className="tw-w-[164px] tw-h-[164px] tw-object-contain tw-relative tw-z-[3]"
            style={{filter:"drop-shadow(0 14px 32px rgba(0,0,0,0.4))"}}/>
          <img src={IMG_STICK} alt="에브리타임 스틱"
            className="tw-w-[90px] tw-h-[130px] tw-object-contain tw-relative tw-z-[2]"
            style={{transform:"rotate(5deg) translateX(-14px)",filter:"drop-shadow(0 10px 24px rgba(0,0,0,0.3))"}}/>
        </div>
      </div>

      {/* Wave */}
      <div className="tw-w-full tw-h-12 tw-bg-[#F8F4EE]"
        style={{clipPath:"ellipse(56% 100% at 50% 100%)",marginTop:"-2px"}}/>

      {/* ── ONLINE EVENT – Coming Soon ── */}
      <div className="jkj-anim-up d3 tw-px-4 tw-mb-5 tw--mt-4">
        <div className="tw-bg-white tw-rounded-2xl tw-overflow-hidden tw-shadow-[0_3px_20px_rgba(0,0,0,0.07)]">
          <div className="tw-flex tw-items-center tw-gap-3.5 tw-px-5 tw-py-4"
            style={{background:"linear-gradient(135deg,#2C2C2C 0%,#3D3D3D 100%)"}}>
            <div className="tw-w-9 tw-h-9 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-white tw-flex-shrink-0"
              style={{background:"rgba(255,255,255,0.12)"}}>
              <IconGlobe/>
            </div>
            <div>
              <p className="tw-text-[10px] tw-text-white/55 tw-tracking-[1.5px] tw-uppercase tw-mb-0.5">ONLINE EVENT</p>
              <p className="tw-text-[17px] tw-font-bold tw-text-white tw-leading-tight" style={{fontFamily:"'Noto Serif KR',serif"}}>온라인 6월 행사</p>
            </div>
            <div className="tw-ml-auto tw-border tw-border-white/20 tw-rounded-full tw-px-3 tw-py-1"
              style={{background:"rgba(255,255,255,0.08)"}}>
              <span className="tw-text-[10px] tw-text-white/65 tw-font-medium tw-tracking-wide">준비 중</span>
            </div>
          </div>
          <div className="tw-px-5 tw-py-6 tw-text-center">
            <div className="tw-w-12 tw-h-12 tw-mx-auto tw-mb-3 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-[#C8A050]"
              style={{background:"#F5F0E8"}}>
              <IconClock/>
            </div>
            <p className="tw-text-[15px] tw-font-bold tw-text-[#2C1810] tw-mb-1.5" style={{fontFamily:"'Noto Serif KR',serif"}}>곧 공개됩니다</p>
            <p className="tw-text-[12px] tw-text-[#999] tw-leading-relaxed">
              온라인 이벤트 내용이 곧 업데이트될 예정입니다.<br/>많은 관심과 기대 부탁드립니다.
            </p>
          </div>
        </div>
      </div>

      {/* ── OFFLINE EVENT ── */}
      <div className="jkj-anim-up d4 tw-px-4 tw-mb-5">
        <div className="tw-bg-white tw-rounded-2xl tw-overflow-hidden tw-shadow-[0_3px_20px_rgba(200,0,15,0.10)]">
          {/* Header */}
          <div className="tw-flex tw-items-center tw-gap-3.5 tw-px-5 tw-py-4"
            style={{background:"linear-gradient(135deg,#C8000F 0%,#8B0008 100%)"}}>
            <div className="tw-w-9 tw-h-9 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-white tw-flex-shrink-0"
              style={{background:"rgba(255,255,255,0.15)"}}>
              <IconStore/>
            </div>
            <div>
              <p className="tw-text-[10px] tw-text-white/60 tw-tracking-[1.5px] tw-uppercase tw-mb-0.5">OFFLINE EVENT</p>
              <p className="tw-text-[17px] tw-font-bold tw-text-white tw-leading-tight" style={{fontFamily:"'Noto Serif KR',serif"}}>오프라인 6월 행사</p>
            </div>
          </div>

          <div className="tw-px-5 tw-pt-5 tw-pb-6">
            {/* Gift highlight */}
            <div className="tw-relative tw-rounded-xl tw-px-5 tw-py-4 tw-text-center tw-mb-5 tw-border tw-border-[#F5D0D2]"
              style={{background:"linear-gradient(135deg,#FFF8F2 0%,#FFF0F0 100%)"}}>
              <div className="tw-absolute tw--top-4 tw-left-1/2 tw--translate-x-1/2 tw-w-8 tw-h-8 tw-rounded-full tw-bg-[#C8000F] tw-flex tw-items-center tw-justify-center tw-text-white tw-shadow-md">
                <IconGift/>
              </div>
              <p className="tw-text-[11px] tw-text-[#999] tw-mb-1 tw-mt-1">신규가입 + 10만원 이상 구매 시</p>
              <p className="tw-text-[21px] tw-font-black tw-text-[#C8000F] tw-leading-tight" style={{fontFamily:"'Noto Serif KR',serif"}}>에브리타임 오리지널</p>
              <p className="tw-text-[19px] tw-font-black tw-text-[#C8000F] tw-leading-tight tw-mb-1.5" style={{fontFamily:"'Noto Serif KR',serif"}}>
                <span className="tw-text-[#D4A843]">20포</span> 추가 증정!
              </p>
              <div className="tw-flex tw-items-center tw-justify-center tw-gap-1.5">
                <div className="tw-w-4 tw-h-4 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-[#C8000F]"
                  style={{background:"rgba(200,0,15,0.1)"}}>
                  <IconCheck/>
                </div>
                <span className="tw-text-[11px] tw-text-[#888]">전국 오프라인 매장 적용</span>
              </div>
            </div>

            {/* Steps */}
            <div className="tw-flex tw-flex-col tw-gap-3.5">
              <StepItem num={1} label="가까운 정관장 오프라인 매장 방문" sub="전국 모든 매장 적용 가능" icon={<IconStore/>}/>
              <StepItem num={2} label="정관장 회원 신규 가입" sub={null} icon={<IconUserPlus/>}/>
              <StepItem num={3} label="10만원 이상 구매 후 쿠폰 제시" sub="본 페이지 하단 쿠폰 제시" icon={<IconShoppingBag/>}/>
              <StepItem num={4} label="에브리타임 오리지널 20포 수령!" sub={null} icon={<IconGift/>}/>
            </div>

            {/* Divider */}
            <div className="tw-h-px tw-my-5"
              style={{background:"linear-gradient(90deg,transparent,#E5D5C5,transparent)"}}/>

            {/* Period bar */}
            <div className="tw-flex tw-items-center tw-justify-between tw-rounded-xl tw-px-4 tw-py-3.5 tw-bg-[#1A1208]">
              <div>
                <div className="tw-flex tw-items-center tw-gap-1.5 tw-mb-1">
                  <span className="tw-text-[#D4A843]"><IconCalendar/></span>
                  <p className="tw-text-[10px] tw-text-[#D4A843] tw-tracking-[1.5px] tw-uppercase tw-font-semibold">행사 기간</p>
                </div>
                <p className="tw-text-[14px] tw-font-bold tw-text-white" style={{fontFamily:"'Noto Serif KR',serif"}}>2026. 06. 01 — 06. 30</p>
              </div>
              <div className="tw-text-right">
                <p className="tw-text-[10px] tw-text-white/40 tw-mb-0.5">기간 한정</p>
                <p className="tw-text-[12px] tw-text-white/65 tw-font-semibold" style={{fontFamily:"'Noto Serif KR',serif"}}>한 달간</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── NOTICE ── */}
      <div className="jkj-anim-up d5 tw-px-4 tw-mb-6">
        <div className="tw-bg-white tw-rounded-2xl tw-px-5 tw-py-5 tw-shadow-[0_2px_14px_rgba(0,0,0,0.05)]">
          <div className="tw-flex tw-items-center tw-gap-2 tw-mb-3.5">
            <span className="tw-text-[#C8000F]"><IconAlert/></span>
            <span className="tw-text-[11px] tw-font-bold tw-text-[#888] tw-tracking-[1.5px] tw-uppercase">유의사항</span>
          </div>
          <ul className="tw-flex tw-flex-col tw-gap-2.5">
            {[
              "본 이벤트는 신규 가입 회원에 한하여 적용됩니다.",
              "전국 정관장 오프라인 매장에서 모두 적용 가능합니다.",
              "중복 수령은 불가하며, 1인 1회에 한해 적용됩니다.",
              "10만원 이상 구매 시에만 증정품이 제공됩니다.",
              "이벤트 기간(6월 한 달) 내에만 유효한 쿠폰입니다.",
              "재고 소진 시 조기 종료될 수 있습니다.",
            ].map((note: string, i: number) => (
              <li key={i} className="tw-flex tw-items-start tw-gap-2">
                <div className="tw-w-1 tw-h-1 tw-rounded-full tw-bg-[#C8000F] tw-mt-[7px] tw-flex-shrink-0"/>
                <p className="tw-text-[12px] tw-text-[#777] tw-leading-snug">{note}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── COUPON TICKET ── */}
      <div className="jkj-anim-up d6 tw-px-4 tw-mb-10">
        <p className="tw-text-[18px] tw-font-bold tw-text-[#8B0008] tw-text-center tw-mb-1.5" style={{fontFamily:"'Noto Serif KR',serif"}}>쿠폰 확인하기</p>
        <p className="tw-text-[12px] tw-text-[#999] tw-text-center tw-mb-4">아래 쿠폰을 매장 직원에게 제시해 주세요</p>

        <div className="tw-relative tw-bg-white tw-rounded-2xl tw-overflow-hidden tw-shadow-[0_6px_28px_rgba(200,0,15,0.13)] tw-border tw-border-[#F5D0D2]">
          <div className="ticket-cut-l"/>
          <div className="ticket-cut-r"/>

          {/* Ticket top */}
          <div className="tw-relative tw-px-6 tw-py-5 tw-text-center"
            style={{background:"linear-gradient(135deg,#C8000F 0%,#8B0008 100%)"}}>
            <div className="tw-absolute tw-bottom-0 tw-left-[10%] tw-right-[10%] tw-h-px"
              style={{background:"repeating-linear-gradient(90deg,rgba(255,255,255,0.25) 0,rgba(255,255,255,0.25) 5px,transparent 5px,transparent 11px)"}}/>
            <p className="tw-text-[10px] tw-text-white/60 tw-tracking-[2px] tw-uppercase tw-mb-1.5">JUNG KWAN JANG</p>
            <p className="tw-text-[19px] tw-font-black tw-text-white tw-leading-tight" style={{fontFamily:"'Noto Serif KR',serif"}}>
              에브리타임 오리지널 <span className="tw-text-[#D4A843]">20포</span> 증정
            </p>
            <p className="tw-text-[11px] tw-text-white/60 tw-mt-1.5">신규가입 + 10만원 이상 구매 시 해당 이벤트 참여가 가능합니다.</p>
          </div>

          {/* Ticket bottom */}
          <div className="tw-px-6 tw-py-5 tw-text-center">
             {/*[수정] 코드길이수정*/}
            <div className="tw-rounded-xl tw-py-3 tw-px-4 tw-mb-4 tw-border-2 tw-border-dashed tw-border-[#D4C5A0] tw-bg-[#F5F0E8] tw-overflow-hidden">
              <p className="tw-text-[10px] tw-text-[#B0A080] tw-tracking-[1.5px] tw-mb-1 tw-uppercase">Coupon Code</p>
              {/*[수정] 코드길이수정*/}
              <p className="tw-font-mono tw-text-[14px] tw-font-bold tw-text-[#8B0008] tw-tracking-widest tw-text-center tw-break-all">{couponCode}</p>
            </div>
            <div className="tw-bg-white tw-border tw-border-[#EEE] tw-rounded-xl tw-p-3 tw-mb-3.5">
              <canvas ref={canvasRef} width={340} height={80} className="tw-w-full tw-h-[60px]"/>
            </div>
            <div className="tw-flex tw-items-center tw-justify-center tw-gap-2 tw-flex-wrap">
              <div className="tw-flex tw-items-center tw-gap-1 tw-text-[#AAAAAA]">
                <IconTag/>
                <span className="tw-text-[10.5px]">1인 1회</span>
              </div>
              <div className="tw-w-px tw-h-3 tw-bg-[#DDDDDD]"/>
              <div className="tw-flex tw-items-center tw-gap-1 tw-text-[#AAAAAA]">
                <IconCalendar/>
                <span className="tw-text-[10.5px]">2026.06.01 ~ 06.30</span>
              </div>
              <div className="tw-w-px tw-h-3 tw-bg-[#DDDDDD]"/>
              <span className="tw-text-[10.5px] tw-text-[#AAAAAA]">중복 불가</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="tw-text-center tw-px-6 tw-pb-10">
        <div className="tw-w-8 tw-h-px tw-bg-[#DDDDDD] tw-mx-auto tw-mb-4"/>
        <p className="tw-text-[10.5px] tw-text-[#BBBBBB] tw-leading-relaxed">
          ㈜한국인삼공사 정관장<br/>
          고객센터 02-2189-3900 · www.kgcshop.co.kr<br/>
          본 이벤트는 사전 예고 없이 변경 또는 종료될 수 있습니다.
        </p>
      </div>
    </div>
  );
}
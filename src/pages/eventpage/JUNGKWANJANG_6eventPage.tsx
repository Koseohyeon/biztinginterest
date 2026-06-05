import { useEffect, useRef, useMemo } from "react";
import JsBarcode from 'jsbarcode';
import IMG_BOX from '../../assets/IMG_BOX.png'
import IMG_HERO from '../../assets/IMG_HERO.png'
import IMG_STICK from '../../assets/IMG_STICK.png'

// ─── Inline SVG Icons ───
const IconStore = () => (
  <svg className="tw-w-5 tw-h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l1-5h16l1 5"/>
    <path d="M3 9h18v11a1 1 0 01-1 1H4a1 1 0 01-1-1V9z"/>
    <path d="M9 21V12h6v9"/>
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
const IconPhone = () => (
  <svg className="tw-w-3.5 tw-h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
  </svg>
);

function useBarcode(code: string, canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
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
  }, [code]);
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

// ─── Event Badge ───
interface EventBadgeProps { num: number; title: string; }
const EventBadge = ({ num, title }: EventBadgeProps) => (
  <div className="tw-flex tw-items-center tw-gap-2.5 tw-mb-3">
    <div
      className="tw-text-white tw-text-[11px] tw-font-bold tw-px-3 tw-rounded-full tw-bg-[#C8000F] tw-flex-shrink-0"
      style={{fontFamily:"'Noto Sans KR',sans-serif", lineHeight:"24px", height:"24px"}}
    >
      행사 {num}
    </div>
    <p className="tw-text-[14px] tw-font-bold tw-text-[#1A1208] tw-leading-none" style={{fontFamily:"'Noto Sans KR',sans-serif"}}>{title}</p>
  </div>
);

// ─── Row Item ───
interface RowItemProps { label: string; value: string; }
const RowItem = ({ label, value }: RowItemProps) => (
  <div className="tw-flex tw-items-center tw-justify-between tw-py-3.5 tw-border-b tw-border-[#F0E8E0] last:tw-border-0">
    <p className="tw-text-[13px] tw-text-[#444] tw-leading-snug tw-flex-1 tw-pr-3" style={{fontFamily:"'Noto Sans KR',sans-serif"}}>{label}</p>
    <span className="tw-text-[14px] tw-font-black tw-whitespace-nowrap tw-text-[#C8000F]" style={{fontFamily:"'Noto Serif KR',serif"}}>{value}</span>
  </div>
);

// ─── Main Page Component ───
export default function JKJEventPage() {
  const searchParams = useMemo(() =>
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams(""),
  []);
  const FALLBACK_CODE = "SKGUZESN49SEKQA2";
  const couponCode: string = useMemo(() => {
    const codeParam = searchParams.get("code");
    return codeParam ? codeParam.toUpperCase() : FALLBACK_CODE;
  }, [searchParams]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  useBarcode(couponCode, canvasRef);

  return (
    <div className="tw-min-h-screen tw-bg-[#F8F4EE] tw-overflow-x-hidden" style={{fontFamily:"'Noto Sans KR',sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;600;700;900&family=Noto+Sans+KR:wght@300;400;500;700&display=swap');
        @keyframes fadeDown{from{opacity:0;transform:translateY(-14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        .jkj-anim-down{animation:fadeDown 0.55s ease both}
        .jkj-anim-up{animation:fadeUp 0.55s ease both}
        .d1{animation-delay:0.1s}.d2{animation-delay:0.2s}.d3{animation-delay:0.3s}
        .d4{animation-delay:0.4s}.d5{animation-delay:0.5s}.d6{animation-delay:0.6s}.d7{animation-delay:0.7s}
        .ticket-cut-l{position:absolute;left:-14px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:#F8F4EE;border-radius:50%;box-shadow:inset -2px 0 5px rgba(200,0,15,0.08);z-index:2}
        .ticket-cut-r{position:absolute;right:-14px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:#F8F4EE;border-radius:50%;box-shadow:inset 2px 0 5px rgba(200,0,15,0.08);z-index:2}
        .event-divider{height:1px;background:linear-gradient(90deg,transparent,#E5D5C5,transparent);margin:20px 0}
        .brand-chip{display:inline-flex;align-items:center;background:#fff;border:1.5px solid #D4B89A;border-radius:999px;padding:4px 12px;font-size:12px;font-weight:500;color:#5A3A1A;margin:3px 3px 3px 0;line-height:1.4;}
      `}</style>

      {/* ── HERO ── */}
      <div className="tw-relative tw-overflow-hidden tw-pt-10 tw-pb-16 tw-px-5 tw-text-center"
        style={{background:"linear-gradient(160deg,#8B0008 0%,#C8000F 55%,#E01020 100%)"}}>
        <div className="tw-absolute tw-top-0 tw-left-0 tw-right-0 tw-h-[5px]"
          style={{background:"repeating-linear-gradient(90deg,#D4A843 0,#D4A843 12px,transparent 12px,transparent 22px)"}}/>
        <div className="tw-absolute tw-inset-0 tw-pointer-events-none"
          style={{background:"radial-gradient(ellipse 60% 50% at 18% 28%,rgba(255,255,255,0.07) 0%,transparent 70%),radial-gradient(ellipse 45% 40% at 85% 72%,rgba(212,168,67,0.09) 0%,transparent 70%)"}}/>

        <div className="tw-relative jkj-anim-down tw-flex tw-items-center tw-justify-center tw-gap-2.5 tw-mb-5">
          <div className="tw-w-1 tw-h-1 tw-rounded-full tw-bg-[#D4A843]"/>
          <span className="tw-text-[13px] tw-font-bold tw-text-white/90 tw-tracking-[3px]" style={{fontFamily:"'Noto Serif KR',serif"}}>
            CHEONG KWAN JANG · 정관장
          </span>
          <div className="tw-w-1 tw-h-1 tw-rounded-full tw-bg-[#D4A843]"/>
        </div>

        <div className="jkj-anim-down d1 tw-inline-block tw-bg-[#D4A843] tw-text-[#8B0008] tw-text-[10px] tw-font-bold tw-tracking-[2px] tw-px-4 tw-py-1.5 tw-rounded-full tw-mb-4">
          JUNE 2026 · SPECIAL PROMOTION
        </div>

        <h1 className="jkj-anim-down d2 tw-text-[30px] tw-font-black tw-text-white tw-leading-[1.25] tw-mb-2" style={{fontFamily:"'Noto Serif KR',serif"}}>
          정관장 <span className="tw-text-[#D4A843]">6월</span> 프로모션
        </h1>
        <p className="jkj-anim-down d3 tw-text-[13px] tw-text-white/75 tw-leading-relaxed tw-mb-8">
          2026.06.11(목) ~ 06.30(화)<br/>특별한 혜택을 지금 만나보세요
        </p>

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

      {/* ── ONLINE EVENT ── */}
      <div className="jkj-anim-up d3 tw-px-4 tw-mb-5 tw--mt-4">
        <div className="tw-bg-white tw-rounded-2xl tw-overflow-hidden tw-shadow-[0_3px_20px_rgba(0,0,0,0.07)]">

          {/* Online Header */}
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
          </div>

          <div className="tw-px-5 tw-pt-5 tw-pb-6">

            {/* 행사 1: 브랜드 할인 */}
            <div className="tw-mb-5">
              <EventBadge num={1} title="브랜드 할인 10~20%" />
              <div className="tw-bg-white tw-rounded-xl tw-p-4 tw-border tw-border-[#EAD8C8]">

                <div className="tw-mb-4">
                  <p className="tw-text-[12px] tw-text-[#8B5E3C] tw-font-bold tw-mb-2">에브리타임</p>
                  <div className="tw-flex tw-flex-wrap">
                    {["일반 (120g/240g)", "리미티드 (1병/세트)", "필름", "아웃도어"].map(b => (
                      <span key={b} className="brand-chip">{b}</span>
                    ))}
                  </div>
                </div>

                <div className="tw-h-px tw-bg-[#EDE0D0] tw-my-3"/>

                <div className="tw-mb-4">
                  <p className="tw-text-[12px] tw-text-[#8B5E3C] tw-font-bold tw-mb-2">홍삼정</p>
                  <div className="tw-flex tw-flex-wrap">
                    {["일반", "리미티드", "듀얼세트", "에디션"].map(b => (
                      <span key={b} className="brand-chip">{b}</span>
                    ))}
                  </div>
                </div>

                <div className="tw-h-px tw-bg-[#EDE0D0] tw-my-3"/>

                <div>
                  <p className="tw-text-[12px] tw-text-[#8B5E3C] tw-font-bold tw-mb-2">그 외 브랜드</p>
                  <div className="tw-flex tw-flex-wrap tw-mb-3">
                    {["천녹", "화애락", "홍이장군", "RXGIN"].map(b => (
                      <span key={b} className="brand-chip">{b}</span>
                    ))}
                  </div>
                  <div className="tw-flex tw-flex-col tw-gap-1.5" style={{fontFamily:"'Noto Sans KR',sans-serif"}}>
                    <p className="tw-text-[12px] tw-text-[#444] tw-leading-relaxed"><span className="tw-font-bold tw-text-[#8B0008]">천녹</span> — 우먼시니어 30/60포 · 강환 · 그로잉 · 부스팅</p>
                    <p className="tw-text-[12px] tw-text-[#444] tw-leading-relaxed"><span className="tw-font-bold tw-text-[#8B0008]">화애락</span> — 진 · 본 · 후</p>
                    <p className="tw-text-[12px] tw-text-[#444] tw-leading-relaxed"><span className="tw-font-bold tw-text-[#8B0008]">홍이장군</span> — 1/2/3단계 30/90포 · 면역젤리 · 파워스틱</p>
                    <p className="tw-text-[12px] tw-text-[#444] tw-leading-relaxed"><span className="tw-font-bold tw-text-[#8B0008]">RXGIN</span></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="event-divider"/>

            {/* 행사 2: 홍삼정 추가 증정 */}
            <div className="tw-mb-5">
              <EventBadge num={2} title="홍삼정 구매 시 추가 증정" />
              <div className="tw-bg-white tw-rounded-xl tw-overflow-hidden tw-border tw-border-[#EAD8C8]">
                <div className="tw-px-4">
                  <RowItem label="홍삼정(240g) 2개 또는 홍삼정(120g) 4개 구매" value="50g 증정"/>
                  <RowItem label="홍삼정(240g) 3개 또는 홍삼정(120g) 6개 구매" value="100g 증정"/>
                </div>
                <div className="tw-px-4 tw-pb-3 tw-pt-1">
                  <p className="tw-text-[10.5px] tw-text-[#AAAAAA]">※ 멤버스 연속 소진 시 선착순 종료</p>
                </div>
              </div>
            </div>

            <div className="event-divider"/>

            {/* 행사 3: 구매 금액별 포인트 적립 */}
            <div className="tw-mb-5">
              <EventBadge num={3} title="구매 금액별 포인트 적립" />
              <div className="tw-bg-white tw-rounded-xl tw-overflow-hidden tw-border tw-border-[#EAD8C8]">
                <div className="tw-px-4">
                  <RowItem label="30만원 이상 구매 시" value="1만원 적립"/>
                  <RowItem label="50만원 이상 구매 시" value="2만원 적립"/>
                </div>
                <div className="tw-px-4 tw-pb-3 tw-pt-1">
                  <p className="tw-text-[10.5px] tw-text-[#AAAAAA]">※ 멤버스 한정 · 1인 1회 · 비연속 적용</p>
                </div>
              </div>
            </div>

            {/* Period bar */}
          {/*   <div className="tw-flex tw-items-center tw-justify-between tw-rounded-xl tw-px-4 tw-py-3.5 tw-bg-[#1A1208]">
              <div>
                <div className="tw-flex tw-items-center tw-gap-1.5 tw-mb-1">
                  <span className="tw-text-[#D4A843]"><IconCalendar/></span>
                  <p className="tw-text-[10px] tw-text-[#D4A843] tw-tracking-[1.5px] tw-uppercase tw-font-semibold">행사 기간</p>
                </div>
                <p className="tw-text-[14px] tw-font-bold tw-text-white" style={{fontFamily:"'Noto Serif KR',serif"}}>2026. 06. 11 — 06. 30</p>
              </div>
              <div className="tw-text-right">
                <p className="tw-text-[10px] tw-text-white/40 tw-mb-0.5">기간 한정</p>
                <p className="tw-text-[12px] tw-text-white/65 tw-font-semibold" style={{fontFamily:"'Noto Serif KR',serif"}}>목 — 화</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* ── OFFLINE EVENT (사직구장 직관 고객 전용) ── */}
      <div className="jkj-anim-up d4 tw-px-4 tw-mb-5">
        <div className="tw-bg-white tw-rounded-2xl tw-overflow-hidden tw-shadow-[0_3px_20px_rgba(200,0,15,0.10)]">

          {/* Offline Header */}
          <div className="tw-flex tw-items-center tw-gap-3.5 tw-px-5 tw-py-4"
            style={{background:"linear-gradient(135deg,#C8000F 0%,#8B0008 100%)"}}>
            <div className="tw-w-9 tw-h-9 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-white tw-flex-shrink-0"
              style={{background:"rgba(255,255,255,0.15)"}}>
              <IconStore/>
            </div>
            <div>
              <p className="tw-text-[10px] tw-text-white/60 tw-tracking-[1.5px] tw-uppercase tw-mb-0.5">OFFLINE EVENT</p>
              <p className="tw-text-[17px] tw-font-bold tw-text-white tw-leading-tight" style={{fontFamily:"'Noto Serif KR',serif"}}>사직구장 직관 고객 전용</p>
            </div>
          </div>

          <div className="tw-px-5 tw-pt-5 tw-pb-6">

            {/* Gift highlight */}
            <div className="tw-rounded-xl tw-px-5 tw-py-4 tw-text-center tw-mb-5 tw-border tw-border-[#F5D0D2]"
              style={{background:"linear-gradient(135deg,#FFF8F2 0%,#FFF0F0 100%)"}}>
              <p className="tw-text-[11px] tw-text-[#999] tw-mb-1">신규가입 후 10만원 이상 구매 시</p>
              <p className="tw-text-[21px] tw-font-black tw-text-[#C8000F] tw-leading-tight" style={{fontFamily:"'Noto Serif KR',serif"}}>에브리타임</p>
              <p className="tw-text-[19px] tw-font-black tw-text-[#C8000F] tw-leading-tight tw-mb-1.5" style={{fontFamily:"'Noto Serif KR',serif"}}>
                <span className="tw-text-[#D4A843]">20포</span> 추가 증정!
              </p>
            </div>

            {/* 혜택 수령 방법 */}
            <p className="tw-text-[11px] tw-font-bold tw-text-[#8B0008] tw-tracking-[1.5px] tw-uppercase tw-mb-3.5">혜택 수령 방법</p>
            <div className="tw-flex tw-flex-col tw-gap-3 tw-mb-5">
              <StepItem num={1} label="메시지 내 쿠폰번호 확인" sub={null} icon={<IconTag/>}/>
              <StepItem num={2} label="전국 정관장 가맹점·직영점 방문" sub={null} icon={<IconStore/>}/>
              <StepItem num={3} label="신규가입 후 10만원 이상 결제" sub={null} icon={<IconShoppingBag/>}/>
              <StepItem num={4} label="에브리타임 20포 수령" sub={null} icon={<IconGift/>}/>
            </div>

            <div className="event-divider"/>

            {/* 유의사항 */}
            <div className="tw-mb-5">
              <p className="tw-text-[11px] tw-font-bold tw-text-[#888] tw-tracking-[1.5px] tw-uppercase tw-mb-3">유의사항</p>
              <ul className="tw-flex tw-flex-col">
                {[
                  "본 이벤트는 정관장 비회원 고객 한정입니다.",
                  "사용처: 전국 가맹점·직영점 (백화점·대형마트·농협·면세점·온라인 제외)",
                  "쿠폰은 1인 1회 사용 가능합니다.",
                  "혜택 수령 기간: 2026년 6월 30일까지",
                  "쿠폰 소진 시 자동으로 종료될 수 있습니다.",
                  "타 쿠폰 및 행사와 중복 사용이 불가합니다.",
                  "유효기간이 지난 쿠폰은 사용이 불가합니다.",
                  "본 프로모션은 매장 사정에 의하여 사전 공지 없이 조기 종료될 수 있습니다.",
                  "기타 문의사항은 정관장 고객센터(1588-2304)로 연락 부탁드립니다.",

                ].map((note: string, i: number) => (
                  <li key={i} className="tw-flex tw-items-start tw-gap-2">
                    <div className="tw-w-1 tw-h-1 tw-rounded-full tw-bg-[#C8000F] tw-mt-[7px] tw-flex-shrink-0"/>
                    <p className="tw-text-[12px] tw-text-[#777] tw-leading-snug">{note}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Period bar */}
{/*             <div className="tw-flex tw-items-center tw-justify-between tw-rounded-xl tw-px-4 tw-py-3.5 tw-bg-[#1A1208]">
              <div>
                <div className="tw-flex tw-items-center tw-gap-1.5 tw-mb-1">
                  <span className="tw-text-[#D4A843]"><IconCalendar/></span>
                  <p className="tw-text-[10px] tw-text-[#D4A843] tw-tracking-[1.5px] tw-uppercase tw-font-semibold">혜택 기간</p>
                </div>
                <p className="tw-text-[14px] tw-font-bold tw-text-white" style={{fontFamily:"'Noto Serif KR',serif"}}>2026. 06. 01 — 06. 30</p>
              </div>
              <div className="tw-text-right">
                <p className="tw-text-[10px] tw-text-white/40 tw-mb-0.5">기간 한정</p>
                <p className="tw-text-[12px] tw-text-white/65 tw-font-semibold" style={{fontFamily:"'Noto Serif KR',serif"}}>한 달간</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* ── COUPON TICKET ── */}
      <div className="jkj-anim-up d6 tw-px-4 tw-mb-10">
        <p className="tw-text-[18px] tw-font-bold tw-text-[#8B0008] tw-text-center tw-mb-1.5" style={{fontFamily:"'Noto Serif KR',serif"}}>쿠폰 확인하기</p>
        <p className="tw-text-[12px] tw-text-[#999] tw-text-center tw-mb-4">아래 쿠폰을 매장 직원에게 제시해 주세요</p>

        <div className="tw-relative tw-bg-white tw-rounded-2xl tw-overflow-hidden tw-shadow-[0_6px_28px_rgba(200,0,15,0.13)] tw-border tw-border-[#F5D0D2]">
          <div className="ticket-cut-l"/>
          <div className="ticket-cut-r"/>

          <div className="tw-relative tw-px-6 tw-py-5 tw-text-center"
            style={{background:"linear-gradient(135deg,#C8000F 0%,#8B0008 100%)"}}>
            <div className="tw-absolute tw-bottom-0 tw-left-[10%] tw-right-[10%] tw-h-px"
              style={{background:"repeating-linear-gradient(90deg,rgba(255,255,255,0.25) 0,rgba(255,255,255,0.25) 5px,transparent 5px,transparent 11px)"}}/>
            <p className="tw-text-[10px] tw-text-white/60 tw-tracking-[2px] tw-uppercase tw-mb-1.5">CHEONG KWAN JANG</p>
            <p className="tw-text-[19px] tw-font-black tw-text-white tw-leading-tight" style={{fontFamily:"'Noto Serif KR',serif"}}>
              에브리타임 <span className="tw-text-[#D4A843]">20포</span> 증정
            </p>
            <p className="tw-text-[11px] tw-text-white/60 tw-mt-1.5">신규가입 + 10만원 이상 구매 시 해당 이벤트 참여가 가능합니다.</p>
          </div>

          <div className="tw-px-6 tw-py-5 tw-text-center">
            <div className="tw-rounded-xl tw-py-3 tw-px-4 tw-mb-4 tw-border-2 tw-border-dashed tw-border-[#D4C5A0] tw-bg-[#F5F0E8] tw-overflow-hidden">
              <p className="tw-text-[10px] tw-text-[#B0A080] tw-tracking-[1.5px] tw-mb-1 tw-uppercase">Coupon Code</p>
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
                <span className="tw-text-[10.5px]">~2026.06.30</span>
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
        <div className="tw-flex tw-items-center tw-justify-center tw-gap-1.5 tw-text-[#BBBBBB] tw-mb-2">
          <IconPhone/>
          <span className="tw-text-[10.5px]">문의: 정관장 고객센터 1588-2304</span>
        </div>
        <p className="tw-text-[10.5px] tw-text-[#BBBBBB] tw-leading-relaxed">
          ㈜한국인삼공사 정관장<br/>
          본 이벤트는 사전 예고 없이 변경 또는 종료될 수 있습니다.
        </p>
      </div>
    </div>
  );
}
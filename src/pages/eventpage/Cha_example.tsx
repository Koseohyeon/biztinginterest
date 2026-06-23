import { useSearchParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import logoImg from "../../assets/icodelogo.png";

const LOGO_SRC = logoImg;
const BRAND = "#E75480";

// ────────────────────────────────────────────────
// SVG 아이콘
// ────────────────────────────────────────────────

function IconDrop() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 4C14 4 6 13 6 18a8 8 0 0016 0c0-5-8-14-8-14z" fill="#fce4ec" stroke={BRAND} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M11 19c0 2 1.5 3 3 3" stroke={BRAND} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconDNA() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M10 4c4 4 8 4 12 8s-8 4-8 8 8 4 8 8" stroke={BRAND} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M22 4c-4 4-8 4-12 8s8 4 8 8-8 4-8 8" stroke="#f48fb1" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="14" cy="11" r="1.5" fill={BRAND} />
      <circle cx="18" cy="16" r="1.5" fill={BRAND} />
      <circle cx="14" cy="21" r="1.5" fill={BRAND} />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M16 3L5 8v7c0 6.5 4.7 12.5 11 14 6.3-1.5 11-7.5 11-14V8L16 3z" fill="#fce4ec" stroke={BRAND} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M11 16l3.5 3.5L21 12" stroke={BRAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconHospital() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="4" y="8" width="24" height="20" rx="3" fill="#fce4ec" stroke={BRAND} strokeWidth="1.8" />
      <path d="M4 13h24" stroke={BRAND} strokeWidth="1.5" />
      <rect x="14" y="17" width="4" height="7" rx="1" fill={BRAND} />
      <rect x="11" y="20" width="10" height="4" rx="1" fill={BRAND} />
      <path d="M12 8V5a1 1 0 011-1h6a1 1 0 011 1v3" stroke={BRAND} strokeWidth="1.5" />
    </svg>
  );
}

function IconGift() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="4" y="14" width="24" height="14" rx="2" fill="#fce4ec" stroke={BRAND} strokeWidth="1.8" />
      <rect x="3" y="10" width="26" height="6" rx="2" fill="white" stroke={BRAND} strokeWidth="1.8" />
      <path d="M16 10v18" stroke={BRAND} strokeWidth="1.5" />
      <path d="M16 10c0 0-4-1-4-4s4-4 4 0" stroke={BRAND} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 10c0 0 4-1 4-4s-4-4-4 0" stroke={BRAND} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconStar() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2l2.2 4.5 5 .7-3.6 3.5.85 4.95L10 13.4l-4.45 2.35.85-4.95L2.8 7.2l5-.7L10 2z" fill="#fce4ec" stroke={BRAND} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function IconHeart() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 15s-7-4.5-7-9a4 4 0 018 0 4 4 0 018 0c0 4.5-7 9-7 9z" fill="#fce4ec" stroke={BRAND} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function IconSparks() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2v3M10 15v3M2 10h3M15 10h3M4.2 4.2l2.1 2.1M13.7 13.7l2.1 2.1M4.2 15.8l2.1-2.1M13.7 6.3l2.1-2.1" stroke={BRAND} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="10" r="3" fill="#fce4ec" stroke={BRAND} strokeWidth="1.5" />
    </svg>
  );
}

// ────────────────────────────────────────────────
// 배경 블롭
// ────────────────────────────────────────────────

function Blob({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="tw-absolute tw-rounded-full tw-pointer-events-none"
      style={{ filter: "blur(70px)", ...style }}
    />
  );
}

// ────────────────────────────────────────────────
// 제대혈 설명 카드
// ────────────────────────────────────────────────

interface CordItemProps {
  icon: React.ReactNode;
  color: string;
  title: string;
  body: string;
}

function CordItem({ icon, color, title, body }: CordItemProps) {
  return (
    <div
      className="tw-flex tw-gap-4 tw-items-start tw-rounded-2xl tw-p-4 tw-transition-all"
      style={{ background: "white", border: "1.5px solid #fce4ec", boxShadow: "0 2px 12px rgba(231,84,128,0.06)" }}
    >
      <div
        className="tw-w-12 tw-h-12 tw-min-w-12 tw-rounded-2xl tw-flex tw-items-center tw-justify-center"
        style={{ background: color }}
      >
        {icon}
      </div>
      <div>
        <div className="tw-text-sm tw-font-bold tw-mb-1" style={{ color: "#c2185b" }}>{title}</div>
        <div className="tw-text-xs tw-leading-relaxed" style={{ color: "#9e3a5a" }}>{body}</div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// 선물 카드 (블러 처리)
// ────────────────────────────────────────────────

interface GiftCardProps {
  emoji: string;
  label: string;
  sub: string;
  color: string;
}

function GiftCard({ emoji, label, sub, color }: GiftCardProps) {
  return (
    <div
      className="tw-relative tw-rounded-2xl tw-overflow-hidden"
      style={{ border: "1.5px solid #fce4ec", background: color, boxShadow: "0 2px 12px rgba(231,84,128,0.07)" }}
    >
      <div className="tw-p-5 tw-text-center" style={{ filter: "blur(6px)", userSelect: "none" }}>
        <div className="tw-text-3xl tw-mb-2">{emoji}</div>
        <div className="tw-text-xs tw-font-bold tw-mb-0.5" style={{ color: "#ad1457" }}>{label}</div>
        <div className="tw-text-xs" style={{ color: "#e91e8c" }}>{sub}</div>
      </div>
      <div className="tw-absolute tw-inset-0 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1.5">
        <div
          className="tw-w-9 tw-h-9 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-white tw-text-base"
          style={{ background: BRAND, boxShadow: "0 3px 10px rgba(231,84,128,0.4)" }}
        >
          🔒
        </div>
        <div className="tw-text-xs tw-font-bold" style={{ color: BRAND }}>상담 후 공개!</div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// 개인정보 모달
// ────────────────────────────────────────────────

function PrivacyModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="tw-fixed tw-inset-0 tw-z-50 tw-flex tw-items-center tw-justify-center tw-p-4">
      <div
        className="tw-absolute tw-inset-0"
        style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)" }}
        onClick={onClose}
      />
      <div
        className="tw-relative tw-rounded-3xl tw-p-6 tw-max-w-sm tw-w-full tw-max-h-[80vh] tw-overflow-y-auto"
        style={{ background: "white", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}
      >
        <div className="tw-text-center tw-mb-5">
          <div
            className="tw-w-12 tw-h-12 tw-rounded-2xl tw-flex tw-items-center tw-justify-center tw-mx-auto tw-mb-2"
            style={{ background: "#fce4ec" }}
          >
            <IconShield />
          </div>
          <h3 className="tw-text-sm tw-font-bold" style={{ color: BRAND }}>마케팅 정보 수신 동의 전문</h3>
        </div>
        <div className="tw-space-y-3 tw-text-xs tw-leading-relaxed" style={{ color: "#9e3a5a" }}>
          {[
            ["수신 동의 목적", "이벤트 정보, 이벤트 참여 안내 및 맞춤형 혜택 안내를 위해 마케팅 정보를 발송합니다."],
            ["수신 채널", "SMS, 이메일, 앱 푸시 알림"],
            ["보유 기간", "동의 철회 시까지 또는 회원 탈퇴 시"],
            ["동의 철회", "고객센터(1588-0000) 또는 수신거부를 통해 언제든 철회 가능합니다. 거부 시 기본 상담은 정상 이용 가능합니다."],
          ].map(([title, body]) => (
            <div key={title} className="tw-rounded-xl tw-p-3" style={{ background: "#fff5f8" }}>
              <div className="tw-font-bold tw-mb-0.5" style={{ color: "#c2185b" }}>{title}</div>
              <div>{body}</div>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="tw-w-full tw-mt-5 tw-py-3 tw-rounded-2xl tw-text-white tw-font-bold tw-text-sm"
          style={{ background: `linear-gradient(135deg, ${BRAND}, #e91e63)` }}
        >
          확인했어요 ✓
        </button>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// 토스트
// ────────────────────────────────────────────────

function Toast({ show }: { show: boolean }) {
  return (
    <div
      className="tw-fixed tw-bottom-8 tw-left-1/2 tw-z-50 tw-rounded-full tw-px-5 tw-py-3 tw-text-white tw-text-xs tw-font-bold tw-whitespace-nowrap tw-transition-all tw-duration-500"
      style={{
        background: `linear-gradient(135deg, ${BRAND}, #e91e63)`,
        transform: `translateX(-50%) translateY(${show ? "0" : "16px"})`,
        opacity: show ? 1 : 0,
        pointerEvents: show ? "auto" : "none",
        boxShadow: "0 8px 32px rgba(231,84,128,0.4)",
      }}
    >
      🎉 상담 신청 완료! 곧 연락드릴게요 💖
    </div>
  );
}

// ────────────────────────────────────────────────
// 메인 컴포넌트
// ────────────────────────────────────────────────

export default function IcordEvent() {
  const [searchParams] = useSearchParams();
  const campaignId = searchParams.get("cmpn-id") ?? "";

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",   // ← 주소 필드 추가
    dueDate: "",
    route: "",
  });
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const handleSubmit = () => {
    if (!form.name.trim())    { alert("이름을 입력해 주세요 😊"); return; }
    if (!form.phone.trim())   { alert("연락처를 입력해 주세요 📱"); return; }
    if (!form.address.trim()) { alert("주소를 입력해 주세요 🏠"); return; }
    if (!form.dueDate)        { alert("출산 예정일을 선택해 주세요 🗓️"); return; }
    if (!agree1)              { alert("개인정보 수집·이용에 동의해 주세요 🔒"); return; }

    // 제출 데이터 — campaignId 포함 (API 연동 시 여기서 전송)
    const payload = {
      ...form,
      agree1,
      agree2,
      campaignId, // URL 파라미터 ?cmpn-id=xxx 값
    };
    console.log("📤 상담 신청 데이터:", payload);
    // TODO: await fetch("/api/consultation", { method: "POST", body: JSON.stringify(payload) });

    setToast(true);
    timerRef.current = setTimeout(() => setToast(false), 3500);
  };

  const inputBase: React.CSSProperties = {
    border: "1.5px solid #fce4ec",
    color: "#880e4f",
    background: "white",
    fontFamily: "inherit",
    outline: "none",
    width: "100%",
    borderRadius: "14px",
    padding: "10px 16px",
    fontSize: "13px",
    transition: "border-color 0.2s",
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = BRAND;
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "#fce4ec";
  };

  return (
    <div
      className="tw-relative tw-min-h-screen tw-overflow-x-hidden"
      style={{ background: "#fdf6f9", fontFamily: "'Pretendard', 'Noto Sans KR', sans-serif" }}
    >
      {/* 배경 블롭 */}
      <Blob style={{ width: 320, height: 320, background: "#ffd6e7", opacity: 0.45, top: -80, left: -80 }} />
      <Blob style={{ width: 240, height: 240, background: "#ffe0ec", opacity: 0.35, top: 200, right: -60 }} />
      <Blob style={{ width: 200, height: 200, background: "#fff0c8", opacity: 0.4, top: "45%", left: -40 }} />
      <Blob style={{ width: 280, height: 280, background: "#e8d5ff", opacity: 0.2, bottom: 300, right: -60 }} />
      <Blob style={{ width: 180, height: 180, background: "#ffd6e7", opacity: 0.3, bottom: 80, left: "20%" }} />

      {/* 헤더 / 로고 */}
      <header className="tw-relative tw-px-5 tw-pt-8 tw-pb-4 tw-flex tw-items-center tw-justify-between">
        <div
          className="tw-flex tw-items-center tw-gap-2.5 tw-bg-white tw-rounded-2xl tw-px-4 tw-py-2.5"
          style={{ boxShadow: "0 2px 16px rgba(231,84,128,0.12)", border: "1px solid #fce4ec" }}
        >
          <img src={LOGO_SRC} alt="아이코드 로고" className="tw-h-8 tw-object-contain" />
        </div>
        <div
          className="tw-flex tw-items-center tw-gap-1.5 tw-rounded-full tw-px-3 tw-py-1.5 tw-text-xs tw-font-bold"
          style={{ background: "#fce4ec", color: BRAND }}
        >
          <IconSparks />
          이벤트 진행 중
        </div>
      </header>

      {/* 히어로 */}
      <section className="tw-relative tw-text-center tw-px-5 tw-pt-4 tw-pb-8">
        <div className="tw-absolute tw-top-2 tw-left-6 tw-opacity-60"><IconStar /></div>
        <div className="tw-absolute tw-top-8 tw-right-8 tw-opacity-50"><IconStar /></div>
        <div className="tw-absolute tw-bottom-4 tw-left-1/4 tw-opacity-40"><IconHeart /></div>

        <div
          className="tw-inline-block tw-text-white tw-text-xs tw-font-bold tw-px-4 tw-py-1.5 tw-rounded-full tw-mb-5"
          style={{ background: `linear-gradient(135deg, ${BRAND}, #f06292)` }}
        >
          ✨ SPECIAL EVENT ✨
        </div>

        <h1 className="tw-text-2xl tw-font-black tw-leading-snug tw-mb-3" style={{ color: "#3d0c22" }}>
          우리 아이의 소중한 미래<br />
          <span
            className="tw-inline-block tw-mt-1 tw-px-3 tw-py-0.5 tw-rounded-xl"
            style={{ color: BRAND, background: "#fce4ec" }}
          >
            제대혈 보관
          </span>{" "}
          이벤트
        </h1>

        <p className="tw-text-sm tw-mb-6" style={{ color: "#9e3a5a" }}>
          출생의 순간, 한 번뿐인 기회를 놓치지 마세요 💕
        </p>

        <div
          className="tw-inline-flex tw-items-center tw-gap-2 tw-text-xs tw-font-semibold tw-px-4 tw-py-2.5 tw-rounded-full"
          style={{ background: "white", color: BRAND, boxShadow: "0 3px 16px rgba(231,84,128,0.14)", border: "1px solid #fce4ec" }}
        >
          <span
            className="tw-w-2 tw-h-2 tw-rounded-full tw-animate-pulse"
            style={{ background: BRAND, display: "inline-block" }}
          />
          지금 상담 신청하고 선물 받아가세요 🎁
        </div>
      </section>

      {/* 제대혈 설명 */}
      <section className="tw-px-4 tw-mb-5">
        <div
          className="tw-rounded-3xl tw-p-5"
          style={{ background: "white", border: "1px solid #fce4ec", boxShadow: "0 4px 24px rgba(231,84,128,0.07)" }}
        >
          <div className="tw-flex tw-items-center tw-gap-2 tw-mb-4">
            <IconDrop />
            <h2 className="tw-text-base tw-font-bold" style={{ color: "#c2185b" }}>제대혈이 뭐예요?</h2>
          </div>
          <div className="tw-space-y-3">
            <CordItem
              icon={<IconDNA />}
              color="#fff0f5"
              title="제대혈이란?"
              body="출생 시 탯줄과 태반에 남아 있는 혈액이에요. 아기에게만 존재하는 특별하고 귀한 혈액이랍니다."
            />
            <CordItem
              icon={<span className="tw-text-2xl">⭐</span>}
              color="#fffbea"
              title="왜 소중한가요?"
              body="조혈모세포가 풍부해 백혈병·면역질환 등 난치성 질환 치료에 활용될 수 있어요. 아이의 평생 보험이에요."
            />
            <CordItem
              icon={<IconShield />}
              color="#f0fff8"
              title="보관 기간은?"
              body="영구 냉동 보관으로 필요할 때 언제든지 사용 가능해요. 만 18세까지 본인 동의 없이 안전하게 보관됩니다."
            />
            <CordItem
              icon={<IconHospital />}
              color="#f0f4ff"
              title="차병원 아이코드는?"
              body="국내 최대 규모의 제대혈 은행으로 30년 이상의 역사와 기술력을 보유하고 있어요. 믿을 수 있는 선택!"
            />
          </div>
        </div>
      </section>

      {/* 이벤트 혜택 */}
      <section className="tw-px-4 tw-mb-5">
        <div
          className="tw-rounded-3xl tw-p-5"
          style={{ background: "white", border: "1px solid #fce4ec", boxShadow: "0 4px 24px rgba(231,84,128,0.07)" }}
        >
          <div className="tw-flex tw-items-center tw-gap-2 tw-mb-4">
            <IconGift />
            <h2 className="tw-text-base tw-font-bold" style={{ color: "#c2185b" }}>이벤트 혜택</h2>
          </div>
          <div className="tw-grid tw-grid-cols-2 tw-gap-3">
            <GiftCard emoji="🧸" label="웰컴 기프트" sub="상담 신청 시" color="#fff5f8" />
            <GiftCard emoji="💝" label="계약 혜택" sub="계약 완료 시" color="#fff9ec" />
            <GiftCard emoji="🌺" label="스페셜 혜택" sub="이벤트 기간 한정" color="#f5f0ff" />
            <GiftCard emoji="🎊" label="추가 혜택" sub="선착순 한정" color="#f0fff8" />
          </div>
        </div>
      </section>

      {/* 시크릿 상품 */}
      <section className="tw-px-4 tw-mb-5">
        <div
          className="tw-rounded-3xl tw-p-6 tw-text-center tw-relative tw-overflow-hidden"
          style={{ background: "linear-gradient(135deg,#fff0f5,#fce4ec)", border: "2px dashed #f48fb1" }}
        >
          <Blob style={{ width: 120, height: 120, background: "#f48fb1", opacity: 0.2, top: -30, right: -30 }} />
          <Blob style={{ width: 80, height: 80, background: "#ec407a", opacity: 0.15, bottom: -20, left: -20 }} />
          <div className="tw-relative">
            <div
              className="tw-w-16 tw-h-16 tw-rounded-2xl tw-flex tw-items-center tw-justify-center tw-mx-auto tw-mb-3 tw-animate-bounce"
              style={{ background: "white", boxShadow: "0 4px 20px rgba(231,84,128,0.2)" }}
            >
              <span className="tw-text-3xl">🎁</span>
            </div>
            <div className="tw-text-base tw-font-black tw-mb-2" style={{ color: "#880e4f" }}>
              시크릿 상품이 있어요! ✨
            </div>
            <div className="tw-text-xs tw-leading-relaxed" style={{ color: "#ad1457" }}>
              이벤트 참여 고객님께 깜짝 시크릿 상품을 드려요 💕<br />
              상담 신청 후 직접 확인하세요!
            </div>
            <div
              className="tw-inline-flex tw-items-center tw-gap-1.5 tw-mt-3 tw-px-4 tw-py-1.5 tw-rounded-full tw-text-xs tw-font-bold tw-text-white"
              style={{ background: BRAND }}
            >
              <IconSparks />
              이벤트 참여하면 공개됩니다
            </div>
          </div>
        </div>
      </section>

      {/* 상담 신청 폼 */}
      <section className="tw-px-4 tw-pb-12">
        <div
          className="tw-rounded-3xl tw-p-5"
          style={{ background: "white", border: "1px solid #fce4ec", boxShadow: "0 4px 32px rgba(231,84,128,0.1)" }}
        >
          <div className="tw-flex tw-items-center tw-gap-2 tw-mb-5">
            <div
              className="tw-w-8 tw-h-8 tw-rounded-xl tw-flex tw-items-center tw-justify-center tw-text-white tw-text-sm"
              style={{ background: `linear-gradient(135deg, ${BRAND}, #f06292)` }}
            >
              📝
            </div>
            <h2 className="tw-text-base tw-font-bold" style={{ color: "#c2185b" }}>상담 신청하기</h2>
          </div>

          {/* 스텝 */}
          <div className="tw-flex tw-items-center tw-justify-center tw-gap-1.5 tw-mb-5">
            {[["1", "정보 입력"], ["2", "상담 신청"], ["3", "선물 받기 🎁"]].map(([num, lbl], i) => (
              <div key={num} className="tw-flex tw-items-center tw-gap-1.5">
                <div className="tw-text-center">
                  <div
                    className="tw-w-7 tw-h-7 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-xs tw-font-bold tw-mx-auto tw-mb-1"
                    style={{
                      background: i === 0 ? BRAND : "#fce4ec",
                      color: i === 0 ? "white" : BRAND,
                    }}
                  >
                    {num}
                  </div>
                  <div className="tw-font-semibold tw-whitespace-nowrap" style={{ color: "#c2185b", fontSize: "10px" }}>
                    {lbl}
                  </div>
                </div>
                {i < 2 && (
                  <div className="tw-text-xs tw-font-bold tw-mb-4" style={{ color: "#f48fb1" }}>→</div>
                )}
              </div>
            ))}
          </div>

          {/* 입력 필드 */}
          <div className="tw-space-y-3 tw-mb-4">
            {/* 이름 / 연락처 / 주소 — 배열로 렌더 */}
            {[
              { label: "이름",   key: "name",    type: "text", placeholder: "홍길동",                         req: true },
              { label: "연락처", key: "phone",   type: "tel",  placeholder: "010-0000-0000",                  req: true },
              { label: "주소",   key: "address", type: "text", placeholder: "oo시 oo구 oo로 ooo, oo동 oo호", req: true },
            ].map((f) => (
              <div key={f.key}>
                <label className="tw-block tw-text-xs tw-font-bold tw-mb-1.5" style={{ color: "#ad1457" }}>
                  {f.label} {f.req && <span style={{ color: BRAND }}>*</span>}
                </label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  style={inputBase}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </div>
            ))}

            {/* 출산 예정일 */}
            <div>
              <label className="tw-block tw-text-xs tw-font-bold tw-mb-1.5" style={{ color: "#ad1457" }}>
                출산 예정일 <span style={{ color: BRAND }}>*</span>
              </label>
              <input
                type="month"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                style={inputBase}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>

            {/* 문의 경로 */}
            <div>
              <label className="tw-block tw-text-xs tw-font-bold tw-mb-1.5" style={{ color: "#ad1457" }}>
                문의 경로
              </label>
              <select
                value={form.route}
                onChange={(e) => setForm({ ...form, route: e.target.value })}
                style={{ ...inputBase, color: form.route ? "#880e4f" : "#f48fb1", appearance: "none" }}
                onFocus={onFocus}
                onBlur={onBlur}
              >
                <option value="">선택해 주세요</option>
                {["인스타그램", "네이버 검색", "병원 소개", "지인 추천", "문자메시지", "기타"].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 개인정보 동의 */}
          <div className="tw-rounded-2xl tw-p-4 tw-mb-4" style={{ background: "#fff5f8", border: "1.5px solid #fce4ec" }}>
            <div className="tw-flex tw-items-center tw-gap-1.5 tw-text-xs tw-font-bold tw-mb-3" style={{ color: "#c2185b" }}>
              <IconShield />
              개인정보 수집 및 이용 동의
            </div>
            <div className="tw-text-xs tw-leading-loose tw-overflow-y-auto tw-max-h-20" style={{ color: "#ad1457" }}>
              <strong>수집 항목:</strong> 이름, 연락처, 출산 예정일, 주소<br />
              <strong>수집 목적:</strong> 제대혈 보관 서비스 상담 및 안내, 이벤트 혜택 제공<br />
              <strong>보유 기간:</strong> 상담 종료 후 3년 / 계약 체결 시 계약 종료 후 5년<br />
              <strong>제3자 제공:</strong> 원칙적으로 외부 제공 없음. 단, 법령에 의한 경우 예외
            </div>
            <label className="tw-flex tw-items-center tw-gap-2 tw-mt-3 tw-cursor-pointer">
              <input
                type="checkbox"
                checked={agree1}
                onChange={(e) => setAgree1(e.target.checked)}
                className="tw-w-4 tw-h-4"
                style={{ accentColor: BRAND }}
              />
              <span className="tw-text-xs tw-font-semibold" style={{ color: "#c2185b" }}>
                개인정보 수집·이용에 동의합니다 <span style={{ color: BRAND }}>*</span>
              </span>
            </label>
            <label className="tw-flex tw-items-center tw-gap-2 tw-mt-2 tw-cursor-pointer">
              <input
                type="checkbox"
                checked={agree2}
                onChange={(e) => setAgree2(e.target.checked)}
                className="tw-w-4 tw-h-4"
                style={{ accentColor: BRAND }}
              />
              <span className="tw-text-xs tw-font-semibold" style={{ color: "#c2185b" }}>
                마케팅 정보 수신 동의 (선택) —{" "}
                <span
                  className="tw-underline tw-cursor-pointer"
                  style={{ color: BRAND }}
                  onClick={(e) => { e.preventDefault(); setModal(true); }}
                >
                  전문 보기
                </span>
              </span>
            </label>
          </div>

          {/* CTA 버튼 */}
          <button
            onClick={handleSubmit}
            className="tw-w-full tw-py-4 tw-rounded-2xl tw-text-white tw-font-black tw-text-base tw-relative tw-overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${BRAND}, #e91e63)`,
              boxShadow: "0 8px 32px rgba(231,84,128,0.38)",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(231,84,128,0.5)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(231,84,128,0.38)";
            }}
            onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.97)"; }}
            onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1.03)"; }}
          >
            💌 지금 바로 상담 신청하기!
          </button>
          <p className="tw-text-center tw-text-xs tw-mt-2" style={{ color: "#f48fb1" }}>
            * 담당자가 1~2 영업일 내 연락드려요 🌸
          </p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="tw-text-center tw-text-xs tw-pb-10 tw-leading-relaxed" style={{ color: "#d4a0b0" }}>
        차병원 제대혈은행 아이코드 이벤트<br />
        이벤트 기간 내 선착순 마감될 수 있습니다<br />
        문의: 1588-0000
      </footer>

      {modal && <PrivacyModal onClose={() => setModal(false)} />}
      <Toast show={toast} />
    </div>
  );
}
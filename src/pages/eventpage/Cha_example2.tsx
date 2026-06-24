import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import logoImg from "../../assets/icodelogo.png";
import { useNaverLogin } from "./../../hooks/useNaverLogin";

const LOGO_SRC = logoImg;
const BRAND = "#E75480";

const NAVER_CODE = "6qfrvN";
const NAVER_PAGE_ID = "Chabio";

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

function IconNaver() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M13.5 12.3L10.2 7H7v10h3.5v-5.3L14 17H17V7h-3.5v5.3z" fill="white" />
    </svg>
  );
}

function Blob({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="tw-absolute tw-rounded-full tw-pointer-events-none"
      style={{ filter: "blur(70px)", ...style }}
    />
  );
}

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
      <div className="tw-p-5 tw-text-center">
        <div className="tw-text-3xl tw-mb-2">{emoji}</div>
        <div className="tw-text-xs tw-font-bold tw-mb-0.5" style={{ color: "#ad1457" }}>{label}</div>
        <div className="tw-text-xs" style={{ color: "#e91e8c" }}>{sub}</div>
      </div>
    </div>
  );
}

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

function SecretCouponSection({ revealed }: { revealed: boolean }) {
  return (
    <section className="tw-px-4 tw-mb-5">
      <div
        className="tw-rounded-3xl tw-p-6 tw-text-center tw-relative tw-overflow-hidden tw-mb-4"
        style={{ background: "linear-gradient(135deg,#fff0f5,#fce4ec)", border: "2px dashed #f48fb1" }}
      >
        <Blob style={{ width: 120, height: 120, background: "#f48fb1", opacity: 0.2, top: -30, right: -30 }} />
        <Blob style={{ width: 80, height: 80, background: "#ec407a", opacity: 0.15, bottom: -20, left: -20 }} />
        <div className="tw-relative">
          <div
            className="tw-w-16 tw-h-16 tw-rounded-2xl tw-flex tw-items-center tw-justify-center tw-mx-auto tw-mb-3"
            style={{ background: "white", boxShadow: "0 4px 20px rgba(231,84,128,0.2)" }}
          >
            <span className="tw-text-3xl">💝</span>
          </div>
          <div className="tw-text-base tw-font-black tw-mb-2" style={{ color: "#880e4f" }}>
            상담 신청하면 추가 혜택이 있어요! ✨
          </div>
          <div className="tw-text-xs tw-leading-relaxed tw-mb-3" style={{ color: "#ad1457" }}>
            상담 신청 고객님께 <strong>약 10만원 상당</strong>의 추가 상품 혜택을 드려요 💕<br />
            네이버 간편가입 후 신청하시면 시크릿 혜택이 공개됩니다!
          </div>
          <div
            className="tw-inline-flex tw-items-center tw-gap-1.5 tw-px-4 tw-py-1.5 tw-rounded-full tw-text-xs tw-font-bold tw-text-white"
            style={{ background: BRAND }}
          >
            <IconSparks />
            놓치지 마세요!
          </div>
        </div>
      </div>

      <div
        className="tw-rounded-3xl tw-p-5"
        style={{ background: "white", border: "1px solid #fce4ec", boxShadow: "0 4px 24px rgba(231,84,128,0.07)" }}
      >
        {!revealed ? (
          <div>
            <div
              className="tw-relative tw-rounded-2xl tw-overflow-hidden tw-mb-3"
              style={{ border: "1.5px solid #fce4ec", background: "#fff5f8" }}
            >
              <div
                className="tw-p-5 tw-text-center"
                style={{ filter: "blur(8px)", userSelect: "none", pointerEvents: "none" }}
              >
                <div className="tw-text-2xl tw-mb-1">🏷️</div>
                <div className="tw-text-xs tw-font-bold tw-mb-1" style={{ color: "#ad1457" }}>차 헬스앤뷰티 상품권</div>
                <div className="tw-text-lg tw-font-black" style={{ color: BRAND }}>100,000원</div>
                <div className="tw-text-xs tw-mt-1" style={{ color: "#e91e8c" }}>쿠폰 코드: CHA-XXXX-XXXX-XXXX</div>
              </div>
              <div className="tw-absolute tw-inset-0 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1.5">
                <div
                  className="tw-w-10 tw-h-10 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-white tw-text-lg"
                  style={{ background: BRAND, boxShadow: "0 3px 10px rgba(231,84,128,0.4)" }}
                >
                  🔒
                </div>
                <div className="tw-text-xs tw-font-bold" style={{ color: BRAND }}>상담 신청 완료 후 공개!</div>
              </div>
            </div>
            <p className="tw-text-center tw-text-xs" style={{ color: "#f48fb1" }}>
              아래 버튼을 눌러 상담 신청을 완료하면 쿠폰이 공개돼요 🌸
            </p>
          </div>
        ) : (
          <div>
            <div className="tw-text-center tw-mb-4">
              <div className="tw-text-2xl tw-mb-1">🎉</div>
              <div className="tw-text-sm tw-font-black" style={{ color: "#880e4f" }}>
                상담 신청 감사해요! 혜택을 확인하세요 💖
              </div>
            </div>
            <div
              className="tw-rounded-2xl tw-p-5 tw-text-center"
              style={{
                background: "linear-gradient(135deg, #fff0f5, #fce4ec)",
                border: `2px solid ${BRAND}`,
                boxShadow: "0 4px 24px rgba(231,84,128,0.2)",
              }}
            >
              <div className="tw-text-3xl tw-mb-2">🏷️</div>
              <div className="tw-text-xs tw-font-bold tw-mb-0.5" style={{ color: "#c2185b" }}>차 헬스앤뷰티 상품권</div>
              <div className="tw-text-2xl tw-font-black tw-mb-3" style={{ color: BRAND }}>100,000원</div>
              <div
                className="tw-rounded-xl tw-px-4 tw-py-3"
                style={{ background: "white", border: `1.5px dashed ${BRAND}` }}
              >
                <div className="tw-text-xs tw-mb-1" style={{ color: "#9e3a5a" }}>쿠폰 코드</div>
                <div className="tw-font-black" style={{ color: BRAND, fontSize: "15px", letterSpacing: "0.15em" }}>
                  CHA-HLTH-BTY-2025
                </div>
                <div className="tw-text-xs tw-mt-1.5" style={{ color: "#c2185b" }}>
                  · 차 헬스앤뷰티 앱/홈페이지에서 사용 가능<br />
                  · 계약 완료 후 코드 최종 발송
                </div>
              </div>
              <div className="tw-text-xs tw-mt-3" style={{ color: "#ad1457" }}>
                상담 완료 후 담당자가 코드를 안내해 드려요 🌸
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default function IcordEvent() {
  const [searchParams] = useSearchParams();
  const campaignId = searchParams.get("cmpn-id") ?? "";

  const { unlocked: naverUnlocked, openLogin } = useNaverLogin(NAVER_CODE, NAVER_PAGE_ID);

  const [toast, setToast] = useState(false);
  const [couponRevealed, setCouponRevealed] = useState(false);

  useEffect(() => {
    if (naverUnlocked && !couponRevealed) {
      setCouponRevealed(true);
      setToast(true);
      const t = setTimeout(() => setToast(false), 3500);
      return () => clearTimeout(t);
    }
  }, [naverUnlocked]);

  const handleSubmit = () => {
    console.log("📤 상담 신청 — campaignId:", campaignId);
    openLogin();
  };

  return (
    <div
      className="tw-relative tw-min-h-screen tw-overflow-x-hidden"
      style={{ background: "#fdf6f9", fontFamily: "'Pretendard', 'Noto Sans KR', sans-serif" }}
    >
      <Blob style={{ width: 320, height: 320, background: "#ffd6e7", opacity: 0.45, top: -80, left: -80 }} />
      <Blob style={{ width: 240, height: 240, background: "#ffe0ec", opacity: 0.35, top: 200, right: -60 }} />
      <Blob style={{ width: 200, height: 200, background: "#fff0c8", opacity: 0.4, top: "45%", left: -40 }} />
      <Blob style={{ width: 280, height: 280, background: "#e8d5ff", opacity: 0.2, bottom: 300, right: -60 }} />
      <Blob style={{ width: 180, height: 180, background: "#ffd6e7", opacity: 0.3, bottom: 80, left: "20%" }} />

      {/* 헤더 */}
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
            <CordItem icon={<IconDNA />} color="#fff0f5" title="제대혈이란?" body="출생 시 탯줄과 태반에 남아 있는 혈액이에요. 아기에게만 존재하는 특별하고 귀한 혈액이랍니다." />
            <CordItem icon={<span className="tw-text-2xl">⭐</span>} color="#fffbea" title="왜 소중한가요?" body="조혈모세포가 풍부해 백혈병·면역질환 등 난치성 질환 치료에 활용될 수 있어요. 아이의 평생 보험이에요." />
            <CordItem icon={<IconShield />} color="#f0fff8" title="보관 기간은?" body="영구 냉동 보관으로 필요할 때 언제든지 사용 가능해요. 만 18세까지 본인 동의 없이 안전하게 보관됩니다." />
            <CordItem icon={<IconHospital />} color="#f0f4ff" title="차병원 아이코드는?" body="국내 최대 규모의 제대혈 은행으로 30년 이상의 역사와 기술력을 보유하고 있어요. 믿을 수 있는 선택!" />
          </div>
        </div>
      </section>

      {/* 이벤트 혜택 */}
      <section className="tw-px-4 tw-mb-5">
        <div
          className="tw-rounded-3xl tw-p-5"
          style={{ background: "white", border: "1px solid #fce4ec", boxShadow: "0 4px 24px rgba(231,84,128,0.07)" }}
        >
          <div className="tw-flex tw-items-center tw-gap-2 tw-mb-2">
            <IconGift />
            <h2 className="tw-text-base tw-font-bold" style={{ color: "#c2185b" }}>이벤트 혜택</h2>
          </div>
          <p className="tw-text-xs tw-mb-4" style={{ color: "#9e3a5a" }}>
            지금 상담 신청하시면 아래 혜택 중 하나를 드려요! 🎁<br />
            <span style={{ color: BRAND, fontWeight: "bold" }}>+ 상담 신청 완료 시 차 헬스앤뷰티 10만원 상품권 추가 증정 ✨</span>
          </p>
          <div className="tw-grid tw-grid-cols-2 tw-gap-3">
            <GiftCard emoji="🍼" label="절충형 프리미엄 유아차" sub="상담 신청 시 증정" color="#fff5f8" />
            <GiftCard emoji="♨️" label="분유 포트" sub="상담 신청 시 증정" color="#fff9ec" />
            <GiftCard emoji="👶" label="올인원 멀티 힙시트 아기띠" sub="상담 신청 시 증정" color="#f5f0ff" />
            <GiftCard emoji="👗" label="프리미엄 아기 옷" sub="상담 신청 시 증정" color="#f0fff8" />
          </div>
        </div>
      </section>

      {/* 시크릿 쿠폰 섹션 */}
      <SecretCouponSection revealed={couponRevealed} />

      {/* 상담 신청 — 네이버 버튼만 */}
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
          <div className="tw-flex tw-items-center tw-justify-center tw-gap-1.5 tw-mb-6">
            {[["1", "네이버 가입"], ["2", "상담 신청"], ["3", "선물 받기 🎁"]].map(([num, lbl], i) => (
              <div key={num} className="tw-flex tw-items-center tw-gap-1.5">
                <div className="tw-text-center">
                  <div
                    className="tw-w-7 tw-h-7 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-xs tw-font-bold tw-mx-auto tw-mb-1"
                    style={{
                      background: i === 0 && naverUnlocked ? "#fce4ec"
                        : i === 1 && naverUnlocked ? BRAND
                        : i === 0 ? BRAND : "#fce4ec",
                      color: (i === 0 && !naverUnlocked) || (i === 1 && naverUnlocked) ? "white" : BRAND,
                    }}
                  >
                    {i === 0 && naverUnlocked ? "✓" : num}
                  </div>
                  <div className="tw-font-semibold tw-whitespace-nowrap" style={{ color: "#c2185b", fontSize: "10px" }}>{lbl}</div>
                </div>
                {i < 2 && <div className="tw-text-xs tw-font-bold tw-mb-4" style={{ color: "#f48fb1" }}>→</div>}
              </div>
            ))}
          </div>

          {/* 네이버 완료 배지 */}
          {naverUnlocked && (
            <div
              className="tw-flex tw-items-center tw-gap-2 tw-rounded-2xl tw-px-4 tw-py-3 tw-mb-5"
              style={{ background: "#fff0f5", border: `1.5px solid ${BRAND}` }}
            >
              <span className="tw-text-base">✅</span>
              <span className="tw-text-xs tw-font-bold" style={{ color: BRAND }}>
                네이버 간편가입 완료! 상담이 신청되었어요 💖
              </span>
            </div>
          )}

          {/* 안내 문구 */}
          <div
            className="tw-rounded-2xl tw-p-4 tw-mb-5"
            style={{ background: "#fff5f8", border: "1.5px solid #fce4ec" }}
          >
            <div className="tw-space-y-2">
              {[
                { icon: "✅", text: "네이버 아이디로 1초 간편 가입" },
                { icon: "🎁", text: "가입 즉시 차 헬스앤뷰티 10만원 쿠폰 자동 공개" },
                { icon: "💬", text: "담당자가 1~2 영업일 내 연락드려요" },
              ].map((item) => (
                <div key={item.text} className="tw-flex tw-items-center tw-gap-2.5">
                  <span className="tw-text-sm">{item.icon}</span>
                  <span className="tw-text-xs tw-font-medium" style={{ color: "#9e3a5a" }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA 버튼 */}
          {!naverUnlocked ? (
            <button
              onClick={handleSubmit}
              className="tw-w-full tw-py-4 tw-rounded-2xl tw-text-white tw-font-black tw-text-base tw-flex tw-items-center tw-justify-center tw-gap-2"
              style={{
                background: `linear-gradient(135deg, ${BRAND}, #e91e63)`,
                boxShadow: "0 8px 32px rgba(231,84,128,0.38)",
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
              onMouseOver={(e) => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(231,84,128,0.5)"; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(231,84,128,0.38)"; }}
              onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.97)"; }}
              onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1.03)"; }}
            >
              <IconNaver />
              네이버 간편가입으로 상담 신청하기
            </button>
          ) : (
            <div
              className="tw-w-full tw-py-4 tw-rounded-2xl tw-text-white tw-font-black tw-text-base tw-flex tw-items-center tw-justify-center tw-gap-2"
              style={{
                background: `linear-gradient(135deg, ${BRAND}, #e91e63)`,
                boxShadow: "0 8px 32px rgba(231,84,128,0.2)",
                opacity: 0.7,
              }}
            >
              💌 상담 신청 완료!
            </div>
          )}

          <p className="tw-text-center tw-text-xs tw-mt-2" style={{ color: "#f48fb1" }}>
            * 네이버 간편가입만으로 상담 신청이 완료돼요 🌸
          </p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="tw-text-center tw-text-xs tw-pb-10 tw-leading-relaxed" style={{ color: "#d4a0b0" }}>
        차병원 제대혈은행 아이코드 이벤트<br />
        이벤트 기간 내 선착순 마감될 수 있습니다<br />
        문의: 1588-0000
      </footer>

      <Toast show={toast} />
    </div>
  );
}
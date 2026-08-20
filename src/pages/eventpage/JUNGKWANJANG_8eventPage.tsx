
import React, { useEffect, useRef, useState, type ReactNode } from "react";
import heroPoster from "../../assets/hero-poster.jpg";
import giftBox from "../../assets/gift-box-cutout.jpg";
import brandLogo from "../../assets/brand-logo.png";

/* ============================================================================
 * 0. 공통 상수 / 데이터
 * ==========================================================================*/

const MEMBERS_URL = "https://members.kgc.co.kr/";
const SHOP_URL = "https://www.kgcshop.co.kr/";

const COLOR = {
    navy: "#0E1E3F",
    navyDeep: "#081226",
    red: "#C4202E",
    redDeep: "#8F1620",
    cream: "#F1E4C0",
    paper: "#EEF1F6",
    ink: "#161B2E",
} as const;

interface DiscountTier {
    percent: number;
    moonFill: number;
    label: string;
    brands: string[];
}

const DISCOUNT_TIERS: DiscountTier[] = [
    {
        percent: 15,
        moonFill: 100,
        label: "가장 큰 혜택",
        brands: [
            "천녹",
            "황진단",
            "활기력",
            "홍이장군 (90포 제외)",
            "아이키커",
            "에브리타임 아웃도어",
            "이너제틱",
            "굿베이스",
        ],
    },
    {
        percent: 10,
        moonFill: 62,
        label: "가장 많은 품목",
        brands: [
            "에브리타임",
            "홍삼정 (240g·120g·100g 제외)",
            "홍삼톤",
            "홍삼정 편의류",
            "달임액 (천삼달임액 제외)",
            "다보록",
            "화애락",
            "RXGIN",
            "아이패스",
            "기다림",
            "홍이장군 (90포)",
            "GLPro",
            "장수",
            "알파",
            "진고",
            "봉밀",
            "기호 차류",
            "활기단",
        ],
    },
    {
        percent: 5,
        moonFill: 32,
        label: "베스트 스테디셀러",
        brands: ["홍삼정 (240g·120g)", "뿌리삼 (천삼 제외)"],
    },
];

const EXCLUDED_ITEMS = [
    "뿌리삼(전삼)",
    "천삼달임액",
    "굿베이스 유기농 블루베리 퓨레",
    "홍삼정 100g",
    "동인비(별도 프로모션 예정)",
];

interface PointTier {
    range: string;
    reward: string;
    sub?: string;
    moonFill: number;
}

const POINT_TIERS: PointTier[] = [
    { range: "30만 원 ~ 70만 원 미만", reward: "2만 포인트", moonFill: 25 },
    { range: "70만 원 ~ 100만 원 미만", reward: "5만 포인트", moonFill: 50 },
    { range: "100만 원 ~ 300만 원 미만", reward: "10만 포인트", moonFill: 75 },
    {
        range: "300만 원 이상",
        reward: "15만 포인트",
        sub: "+ 홍삼정 100g × 2개 증정",
        moonFill: 100,
    },
];

interface ComboGift {
    condition: string;
    detail: string[];
    enumerate?: boolean;
    reward: string;
}

const COMBO_GIFTS: ComboGift[] = [
    {
        condition: "아래 조합으로 3개 구매 시",
        detail: [
            "홍삼톤골드 + 화애락 진/후",
            "홍삼톤골드 + RXGIN 홍천옹/홍삼오일",
            "화애락 진/후 + RXGIN 홍천옹/홍삼오일",
        ],
        enumerate: true,
        reward: "홍삼정 100g 증정",
    },
    {
        condition: "화애락 진 3개 구매 시",
        detail: ["동일 제품 3개 구매", "(구형 재고 포함 가능)"],
        reward: "이너제틱 클렌즈 60포",
    },
    {
        condition: "화애락 후 3개 구매 시",
        detail: ["동일 제품 3개 구매", "(구형 재고 포함 가능)"],
        reward: "이너제틱 콜라겐 60포",
    },
];

interface CardBenefit {
    bank: string;
    headline: string;
    detail: string;
    note: string;
}

const CARD_BENEFITS: CardBenefit[] = [
    {
        bank: "삼성카드 LINK",
        headline: "결제 금액대별 청구할인",
        detail: "25만 원 이상 결제 시 1만 원 · 50만 원 이상 결제 시 2만 원 청구할인",
        note: "1인 1회 · 모니모(Monimo) 앱 LINK 결제 대상 · 삼성페이 가능 (법인·체크·선불·간편결제 제외)",
    },
    {
        bank: "현대카드 M포인트",
        headline: "포인트로 결제 금액 절반까지",
        detail: "보유 M포인트로 결제 금액의 최대 50%, 최대 5만 포인트까지 사용",
        note: "포인트 부족 시 보유 포인트 한도 내 차감 · 간편결제 시 사용 불가",
    },
];

/* ============================================================================
 * 1. 유틸 · 훅
 * ==========================================================================*/

/** 스크롤 진입 시 부드럽게 드러나는 연출. prefers-reduced-motion을 존중합니다. */
function useReveal<T extends HTMLElement>() {
    const ref = useRef<T | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const prefersReduced =
            typeof window !== "undefined" &&
            window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

        if (prefersReduced) {
            setVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return { ref, visible };
}

const Reveal: React.FC<{ children: ReactNode; delay?: number; className?: string }> = ({
    children,
    delay = 0,
    className = "",
}) => {
    const { ref, visible } = useReveal<HTMLDivElement>();
    return (
        <div
            ref={ref}
            className={`tw-transition tw-duration-700 tw-ease-out motion-reduce:tw-transition-none ${visible ? "tw-translate-y-0 tw-opacity-100" : "tw-translate-y-4 tw-opacity-0"
                } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

/* ============================================================================
 * 2. 작은 시각 부품들 (아이콘 · 서명 요소)
 * ==========================================================================*/

/**
 * 달-게이지(Moon Gauge)
 * 이 페이지의 시그니처 요소입니다. 추석 = 보름달이라는 소재를 그대로 가져와,
 * "혜택이 커질수록 달이 차오른다"는 규칙으로 할인율·포인트 구간을 표현합니다.
 * 단순 장식이 아니라 fill 값 자체가 혜택의 크기를 나타내는 정보 장치입니다.
 */
const MoonGauge: React.FC<{ fill: number; size?: number; children?: ReactNode }> = ({
    fill,
    size = 84,
    children,
}) => (
    <div
        className="tw-relative tw-shrink-0 tw-rounded-full tw-overflow-hidden"
        style={{
            width: size,
            height: size,
            background: "radial-gradient(circle at 32% 28%, #142a52, #081226 78%)",
            boxShadow: `inset 0 0 0 1.5px rgba(241,228,192,0.4), 0 6px 18px rgba(8,18,38,0.35)`,
        }}
        aria-hidden="true"
    >
        <div
            className="tw-absolute tw-inset-x-0 tw-bottom-0"
            style={{
                height: `${fill}%`,
                background:
                    "radial-gradient(circle at 50% 20%, #FFFBEF 0%, #F1E4C0 55%, #E4CE96 100%)",
                boxShadow: "0 0 22px 4px rgba(241,228,192,0.55)",
                transition: "height 900ms cubic-bezier(0.22,1,0.36,1)",
            }}
        />
        {children && (
            <div className="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center">
                <div className="tw-flex tw-items-center tw-justify-center tw-rounded-full tw-bg-[#0E1E3F] tw-px-2.5 tw-py-1 tw-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
                    {children}
                </div>
            </div>
        )}
    </div>
);

/** 손글씨로 쓱 두른 듯한 원 — 눈에 띄어야 할 숫자 뒤에 배치하는 강조 장치 */
const HandCircle: React.FC<{ className?: string; color?: string }> = ({
    className = "",
    color = COLOR.red,
}) => (
    <svg
        viewBox="0 0 220 100"
        className={`tw-absolute tw-pointer-events-none ${className}`}
        aria-hidden="true"
    >
        <path
            d="M18,52 C14,20 62,6 112,7 C165,8 205,24 202,53 C199,80 152,93 108,92 C56,91 22,80 18,52 Z"
            fill="none"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
        />
    </svg>
);

/** 섹션 사이 구분선 — 곧은 직선 대신, 달의 궤도를 닮은 완만한 곡선 */
const OrbitDivider: React.FC<{ tone?: "onNavy" | "onPaper" }> = ({ tone = "onPaper" }) => (
    <svg
        viewBox="0 0 400 24"
        preserveAspectRatio="none"
        className="tw-w-full tw-h-6"
        aria-hidden="true"
    >
        <path
            d="M0,4 C90,26 130,-8 200,10 C270,26 320,-4 400,10"
            fill="none"
            stroke={tone === "onNavy" ? "rgba(241,228,192,0.28)" : "rgba(14,30,63,0.16)"}
            strokeWidth="1.5"
        />
    </svg>
);

const IconChevron: React.FC<{ open: boolean; className?: string }> = ({
    open,
    className = "",
}) => (
    <svg
        viewBox="0 0 24 24"
        className={`tw-transition-transform tw-duration-300 ${open ? "tw-rotate-180" : ""} ${className}`}
        fill="none"
        aria-hidden="true"
    >
        <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const IconCard: React.FC<{ className?: string }> = ({ className = "" }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <rect x="2.5" y="5.5" width="19" height="13" rx="2.2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M2.5 9.5h19" stroke="currentColor" strokeWidth="1.8" />
        <path d="M6 14.5h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
);

const IconGift: React.FC<{ className?: string }> = ({ className = "" }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <rect x="3" y="9.5" width="18" height="11" rx="1.4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3 13.2h18" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 9.5v11" stroke="currentColor" strokeWidth="1.8" />
        <path
            d="M12 9.5c0-2.6-1.8-4.6-4-4.6-1.5 0-2.6 1-2.6 2.3S6.5 9.5 8 9.5h4Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
        />
        <path
            d="M12 9.5c0-2.6 1.8-4.6 4-4.6 1.5 0 2.6 1 2.6 2.3S16.5 9.5 15 9.5h-3Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
        />
    </svg>
);

/* ============================================================================
 * 3. 반복 구조 부품
 * ==========================================================================*/

/** 큰 글씨 우선 원칙에 맞춘 접고 펼치는 상세 정보 박스(고령 사용자를 위한 정보 분리) */
const Disclosure: React.FC<{
    title: string;
    children: ReactNode;
    defaultOpen?: boolean;
    tone?: "onPaper" | "onNavy";
}> = ({ title, children, defaultOpen = false, tone = "onPaper" }) => {
    const [open, setOpen] = useState(defaultOpen);
    const isNavy = tone === "onNavy";
    return (
        <div
            className={`tw-border-t tw-pt-4 tw-mt-5 ${isNavy ? "tw-border-white/15" : "tw-border-[#0E1E3F]/10"
                }`}
        >
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="tw-flex tw-w-full tw-items-center tw-justify-between tw-gap-3 tw-text-left"
                aria-expanded={open}
            >
                <span
                    className={`tw-text-[15px] sm:tw-text-base tw-font-semibold ${isNavy ? "tw-text-[#F1E4C0]" : "tw-text-[#0E1E3F]/80"
                        }`}
                >
                    {title}
                </span>
                <IconChevron
                    open={open}
                    className={`tw-w-5 tw-h-5 tw-shrink-0 ${isNavy ? "tw-text-[#F1E4C0]/70" : "tw-text-[#0E1E3F]/60"}`}
                />
            </button>
            <div
                className={`tw-grid tw-transition-all tw-duration-300 tw-ease-out ${open ? "tw-grid-rows-[1fr] tw-opacity-100 tw-mt-3" : "tw-grid-rows-[0fr] tw-opacity-0"
                    }`}
            >
                <div className="tw-overflow-hidden">
                    <div
                        className={`tw-text-[14px] sm:tw-text-[15px] tw-leading-7 ${isNavy ? "tw-text-white/60" : "tw-text-[#0E1E3F]/65"
                            }`}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

/** 브랜드 칩 목록 — 6개 이상이면 "더보기"로 접어 화면 과부하를 줄입니다 */
const ChipList: React.FC<{ items: string[] }> = ({ items }) => {
    const [expanded, setExpanded] = useState(false);
    const LIMIT = 6;
    const shown = expanded ? items : items.slice(0, LIMIT);
    const hiddenCount = items.length - LIMIT;

    return (
        <div className="tw-flex tw-flex-wrap tw-gap-2">
            {shown.map((item, i) => (
                <span
                    key={item}
                    className="tw-inline-flex tw-items-center tw-rounded-full tw-bg-[#0E1E3F]/[0.05] tw-px-3.5 tw-py-1.5 tw-text-[13.5px] sm:tw-text-sm tw-font-medium tw-text-[#0E1E3F]/75"
                    style={{ transform: i % 2 === 0 ? "rotate(-0.4deg)" : "rotate(0.4deg)" }}
                >
                    {item}
                </span>
            ))}
            {!expanded && hiddenCount > 0 && (
                <button
                    type="button"
                    onClick={() => setExpanded(true)}
                    className="tw-inline-flex tw-items-center tw-rounded-full tw-border tw-border-[#C4202E]/30 tw-px-3.5 tw-py-1.5 tw-text-[13.5px] sm:tw-text-sm tw-font-semibold tw-text-[#C4202E]"
                >
                    +{hiddenCount}개 더보기
                </button>
            )}
        </div>
    );
};

/** 섹션 상단에 반복되는 "번호 없는" 라벨 — 순서가 아니라 구분을 위한 표식 */
const Eyebrow: React.FC<{ children: ReactNode; tone?: "onNavy" | "onPaper" }> = ({
    children,
    tone = "onPaper",
}) => (
    <span
        className={`tw-inline-flex tw-items-center tw-gap-2 tw-text-[13px] sm:tw-text-sm tw-font-bold tw-tracking-[0.14em] ${tone === "onNavy" ? "tw-text-[#F1E4C0]" : "tw-text-[#C4202E]"
            }`}
    >
        <span
            className={`tw-h-[6px] tw-w-[6px] tw-rounded-full ${tone === "onNavy" ? "tw-bg-[#F1E4C0]" : "tw-bg-[#C4202E]"
                }`}
        />
        {children}
    </span>
);

const SectionTitle: React.FC<{
    eyebrow: string;
    title: ReactNode;
    desc?: ReactNode;
    tone?: "onNavy" | "onPaper";
}> = ({ eyebrow, title, desc, tone = "onPaper" }) => (
    <div className="tw-mb-8 sm:tw-mb-10">
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        <h2
            className={`tw-mt-3 tw-font-display tw-text-[28px] sm:tw-text-[34px] tw-leading-[1.28] tw-font-bold tw-tracking-[-0.01em] ${tone === "onNavy" ? "tw-text-white" : "tw-text-[#161B2E]"
                }`}
        >
            {title}
        </h2>
        {desc && (
            <p
                className={`tw-mt-3 tw-text-[16px] sm:tw-text-[17px] tw-leading-8 ${tone === "onNavy" ? "tw-text-white/70" : "tw-text-[#161B2E]/65"
                    }`}
            >
                {desc}
            </p>
        )}
    </div>
);

const PillButton: React.FC<{
    href: string;
    children: ReactNode;
    variant?: "solid" | "outline" | "ghost";
    className?: string;
}> = ({ href, children, variant = "solid", className = "" }) => {
    const base =
        "tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-rounded-full tw-px-6 tw-py-3.5 sm:tw-py-4 tw-text-[15.5px] sm:tw-text-base tw-font-bold tw-transition tw-duration-200 active:tw-scale-[0.98] tw-whitespace-nowrap";
    const variants: Record<string, string> = {
        solid:
            "tw-bg-[#C4202E] tw-text-white tw-shadow-[0_10px_24px_-8px_rgba(196,32,46,0.65)] hover:tw-bg-[#A81B27]",
        outline:
            "tw-border-2 tw-border-white/70 tw-text-white hover:tw-bg-white/10",
        ghost:
            "tw-border-2 tw-border-[#0E1E3F] tw-text-[#0E1E3F] hover:tw-bg-[#0E1E3F] hover:tw-text-white",
    };
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${base} ${variants[variant]} ${className}`}
        >
            {children}
        </a>
    );
};

/* ============================================================================
 * 4. 메인 컴포넌트
 * ==========================================================================*/

const ChuseokEventPage: React.FC = () => {
    const [stickyVisible, setStickyVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setStickyVisible(window.scrollY > 560);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className="tw-min-h-screen tw-bg-[#EEF1F6] tw-font-body tw-text-[#161B2E] tw-antialiased">
            {/* 폰트 & 로컬 스타일 -------------------------------------------------- */}
            <style>{`
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css');
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@500;600;700;900&display=swap');
        .tw-font-display { font-family: 'Noto Serif KR', 'Pretendard', serif; }
        .tw-font-body { font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif; }
        @keyframes chuseok-twinkle { 0%,100% { opacity:.35 } 50% { opacity:1 } }
        .chuseok-star { animation: chuseok-twinkle 3.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .chuseok-star { animation: none !important; }
        }
      `}</style>

            {/* ============================================================
          HERO — 포스터 원본을 그대로 살리고, 하단에 기간·CTA 바를 덧댐
         ============================================================ */}
            <header className="tw-relative">
                <div className="tw-relative tw-mx-auto tw-max-w-[720px]">
                    <img
                        src={heroPoster}
                        alt="추석엔 건강운, 좋게 선물하세요 — JUNG KWAN JANG 정관장. 보름달 아래 붉은 선물가방을 들고 활짝 웃는 모델."
                        className="tw-w-full tw-h-auto tw-block"
                    />
                    {/* 히어로 하단 그라데이션은 이미지 자체의 밤하늘과 자연스럽게 이어지도록 */}
                    <div className="tw-absolute tw-inset-x-0 tw-bottom-0 tw-h-24 tw-bg-gradient-to-t tw-from-[#0E1E3F] tw-to-transparent tw-pointer-events-none" />
                </div>

                {/* 기간 + CTA 바 */}
                <div className="tw-bg-[#0E1E3F] tw-px-5 tw-pb-7 tw-pt-1 sm:tw-pt-2">
                    <div className="tw-mx-auto tw-max-w-[640px] tw-flex tw-flex-col tw-items-center tw-text-center">
                        <p className="tw-text-[#F1E4C0] tw-text-[15px] sm:tw-text-base tw-font-semibold tw-tracking-wide">
                            2026 정관장 추석 프로모션
                        </p>
                        <p className="tw-mt-1.5 tw-text-white tw-text-[22px] sm:tw-text-[26px] tw-font-display tw-font-bold">
                            8월 27일(목) — 9월 27일(일)
                            <span className="tw-block sm:tw-inline sm:tw-ml-2 tw-text-[16px] sm:tw-text-lg tw-font-body tw-font-medium tw-text-white/60">
                                32일간 진행
                            </span>
                        </p>
                        <div className="tw-mt-6 tw-flex tw-w-full tw-flex-col sm:tw-flex-row tw-gap-3 sm:tw-justify-center">
                            <PillButton href={MEMBERS_URL} variant="solid" className="tw-w-full sm:tw-w-auto">
                                정관장 멤버스 가입하기
                            </PillButton>
                            <PillButton href={SHOP_URL} variant="outline" className="tw-w-full sm:tw-w-auto">
                                정몰에서 선물 구매하기
                            </PillButton>
                        </div>
                    </div>
                </div>
            </header>

            {/* ============================================================
          도입부 카피 — 보름달 모티프를 다음 섹션들의 규칙으로 예고
         ============================================================ */}
            <section className="tw-relative tw-overflow-hidden tw-bg-[#0E1E3F] tw-px-5 tw-py-14 sm:tw-py-16">
                <span className="chuseok-star tw-absolute tw-top-10 tw-left-10 tw-h-1 tw-w-1 tw-rounded-full tw-bg-white/70" />
                <span
                    className="chuseok-star tw-absolute tw-top-24 tw-left-24 tw-h-[3px] tw-w-[3px] tw-rounded-full tw-bg-white/60"
                    style={{ animationDelay: "1.1s" }}
                />
                <span
                    className="chuseok-star tw-absolute tw-bottom-16 tw-left-16 tw-h-[3px] tw-w-[3px] tw-rounded-full tw-bg-white/50"
                    style={{ animationDelay: "1.8s" }}
                />
                <Reveal className="tw-relative tw-mx-auto tw-max-w-[640px] tw-text-center">
                    <p className="tw-font-display tw-text-white tw-text-[24px] sm:tw-text-[30px] tw-leading-[1.5] tw-font-semibold">
                        한가위 보름달이 차오르듯,
                        <br />
                        혜택도 가득 채워드립니다
                    </p>
                    <p className="tw-mt-4 tw-text-white/60 tw-text-[15.5px] sm:tw-text-base tw-leading-7">
                        추선 한정 혜택!
                        <br className="tw-hidden sm:tw-block" />
                        정관장과 함께 풍성한 한가위 보내세요!
                    </p>
                </Reveal>
            </section>

            {/* ============================================================
          SECTION 1 — 전 품목 할인
         ============================================================ */}
            <section className="tw-bg-[#EEF1F6] tw-px-5 tw-py-16 sm:tw-py-20">
                <div className="tw-mx-auto tw-max-w-[680px]">
                    <Reveal>
                        <SectionTitle
                            eyebrow="전 품목 할인"
                            title={
                                <>
                                    정관장 전 품목,
                                    <br />
                                    최대 <span className="tw-relative tw-inline-block tw-text-[#C4202E]">
                                        15%
                                        <HandCircle className="-tw-inset-x-3 -tw-inset-y-2 tw-w-[calc(100%+24px)] tw-h-[calc(100%+16px)]" />
                                    </span>{" "}
                                    할인
                                </>
                            }
                            desc="정관장의 인기 상품! 다양한 품목이 함께 할인됩니다. 아래에서 브랜드별 할인율을 확인하세요."
                        />
                    </Reveal>

                    <div className="tw-space-y-5">
                        {DISCOUNT_TIERS.map((tier, i) => (
                            <Reveal key={tier.percent} delay={i * 90}>
                                <div className="tw-rounded-[28px] tw-bg-white tw-p-6 sm:tw-p-7 tw-shadow-[0_16px_40px_-24px_rgba(14,30,63,0.35)]">
                                    <div className="tw-flex tw-items-center tw-gap-5">
                                        <MoonGauge fill={tier.moonFill} size={76} />
                                        <div className="tw-min-w-0">
                                            <p className="tw-text-[13px] tw-font-bold tw-tracking-wide tw-text-[#C4202E]">
                                                {tier.label}
                                            </p>
                                            <p className="tw-mt-0.5 tw-font-display tw-text-[22px] sm:tw-text-[24px] tw-font-bold tw-text-[#0E1E3F]">
                                                전 품목 {tier.percent}% 할인
                                            </p>
                                        </div>
                                    </div>
                                    <div className="tw-mt-5">
                                        <ChipList items={tier.brands} />
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal>
                        <Disclosure title="할인 제외 품목 확인하기">
                            <ul className="tw-space-y-1.5">
                                {EXCLUDED_ITEMS.map((item) => (
                                    <li key={item} className="tw-flex tw-gap-2">
                                        <span className="tw-text-[#0E1E3F]/40">·</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="tw-mt-3 tw-text-[13.5px] tw-text-[#0E1E3F]/45">
                                연속 할인은 적용되지 않으며, 세부 품목은 정몰 상세 리스트를 따릅니다.
                            </p>
                        </Disclosure>
                    </Reveal>

                    <Reveal>
                        <div className="tw-mt-8">
                            <PillButton href={SHOP_URL} variant="solid" className="tw-w-full sm:tw-w-auto">
                                정몰에서 할인 상품 보러가기
                            </PillButton>
                        </div>
                    </Reveal>
                </div>
            </section>

            <OrbitDivider />

            {/* ============================================================
          SECTION 2 — 얼리버드 포인트 (초기 14일)
         ============================================================ */}
            <section className="tw-relative tw-overflow-hidden tw-bg-[#0E1E3F] tw-px-5 tw-py-16 sm:tw-py-20">
                <div className="tw-mx-auto tw-max-w-[680px]">
                    <Reveal>
                        <SectionTitle
                            tone="onNavy"
                            eyebrow="얼리버드 · 8.27 ~ 9.9, 14일 한정"
                            title={
                                <>
                                    지금 구매하시면
                                    <br />보름달만큼 더 크게 채워드리는 포인트
                                </>
                            }
                            desc="8/27일부터 14일 동안, 구매 금액이 커질수록 달도 포인트도 함께 차오릅니다."
                        />
                    </Reveal>

                    <div className="tw-space-y-4">
                        {POINT_TIERS.map((tier, i) => (
                            <Reveal key={tier.range} delay={i * 90}>
                                <div
                                    className={`tw-flex tw-items-center tw-gap-5 tw-rounded-[26px] tw-p-5 sm:tw-p-6 ${i === POINT_TIERS.length - 1
                                            ? "tw-bg-[#F1E4C0] tw-ring-2 tw-ring-[#C4202E] tw-shadow-[0_16px_44px_-16px_rgba(241,228,192,0.35)]"
                                            : "tw-bg-white/[0.06] tw-ring-1 tw-ring-white/10"
                                        }`}
                                    style={{ transform: i % 2 === 0 ? "rotate(-0.25deg)" : "rotate(0.25deg)" }}
                                >
                                    <MoonGauge fill={tier.moonFill} size={64} />
                                    <div className="tw-min-w-0 tw-flex-1">
                                        <p
                                            className={`tw-text-[14px] sm:tw-text-[15px] tw-font-medium ${i === POINT_TIERS.length - 1 ? "tw-text-[#0E1E3F]/70" : "tw-text-white/55"
                                                }`}
                                        >
                                            {tier.range}
                                        </p>
                                        <p
                                            className={`tw-mt-0.5 tw-font-display tw-text-[21px] sm:tw-text-[23px] tw-font-bold ${i === POINT_TIERS.length - 1 ? "tw-text-[#8F1620]" : "tw-text-[#F1E4C0]"
                                                }`}
                                        >
                                            {tier.reward}
                                        </p>
                                        {tier.sub && (
                                            <p className="tw-mt-0.5 tw-text-[13.5px] sm:tw-text-sm tw-font-semibold tw-text-[#8F1620]/80">
                                                {tier.sub}
                                            </p>
                                        )}
                                    </div>
                                    {i === POINT_TIERS.length - 1 && (
                                        <span className="tw-hidden sm:tw-inline-flex tw-shrink-0 tw-items-center tw-rounded-full tw-bg-[#C4202E] tw-px-3 tw-py-1 tw-text-[12px] tw-font-bold tw-text-white">
                                            최대 혜택
                                        </span>
                                    )}
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal>
                        <div className="tw-mt-6 tw-border-t tw-border-white/10 tw-pt-5 tw-text-[13.5px] sm:tw-text-[14px] tw-leading-6 tw-text-white/45">
                            멤버스 1인 1회 · 비연속 적용 · 최종 결제 금액 기준으로 지급됩니다.
                            <br />
                            적립된 포인트의 유효기간은 적립일로부터 3개월입니다.
                        </div>
                    </Reveal>

                    <Reveal>
                        <div className="tw-mt-8">
                            <PillButton href={MEMBERS_URL} variant="outline" className="tw-w-full sm:tw-w-auto">
                                멤버스 가입하고 포인트 받기
                            </PillButton>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ============================================================
          SECTION 3 — 신규 회원 특전 (선물 가방 비주얼 포인트)
         ============================================================ */}
            <section className="tw-bg-[#EEF1F6] tw-px-5 tw-py-16 sm:tw-py-20">
                <div className="tw-mx-auto tw-max-w-[680px]">
                    <Reveal>
                        <Eyebrow>[신규 회원 혜택] · 신규 가입 특전</Eyebrow>
                    </Reveal>

                    <div className="tw-mt-6 tw-overflow-hidden tw-rounded-[32px] tw-bg-white tw-shadow-[0_20px_48px_-24px_rgba(14,30,63,0.35)]">
                        <Reveal>
                            <img
                                src={giftBox}
                                alt="정관장 붉은 선물가방과 토끼 모양 참"
                                className="tw-w-full tw-aspect-[865/704] tw-object-cover"
                            />
                        </Reveal>
                        <div className="tw-p-6 sm:tw-p-9">
                            <h3 className="tw-font-display tw-text-[24px] sm:tw-text-[28px] tw-font-bold tw-leading-[1.35] tw-text-[#161B2E]">
                                처음이라 더 반가운 분들께,
                                <br />
                                특별 선물을 드립니다
                            </h3>
                            <p className="tw-mt-4 tw-text-[16px] sm:tw-text-[17px] tw-leading-8 tw-text-[#161B2E]/65">
                                정관장 멤버스에 새로 가입하고 5만 원 이상 구매하시면, 정성 담은{" "}
                                <strong className="tw-text-[#C4202E]">천녹톤(3포)</strong>를 챙겨드립니다.
                            </p>
                            <div className="tw-mt-7 tw-flex tw-flex-col sm:tw-flex-row tw-gap-3">
                                <PillButton href={MEMBERS_URL} variant="solid" className="tw-w-full sm:tw-w-auto">
                                    <IconGift className="tw-w-5 tw-h-5" />
                                    멤버스 가입하고 선물 받기
                                </PillButton>
                            </div>
                            <p className="tw-mt-5 tw-text-[13.5px] sm:tw-text-[14px] tw-text-[#161B2E]/40">
                                멤버스 1인 1회 · SMS 수신 동의 시에만 증정됩니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <OrbitDivider />

            {/* ============================================================
          SECTION 4 — 결합구매 사은품
         ============================================================ */}
            <section className="tw-bg-white tw-px-5 tw-py-16 sm:tw-py-20">
                <div className="tw-mx-auto tw-max-w-[680px]">
                    <Reveal>
                        <SectionTitle
                            eyebrow="COMBO GIFT · 함께 사면 커지는 선물"
                            title="세트 구매로 더 많은 혜택 받기"
                            desc="아래 조합으로 구매하시면, 결제 후 사은품을 별도로 챙겨드립니다."
                        />
                    </Reveal>

                    <div className="tw-grid tw-gap-5 sm:tw-grid-cols-3">
                        {COMBO_GIFTS.map((combo, i) => (
                            <Reveal key={combo.reward} delay={i * 100}>
                                <div
                                    className="tw-flex tw-h-full tw-flex-col tw-rounded-[24px] tw-border tw-border-[#0E1E3F]/[0.08] tw-p-6"
                                    style={{ transform: i === 1 ? "rotate(0deg)" : i === 0 ? "rotate(-0.4deg)" : "rotate(0.4deg)" }}
                                >
                                    <span className="tw-inline-flex tw-w-fit tw-items-center tw-rounded-full tw-bg-[#C4202E]/[0.08] tw-px-3 tw-py-1 tw-text-[12.5px] tw-font-bold tw-text-[#C4202E]">
                                        {combo.condition}
                                    </span>
                                    {combo.enumerate ? (
                                        <ol className="tw-mt-4 tw-w-full tw-flex-1 tw-space-y-1 tw-pl-0 tw-text-left">
                                            {combo.detail.map((line, idx) => (
                                                <li key={line} className="tw-flex tw-gap-1.5 tw-text-[15px] sm:tw-text-[15px] tw-leading-6 tw-text-[#161B2E]/55">
                                                    <span className="tw-shrink-0 tw-font-semibold tw-text-[#C4202E]">{idx + 1}.</span>
                                                    <span>{line}</span>
                                                </li>
                                            ))}
                                        </ol>
                                    ) : (
                                        <p className="tw-mt-4 tw-text-[15px] sm:tw-text-[15px] tw-leading-6 tw-text-[#161B2E]/55 tw-flex-1">
                                            {combo.detail.map((line, idx) => (
                                                <React.Fragment key={line}>
                                                    {line}
                                                    {idx < combo.detail.length - 1 && <br />}
                                                </React.Fragment>
                                            ))}
                                        </p>
                                    )}
                                    <div className="tw-mt-5 tw-flex tw-items-start tw-gap-2 tw-border-t tw-border-[#0E1E3F]/[0.08] tw-pt-4">
                                        <IconGift className="tw-mt-0.5 tw-w-5 tw-h-5 tw-text-[#0E1E3F]/70 tw-shrink-0" />
                                        <p className="tw-font-display tw-text-[16px] sm:tw-text-[17px] tw-font-bold tw-leading-snug tw-text-[#0E1E3F]">
                                            {combo.reward}
                                        </p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal>
                        <p className="tw-mt-6 tw-text-[13.5px] sm:tw-text-[14px] tw-leading-6 tw-text-[#161B2E]/40">
                            조합별로 멤버스 1인 1회, 비연속 적용됩니다. 증정 수량은 추후 정산됩니다.
                            구형 재고가 포함될 수 있습니다 (화애락 진 → 터닝미 · 화애락 후 → 와이즈미/액티브미 · 홍천옹 건 → RXGIN 홍천옹).
                        </p>
                    </Reveal>

                    <Reveal>
                        <div className="tw-mt-8">
                            <PillButton href={SHOP_URL} variant="ghost" className="tw-w-full sm:tw-w-auto">
                                정몰에서 조합 상품 담으러가기
                            </PillButton>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ============================================================
          SECTION 5 — 로스리더 특가 (놓치면 아쉬운 특가)
         ============================================================ */}
            <section className="tw-bg-[#EEF1F6] tw-px-5 tw-py-16 sm:tw-py-20">
                <div className="tw-mx-auto tw-max-w-[680px]">
                    <Reveal>
                        <Eyebrow>다시는 없을 절호의 기회! 놓치면 아쉬운 특가</Eyebrow>
                    </Reveal>

                    <Reveal delay={80}>
                        <div
                            className="tw-relative tw-mt-6 tw-rounded-[28px] tw-bg-[#0E1E3F] tw-p-7 sm:tw-p-10 tw-text-white tw-overflow-hidden"
                            style={{
                                clipPath:
                                    "polygon(0% 3%, 3% 0%, 97% 0%, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0% 97%)",
                            }}
                        >
                            <div className="tw-absolute -tw-right-10 -tw-top-10 tw-h-40 tw-w-40 tw-rounded-full tw-bg-[#F1E4C0]/[0.06]" />
                            <p className="tw-text-[14px] tw-font-semibold tw-tracking-wide tw-text-[#F1E4C0]">
                                홍삼진명 50ml × 30포
                            </p>
                            <div className="tw-mt-4 tw-flex tw-flex-wrap tw-items-end tw-gap-x-4 tw-gap-y-1">
                                <span className="tw-text-[17px] tw-text-white/40 tw-line-through">62,000원</span>
                                <span className="tw-relative tw-font-display tw-text-[40px] sm:tw-text-[48px] tw-font-bold tw-leading-none">
                                    49,600
                                    <span className="tw-text-[22px] sm:tw-text-[26px] tw-font-body tw-font-semibold">원</span>
                                </span>
                            </div>
                            <div className="tw-relative tw-mt-4 tw-inline-block">
                                <span className="tw-relative tw-z-10 tw-font-display tw-text-[22px] tw-font-bold tw-text-[#F1E4C0]">
                                    20% 할인
                                </span>
                                <HandCircle className="-tw-inset-x-4 -tw-inset-y-2.5 tw-w-[calc(100%+32px)] tw-h-[calc(100%+20px)] tw-z-0" color={COLOR.cream} />
                            </div>
                            <div className="tw-mt-7">
                                <PillButton href={SHOP_URL} variant="outline">
                                    정몰에서 특가로 구매하기
                                </PillButton>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            <OrbitDivider />

            {/* ============================================================
          SECTION 6 — 카드 결제 혜택
         ============================================================ */}
            <section className="tw-bg-white tw-px-5 tw-py-16 sm:tw-py-20">
                <div className="tw-mx-auto tw-max-w-[680px]">
                    <Reveal>
                        <SectionTitle
                            eyebrow="PAYMENT · 결제 혜택"
                            title="추가 카드사 할인 혜택"
                        />
                    </Reveal>

                    <div className="tw-grid tw-gap-5 sm:tw-grid-cols-2">
                        {CARD_BENEFITS.map((card, i) => (
                            <Reveal key={card.bank} delay={i * 100}>
                                <div className="tw-h-full tw-rounded-[24px] tw-bg-[#EEF1F6] tw-p-6 sm:tw-p-7">
                                    <div className="tw-flex tw-h-11 tw-w-11 tw-items-center tw-justify-center tw-rounded-full tw-bg-[#0E1E3F] tw-text-[#F1E4C0]">
                                        <IconCard className="tw-w-5 tw-h-5" />
                                    </div>
                                    <p className="tw-mt-4 tw-text-[14px] tw-font-bold tw-text-[#C4202E]">{card.bank}</p>
                                    <p className="tw-mt-1 tw-font-display tw-text-[20px] sm:tw-text-[21px] tw-font-bold tw-text-[#161B2E] tw-leading-snug">
                                        {card.headline}
                                    </p>
                                    <p className="tw-mt-3 tw-text-[15px] sm:tw-text-[15.5px] tw-leading-7 tw-text-[#161B2E]/65">
                                        {card.detail}
                                    </p>
                                    <p className="tw-mt-4 tw-border-t tw-border-[#0E1E3F]/[0.08] tw-pt-3 tw-text-[13px] sm:tw-text-[13.5px] tw-leading-6 tw-text-[#161B2E]/40">
                                        {card.note}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal>
                        <div className="tw-mt-8">
                            <PillButton href={SHOP_URL} variant="ghost" className="tw-w-full sm:tw-w-auto">
                                정몰에서 카드 혜택으로 구매하기
                            </PillButton>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ============================================================
          FOOTER — 클로징 CTA + 브랜드 마크
         ============================================================ */}
            <footer className="tw-relative tw-overflow-hidden tw-bg-[#081226] tw-px-5 tw-py-16 sm:tw-py-20">
                <div className="tw-relative tw-mx-auto tw-max-w-[640px] tw-text-center">
                    <Reveal>
                        <div className="tw-inline-flex tw-items-center tw-justify-center tw-rounded-2xl tw-bg-white tw-px-7 tw-py-4 sm:tw-px-8 sm:tw-py-5 tw-shadow-[0_16px_32px_-14px_rgba(0,0,0,0.5)]">
                            <img
                                src={brandLogo}
                                alt="JUNG KWAN JANG 정관장 로고"
                                className="tw-h-6 sm:tw-h-7 tw-w-auto"
                            />
                        </div>
                        <p className="tw-mt-6 tw-font-display tw-text-[24px] sm:tw-text-[28px] tw-font-bold tw-leading-[1.4] tw-text-white">
                            이번 한가위, 정관장과 함께
                            <br />
                            건강운 좋게 선물하세요
                        </p>
                        <div className="tw-mt-8 tw-flex tw-flex-col sm:tw-flex-row tw-gap-3 sm:tw-justify-center">
                            <PillButton href={MEMBERS_URL} variant="solid" className="tw-w-full sm:tw-w-auto">
                                멤버스 가입하기
                            </PillButton>
                            <PillButton href={SHOP_URL} variant="outline" className="tw-w-full sm:tw-w-auto">
                                정몰 쇼핑하기
                            </PillButton>
                        </div>
                    </Reveal>

                    <Reveal delay={120}>
                        <div className="tw-mt-14 tw-text-left">
                            <Disclosure title="유의사항 전체보기" tone="onNavy">
                                <ul className="tw-space-y-2">
                                    <li>· 전 품목 할인: 구형 재고 포함, 일부 품목 제외 (제외 품목은 위 상세 참고)</li>
                                    <li>· 얼리버드 포인트: 멤버스 1인 1회, 비연속 적용, 최종 결제 금액 기준, 포인트 유효기간 적립일로부터 3개월</li>
                                    <li>· 신규가입 특전: 멤버스 1인 1회, SMS 수신 동의 필수</li>
                                    <li>· 결합구매 사은품: 조합별 1인 1회, 비연속 적용, 증정 수량 추후 정산</li>
                                    <li>· 삼성카드 LINK: 1인 1회, 비연속 적용, 모니모 앱 LINK 대상 (법인·체크·선불·충전·기프트카드 간편결제 제외, 삼성페이 가능)</li>
                                    <li>· 현대카드 M포인트: 포인트 부족 시 보유 포인트 한도 내 차감, 간편결제 시 사용 불가</li>
                                </ul>
                            </Disclosure>
                        </div>
                    </Reveal>

                    <p className="tw-mt-12 tw-text-[13px] tw-tracking-wide tw-text-white/30">
                        JUNG KWAN JANG 정관장
                    </p>
                </div>
            </footer>

            {/* ============================================================
          모바일 고정 하단 CTA — 스크롤 후 노출, 되돌아가지 않아도 바로 이동
         ============================================================ */}
            <div
                className={`tw-fixed tw-inset-x-0 tw-bottom-0 tw-z-50 tw-px-4 tw-pb-4 tw-pt-3 tw-transition-transform tw-duration-300 sm:tw-hidden ${stickyVisible ? "tw-translate-y-0" : "tw-translate-y-full"
                    }`}
            >
            </div>

            {/* 고정 바에 가려지지 않도록 모바일 하단 여백 확보 */}
            <div className="tw-h-24 sm:tw-h-0" aria-hidden="true" />
        </div>
    );
};

export default ChuseokEventPage;
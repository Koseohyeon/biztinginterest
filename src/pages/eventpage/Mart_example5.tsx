"use client";
import { useEffect, useState } from "react";

/* ══ 상품 이미지 (Unsplash) ══ */
const IMG = {
  hanwoo:      "https://images.unsplash.com/photo-1723893905879-0e309c2a8e06?w=300&q=80",
  shrimp:      "https://images.unsplash.com/photo-1504309250229-4f08315f3b5c?w=300&q=80",
  cherry:      "https://images.unsplash.com/photo-1520236060906-9c5ed525b025?w=300&q=80",
  tofu:        "https://images.unsplash.com/photo-1722635940350-d1b2e5129379?w=300&q=80",
  egg:         "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=300&q=80",
  milk:        "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&q=80",
  squid:       "https://images.unsplash.com/photo-1599055712783-0f505afa412a?w=300&q=80",
  peach:       "https://images.unsplash.com/photo-1570978561297-793391262fea?w=300&q=80",
  onion:       "https://images.unsplash.com/photo-1508747703725-719777637510?w=300&q=80",
  chicken:     "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&q=80",
  strawberry:  "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=300&q=80",
  salad:       "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&q=80",
  mushroom:    "https://images.unsplash.com/photo-1586686804243-d763a9afb755?w=300&q=80",
  juice:       "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&q=80",
  pork:        "https://images.unsplash.com/photo-1623047437095-27418540c288?w=300&q=80",
  bread:       "https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=300&q=80",
};

const SLIDE_STYLE = `
  @keyframes slideLoop {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`;

const C = {
  primary:    "#FF6F61",
  deep:       "#E05A4D",
  mid:        "#C4524A",
  light:      "#FFE8E4",
  lighter:    "#FFF4F2",
  page:       "#FFF8F3",
  border:     "#FFD8D0",
  borderMid:  "#FFBFB0",
  accent:     "#FF3B30",
  yellow:     "#FFF3CD",
  yellowText: "#7A5C2E",
  textDark:   "#3F3A39",
  textMid:    "#7A5F5A",
  textLight:  "#B89C97",
  textFade:   "#D8C4C0",
  heroDark:   "#dc9385",
  heroDark2:  "#f32d0a",
  coupon1:    "linear-gradient(135deg,#FF6F61 0%,#E05A4D 100%)",
  coupon2:    "linear-gradient(135deg,#FFA07A 0%,#FF7F5E 100%)",
  coupon3:    "linear-gradient(135deg,#FFB347 0%,#FF8C42 100%)",
  heroGrad:   "linear-gradient(150deg,#FF9A8B 0%,#FF6F61 40%,#E05A4D 100%)",
  bannerGrad: "linear-gradient(135deg,#FF6F61,#E05A4D)",
  ctaGrad:    "linear-gradient(135deg,#FF8A7A,#E05A4D)",
  navBg:      "linear-gradient(135deg,#FF8A7A,#E05A4D)",
};

const calcDisc = (orig: number, sale: number) => Math.round((1 - sale / orig) * 100);

type Category = "전체" | "정육" | "해산물" | "과일/채소" | "유제품" | "간식" | "음료" | "기타";

const CATEGORIES: { id: Category; emoji: string }[] = [
  { id:"전체",      emoji:"🛒" },
  { id:"정육",      emoji:"🥩" },
  { id:"해산물",    emoji:"🦐" },
  { id:"과일/채소", emoji:"🍒" },
  { id:"유제품",    emoji:"🥛" },
  { id:"간식",      emoji:"🍪" },
  { id:"음료",      emoji:"🧃" },
  { id:"기타",      emoji:"📦" },
];

const WEEK_DEALS = [
  { img:IMG.hanwoo,  emoji:"🥩", name:"++ 한우 등심",       unit:"100g",          orig:19800, sale:9800,  qty:500,  cat:"정육"      as Category },
  { img:IMG.shrimp,  emoji:"🦐", name:"생새우 (대)",         unit:"100g",          orig:22800, sale:9900,  qty:800,  cat:"해산물"    as Category },
  { img:IMG.cherry,  emoji:"🍒", name:"미국산 체리",         unit:"500g/팩",       orig:11800, sale:4900,  qty:600,  cat:"과일/채소" as Category },
  { img:IMG.tofu,    emoji:"🧀", name:"국산콩 두부",         unit:"부침/찌개겸용", orig:1980,  sale:990,   qty:1000, cat:"기타"      as Category },
  { img:IMG.egg,     emoji:"🥚", name:"동물복지 계란",       unit:"30구",          orig:9900,  sale:5900,  qty:300,  cat:"유제품"    as Category },
  { img:IMG.milk,    emoji:"🥛", name:"서울우유 1L",         unit:"1팩",           orig:3200,  sale:1990,  qty:700,  cat:"유제품"    as Category },
];

const TIME_SALES = [
  { img:IMG.squid,   emoji:"🦑", name:"국산 오징어",      unit:"마리",   orig:4500,  sale:1990, time:"10:00~12:00", cat:"해산물"    as Category },
  { img:IMG.peach,   emoji:"🍑", name:"황도 복숭아",      unit:"4입/팩", orig:12000, sale:4900, time:"13:00~15:00", cat:"과일/채소" as Category },
  { img:IMG.onion,   emoji:"🧅", name:"양파",             unit:"3kg",    orig:6800,  sale:2490, time:"16:00~18:00", cat:"과일/채소" as Category },
  { img:IMG.chicken, emoji:"🍗", name:"국내산 닭다리살",  unit:"500g",   orig:8900,  sale:3490, time:"19:00~21:00", cat:"정육"      as Category },
];

const NEW_ARRIVALS = [
  { img:IMG.strawberry, emoji:"🍓", name:"딸기 (설향)",        unit:"500g/팩", price:7900,  cat:"과일/채소" as Category },
  { img:IMG.salad,      emoji:"🥗", name:"유기농 샐러드 믹스", unit:"200g",    price:3490,  cat:"과일/채소" as Category },
  { img:IMG.mushroom,   emoji:"🍄", name:"참송이 버섯",        unit:"300g",    price:4900,  cat:"과일/채소" as Category },
  { img:IMG.juice,      emoji:"🧃", name:"착즙 사과주스",      unit:"1L",      price:5900,  cat:"음료"      as Category },
  { img:IMG.pork,       emoji:"🥩", name:"제주 흑돼지 삼겹",   unit:"300g",    price:12900, cat:"정육"      as Category },
  { img:IMG.bread,      emoji:"🍞", name:"천연발효 식빵",      unit:"1개",     price:4200,  cat:"간식"      as Category },
];

const COUPONS = [
  { id:"NEW10000", tag:"신규고객 전용", emoji:"🎁", headline:"첫 방문 감사 쿠폰",
    discount:"10,000원", sub:"첫 가입 + 3만원 이상 구매 시",
    expire:"2026.06.30", note:"1인 1회 · 중복 불가",
    heroBg:C.coupon1, tagBg:C.yellow, tagColor:C.yellowText },
  { id:"MEM5000",  tag:"기존고객 감사", emoji:"💌", headline:"단골 고객 할인 쿠폰",
    discount:"5,000원", sub:"2만원 이상 구매 시",
    expire:"2026.06.30", note:"1인 1회 · 중복 불가",
    heroBg:C.coupon2, tagBg:"rgba(255,255,255,0.22)", tagColor:"#fff" },
  { id:"FREE_DEL", tag:"전 고객 대상",  emoji:"🚚", headline:"무료배송 쿠폰",
    discount:"배송비 무료", sub:"2만원 이상 구매 시 (기간 한정)",
    expire:"2026.06.30", note:"1인 1회 · 배송상품 한정",
    heroBg:C.coupon3, tagBg:"rgba(255,255,255,0.22)", tagColor:"#fff" },
];

const TABS = ["상품","위치 확인","할인 쿠폰"];

/* ══ 로그인 알럿 모달 ══ */
function LoginAlert({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div
      className="tw-fixed tw-inset-0 tw-z-[100] tw-flex tw-items-center tw-justify-center tw-px-6"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="tw-w-full tw-rounded-3xl tw-overflow-hidden tw-bg-white"
        style={{ maxWidth: 340, boxShadow: "0 20px 60px rgba(0,0,0,0.18)" }}
      >
        {/* 상단 컬러 배너 */}
        <div className="tw-px-6 tw-pt-7 tw-pb-5 tw-text-center" style={{ background: C.heroGrad }}>
          <div className="tw-text-[44px] tw-mb-2">🎁</div>
          <p className="tw-text-white tw-font-black tw-text-[18px] tw-leading-snug">
            쿠폰을 받으시겠어요?
          </p>
          <p className="tw-text-[12px] tw-mt-1.5" style={{ color: "rgba(255,255,255,0.75)" }}>
            회원가입하고 쿠폰과 마트 소식을 한번에!
          </p>
        </div>

        {/* 본문 */}
        <div className="tw-px-6 tw-pt-5 tw-pb-2">
          <div className="tw-space-y-2.5">
            {[
              { icon: "✅", text: "신규가입 즉시 10,000원 쿠폰 지급" },
              { icon: "🔔", text: "프레시마트 최신 할인 소식 알림" },
              { icon: "🚚", text: "첫 구매 무료배송 혜택" },
            ].map((item) => (
              <div key={item.text} className="tw-flex tw-items-center tw-gap-3">
                <span className="tw-text-[16px]">{item.icon}</span>
                <span className="tw-text-[12.5px] tw-font-medium" style={{ color: C.textDark }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 버튼 */}
        <div className="tw-px-6 tw-py-5 tw-flex tw-flex-col tw-gap-2.5">
          <button
            onClick={onConfirm}
            className="tw-w-full tw-py-3.5 tw-rounded-2xl tw-text-[14px] tw-font-bold tw-text-white"
            style={{ background: C.bannerGrad, boxShadow: `0 4px 14px rgba(255,111,97,0.30)` }}
          >
            네이버로 회원가입 · 쿠폰 받기
          </button>
          <button
            onClick={onCancel}
            className="tw-w-full tw-py-3 tw-rounded-2xl tw-text-[13px] tw-font-medium"
            style={{ color: C.textLight, background: C.lighter }}
          >
            다음에 할게요
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══ 쿠폰 카드 (심플) ══ */
function CouponCard({ c, onDownload, unlocked }: { c: typeof COUPONS[0]; onDownload: () => void; unlocked: boolean }) {
  return (
    <div
      className="tw-relative tw-rounded-2xl tw-overflow-hidden tw-mb-4"
      style={{ border: `1px solid ${C.border}`, background: "#fff", boxShadow: "0 2px 12px rgba(255,111,97,0.08)" }}
    >
      {/* 블러 오버레이 — 미로그인 시만 표시 */}
      {!unlocked && (
      <div
        className="tw-absolute tw-inset-0 tw-z-10 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-3"
        style={{ backdropFilter: "blur(10px)", background: "rgba(255,248,243,0.55)" }}
      >
        <div
          className="tw-w-10 tw-h-10 tw-rounded-full tw-flex tw-items-center tw-justify-center"
          style={{ background: C.light }}
        >
          <span className="tw-text-[20px]">🔒</span>
        </div>
        <p className="tw-text-[12px] tw-font-bold" style={{ color: C.textMid }}>
          회원가입 후 쿠폰을 받아보세요
        </p>
        <button
          onClick={onDownload}
          className="tw-px-5 tw-py-2.5 tw-rounded-xl tw-text-[13px] tw-font-bold tw-text-white"
          style={{ background: C.bannerGrad, boxShadow: `0 4px 12px rgba(255,111,97,0.28)` }}
        >
          쿠폰 다운받기
        </button>
      </div>
      )}

      {/* 카드 본문 */}
      <div className="tw-flex tw-items-center tw-gap-4 tw-px-5 tw-py-5" style={{ background: c.heroBg }}>
        <span className="tw-text-[36px]">{c.emoji}</span>
        <div>
          <span
            className="tw-inline-block tw-text-[9px] tw-font-bold tw-px-2 tw-py-0.5 tw-rounded-full tw-mb-1.5"
            style={{ background: c.tagBg, color: c.tagColor }}
          >
            {c.tag}
          </span>
          <p className="tw-text-white tw-font-black tw-text-[26px] tw-leading-none">{c.discount}</p>
          <p className="tw-text-[11px] tw-mt-1" style={{ color: "rgba(255,255,255,0.65)" }}>{c.sub}</p>
        </div>
      </div>
      <div className="tw-px-5 tw-py-3 tw-flex tw-justify-between tw-items-center">
        <span className="tw-text-[10.5px]" style={{ color: C.textLight }}>📅 ~{c.expire}</span>
        <span className="tw-text-[10.5px]" style={{ color: C.textLight }}>{c.note}</span>
      </div>
      {/* 로그인 후 — 쿠폰 다운 완료 표시 */}
      {unlocked && (
        <div className="tw-px-5 tw-pb-5">
          <div
            className="tw-w-full tw-py-3 tw-rounded-xl tw-text-center tw-text-[13px] tw-font-bold"
            style={{ background: C.light, color: C.deep }}
          >
            ✅ 쿠폰이 발급되었습니다
          </div>
        </div>
      )}
    </div>
  );
}

/* ══ CATEGORY BAR ══ */
function CategoryBar({ active, onChange }: { active: Category; onChange: (c: Category) => void }) {
  return (
    <div className="tw-px-4 tw-pt-4 tw-pb-1">
      <div className="tw-flex tw-gap-2 tw-overflow-x-auto tw-py-2" style={{ scrollbarWidth: "none" }}>
        {CATEGORIES.map((c) => {
          const on = active === c.id;
          return (
            <button
              key={c.id}
              onClick={() => onChange(c.id)}
              className="tw-flex-shrink-0 tw-flex tw-flex-col tw-items-center tw-gap-1 tw-transition-all"
              style={{ minWidth: 56 }}
            >
              <div
                className="tw-w-12 tw-h-12 tw-rounded-2xl tw-flex tw-items-center tw-justify-center tw-text-[22px] tw-transition-all"
                style={{
                  background: on ? C.primary : "#fff",
                  border: `1.5px solid ${on ? C.primary : C.border}`,
                  boxShadow: on ? `0 4px 12px rgba(255,111,97,0.28)` : "none",
                }}
              >
                {c.emoji}
              </div>
              <span className="tw-text-[10px] tw-font-bold tw-leading-none" style={{ color: on ? C.deep : C.textLight }}>
                {c.id}
              </span>
            </button>
          );
        })}
      </div>
      <div className="tw-h-px" style={{ background: C.border }} />
    </div>
  );
}

/* ══ SECTION HEADER ══ */
function SecHead({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="tw-px-4 tw-pt-8 tw-pb-3">
      <div className="tw-flex tw-items-center tw-justify-between">
        <div className="tw-flex tw-items-center tw-gap-2">
          <div className="tw-w-[3px] tw-h-[20px] tw-rounded-full" style={{ background: C.primary }} />
          <span className="tw-text-[16px] tw-font-black tw-tracking-tight" style={{ color: C.textDark }}>
            {title}
          </span>
        </div>
        {sub && <span className="tw-text-[10.5px]" style={{ color: C.textLight }}>{sub}</span>}
      </div>
      <div className="tw-mt-3 tw-h-px" style={{ background: C.border }} />
    </div>
  );
}

/* ══ WEEK CARD ══ */
function WeekCard({ item }: { item: typeof WEEK_DEALS[0] }) {
  const disc = calcDisc(item.orig, item.sale);
  return (
    <div
      className="tw-relative tw-bg-white tw-rounded-3xl tw-overflow-hidden tw-flex tw-flex-col"
      style={{ border: `1px solid ${C.border}`, boxShadow: `0 4px 10px rgba(255,111,97,0.10)` }}
    >
      <div
        className="tw-absolute tw-top-2 tw-left-2 tw-z-10 tw-rounded-lg tw-text-white"
        style={{ background: C.accent, padding: "4px 7px" }}
      >
        <span className="tw-text-[11px] tw-font-black tw-leading-none">{disc}% OFF</span>
      </div>
      <div className="tw-w-full tw-aspect-square tw-overflow-hidden" style={{ background: `linear-gradient(145deg,${C.lighter},${C.light})` }}>
        <img src={item.img} alt={item.name} className="tw-w-full tw-h-full tw-object-cover" />
      </div>
      <div className="tw-p-3 tw-flex tw-flex-col tw-flex-1">
        <p className="tw-text-[12.5px] tw-font-bold tw-leading-snug tw-mb-0.5" style={{ color: C.textDark }}>{item.name}</p>
        <p className="tw-text-[10px] tw-mb-2" style={{ color: C.textLight }}>{item.unit}</p>
        <p className="tw-text-[10.5px] tw-line-through" style={{ color: C.textFade }}>{item.orig.toLocaleString()}원</p>
        <p className="tw-text-[18px] tw-font-black tw-leading-tight" style={{ color: C.accent }}>
          {item.sale.toLocaleString()}<span className="tw-text-[11px] tw-font-semibold">원</span>
        </p>
        <div className="tw-mt-auto tw-pt-2 tw-rounded-xl tw-py-1.5 tw-text-center tw-text-[10px] tw-font-bold" style={{ background: C.light, color: C.deep }}>
          한정 {item.qty}팩
        </div>
      </div>
    </div>
  );
}

/* ══ TIME ROW ══ */
function TimeRow({ item }: { item: typeof TIME_SALES[0] }) {
  const disc = calcDisc(item.orig, item.sale);
  return (
    <div
      className="tw-flex tw-items-center tw-gap-3 tw-bg-white tw-rounded-2xl tw-px-4 tw-py-3.5"
      style={{ border: `1px solid ${C.border}`, boxShadow: "0 2px 10px rgba(255,111,97,0.07)" }}
    >
      <div className="tw-w-16 tw-h-16 tw-rounded-2xl tw-overflow-hidden tw-flex-shrink-0" style={{ background: C.light }}>
        <img src={item.img} alt={item.name} className="tw-w-full tw-h-full tw-object-cover" />
      </div>
      <div className="tw-flex-1 tw-min-w-0">
        <p className="tw-text-[13px] tw-font-bold" style={{ color: C.textDark }}>{item.name}</p>
        <p className="tw-text-[10px] tw-mb-1.5" style={{ color: C.textLight }}>{item.unit}</p>
        <span className="tw-inline-block tw-text-[10px] tw-font-bold tw-px-2.5 tw-py-0.5 tw-rounded-full" style={{ background: C.light, color: C.deep }}>
          ⏱ {item.time}
        </span>
      </div>
      <div className="tw-text-right tw-flex-shrink-0">
        <p className="tw-text-[10.5px] tw-line-through" style={{ color: C.textFade }}>{item.orig.toLocaleString()}원</p>
        <p className="tw-text-[17px] tw-font-black tw-leading-tight" style={{ color: C.accent }}>
          {item.sale.toLocaleString()}<span className="tw-text-[11px] tw-font-semibold">원</span>
        </p>
        <span className="tw-inline-block tw-text-white tw-text-[10px] tw-font-black tw-px-2 tw-py-0.5 tw-rounded-full" style={{ background: C.accent }}>
          {disc}%↓
        </span>
      </div>
    </div>
  );
}

/* ══ ARRIVAL ROW ══ */
function ArrivalRow({ item, last }: { item: typeof NEW_ARRIVALS[0]; last: boolean }) {
  return (
    <div className={`tw-flex tw-items-center tw-gap-3 tw-py-3.5 ${last ? "" : "tw-border-b"}`} style={{ borderColor: last ? undefined : C.light }}>
      <div className="tw-w-16 tw-h-16 tw-rounded-2xl tw-overflow-hidden tw-flex-shrink-0" style={{ background: C.light }}>
        <img src={item.img} alt={item.name} className="tw-w-full tw-h-full tw-object-cover" />
      </div>
      <div className="tw-flex-1 tw-min-w-0">
        <p className="tw-text-[13px] tw-font-semibold" style={{ color: C.textDark }}>{item.name}</p>
        <p className="tw-text-[10.5px]" style={{ color: C.textLight }}>{item.unit}</p>
      </div>
      <div className="tw-text-right tw-flex-shrink-0">
        <span className="tw-block tw-text-[9px] tw-font-black tw-rounded-lg tw-px-1.5 tw-py-0.5 tw-mb-1 tw-text-center tw-text-white" style={{ background: C.primary }}>
          NEW
        </span>
        <p className="tw-text-[14px] tw-font-black" style={{ color: C.textDark }}>{item.price.toLocaleString()}원</p>
      </div>
    </div>
  );
}

/* ══ EMPTY STATE ══ */
function EmptyState() {
  return (
    <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-py-16 tw-px-8">
      <div className="tw-text-[48px] tw-mb-3">🧺</div>
      <p className="tw-text-[14px] tw-font-bold tw-mb-1" style={{ color: C.textMid }}>해당 카테고리 상품이 없어요</p>
      <p className="tw-text-[12px]" style={{ color: C.textLight }}>다른 카테고리를 선택해 보세요</p>
    </div>
  );
}

/* ══ MAIN ══ */
export default function FreshMartLanding() {
  const [tab, setTab] = useState(0);
  const [activeCat, setActiveCat] = useState<Category>("전체");
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [couponUnlocked, setCouponUnlocked] = useState(false);

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = SLIDE_STYLE;
    document.head.appendChild(el);
    return () => { document.head.removeChild(el); };
  }, []);

  // 팝업에서 로그인 완료 신호 수신
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.data?.type === "NAVER_LOGIN_SUCCESS") {
        setCouponUnlocked(true);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const handleDownload = () => setShowLoginAlert(true);
  const handleConfirm = () => {
    setShowLoginAlert(false);
    // 새 탭이 아닌 팝업 창으로 열기
    window.open(
      "https://www.bizting.co.kr/naver/DQrTZu",
      "naverLogin",
      "width=500,height=700,left=200,top=100"
    );
  };
  const handleCancel = () => setShowLoginAlert(false);

  const filterCat = (cat: Category) => activeCat === "전체" || cat === activeCat;
  const filteredWeek    = WEEK_DEALS.filter((i) => filterCat(i.cat));
  const filteredTime    = TIME_SALES.filter((i) => filterCat(i.cat));
  const filteredArrival = NEW_ARRIVALS.filter((i) => filterCat(i.cat));
  const hasAny = filteredWeek.length > 0 || filteredTime.length > 0 || filteredArrival.length > 0;

  const slideItems = [...WEEK_DEALS, ...WEEK_DEALS];
  const maxDisc = Math.max(...WEEK_DEALS.map((i) => calcDisc(i.orig, i.sale)));

  return (
    <div style={{ minHeight: "100vh", background: C.page, display: "flex", justifyContent: "center" }}>
      <div
        className="tw-w-full tw-min-h-screen"
        style={{ maxWidth: 480, background: C.page, position: "relative", fontFamily: "'Noto Sans KR',-apple-system,sans-serif" }}
      >
        {/* 로그인 알럿 */}
        {showLoginAlert && <LoginAlert onConfirm={handleConfirm} onCancel={handleCancel} />}

        {/* HEADER */}
        <header
          className="tw-sticky tw-top-0 tw-z-50"
          style={{ background: "rgba(255,255,255,0.94)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${C.border}` }}
        >
          <div className="tw-flex tw-items-center tw-justify-between tw-px-5 tw-py-3">
            <div className="tw-flex tw-items-center tw-gap-2.5">
              <div className="tw-w-9 tw-h-9 tw-rounded-2xl tw-flex tw-items-center tw-justify-center tw-text-[18px]" style={{ background: C.navBg }}>
                🛒
              </div>
              <div>
                <p className="tw-text-[16px] tw-font-black tw-leading-none" style={{ color: C.deep }}>FreshMart</p>
                <p className="tw-text-[10px] tw-leading-none tw-mt-0.5" style={{ color: C.textLight }}>프레시마트</p>
              </div>
            </div>
            <div className="tw-flex tw-items-center tw-gap-1.5 tw-rounded-xl tw-px-3 tw-py-1.5" style={{ background: C.light }}>
              <span className="tw-text-[10px] tw-font-bold" style={{ color: C.deep }}>금주특가 진행 중</span>
              <span className="tw-w-1.5 tw-h-1.5 tw-rounded-full tw-animate-pulse tw-inline-block" style={{ background: C.primary }} />
            </div>
          </div>
          <div className="tw-flex tw-px-2">
            {TABS.map((t, i) => (
              <button
                key={t}
                onClick={() => { setTab(i); setActiveCat("전체"); }}
                className="tw-flex-1 tw-py-2.5 tw-text-[12px] tw-font-bold tw-relative tw-transition-colors"
                style={{ color: tab === i ? C.deep : C.textLight }}
              >
                {t}
                {tab === i && (
                  <div className="tw-absolute tw-bottom-0 tw-left-4 tw-right-4 tw-h-[2.5px] tw-rounded-full" style={{ background: C.primary }} />
                )}
              </button>
            ))}
          </div>
        </header>

        {/* TAB 0: 상품 */}
        {tab === 0 && (
          <div style={{ paddingBottom: 100 }}>
            <div className="tw-relative tw-overflow-hidden" style={{ background: C.heroGrad }}>
              <div className="tw-absolute tw-right-[-50px] tw-top-[-30px] tw-w-[200px] tw-h-[200px] tw-rounded-full" style={{ background: "rgba(255,255,255,0.07)" }} />
              <div className="tw-absolute tw-right-[15px] tw-top-[35px] tw-w-[110px] tw-h-[110px] tw-rounded-full" style={{ background: "rgba(255,255,255,0.06)" }} />
              <div className="tw-relative tw-px-5 tw-pt-7 tw-pb-6">
                <div className="tw-flex tw-items-start tw-justify-between">
                  <div>
                    <div className="tw-inline-flex tw-items-center tw-gap-1 tw-rounded-full tw-px-3 tw-py-1 tw-mb-3" style={{ background: C.yellow }}>
                      <span className="tw-text-[9px] tw-font-black" style={{ color: C.yellowText }}>🏷</span>
                      <span className="tw-text-[10px] tw-font-black" style={{ color: C.yellowText }}>딱! 7일간</span>
                    </div>
                    <h1 className="tw-text-white tw-font-black tw-leading-none tw-tracking-tighter" style={{ fontSize: 40 }}>금주특가!</h1>
                    <p className="tw-text-[12px] tw-font-medium tw-mt-2" style={{ color: "rgba(255,255,255,0.65)" }}>6.16(월) ~ 6.22(일)</p>
                  </div>
                  <div className="tw-text-right">
                    <p className="tw-text-[9px] tw-uppercase tw-tracking-widest" style={{ color: "rgba(255,255,255,0.5)" }}>한정 수량</p>
                    <p className="tw-font-black tw-leading-none" style={{ fontSize: 52, color: C.yellow }}>{maxDisc}%</p>
                    <p className="tw-text-[11px]" style={{ color: "rgba(255,255,255,0.65)" }}>최대 할인</p>
                  </div>
                </div>
                <div className="tw-mt-5 tw-pb-1 tw-overflow-hidden">
                  <div style={{ display: "flex", gap: 8, width: "max-content", animation: "slideLoop 16s linear infinite" }}>
                    {slideItems.map((item, i) => (
                      <div
                        key={i}
                        className="tw-flex-shrink-0 tw-rounded-2xl tw-flex tw-items-center tw-gap-2"
                        style={{ background: "#fff", minWidth: 120, padding: "6px 10px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
                      >
                        <div className="tw-w-8 tw-h-8 tw-rounded-xl tw-overflow-hidden tw-flex-shrink-0" style={{ background: C.light }}>
                          <img src={item.img} alt={item.name} className="tw-w-full tw-h-full tw-object-cover" />
                        </div>
                        <div>
                          <p className="tw-text-[11px] tw-font-black tw-leading-none" style={{ color: C.primary, whiteSpace: "nowrap" }}>
                            {calcDisc(item.orig, item.sale)}%↓
                          </p>
                          <p className="tw-text-[9px] tw-leading-none tw-mt-0.5" style={{ color: C.textMid, whiteSpace: "nowrap" }}>{item.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <CategoryBar active={activeCat} onChange={setActiveCat} />
            {!hasAny && <EmptyState />}

            {filteredWeek.length > 0 && (
              <>
                <SecHead title="금주특가 상품" sub="한정수량 소진 시 종료" />
                <div className="tw-px-4">
                  <div className="tw-grid tw-grid-cols-2 tw-gap-3">
                    {filteredWeek.map((item) => <WeekCard key={item.name} item={item} />)}
                  </div>
                </div>
              </>
            )}

            {filteredTime.length > 0 && (
              <div className="tw-mx-4 tw-mt-8 tw-rounded-2xl tw-overflow-hidden" style={{ background: C.bannerGrad, boxShadow: "0 4px 16px rgba(255,111,97,0.22)" }}>
                <div className="tw-flex tw-items-center tw-gap-5 tw-px-5 tw-py-4">
                  <span className="tw-text-[25px]">⏰</span>
                  <div>
                    <p className="tw-text-white tw-text-[15px] tw-font-black">타임세일 진행 중!</p>
                    <p className="tw-text-[13px]" style={{ color: "rgba(255,255,255,0.9)" }}>
                      시간대별 최대 {Math.max(...filteredTime.map((i) => calcDisc(i.orig, i.sale)))}% 추가 할인
                    </p>
                  </div>
                </div>
              </div>
            )}

            {filteredTime.length > 0 && (
              <>
                <SecHead title="⚡ 타임세일" sub="시간대별 한정 특가" />
                <div className="tw-px-4 tw-flex tw-flex-col tw-gap-3">
                  {filteredTime.map((item) => <TimeRow key={item.name} item={item} />)}
                </div>
              </>
            )}

            {filteredArrival.length > 0 && (
              <>
                <SecHead title="🆕 금주 신규 입고" sub="이번 주 새로 들어온 상품" />
                <div className="tw-mx-4 tw-bg-white tw-rounded-2xl tw-px-4 tw-py-1" style={{ border: `1px solid ${C.border}`, boxShadow: "0 2px 10px rgba(255,111,97,0.06)" }}>
                  {filteredArrival.map((item, i) => (
                    <ArrivalRow key={item.name} item={item} last={i === filteredArrival.length - 1} />
                  ))}
                </div>
              </>
            )}

            {hasAny && (
              <div className="tw-mx-4 tw-mt-6 tw-rounded-2xl tw-p-4" style={{ background: C.lighter, border: `1px solid ${C.border}` }}>
                <p className="tw-text-[11px] tw-font-bold tw-mb-2" style={{ color: C.textMid }}>📋 행사 유의사항</p>
                {["상품 가격 및 할인율은 점포별로 상이할 수 있습니다.", "한정수량 소진 시 행사가 조기 종료됩니다.", "행사 기간: 2026.06.16(월) ~ 2026.06.22(일)"].map((t, i) => (
                  <p key={i} className="tw-text-[10.5px] tw-leading-relaxed" style={{ color: C.textLight }}>· {t}</p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 1: 위치 */}
        {tab === 1 && (
          <div className="tw-px-4 tw-pt-5" style={{ paddingBottom: 100 }}>
            <div className="tw-bg-white tw-rounded-3xl tw-overflow-hidden" style={{ border: `1px solid ${C.border}`, boxShadow: "0 4px 20px rgba(255,111,97,0.09)" }}>
              <div className="tw-px-5 tw-pt-6 tw-pb-5">
                <p className="tw-text-[19px] tw-font-black tw-mb-5" style={{ color: C.textDark }}>프레시마트 강남점</p>
                <div className="tw-space-y-4">
                  {[
                    { icon: "📍", label: "주소", line1: "서울특별시 강남구 봉은사로 304", line2: "금강빌딩 14층" },
                    { icon: "🕐", label: "운영 시간", line1: "매일 09:00 ~ 22:00", line2: null },
                  ].map((r) => (
                    <div key={r.label} className="tw-flex tw-gap-3 tw-items-start">
                      <div className="tw-w-9 tw-h-9 tw-rounded-xl tw-flex tw-items-center tw-justify-center tw-flex-shrink-0 tw-text-[15px]" style={{ background: C.light, border: `1px solid ${C.borderMid}` }}>
                        {r.icon}
                      </div>
                      <div className="tw-pt-0.5">
                        <p className="tw-text-[10px] tw-font-medium tw-mb-0.5" style={{ color: C.textLight }}>{r.label}</p>
                        <p className="tw-text-[14px] tw-font-semibold tw-leading-snug" style={{ color: C.textDark }}>{r.line1}</p>
                        {r.line2 && <p className="tw-text-[12px] tw-mt-0.5" style={{ color: C.textMid }}>{r.line2}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="tw-mx-5 tw-h-px tw-mb-5" style={{ background: C.border }} />
              <div className="tw-px-5 tw-pb-5">
                <p className="tw-text-[13px] tw-font-bold tw-mb-3" style={{ color: C.textDark }}>교통 안내</p>
                <div className="tw-space-y-2.5">
                  {[
                    { badge: "9호선", text: "봉은사역 3번 출구 → 도보 5분" },
                    { badge: "버스",  text: "봉은사로 정류장 하차 (144, 401)" },
                    { badge: "주차",  text: "건물 지하 1~3층 · 3시간 무료" },
                  ].map((r) => (
                    <div key={r.badge} className="tw-flex tw-items-center tw-gap-3">
                      <span
                        className="tw-text-white tw-text-[10px] tw-font-bold tw-rounded-lg tw-flex-shrink-0"
                        style={{ background: C.primary, minWidth: 44, width: 44, height: 25, display: "flex", alignItems: "center", justifyContent: "center" }}
                      >
                        {r.badge}
                      </span>
                      <p className="tw-text-[12px]" style={{ color: C.textMid }}>{r.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="tw-px-5 tw-pb-6">
                <a
                  href="https://map.naver.com/v5/search/%EC%84%9C%EC%9A%B8%20%EA%B0%95%EB%82%A8%EA%B5%AC%20%EB%B4%89%EC%9D%80%EC%82%AC%EB%A1%9C%20304"
                  target="_blank" rel="noopener noreferrer"
                  className="tw-flex tw-items-center tw-justify-center tw-gap-2 tw-w-full tw-py-4 tw-rounded-2xl tw-text-[14px] tw-font-bold tw-text-white"
                  style={{ background: C.bannerGrad, boxShadow: "0 4px 14px rgba(255,111,97,0.28)" }}
                >
                  <span className="tw-text-[18px]">🗺</span>
                  네이버 지도에서 위치 확인
                </a>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 쿠폰 */}
        {tab === 2 && (
          <div style={{ paddingBottom: 100 }}>
            {/* 쿠폰 탭 헤더 */}
            <div className="tw-px-5 tw-pt-7 tw-pb-6" style={{ background: `linear-gradient(160deg,${C.heroDark} 0%,${C.heroDark2} 100%)` }}>
              <p className="tw-text-[10px] tw-font-bold tw-tracking-[3px] tw-uppercase tw-mb-2 tw-text-white tw-text-center">Coupon Center</p>
              <h2 className="tw-text-[22px] tw-font-black tw-text-white tw-mb-1 tw-text-center">할인 쿠폰</h2>
              <p className="tw-text-[11px] tw-text-center" style={{ color: "rgba(255,255,255,0.65)" }}>
                회원가입 후 쿠폰을 다운받아 사용하세요
              </p>
            </div>

            {/* 잠금 안내 배너 — 미로그인 시만 표시 */}
            {!couponUnlocked && (
            <div className="tw-mx-4 tw-mt-5 tw-mb-4 tw-rounded-2xl tw-p-4 tw-flex tw-items-center tw-gap-3" style={{ background: C.yellow }}>
              <span className="tw-text-[22px]">🔐</span>
              <div>
                <p className="tw-text-[12px] tw-font-bold" style={{ color: C.yellowText }}>회원 전용 쿠폰입니다</p>
                <p className="tw-text-[10.5px] tw-mt-0.5" style={{ color: "#9A7A3A" }}>네이버 회원가입 후 쿠폰을 다운받아 보세요</p>
              </div>
            </div>
            )}
            {couponUnlocked && (
            <div className="tw-mx-4 tw-mt-5 tw-mb-4 tw-rounded-2xl tw-p-4 tw-flex tw-items-center tw-gap-3" style={{ background: "#E8F5E9" }}>
              <span className="tw-text-[22px]">🎉</span>
              <div>
                <p className="tw-text-[12px] tw-font-bold" style={{ color: "#2E7D32" }}>로그인 완료! 쿠폰이 활성화됐어요</p>
                <p className="tw-text-[10.5px] tw-mt-0.5" style={{ color: "#4CAF50" }}>아래 쿠폰을 매장 직원에게 제시해 주세요</p>
              </div>
            </div>
            )}

            {/* 쿠폰 카드 목록 */}
            <div className="tw-px-4">
              {COUPONS.map((c) => <CouponCard key={c.id} c={c} onDownload={handleDownload} unlocked={couponUnlocked} />)}
            </div>

            {/* 유의사항 */}
            <div className="tw-mx-4 tw-mt-2 tw-bg-white tw-rounded-2xl tw-p-5" style={{ border: `1px solid ${C.border}` }}>
              <p className="tw-text-[13px] tw-font-bold tw-mb-3" style={{ color: C.textDark }}>유의사항</p>
              <ul className="tw-space-y-2.5">
                {[
                  "쿠폰은 중복 수령 및 중복 사용이 불가합니다.",
                  "첫 가입 시 한 아이디당 1개 발급됩니다.",
                  "쿠폰은 1인 1회만 사용 가능합니다.",
                  "이벤트 종료 시 예고 없이 조기 마감될 수 있습니다.",
                ].map((txt, i) => (
                  <li key={i} className="tw-flex tw-gap-2.5 tw-items-start">
                    <span
                      className="tw-w-4 tw-h-4 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-[9px] tw-font-black tw-text-white tw-flex-shrink-0 tw-mt-0.5"
                      style={{ background: C.primary }}
                    >
                      {i + 1}
                    </span>
                    <span className="tw-text-[11.5px] tw-leading-snug" style={{ color: C.textLight }}>{txt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* 하단 CTA */}
        <div className="tw-fixed tw-bottom-0 tw-left-0 tw-right-0 tw-flex tw-justify-center tw-pointer-events-none tw-z-40">
          <div
            className="tw-w-full tw-max-w-[480px] tw-pointer-events-auto tw-px-4 tw-pb-6 tw-pt-4"
            style={{ background: `linear-gradient(to top, ${C.page} 65%, rgba(255,248,243,0))` }}
          >
            <div className="tw-flex tw-gap-2.5">
              <button
                onClick={() => setTab(2)}
                className="tw-flex-1 tw-py-3.5 tw-rounded-2xl tw-text-[13px] tw-font-bold tw-bg-white"
                style={{ border: `2px solid ${C.primary}`, color: C.deep, boxShadow: "0 2px 12px rgba(255,111,97,0.12)" }}
              >
                🎟 쿠폰 받기
              </button>
              <button
                onClick={() => setTab(0)}
                className="tw-flex-[1.5] tw-py-3.5 tw-rounded-2xl tw-text-[13px] tw-font-bold tw-text-white"
                style={{ background: "linear-gradient(135deg,#3B4F8C,#1E2F6A)", boxShadow: "0 4px 14px rgba(30,47,106,0.30)" }}
              >
                🛒 할인 품목 보기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
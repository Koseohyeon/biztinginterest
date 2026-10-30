/**
 * 비즈톡 · 비즈팅 소개 페이지  →  /#/Biztalk/Bizting
 *
 * - 스타일은 Tailwind(tw- 접두어)만 사용합니다. (색상·애니메이션은 tailwind.config.js 에 추가해 둠)
 * - 단가·연락처는 아래 "설정" 블록만 고치면 됩니다.
 * - 주소 뒤에 ?edit 를 붙이면 단가를 화면에서 입력해 볼 수 있습니다. (예: /#/Biztalk/Bizting?edit)
 * - ?season=halloween&fmt=banner 처럼 붙이면 해당 시즌/유형으로 바로 열립니다.
 */
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import biztalkLogo from "../../assets/bizting-intro/biztalk-logo-h.png";
import biztingLogo from "../../assets/bizting-intro/bizting-logo.png";
import favicon256 from "../../assets/bizting-intro/favicon.png";
import favicon32 from "../../assets/bizting-intro/favicon-32.png";
import { objSvg, sceneSvg, shade } from "./introArt";
import type { ObjKey, SceneKey } from "./introArt";

/* ================== 설정: 여기만 고치면 됩니다 ================== */
type Fmt = "slide" | "banner";
type Price = number | null;
interface Prices {
  base: { price: number };
  slide: Price[];
  banner: Price[];
}
/** 구좌별 단가 (원 / 건, VAT 별도). 숫자를 넣으면 표시되고, null이면 '추후 반영'으로 보입니다. */
const PRICING: Prices = {
  base: { price: 140 }, // 비즈팅 정가(기존 단가) — 건당, VAT 별도
  slide:  [70, 60, 50, 50, 50, 50],              // 슬라이드형 1~6구좌 (1구좌 = 맨 앞장, 노출 최다) — 현재 예시 단가
  banner: [50, 50, 50, 50, 50, 50],              // 배너 리스트형 1~6구좌 — 현재 예시 단가
};
/** 문의 연락처 (email·tel은 비워 두면 해당 버튼이 보이지 않습니다) */
const CONTACT = { email: "tf@biztalk.co.kr", tel: "" };
/** true 이면 단가표·계산기에 '예시 단가' 안내가 붙습니다. 확정 단가를 넣은 뒤 false 로 바꾸세요. */
const PRICE_IS_SAMPLE = true;
/** 신청 메일에 적어 달라고 안내하는 항목. 신청 안내 화면, 메일 작성 양식, '양식 복사하기'가 모두 이 목록을 씁니다. */
const APPLY_FIELDS = ["희망 시즌", "광고 영역 (슬라이드형 / 배너 리스트형)", "희망 구좌 (1~6)", "업체명 · 담당자 · 연락처 · 메일"];
/** 라이브 가능한 최소 구좌 수 */
const MIN_LIVE = 3;
/* ================================================================ */

const STORE = "bizting-pricing-v1";
const FMT_NAME: Record<Fmt, string> = { slide: "슬라이드형", banner: "배너 리스트형" };
const SLOT_NOTE: Record<Fmt, string[]> = {
  slide: ["맨 앞장 · 노출이 가장 많은 프리미엄 구좌", "2번째 슬라이드", "3번째 슬라이드", "4번째 슬라이드", "5번째 슬라이드", "6번째 슬라이드"],
  banner: ["리스트 1번째 배너", "리스트 2번째 배너", "리스트 3번째 배너", "리스트 4번째 배너", "리스트 5번째 배너", "리스트 6번째 배너"],
};

interface Ad { brand: string; punch: string; obj: ObjKey; head: string; sub: string; cta: string; c: string; a: string }
interface Season { id: string; m: number; date: string; name: string; art: SceneKey; who: string; basis: string; title: string; body: string; ads: Ad[] }

/**
 * 시즌 콘텐츠 (샘플) — 2026년 11월 ~ 2027년 3월
 * - m            : 일정 표의 묶음(11 = 11월, 12 = 12월, 1 = 2027년 1~2월, 3 = 2027년 3월)
 * - title / body : 문자를 열어보게 하는 '명분'(시즌 이벤트 안내). 타겟 고객군과 연결됩니다.
 * - ads          : 광고 영역에 들어가는 예시. 시즌과 상관없이 업종을 섞어 두었습니다.
 *                  (어떤 업종의 광고든 실을 수 있다는 점을 보여 주기 위함)
 */
const SEASON_GROUPS: { m: number; label: string }[] = [
  { m: 11, label: "2026년 11월" },
  { m: 12, label: "2026년 12월" },
  { m: 1, label: "2027년 1~2월" },
  { m: 3, label: "2027년 3월" },
];

const SEASONS: Season[] = [
  { id: "pepero", m: 11, date: "11.11", name: "빼빼로데이", art: "pepero",
    who: "선물·온라인 쇼핑 관심 고객", basis: "쇼핑 앱·웹 접속 이력",
    title: "11월 11일 빼빼로데이 특별 혜택 안내 드립니다.", body: "11월 11일 빼뺴로데이! 이 문자를 받으신 고객님들께만 특별한 혜택을 안내드립니다. 아래에서 다양한 혜택도 함께 확인해 보세요!",
    ads: [
      { brand: "샘플 통신", punch: "요금제\n3개월 할인", obj: "ticket", head: "인터넷+TV 결합 3개월 요금 할인 안내드립니다.", sub: "아래 URL을 눌러 확인해보세요.", cta: "혜택 받기", c: "#ece6ff", a: "#8b5cf6" },
      { brand: "샘플 피트니스", punch: "헬스 1개월\n무료", obj: "gift", head: "헬스장 첫 달 무료 이용권 안내드립니다.", sub: "아래 버튼을 클릭하고 무료 체험권을 받아보세요!", cta: "이용권 받기", c: "#fff7cc", a: "#f5b301" },
      { brand: "샘플 교육", punch: "온라인 강의\n50%", obj: "book", head: "온라인 강의 최대 50% 할인", sub: "인기 강좌를 특가로 만나보세요.", cta: "강의 보기", c: "#e2f5e9", a: "#22b573" },
    ] },
  { id: "exam", m: 11, date: "11.19", name: "수능", art: "exam",
    who: "수험생 자녀를 둔 고객", basis: "교육·입시 관련 앱·웹 이용 이력",
    title: "수험생 가족 응원 혜택 안내", body: "수험생과 가족 여러분께 특별한 혜택을 안내드립니다. 아래에서 다양한 혜택도 함께 확인해 보세요.",
    ads: [
      { brand: "샘플 렌터카", punch: "주말 렌터카\n50%", obj: "ticket", head: "주말 렌터카 50% 할인", sub: "신규 회원에게 쿠폰을 드립니다.", cta: "예약하기", c: "#e3ecff", a: "#4361ee" },
      { brand: "샘플 카페", punch: "아메리카노\n1+1", obj: "cup", head: "아메리카노 1+1 쿠폰", sub: "가까운 매장에서 사용할 수 있습니다.", cta: "쿠폰 받기", c: "#ffe8d6", a: "#ff7a1a" },
      { brand: "샘플 보험", punch: "암보험\n무료 상담", obj: "card", head: "암보험 보장 분석 무료 상담", sub: "전문 상담사가 연락드립니다.", cta: "상담 신청", c: "#e8e9ee", a: "#171d2b" },
    ] },
  { id: "blackfriday", m: 11, date: "11.27", name: "블랙프라이데이", art: "blackfriday",
    who: "해외직구·쇼핑 앱 이용 고객", basis: "쇼핑·직구 앱 이용 이력",
    title: "블랙프라이데이 쇼핑 고객 특별 혜택 안내", body: "블랙프라이데이를 맞은 고객님께 특별한 혜택을 안내드립니다. 아래에서 다양한 혜택도 함께 확인해 보세요.",
    ads: [
      { brand: "샘플 건강식품", punch: "건강식품\n최대 40%", obj: "gift", head: "건강식품 최대 40% 할인", sub: "정기 구독 시 추가 혜택이 있습니다.", cta: "특가 보러가기", c: "#e2f5e9", a: "#22b573" },
      { brand: "샘플 전자", punch: "노트북\n사은품 증정", obj: "bag", head: "노트북 구매 시 사은품 증정", sub: "한정 수량으로 진행됩니다.", cta: "혜택 확인하기", c: "#e3ecff", a: "#4361ee" },
      { brand: "샘플 은행", punch: "체크카드\n캐시백", obj: "card", head: "체크카드 결제 캐시백 이벤트", sub: "11월 한 달간 진행됩니다.", cta: "혜택 확인하기", c: "#fff1dc", a: "#ff9f43" },
    ] },
  { id: "ski", m: 12, date: "12월 초", name: "겨울 스키 시즌", art: "ski",
    who: "스키장·겨울 여행 관심 고객", basis: "스키장 방문 이력, 여행 앱 이용",
    title: "스키장 방문 고객 특별 혜택 안내", body: "스키장을 찾은 고객님께 특별한 혜택을 안내드립니다. 아래에서 다양한 혜택도 함께 확인해 보세요.",
    ads: [
      { brand: "샘플 가구", punch: "매트리스\n최대 30%", obj: "bed", head: "매트리스 최대 30% 할인", sub: "무료 배송과 설치를 해드립니다.", cta: "가구 보기", c: "#ffe8d6", a: "#ff7a1a" },
      { brand: "샘플 마트", punch: "장보기\n쿠폰팩", obj: "bag", head: "첫 구매 장보기 쿠폰팩", sub: "신규 가입 고객에게 드립니다.", cta: "쿠폰 받기", c: "#e2f5e9", a: "#22b573" },
      { brand: "샘플 자동차", punch: "타이어 교체\n20% 할인", obj: "ticket", head: "타이어 교체 20% 할인", sub: "가까운 지점에서 예약할 수 있습니다.", cta: "예약하기", c: "#e0f1ff", a: "#2b9cf2" },
    ] },
  { id: "xmas", m: 12, date: "12.24 – 25", name: "크리스마스", art: "xmas",
    who: "연인·가족 단위 연말 소비 고객", basis: "외식·숙박·공연 관련 앱 이용",
    title: "크리스마스 연말 고객 특별 혜택 안내", body: "연말을 맞은 고객님께 특별한 혜택을 안내드립니다. 아래에서 다양한 혜택도 함께 확인해 보세요.",
    ads: [
      { brand: "샘플 어학", punch: "화상영어\n무료 체험", obj: "book", head: "화상영어 2주 무료 체험", sub: "신청 후 바로 시작할 수 있습니다.", cta: "체험 신청", c: "#ece6ff", a: "#8b5cf6" },
      { brand: "샘플 패션", punch: "겨울 아우터\n최대 50%", obj: "bag", head: "겨울 아우터 최대 50% 할인", sub: "시즌 오프 기획전을 진행합니다.", cta: "기획전 보기", c: "#e3ecff", a: "#4361ee" },
      { brand: "샘플 외식", punch: "레스토랑\n20% 할인", obj: "bowl", head: "패밀리 레스토랑 20% 할인", sub: "예약 시 쿠폰을 사용할 수 있습니다.", cta: "예약하기", c: "#ffe4ea", a: "#f43f5e" },
    ] },
  { id: "newyear", m: 12, date: "12.31", name: "연말 · 신년 카운트다운", art: "newyear",
    who: "대규모 행사 장소 방문 고객", basis: "타종 행사·콘서트·번화가 방문 이력",
    title: "연말 카운트다운 행사 방문 고객 특별 혜택 안내", body: "한 해의 마지막 밤을 함께한 고객님께 특별한 혜택을 안내드립니다. 아래에서 다양한 혜택도 함께 확인해 보세요.",
    ads: [
      { brand: "샘플 은행", punch: "신년 적금\n우대 금리", obj: "card", head: "신년 적금 우대 금리 이벤트", sub: "신규 가입 고객 대상입니다.", cta: "가입하기", c: "#e8e6ff", a: "#6d5bf5" },
      { brand: "샘플 베이커리", punch: "케이크\n예약 15%", obj: "cake", head: "케이크 사전 예약 15% 할인", sub: "매장 수령 시 적용됩니다.", cta: "예약하기", c: "#ffe4ea", a: "#f43f5e" },
      { brand: "샘플 여행", punch: "해외여행\n특가", obj: "ticket", head: "해외여행 항공권 특가", sub: "출발 일정에 따라 혜택이 달라집니다.", cta: "특가 보기", c: "#e0f1ff", a: "#2b9cf2" },
    ] },
  { id: "newstart", m: 1, date: "1월", name: "신년 · 새해 계획", art: "sunrise",
    who: "새해 목표를 세우는 고객", basis: "운동·어학·자기계발 관련 앱·웹 이용",
    title: "새해 계획 고객 특별 혜택 안내", body: "새해를 새롭게 시작하는 고객님께 특별한 혜택을 안내드립니다. 아래에서 다양한 혜택도 함께 확인해 보세요.",
    ads: [
      { brand: "샘플 정수기", punch: "정수기\n렌탈 할인", obj: "cup", head: "정수기 렌탈 첫 달 요금 할인", sub: "설치 후 바로 사용하실 수 있습니다.", cta: "상담 신청", c: "#e0f1ff", a: "#2b9cf2" },
      { brand: "샘플 스포츠", punch: "러닝화\n최대 40%", obj: "bag", head: "러닝화·운동복 최대 40% 할인", sub: "새해 맞이 기획전을 진행합니다.", cta: "기획전 보기", c: "#e2f5e9", a: "#22b573" },
      { brand: "샘플 독서", punch: "전자책\n구독 할인", obj: "book", head: "전자책 구독 3개월 할인", sub: "신규 구독 고객에게 드립니다.", cta: "구독하기", c: "#ece6ff", a: "#8b5cf6" },
    ] },
  { id: "seollal", m: 1, date: "2월 초", name: "설 연휴", art: "seollal",
    who: "귀성·명절 선물 구매 고객", basis: "터미널·고속도로 방문 이력, 선물 쇼핑 앱 이용",
    title: "설 연휴 고객 특별 혜택 안내", body: "설 연휴를 맞은 고객님께 특별한 혜택을 안내드립니다. 아래에서 다양한 혜택도 함께 확인해 보세요.",
    ads: [
      { brand: "샘플 선물세트", punch: "설 선물\n20% 할인", obj: "gift", head: "설 선물세트 사전 예약 20% 할인", sub: "택배로 편하게 받아보실 수 있습니다.", cta: "예약하기", c: "#ffe4ea", a: "#f43f5e" },
      { brand: "샘플 정비", punch: "귀성길\n차량 점검", obj: "ticket", head: "귀성길 차량 점검 무료 쿠폰", sub: "가까운 정비소에서 이용할 수 있습니다.", cta: "쿠폰 받기", c: "#fff1dc", a: "#ff9f43" },
      { brand: "샘플 마트", punch: "장보기\n10% 쿠폰", obj: "bag", head: "명절 장보기 10% 할인 쿠폰", sub: "온라인 주문 시 사용할 수 있습니다.", cta: "쿠폰 받기", c: "#e2f5e9", a: "#22b573" },
    ] },
  { id: "valentine", m: 1, date: "2.14", name: "밸런타인데이", art: "valentine",
    who: "연인·선물 구매 고객", basis: "선물·쇼핑 앱 이용, 번화가 방문 이력",
    title: "밸런타인데이 고객 특별 혜택 안내", body: "소중한 사람과 함께하는 고객님께 특별한 혜택을 안내드립니다. 아래에서 다양한 혜택도 함께 확인해 보세요.",
    ads: [
      { brand: "샘플 초콜릿", punch: "초콜릿\n선물 박스", obj: "gift", head: "수제 초콜릿 선물 15% 할인", sub: "당일 포장과 배송을 해드립니다.", cta: "주문하기", c: "#ffe4ea", a: "#f43f5e" },
      { brand: "샘플 레스토랑", punch: "커플 코스\n특가", obj: "bowl", head: "커플 디너 코스 특가", sub: "2인 예약 시 디저트를 드립니다.", cta: "예약하기", c: "#fff1dc", a: "#ff9f43" },
      { brand: "샘플 공연", punch: "커플 티켓\n할인", obj: "ticket", head: "뮤지컬 커플 티켓 할인", sub: "2매 구매 시 적용됩니다.", cta: "예매하기", c: "#ece6ff", a: "#8b5cf6" },
    ] },
  { id: "graduation", m: 3, date: "2월 말 – 3월 초", name: "졸업 · 입학 · 새 학기", art: "graduation",
    who: "졸업·입학·새 학기 준비 고객", basis: "교육·쇼핑 앱 이용 이력",
    title: "졸업·입학 시즌 고객 특별 혜택 안내", body: "새 출발을 준비하는 고객님께 특별한 혜택을 안내드립니다. 아래에서 다양한 혜택도 함께 확인해 보세요.",
    ads: [
      { brand: "샘플 전자", punch: "새 학기\n노트북 특가", obj: "bag", head: "새 학기 노트북 특가", sub: "학생 인증 시 추가 할인됩니다.", cta: "혜택 확인하기", c: "#e3ecff", a: "#4361ee" },
      { brand: "샘플 꽃집", punch: "졸업 꽃다발\n10% 할인", obj: "gift", head: "졸업 꽃다발 예약 10% 할인", sub: "당일 수령할 수 있습니다.", cta: "예약하기", c: "#ffe4ea", a: "#f43f5e" },
      { brand: "샘플 침구", punch: "자취 시작\n침구 세트", obj: "bed", head: "자취 시작 침구 세트 25% 할인", sub: "무료 배송으로 보내드립니다.", cta: "구경하기", c: "#fff7cc", a: "#f5b301" },
    ] },
  { id: "whiteday", m: 3, date: "3.14", name: "화이트데이", art: "whiteday",
    who: "연인·선물 구매 고객", basis: "선물·쇼핑 앱 이용 이력",
    title: "화이트데이 고객 특별 혜택 안내", body: "마음을 전하는 고객님께 특별한 혜택을 안내드립니다. 아래에서 다양한 혜택도 함께 확인해 보세요.",
    ads: [
      { brand: "샘플 디저트", punch: "사탕 선물\n세트 20%", obj: "gift", head: "사탕 선물 세트 20% 할인", sub: "포장 서비스가 함께 제공됩니다.", cta: "주문하기", c: "#e0f1ff", a: "#2b9cf2" },
      { brand: "샘플 주얼리", punch: "커플링\n사은품", obj: "bag", head: "커플링 구매 시 사은품 증정", sub: "각인 서비스가 포함됩니다.", cta: "혜택 확인하기", c: "#ece6ff", a: "#8b5cf6" },
      { brand: "샘플 호텔", punch: "호캉스\n패키지", obj: "bed", head: "화이트데이 호캉스 패키지", sub: "조식이 포함된 구성입니다.", cta: "패키지 보기", c: "#e2f5e9", a: "#22b573" },
    ] },
];

const reduceMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const smooth: ScrollBehavior = reduceMotion ? "auto" : "smooth";

/** Bootstrap 전역 스타일(a, h*, p, ul …)이 이 페이지에 번지지 않도록 하는 최소 리셋. 특이도 0,0,1 이라 tw- 유틸리티가 항상 우선합니다. */
const pageStyles = `
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css");
:where(.bz-root){font-family:"Pretendard Variable",Pretendard,-apple-system,BlinkMacSystemFont,"Malgun Gothic",sans-serif;font-feature-settings:"tnum";background:#fff}
:where(.bz-root) :is(h1,h2,h3,h4,h5,h6,p,ul,ol,dl,dd){margin:0}
:where(.bz-root) :is(h1,h2,h3,h4,h5,h6){font-weight:inherit;line-height:inherit;color:inherit}
:where(.bz-root) :is(ul,ol){padding:0;list-style:none}
:where(.bz-root) a{text-decoration:none}
:where(.bz-root) small{font-size:inherit}
:where(.bz-root) :is(th,td){border-style:solid;border-width:0;border-color:inherit}
.bz-scroll{scrollbar-width:thin;scrollbar-color:#cfd4dc transparent}
.bz-noscroll{scrollbar-width:none}
.bz-noscroll::-webkit-scrollbar{display:none}
.bz-mask-fade{-webkit-mask-image:radial-gradient(75% 70% at 50% 0%,#000,transparent);mask-image:radial-gradient(75% 70% at 50% 0%,#000,transparent)}
`;

/* ---------------- 작은 아이콘 ---------------- */
const Chev = ({ s = 11 }: { s?: number }) => (
  <svg className="tw-shrink-0" width={s} height={s} viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M5.5 3l5 5-5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const LinkIcon = ({ s = 11 }: { s?: number }) => (
  <svg className="tw-shrink-0" width={s} height={s} viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6.5 9.5l3-3M7 4.6l.9-.9a3 3 0 0 1 4.2 4.2l-.9.9M9 11.4l-.9.9A3 3 0 0 1 3.9 8.1l.9-.9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
);
const CheckIcon = ({ s = 14 }: { s?: number }) => (
  <svg className="tw-shrink-0" width={s} height={s} viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="8" fill="currentColor" /><path d="M4.6 8.3l2.2 2.2 4.6-4.8" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

const Dot = ({ n }: { n: number }) => (
  <i className="tw-mr-1 tw-inline-grid tw-h-4 tw-w-4 tw-shrink-0 tw-place-items-center tw-rounded-full tw-bg-ink tw-text-[10px] tw-font-bold tw-not-italic tw-text-white">{n}</i>
);

/* ---------------- 효과용 컴포넌트 ---------------- */
/** 화면에 들어오면 아래에서 위로 떠오르며 나타납니다. */
function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(reduceMotion);
  useEffect(() => {
    if (shown || !ref.current) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [shown]);
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`${className} tw-transition-all tw-duration-700 tw-ease-out ${shown ? "" : "tw-translate-y-6 tw-opacity-0"}`}>
      {children}
    </div>
  );
}

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(reduceMotion ? to : 0);
  useEffect(() => {
    if (reduceMotion || !ref.current) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (t: number) => {
        const k = Math.min(1, (t - t0) / 900);
        setV(Math.round(to * (1 - Math.pow(1 - k, 3))));
        if (k < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.6 });
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={ref}>{v}</span>;
}

const Html = ({ html, className = "" }: { html: string; className?: string }) => <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;

/* ---------------- 광고 크리에이티브 ---------------- */
function Creative({ a, wide }: { a: Ad; wide?: boolean }) {
  return (
    <div className={`tw-relative tw-overflow-hidden ${wide ? "tw-aspect-[100/31]" : "tw-aspect-[16/9]"}`} style={{ background: `linear-gradient(${wide ? "100deg" : "135deg"},${a.c},${shade(a.c, -0.08)})` }}>
      <div className={`tw-absolute tw-top-1/2 -tw-translate-y-1/2 tw-rounded-full ${wide ? "tw-right-[-14px] tw-h-[120px] tw-w-[120px]" : "tw-right-[-22px] tw-h-[150px] tw-w-[150px]"}`} style={{ background: `${a.a}2e` }} />
      <div className={`tw-absolute tw-inset-y-0 tw-left-0 tw-flex tw-flex-col tw-justify-center tw-gap-1 ${wide ? "tw-w-[64%] tw-pl-3.5" : "tw-w-[62%] tw-pl-4"}`}>
        <span className="tw-text-[9px] tw-font-bold tw-tracking-[.14em] tw-text-ink/50">{a.brand}</span>
        <b className={`tw-whitespace-pre-line tw-font-extrabold tw-leading-[1.18] tw-tracking-[-.035em] tw-text-ink ${wide ? "tw-text-[16px]" : "tw-text-[19px]"}`}>{a.punch}</b>
      </div>
      <Html className={`tw-absolute ${wide ? "tw-bottom-1 tw-right-3 tw-h-[72px] tw-w-[72px]" : "tw-bottom-1.5 tw-right-3 tw-h-[92px] tw-w-[92px]"}`} html={objSvg(a.obj, a.a)} />
    </div>
  );
}

const SLOT_BADGE = "tw-absolute tw-left-2 tw-top-2 tw-z-10 tw-rounded-full tw-bg-ink tw-px-2 tw-py-0.5 tw-text-[10px] tw-font-bold tw-leading-none tw-text-white";
interface ZoneProps { s: Season; peek?: boolean }

function SlideZone({ s, peek }: ZoneProps) {
  const track = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const drag = useRef({ down: false, sx: 0, sl: 0 });
  const stepW = () => { const c = track.current?.children[0] as HTMLElement | undefined; return c ? c.offsetWidth + 8 : 1; };

  useEffect(() => {
    const t = track.current; if (!t) return;
    const on = () => setPage(Math.min(5, Math.round(t.scrollLeft / stepW())));
    t.addEventListener("scroll", on, { passive: true });
    return () => t.removeEventListener("scroll", on);
  }, []);

  /* 마우스로도 끌어서 넘겨 볼 수 있게 */
  useEffect(() => {
    const move = (e: PointerEvent) => {
      const d = drag.current, t = track.current; if (!d.down || !t) return;
      const dx = e.clientX - d.sx;
      if (Math.abs(dx) > 4) { t.style.scrollSnapType = "none"; t.scrollLeft = d.sl - dx; }
    };
    const up = () => {
      const d = drag.current, t = track.current; if (!d.down || !t) return;
      d.down = false; t.style.scrollSnapType = "";
      t.scrollTo({ left: Math.round(t.scrollLeft / stepW()) * stepW(), behavior: smooth });
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
  }, []);

  /* 처음 보일 때 한 장 넘어갔다 돌아오며 '넘겨 보는 형태'임을 알려 줌 */
  useEffect(() => {
    const t = track.current; if (!peek || reduceMotion || !t) return;
    let t1 = 0, t2 = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; io.disconnect();
      t1 = window.setTimeout(() => { t.scrollTo({ left: stepW(), behavior: "smooth" }); t2 = window.setTimeout(() => t.scrollTo({ left: 0, behavior: "smooth" }), 1100); }, 900);
    }, { threshold: 0.7 });
    io.observe(t);
    return () => { io.disconnect(); clearTimeout(t1); clearTimeout(t2); };
  }, [peek]);

  return (
    <>
      <div
        ref={track}
        onPointerDown={(e) => { if (e.pointerType !== "mouse" || !track.current) return; drag.current = { down: true, sx: e.clientX, sl: track.current.scrollLeft }; }}
        className="bz-noscroll tw-relative tw-flex tw-cursor-grab tw-snap-x tw-snap-mandatory tw-gap-2 tw-overflow-x-auto tw-pb-1 active:tw-cursor-grabbing"
      >
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const a = s.ads[i];
          if (!a) {
            return (
              <div key={i} className="tw-relative tw-flex tw-min-h-[262px] tw-w-[80%] tw-shrink-0 tw-snap-start tw-flex-col tw-items-center tw-justify-center tw-gap-2 tw-rounded-xl tw-border-[1.5px] tw-border-dashed tw-border-brand-500 tw-bg-white/60 tw-text-[12px] tw-font-semibold tw-text-brand-600">
                <span className={SLOT_BADGE}>구좌 {i + 1}</span>
                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                <span>문의 후 안내</span>
              </div>
            );
          }
          return (
            <article key={i} className="tw-relative tw-flex tw-w-[80%] tw-shrink-0 tw-snap-start tw-flex-col tw-overflow-hidden tw-rounded-xl tw-border tw-border-line tw-bg-white">
              <span className={SLOT_BADGE}>구좌 {i + 1}{i === 0 && " · 추천"}</span>
              <Creative a={a} />
              <div className="tw-flex-1 tw-px-3 tw-pt-2.5">
                <b className="tw-block tw-text-[12.5px] tw-leading-snug tw-tracking-tight">[SKT] {a.head}</b>
                <span className="tw-mt-1 tw-block tw-text-[11.5px] tw-leading-snug tw-text-mute">{a.sub}</span>
              </div>
              <div className="tw-grid tw-gap-1.5 tw-pb-2.5 tw-pt-2.5 tw-text-center tw-text-[12px] tw-font-semibold tw-text-brand-600"><span>{a.cta}</span><span>친구에게 공유하기</span></div>
            </article>
          );
        })}
      </div>
      <div className="tw-flex tw-justify-center tw-gap-1.5 tw-pt-2" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <i key={i} className={`tw-h-1.5 tw-rounded-full tw-transition-all tw-duration-300 ${i === page ? "tw-w-4 tw-bg-brand-500" : "tw-w-1.5 tw-bg-brand-500/25"}`} />
        ))}
      </div>
    </>
  );
}

function BannerZone({ s }: ZoneProps) {
  return (
    <>
      <div className="tw-grid tw-gap-1.5">
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const a = s.ads[i];
          if (!a) {
            return (
              <div key={i} className="tw-grid tw-aspect-[100/31] tw-place-items-center tw-rounded-lg tw-border-[1.5px] tw-border-dashed tw-border-brand-500 tw-bg-white/70 tw-text-[12px] tw-font-semibold tw-text-brand-600">
                구좌 {i + 1} · 문의 후 안내
              </div>
            );
          }
          return (
            <div key={i} className="tw-overflow-hidden tw-rounded-lg">
              <Creative a={a} wide />
            </div>
          );
        })}
      </div>
    </>
  );
}

const HINT = "tw-absolute -tw-top-3 tw-right-3 tw-z-10 tw-inline-flex tw-items-center tw-gap-1 tw-rounded-full tw-bg-brand-600 tw-px-2.5 tw-py-1 tw-text-[11px] tw-font-bold tw-text-white tw-shadow-[0_6px_14px_-4px_rgba(47,73,209,.6)]";

interface PhoneProps { s: Season; fmt: Fmt; peek?: boolean }
function Phone({ s, fmt, peek }: PhoneProps) {
  const [atEnd, setAtEnd] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  /* 내용이 화면보다 짧으면 '아래로 스크롤' 안내를 숨김 */
  useEffect(() => { const t = bodyRef.current; if (t) setAtEnd(t.scrollHeight <= t.clientHeight + 8); }, [s, fmt]);
  return (
    <div className="tw-relative tw-w-[322px] tw-max-w-full tw-overflow-hidden tw-rounded-[40px] tw-border-[7px] tw-border-ink tw-bg-white tw-shadow-[0_40px_70px_-34px_rgba(23,29,43,.55)]">
      <div className="tw-relative tw-flex tw-items-center tw-justify-between tw-px-6 tw-pb-1 tw-pt-3 tw-text-[11px] tw-font-semibold">
        <span>오전 11:49</span>
        <span className="tw-absolute tw-left-1/2 tw-top-2 tw-h-[18px] tw-w-[72px] -tw-translate-x-1/2 tw-rounded-full tw-bg-ink" />
        <span className="tw-flex tw-items-center tw-gap-1">
          <svg width="15" height="10" viewBox="0 0 15 10" aria-hidden="true"><path d="M1 8h2v1H1zM5 6h2v3H5zM9 3.5h2V9H9zM13 1h1.6v8H13z" fill="currentColor" /></svg>
          <svg width="22" height="10" viewBox="0 0 22 10" aria-hidden="true"><rect x=".5" y=".5" width="18" height="9" rx="2.5" fill="none" stroke="currentColor" opacity=".5" /><rect x="2" y="2" width="13" height="6" rx="1.2" fill="currentColor" /><rect x="19.6" y="3.2" width="1.6" height="3.6" rx=".8" fill="currentColor" opacity=".5" /></svg>
        </span>
      </div>
      <div className="tw-flex tw-items-center tw-gap-2.5 tw-border-b tw-border-line tw-px-4 tw-pb-3 tw-pt-2">
        <svg className="tw-shrink-0" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        {/* 발신 프로필: SKT 로고 대신 'T'만, 진한 파랑 */}
        <span className="tw-grid tw-h-9 tw-w-9 tw-shrink-0 tw-place-items-center tw-rounded-full tw-bg-skt tw-text-[19px] tw-font-extrabold tw-leading-none tw-text-white">T</span>
        <div className="tw-min-w-0 tw-flex-1 tw-text-[16px] tw-font-bold">SKT 우리동네 혜택 알림</div>
        <svg className="tw-shrink-0" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="5" r="1.8" fill="currentColor" /><circle cx="12" cy="12" r="1.8" fill="currentColor" /><circle cx="12" cy="19" r="1.8" fill="currentColor" /></svg>
      </div>
      <div className="tw-relative">
        <div ref={bodyRef} onScroll={(e) => { const t = e.currentTarget; setAtEnd(t.scrollTop + t.clientHeight >= t.scrollHeight - 8); }} className="bz-noscroll tw-max-h-[600px] tw-overflow-y-auto tw-bg-white tw-px-3 tw-pb-4 tw-pt-3.5">
          <div className="tw-mx-1 tw-mb-2.5 tw-flex tw-flex-wrap tw-items-center tw-gap-1.5 tw-text-[12px] tw-text-ink-2">
            [Web발신] (광고)
            <span className="tw-inline-flex tw-items-center tw-gap-1 tw-font-semibold tw-text-brand-600"><CheckIcon />확인된 발신번호</span>
          </div>
          <div className="tw-rounded-[20px] tw-bg-[#f1f2f4] tw-p-2.5">
            {fmt === "slide" && (
              <div className="tw-relative tw-aspect-[16/10] tw-overflow-hidden tw-rounded-[14px]">
                <Html className="tw-h-full tw-w-full" html={sceneSvg(s.art)} />
                <span className="tw-absolute tw-bottom-1.5 tw-right-2 tw-text-[8px] tw-text-white/85">*샘플 이미지입니다</span>
              </div>
            )}
            <p className={`tw-mx-1.5 tw-text-[14px] tw-font-bold tw-leading-snug ${fmt === "slide" ? "tw-mt-3" : "tw-mt-1"}`}>[SKT] {s.title}</p>
            <p className="tw-mx-1.5 tw-mb-3.5 tw-mt-1.5 tw-text-[13px] tw-leading-relaxed tw-text-ink-2">{s.body}</p>
            <div className="tw-relative tw-mt-5 tw-rounded-2xl tw-border tw-border-dashed tw-border-brand-500 tw-bg-brand-50 tw-p-2">
              {fmt === "slide" ? (
                <span className={HINT}>옆으로 넘겨보세요!<span className="tw-inline-flex tw-animate-nudge motion-reduce:tw-animate-none"><Chev /></span></span>
              ) : (
                <span className={HINT}><LinkIcon />배너마다 URL 삽입 가능</span>
              )}
              <div className="tw-flex tw-items-center tw-px-1 tw-pb-2 tw-pt-1 tw-text-[11px] tw-font-bold tw-text-brand-600">광고 게재 영역 · 최대 6구좌</div>
              {fmt === "slide" ? <SlideZone s={s} peek={peek} /> : <BannerZone s={s} />}
            </div>
            <p className="tw-mx-1.5 tw-mt-3.5 tw-text-[11px] tw-leading-normal tw-text-mute">※ 이 메시지는 SK텔레콤에서 혜택/광고 수신에 동의하신 고객님께 보내 드렸습니다.<br />무료 수신거부 1504</p>
          </div>
        </div>
        <div className={`tw-pointer-events-none tw-absolute tw-inset-x-0 tw-bottom-0 tw-flex tw-h-16 tw-items-end tw-justify-center tw-bg-gradient-to-t tw-from-white tw-to-transparent tw-pb-2 tw-transition-opacity tw-duration-200 ${atEnd ? "tw-opacity-0" : "tw-opacity-100"}`}>
          <span className="tw-inline-flex tw-items-center tw-gap-1 tw-rounded-full tw-bg-ink/85 tw-px-2.5 tw-py-1 tw-text-[11px] tw-font-semibold tw-text-white"><svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 5.5l5 5 5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>아래로 스크롤</span>
        </div>
      </div>
    </div>
  );
}

/** 문장 끝에서만 줄을 바꿔 보여주는 문단 (한 문장은 균형 있게 줄바꿈) */
function Para({ text, className = "", as = "p" }: { text: string; className?: string; as?: "p" | "span" }) {
  const lines = text.replace(/([.!?])\s+/g, "$1\n").split("\n");
  const Tag = as;
  return <Tag className={className}>{lines.map((t, i) => <span key={i} className="tw-block tw-text-balance">{t}</span>)}</Tag>;
}

/** 신청 양식 텍스트를 클립보드로 복사 (메일 창이 열리지 않을 때를 위해) */
function CopyFormButton({ text, dark }: { text: string; dark?: boolean }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch { window.prompt("아래 양식을 복사하세요", text); }
      ta.remove();
    }
    setDone(true);
    window.setTimeout(() => setDone(false), 1800);
  };
  return (
    <button type="button" onClick={copy}
      className={`tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-rounded-xl tw-border tw-font-semibold tw-transition-colors ${dark
        ? "tw-h-14 tw-border-white/30 tw-px-5 tw-text-[16px] tw-text-white hover:tw-border-white hover:tw-bg-white/10"
        : "tw-h-11 tw-rounded-[10px] tw-border-line-2 tw-bg-white tw-px-4 tw-text-[15px] tw-text-ink hover:tw-border-ink"}`}>
      {done
        ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8.5l3.2 3.2L13 4.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        : <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="5.5" y="5.5" width="8" height="8" rx="1.8" stroke="currentColor" strokeWidth="1.5" /><path d="M10.5 3.5V3.3A1.3 1.3 0 0 0 9.2 2H3.8A1.8 1.8 0 0 0 2 3.8v5.4A1.3 1.3 0 0 0 3.3 10.5h.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>}
      {done ? "복사됨" : "메일 양식 복사하기"}
    </button>
  );
}

/** 폰 화면이 예시임을 항상 눈에 띄게 알려 주는 표시 */
function ExampleTag() {
  return (
    <div className="tw-mb-4 tw-inline-flex tw-items-center tw-gap-2 tw-rounded-full tw-bg-ink tw-px-3.5 tw-py-1.5 tw-text-[13px] tw-font-semibold tw-text-white">
      <i className="tw-h-1.5 tw-w-1.5 tw-rounded-full tw-bg-[#ffd45a]" />예시 화면입니다. 실제 집행 컨텐츠에 따라 달라질 수 있어요.
    </div>
  );
}

/* ---------------- 섹션 머리말 ---------------- */
function SectionHead({ no, label, title, desc, dark, oneLine, titleOneLine }: { no: string; label: string; title: ReactNode; desc?: string; dark?: boolean; oneLine?: boolean; titleOneLine?: boolean }) {
  return (
    <Reveal className="tw-mb-12 tw-grid tw-grid-cols-12 tw-items-end tw-gap-x-6 tw-gap-y-4 lg:tw-mb-14">
      <div className={`tw-col-span-12 ${desc ? "lg:tw-col-span-6" : ""}`}>
        <div className="tw-mb-4 tw-flex tw-items-center tw-gap-2.5 tw-text-[14px] tw-font-semibold tw-text-brand-600"><b className={`tw-font-bold ${dark ? "tw-text-white" : "tw-text-ink"}`}>{no}</b><span className="tw-h-px tw-w-6 tw-bg-line-2" />{label}</div>
        <h2 className={`tw-text-[length:clamp(28px,3.4vw,40px)] tw-font-bold tw-leading-[1.25] tw-tracking-[-.03em] ${titleOneLine ? "lg:tw-whitespace-nowrap" : ""}`}>{title}</h2>
      </div>
      {desc && <Para text={desc} className={`tw-col-span-12 tw-text-[17px] tw-text-ink-2 lg:tw-self-center ${oneLine ? "lg:tw-col-span-6 lg:tw-col-start-7 lg:tw-whitespace-nowrap" : "lg:tw-col-span-5 lg:tw-col-start-8"}`} />}
    </Reveal>
  );
}

const won = (v: Price) => (v === null || Number.isNaN(v) ? null : `${Number(v).toLocaleString("ko-KR")}원`);
const PriceText = ({ v }: { v: Price }) => <>{won(v) ?? <span className="tw-text-brand-600">추후 반영</span>}</>;

const NAV = [["장점", "#strength"], ["타겟팅", "#target"], ["광고 영역", "#areas"], ["단가", "#pricing"]];
const SECTION_PAD = "tw-scroll-mt-[72px] tw-py-20 lg:tw-py-28";
const WRAP = "tw-mx-auto tw-max-w-page tw-px-5 md:tw-px-6";

/** 오른쪽 설명 패널의 한 줄 (번호 표시는 선택) */
function InfoRow({ n, label, children, last }: { n?: number; label: string; children: ReactNode; last?: boolean }) {
  return (
    <div className={`tw-grid tw-grid-cols-1 tw-gap-1.5 tw-py-5 sm:tw-grid-cols-[92px_1fr] sm:tw-gap-4 ${last ? "" : "tw-border-b tw-border-line"}`}>
      <div className="tw-flex tw-items-start tw-gap-2 tw-text-[14px] tw-font-semibold tw-text-mute">{n ? <Dot n={n} /> : null}{label}</div>
      <div>{children}</div>
    </div>
  );
}

/**
 * 집행 금액 계산기 (소개용)
 * - 광고 영역과 구좌를 고르면, 1만 건 기준으로 정가와 구좌 집행 금액을 비교해 보여줍니다.
 * - 계산식: 금액 = 건당 단가 × 건수 (VAT 별도)
 * - 구좌 단가가 비어 있으면(null) 아래 CALC_SAMPLE(계산용 예시 단가)을 씁니다. PRICING 에 값이 있으면 그 값이 우선입니다.
 */
const CALC_SAMPLE: Record<Fmt, number[]> = {
  slide: [100, 85, 80, 75, 70, 65],
  banner: [85, 75, 70, 65, 60, 55],
};
/** 계산기 기준 건수 (고정) */
const CALC_COUNT = 10000;
const fmtWon = (n: number) => `${Math.round(n).toLocaleString("ko-KR")}원`;

function Calculator({ prices }: { prices: Prices }) {
  const [fmt, setFmt] = useState<Fmt>("slide");
  const [slot, setSlot] = useState(0);

  const real = prices[fmt][slot];
  const unit = real ?? CALC_SAMPLE[fmt][slot];
  const sample = real === null || PRICE_IS_SAMPLE;
  const base = prices.base.price;
  const now = unit * CALC_COUNT;
  const orig = base * CALC_COUNT;
  const pct = base > 0 ? Math.round((1 - unit / base) * 100) : 0;
  const saved = Math.max(0, orig - now);
  const cnt = CALC_COUNT.toLocaleString("ko-KR");

  const seg = "tw-h-10 tw-rounded-lg tw-border tw-border-line-2 tw-bg-white tw-px-3.5 tw-text-[14px] tw-font-semibold tw-text-ink-2 tw-transition-colors hover:tw-border-brand-300 hover:tw-bg-brand-50 aria-pressed:tw-border-ink aria-pressed:tw-bg-ink aria-pressed:tw-text-white";
  const label = "tw-mb-2 tw-block tw-text-[13px] tw-font-semibold tw-text-mute";

  return (
    <Reveal className="tw-mt-6 tw-overflow-hidden tw-rounded-2xl tw-border tw-border-line tw-bg-white">
      <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-[1fr_1.05fr]">
        <div className="tw-p-6 md:tw-p-8">
          <div className="tw-text-[19px] tw-font-bold tw-tracking-tight">집행 금액 계산기</div>
          <p className="tw-mt-1 tw-text-[14px] tw-text-mute">구좌를 고르면 {cnt}건 기준 예상 금액을 확인할 수 있어요.</p>

          <div className="tw-mt-6 tw-grid tw-gap-5">
            <div>
              <span className={label}>광고 영역</span>
              <div className="tw-flex tw-flex-wrap tw-gap-2">
                {(["slide", "banner"] as Fmt[]).map((f) => <button key={f} onClick={() => setFmt(f)} aria-pressed={fmt === f} className={seg}>{FMT_NAME[f]}</button>)}
              </div>
            </div>
            <div>
              <span className={label}>구좌</span>
              <div className="tw-flex tw-flex-wrap tw-gap-2">
                {[0, 1, 2, 3, 4, 5].map((n) => <button key={n} onClick={() => setSlot(n)} aria-pressed={slot === n} className={`${seg} tw-w-11 tw-px-0`}>{n + 1}</button>)}
              </div>
            </div>
            <div className="tw-grid tw-grid-cols-2 tw-gap-4 tw-border-t tw-border-line tw-pt-5">
              <div>
                <span className={label}>건수</span>
                <b className="tw-text-[20px] tw-font-bold tw-tracking-tight">{cnt}건</b>
                <span className="tw-ml-1.5 tw-text-[13px] tw-text-mute">고정</span>
              </div>
              <div>
                <span className={label}>정가 단가</span>
                <b className="tw-text-[20px] tw-font-bold tw-tracking-tight">{base}원</b>
                <span className="tw-ml-1.5 tw-text-[13px] tw-text-mute">건당 · VAT 별도</span>
              </div>
            </div>
          </div>
        </div>

        <div className="tw-border-t tw-border-line tw-bg-soft tw-p-6 md:tw-p-8 lg:tw-border-l lg:tw-border-t-0">
          <div className="tw-text-[13px] tw-font-semibold tw-text-mute">{FMT_NAME[fmt]} · {slot + 1}구좌{sample ? " (예시 단가)" : ""}</div>

          <dl className="tw-mt-5 tw-grid tw-gap-4">
            <div className="tw-flex tw-items-baseline tw-justify-between tw-gap-4">
              <dt className="tw-text-[14px] tw-text-ink-2">정가로 보낼 때<span className="tw-block tw-text-[12px] tw-text-mute">{base}원 × {cnt}건</span></dt>
              <dd className="tw-text-[17px] tw-font-semibold tw-text-mute tw-line-through">{fmtWon(orig)}</dd>
            </div>
            <div className="tw-flex tw-items-baseline tw-justify-between tw-gap-4 tw-border-t tw-border-line-2 tw-pt-4">
              <dt className="tw-text-[14px] tw-font-semibold tw-text-ink">구좌 집행<span className="tw-block tw-text-[12px] tw-font-normal tw-text-mute">{unit}원 × {cnt}건</span></dt>
              <dd className="tw-text-[30px] tw-font-extrabold tw-leading-none tw-tracking-[-.03em] tw-text-brand-600">{fmtWon(now)}</dd>
            </div>
          </dl>

          <div className="tw-mt-5 tw-flex tw-flex-wrap tw-items-center tw-gap-x-3 tw-gap-y-1">
            {pct > 0 ? (
              <>
                <span className="tw-whitespace-nowrap tw-bg-brand-500 tw-px-2.5 tw-py-1 tw-text-[14px] tw-font-bold tw-text-white">{pct}% 할인</span>
                <span className="tw-text-[14px] tw-font-semibold tw-text-ink">{fmtWon(saved)} 절약</span>
              </>
            ) : (
              <span className="tw-text-[14px] tw-text-ink-2">정가와 같은 단가입니다.</span>
            )}
          </div>

          <div className="tw-mt-6 tw-border-t tw-border-line-2 tw-pt-4 tw-text-[12px] tw-leading-relaxed tw-text-mute">
            <b className="tw-text-ink-2">계산 방법</b>
            <ul className="tw-mt-1.5 tw-grid tw-gap-0.5">
              <li>· 금액 = 건당 단가 × 건수 ({cnt}건 기준)</li>
              <li>· 정가는 건당 {base}원, 구좌 집행은 선택한 구좌의 단가를 적용합니다.</li>
              <li>· 할인율 = (정가 − 구좌 단가) ÷ 정가</li>
              <li>· 모든 금액은 <b className="tw-text-ink-2">VAT 별도</b>입니다.</li>
            </ul>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ================== 페이지 ================== */
export default function BiztalkBizting() {
  const [sp] = useSearchParams();
  const edit = sp.has("edit");
  const startSeason = Math.max(0, SEASONS.findIndex((x) => x.id === sp.get("season")));
  const [season, setSeason] = useState(startSeason);
  const [fmt, setFmt] = useState<Fmt>(sp.get("fmt") === "banner" ? "banner" : "slide");
  const [prices, setPrices] = useState<Prices>(() => {
    const base: Prices = JSON.parse(JSON.stringify(PRICING));
    if (edit) { try { const sv = JSON.parse(localStorage.getItem(STORE) || "null"); if (sv) return { base: typeof sv.base?.price === "number" ? sv.base : base.base, slide: sv.slide ?? base.slide, banner: sv.banner ?? base.banner }; } catch { /* 저장값 없음 */ } }
    return base;
  });
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);
  const progRef = useRef<HTMLDivElement>(null);
  const s = SEASONS[season];

  /* 탭 제목·파비콘 (이 페이지에서만 비즈톡 로고) */
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "비즈팅 | SKT 공식 발신번호 타겟 광고 문자";
    const links = Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel~="icon"]'));
    const prev = links.map((l) => [l, l.href, l.type, l.sizes.value] as const);
    const created: HTMLLinkElement[] = [];
    if (!links.length) { const l = document.createElement("link"); l.rel = "icon"; document.head.appendChild(l); links.push(l); created.push(l); }
    links.forEach((l) => { l.type = "image/png"; l.href = favicon256; });
    const l32 = document.createElement("link"); l32.rel = "icon"; l32.type = "image/png"; l32.setAttribute("sizes", "32x32"); l32.href = favicon32; document.head.appendChild(l32); created.push(l32);
    return () => { document.title = prevTitle; prev.forEach(([l, h, t]) => { l.href = h; l.type = t; }); created.forEach((l) => l.remove()); };
  }, []);

  /* 스크롤 진행 막대 + 헤더 그림자 */
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      if (progRef.current) progRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
      setScrolled(h.scrollTop > 8);
    };
    window.addEventListener("scroll", on, { passive: true }); on();
    return () => window.removeEventListener("scroll", on);
  }, []);

  const updatePrice = (f: Fmt | "base", i: number, v: string) => {
    setPrices((p) => {
      const n: Prices = JSON.parse(JSON.stringify(p));
      if (f === "base") n.base.price = Number(v);
      else n[f][i as number] = v === "" ? null : Number(v);
      try { localStorage.setItem(STORE, JSON.stringify(n)); } catch { /* 저장 불가 */ }
      return n;
    });
  };

  const goSeason = (i: number) => { setSeason(i); document.getElementById("areas")?.scrollIntoView({ behavior: smooth }); };
  /** 문의 메일: 원하는 시즌·영역·구좌를 적어 보내도록 양식을 미리 채워 둠 */
  const mailBody = APPLY_FIELDS.map((t) => `${t}: `).join("\n");
  const mailHref = `mailto:${CONTACT.email}?subject=${encodeURIComponent("[비즈팅] 광고 구좌 문의")}&body=${encodeURIComponent(mailBody)}`;
  const linkCls = "tw-relative tw-text-ink-2 tw-no-underline hover:tw-text-ink after:tw-absolute after:-tw-bottom-1.5 after:tw-left-0 after:tw-h-px after:tw-w-0 after:tw-bg-ink after:tw-transition-all hover:after:tw-w-full";

  return (
    <div className="bz-root tw-break-keep tw-bg-white tw-leading-relaxed tw-text-ink tw-antialiased">
      <style>{pageStyles}</style>

      {/* ---------- 헤더 ---------- */}
      <header className={`tw-sticky tw-top-0 tw-z-30 tw-border-b tw-border-line tw-bg-white/95 tw-transition-shadow tw-duration-300 ${scrolled ? "tw-shadow-[0_8px_24px_-16px_rgba(23,29,43,.35)]" : ""}`}>
        <div className={`${WRAP} tw-flex tw-h-[68px] tw-items-center tw-gap-5`}>
          <a className="tw-flex tw-items-center tw-gap-3.5 tw-text-ink" href="#/Biztalk/Bizting" aria-label="비즈톡 비즈팅" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: smooth }); }}>
            <img className="tw-h-[30px] tw-w-auto tw-max-w-none tw-shrink-0" src={biztalkLogo} alt="비즈톡 biztalk" />
            <span className="tw-h-5 tw-w-px tw-bg-line-2" />
            <img className="tw-h-[28px] tw-w-auto tw-max-w-none tw-shrink-0" src={biztingLogo} alt="비즈팅" />
          </a>
          <nav className="tw-ml-auto tw-hidden tw-gap-8 tw-text-[15px] tw-font-medium md:tw-flex" aria-label="주요 메뉴">
            {NAV.map(([t, h]) => <a key={h} className={linkCls} href={h} onClick={(e) => { e.preventDefault(); document.querySelector(h)?.scrollIntoView({ behavior: smooth }); }}>{t}</a>)}
          </nav>
          <a className="tw-ml-auto tw-inline-flex tw-h-10 tw-items-center tw-rounded-[10px] tw-bg-ink tw-px-4 tw-text-[14px] tw-font-semibold tw-text-white tw-no-underline tw-transition-colors hover:tw-bg-black hover:tw-text-white md:tw-ml-0" href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: smooth }); }}>집행 문의</a>
        </div>
        <div ref={progRef} className="tw-absolute -tw-bottom-px tw-left-0 tw-h-0.5 tw-w-full tw-origin-left tw-scale-x-0 tw-bg-brand-500" />
      </header>

      <main>
        {/* ---------- HERO ---------- */}
        <section className="tw-relative tw-overflow-hidden tw-pb-20 tw-pt-12 lg:tw-pb-28 lg:tw-pt-20">
          <div aria-hidden="true" className="bz-mask-fade tw-pointer-events-none tw-absolute tw-inset-0 tw-bg-[linear-gradient(to_right,#eceff4_1px,transparent_1px),linear-gradient(to_bottom,#eceff4_1px,transparent_1px)] tw-bg-[size:56px_56px]" />
          <div className={`${WRAP} tw-relative tw-grid tw-grid-cols-12 tw-items-center tw-gap-x-6 tw-gap-y-14`}>
            <div className="tw-col-span-12 lg:tw-col-span-6">
              <span className="tw-inline-flex tw-items-center tw-gap-3 tw-text-[14px] tw-font-semibold tw-text-brand-600"><span className="tw-h-px tw-w-8 tw-bg-brand-500" />SKT 공식 대행사 비즈톡</span>
              <h1 className="tw-mb-6 tw-mt-5 tw-text-[length:clamp(34px,3.7vw,52px)] tw-font-bold tw-leading-[1.18] tw-tracking-[-.035em]">
                <span className="tw-block tw-overflow-hidden tw-pb-1"><span className="tw-block tw-animate-rise motion-reduce:tw-animate-none">SKT 이름으로 집행하는</span></span>
                <span className="tw-block tw-overflow-hidden tw-pb-1"><span className="tw-block tw-animate-rise motion-reduce:tw-animate-none" style={{ animationDelay: ".12s" }}>타겟팅 광고 서비스</span></span>
              </h1>
              <Reveal delay={150}><p className="tw-max-w-[520px] tw-text-[19px] tw-tracking-tight tw-text-ink-2">비즈팅은 SKT만의 고유 빅데이터를 활용하여 KBO 야구, 크리스마스, 설날 등 특정 시즌에 맞는 고객군들을 대상으로 <span className="tw-whitespace-nowrap">광고를 집행할 수 있습니다.</span><br />특정 광고 영역을 골라 합리적인 단가로 집행하세요.</p></Reveal>
              <Reveal delay={260} className="tw-mt-9 tw-flex tw-flex-wrap tw-gap-2.5">
                <a className="tw-group tw-inline-flex tw-h-12 tw-items-center tw-gap-2 tw-rounded-[10px] tw-bg-ink tw-px-5 tw-text-[16px] tw-font-semibold tw-text-white tw-no-underline tw-transition-colors hover:tw-bg-black hover:tw-text-white" href="#areas" onClick={(e) => { e.preventDefault(); document.getElementById("areas")?.scrollIntoView({ behavior: smooth }); }}>
                  광고 영역 살펴보기<svg className="tw-transition-transform group-hover:tw-translate-x-1" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h9M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
                <a className="tw-inline-flex tw-h-12 tw-items-center tw-rounded-[10px] tw-border tw-border-line-2 tw-bg-white tw-px-5 tw-text-[16px] tw-font-semibold tw-text-ink tw-no-underline tw-transition-colors hover:tw-border-ink hover:tw-text-ink" href="#pricing" onClick={(e) => { e.preventDefault(); document.getElementById("pricing")?.scrollIntoView({ behavior: smooth }); }}>구좌별 단가 보기</a>
              </Reveal>
              <Reveal delay={360}>
                <dl className="tw-mt-14 tw-grid tw-grid-cols-1 tw-border-t tw-border-line sm:tw-grid-cols-3">
                  {[["발신", "SKT 공식 발신번호"], ["대상", "SKT 마케팅 수신 동의 회원"], ["광고 영역", "슬라이드 · 배너 리스트"]].map(([k, v], i) => (
                    <div key={k} className={`tw-py-4 ${i < 2 ? "tw-border-b tw-border-line sm:tw-border-b-0" : ""} ${i === 0 ? "sm:tw-pr-5" : i === 1 ? "sm:tw-border-l sm:tw-px-5" : "sm:tw-border-l sm:tw-pl-5"}`}>
                      <dt className="tw-text-[13px] tw-font-medium tw-text-mute">{k}</dt>
                      <dd className="tw-mt-1 tw-text-[16px] tw-font-semibold tw-leading-snug tw-tracking-tight">{v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            <div className="tw-col-span-12 lg:tw-col-span-6">
              <div className="tw-relative tw-flex tw-flex-col tw-items-center tw-rounded-[28px] tw-bg-soft tw-px-4 tw-py-10 sm:tw-px-6">
                <ExampleTag />
                <Phone s={SEASONS[0]} fmt="slide" peek />
              </div>
            </div>
          </div>
        </section>

        {/* ---------- 01 장점 ---------- */}
        <section id="strength" className={`tw-bg-soft ${SECTION_PAD}`}>
          <div className={WRAP}>
            <SectionHead no="01" label="비즈팅의 장점" title={<>믿고 열어보는 발신번호,<br />정확한 수신자 타겟팅</>} desc="보다 신뢰도 있는 채널과 정확한 고객군에게 합리적인 비용으로 광고를 집행해보세요." oneLine />
            <div className="tw-grid tw-grid-cols-1 tw-gap-5 md:tw-grid-cols-3 md:tw-gap-6">
              {[
                { k: "신뢰도 향상", t: "SKT 공식 발신번호로 발송", d: "수신자 화면에 ‘확인된 발신번호’ 표시와 함께 SKT 이름으로 도착합니다. 수신자들의 신뢰도를 높힐 수 있습니다.",
                  icon: <><path d="M12 3l7 3v5c0 4.6-3 8.3-7 10-4-1.7-7-5.4-7-10V6z" /><path d="M8.8 12.2l2.2 2.2 4.2-4.6" /></> },
                { k: "정확한 타겟팅", t: "통신사 고유 빅데이터를 활용한 고객군 선정", d: "불특정 다수가 아닌 SKT 마케팅 수신 동의 회원이 대상입니다. 통신사 고유 빅데이터를 활용하여 특정 위치, 웹앱접속, 통화이력 등 다양한 조건을 활용합니다.",
                  icon: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" fill="currentColor" /><path d="M12 1.8v3M12 19.2v3M1.8 12h3M19.2 12h3" /></> },
                { k: "합리적인 단가", t: "특정 광고 영역 선택 집행", d: "전체 광고 영역 중 특정 구좌를 선택하여 집행하므로 비교적 저렴한 단가로 시작할 수 있습니다.",
                  icon: <><path d="M3 12.2V4.5A1.5 1.5 0 0 1 4.5 3h7.7l8.6 8.6a1.5 1.5 0 0 1 0 2.1l-7.1 7.1a1.5 1.5 0 0 1-2.1 0z" /><circle cx="8" cy="8" r="1.4" fill="currentColor" /></> },
              ].map((c, i) => (
                <Reveal key={c.k} delay={i * 120} className="tw-h-full">
                  <article className="tw-group tw-flex tw-h-full tw-flex-col tw-items-center tw-rounded-2xl tw-border tw-border-line tw-bg-white tw-px-7 tw-py-9 tw-text-center tw-transition-colors tw-duration-200 hover:tw-border-brand-200 hover:tw-bg-brand-50">
                    <span className="tw-grid tw-h-14 tw-w-14 tw-place-items-center tw-rounded-2xl tw-bg-brand-50 tw-text-brand-600 tw-transition-colors tw-duration-200 group-hover:tw-bg-white">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{c.icon}</svg>
                    </span>
                    <span className="tw-mt-5 tw-inline-flex tw-rounded-full tw-bg-brand-50 tw-px-2.5 tw-py-1 tw-text-[12px] tw-font-bold tw-text-brand-600 tw-transition-colors tw-duration-200 group-hover:tw-bg-white">{c.k}</span>
                    <h3 className="tw-mb-3 tw-mt-3 tw-text-[22px] tw-font-bold tw-leading-snug tw-tracking-[-.025em]">{c.t}</h3>
                    <Para text={c.d} className="tw-text-[16px] tw-text-ink-2" />
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- 02 타겟팅 ---------- */}
        <section id="target" className={SECTION_PAD}>
          <div className={WRAP}>
            <SectionHead no="02" label="타겟팅" title={<>특정 시즌에 특정 고객군을<br />대상으로 광고를 집행합니다.</>} desc={["관심사, 시기, 장소, 앱 이용 이력까지, 매년 진행되는", "주요 행사 및 시즌을 기준으로 고객군을 구성할 수 있습니다."].join("\n")} oneLine />
            <div className="tw-grid tw-grid-cols-1 tw-gap-8 md:tw-grid-cols-2 lg:tw-grid-cols-4 md:tw-gap-6" aria-label="2026년 11월부터 2027년 3월까지의 시즌 일정">
              {SEASON_GROUPS.map(({ m, label }, mi) => {
                const items = SEASONS.map((x, i) => ({ x, i })).filter((o) => o.x.m === m);
                return (
                  <Reveal key={m} delay={mi * 100}>
                    <h4 className="tw-flex tw-justify-between tw-border-b-2 tw-border-ink tw-pb-3 tw-text-[15px] tw-font-bold">{label}<span className="tw-text-[13px] tw-font-medium tw-text-mute">{items.length}개 시즌</span></h4>
                    <ul>
                      {items.map(({ x, i }) => (
                        <li key={x.id} className="tw-border-b tw-border-line">
                          <button onClick={() => goSeason(i)} className="tw-group tw-grid tw-w-full tw-grid-cols-[84px_1fr_16px] tw-items-center tw-gap-2 tw-py-4 tw-text-left tw-text-[16px] tw-font-semibold tw-tracking-tight">
                            <span className="tw-text-[13px] tw-font-medium tw-leading-tight tw-text-mute">{x.date}</span>
                            <span className="tw-leading-snug tw-transition-colors group-hover:tw-text-brand-600">{x.name}</span>
                            <span className="tw-text-line-2 tw-transition-all group-hover:tw-translate-x-1 group-hover:tw-text-brand-500"><Arrow /></span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                );
              })}
            </div>
            <Reveal className="tw-mt-8 tw-flex tw-flex-wrap tw-items-center tw-gap-x-3 tw-gap-y-1 tw-rounded-xl tw-border tw-border-dashed tw-border-line-2 tw-px-5 tw-py-4 tw-text-[15px] tw-text-ink-2">
              <b className="tw-inline-flex tw-items-center tw-gap-2 tw-text-ink">Coming soon</b>
              <span>매 시즌 새로운 일정이 계속 추가됩니다.</span>
            </Reveal>
          </div>
        </section>

        {/* ---------- 03 광고 영역 ---------- */}
        <section id="areas" className={`tw-bg-soft ${SECTION_PAD}`}>
          <div className={WRAP}>
            <SectionHead no="03" label="광고 영역" title={<>실제 라이브가 될 광고 영역을 확인해보세요.</>} titleOneLine />

            <div className="tw-mb-8 tw-flex tw-flex-col tw-gap-4 tw-rounded-2xl tw-border tw-border-brand-200 tw-bg-brand-50 tw-px-5 tw-py-5 sm:tw-flex-row sm:tw-items-center sm:tw-justify-between sm:tw-px-7">
              <div className="tw-flex tw-items-start tw-gap-3">
                <svg className="tw-mt-1 tw-shrink-0 tw-text-brand-600" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.8" /><path d="M10 9v5M10 6.2v.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                <p className="tw-text-[16px] tw-text-ink-2"><b className="tw-text-ink">아래 화면은 예시 화면입니다.</b> 실제로 집행 가능한 구좌는 <b className="tw-text-brand-700">메일로 문의 버튼</b>을 통해 확인 부탁드리며, 선착순으로 마감될 수 있습니다.</p>
              </div>
              <div className="tw-flex tw-shrink-0 tw-flex-wrap tw-gap-2">
                <a className="tw-group tw-inline-flex tw-h-11 tw-items-center tw-justify-center tw-gap-2 tw-rounded-[10px] tw-bg-ink tw-px-4 tw-text-[15px] tw-font-semibold tw-text-white tw-no-underline tw-transition-colors hover:tw-bg-black hover:tw-text-white" href={mailHref}>
                  메일로 문의<span className="tw-transition-transform group-hover:tw-translate-x-1"><Arrow /></span>
                </a>
              </div>
            </div>

            <div role="group" aria-label="광고 영역 유형" className="tw-mb-10 tw-grid tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-2">
              {([
                ["slide", "슬라이드형", "일반 스탠다드 타입을 슬라이드로 넘겨 보는 레이아웃입니다. 맨 앞장의 노출이 가장 많습니다.", ["최대 6구좌", "앞장 노출 최다"]],
                ["banner", "배너 리스트형", "URL 링크가 걸린 배너 이미지를 세로 리스트로 노출합니다.", ["최대 6구좌", "배너마다 URL 삽입 가능"]],
              ] as [Fmt, string, string, string[]][]).map(([f, t, d, tags]) => (
                <button key={f} onClick={() => setFmt(f)} aria-pressed={fmt === f}
                  className="tw-group tw-grid tw-grid-cols-[auto_1fr] tw-gap-x-4 tw-gap-y-1 tw-rounded-2xl tw-border tw-border-line tw-bg-white tw-px-6 tw-py-5 tw-text-left tw-transition-all hover:tw-border-line-2 aria-pressed:tw-border-ink aria-pressed:tw-shadow-[inset_0_0_0_1px_#171d2b]">
                  <span className="tw-row-span-3 tw-mt-1 tw-grid tw-h-5 tw-w-5 tw-place-items-center tw-rounded-full tw-border-2 tw-border-line-2 group-aria-pressed:tw-border-ink"><i className="tw-h-2.5 tw-w-2.5 tw-scale-0 tw-rounded-full tw-bg-ink tw-transition-transform group-aria-pressed:tw-scale-100" /></span>
                  <b className="tw-text-[19px] tw-tracking-tight">{t}</b>
                  <Para as="span" text={d} className="tw-text-[15px] tw-text-ink-2" />
                  <span className="tw-mt-2.5 tw-flex tw-flex-wrap tw-gap-1.5">
                    {tags.map((g, i) => <span key={g} className={`tw-inline-flex tw-h-[26px] tw-items-center tw-rounded-full tw-px-2.5 tw-text-[13px] tw-font-semibold ${i === 0 ? "tw-bg-brand-50 tw-text-brand-600" : "tw-bg-soft tw-text-ink-2"}`}>{g}</span>)}
                  </span>
                </button>
              ))}
            </div>

            <div className="tw-grid tw-grid-cols-12 tw-items-start tw-gap-x-6 tw-gap-y-6">
              <div className="tw-col-span-12 lg:tw-col-span-3">
                {/* 모바일: 가로로 넘기는 칩 */}
                <div role="group" aria-label="시즌 선택" className="bz-noscroll tw-flex tw-gap-2 tw-overflow-x-auto tw-pb-1 lg:tw-hidden">
                  {SEASONS.map((x, i) => (
                    <button key={x.id} onClick={() => setSeason(i)} aria-pressed={i === season}
                      className="tw-flex tw-min-w-[148px] tw-shrink-0 tw-flex-col tw-items-start tw-rounded-xl tw-border tw-border-line tw-bg-white tw-px-4 tw-py-3 tw-text-left tw-transition-all aria-pressed:tw-border-ink aria-pressed:tw-shadow-[inset_0_0_0_1px_#171d2b] hover:tw-border-line-2">
                      <span className="tw-text-[12px] tw-font-medium tw-text-mute">{x.date}</span>
                      <span className="tw-text-[15px] tw-font-semibold tw-tracking-tight">{x.name}</span>
                    </button>
                  ))}
                  <div className="tw-flex tw-min-w-[148px] tw-shrink-0 tw-flex-col tw-items-start tw-justify-center tw-rounded-xl tw-border tw-border-dashed tw-border-line-2 tw-px-4 tw-py-3">
                    <span className="tw-text-[15px] tw-font-semibold tw-text-ink-2">Coming soon</span>
                    <span className="tw-text-[12px] tw-text-mute">시즌 계속 추가</span>
                  </div>
                </div>
                {/* 데스크톱: 달력처럼 이어지는 타임라인 */}
                <div role="group" aria-label="시즌 선택" className="tw-hidden lg:tw-block">
                  {SEASON_GROUPS.map(({ m, label }) => {
                    const items = SEASONS.map((x, i) => ({ x, i })).filter((o) => o.x.m === m);
                    if (!items.length) return null;
                    return (
                      <div key={m} className="tw-mb-6 last:tw-mb-0">
                        <div className="tw-mb-1.5 tw-flex tw-items-center tw-gap-3 tw-px-3 tw-text-[12px] tw-font-bold tw-tracking-[.04em] tw-text-ink">
                          {label}<span className="tw-h-px tw-flex-1 tw-bg-line-2" />
                        </div>
                        <ul className="tw-relative">
                          <span aria-hidden="true" className="tw-absolute tw-bottom-5 tw-left-[19px] tw-top-5 tw-w-px tw-bg-line-2" />
                          {items.map(({ x, i }) => (
                            <li key={x.id} className="tw-relative">
                              <button onClick={() => setSeason(i)} aria-pressed={i === season}
                                className="tw-group tw-relative tw-grid tw-w-full tw-grid-cols-[15px_1fr] tw-items-center tw-gap-3 tw-rounded-xl tw-px-3 tw-py-2.5 tw-text-left tw-transition-all hover:tw-bg-white/70 aria-pressed:tw-bg-white aria-pressed:tw-shadow-[0_8px_20px_-12px_rgba(23,29,43,.35)]">
                                <i className="tw-relative tw-z-10 tw-h-[15px] tw-w-[15px] tw-rounded-full tw-border-2 tw-border-line-2 tw-bg-soft tw-transition-all group-hover:tw-border-brand-400 group-aria-pressed:tw-border-brand-500 group-aria-pressed:tw-bg-brand-500 group-aria-pressed:tw-shadow-[0_0_0_4px_rgba(67,97,238,.16)]" />
                                <span className="tw-min-w-0">
                                  <span className="tw-block tw-text-[12px] tw-font-medium tw-leading-tight tw-text-mute">{x.date}</span>
                                  <span className="tw-block tw-text-[15px] tw-font-semibold tw-leading-snug tw-tracking-tight tw-text-ink-2 group-aria-pressed:tw-text-brand-600">{x.name}</span>
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                  <div className="tw-mt-6 tw-rounded-xl tw-border tw-border-dashed tw-border-line-2 tw-px-4 tw-py-3.5">
                    <div className="tw-flex tw-items-center tw-gap-2 tw-text-[13px] tw-font-bold tw-text-ink">Coming soon</div>
                    <p className="tw-mt-1 tw-text-[13px] tw-text-mute">매 시즌 새로운 일정이 계속 추가됩니다.</p>
                  </div>
                </div>
              </div>

              <div className="tw-col-span-12 tw-flex tw-flex-col tw-items-center lg:tw-col-span-4">
                <ExampleTag />
                <div key={`${season}-${fmt}`} className="tw-animate-pop motion-reduce:tw-animate-none">
                  <Phone s={s} fmt={fmt} />
                </div>
              </div>

              <div className="tw-col-span-12 lg:tw-col-span-5">
                <div className="tw-rounded-2xl tw-border tw-border-line tw-bg-white tw-px-5 tw-pb-7 tw-pt-1 sm:tw-px-7">
                  <InfoRow label="보내는 곳"><b className="tw-text-[17px] tw-tracking-tight">SKT 공식 발신번호</b><p className="tw-mt-1 tw-text-[14px] tw-text-ink-2">‘확인된 발신번호’ 표시와 함께 도착합니다.</p></InfoRow>
                  <InfoRow label="받는 사람"><b className="tw-text-[17px] tw-tracking-tight">{s.who}</b><p className="tw-mt-1 tw-text-[14px] tw-text-ink-2">SKT 마케팅 수신 동의 회원 대상 중 해당 카테고리로 분류된 고객입니다.</p></InfoRow>
                  <InfoRow label="문자 구성" last><b className="tw-text-[17px] tw-tracking-tight">시즌 이벤트 + 다양한 업종의 광고</b><p className="tw-mt-1 tw-text-[14px] tw-text-ink-2">해당 시즌에 우리 상품을 홍보해보세요!</p></InfoRow>

                  <div className="tw-mt-5 tw-rounded-xl tw-bg-soft tw-px-5 tw-py-5">
                    <div className="tw-flex tw-items-center tw-gap-2 tw-text-[17px] tw-font-bold">실제 집행 가능한 구좌는 문의가 필요해요</div>
                    <p className="tw-mt-1.5 tw-text-[14px] tw-text-ink-2">왼쪽 화면은 <b>예시 화면</b>입니다. 구좌는 <b>선착순으로 마감</b>될 수 있으므로, 원하시는 시즌과 구좌를 메일로 전달주시면 집행 가능 여부를 안내드립니다.</p>
                    <div className="tw-mt-4 tw-flex tw-flex-wrap tw-gap-2">
                      <a className="tw-group tw-inline-flex tw-h-11 tw-items-center tw-gap-2 tw-rounded-[10px] tw-bg-ink tw-px-4 tw-text-[15px] tw-font-semibold tw-text-white tw-no-underline tw-transition-colors hover:tw-bg-black hover:tw-text-white" href={mailHref}>
                      메일로 문의하기<span className="tw-transition-transform group-hover:tw-translate-x-1"><Arrow /></span>
                      </a>
                      <CopyFormButton text={mailBody} />
                    </div>
                  </div>
                  <div className="tw-mt-4 tw-flex tw-items-start tw-gap-2.5 tw-text-[14px] tw-text-ink-2">
                    <svg className="tw-mt-1 tw-shrink-0 tw-text-brand-600" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.6" /><path d="M8 4.5V8l2.4 1.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                    <span>1개 광고 당 최소 {MIN_LIVE}개 소재 확정 시 집행이 가능하며, 집행 가능 일자는 별도로 회신드립니다.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- 04 단가 ---------- */}
        <section id="pricing" className={SECTION_PAD}>
          <div className={WRAP}>
            <SectionHead no="04" label="구좌별 단가" title={<>구좌 위치에 따라<br />단가가 달라집니다</>} desc="슬라이드형은 맨 앞장의 노출이 가장 많아 단가가 가장 높게 책정됩니다. 표의 단가는 예시이며, 확정 단가는 문의 시 안내드립니다." />

            {edit && (
              <div className="tw-mb-6 tw-flex tw-items-center tw-justify-between tw-gap-4 tw-rounded-xl tw-border tw-border-dashed tw-border-brand-500 tw-bg-brand-50 tw-px-4 tw-py-3.5 tw-text-[14px]">
                <span><b>단가 편집 모드</b> — 입력한 값은 이 브라우저에만 저장됩니다. 확정되면 <code>BiztalkBizting.tsx</code> 상단 <code>PRICING</code>에 옮겨 적으세요.</span>
                <button className="tw-inline-flex tw-h-10 tw-shrink-0 tw-items-center tw-rounded-[10px] tw-border tw-border-line-2 tw-bg-white tw-px-4 tw-text-[14px] tw-font-semibold hover:tw-border-ink"
                  onClick={() => { const t = JSON.stringify(prices, null, 2); (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(() => setCopied(true), () => window.prompt("아래 내용을 복사하세요", t)); }}>{copied ? "복사됨" : "JSON 복사"}</button>
              </div>
            )}

            <ul className="tw-mb-6 tw-flex tw-flex-wrap tw-gap-x-6 tw-gap-y-1.5 tw-text-[14px] tw-text-ink-2">
              {[`최소 ${MIN_LIVE}개 소재부터 라이브 가능`, "여러 구좌 선택 가능"].map((t) => (
                <li key={t} className="tw-inline-flex tw-items-center tw-gap-1.5">
                  <svg className="tw-shrink-0 tw-text-brand-500" width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8.5l3.2 3.2L13 4.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  {t}
                </li>
              ))}
            </ul>

            <div className="tw-grid tw-grid-cols-1 tw-gap-10 md:tw-grid-cols-2 md:tw-gap-6">
              {(["slide", "banner"] as Fmt[]).map((f) => (
                <Reveal key={f}>
                  <h3 className="tw-flex tw-items-baseline tw-justify-between tw-border-b-2 tw-border-ink tw-pb-3.5 tw-text-[20px] tw-font-bold tw-tracking-tight">{FMT_NAME[f]}<small className="tw-text-[13px] tw-font-medium tw-text-mute">건당 · VAT 별도</small></h3>
                  <ul>
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <li key={i} className={`tw-relative tw-flex tw-gap-3 tw-px-4 ${i === 0
                        ? "tw-my-2 tw-min-h-[88px] tw-items-center tw-rounded-2xl tw-border-2 tw-border-dashed tw-border-[#6cb9f3] tw-bg-white tw-py-4 tw-shadow-[0_18px_34px_-16px_rgba(67,97,238,.38)]"
                        : "tw-items-baseline tw-border-b tw-border-line tw-py-4"}`}>
                        {i === 0 && (
                          <span className="tw-absolute -tw-right-2.5 -tw-top-3 tw-grid tw-h-9 tw-w-9 tw-place-items-center tw-rounded-full tw-bg-brand-500 tw-text-[11px] tw-font-bold tw-leading-none tw-text-white tw-shadow-[0_6px_14px_-4px_rgba(67,97,238,.7)] tw-ring-4 tw-ring-white">추천</span>
                        )}
                        <span className="tw-w-[52px] tw-shrink-0 tw-text-[15px] tw-font-bold">{i + 1}구좌</span>
                        <span className="tw-min-w-0 tw-text-[15px] tw-text-ink-2">
                          {i === 0 ? (
                            <>
                              <b className="tw-font-semibold tw-text-ink">{f === "slide" ? "맨 앞장" : SLOT_NOTE[f][0]}</b>
                              {f === "slide" && <span className="tw-mt-0.5 tw-block tw-text-[13px] tw-font-semibold tw-text-brand-600">노출이 많은 구좌</span>}
                            </>
                          ) : SLOT_NOTE[f][i]}
                        </span>
                        <span className={`tw-ml-auto tw-shrink-0 tw-font-semibold ${i === 0 ? "tw-text-[17px] tw-text-brand-600" : "tw-text-[15px]"}`}>
                          {edit
                            ? <input type="number" min={0} step={1} inputMode="numeric" value={prices[f][i] ?? ""} placeholder="추후 반영" onChange={(e) => updatePrice(f, i, e.target.value)} className="tw-h-9 tw-w-28 tw-rounded-lg tw-border tw-border-line-2 tw-px-2.5 tw-text-right tw-font-semibold" />
                            : <PriceText v={prices[f][i]} />}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>

            {PRICE_IS_SAMPLE && <p className="tw-mt-6 tw-text-[13px] tw-text-mute">※ 건당, VAT 별도</p>}

            <Reveal className="tw-mt-8 tw-grid tw-grid-cols-1 tw-items-center tw-gap-4 tw-rounded-2xl tw-border tw-border-line tw-bg-white tw-px-6 tw-py-6 md:tw-grid-cols-[auto_1fr_auto] md:tw-gap-8 md:tw-px-7">
              <div><div className="tw-text-[17px] tw-font-bold">비즈팅 정가 (기본 단가)</div><div className="tw-text-[14px] tw-text-mute">건당 · VAT 별도</div></div>
              <Para text="위 구좌를 선택해 집행하면 정가보다 저렴한 단가로 집행할 수 있습니다. 아래 계산기에서 예상 금액을 확인해 보세요." className="tw-text-[15px] tw-text-ink-2" />
              <div className="tw-flex tw-flex-col tw-items-end">
                <small className="tw-text-[13px] tw-font-medium tw-text-mute">정가 · 건당</small>
                {edit
                  ? <input type="number" min={0} value={prices.base.price} onChange={(e) => updatePrice("base", 0, e.target.value)} className="tw-h-9 tw-w-24 tw-rounded-lg tw-border tw-border-line-2 tw-px-2.5 tw-text-right tw-text-[18px] tw-font-bold" />
                  : <b className="tw-text-[28px] tw-tracking-[-.03em]"><CountUp to={prices.base.price} />원</b>}
              </div>
            </Reveal>
            <Calculator prices={prices} />
          </div>
        </section>

        {/* ---------- 문의 ---------- */}
        <section id="contact" className="tw-scroll-mt-[72px] tw-bg-night tw-py-20 tw-text-white lg:tw-py-28">
          <div className={`${WRAP} tw-grid tw-grid-cols-12 tw-items-start tw-gap-x-6 tw-gap-y-12`}>
            <Reveal className="tw-col-span-12 lg:tw-col-span-6">
              <span className="tw-inline-flex tw-items-center tw-gap-2.5 tw-text-[14px] tw-font-semibold tw-text-[#8fb0ff]"><b className="tw-font-bold tw-text-white">05</b><span className="tw-h-px tw-w-6 tw-bg-white/30" />신청 방법</span>
              <h2 className="tw-mt-4 tw-text-[length:clamp(28px,3.4vw,40px)] tw-font-bold tw-leading-[1.25] tw-tracking-[-.03em]">아래 메일을 통해 <br />신청해주세요.</h2>
              <div className="tw-mt-8 tw-flex tw-flex-wrap tw-items-center tw-gap-3">
                {CONTACT.email && (
                  <a className="tw-group tw-inline-flex tw-h-14 tw-items-center tw-justify-center tw-gap-2.5 tw-rounded-xl tw-bg-white tw-px-6 tw-text-[18px] tw-font-bold tw-text-ink tw-no-underline tw-transition-colors hover:tw-bg-[#e9eefc] hover:tw-text-ink" href={mailHref}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3.5 7l8.5 6 8.5-6" /></svg>
                    {CONTACT.email}
                  </a>
                )}
                {CONTACT.email && <CopyFormButton dark text={mailBody} />}
                {CONTACT.tel && <a className="tw-inline-flex tw-h-14 tw-items-center tw-rounded-xl tw-border tw-border-white/25 tw-px-6 tw-text-[16px] tw-font-semibold tw-text-white tw-no-underline hover:tw-border-white hover:tw-text-white" href={`tel:${CONTACT.tel.replace(/[^0-9+]/g, "")}`}>{CONTACT.tel}</a>}
                {!CONTACT.email && !CONTACT.tel && <p className="tw-text-[16px] tw-text-white/80">비즈톡 담당자를 통해 문의해 주세요.</p>}
              </div>
              <Para text="버튼을 누르면 작성 양식이 채워진 메일 창이 열립니다. 메일 창이 열리지 않으면 ‘양식 복사하기’로 복사해 붙여 넣어 주세요." className="tw-mt-4 tw-text-[14px] tw-text-[#8d97aa]" />
            </Reveal>

            <Reveal delay={120} className="tw-col-span-12 lg:tw-col-span-5 lg:tw-col-start-8">
              <ol className="tw-border-t tw-border-white/15">
                <li className="tw-grid tw-grid-cols-[44px_1fr] tw-border-b tw-border-white/15 tw-py-5">
                  <span className="tw-pt-0.5 tw-text-[14px] tw-font-semibold tw-text-[#8fb0ff]">01</span>
                  <div>
                    <b className="tw-text-[18px] tw-tracking-tight">메일에 아래 사항 적어 보내기</b>
                    <div className="tw-mt-3 tw-flex tw-flex-wrap tw-gap-2">
                      {APPLY_FIELDS.map((t) => (
                        <span key={t} className="tw-rounded-md tw-bg-white/10 tw-px-2.5 tw-py-1.5 tw-text-[14px] tw-text-white">{t}</span>
                      ))}
                    </div>
                  </div>
                </li>
                <li className="tw-grid tw-grid-cols-[44px_1fr] tw-border-b tw-border-white/15 tw-py-5">
                  <span className="tw-pt-0.5 tw-text-[14px] tw-font-semibold tw-text-[#8fb0ff]">02</span>
                  <div><b className="tw-text-[18px] tw-tracking-tight">가능 여부 회신 받기</b><Para as="span" text="집행 가능한 구좌와 일정을 확인해 답장드립니다. 구좌는 선착순으로 마감될 수 있어요." className="tw-mt-1 tw-block tw-text-[15px] tw-text-[#aab3c4]" /></div>
                </li>
                <li className="tw-grid tw-grid-cols-[44px_1fr] tw-border-b tw-border-white/15 tw-py-5">
                  <span className="tw-pt-0.5 tw-text-[14px] tw-font-semibold tw-text-[#8fb0ff]">03</span>
                  <div><b className="tw-text-[18px] tw-tracking-tight">집행 확정</b><Para as="span" text="1개 광고 당 최소 3개 소재 확정 시 라이브할 수 있어요." className="tw-mt-1 tw-block tw-text-[15px] tw-text-[#aab3c4]" /></div>
                </li>
              </ol>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="tw-border-t tw-border-line tw-bg-white">
        <div className={`${WRAP} tw-py-12`}>
          <div className="tw-flex tw-flex-col tw-gap-8 md:tw-flex-row md:tw-items-start md:tw-justify-between">
            <div className="tw-max-w-[560px]">
              <div className="tw-flex tw-items-center tw-gap-3.5">
                <img className="tw-h-[28px] tw-w-auto tw-max-w-none" src={biztalkLogo} alt="비즈톡 biztalk" />
                <span className="tw-h-5 tw-w-px tw-bg-line-2" />
                <img className="tw-h-[26px] tw-w-auto tw-max-w-none" src={biztingLogo} alt="비즈팅" />
              </div>
              <p className="tw-mt-5 tw-text-[13px] tw-leading-[1.75] tw-text-mute">본 페이지의 시즌별 광고 콘텐츠는 이해를 돕기 위한 샘플이며, 실제 집행 내용과 일정은 협의 후 확정됩니다.</p>
            </div>
            <div className="tw-text-[14px]">
              <div className="tw-mb-2 tw-text-[12px] tw-font-bold tw-tracking-[.06em] tw-text-mute">광고 문의</div>
              {CONTACT.email && <a className="tw-font-semibold tw-text-ink tw-no-underline hover:tw-text-brand-600" href={mailHref}>{CONTACT.email}</a>}
              {CONTACT.tel && <div className="tw-mt-1 tw-text-ink-2">{CONTACT.tel}</div>}
            </div>
          </div>
          <div className="tw-mt-10 tw-flex tw-flex-col tw-gap-1.5 tw-border-t tw-border-line tw-pt-6 tw-text-[13px] tw-text-mute md:tw-flex-row md:tw-items-center md:tw-justify-between">
            <span>© {new Date().getFullYear()} Biztalk. All rights reserved.</span>
            <span>비즈톡|비즈팅</span>
          </div>
        </div>
      </footer>
    </div>
  );

}

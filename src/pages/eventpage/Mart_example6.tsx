import React, { useState, useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';
import { MapPin, Map, Ticket, X, Clock, Tag, Gift, Truck } from 'lucide-react';
import { useNaverLogin } from '../../hooks/useNaverLogin';

/* ══ 상품 이미지 (Unsplash) ══ */
const IMG = {
    watermelon: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300&q=80",
    beef: "https://images.unsplash.com/photo-1723893905879-0e309c2a8e06?w=300&q=80",
    oyster: "https://images.unsplash.com/photo-1578882422378-9ed72be08b5e?w=300&q=80",
    mandarin: "https://images.unsplash.com/photo-1615913069134-0d8bf5efc6eb?w=300&q=80",
    salad: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&q=80",
    cheese: "https://images.unsplash.com/photo-1657047869556-11105810779a?w=300&q=80",
    egg: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=300&q=80",
    garlic: "https://images.unsplash.com/photo-1615477550927-6ec8445fcfe6?w=300&q=80",
};

// ─── 1. Barcode Hook ───
function useBarcode(code: string, canvasRef: React.RefObject<HTMLCanvasElement | null>) {
    useEffect(() => {
        if (canvasRef.current && code) {
            JsBarcode(canvasRef.current, code, {
                format: "CODE128",
                width: 2,
                height: 50,
                displayValue: false,
                background: "transparent",
                lineColor: "#1F2937",
                margin: 0,
            });
        }
    }, [code]);
}

// ─── 2. Data Models & Mock Data ───
type Category = 'all' | 'meat' | 'veg' | 'fruit' | 'seafood' | 'dairy';

interface Product {
    id: string;
    category: Category;
    name: string;
    desc: string;
    price: string;
    oldPrice: string;
    discountSuffix: string;
    badgeColor: string;
    couponCode: string;
    type: 'time' | 'weekly' | 'normal';
    img: string;
    discountRate?: number;
    discountText?: string;
}

const CATEGORIES: { id: Category; label: string; icon: string; color: string }[] = [
    { id: 'all', label: '전체보기', icon: '🏠', color: 'tw-bg-white' },
    { id: 'meat', label: '정육/계란', icon: '🥩', color: 'tw-bg-[#FEE2E2]' },
    { id: 'veg', label: '채소', icon: '🥦', color: 'tw-bg-[#DCFCE7]' },
    { id: 'fruit', label: '과일', icon: '🍎', color: 'tw-bg-[#FEF9C3]' },
    { id: 'seafood', label: '수산', icon: '🐟', color: 'tw-bg-[#E0F2FE]' },
    { id: 'dairy', label: '유제품', icon: '🥛', color: 'tw-bg-[#F3E8FF]' },
];

const RAW_PRODUCTS: Omit<Product, 'discountRate' | 'discountText'>[] = [
    { id: 't1', category: 'fruit', img: IMG.watermelon, name: '고창 당도선별 흑수박', desc: '7kg 이상 / 1인 1통 한정', price: '8,900', oldPrice: '24,000', discountSuffix: ' 폭탄', badgeColor: 'tw-bg-[#FEE2E2] tw-text-[#EF4444]', couponCode: 'TIME-WM-62', type: 'time' },
    { id: 'w1', category: 'meat', img: IMG.beef, name: '미국산 프라임 소고기', desc: '구이용 300g', price: '14,900', oldPrice: '29,800', discountSuffix: ' 특가', badgeColor: 'tw-bg-[#FFEDD5] tw-text-[#EA580C]', couponCode: 'BEEF-50-DC', type: 'weekly' },
    { id: 'w2', category: 'seafood', img: IMG.oyster, name: '남해안 생굴', desc: '산지직송 200g', price: '6,900', oldPrice: '12,000', discountSuffix: ' 특가', badgeColor: 'tw-bg-[#E0F2FE] tw-text-[#0284C7]', couponCode: 'OYSTER-42-DC', type: 'weekly' },
    { id: 'w3', category: 'fruit', img: IMG.mandarin, name: '제주 타이벡 감귤', desc: '3kg 박스', price: '9,900', oldPrice: '15,900', discountSuffix: ' 특가', badgeColor: 'tw-bg-[#FEF9C3] tw-text-[#CA8A04]', couponCode: 'MANDARIN-37', type: 'weekly' },
    { id: 'w4', category: 'veg', img: IMG.salad, name: '유기농 샐러드 볼', desc: '400g', price: '2,500', oldPrice: '4,000', discountSuffix: ' 특가', badgeColor: 'tw-bg-[#DCFCE7] tw-text-[#166534]', couponCode: 'VEG-37-DC', type: 'weekly' },
    { id: 'n1', category: 'dairy', img: IMG.cheese, name: '서울우유 체다치즈', desc: '15매입', price: '3,980', oldPrice: '5,500', discountSuffix: '', badgeColor: 'tw-bg-gray-100 tw-text-gray-600', couponCode: 'CHEESE-27', type: 'normal' },
    { id: 'n2', category: 'meat', img: IMG.egg, name: '무항생제 1등급 대란', desc: '30구', price: '5,500', oldPrice: '7,000', discountSuffix: '', badgeColor: 'tw-bg-gray-100 tw-text-gray-600', couponCode: 'EGG-21', type: 'normal' },
    { id: 'n3', category: 'veg', img: IMG.garlic, name: '국내산 생마늘', desc: '500g', price: '4,500', oldPrice: '6,000', discountSuffix: '', badgeColor: 'tw-bg-gray-100 tw-text-gray-600', couponCode: 'GARLIC-25', type: 'normal' },
];

const PRODUCTS: Product[] = RAW_PRODUCTS.map(item => {
    const priceVal = parseInt(item.price.replace(/,/g, ''), 10);
    const oldPriceVal = parseInt(item.oldPrice.replace(/,/g, ''), 10);
    const discountRate = Math.floor(((oldPriceVal - priceVal) / oldPriceVal) * 100);
    return { ...item, discountRate, discountText: `${discountRate}%${item.discountSuffix}` };
});

// ─── 3. General Coupon ───
const GeneralCoupon = ({ title, desc, code, icon: Icon, colorClass, unlocked, onDownload }: any) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useBarcode(code, canvasRef);
    return (
        <div className="tw-bg-white tw-rounded-[1.5rem] tw-p-5 tw-mb-4 tw-shadow-sm tw-border tw-border-gray-100">
            <div className="tw-flex tw-items-center tw-gap-4 tw-mb-4">
                <div className={`tw-w-12 tw-h-12 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-shrink-0 ${colorClass}`}>
                    <Icon size={24} />
                </div>
                <div>
                    <h3 className="tw-text-[18px] tw-font-extrabold tw-text-gray-800">{title}</h3>
                    <p className="tw-text-[13px] tw-text-gray-500 tw-mt-0.5">{desc}</p>
                </div>
            </div>

            {/* 바코드 영역 — 미로그인 시 블러 + 잠금 UI */}
            <div className="tw-relative tw-bg-[#F8FAF9] tw-rounded-xl tw-p-4 tw-text-center" style={{ minHeight: 120 }}>
                {!unlocked && (
                    <div
                        className="tw-absolute tw-inset-0 tw-rounded-xl tw-z-10 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2.5 tw-px-4"
                        style={{ backdropFilter: 'blur(6px)', background: 'rgba(248,250,249,0.65)' }}
                    >
                        <span className="tw-text-[20px]">🔒</span>
                        <p className="tw-text-[12px] tw-font-bold tw-text-gray-500">회원가입 후 사용 가능</p>
                        <button
                            onClick={onDownload}
                            className="tw-w-full tw-py-2.5 tw-rounded-xl tw-text-[13px] tw-font-bold tw-text-white tw-bg-[#03C75A]"
                        >
                            쿠폰 다운받기
                        </button>
                    </div>
                )}
                <div className="tw-flex tw-justify-center tw-mb-2">
                    <canvas ref={canvasRef} className="tw-w-full tw-max-w-[240px] tw-h-[40px] mix-blend-multiply" />
                </div>
                <p className="tw-font-mono tw-text-[12px] tw-font-bold tw-text-gray-400">{code}</p>
            </div>

            {/* 로그인 후 완료 표시 */}
            {unlocked && (
                <div className="tw-mt-3 tw-w-full tw-py-2.5 tw-rounded-xl tw-text-center tw-text-[13px] tw-font-bold tw-text-[#166534] tw-bg-[#DCFCE7]">
                    ✅ 쿠폰이 활성화되었습니다
                </div>
            )}
        </div>
    );
};

// ─── 4. Main ───
export default function FreshMartOrganicApp() {
    const [activeTab, setActiveTab] = useState<'home' | 'benefits'>('home');
    const [selectedCategory, setSelectedCategory] = useState<Category>('all');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [showLoginAlert, setShowLoginAlert] = useState(false);
    const { unlocked: couponUnlocked, openLogin } = useNaverLogin('DQrTZu', 'freshmart');

    const sheetCanvasRef = useRef<HTMLCanvasElement>(null);
    useBarcode(selectedProduct?.couponCode || '', sheetCanvasRef);

    const openCoupon = (p: Product) => { setSelectedProduct(p); setIsBottomSheetOpen(true); };
    const closeCoupon = () => { setIsBottomSheetOpen(false); setTimeout(() => setSelectedProduct(null), 300); };
    const openNaverMap = () => window.open('https://naver.me/58NicTqn', '_blank');

    const filteredProducts = PRODUCTS.filter(p => selectedCategory === 'all' || p.category === selectedCategory);
    const timeSaleProducts = filteredProducts.filter(p => p.type === 'time');
    const weeklyProducts = filteredProducts.filter(p => p.type === 'weekly');
    const normalProducts = filteredProducts.filter(p => p.type === 'normal');

    return (
        <div className="tw-max-w-md tw-mx-auto tw-bg-[#F4F9F5] tw-min-h-screen tw-font-sans tw-text-gray-800 tw-relative tw-overflow-hidden"
            style={{ fontFamily: "'Pretendard', sans-serif" }}>

            {/* 로그인 알럿 모달 */}
            {showLoginAlert && (
                <div
                    className="tw-fixed tw-inset-0 tw-z-[100] tw-flex tw-items-center tw-justify-center tw-px-6"
                    style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
                >
                    <div className="tw-w-full tw-bg-white tw-rounded-3xl tw-overflow-hidden" style={{ maxWidth: 340 }}>
                        <div className="tw-px-6 tw-pt-7 tw-pb-5 tw-text-center tw-bg-[#03C75A]">
                            <div className="tw-text-[44px] tw-mb-2">🎁</div>
                            <p className="tw-text-white tw-font-black tw-text-[18px]">쿠폰을 받으시겠어요?</p>
                            <p className="tw-text-[12px] tw-mt-1.5 tw-text-white/75">회원가입하고 쿠폰과 마트 소식을 한번에!</p>
                        </div>
                        <div className="tw-px-6 tw-pt-5 tw-pb-2 tw-space-y-2.5">
                            {[
                                { icon: '✅', text: '신규가입 즉시 10,000원 쿠폰 지급' },
                                { icon: '🔔', text: '프레시마트 최신 할인 소식 알림' },
                                { icon: '🚚', text: '첫 구매 무료배송 혜택' },
                            ].map(item => (
                                <div key={item.text} className="tw-flex tw-items-center tw-gap-3">
                                    <span className="tw-text-[16px]">{item.icon}</span>
                                    <span className="tw-text-[12.5px] tw-font-medium tw-text-gray-700">{item.text}</span>
                                </div>
                            ))}
                        </div>
                        <div className="tw-px-6 tw-py-5 tw-flex tw-flex-col tw-gap-2.5">
                            <button
                                onClick={() => { setShowLoginAlert(false); openLogin(); }}
                                className="tw-w-full tw-py-3.5 tw-rounded-2xl tw-text-[14px] tw-font-bold tw-text-white tw-bg-[#03C75A]"
                            >
                                네이버로 회원가입 · 쿠폰 받기
                            </button>
                            <button
                                onClick={() => setShowLoginAlert(false)}
                                className="tw-w-full tw-py-3 tw-rounded-2xl tw-text-[13px] tw-font-medium tw-text-gray-400 tw-bg-gray-100"
                            >
                                다음에 할게요
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* HEADER */}
            <div className="tw-bg-gradient-to-b tw-from-[#E8F3EB] tw-to-[#F4F9F5] tw-pt-10 tw-pb-4 tw-px-6 tw-rounded-b-[2.5rem]">
                <div className="tw-flex tw-items-center tw-justify-between tw-mb-6">
                    <div className="tw-flex tw-items-center tw-gap-3">
                        <div className="tw-w-11 tw-h-11 tw-bg-white tw-rounded-full tw-flex tw-items-center tw-justify-center tw-shadow-sm tw-text-[#4ADE80]">
                            <MapPin size={22} fill="currentColor" />
                        </div>
                        <div>
                            <p className="tw-text-[12px] tw-text-gray-500 tw-font-semibold">프레시마트 본점</p>
                            <p className="tw-text-[16px] tw-font-extrabold tw-text-gray-900">서울 강남구 봉은사로</p>
                        </div>
                    </div>
                    <button onClick={openNaverMap}
                        className="tw-flex tw-items-center tw-gap-1.5 tw-bg-[#03C75A]/10 tw-text-[#03C75A] tw-px-3 tw-py-2 tw-rounded-xl tw-font-bold tw-text-[12px] hover:tw-bg-[#03C75A]/20 tw-transition-colors">
                        <Map size={14} /> 지도보기
                    </button>
                </div>
                <div className="tw-flex tw-bg-white/60 tw-backdrop-blur-md tw-p-1 tw-rounded-2xl tw-shadow-sm">
                    {(['home', 'benefits'] as const).map(t => (
                        <button key={t} onClick={() => setActiveTab(t)}
                            className={`tw-flex-1 tw-py-2.5 tw-text-[14px] tw-font-bold tw-rounded-xl tw-transition-all ${activeTab === t ? 'tw-bg-white tw-text-[#166534] tw-shadow-sm' : 'tw-text-gray-400'}`}>
                            {t === 'home' ? '행사상품 홈' : '특별 쿠폰함'}
                        </button>
                    ))}
                </div>
            </div>

            {/* CONTENT */}
            <div className="tw-px-5 tw-pb-24 tw-pt-4">

                {/* TAB: HOME */}
                {activeTab === 'home' && (
                    <div>
                        {/* 카테고리 */}
                        <div className="tw-flex tw-overflow-x-auto tw-gap-1 tw-pb-4 tw-pt-1 -tw-mx-5 tw-px-5" style={{ scrollbarWidth: "none" }}>
                            {CATEGORIES.map(cat => (
                                <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                                    className={`tw-flex tw-flex-col tw-items-center tw-gap-1.5 tw-shrink-0 tw-transition-transform active:tw-scale-95 tw-p-1 ${selectedCategory === cat.id ? 'tw-opacity-100' : 'tw-opacity-50 grayscale'}`}>
                                    <div className={`tw-w-14 tw-h-14 tw-rounded-[1.2rem] ${cat.color} tw-flex tw-items-center tw-justify-center tw-text-[24px] tw-shadow-sm ${selectedCategory === cat.id ? 'tw-ring-2 tw-ring-[#4ADE80] tw-ring-offset-2 tw-ring-offset-[#F4F9F5]' : ''}`}>
                                        {cat.icon}
                                    </div>
                                    <span className={`tw-text-[12px] ${selectedCategory === cat.id ? 'tw-font-bold tw-text-gray-800' : 'tw-font-medium tw-text-gray-500'}`}>{cat.label}</span>
                                </button>
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="tw-text-center tw-py-10 tw-text-gray-400 tw-font-medium">해당 카테고리의 행사 상품이 없습니다.</div>
                        )}

                        {/* 타임 특가 */}
                        {timeSaleProducts.length > 0 && (
                            <div className="tw-mb-8 tw-mt-2">
                                <div className="tw-flex tw-items-center tw-gap-2 tw-mb-3">
                                    <Clock className="tw-text-[#EF4444]" size={18} />
                                    <h2 className="tw-text-[18px] tw-font-extrabold tw-text-gray-900">타임 특가 세일</h2>
                                    <span className="tw-bg-[#FEE2E2] tw-text-[#EF4444] tw-text-[10px] tw-font-bold tw-px-2 tw-py-0.5 tw-rounded-full">14:00 마감</span>
                                </div>
                                {timeSaleProducts.map(item => (
                                    <div key={item.id} onClick={() => openCoupon(item)}
                                        className="tw-bg-white tw-rounded-3xl tw-p-4 tw-shadow-sm tw-flex tw-gap-4 tw-cursor-pointer hover:tw-shadow-md tw-transition-shadow">
                                        <div className="tw-w-28 tw-h-28 tw-shrink-0 tw-relative">
                                            <img src={item.img} alt={item.name} className="tw-w-full tw-h-full tw-object-cover tw-rounded-2xl" />
                                            <div className="tw-absolute -tw-top-2 -tw-left-2 tw-bg-[#EF4444] tw-text-white tw-text-[11px] tw-font-bold tw-w-10 tw-h-10 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-shadow-md tw-rotate-12">
                                                {item.discountRate}%
                                            </div>
                                        </div>
                                        <div className="tw-flex tw-flex-col tw-justify-center tw-flex-1">
                                            <h3 className="tw-text-[15px] tw-font-bold tw-text-gray-900 tw-leading-tight tw-mb-1">{item.name}</h3>
                                            <p className="tw-text-[12px] tw-text-gray-400 tw-mb-2">{item.desc}</p>
                                            <span className="tw-text-[12px] tw-text-gray-400 tw-line-through tw-block tw-leading-none tw-mb-1">{item.oldPrice}원</span>
                                            <div className="tw-flex tw-items-center tw-justify-between">
                                                <span className="tw-text-[20px] tw-font-black tw-text-[#EF4444] leading-none">{item.price}<span className="tw-text-[14px] tw-font-bold">원</span></span>
                                                <button className="tw-flex tw-items-center tw-gap-1 tw-bg-gray-50 tw-text-gray-600 tw-px-2.5 tw-py-1.5 tw-rounded-xl tw-text-[11px] tw-font-bold">
                                                    <Ticket size={12} /> 쿠폰
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* 금주 추천 그리드 */}
                        {weeklyProducts.length > 0 && (
                            <div className="tw-mb-8">
                                <h2 className="tw-text-[18px] tw-font-extrabold tw-text-gray-900 tw-mb-3">금주 특별 할인 행사</h2>
                                <div className="tw-grid tw-grid-cols-2 tw-gap-3">
                                    {weeklyProducts.map(item => (
                                        <div key={item.id} onClick={() => openCoupon(item)}
                                            className="tw-bg-white tw-rounded-[1.5rem] tw-p-3.5 tw-shadow-sm tw-cursor-pointer hover:tw-shadow-md tw-transition-shadow tw-flex tw-flex-col">
                                            <div className="tw-w-full tw-aspect-square tw-rounded-[1rem] tw-overflow-hidden tw-mb-3">
                                                <img src={item.img} alt={item.name} className="tw-w-full tw-h-full tw-object-cover" />
                                            </div>
                                            <div className="tw-flex-1 tw-flex tw-flex-col">
                                                <span className={`tw-text-[10px] tw-font-bold tw-px-1.5 tw-py-0.5 tw-rounded tw-inline-block tw-self-start tw-mb-1.5 ${item.badgeColor}`}>
                                                    {item.discountText}
                                                </span>
                                                <h3 className="tw-text-[13px] tw-font-bold tw-text-gray-800 tw-leading-snug tw-mb-0.5">{item.name}</h3>
                                                <p className="tw-text-[11px] tw-text-gray-400 tw-mb-2 tw-line-clamp-1">{item.desc}</p>
                                                <div className="tw-mt-auto tw-flex tw-items-end tw-justify-between">
                                                    <div>
                                                        <span className="tw-text-[10px] tw-text-gray-400 tw-line-through tw-block tw-leading-none tw-mb-0.5">{item.oldPrice}원</span>
                                                        <span className="tw-text-[16px] tw-font-extrabold tw-text-gray-900 tw-leading-none">{item.price}</span>
                                                    </div>
                                                    <div className="tw-w-8 tw-h-8 tw-bg-[#E8F3EB] tw-text-[#166534] tw-rounded-full tw-flex tw-items-center tw-justify-center">
                                                        <Ticket size={14} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 알뜰 행사 리스트 */}
                        {normalProducts.length > 0 && (
                            <div>
                                <h2 className="tw-text-[16px] tw-font-bold tw-text-gray-800 tw-mb-3">알뜰 행사 상품</h2>
                                <div className="tw-flex tw-flex-col tw-gap-3">
                                    {normalProducts.map(item => (
                                        <div key={item.id} onClick={() => openCoupon(item)}
                                            className="tw-bg-white tw-rounded-2xl tw-p-3 tw-flex tw-items-center tw-gap-3 tw-shadow-sm tw-cursor-pointer hover:tw-bg-gray-50 tw-transition-colors">
                                            <div className="tw-w-14 tw-h-14 tw-rounded-xl tw-overflow-hidden tw-shrink-0">
                                                <img src={item.img} alt={item.name} className="tw-w-full tw-h-full tw-object-cover" />
                                            </div>
                                            <div className="tw-flex-1">
                                                <h3 className="tw-text-[13px] tw-font-bold tw-text-gray-800">{item.name}</h3>
                                                <p className="tw-text-[11px] tw-text-gray-400 tw-mb-1">{item.desc}</p>
                                                <span className="tw-text-[14px] tw-font-extrabold tw-text-gray-900">{item.price}<span className="tw-text-[11px] tw-font-normal">원</span></span>
                                            </div>
                                            <button className="tw-bg-[#F4F9F5] tw-text-[#166534] tw-px-3 tw-py-2 tw-rounded-xl tw-text-[11px] tw-font-bold tw-flex tw-items-center tw-gap-1">
                                                <Ticket size={14} /> 쿠폰
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* TAB: BENEFITS */}
                {activeTab === 'benefits' && (
                    <div className="tw-pt-2">
                        <div className="tw-mb-6">
                            <h2 className="tw-text-[20px] tw-font-extrabold tw-text-gray-900">특별 할인 혜택</h2>
                            <p className="tw-text-[13px] tw-text-gray-500 tw-mt-1">결제 시 바코드를 제시해 주세요.</p>
                        </div>

                        {/* 로그인 완료 배너 */}
                        {couponUnlocked && (
                            <div className="tw-mb-5 tw-rounded-2xl tw-p-4 tw-flex tw-items-center tw-gap-3 tw-bg-[#DCFCE7]">
                                <span className="tw-text-[22px]">🎉</span>
                                <div>
                                    <p className="tw-text-[12px] tw-font-bold tw-text-[#166534]">로그인 완료! 쿠폰이 활성화됐어요</p>
                                    <p className="tw-text-[10.5px] tw-mt-0.5 tw-text-[#4ADE80]">아래 쿠폰을 매장 직원에게 제시해 주세요</p>
                                </div>
                            </div>
                        )}

                        {/* 미로그인 안내 배너 */}
                        {!couponUnlocked && (
                            <div className="tw-mb-5 tw-rounded-2xl tw-p-4 tw-flex tw-items-center tw-gap-3 tw-bg-[#FEF9C3]">
                                <span className="tw-text-[22px]">🔐</span>
                                <div>
                                    <p className="tw-text-[12px] tw-font-bold tw-text-[#854D0E]">회원 전용 쿠폰입니다</p>
                                    <p className="tw-text-[10.5px] tw-mt-0.5 tw-text-[#A16207]">네이버 회원가입 후 쿠폰을 받아보세요</p>
                                </div>
                            </div>
                        )}

                        <GeneralCoupon title="신규가입 10,000원 할인" desc="가입 후 첫 구매 시 즉시 사용 가능" code="NEW-USER-10000" icon={Gift} colorClass="tw-bg-[#FCE7F3] tw-text-[#BE185D]"
                            unlocked={couponUnlocked} onDownload={() => setShowLoginAlert(true)} />
                        <GeneralCoupon title="단골고객 5,000원 할인" desc="재방문 고객님을 위한 감사 쿠폰" code="VIP-USER-5000" icon={Tag} colorClass="tw-bg-[#E0F2FE] tw-text-[#0284C7]"
                            unlocked={couponUnlocked} onDownload={() => setShowLoginAlert(true)} />
                        <GeneralCoupon title="무료 배송 쿠폰" desc="2만원 이상 결제 시 배송비 무료" code="FREE-DELIVERY-0" icon={Truck} colorClass="tw-bg-[#DCFCE7] tw-text-[#166534]"
                            unlocked={couponUnlocked} onDownload={() => setShowLoginAlert(true)} />
                    </div>
                )}
            </div>

            {/* BOTTOM SHEET 배경 */}
            <div onClick={closeCoupon}
                className={`tw-fixed tw-inset-0 tw-bg-black/50 tw-backdrop-blur-sm tw-z-40 tw-transition-opacity tw-duration-300 ${isBottomSheetOpen ? 'tw-opacity-100 tw-pointer-events-auto' : 'tw-opacity-0 tw-pointer-events-none'}`} />

            {/* BOTTOM SHEET */}
            <div className={`tw-fixed tw-bottom-0 tw-left-0 tw-right-0 tw-max-w-md tw-mx-auto tw-bg-white tw-rounded-t-[2rem] tw-z-50 tw-transition-transform tw-duration-300 tw-pb-8 ${isBottomSheetOpen ? 'tw-translate-y-0' : 'tw-translate-y-full'}`}
                style={{ boxShadow: '0 -10px 40px rgba(0,0,0,0.1)' }}>
                <div className="tw-flex tw-justify-center tw-pt-3 tw-pb-4">
                    <div className="tw-w-12 tw-h-1.5 tw-bg-gray-200 tw-rounded-full" />
                </div>
                {selectedProduct && (
                    <div className="tw-px-6">
                        <div className="tw-flex tw-justify-between tw-items-start tw-mb-4">
                            <div className="tw-flex tw-gap-3 tw-items-center">
                                <div className="tw-w-16 tw-h-16 tw-rounded-2xl tw-overflow-hidden tw-shrink-0">
                                    <img src={selectedProduct.img} alt={selectedProduct.name} className="tw-w-full tw-h-full tw-object-cover" />
                                </div>
                                <div>
                                    <span className={`tw-text-[11px] tw-font-bold tw-px-2 tw-py-1 tw-rounded-md ${selectedProduct.badgeColor}`}>
                                        {selectedProduct.discountText} 쿠폰 적용
                                    </span>
                                    <h3 className="tw-text-[18px] tw-font-extrabold tw-text-gray-900 tw-mt-1">{selectedProduct.name}</h3>
                                    <p className="tw-text-[12px] tw-text-gray-500">{selectedProduct.desc}</p>
                                </div>
                            </div>
                            <button onClick={closeCoupon} className="tw-w-8 tw-h-8 tw-bg-gray-100 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-gray-500 tw-shrink-0">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="tw-bg-[#F8FAF9] tw-border tw-border-gray-200 tw-rounded-3xl tw-p-6 tw-relative tw-overflow-hidden tw-mb-4">
                            <div className="tw-absolute -tw-left-3 tw-top-1/2 -tw-translate-y-1/2 tw-w-6 tw-h-6 tw-bg-white tw-rounded-full tw-border-r tw-border-gray-200" />
                            <div className="tw-absolute -tw-right-3 tw-top-1/2 -tw-translate-y-1/2 tw-w-6 tw-h-6 tw-bg-white tw-rounded-full tw-border-l tw-border-gray-200" />
                            <div className="tw-text-center tw-border-b tw-border-dashed tw-border-gray-300 tw-pb-4 tw-mb-4">
                                <p className="tw-text-[13px] tw-text-gray-500 tw-font-medium tw-mb-1">결제 시 캐셔에게 보여주세요</p>
                                <div className="tw-flex tw-items-baseline tw-justify-center tw-gap-1">
                                    <span className="tw-text-[36px] tw-font-black tw-text-[#166534]">{selectedProduct.price}</span>
                                    <span className="tw-text-[18px] tw-font-bold tw-text-gray-800">원</span>
                                </div>
                            </div>
                            <div className="tw-text-center">
                                <div className="tw-flex tw-justify-center tw-mb-2">
                                    <canvas ref={sheetCanvasRef} className="tw-w-full tw-max-w-[260px] tw-h-[50px] mix-blend-multiply" />
                                </div>
                                <p className="tw-font-mono tw-text-[13px] tw-font-bold tw-text-gray-400 tw-tracking-widest">{selectedProduct.couponCode}</p>
                            </div>
                        </div>
                        <p className="tw-text-[11px] tw-text-center tw-text-gray-400">본 쿠폰은 1인 1회에 한하여 사용 가능합니다.</p>
                    </div>
                )}
            </div>

        </div>
    );
}
import React, { useState, useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';
import { MapPin, Phone, Map, Tag, Calendar, AlertCircle, Clock, ChevronRight, ShoppingBag } from 'lucide-react';

// ─── 1. Barcode Hook ───
function useBarcode(code: string, canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    if (canvasRef.current && code) {
      JsBarcode(canvasRef.current, code, {
        format: "CODE128",
        width: 2,
        height: 60,
        displayValue: false,
        background: "transparent",
        lineColor: "#374151", // 부드러운 다크 그레이
        margin: 0,
      });
    }
  }, [code]);
}

// ─── 2. Coupon Component (파스텔 톤 적용) ───
interface CouponProps {
  title: React.ReactNode;
  subTitle: string;
  couponCode: string;
  bgColor1: string;
  bgColor2: string;
}

const CouponTicket = ({ title, subTitle, couponCode, bgColor1, bgColor2 }: CouponProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useBarcode(couponCode, canvasRef);

  return (
    <div className="tw-px-4 tw-mb-6 tw-animate-fade-in">
      <div className="tw-relative tw-bg-white tw-rounded-2xl tw-overflow-hidden tw-shadow-sm tw-border tw-border-rose-100">
        
        {/* 상단 파스텔 그라데이션 영역 */}
        <div className="tw-relative tw-px-6 tw-py-6 tw-text-center" style={{background:`linear-gradient(135deg, ${bgColor1} 0%, ${bgColor2} 100%)`}}>
          <p className="tw-text-[22px] tw-font-extrabold tw-text-gray-800 tw-leading-snug tw-tracking-tight tw-break-keep">
            {title}
          </p>
          <p className="tw-text-[13px] tw-font-medium tw-text-gray-600 tw-mt-2">{subTitle}</p>
        </div>

        {/* 하단 바코드 및 정보 영역 */}
        <div className="tw-px-6 tw-py-6 tw-text-center">
          <div className="tw-rounded-xl tw-py-3 tw-px-4 tw-mb-5 tw-border tw-border-dashed tw-border-rose-200 tw-bg-rose-50/50">
            <p className="tw-text-[10px] tw-text-rose-400 tw-tracking-widest tw-mb-1 tw-uppercase tw-font-semibold">Coupon Code</p>
            <p className="tw-font-mono tw-text-[15px] tw-font-bold tw-text-gray-800 tw-tracking-widest">{couponCode}</p>
          </div>
          
          <div className="tw-mb-5 tw-flex tw-justify-center">
            <canvas ref={canvasRef} className="tw-w-full tw-max-w-[260px] tw-h-[50px] mix-blend-multiply"/>
          </div>

          <div className="tw-flex tw-items-center tw-justify-center tw-gap-3 tw-flex-wrap">
            <div className="tw-flex tw-items-center tw-gap-1 tw-text-gray-400">
              <Tag size={14} />
              <span className="tw-text-[12px] tw-font-medium">1인 1회</span>
            </div>
            <div className="tw-w-px tw-h-3 tw-bg-gray-200"/>
            <div className="tw-flex tw-items-center tw-gap-1 tw-text-gray-400">
              <Calendar size={14} />
              <span className="tw-text-[12px] tw-font-medium">~26.06.30</span>
            </div>
            <div className="tw-w-px tw-h-3 tw-bg-gray-200"/>
            <span className="tw-text-[12px] tw-font-medium tw-text-gray-400">중복 불가</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── 3. Main Landing Page ───
export default function FreshMartMobileFlyer() {
  const [activeTab, setActiveTab] = useState<'products' | 'location' | 'coupons'>('products');

  return (
    // 따뜻한 파스텔 오프화이트 배경
    <div className="tw-max-w-md tw-mx-auto tw-bg-[#FFFDFB] tw-min-h-screen tw-text-gray-900 tw-tracking-tight" style={{ fontFamily: "'Pretendard', 'Noto Sans KR', sans-serif" }}>
      
      {/* Header Area */}
      <header className="tw-bg-white tw-pt-6 tw-pb-4 tw-px-5 tw-shadow-sm tw-sticky tw-top-0 tw-z-50 tw-border-b tw-border-rose-50">
        <div className="tw-flex tw-items-center tw-justify-between tw-mb-5">
          <h1 className="tw-text-2xl tw-font-extrabold tw-text-gray-800 tw-tracking-tighter">
            <span className="tw-text-rose-400">Fresh</span>Mart
          </h1>
          <span className="tw-bg-rose-50 tw-text-rose-500 tw-text-[12px] tw-font-bold tw-px-3 tw-py-1 tw-rounded-full">
            주간행사
          </span>
        </div>
        
        {/* Navigation Tabs (파스텔 톤) */}
        <div className="tw-flex tw-bg-rose-50/50 tw-rounded-xl tw-p-1 tw-border tw-border-rose-100">
          {[
            { id: 'products', label: '상품' },
            { id: 'location', label: '위치 확인' },
            { id: 'coupons', label: '할인쿠폰' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`tw-flex-1 tw-py-2.5 tw-text-[14px] tw-font-semibold tw-rounded-lg tw-transition-all duration-200 ${
                activeTab === tab.id 
                  ? 'tw-bg-white tw-text-rose-500 tw-shadow-sm tw-border tw-border-rose-100/50' 
                  : 'tw-text-gray-500 hover:tw-text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="tw-pb-24">
        
        {/* ─── TAB 1: PRODUCTS ─── */}
        {activeTab === 'products' && (
          <div className="tw-animate-fade-in">
            {/* 메인 금주 특가 타이틀 */}
            <section className="tw-px-5 tw-pt-8 tw-pb-6">
              <div className="tw-text-center">
                <span className="tw-inline-block tw-text-rose-500 tw-font-bold tw-text-[13px] tw-mb-2 tw-bg-rose-100 tw-px-3 tw-py-1 tw-rounded-full">
                  딱! 7일간 한정수량
                </span>
                <h2 className="tw-text-[28px] tw-font-extrabold tw-tracking-tight tw-leading-tight tw-text-gray-800">
                  금주 특가! 최대 60%
                </h2>
              </div>
            </section>
            
            {/* 금주 특가 상품 그리드 */}
            <section className="tw-px-4">
              <div className="tw-grid tw-grid-cols-2 tw-gap-3.5">
                {[
                  { name: '미국산 한우 등심', unit: '100g', price: '9,800', oldPrice: '19,800', discount: '51%', limit: '500팩', badgeColor: 'tw-bg-rose-100 tw-text-rose-600' },
                  { name: '생새우', unit: '대/100g', price: '9,900', oldPrice: '22,800', discount: '56%', limit: '800팩', badgeColor: 'tw-bg-blue-100 tw-text-blue-600' },
                  { name: '미국산 체리', unit: '500g/팩', price: '4,900', oldPrice: '11,800', discount: '58%', limit: '600팩', badgeColor: 'tw-bg-rose-100 tw-text-rose-600' },
                  { name: '국산콩 두부', unit: '겸용', price: '990', oldPrice: '1,980', discount: '50%', limit: '1,000팩', badgeColor: 'tw-bg-orange-100 tw-text-orange-600' }
                ].map((item, idx) => (
                  <div key={idx} className="tw-bg-white tw-rounded-2xl tw-shadow-sm tw-border tw-border-gray-100 tw-overflow-hidden tw-flex tw-flex-col hover:tw-shadow-md tw-transition-shadow">
                    <div className="tw-relative tw-aspect-square tw-bg-gray-50 tw-flex tw-items-center tw-justify-center tw-w-full">
                      <span className="tw-text-gray-400 tw-text-xs tw-font-medium">{item.name.split(' ')[0]} 사진</span>
                      <div className={`tw-absolute tw-top-2.5 tw-left-2.5 tw-font-bold tw-text-[11px] tw-px-2 tw-py-1 tw-rounded-md ${item.badgeColor}`}>
                        {item.discount} 할인
                      </div>
                    </div>
                    <div className="tw-p-3.5 tw-flex tw-flex-col tw-flex-1">
                      <h3 className="tw-text-[14px] tw-font-bold tw-text-gray-800 tw-mb-2 tw-leading-snug">{item.name}<br/><span className="tw-text-[12px] tw-text-gray-400 tw-font-normal">({item.unit})</span></h3>
                      <div className="tw-mt-auto">
                        <span className="tw-text-[12px] tw-text-gray-400 tw-line-through tw-block tw-mb-0.5">{item.oldPrice}원</span>
                        <div className="tw-flex tw-items-baseline tw-gap-0.5 tw-mb-2.5">
                          <span className="tw-text-[20px] tw-font-extrabold tw-text-rose-500">{item.price}</span>
                          <span className="tw-text-[14px] tw-font-bold tw-text-rose-500">원</span>
                        </div>
                        <div className="tw-bg-gray-50 tw-text-gray-500 tw-text-[11px] tw-text-center tw-py-1.5 tw-rounded-lg tw-font-medium">한정수량 {item.limit}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 타임 세일 섹션 (파스텔 오렌지 톤 & 시간 명시) */}
            <section className="tw-mx-4 tw-mt-10 tw-mb-6 tw-bg-orange-50/80 tw-rounded-2xl tw-p-5 tw-border tw-border-orange-100 tw-shadow-sm">
              <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
                <div className="tw-flex tw-items-center tw-gap-2">
                  <div className="tw-bg-orange-200 tw-text-orange-600 tw-p-1.5 tw-rounded-full">
                    <Clock size={16} />
                  </div>
                  <h2 className="tw-text-[17px] tw-font-extrabold tw-text-gray-800">실시간 타임 세일</h2>
                </div>
                {/* 진행 시간 명시 */}
                <span className="tw-bg-white tw-text-orange-500 tw-border tw-border-orange-200 tw-text-[11px] tw-font-bold tw-px-2 tw-py-1 tw-rounded-md tw-shadow-sm">
                  14:00 ~ 18:00
                </span>
              </div>
              <div className="tw-bg-white tw-rounded-xl tw-p-3.5 tw-flex tw-items-center tw-gap-4 tw-shadow-sm tw-border tw-border-orange-50">
                 <div className="tw-w-20 tw-h-20 tw-bg-orange-50 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-shrink-0">
                    <span className="tw-text-orange-300 tw-text-[11px] tw-font-medium">수박 사진</span>
                 </div>
                 <div>
                   <span className="tw-bg-rose-100 tw-text-rose-600 tw-text-[10px] tw-font-bold tw-px-2 tw-py-0.5 tw-rounded-md tw-mb-1.5 tw-inline-block">70% 폭탄할인</span>
                   <h3 className="tw-text-[15px] tw-font-bold tw-mb-1 tw-text-gray-800">고창 흑수박 (7kg 이상)</h3>
                   <div className="tw-flex tw-items-baseline tw-gap-1">
                    <span className="tw-text-[20px] tw-font-extrabold tw-text-rose-500">8,900</span>
                    <span className="tw-text-[14px] tw-font-medium tw-text-rose-500">원</span>
                  </div>
                 </div>
              </div>
            </section>

            {/* 일반 행사 상품 리스트 */}
            <section className="tw-px-4 tw-mt-10">
              <div className="tw-flex tw-items-center tw-gap-2 tw-mb-4 tw-px-1">
                <ShoppingBag className="tw-text-gray-400" size={18} />
                <h2 className="tw-text-[17px] tw-font-extrabold tw-text-gray-800">금주 행사 상품 모아보기</h2>
              </div>
              <div className="tw-flex tw-flex-col tw-gap-3">
                {[
                  { name: '제주 노지 감귤', desc: '새콤달콤한 맛', price: '6,500', label: '과일' },
                  { name: '무항생제 동물복지 계란', desc: '30구 (대란)', price: '5,900', label: '신선' },
                  { name: '국내산 햇양파', desc: '1.5kg 망', price: '3,500', label: '채소' },
                  { name: '한돈 생 삼겹살', desc: '구이용 500g', price: '12,500', label: '정육' },
                ].map((item, idx) => (
                  <div key={idx} className="tw-bg-white tw-border tw-border-gray-100 tw-rounded-xl tw-p-3.5 tw-flex tw-items-center tw-gap-4 tw-shadow-sm">
                    <div className="tw-w-16 tw-h-16 tw-bg-gray-50 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-shrink-0">
                      <span className="tw-text-gray-400 tw-text-[10px]">{item.label}</span>
                    </div>
                    <div className="tw-flex-1">
                      <h3 className="tw-text-[14px] tw-font-bold tw-text-gray-800 tw-mb-0.5">{item.name}</h3>
                      <p className="tw-text-[12px] tw-text-gray-400 tw-mb-1.5">{item.desc}</p>
                      <span className="tw-text-[15px] tw-font-extrabold tw-text-gray-800">{item.price}<span className="tw-text-[12px] tw-font-medium">원</span></span>
                    </div>
                    <button className="tw-w-8 tw-h-8 tw-rounded-full tw-bg-gray-50 tw-flex tw-items-center tw-justify-center tw-text-gray-400 hover:tw-bg-rose-50 hover:tw-text-rose-400 tw-transition-colors">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ─── TAB 2: LOCATION ─── */}
        {activeTab === 'location' && (
          <div className="tw-animate-fade-in tw-px-5 tw-pt-10">
            <h2 className="tw-text-[24px] tw-font-extrabold tw-mb-8 tw-text-gray-800">찾아오시는 길</h2>
            
            <div className="tw-bg-white tw-rounded-2xl tw-p-6 tw-shadow-sm tw-border tw-border-rose-100 tw-mb-6">
              <div className="tw-flex tw-items-start tw-gap-4 tw-mb-6">
                <div className="tw-w-10 tw-h-10 tw-rounded-full tw-bg-rose-50 tw-flex tw-items-center tw-justify-center tw-shrink-0">
                  <MapPin className="tw-text-rose-500" size={20} />
                </div>
                <div className="tw-pt-1">
                  <p className="tw-text-[12px] tw-text-gray-400 tw-font-medium tw-mb-1">프레시마트 본점 주소</p>
                  <p className="tw-text-[16px] tw-font-bold tw-text-gray-800 tw-leading-relaxed">
                    서울특별시 강남구 봉은사로 304<br/>금강빌딩 14층 비즈톡(주)
                  </p>
                </div>
              </div>
              
              <div className="tw-h-px tw-bg-rose-50 tw-my-5"></div>
              
              <div className="tw-flex tw-items-start tw-gap-4">
                <div className="tw-w-10 tw-h-10 tw-rounded-full tw-bg-green-50 tw-flex tw-items-center tw-justify-center tw-shrink-0">
                  <Phone className="tw-text-green-500" size={20} />
                </div>
                <div className="tw-pt-1">
                  <p className="tw-text-[12px] tw-text-gray-400 tw-font-medium tw-mb-1">고객센터</p>
                  <p className="tw-text-[16px] tw-font-bold tw-text-gray-800">1588-0000</p>
                </div>
              </div>
            </div>

            <button className="tw-w-full tw-bg-[#03C75A] tw-text-white tw-font-bold tw-text-[16px] tw-py-4 tw-rounded-xl tw-flex tw-items-center tw-justify-center tw-gap-2 tw-shadow-sm hover:tw-bg-[#02b350] tw-transition-colors">
              <Map size={18} /> 네이버 지도로 열기
            </button>
          </div>
        )}

        {/* ─── TAB 3: COUPONS ─── */}
        {activeTab === 'coupons' && (
          <div className="tw-animate-fade-in tw-pt-10">
            <div className="tw-text-center tw-mb-8 tw-px-5">
              <h2 className="tw-text-[24px] tw-font-extrabold tw-text-gray-800 tw-mb-2">
                스페셜 할인 쿠폰
              </h2>
              <p className="tw-text-[14px] tw-text-gray-500 tw-font-medium">
                결제 시 매장 직원에게 화면을 보여주세요
              </p>
            </div>

            {/* 신규 가입 쿠폰 (파스텔 핑크 계열) */}
            <CouponTicket 
              title={<>신규 고객 환영<br/><span className="tw-text-rose-500">10,000원</span> 할인</>}
              subTitle="신규 가입 후 첫 구매 시 사용 가능"
              couponCode="FRESH-NEW-10000"
              bgColor1="#FFE4E6" // rose-100
              bgColor2="#FECDD3" // rose-200
            />

            {/* 기존 고객 쿠폰 (파스텔 블루 계열) */}
            <CouponTicket 
              title={<>단골 고객 감사<br/><span className="tw-text-blue-500">5,000원</span> 할인</>}
              subTitle="기존 가입 고객 대상 특별 할인"
              couponCode="FRESH-THX-5000"
              bgColor1="#E0F2FE" // sky-100
              bgColor2="#BAE6FD" // sky-200
            />

            {/* 무료 배송 쿠폰 (파스텔 옐로우/그린 계열) */}
            <CouponTicket 
              title={<>장바구니 든든<br/><span className="tw-text-green-600">무료 배송</span> 혜택</>}
              subTitle="20,000원 이상 구매 시 무료 배송"
              couponCode="FRESH-FREE-DELIV"
              bgColor1="#DCFCE7" // green-100
              bgColor2="#BBF7D0" // green-200
            />

            {/* 유의사항 (Notice) */}
            <div className="tw-mx-4 tw-mt-6 tw-mb-6 tw-bg-gray-50 tw-rounded-xl tw-p-5 tw-border tw-border-gray-100">
              <div className="tw-flex tw-items-center tw-gap-1.5 tw-mb-3">
                <AlertCircle size={16} className="tw-text-gray-500" />
                <span className="tw-font-bold tw-text-[13px] tw-text-gray-600">이벤트 유의사항</span>
              </div>
              <ul className="tw-text-[12px] tw-text-gray-500 tw-space-y-2 tw-leading-relaxed">
                <li className="tw-flex tw-gap-1.5"><span className="tw-text-gray-300">·</span> 쿠폰은 중복으로 수령하거나 사용할 수 없습니다.</li>
                <li className="tw-flex tw-gap-1.5"><span className="tw-text-gray-300">·</span> 신규 가입 쿠폰은 1개 아이디당 1회만 발급됩니다.</li>
                <li className="tw-flex tw-gap-1.5"><span className="tw-text-gray-300">·</span> 발급된 쿠폰은 결제 1건당 1번만 사용 가능합니다.</li>
                <li className="tw-flex tw-gap-1.5"><span className="tw-text-gray-300">·</span> 본 이벤트는 매장 사정에 따라 조기 마감될 수 있습니다.</li>
              </ul>
            </div>
          </div>
        )}
      </main>
      
      {/* Footer Banner (파스텔 톤에 맞춘 부드러운 하단 배너) */}
      <div className="tw-fixed tw-bottom-0 tw-left-0 tw-right-0 tw-bg-white tw-border-t tw-border-rose-100 tw-py-4 tw-px-4 tw-text-center tw-z-50 tw-max-w-md tw-mx-auto tw-shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
        <p className="tw-font-bold tw-text-[14px] tw-text-rose-500">놓치면 후회합니다! 이번 주 딱 7일간!</p>
      </div>
    </div>
  );
}
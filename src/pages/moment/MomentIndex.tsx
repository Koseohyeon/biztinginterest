
import Layout from "../../components/Layout";
import { useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import {
  ChevronLeft, ChevronRight, ChevronDown, Search, Menu, Zap, ImageIcon, BarChart3, ListOrdered
} from 'lucide-react';
interface PhoneMockupProps {
  children: ReactNode;
  label?: string;
  labelPosition?: string;
}

/** 공통 핸드폰 목업 */
const PhoneMockup = ({ children, label, labelPosition }: PhoneMockupProps) => {
  return (
    <div className="tw-relative tw-w-[300px] tw-aspect-[9/19] tw-bg-slate-900 tw-rounded-[3rem] tw-border-[8px] tw-border-slate-900 tw-shadow-2xl tw-overflow-hidden">

      <div className="tw-w-full tw-h-full tw-bg-[#8AA7C1] tw-flex tw-flex-col tw-relative">
        <div className="tw-h-12 tw-w-full tw-flex tw-items-center tw-justify-between tw-px-5 tw-border-b tw-border-slate-100/50">
          <ChevronLeft size={20} className="tw-text-slate-900" />

          {/* 중앙: 텍스트 및 전화번호 */}
          <div className="tw-flex tw-flex-col tw-items-center">
            <div className="tw-font-bold tw-text-sm tw-text-slate-900">비즈톡</div>
            <div className="tw-flex tw-items-center tw-gap-1 tw-text-xs tw-text-slate-600">
              1234-5678
              <ChevronDown size={12} className="tw-opacity-60" />
            </div>
          </div>
          <div className="tw-flex tw-items-center tw-gap-4">
            <Search size={20} className="tw-text-slate-900" />
            <Menu size={20} className="tw-text-slate-900" />
          </div>
        </div>
        <div className="tw-px-4 tw-h-full tw-overflow-y-auto">
          {children}
        </div>
      </div>

      {/* Label */}
      {label && (
        <div className={`tw-absolute ${labelPosition} tw-bg-white tw-px-4 tw-py-2 tw-rounded-full tw-shadow-md tw-text-sm tw-font-bold tw-z-30`}>
          {label}
        </div>
      )}
    </div>
  );
};

const MomentIndex = () => {
  const navigate = useNavigate();
  const goToMomentDescription = () => {
    navigate('/moment/description');
  };
  return (
    <Layout>

      {/* HERO */}
      <section className="tw-pt-32 tw-pb-40 tw-bg-gradient-to-br tw-from-white tw-to-blue-50 tw-px-6">
        <div className="tw-max-w-6xl tw-mx-auto tw-grid lg:tw-grid-cols-2 tw-gap-16 tw-items-center">

          {/* TEXT */}
          <div>
            <div className="tw-inline-flex tw-items-center tw-gap-2 tw-px-3 tw-py-1 tw-rounded-full tw-bg-blue-100 tw-text-blue-700 tw-text-sm tw-font-bold tw-mb-6">
              <Zap size={14} />
              카카오 광고 메시지 발송
            </div>

            <h1 className="tw-text-5xl md:tw-text-6xl tw-font-bold tw-leading-tight tw-mb-6 tw-text-slate-900">
              <span className="tw-text-blue-600">내 채널 친구에게</span> 카카오 광고 메시지를 보내보세요!
            </h1>

            <p className="tw-text-lg tw-text-slate-600 tw-mb-10 tw-leading-relaxed">
              문자 광고를 넘어 카카오 광고 메시지까지!
              비즈팅에서 한번에 해결하세요!
            </p>

            <div className="tw-flex tw-gap-4">
              <button onClick={goToMomentDescription}
                className="tw-border-0tw-px-8 tw-py-4 tw-bg-blue-600 tw-text-white tw-rounded-xl tw-font-bold tw-flex tw-items-center tw-gap-2 hover:tw-bg-blue-700">
                카카오 광고 메시지 보내기 <ChevronRight size={18} />
              </button>
              {/* 
              <button className="tw-px-8 tw-py-4 tw-bg-white tw-border tw-rounded-xl tw-font-bold tw-text-slate-700">
                상담 신청하기
              </button> */}
            </div>
          </div>

          {/* PHONE MOCKUPS */}
          <div className="tw-relative tw-flex tw-justify-center tw-gap-6">

            {/* TYPE 1 */}
            <PhoneMockup>
              <div className="tw-flex-1 tw-flex tw-items-center tw-justify-center tw-p-4">
                <div className="tw-w-full tw-bg-white tw-rounded-2xl tw-overflow-hidden">

                  <div className="tw-h-40 tw-bg-blue-400 tw-flex tw-flex-col tw-items-center tw-justify-center">
                    <span className="tw-text-4xl tw-text-white tw-font-bold">30%</span>
                    <span className="tw-text-white tw-font-semibold">SUMMER SALE</span>
                  </div>

                  <div className="tw-p-4">
                    <button className="tw-border-0 tw-w-full tw-py-2 tw-bg-slate-100 tw-rounded-lg tw-text-sm tw-font-bold">
                      쿠폰 다운받기
                    </button>
                  </div>
                </div>
              </div>
              <div className="tw-mt-4 tw-bg-white tw-rounded-full tw-px-3 tw-py-1 tw-inline-block tw-text-[10px] tw-font-bold tw-text-purple-600 tw-shadow-sm">
                Type 1: 와이드 이미지형
              </div>
            </PhoneMockup>

            {/* TYPE 2 */}
            <PhoneMockup>
              <div className="tw-flex-1 tw-overflow-hidden tw-p-4 tw-mt-2">
                <div className="tw-bg-white tw-rounded-2xl tw-shadow-md tw-overflow-hidden">

                  {/* 인사 */}
                  <div className="tw-text-center tw-text-sm tw-font-semibold tw-py-3">
                    회원님, 안녕하세요!
                  </div>
                  <div className="tw-px-3">
                    <div className="tw-w-full tw-h-28 tw-bg-blue-400 tw-rounded-xl tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-white">
                      <div className="tw-text-3xl">🛍️</div>
                      <div className="tw-text-xs tw-font-semibold tw-mt-1 tw-text-center">
                        장바구니에 담겨진 상품이<br />
                        구매를 기다리고 있어요!
                      </div>
                    </div>
                  </div>

                  <div className="tw-p-3 tw-space-y-3">

                    {[
                      { text: "최근 장바구니 상품", icon: "👜" },
                      { text: "장바구니 연관 상품", icon: "🎒" },
                      { text: "신상 아우터 할인", icon: "🧥" }
                    ].map((item, i) => (
                      <div key={i} className="tw-flex tw-items-center tw-gap-3">

                        <div className="tw-w-12 tw-h-12 tw-rounded-md tw-bg-gray-100 tw-flex tw-items-center tw-justify-center">
                          <span className="tw-text-xl">{item.icon}</span>
                        </div>

                        <div className="tw-text-xs">
                          {item.text}
                        </div>

                      </div>
                    ))}

                  </div>

                  {/* 버튼 */}
                  <div className="tw-p-3">
                    <button className="tw-border-0 tw-w-full tw-bg-gray-100 tw-text-sm tw-font-semibold tw-py-2 tw-rounded-lg">
                      상품 더 보기
                    </button>
                  </div>

                </div>

                {/* 라벨 */}
                <div className="tw-mt-4 tw-bg-white tw-rounded-full tw-px-3 tw-py-1 tw-inline-block tw-text-[10px] tw-font-bold tw-text-purple-600 tw-shadow-sm">
                  Type 2: 와이드 리스트형
                </div>
              </div>
            </PhoneMockup>

          </div>
        </div>
      </section>

      <section className="tw-py-24 tw-bg-slate-50">
        <div className="tw-max-w-6xl tw-mx-auto tw-px-6">
          <div className="tw-text-center tw-mb-16">
            <h2 className="tw-text-blue-600 tw-font-bold tw-mb-3 tw-text-lg">Kakao Moment</h2>
            <p className="tw-text-4xl tw-font-black tw-text-slate-900 tw-tracking-tight">
              우리나라의 약 98.9%가 사용하는 카카오톡으로 광고메시지 보내기
            </p>
            <p className="tw-mt-5 tw-text-slate-700 tw-text-lg tw-font-medium">
              카카오 모먼트 연동으로 비즈팅에서 보다 더 쉽게 카카오 광고메시지를 보내보세요!
            </p>
          </div>

          <div className="tw-grid md:tw-grid-cols-3 tw-gap-8">
            <div className="tw-bg-white tw-rounded-[32px] tw-p-8 tw-border tw-border-slate-200 tw-shadow-sm hover:tw-shadow-xl tw-transition-all">
              <div className="tw-w-12 tw-h-12 tw-bg-blue-600 tw-rounded-xl tw-flex tw-items-center tw-justify-center tw-mb-6">
                <ImageIcon className="tw-text-white" size={24} />
              </div>
              <h3 className="tw-text-2xl tw-font-bold tw-text-slate-900 tw-mb-4">와이드 이미지형</h3>
              <p className="tw-text-slate-600 tw-leading-relaxed tw-mb-8 tw-font-medium">
                신상품 출시나 프로모션 알림에 탁월합니다. 큰 사이즈의 이미지를 활용해 주목도 높은 메시지를 구성할 수 있습니다.
              </p>
              <div className="tw-relative tw-rounded-2xl tw-overflow-hidden tw-border tw-border-slate-100 tw-aspect-video tw-bg-slate-900">
                <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-black/80 tw-via-transparent tw-to-transparent tw-p-5 tw-flex tw-flex-col tw-justify-end">
                  <span className="tw-absolute tw-top-3 tw-right-3 tw-bg-black/40 tw-text-white tw-text-[10px] tw-px-2 tw-py-0.5 tw-rounded tw-backdrop-blur-sm">AD</span>
                  <p className="tw-text-white tw-font-bold tw-text-lg tw-mb-1">26년 전용 프로모션 특가 </p>
                  <div className="tw-flex tw-justify-between tw-items-center">
                    <p className="tw-text-blue-300 tw-text-sm">신상품 최대 50% 단독특가</p>
                    <span className="tw-bg-white tw-text-black tw-text-[10px] tw-font-bold tw-px-3 tw-py-1 tw-rounded-full">지금 확인</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="tw-bg-white tw-rounded-[32px] tw-p-8 tw-border tw-border-slate-200 tw-shadow-sm hover:tw-shadow-xl tw-transition-all">
              <div className="tw-w-12 tw-h-12 tw-bg-purple-600 tw-rounded-xl tw-flex tw-items-center tw-justify-center tw-mb-6">
                <ListOrdered className="tw-text-white" size={24} />
              </div>
              <h3 className="tw-text-2xl tw-font-bold tw-text-slate-900 tw-mb-4">와이드 리스트형</h3>
              <p className="tw-text-slate-600 tw-leading-relaxed tw-mb-8 tw-font-medium">
                다양한 주제의 메시지를 리스트 유형으로 구성해보세요. 유저가 필요한 정보를 직접 선택하여 탐색할 수 있습니다.
              </p>
              <div className="tw-space-y-3 tw-p-4 tw-bg-slate-50 tw-rounded-2xl tw-border tw-border-slate-200">
                {[
                  { n: "1", t: "이번 주 가장 사랑받은 신상", c: "트렌드 리포트" },
                  { n: "2", t: "MD가 직접 고른 린넨 셔츠", c: "단독 20% 할인" },
                  { n: "3", t: "당첨자 발표: 리뷰 이벤트", c: "지금 확인하기" }
                ].map((item, i) => (
                  <div key={i} className="tw-flex tw-items-center tw-gap-3 tw-bg-white tw-p-3 tw-rounded-xl tw-shadow-sm tw-border tw-border-slate-100">
                    <span className="tw-text-slate-900 tw-font-black tw-text-lg">{item.n}.</span>
                    <div className="tw-flex-1">
                      <p className="tw-text-slate-900 tw-text-xs tw-font-bold tw-mb-0.5">{item.t}</p>
                      <p className="tw-text-slate-500 tw-text-[10px]">{item.c}</p>
                    </div>
                    <ChevronRight size={14} className="tw-text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
            <div className="tw-bg-[#1e293b] tw-rounded-[32px] tw-p-8 tw-shadow-2xl tw-relative tw-overflow-hidden">
              <div className="tw-w-12 tw-h-12 tw-bg-blue-500 tw-rounded-xl tw-flex tw-items-center tw-justify-center tw-mb-6">
                <BarChart3 className="tw-text-white" size={24} />
              </div>
              <h3 className="tw-text-2xl tw-font-bold tw-text-white tw-mb-4">카카오 모먼트 성과분석</h3>
              <p className="tw-text-slate-300 tw-leading-relaxed tw-mb-8 tw-font-medium">
                메시지 발송 결과는 데이터로 받아보세요.
                읽음부터 클릭까지 총 4개의 지표에 대해서 확인 가능합니다.
              </p>
              <div className="tw-bg-[#1e293b] tw-rounded-[32px] tw-p-8 tw-shadow-2xl tw-relative tw-overflow-hidden">
                {/* 통계 위젯 영역 */}
                <div className="tw-bg-white/5 tw-backdrop-blur-sm tw-border tw-border-white/10 tw-rounded-2xl tw-p-6 tw-space-y-6">
                  {/* 1. 발송수 ) */}
                  <div className="tw-space-y-2">
                    <div className="tw-flex tw-justify-between tw-items-end">
                      <p className="tw-text-slate-400 tw-text-xs font-bold">발송수</p>
                      <p className="tw-text-xl tw-font-black tw-text-white">1,240<span className="tw-text-[10px] tw-ml-1 tw-text-slate-500 tw-font-normal">건</span></p>
                    </div>
                    <div className="tw-w-full tw-h-1.5 tw-bg-white/5 tw-rounded-full tw-overflow-hidden">
                      <div className="tw-w-full tw-h-full tw-bg-gradient-to-r tw-from-blue-600 tw-to-blue-400 tw-rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)]" />
                    </div>
                  </div>

                  {/* 2. 열람수 */}
                  <div className="tw-space-y-2">
                    <div className="tw-flex tw-justify-between tw-items-end">
                      <p className="tw-text-slate-400 tw-text-xs font-bold">열람수</p>
                      <p className="tw-text-xl tw-font-black tw-text-blue-400">600</p>
                    </div>
                    <div className="tw-w-full tw-h-1.5 tw-bg-white/10 tw-rounded-full overflow-hidden">
                      <div className="tw-w-[48%] tw-h-full tw-bg-blue-500 tw-rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                    </div>
                  </div>

                  {/* 3. 전체 클릭수 */}
                  <div className="tw-space-y-2">
                    <div className="tw-flex tw-justify-between tw-items-end">
                      <p className="tw-text-slate-400 tw-text-xs font-bold">전체 클릭수</p>
                      <p className="tw-text-xl tw-font-black tw-text-emerald-400">342</p>
                    </div>
                    <div className="tw-w-full tw-h-1.5 tw-bg-white/10 tw-rounded-full overflow-hidden">
                      <div className="tw-w-[28%] tw-h-full tw-bg-emerald-400 tw-rounded-full shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                    </div>
                  </div>

                  {/* 4. 발송 실패수 */}
                  <div className="tw-space-y-2">
                    <div className="tw-flex tw-justify-between tw-items-end">
                      <p className="tw-text-slate-400 tw-text-xs font-bold">발송 실패수</p>
                      <p className="tw-text-xl tw-font-black tw-text-rose-400">5</p>
                    </div>
                    <div className="tw-w-full tw-h-1.5 tw-bg-white/10 tw-rounded-full overflow-hidden">
                      <div className="tw-w-[2%] tw-h-full tw-bg-rose-400 tw-rounded-full" />
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="tw-py-32 tw-bg-white tw-text-center">
        <div className="tw-max-w-3xl tw-mx-auto tw-px-6">
          <h2 className="tw-text-3xl md:tw-text-4xl tw-font-black tw-mb-6 tw-text-slate-900 tw-leading-tight">
            일반 메시지부터 카카오 광고까지, <br />
            <span className="tw-text-blue-600">비즈팅 원-플랫폼(One-platform)</span>으로 통합 관리하세요.
          </h2>

          <p className="tw-text-slate-700 tw-text-lg tw-mb-10 tw-leading-relaxed tw-font-medium">
            여러 곳을 거칠 필요 없이 비즈팅 하나로 발송부터 성과 분석까지 한번에! <br className="tw-hidden md:tw-block" />
            <span className="tw-text-blue-600 tw-font-bold">비즈팅</span>에서 바로 시작해보세요
          </p>

          <div className="tw-flex tw-flex-col sm:tw-flex-row tw-gap-4 tw-justify-center">
            <button onClick={goToMomentDescription}
              className="tw-border-0 tw-bg-blue-600 tw-text-white tw-px-10 tw-py-4 tw-rounded-xl tw-text-lg tw-font-bold hover:tw-bg-blue-700 tw-transition-all tw-shadow-xl tw-shadow-blue-200 ">
              카카오 광고 메시지 보내기
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MomentIndex;
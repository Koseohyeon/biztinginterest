/**
 * tailwind.config.ts 에 아래 설정을 병합해야 클래스가 정상 동작합니다.
 *
 * export default {
 *   prefix: 'tw-',
 *   theme: {
 *     extend: {
 *       colors: {
 *         brand: {
 *           50: '#f0f5ff',
 *           100: '#e5edff',
 *           200: '#cddbfe',
 *           300: '#b4c6fc',
 *           400: '#8da2fb',
 *           500: '#4361ee',
 *           600: '#2f49d1',
 *           700: '#2338a8',
 *           800: '#1b2c86',
 *           900: '#152269',
 *         },
 *         kakao: '#FEE500',
 *         skt: '#004fe5',
 *         kb: '#6d5a49',
 *         cj: '#22553b',
 *         lpoint: '#00a3e0',
 *       },
 *       fontFamily: {
 *         sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
 *       },
 *       boxShadow: {
 *         'soft-card': '0 20px 40px -15px rgba(67, 97, 238, 0.08), 0 0 1px 1px rgba(67, 97, 238, 0.05)',
 *         'glow-blue': '0 0 35px -5px rgba(67, 97, 238, 0.35)',
 *         'float-node': '0 12px 28px rgba(35, 56, 168, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04)',
 *       },
 *     },
 *   },
 *   plugins: [require('@tailwindcss/forms'), require('@tailwindcss/container-queries')],
 * };
 */

const customStyles = `
  .bg-grid-pattern {
    background-size: 32px 32px;
    background-image:
      linear-gradient(to right, rgba(67, 97, 238, 0.06) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(67, 97, 238, 0.06) 1px, transparent 1px);
  }

  .radial-gradient-mesh {
    background: radial-gradient(circle at 65% 25%, rgba(67, 97, 238, 0.09) 0%, rgba(229, 237, 255, 0.4) 40%, rgba(255, 255, 255, 0.95) 85%);
  }

  @keyframes pulse-ring {
    0% { transform: scale(0.95); opacity: 0.8; }
    50% { transform: scale(1.08); opacity: 0.3; }
    100% { transform: scale(0.95); opacity: 0.8; }
  }
  .pulse-ring-anim {
    animation: pulse-ring 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes dash {
    to { stroke-dashoffset: -40; }
  }
  .flow-line {
    stroke-dasharray: 6, 6;
    animation: dash 2.5s linear infinite;
  }
`;

export default function BiztingLanding() {
  return (
    <div className="tw-bg-[#F8FAFD] tw-text-slate-800 tw-font-sans tw-antialiased tw-overflow-x-hidden tw-relative selection:tw-bg-brand-100 selection:tw-text-brand-700">
      <style>{customStyles}</style>

      {/* BEGIN: Hero & Main Visualization Section */}
      <section className="tw-relative tw-min-h-[920px] tw-w-full tw-pt-12 tw-pb-24 tw-px-6 md:tw-px-12 lg:tw-px-20 bg-grid-pattern radial-gradient-mesh tw-border-b tw-border-brand-100/60" data-purpose="hero-overview">
        <div className="tw-max-w-[1480px] tw-mx-auto tw-grid tw-grid-cols-1 xl:tw-grid-cols-12 tw-gap-12 lg:tw-gap-16 tw-items-center">
          {/* BEGIN: Left Content Block */}
          <div className="xl:tw-col-span-5 tw-flex tw-flex-col tw-justify-center tw-space-y-7 tw-z-10" data-purpose="hero-text-content">
            {/* Breadcrumb / Category Tag */}
            <div className="tw-flex tw-items-center tw-space-x-2 tw-text-xs tw-font-semibold tw-text-brand-600 tw-tracking-wider">
              <span className="hover:tw-text-brand-700 tw-transition tw-cursor-pointer">서비스</span>
              <span className="tw-text-slate-300">—</span>
              <span className="tw-bg-brand-50 tw-px-2.5 tw-py-1 tw-rounded-full tw-text-brand-700 tw-font-medium">비즈팅</span>
            </div>
            {/* Brand Identity Logo & Name */}
            <div className="tw-flex tw-items-center tw-space-x-3.5">
              <div className="tw-w-12 tw-h-12 tw-bg-gradient-to-tr tw-from-brand-600 tw-to-brand-500 tw-rounded-2xl tw-flex tw-items-center tw-justify-center tw-shadow-lg tw-shadow-brand-500/25 tw-text-white">
                {/* Speech Bubble Icon matching reference design */}
                <svg className="tw-w-7 tw-h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3 9H7V9h10v2zm-4 4H7v-2h6v2zm4-8H7V5h10v2z"></path>
                </svg>
              </div>
              <div>
                <span className="tw-text-3xl lg:tw-text-4xl tw-font-black tw-tracking-tight tw-text-slate-900 tw-block tw-leading-tight">비즈팅</span>
              </div>
            </div>
            {/* Subheading Tag */}
            <div className="tw-flex tw-items-center tw-space-x-2">
              <span className="tw-h-1 tw-w-6 tw-bg-brand-600 tw-rounded-full tw-inline-block"></span>
              <p className="tw-text-xs lg:tw-text-sm tw-font-bold tw-tracking-widest tw-text-brand-600 tw-uppercase">빅데이터 기반 타겟 광고 서비스</p>
            </div>
            {/* Main Headlines */}
            <div className="tw-space-y-4">
              <h1 className="tw-text-3xl sm:tw-text-4xl lg:tw-text-[42px] tw-font-extrabold tw-text-slate-950 tw-leading-[1.28] tw-tracking-tight">
                잠재고객을 찾고,<br />
                <span className="tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-brand-600 tw-to-indigo-600">관심고객과 연결</span>합니다.
              </h1>
              <p className="tw-text-sm sm:tw-text-base tw-text-slate-600 tw-font-normal tw-leading-relaxed tw-max-w-lg">
                각 매체사별 특성을 극대화한 <strong className="tw-text-slate-800 tw-font-semibold">신개념 빅데이터 타겟마케팅</strong>.<br />
                자체 고객 DB가 없어도 통신사·카드사·캌오의 실시간 행동·위치·결제 데이터를 활용해 가장 반응 확률이 높은 고관여 고객에게<br />직접 도달합니다.
              </p>
            </div>
            {/* CTA Button Group */}
            <div className="tw-pt-2 tw-flex tw-items-center tw-space-x-4">
              <a className="tw-group tw-inline-flex tw-items-center tw-justify-center tw-px-7 tw-py-3.5 tw-text-sm sm:tw-text-base tw-font-semibold tw-text-white tw-bg-brand-600 hover:tw-bg-brand-700 tw-rounded-xl tw-shadow-lg tw-shadow-brand-500/30 hover:tw-shadow-brand-500/50 hover:-tw-translate-y-0.5 tw-transition-all tw-duration-200 tw-no-underline" href="#inquiry">
                <span>도입 문의</span>
                <svg className="tw-w-4 tw-h-4 tw-ml-2.5 tw-transition-transform group-hover:tw-translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </a>
            </div>
          </div>
          {/* END: Left Content Block */}

          {/* BEGIN: Right Core Visual Infographic Diagram */}
          <div className="xl:tw-col-span-7 tw-relative tw-w-full" data-purpose="infographic-diagram-canvas">
            <div className="tw-relative tw-bg-white/95 tw-backdrop-blur-md tw-rounded-3xl tw-p-6 sm:tw-p-8 tw-border tw-border-white tw-shadow-soft-card tw-overflow-hidden">
              <div className="tw-absolute tw-inset-0 bg-grid-pattern tw-opacity-30 tw-pointer-events-none"></div>
              <div className="tw-absolute -tw-right-20 -tw-top-20 tw-w-72 tw-h-72 tw-bg-brand-200/30 tw-rounded-full tw-blur-3xl tw-pointer-events-none"></div>
              <div className="tw-absolute -tw-left-20 -tw-bottom-20 tw-w-72 tw-h-72 tw-bg-blue-100/40 tw-rounded-full tw-blur-3xl tw-pointer-events-none"></div>
              <div className="tw-relative tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-3 tw-mb-6 tw-pb-4 tw-border-b tw-border-slate-100">
                <div className="tw-flex tw-items-center tw-space-x-2.5">
                  <span className="tw-flex tw-h-2.5 tw-w-2.5 tw-relative">
                    <span className="tw-animate-ping tw-absolute tw-inline-flex tw-h-full tw-w-full tw-rounded-full tw-bg-brand-400 tw-opacity-75"></span>
                    <span className="tw-relative tw-inline-flex tw-rounded-full tw-h-2.5 tw-w-2.5 tw-bg-brand-600"></span>
                  </span>
                  <span className="tw-text-xs sm:tw-text-sm tw-font-bold tw-text-slate-800 tw-tracking-wide">빅데이터 기반 정밀 타겟 추출 프로세스</span>
                </div>
                <span className="tw-text-xs tw-font-bold tw-bg-brand-50 tw-text-brand-700 tw-px-3 tw-py-1 tw-rounded-full tw-border tw-border-brand-200/60 tw-flex tw-items-center tw-gap-1.5">
                  <svg className="tw-w-3.5 tw-h-3.5 tw-text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd"></path>
                  </svg>
                  자사 DB 없이 고관여 고객군 선별 가능
                </span>
              </div>
              <div className="tw-relative tw-grid tw-grid-cols-1 md:tw-grid-cols-12 tw-gap-8 tw-items-center tw-py-4">
                <div className="md:tw-col-span-7 tw-flex tw-flex-col tw-space-y-3 tw-z-10">
                  <div className="tw-flex tw-items-center tw-justify-between tw-mb-1">
                    <span className="tw-text-xs tw-font-extrabold tw-text-brand-600 tw-uppercase tw-tracking-wider tw-flex tw-items-center tw-gap-1.5">
                      <span className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-brand-600"></span>&nbsp;1. 매체사별 빅데이터 특성
                    </span>
                  </div>
                  <div className="tw-space-y-2.5">
                    <div className="tw-p-3 tw-bg-[#FBFDFF] tw-rounded-xl tw-border tw-border-blue-100 hover:tw-border-brand-400 hover:tw-shadow-xs tw-transition-all tw-flex tw-items-center tw-gap-3">
                      <div className="tw-w-8 tw-h-8 tw-rounded-lg tw-bg-[#FEE500] tw-flex tw-items-center tw-justify-center tw-font-bold tw-text-xs tw-text-slate-900 tw-flex-shrink-0 tw-shadow-xs">
                        <svg className="tw-w-4 tw-h-4 tw-fill-current" viewBox="0 0 24 24">
                          <path d="M12 3c-5.52 0-10 3.58-10 8 0 2.82 1.84 5.3 4.64 6.72l-1.18 4.35c-.1.38.33.68.66.47l5.12-3.41c.25.02.5.03.76.03 5.52 0 10-3.58 10-8s-4.48-8-10-8z"></path>
                        </svg>
                      </div>
                      <div className="tw-min-w-0 tw-flex-1">
                        <div className="tw-flex tw-items-center tw-justify-between">
                          <span className="tw-text-xs tw-font-bold tw-text-slate-900">카카오</span>
                          <span className="tw-text-[10px] tw-px-2 tw-py-0.5 tw-bg-amber-50 tw-text-amber-700 tw-rounded-full tw-font-semibold tw-border tw-border-amber-100">AI 관심·행동</span>
                        </div>
                        <p className="tw-text-[11px] tw-text-slate-500 tw-truncate tw-mt-0.5">쇼핑·선물하기 등 카카오 생태계 기반 고객군 타겟팅 가능</p>
                      </div>
                    </div>
                    <div className="tw-p-3 tw-bg-[#FBFDFF] tw-rounded-xl tw-border tw-border-blue-100 hover:tw-border-brand-400 hover:tw-shadow-xs tw-transition-all tw-flex tw-items-center tw-gap-3">
                      <div className="tw-w-8 tw-h-8 tw-rounded-lg tw-bg-[#004fe5] tw-flex tw-items-center tw-justify-center tw-font-black tw-text-xs tw-text-white tw-flex-shrink-0 tw-shadow-xs">T</div>
                      <div className="tw-min-w-0 tw-flex-1">
                        <div className="tw-flex tw-items-center tw-justify-between">
                          <span className="tw-text-xs tw-font-bold tw-text-slate-900">SK텔레콤</span>
                          <span className="tw-text-[10px] tw-px-2 tw-py-0.5 tw-bg-blue-50 tw-text-brand-700 tw-rounded-full tw-font-semibold tw-border tw-border-blue-100">단말기 기반</span>
                        </div>
                        <p className="tw-text-[11px] tw-text-slate-500 tw-truncate tw-mt-0.5">실시간체류, 웹앱, 통화, 관심사 기반 정밀 타겟팅 가능</p>
                      </div>
                    </div>
                    <div className="tw-p-3 tw-bg-[#FBFDFF] tw-rounded-xl tw-border tw-border-blue-100 hover:tw-border-brand-400 hover:tw-shadow-xs tw-transition-all tw-flex tw-items-center tw-gap-3">
                      <div className="tw-w-8 tw-h-8 tw-rounded-lg tw-bg-[#6d5a49] tw-flex tw-items-center tw-justify-center tw-font-bold tw-text-xs tw-text-amber-200 tw-flex-shrink-0 tw-shadow-xs">KB</div>
                      <div className="tw-min-w-0 tw-flex-1">
                        <div className="tw-flex tw-items-center tw-justify-between">
                          <span className="tw-text-xs tw-font-bold tw-text-slate-900">KB국민카드</span>
                          <span className="tw-text-[10px] tw-px-2 tw-py-0.5 tw-bg-amber-50 tw-text-amber-700 tw-rounded-full tw-font-semibold tw-border tw-border-amber-100">결제 이력</span>
                        </div>
                        <p className="tw-text-[11px] tw-text-slate-500 tw-truncate tw-mt-0.5">카드, 브랜드, 상품 결재 기반 타겟팅 가능</p>
                      </div>
                    </div>
                    <div className="tw-p-3 tw-bg-[#FBFDFF] tw-rounded-xl tw-border tw-border-blue-100 hover:tw-border-brand-400 hover:tw-shadow-xs tw-transition-all tw-flex tw-items-center tw-gap-3">
                      <div className="tw-w-8 tw-h-8 tw-rounded-lg tw-bg-emerald-600 tw-flex tw-items-center tw-justify-center tw-font-bold tw-text-xs tw-text-white tw-flex-shrink-0 tw-shadow-xs">CJ</div>
                      <div className="tw-min-w-0 tw-flex-1">
                        <div className="tw-flex tw-items-center tw-justify-between">
                          <span className="tw-text-xs tw-font-bold tw-text-slate-900">CJ ONE</span>
                          <span className="tw-text-[10px] tw-px-2 tw-py-0.5 tw-bg-emerald-50 tw-text-emerald-700 tw-rounded-full tw-font-semibold tw-border tw-border-emerald-100">라이프스타일 소비</span>
                        </div>
                        <p className="tw-text-[11px] tw-text-slate-500 tw-truncate tw-mt-0.5">맴버십, 관심사, 소비정보, 구매이력 기반 타겟팅 가능</p>
                      </div>
                    </div>
                    <div className="tw-p-3 tw-bg-[#FBFDFF] tw-rounded-xl tw-border tw-border-blue-100 hover:tw-border-brand-400 hover:tw-shadow-xs tw-transition-all tw-flex tw-items-center tw-gap-3">
                      <div className="tw-w-8 tw-h-8 tw-rounded-lg tw-bg-sky-500 tw-flex tw-items-center tw-justify-center tw-font-bold tw-text-xs tw-text-white tw-flex-shrink-0 tw-shadow-xs">L</div>
                      <div className="tw-min-w-0 tw-flex-1">
                        <div className="tw-flex tw-items-center tw-justify-between">
                          <span className="tw-text-xs tw-font-bold tw-text-slate-900">L.POINT</span>
                          <span className="tw-text-[10px] tw-px-2 tw-py-0.5 tw-bg-blue-50 tw-text-sky-700 tw-rounded-full tw-font-semibold tw-border tw-border-blue-100">라이프 스타일 소비</span>
                        </div>
                        <p className="tw-text-[11px] tw-text-slate-500 tw-truncate tw-mt-0.5">맴버십, 관심사, 소비정보, 구매이력 기반 타겟팅 가능</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:tw-col-span-5 tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-center tw-relative tw-py-4 tw-z-20">
                  <div className="tw-text-xs tw-font-extrabold tw-text-brand-600 tw-uppercase tw-tracking-wider tw-mb-4 tw-flex tw-items-center tw-gap-1.5">
                    <span className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-brand-600"></span>2. 정밀 타겟 추출
                  </div>
                  <div className="tw-relative tw-flex tw-items-center tw-justify-center tw-my-3">
                    <div className="tw-absolute tw-w-36 tw-h-36 tw-rounded-full tw-border-2 tw-border-dashed tw-border-brand-300 tw-animate-spin" style={{ animationDuration: '25s' }}></div>
                    <div className="tw-absolute tw-w-28 tw-h-28 tw-rounded-full tw-bg-brand-500/15 pulse-ring-anim tw-pointer-events-none"></div>
                    <div className="tw-relative tw-w-24 tw-h-24 tw-rounded-full tw-bg-gradient-to-tr tw-from-brand-700 tw-via-brand-600 tw-to-indigo-600 tw-p-0.5 tw-shadow-xl tw-flex tw-items-center tw-justify-center tw-text-white">
                      <div className="tw-w-full tw-h-full tw-rounded-full tw-bg-slate-900/40 tw-backdrop-blur-xs tw-flex tw-flex-col tw-items-center tw-justify-center tw-p-2">
                        <svg className="tw-w-9 tw-h-9 tw-text-white tw-drop-shadow" fill="currentColor" viewBox="0 0 20 20">
                          <path clipRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" fillRule="evenodd"></path>
                        </svg>
                        <span className="tw-text-[10px] tw-font-extrabold tw-text-brand-200 tw-mt-1 tw-tracking-tight">고객</span>
                      </div>
                    </div>
                    <div className="tw-absolute -tw-top-1 -tw-right-1 tw-bg-emerald-500 tw-text-white tw-text-[10px] tw-font-black tw-w-6 tw-h-6 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-shadow-md tw-border tw-border-white">✓</div>
                  </div>
                  <div className="tw-mt-4 tw-max-w-[210px]">
                    <span className="tw-inline-block tw-text-xs tw-font-extrabold tw-text-slate-900 tw-bg-brand-50 tw-px-3 tw-py-1.5 tw-rounded-full tw-border tw-border-brand-200">고관여 정밀 타겟 고객</span>
                    <p className="tw-text-xs tw-text-slate-500 tw-mt-2 tw-leading-relaxed tw-font-medium">각 채널 별<br />반응 극대화 고객 추출</p>
                  </div>
                </div>
              </div>
              <div className="tw-mt-4 tw-pt-4 tw-border-t tw-border-slate-100 tw-flex tw-items-center tw-justify-between tw-text-xs tw-text-slate-500 tw-font-medium tw-px-2"></div>
            </div>
          </div>
          {/* END: Right Core Visual Infographic Diagram */}
        </div>
      </section>

      <section className="tw-py-16 tw-px-6 md:tw-px-12 lg:tw-px-20 tw-bg-slate-50 tw-border-b tw-border-brand-100/60 tw-relative tw-overflow-hidden" data-purpose="step3-channel-dispatch">
        <div className="tw-max-w-[1480px] tw-mx-auto">
          <div className="tw-flex tw-flex-col lg:tw-flex-row lg:tw-items-end tw-justify-between tw-mb-10 tw-pb-4 tw-border-b tw-border-slate-200/80">
            <div className="tw-space-y-2">
              <div className="tw-inline-flex tw-items-center tw-space-x-2">
                <span className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-brand-600"></span>
                <span className="tw-text-xs tw-font-extrabold tw-tracking-widest tw-text-brand-600 tw-uppercase">3. 공식 인증 채널 발송 &amp; 성과 검증</span>
              </div>
              <h2 className="tw-text-2xl sm:tw-text-3xl tw-font-extrabold tw-text-slate-950 tw-tracking-tight">검증된 공식 발신망으로 고객 신뢰와 반응률을 동시에 확보합니다</h2>
            </div>
            <div className="tw-flex tw-items-center tw-gap-3 tw-mt-4 lg:tw-mt-0">
              <span className="tw-text-xs tw-font-bold tw-text-slate-600 tw-bg-white tw-px-3 tw-py-1.5 tw-rounded-full tw-border tw-border-slate-200 tw-shadow-xs tw-flex tw-items-center tw-gap-1.5">
                <span className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-emerald-500"></span>100% 공식&nbsp; 채널 발신
              </span>
            </div>
          </div>
          <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-3 tw-gap-6 tw-items-stretch">
            <div className="tw-bg-white tw-rounded-2xl tw-border tw-border-slate-200/80 tw-shadow-md tw-p-5 tw-flex tw-flex-col tw-justify-between hover:tw-border-brand-300 tw-transition-all tw-h-full">
              <div className="tw-bg-[#ABC1D1]/25 tw-p-3 tw-rounded-xl tw-border tw-border-slate-200/60 tw-mb-3">
                <div className="tw-flex tw-items-center tw-justify-between tw-pb-2 tw-mb-2 tw-border-b tw-border-slate-200/60">
                  <div className="tw-flex tw-items-center tw-gap-2">
                    <div className="tw-w-7 tw-h-7 tw-rounded-full tw-bg-[#FEE500] tw-flex tw-items-center tw-justify-center tw-text-xs tw-font-black tw-text-slate-900 tw-shadow-xs">K</div>
                    <div>
                      <div className="tw-text-xs tw-font-bold tw-text-slate-900 tw-flex tw-items-center tw-gap-1">카카오 브랜드픽 <span className="tw-w-3.5 tw-h-3.5 tw-bg-brand-600 tw-text-white tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-[8px] tw-font-black">✓</span></div>
                      <span className="tw-text-[9px] tw-text-slate-500 tw-font-medium">카카오 브랜드픽 채널 발송</span>
                    </div>
                  </div>
                  <span className="tw-text-[10px] tw-text-slate-400">오전 10:24</span>
                </div>
                <div className="tw-bg-white tw-rounded-xl tw-p-3 tw-border tw-border-slate-100 tw-shadow-xs tw-space-y-2">
                  <div className="tw-flex tw-items-center tw-justify-between">
                    <span className="tw-text-[9px] tw-text-slate-400 tw-font-medium">광고</span>
                  </div>
                  <div>
                    <p className="tw-text-xs tw-font-bold tw-text-slate-900 tw-leading-snug">(광고) OO상품 특별 할인 안내</p>
                    <p className="tw-text-[10px] tw-text-slate-500 tw-mt-0.5 tw-leading-normal">오직 이 메시지를 받으신 고객님께만 혜택을 드려요.</p>
                  </div>
                  <button className="tw-w-full tw-py-2 tw-bg-[#FEE500] hover:tw-bg-[#FDD835] tw-text-slate-900 tw-font-bold tw-text-xs tw-rounded-lg tw-shadow-xs tw-transition tw-flex tw-items-center tw-justify-center tw-gap-1.5" type="button">30%할인 쿠폰 받기</button>
                </div>
              </div>
              <div className="tw-space-y-1.5 tw-pt-2 tw-border-t tw-border-slate-100">
                <div className="tw-flex tw-items-center tw-justify-between tw-text-xs tw-font-medium">
                  <span className="tw-text-slate-600 tw-flex tw-items-center tw-gap-1.5"><span className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-[#FEE500]"></span>카카오톡 브랜드픽 채널</span>
                  <span className="tw-font-bold tw-text-brand-700">약 344만 채널 친구</span>
                </div>
                <p className="tw-text-[11px] tw-text-slate-500">채널 친구가 없어도 카카오 브랜드픽 채널 친구에게 발송</p>
              </div>
            </div>
            <div className="tw-bg-white tw-rounded-2xl tw-border tw-border-slate-200/80 tw-shadow-md tw-p-5 tw-flex tw-flex-col tw-justify-between hover:tw-border-brand-300 tw-transition-all tw-h-full">
              <div className="tw-bg-blue-50/40 tw-p-3 tw-rounded-xl tw-border tw-border-blue-100 tw-mb-3">
                <div className="tw-flex tw-items-center tw-justify-between tw-pb-2 tw-mb-2 tw-border-b tw-border-slate-200/60">
                  <div className="tw-flex tw-items-center tw-gap-2">
                    <div className="tw-w-7 tw-h-7 tw-rounded-full tw-bg-blue-600 tw-flex tw-items-center tw-justify-center tw-text-xs tw-font-bold tw-text-white tw-shadow-xs">
                      <svg className="tw-w-3.5 tw-h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </div>
                    <div>
                      <div className="tw-text-xs tw-font-bold tw-text-slate-900 tw-flex tw-items-center tw-gap-1">공식 인증 발신번호<span className="tw-w-3.5 tw-h-3.5 tw-bg-emerald-500 tw-text-white tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-[8px] tw-font-black">✓</span></div>
                      <span className="tw-text-[9px] tw-text-brand-700 tw-font-semibold">SKT · 카드사 · 포인트사 공식</span>
                    </div>
                  </div>
                  <span className="tw-text-[10px] tw-text-slate-400">오전 10:25</span>
                </div>
                <div className="tw-bg-white tw-rounded-xl tw-p-3 tw-border tw-border-slate-100 tw-shadow-xs tw-space-y-2">
                  <div className="tw-flex tw-items-center tw-justify-between">
                    <span className="tw-text-[9px] tw-text-emerald-600 tw-font-semibold">안심 마크 적용</span>
                  </div>
                  <div>
                    <p className="tw-text-xs tw-font-bold tw-text-slate-900 tw-leading-snug">(광고) 고객님을 위한 제휴 특별 혜택</p>
                    <p className="tw-text-[10px] tw-text-slate-500 tw-mt-0.5 tw-leading-normal">고객님 안녕하세요.<br />OO상품 특별 할인 안내드립니다.</p>
                  </div>
                  <button className="tw-w-full tw-py-2 tw-bg-brand-600 hover:tw-bg-brand-700 tw-text-white tw-font-bold tw-text-xs tw-rounded-lg tw-shadow-xs tw-transition tw-flex tw-items-center tw-justify-center tw-gap-1.5" type="button">프로모션 확인하기 →</button>
                </div>
              </div>
              <div className="tw-space-y-1.5 tw-pt-2 tw-border-t tw-border-slate-100">
                <div className="tw-flex tw-items-center tw-justify-between tw-text-xs tw-font-medium">
                  <span className="tw-text-slate-600 tw-flex tw-items-center tw-gap-1.5"><span className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-blue-500"></span>통신사/카드사 공식 발신</span>
                  <span className="tw-font-bold tw-text-emerald-600">스팸 차단 자동 예외</span>
                </div>
                <p className="tw-text-[11px] tw-text-slate-500">검증된 공식 대표번호 및 안심 인증 배지로 클릭 전환 극대화</p>
              </div>
            </div>
            <div className="tw-bg-white tw-rounded-2xl tw-border tw-border-slate-200/80 tw-shadow-md tw-p-5 tw-flex tw-flex-col tw-justify-between hover:tw-border-brand-300 tw-transition-all tw-h-full">
              <div className="tw-flex tw-items-center tw-justify-between tw-pb-2 tw-mb-2 tw-border-b tw-border-slate-100">
                <h4 className="tw-text-xs tw-font-extrabold tw-text-slate-900 tw-uppercase tw-tracking-wider tw-flex tw-items-center tw-gap-1.5"><span className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-emerald-500"></span>실제 캠페인 평균 성과 지표</h4>
                <span className="tw-text-[10px] tw-font-bold tw-text-brand-700 tw-bg-brand-50 tw-px-2 tw-py-0.5 tw-rounded-full tw-border tw-border-brand-200/60">검증 데이터</span>
              </div>
              <div className="tw-flex-1 tw-flex tw-flex-col tw-justify-between tw-gap-2.5 tw-my-1">
                <div className="tw-bg-gradient-to-r tw-from-brand-50 tw-to-white tw-px-3.5 tw-py-2.5 tw-rounded-xl tw-border tw-border-brand-200/70 tw-flex tw-items-center tw-justify-between">
                  <div className="tw-space-y-0.5">
                    <span className="tw-text-xs tw-text-slate-700 tw-font-semibold tw-block">일반 타겟 광고 대비</span>
                    <span className="tw-text-[10px] tw-text-slate-400">반응률 기준</span>
                  </div>
                  <div className="tw-text-right">
                    <span className="tw-text-xl tw-font-black tw-text-brand-600 tw-leading-none tw-block">최소 3배 ↑</span>
                    <span className="tw-text-[9px] tw-text-brand-700 tw-font-bold tw-mt-0.5 tw-block">반응률 상승</span>
                  </div>
                </div>
                <div className="tw-bg-gradient-to-r tw-from-brand-50 tw-to-white tw-px-3.5 tw-py-2.5 tw-rounded-xl tw-border tw-border-brand-200/70 tw-flex tw-items-center tw-justify-between">
                  <div className="tw-space-y-0.5">
                    <span className="tw-text-xs tw-text-slate-700 tw-font-semibold tw-block">자체 고객 DB 보유량</span>
                    <span className="tw-text-[10px] tw-text-slate-400">고객 정보 미보유 시</span>
                  </div>
                  <div className="tw-text-right">
                    <span className="tw-text-xl tw-font-black tw-text-slate-900 tw-leading-none tw-block">0%</span>
                    <span className="tw-text-[9px] tw-text-slate-500 tw-font-bold tw-mt-0.5 tw-block">즉시 캠페인 세팅</span>
                  </div>
                </div>
                <div className="tw-bg-gradient-to-r tw-from-brand-50 tw-to-white tw-px-3.5 tw-py-2.5 tw-rounded-xl tw-border tw-border-brand-200/70 tw-flex tw-items-center tw-justify-between">
                  <div className="tw-space-y-0.5">
                    <span className="tw-text-xs tw-text-slate-700 tw-font-semibold tw-block">공식 채널 발송 안심률</span>
                    <span className="tw-text-[10px] tw-text-slate-400">카카오톡 &amp; 통신사 공식</span>
                  </div>
                  <div className="tw-text-right">
                    <span className="tw-text-xl tw-font-black tw-text-emerald-600 tw-leading-none tw-block">100%</span>
                    <span className="tw-text-[9px] tw-text-emerald-700 tw-font-bold tw-mt-0.5 tw-block">스팸 발송 X</span>
                  </div>
                </div>
              </div>
              <div className="tw-space-y-1.5 tw-pt-2 tw-border-t tw-border-slate-100">
                <div className="tw-flex tw-items-center tw-justify-between tw-text-xs tw-font-medium">
                  <span className="tw-text-slate-600 tw-flex tw-items-center tw-gap-1.5"><span className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-emerald-500"></span>공식 채널 성과 보장</span>
                  <span className="tw-font-bold tw-text-emerald-600">효율 극대화</span>
                </div>
                <p className="tw-text-[11px] tw-text-slate-500">정밀 타겟 추출과 결합되어 최상의 도달 효율 및 전환율 확보</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: Hero & Main Visualization Section */}

      {/* BEGIN: Integrated Flow & Feature Detail Section */}
      <section className="tw-py-20 tw-px-6 md:tw-px-12 lg:tw-px-20 tw-bg-white tw-relative" data-purpose="integrated-marketing-flow">
        <div className="tw-max-w-[1480px] tw-mx-auto">
          {/* Section Header */}
          <div className="tw-flex tw-flex-col lg:tw-flex-row lg:tw-items-end tw-justify-between tw-mb-14 tw-pb-6 tw-border-b tw-border-slate-100">
            <div className="tw-space-y-3">
              <div className="tw-inline-flex tw-items-center tw-space-x-2">
                <span className="tw-w-1.5 tw-h-1.5 tw-rounded-full tw-bg-brand-600"></span>
                <span className="tw-text-xs tw-font-extrabold tw-tracking-widest tw-text-brand-600 tw-uppercase">다양한 타겟팅 범위</span>
              </div>
              <h2 className="tw-text-3xl sm:tw-text-4xl tw-font-extrabold tw-text-slate-950 tw-tracking-tight">다양한 타겟팅 조건으로<div>신규 고객을 효율적으로 유치 할 수있습니다.</div></h2>
            </div>
            <p className="tw-text-sm sm:tw-text-base tw-text-slate-500 tw-max-w-md tw-mt-4 lg:tw-mt-0 tw-leading-relaxed">
              다양한 타겟팅 시나리오를 통해 최적의 시나리오를 확보하고<br />
              성과 좋은 시나리오로 지속적으로 마케팅을 할 수 있습니다.
            </p>
          </div>
          {/* 4 Core Media Targeting Method Cards */}
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-6">
            {/* Feature Card 1: SKT 실시간 기지국 위치 */}
            <div className="tw-group tw-relative tw-bg-[#FBFDFF] hover:tw-bg-white tw-rounded-2xl tw-p-6 tw-border tw-border-slate-200/80 hover:tw-border-brand-400 hover:tw-shadow-soft-card tw-transition-all tw-duration-300 tw-flex tw-flex-col tw-justify-between">
              <div className="tw-space-y-4">
                <div className="tw-w-12 tw-h-12 tw-rounded-xl tw-bg-blue-50 tw-text-brand-600 tw-flex tw-items-center tw-justify-center group-hover:tw-scale-105 group-hover:tw-bg-brand-600 group-hover:tw-text-white tw-transition-all">
                  {/* Location Map Pin Icon */}
                  <svg className="tw-w-6 tw-h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
                <div>
                  <span className="tw-text-[11px] tw-font-bold tw-text-brand-600 tw-uppercase tw-tracking-wider">[skt] 위치 기반</span>
                  <h3 className="tw-text-lg tw-font-bold tw-text-slate-900 tw-mt-1">실시간 상권 &amp; 체류 위치</h3>
                </div>
                <p className="tw-text-xs tw-text-slate-600 tw-leading-relaxed">
                  기지국 신호 기반 반경 500m~3km 내 실제 체류 고객을 대상으로 즉시 정밀 타겟팅.
                </p>
              </div>
              <div className="tw-mt-6 tw-pt-4 tw-border-t tw-border-slate-100 tw-flex tw-items-center tw-justify-between tw-text-[11px] tw-text-slate-500 tw-font-medium">
                <span>실시간 체류 위치 기반</span>
                <span className="tw-text-brand-600 tw-font-semibold">반경 위치 내</span>
              </div>
            </div>
            {/* Feature Card 2: 앱 실행 & 검색 인텐트 */}
            <div className="tw-group tw-relative tw-bg-[#FBFDFF] hover:tw-bg-white tw-rounded-2xl tw-p-6 tw-border tw-border-slate-200/80 hover:tw-border-brand-400 hover:tw-shadow-soft-card tw-transition-all tw-duration-300 tw-flex tw-flex-col tw-justify-between">
              <div className="tw-space-y-4">
                <div className="tw-w-12 tw-h-12 tw-rounded-xl tw-bg-indigo-50 tw-text-indigo-600 tw-flex tw-items-center tw-justify-center group-hover:tw-scale-105 group-hover:tw-bg-indigo-600 group-hover:tw-text-white tw-transition-all">
                  {/* App / Device Icon */}
                  <svg className="tw-w-6 tw-h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
                <div>
                  <span className="tw-text-[11px] tw-font-bold tw-text-indigo-600 tw-uppercase tw-tracking-wider">[SKT] 모바일 사용 기반</span>
                  <h3 className="tw-text-lg tw-font-bold tw-text-slate-900 tw-mt-1">앱웹 접속 &amp; 통화 &amp; 관심사</h3>
                </div>
                <p className="tw-text-xs tw-text-slate-600 tw-leading-relaxed">
                  동종 업종, 유사 서비스를 최근 30일 이내 접속하거나 경쟁사에 통화한 이력이 있는 고객군, SKT 내부 ai 시스템으로 세그먼트 된 관심사 기반 정밀 타겟팅.
                </p>
              </div>
              <div className="tw-mt-6 tw-pt-4 tw-border-t tw-border-slate-100 tw-flex tw-items-center tw-justify-between tw-text-[11px] tw-text-slate-500 tw-font-medium">
                <span>고관여 유저&nbsp;</span>
                <span className="tw-text-indigo-600 tw-font-semibold">경쟁/관심 타겟팅</span>
              </div>
            </div>
            {/* Feature Card 3: KB국민카드 & 유통 실결제 */}
            <div className="tw-group tw-relative tw-bg-[#FBFDFF] hover:tw-bg-white tw-rounded-2xl tw-p-6 tw-border tw-border-slate-200/80 hover:tw-border-brand-400 hover:tw-shadow-soft-card tw-transition-all tw-duration-300 tw-flex tw-flex-col tw-justify-between">
              <div className="tw-space-y-4">
                <div className="tw-w-12 tw-h-12 tw-rounded-xl tw-bg-amber-50 tw-text-amber-700 tw-flex tw-items-center tw-justify-center group-hover:tw-scale-105 group-hover:tw-bg-amber-600 group-hover:tw-text-white tw-transition-all">
                  {/* Credit Card Payment Icon */}
                  <svg className="tw-w-6 tw-h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75v10.5A2.25 2.25 0 004.5 19.5z" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
                <div>
                  <span className="tw-text-[11px] tw-font-bold tw-text-amber-700 tw-uppercase tw-tracking-wider">금융 결제 데이터</span>
                  <h3 className="tw-text-lg tw-font-bold tw-text-slate-900 tw-mt-1">실결제 업종 &amp; 소비 파워</h3>
                </div>
                <p className="tw-text-xs tw-text-slate-600 tw-leading-relaxed">
                  결제이력, 올리브영·CGV 구매 이력, 롯데 계열사 소비 정보 등 결제 데이터를 통한 실제<br />구매력 기반 타겟팅.
                </p>
              </div>
              <div className="tw-mt-6 tw-pt-4 tw-border-t tw-border-slate-100 tw-flex tw-items-center tw-justify-between tw-text-[11px] tw-text-slate-500 tw-font-medium">
                <span>결제 데이터</span>
                <span className="tw-text-amber-700 tw-font-semibold">&nbsp;실구매 이력</span>
              </div>
            </div>
            {/* Feature Card 4: 카카오 브랜드픽 AI 매칭 */}
            <div className="tw-group tw-relative tw-bg-[#FBFDFF] hover:tw-bg-white tw-rounded-2xl tw-p-6 tw-border tw-border-slate-200/80 hover:tw-border-brand-400 hover:tw-shadow-soft-card tw-transition-all tw-duration-300 tw-flex tw-flex-col tw-justify-between">
              <div className="tw-space-y-4">
                <div className="tw-w-12 tw-h-12 tw-rounded-xl tw-bg-yellow-50 tw-text-slate-900 tw-flex tw-items-center tw-justify-center group-hover:tw-scale-105 group-hover:tw-bg-[#FEE500] tw-transition-all">
                  {/* Kakao / Chat AI Icon */}
                  <svg className="tw-w-6 tw-h-6 tw-fill-current" viewBox="0 0 24 24">
                    <path d="M12 3c-5.52 0-10 3.58-10 8 0 2.82 1.84 5.3 4.64 6.72l-1.18 4.35c-.1.38.33.68.66.47l5.12-3.41c.25.02.5.03.76.03 5.52 0 10-3.58 10-8s-4.48-8-10-8z"></path>
                  </svg>
                </div>
                <div>
                  <span className="tw-text-[11px] tw-font-bold tw-text-slate-700 tw-uppercase tw-tracking-wider">카카오 브랜드픽</span>
                  <h3 className="tw-text-lg tw-font-bold tw-text-slate-900 tw-mt-1">카카오 AI 기반 추천 타겟군</h3>
                </div>
                <p className="tw-text-xs tw-text-slate-600 tw-leading-relaxed">
                  카카오 시스탬 내 ai를 통해 최적의 반응 잠재 고객을 추출하여 카카오 브랜드픽 공식 채널로 정밀타겟팅 가능
                </p>
              </div>
              <div className="tw-mt-6 tw-pt-4 tw-border-t tw-border-slate-100 tw-flex tw-items-center tw-justify-between tw-text-[11px] tw-text-slate-500 tw-font-medium">
                <span>카카오 생태계 활용&nbsp;</span>
                <span className="tw-text-brand-600 tw-font-semibold">카카오 채널 활용성↑</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: Integrated Flow & Feature Detail Section */}

      {/* BEGIN: Simple Footer */}
      <footer className="tw-py-8 tw-bg-slate-50 tw-border-t tw-border-slate-200/60 tw-text-center tw-text-xs tw-text-slate-400">
        <div className="tw-max-w-[1480px] tw-mx-auto tw-px-6 tw-flex tw-flex-col sm:tw-flex-row tw-items-center tw-justify-between tw-gap-4">
          <div className="tw-flex tw-items-center tw-space-x-2"></div>
        </div>
      </footer>
      {/* END: Simple Footer */}
    </div>
  );
}

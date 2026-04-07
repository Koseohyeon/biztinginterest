import { useState, useEffect } from 'react';
import ex01 from '../../assets/ex01.png'
import ex02 from '../../assets/ex02.png'
import ex03 from '../../assets/ex03.png'
import ex04 from '../../assets/ex04.png'

// --- [타입 정의] ---
interface Review {
  company: string;
  industry: string;
  description: string;
  result: string;
  readRate: string;
  responseRate: string;
}

interface Step {
  title: string;
  desc: string;
}

// --- [데이터 모음] ---
const REVIEWS: Review[] = [
  { company: 'OO 헬스장', industry: '피트니스', description: '1+1 짝궁 이벤트(회원 1명 등록 시 1명 무료 이용 혜택)를 중심으로 캠페인 진행', result: '약 10건의 문의(전화/방문) 발생, 총 3건의 실제 고단가 회원권 결제 전환. 성공적인 유치로 N차 발송 진행 중!', readRate: '73.22%', responseRate: '7.78%' },
  { company: 'OO 피트니스', industry: '피트니스', description: '선착순 10명 대상 헬스·골프 멤버십 등록 시 무제한 이용 및 1:1 레슨 제공 특별 이벤트', result: '문의 유입 폭발! 총 4건의 회원권 결제 달성. 단 한 번의 캠페인으로 높은 매출 전환을 이뤄낸 사례', readRate: '69.77%', responseRate: '4.76%' },
  { company: 'OO 크로스핏', industry: '크로스핏', description: '7일 무료 체험 제공 후 현장 등록 시 멤버십 할인 혜택 제공', result: '약 10건의 이벤트 참여 및 문의 발생. 실제 고객 유입부터 단일 캠페인을 통한 매출 전환까지 깔끔하게 이어진 사례', readRate: '63.82%', responseRate: '4.50%' },
  { company: '의료업체', industry: '의료/병의원', description: '이벤트 페이지 랜딩을 통한 신규 환자 유입 및 참여 증대 캠페인 진행', result: '하루 평균 20~25명의 실수요자 유입 달성! 이벤트 참여율이 압도적으로 높아 지속적으로 N차 집행 중 우수 사례', readRate: '71.15%', responseRate: '5.20%' },
];

const N_PASS_STEPS: Step[] = [
  { title: 'Step 1. 비즈팅 광고 접근', desc: '비즈팅을 통해 집행한 광고 메시지를 받은 수신자는 해당 URL을 통해 N-Pass에 진입합니다.', },
  { title: 'Step 2. 네이버 3초 회원가입', desc: 'URL 유입 후 네이버 로그인을 클릭하면 간편 회원가입 동의창이 노출됩니다. 동의 즉시 관심고객으로 확보됩니다.'},
  { title: 'Step 3. 대시보드 확인', desc: '캠페인 집행 완료 후, 대시보드에서 총 가입자, 금일 가입자 등 관심고객 지표를 한눈에 확인합니다.' },
  { title: 'Step 4. 마케팅 활용', desc: '확보된 정보를 기반으로 아웃바운드 마케팅 등 자유로운 2차 마케팅 활용이 가능합니다.' },
];

export default function BiztingIndexPage() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [slideIdx, setSlideIdx] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % 4);
    }, 3500);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="tw-font-sans tw-text-gray-800 tw-bg-[#fdfdfd] tw-overflow-x-hidden tw-selection:bg-blue-300 tw-selection:text-blue-900">

      {/*커스텀 애니메이션 */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0) rotate(3deg); }
          50% { transform: translateY(-10px) rotate(-3deg); }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-float-slow { animation: float-slow 7s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 5s ease-in-out infinite; }
        .animate-blob { animation: blob 10s infinite alternate; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>


      {/* 1. Hero Section */}
      <section className="tw-relative tw-w-full tw-min-h-[100svh] tw-flex tw-items-center tw-justify-center tw-px-6 tw-pt-20 tw-overflow-hidden">
        <div className="tw-absolute tw-inset-0 tw-z-0 tw-overflow-hidden tw-bg-[#fcfdff]">
          <div className="tw-absolute tw-top-[5%] tw-left-[-5%] tw-w-[50vw] tw-h-[50vw] tw-bg-blue-200/40 tw-rounded-full tw-blur-[100px] animate-blob"></div>
          <div className="tw-absolute tw-bottom-[-10%] tw-right-[-5%] tw-w-[40vw] tw-h-[40vw] tw-bg-pink-200/40 tw-rounded-full tw-blur-[120px] animate-blob tw-animation-delay-2000"></div>
          <div className="tw-absolute tw-top-[20%] tw-left-[50%] tw-w-[30vw] tw-h-[30vw] tw-bg-purple-200/40 tw-rounded-full tw-blur-[90px] animate-blob tw-animation-delay-4000"></div>
        </div>

        <div className="tw-relative tw-z-10 tw-w-full tw-max-w-5xl tw-mx-auto tw-text-center">
          <div className="tw-inline-flex tw-items-center tw-gap-2 tw-px-5 tw-py-2.5 tw-rounded-full tw-bg-white/80 tw-backdrop-blur-md tw-border tw-border-blue-100 tw-shadow-sm tw-mb-8 tw-text-sm tw-font-bold tw-text-blue-500">
            <span className="tw-relative tw-flex tw-h-2.5 tw-w-2.5">
              <span className="tw-animate-ping tw-absolute tw-inline-flex tw-h-full tw-w-full tw-rounded-full tw-bg-blue-300 tw-opacity-75"></span>
              <span className="tw-relative tw-inline-flex tw-rounded-full tw-h-2.5 tw-w-2.5 tw-bg-blue-400"></span>
            </span>
            진짜 내 고객만 정밀타겟팅
          </div>

          <h1 className="tw-text-5xl tw-md:text-7xl tw-lg:text-8xl tw-font-extrabold tw-mb-8 tw-leading-[1.15] tw-tracking-tight tw-text-gray-800">
            어디서 어떻게 홍보해야할 지 모를 때<br />
            <span className="tw-relative tw-inline-block">
              <span className="tw-relative tw-z-10 tw-bg-gradient-to-r tw-from-blue-500 tw-via-indigo-400 tw-to-purple-500 tw-bg-clip-text tw-text-transparent">잠재고객만 쏙쏙 골라내는</span>
              <span className="tw-absolute tw-bottom-2 tw-left-0 tw-w-full tw-h-4 tw-bg-blue-100/60 tw-z-0 tw-rounded-full"></span>
            </span><br />
            맞춤 타겟팅 광고!
          </h1>

          <p className="tw-text-xl tw-md:text-2xl tw-mb-12 tw-text-gray-500 tw-font-medium tw-leading-relaxed tw-max-w-3xl tw-mx-auto">
            SKT 빅데이터를 활용해 신규 고객 유치를 가장 쉽게 시작하세요.<br /> 내 상품에 관심있어할 만한 고객군을 정밀타겟팅 합니다.
          </p>

          <div className="tw-flex tw-flex-col tw-sm:flex-row tw-items-center tw-justify-center tw-gap-4">
            <a href="https://www.bizting.co.kr/account/login" className="tw-w-full tw-sm:w-auto tw-bg-blue-500 tw-text-white tw-font-bold tw-text-lg tw-py-5 tw-px-10 tw-rounded-[2rem] tw-shadow-[0_10px_30px_rgba(59,130,246,0.3)] tw-hover:-translate-y-1 tw-hover:shadow-[0_20px_40px_rgba(59,130,246,0.4)] tw-transition-all tw-duration-300 tw-flex tw-items-center tw-justify-center tw-gap-3">
              지금 바로 서비스 시작하기
              <svg className="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </a>
          </div>
        </div>
        <div className="tw-absolute tw-top-[20%] tw-left-[10%] tw-z-20 animate-float-slow tw-hidden tw-lg:flex">
          <div className="tw-w-24 tw-h-24 tw-bg-white/80 tw-backdrop-blur-xl tw-rounded-full tw-shadow-[0_10px_40px_rgba(0,0,0,0.05)] tw-border tw-border-white tw-flex tw-items-center tw-justify-center tw-text-5xl">🎯</div>
        </div>
        <div className="tw-absolute tw-bottom-[20%] tw-right-[10%] tw-z-20 animate-float-fast tw-hidden tw-lg:flex">
          <div className="tw-w-28 tw-h-28 tw-bg-gradient-to-tr tw-from-purple-50 tw-to-white tw-backdrop-blur-xl tw-rounded-[2rem] tw-shadow-[0_15px_50px_rgba(0,0,0,0.05)] tw-border tw-border-white tw-flex tw-items-center tw-justify-center tw-text-6xl tw-rotate-12">🫧</div>
        </div>
      </section>

      {/* 2. Service Intro */}
      <section className="tw-w-full tw-py-32 tw-px-6">
        <div className="tw-max-w-7xl tw-mx-auto">
          <div className="tw-text-center tw-mb-20">
            <h2 className="tw-text-4xl tw-md:text-5xl tw-font-bold tw-mb-6 tw-tracking-tight tw-text-gray-800">비즈팅(Bizting)은 어떤 서비스인가요?</h2>
            <p className="tw-text-xl tw-text-gray-500 tw-leading-relaxed tw-max-w-3xl tw-mx-auto">인구통계, 웹/앱 접속 이력, 통화 이력, 실시간 위치 등을 분석하여<br />최적의 잠재 고객에게 다이렉트 메시지를 발송합니다.</p>
          </div>

          <div className="tw-grid tw-grid-cols-1 tw-lg:grid-cols-12 tw-gap-6">
            <div className="tw-grid tw-grid-cols-1 tw-lg:grid-cols-12 tw-gap-6">
              <div className="tw-lg:col-span-8 tw-bg-blue-50/50 tw-rounded-[3rem] tw-p-8 tw-md:p-10 tw-border tw-border-blue-100/50 tw-relative tw-overflow-hidden tw-group">

                <div className="tw-absolute tw-top-[-20%] tw-right-[-10%] tw-w-96 tw-h-96 tw-bg-white/60 tw-rounded-full tw-blur-3xl tw-transition-transform tw-duration-700 tw-group-hover:scale-125"></div>

                <h3 className="tw-relative tw-z-10 tw-text-2xl md:tw-text-3xl tw-font-bold tw-mb-8 tw-text-gray-800">
                  이런 분들께 <span className="tw-text-blue-600">강력 추천</span>합니다!
                </h3>
                <div className="tw-relative tw-z-10 tw-grid tw-grid-cols-4 tw-gap-3">
                  {[
                    {
                      icon: '🔍',
                      color: 'blue',
                      text: (
                        <>
                          자체 보유한 <span className="tw-text-blue-600 tw-font-bold">고객 DB가 없어서</span>
                          마케팅이 막막하신 분
                        </>
                      )
                    },
                    {
                      icon: '📍',
                      color: 'purple',
                      text: (
                        <>
                          우리 매장 주변, 혹은 <span className="tw-text-purple-600 tw-font-bold">경쟁사 방문 이력 고객</span>만
                          타겟팅하고 싶으신 분
                        </>
                      )
                    },
                    {
                      icon: '💎',
                      color: 'pink',
                      text: (
                        <>
                          <span className="tw-text-pink-600 tw-font-bold">꼭 필요한 조건의 고객만을</span>
                          타겟팅 하여 광고를 집행해야할 때
                        </>
                      )
                    },
                    {
                      icon: '📈',
                      color: 'green',
                      text: (
                        <>
                          단순 노출이 아닌 <span className="tw-text-green-600 tw-font-bold">실제 유입 전환 데이터</span>가 필요하신 분
                        </>
                      )
                    }
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="tw-bg-white/90 tw-backdrop-blur-sm tw-p-4 tw-rounded-2xl tw-shadow-sm tw-border tw-border-white tw-flex tw-flex-col tw-items-center tw-text-center tw-gap-2 hover:tw-shadow-md hover:tw--translate-y-1 tw-transition-all tw-group"
                    >
                      <div
                        className={`tw-w-10 tw-h-10 tw-rounded-xl tw-flex tw-items-center tw-justify-center tw-text-lg tw-bg-${item.color}-50 tw-text-${item.color}-500`}
                      >
                        {item.icon}
                      </div>
                      <p className="tw-text-gray-700 tw-font-semibold tw-leading-snug tw-text-[13px] md:tw-text-sm group-hover:tw-text-gray-900">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>


      </section>

      {/* 3. Features */}
      <section className="tw-w-full tw-py-32 tw-px-6 tw-bg-white">
        <div className="tw-w-full tw-max-w-[1400px] tw-mx-auto">

          <div className="tw-text-center tw-mb-20">
            <h2 className="tw-text-4xl tw-md:text-5xl tw-font-bold tw-mb-6">
              마케팅을 더 쉽고 다양하게!
            </h2>
            <h2 className="tw-text-3xl tw-md:text-4xl tw-mb-4">
              비즈팅만의 특별 기능!
            </h2>
          </div>

          <div className="tw-flex tw-gap-6 tw-overflow-x-auto">
            {[
              {
                title: "문구 고민 끝!",
                highlight: "추천 메시지",
                desc: [
                  [
                    { text: "템플릿에 " },
                    { text: "변수만 입력", bold: true },
                    { text: "하면 빠르게 전문적인 메시지를 완성할 수 있습니다." }
                  ],
                  [
                    { text: "일반 셀프메시지 대비 " },
                    { text: "더 빠른 일정", bold: true },
                    { text: "으로 캠페인 집행이 가능합니다." }
                  ]
                ],
                isPrimary: false
              },
              {
                title: "합리적인 선택,",
                highlight: "자동발송 패키지",
                desc: [
                  [
                    { text: "매번 캠페인 등록하고 검수 요청 없이, 한번의 집행만으로 " },
                    { text: "자동으로 캠페인 발송", bold: true },
                    { text: "이 가능합니다." }
                  ],
                  [
                    { text: "* 단 발송 조건 및 문구는 동일해야 함", muted: true }
                  ]
                ],
                isPrimary: false
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="tw-w-1/4 tw-min-w-[320px] tw-bg-white tw-rounded-[2rem] tw-p-8 tw-border tw-border-gray-200 tw-shadow-sm hover:tw-shadow-lg tw-transition-all tw-flex tw-flex-col tw-justify-between"
              >
                <div>
                  <h3 className="tw-text-2xl tw-font-bold tw-mb-4 tw-leading-snug">
                    {item.title}<br />
                    <span className="tw-text-blue-600">{item.highlight}</span>
                  </h3>
                  <div className="tw-flex tw-flex-col tw-gap-3 tw-leading-relaxed">
                    {item.desc.map((line: any, i: number) => (
                      <p key={i} className="tw-text-gray-600">
                        {line.map((part: any, j: number) => {
                          if (part.bold) {
                            return (
                              <strong key={j} className="tw-font-semibold tw-text-gray-900">
                                {part.text}
                              </strong>
                            );
                          }

                          if (part.muted) {
                            return (
                              <span key={j} className="tw-text-xs tw-text-gray-400">
                                {part.text}
                              </span>
                            );
                          }

                          return <span key={j}>{part.text}</span>;
                        })}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* 카카오 모먼트 */}
            <div className="tw-w-1/4 tw-min-w-[320px] tw-bg-yellow-50 tw-rounded-[2rem] tw-p-8 tw-border-2 tw-border-yellow-300 tw-shadow-md hover:tw-shadow-xl tw-transition-all tw-flex tw-flex-col tw-justify-between">
              <div>
                <span className="tw-inline-block tw-mb-4 tw-px-3 tw-py-1 tw-text-xs tw-font-bold tw-bg-yellow-200 tw-text-yellow-800 tw-rounded-full">
                  확장 기능
                </span>

                <h3 className="tw-text-2xl tw-font-extrabold tw-mb-3 tw-leading-snug tw-text-yellow-900">
                  더 넓은 도달,<br />카카오 모먼트
                </h3>

                <p className="tw-text-yellow-800 tw-leading-relaxed tw-whitespace-pre-line">
                  {"문자 메시지를 넘어 카카오에서도 광고 메시지 집행이 가능합니다.\n\n전화번호 없이 내 채널 친구에게 광고메시지를 보내보세요!"}
                </p>
              </div>
            </div>

            {/* N-Pass */}
            <div className="tw-w-1/4 tw-min-w-[320px] tw-bg-blue-50 tw-rounded-[2rem] tw-p-8 tw-border-2 tw-border-blue-300 tw-shadow-md hover:tw-shadow-xl tw-transition-all tw-flex tw-flex-col tw-justify-between">
              <div>
                <span className="tw-inline-block tw-mb-4 tw-px-3 tw-py-1 tw-text-xs tw-font-bold tw-bg-blue-200 tw-text-blue-700 tw-rounded-full">
                  핵심 기능
                </span>

                <h3 className="tw-text-2xl tw-font-extrabold tw-mb-3 tw-leading-snug">
                  관심 고객 확보<br />
                  <span className="tw-text-blue-600">N-Pass</span>
                </h3>

                <p className="tw-text-gray-700 tw-leading-relaxed tw-mb-6">
                  네이버 간편 가입을 통해 이탈 없이 잠재 고객을 확보하고
                  대시보드에서 효율적으로 관리할 수 있습니다.
                </p>

                <div className="tw-flex tw-flex-col tw-gap-2">
                  {N_PASS_STEPS.map((step, idx) => (
                    <div
                      key={idx}
                      onMouseEnter={() => setActiveStep(idx)}
                      className={`tw-p-3 tw-rounded-lg tw-text-sm tw-cursor-pointer tw-transition-all ${activeStep === idx
                          ? 'tw-bg-white tw-text-blue-600 tw-shadow-sm'
                          : 'tw-text-gray-500 hover:tw-bg-white/60'
                        }`}
                    >
                      {step.title}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Testimonials */}
      <section className="tw-w-full tw-py-32 tw-bg-blue-50/30">
        <div className="tw-max-w-7xl tw-mx-auto tw-px-6">
          <div className="tw-text-center tw-mb-20">
            <h2 className="tw-text-4xl tw-font-bold tw-mb-4 tw-tracking-tight">실제 비즈팅 이용자들의  <span className="tw-text-blue-500"> 사용 후기</span></h2>
            <p className="tw-text-xl tw-text-gray-500"></p>
          </div>
        </div>

        <div className="tw-max-w-7xl tw-mx-auto tw-px-6">
          <div className="tw-flex tw-flex-nowrap lg:tw-grid lg:tw-grid-cols-4 tw-gap-4 lg:tw-gap-6 tw-overflow-x-auto tw-snap-x tw-snap-mandatory tw-pb-8 hide-scrollbar">
            {REVIEWS.map((review, idx) => (
              <div key={idx} className="tw-min-w-[300px] tw-w-[85%] lg:tw-w-auto tw-snap-center tw-shrink-0 tw-bg-white tw-rounded-[2.5rem] tw-p-8 tw-shadow-[0_10px_40px_rgba(0,0,0,0.03)] tw-border tw-border-gray-100/50 tw-flex tw-flex-col tw-justify-between hover:tw--translate-y-2 hover:tw-shadow-[0_20px_50px_rgba(59,130,246,0.08)] tw-transition-all tw-duration-300">
                <div>
                  <div className="tw-flex tw-justify-between tw-items-center tw-mb-6">
                    <span className="tw-font-black tw-text-xl tw-text-gray-800">{review.company}</span>
                    <span className="tw-text-xs tw-font-bold tw-bg-blue-50 tw-text-blue-500 tw-px-3.5 tw-py-1.5 tw-rounded-full">{review.industry}</span>
                  </div>
                  <p className="tw-text-sm tw-text-gray-500 tw-mb-6 tw-leading-relaxed tw-min-h-[80px]">{review.description}</p>
                  <div className="tw-bg-blue-50/50 tw-text-gray-700 tw-text-sm tw-font-medium tw-leading-relaxed tw-p-5 tw-rounded-[1.5rem] tw-mb-8 tw-min-h-[120px]">
                    <span className="tw-text-blue-500 tw-font-bold">Result.</span><br />{review.result}
                  </div>
                </div>
                <div className="tw-bg-blue-500 tw-rounded-[1.5rem] tw-p-5 tw-flex tw-justify-between tw-text-white tw-shadow-[0_10px_20px_rgba(59,130,246,0.2)]">
                  <div className="tw-text-center tw-w-full tw-border-r tw-border-white/20">
                    <div className="tw-text-[11px] tw-text-blue-100 tw-mb-1 tw-uppercase tw-tracking-wider tw-font-medium">읽음률</div>
                    <div className="tw-font-bold tw-text-xl">{review.readRate}</div>
                  </div>
                  <div className="tw-text-center tw-w-full">
                    <div className="tw-text-[11px] tw-text-blue-100 tw-mb-1 tw-uppercase tw-tracking-wider tw-font-medium">반응률</div>
                    <div className="tw-font-bold tw-text-xl">{review.responseRate}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tw-w-full tw-py-32 tw-px-6 tw-bg-white">
        <div className="tw-max-w-6xl tw-mx-auto tw-text-center">

          <h2 className="tw-text-4xl tw-font-bold tw-mb-6 tw-text-gray-800">
            업종별 발송 레퍼런스
          </h2>

          <p className="tw-text-gray-500 tw-mb-16">
            다양한 업종에서 비즈팅을 통해 성공적인 캠페인을 진행하고 있습니다.
          </p>

          <div className="tw-flex tw-gap-8 tw-justify-center">
            {[
              { img: ex01, label: "요식업" },
              { img: ex02, label: "의료" },
              { img: ex03, label: "카페" },
              { img: ex04, label: "운동" },
            ].map((item, idx) => (
              <div key={idx} className="tw-flex tw-flex-col tw-items-center">

                {/* 이미지 */}
                <div className="tw-overflow-hidden tw-rounded-2xl">
                  <img
                    src={item.img}
                    alt={item.label}
                    className="tw-w-full tw-max-w-[300px] tw-object-cover tw-transition-transform tw-duration-500 hover:tw-scale-110"
                  />
                </div>

                {/*업종 카드 */}
                <div className="tw-mt-4 tw-px-4 tw-py-2 tw-bg-gray-100 tw-text-gray-700 tw-rounded-full tw-text-sm tw-font-semibold tw-shadow-sm">
                  {item.label}
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>
      {/* 6. Bottom CTA */}
      <section className="tw-w-full tw-py-32 tw-px-6 tw-bg-white">
        <div className="tw-max-w-5xl tw-mx-auto tw-bg-gradient-to-r tw-from-blue-400 tw-via-indigo-400 tw-to-purple-400 tw-rounded-[4rem] tw-p-16 tw-md:p-24 tw-text-center tw-shadow-[0_20px_50px_rgba(99,102,241,0.2)] tw-relative tw-overflow-hidden">
          <div className="tw-absolute tw-top-[-50px] tw-left-[-50px] tw-w-64 tw-h-64 tw-bg-white tw-rounded-full tw-mix-blend-overlay tw-opacity-20 tw-animate-pulse"></div>
          <div className="tw-absolute tw-bottom-[-100px] tw-right-[-50px] tw-w-96 tw-h-96 tw-bg-white tw-rounded-full tw-mix-blend-overlay tw-opacity-10 tw-animate-pulse" style={{ animationDelay: '1s' }}></div>

          <h2 className="tw-relative tw-z-10 tw-text-4xl tw-md:text-5xl tw-font-extrabold tw-text-white tw-mb-8 tw-leading-tight tw-tracking-tight">
            이제, 확실한 고객에게만<br />메시지를 보내세요
          </h2>
          <p className="tw-relative tw-z-10 tw-text-blue-50 tw-text-xl tw-mb-12 tw-font-medium"> 누구나 쉽게 시작하는 빅데이터 마케팅</p>

          <a
            href="https://www.bizting.co.kr/account/login"
            className="tw-relative tw-z-10 tw-inline-block tw-bg-white tw-text-blue-500 tw-text-xl tw-font-extrabold tw-py-5 tw-px-14 tw-rounded-full tw-shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:tw-scale-105 hover:tw-shadow-[0_15px_40px_rgba(255,255,255,0.3)] tw-transition-all tw-duration-300"
          >
            비즈팅 시작하기
          </a>
        </div>
      </section>

    </div>
  );
}
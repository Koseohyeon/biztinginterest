import { ArrowDown, ArrowUpRight, ChevronDown, MoveRight, Gauge, Ticket } from "lucide-react";
import bmwLogo from "../../assets/deutsch-bmw-logo.svg";
import bmwHero from "../../assets/deutsch-bmw-hero.webp";
import footballPhoto from "../../assets/deutsch-football-ai.png";
import kleagueLogo from "../../assets/deutsch-kleague-logo.png";

// Official assets: deutschmotors.com and bmw.co.kr.
// Stadium image: AI-generated fictional football stadium.
const TEST_DRIVE_URL = "https://bmwexperience.bmw.co.kr/ko/campaign/60b8b1f6-a68a-4f2f-be7c-833f44f8e457?series=1";
const headingClass = "tw-m-0 tw-font-medium tw-text-[30px] tw-leading-[1.55] tw-tracking-[-1px]";

function TestDriveLink({ compact = false }: { compact?: boolean }) {
  return <a href={TEST_DRIVE_URL} target="_blank" rel="noopener noreferrer" className={`tw-flex tw-items-center tw-justify-between tw-gap-4 tw-rounded-[4px] tw-bg-[#215b99] tw-px-6 tw-font-medium !tw-text-white tw-no-underline tw-transition-colors hover:tw-bg-[#2c70b4] focus-visible:tw-outline focus-visible:tw-outline-2 focus-visible:tw-outline-offset-4 focus-visible:tw-outline-[#66a6ff] ${compact ? "tw-min-h-[56px] tw-text-[15px]" : "tw-min-h-[60px] tw-text-[16px]"}`}>
    시승 신청하기 <ArrowUpRight size={21} aria-hidden="true" /><span className="tw-sr-only">BMW 공식 신청 페이지, 새 창</span>
  </a>;
}

export default function DeutschMotorsEventPage() {
  return <div className="tw-min-h-screen tw-bg-[#202222] tw-font-sans tw-text-white tw-leading-relaxed tw-break-keep tw-pb-[110px] [&_*]:tw-box-border [&_p]:tw-m-0 [&_a]:tw-no-underline [&_h1]:tw-text-inherit [&_h2]:tw-text-inherit [&_h3]:tw-text-inherit">
    <main className="tw-mx-auto tw-max-w-[600px] tw-bg-[#11171b]">
      <header className="tw-flex tw-items-center tw-justify-between tw-gap-4 tw-px-7 tw-py-7 sm:tw-px-10">
        <div><p className="tw-text-[9px] tw-tracking-[1.8px] tw-text-[#9da8b6]">BMW AUTHORIZED DEALER</p><p className="tw-text-[19px] tw-font-medium tw-tracking-[-0.3px]">도이치 모터스</p></div>
        <img src={bmwLogo} width="48" height="48" alt="BMW 공식 딜러 도이치 모터스" className="tw-h-12 tw-w-12 tw-object-contain" />
      </header>

      <section aria-labelledby="tw-deutsch-title" className="tw-relative tw-overflow-hidden tw-pt-10 sm:tw-pt-14">
        <div className="tw-relative tw-z-10 tw-px-7 sm:tw-px-10">
          <p className="tw-flex tw-items-center tw-gap-2 tw-text-[9px] tw-font-normal tw-tracking-[2.8px] tw-text-[#baa88c]"><span className="tw-h-[5px] tw-w-[5px] tw-rounded-full tw-bg-[#baa88c]" /> MATCH DAY. DRIVE DAY.</p>
          <h1 id="tw-deutsch-title" className="tw-m-0 tw-mt-7 tw-text-[39px] tw-font-light tw-leading-[1.4] tw-tracking-[-1.7px] min-[480px]:tw-text-[52px] max-[359px]:tw-text-[33px]">경기의 열기,<br /><span className="tw-font-normal tw-text-[#c6d4df]">드라이빙의 설렘.</span></h1>
          <p className="!tw-mt-6 tw-text-[13px] tw-font-light tw-leading-[2] tw-text-[#acb6c4]">K리그 즐기는 오늘,<br />다음 설렘은 BMW 운전석에서 만나보세요.</p>
        </div>
        <div className="tw-relative tw-mt-9">
          <img src={bmwHero} alt="도심에 주차된 BMW 1시리즈 공식 차량 이미지" width="1024" height="448" fetchPriority="high" className="tw-block tw-w-full tw-h-auto tw-min-h-[215px] tw-object-cover tw-object-[58%_center]" />
          <div aria-hidden="true" className="tw-pointer-events-none tw-absolute tw-inset-0 tw-bg-[linear-gradient(180deg,#11171b_0%,transparent_25%,transparent_70%,#11171b_100%)]" />
          <span className="tw-absolute tw-bottom-5 tw-left-6 tw-text-[9px] tw-tracking-[2px] tw-text-white/70 sm:tw-left-9">THE JOY OF DRIVING</span>
        </div>
        <div className="tw-px-7 tw-pt-5 tw-pb-12 sm:tw-px-10"><TestDriveLink /><p className="!tw-mt-3 tw-text-center tw-text-[10px] tw-text-[#818e9f]">도이치 모터스 시승 신청 이벤트</p></div>
      </section>

      <section aria-labelledby="tw-deutsch-match" className="tw-relative tw-isolate tw-overflow-hidden tw-min-h-[310px] tw-flex tw-flex-col tw-justify-end tw-px-6 tw-py-7 sm:tw-px-9">
        <img src={footballPhoto} alt="관중으로 가득한 야간 축구 경기장 AI 연출 이미지" loading="lazy" width="1200" height="800" className="tw-absolute tw-inset-0 -tw-z-20 tw-h-full tw-w-full tw-object-cover" />
        <div aria-hidden="true" className="tw-absolute tw-inset-0 -tw-z-10 tw-bg-[linear-gradient(180deg,#09132166,#091321ee)]" />
        <div className="tw-flex tw-items-center tw-gap-3 tw-mb-5"><span className="tw-inline-flex tw-shrink-0 tw-items-center tw-justify-center tw-rounded-full tw-bg-gradient-to-r tw-from-white/95 tw-via-white/90 tw-to-white/60 tw-px-3 tw-py-2 tw-shadow-[0_0_18px_#ffffff20]"><img src={kleagueLogo} alt="K리그" width="66" height="30" className="tw-w-[66px] tw-h-auto tw-object-contain" /></span><span className="tw-text-[9px] tw-tracking-[2px] tw-text-white/70">FOOTBALL & DRIVING</span></div>
        <h2 id="tw-deutsch-match" className={`${headingClass} tw-text-[27px]`}>응원으로 뜨거워진 하루.<br />새로운 경험을 더하세요.</h2>
        <a href="https://www.kleague.com/schedule.do?leagueId=1" target="_blank" rel="noopener noreferrer" className="tw-mt-5 tw-inline-flex tw-items-center tw-gap-3 tw-self-start tw-text-[11px] !tw-text-white tw-border-b tw-border-solid tw-border-white/50 tw-pb-1 focus-visible:tw-outline">K리그 경기 일정 보기 <ArrowUpRight size={14} aria-hidden="true" /><span className="tw-sr-only">공식 사이트, 새 창</span></a>
        <p className="!tw-mt-3 tw-text-[8px] tw-text-white/50">경기장은 AI 연출 이미지로, 실제 이벤트 장소와 다릅니다.</p>
      </section>

      <section aria-labelledby="tw-deutsch-benefit" className="tw-bg-[#f2f0eb] tw-text-[#252c30] tw-px-7 tw-py-14 sm:tw-px-10">
        <p className="tw-text-[9px] tw-font-medium tw-tracking-[2.5px] tw-text-[#8b795f]">YOUR NEXT EXPERIENCE</p>
        <h2 id="tw-deutsch-benefit" className={`${headingClass} tw-mt-3`}>시승의 즐거움에,<br />참여 혜택을 더하다.</h2>
        <div className="tw-mt-9 tw-overflow-hidden tw-rounded-lg tw-bg-[#faf9f6] tw-shadow-[0_10px_35px_#18253106]">
          <div className="tw-flex tw-items-start tw-gap-5 tw-px-5 tw-py-7"><Gauge size={27} strokeWidth={1.4} className="tw-shrink-0 tw-text-[#8b795f]" aria-hidden="true" /><div><p className="tw-text-[9px] tw-font-bold tw-tracking-[1.5px] tw-text-[#7c8795]">EXPERIENCE 01</p><h3 className="tw-m-0 tw-mt-1 tw-text-[19px] tw-font-medium tw-tracking-[-0.3px]">직접 느끼는 BMW</h3><p className="!tw-mt-2 tw-text-[12px] tw-leading-[1.8] tw-text-[#6c7784]">눈으로 보던 BMW를 직접 경험해 보세요.<br />희망 모델과 일정은 신청 페이지에서 확인하세요.</p></div></div>
          <div className="tw-relative tw-flex tw-items-start tw-gap-5 tw-px-5 tw-py-7 tw-border-t tw-border-solid tw-border-[#dfdcd4] tw-bg-[#e8e7e1]"><Ticket size={27} strokeWidth={1.4} className="tw-shrink-0 tw-text-[#8b795f]" aria-hidden="true" /><div><p className="tw-text-[9px] tw-font-bold tw-tracking-[1.5px] tw-text-[#7c8795]">EVENT BENEFIT</p><h3 className="tw-m-0 tw-mt-1 tw-text-[19px] tw-font-medium tw-tracking-[-0.3px]">문자메시지 수신자 한정 시승 참여 고객 혜택</h3><p className="!tw-mt-2 tw-text-[12px] tw-leading-[1.8] tw-text-[#6c7784]">상세 혜택은 준비 중입니다.<br />제공 품목과 참여 조건은 확정 후 안내됩니다.</p><span className="tw-inline-block tw-mt-4 tw-text-[8px] tw-tracking-[2px] tw-font-normal tw-text-[#8b795f]">DETAILS COMING SOON</span></div></div>
        </div>
      </section>

      <section aria-labelledby="tw-deutsch-how" className="tw-px-7 tw-py-14 sm:tw-px-10">
        <div className="tw-flex tw-items-center tw-justify-between tw-mb-6"><h2 id="tw-deutsch-how" className={`${headingClass} tw-text-[26px]`}>참여는 간단하게.</h2><ArrowDown size={19} className="tw-text-[#7e8b9d]" aria-hidden="true" /></div>
        <ol className="tw-list-none tw-m-0 tw-p-0">{[
          ["01", "시승 신청하기", "아래 버튼으로 BMW 공식 신청 페이지에 접속 후 예약 신청 시 문자 수신 후 신청 문구를 적어주세요"],
          ["02", "희망 모델·일정 확인하기", "시승 가능 모델과 예약 일정은 담당자 안내에 따라 확정됩니다."],
          ["03", "시승하고, 시크릿  혜택 받기", "예약 신청 시 문자 수신 후 신청을 적어주시거나 방문 후 해당 페이지를 직원에게 보여주셔야 혜택 제공이 가능합니다."],
        ].map(([number,title,description]) => <li key={number} className="tw-flex tw-gap-5 tw-py-5 tw-border-t tw-border-solid tw-border-white/15"><span className="tw-text-[13px] tw-font-medium tw-text-[#679eea]">{number}</span><div><h3 className="tw-m-0 tw-text-[16px] tw-font-medium tw-tracking-[-0.5px]">{title}</h3><p className="!tw-mt-2 tw-text-[11px] tw-leading-[1.8] tw-text-[#8592a4]">{description}</p></div></li>)}</ol>
        <div className="tw-mt-5 tw-flex tw-items-center tw-justify-between tw-text-[12px] tw-text-white">새로운 드라이빙의 시작, 도이치 모터스.<MoveRight size={19} className="tw-shrink-0" aria-hidden="true" /></div>
      </section>

      <details className="tw-mx-6 tw-border-y tw-border-solid tw-border-white/15 tw-text-[#8592a4] sm:tw-mx-9"><summary className="tw-flex tw-list-none tw-cursor-pointer tw-items-center tw-justify-between tw-py-5 tw-text-[12px] focus-visible:tw-outline">신청 전 확인해 주세요 <ChevronDown size={16} aria-hidden="true" /></summary><ul className="tw-m-0 tw-pl-4 tw-pb-5 tw-text-[10px] tw-leading-[1.9] [&_li+li]:tw-mt-2"><li>시승 신청은 연결된 BMW 공식 페이지에서 진행됩니다. 신청만으로 시승 예약이 확정되지는 않습니다.</li><li>시승 가능 모델, 운영 전시장, 일정 및 운전면허 등 참여 조건은 신청 페이지와 담당자 안내를 확인해 주세요.</li><li>이벤트 진행 경기·장소·기간 및 경품·수량·지급 조건은 확정 후 안내됩니다. 경기 관람권 제공은 포함되지 않습니다.</li><li>차량 이미지는 실제 시승 차량 및 국내 사양과 다를 수 있습니다.</li></ul></details>
      <footer className="tw-px-6 tw-py-8 tw-flex tw-items-center tw-justify-between tw-gap-3 sm:tw-px-9"><div><p className="tw-text-[12px] tw-font-bold tw-text-[#b9c1cd]">도이치 모터스</p><p className="tw-text-[8px] tw-tracking-[1px] tw-text-[#6c798b]">BMW AUTHORIZED DEALER</p></div><span className="tw-text-[8px] tw-text-[#6c798b]">TEST DRIVE EVENT</span></footer>
    </main>
    <div className="tw-fixed tw-bottom-0 tw-left-1/2 -tw-translate-x-1/2 tw-z-30 tw-w-full tw-max-w-[600px] tw-border-t tw-border-solid tw-border-white/15 tw-bg-[#11171bf2] tw-px-5 tw-pt-3 tw-pb-[calc(12px+env(safe-area-inset-bottom))] tw-backdrop-blur-md"><TestDriveLink compact /></div>
  </div>;
}

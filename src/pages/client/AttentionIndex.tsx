import Layout from "../../components/Layout";
import ConsentModal from "../../components/ConsentModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "../../components/Chart";
import MaskedTable from "../../components/MaskedTable";
import {
  Smartphone,
  TrendingUp,
  BarChart,
  FileText,
  Database,
  Users,
  UserPlus
} from "lucide-react";

// --- START: Sample Data for Dashboard Preview ---
const sampleChartData = [
   { date: '3/16', count: 5 },
  { date: '3/17', count: 8 },
  { date: '3/18', count: 15 },
  { date: '3/19', count: 12 },
  { date: '3/20', count: 25 },
  { date: '3/21', count: 22 },
  { date: '3/22', count: 31 },
];

const sampleUsers = [
  { id: 1, name: '김지현', phone: '010-1234-1234', email: 'kimjh@naver.com', createdAt: '2024-03-22 14:05' },
  { id: 2, name: '이민서', phone: '010-5678-5678', email: 'leems@gmail.com', createdAt: '2024-03-22 11:34' },
  { id: 3, name: '박서준', phone: '010-9012-9012', email: 'parksj@nate.com', createdAt: '2024-03-21 18:22' },
  { id: 4, name: '최지윤', phone: '010-3456-3456', email: 'choijy@daum.net', createdAt: '2024-03-21 16:48' },
  { id: 5, name: '정우진', phone: '010-7890-7890', email: 'jungwj@naver.com', createdAt: '2024-03-20 20:15'},
];
// --- END: Sample Data ---


export default function AttentionIndex() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => setOpen(true);

  return (
    <Layout>
      <div className="tw-bg-slate-50">
        {/* HERO */}
        <section className="tw-bg-white">
          <div className="tw-max-w-7xl tw-mx-auto tw-px-6 tw-py-24 sm:tw-py-32 tw-text-center">
            <div className="tw-inline-block tw-bg-blue-100 tw-text-blue-600 tw-px-4 tw-py-1.5 tw-rounded-full tw-text-sm tw-font-semibold tw-mb-4">
              신규 고객 확보 솔루션
            </div>
            <h1 className="tw-text-4xl md:tw-text-6xl tw-font-extrabold tw-tracking-tight tw-text-slate-900">
               <span className="tw-text-blue-600">N-pass</span> 관심고객을 <span className="tw-text-blue-600">진성고객</span>으로<br />
              전환하는 방법
            </h1>
            <p className="tw-mt-6 tw-max-w-2xl tw-mx-auto tw-text-lg tw-text-slate-600 tw-leading-8">
              복잡한 개발이나 비싼 랜딩페이지 없이, 네이버 간편동의 하나로
              광고에 반응한 잠재고객의 DB를 수집하고 즉시 영업에 활용하세요.
            </p>
            <div className="tw-mt-10">
              <button
                onClick={handleStart}
                className="tw-border-0 tw-bg-blue-600 tw-text-white tw-px-8 tw-py-4 tw-rounded-lg tw-font-semibold tw-text-lg tw-shadow-lg hover:tw-bg-blue-700 tw-transition-transform hover:tw-scale-105"
              >
                N-pass 시작하기
              </button>
            </div>
          </div>
        </section>

        {/* PROCESS DIAGRAM */}
        <section className="tw-py-24 sm:tw-py-32">
            <div className="tw-max-w-7xl tw-mx-auto tw-px-6">
                <div className="tw-text-center tw-mb-20">
                    <h2 className="tw-text-3xl md:tw-text-4xl tw-font-bold tw-text-slate-900">
                        광고부터 <span className="tw-text-blue-600">고객수집</span>까지, 이렇게 됩니다.
                    </h2>
                    <p className="tw-mt-4 tw-text-lg tw-text-slate-500">
                        잠재고객에서 진성고객이 되기까지의 과정
                    </p>
                </div>
                <ProcessDiagram />
            </div>
        </section>

        {/* DASHBOARD PREVIEW */}
        <section className="tw-bg-white tw-py-24 sm:tw-py-32">
            <div className="tw-max-w-7xl tw-mx-auto tw-px-6">
                 <div className="tw-text-center tw-mb-16">
                    <h2 className="tw-text-3xl md:tw-text-4xl tw-font-bold tw-text-slate-900">
                        실시간으로 쌓이는 <span className="tw-text-blue-600">'진성 고객'</span>을 직접 확인하세요
                    </h2>
                    <p className="tw-mt-4 tw-text-lg tw-text-slate-500">
                       대시보드를 통해 캠페인 성과를 직관적으로 확인하고, 고객 데이터를 즉시 활용할 수 있습니다.
                    </p>
                </div>
                <DashboardPreview />
            </div>
        </section>

        {/* BENEFITS */}
        <section className="tw-py-24 sm:tw-py-32">
          <div className="tw-max-w-7xl tw-mx-auto tw-px-6">
            <div className="tw-text-center tw-mb-16">
               <h2 className="tw-text-3xl md:tw-text-4xl tw-font-bold tw-text-slate-900">
                비즈팅으로 얻게 될 3가지 핵심 가치
              </h2>
            </div>
            <div className="tw-grid md:tw-grid-cols-3 tw-gap-10">
              <BenefitCard
                icon={<BarChart className="tw-w-8 tw-h-8" />}
                title="명확한 성과 측정"
                text="'클릭'이 아닌 '확보된 고객 수'로 광고의 ROI를 명확하게 측정하고, 캠페인을 최적화할 수 있습니다."
              />
              <BenefitCard
                icon={<TrendingUp className="tw-w-8 tw-h-8" />}
                title="간편한 회원전환"
                text="개발이 필요없는 '3초 네이버 동의'로 회원가입 과정의 이탈률을 줄일 수 있습니다."
              />
               <BenefitCard
                icon={<Database className="tw-w-8 tw-h-8" />}
                title="고품질 영업 DB 확보"
                text="광고에 반응한 고객 DB를 확보하여 즉각적인 아웃바운드 영업이 가능합니다."
              />
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="tw-max-w-7xl tw-mx-auto tw-px-6 tw-py-24">
            <div className="tw-bg-gradient-to-r tw-from-blue-600 tw-to-indigo-700 tw-rounded-2xl tw-p-12 md:tw-p-20 tw-text-center tw-shadow-2xl">
                <h2 className="tw-text-3xl md:tw-text-4xl tw-font-extrabold tw-text-white">
                    이제, 광고의 마침표는 '진성 고객'입니다.
                </h2>
                <p className="tw-mt-5 tw-text-lg tw-text-blue-100 tw-max-w-2xl tw-mx-auto">
                    지금 바로 비즈팅 관심지표 서비스를 시작하고, 광고 효율을 새로운 차원으로 끌어올리세요.
                </p>
                <div className="tw-mt-10">
                    <button
                    onClick={handleStart}
                    className="tw-border-0 tw-bg-white tw-text-blue-600 tw-px-10 tw-py-4 tw-rounded-lg tw-font-bold tw-text-lg tw-shadow-xl hover:tw-bg-slate-100 tw-transition-transform hover:tw-scale-105"
                    >
                    N-pass 시작하기
                    </button>
                </div>
            </div>
        </section>
      </div>

      {open && (
        <ConsentModal
          onClose={() => setOpen(false)}
          onAgree={() => navigate("/client/DashboardLogin")}
        />
      )}
    </Layout>
  );
}

/* --- Child Components --- */

const ProcessDiagram = () => (
    <div className="tw-relative tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-justify-around tw-gap-y-12 md:tw-gap-x-8">
        <ProcessStep
            icon={<Smartphone className="tw-w-10 tw-h-10"/>}
            step="Step 1"
            title="광고 메시지 클릭"
            description="비즈팅으로 집행한 캠페인을 통해 고객이 유입됩니다."
        />
        <ProcessStep
            icon={<NaverConsentMockup />}
            step="Step 2"
            title="네이버 간편 동의"
            description="'3초' 만에 네이버 간편가입을 통해 회원으로 전환됩니다."
        />
        <ProcessStep
            icon={<Database className="tw-w-10 tw-h-10"/>}
            step="Step 3"
            title="'진성고객' DB 확보"
            description="대시보드에서 고객 데이터를 실시간으로 확인하고 활용합니다."
        />
    </div>
);

const ProcessStep = ({ icon, step, title, description }: { icon: React.ReactNode, step: string, title: string, description: string }) => (
    <div className="tw-relative tw-z-10 tw-flex tw-flex-col tw-items-center tw-text-center tw-max-w-xs">
        <div className="tw-w-24 tw-h-24 tw-flex tw-items-center tw-justify-center tw-bg-blue-600 tw-text-white tw-rounded-full tw-shadow-lg tw-border-4 tw-border-white">
            {icon}
        </div>
        <div className="tw-mt-5">
            <span className="tw-text-sm tw-font-semibold tw-text-blue-600">{step}</span>
            <h3 className="tw-mt-1 tw-text-xl tw-font-bold tw-text-slate-800">{title}</h3>
            <p className="tw-mt-2 tw-text-slate-500">{description}</p>
        </div>
    </div>
);

const NaverConsentMockup = () => (
    <UserPlus className="tw-w-10 tw-h-10 tw-text-white" />
)


const DashboardPreview = () => (
    <div className="tw-bg-slate-50 tw-border-2 tw-border-slate-200 tw-rounded-2xl tw-shadow-2xl tw-overflow-hidden">
        {/* Header */}
        <div className="tw-bg-white tw-px-6 tw-py-4 tw-border-b tw-border-slate-200">
            <div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-items-center tw-gap-4">
                <h2 className="tw-text-xl tw-font-bold tw-text-slate-800">
                  대시보드
                </h2>
                <div className="tw-flex tw-items-center tw-gap-3">
                    <div className="tw-relative">
                        <input type="text" placeholder="이름, 연락처, 이메일 검색" className="tw-border-0 tw-border-slate-300 tw-rounded-lg tw-pl-9 tw-pr-3 tw-py-2 tw-w-full md:tw-w-60 tw-text-sm focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"/>
                        <Users className="tw-absolute tw-left-2.5 tw-top-1/2 -tw-translate-y-1/2 tw-w-4 tw-h-4 tw-text-slate-400"/>
                    </div>
                    <button className="tw-border-0 tw-bg-blue-600 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg tw-font-semibold tw-text-sm tw-shadow hover:tw-bg-blue-700 tw-flex tw-items-center tw-gap-2 tw-flex-shrink-0">
                        <FileText className="tw-w-4 tw-h-4"/>
                        엑셀 다운로드
                    </button>
                </div>
            </div>
        </div>

        {/* Body */}
        <div className="tw-p-6">
            {/* KPIs */}
            <div className="tw-grid tw-grid-cols-5 md:tw-grid-cols-4 tw-gap-10 tw-mb-6 tw-w-full">
                <KpiCard title="관심고객 수" value="105명" color="tw-text-blue-600" />
                 <KpiCard title="오늘 가입 수" value="25명" />
                <KpiCard title="7일 내 가입 수" value="42명"  />
            </div>

            {/* Chart */}
            <div className="tw-bg-white tw-border tw-border-slate-200 tw-rounded-xl tw-p-6 tw-mb-6">
                <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
                    <h3 className="tw-font-semibold tw-text-slate-800">신규 고객 확보 추이</h3>
                    <span className="tw-text-sm tw-font-semibold tw-text-slate-500">최근 7일</span>
                </div>
                <div className="tw-w-full">
                    <Chart data={sampleChartData} />
                </div>
            </div>

            {/* Table */}
            <div className="tw-bg-white tw-border tw-border-slate-200 tw-rounded-xl tw-p-6">
                 <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
                    <h3 className="tw-font-semibold tw-text-slate-800">최근 확보된 진성 고객 목록</h3>
                    <button className="tw-border-0 tw-text-sm tw-font-semibold tw-text-blue-600 hover:tw-underline">전체 목록 보기 →</button>
                </div>
                <MaskedTable users={sampleUsers} />
            </div>
        </div>
    </div>
);

const KpiCard = ({ title, value, color = 'tw-text-slate-800'}: {title: string, value: string, color?: string}) => (
    <div className="tw-bg-white tw-p-4 tw-rounded-lg tw-border tw-border-slate-200 tw-text-center">
        <p className="tw-text-sm tw-text-slate-500">{title}</p>
        <p className={`tw-text-xl md:tw-text-2xl tw-font-bold ${color}`}>{value}</p>
    </div>
);

const BenefitCard = ({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) => (
  <div className="tw-bg-white tw-p-8 tw-rounded-xl tw-shadow-lg tw-border tw-border-transparent hover:tw-border-blue-300 hover:tw-shadow-blue-100 tw-transition-all tw-duration-300">
    <div className="tw-flex-shrink-0 tw-mb-4 tw-text-blue-600">{icon}</div>
    <h3 className="tw-text-xl tw-font-bold tw-text-slate-800">{title}</h3>
    <p className="tw-mt-2 tw-text-slate-500">{text}</p>
  </div>
);

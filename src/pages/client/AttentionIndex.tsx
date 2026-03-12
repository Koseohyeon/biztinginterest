import Layout from "../../components/Layout";
import ConsentModal from "../../components/ConsentModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  BarChart3,
  Smartphone,
  TrendingUp,
  MessageCircle,
  Zap
} from "lucide-react";

export default function AttentionIndex() {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (

    <Layout>
      <div className="tw-max-w-7xl tw-mx-auto tw-px-6 tw-py-16 tw-space-y-28">
        {/* HERO */}
        <section className="tw-grid md:tw-grid-cols-2 tw-items-center">
          <div className="tw-space-y-5">
<div className="tw-inline-block tw-bg-blue-100 tw-text-blue-600 tw-px-3 tw-py-1 tw-rounded-full tw-text-sm tw-font-bold">
              단순 메시지 플랫폼을 넘어선 회원 확보 솔루션
            </div>
            <h1 className="tw-text-[51px] tw-font-extrabold tw-leading-[1.1] tw-tracking-tight">

  고객을{" "}
  <span className="tw-text-[#5D87FF]">
    데이터로 전환
  </span>
  하세요

</h1>

            <p className="tw-text-lg tw-text-slate-500 tw-leading-relaxed">

              복잡한 회원가입 페이지 없이  
              <b>네이버 간편 동의</b>만으로 고객 정보를 수집합니다.

              <br /><br />

              <b>광고 → 동의 → 고객DB수집 → 아웃바운드까지  
              한번에 해보세요!</b>

            </p>

            <button
              onClick={() => setOpen(true)}
              className="tw-bg-[#5D87FF] tw-text-white tw-px-8 tw-py-4 tw-rounded-xl tw-font-semibold tw-shadow-lg hover:tw-bg-blue-600 tw-transition"
            >
              관심 고객 모집 시작하기
            </button>

          </div>


          {/* PHONE MOCKUP */}

          <div className="tw-flex tw-justify-center">
            <div className="tw-w-[300px] tw-h-[620px] tw-bg-black tw-rounded-[45px] tw-shadow-2xl tw-p-3">
              <div className="tw-bg-white tw-rounded-[32px] tw-h-full tw-flex tw-flex-col tw-overflow-hidden">
                {/* NAVER HEADER */}
                <div className="tw-bg-[#03C75A] tw-text-white tw-px-4 tw-py-3 tw-flex tw-justify-between tw-text-sm">
                  <div className="tw-font-bold">NAVER</div>
                </div>
                {/* CONTENT */}
                <div className="tw-p-5 tw-text-xs tw-space-y-4 tw-text-slate-600">
                  <div className="tw-text-center">
                    <div className="tw-w-12 tw-h-12 tw-bg-[#03C75A] tw-text-white tw-rounded-md tw-flex tw-items-center tw-justify-center tw-mx-auto tw-font-bold">
                      N
                    </div>
                  </div>
                  <p>
                    Application에서 <b>비즈팅</b>에 개인정보에 접근하는 것에 동의하십니까?
                  </p>
                  <div className="tw-bg-slate-50 tw-rounded-md tw-p-3 tw-space-y-2">
                    <div className="tw-font-semibold tw-text-slate-700">
                      필수 제공 항목
                    </div>
                    <div className="tw-grid tw-grid-cols-2 tw-gap-2">
                      <Item text="이름" />
                      <Item text="휴대전화번호" />
                      <Item text="이메일" />
                    </div>

                  </div>

                  <div className="tw-text-[11px] tw-text-slate-400">
                    동의 후 서비스 이용약관 및 개인정보처리방침에 따라 정보가 관리됩니다.
                  </div>
                </div>

                {/* BUTTON */}

                <div className="tw-grid tw-grid-cols-2 tw-mt-auto">
                  <button className="tw-bg-gray-300 tw-py-3 tw-text-sm">
                    취소
                  </button>
                  <button className="tw-bg-[#03C75A] tw-text-white tw-py-3 tw-text-sm tw-font-semibold">
                    동의하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* PROBLEM */}

        <section className="tw-space-y-12">

  <div className="tw-text-center tw-space-y-4">

    <div className="tw-text-red-500 tw-font-semibold tw-text-sm">
      PROBLEM
    </div>

    <h2 className="tw-text-4xl tw-font-bold">
      광고 고객을 이렇게 놓치고 있지 않나요?
    </h2>

    <p className="tw-text-slate-500">
      많은 기업들이 광고비는 쓰지만 고객 데이터는 남지 않습니다
    </p>

  </div>

  <div className="tw-grid md:tw-grid-cols-3 tw-gap-8">

    <ProblemCard
      number="01"
      title="랜딩페이지 제작 비용"
      text="외주 제작 비용이 높고 유지 관리도 어렵습니다."
    />

    <ProblemCard
      number="02"
      title="회원가입 이탈률"
      text="복잡한 가입 절차 때문에 고객이 중간에 이탈합니다."
    />

    <ProblemCard
      number="03"
      title="고객 데이터 관리"
      text="유입된 고객 정보를 체계적으로 관리하기 어렵습니다."
    />

  </div>

</section>

        {/* SOLUTION FLOW */}

        <section className="tw-bg-white tw-border tw-rounded-2xl tw-p-14">

          <h2 className="tw-text-3xl tw-font-bold tw-text-center tw-mb-12">
            관심고객 모집을 간편화합니다
          </h2>

          <div className="tw-grid md:tw-grid-cols-4 tw-gap-10">

            <Step icon={<Smartphone />} title="광고 도달" text="광고 클릭으로 고객 유입" />
            <Step icon={<MessageCircle />} title="3초 간편 가입" text="네이버 간편 로그인" />
            <Step icon={<Users />} title="관심고객 확보" text="고객 데이터 저장" />
            <Step icon={<Zap />} title="즉각적인 영업" text="관심고객 영업풀 확보" />

          </div>

        </section>


        {/* FEATURES */}

{/*         <section>

          <h2 className="tw-text-3xl tw-font-bold tw-text-center tw-mb-12">
            서비스 활용 방법
          </h2>

          <div className="tw-grid md:tw-grid-cols-3 tw-gap-8">

            <Feature
              icon={<Zap size={28} />}
              title="간편 고객 수집"
              text="복잡한 회원가입 없이 간편 동의로 고객 정보를 수집합니다."
            />

            <Feature
              icon={<TrendingUp size={28} />}
              title="대시보드"
              text="유입 고객 데이터를 대시보드에서 확인합니다."
            />

            <Feature
  icon={<MessageCircle size={28} />}
  title="아웃바운드 영업 활용"
  text="수집된 관심 고객 데이터를 활용해 상담 및 아웃바운드 영업을 진행할 수 있습니다."
/>

          </div>

        </section> */}


        {/* BENEFITS */}

        <section className="tw-space-y-12">

  <div className="tw-text-center tw-space-y-4">

    <div className="tw-text-[#03C75A] tw-font-semibold tw-text-sm">
      BENEFITS
    </div>

    <h2 className="tw-text-4xl tw-font-bold">
      타 플랫폼과 완전히 다른 비즈팅의 특별 기능
    </h2>

    <p className="tw-text-lg tw-font-semibold tw-text-slate-700">
  <span className="tw-text-[#03C75A] tw-font-bold">
    실제 관심 고객 확보까지 연결되는 
  </span>
  마케팅 데이터를 제공합니다.
</p>

  </div>

  <div className="tw-grid md:tw-grid-cols-3 tw-gap-8">

    <BenefitCard
      number="01"
      title="실제 메시지 도달률"
      text="단순 반응 지표를 넘어 실제 수신자에게 이 메시지가 도달했는지에 대한 지표를 제공합니다."
    />

    <BenefitCard
      number="02"
      title="관심 고객 전환률"
      text="실제 메시지 도달에서 진짜 회원으로 전환되는 진성 고객의 지표를 제공합니다."
    />

    <BenefitCard
      number="03"
      title="고객 획득 비용 절감"
      text="외주 렌딩페이지 없이 메시지 하나로 저렴하게 진성 고객 DB를 확보할 수 있습니다"
    />

  </div>

</section>


        {/* CTA */}
        <section className="tw-flex tw-justify-center">

  <div className="tw-relative tw-w-full tw-max-w-5xl tw-rounded-3xl tw-p-16 tw-text-center tw-overflow-hidden tw-bg-gradient-to-r tw-from-[#5D87FF] tw-to-[#4F46E5] tw-text-white tw-shadow-xl">

    {/* background glow */}

    <div className="tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-full tw-bg-white/5 tw-backdrop-blur-sm"></div>

    <div className="tw-relative tw-space-y-6">

      <div className="tw-text-sm tw-font-semibold tw-opacity-80">
        START NOW
      </div>

      <h2 className="tw-text-4xl tw-font-bold tw-leading-tight tw-text-white/90">
        광고 고객을 <br />
        <span className="tw-text-white/90">데이터로 전환하세요</span>
      </h2>

      <p className="tw-text-lg tw-opacity-90">
        네이버 회원가입으로 간편하게 고객데이터를 수집합니다
      </p>

      <div className="tw-flex tw-justify-center tw-pt-4">

        <button
          onClick={() => setOpen(true)}
          className="tw-bg-white tw-text-[#4F46E5] tw-font-semibold tw-px-10 tw-py-4 tw-rounded-xl tw-shadow-lg hover:tw-scale-105 tw-transition tw-flex tw-items-center tw-gap-2"
        >

          바로 시작하기 →

        </button>

      </div>

    </div>

  </div>

</section>

      </div>

      {open && (
        <ConsentModal
          onClose={() => setOpen(false)}
          onAgree={() => navigate("/DashboardLogin")}
        />
      )}

    </Layout>

  );

}


/* COMPONENTS */

function Item({ text }: any) {
  return (
    <div className="tw-flex tw-items-center tw-gap-1">
      <span className="tw-w-4 tw-h-4 tw-bg-green-500 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-white tw-text-[10px]">
        ✓
      </span>
      {text}
    </div>
  );
}

function Feature({ icon, title, text }: any) {

  return (

    <div className="tw-bg-white tw-border tw-rounded-2xl tw-p-8 tw-shadow-sm tw-space-y-4">

      <div className="tw-w-12 tw-h-12 tw-flex tw-items-center tw-justify-center tw-bg-blue-50 tw-text-[#5D87FF] tw-rounded-xl">
        {icon}
      </div>

      <h3 className="tw-text-lg tw-font-semibold">{title}</h3>

      <p className="tw-text-slate-500">{text}</p>

    </div>

  );

}

function Step({ icon, title, text }: any) {

  return (

    <div className="tw-text-center tw-space-y-4">

      <div className="tw-w-16 tw-h-16 tw-mx-auto tw-flex tw-items-center tw-justify-center tw-bg-blue-50 tw-text-[#5D87FF] tw-rounded-xl">
        {icon}
      </div>

      <h4 className="tw-font-semibold">{title}</h4>

      <p className="tw-text-sm tw-text-slate-500">{text}</p>

    </div>

  );

}

function ProblemCard({ number, title, text }: any) {

  return (

    <div className="tw-bg-white tw-border tw-border-red-100 tw-rounded-2xl tw-p-8 tw-shadow-sm tw-space-y-4 tw-relative">

      <div className="tw-text-red-500 tw-font-bold tw-text-2xl">
        {number}
      </div>

      <h3 className="tw-text-lg tw-font-semibold">
        {title}
      </h3>

      <p className="tw-text-slate-500">
        {text}
      </p>

      <div className="tw-absolute tw-top-6 tw-right-6 tw-text-red-200 tw-text-3xl">
        ✕
      </div>

    </div>

  );

}

function BenefitCard({ number, title, text }: any) {

  return (

    <div className="tw-bg-white tw-border tw-border-green-100 tw-rounded-2xl tw-p-8 tw-shadow-sm tw-space-y-4 tw-relative">

      <div className="tw-text-[#03C75A] tw-font-bold tw-text-2xl">
        {number}
      </div>

      <h3 className="tw-text-lg tw-font-semibold">
        {title}
      </h3>

      <p className="tw-text-slate-500">
        {text}
      </p>

      <div className="tw-absolute tw-top-6 tw-right-6 tw-text-green-200 tw-text-3xl">
        ✓
      </div>

    </div>

  );

}
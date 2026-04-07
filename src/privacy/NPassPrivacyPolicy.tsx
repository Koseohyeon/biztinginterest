import type { ReactNode } from "react";

// ── Types ──────────────────────────────────────────────
interface SectionProps {
  num: number;
  title: string;
  children: ReactNode;
}

interface ItemRowProps {
  circle: string;
  children: ReactNode;
}

interface SubRowProps {
  label: string;
  children: ReactNode;
}

interface NumRowProps {
  label: string;
  children: ReactNode;
}

interface NoteBoxProps {
  children: ReactNode;
}

interface DataTableProps {
  headers: string[];
  rows: ReactNode[][];
}

interface TocItem {
  num: number;
  label: string;
}

// ── Sub Components ──────────────────────────────────────
const Section = ({ num, title, children }: SectionProps) => (
  <div className="tw-bg-white tw-border tw-border-slate-200 tw-rounded-2xl tw-mb-5 tw-overflow-hidden">
    <div className="tw-flex tw-items-center tw-gap-3 tw-px-7 tw-py-5 tw-border-b tw-border-slate-100 tw-bg-slate-50">
      <div className="tw-flex tw-items-center tw-justify-center tw-w-8 tw-h-8 tw-rounded-lg tw-bg-[#0d3b8e] tw-text-white tw-text-sm tw-font-bold tw-shrink-0">
        {num}
      </div>
      <h2 className="tw-text-[15px] tw-font-bold tw-text-[#081f4a]">{title}</h2>
    </div>
    <div className="tw-px-7 tw-py-6">{children}</div>
  </div>
);

const ItemRow = ({ circle, children }: ItemRowProps) => (
  <div className="tw-flex tw-gap-2 tw-mb-3 tw-text-[14px] tw-text-slate-600 tw-leading-relaxed">
    <span className="tw-shrink-0 tw-font-bold tw-text-[#0d3b8e] tw-min-w-[20px]">{circle}</span>
    <span>{children}</span>
  </div>
);

const SubRow = ({ label, children }: SubRowProps) => (
  <div className="tw-flex tw-gap-2 tw-mb-2 tw-text-[13.5px] tw-text-slate-500 tw-leading-relaxed">
    <span className="tw-shrink-0 tw-text-slate-400 tw-min-w-[22px]">{label}</span>
    <span>{children}</span>
  </div>
);

const NumRow = ({ label, children }: NumRowProps) => (
  <div className="tw-flex tw-gap-2 tw-mb-2 tw-text-[13.5px] tw-text-slate-500 tw-leading-relaxed">
    <span className="tw-shrink-0 tw-text-slate-400 tw-min-w-[22px]">{label}</span>
    <span>{children}</span>
  </div>
);

const NoteBox = ({ children }: NoteBoxProps) => (
  <div className="tw-bg-blue-50 tw-border tw-border-blue-200 tw-rounded-xl tw-p-4 tw-text-[13.5px] tw-text-slate-600 tw-leading-relaxed tw-mt-3">
    {children}
  </div>
);

const DataTable = ({ headers, rows }: DataTableProps) => (
  <div className="tw-overflow-x-auto tw-rounded-xl tw-border tw-border-slate-200 tw-my-4">
    <table className="tw-w-full tw-border-collapse tw-text-[13px]">
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th
              key={i}
              className="tw-bg-[#081f4a] tw-text-white tw-px-3 tw-py-2 tw-text-left tw-font-semibold tw-whitespace-nowrap"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri} className={ri % 2 === 1 ? "tw-bg-slate-50" : ""}>
            {row.map((cell, ci) => (
              <td
                key={ci}
                className="tw-px-3 tw-py-2 tw-border-b tw-border-slate-200 tw-text-slate-600 tw-align-top tw-leading-relaxed"
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ── Main Component ──────────────────────────────────────
export default function NPassPrivacyPolicy() {
  const tocItems: TocItem[] = [
    { num: 1, label: "개인정보의 처리 목적" },
    { num: 2, label: "개인정보의 처리 및 보유 기간" },
    { num: 3, label: "처리하는 개인정보의 항목" },
    { num: 4, label: "자동 수집 장치의 설치·운영 및 거부" },
    { num: 5, label: "개인정보의 제3자 제공" },
    { num: 6, label: "개인정보 처리업무의 위탁" },
    { num: 7, label: "개인정보의 파기 절차 및 방법" },
    { num: 8, label: "개인정보의 안전성 확보조치" },
    { num: 9, label: "정보주체의 권리 및 행사방법" },
    { num: 10, label: "개인정보 보호책임자" },
    { num: 11, label: "개인정보 열람청구" },
    { num: 12, label: "권익침해 구제방법" },
    { num: 13, label: "개인정보 처리방침의 변경" },
  ];

  return (
    <div className="tw-bg-[#f5f7fc] tw-min-h-screen">
      {/* Top Bar */}
      <div className="tw-sticky tw-top-0 tw-z-50 tw-bg-[#081f4a] tw-flex tw-items-center tw-justify-between tw-h-[52px] tw-px-8 tw-shadow-lg">
        <span className="tw-text-white tw-font-bold tw-text-sm tw-tracking-widest">BIZTING</span>
        <span className="tw-text-white/60 tw-text-xs">N-Pass 서비스 수신자 개인정보처리방침</span>
      </div>

      <div className="tw-max-w-[860px] tw-mx-auto tw-px-6 tw-py-12 tw-pb-20">

        {/* Page Header */}
        <div
          className="tw-rounded-2xl tw-p-10 tw-mb-9 tw-text-white"
          style={{ background: "linear-gradient(135deg, #081f4a 0%, #1a3a80 100%)" }}
        >
          <div className="tw-inline-block tw-bg-white/15 tw-border tw-border-white/30 tw-rounded-full tw-px-4 tw-py-1 tw-text-xs tw-font-semibold tw-tracking-widest tw-mb-4">
            개인정보처리방침
          </div>
          <h1 className="tw-text-2xl tw-font-bold tw-leading-snug tw-mb-3 tw-text-white">
            비즈톡 비즈팅(Bizting) N-Pass 서비스 수신자 개인정보처리방침
          </h1>
          <div className="tw-flex tw-gap-5 tw-text-sm tw-text-white/65 tw-flex-wrap">
          </div>
        </div>

        {/* Intro */}
        <div className="tw-bg-white tw-border tw-border-slate-200 tw-rounded-2xl tw-mb-5">
          <div className="tw-px-7 tw-py-6">
            <p className="tw-text-[14.5px] tw-text-slate-600 tw-leading-relaxed">
              비즈톡 주식회사(이하 '회사')는 N-Pass 서비스를 통해 광고 메시지를 수신하고 서비스에 접속하신 분(이하 '정보주체')의 개인정보를 「개인정보 보호법」 및 관계 법령에 따라 적법하게 처리하고 안전하게 관리합니다. 이에 다음과 같이 개인정보 처리방침을 수립·공개합니다.
            </p>
          </div>
        </div>

        {/* TOC */}
        <div className="tw-bg-white tw-border tw-border-slate-200 tw-rounded-2xl tw-px-7 tw-py-6 tw-mb-9">
          <div className="tw-text-xs tw-font-bold tw-text-slate-400 tw-tracking-widest tw-uppercase tw-mb-4">목차</div>
          <div className="tw-grid tw-grid-cols-2 tw-gap-x-6 tw-gap-y-1">
            {tocItems.map((item) => (
              <a
                key={item.num}
                href={`#s${item.num}`}
                className="tw-flex tw-items-center tw-gap-2 tw-text-[13.5px] tw-text-slate-500 tw-no-underline tw-py-1 hover:tw-text-[#1a6ef5] tw-transition-colors"
              >
                <span className="tw-flex tw-items-center tw-justify-center tw-w-[22px] tw-h-[22px] tw-rounded-[4px] tw-bg-blue-50 tw-text-[#1a6ef5] tw-text-[11px] tw-font-bold tw-shrink-0">
                  {item.num}
                </span>
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* 1. 처리 목적 */}
        <div id="s1">
          <Section num={1} title="개인정보의 처리 목적">
            <p className="tw-text-[14.5px] tw-text-slate-600 tw-leading-relaxed tw-mb-4">
              회사는 다음의 목적을 위하여 최소한의 개인정보를 수집·처리합니다. 이용 목적이 변경되는 경우 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행합니다.
            </p>
            <ItemRow circle="①"><span><strong>본인 인증:</strong> 수신자 본인 확인 및 중복 가입 방지</span></ItemRow>
            <ItemRow circle="②"><span><strong>서비스 제공:</strong> N-Pass 솔루션을 통한 서비스 접근 허용 및 결과 전달</span></ItemRow>
            <ItemRow circle="③"><span><strong>제3자 제공:</strong> 정보주체가 참여한 캠페인을 운영하는 고객사에게 개인정보를 제3자 제공하며, 고객사의 회원 유치 및 마케팅 목적으로 활용</span></ItemRow>
            <ItemRow circle="④"><span><strong>법적 의무 이행:</strong> 관계 법령에 따른 기록 보관 및 분쟁 조정</span></ItemRow>
          </Section>
        </div>

        {/* 2. 보유 기간 */}
        <div id="s2">
          <Section num={2} title="개인정보의 처리 및 보유 기간">
            <p className="tw-text-[14.5px] tw-text-slate-600 tw-leading-relaxed tw-mb-4">
              회사는 N-Pass 서비스 제공 및 캠페인 참여 관리를 목적으로, 법령에서 정하는 경우를 제외하고 이용자의 동의 철회 또는 개인정보 처리 목적 달성 시까지 보유·이용하며, 이후 지체 없이 파기합니다. 단, 아래 사유에 따라 일정 기간 보관합니다.
            </p>
            <DataTable
              headers={["구분", "보유 기간"]}
              rows={[
                ["비즈팅 서비스 동의 철회 또는 목적 달성 시", "탈퇴·달성 후 5일 이내 복구 불가능한 방법으로 파기"],
                ["소비자 불만·분쟁 처리 기록 (전자상거래법)", "3년"],
                ["계약·청약철회 기록 (전자상거래법)", "5년"],
                ["웹사이트 방문 기록 (통신비밀보호법)", "3개월"],
              ]}
            />
          </Section>
        </div>

        {/* 3. 항목 */}
        <div id="s3">
          <Section num={3} title="처리하는 개인정보의 항목">
            <DataTable
              headers={["수집 경로", "수집 항목", "필수 여부"]}
              rows={[
                ["네이버 로그인", "이름, 휴대전화번호, 이메일", "필수"],
                ["서비스 이용 중 자동 생성", "IP Address, 접속 일시, 서비스 이용 기록", "자동 수집"],
              ]}
            />
          </Section>
        </div>

        {/* 4. 자동 수집 */}
        <div id="s4">
          <Section num={4} title="개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항">
            <p className="tw-text-[14.5px] tw-text-slate-600 tw-leading-relaxed tw-mb-4">
              이용자 개개인에게 개인화되고 맞춤화 된 서비스를 제공하기 위해서 회사는 이용자의 정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다. 쿠키는 웹사이트를 운영하는데 이용되는 서버가 사용자의 브라우저에게 보내는 조그마한 데이터 꾸러미로 이용자 컴퓨터의 하드디스크에 저장됩니다.
            </p>
            <ItemRow circle="①">
              <span>
                <strong>쿠키의 사용 목적</strong> 회원과 비회원의 접속 빈도나 방문 시간 등의 분석, 이용자의 취향과 관심분야의 파악 및 자취 추적, 각종 이벤트 참여 정도 및 방문 회수 파악 등을 통한 타겟 마케팅 및 개인 맞춤 서비스 제공
              </span>
            </ItemRow>
            <ItemRow circle="②">
              <span>
                <strong>쿠키 설정 거부 방법</strong> 이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서, 이용자는 웹브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다.
                <NoteBox>
                  * 설정방법 예(인터넷 익스플로러의 경우): 웹 브라우저 상단의 도구 &gt; 인터넷 옵션 &gt; 개인정보<br />(단, 쿠키 설치를 거부하였을 경우 로그인이 필요한 일부 서비스의 이용이 어려울 수 있습니다.)
                </NoteBox>
              </span>
            </ItemRow>
            <p className="tw-text-[14.5px] tw-text-slate-600 tw-leading-relaxed tw-mt-4 tw-mb-3">
              회사는 구글(Google)에서 제공하는 Google Analytics를 사용하여 웹사이트 이용 통계를 분석하고 서비스 개선에 활용하고 있습니다. Google Analytics를 통해 개인을 식별할 수 있는 정보는 수집되지 않습니다.
            </p>
            <ItemRow circle="①"><span><strong>Analytics 사용 목적:</strong> 서비스 이용 통계 분석 및 품질 개선</span></ItemRow>
            <ItemRow circle="②">
              <span>
                <strong>Analytics 설치·운영 및 거부 방법:</strong>
                <div className="tw-mt-2 tw-space-y-1">
                  <div className="tw-flex tw-gap-2 tw-text-[13.5px] tw-text-slate-500">
                    <span className="tw-text-[#1a6ef5]">•</span>
                    <span>Google에서 제공하는 Google Analytics 차단 브라우저 부가 기능(add-on)을 설치하여 수집을 거부할 수 있습니다.</span>
                  </div>
                  <div className="tw-flex tw-gap-2 tw-text-[13.5px] tw-text-slate-500">
                    <span className="tw-text-[#1a6ef5]">•</span>
                    <span>
                      [차단 기능 다운로드 링크]{" "}
                      <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer" className="tw-text-[#1a6ef5]">
                        https://tools.google.com/dlpage/gaoptout
                      </a>
                    </span>
                  </div>
                </div>
              </span>
            </ItemRow>
            <ItemRow circle="③"><span>Analytics 정보의 처리를 거부할 경우, 맞춤형 서비스 제공이 일부 제한될 수 있습니다.</span></ItemRow>
          </Section>
        </div>

        {/* 5. 제3자 제공 */}
        <div id="s5">
          <Section num={5} title="개인정보의 제3자 제공">
            <ItemRow circle="①">
              <span>
                회사는 N-Pass 서비스 제공을 위하여 수집한 개인정보를 해당 캠페인을 운영하는 고객사에게 제3자 제공합니다.
                <div className="tw-mt-2 tw-space-y-1">
                  <NumRow label="1)">비즈톡 주식회사(회사): 개인정보의 적법한 수집 및 시스템을 통한 안전한 제공을 담당합니다.</NumRow>
                  <NumRow label="2)">캠페인 운영 고객사(광고주): 제공받은 정보를 이용한 마케팅 및 고객 관리 업무를 수행합니다. 제3자 제공이 완료된 이후 해당 정보의 보호 및 활용에 대한 모든 법적 책임은 전적으로 고객사에 있습니다.</NumRow>
                </div>
              </span>
            </ItemRow>
            <ItemRow circle="②">
              <span>
                <strong>캠페인 운영 고객사로의 개인정보 제3자 제공</strong><br />
                수집된 정보는 정보주체의 사전 동의 하에 해당 캠페인을 주관하는 고객사에게 제3자 제공되어 마케팅 목적으로 활용됩니다.
              </span>
            </ItemRow>
            <DataTable
              headers={["항목", "내용"]}
              rows={[
                ["제공받는 자", "비즈팅 N-Pass 서비스 이용 고객사(이벤트/캠페인 주관 광고주)"],
                ["제공 목적", "N-Pass 솔루션을 통한 회원 유치 및 리텐션 마케팅"],
                ["제공 항목", "이름, 휴대전화번호, 이메일"],
                ["보유·이용기간", "제공받는 자(고객사)의 이용 목적 달성 시 또는 수신자의 동의 철회(파기 요청)시 지체 없이 파기"],
                ["동의 거부 시 불이익", "제3자 제공에 대한 동의 거부시, 해당 캠페인을 통해 제공되는 광고, 이벤트, 혜택 안내 등의 알림 서비스를 받을 수 없음."],
              ]}
            />
            <NoteBox>
              ※ 회사는 개인정보를 제공하기 전, 별도의 동의 화면을 통해 제공받는 자, 목적, 항목, 보유 기간 등을 수신자님께 명확히 안내하고 동의를 구합니다.
            </NoteBox>
          </Section>
        </div>

        {/* 6. 위탁 */}
        <div id="s6">
          <Section num={6} title="개인정보 처리업무의 위탁">
            <DataTable
              headers={["수탁업체", "위탁 내용", "보유·이용기간"]}
              rows={[
                ["AWS (Seoul Region)", "서비스 제공을 위한 서버 운영", "위탁 계약 종료 시"],
              ]}
            />
          </Section>
        </div>

        {/* 7. 파기 */}
        <div id="s7">
          <Section num={7} title="개인정보의 파기 절차 및 방법">
            <p className="tw-text-[14.5px] tw-text-slate-600 tw-leading-relaxed tw-mb-4">
              회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다. 단, 회사는 통계 목적의 정보에 한해 개인을 식별할 수 없도록 비식별화하여 보관할 수 있습니다.
            </p>
            <ItemRow circle="①">
              <span>
                <strong>파기계획 수립:</strong> 회사는 내부 방침 및 관련 법령에 따라 개인정보 파기계획을 수립합니다.
                <div className="tw-mt-2">
                  <NumRow label="1)">동의 철회 시 파기요청으로 간주하며, 동의 철회는 네이버 앱 또는 웹 &gt; 네이버ID &gt; 이력관리 &gt; 연결된 서비스 관리 &gt; 서비스 동의 &gt; 서비스 동의 철회를 할 수 있습니다.</NumRow>
                </div>
              </span>
            </ItemRow>
            <ItemRow circle="②"><span><strong>파기절차 및 기한:</strong> 이용자가 입력한 정보는 보유기간이 경과했거나 처리목적이 달성된 후 지체 없이 파기합니다.</span></ItemRow>
            <ItemRow circle="③">
              <span>
                <strong>파기방법:</strong> 회사는 처리하는 개인정보를 파기할 때에는 다음의 방법으로 파기합니다.
                <div className="tw-mt-2 tw-space-y-1">
                  <NumRow label="1)">전자적 파일 형태인 경우: 복원이 불가능한 방법으로 영구삭제</NumRow>
                  <NumRow label="2)">전자적 파일의 형태 외의 기록물, 인쇄물, 서면, 그 밖의 기록매체인 경우: 파쇄 또는 소각</NumRow>
                </div>
              </span>
            </ItemRow>
            <ItemRow circle="④"><span><strong>고객사에 제공된 데이터:</strong> 제공 시점에 고객사에게 이용 기간 및 파기 의무를 안내합니다.</span></ItemRow>
          </Section>
        </div>

        {/* 8. 안전성 확보 */}
        <div id="s8">
          <Section num={8} title="개인정보의 안전성 확보조치">
            <p className="tw-text-[14.5px] tw-text-slate-600 tw-leading-relaxed tw-mb-4">
              회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
            </p>
            <ItemRow circle="①">
              <span>
                <strong>기술적인 대책</strong>
                <div className="tw-mt-2 tw-space-y-1">
                  <NumRow label="1)">회사는 이용자의 개인정보를 관련 법률규정 및 내부정책에 따라 보안기능을 통해 안전하게 보호하고 있습니다.</NumRow>
                  <NumRow label="2)">회사는 백신프로그램을 이용하여 컴퓨터 바이러스에 의한 피해를 방지하기 위한 조치를 취하고 있습니다. 백신프로그램은 주기적으로 업데이트되며 갑작스러운 바이러스가 출현될 경우 백신이 나오는 즉시 이를 적용함으로써 개인정보가 침해되는 것을 방지하고 있습니다.</NumRow>
                  <NumRow label="3)">회사는 네트워크 상의 개인정보를 안전하게 전송할 수 있는 보안장치를 채택하고 있습니다.</NumRow>
                  <NumRow label="4)">회사는 해킹 등에 의해 이용자의 개인정보가 유출되는 것을 방지하기 위하여, 외부로부터의 침입을 차단하는 장치를 이용하고 있으며 24시간 X 365일 침입을 감시하고 있습니다.</NumRow>
                </div>
              </span>
            </ItemRow>
            <ItemRow circle="②">
              <span>
                <strong>관리적인 대책</strong>
                <div className="tw-mt-2">
                  <NumRow label="1)">회사는 개인정보 처리직원을 개인정보 관리업무를 수행하는 자 및 업무상 개인정보의 처리가 불가피 한 자로 엄격히 제한하고 담당직원에 대한 수시 교육을 통하여 개인정보처리방침의 준수를 강조하고 있습니다.</NumRow>
                </div>
              </span>
            </ItemRow>
          </Section>
        </div>

        {/* 9. 정보주체 권리 */}
        <div id="s9">
          <Section num={9} title="정보주체의 권리 및 행사방법">
            <ItemRow circle="①">
              <span>
                정보주체는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.
                <NoteBox>
                  ※ 만 14세 미만 아동에 관한 개인정보의 열람 등 요구는 법정대리인이 직접 해야 하며, 만 14세 이상의 미성년자인 정보주체는 정보주체의 개인정보에 관하여 미성년자 본인이 권리를 행사하거나 법정대리인을 통하여 권리를 행사할 수도 있습니다.
                </NoteBox>
              </span>
            </ItemRow>
            <ItemRow circle="②">
              <span>
                권리 행사는 회사에 대해 「개인정보 보호법」 시행령 제41조 제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며, 회사는 이에 대해 지체없이 조치하겠습니다.
                <div className="tw-mt-3 tw-space-y-1">
                  <SubRow label="•">행사 방법: 고객센터 1:1문의</SubRow>
                  <SubRow label="•">동의 철회: 네이버 앱 또는 웹 &gt; 네이버ID &gt; 이력관리 &gt; 연결된 서비스 관리에서 서비스 동의 &gt; 서비스 동의 철회를 할 수 있습니다.</SubRow>
                  <SubRow label="•">동의 철회 시 해당 고객사 서비스 이용이 중단될 수 있습니다.</SubRow>
                  <SubRow label="•">자동화된 결정의 거부 및 설명 요구: 1:1문의를 통해 요청 가능</SubRow>
                </div>
              </span>
            </ItemRow>
            <ItemRow circle="③"><span>권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수도 있습니다. 이 경우 "개인정보 처리 방법에 관한 고시(제2020-7호)" 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.</span></ItemRow>
            <ItemRow circle="④"><span>개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.</span></ItemRow>
            <ItemRow circle="⑤"><span>개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.</span></ItemRow>
            <ItemRow circle="⑥"><span>회사는 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.</span></ItemRow>
            <ItemRow circle="⑦"><span>정보주체가 마케팅 정보 수신에 대한 동의 또는 거부를 한 경우, 회사는 이를 즉시 반영하며 그 처리 결과를 이메일 또는 알림톡 등을 통해 통지합니다.</span></ItemRow>
          </Section>
        </div>

        {/* 10. 보호책임자 */}
        <div id="s10">
          <Section num={10} title="개인정보 보호책임자">
            <p className="tw-text-[14.5px] tw-text-slate-600 tw-leading-relaxed tw-mb-4">
              회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
            </p>
            <DataTable
              headers={["구분", "성명", "전화", "이메일"]}
              rows={[
                ["개인정보 보호책임자", "정의영", "1688-3764", "biztalk_privacy@biztalk.co.kr"],
                ["개인정보 보호담당자", "박영하", "070-8896-7539", "biztalk_privacy@biztalk.co.kr"],
              ]}
            />
          </Section>
        </div>

        {/* 11. 열람청구 */}
        <div id="s11">
          <Section num={11} title="개인정보 열람청구">
            <ItemRow circle="①">
              <span>
                정보주체는 「개인정보 보호법」 제35조에 따른 개인정보의 열람청구를 아래의 부서에 할 수 있습니다. 회사는 정보주체의 개인정보 열람청구가 신속하게 처리되도록 하겠습니다.
                <DataTable
                  headers={["부서명", "전화", "이메일"]}
                  rows={[
                    ["정보보호파트", "070-8896-7359", "biztalk_privacy@biztalk.co.kr"],
                  ]}
                />
              </span>
            </ItemRow>
          </Section>
        </div>

        {/* 12. 구제방법 */}
        <div id="s12">
          <Section num={12} title="권익침해 구제방법">
            <ItemRow circle="①">
              <span>
                정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.
                <div className="tw-mt-3 tw-space-y-1">
                  <NumRow label="1)">개인정보분쟁조정위원회: (국번없이) 1833-6972 (<a href="http://www.kopico.go.kr" target="_blank" rel="noreferrer" className="tw-text-[#1a6ef5]">www.kopico.go.kr</a>)</NumRow>
                  <NumRow label="2)">개인정보침해신고센터: (국번없이) 118 (<a href="http://privacy.kisa.or.kr" target="_blank" rel="noreferrer" className="tw-text-[#1a6ef5]">privacy.kisa.or.kr</a>)</NumRow>
                  <NumRow label="3)">대검찰청: (국번없이) 1301 (<a href="http://www.spo.go.kr" target="_blank" rel="noreferrer" className="tw-text-[#1a6ef5]">www.spo.go.kr</a>)</NumRow>
                  <NumRow label="4)">경찰청: (국번없이) 182 (<a href="http://ecrm.cyber.go.kr" target="_blank" rel="noreferrer" className="tw-text-[#1a6ef5]">ecrm.cyber.go.kr</a>)</NumRow>
                </div>
              </span>
            </ItemRow>
          </Section>
        </div>

        {/* 13. 변경 */}
        <div id="s13">
          <Section num={13} title="개인정보 처리방침의 변경">
            <div className="tw-flex tw-gap-6 tw-flex-wrap tw-bg-blue-50 tw-border tw-border-blue-200 tw-rounded-xl tw-px-5 tw-py-4 tw-text-[14px] tw-font-medium tw-text-[#081f4a]">
              <span><span className="tw-font-normal tw-text-slate-400 tw-mr-1">공고일자</span>2026.3.31</span>
              <span><span className="tw-font-normal tw-text-slate-400 tw-mr-1">시행일자</span>2026.5.1</span>
            </div>
          </Section>
        </div>

      </div>
    </div>
  );
}
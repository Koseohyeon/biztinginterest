import { useState } from "react";
import Layout from "../../components/Layout";

// ── Types ──────────────────────────────────────────────────────────────────
interface KakaoMomentTermsModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onAgree?: () => void;
}

interface ArticleProps {
  num: string;
  title: string;
  children: React.ReactNode;
  isNew?: boolean;
}

// ── Sub Components  ─────────────────────────────────────
const Article = ({ num, title, children }: ArticleProps) => (
  <div className="tw-mb-8">
    <div className="tw-flex tw-items-center tw-gap-2 tw-mb-3 tw-pb-2 tw-border-b tw-border-slate-100">
      <span className="tw-text-[#0d3b8e] tw-font-bold tw-text-[14px]">{num}</span>
      <span className="tw-text-[14px] tw-font-bold tw-text-slate-800">{title}</span>
    </div>
    {/* 본문 영역 */}
    <div className="tw-space-y-3 tw-pl-1">{children}</div>
  </div>
);

const Item = ({ num, children }: { num?: string; children: React.ReactNode }) => (
  <div className="tw-flex tw-gap-2 tw-text-[13px] tw-text-slate-600 tw-leading-relaxed">
    {num && (
      <span className="tw-shrink-0 tw-font-bold tw-text-slate-400 tw-min-w-[18px]">{num}</span>
    )}
    <div className="tw-flex-1">{children}</div>
  </div>
);

const SubItem = ({ num, children }: { num: string; children: React.ReactNode }) => (
  <div className="tw-flex tw-gap-2 tw-text-[12.5px] tw-text-slate-500 tw-leading-relaxed tw-ml-5 tw-mt-1">
    <span className="tw-shrink-0 tw-text-slate-400 tw-min-w-[18px]">{num}</span>
    <div className="tw-flex-1">{children}</div>
  </div>
);

const BanBadge = ({ label }: { label: string }) => (
  <span className="tw-inline-block tw-text-[#e11d48] tw-font-bold tw-mr-1.5 underline tw-decoration-rose-200">
    [{label}]
  </span>
);

const WarnBox = ({ children }: { children: React.ReactNode }) => (
  <div className="tw-mt-4 tw-p-3 tw-bg-slate-50 tw-rounded-lg tw-text-[12.5px] tw-text-slate-600 tw-border-l-2 tw-border-slate-300">
    {children}
  </div>
);

const ExternalLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer noopener"
    className="tw-text-blue-600 tw-underline tw-underline-offset-2 hover:tw-text-blue-800 tw-transition-colors"
  >
    {children}
  </a>
);
// ── Main Modal ─────────────────────────────────────────────────────────────
export default function KakaoMomentTermsModal({
  isOpen = true,
  onClose = () => { },
  onAgree = () => { },
}: KakaoMomentTermsModalProps) {
  const [checked, setChecked] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleAgree = () => {
    if (!checked) return;
    onAgree();
    onClose();
  };

  return (
    <Layout>
      <div
        className="tw-fixed tw-inset-0 tw-bg-black/40 tw-flex tw-items-center tw-justify-center tw-z-50"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="tw-bg-white tw-w-full tw-max-w-lg tw-rounded-2xl tw-p-8 tw-space-y-6">

          <h2 className="tw-text-xl tw-font-bold">
            비즈팅 카카오 모먼트 서비스 특별 이용약관
          </h2>

          <div className="tw-border tw-rounded-lg tw-p-4 tw-h-[500px] tw-overflow-y-auto">
            {/* ── 스크롤 본문 ── */}
            <div className="tw-flex-1 tw-overflow-y-auto tw-px-7 tw-py-5">

              {/* 전문 */}
              <div className="tw-text-[13.5px] tw-text-slate-500 tw-leading-relaxed tw-mb-8 tw-px-1">
                본 약관은 비즈톡 주식회사(이하 "회사")가 비즈팅 서비스 내에서 제공하는{" "}
                <strong className="tw-text-slate-800 tw-font-semibold">카카오 모먼트 메시지 서비스</strong>(이하 "본 서비스")에 한하여 적용됩니다.
                <br />
                <span className="tw-mt-1 tw-block">
                  본 서비스는 카카오톡 채널 친구를 대상으로 광고성 메시지를 발송할 수 있도록 회사가 중개하는 부가 서비스이며,
                  비즈팅 일반 이용약관과 별도로 운영됩니다.
                </span>
              </div>

              {/* 제1조 */}
              <Article num="제 1 조" title="목적">
                <Item>
                  본 약관은 비즈팅 서비스 내 카카오 모먼트 메시지 서비스의 이용 조건, 회원의 의무, 금지 행위 및 책임 등을 명확히 규정하여 회사와 회원 간의 권리·의무 관계를 정의하는 것을 목적으로 합니다.
                </Item>
              </Article>

              {/* 제2조 */}
              <Article num="제 2 조" title="용어의 정의">
                <Item num="1."><strong>본 서비스:</strong> 회사가 카카오 모먼트 플랫폼을 통해 제공하는 카카오톡 채널 친구 대상 광고성 메시지 발송 중개 서비스를 말합니다.</Item>
                <Item num="2."><strong>회원:</strong> 본 서비스를 신청하고 이용하는 고객사를 말합니다.</Item>
                <Item num="3."><strong>카카오톡 채널:</strong> 카카오가 운영하는 비즈니스용 카카오톡 계정으로, 채널 친구에게 메시지를 발송할 수 있는 기능을 제공하는 서비스를 말합니다.</Item>
                <Item num="4."><strong>채널 친구:</strong> 회원의 카카오톡 채널을 추가한 카카오톡 이용자를 말합니다.</Item>
                <Item num="5."><strong>카카오 모먼트 집행 가이드:</strong> 카카오가 정한 메시지 광고 집행 기준, 발송 유의사항 및 금지 행위 등을 규정한 공식 정책 문서를 말합니다.</Item>
                <Item num="6."><strong>광고성 메시지:</strong> 경제적 이득을 취할 목적으로 전송하는 전송자에 관한 정보 또는 전송자가 제공하는 재화·서비스에 관한 정보가 포함된 메시지를 말합니다.</Item>
              </Article>

              {/* 제3조 */}
              <Article num="제 3 조" title="서비스 내용 및 이용 조건">
                <Item num="1.">본 서비스는 회원의 카카오톡 채널 친구에게 광고성 메시지를 발송할 수 있도록 회사가 중개하는 서비스이며, 전화번호 등 별도의 개인정보 없이 채널 친구 목록 기반으로 발송됩니다.</Item>
                <Item num="2.">본 서비스 이용을 위해서는 회원이 카카오 비즈니스 채널을 보유하고 있어야 합니다.</Item>
                <Item num="3.">서비스 이용 요금, 발송 단가 등 세부 조건은 별도 상품 안내 페이지에서 확인할 수 있으며, 회사의 정책에 따라 변경될 수 있습니다.</Item>
                <Item num="4.">포인트 충전, 환불, 소멸 등 결제 관련 사항은 <strong>비즈팅 일반 이용약관의 포인트 관련 규정</strong>을 따릅니다.</Item>
                <Item num="5.">본 서비스 이용을 위해 회원의 <strong>카카오톡 채널 아이디</strong>를 수집·저장하며, 이는 메시지 발송 중개 및 서비스 운영 목적으로만 활용됩니다. 채널 아이디는 서비스 해지 또는 이용 계약 종료 시까지 보관 후 파기됩니다.</Item>
              </Article>

              {/* 제4조 */}
              <Article num="제 4 조" title="카카오 모먼트 가이드 준수 의무" isNew>
                <Item num="1.">
                  회원은 본 서비스 이용 시 카카오가 정한 아래 공식 가이드를 반드시 숙지하고 준수하여야 합니다.
                </Item>

                {/* 가이드 링크 영역 (텍스트 중심 + 자동 줄바꿈 적용) */}
                <div className="tw-ml-6 tw-mt-2 tw-mb-4 tw-space-y-3">
                  {/* 가이드 1 */}
                  <div className="tw-ml-6 tw-mt-2 tw-mb-4 tw-space-y-2">

                    {/* 가이드 1 */}
                    <div className="tw-bg-yellow-50 tw-border tw-border-yellow-200 tw-rounded-lg tw-px-4 tw-py-3 tw-flex tw-items-start tw-gap-3">
                      <span className="tw-text-yellow-500 tw-text-base tw-mt-0.5 tw-shrink-0">📋</span>
                      <div className="tw-min-w-0 tw-flex-1"> {/* tw-min-w-0 가 있어야 자식의 줄바꿈이 정상 작동합니다 */}
                        <p className="tw-text-[12.5px] tw-font-bold tw-text-slate-700 tw-mb-1">
                          카카오 모먼트 메시지 광고 집행 가이드
                        </p>
                        {/* 주소가 길 때 박스를 뚫고 나가지 않게 강제 줄바꿈 처리 */}
                        <div className="tw-break-all tw-text-[12px] tw-leading-relaxed">
                          <ExternalLink href="https://kakaobusiness.gitbook.io/main/ad/moment/messagead/guide">
                            https://kakaobusiness.gitbook.io/main/ad/moment/messagead/guide
                          </ExternalLink>
                        </div>
                      </div>
                    </div>

                    {/* 가이드 2 */}
                    <div className="tw-bg-yellow-50 tw-border tw-border-yellow-200 tw-rounded-lg tw-px-4 tw-py-3 tw-flex tw-items-start tw-gap-3">
                      <span className="tw-text-yellow-500 tw-text-base tw-mt-0.5 tw-shrink-0">📋</span>
                      <div className="tw-min-w-0 tw-flex-1">
                        <p className="tw-text-[12.5px] tw-font-bold tw-text-slate-700 tw-mb-1">
                          카카오 모먼트 메시지 광고 발송 유의사항
                        </p>
                        {/* 주소가 길 때 박스를 뚫고 나가지 않게 강제 줄바꿈 처리 */}
                        <div className="tw-break-all tw-text-[12px] tw-leading-relaxed">
                          <ExternalLink href="https://kakaobusiness.gitbook.io/main/ad/moment/messagead/operations">
                            https://kakaobusiness.gitbook.io/main/ad/moment/messagead/operations
                          </ExternalLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Item num="2.">광고성 메시지 발송 시 다음 필수 표시 사항을 반드시 준수하여야 합니다.</Item>
                <SubItem num="①"><strong>(광고) 표시:</strong> 광고성 내용이 포함된 메시지 맨 앞에 "(광고)"를 표시하여야 합니다.</SubItem>
                <SubItem num="②"><strong>전송자 정보 표시:</strong> 전송자 명칭 및 연락처(전화번호 또는 주소 중 하나)를 메시지 본문 상단에 작성하여야 합니다.</SubItem>
                <SubItem num="③"><strong>수신거부 방법 표시:</strong> 수신 거부 및 수신동의 철회 방법을 광고 본문에 구체적으로 표기하여야 합니다.</SubItem>
                <Item num="3.">본 서비스는 예약 발송 방식으로 운영되며, 광고성 메시지는<strong>오전 8시부터 오후 8시 50분까지의 시간대 내에서만 예약 및 발송이 가능합니다.</strong></Item>
                <Item num="4.">법정 사전심의 대상 광고의 경우, 사전심의를 받은 내용으로만 발송하여야 합니다.</Item>
                <Item num="5.">가이드 위반 시 카카오의 운영정책에 따라 메시지 발송이 <strong>최소 30일 이상 또는 영구적으로 제한</strong>될 수 있으며, 이로 인한 모든 불이익은 회원이 부담합니다.</Item>
              </Article>

              {/* 제5조 */}
              <Article num="제 5 조" title="금지 행위">
                <p className="tw-text-[12.5px] tw-text-slate-500 tw-mb-2">회원은 본 서비스를 이용하여 다음 각 호의 내용이 포함된 메시지를 발송하여서는 안 됩니다.</p>
                <Item num="1."><BanBadge label="음란·선정" />과도한 신체 노출, 성적 불쾌감을 유발하는 내용, 성매매를 권유·유도·조장하는 내용</Item>
                <Item num="2."><BanBadge label="폭력·혐오" />폭력·살인·협박·공포심을 조성하는 내용, 인종·성별·종교·장애 등을 이유로 한 혐오표현 및 차별 내용</Item>
                <Item num="3."><BanBadge label="허위·과장" />사실과 다르거나 과장된 광고 내용, 확인되지 않은 사실을 사실인 것처럼 표현하는 내용, 근거 없는 최상급 표현</Item>
                <Item num="4."><BanBadge label="타인 권리 침해" />지식재산권(특허권·상표권·저작권 등)·초상권 침해, 타인의 상품·영업과 혼동을 유발하는 내용</Item>
                <Item num="5."><BanBadge label="청소년 유해" />청소년보호법에 따른 유해 매체물·유해 약물·유해 물건 관련 내용 (성인인증 채널 적용 시 일부 예외 허용)</Item>
                <Item num="6."><BanBadge label="카카오 서비스 침해" />카카오 로고·상표·서비스명 무단 사용, 카카오 서비스로 오인될 수 있는 내용</Item>
                <Item num="7."><BanBadge label="제한 업종" />마약·불법대출·도박·성매매·불법의약품, 금감원 미등록 유사투자자문업, 전문의약품, 불법 금융 서비스 등 관계 법령에 따라 광고가 금지된 업종 및 상품</Item>
                <Item num="8."><BanBadge label="가격 표시 위반" />허위 종전 가격 비교, 실제와 다른 할인율 표시, 일부 이용자에게만 적용되는 쿠폰·카드 할인가를 판매가로 표시하는 행위</Item>
                <Item num="9."><BanBadge label="야간 발송" />오후 9시 ~ 다음 날 오전 8시 사이 광고성 메시지 발송</Item>
                <Item num="10.">상기 각 호 외에 현행 법령(정보통신망법, 표시광고법 등) 위반 또는 카카오 모먼트 집행 가이드에 따라 발송이 금지된 모든 내용</Item>
                <WarnBox>
                  ⚠️ <strong>가이드 위반 사례 예시</strong><br />
                  광고 표기 없이 할인·특가 안내 발송 / 정보성으로 설정하여 광고성 메시지 발송 / 금감원 미등록 투자자문 관련 메시지 발송 / 수신거부 방법 미표기 / 야간 시간대 광고성 메시지 발송 등
                </WarnBox>
              </Article>

              {/* 제6조 */}
              <Article num="제 6 조" title="회원의 책임">
                <Item num="1.">회원은 본 서비스를 통해 발송하는 모든 메시지의 내용에 대한 법적 책임을 부담합니다. 가이드 미준수로 인한 모든 불이익(발송 제한, 채널 정지, 법적 제재 등)은 회원이 전적으로 부담합니다.</Item>
                <Item num="2.">회원이 발송한 메시지로 인해 제3자(수신자, 카카오, 관계 기관 등)로부터 이의제기, 손해배상청구 또는 행정처분이 발생한 경우, 회원은 자신의 비용으로 회사를 면책시켜야 합니다.</Item>
                <Item num="3.">회원은 카카오 모먼트 집행 가이드 및 발송 유의사항의 변경 사항을 스스로 확인할 책임이 있으며, 변경된 가이드를 인지하지 못하여 발생한 불이익에 대해 회사는 책임을 지지 않습니다.</Item>
                <Item num="4.">지식재산권 침해, 허위·과장 광고 등으로 발생한 법적 문제에 대한 책임은 전적으로 회원에게 있습니다.</Item>
              </Article>

              {/* 제7조 */}
              <Article num="제 7 조" title="회사의 면책">
                <Item num="1.">회사는 메시지 발송 중개 역할을 수행하며, 회원이 발송하는 메시지의 내용·적법성에 대한 책임을 부담하지 않습니다.</Item>
                <Item num="2.">회사는 카카오의 정책 변경, 시스템 장애 등 카카오 측 사유로 인한 메시지 발송 불가 또는 지연에 대해 책임을 지지 않습니다.</Item>
                <Item num="3.">회원이 카카오 모먼트 가이드 또는 관계 법령을 위반하여 채널 정지, 서비스 이용 제한 등의 불이익이 발생한 경우, 이에 대한 모든 책임은 회원이 부담하며 회사는 책임을 지지 않습니다.</Item>
              </Article>

              {/* 제8조 */}
              <Article num="제 8 조" title="서비스 이용 제한">
                <Item num="1.">회사는 회원이 다음 각 호에 해당하는 경우 사전 통보 없이 서비스 이용을 즉시 제한할 수 있습니다.</Item>
                <SubItem num="①">카카오 모먼트 집행 가이드 또는 관계 법령을 위반한 경우</SubItem>
                <SubItem num="②">카카오로부터 채널 메시지 발송 제한 또는 채널 정지 조치를 받은 경우</SubItem>
                <SubItem num="③">제5조 금지 행위에 해당하는 메시지를 발송하거나 발송을 시도한 경우</SubItem>
                <SubItem num="④">비즈팅 일반 이용약관을 위반한 경우</SubItem>
              </Article>

              {/* 제9조 */}
              <Article num="제 9 조" title="기타">
                <Item num="1.">본 약관은 비즈팅 일반 이용약관에 우선하여 적용되며, 본 약관에 명시되지 않은 사항은 비즈팅 일반 이용약관을 따릅니다.</Item>
                <Item num="2.">회사는 카카오 모먼트 정책 변경, 관계 법령 개정 등 필요한 경우 사전 고지 후 본 약관을 변경할 수 있습니다.</Item>
                <Item num="3.">본 서비스는 회사의 사정에 따라 사전 고지 후 종료될 수 있습니다.</Item>
                <Item num="4.">본 약관에 동의함으로써 카카오 모먼트 집행 가이드 및 발송 유의사항을 숙지하고 준수할 것에 동의한 것으로 간주합니다.</Item>
              </Article>

            </div>
          </div>

          <label className="tw-flex tw-items-center tw-gap-2">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            <span className="tw-text-[13px] tw-text-slate-700 tw-leading-relaxed">
              위 특별 이용약관 및{" "}
              <ExternalLink href="https://kakaobusiness.gitbook.io/main/ad/moment/messagead/guide">
                카카오 모먼트 집행 가이드
              </ExternalLink>
              ,{" "}
              <ExternalLink href="https://kakaobusiness.gitbook.io/main/ad/moment/messagead/operations">
                발송 유의사항
              </ExternalLink>
              을 충분히 확인하였으며, 이에 동의하고 서비스를 이용하겠습니다.
            </span>
          </label>
          <div className="tw-flex tw-justify-end tw-gap-3 tw-mt-6">
            <button
              type="button"
              onClick={() => {
                onClose && onClose();
              }}
              className="tw-bg-slate-100 tw-text-slate-600 tw-px-5 tw-py-2.5 tw-rounded-xl tw-font-medium hover:tw-bg-slate-200 tw-border-0"
            >
              취소
            </button>
            <button
              type="button"
              disabled={!checked}
              onClick={() => {
                handleAgree();
              }}
              className="tw-bg-[#5D87FF] tw-text-white tw-px-8 tw-py-2.5 tw-rounded-xl tw-font-bold disabled:tw-opacity-40 tw-border-0 hover:tw-bg-[#4a6cf0] tw-transition-all"
            >
              동의하고 시작
            </button>
          </div>

        </div>
      </div>
    </Layout>
  );
}
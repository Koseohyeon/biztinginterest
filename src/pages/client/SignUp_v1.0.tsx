import { useState, useRef, type ReactNode } from "react";
import { Check, X, ExternalLink } from "lucide-react";

interface AgreedState {
  terms: boolean;
  spam: boolean;
  privacy: boolean;
  marketing: boolean;
}

interface MarketingSubState {
  sms: boolean;
  email: boolean;
}

type CheckboxSize = 17 | 20 | 22;

function Toast({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div className="tw-fixed tw-left-1/2 tw-bottom-8 tw--translate-x-1/2 tw-flex tw-items-center tw-gap-2 tw-rounded-lg tw-bg-[#111827] tw-px-[18px] tw-py-[10px] tw-text-[13.5px] tw-text-white tw-shadow-lg tw-z-[100]">
      <Check size={15} className="tw-text-[#0F766E]" />
      {message}
    </div>
  );
}

function Checkbox({
  checked,
  onChange,
  size = 20,
}: {
  checked: boolean;
  onChange: () => void;
  size?: CheckboxSize;
}) {
  const sizeClass =
    size === 22
      ? "tw-w-[22px] tw-h-[22px]"
      : size === 17
      ? "tw-w-[17px] tw-h-[17px]"
      : "tw-w-5 tw-h-5";
  const iconSize = size === 22 ? 14 : size === 17 ? 11 : 13;

  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={checked}
      className={`${sizeClass} tw-flex tw-flex-shrink-0 tw-items-center tw-justify-center tw-rounded-[5px] tw-border-[1.5px] tw-cursor-pointer ${
        checked ? "tw-bg-[#0F766E] tw-border-[#0F766E]" : "tw-bg-white tw-border-[#C7CBD1]"
      }`}
    >
      {checked && <Check size={iconSize} className="tw-text-white" strokeWidth={3} />}
    </button>
  );
}

function RequiredTag({ required }: { required: boolean }) {
  return (
    <span
      className={`tw-rounded tw-px-[7px] tw-py-[2px] tw-text-[11px] tw-font-medium ${
        required ? "tw-bg-[#FEF3E2] tw-text-[#B45309]" : "tw-bg-[#F3F4F6] tw-text-[#6B7280]"
      }`}
    >
      {required ? "필수" : "선택"}
    </span>
  );
}

function TableCell({
  children,
  compact,
  head,
  rowSpan,
}: {
  children: ReactNode;
  compact: boolean;
  head?: boolean;
  rowSpan?: number;
}) {
  const pad = compact ? "tw-px-2 tw-py-[6px]" : "tw-px-3 tw-py-[10px]";
  const size = compact ? "tw-text-[11.5px]" : "tw-text-[13px]";
  if (head) {
    return (
      <th
        className={`tw-border tw-border-[#E5E7EB] tw-bg-[#F3F4F6] tw-text-center tw-font-medium tw-text-[#111827] tw-align-top ${pad} ${size}`}
      >
        {children}
      </th>
    );
  }
  return (
    <td
      rowSpan={rowSpan}
      className={`tw-border tw-border-[#E5E7EB] tw-align-top tw-leading-[1.55] tw-text-[#374151] ${pad} ${size}`}
    >
      {children}
    </td>
  );
}

// 개인정보 수집·이용 동의 상세 내용 (인라인 박스 / 전문보기 모달 공용)
function PrivacyContent({ compact }: { compact: boolean }) {
  return (
    <div>
      <p className={`tw-mb-[10px] tw-leading-[1.6] tw-text-[#374151] ${compact ? "tw-text-xs" : "tw-text-[13.5px]"}`}>
        비즈팅 주식회사는 회원가입 및 서비스 제공을 위해 다음과 같이 개인정보를 수집·이용합니다.
      </p>

      <p className={`tw-mt-3 tw-mb-[6px] tw-font-medium tw-text-[#111827] ${compact ? "tw-text-xs" : "tw-text-[13px]"}`}>
        가. 회원가입 및 계정 관리
      </p>
      <table className="tw-mb-[14px] tw-w-full tw-border-collapse">
        <thead>
          <tr>
            <TableCell compact={compact} head>수집방법</TableCell>
            <TableCell compact={compact} head>수집항목</TableCell>
            <TableCell compact={compact} head>수집 및 이용목적</TableCell>
            <TableCell compact={compact} head>보유기간</TableCell>
            <TableCell compact={compact} head>법적근거</TableCell>
          </tr>
        </thead>
        <tbody>
          <tr>
            <TableCell compact={compact} rowSpan={2}>회원가입 및 계정 관리</TableCell>
            <TableCell compact={compact}>
              [필수] 회사명, 사업자번호, 주소, 사업자등록증, 업태, 업종, 서비스 담당자 정보(아이디, 비밀번호,
              휴대폰번호, 이름, 이메일), 법인명(국문 - 개인사업자 제외)
            </TableCell>
            <TableCell compact={compact}>
              회원가입 의사 확인, 서비스 이용 자격 유지·관리, 부정이용 방지, 중복가입 확인
            </TableCell>
            <TableCell compact={compact}>
              회원 탈퇴 시까지
              <br />
              단, 부정이용기록(ID): 1년
            </TableCell>
            <TableCell compact={compact}>개인정보 보호법 제15조 (계약 체결·이행) 제1항 제4호</TableCell>
          </tr>
          <tr>
            <TableCell compact={compact}>CI</TableCell>
            <TableCell compact={compact}>본인 식별·인증</TableCell>
            <TableCell compact={compact}>본인인증 처리 후 즉시 파기</TableCell>
            <TableCell compact={compact}>개인정보 보호법 제15조 (계약 체결·이행) 제1항 제4호</TableCell>
          </tr>
        </tbody>
      </table>

      <p className={`tw-mt-3 tw-mb-[6px] tw-font-medium tw-text-[#111827] ${compact ? "tw-text-xs" : "tw-text-[13px]"}`}>
        나. 서비스 이용에 따라 자동으로 생성·수집되는 정보
      </p>
      <table className="tw-mb-[14px] tw-w-full tw-border-collapse">
        <thead>
          <tr>
            <TableCell compact={compact} head>수집항목</TableCell>
            <TableCell compact={compact} head>수집 및 이용목적</TableCell>
          </tr>
        </thead>
        <tbody>
          <tr>
            <TableCell compact={compact}>
              IP Address, 쿠키(Cookie), 방문일시, 서비스 이용 기록, 불량 이용 기록, ID, 접속 시간, 인증 시간, 접속 경로
            </TableCell>
            <TableCell compact={compact}>접속 관리, 부정 이용 방지, 이용환경 분석 및 서비스 품질 개선</TableCell>
          </tr>
        </tbody>
      </table>

      <div className={`tw-rounded-lg tw-border tw-border-[#0F766E]/30 tw-bg-[#E6F3F1] ${compact ? "tw-p-[10px]" : "tw-p-[14px]"}`}>
        <p className={`tw-mb-[6px] tw-font-medium tw-text-[#0F766E] ${compact ? "tw-text-xs" : "tw-text-[13px]"}`}>
          동의 거부 및 철회에 관한 안내
        </p>
        <p className={`tw-leading-[1.6] tw-text-[#0B5750] ${compact ? "tw-text-[11.5px]" : "tw-text-[12.5px]"}`}>
          귀하는 위 개인정보 수집·이용에 대한 동의를 거부할 권리가 있으며, 동의 후에도 회원 탈퇴를 통해 동의를
          철회할 수 있습니다. 다만, 위 개인정보는 비즈팅 회원가입 및 서비스 제공에 필요한 필수 정보이므로,
          동의를 거부하거나 철회할 경우 회원가입 또는 서비스 이용이 제한될 수 있습니다.
        </p>
      </div>
    </div>
  );
}

function PrivacyModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="tw-fixed tw-inset-0 tw-z-[200] tw-flex tw-items-center tw-justify-center tw-bg-black/50 tw-p-5"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="tw-max-h-[85vh] tw-w-full tw-max-w-[720px] tw-overflow-y-auto tw-rounded-xl tw-bg-white tw-px-8 tw-py-7"
      >
        <div className="tw-mb-[18px] tw-flex tw-items-start tw-justify-between">
          <h2 className="tw-text-lg tw-font-medium tw-text-[#111827]">(필수) 개인정보 수집 및 이용 동의</h2>
          <button type="button" onClick={onClose} aria-label="닫기" className="tw-cursor-pointer tw-p-1">
            <X size={20} className="tw-text-[#6B7280]" />
          </button>
        </div>
        <PrivacyContent compact={false} />
      </div>
    </div>
  );
}

export default function TermsAgreement() {
  const [agreed, setAgreed] = useState<AgreedState>({ terms: false, spam: false, privacy: false, marketing: false });
  const [marketingSub, setMarketingSub] = useState<MarketingSubState>({ sms: false, email: false });
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fireToast = (msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2000);
  };

  const requiredKeys: (keyof AgreedState)[] = ["terms", "spam", "privacy"];
  const allRequiredAgreed = requiredKeys.every((k) => agreed[k]);
  const allChecked = allRequiredAgreed && agreed.marketing;

  const toggleAll = () => {
    const next = !allChecked;
    setAgreed({ terms: next, spam: next, privacy: next, marketing: next });
    setMarketingSub({ sms: next, email: next });
    if (next) fireToast("모든 항목에 동의했습니다");
  };

  const toggleItem = (key: keyof AgreedState) => {
    setAgreed((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleMarketing = () => {
    setAgreed((prev) => {
      const nextVal = !prev.marketing;
      setMarketingSub({ sms: nextVal, email: nextVal });
      if (nextVal) fireToast("마케팅 수집 및 활용, SMS·E-mail 수신에 모두 동의했습니다");
      return { ...prev, marketing: nextVal };
    });
  };

  const toggleMarketingSub = (key: keyof MarketingSubState, label: string) => {
    setMarketingSub((prev) => {
      const nextVal = !prev[key];
      if (nextVal) fireToast(`${label}에 동의했습니다`);
      return { ...prev, [key]: nextVal };
    });
  };

  const steps = [
    { n: 1, label: "이용약관" },
    { n: 2, label: "정보입력" },
    { n: 3, label: "완료" },
  ];
  const currentStep = 1;

  return (
    <div className="tw-min-h-full tw-bg-[#F3F4F6] tw-p-8 tw-font-sans">
      <div className="tw-mx-auto tw-max-w-[680px] tw-overflow-hidden tw-rounded-2xl tw-bg-white tw-shadow-[0_1px_2px_rgba(16,24,40,0.04),0_4px_16px_rgba(16,24,40,0.06)]">
        {/* 로고 헤더 */}
        <div className="tw-px-4 tw-pb-5 tw-pt-[22px]">
          <div className="tw-flex tw-items-center tw-justify-center tw-gap-2">
            <div className="tw-flex tw-h-[30px] tw-w-[30px] tw-items-center tw-justify-center tw-rounded-lg tw-bg-[#4C5FE8]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </div>
            <span className="tw-text-[19px] tw-font-medium tw-text-[#111827]">비즈팅</span>
          </div>
        </div>

        <div className="tw-border-t tw-border-[#E5E7EB]" />

        {/* 스텝 인디케이터 */}
        <div className="tw-flex tw-justify-center tw-px-4 tw-pb-2 tw-pt-[26px]">
          <div className="tw-flex tw-items-center">
            {steps.map((s, i) => (
              <div key={s.n} className="tw-flex tw-items-center">
                <div className="tw-flex tw-w-[84px] tw-flex-col tw-items-center tw-gap-[6px]">
                  <div
                    className={`tw-flex tw-h-[34px] tw-w-[34px] tw-items-center tw-justify-center tw-rounded-full tw-text-sm tw-font-medium ${
                      s.n <= currentStep ? "tw-bg-[#2563EB] tw-text-white" : "tw-bg-[#F1F2F4] tw-text-[#B0B4BC]"
                    }`}
                  >
                    {s.n}
                  </div>
                  <span
                    className={`tw-text-[12.5px] ${
                      s.n === currentStep ? "tw-font-medium tw-text-[#2563EB]" : "tw-text-[#B0B4BC]"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && <div className="tw-mb-5 tw-w-14 tw-border-t tw-border-dashed tw-border-[#D6D9DE]" />}
              </div>
            ))}
          </div>
        </div>

        <div className="tw-px-8 tw-pb-8 tw-pt-4">
          <h1 className="tw-mb-5 tw-text-[19px] tw-font-medium tw-text-[#111827]">이용약관 동의</h1>

          {/* 전체 동의 */}
          <div className="tw-mb-4 tw-flex tw-items-start tw-gap-[10px]">
            <Checkbox checked={allChecked} onChange={toggleAll} size={22} />
            <div>
              <p className="tw-text-base tw-font-medium tw-text-[#111827]">전체 동의 합니다.</p>
              <p className="tw-mt-1 tw-text-[12.5px] tw-text-[#6B7280]">
                이용약관, 스팸제한 정책, 개인정보 수집 이용, 마케팅 수집 및 활용에 모두 동의합니다.
              </p>
            </div>
          </div>

          <div className="tw-mb-5 tw-border-t tw-border-dashed tw-border-[#E5E7EB]" />

          {/* 이용약관 - 링크형 */}
          <div className="tw-mb-4 tw-border-b tw-border-[#E5E7EB] tw-pb-4">
            <div className="tw-flex tw-items-center tw-gap-[10px]">
              <Checkbox checked={agreed.terms} onChange={() => toggleItem("terms")} />
              <span className="tw-text-sm tw-font-medium tw-text-[#111827]">비즈팅 서비스 이용약관 동의</span>
              <RequiredTag required />
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="tw-ml-auto tw-inline-flex tw-items-center tw-gap-1 tw-text-[12.5px] tw-font-medium tw-text-[#0F766E]"
              >
                자세히 보기
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* 스팸제한 정책 동의 - 링크형 */}
          <div className="tw-mb-4 tw-border-b tw-border-[#E5E7EB] tw-pb-4">
            <div className="tw-flex tw-items-center tw-gap-[10px]">
              <Checkbox checked={agreed.spam} onChange={() => toggleItem("spam")} />
              <span className="tw-text-sm tw-font-medium tw-text-[#111827]">스팸제한 정책 동의</span>
              <RequiredTag required />
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="tw-ml-auto tw-inline-flex tw-items-center tw-gap-1 tw-text-[12.5px] tw-font-medium tw-text-[#0F766E]"
              >
                자세히 보기
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* 개인정보 수집 이용 동의 - 인라인 상세 + 전문보기 모달 */}
          <div className="tw-mb-4 tw-border-b tw-border-[#E5E7EB] tw-pb-4">
            <div className="tw-mb-[10px] tw-flex tw-items-center tw-gap-[10px]">
              <Checkbox checked={agreed.privacy} onChange={() => toggleItem("privacy")} />
              <span className="tw-text-sm tw-font-medium tw-text-[#111827]">개인정보 수집 및 이용 동의</span>
              <RequiredTag required />
            </div>
            <div className="tw-max-h-[220px] tw-overflow-y-auto tw-rounded-lg tw-border tw-border-[#E5E7EB] tw-bg-[#F9FAFB] tw-p-3">
              <PrivacyContent compact />
            </div>
            <div className="tw-mt-2 tw-flex tw-justify-end">
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="tw-inline-flex tw-cursor-pointer tw-items-center tw-gap-1 tw-text-[12.5px] tw-font-medium tw-text-[#0F766E]"
              >
                전문보기
                <ExternalLink size={12} />
              </button>
            </div>
          </div>

          {/* 마케팅 수집 및 활용 동의 - SMS/이메일 개별 토글 */}
          <div>
            <div className="tw-mb-[10px] tw-flex tw-items-center tw-gap-[10px]">
              <Checkbox checked={agreed.marketing} onChange={toggleMarketing} />
              <span className="tw-text-sm tw-font-medium tw-text-[#111827]">마케팅 수집 및 활용 동의</span>
              <RequiredTag required={false} />
            </div>
            <ul className="tw-mb-3 tw-list-disc tw-pl-[18px]">
              {[
                "수집 목적: 이벤트, 프로모션 및 맞춤형 서비스 정보 제공",
                "수집 항목: 이름, 연락처, 이메일 주소",
                "보유 및 이용 기간: 동의 철회 시 또는 회원 탈퇴 시",
                "동의 거부권: 귀하는 마케팅 수집 및 활용 동의를 거부할 수 있으며, 동의하지 않아도 서비스 이용에는 제한이 없습니다.",
              ].map((t, i) => (
                <li key={i} className="tw-text-xs tw-leading-[1.7] tw-text-[#6B7280]">
                  {t}
                </li>
              ))}
            </ul>

            <div className="tw-flex tw-gap-5">
              <label
                className="tw-flex tw-cursor-pointer tw-items-center tw-gap-[7px]"
                onClick={() => toggleMarketingSub("sms", "이벤트 및 혜택 SMS 수신")}
              >
                <Checkbox checked={marketingSub.sms} onChange={() => {}} size={17} />
                <span className="tw-text-[13px] tw-text-[#111827]">이벤트 및 혜택 SMS 수신</span>
              </label>
              <label
                className="tw-flex tw-cursor-pointer tw-items-center tw-gap-[7px]"
                onClick={() => toggleMarketingSub("email", "이벤트 및 혜택 E-mail 수신")}
              >
                <Checkbox checked={marketingSub.email} onChange={() => {}} size={17} />
                <span className="tw-text-[13px] tw-text-[#111827]">이벤트 및 혜택 E-mail 수신</span>
              </label>
            </div>
          </div>

          <button
            type="button"
            disabled={!allRequiredAgreed}
            className={`tw-mt-7 tw-w-full tw-rounded-lg tw-py-[13px] tw-text-[14.5px] tw-font-medium tw-text-white ${
              allRequiredAgreed ? "tw-cursor-pointer tw-bg-[#111827]" : "tw-cursor-not-allowed tw-bg-[#D1D5DB]"
            }`}
          >
            다음
          </button>
          <p className="tw-mt-[10px] tw-text-center tw-text-[11.5px] tw-text-[#9CA3AF]">
            (일부 동의 항목) 약관 동의 후 다음 절차를 진행할 수 있습니다
          </p>
        </div>
      </div>

      {showModal && <PrivacyModal onClose={() => setShowModal(false)} />}
      <Toast message={toast} />
    </div>
  );
}
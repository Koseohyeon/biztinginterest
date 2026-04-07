import { useState } from "react";

export default function ConsentModal({ onClose, onAgree }: any) {

  const [check, setCheck] = useState(false);

  return (

    <div className="tw-fixed tw-inset-0 tw-bg-black/40 tw-flex tw-items-center tw-justify-center tw-z-50">

      <div className="tw-bg-white tw-w-full tw-max-w-lg tw-rounded-2xl tw-p-8 tw-space-y-6">

        <h2 className="tw-text-xl tw-font-bold">
          'N-Pass' 서비스 이용 및 보안 서약
        </h2>
        <div className="tw-border tw-rounded-lg tw-p-4 tw-h-40 tw-overflow-y-auto tw-text-sm tw-text-slate-600">
          <p className="tw-font-semibold">['N-Pass' 서비스 이용 및 보안 서약]</p>

          <p className="tw-mt-2">
            본 기능을 활성화하면 비즈팅이 수집한 메시지 수신자의 개인정보를 제 3자 제공받아 처리하게 됩니다.
            안전한 데이터 활용을 위해 아래 보안 사항에 서약해 주시기 바랍니다.
          </p>

          <ul className="tw-mt-2 tw-list-disc tw-pl-5">
            <li>
              기술적 보호: 관리자 계정의 2단계 인증(이메일 인증)을 필수 적용하며,
              내부 접근 권한을 최소화하여 관리하겠습니다.
            </li>
            <li>
              목적 외 사용 금지: 비즈팅으로부터 제 3자 제공받은 정보를 명시된 마케팅 및
              관심고객모집 기능 목적 외로 사용하거나 외부에 유출하지 않겠습니다.
            </li>
            <li>
              데이터 파기: 이용 목적이 달성되거나 유저가 동의를 철회한 경우,
              관련 법령에 따라 5일 이내에 복구 불가능한 방법으로 파기하겠습니다.
            </li>
            <li>
              책임 귀속: 당사(고객사)는 개인정보를 제공받은 자로서 마케팅 활용 등
              당사 담당 처리 범위에서 발생하는 법적 책임을 부담하며,
              비즈팅은 당사의 처리 영역에서 발생한 사고에 대해 면책됨에 동의합니다.
            </li>
          </ul>

          <p className="tw-mt-2">
            본 제공은 제 3자 제공으로 이루어지며, 정보주체의 동의를 기반으로 고객사에게 제공됩니다.
          </p>
        </div>

        <label className="tw-flex tw-items-center tw-gap-2">

          <input
            type="checkbox"
            checked={check}
            onChange={(e) => setCheck(e.target.checked)}
          />

          위 내용에 서약합니다.

        </label>

        <div className="tw-flex tw-justify-end tw-gap-3">

          <button
            onClick={onClose}
            className="tw-border tw-px-4 tw-py-2 tw-rounded-lg"
          >
            취소
          </button>

          <button
            disabled={!check}
            onClick={onAgree}
            className="tw-bg-[#5D87FF] tw-text-white tw-px-6 tw-py-2 tw-rounded-lg disabled:tw-opacity-40"
          >
            동의하고 시작
          </button>

        </div>

      </div>

    </div>

  );

}
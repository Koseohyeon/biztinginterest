import { useState } from "react";

export default function ConsentModal({ onClose, onAgree }: any) {

  const [check, setCheck] = useState(false);

  return (

    <div className="tw-fixed tw-inset-0 tw-bg-black/40 tw-flex tw-items-center tw-justify-center tw-z-50">

      <div className="tw-bg-white tw-w-full tw-max-w-lg tw-rounded-2xl tw-p-8 tw-space-y-6">

        <h2 className="tw-text-xl tw-font-bold">
          개인정보 수집 및 이용 동의
        </h2>

        <div className="tw-border tw-rounded-lg tw-p-4 tw-h-40 tw-overflow-y-auto tw-text-sm tw-text-slate-600">

          본 서비스는 상담 신청을 위해 이름, 연락처 정보를 수집합니다.

          수집된 정보는 상담 진행 및 서비스 제공을 위해서만 사용됩니다.

          이용자는 개인정보 제공을 거부할 수 있으며  
          거부 시 서비스 이용이 제한될 수 있습니다.

        </div>

        <label className="tw-flex tw-items-center tw-gap-2">

          <input
            type="checkbox"
            checked={check}
            onChange={(e) => setCheck(e.target.checked)}
          />

          개인정보 수집 및 이용에 동의합니다.

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
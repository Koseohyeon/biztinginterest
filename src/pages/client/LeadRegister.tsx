import { useState } from "react";

export default function LeadRegister() {

  const [agree, setAgree] = useState(false);

  const submit = () => {

    if (!agree) {
      alert("개인정보 동의 필요");
      return;
    }

    alert("신청 완료");
  };

  return (
    <div className="tw-max-w-xl tw-mx-auto tw-p-6">

      <h1 className="tw-text-2xl tw-font-bold tw-mb-6">
        관심 고객 등록
      </h1>

      <input
        className="tw-w-full tw-border tw-p-3 tw-rounded-lg tw-mb-3"
        placeholder="이름"
      />

      <input
        className="tw-w-full tw-border tw-p-3 tw-rounded-lg tw-mb-3"
        placeholder="전화번호"
      />

      <input
        className="tw-w-full tw-border tw-p-3 tw-rounded-lg tw-mb-3"
        placeholder="이메일"
      />

      <div className="tw-flex tw-gap-2 tw-mb-4">

        <input
          type="checkbox"
          onChange={() => setAgree(!agree)}
        />

        <span className="tw-text-sm">
          개인정보 수집 동의
        </span>

      </div>

      <button
        onClick={submit}
        className="tw-w-full tw-bg-[#D87FFF] tw-text-white tw-py-3 tw-rounded-lg"
      >
        신청
      </button>

    </div>
  );
}
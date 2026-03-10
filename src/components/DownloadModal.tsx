import { useState } from "react";

export default function DownloadModal({ onConfirm, onClose }: any) {

  const [reason, setReason] = useState("");

  const today = new Date();

  const password =
    today.getFullYear() +
    String(today.getMonth() + 1).padStart(2, "0") +
    String(today.getDate()).padStart(2, "0");

  const handleDownload = () => {

    if (reason.trim() === "") {
      alert("공백 입력 불가");
      return;
    }

    onConfirm(reason);
  };

  return (
    <div
      className="tw-fixed tw-inset-0 tw-bg-black/40 tw-flex tw-items-center tw-justify-center tw-z-50"
      onClick={onClose}  // 배경 클릭 시 닫힘
    >

      <div
        className="tw-bg-white tw-w-full tw-max-w-md tw-rounded-2xl tw-p-7 tw-shadow-xl"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 막기
      >

        <h2 className="tw-text-xl tw-font-bold tw-mb-4">
          엑셀 다운로드
        </h2>

        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="다운로드 사유 입력"
          className="tw-w-full tw-border tw-border-slate-200 tw-rounded-xl tw-p-4 tw-h-28 tw-mb-4"
        />

        <div className="tw-bg-blue-50 tw-text-[#5D87FF] tw-text-sm tw-rounded-lg tw-p-3 tw-mb-2 tw-text-center">
          파일 비밀번호 : <b>{password}</b>
        </div>

        <p className="tw-text-xs tw-text-slate-500 tw-text-center tw-mb-6">
          파일 비밀번호는 파일을 다운로드하는 년월일 입니다. <br />
          ex. 20260312
        </p>

        <div className="tw-flex tw-gap-3">

          <button
            type="button"
            onClick={onClose}
            className="tw-flex-1 tw-bg-slate-100 tw-py-3 tw-rounded-xl"
          >
            취소
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="tw-flex-1 tw-bg-[#5D87FF] tw-text-white tw-rounded-xl tw-py-3"
          >
            다운로드
          </button>

        </div>

      </div>

    </div>
  );
}
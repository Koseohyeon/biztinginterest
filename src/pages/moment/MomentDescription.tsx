import { useState } from "react";
import Layout from "../../components/Layout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function KakaoMomentGuide() {
  const [channelId, setChannelId] = useState("");
 const [submittedId, setSubmittedId] = useState<string | null>(null);

  const isSubmitted = submittedId !== null;

  const handleSubmit = () => {
    if (!channelId.trim()) {
      toast.error("채널 검색용 아이디를 입력해주세요.");
      return;
    }

    setSubmittedId(channelId);
    toast.success("아이디가 정상적으로 전송되었습니다.");
  };

  const handleReset = () => {
    setChannelId("");
    setSubmittedId(null);
    toast.info("수정 모드로 변경되었습니다.");
  };

  return (
    <Layout>
      <div className="tw-max-w-3xl tw-mx-auto tw-p-6">
        {/* Header */}
        <div className="tw-mb-8">
          <h1 className="tw-text-2xl tw-font-bold tw-mb-2">
            카카오 모먼트 연동하기
          </h1>
          <p className="tw-text-gray-600">
            아래 단계를 순서대로 진행하시면 서비스를 이용할 수 있습니다.
          </p>
        </div>
        {/* 안내 카드 */}
<div className="tw-bg-blue-50 tw-border tw-border-blue-200 tw-rounded-2xl tw-p-5 tw-mb-6">
  <div className="tw-flex tw-items-start tw-gap-3">
    <div className="tw-text-[#5D87FF] tw-font-bold">ℹ️</div>
    <div>
      <p className="tw-text-sm tw-text-gray-800 tw-font-medium">
        사전 안내
      </p>
      <p className="tw-text-sm tw-text-gray-700 tw-mt-1">
        해당 기능은 <span className="tw-font-semibold">카카오 비즈니스 인증이 완료된 채널</span>이 있어야 이용할 수 있습니다.
      </p>
    </div>
  </div>
</div>
        {/* Step 1 */}
        <div className="tw-bg-white tw-rounded-2xl tw-shadow tw-p-6 tw-mb-6">
          <div className="tw-flex tw-items-center tw-gap-3 tw-mb-4">
            <div className="tw-w-8 tw-h-8 tw-bg-yellow-400 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-font-bold">
              1
            </div>
            <h2 className="tw-text-lg tw-font-semibold">
              채널 검색용 아이디 입력
            </h2>
          </div>

          <p className="tw-text-gray-600 tw-mb-4">
            카카오 채널의 검색용 아이디를 입력해 주세요.
          </p>

          <div className="tw-bg-gray-50 tw-rounded-lg tw-p-4 tw-text-sm tw-text-gray-700 tw-mb-4">
            카카오 비즈니스 → 로그인 → 채널 → 검색용 아이디
          </div>

          {/* Input */}
          <div className="tw-flex tw-gap-2 tw-mb-4">
            <input
              type="text"
              value={channelId}
              disabled={isSubmitted}
              onChange={(e) => setChannelId(e.target.value)}
              placeholder="채널 검색용 아이디 입력"
              className="tw-flex-1 tw-border tw-rounded-lg tw-px-3 tw-py-2 
              focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#5D87FF]
              disabled:tw-bg-gray-100 disabled:tw-cursor-not-allowed"
            />

            <button
              onClick={handleSubmit}
              disabled={isSubmitted || !channelId.trim()}
              className={`tw-px-4 tw-py-2 tw-rounded-lg tw-text-white
                ${
                  isSubmitted || !channelId.trim()
                    ? "tw-bg-gray-400 tw-cursor-not-allowed"
                    : "tw-bg-[#5D87FF] hover:tw-opacity-80"
                }`}
            >
              전송
            </button>
          </div>

          {/* 제출 완료 상태 */}
          {submittedId && (
            <div className="tw-bg-green-50 tw-border tw-border-green-200 tw-rounded-lg tw-p-4 tw-flex tw-justify-between tw-items-center">
              <span className="tw-text-sm">
                입력된 아이디: <b>{submittedId}</b>
              </span>

              <button
                onClick={handleReset}
                className="tw-text-sm tw-text-[#5D87FF] hover:tw-underline"
              >
                수정하기
              </button>
            </div>
          )}

          <a
            href="https://business.kakao.com/_jxcupG/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="tw-inline-block tw-mt-4 tw-bg-[#5D87FF] tw-text-white tw-px-4 tw-py-2 tw-rounded-lg hover:tw-opacity-80 tw-no-underline"
          >
            카카오 비즈니스 바로가기
          </a>
        </div>

        {/* Step 2 */}
        <div className="tw-bg-white tw-rounded-2xl tw-shadow tw-p-6 tw-mb-6">
          <div className="tw-flex tw-items-center tw-gap-3 tw-mb-4">
            <div className="tw-w-8 tw-h-8 tw-bg-yellow-400 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-font-bold">
              2
            </div>
            <h2 className="tw-text-lg tw-font-semibold">관리자 초대</h2>
          </div>

          <p className="tw-text-gray-600 tw-mb-4">
            아래 계정을 채널 관리자에 추가해 주세요.
          </p>

          <div className="tw-bg-gray-50 tw-rounded-lg tw-p-4 tw-text-sm tw-text-gray-700 tw-mb-4">
            경로: 채널 → 관리자 → 관리자 초대
            <br />
            계정: <span className="tw-font-semibold">tf@biztalk.co.kr</span>
          </div>

          <a
            href="https://business.kakao.com/_jxcupG/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="tw-inline-block tw-bg-[#5D87FF] tw-text-white tw-px-4 tw-py-2 tw-rounded-lg hover:tw-opacity-80 tw-no-underline"
          >
            관리자 초대하러 가기
          </a>
        </div>

        {/* Step 3 */}
        <div className="tw-bg-white tw-rounded-2xl tw-shadow tw-p-6 tw-mb-6">
          <div className="tw-flex tw-items-center tw-gap-3 tw-mb-4">
            <div className="tw-w-8 tw-h-8 tw-bg-yellow-400 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-font-bold">
              3
            </div>
            <h2 className="tw-text-lg tw-font-semibold">승인 대기</h2>
          </div>

          <p className="tw-text-gray-600 tw-mb-4">
            관리자 승인까지 영업일 기준 1~2일 소요됩니다.
          </p>

          <div className="tw-bg-yellow-50 tw-rounded-lg tw-p-4 tw-text-sm tw-text-gray-700">
            승인 이후 가입하신 휴대폰 번호로 알림톡이 발송됩니다.
          </div>
        </div>

      {/* Footer */}
<div className="tw-bg-gray-100 tw-rounded-2xl tw-p-6 tw-text-center">
  <p className="tw-mb-4 tw-text-gray-700">
    궁금한 사항이 있다면 아래 메일 혹은 1:1 문의를 남겨주시기 바랍니다.
  </p>

  {/* 이메일 텍스트 */}
  <p className="tw-mb-4 tw-text-gray-800">
    tf@biztalk.co.kr
  </p>

  <div className="tw-flex tw-justify-center">
    <a
      href="1:1문의 경로"
      target="_blank"
      rel="noopener noreferrer"
      className="tw-bg-[#5D87FF] tw-text-white tw-px-4 tw-py-2 tw-rounded-lg hover:tw-opacity-80 tw-no-underline"
    >
      1:1 문의
    </a>
  </div>
</div>
        {/* Toast 위치 */}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar
        />
      </div>
    </Layout>
  );
}
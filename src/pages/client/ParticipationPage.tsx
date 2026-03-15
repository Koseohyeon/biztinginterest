import React from "react";

const ParticipationPage: React.FC = () => {

  const handleJoin = () => {
    // 실제 네이버 로그인 URL로 교체
    window.location.href = "/naver-login";
  };

  return (
    <div className="tw-min-h-screen tw-bg-gray-50 tw-flex tw-items-center tw-justify-center tw-px-4">
      <div className="tw-w-full tw-max-w-sm tw-bg-white tw-rounded-2xl tw-shadow-sm tw-p-6">

        {/* 상단 안내 */}
        <div className="tw-text-center tw-mb-6">
          <h1 className="tw-text-lg tw-font-semibold tw-text-gray-800">
            안내 페이지
          </h1>
          <p className="tw-text-sm tw-text-gray-500 tw-mt-1">
            메시지를 통해 안내된 내용입니다
          </p>
        </div>

        {/* 메시지 설명 */}
        <div className="tw-text-center tw-mb-6">
          <h2 className="tw-text-xl tw-font-bold tw-text-gray-900 tw-mb-3">
            간편 참여 안내
          </h2>

          <p className="tw-text-sm tw-text-gray-600 tw-leading-relaxed">
            문자 메시지에서 안내된 이벤트 또는 혜택에<br />
            간편하게 참여하실 수 있습니다.
          </p>
        </div>

        {/* 설명 박스 */}
        <div className="tw-bg-gray-50 tw-rounded-xl tw-p-4 tw-mb-6">
          <ul className="tw-text-sm tw-text-gray-600 tw-space-y-2">
            <li>✔ 간편 로그인으로 빠르게 참여</li>
            <li>✔ 참여 후 상세 안내 확인</li>
          </ul>
        </div>

        {/* CTA 버튼 */}
        <button
          onClick={handleJoin}
          className="tw-w-full tw-bg-green-500 tw-text-white tw-font-semibold tw-py-3 tw-rounded-xl tw-shadow-sm hover:tw-bg-green-600 tw-transition"
        >
          이동하기
        </button>

        {/* 하단 안내 */}
        <p className="tw-text-xs tw-text-gray-400 tw-text-center tw-mt-4 tw-leading-relaxed">
          안내 목적 외 다른 용도로 사용되지 않습니다.
        </p>

      </div>
    </div>
  );
};

export default ParticipationPage;
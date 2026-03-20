import{ useState } from "react";
import Layout from "../../components/Layout";

export default function KakaoMomentGuide() {
  const [channelId, setChannelId] = useState("");
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!channelId.trim()) return;
    setSubmittedId(channelId);
  };

  const handleReset = () => {
    setChannelId("");
    setSubmittedId(null);
  };

  return (
    <Layout>
      <div className="tw-max-w-3xl tw-mx-auto tw-p-6">
        {/* Header */}
        <div className="tw-mb-8">
          <h1 className="tw-text-2xl tw-font-bold tw-mb-2">
            카카오 모먼트 연동 가이드
          </h1>
          <p className="tw-text-gray-600">
            아래 단계를 순서대로 진행하시면 서비스를 이용할 수 있습니다.
          </p>
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

          {/* Input Area */}
          <div className="tw-flex tw-gap-2 tw-mb-4">
            <input
              type="text"
              value={channelId}
              onChange={(e) => setChannelId(e.target.value)}
              placeholder="채널 검색용 아이디 입력"
              className="tw-flex-1 tw-border tw-rounded-lg tw-px-3 tw-py-2 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-yellow-400"
            />
            <button
              onClick={handleSubmit}
              className="tw-bg-black tw-text-white tw-px-4 tw-py-2 tw-rounded-lg hover:tw-opacity-80"
            >
              전송
            </button>
          </div>

          {/* Submitted State */}
          {submittedId && (
            <div className="tw-bg-green-50 tw-border tw-border-green-200 tw-rounded-lg tw-p-4 tw-flex tw-justify-between tw-items-center">
              <span className="tw-text-sm">
                입력된 아이디: <b>{submittedId}</b>
              </span>
              <button
                onClick={handleReset}
                className="tw-text-sm tw-text-red-500 hover:tw-underline"
              >
                잘못 입력했어요 (재입력)
              </button>
            </div>
          )}

          <a
            href="https://business.kakao.com/_jxcupG/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="tw-inline-block tw-mt-4 tw-bg-gray-800 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg hover:tw-opacity-80"
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
            <h2 className="tw-text-lg tw-font-semibold">
              관리자 초대
            </h2>
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
            className="tw-inline-block tw-bg-black tw-text-white tw-px-4 tw-py-2 tw-rounded-lg hover:tw-opacity-80"
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
            <h2 className="tw-text-lg tw-font-semibold">
              승인 대기
            </h2>
          </div>

          <p className="tw-text-gray-600 tw-mb-4">
            관리자 승인까지 영업일 기준 1~2일 소요됩니다.
          </p>

          <div className="tw-bg-yellow-50 tw-rounded-lg tw-p-4 tw-text-sm tw-text-gray-700">
            기능 활성화 후 가입하신 휴대폰 번호로 알림톡이 발송됩니다.
          </div>
        </div>

        {/* Footer CTA */}
        <div className="tw-bg-gray-100 tw-rounded-2xl tw-p-6 tw-text-center">
          <p className="tw-mb-4 tw-text-gray-700">
            궁금한 사항이 있다면 문의해 주세요.
          </p>

          <div className="tw-flex tw-justify-center tw-gap-3 tw-flex-wrap">
            <a
              href="mailto:tf@biztalk.co.kr"
              className="tw-bg-white tw-border tw-px-4 tw-py-2 tw-rounded-lg hover:tw-shadow"
            >
              이메일 문의
            </a>

            <button className="tw-bg-black tw-text-white tw-px-4 tw-py-2 tw-rounded-lg hover:tw-opacity-80">
              1:1 문의
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

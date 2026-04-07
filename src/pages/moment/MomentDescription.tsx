import { useState } from "react";
import Layout from "../../components/Layout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 이미지 경로 설정 (assets 폴더 기준)
import guideChannelImg from "../../assets/moment_search_id_img.png"; 
import guideAdminImg from "../../assets/moment_manager_invite.png";

export default function KakaoMomentGuide() {
  const [channelId, setChannelId] = useState("");
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  
  // 이미지 확대 모달 상태 관리
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

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

  // 이미지 카드 컴포넌트 (안내 문구 + 확대 기능)
  const ImageCard = ({ src, alt, caption }: { src: string; alt: string; caption: string }) => (
    <div 
      className="tw-relative tw-group tw-cursor-zoom-in tw-mb-6 tw-rounded-xl tw-overflow-hidden tw-border tw-border-gray-200 tw-shadow-sm"
      onClick={() => setSelectedImg(src)}
    >
      <img 
        src={src} 
        alt={alt} 
        className="tw-w-full tw-h-auto tw-transition-transform tw-duration-300 group-hover:tw-scale-[1.02]"
      />
      <div className="tw-absolute tw-inset-0 tw-bg-black/40 tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity tw-flex tw-items-center tw-justify-center">
        <div className="tw-bg-black/70 tw-text-white tw-px-5 tw-py-2.5 tw-rounded-full tw-text-sm tw-font-bold tw-flex tw-items-center tw-gap-2 tw-shadow-lg">
          🔍 클릭하면 크게 볼 수 있습니다
        </div>
      </div>
      <div className="tw-bg-gray-50 tw-p-3 tw-text-xs tw-text-gray-500 tw-italic">
        {caption}
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="tw-max-w-3xl tw-mx-auto tw-p-6">
        {/* Header */}
        <div className="tw-mb-8">
          <h1 className="tw-text-2xl tw-font-bold tw-mb-2">
            카카오 모먼트 연동하기
          </h1>
          <p className="tw-text-gray-600">
            아래 가이드를 따라 설정을 완료하시면 비즈팅 서비스를 바로 이용하실 수 있습니다.
          </p>
        </div>

        {/* 사전 안내 카드 */}
        <div className="tw-bg-blue-50 tw-border tw-border-blue-200 tw-rounded-2xl tw-p-5 tw-mb-8">
          <div className="tw-flex tw-items-start tw-gap-3">
            <div className="tw-text-[#5D87FF] tw-text-xl">ℹ️</div>
            <div>
              <p className="tw-text-sm tw-text-gray-800 tw-font-bold">
                시작 전 확인해주세요!
              </p>
              <p className="tw-text-sm tw-text-gray-700 tw-mt-1">
                본 서비스는 <span className="tw-font-semibold tw-text-blue-600">카카오 비즈니스 인증이 완료된 채널</span>이 반드시 필요합니다.
              </p>
            </div>
          </div>
        </div>

        {/* Step 1: 검색용 아이디 */}
        <div className="tw-bg-white tw-rounded-2xl tw-shadow-md tw-p-6 tw-mb-8 tw-border tw-border-gray-100">
          <div className="tw-flex tw-items-center tw-gap-3 tw-mb-4">
            <div className="tw-w-8 tw-h-8 tw-bg-yellow-400 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-font-bold">
              1
            </div>
            <h2 className="tw-text-lg tw-font-semibold">채널 검색용 아이디 입력</h2>
          </div>

          <p className="tw-text-gray-600 tw-mb-4">
            카카오 채널의 <strong>검색용 아이디</strong>를 확인 후 아래에 입력해 주세요.
          </p>

          <div className="tw-bg-gray-50 tw-rounded-lg tw-p-4 tw-text-sm tw-text-gray-700 tw-mb-6">
            <p className="tw-font-medium tw-mb-2">💡 확인 경로</p>
            <p className="tw-text-gray-500">카카오 비즈니스 → 로그인 → 채널 → 채널 정보 → 검색용 아이디</p>
          </div>

          <ImageCard 
            src={guideChannelImg} 
            alt="채널 정보 확인 가이드" 
            caption="* 채널 정보 메뉴에서 '검색용 아이디' 항목을 복사하여 사용하세요."
          />

          {/* Input Area */}
          <div className="tw-flex tw-border-0 tw-gap-2 tw-mb-4">
            <input
              type="text"
              value={channelId}
              disabled={isSubmitted}
              onChange={(e) => setChannelId(e.target.value)}
              placeholder="예: @bizting_cs"
              className="tw-flex-1 tw-border tw-rounded-lg tw-px-4 tw-py-2.5 
              focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#5D87FF]
              disabled:tw-bg-gray-100 disabled:tw-text-gray-500"
            />
            <button
              onClick={handleSubmit}
              disabled={isSubmitted || !channelId.trim()}
              className={`tw-border-0 tw-px-6 tw-py-2 tw-rounded-lg tw-text-white tw-font-medium
                ${isSubmitted || !channelId.trim()
                  ? "tw-bg-gray-300 tw-cursor-not-allowed"
                  : "tw-bg-[#5D87FF] hover:tw-bg-[#4b70e6]"
                }`}
            >
              전송
            </button>
          </div>

          {submittedId && (
            <div className="tw-bg-green-50 tw-border tw-border-green-100 tw-rounded-lg tw-p-4 tw-flex tw-justify-between tw-items-center tw-mb-4">
              <span className="tw-text-sm tw-text-green-700">
                연동된 아이디: <strong className="tw-ml-1">{submittedId}</strong>
              </span>
              <button
                onClick={handleReset}
                className="tw-border-0 tw-text-sm tw-text-[#5D87FF] tw-font-semibold hover:tw-underline"
              >
                수정하기
              </button>
            </div>
          )}

          {/* Step 1 하단 바로가기 버튼 추가 */}
          <a
            href="https://business.kakao.com/_jxcupG/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="tw-border-0 tw-block tw-text-center tw-bg-[#5D87FF] tw-text-white tw-px-4 tw-py-3 tw-rounded-lg tw-font-bold hover:tw-opacity-90 tw-no-underline tw-mt-2"
          >
            카카오 비즈니스 센터 바로가기
          </a>
        </div>

        {/* Step 2: 관리자 초대 */}
        <div className="tw-bg-white tw-rounded-2xl tw-shadow-md tw-p-6 tw-mb-8 tw-border tw-border-gray-100">
          <div className="tw-flex tw-items-center tw-gap-3 tw-mb-4">
            <div className="tw-w-8 tw-h-8 tw-bg-yellow-400 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-font-bold">
              2
            </div>
            <h2 className="tw-text-lg tw-font-semibold">비즈팅 계정 관리자 초대</h2>
          </div>

          <p className="tw-text-gray-600 tw-mb-4">
            데이터 연동을 위해 아래 비즈팅 공식 계정을 관리자로 초대해 주세요.
          </p>

          <div className="tw-bg-gray-50 tw-rounded-lg tw-p-4 tw-text-sm tw-text-gray-700 tw-mb-6">
            <div className="tw-flex tw-justify-between tw-items-center">
              <div>
                <p className="tw-text-xs tw-text-gray-500 tw-mb-1">초대 계정 주소</p>
                <p className="tw-text-base tw-font-bold tw-text-[#5D87FF]">tf@biztalk.co.kr</p>
              </div>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText("tf@biztalk.co.kr");
                  toast.info("이메일 주소가 복사되었습니다.");
                }}
                className="tw-text-xs tw-bg-white tw-border tw-border-gray-200 tw-px-2 tw-py-1 tw-rounded hover:tw-bg-gray-50"
              >
                복사하기
              </button>
            </div>
            <div className="tw-mt-3 tw-pt-3 tw-border-t tw-border-gray-200 tw-text-xs">
              경로: 채널 → 관리자 → <strong>+ 관리자 초대</strong> 클릭
            </div>
          </div>

          <ImageCard 
            src={guideAdminImg} 
            alt="관리자 초대 가이드" 
            caption="* 노란색 '+ 관리자 초대' 버튼을 눌러 이메일을 입력해 주세요."
          />

          <a
            href="https://business.kakao.com/_jxcupG/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="tw-border-0 tw-block tw-text-center tw-bg-[#5D87FF] tw-text-white tw-px-4 tw-py-3 tw-rounded-lg tw-font-bold hover:tw-opacity-90 tw-no-underline"
          >
            카카오 비즈니스 센터 바로가기
          </a>
        </div>

        {/* Step 3: 승인 안내 */}
        <div className="tw-bg-white tw-rounded-2xl tw-shadow-md tw-p-6 tw-mb-8 tw-border tw-border-gray-100">
          <div className="tw-flex tw-items-center tw-gap-3 tw-mb-4">
            <div className="tw-w-8 tw-h-8 tw-bg-yellow-400 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-font-bold">
              3
            </div>
            <h2 className="tw-text-lg tw-font-semibold">신청 완료 및 대기</h2>
          </div>

          <div className="tw-flex tw-gap-4">
            <div className="tw-flex-1 tw-bg-blue-50 tw-rounded-xl tw-p-4">
              <p className="tw-text-xs tw-text-blue-600 tw-font-bold tw-mb-1">예상 소요 시간</p>
              <p className="tw-text-sm tw-text-gray-700">영업일 기준 1~2일 내 승인</p>
            </div>
            <div className="tw-flex-1 tw-bg-yellow-50 tw-rounded-xl tw-p-4">
              <p className="tw-text-xs tw-text-yellow-700 tw-font-bold tw-mb-1">알림 안내</p>
              <p className="tw-text-sm tw-text-gray-700">승인 완료 시 알림톡 발송</p>
            </div>
          </div>
        </div>

        {/* Footer Support */}
        <div className="tw-bg-gray-50 tw-rounded-2xl tw-p-8 tw-text-center tw-border tw-border-dashed tw-border-gray-300">
          <p className="tw-text-gray-600 tw-mb-4">
            설정 중 어려움이 있으신가요? 고객센터로 문의하시면 빠르게 도와드리겠습니다.
          </p>
          <div className="tw-flex tw-flex-col tw-items-center tw-gap-3">
            <span className="tw-text-lg tw-font-bold tw-text-gray-800">tf@biztalk.co.kr</span>
            <a
              href="#"
              className="tw-border-0 tw-inline-flex tw-items-center tw-gap-2 tw-bg-white tw-text-gray-700 tw-px-6 tw-py-2 tw-rounded-full tw-shadow-sm tw-border-gray-200 hover:tw-bg-gray-50 tw-no-underline tw-font-medium"
            >
              💬 1:1 채팅 문의하기
            </a>
          </div>
        </div>

        {/* 이미지 확대 모달창 */}
        {selectedImg && (
          <div 
            className="tw-fixed tw-inset-0 tw-bg-black/90 tw-z-[9999] tw-flex tw-items-center tw-justify-center tw-p-4 tw-cursor-pointer"
            onClick={() => setSelectedImg(null)}
          >
            <div className="tw-relative tw-max-w-6xl tw-w-full tw-animate-in tw-fade-in tw-zoom-in tw-duration-200">
              <img 
                src={selectedImg} 
                alt="가이드 확대보기" 
                className="tw-w-full tw-h-auto tw-rounded-lg tw-shadow-2xl" 
              />
              <button 
                className="tw-absolute tw-top-[-36px] tw-right-0 tw-text-white tw-text-base tw-font-medium hover:tw-text-gray-300 tw-flex tw-items-center tw-gap-1 tw-border-0 tw-bg-transparent tw-p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImg(null);
                }}
              >
                <span className="tw-text-lg">✕</span> 닫기
              </button>
            </div>
          </div>
        )}

        <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      </div>
    </Layout>
  );
}

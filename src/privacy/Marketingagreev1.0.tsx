const MarketingConsent = () => {
  return (
    <div className="tw-p-6 tw-max-w-md tw-mx-auto">
      <h2 className="tw-text-lg tw-font-semibold tw-text-gray-900 tw-mb-4">
        마케팅 수신 동의
      </h2>

      <div className="tw-flex tw-flex-col tw-gap-3 tw-text-sm tw-text-gray-700 tw-leading-6">
        <div>
          <p className="tw-font-medium tw-text-gray-900 tw-mb-1">안내 내용</p>
          <p>자사 상품, 실시간 이벤트 안내, 서비스 안내, 행사 안내</p>
        </div>

        <div>
          <p className="tw-font-medium tw-text-gray-900 tw-mb-1">수신 채널</p>
          <p>이동통신사 일반 문자메시지(SMS/LMS), 카카오톡(알림톡, 브랜드 메시지)</p>
        </div>

        <div className="tw-border-t tw-border-gray-200 tw-pt-3">
          <p>마케팅 수신에 동의하신 회원을 대상으로 위 채널을 통해 정보를 수신하는 것에 동의합니다. 본 동의는 선택 사항이며, 동의를 거부하시더라도 서비스 이용에는 제한이 없으나 위 혜택 정보를 받으실 수 없습니다. 동의 이후에도 언제든지 수신 거부(동의 철회)가 가능합니다.</p>
        </div>

        <div className="tw-bg-gray-50 tw-rounded-lg tw-p-3 tw-text-xs tw-text-gray-500 tw-leading-5">
          <p className="tw-font-medium tw-text-gray-700 tw-mb-1">수신 거부 방법 · 동의 철회</p>
          <p>네이버 앱 또는 웹 &gt; 네이버 ID &gt; 이력관리 &gt; 연결된 서비스 관리 &gt; 서비스 동의 &gt; 서비스 동의 철회를 통해 언제든지 철회하실 수 있습니다.</p>
        </div>
      </div>
    </div>
  );
};

export default MarketingConsent;
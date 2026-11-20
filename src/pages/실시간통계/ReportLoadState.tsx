export function ReportLoading() {
  return <p className="tw-p-6 tw-text-center tw-text-sm tw-text-slate-600" role="status">통계 리포트를 불러오는 중이에요…</p>;
}

export function ReportLoadError() {
  return (
    <div className="tw-p-6 tw-text-center tw-text-sm tw-text-slate-700" role="alert">
      <p>통계 화면을 불러오지 못했어요.</p>
      <button type="button" className="tw-text-blue-700 tw-underline" onClick={() => window.location.reload()}>
        새로고침
      </button>
    </div>
  );
}

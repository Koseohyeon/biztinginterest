export default function KPI({ title, value }: { title: string; value: number }) {
  return (
    <div className="tw-bg-white tw-rounded-2xl tw-border tw-border-slate-200 tw-p-6 tw-shadow-sm hover:tw-shadow-lg tw-transition-all">

      <p className="tw-text-sm tw-text-slate-500 tw-font-medium">
        {title}
      </p>

      <div className="tw-flex tw-items-end tw-gap-3 tw-mt-3">
        <p className="tw-text-4xl tw-font-bold tw-text-slate-900">
          {value.toLocaleString()}
        </p>

        <span className="tw-text-xs tw-font-semibold tw-text-emerald-600 tw-bg-emerald-50 tw-px-2 tw-py-1 tw-rounded-md">
          +12%
        </span>
      </div>
    </div>
  );
}
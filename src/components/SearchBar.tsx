export default function SearchBar({ value, onChange }: any) {
  return (
    <div className="tw-relative tw-w-full sm:tw-w-80">

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="사용자 검색"
        className="
        tw-w-full
        tw-bg-slate-50
        tw-border
        tw-border-slate-200
        tw-rounded-xl
        tw-px-4
        tw-py-3
        tw-text-sm
        focus:tw-ring-2
        focus:tw-ring-blue-500/20
        focus:tw-bg-white
        tw-transition-all
        "
      />

    </div>
  );
}
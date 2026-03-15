interface Props {
  title: string;
  value: string | number;
}

export default function StatCard({ title, value }: Props) {
  return (
    <div className="tw-bg-white tw-border tw-rounded-xl tw-p-6 tw-shadow-sm">
      <div className="tw-text-sm tw-text-slate-500">
        {title}
      </div>

      <div className="tw-text-3xl tw-font-bold tw-mt-2">
        {value}
      </div>
    </div>
  );
}
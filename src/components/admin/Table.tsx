interface Props {
  columns: string[];
  children: React.ReactNode;
}

export default function Table({ columns, children }: Props) {
  return (
    <div className="tw-bg-white tw-border tw-rounded-xl tw-overflow-hidden">

      <table className="tw-w-full tw-text-sm">

        <thead className="tw-bg-slate-50">
          <tr>
            {columns.map((c) => (
              <th key={c} className="tw-p-3 tw-text-left">
                {c}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>{children}</tbody>

      </table>

    </div>
  );
}
export default function Table({
  columns,
  children,
  tbodyRef,
  tbodyProps,
}: any) {
  return (
    <div className="tw-bg-white tw-rounded-2xl tw-shadow-sm tw-overflow-hidden">
      <table className="tw-w-full tw-text-sm">
        <thead className="tw-bg-gray-50">
          <tr>
            {columns.map((col: string, i: number) => (
              <th
                key={i}
                className="tw-text-left tw-p-3 tw-font-medium tw-text-gray-600"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody ref={tbodyRef} {...tbodyProps}>
          {children}
        </tbody>
      </table>
    </div>
  );
}
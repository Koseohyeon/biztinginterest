export default function Pagination({ page, total, limit, setPage }: any) {

  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="tw-flex tw-gap-2 tw-mt-8 tw-justify-center">

      {pages.map((p) => (

        <button
          key={p}
          onClick={() => setPage(p)}
          className={`tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center tw-rounded-xl tw-text-sm tw-font-medium tw-transition-all
          
          ${page === p
            ? "tw-bg-[#5D87FF] tw-text-white tw-shadow-lg"
            : "tw-bg-white tw-border tw-border-slate-200 hover:tw-bg-slate-50"
          }`}
        >
          {p}
        </button>

      ))}

    </div>
  );
}
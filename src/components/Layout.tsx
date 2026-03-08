export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="tw-min-h-screen tw-flex tw-flex-col">

      {/* header */}
      <header className="tw-bg-white/80 tw-backdrop-blur-lg tw-border-b tw-border-slate-200 tw-sticky tw-top-0 tw-z-40">
        <div className="tw-max-w-7xl tw-mx-auto tw-px-6 tw-py-4 tw-flex tw-items-center tw-justify-between">

          <div className="tw-flex tw-items-center tw-gap-6">

            <img src="/image_4.png" className="tw-h-10" />

            <nav className="tw-flex tw-gap-6">
              <a className="tw-text-sm tw-font-semibold tw-text-[#5D87FF]">
                사용자 관리
              </a>

              <a className="tw-text-sm tw-text-slate-600 hover:tw-text-slate-900">
                시스템 설정
              </a>
            </nav>

          </div>

        </div>
      </header>

      <main className="tw-flex-1 tw-max-w-7xl tw-mx-auto tw-w-full tw-p-8">
        {children}
      </main>

      <footer className="tw-text-center tw-text-sm tw-text-slate-400 tw-py-8">
        © 2024 YourCompany
      </footer>

    </div>
  );
}
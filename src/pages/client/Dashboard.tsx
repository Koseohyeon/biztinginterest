import Layout from "../../components/Layout";
import KPI from "../../components/KPI";
import MaskedTable from "../../components/MaskedTable";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import DownloadModal from "../../components/DownloadModal";

import { users } from "../../data/users";
import { useState } from "react";
import { downloadExcel } from "../../utils/excel";
import { saveDownloadLog } from "../../utils/downloadLog";

export default function Dashboard() {

  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [page, setPage] = useState(1);

  const pageSize = 5;

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (

    <Layout>

      <div className="tw-space-y-12">

        {/* header */}

        <div>

          <h1 className="tw-text-3xl tw-font-bold tw-text-slate-900">
            사용자 대시보드
          </h1>

          <p className="tw-text-slate-500 tw-mt-2">
            서비스 가입자 현황 및 사용자 관리
          </p>

        </div>


        {/* KPI */}

        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-6">

          <KPI title="총 가입자" value={users.length} />
          <KPI title="오늘 가입" value={2} />
          <KPI title="이번주 가입" value={10} />

        </div>


        {/* 리스트 */}

        <div className="tw-space-y-6">

          <div className="tw-flex tw-flex-col sm:tw-flex-row tw-gap-4 tw-justify-between">

            <SearchBar value={search} onChange={setSearch} />

            <button
              onClick={() => setModal(true)}
              className="tw-bg-[#5D87FF] tw-text-white tw-px-6 tw-py-3 tw-rounded-xl tw-text-sm tw-font-semibold tw-shadow-lg hover:tw-bg-blue-600"
            >
              엑셀 다운로드
            </button>

          </div>


          <MaskedTable users={paged} />

          <Pagination
            page={page}
            total={Math.ceil(filtered.length / pageSize)}
            setPage={setPage}
          />

        </div>

      </div>


      {modal && (

        <DownloadModal

        onConfirm={(reason: string) => {

  saveDownloadLog(reason);
  downloadExcel(users);
  setModal(false);

}}
        />

      )}

    </Layout>

  );
}
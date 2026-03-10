import Layout from "../../components/Layout";
import KPI from "../../components/KPI";
import MaskedTable from "../../components/MaskedTable";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import DownloadModal from "../../components/DownloadModal";
import Chart from "../../components/Chart";
import { users } from "../../data/users";
import { useState, useMemo } from "react";
import { downloadExcel } from "../../utils/excel";
import { saveDownloadLog } from "../../utils/downloadLog";

export default function Dashboard() {

  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [page, setPage] = useState(1);
  const [range, setRange] = useState(7);

  const pageSize = 10;

  const today = new Date();

  function isSameDay(d1: Date, d2: Date) {
    return d1.toDateString() === d2.toDateString();
  }

  function diffDays(d1: Date, d2: Date) {
    return (d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24);
  }

  // KPI 계산
  const totalUsers = users.length;

  const todayUsers = users.filter((u) => {
    const d = new Date(u.createdAt);
    return isSameDay(today, d);
  }).length;

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const yesterdayUsers = users.filter((u) => {
    const d = new Date(u.createdAt);
    return isSameDay(yesterday, d);
  }).length;

  const weekUsers = users.filter((u) => {
    const d = new Date(u.createdAt);
    return diffDays(today, d) <= 7;
  }).length;

  const prevWeekUsers = users.filter((u) => {
    const d = new Date(u.createdAt);
    const diff = diffDays(today, d);
    return diff > 7 && diff <= 14;
  }).length;

  function calcRate(current: number, prev: number) {
    if (prev === 0) return current > 0 ? 100 : 0;
    return ((current - prev) / prev) * 100;
  }

  const todayRate = calcRate(todayUsers, yesterdayUsers);
  const weekRate = calcRate(weekUsers, prevWeekUsers);

  // 검색 필터
  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  // 차트 데이터
  const chartData = useMemo(() => {

    const arr: any[] = [];

    for (let i = range - 1; i >= 0; i--) {

      const date = new Date();
      date.setDate(date.getDate() - i);

      const label = date.toLocaleDateString("ko-KR", {
        month: "numeric",
        day: "numeric"
      });

      const count = users.filter(u => {
        const d = new Date(u.createdAt);
        return d.toDateString() === date.toDateString();
      }).length;

      arr.push({
        date: label,
        count
      });

    }

    return arr;

  }, [range]);

  return (

    <Layout>

      <div className="tw-space-y-12">

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

          <KPI
            title="총 가입자"
            value={totalUsers}
            rate={0}
          />

          <KPI
            title="오늘 가입"
            value={todayUsers}
            rate={todayRate}
          />

          <KPI
            title="최근 7일 가입"
            value={weekUsers}
            rate={weekRate}
          />

        </div>


        {/* Chart */}

        <div className="tw-bg-white tw-border tw-border-slate-200 tw-rounded-2xl tw-p-6">

          <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">

            <h2 className="tw-text-lg tw-font-semibold tw-text-slate-800">
              가입자 증가 추이
            </h2>

            <select
              value={range}
              onChange={(e) => setRange(Number(e.target.value))}
              className="tw-border tw-border-slate-200 tw-rounded-lg tw-px-3 tw-py-2 tw-text-sm"
            >
              <option value={7}>최근 7일</option>
              <option value={30}>최근 30일</option>
            </select>

          </div>

          <Chart data={chartData} />

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
    onClose={() => setModal(false)}
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
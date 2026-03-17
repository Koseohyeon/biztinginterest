import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import PageHeader from "../../components/admin/PageHeader";
import Table from "../../components/admin/Table";
import Pagination from "../../components/Pagination";
import { companies } from "../../data/companies";
import AdminNav from "./../admin/AdminNav";

const PAGE_SIZE = 10;

export default function AdminCompanyList() {

  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [page, setPage] = useState(1);

  // 필터 변경 시 페이지 초기화
  useEffect(() => {
    setPage(1);
  }, [keyword, status, startDate, endDate]);

  const filtered = companies.filter((c) => {

    const nameOk =
      !keyword || c.name.includes(keyword);

    const statusOk =
      !status || c.status === status;

    const loginDate = new Date(c.lastLogin);

    const startOk =
      !startDate || loginDate >= new Date(startDate);

    const endOk =
      !endDate || loginDate <= new Date(endDate);

    return nameOk && statusOk && startOk && endOk;
  });

  // ✅ 페이지네이션 계산
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const pagedData = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <Layout>
      <div className="tw-max-w-7xl tw-mx-auto tw-px-6 tw-py-10 tw-space-y-6">

        <PageHeader title="고객 관리" />
        <AdminNav />

        {/* 필터 */}
        <div className="tw-flex tw-gap-4 tw-items-center">

          <input
            placeholder="고객사 검색"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="tw-h-10 tw-border tw-border-gray-200 tw-px-3 tw-rounded-lg tw-text-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#5D87FF]"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="tw-h-10 tw-border tw-border-gray-200 tw-px-3 tw-rounded-lg tw-text-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#5D87FF]"
          >
            <option value="">전체 상태</option>
            <option value="active">정상</option>
            <option value="deleted">삭제</option>
          </select>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="tw-h-10 tw-border tw-border-gray-200 tw-px-3 tw-rounded-lg tw-text-sm"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="tw-h-10 tw-border tw-border-gray-200 tw-px-3 tw-rounded-lg tw-text-sm"
          />

          <button
            onClick={() => {
              setKeyword("");
              setStatus("");
              setStartDate("");
              setEndDate("");
            }}
            className="tw-h-10 tw-px-4 tw-bg-gray-100 tw-rounded-lg tw-text-sm"
          >
            초기화
          </button>

        </div>

        {/* 테이블 */}
        <Table
          columns={[
            "고객ID",
            "고객사명",
            "최근 로그인",
            "최근 다운로드",
            "상태",
          ]}
        >
          {pagedData.map((c) => (
            <tr key={c.id} className="tw-border-b">
              <td className="tw-p-3">{c.id}</td>
              <td>{c.name}</td>
              <td>{c.lastLogin}</td>
              <td>{c.lastDownload}</td>
              <td>{c.status === "active" ? "정상" : "삭제"}</td>
            </tr>
          ))}
        </Table>

        {/* 페이지네이션 */}
        <Pagination
          page={page}
          total={totalPages}
          setPage={setPage}
        />

      </div>
    </Layout>
  );
}
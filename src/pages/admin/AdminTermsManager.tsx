import Layout from "../../components/Layout";
import Table from "../../components/admin/Table";
import PageHeader from "../../components/admin/PageHeader";
import { termsList } from "../../data/terms";
import type { Terms } from "../../data/terms";
import AdminNav from "./../admin/AdminNav";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Pagination from "../../components/Pagination";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";

export default function AdminTermsManager() {
  const [terms, setTerms] = useState<Terms[]>(termsList);

  const [versionFilter, setVersionFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [page, setPage] = useState(1);
  const limit = 10;

  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate(`/admin/terms/${id}`);
  };

  // ✅ 상태 토글
  const toggleStatus = (id: string) => {
    setTerms((prev) =>
      prev.map((term) =>
        term.id === id
          ? {
              ...term,
              status:
                term.status === "active" ? "inactive" : "active",
            }
          : term
      )
    );
  };

  // ✅ 드래그
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(terms);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);

    setTerms(items);
  };

  // ✅ 필터
  const filtered = terms.filter((term) => {
    const versionOk =
      !versionFilter || term.version.includes(versionFilter);

    const statusOk =
      !statusFilter || term.status === statusFilter;

    const created = new Date(term.createdAt);

    const startOk =
      !startDate || created >= new Date(startDate);

    const endOk =
      !endDate || created <= new Date(endDate);

    return versionOk && statusOk && startOk && endOk;
  });

  // ✅ 페이지 초기화
  useEffect(() => {
    setPage(1);
  }, [versionFilter, statusFilter, startDate, endDate]);

  // ✅ pagination
  const totalPages = Math.ceil(filtered.length / limit);

  const paged = filtered.slice(
    (page - 1) * limit,
    page * limit
  );

  return (
    <Layout>
      <div className="tw-max-w-6xl tw-mx-auto tw-px-6 tw-py-10 tw-space-y-6">

        <PageHeader title="약관 관리" />
        <AdminNav />

        {/* 필터 */}
        <div className="tw-flex tw-gap-4 tw-items-center">

          <input
            placeholder="버전 검색"
            value={versionFilter}
            onChange={(e) => setVersionFilter(e.target.value)}
            className="tw-h-10 tw-border tw-border-gray-200 tw-px-3 tw-rounded-lg"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="tw-h-10 tw-border tw-border-gray-200 tw-px-3 tw-rounded-lg"
          >
            <option value="">전체 상태</option>
            <option value="active">활성</option>
            <option value="inactive">비활성</option>
          </select>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="tw-h-10 tw-border tw-border-gray-200 tw-px-3 tw-rounded-lg"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="tw-h-10 tw-border tw-border-gray-200 tw-px-3 tw-rounded-lg"
          />

          <button
            onClick={() => {
              setVersionFilter("");
              setStatusFilter("");
              setStartDate("");
              setEndDate("");
              setPage(1);
            }}
            className="tw-h-10 tw-px-4 tw-bg-gray-100 tw-rounded-lg"
          >
            초기화
          </button>

        </div>

        {/* 테이블 + DnD */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="terms">
            {(provided) => (
              <Table
                columns={[
                  "",
                  "약관명",
                  "버전",
                  "상태",
                  "작성자",
                  "생성일",
                ]}
                tbodyRef={provided.innerRef}
                tbodyProps={provided.droppableProps}
              >
                {paged.map((term) => {
                  const realIndex = terms.findIndex(
                    (t) => t.id === term.id
                  );

                  return (
                    <Draggable
                      key={term.id}
                      draggableId={term.id}
                      index={realIndex}
                    >
                      {(provided) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="tw-border-b"
                        >
                          <td
                            {...provided.dragHandleProps}
                            className="tw-p-3 tw-cursor-move"
                          >
                            ☰
                          </td>

                          <td
                            className="tw-p-3 tw-text-blue-600 tw-underline tw-cursor-pointer"
                            onClick={() => handleClick(term.id)}
                          >
                            {term.name}
                          </td>

                          <td className="tw-p-3">
                            {term.version}
                          </td>

                          <td>
                            <button
                              onClick={() =>
                                toggleStatus(term.id)
                              }
                              className={`tw-w-12 tw-h-6 tw-flex tw-items-center tw-rounded-full tw-p-1 ${
                                term.status === "active"
                                  ? "tw-bg-blue-500"
                                  : "tw-bg-gray-300"
                              }`}
                            >
                              <div
                                className={`tw-bg-white tw-w-4 tw-h-4 tw-rounded-full tw-transition ${
                                  term.status === "active"
                                    ? "tw-translate-x-6"
                                    : ""
                                }`}
                              />
                            </button>
                          </td>

                          <td className="tw-p-3">
                            {term.author}
                          </td>

                          <td className="tw-p-3">
                            {new Date(
                              term.createdAt
                            ).toLocaleDateString("ko-KR")}
                          </td>
                        </tr>
                      )}
                    </Draggable>
                  );
                })}

                {provided.placeholder}
              </Table>
            )}
          </Droppable>
        </DragDropContext>

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
import { useState } from "react";
import Layout from "../../components/Layout";
import PageHeader from "../../components/admin/PageHeader";
import Table from "../../components/admin/Table";
import { accessLogs, downloadLogs } from "../../data/logs";
import AdminNav from "./../admin/AdminNav";

export default function AdminLogs(){

  const [tab,setTab] = useState<"access"|"download">("access");

  const [userFilter,setUserFilter] = useState("");
  const [companyFilter,setCompanyFilter] = useState("");
  const [startDate,setStartDate] = useState("");
  const [endDate,setEndDate] = useState("");

  const filterLogs = (logs:any[]) => {

    return logs.filter((log)=>{

      const logDate = new Date(log.createdAt);

      const startOk =
        !startDate ||
        logDate >= new Date(startDate);

      const endOk =
        !endDate ||
        logDate <= new Date(endDate);

      const userOk =
        !userFilter ||
        log.userId
          .toLowerCase()
          .includes(userFilter.toLowerCase());

      const companyOk =
        !companyFilter ||
        (log.companyId &&
        log.companyId
          .toLowerCase()
          .includes(companyFilter.toLowerCase()));

      return startOk && endOk && userOk && companyOk;

    });

  };

  const filteredAccess = filterLogs(accessLogs);
  const filteredDownload = filterLogs(downloadLogs);

  return(

    <Layout>

      <div className="tw-max-w-7xl tw-mx-auto tw-px-6 tw-py-10 tw-space-y-6">

        <PageHeader title="로그 관리"/>
        <AdminNav/>

        {/* 필터 */}
        <div className="tw-flex tw-gap-4 tw-items-center">

          <input
            placeholder="사용자 검색"
            value={userFilter}
            onChange={(e)=>setUserFilter(e.target.value)}
            className="tw-h-10 tw-border tw-border-gray-200 tw-px-3 tw-rounded-lg tw-text-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#5D87FF]"
          />

          <input
            placeholder="기업 검색"
            value={companyFilter}
            onChange={(e)=>setCompanyFilter(e.target.value)}
            className="tw-h-10 tw-border tw-border-gray-200 tw-px-3 tw-rounded-lg tw-text-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#5D87FF]"
          />

          <input
            type="date"
            value={startDate}
            onChange={(e)=>setStartDate(e.target.value)}
            className="tw-h-10 tw-border tw-border-gray-200 tw-px-3 tw-rounded-lg tw-text-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#5D87FF]"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e)=>setEndDate(e.target.value)}
            className="tw-h-10 tw-border tw-border-gray-200 tw-px-3 tw-rounded-lg tw-text-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#5D87FF]"
          />

          {/* <button
            className="tw-h-10 tw-px-4 tw-bg-[#5D87FF] tw-text-white tw-rounded-lg tw-text-sm"
          >
            검색
          </button> */}

          <button
            onClick={()=>{
              setUserFilter("");
              setCompanyFilter("");
              setStartDate("");
              setEndDate("");
            }}
            className="tw-h-10 tw-px-4 tw-bg-gray-100 tw-rounded-lg tw-text-sm"
          >
            초기화
          </button>

        </div>

        {/* 탭 */}
        <div className="tw-flex tw-gap-4">

          <button
            onClick={()=>setTab("access")}
            className={`tw-px-4 tw-py-2 tw-rounded ${
              tab==="access"
                ?"tw-bg-[#5D87FF] tw-text-white"
                :"tw-bg-gray-100"
            }`}
          >
            접근 로그
          </button>

          <button
            onClick={()=>setTab("download")}
            className={`tw-px-4 tw-py-2 tw-rounded ${
              tab==="download"
                ?"tw-bg-[#5D87FF] tw-text-white"
                :"tw-bg-gray-100"
            }`}
          >
            다운로드 로그
          </button>

        </div>


        {/* 접근 로그 */}

        {tab==="access" && (

          <Table
            columns={[
              "사용자",
              "기업",
              "행위",
              "데이터",
              "시간",
              "결과"
            ]}
          >

            {filteredAccess.map((log)=>(

              <tr key={log.id} className="tw-border-b">

                <td className="tw-p-3">{log.userId}</td>
                <td>{log.companyId}</td>
                <td>{log.action}</td>
                <td>{log.target}</td>
                <td>{log.createdAt}</td>
                <td>{log.result}</td>

              </tr>

            ))}

          </Table>

        )}


        {/* 다운로드 로그 */}

        {tab==="download" && (

          <Table
            columns={[
              "사용자",
              "파일명",
              "건수",
              "사유",
              "시간"
            ]}
          >

            {filteredDownload.map((log)=>(

              <tr key={log.id} className="tw-border-b">

                <td className="tw-p-3">{log.userId}</td>
                <td>{log.fileName}</td>
                <td>{log.count}</td>
                <td>{log.reason}</td>
                <td>{log.createdAt}</td>

              </tr>

            ))}

          </Table>

        )}

      </div>

    </Layout>

  )

}
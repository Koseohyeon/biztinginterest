import Layout from "../../components/Layout";
import Table from "../../components/admin/Table";
import PageHeader from "../../components/admin/PageHeader";
import { termsList } from "../../data/terms";
import AdminNav from "./../admin/AdminNav";
import { useState } from "react";

export default function AdminTermsManager(){
    const [versionFilter,setVersionFilter] = useState("");
    const [statusFilter,setStatusFilter] = useState("");
    const [startDate,setStartDate] = useState("");
    const [endDate,setEndDate] = useState("");

    const filtered = termsList.filter(term => {

  const versionOk =
    !versionFilter ||
    term.version.includes(versionFilter);

  const statusOk =
    !statusFilter ||
    term.status === statusFilter;

  const created = new Date(term.createdAt);

  const startOk =
    !startDate ||
    created >= new Date(startDate);

  const endOk =
    !endDate ||
    created <= new Date(endDate);

  return versionOk && statusOk && startOk && endOk;

});

  return(

    <Layout>

      <div className="tw-max-w-6xl tw-mx-auto tw-px-6 tw-py-10 tw-space-y-6">

        <PageHeader title="약관 관리"/>
                <AdminNav/>
                <div className="tw-flex tw-gap-4 tw-items-center">

<input
placeholder="버전 검색"
value={versionFilter}
onChange={(e)=>setVersionFilter(e.target.value)}
className="tw-h-10 tw-border tw-border-gray-200 tw-px-3 tw-rounded-lg tw-text-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#5D87FF]"
/>

<select
value={statusFilter}
onChange={(e)=>setStatusFilter(e.target.value)}
className="tw-h-10 tw-border tw-border-gray-200 tw-px-3 tw-rounded-lg tw-text-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#5D87FF]"
>
<option value="">전체 상태</option>
<option value="active">활성</option>
<option value="inactive">비활성</option>
</select>

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

<button
onClick={()=>{
setVersionFilter("");
setStatusFilter("");
setStartDate("");
setEndDate("");
}}
className="tw-h-10 tw-px-4 tw-bg-gray-100 tw-rounded-lg tw-text-sm"
>
초기화
</button>

</div>

        <button className="tw-bg-[#5D87FF] tw-text-white tw-px-6 tw-py-2 tw-rounded-lg">
          약관 등록
        </button>

        <Table
          columns={[
            "버전",
            "상태",
            "작성자",
            "생성일"
          ]}
        >

          {filtered.map(term=>(

            <tr key={term.id} className="tw-border-b">

              <td className="tw-p-3">{term.version}</td>
              <td>{term.status==="active"?"활성":"비활성"}</td>
              <td>{term.author}</td>
              <td>{term.createdAt}</td>

            </tr>

          ))}

        </Table>

      </div>

    </Layout>

  )

}
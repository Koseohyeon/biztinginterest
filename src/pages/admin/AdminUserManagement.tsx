import { useState } from "react";
import Layout from "../../components/Layout";
import PageHeader from "../../components/admin/PageHeader";
import Table from "../../components/admin/Table";
import Pagination from "../../components/Pagination";
import { AdminUsers } from "../../data/AdminUser";
import { maskPhone, maskEmail } from "../../utils/mask";
import AdminNav from "./../admin/AdminNav";

export default function AdminUserManagement(){

  const [tab,setTab] = useState<"consent"|"destroy">("consent");
  const [page,setPage] = useState(1);
  const [nameFilter,setNameFilter] = useState("");
  const [phoneFilter,setPhoneFilter] = useState("");
  const [startDate,setStartDate] = useState("");
  const [endDate,setEndDate] = useState(""); 

  const limit = 10;

  const start = (page-1)*limit;
  const end = start + limit;
  const filtered = AdminUsers.filter(user => {

  const nameOk =
    !nameFilter ||
    user.name.includes(nameFilter);

  const phoneOk =
    !phoneFilter ||
    user.phone.includes(phoneFilter);

  const created = new Date(user.createdAt);

  const startOk =
    !startDate ||
    created >= new Date(startDate);

  const endOk =
    !endDate ||
    created <= new Date(endDate);

  return nameOk && phoneOk && startOk && endOk;

});

const paged = filtered.slice(start,end);


  return(

    <Layout>

      <div className="tw-max-w-7xl tw-mx-auto tw-px-6 tw-py-10 tw-space-y-6">

        <PageHeader title="사용자 관리"/>
                <AdminNav/>
                <div className="tw-flex tw-gap-4 tw-items-center">

<input
placeholder="이름 검색"
value={nameFilter}
onChange={(e)=>setNameFilter(e.target.value)}
className="tw-h-10 tw-border tw-border-gray-200 tw-px-3 tw-rounded-lg tw-text-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#5D87FF]"
/>

<input
placeholder="전화번호 검색"
value={phoneFilter}
onChange={(e)=>setPhoneFilter(e.target.value)}
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

<button
onClick={()=>{
setNameFilter("");
setPhoneFilter("");
setStartDate("");
setEndDate("");
}}
className="tw-h-10 tw-px-4 tw-bg-gray-100 tw-rounded-lg tw-text-sm"
>
초기화
</button>

</div>

        <div className="tw-flex tw-gap-4">

          <button
            onClick={()=>setTab("consent")}
            className={`tw-px-4 tw-py-2 tw-rounded ${
              tab==="consent"
                ?"tw-bg-[#5D87FF] tw-text-white"
                :"tw-bg-gray-100"
            }`}
          >
            동의 이력
          </button>

          <button
            onClick={()=>setTab("destroy")}
            className={`tw-px-4 tw-py-2 tw-rounded ${
              tab==="destroy"
                ?"tw-bg-[#5D87FF] tw-text-white"
                :"tw-bg-gray-100"
            }`}
          >
            데이터 파기
          </button>

        </div>

        <Table
          columns={[
            "사용자ID",
            "이름",
            "전화번호",
            "이메일",
            "가입일",
            "상태"
          ]}
        >

          {paged.map(user=>(

            <tr key={user.id} className="tw-border-b">

              <td className="tw-p-3">{user.id}</td>
              <td>{user.name}</td>
              <td>{maskPhone(user.phone)}</td>
              <td>{maskEmail(user.email)}</td>
              <td>{user.createdAt}</td>

              <td>
                {tab==="destroy"
                  ?"파기대상"
                  :"동의완료"}
              </td>

            </tr>

          ))}

        </Table>

        <Pagination
          page={page}
          setPage={setPage}
          total={AdminUsers.length}
          limit={limit}
        />

      </div>

    </Layout>

  )

}
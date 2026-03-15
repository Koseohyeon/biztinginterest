import Layout from "../../components/Layout";
import StatCard from "../../components/admin/StatCard";
import PageHeader from "../../components/admin/PageHeader";
import AdminNav from "./../admin/AdminNav";
import { users } from "../../data/users";
import { companies } from "../../data/companies";
import { accessLogs } from "../../data/logs";

export default function AdminDashboard(){

  return(

    <Layout>

      <div className="tw-max-w-7xl tw-mx-auto tw-px-6 tw-py-10 tw-space-y-8">

        <PageHeader title="관리자 대시보드"/>

        <AdminNav/>

        <div className="tw-grid md:tw-grid-cols-4 tw-gap-6">

          <StatCard title="총 고객" value={users.length}/>
          <StatCard title="기업 수" value={companies.length}/>
          <StatCard title="오늘 접근 로그" value={accessLogs.length}/>
          <StatCard title="다운로드 로그" value="18"/>

        </div>

      </div>

    </Layout>

  )

}
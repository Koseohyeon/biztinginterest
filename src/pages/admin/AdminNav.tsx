import { NavLink } from "react-router-dom";

const menus = [
  { name: "대시보드", path: "/admin", end: true },
  { name: "기업 관리", path: "/admin/AdminCompanyList" },
  { name: "사용자 관리", path: "/admin/AdminUserManagement" },
  { name: "로그 관리", path: "/admin/AdminLogs" },
  { name: "약관 관리", path: "/admin/terms" },
];

export default function AdminNav() {
  return (
    <div className="tw-border-b tw-bg-white">
      
      <div className="tw-max-w-7xl tw-mx-auto tw-flex tw-gap-8 tw-px-6">

        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            end={menu.end}
            className={({ isActive }) =>
              `tw-relative tw-py-4 tw-font-medium tw-text-sm
              ${
                isActive
                  ? "tw-text-[#5D87FF]"
                  : "tw-text-gray-500 hover:tw-text-gray-800"
              }`
            }
          >
            {menu.name}
          </NavLink>
        ))}

      </div>
    </div>
  );
}
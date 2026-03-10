import type { User } from "../data/users";
import { maskName, maskPhone, maskEmail } from "../utils/mask";

type Props = {
  users: User[];
};

export default function MaskedTable({ users }: Props) {

  return (
    <div className="tw-bg-white tw-border tw-border-slate-200 tw-rounded-2xl tw-overflow-hidden">

      <table className="tw-w-full tw-table-fixed tw-text-sm">

        <thead className="tw-text-xs tw-uppercase tw-text-slate-500 tw-bg-slate-50">

          <tr>
            <th className="tw-w-[20%] tw-py-4 tw-px-6 tw-text-left">이름</th>
            <th className="tw-w-[25%] tw-py-4 tw-px-6 tw-text-left">전화번호</th>
            <th className="tw-w-[35%] tw-py-4 tw-px-6 tw-text-left">이메일</th>
            <th className="tw-w-[20%] tw-py-4 tw-px-6 tw-text-left">가입일</th>
          </tr>

        </thead>

        <tbody className="tw-divide-y tw-divide-slate-100">

          {users.map((u, i) => (

            <tr key={i} className="hover:tw-bg-slate-50">

              <td className="tw-py-4 tw-px-6 tw-font-medium">
                {maskName(u.name)}
              </td>

              <td className="tw-py-4 tw-px-6">
                {maskPhone(u.phone)}
              </td>

              <td className="tw-py-4 tw-px-6 tw-truncate">
                <span className="tw-bg-slate-100 tw-px-3 tw-py-1 tw-rounded-md tw-text-xs tw-font-mono">
                  {maskEmail(u.email)}
                </span>
              </td>

              <td className="tw-py-4 tw-px-6 tw-text-slate-500">
                {formatDate(u.createdAt)}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

function formatDate(date: string) {
  const d = new Date(date);
  return d.toLocaleDateString("ko-KR");
}
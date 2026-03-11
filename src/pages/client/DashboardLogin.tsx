import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
export default function DashboardLogin() {

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);

  const navigate = useNavigate();

  function handleLogin() {

    // 임시 로그인 (아이디/비번 아무거나 입력하면 통과)
    if (id && pw) {
      navigate("/Dashboard");
    } else {
      alert("아이디와 비밀번호를 입력해주세요.");
    }

  }

  return (
<Layout>
    <div className="tw-min-h-screen tw-flex tw-items-center tw-justify-center tw-bg-slate-100">

      <div className="tw-bg-white tw-w-full tw-max-w-md tw-rounded-2xl tw-shadow-lg tw-p-8 tw-space-y-6">

        <div className="tw-text-center">

          <h1 className="tw-text-2xl tw-font-bold tw-text-slate-900">
            관심고객수집 대시보드 로그인
          </h1>

        </div>


        {/* 아이디 */}

        <div className="tw-space-y-2">

          <label className="tw-text-sm tw-font-medium tw-text-slate-600">
            아이디
          </label>

          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="tw-w-full tw-border tw-border-slate-200 tw-rounded-lg tw-px-4 tw-py-3 tw-text-sm focus:tw-outline-none focus:tw-border-blue-500"
            placeholder="아이디 입력"
          />

        </div>


        {/* 비밀번호 */}

        <div className="tw-space-y-2">

          <label className="tw-text-sm tw-font-medium tw-text-slate-600">
            비밀번호
          </label>

          <div className="tw-relative">

            <input
              type={showPw ? "text" : "password"}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="tw-w-full tw-border tw-border-slate-200 tw-rounded-lg tw-px-4 tw-py-3 tw-text-sm focus:tw-outline-none focus:tw-border-blue-500"
              placeholder="비밀번호 입력"
            />

            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="tw-absolute tw-right-3 tw-top-1/2 tw--translate-y-1/2 tw-text-sm tw-text-slate-500"
            >
            </button>

          </div>

        </div>


        {/* 로그인 버튼 */}

        <button
          onClick={handleLogin}
          className="tw-w-full tw-bg-[#5D87FF] tw-text-white tw-py-3 tw-rounded-xl tw-font-semibold hover:tw-bg-blue-600 tw-transition"
        >
          로그인하기
        </button>


        {/* 안내문구 */}

        <p className="tw-text-xs tw-text-slate-400 tw-text-center">
          비즈팅에 로그인한 아이디 및 패스워드로 로그인 진행해주세요
        </p>

      </div>

    </div>
</Layout>
  );

}
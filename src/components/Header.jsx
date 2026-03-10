import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "@mui/material";

const Header = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [windowPath, setWindowPath] = useState(location.pathname);

    const buttonStyle = {
        backgroundColor: "transparent",
        border: "none",
        color: "inherit",
    };

    const movePage = (uri) => {
        navigate(uri);
    };

    return (
        <>
            {/* 데스크탑 버전 */}
            <nav className="navbar navbar-expand-lg navbar-dark desktop-nav">
                <div className="container-xxl">

                    <a
                        className="navbar-brand bg-white d-flex justify-content-center align-items-center"
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            movePage("/intro");
                        }}
                    >
                        LOGO
                    </a>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#main_nav"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="main_nav">
                        <ul className="navbar-nav">

                            <li className="nav-item">
                                <button style={buttonStyle} onClick={() => movePage("/intro")}>
                                    서비스 소개
                                </button>
                            </li>

                            <li className="nav-item">
                                <button style={buttonStyle} onClick={() => movePage("/recommend")}>
                                    추천 메시지 발송
                                </button>
                            </li>

                            <li className="nav-item">
                                <button style={buttonStyle} onClick={() => movePage("/selfmessage/create")}>
                                    셀프 메시지 등록
                                </button>
                            </li>

                            <li className="nav-item">
                                <button style={buttonStyle} onClick={() => movePage("/sent/list")}>
                                    발송 메시지 확인
                                </button>
                            </li>

                            <li className="nav-item">
                                <button style={buttonStyle} onClick={() => movePage("/cash/charge")}>
                                    충전
                                </button>
                            </li>

                            <li className="nav-item">
                                <button style={buttonStyle} onClick={() => movePage("/announce")}>
                                    고객 센터
                                </button>
                            </li>

                        </ul>

                        <ul className="navbar-nav ms-auto">

                            <li className="nav-item me-2">
                                <button
                                    className="btn btn-light btn-sm"
                                    onClick={() => movePage("/account/login")}
                                >
                                    로그인
                                </button>
                            </li>

                            <li className="nav-item">
                                <button
                                    className="btn btn-light btn-sm"
                                    onClick={() => movePage("/register/agree")}
                                >
                                    회원가입
                                </button>
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>

            {/* 모바일 버전 */}
            <nav className="navbar navbar-expand-lg navbar-dark mobile-nav">
                <div className="container-fluid">

                    <a className="navbar-brand bg-white" href="/">
                        LOGO
                    </a>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNavDropdown">

                        <ul className="navbar-nav pt-2">

                            <li className="nav-item">
                                <Link className="nav-link" href={"/intro"}>
                                    서비스 소개
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" href={"/recommend"}>
                                    추천 메시지 발송
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" href={"/selfmessage/create"}>
                                    셀프 메시지 등록
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" href={"/sent/list"}>
                                    발송 메시지 확인
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" href={"/cash/charge"}>
                                    충전
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" href={"/announce"}>
                                    고객 센터
                                </Link>
                            </li>

                        </ul>

                    </div>

                </div>
            </nav>
        </>
    );
};

export default Header;
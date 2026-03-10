import React from "react";
import { Link } from "@mui/material";

class Footer extends React.Component {
  render() {

    const chatbotUrl = "#"; // 필요하면 여기에 챗봇 URL 넣기

    return (
      <footer className="bg-white pt-3 mt-5">
        <div className="container-xxl pb-4 px-3 text-muted">
          <div className="row">

            <div className="col-lg-8">
              <div className="pb-2">

                <a
                  href="https://www.biztalk.co.kr/newhome/0201_introduction.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  회사소개
                  <img
                    style={{ width: "14px" }}
                    src="/assets/img/external-link.svg"
                    alt="external-link"
                  />
                </a>
                {" | "}

                <Link href="/clause/use" target="_blank" rel="noopener noreferrer">
                  이용약관
                  <img
                    style={{ width: "14px" }}
                    src="/assets/img/external-link.svg"
                    alt="external-link"
                  />
                </Link>
                {" | "}

                <a
                  href="https://www.biztalk.co.kr/newhome/0402_privacy.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary"
                >
                  개인정보처리방침
                  <img
                    style={{ width: "14px" }}
                    src="/assets/img/external-link-blue.svg"
                    alt="external-link"
                  />
                </a>
                {" | "}

                <a
                  href="/clause/use/google"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google API 이용자 개인정보 처리 방침
                  <img
                    style={{ width: "14px" }}
                    src="/assets/img/external-link.svg"
                    alt="external-link"
                  />
                </a>
                {" | "}

                <Link href="/clause/spam" target="_blank" rel="noopener noreferrer">
                  스팸관리규약
                  <img
                    style={{ width: "14px" }}
                    src="/assets/img/external-link.svg"
                    alt="external-link"
                  />
                </Link>
                {" | "}

                <a
                  href={chatbotUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary"
                >
                  챗봇 문의
                </a>

              </div>

              <div>
                (주)비즈톡 서울특별시 강남구 봉은사로 304 금강빌딩 14층 ㅣ
                대표번호 1688-3764 ㅣ FAX 02-552-0930 ㅣ Email tf@biztalk.co.kr
                <br />
                대표자 정의영 ㅣ 개인정보관리책임자 정의영 ㅣ 사업자등록번호
                260-88-00124
              </div>
            </div>

            <div className="col-lg-4 text-lg-end pt-lg-2 pt-3">
              <br className="d-none d-lg-block" />
              <br className="d-none d-lg-block" />
              Copyright © BIZTALK Co. Ltd. All rights reserved
            </div>

          </div>
        </div>

        {/* 챗봇 버튼 */}
        <button
          style={{
            border: "0",
            backgroundColor: "transparent",
            position: "fixed",
            right: "calc(2vw + 5px)",
            bottom: "calc(8vw + 10px)",
            zIndex: 100,
            width: "calc(2vw + 20px)",
            height: "auto",
          }}
          onClick={() => window.open(chatbotUrl, "_blank")}
        >
        </button>

      </footer>
    );
  }
}

export default Footer;
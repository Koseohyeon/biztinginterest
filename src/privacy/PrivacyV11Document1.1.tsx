import React from "react";
import ClauseStaticDocument from "../privacy/ClauseStaticDocument";

const styles = `
    :root {
      --primary: #0d3b8e;
      --primary-dark: #081f4a;
      --primary-light: #e8f0fe;
      --accent: #1a6ef5;
      --text-main: #1a1a2e;
      --text-sub: #4a4a68;
      --text-muted: #8888a8;
      --border: #e2e6f0;
      --bg: #f5f7fc;
      --white: #ffffff;
      --new-badge: #e8f4ff;
      --new-badge-text: #1a6ef5;
      --warn: #fff8f0;
      --warn-border: #f0a030;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'Noto Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;
      background: var(--bg);
      color: var(--text-main);
      font-size: 15px;
      line-height: 1.8;
    }

    /* ── Top Bar ── */
    .topbar {
      position: sticky;
      top: 0;
      z-index: 100;
      background: var(--primary-dark);
      padding: 0 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 52px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.18);
    }
    .topbar-brand {
      font-size: 14px;
      font-weight: 700;
      color: #fff;
      letter-spacing: 1.5px;
    }
    .btn-prev {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(255,255,255,0.12);
      border: 1px solid rgba(255,255,255,0.22);
      border-radius: 6px;
      color: #fff;
      font-size: 12.5px;
      font-weight: 600;
      padding: 6px 14px;
      cursor: pointer;
      transition: background 0.2s;
      font-family: inherit;
    }
    .btn-prev:hover { background: rgba(255,255,255,0.22); }
    .btn-prev svg { width: 14px; height: 14px; }

    /* ── Layout ── */
    .page-wrap {
      max-width: 860px;
      margin: 0 auto;
      padding: 48px 24px 80px;
    }

    /* ── Page Header ── */
    .page-header {
      background: linear-gradient(135deg, var(--primary-dark) 0%, #1a3a80 100%);
      border-radius: 16px;
      padding: 40px 44px;
      margin-bottom: 36px;
      color: #fff;
    }
    .page-header .badge {
      display: inline-block;
      background: rgba(255,255,255,0.15);
      border: 1px solid rgba(255,255,255,0.3);
      border-radius: 20px;
      padding: 4px 14px;
      font-size: 11.5px;
      font-weight: 600;
      letter-spacing: 1px;
      margin-bottom: 16px;
    }
    .page-header h1 {
      font-size: 24px;
      font-weight: 700;
      line-height: 1.4;
      margin-bottom: 12px;
    }
    .page-header .meta {
      font-size: 13px;
      color: rgba(255,255,255,0.65);
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
    }
    .page-header .meta span { display: flex; align-items: center; gap: 5px; }

    /* ── TOC ── */
    .toc {
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 24px 28px;
      margin-bottom: 36px;
    }
    .toc-title {
      font-size: 13px;
      font-weight: 700;
      color: var(--text-muted);
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 14px;
    }
    .toc ol {
      list-style: none;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px 24px;
    }
    .toc ol li a {
      font-size: 13.5px;
      color: var(--text-sub);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 0;
      transition: color 0.15s;
    }
    .toc ol li a:hover { color: var(--accent); }
    .toc ol li a .toc-num {
      font-size: 11px;
      font-weight: 700;
      color: var(--accent);
      background: var(--primary-light);
      border-radius: 4px;
      width: 22px;
      height: 22px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    @media (max-width: 600px) { .toc ol { grid-template-columns: 1fr; } }

    /* ── Section Card ── */
    .section-card {
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 14px;
      margin-bottom: 20px;
      overflow: hidden;
    }
    .section-head {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 22px 28px;
      border-bottom: 1px solid var(--border);
      background: #fafbff;
    }
    .section-num {
      background: var(--primary);
      color: #fff;
      font-size: 13px;
      font-weight: 700;
      min-width: 32px;
      height: 32px;
      border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .section-title {
      font-size: 16px;
      font-weight: 700;
      color: var(--primary-dark);
    }
    .badge-new {
      display: inline-flex;
      align-items: center;
      background: var(--new-badge);
      color: var(--new-badge-text);
      font-size: 10.5px;
      font-weight: 700;
      padding: 3px 9px;
      border-radius: 20px;
      margin-left: 8px;
      letter-spacing: 0.3px;
    }
    .section-body {
      padding: 24px 28px;
    }

    /* ── Typography inside sections ── */
    .section-body p {
      font-size: 14.5px;
      color: var(--text-sub);
      line-height: 1.85;
      margin-bottom: 16px;
    }
    .section-body p:last-child { margin-bottom: 0; }

    /* Numbered list (①②...) */
    .item-list { margin-bottom: 16px; }
    .item-list:last-child { margin-bottom: 0; }
    .item-row {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
      font-size: 14.5px;
      color: var(--text-sub);
      line-height: 1.85;
    }
    .item-row:last-child { margin-bottom: 0; }
    .item-circle {
      flex-shrink: 0;
      font-weight: 700;
      color: var(--primary);
      min-width: 22px;
    }

    /* Sub numbered list 1) 2) 3) */
    .sub-list { padding-left: 4px; margin-top: 8px; }
    .sub-row {
      display: flex;
      gap: 8px;
      margin-bottom: 6px;
      font-size: 14px;
      color: var(--text-sub);
      line-height: 1.8;
    }
    .sub-num {
      flex-shrink: 0;
      color: var(--text-muted);
      min-width: 22px;
      font-weight: 500;
    }

    /* Bullet list */
    .bullet-list { padding-left: 4px; margin-top: 6px; }
    .bullet-row {
      display: flex;
      gap: 8px;
      margin-bottom: 6px;
      font-size: 14px;
      color: var(--text-sub);
      line-height: 1.8;
    }
    .bullet-dot {
      flex-shrink: 0;
      color: var(--accent);
      margin-top: 2px;
    }

    /* ── Sub section heading ── */
    .sub-heading {
      font-size: 14.5px;
      font-weight: 700;
      color: var(--primary-dark);
      margin: 20px 0 10px;
      padding-left: 10px;
      border-left: 3px solid var(--accent);
    }
    .sub-heading:first-child { margin-top: 0; }

    /* ── Tables ── */
    .tbl-wrap {
      overflow-x: auto;
      margin: 12px 0 16px;
      border-radius: 8px;
      border: 1px solid var(--border);
    }
    .tbl-wrap:last-child { margin-bottom: 0; }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13.5px;
    }
    thead th {
      background: var(--primary-dark);
      color: #fff;
      padding: 10px 14px;
      font-weight: 600;
      text-align: left;
      white-space: nowrap;
    }
    tbody td {
      padding: 10px 14px;
      border-bottom: 1px solid var(--border);
      color: var(--text-sub);
      vertical-align: top;
      line-height: 1.7;
    }
    tbody tr:last-child td { border-bottom: none; }
    tbody tr:nth-child(even) td { background: #f8f9fc; }

    /* ── Info / Note box ── */
    .note-box {
      background: #f0f7ff;
      border: 1px solid #c5dcff;
      border-radius: 8px;
      padding: 14px 18px;
      font-size: 13.5px;
      color: var(--text-sub);
      line-height: 1.8;
      margin-top: 14px;
    }
    .note-box strong { color: var(--primary); }

    /* ── Contact table ── */
    .contact-table thead th { background: #3a5a9e; }

    /* ── Effective date strip ── */
    .effective-strip {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
      background: var(--primary-light);
      border: 1px solid #bbd0ff;
      border-radius: 8px;
      padding: 14px 20px;
      font-size: 14px;
      color: var(--primary-dark);
      font-weight: 500;
      margin-top: 16px;
    }
    .effective-strip span { display: flex; align-items: center; gap: 6px; }
    .effective-strip .label { font-weight: 400; color: var(--text-muted); }

    /* ── Modal ── */
    .modal-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(10,20,50,0.55);
      z-index: 200;
      align-items: flex-start;
      justify-content: center;
      padding: 20px;
    }
    .modal-overlay.open { display: flex; }
    .modal {
      background: var(--white);
      border-radius: 16px;
      max-width: 620px;
      width: 100%;
      max-height: 88vh;
      overflow-y: auto;
      box-shadow: 0 24px 60px rgba(0,0,0,0.22);
      animation: modalIn 0.22s ease;
    }
    @keyframes modalIn {
      from { opacity: 0; transform: translateY(16px) scale(0.98); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    .modal-header {
      background: linear-gradient(135deg, var(--primary-dark), #1a3a80);
      padding: 24px 28px 20px;
      border-radius: 16px 16px 0 0;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .modal-header h2 { font-size: 17px; font-weight: 700; color: #fff; line-height: 1.4; }
    .modal-header p  { font-size: 12.5px; color: rgba(255,255,255,0.6); margin-top: 4px; }
    .modal-close {
      background: rgba(255,255,255,0.15);
      border: none;
      border-radius: 6px;
      color: #fff;
      width: 30px; height: 30px;
      font-size: 18px;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      margin-left: 12px;
    }
    .modal-body { padding: 24px 28px 28px; }

    .modal-section { margin-bottom: 24px; }
    .modal-section:last-child { margin-bottom: 0; }
    .modal-section-title {
      font-size: 13.5px;
      font-weight: 700;
      color: var(--primary-dark);
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .modal-section-title .num {
      background: var(--accent);
      color: #fff;
      font-size: 11px;
      font-weight: 700;
      width: 20px; height: 20px;
      border-radius: 4px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }

    /* modal change table */
    .modal-tbl { width: 100%; border-collapse: collapse; font-size: 13px; border-radius: 8px; overflow: hidden; border: 1px solid var(--border); }
    .modal-tbl thead th { background: var(--primary-dark); color: #fff; padding: 9px 13px; font-weight: 600; text-align: left; }
    .modal-tbl tbody td { padding: 10px 13px; border-bottom: 1px solid var(--border); color: var(--text-sub); vertical-align: top; line-height: 1.65; }
    .modal-tbl tbody tr:last-child td { border-bottom: none; }
    .modal-tbl tbody tr:nth-child(even) td { background: #f8f9fc; }

    /* modal checklist */
    .check-list { list-style: none; }
    .check-list li {
      display: flex;
      gap: 9px;
      font-size: 13.5px;
      color: var(--text-sub);
      line-height: 1.75;
      padding: 7px 0;
      border-bottom: 1px dashed var(--border);
    }
    .check-list li:last-child { border-bottom: none; }
    .check-list li .icon { color: var(--accent); flex-shrink: 0; margin-top: 2px; }

    /* ── Responsive ── */
    @media (max-width: 640px) {
      .page-header { padding: 28px 22px; }
      .section-head, .section-body { padding: 18px 18px; }
      .modal-body { padding: 18px 18px 22px; }
      .topbar { padding: 0 16px; }
    }
    .clause-version-nav {
      display: flex; flex-wrap: wrap; gap: 8px; justify-content: flex-end; margin: 0 0 16px;
    }
    .clause-version-btn {
      appearance: none; border: 1px solid #cbd5e1; background: #fff; color: #334155;
      border-radius: 999px; padding: 9px 16px; font-size: 13px; font-weight: 600; cursor: pointer;
      font-family: inherit;
    }
    .clause-version-btn.is-active { border-color: #2563eb; background: #2563eb; color: #fff; }
    .toc ol li a { white-space: nowrap; }
    .page-header,
    .page-header .badge,
    .page-header h1,
    .page-header .meta,
    .page-header .meta span {
      color: #fff !important;
    }
  `;


type PrivacyV11DocumentProps = {
  modal?: React.ComponentProps<typeof ClauseStaticDocument>["modal"];
};


const PrivacyV11Document = ({ modal }: PrivacyV11DocumentProps) => {

  return (
    <ClauseStaticDocument styles={styles} modal={modal}>
      <div className="page-wrap">

        {/* ── 버전 네비게이션 ── */}
        <div className="clause-version-nav">
          <button type="button" className="clause-version-btn is-active" data-route="/clause/privacy">
            {"현재 버전"}
          </button>
          <button type="button" className="clause-version-btn" data-route="/clause/privacy/v1.0">
            {"이전 버전"}
          </button>
        </div>

        {/* ── 페이지 헤더 ── */}
        <div className="page-header">
          <div className="badge">{"개인정보처리방침"}</div>
          <h1>{"비즈톡 비즈팅(Bizting) 서비스 개인정보처리방침"}</h1>
        </div>

        {/* ── 서문 ── */}
        <div className="section-card">
          <div className="section-body">
            <p>
              {"비즈톡 주식회사(이하 '회사')는 정보주체의 자유와 권리 보호를 위해 「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여 적법하게 개인정보를 처리하고 안전하게 관리합니다. 이에 「개인정보 보호법」 제30조에 따라 다음과 같이 개인정보 처리방침을 수립·공개합니다."}
            </p>
          </div>
        </div>

        {/* ── 목차 (12개 섹션) ── */}
        <div className="toc">
          <div className="toc-title">{"목차"}</div>
          <ol>
            {[
              { num: "1", href: "#s1", label: "개인정보의 처리 목적, 수집 항목 및 보유기간" },
              { num: "2", href: "#s2", label: "개인정보 자동 수집 장치의 설치·운영 및 거부" },
              { num: "3", href: "#s3", label: "개인정보 처리업무의 위탁" },
              { num: "4", href: "#s4", label: "개인정보의 제3자 제공" },
              { num: "5", href: "#s5", label: "개인정보의 국외 이전" },
              { num: "6", href: "#s6", label: "개인정보의 파기 절차 및 방법" },
              { num: "7", href: "#s7", label: "개인정보의 안전성 확보조치" },
              { num: "8", href: "#s8", label: "정보주체와 법정대리인의 권리·의무 및 행사방법" },
              { num: "9", href: "#s9", label: "개인정보 보호책임자" },
              { num: "10", href: "#s10", label: "개인정보 열람 청구" },
              { num: "11", href: "#s11", label: "권익침해 구제방법" },
              { num: "12", href: "#s12", label: "개인정보 처리방침의 변경" },
            ].map(({ num, href, label }) => (
              <li key={num}>
                <a
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    target?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span className="toc-num">{num}</span>
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* ════════════════════════════════════════════
            섹션 1. 개인정보의 처리 목적, 수집 항목 및 보유기간
        ════════════════════════════════════════════ */}
        <div className="section-card" id="s1">
          <div className="section-head">
            <div className="section-num">{"1"}</div>
            <div className="section-title">{"개인정보의 처리 목적, 수집 항목 및 보유기간"}</div>
          </div>
          <div className="section-body">
            <p>
              {"회사는 다음의 목적을 위하여 최소한의 개인정보를 수집·처리합니다. 이용 목적이 변경되는 경우 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행합니다."}
            </p>

            {/* 가. 서비스 회원가입 및 계정 관리 */}
            <div className="sub-heading">{"가. 서비스 회원가입 및 계정 관리"}</div>
            <div className="item-list">
              <div className="item-row">
                <span className="item-circle" style={{ minWidth: "80px", fontSize: "13.5px", fontWeight: "600", color: "var(--text-main)" }}>{"처리 목적"}</span>
                <span>{"회원가입 의사 확인, 본인 식별·인증, 서비스 이용 자격 유지·관리, 부정이용 방지, 중복가입 확인"}</span>
              </div>
              <div className="item-row">
                <span className="item-circle" style={{ minWidth: "80px", fontSize: "13.5px", fontWeight: "600", color: "var(--text-main)" }}>{"수집 항목"}</span>
                <span>
                  {"회사명, 사업자번호, 주소, 사업자등록증, 업태, 업종, 서비스 담당자 정보(아이디, 비밀번호, 휴대폰번호, 이름, 이메일), 법인명(국문 - 개인사업자 제외) / "}
                  <strong>{"선택:"}</strong>
                  {" 대표자명"}
                </span>
              </div>
              <div className="item-row">
                <span className="item-circle" style={{ minWidth: "80px", fontSize: "13.5px", fontWeight: "600", color: "var(--text-main)" }}>{"보유·이용기간"}</span>
                <span>{"회원 탈퇴 시까지. 단, 부정이용기록(ID, 대표자명): 1년 / 고객문의 응대 정보(이름, 연락처, 이메일, 문의내용): 90일"}</span>
              </div>
            </div>

            {/* 나. 서비스 제공 및 운영 */}
            <div className="sub-heading">{"나. 서비스 제공 및 운영"}</div>
            <div className="item-list">
              <div className="item-row">
                <span className="item-circle" style={{ minWidth: "80px", fontSize: "13.5px", fontWeight: "600", color: "var(--text-main)" }}>{"처리 목적"}</span>
                <span>{"서비스 신청·승낙사항 이행, 요금정산, 타겟 마케팅 메시지 발송 및 관련 서비스 제공, 이용내역서 및 계산서 발행, 미납요금 안내 및 청구"}</span>
              </div>
              <div className="item-row">
                <span className="item-circle" style={{ minWidth: "80px", fontSize: "13.5px", fontWeight: "600", color: "var(--text-main)" }}>{"수집 항목"}</span>
                <span>{"정산기록, 이용현황, 콘텐츠 및 메시지 내용 등 (서비스 이용 또는 업무처리 과정에서 생성 또는 수집될 수 있는 정보)"}</span>
              </div>
              <div className="item-row">
                <span className="item-circle" style={{ minWidth: "80px", fontSize: "13.5px", fontWeight: "600", color: "var(--text-main)" }}>{"보유·이용기간"}</span>
                <span>{"서비스 이용기간. 단, 대금 결제 및 재화 공급 기록·계약 또는 청약철회 기록: 5년 / 소비자 불만·분쟁 처리 기록: 3년 (전자상거래법 제6조)"}</span>
              </div>
            </div>

            {/* 다. 이용자 관리 */}
            <div className="sub-heading">{"다. 이용자 관리"}</div>
            <div className="item-list">
              <div className="item-row">
                <span className="item-circle" style={{ minWidth: "80px", fontSize: "13.5px", fontWeight: "600", color: "var(--text-main)" }}>{"처리 목적"}</span>
                <span>{"분쟁 조정을 위한 기록 보전, 민원처리, 고지사항 전달, 이용자 요청에 따른 이용내역 제공, 서비스 이용 통계"}</span>
              </div>
              <div className="item-row">
                <span className="item-circle" style={{ minWidth: "80px", fontSize: "13.5px", fontWeight: "600", color: "var(--text-main)" }}>{"수집 항목"}</span>
                <span>{"IP Address, 쿠키, 방문 일시, 서비스 이용 기록, 불량 이용 기록 (자동 생성·수집) / 상담 신청 시: 성명, 연락처, 이메일"}</span>
              </div>
              <div className="item-row">
                <span className="item-circle" style={{ minWidth: "80px", fontSize: "13.5px", fontWeight: "600", color: "var(--text-main)" }}>{"보유·이용기간"}</span>
                <span>{"개인정보 수집·이용 동의일로부터 서비스 이용 기간 동안 보유·이용하며, 회원 탈퇴 시 파기"}</span>
              </div>
            </div>

            {/* 라. 마케팅 */}
            <div className="sub-heading">{"라. 마케팅"}</div>
            <div className="item-list">
              <div className="item-row">
                <span className="item-circle" style={{ minWidth: "80px", fontSize: "13.5px", fontWeight: "600", color: "var(--text-main)" }}>{"처리 목적"}</span>
                <span>{"N-Pass 솔루션을 통한 관심 고객 모집, 이벤트 혜택 안내 및 타겟 마케팅 서비스 제공"}</span>
              </div>
              <div className="item-row">
                <span className="item-circle" style={{ minWidth: "80px", fontSize: "13.5px", fontWeight: "600", color: "var(--text-main)" }}>{"수집 항목"}</span>
                <span>{"개인정보 수집·이용 동의일로부터 서비스 이용 기간 동안 수집된 정보"}</span>
              </div>
              <div className="item-row">
                <span className="item-circle" style={{ minWidth: "80px", fontSize: "13.5px", fontWeight: "600", color: "var(--text-main)" }}>{"보유·이용기간"}</span>
                <span>{"개인정보 수집·이용 동의일로부터 서비스 이용 기간 동안 보유·이용하며, 회원 탈퇴 시 파기"}</span>
              </div>
            </div>

            {/* 보유기간 안내 */}
            <p style={{ marginTop: "16px" }}>
              {"회사는 홈페이지 회원가입 및 관리 목적으로, 법령에서 정하는 경우를 제외하고 회원 탈퇴 시까지 보유·이용하며, 탈퇴 후 지체 없이 파기합니다. 단, 아래 사유에 따라 일정 기간 보관합니다."}
            </p>

            <div className="sub-heading">{"① 회사 내부 방침에 의한 보유"}</div>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>{"보관 정보"}</th>
                    <th>{"보유 기간"}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{"부정이용기록 (ID, 대표자명)"}</td>
                    <td>{"1년"}</td>
                  </tr>
                  <tr>
                    <td>{"고객문의 응대 정보 (이름, 연락처, 이메일, 문의내용)"}</td>
                    <td>{"90일"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="sub-heading">{"② 관계 법령에 따른 보유"}</div>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>{"보유 항목"}</th>
                    <th>{"보존 근거"}</th>
                    <th>{"보유 기간"}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{"웹사이트 방문 기록"}</td>
                    <td>{"통신비밀보호법 제15조의2"}</td>
                    <td>{"3개월"}</td>
                  </tr>
                  <tr>
                    <td>{"대금 결제 및 재화 공급 기록"}</td>
                    <td>{"전자상거래법 제6조"}</td>
                    <td>{"5년"}</td>
                  </tr>
                  <tr>
                    <td>{"계약 또는 청약철회 기록"}</td>
                    <td>{"전자상거래법 제6조"}</td>
                    <td>{"5년"}</td>
                  </tr>
                  <tr>
                    <td>{"소비자 불만·분쟁 처리 기록"}</td>
                    <td>{"전자상거래법 제6조"}</td>
                    <td>{"3년"}</td>
                  </tr>
                  <tr>
                    <td>{"통신이용자 정보"}</td>
                    <td>{"전기통신사업법 제83조"}</td>
                    <td>{"1년"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            섹션 2. 개인정보 자동 수집 장치의 설치·운영 및 거부
        ════════════════════════════════════════════ */}
        <div className="section-card" id="s2">
          <div className="section-head">
            <div className="section-num">{"2"}</div>
            <div className="section-title">{"개인정보 자동 수집 장치의 설치·운영 및 거부"}</div>
          </div>
          <div className="section-body">
            <p>
              {"이용자 개개인에게 개인화되고 맞춤화 된 서비스를 제공하기 위해서 회사는 이용자의 정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다. 쿠키는 웹사이트를 운영하는데 이용되는 서버가 사용자의 브라우저에게 보내는 조그마한 데이터 꾸러미로 이용자 컴퓨터의 하드디스크에 저장됩니다."}
            </p>
            <div className="item-list">
              <div className="item-row">
                <span className="item-circle">{"①"}</span>
                <span>
                  <strong>{"쿠키의 사용 목적"}</strong>
                  {" 회원과 비회원의 접속 빈도나 방문 시간 등의 분석, 이용자의 취향과 관심분야의 파악 및 자취 추적, 각종 이벤트 참여 정도 및 방문 회수 파악 등을 통한 타겟 마케팅 및 개인 맞춤 서비스 제공"}
                </span>
              </div>
              <div className="item-row">
                <span className="item-circle">{"②"}</span>
                <span>
                  <strong>{"쿠키 설정 거부 방법"}</strong>
                  {" 이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서, 이용자는 웹브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다."}
                  <div className="note-box" style={{ marginTop: "10px" }}>
                    <strong>{"* 브라우저별 쿠키 설정 방법"}</strong>
                    <div className="bullet-list" style={{ marginTop: "8px" }}>
                      <div className="bullet-row">
                        <span className="bullet-dot">{"•"}</span>
                        <span>{"Chrome: 설정 > 개인 정보 보호 및 보안 > 쿠키 및 기타 사이트 데이터"}</span>
                      </div>
                      <div className="bullet-row">
                        <span className="bullet-dot">{"•"}</span>
                        <span>{"Edge: 설정 > 쿠키 및 사이트 권한 > 쿠키 및 사이트 데이터 관리 및 삭제"}</span>
                      </div>
                      <div className="bullet-row">
                        <span className="bullet-dot">{"•"}</span>
                        <span>{"Safari: 환경설정 > 개인 정보 보호 > 쿠키 및 웹사이트 데이터 관리"}</span>
                      </div>
                      <div className="bullet-row">
                        <span className="bullet-dot">{"•"}</span>
                        <span>{"Firefox: 설정 > 개인 정보 및 보안 > 쿠키 및 사이트 데이터"}</span>
                      </div>
                    </div>
                  </div>
                </span>
              </div>
            </div>
            <p>
              {"회사는 구글(Google)에서 제공하는 Google Analytics를 사용하여 웹사이트 이용 통계를 분석하고 서비스 개선에 활용하고 있습니다. Google Analytics를 통해 개인을 식별할 수 있는 정보는 수집되지 않습니다."}
            </p>
            <div className="item-list">
              <div className="item-row">
                <span className="item-circle">{"①"}</span>
                <span>
                  <strong>{"Analytics 사용 목적:"}</strong>
                  {" 서비스 이용 통계 분석 및 품질 개선"}
                </span>
              </div>
              <div className="item-row">
                <span className="item-circle">{"②"}</span>
                <span>
                  <strong>{"Analytics 설치·운영 및 거부 방법:"}</strong>
                  <div className="sub-list">
                    <div className="sub-row">
                      <span className="bullet-dot">{"•"}</span>
                      <span>{"Google에서 제공하는 Google Analytics 차단 브라우저 부가 기능(add-on)을 설치하여 수집을 거부할 수 있습니다."}</span>
                    </div>
                    <div className="sub-row">
                      <span className="bullet-dot">{"•"}</span>
                      <span>
                        {"[차단 기능 다운로드 링크] "}
                        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" style={{ color: "var(--accent)" }}>
                          {"https://tools.google.com/dlpage/gaoptout"}
                        </a>
                      </span>
                    </div>
                  </div>
                </span>
              </div>
              <div className="item-row">
                <span className="item-circle">{"③"}</span>
                <span>{"Analytics 정보의 처리를 거부할 경우, 맞춤형 서비스 제공이 일부 제한될 수 있습니다."}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            섹션 3. 개인정보 처리업무의 위탁
        ════════════════════════════════════════════ */}
        <div className="section-card" id="s3">
          <div className="section-head">
            <div className="section-num">{"3"}</div>
            <div className="section-title">{"개인정보 처리업무의 위탁"}</div>
          </div>
          <div className="section-body">
            <p>
              {"회사는 서비스 제공을 위해 아래와 같이 개인정보 처리 업무를 외부 업체에 위탁합니다. 위탁계약 시 개인정보보호 관련 지시 엄수, 유출 금지, 사고 시 책임 부담 등을 명확히 규정합니다."}
            </p>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>{"수탁업체"}</th>
                    <th>{"제공 항목"}</th>
                    <th>{"위탁 내용"}</th>
                    <th>{"보유·이용기간"}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{"KSNET"}</td>
                    <td>{"카드번호, 유효기간, 비밀번호 앞 2자리, 생년월일/사업자등록번호, 무통장입금 계좌번호"}</td>
                    <td>{"전자거래(선불 서비스)"}</td>
                    <td>{"위탁 계약 종료 시까지"}</td>
                  </tr>
                  <tr>
                    <td>{"다날"}</td>
                    <td>{"전화번호, 이름"}</td>
                    <td>{"휴대폰 본인인증"}</td>
                    <td>{"위탁 계약 종료 시까지"}</td>
                  </tr>
                  <tr>
                    <td>{"AWS (Seoul Region)"}</td>
                    <td>{"-"}</td>
                    <td>{"서비스 제공을 위한 서버 운영"}</td>
                    <td>{"위탁 계약 종료 시까지"}</td>
                  </tr>
                  <tr>
                    <td>{"카카오"}</td>
                    <td>{"전화번호, 메시지 전문"}</td>
                    <td>{"알림톡 및 브랜드 메시지 발송"}</td>
                    <td>{"메시지 발송 후 즉각 파기"}</td>
                  </tr>
                  <tr>
                    <td>{"LGU+"}</td>
                    <td>{"전화번호, 메시지 전문"}</td>
                    <td>{"문자메시지 발송"}</td>
                    <td>{"위탁 계약 종료 시까지"}</td>
                  </tr>
                  <tr>
                    <td>{"인포뱅크"}</td>
                    <td>{"전화번호, 메시지 전문"}</td>
                    <td>{"문자메시지 발송"}</td>
                    <td>{"위탁 계약 종료 시까지"}</td>
                  </tr>
                  <tr>
                    <td>{"BGF네트웍스"}</td>
                    <td>{"전화번호, 메시지 전문"}</td>
                    <td>{"문자메시지 발송"}</td>
                    <td>{"위탁 계약 종료 시까지"}</td>
                  </tr>
                  <tr>
                    <td>{"센드소프트(주)"}</td>
                    <td>{"전화번호, 메시지 전문"}</td>
                    <td>{"문자메시지 발송"}</td>
                    <td>{"위탁 계약 종료 시까지"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            섹션 4. 개인정보의 제3자 제공
        ════════════════════════════════════════════ */}
        <div className="section-card" id="s4">
          <div className="section-head">
            <div className="section-num">{"4"}</div>
            <div className="section-title">
              {"개인정보의 제3자 제공"}

            </div>
          </div>
          <div className="section-body">
            <p>
              {"회사는 원칙적으로 정보주체의 개인정보를 수집·이용 목적 범위를 초과하여 처리하지 않습니다. 다만, 비즈팅 N-Pass 서비스의 원활한 제공을 위하여 정보주체의 별도 명시적 동의를 받아 아래와 같이 비즈팅 캠페인을 집행하는 고객사에게 개인정보를 제3자 제공합니다."}
            </p>

            <div className="sub-heading">{"① 개인정보의 제3자 제공 및 책임 분리"}</div>
            <div className="item-list">
              <div className="item-row">
                <span className="item-circle" style={{ minWidth: "90px", fontSize: "13.5px", fontWeight: "600", color: "var(--text-main)" }}>{"제3자 제공 역할"}</span>
                <span>{"회사는 본 서비스 제공을 위하여 수신자의 개인정보를 적법하게 수집하여 고객사에게 제3자 제공하는 역할을 담당합니다."}</span>
              </div>
              <div className="item-row">
                <span className="item-circle" style={{ minWidth: "90px", fontSize: "13.5px", fontWeight: "600", color: "var(--text-main)" }}>{"책임 분리"}</span>
                <span>{"고객사는 제공받은 개인정보를 관련 법령에 따라 독립적인 책임 하에 적법하게 처리하여야 하며, 해당 정보의 보호, 활용, 마케팅 활동 및 사고 발생 시의 모든 책임은 고객사에게 있습니다."}</span>
              </div>
            </div>

            <div className="sub-heading">{"② 제3자 제공 상세 안내"}</div>
            <div className="item-list">
              <div className="item-row">
                <span className="item-circle" style={{ minWidth: "120px", fontSize: "13.5px", fontWeight: "600", color: "var(--text-main)" }}>{"제공받는 자"}</span>
                <span>{"비즈팅 N-Pass 서비스 이용 고객사 (개별 캠페인을 주관하는 해당 광고주)"}</span>
              </div>
              <div className="item-row">
                <span className="item-circle" style={{ minWidth: "120px", fontSize: "13.5px", fontWeight: "600", color: "var(--text-main)" }}>{"이용 목적"}</span>
                <span>{"N-Pass 솔루션을 통한 회원 유치, 이벤트 혜택 안내 및 리텐션 마케팅"}</span>
              </div>
              <div className="item-row">
                <span className="item-circle" style={{ minWidth: "120px", fontSize: "13.5px", fontWeight: "600", color: "var(--text-main)" }}>{"제공하는 항목"}</span>
                <span>{"이름, 휴대전화번호, 이메일"}</span>
              </div>
              <div className="item-row">
                <span className="item-circle" style={{ minWidth: "120px", fontSize: "13.5px", fontWeight: "600", color: "var(--text-main)" }}>{"보유 및 이용기간"}</span>
                <span>{"제공받는 자의 이용 목적 달성 시 또는 수신자의 동의 철회 시까지 보관 후 지체 없이 파기"}</span>
              </div>
              <div className="item-row">
                <span className="item-circle" style={{ minWidth: "120px", fontSize: "13.5px", fontWeight: "600", color: "var(--text-main)" }}>{"동의 거부 시 불이익"}</span>
                <span>{"제3자 제공 동의 거부 시 N-Pass 서비스를 통한 이벤트 참여 및 혜택 수령 불가 (비즈팅 기본 서비스 이용에는 영향 없음)"}</span>
              </div>
            </div>

            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>{"구분"}</th>
                    <th>{"내용"}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: "600", whiteSpace: "nowrap" }}>{"대상"}</td>
                    <td>{"비즈팅 N-Pass 서비스 이용 고객사(광고주) 구체적인 명칭은 동의 화면에 별도 고지"}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "600", whiteSpace: "nowrap" }}>{"목적"}</td>
                    <td>{"N-pass 솔루션을 통한 회원 유치 및 리텐션 마케팅"}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "600", whiteSpace: "nowrap" }}>{"항목"}</td>
                    <td>{"이름, 휴대전화번호, 이메일"}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "600", whiteSpace: "nowrap" }}>{"보유·이용기간"}</td>
                    <td>{"개인정보는 고객사의 이용 목적 달성 또는 동의 철회 시까지 보관되며, 이후 지체 없이 파기됩니다. (동의 거부 및 철회 시 즉시 파기)"}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "600", whiteSpace: "nowrap" }}>{"동의 거부 시 불이익"}</td>
                    <td>{"N-pass 서비스 이용 불가 (비즈팅 기본 서비스 이용에는 영향 없음)"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="sub-heading">{"[정보주체의 권리 보장 및 동의 철회 안내]"}</div>
            <div className="bullet-list">
              <div className="bullet-row">
                <span className="bullet-dot">{"•"}</span>
                <span>
                  <strong>{"재제공 금지:"}</strong>
                  {" 본 서비스를 통해 개인정보를 제공받은 고객사(광고주)는 명시된 이용 목적 외의 용도로 해당 정보를 이용하거나, 다른 제3자에게 재제공 및 처리 위탁하는 것이 엄격히 금지됩니다."}
                </span>
              </div>
              <div className="bullet-row">
                <span className="bullet-dot">{"•"}</span>
                <span>
                  <strong>{"동의 철회 방법:"}</strong>
                  {" 정보주체는 개인정보 제3자 제공에 대한 동의를 언제든지 철회할 수 있습니다. 동의 철회는 네이버 앱 또는 웹 > 네이버ID > 이력관리 > 연결된 서비스 관리에서 서비스 동의 > 서비스 동의 철회를 할 수 있습니다."}
                </span>
              </div>
              <div className="bullet-row">
                <span className="bullet-dot">{"•"}</span>
                <span>
                  <strong>{"철회 시 조치:"}</strong>
                  {" 동의 철회(또는 파기 요청) 접수 시, 비즈팅은 시스템 내 해당 정보를 지체 없이 5일 이내 복구 불가능한 방법으로 파기하며, 정보를 제공받은 고객사에게도 즉시 파기하도록 안내하여 정보주체의 권리를 철저히 보장합니다."}
                </span>
              </div>
            </div>

            <div className="note-box" style={{ marginTop: "16px" }}>
              {"※ 회사는 제3자 제공 시 제공받는 자, 목적, 항목, 보유 기간을 정보주체에게 별도로 고지하고 동의를 받습니다. 제공 이력(고객사, 일시, 항목 등)은 시스템 로그 및 대장으로 기록·관리합니다."}
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            섹션 5. 개인정보의 국외 이전
        ════════════════════════════════════════════ */}
        <div className="section-card" id="s5">
          <div className="section-head">
            <div className="section-num">{"5"}</div>
            <div className="section-title">
              {"개인정보의 국외 이전"}

            </div>
          </div>
          <div className="section-body">
            <p>{"회사는 현재 이용자의 개인정보를 국외로 이전하지 않습니다."}</p>
            <p>{"향후 국외 이전이 필요한 경우, 「개인정보 보호법」 제28조의8에 따라 이전받는 자, 이전 국가, 이전 항목, 이전 목적, 보유 및 이용기간, 거부 방법 및 거부 시 불이익 등을 정보주체에게 알리고 동의를 받겠습니다."}</p>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            섹션 6. 개인정보의 파기 절차 및 방법
        ════════════════════════════════════════════ */}
        <div className="section-card" id="s6">
          <div className="section-head">
            <div className="section-num">{"6"}</div>
            <div className="section-title">{"개인정보의 파기 절차 및 방법"}</div>
          </div>
          <div className="section-body">
            <p>
              {"개인정보는 고객사의 이용 목적 달성 또는 계약 종료 시까지 보관되며, 이후 지체 없이 파기됩니다. 단, 회사는 통계 목적의 정보에 한해 개인을 식별할 수 없도록 비식별화하여 보관할 수 있습니다. 집계된 숫자(통계 수치)만을 수집·보관하며, 개인을 식별할 수 있는 정보는 포함하지 않습니다."}
            </p>
            <div className="item-list">
              <div className="item-row">
                <span className="item-circle">{"①"}</span>
                <span>
                  <strong>{"파기계획 수립"}</strong>
                  <br />
                  {"회사는 내부 방침 및 관련 법령에 따라 개인정보 파기계획을 수립합니다."}
                </span>
              </div>
              <div className="item-row">
                <span className="item-circle">{"②"}</span>
                <span>
                  <strong>{"파기절차 및 기한"}</strong>
                  <br />
                  {"이용자가 입력한 정보는 보유기간이 경과했거나 처리목적이 달성된 후 지체 없이 파기합니다."}
                  <br />
                  {"관계 법령에 따라 보존해야 하는 경우 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 안전하게 보관하며, 다른 목적으로는 이용하지 않습니다."}
                </span>
              </div>
              <div className="item-row">
                <span className="item-circle">{"③"}</span>
                <span>
                  <strong>{"파기방법"}</strong>
                  <br />
                  {"회사는 처리하는 개인정보를 파기할 때에는 다음의 방법으로 파기합니다."}
                  <div className="sub-list">
                    <div className="sub-row">
                      <span className="sub-num">{"1)"}</span>
                      <span>{"전자적 파일 형태인 경우: 복원이 불가능한 방법으로 영구삭제"}</span>
                    </div>
                    <div className="sub-row">
                      <span className="sub-num">{"2)"}</span>
                      <span>{"전자적 파일의 형태 외의 기록물, 인쇄물, 서면, 그 밖의 기록매체인 경우: 파쇄 또는 소각"}</span>
                    </div>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            섹션 7. 개인정보의 안전성 확보조치
        ════════════════════════════════════════════ */}
        <div className="section-card" id="s7">
          <div className="section-head">
            <div className="section-num">{"7"}</div>
            <div className="section-title">{"개인정보의 안전성 확보조치"}</div>
          </div>
          <div className="section-body">
            <div className="item-list">
              <div className="item-row">
                <span className="item-circle">{"①"}</span>
                <span>
                  <strong>{"기술적인 대책"}</strong>
                  <div className="sub-list">
                    <div className="sub-row">
                      <span className="sub-num">{"1)"}</span>
                      <span>{"회사는 이용자의 개인정보를 관련 법률규정 및 내부정책에 따라 보안기능을 통해 안전하게 보호하고 있습니다."}</span>
                    </div>
                    <div className="sub-row">
                      <span className="sub-num">{"2)"}</span>
                      <span>{"회사는 백신프로그램을 이용하여 컴퓨터 바이러스에 의한 피해를 방지하기 위한 조치를 취하고 있습니다. 백신프로그램은 주기적으로 업데이트되며 갑작스러운 바이러스가 출현될 경우 백신이 나오는 즉시 이를 적용함으로써 개인정보가 침해되는 것을 방지하고 있습니다."}</span>
                    </div>
                    <div className="sub-row">
                      <span className="sub-num">{"3)"}</span>
                      <span>{"회사는 네트워크 상의 개인정보를 안전하게 전송할 수 있는 보안장치를 채택하고 있습니다."}</span>
                    </div>
                    <div className="sub-row">
                      <span className="sub-num">{"4)"}</span>
                      <span>{"회사는 해킹 등에 의해 이용자의 개인정보가 유출되는 것을 방지하기 위하여, 외부로부터의 침입을 차단하는 장치를 이용하고 있으며 24시간 X 365일 침입을 감시하고 있습니다."}</span>
                    </div>
                  </div>
                </span>
              </div>
              <div className="item-row">
                <span className="item-circle">{"②"}</span>
                <span>
                  <strong>{"관리적인 대책"}</strong>
                  <div className="sub-list">
                    <div className="sub-row">
                      <span className="sub-num">{"1)"}</span>
                      <span>{"회사는 개인정보 처리직원을 개인정보 관리업무를 수행하는 자 및 업무상 개인정보의 처리가 불가피 한 자로 엄격히 제한하고 담당직원에 대한 수시 교육을 통하여 개인정보처리방침의 준수를 강조하고 있습니다."}</span>
                    </div>
                  </div>
                </span>
              </div>
              <div className="item-row">
                <span className="item-circle">{"③"}</span>
                <span>
                  <strong>
                    {"대시보드 및 다운로드 통제 "}

                  </strong>
                  <div className="sub-list">
                    <div className="sub-row">
                      <span className="sub-num">{"1)"}</span>
                      <span>{"고객사 대시보드: 제3자 동의를 받은 정보주체의 정보만 열람 가능, 최소 권한 부여, MFA(이메일 인증 또는 OTP) 적용"}</span>
                    </div>
                    <div className="sub-row">
                      <span className="sub-num">{"2)"}</span>
                      <span>{"마스킹 처리: 화면 노출 시 개인정보 마스킹 처리"}</span>
                    </div>
                    <div className="sub-row">
                      <span className="sub-num">{"3)"}</span>
                      <span>{"다운로드 통제: 사유 입력 강제, 다운로드 파일 비밀번호 설정, 접속기록 월 1회 이상 점검"}</span>
                    </div>
                    <div className="sub-row">
                      <span className="sub-num">{"4)"}</span>
                      <span>{"접속기록 보관: 일반적 경우 1년 이상, 5만 명 이상 정보주체 처리 시 2년 이상"}</span>
                    </div>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            섹션 8. 정보주체와 법정대리인의 권리·의무 및 행사방법
        ════════════════════════════════════════════ */}
        <div className="section-card" id="s8">
          <div className="section-head">
            <div className="section-num">{"8"}</div>
            <div className="section-title">{"정보주체와 법정대리인의 권리·의무 및 행사방법"}</div>
          </div>
          <div className="section-body">
            <div className="item-list">
              <div className="item-row">
                <span className="item-circle">{"①"}</span>
                <span>
                  {"정보주체는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다."}
                  <div className="note-box" style={{ marginTop: "8px" }}>
                    {"※ 만 14세 미만 아동에 관한 개인정보의 열람 등 요구는 법정대리인이 직접 해야 하며, 만 14세 이상의 미성년자인 정보주체는 정보주체의 개인정보에 관하여 미성년자 본인이 권리를 행사하거나 법정대리인을 통하여 권리를 행사할 수도 있습니다."}
                  </div>
                  <div className="sub-list">
                    <div className="sub-row">
                      <span className="sub-num">{"1)"}</span>
                      <span>{"홈페이지 '비즈팅 > 마이페이지'에서 개인정보 조회 가능"}</span>
                    </div>
                    <div className="sub-row">
                      <span className="sub-num">{"2)"}</span>
                      <span>{"정정·삭제·처리정지 및 동의 철회는 '고객센터 > 1:1문의'를 통해 요청"}</span>
                    </div>
                    <div className="sub-row">
                      <span className="sub-num">{"3)"}</span>
                      <span>{"자동화된 의사 결정: 없음."}</span>
                    </div>
                  </div>
                </span>
              </div>
              <div className="item-row">
                <span className="item-circle">{"②"}</span>
                <span>{"권리 행사는 회사에 대해 「개인정보 보호법」 시행령 제41조 제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며, 회사는 이에 대해 지체없이 조치하겠습니다."}</span>
              </div>
              <div className="item-row">
                <span className="item-circle">{"③"}</span>
                <span>{"권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수도 있습니다. 이 경우 \"개인정보 처리 방법에 관한 고시(제 2025-5호)\" 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다."}</span>
              </div>
              <div className="item-row">
                <span className="item-circle">{"④"}</span>
                <span>{"개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다."}</span>
              </div>
              <div className="item-row">
                <span className="item-circle">{"⑤"}</span>
                <span>{"개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다."}</span>
              </div>
              <div className="item-row">
                <span className="item-circle">{"⑥"}</span>
                <span>{"회사는 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다."}</span>
              </div>
              <div className="item-row">
                <span className="item-circle">{"⑦"}</span>
                <span>{"정보주체가 마케팅 정보 수신에 대한 동의 또는 거부를 한 경우, 회사는 이를 즉시 반영하며 그 처리 결과를 이메일 또는 알림톡 등을 통해 통지합니다."}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            섹션 9. 개인정보 보호책임자
        ════════════════════════════════════════════ */}
        <div className="section-card" id="s9">
          <div className="section-head">
            <div className="section-num">{"9"}</div>
            <div className="section-title">{"개인정보 보호책임자"}</div>
          </div>
          <div className="section-body">
            <p>
              {"회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다."}
            </p>
            <div className="tbl-wrap">
              <table className="contact-table">
                <thead>
                  <tr>
                    <th>{"구분"}</th>
                    <th>{"소속"}</th>
                    <th>{"직위"}</th>
                    <th>{"성명"}</th>
                    <th>{"전화"}</th>
                    <th>{"이메일"}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{"개인정보 보호책임자"}</td>
                    <td>{"비즈톡㈜"}</td>
                    <td>{"대표"}</td>
                    <td>{"정의영"}</td>
                    <td>{"1688-3764"}</td>
                    <td>{"biztalk_privacy@biztalk.co.kr"}</td>
                  </tr>
                  <tr>
                    <td>{"개인정보 보호담당자"}</td>
                    <td>{"비즈톡㈜"}</td>
                    <td>{"매니저"}</td>
                    <td>{"박영하"}</td>
                    <td>{"070-8896-7359"}</td>
                    <td>{"biztalk_privacy@biztalk.co.kr"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            섹션 10. 개인정보 열람 청구
        ════════════════════════════════════════════ */}
        <div className="section-card" id="s10">
          <div className="section-head">
            <div className="section-num">{"10"}</div>
            <div className="section-title">{"개인정보 열람 청구"}</div>
          </div>
          <div className="section-body">
            <div className="item-row" style={{ marginBottom: "0" }}>
              <span className="item-circle">{"①"}</span>
              <span>
                {"정보주체는 「개인정보 보호법」 제35조에 따른 개인정보의 열람청구를 아래의 부서에 할 수 있습니다. 회사는 정보주체의 개인정보 열람청구가 신속하게 처리되도록 하겠습니다."}
                <div className="tbl-wrap" style={{ marginTop: "12px" }}>
                  <table className="contact-table">
                    <thead>
                      <tr>
                        <th>{"부서명"}</th>
                        <th>{"전화"}</th>
                        <th>{"이메일"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{"정보보호파트"}</td>
                        <td>{"070-8896-7359"}</td>
                        <td>{"biztalk_privacy@biztalk.co.kr"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </span>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            섹션 11. 권익침해 구제방법
        ════════════════════════════════════════════ */}
        <div className="section-card" id="s11">
          <div className="section-head">
            <div className="section-num">{"11"}</div>
            <div className="section-title">{"권익침해 구제방법"}</div>
          </div>
          <div className="section-body">
            <div className="item-row">
              <span className="item-circle">{"①"}</span>
              <span>
                {"정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다."}
                <div className="sub-list">
                  <div className="sub-row">
                    <span className="sub-num">{"1)"}</span>
                    <span>
                      {"개인정보분쟁조정위원회: (국번없이) 1833-6972 ("}
                      <a href="http://www.kopico.go.kr" target="_blank" style={{ color: "var(--accent)" }}>{"www.kopico.go.kr"}</a>
                      {")"}
                    </span>
                  </div>
                  <div className="sub-row">
                    <span className="sub-num">{"2)"}</span>
                    <span>
                      {"개인정보침해신고센터: (국번없이) 118 ("}
                      <a href="http://privacy.kisa.or.kr" target="_blank" style={{ color: "var(--accent)" }}>{"privacy.kisa.or.kr"}</a>
                      {")"}
                    </span>
                  </div>
                  <div className="sub-row">
                    <span className="sub-num">{"3)"}</span>
                    <span>
                      {"대검찰청: (국번없이) 1301 ("}
                      <a href="http://www.spo.go.kr" target="_blank" style={{ color: "var(--accent)" }}>{"www.spo.go.kr"}</a>
                      {")"}
                    </span>
                  </div>
                  <div className="sub-row">
                    <span className="sub-num">{"4)"}</span>
                    <span>
                      {"경찰청: (국번없이) 182 ("}
                      <a href="http://ecrm.cyber.go.kr" target="_blank" style={{ color: "var(--accent)" }}>{"ecrm.cyber.go.kr"}</a>
                      {")"}
                    </span>
                  </div>
                </div>
              </span>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            섹션 12. 개인정보 처리방침의 변경
        ════════════════════════════════════════════ */}
        <div className="section-card" id="s12">
          <div className="section-head">
            <div className="section-num">{"12"}</div>
            <div className="section-title">{"개인정보 처리방침의 변경"}</div>
          </div>
          <div className="section-body">
            <div className="effective-strip">
              <span>
                <span className="label">{"공고일자"}</span>
                {" 2026.5.04"}
              </span>
              <span>
                <span className="label">{"시행일자"}</span>
                {" 2026.6.05"}
              </span>
            </div>
            <div className="item-list" style={{ marginTop: "16px" }}>
              <div className="item-row">
                <span className="item-circle">{"①"}</span>
                <span>
                  {"이전의 개인정보 처리방침은 화면 상단의 '이전버전'에서 확인하실 수 있습니다."}
                  <div className="sub-list">
                    <div className="sub-row">
                      {/*  <span className="bullet-dot">{"→"}</span>
                      <span>{"개인정보처리방침 페이지 내 명시 및 확인 가능하도록 조치"}</span>
                    </div>
                    <div className="sub-row">
                      <span className="bullet-dot">{"→"}</span>
                      <span>{"2026년 04월 21일 ~ 2026년 05월 22일 적용"}</span> */}
                    </div>
                  </div>
                </span>
              </div>
              <div className="item-row">
                <span className="item-circle">{"②"}</span>
                <span>{"개인정보 처리방침이 변경되는 경우 시행일 7일 전부터 홈페이지 공지사항을 통하여 변경 사유 및 내용을 공지하겠습니다. 다만, 정보주체의 권리에 중대한 변경이 있는 경우에는 시행일 30일 전부터 공지하겠습니다."}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ════════════════════════════════════════════
          변경사항 모달
      ════════════════════════════════════════════ */}
      <div className="modal-overlay" id="modalOverlay">
        <div className="modal" id="modal">
          <div className="modal-header">
            <div>
              <h2>{"이전 버전 대비 변경사항 요약"}</h2>
              <p>{"2024년 8월 시행 버전 → 2026년 6월 5일 시행 버전"}</p>
              <p>{"시행 전에는 참고용으로 열람하실 수 있으며, 법적 적용·효력 발생은 시행일 이후에 이루어집니다."}</p>
            </div>
            <button className="modal-close" data-modal-action="close" type="button">{"✕"}</button>
          </div>
          <div className="modal-body">
            <div className="modal-section">
              <div className="modal-section-title">
                <span className="num">{"1"}</span>
                {"개인정보처리방침 변경 내용"}
              </div>
              <table className="modal-tbl">
                <thead>
                  <tr>
                    <th style={{ width: "30%" }}>{"조항"}</th>
                    <th>{"변경 내용"}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: "600" }}>
                      {"제1조"}
                      <br />
                      <span style={{ fontWeight: "400", fontSize: "12px", color: "#888" }}>{"제3자 제공"}</span>
                    </td>
                    <td>
                      {"제3자 제공 조항 신설 — 이름, 연락처, 이메일 제공 / 마케팅 목적 "}
                      <span style={{ display: "inline-block", background: "#e8f1ff", color: "#1a6ef5", fontSize: "10px", fontWeight: "700", padding: "2px 7px", borderRadius: "10px", marginLeft: "3px" }}></span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "600" }}>
                      {"제5조"}
                      <br />
                      <span style={{ fontWeight: "400", fontSize: "12px", color: "#888" }}>{"국외 이전"}</span>
                    </td>
                    <td>
                      {"국외 이전 조항 신설 — 현재 국외 이전 없음, 향후 이전 시 고지 의무 명시 "}
                      <span style={{ display: "inline-block", background: "#e8f1ff", color: "#1a6ef5", fontSize: "10px", fontWeight: "700", padding: "2px 7px", borderRadius: "10px", marginLeft: "3px" }}></span>
                    </td>
                  </tr>
                  <tr>
                    ---
                    <tr>
                      <td style={{ fontWeight: "600" }}>
                        {"제3조"}
                        <br />
                        <span style={{ fontWeight: "400", fontSize: "12px", color: "#888" }}>{"개인정보 처리 업무의 위탁"}</span>
                      </td>
                      <td>
                        {"알림톡 및 메시지 발송을 위한 위탁 내용 추가, 카드번호 및 무통장입금 계좌번호 암호화 조치 "}
                        <span style={{ display: "inline-block", background: "#e8f1ff", color: "#1a6ef5", fontSize: "10px", fontWeight: "700", padding: "2px 7px", borderRadius: "10px", marginLeft: "3px" }}></span>
                      </td>
                    </tr>


                    <td style={{ fontWeight: "600" }}>
                      {"제7조"}
                      <br />
                      <span style={{ fontWeight: "400", fontSize: "12px", color: "#888" }}>{"안전성 확보조치"}</span>
                    </td>
                    <td>
                      {"MFA, 암호화, 로그 보관 등 보안 조치 강화 "}
                      <span style={{ display: "inline-block", background: "#e8f6ef", color: "#1a8a4a", fontSize: "10px", fontWeight: "700", padding: "2px 7px", borderRadius: "10px", marginLeft: "3px" }}></span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "600" }}>
                      {"제8조"}
                      <br />
                      <span style={{ fontWeight: "400", fontSize: "12px", color: "#888" }}>{"정보주체 권리"}</span>
                    </td>
                    <td>
                      {"자동화된 의사결정 없음 명시, 위임장 고시번호 제2025-5호로 업데이트 "}
                      <span style={{ display: "inline-block", background: "#e8f6ef", color: "#1a8a4a", fontSize: "10px", fontWeight: "700", padding: "2px 7px", borderRadius: "10px", marginLeft: "3px" }}></span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="modal-section">
              <div className="modal-section-title">
                <span className="num">{"2"}</span>
                {"고객사 주요 준수 사항 (N-Pass 이용 시)"}
              </div>
              <ul className="check-list">
                <li>
                  <span className="icon">{"▸"}</span>
                  <span>{"관리자 계정 "}<strong>{"2단계 인증(MFA)"}</strong>{" 필수 설정 및 접근 권한 최소화"}</span>
                </li>
                <li>
                  <span className="icon">{"▸"}</span>
                  <span>{"개인정보 "}<strong>{"목적 외 사용 금지"}</strong>{" 및 재제공·판매 금지"}</span>
                </li>
                <li>
                  <span className="icon">{"▸"}</span>
                  <span>{"다운로드 파일 "}<strong>{"암호화"}</strong>{" 및 사유 기록 의무"}</span>
                </li>
                <li>
                  <span className="icon">{"▸"}</span>
                  <span>{"파기 요청 시 "}<strong>{"5일 이내"}</strong>{" 복구 불가능한 방법으로 파기"}</span>
                </li>
                <li>
                  <span className="icon">{"▸"}</span>
                  <span>{"서비스 종료 시 보유 개인정보 "}<strong>{"5일 내 전량 파기"}</strong></span>
                </li>
                <li>
                  <span className="icon">{"▸"}</span>
                  <span>{"위반 시 발생하는 "}<strong>{"모든 법적 책임은 고객사 부담"}</strong></span>
                </li>
              </ul>
            </div>

            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <a
                href="#"
                data-route="/clause/privacy/v1.0"
                style={{ display: "inline-block", padding: "12px 20px", background: "#1a6ef5", color: "#fff", borderRadius: "8px", textDecoration: "none", fontWeight: "600", fontSize: "13px" }}
              >
                {"현재 버전 확인하기"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </ClauseStaticDocument>
  );
};

export default PrivacyV11Document;
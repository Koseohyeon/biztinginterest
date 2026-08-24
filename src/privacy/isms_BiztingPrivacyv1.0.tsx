import React from "react";
import type { CSSProperties, ReactNode } from "react";
import ClauseStaticDocument from "./ClauseStaticDocument";

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

/* ────────────────────────────────────────────────────────
   재사용 컴포넌트 (디자인/레이아웃 전용 — 이전 버전과 동일)
──────────────────────────────────────────────────────── */

const CIRCLED = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩"];

const Section = ({ num, title, children }: { num: number; title: string; children: ReactNode }) => (
  <div className="section-card" id={`s${num}`}>
    <div className="section-head">
      <div className="section-num">{num}</div>
      <div className="section-title">{title}</div>
    </div>
    <div className="section-body">{children}</div>
  </div>
);

const SubHeading = ({ children }: { children: ReactNode }) => <div className="sub-heading">{children}</div>;

const NoteBox = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <div className="note-box" style={style}>{children}</div>
);

/** ①②③... 자동 번호가 매겨지는 목록. items 각 원소가 한 항목의 내용(JSX 가능). */
const ItemList = ({ items }: { items: ReactNode[] }) => (
  <div className="item-list">
    {items.map((content, i) => (
      <div className="item-row" key={i}>
        <span className="item-circle">{CIRCLED[i]}</span>
        <span>{content}</span>
      </div>
    ))}
  </div>
);

/** 좌측 라벨(처리 목적/수집 항목 등)을 고정폭으로 강조하는 항목 목록 */
const LabeledList = ({ items, width = "90px" }: { items: { label: string; content: ReactNode }[]; width?: string }) => (
  <div className="item-list">
    {items.map(({ label, content }, i) => (
      <div className="item-row" key={i}>
        <span className="item-circle" style={{ minWidth: width, fontSize: "13.5px", fontWeight: 600, color: "var(--text-main)" }}>{label}</span>
        <span>{content}</span>
      </div>
    ))}
  </div>
);

/** 1) 2) 3)... 자동 번호가 매겨지는 하위 목록 */
const SubList = ({ items }: { items: ReactNode[] }) => (
  <div className="sub-list">
    {items.map((content, i) => (
      <div className="sub-row" key={i}>
        <span className="sub-num">{`${i + 1})`}</span>
        <span>{content}</span>
      </div>
    ))}
  </div>
);

/** • 글머리기호 목록 */
const BulletList = ({ items }: { items: ReactNode[] }) => (
  <div className="bullet-list">
    {items.map((content, i) => (
      <div className="bullet-row" key={i}>
        <span className="bullet-dot">{"•"}</span>
        <span>{content}</span>
      </div>
    ))}
  </div>
);

/** 표 — headers/rows 데이터를 그대로 렌더링 */
const DataTable = ({ headers, rows, className }: { headers: string[]; rows: ReactNode[][]; className?: string }) => (
  <div className="tbl-wrap">
    <table className={className}>
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri}>
            {row.map((cell, ci) => (
              <td key={ci}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ────────────────────────────────────────────────────────
   목차 — 문서 원문의 목차 문구를 그대로 사용
   (본문 조항 제목과 문구가 다른 항목이 있으나 원문 그대로 유지)
──────────────────────────────────────────────────────── */
const TOC_ITEMS = [
  { num: "1", label: "개인정보의 처리 목적" },
  { num: "2", label: "개인정보의 자동 수집 장치의 설치·운영 및 거부에 관한 사항" },
  { num: "3", label: "개인정보 처리업무의 위탁" },
  { num: "4", label: "개인정보의 제3자 제공" },
  { num: "5", label: "개인정보의 국외 이전" },
  { num: "6", label: "개인정보의 파기 절차 및 방법" },
  { num: "7", label: "개인정보의 안전성 확보조치" },
  { num: "8", label: "연계정보(CI)의 처리" },
  { num: "9", label: "정보주체와 법정대리인의 권리·의무 및 행사방법" },
  { num: "10", label: "개인정보 보호책임자" },
  { num: "11", label: "개인정보 열람청구" },
  { num: "12", label: "권익침해 구제방법" },
  { num: "13", label: "개인정보 처리방침의 변경" },
];

/* ────────────────────────────────────────────────────────
   섹션 1 — 표 데이터 (문서 원문 그대로)
──────────────────────────────────────────────────────── */
const S1_NO_CONSENT_ROWS: ReactNode[][] = [
  [
    "회원가입 의사 확인, 서비스 이용 자격 유지·관리, 부정이용 방지, 중복가입 확인",
    "[필수] 회사명, 사업자번호, 주소, 사업자등록증, 업태, 업종, 서비스 담당자 정보(아이디, 비밀번호, 휴대폰번호, 이름, 이메일), 법인명(국문 - 개인사업자 제외)",
    <>{"회원 탈퇴 시까지"}<br />{"단, 부정이용기록(ID): 1년"}</>,
    <>{"개인정보 보호법 제15조"}<br />{"(계약 체결·이행) 제1항 제4호"}</>,
  ],
  [
    "본인 식별·인증",
    "CI",
    "본인인증 처리 후 즉시 파기",
    <>{"개인정보 보호법 제15조"}<br />{"(계약 체결·이행) 제1항 제4호"}</>,
  ],
  [
    "부정 이용 방지",
    "부정이용기록 (ID, 대표자명)",
    "1년",
    "개인정보 보호법 제15조 (정당한 이익) 제1항 제6호",
  ],
  [
    "고객문의 응대",
    "고객문의 응대 정보 (이름, 연락처, 이메일, 문의내용)",
    "문의 처리 완료 후90일 보관",
    <>{"개인정보 보호법 제15조"}<br />{"(계약 체결·이행) 제1항 제4호"}</>,
  ],
  [
    "서비스 신청·승낙사항 이행, 요금정산, 타겟 마케팅 메시지 발송 및 관련 서비스 제공, 이용내역서 및 계산서 발행, 미납요금 안내 및 청구",
    "정산기록, 이용현황, 콘텐츠 및 메시지 내용 등 (서비스 이용 또는 업무처리 과정에서 생성 또는 수집될 수 있는 정보)",
    "서비스 이용기간. 단, 대금 결제 및 재화 공급 기록·계약 또는 청약철회 기록: 5년 / 소비자 불만·분쟁 처리 기록: 3년 (전자상거래법 제6조)",
    <>{"개인정보 보호법 제15조"}<br />{"(계약 체결·이행) 제1항 제4호"}</>,
  ],
  [
    "분쟁 조정을 위한 기록 보전, 민원처리, 고지사항 전달, 이용자 요청에 따른 이용내역 제공",
    "성명, 연락처, 이메일",
    "개인정보 수집·이용 동의일로부터 서비스 이용 기간 동안 보유·이용하며, 회원 탈퇴 시 파기",
    <>{"개인정보 보호법 제15조"}<br />{"(계약 체결·이행) 제1항 제4호"}</>,
  ],
];

/* 주의: '항목' 셀은 문서 원문에도 공란으로 되어 있습니다(원문 그대로 반영). */
const S1_CONSENT_ROWS: ReactNode[][] = [
  [
    "N-Pass 솔루션을 통한 관심 고객 모집, 이벤트 혜택 안내 및 타겟 마케팅 서비스 제공",
    "",
    "개인정보 수집·이용 동의일로부터 서비스 이용 기간 동안 보유·이용하며, 회원 탈퇴 시 파기",
    "개인정보 보호법 제15조 (정보주체의 동의) 제1항 제1호",
  ],
];

const S1_LEGAL_RETENTION_ROWS: ReactNode[][] = [
  ["웹사이트 방문 기록", "통신비밀보호법 제15조의2", "3개월"],
  ["대금 결제 및 재화 공급 기록", "전자상거래법 제6조", "5년"],
  ["계약 또는 청약철회 기록", "전자상거래법 제6조", "5년"],
  ["소비자 불만·분쟁 처리 기록", "전자상거래법 제6조", "3년"],
  ["통신이용자 정보", "전기통신사업법 제83조", "1년"],
];

/* ────────────────────────────────────────────────────────
   섹션 2 — 쿠키 안내 데이터
──────────────────────────────────────────────────────── */
const COOKIE_DELETE_GUIDES = [
  "Chrome: 설정 > 개인 정보 보호 및 보안 > 서드 파트 쿠키 > 인터넷 사용 기록 삭제",
  "Edge: 설정 > 개인 정보, 검색 및 서비스 > 모든 쿠키 > 모두 제거",
  "Safari: 환경설정 > 개인 정보 보호 > 쿠키 및 웹사이트 데이터 관리",
  "Firefox: 설정 > 개인 정보 및 보안 > 탐색데이터 > 탐색 데이터 지우기",
  "Whale: 설정 > 개인 정보 보호 > 인터넷 사용 기록 삭제",
];

const COOKIE_BLOCK_PC_GUIDES = [
  "크롬(Chrome) : 웹브라우저 오른쪽 상단 '⁝' 선택 > 새 시크릿 창 (단축키 : Ctrl+Shift+N)",
  "엣지(Edge) : 웹 브라우저 오른쪽 상단 '‧‧‧' 선택 > 새 InPrivate 창 (단축키 : Ctrl+Shift+N)",
];

const COOKIE_BLOCK_MOBILE_GUIDES = [
  "크롬(Chrome) : 모바일 브라우저 우측 상단 '⁝' 선택 > 새 시크릿 탭",
  "사파리(Safari) : 모바일 기기 설정 > 앱 > 사파리(Safari) > 고급 > 모든 쿠키 차단",
  "삼성 인터넷 : 모바일 브라우저 아래쪽 '탭' 아이콘 선택 > 비밀 모드 켜기 > 시작",
];

/* ────────────────────────────────────────────────────────
   섹션 3 — 위탁업체 표 데이터
   (문서 원문에 KSNET~LGU+ 5개 행이 중복 기재되어 있었으나
    명백한 중복 오기로 판단하여 1회만 반영했습니다)
──────────────────────────────────────────────────────── */
const S3_ENTRUST_ROWS: ReactNode[][] = [
  ["KSNET", "카드번호, 유효기간, 비밀번호 앞 2자리, 생년월일/사업자등록번호, 무통장입금 계좌번호", "전자거래(선불 서비스)", "위탁 계약 종료 시까지"],
  ["다날", "전화번호, 이름", "휴대폰 본인인증", "위탁 계약 종료 시까지"],
  ["AWS (Seoul Region)", "-", "서비스 제공을 위한 서버 운영", "위탁 계약 종료 시까지"],
  ["카카오", "전화번호, 메시지 전문", "알림톡 및 브랜드 메시지 발송", "메시지 발송 후 즉각 파기"],
  ["LGU+", "전화번호, 메시지 전문", "문자메시지 발송", "위탁 계약 종료 시까지"],
  ["인포뱅크", "전화번호, 메시지 전문", "문자메시지 발송", "위탁 계약 종료 시까지"],
  ["BGF네트웍스", "전화번호, 메시지 전문", "문자메시지 발송", "위탁 계약 종료 시까지"],
  ["센드소프트(주)", "전화번호, 메시지 전문", "문자메시지 발송", "위탁 계약 종료 시까지"],
];

/* ────────────────────────────────────────────────────────
   섹션 4 — 제3자 제공 표 데이터
──────────────────────────────────────────────────────── */
const S4_THIRD_PARTY_ROWS: ReactNode[][] = [
  [
    "비즈팅 N-Pass 서비스 이용 고객사(광고주) 구체적인 명칭은 동의 화면에 별도 고지",
    "개인정보 수집·이용 동의일로부터 서비스 이용 기간 동안 수집된 정보",
    "이름, 휴대전화번호, 이메일",
    <>{"개인정보는 고객사의 이용 목적 달성 또는 동의 철회 시까지 보관되며, 이후 지체 없이 파기됩니다."}<br />{"(동의 거부 및 철회 시 즉시 파기)"}</>,
    "개인정보 보호법 제15조 (정보주체의 동의) 제1항 제1호",
  ],
];

/* ────────────────────────────────────────────────────────
   섹션 10 — 보호책임자 표 데이터
──────────────────────────────────────────────────────── */
const S10_OFFICER_ROWS: ReactNode[][] = [
  ["개인정보 보호책임자", "비즈톡㈜", "대표", "정의영", "1688-3764", "biztalk_privacy@biztalk.co.kr"],
  ["개인정보 보호담당자", "비즈톡㈜", "파트장", "김기욱", "070-8896-7359", "biztalk_privacy@biztalk.co.kr"],
];

type PrivacyV12DocumentProps = {
  modal?: React.ComponentProps<typeof ClauseStaticDocument>["modal"];
  mode?: "scheduled" | "current";
};

const PrivacyV12Document = ({ modal, mode = "scheduled" }: PrivacyV12DocumentProps) => {
  return (
    <ClauseStaticDocument styles={styles} modal={modal}>
      <div className="page-wrap">

        {/* ── 버전 네비게이션 (그대로 유지) ── */}
        <div className="clause-version-nav">
          {mode === "current" ? (
            <>
              <button type="button" className="clause-version-btn is-active" data-route="/clause/privacy">
                {"현재 버전"}
              </button>
              <button type="button" className="clause-version-btn" data-route="/clause/privacy/v1.1">
                {"이전 버전"}
              </button>
            </>
          ) : (
            <>
              <button type="button" className="clause-version-btn is-active" data-route="/clause/privacy">
                {"예정 버전"}
              </button>
              <button type="button" className="clause-version-btn" data-route="/clause/privacy/v1.1">
                {"현재 버전"}
              </button>
            </>
          )}
        </div>

        {/* ── 페이지 헤더 ── */}
        <div className="page-header">
          <div className="badge">{"개인정보처리방침"}</div>
          <h1>{"비즈톡 비즈팅 개인정보처리방침"}</h1>
        </div>

        {/* ── 서문 ── */}
        <div className="section-card">
          <div className="section-body">
            <p>
              {"비즈톡 주식회사(이하 '회사'라 한다)는 정보주체의 자유와 권리 보호를 위해 「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여, 적법하게 개인정보를 처리하고 안전하게 관리하고 있습니다. 이에 「개인정보 보호법」 제30조에 따라 정보주체에게 개인정보 처리에 관한 절차 및 기준을 안내하고, 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립 · 공개합니다."}
            </p>
          </div>
        </div>

        {/* ── 목차 ── */}
        <div className="toc">
          <div className="toc-title">{"목차"}</div>
          <ol>
            {TOC_ITEMS.map(({ num, label }) => (
              <li key={num}>
                <a
                  href={`#s${num}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(`#s${num}`)?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span className="toc-num">{num}</span>
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* ══ 1. 개인정보의 처리 목적, 수집 항목 및 보유기간 ══ */}
        <Section num={1} title="개인정보의 처리 목적, 수집 항목 및 보유기간">
          <p>{"회사는 다음의 목적을 위하여 최소한의 개인정보를 수집·처리합니다. 이용 목적이 변경되는 경우 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행합니다."}</p>

          <SubHeading>{"① 정보주체의 동의를 받지 않고 처리하는 개인정보 항목"}</SubHeading>
          <DataTable headers={["목적", "항목", "보유 및 이용기간", "법적 근거"]} rows={S1_NO_CONSENT_ROWS} />

          <SubHeading>{"② 정보주체의 동의를 받아 처리하는 개인정보 항목"}</SubHeading>
          <DataTable headers={["목적", "항목", "보유 및 이용기간", "법적 근거"]} rows={S1_CONSENT_ROWS} />

          <SubHeading>{"③  관계 법령의 규정에 해당하는 경우 개인정보를 보존하며, 주요 관계 법령은 다음과 같습니다."}</SubHeading>
          <DataTable headers={["보유항목", "보존 근거", "보유 기간"]} rows={S1_LEGAL_RETENTION_ROWS} />
        </Section>

        {/* ══ 2. 개인정보 자동 수집 장치의 설치·운영 및 거부 ══ */}
        <Section num={2} title="개인정보 자동 수집 장치의 설치·운영 및 거부">
          <p>
            {"이용자 개개인에게 개인화되고 맞춤화 된 서비스를 제공하기 위해서 회사는 이용자의 정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다. 쿠키는 웹사이트를 운영하는데 이용되는 서버가 사용자의 브라우저에게 보내는 조그마한 데이터 꾸러미로 이용자 컴퓨터의 하드디스크에 저장됩니다."}
          </p>
          <ItemList
            items={[
              <>
                <strong>{"쿠키의 사용 목적"}</strong>
                {" 회원과 비회원의 접속 빈도나 방문 시간 등의 분석, 이용자의 취향과 관심분야의 파악 및 자취 추적, 각종 이벤트 참여 정도 및 방문 회수 파악 등을 통한 타겟 마케팅 및 개인 맞춤 서비스 제공"}
              </>,
              <>
                <strong>{"자동 수집되는 정보"}</strong>
                {" 서비스 이용과정에서 IP Address, 쿠키, 방문 일시, 서비스 이용 기록, 불량 이용 기록이 자동으로 생성·수집될 수 있습니다."}
              </>,
              <>
                <strong>{"쿠키 설정 거부 방법"}</strong>
                {" 이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서, 이용자는 웹브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다."}
                <NoteBox style={{ marginTop: "10px" }}>
                  <strong>{"* 브라우저별 쿠키 설정 방법"}</strong>

                  <div style={{ marginTop: "10px", fontWeight: 700, color: "var(--primary-dark)" }}>{"① 웹 브라우저에서 쿠키 삭제 방법"}</div>
                  <BulletList items={COOKIE_DELETE_GUIDES} />

                  <div style={{ marginTop: "14px", fontWeight: 700, color: "var(--primary-dark)" }}>{"② 웹 브라우저에서 쿠키 차단 방법"}</div>
                  <BulletList items={COOKIE_BLOCK_PC_GUIDES} />

                  <div style={{ marginTop: "14px", fontWeight: 700, color: "var(--primary-dark)" }}>{"③ 모바일 브라우저에서 쿠키 차단 방법"}</div>
                  <BulletList items={COOKIE_BLOCK_MOBILE_GUIDES} />
                </NoteBox>
              </>,
            ]}
          />
          <p>
            {"회사는 구글(Google)에서 제공하는 Google Analytics를 사용하여 웹사이트 이용 통계를 분석하고 서비스 개선에 활용하고 있습니다. Google Analytics를 통해 개인을 식별할 수 있는 정보는 수집되지 않습니다."}
          </p>
          <ItemList
            items={[
              <>
                <strong>{"Analytics 사용 목적:"}</strong>
                {" 서비스 이용 통계 분석 및 품질 개선"}
              </>,
              <>
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
                      <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer" style={{ color: "var(--accent)" }}>
                        {"https://tools.google.com/dlpage/gaoptout"}
                      </a>
                    </span>
                  </div>
                </div>
              </>,
              "Analytics 정보의 처리를 거부할 경우, 맞춤형 서비스 제공이 일부 제한될 수 있습니다.",
            ]}
          />
        </Section>

        {/* ══ 3. 개인정보 처리업무의 위탁 ══ */}
        <Section num={3} title="개인정보 처리업무의 위탁">
          <p>{"회사는 서비스 제공을 위해 아래와 같이 개인정보 처리 업무를 외부 업체에 위탁합니다. 위탁계약 시 개인정보보호 관련 지시 엄수, 유출 금지, 사고 시 책임 부담 등을 명확히 규정합니다."}</p>
          <DataTable headers={["수탁업체", "제공항목", "위탁내용", "보유·이용기간"]} rows={S3_ENTRUST_ROWS} />
        </Section>

        {/* ══ 4. 개인정보의 제3자 제공 ══ */}
        <Section num={4} title="개인정보의 제3자 제공">
          <p>
            {"회사는 원칙적으로 정보주체의 개인정보를 수집·이용 목적 범위를 초과하여 처리하지 않습니다. 다만, 비즈팅 N-Pass 서비스의 원활한 제공을 위하여 정보주체의 별도 명시적 동의를 받아 아래와 같이 비즈팅 캠페인을 집행하는 고객사에게 개인정보를 제3자 제공합니다."}
          </p>

          <SubHeading>{"① 개인정보의 제3자 제공 및 책임 분리"}</SubHeading>
          <LabeledList
            width="90px"
            items={[
              { label: "제3자 제공 역할", content: "회사는 본 서비스 제공을 위하여 수신자의 개인정보를 적법하게 수집하여 고객사에게 제3자 제공하는 역할을 담당합니다." },
              { label: "책임 분리", content: "고객사는 제공받은 개인정보를 관련 법령에 따라 독립적인 책임 하에 적법하게 처리하여야 하며, 해당 정보의 보호, 활용, 마케팅 활동 및 사고 발생 시의 모든 책임은 고객사에게 있습니다." },
            ]}
          />

          <SubHeading>{"② 정보주체의 동의를 받아 제공하는 개인정보 항목"}</SubHeading>
          <DataTable headers={["제공받는 자", "제공 목적", "제공하는 항목", "보유 및 이용기간", "법적 근거"]} rows={S4_THIRD_PARTY_ROWS} />

          <SubHeading>{"[정보주체의 권리 보장 및 동의 철회 안내]"}</SubHeading>
          <BulletList
            items={[
              <>
                <strong>{"재제공 금지:"}</strong>
                {" 본 서비스를 통해 개인정보를 제공받은 고객사(광고주)는 명시된 이용 목적 외의 용도로 해당 정보를 이용하거나, 다른 제3자에게 재제공 및 처리 위탁하는 것이 엄격히 금지됩니다."}
              </>,
              <>
                <strong>{"동의 철회 방법:"}</strong>
                {" 정보주체는 개인정보 제3자 제공에 대한 동의를 언제든지 철회할 수 있습니다. 동의 철회는 네이버 앱 또는 웹 > 네이버ID > 이력관리 > 연결된 서비스 관리에서 서비스 동의 > 서비스 동의 철회를 할 수 있습니다."}
              </>,
              <>
                <strong>{"철회 시 조치:"}</strong>
                {" 동의 철회(또는 파기 요청) 접수 시, 비즈팅은 시스템 내 해당 정보를 지체 없이 5일 이내 복구 불가능한 방법으로 파기하며, 정보를 제공받은 고객사에게도 즉시 파기하도록 안내하여 정보주체의 권리를 철저히 보장합니다."}
              </>,
            ]}
          />

          <NoteBox style={{ marginTop: "16px" }}>
            {"※ 회사는 제3자 제공 시 제공받는 자, 목적, 항목, 보유 기간을 정보주체에게 별도로 고지하고 동의를 받습니다. 제공 이력(고객사, 일시, 항목 등)은 시스템 로그 및 대장으로 기록·관리합니다."}
          </NoteBox>
        </Section>

        {/* ══ 5. 개인정보의 국외 이전 ══ */}
        <Section num={5} title="개인정보의 국외 이전">
          <p>{"회사는 현재 이용자의 개인정보를 국외로 이전하지 않습니다."}</p>
          <p>{"향후 국외 이전이 필요한 경우, 「개인정보 보호법」 제28조의8에 따라 이전받는 자, 이전 국가, 이전 항목, 이전 목적, 보유 및 이용기간, 거부 방법 및 거부 시 불이익 등을 정보주체에게 알리고 동의를 받겠습니다."}</p>
        </Section>

        {/* ══ 6. 개인정보의 파기 절차 및 방법 ══ */}
        <Section num={6} title="개인정보의 파기 절차 및 방법">
          <p>
            {"개인정보는 고객사의 이용 목적 달성 또는 계약 종료 시까지 보관되며, 이후 지체 없이 파기됩니다. 단, 회사는 통계 목적의 정보에 한해 개인을 식별할 수 없도록 비식별화하여 보관할 수 있습니다. 집계된 숫자(통계 수치)만을 수집·보관하며, 개인을 식별할 수 있는 정보는 포함하지 않습니다."}
          </p>
          <ItemList
            items={[
              <>
                <strong>{"파기계획 수립"}</strong>
                <br />
                {"회사는 내부 방침 및 관련 법령에 따라 개인정보 파기계획을 수립합니다."}
              </>,
              <>
                <strong>{"파기절차 및 기한"}</strong>
                <br />
                {"이용자가 입력한 정보는 보유기간이 경과했거나 처리목적이 달성된 후 지체 없이 파기합니다."}
                <br />
                {"관계 법령에 따라 보존해야 하는 경우 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 안전하게 보관하며, 다른 목적으로는 이용하지 않습니다."}
              </>,
              <>
                <strong>{"파기방법"}</strong>
                <br />
                {"회사는 처리하는 개인정보를 파기할 때에는 다음의 방법으로 파기합니다."}
                <SubList
                  items={[
                    "전자적 파일 형태인 경우: 복원이 불가능한 방법으로 영구삭제",
                    "전자적 파일의 형태 외의 기록물, 인쇄물, 서면, 그 밖의 기록매체인 경우: 파쇄 또는 소각",
                  ]}
                />
              </>,
            ]}
          />
        </Section>

        {/* ══ 7. 개인정보의 안전성 확보조치 ══ */}
        <Section num={7} title="개인정보의 안전성 확보조치">
          <ItemList
            items={[
              <>
                <strong>{"기술적인 대책"}</strong>
                <SubList
                  items={[
                    "회사는 이용자의 개인정보를 관련 법률규정 및 내부정책에 따라 보안기능을 통해 안전하게 보호하고 있습니다.",
                    "회사는 백신프로그램을 이용하여 컴퓨터 바이러스에 의한 피해를 방지하기 위한 조치를 취하고 있습니다. 백신프로그램은 주기적으로 업데이트되며 갑작스러운 바이러스가 출현될 경우 백신이 나오는 즉시 이를 적용함으로써 개인정보가 침해되는 것을 방지하고 있습니다.",
                    "회사는 네트워크 상의 개인정보를 안전하게 전송할 수 있는 보안장치를 채택하고 있습니다.",
                    "회사는 해킹 등에 의해 이용자의 개인정보가 유출되는 것을 방지하기 위하여, 외부로부터의 침입을 차단하는 장치를 이용하고 있으며 24시간 X 365일 침입을 감시하고 있습니다.",
                  ]}
                />
              </>,
              <>
                <strong>{"관리적인 대책"}</strong>
                <SubList items={["회사는 개인정보 처리직원을 개인정보 관리업무를 수행하는 자 및 업무상 개인정보의 처리가 불가피 한 자로 엄격히 제한하고 담당직원에 대한 수시 교육을 통하여 개인정보처리방침의 준수를 강조하고 있습니다."]} />
              </>,
              <>
                <strong>{"대시보드 및 다운로드 통제"}</strong>
                <SubList
                  items={[
                    "고객사 대시보드: 제3자 동의를 받은 정보주체의 정보만 열람 가능, 최소 권한 부여, MFA(이메일 인증 또는 OTP) 적용",
                    "마스킹 처리: 화면 노출 시 개인정보 마스킹 처리",
                    "다운로드 통제: 사유 입력 강제, 다운로드 파일 비밀번호 설정, 접속기록 월 1회 이상 점검",
                    "접속기록 보관: 일반적 경우 1년 이상, 5만 명 이상 정보주체 처리 시 2년 이상",
                  ]}
                />
              </>,
              <>
                <strong>{"물리적 조치"}</strong>
                <SubList
                  items={[
                    "회사는 개인정보가 저장∙보관된 전산실, 자료보관실 등에 대한 출입통제 절차를 수립∙운영하고, 권한이 없는 자의 접근을 제한하고 있습니다.",
                    "회사는 개인정보가 포함된 서류, 보조저장매체 등을 잠금장치가 있는 안전한 장소에 보관하고 있습니다.",
                    "회사는 개인정보가 포함된 서류 및 보조저장매체를 파기하는 경우 복구∙재생되지 않도록 안전한 방법으로 파기하고 있습니다.",
                  ]}
                />
              </>,
            ]}
          />
        </Section>

        {/* ══ 8. 연계정보(CI)의 처리 ══ */}
        <Section num={8} title="연계정보(CI)의 처리">
          <p>
            {"회사는 「정보통신망법」 제23조의5(연계정보의 생성·처리 등), 「개인정보 보호법」 제18조에 근거하여 정보주체의 연계정보(CI)를 처리하며, 연계정보의 처리근거, 수집·이용·제공 목적, 보유 및 이용 기간 등을 다음과 같이 알려 드립니다."}
          </p>
          <ItemList
            items={[
              <>
                <strong>{"연계정보의 처리 근거"}</strong>
                <br />
                {"회사는 「정보통신망법」 제23조의5(연계정보의 생성·처리 등), 「개인정보 보호법」 제18조에 근거하여 연계정보를 처리합니다."}
              </>,
              <>
                <strong>{"연계정보의 수집·이용·제공 목적"}</strong>
                <br />
                {"회사는 '(금융)거래 관련 본인 식별·인증·연계', '관련 법령에 따른 수사협조' 등을 위하여 연계정보를 수집·이용·제공합니다."}
              </>,
              <>
                <strong>{"연계정보의 보유 및 이용기간"}</strong>
                <br />
                {"회사는 각 처리 목적에 따른 보유기간 동안 연계정보를 보유하고 이용합니다."}
              </>,
              <>
                <strong>{"연계정보의 안전조치 의무"}</strong>
                <br />
                {"회사는 정보주체의 연계정보를 안전하게 처리하기 위하여 「정보통신망법」 제23조의6(연계정보의 안전조치 의무 등)에 따라 「개인정보 보호법」 제29조(안전조치의무)를 포함하여 별도의 연계정보의 관리적·기술적·물리적 조치를 취하고 있습니다."}
                <SubList
                  items={[
                    "연계정보의 안전한 처리를 위한 내부관리 계획 수립",
                    "연계정보에 접근 가능한 연계정보취급자 최소화 및 교육 실시",
                    "연계정보를 주민등록번호와 분리하여 보관·관리",
                    "연계정보를 인터넷망 구간으로 송·수신하는 경우 암호화된 통신 채널을 사용",
                    "연계정보를 저장하는 경우 안전한 알고리즘으로 암호화하여 저장",
                    "연계정보의 분실·도난 등의 침해사고 발생 시 대응 계획 수립 및 시행",
                    "연계정보 제공기관 및 제공 시기 등에 관한 자료의 기록·보관에 관한 사항",
                  ]}
                />
              </>,
              <>
                <strong>{"정보주체의 권리"}</strong>
                <br />
                {"정보주체는 연계정보 이용내역 등 연계정보 처리에 관한 사항의 열람, 정정·삭제, 처리정지, 동의철회 등 제8조에 따른 권리를 행사할 수 있습니다."}
              </>,
            ]}
          />
        </Section>

        {/* ══ 9. 정보주체와 법정대리인의 권리·의무 및 행사방법 ══ */}
        <Section num={9} title="정보주체와 법정대리인의 권리·의무 및 행사방법">
          <ItemList
            items={[
              <>
                {"정보주체는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다."}
                <NoteBox style={{ marginTop: "8px" }}>
                  {"※ 만 14세 미만 아동에 관한 개인정보의 열람 등 요구는 법정대리인이 직접 해야 하며, 만 14세 이상의 미성년자인 정보주체는 정보주체의 개인정보에 관하여 미성년자 본인이 권리를 행사하거나 법정대리인을 통하여 권리를 행사할 수도 있습니다."}
                </NoteBox>
                <SubList
                  items={[
                    "홈페이지 '비즈팅 > 마이페이지'에서 개인정보 조회 가능",
                    "정정·삭제·처리정지 및 동의 철회는 '고객센터 > 1:1문의'를 통해 요청",
                    "자동화된 의사 결정: 없음.",
                  ]}
                />
              </>,
              "권리 행사는 회사에 대해 「개인정보 보호법」 시행령 제41조 제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며, 회사는 이에 대해 지체없이 조치하겠습니다.",
              "권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수도 있습니다. 이 경우 \"개인정보 처리 방법에 관한 고시(제 2025-5호)\" 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.",
              "개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.",
              "개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.",
              "회사는 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.",
              "정보주체가 마케팅 정보 수신에 대한 동의 또는 거부를 한 경우, 회사는 이를 즉시 반영하며 그 처리 결과를 이메일 또는 알림톡 등을 통해 통지합니다.",
            ]}
          />
        </Section>

        {/* ══ 10. 개인정보 보호책임자 ══ */}
        <Section num={10} title="개인정보 보호책임자">
          <p>{"회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다."}</p>
          <DataTable className="contact-table" headers={["구분", "소속", "직위", "성명", "전화", "이메일"]} rows={S10_OFFICER_ROWS} />
        </Section>

        {/* ══ 11. 개인정보 열람 청구 ══ */}
        <Section num={11} title="개인정보 열람 청구">
          <div className="item-row" style={{ marginBottom: 0 }}>
            <span className="item-circle">{"①"}</span>
            <span>
              {"정보주체는 「개인정보 보호법」 제35조에 따른 개인정보의 열람청구를 아래의 부서에 할 수 있습니다. 회사는 정보주체의 개인정보 열람청구가 신속하게 처리되도록 하겠습니다."}
              <div style={{ marginTop: "12px" }}>
                <DataTable className="contact-table" headers={["부서명", "전화", "이메일"]} rows={[["정보보호파트", "070-8896-7359", "biztalk_privacy@biztalk.co.kr"]]} />
              </div>
            </span>
          </div>
        </Section>

        {/* ══ 12. 권익침해 구제방법 ══ */}
        <Section num={12} title="권익침해 구제방법">
          <div className="item-row">
            <span className="item-circle">{"①"}</span>
            <span>
              {"정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다."}
              <SubList
                items={[
                  <>{"개인정보분쟁조정위원회: (국번없이) 1833-6972 ("}<a href="http://www.kopico.go.kr" target="_blank" rel="noreferrer" style={{ color: "var(--accent)" }}>{"www.kopico.go.kr"}</a>{")"}</>,
                  <>{"개인정보침해신고센터: (국번없이) 118 ("}<a href="http://privacy.kisa.or.kr" target="_blank" rel="noreferrer" style={{ color: "var(--accent)" }}>{"privacy.kisa.or.kr"}</a>{")"}</>,
                  <>{"대검찰청: (국번없이) 1301 ("}<a href="http://www.spo.go.kr" target="_blank" rel="noreferrer" style={{ color: "var(--accent)" }}>{"www.spo.go.kr"}</a>{")"}</>,
                  <>{"경찰청: (국번없이) 182 ("}<a href="http://ecrm.cyber.go.kr" target="_blank" rel="noreferrer" style={{ color: "var(--accent)" }}>{"ecrm.cyber.go.kr"}</a>{")"}</>,
                ]}
              />
            </span>
          </div>
        </Section>

        {/* ══ 13. 개인정보 처리방침의 변경 ══ */}
        <Section num={13} title="개인정보 처리방침의 변경">
          <div className="effective-strip">
            <span>
              <span className="label">{"공고일자"}</span>
              {" 2026. MM. DD."}
            </span>
            <span>
              <span className="label">{"시행일자"}</span>
              {" 2026. MM. DD."}
            </span>
          </div>
          <div style={{ marginTop: "16px" }}>
            <ItemList
              items={[
                "이전의 개인정보 처리방침은 화면 상단의 '이전버전'에서 확인하실 수 있습니다.",
                "개인정보 처리방침이 변경되는 경우 시행일 7일 전부터 홈페이지 공지사항을 통하여 변경 사유 및 내용을 공지하겠습니다. 다만, 정보주체의 권리에 중대한 변경이 있는 경우에는 시행일 30일 전부터 공지하겠습니다.",
              ]}
            />
          </div>
        </Section>

      </div>
    </ClauseStaticDocument>
  );
};

export default PrivacyV12Document;
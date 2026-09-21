import React, { useEffect } from "react";
import type { ReactNode } from "react";
import ClauseStaticDocument from "./ClauseStaticDocument";
import ClauseVersionModal from "./ClauseVersionModal";
import { TERMS_V12_NOTICE_START_AT, TERMS_V12_EFFECTIVE_AT } from "./clauseVersionDates";

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
    .page-header,
    .page-header .badge,
    .page-header h1 {
      color: #fff !important;
    }

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
      white-space: nowrap;
    }
    .toc ol li a:hover { color: var(--accent); }
    .toc ol li a .toc-num {
      font-size: 11px;
      font-weight: 700;
      color: var(--accent);
      background: var(--primary-light);
      border-radius: 4px;
      min-width: 22px;
      height: 22px;
      padding: 0 4px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    @media (max-width: 600px) { .toc ol { grid-template-columns: 1fr; } }

    /* ── Chapter Header ── */
    .chapter-header {
      font-size: 15px;
      font-weight: 800;
      color: var(--primary-dark);
      margin: 32px 0 14px;
      padding-bottom: 8px;
      border-bottom: 2px solid var(--primary);
    }
    .chapter-header:first-of-type { margin-top: 0; }

    /* ── Section (조문) Card ── */
    .section-card {
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 14px;
      margin-bottom: 16px;
      overflow: hidden;
    }
    .section-head {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 20px 26px;
      border-bottom: 1px solid var(--border);
      background: #fafbff;
    }
    .section-num {
      background: var(--primary);
      color: #fff;
      font-size: 12px;
      font-weight: 700;
      min-width: 40px;
      height: 30px;
      padding: 0 6px;
      border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      white-space: nowrap;
    }
    .section-title {
      font-size: 15.5px;
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
    .badge-added {
      display: inline-flex;
      align-items: center;
      background: #fff3a3;
      color: #7a5b00;
      font-size: 10.5px;
      font-weight: 700;
      padding: 3px 9px;
      border-radius: 20px;
      margin-left: 8px;
      letter-spacing: 0.3px;
    }
    .section-body {
      padding: 22px 26px;
    }

    /* ── 형광펜 하이라이트: 이번에 새로 추가된 문구 ── */
    mark.hl-add {
      background: #fff3a3;
      color: inherit;
      padding: 1px 2px;
      border-radius: 2px;
      box-decoration-break: clone;
      -webkit-box-decoration-break: clone;
    }

    /* ── Typography inside sections ── */
    .section-body p {
      font-size: 14.5px;
      color: var(--text-sub);
      line-height: 1.85;
      margin-bottom: 16px;
    }
    .section-body p:last-child { margin-bottom: 0; }

    /* Top-level (1)(2)(3)... / circled ①②③... list */
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

    /* Sub numbered list 1. 2. 3. / 1) 2) 3) / 가. 나. 다. */
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

    /* ── Note box ── */
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

    /* modal change table */
    .modal-section { margin-bottom: 24px; }
    .modal-section:last-child { margin-bottom: 0; }
    .modal-section-title {
      font-size: 13.5px;
      font-weight: 700;
      color: var(--primary-dark);
      margin-bottom: 12px;
    }
    .modal-tbl { width: 100%; border-collapse: collapse; font-size: 13px; border-radius: 8px; overflow: hidden; border: 1px solid var(--border); }
    .modal-tbl thead th { background: var(--primary-dark); color: #fff; padding: 9px 13px; font-weight: 600; text-align: left; }
    .modal-tbl tbody td { padding: 10px 13px; border-bottom: 1px solid var(--border); color: var(--text-sub); vertical-align: top; line-height: 1.65; }
    .modal-tbl tbody tr:last-child td { border-bottom: none; }
    .modal-tbl tbody tr:nth-child(even) td { background: #f8f9fc; }

    /* ── Responsive ── */
    @media (max-width: 640px) {
      .page-header { padding: 28px 22px; }
      .section-head, .section-body { padding: 16px 18px; }
    }
  `;

/* ────────────────────────────────────────────────────────
   재사용 컴포넌트
──────────────────────────────────────────────────────── */

const CIRCLED = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩", "⑪", "⑫", "⑬"];
const KOREAN_LETTERS = ["가", "나", "다", "라", "마", "바", "사", "아", "자", "차"];

const Article = ({ id, num, title, badge, children }: { id: string; num: string; title: string; badge?: string; children: ReactNode }) => (
  <div className="section-card" id={id}>
    <div className="section-head">
      <div className="section-num">{num}</div>
      <div className="section-title">
        {title}
        {badge ? <span className="badge-new">{badge}</span> : null}
      </div>
    </div>
    <div className="section-body">{children}</div>
  </div>
);

const ChapterHeader = ({ children }: { children: ReactNode }) => <div className="chapter-header">{children}</div>;

/** (1)(2)(3)... 목록 */
const ParenList = ({ items }: { items: ReactNode[] }) => (
  <div className="item-list">
    {items.map((content, i) => (
      <div className="item-row" key={i}>
        <span className="item-circle">{`(${i + 1})`}</span>
        <span>{content}</span>
      </div>
    ))}
  </div>
);

/** ①②③... 목록 */
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

/** 1. 2. 3.... 목록 */
const DotNumList = ({ items }: { items: ReactNode[] }) => (
  <div className="sub-list">
    {items.map((content, i) => (
      <div className="sub-row" key={i}>
        <span className="sub-num">{`${i + 1}.`}</span>
        <span>{content}</span>
      </div>
    ))}
  </div>
);

/** 가. 나. 다.... 목록 */
const LetteredList = ({ items }: { items: ReactNode[] }) => (
  <div className="sub-list">
    {items.map((content, i) => (
      <div className="sub-row" key={i}>
        <span className="sub-num">{`${KOREAN_LETTERS[i]}.`}</span>
        <span>{content}</span>
      </div>
    ))}
  </div>
);

/* ────────────────────────────────────────────────────────
   목차
──────────────────────────────────────────────────────── */
const TOC_ITEMS: { id: string; num: string; label: string }[] = [
  { id: "a1", num: "1", label: "총칙" },
  { id: "a6", num: "2", label: "서비스 이용" },
  { id: "a22-2", num: "2의2", label: "N-Pass 서비스" },
  { id: "a23", num: "3", label: "포인트 관련 규정" },
  { id: "a30", num: "4", label: "계약 해지 및 이용 제한" },
  { id: "a32", num: "5", label: "손해배상 및 면책조항" },
  { id: "abuchik", num: "부칙", label: "부칙" },
];

/* ────────────────────────────────────────────────────────
   변경사항 모달 데이터 (이번 개정분 요약)
──────────────────────────────────────────────────────── */
const CHANGE_ROWS: [string, ReactNode][] = [
  [
    "제3조(4)\n신설",
    <>
      {"• 약관 변경 시 회원에게 전자적 수단을 통한 공지 명시"}<br />
      <span style={{ color: "var(--text-muted)" }}></span>
    </>,
  ],
  [
    "제6조의2\n신설",
    <>
      {"• 정식 출시 전 테스트용 베타 서비스 제공 근거 마련"}
    </>,
  ],
  [
    "제20조(1)\n개정",
    <>
      {"• 회원 통지 수단인 '기타 전자적 전송매체'에 카카오메시지 포함 명시"}
    </>,
  ],
];

/* ────────────────────────────────────────────────────────
   본문
──────────────────────────────────────────────────────── */
const BiztingTermsDocument = () => {
  const [changeModalOpen, setChangeModalOpen] = React.useState(false);
  // [임시] 팝업 노출 확인용 하드코딩 (공고일 9/28 이전에도 팝업이 뜨도록 고정)
  const now = new Date("2026-10-01T00:00:00+09:00");
  /* [원래 코드] 배포 시 위 하드코딩 줄을 지우고 아래 줄의 주석을 해제하세요.
  const now = new Date();
  */
  const isTermsNoticeStarted = now >= TERMS_V12_NOTICE_START_AT;
  const isTermsEffective = now >= TERMS_V12_EFFECTIVE_AT;

  // 고지 시작 이후 ~ 시행 전 기간에만 페이지 로딩 시 자동으로 모달 오픈
  useEffect(() => {
    if (isTermsNoticeStarted && !isTermsEffective) {
      setChangeModalOpen(true);
    }
  }, [isTermsNoticeStarted, isTermsEffective]);

  return (
    <ClauseStaticDocument styles={styles}>
      <div className="page-wrap">
        {/* ── 페이지 헤더 ── */}
        <div className="page-header">
          <div className="badge">{"이용약관"}</div>
          <h1>{"비즈팅 서비스 이용약관"}</h1>
        </div>

        {/* ── 목차 ── */}
        <div className="toc">
          <div className="toc-title">{"목차"}</div>
          <ol>
            {TOC_ITEMS.map(({ id, num, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span className="toc-num">{num}</span>
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </div>

        <ChapterHeader>{"제1장 총칙"}</ChapterHeader>

        <Article id="a1" num="1" title="목적">
          <p>{"본 이용약관(이하 '약관')은 비즈톡 주식회사(이하 '회사')가 운영하는 비즈팅 서비스(이하 '비즈팅' 또는 '서비스')에서 사용하는 지불 및 결제 수단(이하 '비즈팅 포인트')을 사용함에 있어 회사와 이용고객(이하 '회원')간에 비즈팅 포인트에 대한 충전 및 사용에 관해서 상호간 준수해야 할 사항, 이용조건 및 절차와 기타 필요한 제반 사항을 규정함을 목적으로 합니다."}</p>
        </Article>

        <Article id="a2" num="2" title="용어의 정의">
          <p>{"이 '약관'에서 사용하는 용어의 정의는 다음과 같습니다."}</p>
          <ParenList
            items={[
              "서비스: 비즈팅 서비스는 SKT 회선 이용 고객을 대상으로 타겟팅하여 사업자인 회원의 마케팅 캠페인을 문자메시지 형태로 제공하는 회사의 서비스를 말합니다.",
              "회사: 비즈톡 주식회사가 운영하는 온라인서비스 혹은 사업자의 의미로도 사용합니다.",
              "이용고객: 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.",
              "회원: 회사와 서비스 이용계약을 체결하고 회원 아이디를 부여받은 자를 말합니다.",
              "아이디(ID): 회원 식별과 회원의 서비스 이용을 위하여 회원이 선정하고 회사가 승인하는 문자와 숫자의 조합입니다.",
              "비밀번호(PW): 회원의 비밀보호를 위하여 회원 자신이 설정한 문자와 숫자의 조합을 말합니다.",
              "운영자: 서비스의 전반적인 관리와 원활한 운영을 위하여 회사에서 선정한 사람을 말합니다.",
              "해지: 회사 또는 회원이 이용 계약을 해약하는 것을 말합니다.",
              "비즈팅 포인트: 회사가 인정하는 방법을 통하여 생성되며, 회사에서 제공하는 유료 서비스를 이용할 수 있는 사이버 캐시를 말합니다.",
              "충전: '비즈팅 포인트'를 회사에서 제공하는 결제 방식을 통해 일정 금액 단위로 구입하는 것을 말합니다.",
              "N-Pass: 비즈팅이 네이버 로그인 플러스의 외부 인증 수단을 통해 수집한 메시지 수신자의 개인정보를 회원(고객사)에게 제 3자 제공하여 공동으로 처리하고 이를 활용하여 마케팅·회원 유치 및 관리 목적으로 활용할 수 있도록 지원하는 부가 서비스를 말합니다.",
              "정보주체: N-Pass 서비스를 통해 개인정보가 수집되는 메시지 수신자를 말합니다.",
            ]}
          />
        </Article>

        <Article id="a3" num="3" title="약관의 적용과 개정">
          <div className="item-list">
            <div className="item-row">
              <span className="item-circle">{"(1)"}</span>
              <span>{"회사는 본 '약관'을 '홈페이지'에 게시하는 방법으로 공지하며 서비스 이용 신청(계약) 시 이용고객으로부터 '약관'에 대한 동의를 받습니다."}</span>
            </div>
            <div className="item-row">
              <span className="item-circle">{"(2)"}</span>
              <span>{"회사는 '약관의 규제에 관한 법률', '정보통신망법' 등 관련법을 위배하지 않는 범위에서 본 '약관'을 개정할 수 있습니다."}</span>
            </div>
            <div className="item-row">
              <span className="item-circle">{"(3)"}</span>
              <span>{"회사가 본 '약관'을 개정하는 경우에는 적용일자 및 개정사유를 명시하여 그 적용일자 30일 이전부터 적용일자 전일까지 공지합니다."}</span>
            </div>
            <div className="item-row">
              <span className="item-circle">{"(4)"}</span>
              <span>
                <span className="badge-added" style={{ marginLeft: 0, marginRight: 8 }}>{"추가"}</span>
                <mark className="hl-add">
                  {"회사는 서비스 운영상 필요에 따라 본 약관의 내용을 변경할 수 있으며 변경된 약관, 변경 사유 및 시행일을 사전 공지하고, 회원에게 별도의 전자적 수단(전자우편, 문자 메시지, 카카오톡 메시지, 서비스 계정 내 알림 메시지 등)으로 개별 통지합니다."}
                </mark>
              </span>
            </div>
            <div className="item-row">
              <span className="item-circle">{"(5)"}</span>
              <span>{"회사가 제3항에 따라 개정 약관을 공지 또는 통지하면서 30일 기간 내에 의사표시를 하지 않으면 의사표시가 표명된 것으로 본다는 뜻을 회원에게 명확하게 공지 또는 통지하였음에도 회원이 명시적으로 거부의 의사표시를 하지 아니한 경우 회원이 개정 약관에 동의한 것으로 봅니다."}</span>
            </div>
            <div className="item-row">
              <span className="item-circle">{"(6)"}</span>
              <span>{"회원이 개정 약관의 적용에 동의하지 않는 경우 회사는 개정 약관의 내용을 적용할 수 없으며, 이 경우 회원은 계약을 해지할 수 있습니다. 다만, 기존 '약관'을 적용할 수 없는 특별한 사정이 있는 경우에는 회사는 이용계약을 해지할 수 있습니다."}</span>
            </div>
            <div className="item-row">
              <span className="item-circle">{"(7)"}</span>
              <span>{"새로운 서비스가 개설될 경우 별도의 명시된 설명이 없는 한 본 '약관'에 따라 제공합니다."}</span>
            </div>
            <div className="item-row">
              <span className="item-circle">{"(8)"}</span>
              <span>{"회사는 서비스에 부수하여 타 서비스와 연계한 통합서비스 또는 별도의 서비스 등을 제공할 수 있으며 이용조건 등은 별도로 공지하는 바에 따릅니다."}</span>
            </div>
          </div>
        </Article>

        <Article id="a4" num="4" title="약관 외 준칙">
          <ParenList
            items={[
              "본 '약관'은 회사가 제공하는 서비스에 관하여 별도의 정책 및 운영규칙과 함께 적용됩니다.",
              "본 '약관'의 해석은 대한민국 법에 의하여 해석되고 적용되며, '약관'에서 정하지 아니한 사항은 전기통신기본법, 전기통신사업법 및 기타 관계법령 또는 상관례에 따릅니다.",
            ]}
          />
        </Article>

        <Article id="a5" num="5" title="개인정보취급방침의 적용">
          <ParenList
            items={[
              "회사는 관계 법령이 정하는 바에 따라 이용자 등록정보를 포함한 이용자의 개인정보를 보호하기 위해 노력합니다. 이용자 개인정보의 보호 및 사용에 대해서는 관련 법령 및 회사의 '개인정보처리방침'에 따릅니다.",
              "회사는 회사가 제공하는 서비스의 회원을 대상으로 서비스의 양적·질적 향상을 위하여 회원의 개인 식별이 가능한 개인정보를 회원의 동의를 받아 수집하여 서비스에 이용할 수 있습니다.",
              "회사가 수집하는 개인정보는 서비스의 제공에 필요한 최소한으로 하되, 필요한 경우 자세한 정보를 요구할 수 있습니다.",
              "회사는 개인정보의 수집 시 관련 법규에 따라 서비스 이용 신청서 또는 계약서 및 '약관'에 그 수집 범위 및 목적을 사전 고지하며 회사의 '개인정보처리방침'에 공개합니다.",
              "회사는 서비스 제공과 관련하여 취득한 회원의 개인정보를 본인의 동의 없이 제3자에게 제공 또는 배포할 수 없으며 상업적 목적으로 사용할 수 없습니다. 법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우에는 그러하지 아니합니다.",
            ]}
          />
        </Article>

        <ChapterHeader>{"제2장 서비스 이용"}</ChapterHeader>

        <Article id="a6" num="6" title="이용계약의 성립">
          <ParenList
            items={[
              "서비스 가입 신청 시 본 약관을 읽고 '동의합니다'에 체크 후 '확인' 버튼을 누르면 이 약관에 동의하는 것으로 간주되며 이용계약은 서비스 이용자가 이용신청 동의 후 회사가 승낙함으로써 성립합니다.",
            ]}
          />
        </Article>

        <Article id="a6-2" num="6의2" title="베타 서비스의 제공" badge="신설">
          <ParenList
            items={[
              <mark className="hl-add">{"회사는 신규 서비스를 상용화하기 전 회원을 대상으로 테스트 목적의 베타 서비스를 일정한 기간 동안 제공할 수 있습니다. 베타 서비스를 시작하는 경우 회사는 회원들에게 베타 서비스의 내용, 제공 기간 등을 공지합니다."}</mark>,
              <mark className="hl-add">{"베타 서비스는 정식 서비스가 아니므로, 베타 서비스 제공 기간 동안 서비스 내용의 변경, 추가, 수정될 수 있습니다. 회사는 베타 서비스를 제공하는 도중 예상치 못한 손해나 문제가 발생하였을 경우에 회원에게 사전 공지없이 베타 서비스를 종료할 수 있습니다."}</mark>,
            ]}
          />
        </Article>

        <Article id="a7" num="7" title="이용 신청">
          <ParenList
            items={[
              "이용 신청은 온라인으로 회사가 요청하는 소정의 가입신청 양식에서 요구하는 사항을 기록하여 신청합니다.",
              "가입신청양식에 기재하는 모든 회원 정보는 실제 데이터인 것으로 간주하며 실명이나 실제 정보를 입력하지 않은 사용자는 법적인 보호를 받을 수 없으며, 서비스 사용의 제한을 받을 수 있습니다.",
              "타인의 정보를 도용하는 등 부정한 목적과 방법으로 이용신청을 한 회원의 ID는 사전 통지 없이 삭제될 수 있습니다.",
            ]}
          />
        </Article>

        <Article id="a8" num="8" title="이용신청의 승낙">
          <ParenList
            items={[
              "회사는 회원이 제2장 7조에서 정한 모든 사항을 정확히 기재하여 이용신청을 하였을 때 특별한 사정이 없는 한 접수 순서대로 이용신청을 승낙합니다.",
              <>
                {"회사는 다음 각 호에 해당하는 이용신청에 대하여는 승낙을 유보할 수 있고, 그 사유가 해소될 때까지 승낙을 유보할 수 있습니다."}
                <LetteredList
                  items={[
                    "서비스 관련 설비에 여유가 없는 경우",
                    "회사의 운영상, 사업상 위해 요소 또는 위해 우려가 있는 경우",
                    "기술상 지장이 있는 경우",
                    "기타 회사의 사정으로 이용 승낙이 곤란한 경우",
                  ]}
                />
              </>,
              <>
                {"회사는 다음 각 호에 해당하는 이용신청에 대하여는 승낙을 제한할 수 있습니다."}
                <LetteredList
                  items={[
                    "실명이 아닌 정보 또는 다른 사람의 정보를 사용하는 경우",
                    "이용 신청 시 필요내용을 허위로 기재하여 신청한 경우",
                    "사회의 안녕질서 또는 미풍양속을 저해할 목적으로 신청한 경우",
                    "기타 회사가 정한 이용신청요건이 미비된 경우",
                    "신용정보의 이용과 보호에 관한 법률에 의한 PC통신, 인터넷서비스의 채무불이행자로 등록되어 있는 경우",
                    "기타 회원으로 등록하는 것이 서비스의 기술상 또는 업무 수행상 현저히 지장이 있다고 판단하는 경우",
                    "회원으로 등록하는 것이 회사의 정책상 적합하지 않다고 판단되는 경우",
                  ]}
                />
              </>,
            ]}
          />
        </Article>

        <Article id="a9" num="9" title="회원정보의 변경">
          <p>{"회원은 개인정보관리를 통해 언제든지 개인정보를 열람하고 수정할 수 있습니다. 회원은 이용신청 시 기재한 사항이 변경되었을 경우에는 온라인으로 수정을 해야 하고 관리 소홀로 인하여 발생하는 서비스 이용상의 손해 또는 제3자에 의한 부정이용 등에 대한 책임은 이용자 본인에게 있으며, 회사는 그에 대한 책임을 일절 지지 않습니다."}</p>
        </Article>

        <Article id="a10" num="10" title="서비스의 이용개시">
          <ParenList
            items={[
              "회사는 회원의 이용 신청을 승낙한 때부터 서비스를 개시합니다. 단, 일부 서비스의 경우에는 지정된 일자부터 서비스를 개시합니다.",
              "회사의 업무상 또는 기술상의 장애로 인하여 서비스를 개시하지 못하는 경우에는 사이트에 공시하거나 이를 통지합니다. 단, 불가피한 사정에 의한 경우에는 사후 공지할 수 있습니다.",
            ]}
          />
        </Article>

        <Article id="a11" num="11" title="서비스의 이용시간">
          <ParenList
            items={[
              "서비스의 이용은 연중무휴 1일 24시간을 원칙으로 합니다. 단, 회사의 업무상이나 기술상의 이유로 서비스가 일시 중지될 수 있고, 또한 운영상의 목적으로 회사가 정한 기간에는 서비스가 일시 중지될 수 있습니다. 이러한 경우 회사는 사전에 이를 공지하며, 부득이한 경우 사후 공지할 수 있습니다.",
              "회사는 서비스를 일정범위로 분할하여 각 범위별로 이용 가능한 시간을 별도로 정할 수 있으며 이 경우 그 내용을 공지합니다.",
            ]}
          />
        </Article>

        <Article id="a12" num="12" title="서비스의 변경 및 중지">
          <ParenList
            items={[
              "회사는 변경될 서비스의 내용 및 제공일자를 제20조에서 정한 방법으로 회원에게 통지하고 서비스를 변경하여 제공할 수 있습니다.",
              <>
                {"회사는 다음 각 호에 해당하는 경우 서비스의 전부 또는 일부를 제한하거나 중지할 수 있습니다."}
                <LetteredList
                  items={[
                    "서비스용 설비의 보수 등 공사로 인한 부득이한 경우",
                    "회원이 회사의 영업 활동을 방해하는 경우",
                    "정전, 제반 설비의 장애 또는 이용량의 폭주 등으로 정상적인 서비스 제공에 지장이 있는 경우",
                    "서비스 제공을 위하여 회사가 제3자와 체결한 계약의 종료 등 회사의 제반 사정으로 서비스를 유지할 수 없는 경우",
                    "서비스 제공을 위한 SKT 망 혹은 서버에 장애가 발생하여 정상적인 서비스 제공에 지장이 있는 경우",
                    "기타 천재지변, 국가비상사태 등의 불가항력적 사유가 있는 경우",
                  ]}
                />
              </>,
              "제2항에 의한 서비스 제한·중지의 경우 회사는 제20조에서 정한 방법으로 회원에게 통지합니다. 단, 회사가 통제할 수 없는 사유로 인한 서비스 중단으로 인하여 사전통지가 불가능한 경우에는 그러하지 아니합니다.",
              "회사는 서비스의 변경, 제한이나 중지로 발생하는 문제에 대해서는 책임을 지지 않습니다.",
            ]}
          />
        </Article>

        <Article id="a13" num="13" title="문자 전송에 대한 회원의 의무와 책임">
          <ParenList
            items={[
              "회원은 서비스를 통해 문자를 전송할 수 있습니다. 단, 회원의 자격에 따라 제한될 수 있습니다.",
              "회원은 본 조의 문자를 이용하여 수신자의 의사에 반하는 광고성 정보를 일시에 다량으로 또는 지속적으로 전송하거나 불법스팸을 전송해서는 안 됩니다.",
            ]}
          />
        </Article>

        <Article id="a14" num="14" title="정보의 제공 및 광고의 게재">
          <p>{"회사는 서비스를 운영함에 있어 회사의 서비스 관련 각종 정보 및 광고를 서비스 화면에 게재하거나 E-mail 및 SMS, 기타 전자적 매체 활용 등의 방법으로 회원에게 제공할 수 있습니다."}</p>
        </Article>

        <Article id="a15" num="15" title="게시물 또는 내용물의 삭제">
          <ParenList
            items={[
              <>
                {"회사는 회원이 게시하거나 전달하는 서비스의 모든 내용물이 각 호의 경우에 해당한다고 판단되는 경우 사전통지 없이 내용물을 삭제할 수 있으며, 이에 대해 회사는 책임을 지지 않습니다."}
                <LetteredList
                  items={[
                    "회사, 다른 회원 또는 제3자를 비방하거나 중상모략으로 명예를 손상시키는 내용인 경우",
                    "공공질서 및 미풍양속에 위반되는 내용의 정보, 문장, 도형 등의 유포에 해당하는 경우",
                    "범죄적 행위에 결부된다고 객관적으로 인정되는 내용인 경우",
                    "회사 또는 제3자의 저작권 또는 기타 권리를 침해하는 내용인 경우",
                    "회사에서 규정한 게시기간을 초과한 경우",
                    "회사에서 제공하는 서비스와 관련 없는 내용인 경우",
                    "불필요하거나 승인되지 않은 광고, 판촉물인 경우",
                    "기타 관계 법령 및 회사의 지침 등에 위반된다고 판단되는 경우",
                  ]}
                />
              </>,
              "회사는 게시물에 관련된 세부이용지침을 별도로 정하여 시행할 수 있으며, 회원은 그 지침에 따라 각종 게시물을 등록하거나 삭제하여야 합니다.",
            ]}
          />
        </Article>

        <Article id="a16" num="16" title="게시물의 저작권">
          <ParenList
            items={[
              "회원이 서비스 내에 게시한 게시물의 저작권은 회원이 소유하며 회사는 서비스 내에 이를 게시할 수 있는 권리를 갖습니다.",
              "회사는 게시한 회원의 동의 없이 게시물을 다른 목적으로 사용할 수 없습니다.",
              "회사는 서비스 고도화를 위하여 회원의 저작물을 동의 하에 가공·게시할 수 있습니다.",
              "회사는 회원이 서비스 내에 게시한 게시물이 타인의 저작권 등 권리를 침해하더라도 이에 대한 민·형사상의 책임을 부담하지 않습니다. 만일 회원이 타인의 저작권 등 권리를 침해하였음을 이유로 회사가 타인으로부터 손해배상청구 등 이의제기를 받은 경우 회원은 회사의 면책을 위하여 노력하여야 하며, 회사가 면책되지 못한 경우 회원은 그로 인해 회사에 발생한 모든 손해를 부담하여야 합니다.",
              "회사는 회원이 서비스를 해지하거나 적법한 사유로 서비스가 해지된 경우 해당 회원이 게시하였던 게시물을 삭제할 수 있습니다.",
              "회사가 작성한 저작물에 대한 저작권은 회사에 귀속됩니다.",
              "회원은 서비스를 이용하여 얻은 정보를 가공·판매하는 행위 등 서비스에 게재된 자료를 영리 목적으로 이용하거나 제3자에게 이용하게 할 수 없으며, 게시물에 대한 저작권 침해는 관계 법령의 적용을 받습니다.",
            ]}
          />
        </Article>

        <Article id="a17" num="17" title="회사의 의무">
          <ParenList
            items={[
              "회사는 이 약관에서 정한 바에 따라 계속적·안정적으로 서비스를 제공할 의무가 있으며 메시지 시스템이 최상의 상태를 유지하도록 관리하며 전송 데이터의 보안을 위해 최선을 다합니다.",
              "회사는 회원의 개인정보를 본인의 승낙 없이 타인에게 누설·배포하여서는 아니 됩니다. 다만, 제1장 5조 (5)항의 경우에는 예외로 합니다.",
              "회사는 회원으로부터 제기되는 의견이나 불만이 정당하다고 인정할 경우에는 즉시 처리하여야 합니다. 다만, 즉시 처리가 곤란한 경우에는 회원에게 그 사유와 처리일정을 통보하여야 합니다.",
              "회사는 서비스 제공을 위한 시스템에 장애가 발생하거나 고장 발생 시 그 사실을 전화·메일 등 신속한 방법으로 회원에게 전달하고 복구를 위하여 최선의 조치를 강구합니다.",
              "회사는 회원의 회원정보를 보호하기 위해 보안시스템을 구축 운영하며, '개인정보처리방침'을 공지하고 준수합니다.",
              "회사가 제공하는 서비스로 인하여 회원에게 손해가 발생한 경우 그러한 손해가 회사의 고의나 중과실에 의해 발생한 경우에 한하여 회사에서 책임을 부담하며, 그 책임의 범위는 통상손해에 한합니다.",
              "회사는 회원이 서비스 제공 목적에 맞는 이용 여부를 확인하기 위하여 상시적으로 모니터링을 실시하며, '스팸', '불법스팸' 및 '문자피싱'을 전송한 사실을 확인한 경우 한국인터넷진흥원 불법스팸대응센터에 관련 자료를 첨부하여 신고할 수 있습니다.",
            ]}
          />
        </Article>

        <Article id="a18" num="18" title="회원의 의무">
          <p>{"회원은 하기 사항을 숙지하고, 이를 위반하는 경우에 회사는 회원의 서비스 이용제한 및 적법조치를 포함한 제재를 가할 수 있습니다."}</p>
          <ParenList
            items={[
              "회원은 회사의 직원이나 서비스 운영자를 가장하거나 사칭하여 SMS 발송 또는 연락을 취하는 행위를 할 수 없습니다.",
              "회원은 관련 법령에 의하여 그 전송 또는 게시가 금지되는 정보의 전송 또는 게시 행위를 할 수 없습니다.",
              "회원은 회사의 서비스를 이용하여 얻은 정보를 회사의 사전 승낙 없이 복제 또는 유통시키거나 상업적으로 이용하는 행위를 할 수 없습니다.",
              "회원은 재판매의 목적으로 서비스를 이용할 수 없습니다.",
              "회원은 타인의 결제정보 등을 도용하거나 부정한 행위로 거래를 할 수 없습니다.",
              "서비스를 통해 발송되는 모든 메시지는 발송 채널의 주체인 SKT의 검수를 받은 후 승인된 메시지에 한하여 발송하여야 합니다.",
              "아이디와 비밀번호에 관한 모든 관리 책임은 회원에게 있습니다.",
              "회원에게 부여된 아이디와 비밀번호의 관리소홀·부정사용에 의하여 발생한 결과에 대한 책임은 회원에게 있습니다.",
              "회원은 아이디 및 비밀번호를 도난당하거나 제3자가 사용하고 있음을 인지한 경우에는 바로 회사에 통보하여야 합니다.",
              "회원은 서비스의 이용권한, 기타 서비스 이용계약상의 지위를 타인에게 양도·증여할 수 없으며 이를 담보로 제공할 수 없습니다.",
              "회원은 회사로부터 특별한 권한을 받지 않고 회사의 클라이언트 프로그램을 변경하거나 회사의 서버를 해킹할 수 없습니다.",
              "회원은 기타 불법적이거나 부당한 행위를 할 수 없습니다.",
              "회원은 서비스의 본래 목적 외의 용도로 서비스를 이용하여서는 아니 되며 타인의 지적재산권 또는 타인의 사생활을 침해하는 내용을 전송할 목적으로 사용해서는 안 되고 제3자에게 임의로 해당 서비스를 임대하여서도 안 됩니다.",
              "회원은 '정보통신망법'에 따른 광고성 정보 전송 시 의무사항 및 회사의 '약관'을 준수하여야 하며, 기타 회사의 업무 수행에 현저한 지장을 초래하는 행위를 하여서는 안 됩니다.",
              <>
                {"회원은 공공의 안녕·질서 또는 미풍양속을 해하는 다음 각 호의 내용으로 메시지를 전송하여서는 안 됩니다."}
                <ItemList
                  items={[
                    "범죄 행위를 목적으로 하거나 범죄 행위를 교사하는 내용",
                    "반국가적 행위의 수행을 목적으로 하는 내용",
                    "선량한 풍속, 기타 사회질서를 해하는 내용",
                  ]}
                />
              </>,
              "회원은 '정보통신망법'에 따라 메시지 전송을 위해 이동통신사 가입자의 사전 수신동의를 직접 얻어야 하고, '스팸', '불법스팸' 및 '문자피싱' 전송을 위해 서비스를 이용하여서는 아니 되며, 회사를 통해 전달되는 수신거부 요청에 대해서는 즉각적으로 처리하고 24시간 이내에 처리결과를 회사에 회신하여야 하며 본 항의 위반으로 발생하는 모든 민·형사상의 책임은 회원이 직접 부담해야 합니다.",
              <>
                {"회원은 N-Pass서비스를 이용하는 경우 다음 각 호의 의무를 준수하여야 합니다."}
                <DotNumList
                  items={[
                    "회원은 N-Pass 서비스를 통해 공동으로 처리하는 제 3자 제공받은 개인정보 전부 개인정보 일체를 고지된 목적(마케팅·회원 유치 및 관리) 외의 용도로 이용하거나, 제3자에게 재제공하거나, 유상으로 판매하여서는 아니 됩니다.",
                    "회원은 개인정보 유출 방지를 위해 회사가 요구하는 2단계 인증(MFA) 설정, 접근권한 최소화, 마스킹 처리된 화면 이용 등 보안 수칙을 준수하여야 합니다.",
                    "회원은 N-Pass 서비스 사용과 관련하여 회사가 제공하는 '메시지 수신자 전용 개인정보처리방침'을 확인하고 이를 적용하여야 하며, 해당 방침에 명시된 개인정보 보호 의무를 성실히 이행할 책임이 있습니다.",
                    "정보주체의 개인정보 파기(동의 철회 등) 요청 시, 회사의 시스템에서는 해당 정보가 복구 불가능한 방법으로 5일 이내 자동으로 파기됩니다. 회원은 회사로부터 파기 관련 안내 메일을 수신한 경우, 즉시 기존에 다운로드하여 보관 중인 개인정보 파일(엑셀 등)을 복구 불가능한 방법으로 파기하여야 하며, 시스템에서 최신 데이터를 다시 다운로드하여 사용하여야 합니다.",
                    "회원은 N-Pass서비스 종료 또는 서비스 해지 시, 접근 및 활용한 개인정보 전부를 5일 이내에 파기하고 파기 결과를 회사에 통보하여야 합니다.",
                    "회원은 다운로드한 개인정보 파일을 반드시 비밀번호로 암호화하여 보관하여야 하며, 다운로드 시 그 사유를 시스템에 기록하여야 합니다.",
                    "본 조를 위반하거나 관리 소홀로 인하여 발생하는 개인정보 유출·오남용·법령 위반 등 모든 법적 책임 및 손해배상 의무는 회원(고객사)이 전적으로 부담하며, 비즈팅은 이에 대하여 어떠한 책임도 지지 않습니다.",
                  ]}
                />
              </>,
            ]}
          />
        </Article>

        <Article id="a19" num="19" title="회원의 ID 및 비밀번호에 대한 의무">
          <ParenList
            items={[
              "회원은 ID 및 비밀번호를 철저히 관리하여야 하며, 관리소홀·부정사용 등에 의하여 발생하는 모든 결과에 대한 책임은 회원 본인이 부담하며, 회사는 이에 대한 책임을 부담하지 않습니다.",
              "회원은 본인의 ID 및 비밀번호를 제3자에게 이용하게 하여서는 아니 되며, 도난 또는 제3자가 사용하고 있음을 인지하는 경우에는 즉시 비밀번호를 변경하고 해당 사실을 회사에 통지하여야 합니다.",
            ]}
          />
        </Article>

        <Article id="a20" num="20" title="회원에 대한 통지">
          <div className="item-list">
            <div className="item-row">
              <span className="item-circle">{"(1)"}</span>
              <span>{"(현재)회원에 대한 통지를 하는 경우 회사는 회원이 등록한 E-mail 주소 또는 SMS, 기타 전자적 전송매체를 통해 할 수 있습니다."}</span>
            </div>
            <div className="item-row">
              <span className="item-circle">{"(1)"}</span>
              <span>
   
                <mark className="hl-add">
                  {"(수정)회원에 대한 통지를 하는 경우 회사는 회원이 등록한 E-mail 주소 또는 SMS, 기타 전자적 전송매체(카카오메시지 등)를 통해 할 수 있습니다."}
                </mark>
              </span>
            </div>
            <div className="item-row">
              <span className="item-circle">{"(2)"}</span>
              <span>{"회사는 불특정 다수 회원에 대한 통지의 경우 서비스 공지사항 등에 게시함으로써 개별 통지에 갈음할 수 있습니다."}</span>
            </div>
          </div>
        </Article>

        <Article id="a21" num="21" title="회원의 개인정보보호">
          <p>{"회사는 관련법령이 정하는 바에 따라서 회원 등록정보를 포함한 회원의 개인정보를 보호하기 위하여 노력합니다. 회원의 개인정보보호에 관한 사항은 관련법령 및 회사가 정하는 통합개인정보처리방침에 정한 바에 따릅니다."}</p>
        </Article>

        <Article id="a22" num="22" title="개인정보의 처리 업무 위탁">
          <p>{"회사는 수집된 개인정보의 처리 업무를 스스로 수행할 것을 원칙으로 하나, 필요한 경우 일부 또는 전부를 회사가 선정한 제3자에게 위탁할 수 있습니다."}</p>
        </Article>

        <ChapterHeader>{"제2장의2 N-Pass 서비스"}</ChapterHeader>

        <Article id="a22-2" num="22의2" title="N-Pass의 제공">
          <ParenList
            items={[
              "회사는 메시지 수신자가 비즈팅 N-Pass기능 페이지에서 개인정보 수집·제공에 동의한 경우, 해당 정보를 수집하여 회원(고객사)에게 제 3자 제공하여 공동으로 처리하고 지원하는 N-Pass 서비스를 제공합니다.",
              "N-Pass 서비스는 회원이 별도의 'N-Pass 서비스 이용 및 보안 서약'(이하 '보안 서약')에 동의하고 서비스를 활성화한 경우에만 이용할 수 있습니다.",
              "회사는 N-Pass 서비스를 통해 제 3자 제공을 위해 공동 처리의 일환으로 수집·활용하는 개인정보의 항목, 목적, 보유 기간 등을 '개인정보처리방침' 및 정보주체의 동의 화면에 명시합니다.",
              "회사는 서비스의 기술적 사정 또는 운영 정책 변경 등으로 인해 N-Pass 서비스의 내용을 변경하거나 중단할 수 있으며, 이 경우 회원에게 사전 통지합니다.",
            ]}
          />
        </Article>

        <Article id="a22-3" num="22의3" title="보안 서약 및 서비스 활성화">
          <ParenList
            items={[
              <>
                {"회원은 N-Pass 서비스를 활성화하기 전에 다음 각 호의 사항을 포함한 보안 서약에 동의하여야 합니다."}
                <DotNumList
                  items={[
                    "관리자 계정의 2단계 인증(이메일 인증 등 MFA) 필수 적용 및 내부 접근 권한 최소화",
                    "공동처리하는 제 3자 제공받은 정보를 명시된 목적(마케팅·회원 유치) 외 사용 및 외부 유출 금지",
                    "이용 목적 달성 또는 정보주체의 동의 철회 시 5일 이내 복구 불가능한 방법으로 파기",
                    "활용하는 데이터를 활용하여 진행하는 모든 활동에 대한 법적 책임이 회원에게 있음을 확인하고, 사고 발생 시 비즈팅이 면책됨에 동의",
                  ]}
                />
              </>,
              "보안 서약에 동의하지 않는 경우 N-Pass 서비스를 이용할 수 없습니다.",
              "회사는 보안 서약 이력을 전자적으로 기록·보관하며, 분쟁 발생 시 이를 증거로 활용할 수 있습니다.",
            ]}
          />
        </Article>

        <Article id="a22-4" num="22의4" title="N-Pass 서비스의 이용 제한 및 해지">
          <ParenList
            items={[
              <>
                {"회사는 회원이 다음 각 호에 해당하는 경우 N-Pass 서비스의 이용을 즉시 중단하거나 제한할 수 있습니다."}
                <DotNumList
                  items={[
                    "제18조 제(17)항 또는 보안 서약을 위반한 경우",
                    "개인정보 유출, 오남용, 불법 이용 등이 확인되거나 의심되는 경우",
                    "정보주체로부터 개인정보 침해 신고가 접수된 경우",
                    "관련 법령을 위반하였거나 위반이 우려되는 경우",
                  ]}
                />
              </>,
              "회원이 N-Pass 서비스를 해지하는 경우 해지 시점에 보유 중인 개인정보를 5일 이내에 파기하고 그 결과를 회사에 통보하여야 합니다.",
              "회사가 서비스를 중단하는 경우 회원에게 사전 통지하며, 회원은 통지 즉시 보유 중인 개인정보를 파기하여야 합니다.",
            ]}
          />
        </Article>

        <ChapterHeader>{"제3장 포인트 관련 규정"}</ChapterHeader>

        <Article id="a23" num="23" title="포인트의 사용">
          <ParenList
            items={[
              "충전한 비즈팅 포인트에 대한 차감은 회사가 제공하는 서비스를 이용하는 시점에서 즉시 이루어집니다.",
              "정상적이지 않은 방법으로 비즈팅 포인트를 충전하거나 사용한 경우 해당 비즈팅 포인트만큼을 이용자의 비즈팅 포인트에서 강제로 차감할 수 있으며, 서비스 이용을 제한할 수 있습니다.",
            ]}
          />
        </Article>

        <Article id="a24" num="24" title="포인트의 차감">
          <ParenList
            items={[
              "충전한 비즈팅 포인트에 대한 차감은 회사가 제공하는 서비스를 이용하는 시점에서 즉시 이루어집니다.",
              "정상적이지 않은 방법으로 비즈팅 포인트를 충전하거나 사용한 경우 해당 비즈팅 포인트만큼을 이용자의 비즈팅 포인트에서 강제로 차감할 수 있으며, 서비스 이용을 제한할 수 있습니다.",
            ]}
          />
        </Article>

        <Article id="a25" num="25" title="포인트의 사용제한">
          <ParenList
            items={[
              <>
                {"회원은 다음 각호에 해당하는 행위를 하여서는 아니 되며 이를 위반할 경우 회사는 회원에 대하여 비즈팅 포인트 이용을 정지시킬 수 있습니다."}
                <LetteredList
                  items={[
                    "타인의 이용 아이디 및 비밀번호를 부정하게 사용하는 경우",
                    "타인의 명의나 개인정보를 도용하여 서비스를 이용하는 경우",
                    "타인의 결제정보 등을 도용하거나 부정한 행위로 거래를 하는 경우",
                    "비즈팅 포인트 서비스 제공에 지장을 초래하는 경우",
                    "본 약관에 위반하는 방법으로 비즈팅 포인트 서비스를 이용하는 경우",
                    "기타 법령에 위배되는 행위를 하는 경우",
                  ]}
                />
              </>,
              "회사는 비즈팅 포인트 이용을 제한할 경우 이용 제한 내용과 소명 절차를 이용자가 지정한 전자우편, SMS 등으로 통지하여 이용자가 이를 소명할 수 있는 기회를 부여합니다.",
            ]}
          />
        </Article>

        <Article id="a26" num="26" title="포인트의 충전방법">
          <ParenList
            items={[
              "비즈팅 포인트 충전은 회사가 정한 다양한 결제수단을 이용하여 충전할 수 있습니다.",
              <>
                {"비즈팅 포인트의 충전을 위해 다음과 같은 결제수단이 제공되며, 회사의 사정으로 추가 및 서비스 중지가 될 수 있습니다."}
                <LetteredList items={["신용카드", "계좌이체", "무통장입금"]} />
              </>,
              "회사가 제공하는 결제수단은 회사의 운영방침에 따라 이용이 제한될 수 있습니다.",
              "회사가 제공하는 시스템상의 장애에 의하여 충전이 정상적으로 이루어지지 못한 경우에 비즈팅 포인트로 재충전을 받을 수 있습니다.",
            ]}
          />
        </Article>

        <Article id="a27" num="27" title="포인트의 유효기간">
          <ParenList items={["비즈팅 포인트의 유효기간은 충전일 또는 구매일로부터 60개월입니다."]} />
        </Article>

        <Article id="a28" num="28" title="포인트의 환불">
          <ParenList
            items={[
              "유효기간이 지난 비즈팅 포인트는 환불받으실 수 없습니다.",
              "충전에 해당되는 결제 수단의 승인 취소 또는 결제 수단으로 결제 금액을 재 환원하는 것으로 환불을 대신할 수 있을 경우 회사는 현금 환불을 하지 않습니다.",
              <>
                {"아래의 내용에 해당하는 경우 환불 신청을 통해 회사가 정한 절차에 따라 환불을 받을 수 있습니다."}
                <ItemList
                  items={[
                    "비즈팅 포인트를 충전했으나 사용할 수 있는 서비스가 전무하며 그에 대한 책임이 전적으로 회사에 있는 경우 (단, 시스템 정기점검 등의 불가피한 경우는 제외)",
                    "비즈팅 포인트 잔액이 남아 있는 상태에서 회원이 변경된 약관에 동의하지 않는다는 이유로 탈퇴하고, 회사가 이를 정당하다고 판단하는 경우",
                    "기타 고객의 권리보호를 위하여 회사가 별도로 정한 경우",
                  ]}
                />
              </>,
              <>
                {"아래 내용에 해당하는 경우 캐시는 자동으로 소멸됩니다."}
                <ItemList
                  items={[
                    "회원의 귀책사유로 탈퇴된 경우",
                    "회원의 귀책사유로 탈퇴한 경우",
                    "제18조 (회원의 의무)를 위반하여 탈퇴한 경우",
                  ]}
                />
              </>,
              "환불 신청시 결제금액에 따라 사용건수에 따른 전송요금, 재정경제부에서 고시한에서 규정한 위약금(총 이용료의 10%) 및 PG수수료, 송금비용을 제외한 잔액을 환불하여 드립니다. 단, 위약금 및 PG수수료, 송금비용, 결제금액에 따라 추가 증여된 캐시의 합계는 최소 5,000원입니다. 따라서 5,000원 미만의 캐시는 회원 탈퇴시 자동 소멸됩니다.",
            ]}
          />
        </Article>

        <Article id="a29" num="29" title="포인트의 환불 절차">
          <ParenList
            items={[
              <>
                {"비즈팅 포인트의 환불 절차는 다음과 같습니다."}
                <LetteredList
                  items={[
                    "환불 신청 시 이용자는 비즈팅에 환불 신청 접수를 하여야 합니다.",
                    "환불 신청은 비즈팅 고객센터 메일(tf@biztalk.co.kr)을 통하여 신청하실 수 있습니다.",
                    "회사는 환불 신청 접수 후 환불요청 확인절차를 거쳐 14일 이내에 제3장 28조 (포인트의 환불)에 따라 충전금액 환불을 진행합니다.",
                  ]}
                />
              </>,
              <>
                {"다음 사항에 해당될 경우에는 환불이 불가능합니다."}
                <LetteredList
                  items={[
                    "이벤트 행사 등 무상으로 받은 비즈팅 포인트인 경우",
                    "비 정상적인 방법으로 포인트를 충전한 경우",
                  ]}
                />
              </>,
            ]}
          />
        </Article>

        <ChapterHeader>{"제4장 계약 해지 및 이용 제한"}</ChapterHeader>

        <Article id="a30" num="30" title="계약해지">
          <p>{"회원이 이용계약을 해지하고자 하는 때에는 회원 본인이 회사의 서비스 페이지를 통해 회사에 해지 신청을 하여야 합니다."}</p>
        </Article>

        <Article id="a31" num="31" title="이용 제한">
          <ParenList
            items={[
              "회사는 국가비상사태, 서비스 설비의 장애 또는 서비스 이용의 폭주 등으로 서비스 이용에 지장이 있는 때에는 서비스의 전부 또는 일부를 제한하거나 정지할 수 있습니다.",
              "서비스의 원활한 운영을 위하여 회원이 전송하는 메시지에 대해 일별 또는 월별 전송 허용 건수 및 전송 시간 등을 제한할 수 있으며 개별 메시지에 대한 재전송 횟수를 한정할 수 있습니다.",
              <>
                {"회사는 회원의 서비스 이용 내용이 다음 각 호에 해당하는 경우 서비스 이용을 제한할 수 있습니다."}
                <ItemList
                  items={[
                    "제18조 규정에 의한 회원의 의무를 이행하지 않은 경우",
                    "서비스의 안정적 운영을 방해할 목적으로 다량의 정보를 전송하거나 수신자의 의사에 반하여 광고성 정보를 지속적으로 전송하는 경우",
                    "다른 회원 또는 제3자의 지적재산권을 침해하는 경우",
                    "방송통신심의위원회의 시정요구가 있거나 불법선거운동과 관련하여 중앙선거관리위원회의 유권해석을 받은 경우",
                    "타 회원의 아이디를 부정하게 이용하거나 타인의 명예를 손상시키거나 불이익을 주는 경우",
                    "서비스 정보를 이용하여 얻은 정보를 회사의 사전 승낙 없이 복제 또는 유통시키거나 상업적으로 이용하는 경우",
                    "서비스에 위해를 가하거나 서비스의 건전한 이용을 저해하는 경우",
                    "타인의 명의를 이용하여 신청(계약)한 경우 또는 신청서의 내용을 허위로 기재하였거나 허위서류를 첨부하여 이용승낙을 득한 경우",
                    "국익 또는 사회적 공익을 저해할 목적으로 이용되는 경우",
                    "메시지 수신자가 '스팸'으로 신고하거나 회원이 발송하는 메시지가 '불법스팸'임이 판명될 경우",
                    "회사의 수신거부 요청 처리에 불성실하여 수신거부 요청 건수가 감소되지 않거나 발송금지를 요청한 메시지 내용이 중복적으로 발송될 경우",
                    "방송통신위원회 또는 한국인터넷진흥원이 '스팸', '불법스팸', '문자피싱' 전송 사실을 확인하여 이용정지를 요청하는 경우",
                    "제18조 제(17)항 또는 보안 서약을 위반하여 개인정보를 오남용·유출하거나 관련 법령을 위반한 경우",
                  ]}
                />
              </>,
              "회사는 상기 3항 ⑩ 내지 ⑫의 경우 회원에게 전송량 축소, 아이디 중지 등의 방법으로 서비스 이용을 제한할 수 있습니다.",
            ]}
          />
        </Article>

        <ChapterHeader>{"제5장 손해배상 및 면책조항 및 기타조항"}</ChapterHeader>

        <Article id="a32" num="32" title="손해배상">
          <ParenList
            items={[
              "회사는 서비스 이용과 관련하여 회사의 귀책사유로 인하여 발생되지 않은 회원의 손실에 관해서는 책임을 지지 않습니다.",
              "회원이 본 약관의 규정을 위반함으로 인하여 회사에 손해가 발생하게 되는 경우, 이 약관을 위반한 회원은 회사에 발생하는 모든 손해를 배상하여야 합니다.",
              "회원이 서비스를 이용하는 과정에서 행한 불법행위나 본 약관 위반행위로 인하여 회사가 당해 회원 이외의 제3자로부터 손해배상청구 또는 소송을 비롯한 각종 이의제기를 받는 경우, 당해 회원은 자신의 책임과 비용으로 회사를 면책시켜야 하며, 회사가 면책되지 못한 경우, 당해 회원은 그로 인하여 회사에 발생한 모든 손해를 배상하여야 합니다.",
              "'정보통신망법'에서 규정한 사항을 위반하여 발생한 손해에 대한 책임은 회사에서 책임지지 않습니다.",
              "회원이 N-Pass 서비스를 통해 활용하는 개인정보를 오남용·유출하거나 관련 법령을 위반하여 정보주체 또는 제3자에게 손해를 입힌 경우, 해당 회원(고객사)이 모든 손해배상 책임을 부담하며 회사는 이에 대하여 어떠한 책임도 지지 않습니다. 회사가 제3자로부터 이의제기·손해배상청구를 받은 경우 회원은 자신의 비용으로 회사를 면책시켜야 합니다.",
            ]}
          />
        </Article>

        <Article id="a33" num="33" title="면책조항">
          <ParenList
            items={[
              "회사는 제12조에 의거 회원의 서비스 이용을 제한하는 경우 이로 인해 발생할 수 있는 회원의 손해 등에 대해서는 책임이 면제됩니다.",
              "회사는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다.",
              "회사는 회원이 서비스에 게재한 정보, 자료, 사실의 신뢰도·정확성 등 내용에 관하여는 책임을 지지 않습니다.",
              "회사는 회원이 서비스를 이용하여 기대하는 손익이나 서비스를 통하여 얻은 자료로 인한 손해에 관하여 책임을 지지 않습니다.",
              "회사는 회원 상호간 또는 회원과 제3자 상호간에 서비스를 매개로 발생한 분쟁에 대해서는 개입할 의무가 없으며 이로 인한 손해를 배상할 책임도 없습니다.",
              "회사는 제30조에 의거 이용고객의 서비스 이용을 제한하는 경우 이로 인해 발생할 수 있는 이용고객의 손해 등에 대해서는 책임이 면제됩니다.",
              "회사는 N-Pass 서비스를 통해 회원에게 제 3자 제공한 공동처리하는 개인정보의 활용 과정에서 발생하는 손해에 대하여 책임을 지지 않습니다. 본 서비스에서 회사의 책임은 공동 개인정보처리자로서 시스템을 통한 정보의 수집 및 안전한 보관 관리에 한정되며, 회원(고객사)이 해당 정보를 접근(또는 다운로드)하여 마케팅 등에 직접 활용하는 과정에서 발생하는 제반 책임은 회원에게 있습니다.",
            ]}
          />
        </Article>

        <Article id="a34" num="34" title="분쟁 해결">
          <ParenList
            items={[
              "회사와 이용고객간의 통신은 서면, 전자우편, 팩스 등으로 합니다.",
              "분쟁으로 소송이 제기될 경우, 대한민국 서울지방법원을 관할법원으로 합니다.",
            ]}
          />
        </Article>

        <ChapterHeader>{"부칙"}</ChapterHeader>

        <Article id="abuchik" num="부칙" title="부칙">
          <ParenList
            items={[
              "공고일자: 2026.9.28 시행일자: 2026.10.18",
              "본 '약관'은 2026년 10월 18일부터 시행됩니다.",
             
            ]}
          />
        </Article>
      </div>

      {/* ── 변경사항 모달 ── */}
      <ClauseVersionModal
        open={changeModalOpen}
        title="이번 개정 사항 요약"
        subtitle="약관 변경 통지 절차, 베타 서비스 제공 근거, 회원 통지 방법을 보완했습니다."
        ctaLabel="확인"
        onClose={() => setChangeModalOpen(false)}
        onConfirm={() => setChangeModalOpen(false)}
      >
        <div className="modal-section">
          <div className="modal-section-title">{"주요 변경 조항"}</div>
          <table className="modal-tbl">
            <thead><tr><th>{"조항"}</th><th>{"내용"}</th></tr></thead>
            <tbody>
              {CHANGE_ROWS.map(([tag, text], i) => (
                <tr key={i}><td style={{ fontWeight: 600, whiteSpace: "pre-line" }}>{tag}</td><td>{text}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </ClauseVersionModal>
    </ClauseStaticDocument>
  );
};

export default BiztingTermsDocument;

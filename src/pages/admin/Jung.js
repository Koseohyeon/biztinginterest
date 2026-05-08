const pptxgen = require("pptxgenjs");

// ═══════════════════════════════════════════════════════════════════
// 디자인 시스템 — 밝고 정돈된 고급 컨설팅 스타일
// Primary: 순백 배경, 딥 차콜 타이포, 포인트 인디고+에메랄드
// ═══════════════════════════════════════════════════════════════════
const C = {
  white:   "FFFFFF",
  bg:      "F7F8FC",       // 슬라이드 배경 (차가운 오프화이트)
  dark:    "1A1F36",       // 메인 텍스트 (딥 네이비 차콜)
  indigo:  "3B4FD9",       // 핵심 포인트 컬러 (인디고 블루)
  indigoL: "EEF0FD",       // 인디고 연한 배경
  teal:    "0D9488",       // 보조 포인트 (에메랄드 틸)
  tealL:   "CCFBF1",       // 틸 연한 배경
  amber:   "D97706",       // 강조 (앰버)
  amberL:  "FEF3C7",
  slate:   "64748B",       // 서브 텍스트
  line:    "E2E7F0",       // 구분선
  card:    "FFFFFF",       // 카드 배경
  headerBg:"1A1F36",       // 슬라이드 헤더 배경
};

// 그림자 (재사용마다 새 객체 필수)
const sh = () => ({ type:"outer", blur:12, offset:3, angle:130, color:"3B4FD9", opacity:0.07 });
const shM = () => ({ type:"outer", blur:18, offset:5, angle:130, color:"1A1F36", opacity:0.10 });

// ─── 헤더 공통 함수 ─────────────────────────────────────────────────
function addHeader(s, pres, num, title) {
  // 좌측 인디고 사이드바 바 (얇은 accent)
  s.addShape(pres.shapes.RECTANGLE, {
    x:0, y:0, w:10, h:0.72,
    fill:{ color:C.white }, line:{ type:"none" }
  });
  // 하단 구분선
  s.addShape(pres.shapes.RECTANGLE, {
    x:0, y:0.72, w:10, h:0.028,
    fill:{ color:C.line }, line:{ type:"none" }
  });
  // 번호 칩
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x:0.45, y:0.13, w:0.52, h:0.46,
    fill:{ color:C.indigo }, line:{ type:"none" }, rectRadius:0.06
  });
  s.addText(num, {
    x:0.45, y:0.13, w:0.52, h:0.46,
    fontSize:11, bold:true, color:C.white, align:"center", valign:"middle"
  });
  s.addText(title, {
    x:1.1, y:0.13, w:8.5, h:0.46,
    fontSize:17, bold:true, color:C.dark, valign:"middle"
  });
  // 우측 브랜드 워터마크
  s.addText("비즈팅", {
    x:8.8, y:0.18, w:0.85, h:0.36,
    fontSize:10, bold:true, color:C.slate, align:"right", valign:"middle"
  });
}

// ─── 태그 칩 함수 ───────────────────────────────────────────────────
function chip(s, pres, x, y, label, color, bgColor) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w:label.length * 0.115 + 0.3, h:0.27,
    fill:{ color:bgColor }, line:{ type:"none" }, rectRadius:0.06
  });
  s.addText(label, {
    x, y, w:label.length * 0.115 + 0.3, h:0.27,
    fontSize:9, bold:true, color, align:"center", valign:"middle"
  });
}

async function buildPPT() {
  let pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title  = "정관장 CRM 전략 제안서";

  // ════════════════════════════════════════════════════════════════
  // SLIDE 1 — 표지  (다크 풀블리드 + 좌측 화이트 컨텐츠)
  // ════════════════════════════════════════════════════════════════
  {
    let s = pres.addSlide();
    s.background = { color: C.dark };

    // 우측 절반 — 인디고 패널
    s.addShape(pres.shapes.RECTANGLE, {
      x:5.8, y:0, w:4.2, h:5.625,
      fill:{ color:C.indigo }, line:{ type:"none" }
    });
    // 인디고 패널 위 원형 장식
    s.addShape(pres.shapes.OVAL, {
      x:6.5, y:-1.2, w:4.5, h:4.5,
      fill:{ color:"FFFFFF", transparency:94 }, line:{ type:"none" }
    });
    s.addShape(pres.shapes.OVAL, {
      x:8.2, y:2.8, w:2.8, h:2.8,
      fill:{ color:"FFFFFF", transparency:90 }, line:{ type:"none" }
    });

    // 우측 패널 텍스트
    s.addText("Customer\nRelationship\nManagement", {
      x:6.0, y:0.6, w:3.8, h:2.2,
      fontSize:26, bold:true, color:"FFFFFF",
      lineSpacingMultiple:1.25, transparency:15
    });
    s.addText([
      { text:"비즈팅", options:{ bold:true, fontSize:13 } },
      { text:"  ·  스토어톡  ·  브랜드메시지  ·  카카오싱크", options:{ fontSize:10 } }
    ], {
      x:6.0, y:3.8, w:3.8, h:0.5,
      color:"FFFFFF", valign:"middle", transparency:20
    });

    // 좌측 컨텐츠
    // 태그 뱃지
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x:0.55, y:0.9, w:1.8, h:0.32,
      fill:{ color:C.teal }, line:{ type:"none" }, rectRadius:0.05
    });
    s.addText("CRM 전략 제안서 2026", {
      x:0.55, y:0.9, w:1.8, h:0.32,
      fontSize:9, bold:true, color:C.white, align:"center", valign:"middle"
    });

    // 메인 타이틀
    s.addText("정관장\n고객 생애주기\nCRM 자동화 전략", {
      x:0.55, y:1.35, w:5.0, h:2.6,
      fontSize:36, bold:true, color:C.white,
      lineSpacingMultiple:1.18
    });

    // 서브타이틀
    s.addText("신규 고객 유치부터 VIP 관리까지\n하나의 사이클로 완성합니다.", {
      x:0.55, y:4.1, w:5.0, h:0.8,
      fontSize:13, color:"A8B4CC",
      lineSpacingMultiple:1.5
    });

    // 하단 구분선 + 기관명
    s.addShape(pres.shapes.RECTANGLE, {
      x:0.55, y:5.1, w:3.0, h:0.02,
      fill:{ color:"404870" }, line:{ type:"none" }
    });
    s.addText("BIZTALK Corp.  ×  정관장", {
      x:0.55, y:5.18, w:3.5, h:0.35,
      fontSize:10, color:"7080A0", valign:"middle"
    });
  }

  // ════════════════════════════════════════════════════════════════
  // SLIDE 2 — 목차
  // ════════════════════════════════════════════════════════════════
  {
    let s = pres.addSlide();
    s.background = { color: C.white };

    // 좌측 다크 사이드바
    s.addShape(pres.shapes.RECTANGLE, {
      x:0, y:0, w:3.2, h:5.625,
      fill:{ color:C.dark }, line:{ type:"none" }
    });
    // 사이드바 장식원
    s.addShape(pres.shapes.OVAL, {
      x:-0.8, y:3.5, w:3.5, h:3.5,
      fill:{ color:C.indigo, transparency:80 }, line:{ type:"none" }
    });

    s.addText("목차", {
      x:0.35, y:0.45, w:2.5, h:0.65,
      fontSize:30, bold:true, color:C.white
    });
    s.addText("Contents", {
      x:0.35, y:1.05, w:2.5, h:0.35,
      fontSize:13, color:"6070A0"
    });

    // 하단 사이드바 설명
    s.addText("고객 데이터 기반\nCRM 자동화 솔루션\n제안서", {
      x:0.35, y:4.3, w:2.6, h:1.0,
      fontSize:11, color:"8090B8", lineSpacingMultiple:1.5
    });

    const items = [
      { num:"01", title:"배경 / 문제 정의",     sub:"현황 분석 및 CRM 도입 필요성" },
      { num:"02", title:"시장 및 고객 변화",    sub:"디지털 CRM 전환의 배경과 근거" },
      { num:"03", title:"솔루션 소개",          sub:"비즈팅 · 스토어톡 · 브랜드메시지 · 카카오싱크" },
      { num:"04", title:"전체 고객 여정 전략",  sub:"신규 유치 → 구매 전환 → 재구매 → VIP 관리" },
      { num:"05", title:"실행 전략 상세",       sub:"시나리오 · 예상 발송량 · KPI · 추진 일정" },
      { num:"06", title:"예산 집행안",          sub:"플랜 A (풀패키지) · 플랜 B (단계별 확장)" },
      { num:"07", title:"기대효과 및 로드맵",   sub:"정량 목표 및 CRM 자동화 단계별 로드맵" },
    ];

    items.forEach((it, i) => {
      const y = 0.38 + i * 0.73;
      // 행 배경
      s.addShape(pres.shapes.RECTANGLE, {
        x:3.45, y, w:6.2, h:0.64,
        fill:{ color: i % 2 === 0 ? C.white : C.bg }, line:{ type:"none" }
      });
      // 번호
      s.addText(it.num, {
        x:3.55, y:y+0.1, w:0.42, h:0.42,
        fontSize:11, bold:true, color:C.indigo, align:"center", valign:"middle"
      });
      // 세로 구분선
      s.addShape(pres.shapes.RECTANGLE, {
        x:4.08, y:y+0.1, w:0.022, h:0.42,
        fill:{ color:C.line }, line:{ type:"none" }
      });
      s.addText(it.title, {
        x:4.2, y:y+0.06, w:5.2, h:0.28,
        fontSize:12, bold:true, color:C.dark
      });
      s.addText(it.sub, {
        x:4.2, y:y+0.35, w:5.2, h:0.22,
        fontSize:9.5, color:C.slate
      });
    });
  }

  // ════════════════════════════════════════════════════════════════
  // SLIDE 3 — 배경 / 문제 정의
  // ════════════════════════════════════════════════════════════════
  {
    let s = pres.addSlide();
    s.background = { color: C.bg };
    addHeader(s, pres, "01", "배경 및 문제 정의 — 현재 정관장이 직면한 과제");

    // 5개 문제 카드 (가로 배열)
    const problems = [
      { tag:"신규 유입",    title:"성장 동력 약화",    body:"신규 고객 유입이 정체되어\n브랜드 인지도 의존형\n성장 구조가 한계에 봉착" },
      { tag:"고객 구조",   title:"재구매 편중 구조",  body:"기존 충성 고객 중심으로\n신규 채널 다양화 및\n연령대 확장이 미흡한 상황" },
      { tag:"세대 공략",   title:"2030 고객층 부재", body:"미래 핵심 소비층인\n젊은 세대의 유입이 부족하여\n장기 성장 리스크 증대" },
      { tag:"데이터 활용", title:"DB 활용도 저조",   body:"풍부한 구매 데이터 보유에도\n개인화 마케팅 시스템과의\n연결고리가 부재" },
      { tag:"광고 효율",   title:"CAC 지속 상승",    body:"고객 획득 비용(CAC) 증가와\n단순 광고 ROI 하락으로\n정밀 타겟팅 전환이 필요" },
    ];

    problems.forEach((p, i) => {
      const x = 0.32 + i * 1.88;
      s.addShape(pres.shapes.RECTANGLE, {
        x, y:0.95, w:1.75, h:3.05,
        fill:{ color:C.card }, line:{ type:"none" }, shadow:sh()
      });
      // 상단 컬러 바
      s.addShape(pres.shapes.RECTANGLE, {
        x, y:0.95, w:1.75, h:0.05,
        fill:{ color:C.indigo }, line:{ type:"none" }
      });
      // 번호
      s.addText(`0${i+1}`, {
        x:x+0.1, y:1.08, w:0.45, h:0.38,
        fontSize:18, bold:true, color:C.indigoL
      });
      // 태그 칩
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x:x+0.1, y:1.52, w:1.0, h:0.22,
        fill:{ color:C.indigoL }, line:{ type:"none" }, rectRadius:0.04
      });
      s.addText(p.tag, {
        x:x+0.1, y:1.52, w:1.0, h:0.22,
        fontSize:8.5, bold:true, color:C.indigo, align:"center", valign:"middle"
      });
      s.addText(p.title, {
        x:x+0.1, y:1.85, w:1.55, h:0.38,
        fontSize:11, bold:true, color:C.dark
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x:x+0.1, y:2.28, w:1.55, h:0.018,
        fill:{ color:C.line }, line:{ type:"none" }
      });
      s.addText(p.body, {
        x:x+0.1, y:2.35, w:1.55, h:1.45,
        fontSize:9.5, color:C.slate, lineSpacingMultiple:1.45
      });
    });

    // 결론 배너
    s.addShape(pres.shapes.RECTANGLE, {
      x:0.32, y:4.15, w:9.36, h:1.18,
      fill:{ color:C.indigo }, line:{ type:"none" }, shadow:shM()
    });
    // 좌측 틸 포인트
    s.addShape(pres.shapes.RECTANGLE, {
      x:0.32, y:4.15, w:0.055, h:1.18,
      fill:{ color:C.teal }, line:{ type:"none" }
    });
    s.addText("핵심 과제", {
      x:0.55, y:4.25, w:1.1, h:0.3,
      fontSize:9, bold:true, color:C.teal
    });
    s.addText("단순 광고·홍보 중심의 마케팅 구조에서 벗어나, 고객 데이터 기반의 자동화된 관계 관리 체계 구축이 필요합니다.", {
      x:0.55, y:4.55, w:9.0, h:0.38,
      fontSize:12.5, bold:true, color:C.white
    });
    s.addText("비즈팅은 신규 고객 유치부터 구매 전환, 재구매, VIP 관리까지 — 하나의 통합 CRM 사이클로 이를 해결합니다.", {
      x:0.55, y:4.94, w:9.0, h:0.3,
      fontSize:10.5, color:"A8B8E8"
    });
  }

  // ════════════════════════════════════════════════════════════════
  // SLIDE 4 — 시장 및 고객 변화
  // ════════════════════════════════════════════════════════════════
  {
    let s = pres.addSlide();
    s.background = { color: C.bg };
    addHeader(s, pres, "02", "시장 및 고객 변화 — 디지털 CRM 전환이 필요한 이유");

    // 좌측: 3개 수치 카드
    const stats = [
      { val:"35%↑", sub:"건강기능식품 시장 내\n경쟁 강도 증가율", accent:C.indigo, bg:C.indigoL },
      { val:"40%↑", sub:"고객 획득 비용(CAC)\n최근 3년간 상승률",   accent:C.amber,  bg:C.amberL },
      { val:"28%↓", sub:"단순 배너 광고\n투자 수익률(ROI) 감소", accent:C.teal,   bg:C.tealL },
    ];
    stats.forEach((st, i) => {
      const y = 0.9 + i * 1.48;
      s.addShape(pres.shapes.RECTANGLE, {
        x:0.38, y, w:3.5, h:1.3,
        fill:{ color:C.card }, line:{ type:"none" }, shadow:sh()
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x:0.38, y, w:0.055, h:1.3,
        fill:{ color:st.accent }, line:{ type:"none" }
      });
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x:0.55, y:y+0.15, w:1.6, h:0.55,
        fill:{ color:st.bg }, line:{ type:"none" }, rectRadius:0.06
      });
      s.addText(st.val, {
        x:0.55, y:y+0.15, w:1.6, h:0.55,
        fontSize:22, bold:true, color:st.accent, align:"center", valign:"middle"
      });
      s.addText(st.sub, {
        x:2.3, y:y+0.18, w:1.48, h:0.82,
        fontSize:10, color:C.slate, lineSpacingMultiple:1.4
      });
    });

    // 우측: 4개 CRM 트렌드 카드
    s.addShape(pres.shapes.RECTANGLE, {
      x:4.18, y:0.9, w:5.5, h:4.38,
      fill:{ color:C.card }, line:{ type:"none" }, shadow:sh()
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x:4.18, y:0.9, w:5.5, h:0.055,
      fill:{ color:C.indigo }, line:{ type:"none" }
    });
    s.addText("디지털 CRM이 답인 이유", {
      x:4.28, y:0.98, w:5.3, h:0.42,
      fontSize:12.5, bold:true, color:C.dark
    });

    const trends = [
      { color:C.indigo, bg:C.indigoL, tag:"관계 관리", title:"구매 후 관계 유지의 중요성 급부상",  body:"첫 구매 이후 자동화된 CRM으로 브랜드 경험을 지속적으로 제공합니다." },
      { color:C.teal,   bg:C.tealL,   tag:"채널 트렌드", title:"카카오 기반 CRM 활용 강화 추세",    body:"알림톡·브랜드메시지·친구톡 등 카카오 채널 활용이 빠르게 확산되고 있습니다." },
      { color:C.amber,  bg:C.amberL,  tag:"커머스 연동", title:"네이버 스마트스토어 CRM 체계 확대", body:"스토어톡을 통한 주문·배송·리뷰 자동화로 고객 접점이 강화되고 있습니다." },
      { color:"7C3AED", bg:"EDE9FE",  tag:"데이터 자산", title:"자사 고객 DB의 전략적 중요성 증대", body:"카카오싱크를 통한 회원 데이터의 직접 확보 및 분석 역량이 핵심 경쟁력입니다." },
    ];
    trends.forEach((t, i) => {
      const ty = 1.52 + i * 0.82;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x:4.35, y:ty+0.06, w:0.75, h:0.22,
        fill:{ color:t.bg }, line:{ type:"none" }, rectRadius:0.04
      });
      s.addText(t.tag, {
        x:4.35, y:ty+0.06, w:0.75, h:0.22,
        fontSize:8, bold:true, color:t.color, align:"center", valign:"middle"
      });
      s.addText(t.title, {
        x:5.2, y:ty, w:4.35, h:0.32,
        fontSize:11.5, bold:true, color:C.dark
      });
      s.addText(t.body, {
        x:4.35, y:ty+0.33, w:5.2, h:0.38,
        fontSize:9.5, color:C.slate, lineSpacingMultiple:1.35
      });
      if (i < 3) {
        s.addShape(pres.shapes.RECTANGLE, {
          x:4.35, y:ty+0.75, w:5.2, h:0.012,
          fill:{ color:C.line }, line:{ type:"none" }
        });
      }
    });
  }

  // ════════════════════════════════════════════════════════════════
  // SLIDE 5 — 솔루션 소개① 비즈팅
  // ════════════════════════════════════════════════════════════════
  {
    let s = pres.addSlide();
    s.background = { color: C.bg };
    addHeader(s, pres, "03", "솔루션 소개 ① — 비즈팅 (신규 고객 확보 및 정밀 타겟팅)");

    // 상단 설명 배너
    s.addShape(pres.shapes.RECTANGLE, {
      x:0.38, y:0.88, w:9.24, h:0.85,
      fill:{ color:C.card }, line:{ type:"none" }, shadow:sh()
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x:0.38, y:0.88, w:0.055, h:0.85,
      fill:{ color:C.indigo }, line:{ type:"none" }
    });
    s.addText("비즈팅은 SK텔레콤의 통신 데이터를 기반으로 잠재 고객을 정밀하게 타겟팅하는 광고 메시지 플랫폼입니다.", {
      x:0.58, y:0.92, w:9.0, h:0.36,
      fontSize:12, bold:true, color:C.dark
    });
    s.addText("단순 문자 발송이 아닌, 고객의 행동·위치·관심사를 복합 분석하여 구매 가능성이 높은 잠재 고객에게만 정확하게 메시지를 전달합니다.", {
      x:0.58, y:1.28, w:9.0, h:0.32,
      fontSize:10, color:C.slate
    });

    // 타겟팅 조건 5개 (아이콘 + 텍스트 카드)
    const targets = [
      { icon:"📱", label:"웹·앱 접속 이력",    sub:"방문·사용 이력 기반" },
      { icon:"📞", label:"통화 이력 분석",      sub:"업종별 통화 패턴" },
      { icon:"📍", label:"실시간 위치 타겟",    sub:"현재 위치·체류 기반" },
      { icon:"🏠", label:"거주·직장지 추정",    sub:"생활 반경 분석" },
      { icon:"🧠", label:"고객 성향 분석",      sub:"행동 패턴 기반 추론" },
    ];
    targets.forEach((t, i) => {
      const x = 0.38 + i * 1.86;
      s.addShape(pres.shapes.RECTANGLE, {
        x, y:1.9, w:1.72, h:1.22,
        fill:{ color:C.card }, line:{ type:"none" }, shadow:sh()
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x, y:1.9, w:1.72, h:0.04,
        fill:{ color:C.teal }, line:{ type:"none" }
      });
      s.addText(t.icon, { x, y:1.96, w:1.72, h:0.45, fontSize:20, align:"center" });
      s.addText(t.label, { x, y:2.42, w:1.72, h:0.32, fontSize:10, bold:true, color:C.dark, align:"center" });
      s.addText(t.sub, { x, y:2.74, w:1.72, h:0.28, fontSize:8.5, color:C.slate, align:"center" });
    });

    // 타겟군 시나리오 4개
    s.addText("타겟 고객군 시나리오 예시", {
      x:0.38, y:3.28, w:4, h:0.32,
      fontSize:11, bold:true, color:C.dark
    });

    const scenarios = [
      { tag:"직장인", color:C.indigo, bg:C.indigoL,
        desc:"수·목 오후 3~4시 피로 피크타임 → 에브리타임 활력 메시지" },
      { tag:"수험생 부모", color:C.teal, bg:C.tealL,
        desc:"학원가 밀집 지역 저녁 체류 고객군 → 아이패스 집중력 케어 메시지" },
      { tag:"골프 관심 3050", color:C.amber, bg:C.amberL,
        desc:"골프장 방문·관련 앱 접속 고객군 → 롱기스트 선물 추천 메시지" },
      { tag:"경쟁사 접속자", color:"7C3AED", bg:"EDE9FE",
        desc:"디몰·종근당건강 접속 이력 고객군 → 프리미엄 정관장 비교 메시지" },
    ];
    scenarios.forEach((sc, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const x = col === 0 ? 0.38 : 5.1;
      const y = 3.7 + row * 0.82;
      s.addShape(pres.shapes.RECTANGLE, {
        x, y, w:4.5, h:0.7,
        fill:{ color:C.card }, line:{ type:"none" }, shadow:sh()
      });
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x:x+0.12, y:y+0.12, w:sc.tag.length*0.115+0.28, h:0.24,
        fill:{ color:sc.bg }, line:{ type:"none" }, rectRadius:0.04
      });
      s.addText(sc.tag, {
        x:x+0.12, y:y+0.12, w:sc.tag.length*0.115+0.28, h:0.24,
        fontSize:9, bold:true, color:sc.color, align:"center", valign:"middle"
      });
      s.addText(sc.desc, {
        x:x+0.12, y:y+0.4, w:4.26, h:0.24,
        fontSize:9.5, color:C.dark
      });
    });
  }

  // ════════════════════════════════════════════════════════════════
  // SLIDE 6 — 솔루션 소개② 스토어톡·브랜드메시지·카카오싱크
  // ════════════════════════════════════════════════════════════════
  {
    let s = pres.addSlide();
    s.background = { color: C.bg };
    addHeader(s, pres, "03", "솔루션 소개 ② — 스토어톡 · 브랜드메시지 · 카카오싱크");

    const cards = [
      {
        title:"스토어톡",
        sub:"네이버 스마트스토어 자동 CRM",
        accent:"005F3B", bg:"F0FDF4",
        points:[
          { t:"주문 완료 자동 감사 메시지 발송" },
          { t:"배송 시작·완료 상태 자동 알림" },
          { t:"구매 후 리뷰 자동 요청 및 관리" },
          { t:"소진 주기에 맞춘 재구매 자동 추천" },
          { t:"별도 설정 없이 즉시 자동 운영 가능" },
        ]
      },
      {
        title:"브랜드메시지",
        sub:"카카오·네이버 기반 CRM 고객 락인",
        accent:C.indigo, bg:C.indigoL,
        points:[
          { t:"카카오 알림톡 — 구매·배송 공식 알림" },
          { t:"카카오 친구톡 — 브랜드 콘텐츠 발송" },
          { t:"네이버 네이버톡톡 자동 연결" },
          { t:"건강 정보·복용 가이드 정기 발송" },
          { t:"명절·시즌별 선물 캠페인 자동화" },
        ]
      },
      {
        title:"카카오싱크",
        sub:"자사 고객 데이터 직접 확보 및 분석",
        accent:"7C3AED", bg:"EDE9FE",
        points:[
          { t:"카카오 간편 로그인 연동으로 가입 장벽 제거" },
          { t:"가입 시 고객 정보 동의 기반 데이터 수집" },
          { t:"자사 DB에 고객 데이터 직접 축적·관리" },
          { t:"구매 행동 기반 고객 세그먼트 분석" },
          { t:"세그먼트별 개인화 메시지 자동 발송" },
        ]
      },
    ];

    cards.forEach((c, i) => {
      const x = 0.3 + i * 3.18;
      // 카드 배경
      s.addShape(pres.shapes.RECTANGLE, {
        x, y:0.88, w:3.05, h:4.45,
        fill:{ color:C.card }, line:{ type:"none" }, shadow:shM()
      });
      // 상단 컬러 헤더
      s.addShape(pres.shapes.RECTANGLE, {
        x, y:0.88, w:3.05, h:1.05,
        fill:{ color:c.bg }, line:{ type:"none" }
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x, y:0.88, w:3.05, h:0.05,
        fill:{ color:c.accent }, line:{ type:"none" }
      });
      // 번호 뱃지
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x:x+0.15, y:0.98, w:0.3, h:0.3,
        fill:{ color:c.accent }, line:{ type:"none" }, rectRadius:0.05
      });
      s.addText(`0${i+1}`, {
        x:x+0.15, y:0.98, w:0.3, h:0.3,
        fontSize:9, bold:true, color:C.white, align:"center", valign:"middle"
      });
      s.addText(c.title, {
        x:x+0.55, y:0.98, w:2.4, h:0.35,
        fontSize:14, bold:true, color:c.accent
      });
      s.addText(c.sub, {
        x:x+0.15, y:1.38, w:2.78, h:0.35,
        fontSize:9.5, color:C.slate
      });

      // 구분선
      s.addShape(pres.shapes.RECTANGLE, {
        x:x+0.15, y:1.93, w:2.78, h:0.015,
        fill:{ color:C.line }, line:{ type:"none" }
      });

      // 항목들
      c.points.forEach((pt, pi) => {
        const py = 2.05 + pi * 0.6;
        // 포인트 dot
        s.addShape(pres.shapes.OVAL, {
          x:x+0.18, y:py+0.13, w:0.12, h:0.12,
          fill:{ color:c.accent }, line:{ type:"none" }
        });
        s.addText(pt.t, {
          x:x+0.38, y:py+0.04, w:2.58, h:0.46,
          fontSize:10, color:C.dark, lineSpacingMultiple:1.3
        });
      });
    });
  }

  // ════════════════════════════════════════════════════════════════
  // SLIDE 7 — 전체 고객 여정 전략
  // ════════════════════════════════════════════════════════════════
  {
    let s = pres.addSlide();
    s.background = { color: C.bg };
    addHeader(s, pres, "04", "전체 고객 여정 전략 — 하나의 통합 CRM 사이클로 완성");

    const steps = [
      { step:"STEP 1", state:"잠재 고객",     purpose:"신규 유치·홍보",    msg:"정밀 타겟 광고",    tool:"비즈팅",     accent:C.indigo, bg:C.indigoL },
      { step:"STEP 2", state:"첫 구매 고객",  purpose:"회원화·첫 전환",   msg:"웰컴 & 혜택 안내",  tool:"브랜드메시지", accent:C.teal,   bg:C.tealL },
      { step:"STEP 3", state:"복용 초기",     purpose:"브랜드 경험 제공", msg:"복용 가이드 발송",   tool:"스토어톡",    accent:"059669", bg:"DCFCE7" },
      { step:"STEP 4", state:"복용 진행",     purpose:"관계 강화",        msg:"건강 콘텐츠 제공",  tool:"브랜드메시지", accent:"7C3AED", bg:"EDE9FE" },
      { step:"STEP 5", state:"소진 예상",     purpose:"재구매 유도",      msg:"맞춤 상품 추천",    tool:"카카오싱크",  accent:C.amber,  bg:C.amberL },
      { step:"STEP 6", state:"장기 고객",     purpose:"VIP 관계 강화",   msg:"전용 혜택 제공",    tool:"통합 운영",   accent:"DC2626", bg:"FEE2E2" },
    ];

    steps.forEach((st, i) => {
      const x = 0.22 + i * 1.62;

      // 카드
      s.addShape(pres.shapes.RECTANGLE, {
        x, y:0.88, w:1.5, h:3.8,
        fill:{ color:C.card }, line:{ type:"none" }, shadow:sh()
      });
      // 헤더 컬러
      s.addShape(pres.shapes.RECTANGLE, {
        x, y:0.88, w:1.5, h:0.5,
        fill:{ color:st.bg }, line:{ type:"none" }
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x, y:0.88, w:1.5, h:0.04,
        fill:{ color:st.accent }, line:{ type:"none" }
      });
      s.addText(st.step, {
        x, y:0.9, w:1.5, h:0.46,
        fontSize:10, bold:true, color:st.accent, align:"center", valign:"middle"
      });

      // 고객 상태 (큰 텍스트)
      s.addText(st.state, {
        x:x+0.06, y:1.46, w:1.38, h:0.5,
        fontSize:12, bold:true, color:C.dark, align:"center", lineSpacingMultiple:1.2
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x:x+0.12, y:2.02, w:1.26, h:0.018,
        fill:{ color:C.line }, line:{ type:"none" }
      });

      // 목적
      s.addText("목적", { x:x+0.1, y:2.1, w:1.3, h:0.22, fontSize:8, bold:true, color:C.slate });
      s.addText(st.purpose, { x:x+0.1, y:2.3, w:1.3, h:0.38, fontSize:10, bold:true, color:st.accent, lineSpacingMultiple:1.2 });

      s.addShape(pres.shapes.RECTANGLE, {
        x:x+0.12, y:2.72, w:1.26, h:0.018,
        fill:{ color:C.line }, line:{ type:"none" }
      });

      // 메시지
      s.addText("메시지", { x:x+0.1, y:2.78, w:1.3, h:0.22, fontSize:8, bold:true, color:C.slate });
      s.addText(st.msg, { x:x+0.1, y:2.98, w:1.3, h:0.4, fontSize:9.5, color:C.dark, lineSpacingMultiple:1.2 });

      // 솔루션 뱃지
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x:x+0.1, y:4.28, w:1.3, h:0.27,
        fill:{ color:st.bg }, line:{ color:st.accent, width:0.8 }, rectRadius:0.05
      });
      s.addText(st.tool, {
        x:x+0.1, y:4.28, w:1.3, h:0.27,
        fontSize:9, bold:true, color:st.accent, align:"center", valign:"middle"
      });

      // 화살표 (카드 사이)
      if (i < 5) {
        s.addShape(pres.shapes.RECTANGLE, {
          x:x+1.5, y:2.68, w:0.1, h:0.1,
          fill:{ color:C.line }, line:{ type:"none" }
        });
      }
    });

    // 하단 통합 안내
    s.addShape(pres.shapes.RECTANGLE, {
      x:0.22, y:4.72, w:9.56, h:0.6,
      fill:{ color:C.indigoL }, line:{ type:"none" }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x:0.22, y:4.72, w:0.05, h:0.6,
      fill:{ color:C.indigo }, line:{ type:"none" }
    });
    s.addText("전 제품 적용 가능  —  에브리타임, 홍삼정, 아이패스, 롱기스트 등 모든 제품군에 동일한 단계별 CRM 사이클을 적용합니다.", {
      x:0.4, y:4.72, w:9.3, h:0.6,
      fontSize:11, bold:true, color:C.indigo, valign:"middle"
    });
  }

  // ════════════════════════════════════════════════════════════════
  // SLIDE 8 — 실행 전략 상세
  // ════════════════════════════════════════════════════════════════
  {
    let s = pres.addSlide();
    s.background = { color: C.bg };
    addHeader(s, pres, "05", "실행 전략 상세 — 시나리오 · 예상 발송량 · KPI · 추진 일정");

    const cols  = ["전략 목표", "실행 시나리오", "예상 발송량", "핵심 KPI", "추진 일정"];
    const colW  = [1.5, 2.9, 1.55, 1.85, 1.5];
    const colX  = [0.28, 1.78, 4.68, 6.23, 8.08];

    // 헤더
    colX.forEach((x, i) => {
      s.addShape(pres.shapes.RECTANGLE, {
        x, y:0.88, w:colW[i]-0.04, h:0.4,
        fill:{ color:C.dark }, line:{ type:"none" }
      });
      s.addText(cols[i], {
        x, y:0.88, w:colW[i]-0.04, h:0.4,
        fontSize:10, bold:true, color:C.white, align:"center", valign:"middle"
      });
    });

    const rows = [
      { goal:"신규 고객\n확보",   accent:C.indigo, scenario:"비즈팅 정밀 타겟팅 (직장인·수험생 부모·골프·경쟁사 접속 고객군)", volume:"월 10만~20만 건", kpi:"신규 유입 +15%\n읽음률 60% 이상", sched:"2분기 즉시" },
      { goal:"첫 구매\n전환",    accent:C.teal,   scenario:"웰컴 메시지 + 첫 구매 쿠폰 제공, 브랜드 스토리 자동 발송",          volume:"첫 구매자 전원", kpi:"구매 전환율 +10%\n첫 재구매율 +20%", sched:"2분기 세팅" },
      { goal:"재구매\n유도",     accent:"059669", scenario:"소진 예상 D-7 맞춤 상품 추천, 스토어톡 자동 알림 연동",             volume:"구매 후 25~28일", kpi:"재구매율 +25%\nCAC 비용 절감", sched:"2~3분기" },
      { goal:"휴면 고객\n복귀",  accent:"7C3AED", scenario:"90일 미구매 고객 대상 복귀 혜택 및 복용 리마인드 발송",              volume:"전체 휴면 고객", kpi:"복귀율 +10%\n고객 이탈 방어", sched:"3분기" },
      { goal:"VIP\n관리",       accent:C.amber,  scenario:"연간 구매 상위 20% 세그먼트 식별, 전용 혜택·프리미엄 콘텐츠 제공",   volume:"VIP 세그먼트", kpi:"고객 LTV +30%\n만족도 향상", sched:"3~4분기" },
      { goal:"브랜드 경험\n강화", accent:"DC2626", scenario:"명절·시즌별 선물 캠페인, 건강 콘텐츠 정기 발송으로 브랜드 락인",      volume:"전체 고객 DB", kpi:"브랜드 친밀도 향상\n오픈율 +15%", sched:"연간 상시" },
    ];

    rows.forEach((r, i) => {
      const y = 1.32 + i * 0.695;
      const bg = i % 2 === 0 ? C.white : C.bg;
      colX.forEach((x, ci) => {
        s.addShape(pres.shapes.RECTANGLE, {
          x, y, w:colW[ci]-0.04, h:0.68,
          fill:{ color:bg }, line:{ color:C.line, width:0.5 }
        });
      });
      // 목표 좌측 컬러 바
      s.addShape(pres.shapes.RECTANGLE, {
        x:0.28, y, w:0.045, h:0.68,
        fill:{ color:r.accent }, line:{ type:"none" }
      });
      s.addText(r.goal, {
        x:0.36, y:y+0.06, w:1.38, h:0.56,
        fontSize:10, bold:true, color:r.accent, align:"center", valign:"middle", lineSpacingMultiple:1.25
      });
      s.addText(r.scenario, {
        x:1.84, y:y+0.08, w:2.74, h:0.52,
        fontSize:9.5, color:C.dark, lineSpacingMultiple:1.3, valign:"middle"
      });
      s.addText(r.volume, {
        x:4.72, y:y+0.1, w:1.45, h:0.48,
        fontSize:9.5, color:C.slate, align:"center", valign:"middle"
      });
      s.addText(r.kpi, {
        x:6.27, y:y+0.08, w:1.77, h:0.52,
        fontSize:9.5, color:C.dark, lineSpacingMultiple:1.3, valign:"middle"
      });
      s.addText(r.sched, {
        x:8.12, y:y+0.1, w:1.42, h:0.48,
        fontSize:9.5, color:C.slate, align:"center", valign:"middle"
      });
    });
  }

  // ════════════════════════════════════════════════════════════════
  // SLIDE 9 — 예산 집행안 A
  // ════════════════════════════════════════════════════════════════
  {
    let s = pres.addSlide();
    s.background = { color: C.bg };
    addHeader(s, pres, "06", "예산 집행안 A — CRM 통합 풀패키지 플랜");

    // 상단 설명
    s.addShape(pres.shapes.RECTANGLE, {
      x:0.38, y:0.88, w:9.24, h:0.52,
      fill:{ color:C.indigoL }, line:{ type:"none" }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x:0.38, y:0.88, w:0.05, h:0.52,
      fill:{ color:C.indigo }, line:{ type:"none" }
    });
    s.addText("비즈팅 + 스토어톡 + 브랜드메시지 + 카카오싱크 전체 솔루션을 통합 운영하는 연간 플랜입니다.", {
      x:0.55, y:0.88, w:9.0, h:0.52,
      fontSize:11, color:C.indigo, bold:true, valign:"middle"
    });

    // 테이블
    const hdr = ["항목", "월 예산", "연간 예산", "비고"];
    const hW  = [3.7, 1.75, 1.75, 2.0];
    const hX  = [0.38, 4.08, 5.83, 7.58];

    hX.forEach((x, i) => {
      s.addShape(pres.shapes.RECTANGLE, {
        x, y:1.5, w:hW[i]-0.04, h:0.42,
        fill:{ color:C.dark }, line:{ type:"none" }
      });
      s.addText(hdr[i], {
        x, y:1.5, w:hW[i]-0.04, h:0.42,
        fontSize:10.5, bold:true, color:C.white, align:"center", valign:"middle"
      });
    });

    const bRows = [
      { item:"솔루션 이용료 (비즈팅 플랫폼 기본 이용)",  m:"300만원",   y:"3,600만원",  note:"기본 타겟팅 이용료" },
      { item:"메시지 발송비 (비즈팅 광고 메시지 발송)",   m:"500만원",   y:"6,000만원",  note:"건당 140원 기준" },
      { item:"CRM 운영비 (스토어톡·브랜드메시지 운영)",  m:"200만원",   y:"2,400만원",  note:"자동화 운영 포함" },
      { item:"캠페인 기획비 (시즌·명절 캠페인)",         m:"100만원",   y:"1,200만원",  note:"분기별 캠페인 기준" },
      { item:"카카오싱크 간편 로그인 서비스",            m:"100만원",   y:"1,200만원",  note:"월 정액 기준" },
    ];
    bRows.forEach((r, i) => {
      const y = 1.96 + i * 0.6;
      const bg = i % 2 === 0 ? C.white : C.bg;
      hX.forEach((x, ci) => {
        s.addShape(pres.shapes.RECTANGLE, {
          x, y, w:hW[ci]-0.04, h:0.57,
          fill:{ color:bg }, line:{ color:C.line, width:0.5 }
        });
      });
      const vals = [r.item, r.m, r.y, r.note];
      hX.forEach((x, ci) => {
        s.addText(vals[ci], {
          x:x+0.1, y:y+0.09, w:hW[ci]-0.22, h:0.39,
          fontSize:10.5, color:C.dark, valign:"middle",
          align: ci === 0 ? "left" : "center",
          bold: ci === 1 || ci === 2
        });
      });
    });

    // 합계 행
    const totalY = 1.96 + bRows.length * 0.6;
    s.addShape(pres.shapes.RECTANGLE, {
      x:0.38, y:totalY, w:9.2, h:0.6,
      fill:{ color:C.indigo }, line:{ type:"none" }
    });
    s.addText("합  계", {
      x:0.48, y:totalY, w:3.5, h:0.6,
      fontSize:12, bold:true, color:C.white, valign:"middle"
    });
    s.addText("1,200만원 / 월", {
      x:4.08, y:totalY, w:1.71, h:0.6,
      fontSize:12, bold:true, color:C.amberL, align:"center", valign:"middle"
    });
    s.addText("1억 4,400만원 / 연", {
      x:5.83, y:totalY, w:1.71, h:0.6,
      fontSize:12, bold:true, color:C.amberL, align:"center", valign:"middle"
    });
    s.addText("VAT 별도", {
      x:7.58, y:totalY, w:1.9, h:0.6,
      fontSize:10, color:"A8C0F0", align:"center", valign:"middle"
    });

    // 주석
    s.addText("※ 상기 예산은 표준안이며, 집행 규모 및 세부 항목은 협의를 통해 조정 가능합니다.", {
      x:0.38, y:totalY+0.68, w:9.2, h:0.3,
      fontSize:9, color:C.slate
    });
  }

  // ════════════════════════════════════════════════════════════════
  // SLIDE 10 — 예산 집행안 B (발송 계획)
  // ════════════════════════════════════════════════════════════════
  {
    let s = pres.addSlide();
    s.background = { color: C.bg };
    addHeader(s, pres, "06", "예산 집행안 B — 비즈팅 발송 계획 (단계별 확장 방안)");

    // 단가 뱃지 2개
    s.addShape(pres.shapes.RECTANGLE, {
      x:0.38, y:0.88, w:4.45, h:0.48,
      fill:{ color:C.indigoL }, line:{ type:"none" }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x:0.38, y:0.88, w:0.05, h:0.48,
      fill:{ color:C.indigo }, line:{ type:"none" }
    });
    s.addText("비즈팅 건당 단가 : 140원   |   최소 발송 단위 : 1,000건", {
      x:0.55, y:0.88, w:4.2, h:0.48,
      fontSize:10.5, bold:true, color:C.indigo, valign:"middle"
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x:4.98, y:0.88, w:4.64, h:0.48,
      fill:{ color:C.tealL }, line:{ type:"none" }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x:4.98, y:0.88, w:0.05, h:0.48,
      fill:{ color:C.teal }, line:{ type:"none" }
    });
    s.addText("부가 서비스 포함 (스마트스토어 · CRM · 카카오싱크)", {
      x:5.15, y:0.88, w:4.38, h:0.48,
      fontSize:10.5, bold:true, color:C.teal, valign:"middle"
    });

    // 테이블
    const ph  = ["타겟 전략", "2분기 최소 (1회)", "2분기 검증량", "하반기 최대"];
    const pW  = [3.65, 1.7, 1.7, 1.7];
    const pX  = [0.38, 4.03, 5.73, 7.43];

    pX.forEach((x, i) => {
      s.addShape(pres.shapes.RECTANGLE, {
        x, y:1.45, w:pW[i]-0.04, h:0.42,
        fill:{ color:C.dark }, line:{ type:"none" }
      });
      s.addText(ph[i], {
        x, y:1.45, w:pW[i]-0.04, h:0.42,
        fontSize:10, bold:true, color:C.white, align:"center", valign:"middle"
      });
    });

    const planRows = [
      { t:"실시간 야구장 방문 고객군",                min:"10,000건", ver:"40,000건",  max:"210,000건" },
      { t:"야구 티켓사이트 방문 고객군",              min:"1,000건",  ver:"3,333건",   max:"14,000건" },
      { t:"롯데자이언츠 관련 방문 고객군",            min:"333건",    ver:"1,333건",   max:"94,000건" },
      { t:"건강에 관심 높은 직장인 고객군",           min:"1,000건",  ver:"3,333건",   max:"66,742건" },
      { t:"고등학생 자녀를 둔 부모 고객군",           min:"1,000건",  ver:"3,333건",   max:"27,654건" },
      { t:"중학생 자녀를 둔 부모 고객군",             min:"1,000건",  ver:"3,333건",   max:"30,511건" },
      { t:"경쟁사 접속 고객군 (디몰·종근당건강 등)",  min:"1,000건",  ver:"3,333건",   max:"222,631건" },
      { t:"골프장 방문 및 관련 관심 고객군",          min:"1,000건",  ver:"3,333건",   max:"16,699건" },
    ];

    planRows.forEach((r, i) => {
      const y = 1.9 + i * 0.37;
      const bg = i % 2 === 0 ? C.white : C.bg;
      pX.forEach((x, ci) => {
        s.addShape(pres.shapes.RECTANGLE, {
          x, y, w:pW[ci]-0.04, h:0.35,
          fill:{ color:bg }, line:{ color:C.line, width:0.5 }
        });
      });
      const vals = [r.t, r.min, r.ver, r.max];
      pX.forEach((x, ci) => {
        s.addText(vals[ci], {
          x:x+0.08, y:y+0.05, w:pW[ci]-0.18, h:0.25,
          fontSize:9.5, color:C.dark, valign:"middle",
          align: ci === 0 ? "left" : "center",
          bold: ci > 0
        });
      });
    });

    // 합계 행
    const sumY = 1.9 + planRows.length * 0.37;
    s.addShape(pres.shapes.RECTANGLE, {
      x:0.38, y:sumY, w:9.25, h:0.44,
      fill:{ color:"1E3A5F" }, line:{ type:"none" }
    });
    s.addText("합계 발송량", {
      x:0.48, y:sumY, w:3.45, h:0.44,
      fontSize:11, bold:true, color:C.white, valign:"middle"
    });
    const sumVals = ["16,333건", "64,331건", "681,237건"];
    [4.03, 5.73, 7.43].forEach((x, i) => {
      s.addText(sumVals[i], {
        x, y:sumY, w:1.66, h:0.44,
        fontSize:11, bold:true, color:C.amberL, align:"center", valign:"middle"
      });
    });

    // 집행 비용 주석
    const noteY = sumY + 0.5;
    s.addShape(pres.shapes.RECTANGLE, {
      x:0, y:noteY, w:10, h:0.275,
      fill:{ color:"E8EDF5" }, line:{ type:"none" }
    });
    s.addText("* 집행 비용 (×140원) : 2분기 최소 약 228만원  |  2분기 검증 약 900만원  |  하반기 최대 약 9,537만원   ※ 부가서비스 : 스마트스토어 카카오13·네이버10·리뷰50원 / CRM 친구20·비친구25원 / 카카오싱크 100만원/월", {
      x:0.38, y:noteY, w:9.4, h:0.275,
      fontSize:8, color:C.slate, valign:"middle"
    });
  }

  // ════════════════════════════════════════════════════════════════
  // SLIDE 11 — 기대효과 & CRM 로드맵
  // ════════════════════════════════════════════════════════════════
  {
    let s = pres.addSlide();
    s.background = { color: C.bg };
    addHeader(s, pres, "07", "기대효과 및 CRM 자동화 로드맵");

    // 기대효과 6개 (3×2 그리드)
    const effects = [
      { val:"+15%", label:"신규 회원 유입 증가",  accent:C.indigo, bg:C.indigoL },
      { val:"+25%", label:"재구매율 향상",         accent:C.teal,  bg:C.tealL },
      { val:"-30%", label:"고객 획득 비용 절감",   accent:"DC2626", bg:"FEE2E2" },
      { val:"직접", label:"자사 고객 DB 확보",     accent:"7C3AED", bg:"EDE9FE" },
      { val:"+20%", label:"구매 전환율 향상",      accent:C.amber,  bg:C.amberL },
      { val:"↑",   label:"브랜드 친밀도 강화",    accent:"059669", bg:"DCFCE7" },
    ];
    effects.forEach((ef, i) => {
      const col = i % 3, row = Math.floor(i / 3);
      const x = 0.3 + col * 3.15;
      const y = 0.88 + row * 0.88;
      s.addShape(pres.shapes.RECTANGLE, {
        x, y, w:3.02, h:0.78,
        fill:{ color:C.card }, line:{ type:"none" }, shadow:sh()
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x, y, w:3.02, h:0.04,
        fill:{ color:ef.accent }, line:{ type:"none" }
      });
      // 수치 뱃지
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x:x+0.14, y:y+0.14, w:0.85, h:0.48,
        fill:{ color:ef.bg }, line:{ type:"none" }, rectRadius:0.06
      });
      s.addText(ef.val, {
        x:x+0.14, y:y+0.14, w:0.85, h:0.48,
        fontSize:17, bold:true, color:ef.accent, align:"center", valign:"middle"
      });
      s.addText(ef.label, {
        x:x+1.1, y:y+0.2, w:1.82, h:0.48,
        fontSize:11.5, bold:true, color:C.dark, valign:"middle"
      });
    });

    // CRM 로드맵 테이블
    s.addShape(pres.shapes.RECTANGLE, {
      x:0.3, y:2.68, w:9.4, h:0.4,
      fill:{ color:C.dark }, line:{ type:"none" }
    });
    s.addText("고객 CRM 자동화 로드맵", {
      x:0.42, y:2.68, w:9.2, h:0.4,
      fontSize:11.5, bold:true, color:C.white, valign:"middle"
    });

    const rmHdr = ["단계", "고객 상태", "CRM 목적", "메시지 유형", "활용 솔루션"];
    const rmW   = [0.72, 1.4, 1.38, 2.0, 3.62];
    const rmX   = [0.3, 1.02, 2.42, 3.8, 5.8];

    rmX.forEach((x, i) => {
      s.addShape(pres.shapes.RECTANGLE, {
        x, y:3.1, w:rmW[i]-0.03, h:0.33,
        fill:{ color:"2D3748" }, line:{ type:"none" }
      });
      s.addText(rmHdr[i], {
        x, y:3.1, w:rmW[i]-0.03, h:0.33,
        fontSize:9, bold:true, color:C.white, align:"center", valign:"middle"
      });
    });

    const rm = [
      { step:"S1", state:"첫 구매",   purpose:"회원화",       msg:"웰컴 메시지",       tool:"브랜드메시지 + 스토어톡", accent:C.indigo },
      { step:"S2", state:"복용 초기", purpose:"브랜드 경험",  msg:"복용 가이드 발송",  tool:"스토어톡 자동 발송",       accent:C.teal },
      { step:"S3", state:"복용 진행", purpose:"관계 강화",    msg:"건강 콘텐츠 제공",  tool:"카카오 친구톡 + 알림톡",  accent:"059669" },
      { step:"S4", state:"소진 예상", purpose:"재구매 유도",  msg:"맞춤 상품 추천",    tool:"카카오싱크 세그먼트 발송", accent:"7C3AED" },
      { step:"S5", state:"시즌 도래", purpose:"선물 유도",    msg:"명절·시즌 캠페인", tool:"비즈팅 타겟팅 + 알림톡",  accent:C.amber },
      { step:"S6", state:"장기 고객", purpose:"VIP 관계 강화","msg":"전용 혜택 제공",  tool:"전체 솔루션 통합 운영",   accent:"DC2626" },
    ];
    rm.forEach((r, i) => {
      const y = 3.45 + i * 0.355;
      const bg = i % 2 === 0 ? C.white : C.bg;
      rmX.forEach((x, ci) => {
        s.addShape(pres.shapes.RECTANGLE, {
          x, y, w:rmW[ci]-0.03, h:0.34,
          fill:{ color:bg }, line:{ color:C.line, width:0.5 }
        });
      });
      // 단계 뱃지
      s.addShape(pres.shapes.RECTANGLE, {
        x:0.3, y, w:0.69, h:0.34,
        fill:{ color:r.accent }, line:{ type:"none" }
      });
      s.addText(r.step, {
        x:0.3, y, w:0.69, h:0.34,
        fontSize:9, bold:true, color:C.white, align:"center", valign:"middle"
      });
      const vals = [r.state, r.purpose, r.msg, r.tool];
      rmX.slice(1).forEach((x, ci) => {
        s.addText(vals[ci], {
          x:x+0.06, y:y+0.06, w:rmW[ci+1]-0.16, h:0.22,
          fontSize:9, color:C.dark, valign:"middle",
          bold: ci === 3
        });
      });
    });
  }

  // ════════════════════════════════════════════════════════════════
  // SLIDE 12 — 감사 (다크 클로징)
  // ════════════════════════════════════════════════════════════════
  {
    let s = pres.addSlide();
    s.background = { color: C.dark };

    // 좌측 인디고 패널
    s.addShape(pres.shapes.RECTANGLE, {
      x:0, y:0, w:4.2, h:5.625,
      fill:{ color:C.indigo }, line:{ type:"none" }
    });
    // 패널 장식
    s.addShape(pres.shapes.OVAL, {
      x:-1.2, y:-1.2, w:4.5, h:4.5,
      fill:{ color:"FFFFFF", transparency:92 }, line:{ type:"none" }
    });
    s.addShape(pres.shapes.OVAL, {
      x:1.0, y:3.8, w:3.0, h:3.0,
      fill:{ color:"FFFFFF", transparency:93 }, line:{ type:"none" }
    });

    // 좌측 텍스트
    s.addText("Thank\nYou.", {
      x:0.45, y:0.8, w:3.4, h:2.2,
      fontSize:46, bold:true, color:C.white,
      lineSpacingMultiple:1.1
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x:0.45, y:3.15, w:1.8, h:0.028,
      fill:{ color:"FFFFFF", transparency:60 }, line:{ type:"none" }
    });
    s.addText("BIZTALK Corp.", {
      x:0.45, y:3.28, w:3.4, h:0.35,
      fontSize:12, bold:true, color:"A8B8E8"
    });
    s.addText("신사업 TF  |  tf@biztalk.co.kr", {
      x:0.45, y:3.65, w:3.4, h:0.32,
      fontSize:10, color:"7080B0"
    });

    // 우측 마무리 메시지
    s.addText("정관장의\n지속 성장을\n비즈팅이\n함께하겠습니다.", {
      x:4.7, y:0.85, w:5.0, h:2.6,
      fontSize:28, bold:true, color:C.white,
      lineSpacingMultiple:1.3
    });
    s.addText("신규 고객 유치부터 VIP 관리까지,\n하나의 통합 CRM 사이클로 완성합니다.", {
      x:4.7, y:3.65, w:5.0, h:0.9,
      fontSize:13, color:"7080A0",
      lineSpacingMultiple:1.55
    });

    // 하단 바
    s.addShape(pres.shapes.RECTANGLE, {
      x:0, y:5.2, w:10, h:0.425,
      fill:{ color:"0F1424" }, line:{ type:"none" }
    });
    s.addText("Copyright ⓒ BIZTALK Corp. All Rights Reserved.  2026", {
      x:0.45, y:5.2, w:9.1, h:0.425,
      fontSize:9, color:"404870", valign:"middle"
    });
    s.addText("비즈팅", {
      x:8.8, y:5.2, w:0.9, h:0.425,
      fontSize:10, bold:true, color:"5060A0", align:"right", valign:"middle"
    });
  }

  await pres.writeFile({ fileName: "/home/claude/정관장_CRM_전략_제안서_v2.pptx" });
  console.log("✅ v2 PPT 생성 완료!");
}

buildPPT().catch(e => { console.error(e); process.exit(1); });
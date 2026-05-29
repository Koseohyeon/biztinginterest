import { useEffect, useRef } from "react";

// Coupon codes - index matches CSV / message send order
const COUPON_CODES: string[] = ["SKGUZESN49", "TYQMTETRGC", "ZIJ76BGS6D", "NJZWARDE4M", "9Q0TRB39Z5", "X3RRT502ZW", "760HZ34BS9", "0WR11H79OE", "O535EOTI50", "JWVEKLFK9G", "L7Q2T2K436", "VM6LOKPFM2", "7OHKNLNUNC", "6EJCAJUVFT", "1GDHH9Z29C", "CYDACYEWDB", "6TGS7DIKLK", "2WGQVY2OY1", "MP50Z6N1UR", "IQ1QZ3L35K", "ANC5DTREDU", "LLF6BYINJL", "7DGGLQ8KAE", "6RO606LSLR", "YF7V2DIKFK", "CRN41WMEMO", "RDLGG1NIXQ", "DVT5G6V79Z", "K0YHRZS897", "3PYWAINYPF", "PC48HFNHDA", "DJGEYA1J9U", "N7SIQD7TUU", "RMD38YX80J", "KX4RQOW6XY", "9SUWYRXP10", "GXABDJUGER", "39MMA8ABFA", "O1WK2I6HBV", "KYW3WAU7OA", "R4VC5VNJAJ", "HLEGAKCAYP", "TSEUO7NOKJ", "7E7LYD5IL7", "O40O33RU2Y", "JMLEXGNX9N", "QVDFVM7GSC", "7OB0X1RM26", "YQ19U49WR6", "RRLQF5DETR", "8TGJYB9ZZQ", "9GH3VW4Y8R", "W8CE2CEXAZ", "NH0H88EWQD", "4W3OUUIGLG", "FWOKEM20Q1", "HXUTX2KSRE", "5HZWPST2SC", "UHENMFOLP4", "O12HYPN5WL", "OFXF58257V", "4FN8XL6XC8", "I46UOJ0UJ6", "OIITX4JFE4", "JBFM488R89", "LFHJXG5IMI", "GDM0ACNJPG", "SN9R3LMP84", "0OJ5R9ZO1C", "MMSEUSZZV4", "O95Q2NSSU6", "TZUKYNGLY8", "DFTWEFT8JJ", "Q4P37D8ZKT", "Q52NKYMNKH", "DPYWL9OQUF", "S6XICQ2OD6", "0SA9ECT7CK", "ICF5HGTF0O", "K3M3VI3EMR", "8GVXOVQHQL", "PREMRZF0KY", "SXL13GTHJY", "SM8RBK1X7I", "UCFFOA0CUO", "TVON4RVSYD", "VTGPT1CFHM", "FE517HWOHX", "HRUNPKXGCX", "BAUA7FSG6N", "B70R6WKX1U", "D67MCKAQPW", "O8VRA8I1MQ", "DYQKVU9HKQ", "U0WDTQP4V7", "UT5HS1V255", "EZD7MTCUD5", "CTW6E3EXR2", "EDJ1SMNFYR", "N8HCA32T4Y", "Y5UETTG9FX", "UOOOA1DH44", "JC5Q0O0JEC", "NSG2VYUY1T", "VDVUALS726", "LY1NOWM5MC", "52CMAQQ19H", "TYVDRHQDXB", "HWBMTA2LUD", "MPJSF0TCM9", "K5DIBFIZPT", "ZQKGAZPCQQ", "8DE2PLE3LX", "LBB1AGM3P3", "PTHR1E8YAZ", "NHSAXARY1H", "PRBUSQ1RIK", "494NS7ALFW", "A2X99GCL8R", "3EPZ7JEIBH"];

// ─── Inline SVG Icons ───
const IconStore = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l1-5h16l1 5"/><path d="M3 9h18v11a1 1 0 01-1 1H4a1 1 0 01-1-1V9z"/><path d="M9 21V12h6v9"/>
  </svg>
);
const IconUserPlus = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
  </svg>
);
const IconShoppingBag = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);
const IconGift = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/>
    <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/>
  </svg>
);
const IconCalendar = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IconAlert = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);
const IconGlobe = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
  </svg>
);
const IconTag = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);
const IconCheck = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconClock = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

// ─── Custom CODE128 Barcode Hook ───
function useBarcode(
  code: string,
  canvasRef: React.RefObject<HTMLCanvasElement | null>
): void {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !code) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const patterns: Record<number, string> = {
      0:"11011001100",1:"11001101100",2:"11001100110",3:"10010011000",
      4:"10010001100",5:"10001001100",6:"10011001000",7:"10011000100",
      8:"10001100100",9:"11001001000",10:"11001000100",11:"11000100100",
      12:"10110011100",13:"10011011100",14:"10011001110",15:"10111001100",
      16:"10011101100",17:"10011100110",18:"11001110010",19:"11001011100",
      20:"11001001110",21:"11011100100",22:"11001110100",23:"11101101110",
      24:"11101001100",25:"11100101100",26:"11100100110",27:"11101100100",
      28:"11100110100",29:"11100110010",30:"11011011000",31:"11011000110",
      32:"11000110110",33:"10100011000",34:"10001011000",35:"10001000110",
      36:"10110001000",37:"10001101000",38:"10001100010",39:"11010001000",
      40:"11000101000",41:"11000100010",42:"10110111000",43:"10110001110",
      44:"10001101110",45:"10111011000",46:"10111000110",47:"10001110110",
      48:"11101110110",49:"11010001110",50:"11000101110",51:"11011101000",
      52:"11011100010",53:"11011101110",54:"11101011000",55:"11101000110",
      56:"11100010110",57:"11101101000",58:"11101100010",59:"11100011010",
      60:"11101111010",61:"11001000010",62:"11110001010",63:"10100110000",
      64:"10100001100",65:"10010110000",66:"10010000110",67:"10000101100",
      68:"10000100110",69:"10110010000",70:"10110000100",71:"10011010000",
      72:"10011000010",73:"10000110100",74:"10000110010",75:"11000010010",
      76:"11001010000",77:"11110111010",78:"11000010100",79:"10001111010",
      80:"10100111100",81:"10010111100",82:"10010011110",83:"10111100100",
      84:"10011110100",85:"10011110010",86:"11110100100",87:"11110010100",
      88:"11110010010",89:"11011011110",90:"11011110110",91:"11110110110",
      92:"10101111000",93:"10100011110",94:"10001011110",95:"10111101000",
      96:"10111100010",97:"11110101000",98:"11110100010",99:"10111011110",
      100:"10111101110",101:"11101011110",102:"11110101110"
    };
    const START_B = 104;
    const STOP_PATTERN = "1100011101011";

    let bars = patterns[START_B] || "";
    let checksum = START_B;
    for (let i = 0; i < code.length; i++) {
      const v = code.charCodeAt(i) - 32;
      bars += patterns[v] || patterns[0];
      checksum += (i + 1) * v;
    }
    bars += patterns[checksum % 103] || patterns[0];
    bars += STOP_PATTERN;

    // ★ 캔버스 실제 픽셀 크기는 canvas.width/height 속성으로 결정
    const W = canvas.width;   // 320px 고정
    const H = canvas.height;  // 72px 고정
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, W, H);
    const barW = W / bars.length;
    ctx.fillStyle = "#1A1208";
    for (let i = 0; i < bars.length; i++) {
      if (bars[i] === "1") {
        ctx.fillRect(Math.round(i * barW), 0, Math.max(1, Math.round(barW)), H);
      }
    }
  }, [code]);
}

// ─── Step Item ───
interface StepItemProps {
  num: number;
  label: string;
  sub?: string | null;
  icon: React.ReactNode;
}
const StepItem = ({ num, label, sub, icon }: StepItemProps) => (
  <div style={{ display:"flex", alignItems:"flex-start", gap:"12px" }}>
    <div style={{
      width:"32px", height:"32px", borderRadius:"50%",
      background:"#C8000F", color:"#fff",
      display:"flex", alignItems:"center", justifyContent:"center",
      flexShrink:0, boxShadow:"0 3px 10px rgba(200,0,15,0.28)", marginTop:"2px"
    }}>
      <span style={{ fontWeight:700, fontSize:"13px", fontFamily:"'Noto Sans KR',sans-serif" }}>{num}</span>
    </div>
    <div style={{ flex:1, paddingTop:"2px" }}>
      <p style={{ fontSize:"13.5px", fontWeight:500, color:"#1A1208", lineHeight:1.4, margin:0, fontFamily:"'Noto Sans KR',sans-serif" }}>{label}</p>
      {sub && <p style={{ fontSize:"11px", color:"#AAAAAA", marginTop:"2px", marginBottom:0, fontFamily:"'Noto Sans KR',sans-serif" }}>{sub}</p>}
    </div>
    <div style={{
      width:"24px", height:"24px", borderRadius:"50%",
      background:"#FFF0F0", display:"flex", alignItems:"center", justifyContent:"center",
      color:"#C8000F", flexShrink:0, marginTop:"4px"
    }}>
      {icon}
    </div>
  </div>
);

// ─── Main Page Component ───
export default function JKJEventPage() {
  const searchParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams("");

  const getCouponCode = (): string => {
    const codeParam = searchParams.get("code");
    if (codeParam) return codeParam.toUpperCase();
    const idxStr = searchParams.get("idx");
    const idx = idxStr !== null ? parseInt(idxStr, 10) : 0;
    if (!isNaN(idx) && idx >= 0 && idx < COUPON_CODES.length) return COUPON_CODES[idx];
    return COUPON_CODES[0];
  };

  const couponCode: string = getCouponCode();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useBarcode(couponCode, canvasRef);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;600;700;900&family=Noto+Sans+KR:wght@300;400;500;700&display=swap');

        /* ★ 모바일 고정 레이아웃 핵심 */
        html, body {
          margin: 0;
          padding: 0;
          background: #EDEAE4;
        }
        #jkj-root {
          width: 390px;
          min-height: 100vh;
          margin: 0 auto;
          background: #F8F4EE;
          overflow-x: hidden;
          position: relative;
        }

        @keyframes fadeDown { from { opacity:0; transform:translateY(-14px) } to { opacity:1; transform:translateY(0) } }
        @keyframes fadeUp   { from { opacity:0; transform:translateY(18px)  } to { opacity:1; transform:translateY(0) } }
        .jkj-anim-down { animation: fadeDown 0.55s ease both }
        .jkj-anim-up   { animation: fadeUp   0.55s ease both }
        .d1{animation-delay:0.1s}.d2{animation-delay:0.2s}.d3{animation-delay:0.3s}
        .d4{animation-delay:0.4s}.d5{animation-delay:0.5s}.d6{animation-delay:0.6s}

        .ticket-cut-l {
          position:absolute; left:-14px; top:50%; transform:translateY(-50%);
          width:28px; height:28px; background:#F8F4EE; border-radius:50%;
          box-shadow: inset -2px 0 5px rgba(200,0,15,0.08); z-index:2;
        }
        .ticket-cut-r {
          position:absolute; right:-14px; top:50%; transform:translateY(-50%);
          width:28px; height:28px; background:#F8F4EE; border-radius:50%;
          box-shadow: inset 2px 0 5px rgba(200,0,15,0.08); z-index:2;
        }
      `}</style>

      <div id="jkj-root">

        {/* ── HERO ── */}
        <div className="jkj-anim-down" style={{
          position:"relative", overflow:"hidden",
          paddingTop:"40px", paddingBottom:"64px", paddingLeft:"20px", paddingRight:"20px",
          textAlign:"center",
          background:"linear-gradient(160deg,#8B0008 0%,#C8000F 55%,#E01020 100%)"
        }}>
          {/* Top accent stripe */}
          <div style={{
            position:"absolute", top:0, left:0, right:0, height:"5px",
            background:"repeating-linear-gradient(90deg,#D4A843 0,#D4A843 12px,transparent 12px,transparent 22px)"
          }}/>
          {/* Ambient glow */}
          <div style={{
            position:"absolute", inset:0, pointerEvents:"none",
            background:"radial-gradient(ellipse 60% 50% at 18% 28%,rgba(255,255,255,0.07) 0%,transparent 70%),radial-gradient(ellipse 45% 40% at 85% 72%,rgba(212,168,67,0.09) 0%,transparent 70%)"
          }}/>

          {/* Brand row */}
          <div style={{ position:"relative", display:"flex", alignItems:"center", justifyContent:"center", gap:"10px", marginBottom:"20px" }}>
            <div style={{ width:"4px", height:"4px", borderRadius:"50%", background:"#D4A843" }}/>
            <span style={{ fontSize:"13px", fontWeight:700, color:"rgba(255,255,255,0.9)", letterSpacing:"3px", fontFamily:"'Noto Serif KR',serif" }}>
              JUNG KWAN JANG · 정관장
            </span>
            <div style={{ width:"4px", height:"4px", borderRadius:"50%", background:"#D4A843" }}/>
          </div>

          {/* Badge */}
          <div className="jkj-anim-down d1" style={{
            display:"inline-block", background:"#D4A843", color:"#8B0008",
            fontSize:"10px", fontWeight:700, letterSpacing:"2px",
            padding:"6px 16px", borderRadius:"9999px", marginBottom:"16px"
          }}>
            JUNE 2025 · SPECIAL EVENT
          </div>

          {/* Title */}
          <h1 className="jkj-anim-down d2" style={{
            fontSize:"30px", fontWeight:900, color:"#fff", lineHeight:1.25,
            marginBottom:"8px", fontFamily:"'Noto Serif KR',serif"
          }}>
            6월 한정<br /><span style={{ color:"#D4A843" }}>특별 증정</span> 이벤트
          </h1>
          <p className="jkj-anim-down d3" style={{
            fontSize:"13px", color:"rgba(255,255,255,0.75)", lineHeight:1.7,
            marginBottom:"32px", fontFamily:"'Noto Sans KR',sans-serif"
          }}>
            정관장 한국 홍삼의 정수<br />에브리타임 오리지널과 함께하세요!
          </p>

          {/* Product images – fixed sizes, no responsive scaling */}
          <div className="jkj-anim-up d4" style={{ position:"relative", display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
            <img
              src="data:image/png;base64,/9j/4AAQ" /* placeholder – replace with IMG_BOX */
              alt="에브리타임 박스"
              width="130" height="130"
              style={{ objectFit:"contain", position:"relative", zIndex:1, transform:"rotate(-5deg) translateX(14px)", filter:"drop-shadow(0 12px 28px rgba(0,0,0,0.35))" }}
            />
            <img
              src="data:image/png;base64,/9j/4AAQ" /* placeholder – replace with IMG_HERO */
              alt="에브리타임 모델"
              width="164" height="164"
              style={{ objectFit:"contain", position:"relative", zIndex:3, filter:"drop-shadow(0 14px 32px rgba(0,0,0,0.4))" }}
            />
            <img
              src="data:image/png;base64,/9j/4AAQ" /* placeholder – replace with IMG_STICK */
              alt="에브리타임 스틱"
              width="90" height="130"
              style={{ objectFit:"contain", position:"relative", zIndex:2, transform:"rotate(5deg) translateX(-14px)", filter:"drop-shadow(0 10px 24px rgba(0,0,0,0.3))" }}
            />
          </div>
        </div>

        {/* Wave separator */}
        <div style={{
          width:"100%", height:"48px", background:"#F8F4EE", marginTop:"-2px",
          clipPath:"ellipse(56% 100% at 50% 100%)"
        }}/>

        {/* ── ONLINE EVENT – Coming Soon ── */}
        <div className="jkj-anim-up d3" style={{ padding:"0 16px 20px" }}>
          <div style={{ background:"#fff", borderRadius:"16px", overflow:"hidden", boxShadow:"0 3px 20px rgba(0,0,0,0.07)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"14px", padding:"16px 20px", background:"linear-gradient(135deg,#2C2C2C 0%,#3D3D3D 100%)" }}>
              <div style={{ width:"36px", height:"36px", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", flexShrink:0, background:"rgba(255,255,255,0.12)" }}>
                <IconGlobe/>
              </div>
              <div>
                <p style={{ fontSize:"10px", color:"rgba(255,255,255,0.55)", letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:"2px", margin:0, fontFamily:"'Noto Sans KR',sans-serif" }}>ONLINE EVENT</p>
                <p style={{ fontSize:"17px", fontWeight:700, color:"#fff", lineHeight:1.3, margin:0, fontFamily:"'Noto Serif KR',serif" }}>온라인 6월 행사</p>
              </div>
              <div style={{ marginLeft:"auto", border:"1px solid rgba(255,255,255,0.2)", borderRadius:"9999px", padding:"4px 12px", background:"rgba(255,255,255,0.08)" }}>
                <span style={{ fontSize:"10px", color:"rgba(255,255,255,0.65)", fontWeight:500, letterSpacing:"1px", fontFamily:"'Noto Sans KR',sans-serif" }}>준비 중</span>
              </div>
            </div>
            <div style={{ padding:"24px 20px", textAlign:"center" }}>
              <div style={{ width:"48px", height:"48px", margin:"0 auto 12px", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"#C8A050", background:"#F5F0E8" }}>
                <IconClock/>
              </div>
              <p style={{ fontSize:"15px", fontWeight:700, color:"#2C1810", marginBottom:"6px", fontFamily:"'Noto Serif KR',serif" }}>곧 공개됩니다</p>
              <p style={{ fontSize:"12px", color:"#999", lineHeight:1.7, margin:0, fontFamily:"'Noto Sans KR',sans-serif" }}>
                온라인 이벤트 내용이 곧 업데이트될 예정입니다.<br/>많은 관심과 기대 부탁드립니다.
              </p>
            </div>
          </div>
        </div>

        {/* ── OFFLINE EVENT ── */}
        <div className="jkj-anim-up d4" style={{ padding:"0 16px 20px" }}>
          <div style={{ background:"#fff", borderRadius:"16px", overflow:"hidden", boxShadow:"0 3px 20px rgba(200,0,15,0.10)" }}>
            {/* Header */}
            <div style={{ display:"flex", alignItems:"center", gap:"14px", padding:"16px 20px", background:"linear-gradient(135deg,#C8000F 0%,#8B0008 100%)" }}>
              <div style={{ width:"36px", height:"36px", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", flexShrink:0, background:"rgba(255,255,255,0.15)" }}>
                <IconStore/>
              </div>
              <div>
                <p style={{ fontSize:"10px", color:"rgba(255,255,255,0.6)", letterSpacing:"1.5px", textTransform:"uppercase", margin:0, fontFamily:"'Noto Sans KR',sans-serif" }}>OFFLINE EVENT</p>
                <p style={{ fontSize:"17px", fontWeight:700, color:"#fff", lineHeight:1.3, margin:0, fontFamily:"'Noto Serif KR',serif" }}>오프라인 6월 행사</p>
              </div>
            </div>

            <div style={{ padding:"20px 20px 24px" }}>
              {/* Gift highlight */}
              <div style={{
                position:"relative", borderRadius:"12px", padding:"16px 20px 14px",
                textAlign:"center", marginBottom:"20px",
                border:"1px solid #F5D0D2",
                background:"linear-gradient(135deg,#FFF8F2 0%,#FFF0F0 100%)"
              }}>
                <div style={{
                  position:"absolute", top:"-16px", left:"50%", transform:"translateX(-50%)",
                  width:"32px", height:"32px", borderRadius:"50%",
                  background:"#C8000F", display:"flex", alignItems:"center", justifyContent:"center",
                  color:"#fff", boxShadow:"0 3px 10px rgba(200,0,15,0.35)"
                }}>
                  <IconGift/>
                </div>
                <p style={{ fontSize:"11px", color:"#999", marginBottom:"4px", marginTop:"4px", fontFamily:"'Noto Sans KR',sans-serif" }}>신규가입 + 10만원 이상 구매 시</p>
                <p style={{ fontSize:"21px", fontWeight:900, color:"#C8000F", lineHeight:1.3, margin:0, fontFamily:"'Noto Serif KR',serif" }}>에브리타임 오리지널</p>
                <p style={{ fontSize:"19px", fontWeight:900, color:"#C8000F", lineHeight:1.3, marginBottom:"8px", fontFamily:"'Noto Serif KR',serif" }}>
                  <span style={{ color:"#D4A843" }}>20포</span> 추가 증정
                </p>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"6px" }}>
                  <div style={{ width:"16px", height:"16px", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"#C8000F", background:"rgba(200,0,15,0.1)" }}>
                    <IconCheck/>
                  </div>
                  <span style={{ fontSize:"11px", color:"#888", fontFamily:"'Noto Sans KR',sans-serif" }}>전국 오프라인 매장 적용</span>
                </div>
              </div>

              {/* Steps */}
              <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
                <StepItem num={1} label="가까운 정관장 오프라인 매장 방문" sub="전국 모든 매장 적용 가능" icon={<IconStore/>}/>
                <StepItem num={2} label="정관장 회원 신규 가입" sub={null} icon={<IconUserPlus/>}/>
                <StepItem num={3} label="10만원 이상 구매 후 쿠폰 제시" sub="본 페이지 하단 쿠폰 제시" icon={<IconShoppingBag/>}/>
                <StepItem num={4} label="에브리타임 오리지널 20포 수령!" sub={null} icon={<IconGift/>}/>
              </div>

              {/* Divider */}
              <div style={{ height:"1px", margin:"20px 0", background:"linear-gradient(90deg,transparent,#E5D5C5,transparent)" }}/>

              {/* Period bar */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", borderRadius:"12px", padding:"14px 16px", background:"#1A1208" }}>
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"4px" }}>
                    <span style={{ color:"#D4A843" }}><IconCalendar/></span>
                    <p style={{ fontSize:"10px", color:"#D4A843", letterSpacing:"1.5px", textTransform:"uppercase", fontWeight:600, margin:0, fontFamily:"'Noto Sans KR',sans-serif" }}>행사 기간</p>
                  </div>
                  <p style={{ fontSize:"14px", fontWeight:700, color:"#fff", margin:0, fontFamily:"'Noto Serif KR',serif" }}>2025. 06. 01 — 06. 30</p>
                </div>
                <div style={{ textAlign:"right" }}>
                  <p style={{ fontSize:"10px", color:"rgba(255,255,255,0.4)", marginBottom:"2px", margin:0, fontFamily:"'Noto Sans KR',sans-serif" }}>기간 한정</p>
                  <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.65)", fontWeight:600, margin:0, fontFamily:"'Noto Serif KR',serif" }}>한 달간</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── NOTICE ── */}
        <div className="jkj-anim-up d5" style={{ padding:"0 16px 24px" }}>
          <div style={{ background:"#fff", borderRadius:"16px", padding:"20px", boxShadow:"0 2px 14px rgba(0,0,0,0.05)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"14px" }}>
              <span style={{ color:"#C8000F" }}><IconAlert/></span>
              <span style={{ fontSize:"11px", fontWeight:700, color:"#888", letterSpacing:"1.5px", textTransform:"uppercase", fontFamily:"'Noto Sans KR',sans-serif" }}>유의사항</span>
            </div>
            <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:"10px" }}>
              {[
                "본 이벤트는 신규 가입 회원에 한하여 적용됩니다.",
                "전국 정관장 오프라인 매장에서 모두 적용 가능합니다.",
                "중복 수령은 불가하며, 1인 1회에 한해 적용됩니다.",
                "10만원 이상 구매 시에만 증정품이 제공됩니다.",
                "이벤트 기간(6월 한 달) 내에만 유효한 쿠폰입니다.",
                "재고 소진 시 조기 종료될 수 있습니다.",
              ].map((note, i) => (
                <li key={i} style={{ display:"flex", alignItems:"flex-start", gap:"8px" }}>
                  <div style={{ width:"4px", height:"4px", borderRadius:"50%", background:"#C8000F", marginTop:"7px", flexShrink:0 }}/>
                  <p style={{ fontSize:"12px", color:"#777", lineHeight:1.5, margin:0, fontFamily:"'Noto Sans KR',sans-serif" }}>{note}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── COUPON TICKET ── */}
        <div className="jkj-anim-up d6" style={{ padding:"0 16px 40px" }}>
          <p style={{ fontSize:"18px", fontWeight:700, color:"#8B0008", textAlign:"center", marginBottom:"6px", fontFamily:"'Noto Serif KR',serif" }}>쿠폰 확인하기</p>
          <p style={{ fontSize:"12px", color:"#999", textAlign:"center", marginBottom:"16px", fontFamily:"'Noto Sans KR',sans-serif" }}>아래 쿠폰을 매장 직원에게 제시해 주세요</p>

          <div style={{ position:"relative", background:"#fff", borderRadius:"16px", overflow:"hidden", boxShadow:"0 6px 28px rgba(200,0,15,0.13)", border:"1px solid #F5D0D2" }}>
            <div className="ticket-cut-l"/>
            <div className="ticket-cut-r"/>

            {/* Ticket top */}
            <div style={{ position:"relative", padding:"20px 24px", textAlign:"center", background:"linear-gradient(135deg,#C8000F 0%,#8B0008 100%)" }}>
              <div style={{
                position:"absolute", bottom:0, left:"10%", right:"10%", height:"1px",
                background:"repeating-linear-gradient(90deg,rgba(255,255,255,0.25) 0,rgba(255,255,255,0.25) 5px,transparent 5px,transparent 11px)"
              }}/>
              <p style={{ fontSize:"10px", color:"rgba(255,255,255,0.6)", letterSpacing:"2px", textTransform:"uppercase", marginBottom:"6px", fontFamily:"'Noto Sans KR',sans-serif" }}>JUNG KWAN JANG</p>
              <p style={{ fontSize:"19px", fontWeight:900, color:"#fff", lineHeight:1.3, marginBottom:"4px", fontFamily:"'Noto Serif KR',serif" }}>
                에브리타임 오리지널 <span style={{ color:"#D4A843" }}>20포</span> 증정
              </p>
              <p style={{ fontSize:"11px", color:"rgba(255,255,255,0.6)", margin:0, fontFamily:"'Noto Sans KR',sans-serif" }}>신규가입 + 10만원 이상 구매 시 해당 이벤트 참여가 가능합니다.</p>
            </div>

            {/* Ticket bottom */}
            <div style={{ padding:"20px 24px", textAlign:"center" }}>
              {/* Code box */}
              <div style={{
                borderRadius:"12px", padding:"12px 16px", marginBottom:"16px",
                border:"2px dashed #D4C5A0", background:"#F5F0E8"
              }}>
                <p style={{ fontSize:"10px", color:"#B0A080", letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:"4px", fontFamily:"'Noto Sans KR',sans-serif" }}>Coupon Code</p>
                <p style={{ fontFamily:"'Courier New',monospace", fontSize:"22px", fontWeight:700, color:"#8B0008", letterSpacing:"4px", margin:0 }}>{couponCode}</p>
              </div>

              {/* ★ 바코드 캔버스 – 고정 크기, 반응형 없음 */}
              <div style={{ background:"#fff", border:"1px solid #EEE", borderRadius:"12px", padding:"12px", marginBottom:"14px", textAlign:"center" }}>
                <canvas
                  ref={canvasRef}
                  width={320}
                  height={72}
                  style={{
                    display:"block",
                    width:"320px",   /* ★ CSS 크기도 고정 */
                    height:"72px",
                    margin:"0 auto"
                  }}
                />
              </div>

              {/* Meta tags */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", flexWrap:"wrap" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"4px", color:"#AAAAAA" }}>
                  <IconTag/>
                  <span style={{ fontSize:"10.5px", fontFamily:"'Noto Sans KR',sans-serif" }}>1인 1회</span>
                </div>
                <div style={{ width:"1px", height:"12px", background:"#DDD" }}/>
                <div style={{ display:"flex", alignItems:"center", gap:"4px", color:"#AAAAAA" }}>
                  <IconCalendar/>
                  <span style={{ fontSize:"10.5px", fontFamily:"'Noto Sans KR',sans-serif" }}>2025.06.01 ~ 06.30</span>
                </div>
                <div style={{ width:"1px", height:"12px", background:"#DDD" }}/>
                <span style={{ fontSize:"10.5px", color:"#AAAAAA", fontFamily:"'Noto Sans KR',sans-serif" }}>중복 불가</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div style={{ textAlign:"center", padding:"0 24px 40px" }}>
          <div style={{ width:"32px", height:"1px", background:"#DDDDDD", margin:"0 auto 16px" }}/>
          <p style={{ fontSize:"10.5px", color:"#BBBBBB", lineHeight:1.8, margin:0, fontFamily:"'Noto Sans KR',sans-serif" }}>
            ㈜한국인삼공사 정관장<br/>
            고객센터 1800-3848 · www.jungkwanjang.co.kr<br/>
            본 이벤트는 사전 예고 없이 변경 또는 종료될 수 있습니다.
          </p>
        </div>

      </div>
    </>
  );
}
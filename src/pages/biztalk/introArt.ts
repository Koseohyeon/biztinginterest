/**
 * 비즈팅 소개 페이지용 벡터 일러스트.
 * - sceneSvg : 문자 메시지 상단 이미지(8개 시즌 장면)
 * - objSvg   : 광고 크리에이티브에 쓰는 오브젝트(티켓, 선물, 케이크 등)
 * 모두 SVG 문자열을 돌려주고, 페이지에서 dangerouslySetInnerHTML로 그립니다.
 * (같은 key는 항상 같은 내용이라 id가 겹쳐도 화면에는 영향이 없습니다.)
 */

export type SceneKey = "baseball" | "halloween" | "pepero" | "exam" | "blackfriday" | "ski" | "xmas" | "newyear" | "sunrise" | "seollal" | "valentine" | "graduation" | "whiteday";
export type ObjKey = "ticket" | "gift" | "bag" | "cup" | "card" | "cake" | "bowl" | "bed" | "book";

export function shade(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16);
  const ch = [n >> 16, (n >> 8) & 255, n & 255];
  return (
    "#" +
    ch
      .map((v) => Math.round(amt < 0 ? v * (1 + amt) : v + (255 - v) * amt).toString(16).padStart(2, "0"))
      .join("")
  );
}

function burst(cx: number, cy: number, r: number, n: number, col: string, w = 1.6): string {
  let d = "";
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2;
    const c = Math.cos(t);
    const s = Math.sin(t);
    d += `M${(cx + c * r * 0.38).toFixed(1)} ${(cy + s * r * 0.38).toFixed(1)}L${(cx + c * r).toFixed(1)} ${(cy + s * r).toFixed(1)}`;
  }
  return `<path d="${d}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" fill="none"/><circle cx="${cx}" cy="${cy}" r="${r * 1.3}" fill="${col}" opacity=".13"/>`;
}

const FONT = "Pretendard Variable,Pretendard,sans-serif";

export function sceneSvg(k: SceneKey): string {
  const u = "bz" + k;
  const grain = `<filter id="${u}n" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .9 0"/></filter>`;
  const noise = `<rect width="320" height="200" filter="url(#${u}n)" opacity=".13"/>`;
  const lg = (id: string, stops: [number, string, number?][], v = true) =>
    `<linearGradient id="${u}${id}" x1="0" y1="0" x2="${v ? 0 : 1}" y2="${v ? 1 : 0}">${stops
      .map((s) => `<stop offset="${s[0]}" stop-color="${s[1]}"${s[2] !== undefined ? ` stop-opacity="${s[2]}"` : ""}/>`)
      .join("")}</linearGradient>`;
  const rg = (id: string, c: string, o = 1) =>
    `<radialGradient id="${u}${id}"><stop offset="0" stop-color="${c}" stop-opacity="${o}"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`;
  let defs = "";
  let body = "";

  if (k === "baseball") {
    defs =
      lg("a", [[0, "#1b2d61"], [0.52, "#d9826b"], [1, "#f7c681"]]) +
      rg("b", "#fff3c4", 0.95) +
      lg("c", [[0, "#3fa468"], [1, "#1e6b3f"]]) +
      `<pattern id="${u}d" width="6" height="5" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.3" fill="#f1d3a8" opacity=".75"/><circle cx="4.5" cy="3.8" r="1.2" fill="#d9644f" opacity=".8"/><circle cx="3" cy="1" r=".9" fill="#7aa7e6" opacity=".65"/></pattern>` +
      rg("e", "#fff6d0", 0.9) +
      lg("f", [[0, "#e5383b"], [1, "#a61e22"]], false);
    body = `<rect width="320" height="200" fill="url(#${u}a)"/><circle cx="238" cy="116" r="84" fill="url(#${u}b)"/>
      <polygon points="0,124 0,108 14,108 14,100 26,100 26,110 38,110 38,96 52,96 52,112 66,112 66,104 80,104 80,116 250,116 250,100 266,100 266,110 280,110 280,98 294,98 294,112 308,112 308,104 320,104 320,124" fill="#2a3763" opacity=".85"/>
      <path d="M-10 130Q160 66 330 130V144H-10Z" fill="#1a2447"/><path d="M-10 138Q160 80 330 138V150H-10Z" fill="url(#${u}d)"/>
      <rect x="130" y="90" width="60" height="22" rx="2" fill="#0d1530"/><rect x="133" y="93" width="54" height="16" rx="1" fill="#3a78d6"/><path d="M139 101h9M153 98v6M159 101h22" stroke="#fff" stroke-opacity=".85" stroke-width="2"/>
      <g><circle cx="30" cy="36" r="34" fill="url(#${u}e)"/><rect x="28" y="40" width="4" height="86" fill="#2a3358"/><rect x="17" y="30" width="26" height="14" rx="2" fill="#fff6d8"/><path d="M20 34h20M20 40h20" stroke="#e8c97a" stroke-width="1"/></g>
      <g><circle cx="290" cy="36" r="34" fill="url(#${u}e)"/><rect x="288" y="40" width="4" height="86" fill="#2a3358"/><rect x="277" y="30" width="26" height="14" rx="2" fill="#fff6d8"/><path d="M280 34h20M280 40h20" stroke="#e8c97a" stroke-width="1"/></g>
      <path d="M0 140H320V200H0Z" fill="url(#${u}c)"/><path d="M0 152H320V160H0ZM0 170H320V180H0ZM0 192H320V200H0Z" fill="#fff" opacity=".07"/>
      <path d="M160 146L228 173 160 200 92 173Z" fill="#c68f5c"/><path d="M160 153L215 174 160 195 105 174Z" fill="#dcaa78" opacity=".65"/>
      <path d="M160 200L8 158M160 200L312 158" stroke="#fff" stroke-opacity=".8" stroke-width="1.4"/>
      <rect x="156" y="143" width="8" height="8" fill="#fff" transform="rotate(45 160 147)"/><rect x="224" y="169" width="8" height="8" fill="#fff" transform="rotate(45 228 173)"/><rect x="88" y="169" width="8" height="8" fill="#fff" transform="rotate(45 92 173)"/>
      <g fill="#0c1224"><ellipse cx="22" cy="206" rx="26" ry="20"/><circle cx="24" cy="180" r="10"/><ellipse cx="70" cy="210" rx="26" ry="20"/><circle cx="72" cy="188" r="9"/><ellipse cx="262" cy="208" rx="26" ry="20"/><circle cx="262" cy="184" r="10"/><ellipse cx="304" cy="206" rx="26" ry="20"/><circle cx="306" cy="182" r="10"/></g>
      <g transform="rotate(20 50 160)"><rect x="42" y="104" width="16" height="78" rx="8" fill="url(#${u}f)"/><rect x="45" y="110" width="3.5" height="64" rx="2" fill="#fff" opacity=".35"/></g>
      <g transform="rotate(-22 270 158)"><rect x="262" y="100" width="16" height="78" rx="8" fill="#3a6fe0"/><rect x="265" y="106" width="3.5" height="64" rx="2" fill="#fff" opacity=".35"/></g>`;
  } else if (k === "halloween") {
    defs =
      lg("a", [[0, "#150d33"], [0.6, "#4a1d6b"], [1, "#b8431a"]]) +
      rg("b", "#ffe9a8", 0.55) +
      rg("c", "#ffd45a", 0.9) +
      lg("d", [[0, "#ff9a2e"], [1, "#d9520f"]]) +
      `<filter id="${u}g"><feGaussianBlur stdDeviation="3"/></filter><filter id="${u}h"><feGaussianBlur stdDeviation="6"/></filter>`;
    body = `<rect width="320" height="200" fill="url(#${u}a)"/><circle cx="238" cy="62" r="76" fill="url(#${u}b)"/>
      <circle cx="238" cy="62" r="32" fill="#fbe9a6"/><circle cx="228" cy="54" r="6" fill="#e6cf84"/><circle cx="248" cy="72" r="8" fill="#e6cf84"/><circle cx="250" cy="48" r="3.5" fill="#e6cf84"/>
      <g fill="#0b0720"><path d="M60 40c6-6 10-2 12 3 3-5 9-4 10 2-5-1-8 3-9 8-2-5-6-8-13-13z"/><path d="M118 24c5-5 9-2 11 3 3-4 8-3 9 2-5-1-7 2-8 7-2-4-5-7-12-12z"/><path d="M168 52c4-4 7-1 9 2 2-3 6-2 7 2-4-1-6 2-6 5-2-3-4-5-10-9z"/></g>
      <g fill="#0a061a"><path d="M0 200V96c8 2 12-4 18-4v26l12-30 2 16 14-18v90z"/><path d="M320 200V84c-10 4-14-4-22-4v30l-14-26-2 18-16-22v120z"/></g>
      <path d="M0 150Q80 128 160 146T320 140V200H0Z" fill="#0f0826"/>
      <ellipse cx="90" cy="158" rx="120" ry="16" fill="#c9b8ee" opacity=".16" filter="url(#${u}h)"/><ellipse cx="250" cy="164" rx="110" ry="14" fill="#c9b8ee" opacity=".14" filter="url(#${u}h)"/>
      <g><circle cx="118" cy="148" r="60" fill="url(#${u}c)" opacity=".45"/>
      <rect x="114" y="92" width="9" height="16" rx="3" fill="#4d7c0f" transform="rotate(8 118 100)"/>
      <ellipse cx="118" cy="148" rx="56" ry="44" fill="url(#${u}d)"/><ellipse cx="96" cy="148" rx="26" ry="43" fill="#c9460b" opacity=".35"/><ellipse cx="140" cy="148" rx="26" ry="43" fill="#c9460b" opacity=".35"/><ellipse cx="118" cy="148" rx="14" ry="44" fill="#ffa84a" opacity=".5"/>
      <g filter="url(#${u}g)"><path d="M92 138l12-16 12 16zM122 138l12-16 12 16z" fill="#ffd45a"/><path d="M90 158h56l-12 20h-12l-6-8-6 8h-10z" fill="#ffd45a"/></g>
      <path d="M92 138l12-16 12 16zM122 138l12-16 12 16z" fill="#ffe28a"/><path d="M90 158h56l-12 20h-12l-6-8-6 8h-10z" fill="#ffe28a"/></g>
      <g><ellipse cx="222" cy="176" rx="32" ry="24" fill="url(#${u}d)"/><ellipse cx="210" cy="176" rx="12" ry="23" fill="#c9460b" opacity=".35"/><rect x="220" y="148" width="6" height="10" rx="2" fill="#4d7c0f"/></g>
      <g><ellipse cx="282" cy="184" rx="22" ry="16" fill="url(#${u}d)"/><rect x="280" y="166" width="5" height="8" rx="2" fill="#4d7c0f"/></g>`;
  } else if (k === "pepero") {
    defs =
      lg("a", [[0, "#ffd8e2"], [1, "#ff9db6"]]) +
      lg("b", [[0, "#f4d19a"], [1, "#d9a45e"]]) +
      lg("c", [[0, "#7b4527"], [1, "#4c2815"]]) +
      lg("d", [[0, "#f2506f"], [1, "#c92a4b"]]);
    const stick = (rot: number, x: number) =>
      `<g transform="rotate(${rot} 160 152)"><rect x="${x}" y="40" width="13" height="120" rx="6.5" fill="url(#${u}b)"/><rect x="${x}" y="40" width="13" height="78" rx="6.5" fill="url(#${u}c)"/><rect x="${x + 2.5}" y="46" width="2.6" height="62" rx="1.3" fill="#fff" opacity=".28"/></g>`;
    body = `<rect width="320" height="200" fill="url(#${u}a)"/><ellipse cx="160" cy="186" rx="110" ry="12" fill="#b13a58" opacity=".28"/>
      ${stick(-30, 153)}${stick(-15, 153)}${stick(0, 153)}${stick(15, 153)}${stick(30, 153)}
      <rect x="112" y="124" width="96" height="62" rx="6" fill="url(#${u}d)"/><rect x="112" y="124" width="96" height="12" rx="6" fill="#fff" opacity=".18"/><rect x="112" y="148" width="96" height="14" fill="#fff" opacity=".92"/>
      <text x="160" y="159" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="12" fill="#c92a4b" letter-spacing="1.5">11.11</text>
      <g fill="#fff" opacity=".9"><path d="M40 52c-8-10 6-16 10-6 4-10 18-4 10 6l-10 9z"/><path d="M268 80c-6-8 5-12 8-4 3-8 14-3 8 4l-8 7z" opacity=".8"/><path d="M276 34c-5-6 3-10 6-3 3-7 11-2 6 3l-6 5z" opacity=".7"/></g>
      <g fill="#fff"><circle cx="64" cy="108" r="3" opacity=".7"/><circle cx="252" cy="130" r="2.5" opacity=".7"/><circle cx="90" cy="40" r="2" opacity=".8"/><rect x="236" y="52" width="6" height="3" rx="1.5" fill="#ffd45a" transform="rotate(30 239 53)"/><rect x="50" y="140" width="6" height="3" rx="1.5" fill="#4a7dff" transform="rotate(-30 53 141)"/></g>`;
  } else if (k === "exam") {
    defs =
      lg("a", [[0, "#e0bd90"], [1, "#c79b68"]], false) +
      lg("b", [[0, "#fff"], [1, "#f1ede4"]]) +
      rg("c", "#fff", 0.35) +
      lg("d", [[0, "#ffe45e"], [1, "#f5b301"]], false);
    body = `<rect width="320" height="200" fill="url(#${u}a)"/>
      <g stroke="#a67a47" stroke-opacity=".25" fill="none" stroke-width="1"><path d="M0 30Q160 22 320 34M0 72Q160 64 320 76M0 118Q160 110 320 122M0 164Q160 156 320 168"/></g>
      <g transform="rotate(-4 150 100)"><rect x="52" y="22" width="190" height="150" rx="4" fill="#000" opacity=".12" transform="translate(5 6)"/><rect x="52" y="22" width="190" height="150" rx="4" fill="url(#${u}b)"/><path d="M147 22v150" stroke="#d9d3c4" stroke-width="2"/>
      <path d="M66 46h68M66 62h68M66 78h68M66 94h68M66 110h68M66 126h46M160 46h68M160 62h68M160 78h68M160 94h54" stroke="#cfd6e4" stroke-width="1.4"/>
      <path d="M68 44c8-6 14 4 22-2s14 4 24-2M68 60c8-6 14 4 22-2s14 4 20-2M68 76c9-5 13 3 22-1s14 3 26-1M162 44c8-6 14 4 22-2s14 4 24-2M162 60c8-6 14 4 22-2s14 4 16-2" stroke="#2b4a8f" stroke-width="1.6" fill="none" stroke-linecap="round"/>
      <path d="M170 90l7 8 14-17" stroke="#e5383b" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
      <g transform="rotate(-38 270 120)"><rect x="262" y="40" width="16" height="108" rx="2" fill="url(#${u}d)"/><path d="M262 148h16l-8 18z" fill="#f3d3a5"/><path d="M267 158h6l-3 8z" fill="#2b2b2b"/><rect x="262" y="34" width="16" height="10" rx="2" fill="#f49ab4"/><rect x="262" y="44" width="16" height="4" fill="#c8cdd8"/></g>
      <g><circle cx="262" cy="170" r="22" fill="#000" opacity=".1" transform="translate(3 4)"/><circle cx="262" cy="170" r="22" fill="#fff"/><circle cx="262" cy="170" r="16" fill="#5a3418"/><circle cx="262" cy="170" r="16" fill="url(#${u}c)"/><path d="M252 163c4-3 8 2 12-1" stroke="#e8c9a0" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/></g>
      <g transform="rotate(6 52 160)"><rect x="26" y="136" width="52" height="46" rx="2" fill="#000" opacity=".1" transform="translate(3 4)"/><rect x="26" y="136" width="52" height="46" rx="2" fill="#ffe96b"/><path d="M34 152h36M34 162h26" stroke="#d9b92a" stroke-width="2" stroke-linecap="round"/><text x="52" y="149" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="9" fill="#3a2f00">화이팅</text></g>`;
  } else if (k === "blackfriday") {
    defs =
      rg("a", "#3a4163", 1) +
      lg("b", [[0, "#ff5d62"], [1, "#c4161c"]], false) +
      lg("c", [[0, "#fff"], [1, "#cfd3dc"]], false) +
      lg("d", [[0, "#ffe08a"], [1, "#d99a1b"]], false);
    const bag = (x: number, y: number, w: number, h: number, f: string, hnd: string) =>
      `<g><path d="M${x + w * 0.3} ${y}v-14a${w * 0.2} ${w * 0.2} 0 0 1 ${w * 0.4} 0v14" fill="none" stroke="${hnd}" stroke-width="4" stroke-linecap="round"/><path d="M${x} ${y}h${w}l6 ${h}H${x - 6}z" fill="url(#${u}${f})"/><path d="M${x} ${y}h${w}l.8 10H${x - 0.8}z" fill="#fff" opacity=".2"/><rect x="${x + w * 0.5 - 11}" y="${y + h * 0.45}" width="22" height="8" rx="2" fill="#fff" opacity=".85"/></g>`;
    body = `<rect width="320" height="200" fill="#0a0c14"/><ellipse cx="160" cy="90" rx="190" ry="120" fill="url(#${u}a)"/><ellipse cx="160" cy="178" rx="130" ry="10" fill="#000" opacity=".5"/>
      <path d="M0 176H320V200H0Z" fill="#0f1220"/><ellipse cx="160" cy="176" rx="150" ry="5" fill="#fff" opacity=".08"/>
      ${bag(60, 96, 56, 76, "c", "#9aa1b2")}${bag(206, 104, 54, 68, "d", "#b8860b")}${bag(124, 82, 74, 92, "b", "#8c1015")}
      <text x="160" y="40" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="20" fill="url(#${u}d)" letter-spacing="4">BLACK FRIDAY</text>
      <rect x="226" y="52" width="70" height="22" rx="11" fill="#ffd45a"/><text x="261" y="67.5" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="11" fill="#171d2b">UP TO 50%</text>
      <g fill="#ffd45a"><rect x="40" y="56" width="5" height="2.6" rx="1" transform="rotate(30 42 57)"/><rect x="92" y="24" width="5" height="2.6" rx="1" transform="rotate(-30 94 25)"/><rect x="272" y="104" width="5" height="2.6" rx="1" transform="rotate(50 274 105)"/><circle cx="30" cy="100" r="2"/><circle cx="296" cy="30" r="2"/></g>`;
  } else if (k === "ski") {
    defs =
      lg("a", [[0, "#8ec9ff"], [1, "#eaf5ff"]]) +
      rg("b", "#fff", 0.95) +
      lg("c", [[0, "#fff"], [1, "#dbe9f7"]], false) +
      lg("d", [[0, "#e6f1fb"], [1, "#b9d0ea"]]);
    const pine = (x: number, y: number, s: number) =>
      `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 -26L9 -10H4L12 2H-12L-4 -10H-9z" fill="#1f5f45"/><path d="M0 -26L9 -10H4L12 2H0z" fill="#16513a"/><rect x="-1.5" y="2" width="3" height="5" fill="#5a3a22"/></g>`;
    body = `<rect width="320" height="200" fill="url(#${u}a)"/><circle cx="244" cy="40" r="64" fill="url(#${u}b)"/><circle cx="244" cy="40" r="14" fill="#fff"/>
      <path d="M-10 140L70 62 118 110 170 48 240 120 290 76 330 120V200H-10Z" fill="url(#${u}d)"/><path d="M170 48L150 74l12-4 8 10 6-12 10 8z" fill="#fff"/><path d="M70 62L54 80l10-3 7 9 5-11z" fill="#fff"/>
      <path d="M170 48L240 120 200 130 176 84z" fill="#9fb9d6" opacity=".55"/>
      <path d="M-10 200V150Q60 112 150 140T330 128V200Z" fill="url(#${u}c)"/><path d="M60 200Q120 156 220 168T330 150" stroke="#cfe0f2" stroke-width="3" fill="none"/>
      ${pine(36, 150, 1.5)}${pine(70, 160, 1.2)}${pine(268, 146, 1.4)}${pine(296, 158, 1.8)}${pine(250, 166, 1)}
      <path d="M0 30L320 52" stroke="#6b7b92" stroke-width="1.4"/><g transform="translate(150 38)"><path d="M0 0v12" stroke="#6b7b92" stroke-width="1.4"/><rect x="-14" y="12" width="28" height="18" rx="4" fill="#e5383b"/><rect x="-10" y="16" width="20" height="8" rx="2" fill="#bfe3ff"/></g>
      <g transform="translate(112 126) rotate(-18)"><circle cx="0" cy="-10" r="3.4" fill="#1b2b4b"/><path d="M0 -6L-3 6M0 -6L5 4" stroke="#e5383b" stroke-width="3.4" stroke-linecap="round"/><path d="M-9 9L10 3" stroke="#1b2b4b" stroke-width="2" stroke-linecap="round"/></g>`;
  } else if (k === "xmas") {
    defs =
      lg("a", [[0, "#0b1f1a"], [1, "#17503b"]]) +
      lg("b", [[0, "#2a9c63"], [1, "#0f5133"]], false) +
      rg("c", "#ffd98a", 0.9) +
      `<filter id="${u}h"><feGaussianBlur stdDeviation="5"/></filter>`;
    const orn = (x: number, y: number, c: string) =>
      `<circle cx="${x}" cy="${y}" r="5.2" fill="${c}"/><circle cx="${x - 1.6}" cy="${y - 1.8}" r="1.5" fill="#fff" opacity=".75"/>`;
    const light = (x: number, y: number) =>
      `<circle cx="${x}" cy="${y}" r="9" fill="url(#${u}c)"/><circle cx="${x}" cy="${y}" r="2.2" fill="#fff6c8"/>`;
    body = `<rect width="320" height="200" fill="url(#${u}a)"/>
      <g filter="url(#${u}h)" opacity=".7"><circle cx="40" cy="50" r="16" fill="#ffcf6b"/><circle cx="80" cy="120" r="12" fill="#ff8a5c"/><circle cx="270" cy="60" r="18" fill="#ffcf6b"/><circle cx="292" cy="130" r="12" fill="#ffe9a8"/><circle cx="238" cy="26" r="9" fill="#ff8a5c"/></g>
      <path d="M160 24L206 88H114z" fill="url(#${u}b)"/><path d="M160 58L216 130H104z" fill="url(#${u}b)"/><path d="M160 94L228 176H92z" fill="url(#${u}b)"/><rect x="150" y="174" width="20" height="14" fill="#6b3f1f"/>
      <path d="M126 80Q160 96 196 80M114 118Q160 140 206 118M104 156Q160 184 216 156" stroke="#f4c75a" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      ${light(150, 58)}${light(176, 74)}${light(136, 106)}${light(184, 118)}${light(124, 142)}${light(160, 150)}${light(198, 150)}
      ${orn(142, 86, "#e5383b")}${orn(176, 98, "#ffd45a")}${orn(128, 132, "#ffd45a")}${orn(190, 136, "#e5383b")}${orn(150, 166, "#e5383b")}${orn(176, 168, "#ffd45a")}
      <path d="M160 6l5 11 12 1-9 8 3 12-11-6-11 6 3-12-9-8 12-1z" fill="#ffd45a"/><circle cx="160" cy="22" r="22" fill="url(#${u}c)" opacity=".7"/>
      <g><rect x="40" y="158" width="46" height="34" rx="3" fill="#e5383b"/><rect x="59" y="158" width="8" height="34" fill="#ffd45a"/><path d="M63 158c-8-14-20-8-14-2zM63 158c8-14 20-8 14-2z" fill="#ffd45a"/><rect x="236" y="164" width="40" height="28" rx="3" fill="#f5f5f5"/><rect x="252" y="164" width="8" height="28" fill="#e5383b"/><rect x="92" y="172" width="30" height="20" rx="3" fill="#4a7dff"/><rect x="104" y="172" width="6" height="20" fill="#fff" opacity=".9"/></g>
      <g fill="#fff"><circle cx="30" cy="30" r="2.4"/><circle cx="64" cy="84" r="1.8"/><circle cx="108" cy="20" r="1.8"/><circle cx="250" cy="100" r="2.2"/><circle cx="296" cy="22" r="1.8"/><circle cx="214" cy="40" r="1.6"/><circle cx="20" cy="140" r="2"/><circle cx="304" cy="168" r="2.2"/></g>`;
  } else if (k === "newyear") {
    defs =
      lg("a", [[0, "#050818"], [0.7, "#1b1a55"], [1, "#3b2a78"]]) +
      lg("b", [[0, "#ffe9a8"], [1, "#e0a93a"]], false) +
      `<filter id="${u}h"><feGaussianBlur stdDeviation="2.2"/></filter>`;
    const wins = (x: number, y: number, w: number, h: number) => {
      let s = "";
      for (let i = 0; i < w; i += 6) for (let j = 0; j < h; j += 8) if ((i * 7 + j * 3 + x) % 5 < 2) s += `<rect x="${x + i + 1}" y="${y + j + 1}" width="2.6" height="3.6" fill="#ffd97a" opacity=".85"/>`;
      return s;
    };
    body = `<rect width="320" height="200" fill="url(#${u}a)"/>
      <g fill="#fff"><circle cx="30" cy="22" r="1.2"/><circle cx="90" cy="14" r="1"/><circle cx="150" cy="30" r="1.2"/><circle cx="210" cy="12" r="1"/><circle cx="280" cy="28" r="1.2"/><circle cx="56" cy="64" r="1"/><circle cx="300" cy="70" r="1"/></g>
      <g filter="url(#${u}h)" opacity=".9">${burst(96, 62, 38, 14, "#ffd45a", 2)}${burst(220, 50, 32, 12, "#ff6fa8", 2)}${burst(160, 92, 24, 10, "#6fd3ff", 2)}</g>
      ${burst(96, 62, 38, 14, "#ffd45a")}${burst(220, 50, 32, 12, "#ff6fa8")}${burst(160, 92, 24, 10, "#6fd3ff")}
      <g fill="#0b0f2b"><rect x="0" y="136" width="30" height="64"/><rect x="26" y="118" width="26" height="82"/><rect x="50" y="144" width="34" height="56"/><rect x="82" y="126" width="22" height="74"/><rect x="102" y="104" width="28" height="96"/><rect x="128" y="138" width="34" height="62"/><rect x="160" y="122" width="26" height="78"/><rect x="184" y="146" width="30" height="54"/><rect x="212" y="112" width="24" height="88"/><rect x="234" y="136" width="30" height="64"/><rect x="262" y="120" width="28" height="80"/><rect x="288" y="142" width="32" height="58"/></g>
      ${wins(0, 136, 30, 64)}${wins(26, 118, 26, 82)}${wins(82, 126, 22, 74)}${wins(102, 104, 28, 96)}${wins(160, 122, 26, 78)}${wins(212, 112, 24, 88)}${wins(262, 120, 28, 80)}
      <rect x="0" y="156" width="320" height="24" fill="#070b24" opacity=".72"/><text x="160" y="172" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="13" fill="url(#${u}b)" letter-spacing="3.5">HAPPY NEW YEAR 2027</text>`;
  } else if (k === "sunrise") {
    defs =
      lg("a", [[0, "#1d2b64"], [0.45, "#f8794d"], [1, "#ffd27a"]]) +
      rg("b", "#fff3c4", 0.95) +
      lg("c", [[0, "#5b4a94"], [1, "#2c2360"]]);
    body = `<rect width="320" height="200" fill="url(#${u}a)"/><circle cx="160" cy="124" r="96" fill="url(#${u}b)"/><circle cx="160" cy="124" r="32" fill="#fff0b3"/>
      <g fill="#fff" opacity=".35"><ellipse cx="60" cy="104" rx="34" ry="6"/><ellipse cx="82" cy="98" rx="22" ry="5"/><ellipse cx="260" cy="92" rx="38" ry="6"/><ellipse cx="238" cy="100" rx="22" ry="5"/></g>
      <path d="M0 150L50 112 90 140 140 100 190 138 240 108 320 146V200H0Z" fill="#6d5aa6" opacity=".85"/>
      <path d="M0 172L70 128 120 160 180 124 250 164 320 140V200H0Z" fill="url(#${u}c)"/>
      <path d="M0 200V182Q80 154 160 176T320 164V200Z" fill="#1a1440"/>
      <g stroke="#1a1440" stroke-width="1.8" fill="none" stroke-linecap="round"><path d="M210 70q5-5 10 0q5-5 10 0"/><path d="M236 84q4-4 8 0q4-4 8 0"/></g>
      <text x="160" y="58" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="32" fill="#fff" letter-spacing="7">2027</text>
      <text x="160" y="80" text-anchor="middle" font-family="${FONT}" font-weight="600" font-size="12" fill="#fff" opacity=".92" letter-spacing="2">새해 복 많이 받으세요</text>`;
  } else if (k === "seollal") {
    defs =
      lg("a", [[0, "#6e0f1d"], [1, "#c4283a"]]) +
      rg("b", "#ffe9a8", 0.6) +
      lg("c", [[0, "#ef4c5b"], [1, "#a8162a"]], false) +
      lg("d", [[0, "#ffe08a"], [1, "#d99a1b"]], false);
    const lantern = (x: number, y: number) =>
      `<g><path d="M${x} 0V${y}" stroke="#e8c97a" stroke-width="1.5"/><rect x="${x - 9}" y="${y}" width="18" height="5" rx="2" fill="url(#${u}d)"/><ellipse cx="${x}" cy="${y + 24}" rx="15" ry="19" fill="url(#${u}c)"/><path d="M${x - 15} ${y + 24}h30M${x - 9} ${y + 8}v32M${x + 9} ${y + 8}v32" stroke="#ffb3bb" stroke-opacity=".5" stroke-width="1"/><rect x="${x - 9}" y="${y + 43}" width="18" height="4" rx="2" fill="url(#${u}d)"/><path d="M${x} ${y + 47}v14" stroke="#e8c97a" stroke-width="2"/></g>`;
    body = `<rect width="320" height="200" fill="url(#${u}a)"/><circle cx="252" cy="70" r="70" fill="url(#${u}b)"/><circle cx="252" cy="70" r="28" fill="#ffeeb8"/>
      ${lantern(40, 18)}${lantern(110, 4)}
      <g fill="#ffd45a" opacity=".6"><circle cx="20" cy="140" r="1.6"/><circle cx="64" cy="108" r="1.4"/><circle cx="300" cy="140" r="1.6"/><circle cx="196" cy="34" r="1.4"/><circle cx="288" cy="36" r="1.2"/></g>
      <g transform="rotate(-14 70 150)"><rect x="40" y="118" width="64" height="44" rx="4" fill="#fdf3e3"/><path d="M40 122l32 22 32-22" stroke="#e8c9a0" stroke-width="1.6" fill="none"/><circle cx="72" cy="146" r="7" fill="#d9283d"/></g>
      <path d="M128 98Q160 82 192 98Q210 140 188 168Q160 182 132 168Q110 140 128 98Z" fill="url(#${u}c)"/>
      <path d="M128 98Q160 112 192 98" stroke="#7a0f1d" stroke-opacity=".55" stroke-width="2" fill="none"/><rect x="146" y="88" width="28" height="9" rx="4" fill="url(#${u}d)"/>
      <path d="M160 168v16M152 168v12M168 168v12" stroke="#e8c97a" stroke-width="2.4" stroke-linecap="round"/>
      <text x="160" y="146" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="40" fill="url(#${u}d)">福</text>
      <path d="M0 196H320" stroke="#e8c97a" stroke-opacity=".5"/><g fill="#e8c97a" opacity=".55">${Array.from({ length: 16 }, (_, i) => `<circle cx="${10 + i * 20}" cy="190" r="2.2"/>`).join("")}</g>`;
  } else if (k === "valentine") {
    defs =
      lg("a", [[0, "#ff9db6"], [1, "#e8335d"]]) +
      lg("b", [[0, "#e3405f"], [1, "#a31235"]], false) +
      lg("c", [[0, "#8a4a2f"], [1, "#4c2815"]]);
    const heart = (x: number, y: number, sc: number, col: string, op: number) =>
      `<path transform="translate(${x} ${y}) scale(${sc})" d="M0 14C-14 2 -12 -12 -4 -12 0 -12 0 -8 0 -6 0 -8 0 -12 4 -12 12 -12 14 2 0 14Z" fill="${col}" opacity="${op}"/>`;
    body = `<rect width="320" height="200" fill="url(#${u}a)"/>
      ${heart(40, 50, 1.6, "#fff", 0.55)}${heart(284, 40, 2, "#fff", 0.45)}${heart(256, 120, 1.2, "#fff", 0.6)}${heart(60, 130, 1, "#fff", 0.5)}${heart(110, 24, 0.9, "#fff", 0.55)}${heart(214, 22, 1.1, "#ffd1de", 0.8)}
      <ellipse cx="160" cy="186" rx="96" ry="9" fill="#7a0f2b" opacity=".3"/>
      <path d="M160 176C80 124 90 62 132 62 150 62 160 74 160 86 160 74 170 62 188 62 230 62 240 124 160 176Z" fill="url(#${u}b)"/>
      <path d="M160 176C80 124 90 62 132 62 150 62 160 74 160 86" fill="none" stroke="#fff" stroke-opacity=".22" stroke-width="5" stroke-linecap="round"/>
      <g fill="url(#${u}c)"><circle cx="130" cy="110" r="11"/><circle cx="160" cy="124" r="11"/><circle cx="190" cy="110" r="11"/><circle cx="145" cy="92" r="9"/><circle cx="176" cy="92" r="9"/></g>
      <g fill="#fff" opacity=".35"><circle cx="126" cy="106" r="3"/><circle cx="156" cy="120" r="3"/><circle cx="186" cy="106" r="3"/></g>
      <path d="M118 80L202 160M202 80L118 160" stroke="#ffe3ea" stroke-opacity=".0" stroke-width="1"/>
      <g><path d="M160 66c-14-20-34-8-24 2 6 6 18 4 24-2zM160 66c14-20 34-8 24 2-6 6-18 4-24-2z" fill="#ffd1de"/><circle cx="160" cy="66" r="6" fill="#ffe9ef"/></g>`;
  } else if (k === "graduation") {
    defs =
      lg("a", [[0, "#cfe9ff"], [1, "#f8fcff"]]) +
      lg("b", [[0, "#c4e8b4"], [1, "#9fd48c"]]) +
      lg("c", [[0, "#ffe08a"], [1, "#d99a1b"]], false);
    const petal = (x: number, y: number, r: number) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffc2d4" opacity=".85"/>`;
    body = `<rect width="320" height="200" fill="url(#${u}a)"/>
      <g fill="#fff" opacity=".8"><ellipse cx="70" cy="40" rx="36" ry="9"/><ellipse cx="96" cy="32" rx="22" ry="8"/><ellipse cx="256" cy="54" rx="34" ry="8"/></g>
      <path d="M0 160Q90 134 170 156T320 146V200H0Z" fill="url(#${u}b)"/>
      ${petal(30, 70, 3)}${petal(54, 110, 2.4)}${petal(280, 80, 3)}${petal(300, 120, 2.4)}${petal(248, 30, 2.6)}${petal(20, 30, 2.2)}${petal(204, 120, 2.2)}${petal(110, 150, 2)}
      <g transform="rotate(-16 262 150)"><rect x="228" y="136" width="70" height="26" rx="13" fill="#fff"/><rect x="228" y="136" width="70" height="26" rx="13" fill="none" stroke="#e5e7eb" stroke-width="1.5"/><rect x="254" y="136" width="8" height="26" fill="#e5383b"/></g>
      <g><path d="M60 188V142" stroke="#4d8f4a" stroke-width="3"/><path d="M48 188L56 146M72 188L64 146" stroke="#4d8f4a" stroke-width="2.4"/><circle cx="46" cy="132" r="11" fill="#ff9db6"/><circle cx="62" cy="124" r="11" fill="#ffd45a"/><circle cx="78" cy="134" r="11" fill="#ffb3c7"/><circle cx="62" cy="140" r="9" fill="#fff"/><path d="M52 188h20l-3 10H55z" fill="#e8c97a"/></g>
      <path d="M122 96v24q38 20 76 0V96q-38 18-76 0z" fill="#111827"/>
      <polygon points="160,50 238,78 160,106 82,78" fill="#1f2937"/><polygon points="160,50 238,78 160,92 82,78" fill="#fff" opacity=".08"/>
      <path d="M232 79v32" stroke="url(#${u}c)" stroke-width="2.4"/><ellipse cx="232" cy="116" rx="4" ry="7" fill="url(#${u}c)"/><circle cx="160" cy="78" r="3.4" fill="url(#${u}c)"/>`;
  } else {
    /* whiteday */
    defs =
      lg("a", [[0, "#cfe6ff"], [1, "#f1f8ff"]]) +
      lg("b", [[0, "#fff", 0.85], [1, "#dce9fa", 0.55]], false) +
      lg("c", [[0, "#ff9db6"], [1, "#e8467a"]], false);
    const heart = (x: number, y: number, sc: number, col: string, op: number) =>
      `<path transform="translate(${x} ${y}) scale(${sc})" d="M0 14C-14 2 -12 -12 -4 -12 0 -12 0 -8 0 -6 0 -8 0 -12 4 -12 12 -12 14 2 0 14Z" fill="${col}" opacity="${op}"/>`;
    const candy = (x: number, y: number, col: string, rot: number) =>
      `<g transform="rotate(${rot} ${x} ${y})"><path d="M${x - 14} ${y}l-8-6v12zM${x + 14} ${y}l8-6v12z" fill="${col}"/><ellipse cx="${x}" cy="${y}" rx="14" ry="8.5" fill="${col}"/><path d="M${x - 7} ${y - 6}q7 -3 14 0" stroke="#fff" stroke-opacity=".55" stroke-width="2" fill="none" stroke-linecap="round"/></g>`;
    body = `<rect width="320" height="200" fill="url(#${u}a)"/>
      ${heart(44, 44, 1.5, "#fff", 0.9)}${heart(280, 56, 1.8, "#fff", 0.8)}${heart(250, 130, 1.1, "#ffc2d4", 0.9)}${heart(64, 120, 1, "#ffc2d4", 0.9)}
      <g fill="#fff" opacity=".9"><circle cx="30" cy="90" r="2"/><circle cx="296" cy="100" r="2"/><circle cx="100" cy="30" r="1.8"/><circle cx="214" cy="24" r="1.8"/></g>
      <ellipse cx="160" cy="188" rx="82" ry="8" fill="#6b8fbd" opacity=".25"/>
      <rect x="116" y="58" width="88" height="14" rx="5" fill="#dfe8f5"/><rect x="120" y="50" width="80" height="12" rx="5" fill="#f4f8ff"/>
      <path d="M122 72h76q10 8 10 28v62q0 20-20 20h-56q-20 0-20-20v-62q0-20 10-28z" fill="url(#${u}b)" stroke="#b5cdea" stroke-width="2"/>
      ${candy(140, 150, "#ff9db6", -12)}${candy(176, 156, "#7fc4ff", 10)}${candy(158, 132, "#ffe08a", 4)}${candy(134, 112, "#b7e4c7", 14)}${candy(180, 118, "#ffc2d4", -8)}${candy(158, 96, "#cdb4ff", 6)}
      <path d="M114 128h92v14h-92z" fill="url(#${u}c)" opacity=".92"/>
      <path d="M160 128c-12-16-30-6-22 2 5 5 15 3 22-2zM160 128c12-16 30-6 22 2-5 5-15 3-22-2z" fill="#ffd1de"/><circle cx="160" cy="130" r="5" fill="#ffe9ef"/>
      <path d="M126 80v70" stroke="#fff" stroke-opacity=".7" stroke-width="4" stroke-linecap="round"/>`;
  }
  return `<svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" class="tw-block tw-h-full tw-w-full" aria-hidden="true"><defs>${defs}${grain}</defs>${body}${noise}</svg>`;
}

export function objSvg(k: ObjKey, a: string): string {
  const id = "bzo" + k + a.slice(1);
  const d = shade(a, -0.3);
  const l = shade(a, 0.28);
  const f = `url(#${id})`;
  const parts: Record<ObjKey, string> = {
    ticket: `<g transform="rotate(-10 50 50)"><path d="M10 30a8 8 0 0 1 8-8h64a8 8 0 0 1 8 8v10a10 10 0 0 0 0 20v10a8 8 0 0 1-8 8H18a8 8 0 0 1-8-8V60a10 10 0 0 0 0-20z" fill="${f}"/><path d="M66 26v48" stroke="#fff" stroke-opacity=".7" stroke-width="2" stroke-dasharray="3 4"/><path d="M22 40h30M22 50h24M22 60h18" stroke="#fff" stroke-opacity=".88" stroke-width="3.5" stroke-linecap="round"/><path d="M78 44l2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.1 5.9-.8z" fill="#fff" fill-opacity=".92"/></g>`,
    gift: `<rect x="18" y="46" width="64" height="40" rx="5" fill="${f}"/><rect x="13" y="34" width="74" height="16" rx="4" fill="${l}"/><rect x="45" y="34" width="10" height="52" fill="#fff" fill-opacity=".88"/><path d="M50 34c-12-18-28-6-19 0 4 3 12 1 19 0zM50 34c12-18 28-6 19 0-4 3-12 1-19 0z" fill="#fff" fill-opacity=".96"/>`,
    bag: `<path d="M34 40v-6a16 16 0 0 1 32 0v6" fill="none" stroke="${d}" stroke-width="4" stroke-linecap="round"/><path d="M20 40h60l6 48H14z" fill="${f}"/><path d="M20 40h60l1 8H19z" fill="#fff" fill-opacity=".25"/><circle cx="50" cy="66" r="10" fill="#fff" fill-opacity=".92"/><path d="M45 66l4 4 7-8" stroke="${d}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
    cup: `<path d="M42 18c-3-5 3-7 0-12M52 18c-3-5 3-7 0-12M62 18c-3-5 3-7 0-12" stroke="${d}" stroke-opacity=".4" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M28 32h44l-5 54H33z" fill="${f}"/><rect x="24" y="24" width="52" height="10" rx="4" fill="${d}"/><path d="M32 52h36l-1.4 16H33.4z" fill="#fff" fill-opacity=".92"/>`,
    card: `<g transform="rotate(-14 50 50)"><rect x="8" y="26" width="84" height="52" rx="7" fill="${f}"/><rect x="8" y="38" width="84" height="9" fill="#000" fill-opacity=".32"/><rect x="17" y="55" width="17" height="12" rx="2.5" fill="#fff" fill-opacity=".9"/><path d="M42 62h32" stroke="#fff" stroke-opacity=".85" stroke-width="3" stroke-linecap="round"/></g>`,
    cake: `<rect x="20" y="58" width="60" height="26" rx="5" fill="${f}"/><path d="M20 66c6 6 10-2 15 4s10-4 15 3 10-5 15 2 10-4 15 1V58H20z" fill="#fff" fill-opacity=".96"/><rect x="28" y="38" width="44" height="22" rx="5" fill="${l}"/><path d="M28 46c6 6 10-2 15 4s10-4 15 2 9-4 14 1v-9H28z" fill="#fff"/><rect x="48" y="24" width="4" height="14" rx="2" fill="${d}"/><path d="M50 12c3.4 3 3.4 6.4 0 9-3.4-2.6-3.4-6 0-9z" fill="#ffb020"/>`,
    bowl: `<path d="M60 18l24 24M68 12l24 24" stroke="${d}" stroke-width="3" stroke-linecap="round"/><path d="M36 40c-3-5 3-7 0-12M50 38c-3-5 3-7 0-12" stroke="${d}" stroke-opacity=".4" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M12 50h76a38 32 0 0 1-76 0z" fill="${f}"/><ellipse cx="50" cy="50" rx="38" ry="7" fill="#fff" fill-opacity=".9"/><path d="M24 50c8-8 16-8 22-2 6-8 16-8 22-1 4-4 8-4 12 1" fill="${l}" fill-opacity=".9"/>`,
    bed: `<rect x="10" y="28" width="9" height="54" rx="3" fill="${d}"/><rect x="10" y="52" width="82" height="22" rx="5" fill="${f}"/><rect x="21" y="40" width="28" height="15" rx="6" fill="#fff" fill-opacity=".96"/><path d="M49 52h43v13a7 7 0 0 1-7 7H49z" fill="${l}"/><rect x="84" y="64" width="8" height="20" rx="3" fill="${d}"/>`,
    book: `<path d="M50 28c-10-6-26-6-38-2v50c12-4 28-4 38 2z" fill="${f}"/><path d="M50 28c10-6 26-6 38-2v50c-12-4-28-4-38 2z" fill="${l}"/><path d="M20 40c8-2 16-1 24 2M20 52c8-2 16-1 24 2M20 64c8-2 16-1 24 2M58 42c8-3 16-4 24-2M58 54c8-3 16-4 24-2" stroke="#fff" stroke-opacity=".85" stroke-width="3" stroke-linecap="round" fill="none"/>`,
  };
  return `<svg viewBox="0 0 100 100" class="tw-block tw-h-full tw-w-full tw-drop-shadow-md" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${l}"/><stop offset="1" stop-color="${d}"/></linearGradient></defs><ellipse cx="50" cy="92" rx="30" ry="4" fill="#000" opacity=".1"/>${parts[k]}</svg>`;
}

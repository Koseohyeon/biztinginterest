import React, { useState, useEffect, useRef, useCallback } from 'react';
import JsBarcode from 'jsbarcode';
import {
    Sparkles, Users, Send, TrendingUp, ShieldCheck, Zap, X, Copy, Check,
    Download, ChevronLeft, ChevronRight, Gift,
} from 'lucide-react';
import { useNaverLogin } from '../../hooks/useNaverLogin';
import { NAVER_LOGIN } from '../../config/naverLogin';

/* ════════════════════════════════════════════════════════════════════
   BIZTING 이벤트 랜딩페이지 · 목업 (v2 · 오픈형)
   ------------------------------------------------------------------
   ⚠️ 이 파일은 비즈팅의 "랜딩페이지 제작" 서비스를 소개하기 위해
   고객사에게 보여드리는 예시(목업) 산출물입니다. 실제 이벤트 데이터가
   아닙니다.

   v1(잠금형)과 달리 혜택 카드는 블러/잠금 없이 처음부터 바코드·코드가
   보이고, "코드 복사" / "쿠폰 다운로드" 버튼이 바로 동작합니다.
   상단 히어로의 "이벤트 혜택 받기" 버튼은 별도로 네이버 로그인을 통해
   관심고객으로 등록시키는 리드 수집용 CTA입니다.

   ※ 히어로/카드 이미지는 Unsplash 무료 라이선스(상업적 이용 가능,
   출처 표기 불필요) 이미지를 임시로 사용했습니다. 실제 배포 시
   자사 촬영 이미지 또는 별도 구매 이미지로 교체를 권장합니다.
   ════════════════════════════════════════════════════════════════════ */

const IMG = {
    hero1: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&q=80",
    hero2: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&q=80",
    hero3: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80",
};

/* ─── 데이터 모델 ─── */
interface Slide { id: string; eyebrow: string; title: string; desc: string; img: string; }
interface Benefit {
    id: string;
    icon: React.ElementType;
    title: string;
    desc: string;
    tag: string;
    code: string;
}

const HERO_SLIDES: Slide[] = [
    {
        id: 's1',
        eyebrow: 'BIZTING · 신규 고객 모집',
        title: '관심고객, 어디서\n데려올지 고민이라면',
        desc: '고객정보가 없어도 괜찮아요. 우리 브랜드에 맞는 사람에게 소식을 전해드려요.',
        img: IMG.hero1,
    },
    {
        id: 's2',
        eyebrow: '이런 페이지, 비즈팅이 만들어요',
        title: '지금 보고 계신\n이 페이지가 예시예요',
        desc: '브랜드 톤에 맞춘 이벤트 랜딩페이지, 기획부터 제작까지 한 번에.',
        img: IMG.hero2,
    },
    {
        id: 's3',
        eyebrow: '오픈 기념 한정 이벤트',
        title: '혜택은 지금 바로,\n등록은 원할 때',
        desc: '아래 혜택은 누구나 바로 받을 수 있어요. 관심고객이 되면 다음 소식도 챙겨드려요.',
        img: IMG.hero3,
    },
];

const BENEFITS: Benefit[] = [
    { id: 'b1', icon: Sparkles, title: '랜딩페이지 제작 30% 할인', desc: '첫 프로젝트 한정 · 기획+디자인+개발 패키지', tag: '30% OFF', code: 'BIZTING-LP30' },
    { id: 'b2', icon: Users, title: '1:1 무료 마케팅 컨설팅', desc: '전담 매니저가 우리 브랜드에 맞는 전략을 제안', tag: '무료', code: 'BIZTING-CONSULT' },
    { id: 'b3', icon: Send, title: '첫 달 메시지 발송비 무료', desc: '관심고객 대상 메시지 최대 500건 지원', tag: '0원', code: 'BIZTING-SEND500' },
    { id: 'b4', icon: TrendingUp, title: '관심고객 자동 수집 세팅 지원', desc: '페이지 방문자를 리드로 자동 전환하는 세팅', tag: '무료 세팅', code: 'BIZTING-AUTOLEAD' },
];

const FEATURES = [
    { icon: ShieldCheck, title: '고객정보 없이도 OK', desc: '이미 확보된 개인정보가 없어도, 관심 있을 만한 사람에게 발송해요.' },
    { icon: Zap, title: '빠른 세팅', desc: '복잡한 연동 없이 며칠 안에 페이지를 오픈할 수 있어요.' },
    { icon: TrendingUp, title: '매출로 이어지는 소식', desc: '관심고객 등록부터 실제 구매까지, 흐름을 함께 설계해요.' },
];

/* ─── 바코드 훅 ─── */
function useBarcode(code: string, canvasRef: React.RefObject<HTMLCanvasElement | null>) {
    useEffect(() => {
        if (canvasRef.current && code) {
            JsBarcode(canvasRef.current, code, {
                format: 'CODE128', width: 2, height: 44, displayValue: false,
                background: 'transparent', lineColor: '#2E3346', margin: 0,
            });
        }
    }, [code]);
}

/* ─── 캔버스 유틸 (쿠폰 이미지 생성) ─── */
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
}

function generateCouponPNG(benefit: Benefit): string {
    const barcodeCanvas = document.createElement('canvas');
    JsBarcode(barcodeCanvas, benefit.code, {
        format: 'CODE128', width: 3, height: 68, displayValue: false,
        background: '#ffffff', lineColor: '#2E3346', margin: 0,
    });

    const W = 640, H = 380;
    const canvas = document.createElement('canvas');
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d')!;

    roundRect(ctx, 0, 0, W, H, 28);
    ctx.fillStyle = '#EEF0FE';
    ctx.fill();

    roundRect(ctx, 18, 18, W - 36, H - 36, 22);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#E7E9F3';
    ctx.lineWidth = 1.5;
    roundRect(ctx, 18, 18, W - 36, H - 36, 22);
    ctx.stroke();

    ctx.fillStyle = '#4C58D6';
    ctx.font = '700 17px "Noto Sans KR", sans-serif';
    ctx.fillText('BIZTING EVENT COUPON', 44, 62);

    ctx.fillStyle = '#232839';
    ctx.font = '800 26px "Noto Sans KR", sans-serif';
    ctx.fillText(benefit.title, 44, 102);

    ctx.fillStyle = '#767C94';
    ctx.font = '400 15px "Noto Sans KR", sans-serif';
    ctx.fillText(benefit.desc, 44, 132);

    ctx.strokeStyle = '#E7E9F3';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(44, 164);
    ctx.lineTo(W - 44, 164);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.drawImage(barcodeCanvas, 44, 192, W - 88, 74);

    ctx.fillStyle = '#767C94';
    ctx.font = '600 15px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(benefit.code, W / 2, 302);

    ctx.fillStyle = '#B7BAD6';
    ctx.font = '500 12px "Noto Sans KR", sans-serif';
    ctx.fillText('bizting.co.kr · 랜딩페이지 목업 예시', W / 2, 334);
    ctx.textAlign = 'left';

    return canvas.toDataURL('image/png');
}

function downloadCouponImage(benefit: Benefit) {
    const dataUrl = generateCouponPNG(benefit);
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `bizting-coupon-${benefit.code}.png`;
    a.click();
}

/* ─── 히어로 캐러셀 ─── */
function HeroCarousel() {
    const [idx, setIdx] = useState(0);
    const dragX = useRef<number | null>(null);

    useEffect(() => {
        const t = setInterval(() => setIdx(i => (i + 1) % HERO_SLIDES.length), 4200);
        return () => clearInterval(t);
    }, []);

    const go = (n: number) => setIdx((n + HERO_SLIDES.length) % HERO_SLIDES.length);

    return (
        <div className="bt-hero-wrap tw-relative tw-rounded-b-[2rem] tw-overflow-hidden">
            <div
                className="tw-flex tw-transition-transform tw-duration-500 tw-ease-out"
                style={{ transform: `translateX(-${idx * 100}%)` }}
                onTouchStart={e => { dragX.current = e.touches[0].clientX; }}
                onTouchEnd={e => {
                    if (dragX.current == null) return;
                    const diff = dragX.current - e.changedTouches[0].clientX;
                    if (diff > 40) go(idx + 1);
                    else if (diff < -40) go(idx - 1);
                    dragX.current = null;
                }}
            >
                {HERO_SLIDES.map(s => (
                    <div key={s.id} className="tw-w-full tw-shrink-0 tw-px-6 tw-pt-11 tw-pb-8 tw-relative tw-z-10">
                        <span className="tw-inline-block tw-text-[11px] tw-font-bold tw-text-[#4C58D6] tw-bg-white tw-px-3 tw-py-1 tw-rounded-full tw-mb-4 tw-shadow-sm">
                            {s.eyebrow}
                        </span>
                        <h1 className="tw-text-[#232839] tw-font-black tw-text-[23px] tw-leading-[1.4] tw-whitespace-pre-line tw-mb-2.5">
                            {s.title}
                        </h1>
                        <p className="tw-text-[#5B6072] tw-text-[13px] tw-leading-relaxed tw-mb-5 tw-max-w-[94%]">
                            {s.desc}
                        </p>
                        <div className="tw-rounded-[1.25rem] tw-overflow-hidden tw-shadow-sm tw-border tw-border-white/60" style={{ aspectRatio: '16/9' }}>
                            <img src={s.img} alt="" className="tw-w-full tw-h-full tw-object-cover" />
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={() => go(idx - 1)} aria-label="이전 슬라이드"
                className="tw-absolute tw-left-2 tw-top-[42%] -tw-translate-y-1/2 tw-z-20 tw-w-8 tw-h-8 tw-bg-white tw-shadow-sm tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-[#4C58D6]">
                <ChevronLeft size={16} />
            </button>
            <button onClick={() => go(idx + 1)} aria-label="다음 슬라이드"
                className="tw-absolute tw-right-2 tw-top-[42%] -tw-translate-y-1/2 tw-z-20 tw-w-8 tw-h-8 tw-bg-white tw-shadow-sm tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-[#4C58D6]">
                <ChevronRight size={16} />
            </button>

            <div className="tw-absolute tw-bottom-3 tw-left-0 tw-right-0 tw-flex tw-justify-center tw-gap-1.5 tw-z-20">
                {HERO_SLIDES.map((s, i) => (
                    <button key={s.id} onClick={() => go(i)} aria-label={`${i + 1}번 슬라이드로 이동`}
                        className="tw-transition-all tw-rounded-full"
                        style={{ width: i === idx ? 16 : 6, height: 6, background: i === idx ? '#4C58D6' : '#C7CBEA' }} />
                ))}
            </div>
        </div>
    );
}

/* ─── 혜택 카드 (오픈형: 잠금 없음) ─── */
function BenefitCard({ benefit }: { benefit: Benefit }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [copied, setCopied] = useState(false);
    useBarcode(benefit.code, canvasRef);
    const Icon = benefit.icon;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(benefit.code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch { /* clipboard unavailable */ }
    };

    return (
        <div className="tw-relative tw-bg-white tw-rounded-[1.4rem] tw-p-5 tw-mb-3.5 tw-border tw-border-[#EEF0F6]">
            <div className="tw-flex tw-items-center tw-gap-3 tw-mb-4">
                <div className="tw-w-11 tw-h-11 tw-rounded-xl tw-flex tw-items-center tw-justify-center tw-shrink-0 tw-bg-[#EEF0FE] tw-text-[#4C58D6]">
                    <Icon size={19} />
                </div>
                <div className="tw-flex-1 tw-min-w-0">
                    <span className="tw-inline-block tw-text-[10.5px] tw-font-bold tw-text-[#B5643D] tw-bg-[#FFF2EC] tw-px-2 tw-py-0.5 tw-rounded-md tw-mb-1">
                        {benefit.tag}
                    </span>
                    <h3 className="tw-text-[14px] tw-font-bold tw-text-[#232839] tw-leading-snug">{benefit.title}</h3>
                    <p className="tw-text-[11.5px] tw-text-[#8B90A6] tw-mt-0.5">{benefit.desc}</p>
                </div>
            </div>

            <div className="tw-bg-[#F8F9FC] tw-rounded-xl tw-p-4 tw-text-center">
                <div className="tw-flex tw-justify-center tw-mb-2">
                    <canvas ref={canvasRef} className="tw-w-full tw-max-w-[220px] tw-h-[36px] mix-blend-multiply" />
                </div>
                <p className="tw-font-mono tw-text-[11.5px] tw-font-bold tw-text-[#B5B9D6]">{benefit.code}</p>
            </div>

            <div className="tw-mt-3 tw-grid tw-grid-cols-2 tw-gap-2">
                <button onClick={handleCopy}
                    className="tw-py-2.5 tw-rounded-lg tw-text-[12.5px] tw-font-bold tw-flex tw-items-center tw-justify-center tw-gap-1.5 tw-bg-[#F1F2F8] tw-text-[#4C58D6] tw-transition-colors">
                    {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? '복사됨' : '코드 복사'}
                </button>
                <button onClick={() => downloadCouponImage(benefit)}
                    className="tw-py-2.5 tw-rounded-lg tw-text-[12.5px] tw-font-bold tw-text-white tw-bg-[#4C58D6] tw-flex tw-items-center tw-justify-center tw-gap-1.5">
                    <Download size={14} /> 쿠폰 다운로드
                </button>
            </div>
        </div>
    );
}

/* ─── 네이버 로그인 모달 (깔끔한 버전, 리드 수집용) ─── */
function LoginModal({ open, onClose, onLogin }: { open: boolean; onClose: () => void; onLogin: () => void }) {
    if (!open) return null;
    return (
        <div className="tw-fixed tw-inset-0 tw-z-[100] tw-flex tw-items-center tw-justify-center tw-px-6"
            style={{ background: 'rgba(35,40,57,0.45)' }}>
            <div className="tw-w-full tw-bg-white tw-rounded-2xl tw-overflow-hidden tw-relative" style={{ maxWidth: 320 }}>
                <button onClick={onClose} aria-label="닫기"
                    className="tw-absolute tw-top-4 tw-right-4 tw-text-[#B5B9D6]">
                    <X size={18} />
                </button>

                <div className="tw-px-6 tw-pt-8 tw-pb-5">
                    <div className="tw-w-11 tw-h-11 tw-rounded-xl tw-bg-[#EEF0FE] tw-text-[#4C58D6] tw-flex tw-items-center tw-justify-center tw-mb-4">
                        <Gift size={20} />
                    </div>
                    <p className="tw-text-[#232839] tw-font-bold tw-text-[16.5px] tw-mb-1.5">비즈팅 관심고객 등록</p>
                    <p className="tw-text-[12.5px] tw-text-[#8B90A6] tw-leading-relaxed">
                        네이버 로그인 한 번으로 다음 이벤트 소식까지 받아볼 수 있어요. 고객정보 입력은 필요 없습니다.
                    </p>
                </div>

                <div className="tw-px-6 tw-pb-6 tw-flex tw-flex-col tw-gap-2">
                    <button onClick={onLogin}
                        className="tw-w-full tw-py-3.5 tw-rounded-xl tw-text-[14px] tw-font-bold tw-text-white tw-bg-[#03C75A]">
                        네이버로 등록하기
                    </button>
                    <button onClick={onClose}
                        className="tw-w-full tw-py-2.5 tw-rounded-xl tw-text-[13px] tw-font-medium tw-text-[#8B90A6]">
                        다음에 할게요
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ════════════════ 메인 컴포넌트 ════════════════ */
export default function BiztingEventLandingOpen() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const { unlocked, openLogin } = useNaverLogin(
        NAVER_LOGIN.Personalbizting.code,
        NAVER_LOGIN.Personalbizting.pageId,
    );

    useEffect(() => {
        if (unlocked) setShowLoginModal(false);
    }, [unlocked]);

    const handleLogin = useCallback(() => {
        openLogin();
    }, [openLogin]);

    return (
        <div className="tw-max-w-md tw-mx-auto tw-min-h-screen tw-relative" style={{ background: '#F8F9FC', fontFamily: "'Noto Sans KR', sans-serif" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;800;900&display=swap');
                .bt-hero-wrap { background: linear-gradient(165deg,#E9EBFB 0%,#F3F1FC 55%,#FBF3EF 100%); }
            `}</style>

            {/* 목업 안내 배너 */}
            <div className="tw-bg-[#232839] tw-text-white tw-text-[10.5px] tw-font-semibold tw-text-center tw-py-1.5 tw-px-4 tw-tracking-wide">
                랜딩페이지 목업입니다 · 비즈팅 제작 서비스 예시 페이지입니다
            </div>

            <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} onLogin={handleLogin} />

            <HeroCarousel />

            {/* 서비스 소개 */}
            <div className="tw-px-5 tw-pt-7 tw-pb-2">
                <h2 className="tw-text-[16.5px] tw-font-extrabold tw-text-[#232839] tw-mb-1">
                    비즈팅은 이런 서비스예요
                </h2>
                <p className="tw-text-[12.5px] tw-text-[#8B90A6] tw-mb-4">고객정보 없이도 발송 가능한 메시지 솔루션</p>
                <div className="tw-space-y-2.5">
                    {FEATURES.map(f => {
                        const Icon = f.icon;
                        return (
                            <div key={f.title} className="tw-bg-white tw-rounded-xl tw-p-4 tw-flex tw-items-center tw-gap-3.5 tw-border tw-border-[#EEF0F6]">
                                <div className="tw-w-10 tw-h-10 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-shrink-0 tw-bg-[#EEF0FE] tw-text-[#4C58D6]">
                                    <Icon size={17} />
                                </div>
                                <div>
                                    <h3 className="tw-text-[13.5px] tw-font-bold tw-text-[#232839]">{f.title}</h3>
                                    <p className="tw-text-[11.5px] tw-text-[#8B90A6] tw-mt-0.5 tw-leading-snug">{f.desc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 이벤트 혜택 */}
            <div className="tw-px-5 tw-pt-7 tw-pb-6">
                <div className="tw-flex tw-items-center tw-gap-2 tw-mb-1">
                    <Gift className="tw-text-[#4C58D6]" size={17} />
                    <h2 className="tw-text-[16.5px] tw-font-extrabold tw-text-[#232839]">
                        오픈 기념 이벤트 혜택
                    </h2>
                </div>
                <p className="tw-text-[12.5px] tw-text-[#8B90A6] tw-mb-4">
                    누구나 바로 코드를 복사하거나 쿠폰을 다운로드할 수 있어요.
                </p>

                {unlocked && (
                    <div className="tw-mb-4 tw-rounded-xl tw-p-3.5 tw-flex tw-items-center tw-gap-3 tw-bg-[#E9F9F1] tw-border tw-border-[#D6F3E4]">
                        <Check size={18} className="tw-text-[#1FA971]" />
                        <p className="tw-text-[12px] tw-font-bold tw-text-[#1B8F60]">관심고객 등록 완료! 다음 소식도 챙겨드릴게요</p>
                    </div>
                )}

                {BENEFITS.map(b => (
                    <BenefitCard key={b.id} benefit={b} />
                ))}
            </div>

            {/* 하단 안내 (고정 CTA와 겹치지 않도록 여백 확보) */}
            <div className={`tw-px-6 tw-pt-4 tw-text-center ${!unlocked ? 'tw-pb-28' : 'tw-pb-10'}`}>
                <p className="tw-text-[10.5px] tw-text-[#B5B9D6] tw-leading-relaxed">
                    * 본 페이지는 비즈팅 랜딩페이지 제작 서비스 소개를 위한 목업(예시)입니다.<br />
                    실제 이벤트가 아니며, 표기된 혜택·코드는 데모용 샘플입니다.<br />
                    문의 · bizting.co.kr
                </p>
            </div>

            {/* 하단 고정 CTA — 리드 수집(관심고객 등록) */}
            {!unlocked && (
                <div className="tw-fixed tw-bottom-0 tw-left-0 tw-right-0 tw-max-w-md tw-mx-auto tw-p-4 tw-bg-white/95 tw-backdrop-blur-md tw-border-t tw-border-[#EEF0F6] tw-z-30">
                    <button onClick={() => setShowLoginModal(true)}
                        className="tw-w-full tw-py-4 tw-rounded-xl tw-text-[15px] tw-font-bold tw-text-white tw-bg-[#4C58D6] tw-flex tw-items-center tw-justify-center tw-gap-2">
                        <Sparkles size={16} /> 이벤트 혜택 받기
                    </button>
                </div>
            )}
        </div>
    );
}
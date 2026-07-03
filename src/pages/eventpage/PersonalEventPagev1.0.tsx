import React, { useState, useEffect, useRef, useCallback } from 'react';
import JsBarcode from 'jsbarcode';
import {
    Sparkles, Users, Send, TrendingUp, ShieldCheck, Zap, X, Copy, Check,
    Download, ChevronLeft, ChevronRight, Gift, MessageCircle, Lock,
} from 'lucide-react';
import { useNaverLogin } from '../../hooks/useNaverLogin';
import { NAVER_LOGIN } from '../../config/naverLogin';

/* ════════════════════════════════════════════════════════════════════
   BIZTING 이벤트 랜딩페이지 · 목업 (v1 · 로그인 잠금형)
   ------------------------------------------------------------------
   ⚠️ 이 파일은 비즈팅의 "랜딩페이지 제작" 서비스를 소개하기 위해
   고객사에게 보여드리는 예시(목업) 산출물입니다. 실제 이벤트 데이터가
   아닙니다.

   이 버전은 혜택(쿠폰) 영역이 네이버 로그인 전까지 블러 처리되며,
   로그인 완료 시 바코드/코드가 활성화되는 "리드 수집형" 구성입니다.
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
        title: '관심고객 등록하고\n혜택 받아보세요',
        desc: '네이버 로그인 한 번이면 끝. 첫 프로젝트 특별 혜택을 확인해보세요.',
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
function useBarcode(code: string, canvasRef: React.RefObject<HTMLCanvasElement | null>, active: boolean) {
    useEffect(() => {
        if (active && canvasRef.current && code) {
            JsBarcode(canvasRef.current, code, {
                format: 'CODE128', width: 2, height: 46, displayValue: false,
                background: 'transparent', lineColor: '#2B2450', margin: 0,
            });
        }
    }, [code, active]);
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
        format: 'CODE128', width: 3, height: 70, displayValue: false,
        background: '#ffffff', lineColor: '#2B2450', margin: 0,
    });

    const W = 640, H = 380;
    const canvas = document.createElement('canvas');
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d')!;

    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, '#7C6FF0');
    grad.addColorStop(1, '#5B4FD1');
    roundRect(ctx, 0, 0, W, H, 32);
    ctx.fillStyle = grad;
    ctx.fill();

    roundRect(ctx, 20, 20, W - 40, H - 40, 24);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    ctx.fillStyle = '#7C6FF0';
    ctx.font = '700 18px "Noto Sans KR", sans-serif';
    ctx.fillText('BIZTING EVENT COUPON', 44, 64);

    ctx.fillStyle = '#2B2450';
    ctx.font = '800 27px "Noto Sans KR", sans-serif';
    ctx.fillText(benefit.title, 44, 106);

    ctx.fillStyle = '#6B6489';
    ctx.font = '400 15px "Noto Sans KR", sans-serif';
    ctx.fillText(benefit.desc, 44, 136);

    ctx.strokeStyle = '#ECE9FB';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(44, 168);
    ctx.lineTo(W - 44, 168);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.drawImage(barcodeCanvas, 44, 196, W - 88, 76);

    ctx.fillStyle = '#6B6489';
    ctx.font = '600 15px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(benefit.code, W / 2, 308);

    ctx.fillStyle = '#B7B0E8';
    ctx.font = '500 12px "Noto Sans KR", sans-serif';
    ctx.fillText('bizting.co.kr · 랜딩페이지 목업 예시', W / 2, 340);
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
        <div className="bt-hero-wrap tw-relative tw-rounded-b-[2.5rem] tw-overflow-hidden">
            <div className="bt-blob bt-blob-a" />
            <div className="bt-blob bt-blob-b" />
            <div className="bt-msg bt-msg-1"><MessageCircle size={16} /></div>
            <div className="bt-msg bt-msg-2"><Sparkles size={14} /></div>

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
                    <div key={s.id} className="tw-w-full tw-shrink-0 tw-px-6 tw-pt-12 tw-pb-9 tw-relative tw-z-10">
                        <span className="tw-inline-block tw-text-[11px] tw-font-bold tw-text-white/80 tw-bg-white/15 tw-px-3 tw-py-1 tw-rounded-full tw-mb-4 tw-backdrop-blur-sm">
                            {s.eyebrow}
                        </span>
                        <h1 className="tw-text-white tw-font-black tw-text-[26px] tw-leading-[1.3] tw-whitespace-pre-line tw-mb-3" style={{ fontFamily: "'Jua', sans-serif" }}>
                            {s.title}
                        </h1>
                        <p className="tw-text-white/85 tw-text-[13.5px] tw-leading-relaxed tw-mb-5 tw-max-w-[92%]">
                            {s.desc}
                        </p>
                        <div className="tw-rounded-[1.5rem] tw-overflow-hidden tw-shadow-lg" style={{ aspectRatio: '16/9' }}>
                            <img src={s.img} alt="" className="tw-w-full tw-h-full tw-object-cover" />
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={() => go(idx - 1)} aria-label="이전 슬라이드"
                className="tw-absolute tw-left-2 tw-top-1/2 -tw-translate-y-1/2 tw-z-20 tw-w-8 tw-h-8 tw-bg-white/20 tw-backdrop-blur-sm tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-white">
                <ChevronLeft size={16} />
            </button>
            <button onClick={() => go(idx + 1)} aria-label="다음 슬라이드"
                className="tw-absolute tw-right-2 tw-top-1/2 -tw-translate-y-1/2 tw-z-20 tw-w-8 tw-h-8 tw-bg-white/20 tw-backdrop-blur-sm tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-white">
                <ChevronRight size={16} />
            </button>

            <div className="tw-absolute tw-bottom-4 tw-left-0 tw-right-0 tw-flex tw-justify-center tw-gap-1.5 tw-z-20">
                {HERO_SLIDES.map((s, i) => (
                    <button key={s.id} onClick={() => go(i)} aria-label={`${i + 1}번 슬라이드로 이동`}
                        className="tw-transition-all tw-rounded-full"
                        style={{ width: i === idx ? 18 : 6, height: 6, background: i === idx ? '#fff' : 'rgba(255,255,255,0.45)' }} />
                ))}
            </div>
        </div>
    );
}

/* ─── 혜택 카드 (잠금형) ─── */
function BenefitCard({ benefit, unlocked, onRequestLogin }: { benefit: Benefit; unlocked: boolean; onRequestLogin: () => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [copied, setCopied] = useState(false);
    useBarcode(benefit.code, canvasRef, unlocked);
    const Icon = benefit.icon;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(benefit.code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch { /* clipboard unavailable */ }
    };

    return (
        <div className="bt-card tw-relative tw-bg-white tw-rounded-[1.7rem] tw-p-5 tw-mb-3.5 tw-shadow-sm">
            <div className="tw-flex tw-items-center tw-gap-3 tw-mb-4">
                <div className="tw-w-11 tw-h-11 tw-rounded-2xl tw-flex tw-items-center tw-justify-center tw-shrink-0 tw-text-white" style={{ background: 'linear-gradient(135deg,#7C6FF0,#5B4FD1)' }}>
                    <Icon size={20} />
                </div>
                <div className="tw-flex-1 tw-min-w-0">
                    <span className="tw-inline-block tw-text-[10.5px] tw-font-bold tw-text-[#FF7A50] tw-bg-[#FFF1EB] tw-px-2 tw-py-0.5 tw-rounded-md tw-mb-1">
                        {benefit.tag}
                    </span>
                    <h3 className="tw-text-[14.5px] tw-font-extrabold tw-text-[#2B2450] tw-leading-snug">{benefit.title}</h3>
                    <p className="tw-text-[11.5px] tw-text-[#8A84AD] tw-mt-0.5">{benefit.desc}</p>
                </div>
            </div>

            <div className="tw-relative tw-bg-[#F8F6FF] tw-rounded-2xl tw-p-4 tw-text-center" style={{ minHeight: 112 }}>
                {!unlocked && (
                    <div
                        className="tw-absolute tw-inset-0 tw-rounded-2xl tw-z-10 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2 tw-px-4"
                        style={{ backdropFilter: 'blur(7px)', background: 'rgba(248,246,255,0.7)' }}
                    >
                        <Lock size={16} className="tw-text-[#7C6FF0]" />
                        <p className="tw-text-[11.5px] tw-font-bold tw-text-[#6B6489]">관심고객 등록 후 확인 가능</p>
                        <button
                            onClick={onRequestLogin}
                            className="tw-w-full tw-py-2.5 tw-rounded-xl tw-text-[12.5px] tw-font-bold tw-text-white tw-flex tw-items-center tw-justify-center tw-gap-1.5"
                            style={{ background: 'linear-gradient(135deg,#7C6FF0,#5B4FD1)' }}
                        >
                            <Gift size={14} /> 혜택 코드 열어보기
                        </button>
                    </div>
                )}
                <div className="tw-flex tw-justify-center tw-mb-2">
                    <canvas ref={canvasRef} className="tw-w-full tw-max-w-[230px] tw-h-[38px] mix-blend-multiply" />
                </div>
                <p className="tw-font-mono tw-text-[11.5px] tw-font-bold tw-text-[#B7B0E8]">{benefit.code}</p>
            </div>

            {unlocked && (
                <div className="tw-mt-3 tw-grid tw-grid-cols-2 tw-gap-2">
                    <button onClick={handleCopy}
                        className="tw-py-2.5 tw-rounded-xl tw-text-[12.5px] tw-font-bold tw-flex tw-items-center tw-justify-center tw-gap-1.5 tw-bg-[#F0EDFF] tw-text-[#5B4FD1] tw-transition-colors">
                        {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? '복사됨' : '코드 복사'}
                    </button>
                    <button onClick={() => downloadCouponImage(benefit)}
                        className="tw-py-2.5 tw-rounded-xl tw-text-[12.5px] tw-font-bold tw-text-white tw-flex tw-items-center tw-justify-center tw-gap-1.5"
                        style={{ background: 'linear-gradient(135deg,#FF9770,#FF7A50)' }}>
                        <Download size={14} /> 쿠폰 다운로드
                    </button>
                </div>
            )}
        </div>
    );
}

/* ─── 네이버 로그인 모달 ─── */
function LoginModal({ open, onClose, onLogin }: { open: boolean; onClose: () => void; onLogin: () => void }) {
    if (!open) return null;
    return (
        <div className="tw-fixed tw-inset-0 tw-z-[100] tw-flex tw-items-center tw-justify-center tw-px-6"
            style={{ background: 'rgba(43,36,80,0.55)', backdropFilter: 'blur(4px)' }}>
            <div className="tw-w-full tw-bg-white tw-rounded-[1.8rem] tw-overflow-hidden" style={{ maxWidth: 340 }}>
                <div className="tw-px-6 tw-pt-8 tw-pb-6 tw-text-center tw-relative" style={{ background: 'linear-gradient(135deg,#7C6FF0,#5B4FD1)' }}>
                    <button onClick={onClose} className="tw-absolute tw-top-3 tw-right-3 tw-text-white/70">
                        <X size={18} />
                    </button>
                    <div className="tw-text-[42px] tw-mb-2">💌</div>
                    <p className="tw-text-white tw-font-black tw-text-[18px]">비즈팅 관심고객이 되어보세요</p>
                    <p className="tw-text-[12px] tw-mt-1.5 tw-text-white/80">네이버 로그인 한 번으로 이벤트 혜택 오픈</p>
                </div>
                <div className="tw-px-6 tw-pt-5 tw-pb-2 tw-space-y-2.5">
                    {[
                        { icon: '🎁', text: '등록 즉시 이벤트 혜택 전체 오픈' },
                        { icon: '📩', text: '고객정보 입력 없이 소식만 받아보기' },
                        { icon: '🙅', text: '언제든 수신 거부 가능' },
                    ].map(item => (
                        <div key={item.text} className="tw-flex tw-items-center tw-gap-3">
                            <span className="tw-text-[16px]">{item.icon}</span>
                            <span className="tw-text-[12.5px] tw-font-medium tw-text-[#4A4470]">{item.text}</span>
                        </div>
                    ))}
                </div>
                <div className="tw-px-6 tw-py-5 tw-flex tw-flex-col tw-gap-2.5">
                    <button onClick={onLogin}
                        className="tw-w-full tw-py-3.5 tw-rounded-2xl tw-text-[14px] tw-font-bold tw-text-white tw-bg-[#03C75A]">
                        네이버로 3초 만에 등록하기
                    </button>
                    <button onClick={onClose}
                        className="tw-w-full tw-py-3 tw-rounded-2xl tw-text-[13px] tw-font-medium tw-text-[#B7B0E8] tw-bg-[#F8F6FF]">
                        다음에 할게요
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ════════════════ 메인 컴포넌트 ════════════════ */
export default function BiztingEventLandingLocked() {
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
        <div className="tw-max-w-md tw-mx-auto tw-min-h-screen tw-relative tw-overflow-hidden" style={{ background: '#F8F6FF', fontFamily: "'Noto Sans KR', sans-serif" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Jua&family=Noto+Sans+KR:wght@400;500;700;800;900&display=swap');
                .bt-hero-wrap { background: linear-gradient(155deg,#8A7DF5 0%,#5B4FD1 65%,#4A3FB8 100%); }
                .bt-blob { position:absolute; border-radius:9999px; filter:blur(2px); opacity:0.35; z-index:0; }
                .bt-blob-a { width:180px; height:180px; background:#FF9770; top:-60px; right:-50px; animation: bt-float 7s ease-in-out infinite; }
                .bt-blob-b { width:120px; height:120px; background:#9DFFE0; bottom:-30px; left:-30px; animation: bt-float 8s ease-in-out infinite reverse; }
                @keyframes bt-float { 0%,100% { transform: translateY(0) scale(1); } 50% { transform: translateY(14px) scale(1.05); } }
                .bt-msg { position:absolute; z-index:1; color:#fff; opacity:0.55; animation: bt-drift 6s ease-in-out infinite; }
                .bt-msg-1 { top: 22%; left: 8%; animation-delay: 0.5s; }
                .bt-msg-2 { top: 68%; right: 10%; animation-delay: 1.5s; }
                @keyframes bt-drift { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
                .bt-card { transition: box-shadow .2s ease; }
                .bt-tag-note { border: 1.5px dashed #D8D2FF; }
            `}</style>

            {/* 목업 안내 배너 */}
            <div className="tw-bg-[#2B2450] tw-text-white tw-text-[10.5px] tw-font-semibold tw-text-center tw-py-1.5 tw-px-4 tw-tracking-wide">
                ✦ 랜딩페이지 목업입니다 · 비즈팅 제작 서비스 예시 페이지입니다 ✦
            </div>

            <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} onLogin={handleLogin} />

            <HeroCarousel />

            {/* 서비스 소개 */}
            <div className="tw-px-5 tw-pt-7 tw-pb-2">
                <h2 className="tw-text-[17px] tw-font-black tw-text-[#2B2450] tw-mb-1" style={{ fontFamily: "'Jua', sans-serif" }}>
                    비즈팅은 이런 서비스예요
                </h2>
                <p className="tw-text-[12.5px] tw-text-[#8A84AD] tw-mb-4">고객정보 없이도 발송 가능한 메시지 솔루션</p>
                <div className="tw-space-y-2.5">
                    {FEATURES.map(f => {
                        const Icon = f.icon;
                        return (
                            <div key={f.title} className="tw-bg-white tw-rounded-2xl tw-p-4 tw-flex tw-items-center tw-gap-3.5 tw-shadow-sm">
                                <div className="tw-w-10 tw-h-10 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-shrink-0 tw-bg-[#F0EDFF] tw-text-[#5B4FD1]">
                                    <Icon size={18} />
                                </div>
                                <div>
                                    <h3 className="tw-text-[13.5px] tw-font-extrabold tw-text-[#2B2450]">{f.title}</h3>
                                    <p className="tw-text-[11.5px] tw-text-[#8A84AD] tw-mt-0.5 tw-leading-snug">{f.desc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 이벤트 혜택 */}
            <div className="tw-px-5 tw-pt-7 tw-pb-28">
                <div className="tw-flex tw-items-center tw-gap-2 tw-mb-1">
                    <Gift className="tw-text-[#FF7A50]" size={18} />
                    <h2 className="tw-text-[17px] tw-font-black tw-text-[#2B2450]" style={{ fontFamily: "'Jua', sans-serif" }}>
                        오픈 기념 이벤트 혜택
                    </h2>
                </div>
                <p className="tw-text-[12.5px] tw-text-[#8A84AD] tw-mb-4">
                    {unlocked ? '관심고객 등록이 완료됐어요. 아래 혜택을 자유롭게 사용해보세요.' : '관심고객으로 등록하면 아래 혜택이 모두 열려요.'}
                </p>

                {unlocked && (
                    <div className="tw-mb-4 tw-rounded-2xl tw-p-3.5 tw-flex tw-items-center tw-gap-3 tw-bg-[#E7FBF3]">
                        <span className="tw-text-[20px]">🎉</span>
                        <p className="tw-text-[12px] tw-font-bold tw-text-[#0F9D6B]">등록 완료! 혜택 코드가 모두 열렸어요</p>
                    </div>
                )}

                {BENEFITS.map(b => (
                    <BenefitCard key={b.id} benefit={b} unlocked={unlocked} onRequestLogin={() => setShowLoginModal(true)} />
                ))}
            </div>

            {/* 하단 고정 CTA */}
            {!unlocked && (
                <div className="tw-fixed tw-bottom-0 tw-left-0 tw-right-0 tw-max-w-md tw-mx-auto tw-p-4 tw-bg-white/90 tw-backdrop-blur-md tw-border-t tw-border-[#ECE9FB] tw-z-30">
                    <button onClick={() => setShowLoginModal(true)}
                        className="tw-w-full tw-py-4 tw-rounded-2xl tw-text-[15px] tw-font-bold tw-text-white tw-flex tw-items-center tw-justify-center tw-gap-2 tw-shadow-lg"
                        style={{ background: 'linear-gradient(135deg,#7C6FF0,#5B4FD1)' }}>
                        <Sparkles size={17} /> 이벤트 혜택 받기
                    </button>
                </div>
            )}

            {/* 하단 안내 */}
            <div className="tw-px-6 tw-pb-8 tw-pt-4 tw-text-center">
                <p className="tw-text-[10.5px] tw-text-[#B7B0E8] tw-leading-relaxed">
                    * 본 페이지는 비즈팅 랜딩페이지 제작 서비스 소개를 위한 목업(예시)입니다.<br />
                    실제 이벤트가 아니며, 표기된 혜택·코드는 데모용 샘플입니다.<br />
                    문의 · bizting.co.kr
                </p>
            </div>
        </div>
    );
}
import React, {ReactNode, useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import ClauseVersionModal from "./ClauseVersionModal"
type ClauseStaticDocumentProps = {
    styles?: string;
    modal?: {
        title: string;
        subtitle?: string;
        ctaLabel: string;
        ctaRoute: string;
        content: ReactNode;
    };
    children?: ReactNode;
};

const ClauseStaticDocument = ({styles, modal, children}: ClauseStaticDocumentProps) => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const mergedStyles = useMemo(() => `${styles || ""}\n.modal-overlay{display:none !important;}`, [styles]);

    useEffect(() => {
        let frameId: number | null = null;

        if (modal) {
            frameId = window.requestAnimationFrame(() => {
                setModalOpen(true);
                window.scrollTo({top: 0, behavior: "auto"});
            });
        }

        return () => {
            if (frameId != null) {
                window.cancelAnimationFrame(frameId);
            }
            document.body.style.overflow = "";
        };
    }, [modal]);

    useEffect(() => {
        document.body.style.overflow = modalOpen ? "hidden" : "";

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setModalOpen(false);
            }
        };

        window.addEventListener("keydown", handleEscape);
        return () => {
            window.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [modalOpen]);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement | null;
        if (!target) {
            return;
        }

        const routeElement = target.closest<HTMLElement>("[data-route]");
        if (routeElement) {
            event.preventDefault();
            const route = routeElement.getAttribute("data-route");
            if (route) {
                navigate(route);
            }
            return;
        }

        const scrollTopElement = target.closest<HTMLElement>("[data-scroll-top='true']");
        if (scrollTopElement) {
            event.preventDefault();
            window.scrollTo({top: 0, behavior: "smooth"});
            return;
        }

        const modalActionElement = target.closest<HTMLElement>("[data-modal-action]");
        if (modalActionElement) {
            event.preventDefault();
            const action = modalActionElement.getAttribute("data-modal-action");
            setModalOpen(action === "open");
            return;
        }
    };

    return (
        <div className="tw-bg-slate-50 tw-min-h-screen tw-px-4 tw-py-8 md:tw-px-6 lg:tw-px-8">
            <div
                className="tw-mx-auto tw-max-w-6xl tw-rounded-2xl tw-border tw-border-slate-200 tw-bg-white tw-shadow-sm"
                onClick={handleClick}
            >
                {mergedStyles ? <style>{mergedStyles}</style> : null}
                {children}
            </div>
            {modal ? (
                <ClauseVersionModal
                    open={modalOpen}
                    title={modal.title}
                    subtitle={modal.subtitle}
                    ctaLabel={modal.ctaLabel}
                    onClose={() => setModalOpen(false)}
                    onConfirm={() => navigate(modal.ctaRoute)}
                >
                    {modal.content}
                </ClauseVersionModal>
            ) : null}
        </div>
    );
};

export default ClauseStaticDocument;

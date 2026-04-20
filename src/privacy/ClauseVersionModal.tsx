import React from "react";

type ClauseVersionModalProps = {
    open: boolean;
    title: string;
    subtitle?: string;
    ctaLabel: string;
    onClose: () => void;
    onConfirm: () => void;
    children: React.ReactNode;
};

const ClauseVersionModal = ({
    open,
    title,
    subtitle,
    ctaLabel,
    onClose,
    onConfirm,
    children
}: ClauseVersionModalProps) => {
    if (!open) {
        return null;
    }

    return (
        <div
            className="tw-fixed tw-inset-0 tw-z-[3000] tw-bg-[rgba(10,20,50,0.55)] tw-flex tw-justify-center tw-items-start tw-overflow-y-auto tw-px-4 tw-pt-5 tw-pb-6"
            onClick={onClose}
        >
            <div
                className="tw-w-full tw-max-w-[620px] tw-overflow-hidden tw-rounded-2xl tw-bg-white tw-shadow-[0_24px_60px_rgba(0,0,0,0.22)]"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="tw-flex tw-items-start tw-justify-between tw-gap-3 tw-bg-[linear-gradient(135deg,#081f4a,#1a3a80)] tw-px-7 tw-py-6">
                    <div>
                        <h2 className="tw-text-[17px] tw-font-bold tw-leading-[1.4] tw-text-white">{title}</h2>
                        {subtitle ? (
                            <p className="tw-mt-1 tw-text-[12.5px] tw-text-white/60">{subtitle}</p>
                        ) : null}
                    </div>
                    <button
                        type="button"
                        className="tw-ml-3 tw-flex tw-h-[30px] tw-w-[30px] tw-shrink-0 tw-items-center tw-justify-center tw-rounded-md tw-border-0 tw-bg-white/15 tw-text-[18px] tw-text-white"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>
                <div className="tw-px-7 tw-py-7">
                    {children}
                    <div className="tw-mt-5 tw-text-center">
                        <button
                            type="button"
                            className="tw-inline-block tw-rounded-lg tw-border-0 tw-bg-[#1a6ef5] tw-px-5 tw-py-3 tw-text-[13px] tw-font-semibold tw-text-white"
                            onClick={onConfirm}
                        >
                            {ctaLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClauseVersionModal;

import { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import type { Report } from './reportData';

type Props = {
  campaigns: Report[];
  selected: Report;
  onSelect: (id: string) => void;
};

/** 같은 날 발송한 캠페인을 화면 이동 없이 바꿔 보는 드롭다운 */
export default function CampaignPicker({ campaigns, selected, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;

    function dismissOutside(event: PointerEvent) {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(false);
    }

    function dismissOnEscape(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      setOpen(false);
      trigger.current?.focus();
    }

    document.addEventListener('pointerdown', dismissOutside);
    document.addEventListener('keydown', dismissOnEscape);
    return () => {
      document.removeEventListener('pointerdown', dismissOutside);
      document.removeEventListener('keydown', dismissOnEscape);
    };
  }, [open]);

  return (
    <div ref={root} className="tw-report-picker"
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
      <p className="tw-report-picker-label">금일 발송 캠페인 <strong>{campaigns.length}건</strong></p>
      <button ref={trigger} type="button" className="tw-report-picker-trigger" aria-expanded={open} aria-controls={listId}
        onClick={() => setOpen(!open)}>
        <span className="tw-report-picker-time">{selected.sendTime}</span>
        <span className="tw-report-picker-name">{selected.name}</span>
        <span className="tw-report-picker-action">변경 <ChevronDown size={18} aria-hidden="true" /></span>
      </button>
      <ul id={listId} className="tw-report-picker-list" aria-label="캠페인 선택" hidden={!open}>
        {campaigns.map((campaign) => {
          const current = campaign.id === selected.id;
          return (
            <li key={campaign.id}>
              <button type="button" aria-current={current ? 'true' : undefined} onClick={() => {
                setOpen(false);
                trigger.current?.focus();
                if (!current) onSelect(campaign.id);
              }}>
                <span className="tw-report-picker-time">{campaign.sendTime}</span>
                <span className="tw-report-picker-name">{campaign.name}</span>
                {current && <Check size={18} aria-hidden="true" />}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

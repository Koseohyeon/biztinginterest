import { useEffect, useId, useRef, useState } from 'react';
import { Info } from 'lucide-react';

export default function InfoTip({ label, children, note }: { label: string; children: React.ReactNode; note?: string }) {
  const [mode, setMode] = useState<'hover' | 'tap' | 'keyboard' | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const pointerType = useRef('');
  const tooltipId = useId();
  const open = mode !== null;

  useEffect(() => {
    if (!open) return;

    function dismissOutside(event: PointerEvent) {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setMode(null);
    }

    function dismissOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setMode(null);
    }

    document.addEventListener('pointerdown', dismissOutside);
    document.addEventListener('keydown', dismissOnEscape);
    return () => {
      document.removeEventListener('pointerdown', dismissOutside);
      document.removeEventListener('keydown', dismissOnEscape);
    };
  }, [open]);

  return (
    <div ref={root} className="tw-report-tip" data-note={note ? true : undefined} data-mode={mode ?? undefined}
      onPointerEnter={(event) => { if (event.pointerType === 'mouse') setMode('hover'); }}
      onPointerLeave={(event) => {
        if (event.pointerType === 'mouse') setMode((current) => current === 'hover' ? null : current);
      }}>
      <button type="button" aria-label={label + ' 안내'} aria-expanded={open} aria-describedby={open ? tooltipId : undefined}
        onPointerDown={(event) => { pointerType.current = event.pointerType; }}
        onFocus={(event) => {
          if (event.currentTarget.matches(':focus-visible')) setMode((current) => current ?? 'keyboard');
        }}
        onBlur={() => setMode((current) => current === 'keyboard' ? null : current)}
        onClick={(event) => {
          if (event.detail === 0) setMode((current) => current === 'keyboard' ? null : 'keyboard');
          else if (pointerType.current !== 'mouse') setMode((current) => current === 'tap' ? null : 'tap');
        }}>
        <Info size={16} aria-hidden="true" />
      </button>
      <div id={tooltipId} className="tw-report-tip-copy" role="tooltip" hidden={!open}>
        {children}
        {note && <div className="tw-report-tip-note">{note}</div>}
      </div>
    </div>
  );
}

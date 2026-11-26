"use client";

import Image from "next/image";
import { useEffect, useRef, type KeyboardEvent, type MouseEvent } from "react";
import { useSwipe } from "./use-swipe";

export interface Screen {
  src: string;
  alt: string;
}

interface ScreenViewerProps {
  screens: readonly Screen[];
  /** the screen open in the viewer, or null while it is closed */
  index: number | null;
  onIndexChange: (index: number | null) => void;
  labels: {
    close: string;
    prev: string;
    next: string;
  };
}

/**
 * A project's screens large, in the browser's modal <dialog>: Escape or the backdrop closes it, the
 * arrow keys, the buttons and a swipe step through every screen (looping), the count shows where
 * the visitor is. The parent owns which screen is open, so any list of thumbnails can open it.
 */
export function ScreenViewer({ screens, index, onIndexChange, labels }: ScreenViewerProps) {
  const count = screens.length;
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (index !== null && !el.open) el.showModal();
    if (index === null && el.open) el.close();
  }, [index]);

  const step = (by: number) => {
    if (index === null || count < 2) return;
    onIndexChange((index + by + count) % count);
  };
  const swipe = useSwipe(step);

  function onKey(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  }
  function onBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) onIndexChange(null);
  }

  const big = index === null ? null : screens[index];

  return (
    <dialog
      ref={dialog}
      className="pd-viewer"
      aria-label={big?.alt}
      onClose={() => onIndexChange(null)}
      onKeyDown={onKey}
      onClick={onBackdrop}
      {...swipe}
    >
      {big ? (
        <div className="pd-viewer__inner">
          <div className="pd-viewer__bar">
            <span className="pd-viewer__count">
              {(index ?? 0) + 1} / {count}
            </span>
            <button type="button" className="pd-viewer__btn" onClick={() => onIndexChange(null)} aria-label={labels.close}>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>
          </div>
          <figure className="pd-viewer__frame">
            <Image src={big.src} alt={big.alt} fill sizes="92vw" />
          </figure>
          {count > 1 ? (
            <div className="pd-viewer__nav">
              <button type="button" className="pd-viewer__btn" onClick={() => step(-1)} aria-label={labels.prev}>
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M10 3 5 8l5 5" />
                </svg>
              </button>
              <button type="button" className="pd-viewer__btn" onClick={() => step(1)} aria-label={labels.next}>
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M6 3l5 5-5 5" />
                </svg>
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </dialog>
  );
}

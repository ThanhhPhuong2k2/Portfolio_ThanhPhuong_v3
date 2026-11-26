"use client";

import Image from "next/image";
import { useEffect, useRef, type MouseEvent } from "react";
import type { Screen } from "./ScreenViewer";

interface ScreenGridProps {
  screens: readonly Screen[];
  open: boolean;
  onClose: () => void;
  /** a screen picked in the grid: the parent closes the grid and opens it large */
  onPick: (index: number) => void;
  labels: {
    title: string;
    close: string;
    open: string;
  };
}

/**
 * Every screen of a project at once, in the browser's modal <dialog> (owner's ask: "view all
 * screenshots"): a grid of thumbnails under a title and a close button. Escape or the backdrop closes
 * it; a thumbnail hands its index to the parent, which opens the viewer on it. The pictures load only
 * once the grid is open.
 */
export function ScreenGrid({ screens, open, onClose, onPick, labels }: ScreenGridProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  function onBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) onClose();
  }

  return (
    <dialog ref={dialog} className="pd-grid" aria-labelledby="pd-grid-title" onClose={onClose} onClick={onBackdrop}>
      {open ? (
        <div className="pd-grid__inner">
          <div className="pd-grid__bar">
            <h2 id="pd-grid-title" className="pd-grid__title">
              {labels.title} <span className="pd-grid__count">{screens.length}</span>
            </h2>
            <button type="button" className="pd-viewer__btn" onClick={onClose} aria-label={labels.close}>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>
          </div>
          <ul className="pd-grid__list">
            {screens.map((screen, i) => (
              <li key={screen.src}>
                <button
                  type="button"
                  className="pd-grid__tile"
                  onClick={() => onPick(i)}
                  aria-label={`${labels.open}: ${screen.alt}`}
                >
                  <Image src={screen.src} alt="" fill sizes="(max-width: 767px) 50vw, 320px" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </dialog>
  );
}

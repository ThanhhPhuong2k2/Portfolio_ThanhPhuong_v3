"use client";

import { useState, type MouseEvent } from "react";

interface JourneyMoreProps {
  /** "Xem thêm": the label while the chapter's longer text is folded */
  moreLabel: string;
  /** "Thu gọn": the label while it is open */
  lessLabel: string;
}

/**
 * A phone's "see more" for one journey chapter (owner's ask: a picture and one line a chapter on a
 * phone). It sets data-more on its chapter, and journey.css shows the chapter's longer text (its
 * place line, paragraph, achievements) only then. Hidden from 640px, where every chapter shows whole.
 * Without script the button is not drawn and nothing is folded (journey.css folds only under .mo-js).
 */
export function JourneyMore({ moreLabel, lessLabel }: JourneyMoreProps) {
  const [open, setOpen] = useState(false);

  function toggle(event: MouseEvent<HTMLButtonElement>) {
    const next = !open;
    event.currentTarget.closest(".journey__step")?.toggleAttribute("data-more", next);
    setOpen(next);
  }

  return (
    <button type="button" className="journey__more" aria-expanded={open} onClick={toggle}>
      {open ? lessLabel : moreLabel}
      <svg className="journey__more-icon" viewBox="0 0 12 12" aria-hidden="true">
        <path d="M3 4.5 6 7.5 9 4.5" />
      </svg>
    </button>
  );
}

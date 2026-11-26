import { useRef, type MouseEvent, type PointerEvent } from "react";

/** A sideways move at least this long (px), and mostly sideways, counts as a swipe. */
const SWIPE_MIN = 40;

/**
 * Swipe left/right on touch screens (and pens): left steps forward, right steps back. The mouse is
 * left alone, so clicks and text selection on desktops behave as before. A swipe swallows the click
 * that may follow it, so a swipe never opens or closes anything. Spread the result on the element.
 */
export function useSwipe(onSwipe: (by: 1 | -1) => void) {
  const start = useRef<{ id: number; x: number; y: number } | null>(null);
  const swiped = useRef(false);
  return {
    onPointerDown(event: PointerEvent<HTMLElement>) {
      swiped.current = false;
      if (event.pointerType === "mouse" || !event.isPrimary) return;
      start.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
    },
    onPointerUp(event: PointerEvent<HTMLElement>) {
      const from = start.current;
      start.current = null;
      if (!from || from.id !== event.pointerId) return;
      const dx = event.clientX - from.x;
      const dy = event.clientY - from.y;
      if (Math.abs(dx) < SWIPE_MIN || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      swiped.current = true;
      onSwipe(dx < 0 ? 1 : -1);
    },
    onPointerCancel() {
      start.current = null;
    },
    onClickCapture(event: MouseEvent<HTMLElement>) {
      if (!swiped.current) return;
      swiped.current = false;
      event.preventDefault();
      event.stopPropagation();
    },
  };
}

"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore, type FocusEvent } from "react";
import { ScreenGrid } from "./ScreenGrid";
import { ScreenViewer, type Screen } from "./ScreenViewer";
import { useSwipe } from "./use-swipe";

interface ProjectGalleryProps {
  screens: readonly Screen[];
  labels: {
    open: string;
    close: string;
    prev: string;
    next: string;
    viewAll: string;
    /** the grid's title */
    all: string;
  };
}

/** How long a screen stays before the gallery moves on by itself. */
const STEP_MS = 5000;

const REDUCED = "(prefers-reduced-motion: reduce)";
function subscribeReduced(change: () => void) {
  const q = window.matchMedia(REDUCED);
  q.addEventListener("change", change);
  return () => q.removeEventListener("change", change);
}

/**
 * A project's screens as one large slide with a row of thumbnails under it (owner's reference
 * layout): arrows at its sides, the count at its lower left, "view all" at its lower right.
 *
 * It moves on by itself every 5 s (owner's choice, no pause button). WCAG 2.2.2 is met by stopping
 * instead: it waits while pointed at, while the keyboard is in it, while off screen and while a
 * dialog is open, and it stops for good once the visitor steps it (an arrow, a thumbnail, a swipe);
 * under reduced motion it never moves by itself.
 *
 * The large slide opens the viewer on itself; "view all" opens the grid of every screen, and a
 * screen picked there opens the viewer. Only the screens reached so far and the neighbours of the one
 * in hand are mounted in the slide, so a long gallery does not load every picture at once.
 */
export function ProjectGallery({ screens, labels }: ProjectGalleryProps) {
  const count = screens.length;
  const root = useRef<HTMLDivElement>(null);
  const thumbs = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const [reached, setReached] = useState<ReadonlySet<number>>(() => new Set([0]));
  const [auto, setAuto] = useState(true);
  const [hold, setHold] = useState(false);
  const [visible, setVisible] = useState(false);
  const [viewer, setViewer] = useState<number | null>(null);
  const [grid, setGrid] = useState(false);
  const reduced = useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED).matches,
    () => true,
  );
  const running = count > 1 && auto && !hold && visible && !reduced && viewer === null && !grid;

  function go(to: number) {
    setActive(to);
    setReached((seen) => (seen.has(to) ? seen : new Set(seen).add(to)));
  }
  /** a step the visitor took: the gallery stops moving by itself for good */
  function pick(to: number) {
    setAuto(false);
    go(to);
  }
  const step = (by: number) => pick((active + by + count) % count);
  const swipe = useSwipe((by) => {
    if (count > 1) step(by);
  });

  // the gallery moves only while it is on screen
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry?.isIntersecting ?? false), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // the next step, once the screen in hand has stayed its time
  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => go((active + 1) % count), STEP_MS);
    return () => window.clearTimeout(timer);
  }, [running, active, count]);

  // the thumbnail in hand stays in sight: the row scrolls inside its own box, never the page
  useEffect(() => {
    const box = thumbs.current;
    const thumb = box?.children[active] as HTMLElement | undefined;
    if (!box || !thumb) return;
    const start = thumb.offsetLeft;
    if (start >= box.scrollLeft && start + thumb.offsetWidth <= box.scrollLeft + box.clientWidth) return;
    box.scrollTo({ left: Math.max(0, start - (box.clientWidth - thumb.offsetWidth) / 2), behavior: reduced ? "auto" : "smooth" });
  }, [active, reduced]);

  // the keyboard in the gallery holds it; leaving it lets it move on
  function onBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHold(false);
  }

  if (count === 0) return null;

  const shown = screens[active];
  const upNext = (active + 1) % count;
  const upPrev = (active - 1 + count) % count;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <>
      <div
        ref={root}
        className="pd-gallery"
        data-running={running || undefined}
        onMouseEnter={() => setHold(true)}
        onMouseLeave={() => setHold(false)}
        onFocus={() => setHold(true)}
        onBlur={onBlur}
      >
        <div className="pd-gallery__stage">
          <button
            type="button"
            className="pd-gallery__screen"
            onClick={() => setViewer(active)}
            aria-label={`${labels.open}: ${shown?.alt ?? ""}`}
            {...swipe}
          >
            {screens.map((screen, i) =>
              reached.has(i) || i === upNext || i === upPrev ? (
                <Image
                  key={screen.src}
                  className="pd-gallery__img"
                  data-on={i === active || undefined}
                  src={screen.src}
                  alt=""
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1023px) 100vw, 1312px"
                />
              ) : null,
            )}
          </button>
          {count > 1 ? (
            <>
              <button type="button" className="pd-gallery__arrow" data-dir="prev" onClick={() => step(-1)} aria-label={labels.prev}>
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M10 3 5 8l5 5" />
                </svg>
              </button>
              <button type="button" className="pd-gallery__arrow" data-dir="next" onClick={() => step(1)} aria-label={labels.next}>
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M6 3l5 5-5 5" />
                </svg>
              </button>
              {/* read aloud only once the visitor steps it, never on every timed step */}
              <p className="pd-gallery__count" aria-live={auto ? "off" : "polite"}>
                {active + 1} / {count}
              </p>
              <button type="button" className="pd-gallery__all" onClick={() => setGrid(true)}>
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M9.5 2.5h4v4M13.5 2.5 9 7M6.5 13.5h-4v-4M2.5 13.5 7 9" />
                </svg>
                {labels.viewAll}
              </button>
            </>
          ) : null}
        </div>

        {count > 1 ? (
          <ol ref={thumbs} className="pd-gallery__thumbs">
            {screens.map((screen, i) => (
              <li key={screen.src}>
                <button
                  type="button"
                  className="pd-gallery__thumb"
                  aria-current={i === active ? "true" : undefined}
                  onClick={() => pick(i)}
                  aria-label={`${pad(i + 1)}: ${screen.alt}`}
                >
                  <Image src={screen.src} alt="" fill sizes="(max-width: 767px) 40vw, 240px" />
                </button>
              </li>
            ))}
          </ol>
        ) : null}
      </div>

      <ScreenViewer
        screens={screens}
        index={viewer}
        onIndexChange={setViewer}
        labels={{ close: labels.close, prev: labels.prev, next: labels.next }}
      />
      <ScreenGrid
        screens={screens}
        open={grid}
        onClose={() => setGrid(false)}
        onPick={(i) => {
          setGrid(false);
          setViewer(i);
        }}
        labels={{ title: labels.all, close: labels.close, open: labels.open }}
      />
    </>
  );
}

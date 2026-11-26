"use client";

import { useEffect, useRef } from "react";

/**
 * Pauses a section's endless CSS animations while the section is off screen (performance audit:
 * the skills orbit and the projects wall kept turning on every frame of the page, wherever the
 * visitor was). Drop it inside the section: it sets data-idle on its closest <section> while the
 * section is out of view (with a 200px margin, so a turn never starts visibly late), and the
 * section's CSS pauses its animations under [data-idle]. Without script nothing is paused.
 */
export function PauseWhenHidden() {
  const probe = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = probe.current?.closest("section");
    if (!section) return;
    const io = new IntersectionObserver(
      ([entry]) => section.toggleAttribute("data-idle", !(entry?.isIntersecting ?? true)),
      { rootMargin: "200px 0px" },
    );
    io.observe(section);
    return () => {
      io.disconnect();
      section.removeAttribute("data-idle");
    };
  }, []);

  return <span ref={probe} hidden />;
}

"use client";

import { useEffect, useRef } from "react";
import { FIELD_LOGOS, type FieldLogo } from "./logos";

interface HeroLogoFieldProps {
  /** the logos and their places (the hero's by default) */
  logos?: readonly FieldLogo[];
  /** the canvas's class, which places it and sets its rest mask (the hero's by default) */
  className?: string;
}

/** One float: 9px each way over 8s (4s up, 4s down), as calm as the kit's loops. */
const AMPLITUDE = 9;
const PERIOD_MS = 8000;
/** A float of 9px over 4s needs no more than 30 frames a second (performance audit). */
const FRAME_MS = 1000 / 30;
/** The logos' soft edge, drawn once into each logo's sprite. */
const BLUR_PX = 1.2;

/**
 * The hero's logo field: the page's one effect (owner's ask), drawn on a canvas, a valid background
 * layer beside the .wrap (layout-v4.md). Faint, blurred, in the logos' own colours; it rests where
 * the words are (a radial CSS mask on the canvas, hero.css). It moves only while on screen and not
 * paused; below 1024px and under reduced motion it is drawn once and stays still.
 * Performance audit: each logo is blurred once into a sprite (never a filter per frame), the rest
 * over the name is a still CSS mask (never a composite per frame), and it draws at 30 frames a second.
 */
export function HeroLogoField({ logos = FIELD_LOGOS, className = "hero-logos" }: HeroLogoFieldProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const root = document.documentElement;
    const reducedQ = matchMedia("(prefers-reduced-motion: reduce)");
    // Below 1024 the hero is one column with no room for the pause disc: the field stays still.
    const phoneQ = matchMedia("(max-width: 1023px)");
    const images = logos.map((logo) => {
      const img = new Image();
      img.decoding = "async";
      img.src = `/assets/icons/${logo.file}`;
      return img;
    });

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let lastDrawn = -Infinity;
    let onScreen = true;
    /** each logo blurred once at the canvas's pixel ratio (and drawn white for a black mark at evening) */
    let sprites: (HTMLCanvasElement | null)[] = [];
    let spriteKey = "";

    const still = () => reducedQ.matches || phoneQ.matches;

    /** (re)draw the blurred sprites when the ratio or the theme changes, or a logo has loaded since */
    function buildSprites(dark: boolean) {
      const loaded = images.map((img) => (img.complete && img.naturalWidth ? 1 : 0)).join("");
      const key = `${dpr}|${dark}|${loaded}`;
      if (key === spriteKey) return;
      spriteKey = key;
      sprites = logos.map((logo, i) => {
        const img = images[i];
        if (!img?.complete || !img.naturalWidth) return null;
        const ratio = img.naturalWidth / img.naturalHeight;
        const w = ratio >= 1 ? logo.s : logo.s * ratio;
        const h = ratio >= 1 ? logo.s / ratio : logo.s;
        const pad = Math.ceil(BLUR_PX * 3);
        const sprite = document.createElement("canvas");
        sprite.width = Math.ceil((w + pad * 2) * dpr);
        sprite.height = Math.ceil((h + pad * 2) * dpr);
        const sctx = sprite.getContext("2d");
        if (!sctx) return null;
        sctx.scale(dpr, dpr);
        sctx.filter = `${logo.ink && dark ? "invert(1) " : ""}blur(${BLUR_PX}px) saturate(0.85)`;
        sctx.drawImage(img, pad, pad, w, h);
        return sprite;
      });
    }

    function draw(time: number) {
      if (!ctx) return;
      const dark = root.dataset.theme === "dark";
      buildSprites(dark);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx.globalAlpha = dark ? 0.22 : 0.16;

      logos.forEach((logo, i) => {
        const sprite = sprites[i];
        if (!sprite) return;
        // A phone shows half the logos: the stacked words take the screen's width.
        if (phoneQ.matches && i % 2 === 1) return;
        const lift = still() ? 0 : Math.sin(((time / PERIOD_MS) + logo.p) * Math.PI * 2) * AMPLITUDE;
        const cx = (logo.x / 100) * width * dpr;
        const cy = ((logo.y / 100) * height + lift) * dpr;
        ctx.drawImage(sprite, Math.round(cx - sprite.width / 2), Math.round(cy - sprite.height / 2));
      });
      ctx.globalAlpha = 1;
    }

    function loop(time: number) {
      if (time - lastDrawn >= FRAME_MS) {
        lastDrawn = time;
        draw(time);
      }
      frame = requestAnimationFrame(loop);
    }

    function update() {
      cancelAnimationFrame(frame);
      if (still() || !onScreen) {
        draw(0);
        return;
      }
      frame = requestAnimationFrame(loop);
    }

    function resize() {
      const box = canvas!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = box.width;
      height = box.height;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      update();
    }

    images.forEach((img) => img.addEventListener("load", () => update(), { once: true }));
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry?.isIntersecting ?? true;
      update();
    });
    io.observe(canvas);
    const mo = new MutationObserver(() => update());
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    reducedQ.addEventListener("change", update);
    phoneQ.addEventListener("change", update);
    resize();

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      reducedQ.removeEventListener("change", update);
      phoneQ.removeEventListener("change", update);
    };
  }, [logos]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}

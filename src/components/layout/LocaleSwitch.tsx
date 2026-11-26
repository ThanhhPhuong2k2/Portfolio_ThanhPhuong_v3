"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type MouseEvent } from "react";
import type { Locale } from "@/content/site";

interface LocaleSwitchProps {
  locale: Locale;
  /** the same page in the other language */
  alternateHref: string;
  /** "Xem bản tiếng Anh": the link's name (the switch shows no words) */
  label: string;
}

/**
 * The old site's own flag pictures (its LanguageSwitcher, github.com/ThanhhPhuong2k2/
 * FullStack_Engineer_Portfolio), on the owner's Cloudinary. The SVG files are 1.4 and 1.6 MB, so
 * Cloudinary draws them as 128px WebP (about 1 KB each, twice the pill's width).
 */
const FLAGS: Readonly<Record<Locale, string>> = {
  vi: "https://res.cloudinary.com/thanhphuongdev/image/upload/f_webp,q_auto,w_128/v1769970961/vie_rwbgqs.svg",
  en: "https://res.cloudinary.com/thanhphuongdev/image/upload/f_webp,q_auto,w_128/v1769970894/eng_hr4i3q.svg",
};

/** How long the knob slides before the other language's page opens. */
const SLIDE_MS = 260;

/**
 * The locale switch in the look of the owner's old site (owner's ask): a pill whose ground is the
 * flag of the language shown, with a white knob, left for English and right for Vietnamese. It is a
 * link to the same page in the other language: a click slides the knob and shows the other flag,
 * then opens that page. Without script, or with a modifier key (a new tab), it is a plain link.
 */
export function LocaleSwitch({ locale, alternateHref, label }: LocaleSwitchProps) {
  const router = useRouter();
  const [shown, setShown] = useState<Locale>(locale);
  const other: Locale = locale === "vi" ? "en" : "vi";

  function go(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    setShown(other);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => router.push(alternateHref), reduce ? 0 : SLIDE_MS);
  }

  return (
    <Link
      className="locale-switch"
      href={alternateHref}
      hrefLang={other}
      aria-label={label}
      data-lang={shown}
      onClick={go}
    >
      {/* the drawn pill (64 x 32, 48 x 24 on a phone) inside a 44px tap target */}
      <span className="locale-switch__track" aria-hidden="true">
        {(["vi", "en"] as const).map((code) => (
          <span key={code} className="locale-switch__flag" data-for={code}>
            {/* eslint-disable-next-line @next/next/no-img-element -- tiny flag pictures, already sized by Cloudinary */}
            <img src={FLAGS[code]} alt="" width={64} height={32} decoding="async" />
          </span>
        ))}
        <span className="locale-switch__knob" />
      </span>
    </Link>
  );
}

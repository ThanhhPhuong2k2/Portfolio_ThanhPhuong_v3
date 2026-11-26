"use client";

import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { shuffle } from "@/lib/projects";

/** What a card needs, already localised on the server (plain data, so it crosses to the client). */
export interface MoreProjectCard {
  slug: string;
  href: string;
  title: string;
  subtitle: string;
  image: string;
}

interface MoreProjectsProps {
  /** The project shown on this page: its pick is kept per page load. */
  currentSlug: string;
  /** Every other project, in the site's order starting after this one; the build shows the first `count`. */
  candidates: readonly MoreProjectCard[];
  /** How many cards show. */
  count: number;
  /** Labels, already localised. */
  labels: { title: string; all: string };
  /** Where "all projects" leads. */
  allHref: string;
  /** The heading's id, so the section can name itself by it (aria-labelledby). */
  headingId: string;
}

/**
 * The pick for each page, made once per page load in the browser and then kept, so React reads the
 * same array on every render (useSyncExternalStore needs a stable snapshot).
 */
const picks = new Map<string, readonly MoreProjectCard[]>();
/** The build's fixed pick for each page, kept the same way (the server snapshot must be stable too). */
const builds = new Map<string, readonly MoreProjectCard[]>();

function buildPickFor(slug: string, candidates: readonly MoreProjectCard[], count: number): readonly MoreProjectCard[] {
  let pick = builds.get(slug);
  if (!pick) {
    pick = candidates.slice(0, count);
    builds.set(slug, pick);
  }
  return pick;
}

function pickFor(slug: string, candidates: readonly MoreProjectCard[], count: number): readonly MoreProjectCard[] {
  let pick = picks.get(slug);
  if (!pick) {
    pick = shuffle(candidates).slice(0, count);
    picks.set(slug, pick);
  }
  return pick;
}

/** Nothing to listen to: the pick never changes after it is made. */
function subscribe() {
  return () => {};
}

/**
 * More projects (owner's ask): four other projects, a new random four on every page load. The static
 * build renders a fixed four (the next ones in the site's order), so the page reads whole without
 * script and hydrates without a mismatch; the browser then swaps in its shuffled four. The section sits
 * at the page's foot, so the swap has happened before anyone scrolls to it.
 * Empty (a site with one project): renders nothing.
 */
export function MoreProjects({ currentSlug, candidates, count, labels, allHref, headingId }: MoreProjectsProps) {
  const cards = useSyncExternalStore(
    subscribe,
    () => pickFor(currentSlug, candidates, count),
    () => buildPickFor(currentSlug, candidates, count),
  );

  if (cards.length === 0) return null;

  return (
    <div className="pd-more">
      <div className="pd-more__head">
        <h2 id={headingId} className="pd-more__title">
          {labels.title}
        </h2>
        <Link className="link pd-more__all" href={allHref}>
          {labels.all}
        </Link>
      </div>
      <ul className="pd-more__list">
        {cards.map((card) => (
          <li key={card.slug}>
            <Link className="pd-more__card" href={card.href}>
              <span className="pd-more__img">
                {/* decorative: the card's name is its title below */}
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="(max-width: 639px) 75vw, (max-width: 1023px) 50vw, 25vw"
                />
              </span>
              <span className="pd-more__name">{card.title}</span>
              <span className="pd-more__sub">{card.subtitle}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

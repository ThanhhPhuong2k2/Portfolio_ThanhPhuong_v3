import { initials, TECH_ICONS } from "@/lib/tech-icons";

interface TechMarkProps {
  name: string;
  /** the page's class for the tile (its size and ground); the initials take `${className}__initials` */
  className: string;
  /** the logo's drawn size in px */
  size?: number;
}

/**
 * A tool's real mark on a light tile (black marks read on the dark page), else its initials. Shared
 * by the projects page and the project pages; decorative (the tool's name is read out beside it).
 */
export function TechMark({ name, className, size = 16 }: TechMarkProps) {
  const icon = TECH_ICONS[name] ?? TECH_ICONS[name.replace(/\.js$/, "JS")];
  return (
    <span className={className} aria-hidden="true">
      {icon ? (
        // eslint-disable-next-line @next/next/no-img-element -- tiny logo files, no resizing to do
        <img src={icon} alt="" width={size} height={size} loading="lazy" decoding="async" />
      ) : (
        <span className={`${className}__initials`}>{initials(name)}</span>
      )}
    </span>
  );
}

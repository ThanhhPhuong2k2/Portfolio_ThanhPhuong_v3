/**
 * Real logos of the libraries on the Skills list (icons.mjs, their own colours) for the hero's logo
 * field (owner's ask, Phase 4). x/y: the logo's centre in % of the hero, kept clear of its edges
 * (no logo flush with the section) and below the fixed nav; s: the box in px; p: the phase (0-1);
 * ink: a black mark, drawn white at evening.
 */
export interface FieldLogo {
  file: string;
  x: number;
  y: number;
  s: number;
  p: number;
  ink?: boolean;
}

export const FIELD_LOGOS: readonly FieldLogo[] = [
  { file: "react.svg", x: 4, y: 20, s: 44, p: 0 },
  { file: "nextjs.svg", x: 33, y: 16, s: 36, p: 0.3, ink: true },
  { file: "tailwindcss.svg", x: 46, y: 24, s: 46, p: 0.6 },
  { file: "nodejs.svg", x: 3, y: 62, s: 40, p: 0.15 },
  { file: "nestjs.svg", x: 27, y: 84, s: 36, p: 0.78 },
  { file: "postgres.svg", x: 47, y: 70, s: 40, p: 0.45 },
  { file: "mongodb.svg", x: 96, y: 22, s: 22, p: 0.72 },
  { file: "redis.svg", x: 40, y: 47, s: 34, p: 0.08 },
  { file: "docker.svg", x: 13, y: 84, s: 46, p: 0.52 },
  { file: "kafka.svg", x: 96, y: 58, s: 22, p: 0.38, ink: true },
  { file: "prisma.svg", x: 60, y: 14, s: 26, p: 0.85, ink: true },
  { file: "redux.svg", x: 90, y: 86, s: 34, p: 0.22 },
  { file: "express.svg", x: 70, y: 86, s: 64, p: 0.68, ink: true },
  { file: "mysql.svg", x: 19, y: 14, s: 34, p: 0.28 },
];

/**
 * The projects page's head (owner's ask, S2): the same floating logos, at the right of the h1 (its
 * words sit at the left), the tools the projects list. x/y in % of the head band.
 */
export const PROJECTS_HEAD_LOGOS: readonly FieldLogo[] = [
  { file: "nextjs.svg", x: 60, y: 22, s: 38, p: 0.1, ink: true },
  { file: "nestjs.svg", x: 74, y: 12, s: 34, p: 0.55 },
  { file: "mongodb.svg", x: 88, y: 26, s: 26, p: 0.3 },
  { file: "postgres.svg", x: 96, y: 58, s: 36, p: 0.8 },
  { file: "tailwindcss.svg", x: 68, y: 52, s: 44, p: 0.42 },
  { file: "typescript.svg", x: 82, y: 64, s: 30, p: 0.68 },
  { file: "kafka.svg", x: 56, y: 70, s: 24, p: 0.2, ink: true },
  { file: "react.svg", x: 92, y: 88, s: 34, p: 0.9 },
];

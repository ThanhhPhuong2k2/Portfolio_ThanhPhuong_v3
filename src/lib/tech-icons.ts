/**
 * Shared by Skills and Journey. Each tool's real mark (taste-skill house rule 7: a known product's
 * real icon, never a drawn one): local files from icons.mjs (public/assets/icons), the old site's
 * VNPay SVG (public/site/icons) and the owner's VietQR and ACB logos on Cloudinary. A tool with no
 * mark in any source shows its initials.
 */
export const TECH_ICONS: Readonly<Record<string, string>> = {
  ReactJS: "/assets/icons/react.svg",
  Vite: "/assets/icons/vitejs.svg",
  "Next.js": "/assets/icons/nextjs.svg",
  TypeScript: "/assets/icons/typescript.svg",
  "Tailwind CSS": "/assets/icons/tailwindcss.svg",
  "Ant Design": "/assets/icons/ant-design.svg",
  "Material UI": "/assets/icons/material-ui.svg",
  Sass: "/assets/icons/sass.svg",
  Bootstrap: "/assets/icons/bootstrap.svg",
  "React Redux": "/assets/icons/redux.svg",
  "React Query": "/assets/icons/react-query-icon.svg",
  Axios: "/assets/icons/axios.svg",
  "Node.js": "/assets/icons/nodejs.svg",
  NestJS: "/assets/icons/nestjs.svg",
  "Express.js": "/assets/icons/express.svg",
  "OpenAI API": "/assets/icons/openai.svg",
  PostgreSQL: "/assets/icons/postgres.svg",
  Prisma: "/assets/icons/prisma.svg",
  Redis: "/assets/icons/redis.svg",
  MySQL: "/assets/icons/mysql.svg",
  MongoDB: "/assets/icons/mongodb.svg",
  Cloudinary: "/assets/icons/cloudinary-icon.svg",
  Kafka: "/assets/icons/kafka.svg",
  Docker: "/assets/icons/docker.svg",
  "Socket.io": "/assets/icons/socket.io.svg",
  VNPay: "/site/icons/vnpay.svg",
  VietQR: "https://res.cloudinary.com/thanhphuongdev/image/upload/f_auto,q_auto,w_96/v1769887524/1280px-VietQR_Logo.svg_cdjwoj.png",
  ACB: "https://res.cloudinary.com/thanhphuongdev/image/upload/f_auto,q_auto,w_96/v1769887730/logo-acb-inkythuatso_s6e5ny.png",
  "Web3.js": "/assets/icons/web3js.svg",
  "Ethers.js": "/assets/icons/ethers.svg",
  Wagmi: "/assets/icons/wagmi.svg",
};

/** Wordmark-only logos (wide files): drawn wider in their tile so the word reads. */
export const WIDE_ICONS = new Set(["Express.js", "Axios"]);

/** A tool's initials, for one with no mark: "SQL Server" -> "SS". */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0] ?? "")
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

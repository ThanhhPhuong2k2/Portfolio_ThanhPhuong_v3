import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { RootDocument } from "@/components/layout/RootDocument";
import { buildMetadata, siteViewport } from "@/lib/metadata";
import "../globals.css";

export const metadata: Metadata = buildMetadata({ locale: "vi", path: "/" });
export const viewport: Viewport = siteViewport;

export default function RootLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="vi">{children}</RootDocument>;
}

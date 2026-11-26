import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 | Thanh Phuong",
  robots: { index: false },
};

/** App-wide 404 (two root layouts). Bilingual, since the URL's locale is unknown here. */
export default function GlobalNotFound() {
  return (
    <html lang="vi">
      <body>
        <main>
          <h1>404</h1>
          <p>Không tìm thấy trang này.</p>
          <p lang="en">This page could not be found.</p>
          <p>
            <Link href="/">Về trang chủ</Link>
            {" · "}
            <Link href="/en/" lang="en">
              Back to home
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}

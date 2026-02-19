import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Дело Пракова",
  description: "Интерактивное досье по материалам расследования"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="page-bg">{children}</body>
    </html>
  );
}

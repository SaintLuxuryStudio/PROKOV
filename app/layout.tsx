import type { Metadata } from "next";
import "./globals.css";
import { DisclaimerModal } from "@/src/components/ui/disclaimer-modal";
import { BackgroundAudio } from "@/src/components/ui/background-audio";

export const metadata: Metadata = {
  title: "Дело Пракова",
  description: "Интерактивное досье по материалам расследования"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="page-bg">
        <DisclaimerModal />
        <BackgroundAudio />
        {children}
      </body>
    </html>
  );
}

import "./globals.css";
import { Inter } from "next/font/google";
import HeaderBar from "./components/HeaderBar";
import FooterBar from "./components/FooterBar";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Justme.dev",
  description: "Just me, doing stuff.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <HeaderBar />
        <main className="min-h-screen bg-background flex flex-col items-center">
          {children}
        </main>
        <FooterBar />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Roboto_Slab, Work_Sans, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mon blog",
  description: "Ceci est le blog d'essai de Nadoz.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={cn("h-full", "antialiased", robotoSlab.variable, workSans.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="w-full px-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

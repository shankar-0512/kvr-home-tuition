import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KVR Brain Point | Home Tuition & Online Coaching in Chennai",
  description:
    "KVR Brain Point offers personalised home tuition and online coaching for Classes 1–12 in Chennai. Concept clarity, regular practice, and weekly feedback for parents.",

  openGraph: {
    title: "KVR Brain Point | Home Tuition & Online Coaching in Chennai",
    description:
      "Personalised home tuition and online coaching for Classes 1–12 in Chennai.",
    url: "https://kvr-home-tuition.vercel.app",
    siteName: "KVR Brain Point",
    images: [
      {
        url: "https://kvr-home-tuition.vercel.app/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "KVR Brain Point",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth scroll-pt-28 md:scroll-pt-30">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const BASE_URL = "https://kvr-home-tuition.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "KVR Brain Point | Home Tuition & Online Coaching in Chennai",
  description:
    "Personalised home tuition in Chennai and online coaching across Tamil Nadu & India for Classes 1–12. Concept clarity, regular practice, and weekly feedback for parents.",
  keywords: [
    "home tuition Chennai",
    "home tutor Chennai",
    "online tuition Tamil Nadu",
    "online coaching India",
    "CBSE tuition Chennai",
    "ICSE tuition Chennai",
    "State Board tuition Chennai",
    "Class 10 tuition Chennai",
    "Class 12 tuition Chennai",
    "online tutor India",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "KVR Brain Point | Home Tuition & Online Coaching in Chennai",
    description:
      "Personalised home tuition in Chennai and online coaching across Tamil Nadu & India for Classes 1–12.",
    url: BASE_URL,
    siteName: "KVR Brain Point",
    images: [
      {
        url: "/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "KVR Brain Point",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KVR Brain Point | Home Tuition & Online Coaching in Chennai",
    description:
      "Personalised home tuition in Chennai and online coaching across Tamil Nadu & India for Classes 1–12.",
    images: ["/logo.jpeg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${BASE_URL}/#organization`,
  name: "KVR Brain Point",
  description:
    "Personalised home tuition in Chennai and online coaching across Tamil Nadu & India for Classes 1–12. Concept clarity, regular practice, and weekly feedback for parents.",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.jpeg`,
  image: `${BASE_URL}/logo.jpeg`,
  telephone: "+91-8668194510",
  email: "kvrchennaihometuition@gmail.com",
  sameAs: ["https://www.youtube.com/@Kvr_brain_point"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 13.0827,
    longitude: 80.2707,
  },
  // Home visits are Chennai-only; online coaching reaches the whole state and country.
  areaServed: [
    { "@type": "City", name: "Chennai" },
    { "@type": "State", name: "Tamil Nadu" },
    { "@type": "Country", name: "India" },
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "06:00",
    closes: "21:00",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

import "./globals.css";
import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ChatBot from "../components/ChatBot";
import MobileActionBar from "../components/MobileActionBar";

const siteUrl = "https://blinkuphome.com";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${siteUrl}/#business`,
  name: "BlinkUp Home Services",
  url: siteUrl,
  image: `${siteUrl}/og.png`,
  telephone: "+91-74896-73372",
  email: "info@blinkuphome.com",
  description:
    "Free inspection, verified professionals and hassle-free home repair, cleaning, painting and renovation services across Bhopal.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bhopal",
    addressRegion: "Madhya Pradesh",
    addressCountry: "IN",
  },
  areaServed: {
    "@type": "City",
    name: "Bhopal",
  },
  sameAs: [
    "https://www.facebook.com/profile.php?id=61576752742431",
    "https://www.instagram.com/blinkup.home",
  ],
  makesOffer: [
    "Painting",
    "Plumbing",
    "Electrical",
    "Deep Cleaning",
    "AC Service",
    "Interior Design",
    "Home Renovation",
  ].map((name) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name,
      areaServed: "Bhopal",
    },
  })),
};

export const metadata: Metadata = {
  title: {
    default: "Home Services in Bhopal | BlinkUp",
    template: "%s | BlinkUp",
  },
  description:
    "Book a free inspection for home services in Bhopal. Get verified professionals for painting, plumbing, electrical work, cleaning, AC care, interiors and renovation.",
  keywords: [
    "home services in Bhopal",
    "electrician in Bhopal",
    "plumber in Bhopal",
    "home painting Bhopal",
    "deep cleaning Bhopal",
    "AC service Bhopal",
    "home renovation Bhopal",
    "free home inspection Bhopal",
    "verified home service professionals Bhopal",
  ],
  applicationName: "BlinkUp",
  category: "Home Services",
  icons: {
    icon: "/images/blinkup-app-logo.png",
    apple: "/images/blinkup-app-logo.png",
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    title: "BlinkUp | Home services, without the guesswork.",
    description: "Inspection first. Clear quotation next.",
    url: "/",
    siteName: "BlinkUp",
    locale: "en_IN",
    images: [
      {
        url: "/og.png",
        width: 1734,
        height: 907,
        alt: "BlinkUp - Home services, without the guesswork.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BlinkUp | Home services, without the guesswork.",
    description: "Inspection first. Clear quotation next.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Header />
        <main className="relative z-10 min-h-screen pt-20">{children}</main>
        <Footer />
        <div className="fixed bottom-20 right-4 z-50 md:bottom-6 md:right-6">
          <ChatBot />
        </div>
        <MobileActionBar />
      </body>
    </html>
  );
}

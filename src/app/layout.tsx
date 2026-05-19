import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleReviews from "@/components/GoogleReviews";
import CookieConsent from "@/components/CookieConsent";
import PromoPopups from "@/components/PromoPopups";
import AnnouncementPopupClient from "@/components/AnnouncementPopupClient";
import { getActivePhonesForSite } from "@/lib/contact";
import { getAnnouncementPopupForSite } from "@/lib/announcements";
import { absoluteUrl, siteDescription, siteName, siteTitle, siteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "sk_SK",
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [absoluteUrl("/og-image.jpg")],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [absoluteUrl("/og-image.jpg")],
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const [phones, popup] = await Promise.all([
    getActivePhonesForSite().catch(() => []),
    getAnnouncementPopupForSite().catch(() => null),
  ]);

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: "MT AUTOS s.r.o.",
    url: siteUrl,
    image: absoluteUrl("/og-image.jpg"),
    telephone: phones[0] || "+421 915 511 111",
    email: "mtautossro@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "29 Augusta 2261/145",
      postalCode: "03852",
      addressLocality: "Sučany",
      addressCountry: "SK",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "13:00",
      },
    ],
  };

  return (
    <html lang="sk">
      <body>
        <Header />
        <main className="min-h-screen pt-16">{children}</main>
        <GoogleReviews />
        <Footer phones={phones} />
        <AnnouncementPopupClient popup={popup} />
        <PromoPopups />
        <CookieConsent />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </body>
    </html>
  );
}

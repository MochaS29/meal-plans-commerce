import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAdsTracking from "@/components/GoogleAdsTracking";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Mindful Meal Plan - AI-Powered Personalized Meal Planning",
    template: "%s | Mindful Meal Plan"
  },
  description: "Transform your wellness journey with AI-powered personalized meal plans. 3,586+ recipes across Mediterranean, Keto, Vegan, and more. Instant PDF delivery, smart shopping lists, and fresh recipes monthly.",
  keywords: [
    "meal planning", "personalized nutrition", "healthy recipes", "meal prep",
    "mediterranean diet", "keto meal plan", "vegan recipes", "paleo diet",
    "AI recipe generation", "custom meal plans", "weight loss", "healthy eating",
    "family meals", "meal calendar", "nutrition tracking", "diet planning"
  ].join(", "),
  authors: [{ name: "Mocha's MindLab Inc.", url: "https://mochasmindlab.com" }],
  creator: "Mocha's MindLab Inc.",
  publisher: "Mocha's MindLab Inc.",
  category: "Health & Wellness",
  classification: "Meal Planning Service",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180' },
      { url: '/apple-icon-152.png', sizes: '152x152' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: "Mindful Meal Plan - AI-Powered Personalized Nutrition",
    description: "Get personalized meal plans with 3,586+ recipes. Mediterranean, Keto, Vegan & more. Instant PDF delivery with smart shopping lists.",
    url: "https://mindfulmealplan.com",
    siteName: "Mindful Meal Plan",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mindful Meal Plan - Personalized Healthy Meal Planning"
      },
      {
        url: "/og-image-square.jpg",
        width: 1200,
        height: 1200,
        alt: "Mindful Meal Plan - Transform Your Health"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mindful Meal Plan - AI-Powered Meal Planning",
    description: "3,586+ personalized recipes. Mediterranean, Keto, Vegan & more. Instant PDF delivery.",
    images: ["/og-image.jpg"],
    creator: "@mochasmindlab",
    site: "@mindfulmealplan",
  },
  alternates: {
    canonical: "https://mindfulmealplan.com",
    languages: {
      'en-US': 'https://mindfulmealplan.com',
      'x-default': 'https://mindfulmealplan.com',
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    other: {
      'facebook-domain-verification': process.env.FACEBOOK_DOMAIN_VERIFICATION || '',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <GoogleAdsTracking />
        <GoogleAnalytics />
        <div className="sticky top-0 z-[9999]">
          <Header />
        </div>
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

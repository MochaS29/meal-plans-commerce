import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mindful Meal Plan - Personalized Healthy Meal Planning",
  description: "Transform your wellness journey with personalized meal plans. Choose from heart-healthy, intermittent fasting, family-focused, and global cuisine options. Created by Mocha's MindLab Inc.",
  keywords: "meal planning, healthy recipes, meal prep, nutrition, wellness, intermittent fasting, family meals, global cuisine",
  authors: [{ name: "Mocha's MindLab Inc." }],
  creator: "Mocha's MindLab Inc.",
  publisher: "Mocha's MindLab Inc.",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: "Mindful Meal Plan - Transform Your Health",
    description: "Personalized meal plans with complete recipes, shopping lists, and meal prep guides",
    url: "https://mindfulmealplan.com",
    siteName: "Mindful Meal Plan",
    locale: "en_US",
    type: "website",
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

import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { StructuredData } from "./components/StructuredData";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jacked - See why your muscles aren't growing | Fitbod analytics",
  description: "Training hard but not seeing results? Upload your Fitbod data and see which muscle groups are progressing, stuck, or declining in 30 seconds. Stop guessing, start knowing which muscles need more work.",
  keywords: [
    "fitbod analytics",
    "not seeing results from workouts",
    "why muscles not growing",
    "fitbod muscle group tracking",
    "workout progress dashboard",
    "which muscles are lagging",
    "fitbod progress tracking",
    "muscle growth tracking"
  ],
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Jacked - See which muscles aren't growing",
    description: "Upload your Fitbod data. See muscle group trends in 30 seconds. Know exactly which muscles are progressing and which are stuck.",
    type: "website",
    url: "https://jacked.pro",
    images: [{
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "Jacked dashboard showing muscle group progress indicators"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Jacked - See which muscles aren't growing",
    description: "Training hard but not seeing results? See which muscle groups are progressing and which are stuck. 30-second analysis of your Fitbod data."
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

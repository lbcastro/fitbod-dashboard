import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fitbod Dashboard",
  description: "Track your workout progress",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

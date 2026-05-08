import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jason AI Fintech",
  description: "Cinematic fintech dashboard with AI chat, charts, and realtime alerts."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

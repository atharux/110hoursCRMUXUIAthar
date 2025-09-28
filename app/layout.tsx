import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CRM System - Athar Hafiz UX Portfolio",
  description: "Interactive CRM prototype showcasing lead management, workflow automation, and dialer functionality",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-900">
        {children}
      </body>
    </html>
  );
}
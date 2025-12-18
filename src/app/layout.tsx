import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "NomadOS - AI-Powered Global Mobility Operating System",
  description: "Your complete AI companion for global mobility. Document processing, destination matching, and cultural preparation - all in one intelligent platform.",
  keywords: ["global mobility", "visa", "immigration", "AI", "travel", "relocation", "digital nomad"],
  authors: [{ name: "NomadOS Team" }],
  openGraph: {
    title: "NomadOS - AI-Powered Global Mobility Operating System",
    description: "Your complete AI companion for global mobility.",
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
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

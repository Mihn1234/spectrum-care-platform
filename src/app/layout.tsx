import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "SpectrumCare Platform - Comprehensive Autism Support Ecosystem",
  description: "Revolutionary AI-powered platform providing comprehensive autism support from diagnosis to advocacy. Serving families, professionals, schools, and local authorities with integrated case management, professional services, and legal support.",
  keywords: ["autism support", "EHC plans", "SEN", "special educational needs", "autism diagnosis", "professional services", "tribunal support"],
  authors: [{ name: "SpectrumCare Platform Team" }],
  creator: "SpectrumCare Platform",
  publisher: "SpectrumCare Platform",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://spectrumcare.platform'),
  openGraph: {
    title: "SpectrumCare Platform - Comprehensive Autism Support",
    description: "Revolutionary platform transforming autism support through AI-powered case management, professional services, and integrated stakeholder collaboration.",
    url: 'https://spectrumcare.platform',
    siteName: 'SpectrumCare Platform',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SpectrumCare Platform - Comprehensive Autism Support',
    description: 'Revolutionary platform transforming autism support through AI-powered case management and professional services.',
    creator: '@SpectrumCarePlatform',
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-sans`}
      >
        {children}
      </body>
    </html>
  );
}

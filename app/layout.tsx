import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "@/app/globals.css"

export const metadata: Metadata = {
  title: {
    default: "Hasrinata Arya Afendi | Founder of MeowLabs | AI Engineer & Web Developer",
    template: "%s | Hasrinata Arya Afendi",
  },
  description: "Portfolio of Hasrinata Arya Afendi - Founder of MeowLabs, Mahasiswa Informatika, Aspiring AI Engineer, Developer Web & IoT.",
  keywords: ["Hasrinata Arya Afendi", "Founder of MeowLabs", "MeowLabs", "AI Engineer", "Web Developer", "IoT Developer", "Informatika", "Portfolio", "Next.js", "React"],
  authors: [{ name: "Hasrinata Arya Afendi" }],
  creator: "Hasrinata Arya Afendi",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://hasrinata.site",
    title: "Hasrinata Arya Afendi | Founder of MeowLabs | AI Engineer & Web Developer",
    description: "Portfolio of Hasrinata Arya Afendi - Founder of MeowLabs, Mahasiswa Informatika, Aspiring AI Engineer, Developer Web & IoT.",
    siteName: "Hasrinata Arya Afendi Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hasrinata Arya Afendi - Founder of MeowLabs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hasrinata Arya Afendi | Founder of MeowLabs",
    description: "Portfolio of Hasrinata Arya Afendi - Founder of MeowLabs, Mahasiswa Informatika, Aspiring AI Engineer, Developer Web & IoT.",
    creator: "@hasrinata",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}

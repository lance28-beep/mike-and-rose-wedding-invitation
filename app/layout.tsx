import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Myke & Rose Wedding",
  description: "Join us as we celebrate our love story on June 14, 2025",
  keywords: ["wedding", "celebration", "Myke", "Rose", "wedding invitation", "June 14, 2025"],
  authors: [{ name: "Myke & Rose" }],
  openGraph: {
    title: "Myke & Rose Wedding",
    description: "Join us as we celebrate our love story on June 14, 2025",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Myke & Rose Wedding",
    description: "Join us as we celebrate our love story on June 14, 2025",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  manifest: "/favicon_io/site.webmanifest",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes:wght@400&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
        <link rel="manifest" href="/favicon_io/site.webmanifest" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

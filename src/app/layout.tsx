import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

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
    default: "Adesh Srivastava | Senior Software Developer",
    template: "%s | Adesh Srivastava",
  },
  description:
    "Senior Software Developer with 3+ years of experience in Full-Stack Development, Big Data Solutions, and Automation. Specializing in Java, Spring Boot, React, and modern DevOps practices.",
  keywords: [
    "Adesh Srivastava",
    "Software Developer",
    "Full Stack Developer",
    "Java Developer",
    "Spring Boot",
    "React",
    "Next.js",
    "DevOps",
    "AWS",
    "Big Data",
  ],
  authors: [{ name: "Adesh Srivastava", url: "https://mrshady.dev" }],
  creator: "Adesh Srivastava",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mrshady.dev",
    siteName: "Adesh Srivastava",
    title: "Adesh Srivastava | Senior Software Developer",
    description:
      "Senior Software Developer with 3+ years of experience in Full-Stack Development, Big Data Solutions, and Automation.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Adesh Srivastava - Senior Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adesh Srivastava | Senior Software Developer",
    description:
      "Senior Software Developer with 3+ years of experience in Full-Stack Development, Big Data Solutions, and Automation.",
    creator: "@adesh_ofc",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://mrshady.dev",
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
  metadataBase: new URL("https://mrshady.dev"),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#171717" },
  ],
  width: "device-width",
  initialScale: 1,
};

// JSON-LD structured data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Adesh Srivastava",
  jobTitle: "Senior Software Developer",
  url: "https://mrshady.dev",
  email: "adeshsrivastava.ofc@gmail.com",
  description:
    "Senior Software Developer with 3+ years of experience in Full-Stack Development, Big Data Solutions, and Automation.",
  sameAs: [
    "https://linkedin.com/in/adeshsrivastava-ofc",
    "https://github.com/adeshsrivastava-ofc",
    "https://x.com/adesh_ofc",
  ],
  knowsAbout: [
    "Java",
    "Spring Boot",
    "React",
    "Next.js",
    "AWS",
    "Docker",
    "Kubernetes",
    "DevOps",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {/* Skip to main content link for keyboard accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none"
        >
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            <Navbar />
            <main id="main-content" className="min-h-screen">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

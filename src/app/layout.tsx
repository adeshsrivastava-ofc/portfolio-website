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
  authors: [{ name: "Adesh Srivastava", url: "https://adeshsrivastava.dev" }],
  creator: "Adesh Srivastava",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://adeshsrivastava.dev",
    siteName: "Adesh Srivastava",
    title: "Adesh Srivastava | Senior Software Developer",
    description:
      "Senior Software Developer with 3+ years of experience in Full-Stack Development, Big Data Solutions, and Automation.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adesh Srivastava | Senior Software Developer",
    description:
      "Senior Software Developer with 3+ years of experience in Full-Stack Development, Big Data Solutions, and Automation.",
    creator: "@adesh_ofc",
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
  metadataBase: new URL("https://adeshsrivastava.dev"),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#171717" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

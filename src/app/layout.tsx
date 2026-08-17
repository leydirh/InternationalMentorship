import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { PlatformProvider } from "@/context/PlatformContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "International Mentorship | Peer to Peer Online Education Platform",
  description:
    "Free asynchronous competition courses, peer consultation booking, and 1-on-1 mentorship sessions.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://app.internationalmentorship.net"
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased selection:bg-brand-yellow-200 selection:text-slate-900">
        <AuthProvider>
          <PlatformProvider>
            <Suspense fallback={<div className="min-h-screen bg-white" />}>
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </Suspense>
          </PlatformProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "./context/AuthContext";
import ChatbotButton from "./chatbot/medisyncai";
import Head from "next/head";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  
  title: "MediSyncAi",
  description: "An AI based telemedicine app.",
  icons: {
    icon: "/icon512_maskable.png", // or '/favicon.png'
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthContextProvider>
          {/* Google Translate dropdown */}

          {children}
          <ChatbotButton />
        </AuthContextProvider>
      </body>
    </html>
  );
}

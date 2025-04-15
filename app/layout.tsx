import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | HustLMS",
    default: "HustLMS" 
  },
  description: "Learning Management System for HUST Students",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${montserrat.className} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
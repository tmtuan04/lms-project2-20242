import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

const poppins  = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"], 
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
    <>
    <Toaster position="top-center" />
      <ClerkProvider>
        <html lang="en">
          <body className={`${poppins.className} antialiased`}>
            {children}
          </body>
        </html>
      </ClerkProvider>
    </>

  );
}
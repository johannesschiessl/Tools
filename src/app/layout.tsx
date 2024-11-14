import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Tools",
  description:
    "A small collection of tools for various purposes. Created by Johannes Schießl.",
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
        <footer
          className="absolute bottom-0 inset-x-0 p-8 text-center text-gray-600 
        backdrop-blur-sm bg-white/30"
        >
          <p className="text-sm">
            Created by{" "}
            <a
              href="https://github.com/johannesschiessl"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors font-medium 
              hover:underline decoration-2 underline-offset-2"
            >
              Johannes Schießl
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}

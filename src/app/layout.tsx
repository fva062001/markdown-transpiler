import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Makdown Converter',
  description: 'Convert markdown to HTML app made by @fva062001',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          <NavBar />
          {children}
          <Footer />
        </body>
      </UserProvider>
    </html>
  );
}

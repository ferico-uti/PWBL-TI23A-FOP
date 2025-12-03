import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* area header */}
        <header> 
          <Image src="/images/logo.png" alt="Logo UTI" width={320} height={60}/>
        </header>

        <main className="m-10">{children}</main>

        {/* tambahkan komponen Toaster untuk memberikan respons ke pengguna */}
        <Toaster position="top-center" toastOptions={{
          style : {
            backgroundColor: "#333333",
            color: "#FFFFFF"
          }
        }}/>

        {/* area footer */}
        <footer>&copy; 2025 - TI 23 A</footer>
      </body>
    </html>
  );
}

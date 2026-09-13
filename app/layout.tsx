import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientShell from "./components/ClientShell/ClientShell";
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
  title: "Store Pannel",
  description: "Manage your store, products, orders, and customers with ease using our intuitive store panel.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={` relative`}
    >
      <body className="   " suppressHydrationWarning>
        <ClientShell>
          <Toaster position="bottom-right"  />
          {children}
        </ClientShell>
      </body>
    </html>
  );
}

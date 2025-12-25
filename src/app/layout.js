import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../../context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "StyleHub - Premium Clothing Store",
  description: "Shop the latest trends in fashion with secure Razorpay payment",
  manifest: "/manifest.json",
  themeColor: "#667eea",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "StyleHub",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}

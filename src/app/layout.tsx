import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ChatBot from "../components/ChatBot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BlinkUp - Home Services App IN BHOPAL",
  description: "Professional home services at your doorstep with BlinkUp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        {/* 🔹 Header */}
        <Header />

        {/* 🔸 Main Page Area */}
        <main className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 relative z-10">
          {children}
        </main>

        {/* 🔻 Footer */}
        <Footer />

        {/* 💬 Chatbot (Fixed Position) */}
        <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50">
          <ChatBot />
        </div>
      </body>
    </html>
  );
}

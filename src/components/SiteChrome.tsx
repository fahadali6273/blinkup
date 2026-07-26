"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import ChatBot from "./ChatBot";
import MobileActionBar from "./MobileActionBar";

export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <main className="min-h-screen bg-[#0e0a13]">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="relative z-10 min-h-screen pt-20">{children}</main>
      <Footer />
      <div className="fixed bottom-20 right-4 z-50 md:bottom-6 md:right-6">
        <ChatBot />
      </div>
      <MobileActionBar />
    </>
  );
}

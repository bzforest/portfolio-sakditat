import React from "react";
import CloudBackground from "@/components/map/CloudBackground";

import Footer from "@/components/shared/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">
      {/* Scroll-Linked Parallax Clouds */}
      <CloudBackground />

      <main className="relative flex-1 w-full">{children}</main>
      
      {/* ── Footer ─────────────────────────────────────────────────── */}
      <Footer />

    </div>
  );
}

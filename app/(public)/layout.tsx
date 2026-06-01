import React from "react";
import CloudBackground from "@/components/map/CloudBackground";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden bg-ro-sky">
      {/* Scroll-Linked Parallax Clouds */}
      <CloudBackground />

      {/* Mascot Placeholder: Will be replaced with the Rive Poring component later */}
      <div className="fixed bottom-4 right-4 z-50 p-4 bg-rose-600 text-white rounded-xl shadow-xl text-sm font-bold border border-rose-400">
        🔮 Poring Mascot UI
      </div>

      <main className="relative flex-1 w-full z-10">{children}</main>
    </div>
  );
}

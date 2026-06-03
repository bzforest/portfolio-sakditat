import Link from "next/link";
import { notFound } from "next/navigation";
import { Code2, ExternalLink } from "lucide-react";
import CloudTransition from "@/components/shared/CloudTransition";
import Navbar from "@/components/shared/Navbar";
import { supabase } from "@/lib/supabase";
import MagicParticles from "@/components/shared/MagicParticles";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch project from Supabase
  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  // If no project is found, trigger Next.js 404 page
  if (error || !project) {
    notFound();
  }

  return (
    <CloudTransition>
      {/* ── Fixed RPG HUD Navbar ─────────────────────────────────── */}
      <Navbar />

      <main className="min-h-screen pt-24 pb-20 px-4 md:px-8 max-w-5xl mx-auto flex flex-col items-center justify-center">

        {/* Back Button (Leave Quest) */}
        <div className="w-full flex justify-start mb-6">
          <Link href="/" className="relative group overflow-hidden px-2 py-1 rounded-lg inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold hover:text-amber-500 transition-colors">
            <MagicParticles isSubtle />
            <span className="relative z-10 group-hover:-translate-x-1 transition-transform">←</span>
            <span className="relative z-10">Back to World Map</span>
          </Link>
        </div>

        {/* Quest Log Container */}
        <div className="relative w-full bg-white/60 dark:bg-[#0F172A]/80 backdrop-blur-xl border-2 border-amber-500/20 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_rgba(0,0,0,0.5)]">

          {/* 1. Hero Banner */}
          <div className="relative w-full h-[400px] md:h-[500px] bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden group">
            {project.image_url ? (
              <img src={project.image_url} alt={project.title} className="w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-700" />
            ) : (
              <p className="text-slate-400 z-0 group-hover:scale-105 transition-transform duration-700">[ {project.title} ]</p>
            )}

            {/* Glassmorphism Title Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-6 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-t border-white/20 dark:border-slate-700/50 z-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wider text-amber-800 bg-amber-100 dark:text-amber-200 dark:bg-amber-900/50 rounded-full border border-amber-500/40">
                    {project.quest_type}
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white drop-shadow-sm">
                    {project.title}
                  </h1>
                </div>
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 text-left md:text-right">
                  <p>Role: {project.role}</p>
                  <p>Timeline: {project.timeline}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="relative z-20 px-6 md:px-12 pt-10 pb-12">

            {/* 3. Equipped Skills (Tech Stack) */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Equipped Skills</h3>
              <div className="flex flex-wrap gap-2">
                {(project.skills || []).map((tech: string) => (
                  <span key={tech} className="px-3 py-1 rounded-full border border-ro-wood/30 dark:border-slate-600 bg-white/60 dark:bg-slate-800/80 text-[12px] font-semibold text-ro-wood dark:text-slate-200">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* 4. Quest Lore (Description) */}
            <div className="prose prose-slate dark:prose-invert max-w-none mb-10">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Quest Lore</h3>
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300 whitespace-pre-wrap">
                {project.lore}
              </p>
            </div>

            {/* 5. Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3 border-t border-amber-500/30 dark:border-slate-50/30">
              {/* Live Demo */}
              {project.demo_link && (
                <a
                  href={project.demo_link}
                  target="_blank" rel="noreferrer"
                  className="relative overflow-hidden rounded-full p-[2px] group cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(250,204,21,0.5)]"
                >
                  <MagicParticles isSubtle />
                  <div className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_70%,#facc15_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                  <div className="relative z-10 h-full w-full bg-blue-600 rounded-full flex items-center justify-center gap-2 px-5 py-2.5 transition-colors group-hover:bg-blue-500 text-white font-semibold text-sm">
                    <ExternalLink size={16} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    Visit Realm (Live Demo)
                  </div>
                </a>
              )}

              {/* GitHub Frontend */}
              {project.frontend_link && (
                <a
                  href={project.frontend_link}
                  target="_blank" rel="noreferrer"
                  className="relative group overflow-hidden bg-slate-800/80 dark:bg-slate-700/80 hover:bg-slate-700 text-white border border-slate-600 rounded-full px-5 py-2.5 text-sm font-semibold flex items-center gap-2 transition-all shadow-sm hover:-translate-y-1"
                >
                  <MagicParticles isSubtle />
                  <Code2 size={16} className="relative z-10" />
                  <span className="relative z-10">Read Grimoire (Frontend)</span>
                </a>
              )}

              {/* GitHub Backend */}
              {project.backend_link && (
                <a
                  href={project.backend_link}
                  target="_blank" rel="noreferrer"
                  className="relative group overflow-hidden bg-slate-800/80 dark:bg-slate-700/80 hover:bg-slate-700 text-white border border-slate-600 rounded-full px-5 py-2.5 text-sm font-semibold flex items-center gap-2 transition-all shadow-sm hover:-translate-y-1"
                >
                  <MagicParticles isSubtle />
                  <Code2 size={16} className="relative z-10" />
                  <span className="relative z-10">Read Grimoire (Backend)</span>
                </a>
              )}
            </div>

          </div>
        </div>
      </main>
    </CloudTransition>
  );
}

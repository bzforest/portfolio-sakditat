import React from 'react';
import Navbar from '@/components/shared/Navbar';
import HeroSection from '@/components/home/HeroSection';
import ProjectMap from '@/components/projects/ProjectMap';
import MessengerGuild from '@/components/contact/MessengerGuild';
import { supabase } from '@/lib/supabase';
import { ProjectData } from '@/components/projects/ProjectCard';

export const revalidate = 60; // revalidate every 60 seconds if needed, or we rely on on-demand revalidation

export default async function PublicLandingPage() {
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_pinned', true);

  if (error) {
    console.error('Error fetching projects:', error);
  }

  // Map to ProjectCard format
  const mappedProjects: ProjectData[] = (projects || []).map(p => ({
    title: p.title,
    description: p.lore || '',
    tech: p.skills || [],
    imagePlaceholder: p.title.substring(0, 2).toUpperCase(),
    imageUrl: p.image_url,
    liveDemoUrl: p.demo_link,
    githubFeUrl: p.frontend_link,
    githubBeUrl: p.backend_link,
    slug: p.slug
  }));

  return (
    <>
      {/* ── Fixed RPG HUD Navbar ─────────────────────────────────────────── */}
      <Navbar />

      {/* ── Hero / Character Selection Section ──────────────────────────── */}
      <HeroSection />

      {/* ── Phase 4: Quest Board (Projects) ───────────────────────────── */}
      <ProjectMap projects={mappedProjects} />

      {/* ── Phase 5: Messenger Guild (Contact) ──────────────────────── */}
      <MessengerGuild />
    </>
  );
}

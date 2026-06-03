'use client'
import { useState, useEffect } from 'react';
import CloudTransition from '@/components/shared/CloudTransition';
import Link from 'next/link';
import Navbar from '@/components/shared/Navbar';
import { supabase } from '@/lib/supabase';
import Fuse from 'fuse.js';
import MagicParticles from '@/components/shared/MagicParticles';

const PaginationControls = ({ currentPage, totalPages, setPage }: { currentPage: number, totalPages: number, setPage: (p: number) => void }) => {
  if (totalPages <= 1) return null;
  return (
    <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-200 dark:border-slate-700/50">
      <button 
        onClick={() => setPage(currentPage - 1)} 
        disabled={currentPage === 1}
        className="relative group overflow-hidden px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg disabled:opacity-50 text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
      >
        <MagicParticles isSubtle />
        <span className="relative z-10">← Prev</span>
      </button>
      <span className="text-xs text-slate-500 font-bold">{currentPage} / {totalPages}</span>
      <button 
        onClick={() => setPage(currentPage + 1)} 
        disabled={currentPage === totalPages}
        className="relative group overflow-hidden px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg disabled:opacity-50 text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
      >
        <MagicParticles isSubtle />
        <span className="relative z-10">Next →</span>
      </button>
    </div>
  );
};

// Temporary Mock Component for visualization
const CompactQuestCard = ({ slug, title, type, role, imageUrl, skills }: { slug: string, title: string, type: string, role: string, imageUrl: string, skills: string[] }) => (
  <Link href={`/projects/${slug}`} className="block">
    <div className="group relative flex flex-col bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-300 cursor-pointer">

      <MagicParticles />

      {/* Card Banner Image */}
      <div className="h-32 w-full overflow-hidden relative border-b border-slate-200 dark:border-slate-700">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <img
          src={imageUrl || '/image/chatbot/mock-poring.png'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <span className="absolute bottom-2 right-2 z-20 text-[10px] font-bold px-2 py-1 bg-amber-500/90 text-white backdrop-blur-md rounded-md shadow-sm">
          {type}
        </span>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-slate-800 dark:text-white group-hover:text-amber-500 transition-colors line-clamp-1">{title}</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{role}</p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-200/50 dark:border-slate-700/50">
          {(skills || []).map((skill, idx) => (
            <span key={idx} className="text-[9px] font-medium px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-600">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  </Link>
);

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileTab, setMobileTab] = useState('MAIN'); // For mobile view
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const ITEMS_PER_PAGE = 3;
  const [pageMain, setPageMain] = useState(1);
  const [pageSide, setPageSide] = useState(1);
  const [pageMini, setPageMini] = useState(1);

  // Reset all pages to 1 when the user types in the search box
  useEffect(() => {
    setPageMain(1);
    setPageSide(1);
    setPageMini(1);
  }, [searchQuery]);

  useEffect(() => {
    const fetchQuests = async () => {
      // We do not order by 'created_at' since it doesn't exist in our table schema
      const { data } = await supabase.from('projects').select('*');
      if (data) setProjects(data);
      setIsLoading(false);
    };
    fetchQuests();
  }, []);

  // Fuzzy Search Logic using Fuse.js
  let filteredProjects = projects;

  if (searchQuery.trim() !== '') {
    const fuse = new Fuse(projects, {
      keys: ['title', 'role', 'skills'],
      threshold: 0.3, // 0.0 is exact match, 1.0 is very loose. 0.3 is a good balance for typos.
      ignoreLocation: true, // Finds matches anywhere in the string
    });

    const results = fuse.search(searchQuery);
    // Fuse returns an array of { item: Project, refIndex: number }
    // We map it back to just the project objects.
    filteredProjects = results.map(result => result.item);
  }

  const mainQuests = filteredProjects.filter(p => p.quest_type?.includes('MAIN'));
  const sideQuests = filteredProjects.filter(p => p.quest_type?.includes('SIDE'));
  const miniQuests = filteredProjects.filter(p => p.quest_type?.includes('MINI'));

  // Main Quests Pagination
  const totalPagesMain = Math.ceil(mainQuests.length / ITEMS_PER_PAGE);
  const paginatedMain = mainQuests.slice((pageMain - 1) * ITEMS_PER_PAGE, pageMain * ITEMS_PER_PAGE);

  // Side Quests Pagination
  const totalPagesSide = Math.ceil(sideQuests.length / ITEMS_PER_PAGE);
  const paginatedSide = sideQuests.slice((pageSide - 1) * ITEMS_PER_PAGE, pageSide * ITEMS_PER_PAGE);

  // Mini Quests Pagination
  const totalPagesMini = Math.ceil(miniQuests.length / ITEMS_PER_PAGE);
  const paginatedMini = miniQuests.slice((pageMini - 1) * ITEMS_PER_PAGE, pageMini * ITEMS_PER_PAGE);

  return (
    <>
      <Navbar />
      <CloudTransition>
        <main className="min-h-screen pt-28 pb-20 px-4 max-w-7xl mx-auto">

          {/* Back Button */}
          <div className="w-full flex justify-start mb-6 -mt-4 md:-mt-8">
            <Link href="/" className="relative group overflow-hidden px-2 py-1 rounded-lg inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold hover:text-amber-500 transition-colors">
              <MagicParticles isSubtle />
              <span className="relative z-10 group-hover:-translate-x-1 transition-transform">←</span>
              <span className="relative z-10">Back to World Map</span>
            </Link>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-slate-800 dark:text-white mb-4">📜 Quest Board</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xl mx-auto">
              Explore the complete archive of my adventures, ranging from epic main storylines to quick side hustles.
            </p>

            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                placeholder="Search by quest name, tech stack, or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-2 border-slate-200 dark:border-slate-700 rounded-2xl text-slate-800 dark:text-white focus:outline-none focus:border-amber-500 transition-colors shadow-lg"
              />
              <span className="absolute right-6 top-4 text-2xl">🔍</span>
            </div>
          </div>

          <div className="md:hidden grid grid-cols-3 gap-2 mb-6">
            {['MAIN', 'SIDE', 'MINI'].map(tab => (
              <button
                key={tab}
                onClick={() => setMobileTab(tab)}
                className={`relative group overflow-hidden py-2.5 rounded-xl text-[11px] sm:text-xs font-bold transition-colors shadow-sm ${mobileTab === tab ? 'bg-amber-500 text-white shadow-amber-500/20' : 'bg-white/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400'}`}
              >
                <MagicParticles isSubtle />
                <span className="relative z-10 flex flex-col sm:block">
                  <span>{tab}</span>
                  <span className="sm:ml-1">QUESTS</span>
                </span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className={`${mobileTab !== 'MAIN' && 'hidden md:block'}`}>
              <div className="flex items-center gap-2 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
                <span className="text-amber-500 text-xl">✦</span>
                <h2 className="text-lg font-bold text-slate-800 dark:text-white">Main Quests</h2>
              </div>
              <div className="flex flex-col gap-4">
              {isLoading ? (
                <p className="text-center text-slate-500 py-8 animate-pulse">Scanning the realm...</p>
              ) : paginatedMain.length > 0 ? (
                <>
                  {paginatedMain.map(project => (
                    <CompactQuestCard 
                      key={project.id} 
                      slug={project.slug} 
                      title={project.title} 
                      type={project.quest_type} 
                      role={project.role} 
                      imageUrl={project.image_url} 
                      skills={project.skills || []} 
                    />
                  ))}
                  <PaginationControls currentPage={pageMain} totalPages={totalPagesMain} setPage={setPageMain} />
                </>
              ) : (
                <div className="text-center p-6 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl">
                  <p className="text-sm text-slate-500 dark:text-slate-400">No quests found.</p>
                </div>
              )}
            </div>
          </div>

          <div className={`${mobileTab !== 'SIDE' && 'hidden md:block'}`}>
            <div className="flex items-center gap-2 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
              <span className="text-blue-500 text-xl">◈</span>
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">Side Quests</h2>
            </div>
            <div className="flex flex-col gap-4">
              {isLoading ? (
                <p className="text-center text-slate-500 py-8 animate-pulse">Scanning the realm...</p>
              ) : paginatedSide.length > 0 ? (
                <>
                  {paginatedSide.map(project => (
                    <CompactQuestCard 
                      key={project.id} 
                      slug={project.slug} 
                      title={project.title} 
                      type={project.quest_type} 
                      role={project.role} 
                      imageUrl={project.image_url} 
                      skills={project.skills || []} 
                    />
                  ))}
                  <PaginationControls currentPage={pageSide} totalPages={totalPagesSide} setPage={setPageSide} />
                </>
              ) : (
                <div className="text-center p-6 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl">
                  <p className="text-sm text-slate-500 dark:text-slate-400">No quests found.</p>
                </div>
              )}
            </div>
          </div>

          <div className={`${mobileTab !== 'MINI' && 'hidden md:block'}`}>
            <div className="flex items-center gap-2 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
              <span className="text-emerald-500 text-xl">✧</span>
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">Mini Quests</h2>
            </div>
            <div className="flex flex-col gap-4">
              {isLoading ? (
                <p className="text-center text-slate-500 py-8 animate-pulse">Scanning the realm...</p>
              ) : paginatedMini.length > 0 ? (
                <>
                  {paginatedMini.map(project => (
                    <CompactQuestCard 
                      key={project.id} 
                      slug={project.slug} 
                      title={project.title} 
                      type={project.quest_type} 
                      role={project.role} 
                      imageUrl={project.image_url} 
                      skills={project.skills || []} 
                    />
                  ))}
                  <PaginationControls currentPage={pageMini} totalPages={totalPagesMini} setPage={setPageMini} />
                </>
              ) : (
                <div className="text-center p-6 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl">
                  <p className="text-sm text-slate-500 dark:text-slate-400">No quests found.</p>
                </div>
              )}
            </div>
            </div>

          </div>
        </main>
      </CloudTransition>
    </>
  );
}

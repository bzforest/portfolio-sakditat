'use client'

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import CloudTransition from '@/components/shared/CloudTransition';
import CloudBackground from '@/components/map/CloudBackground';
import Navbar from '@/components/shared/Navbar';
import { checkAdminStatus } from '@/actions/auth';
import { updateProject } from '@/actions/projects';
import { supabase } from '@/lib/supabase';

export default function EditQuestPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [project, setProject] = useState<any>(null);
  const [fetching, setFetching] = useState(true);

  // Check Authorization & Fetch Data
  useEffect(() => {
    checkAdminStatus().then(async (status) => {
      if (!status) {
        router.push('/settings'); // Redirect if not unlocked
      } else {
        setIsAuthorized(true);
        if (id) {
          const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
          if (data) {
            setProject(data);
          } else {
            setError('Project not found');
          }
        }
        setFetching(false);
      }
    });
  }, [router, id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    // Include existing image URL so we don't lose it if no new image is uploaded
    if (project.image_url) {
      formData.append('existingImage', project.image_url);
    }

    const result = await updateProject(id, formData);

    if (result.success) {
      alert('Quest successfully updated in the Realm!');
      router.push('/settings'); // Redirect back to dashboard
    } else {
      setError(result.error || 'Failed to update quest.');
    }
    setLoading(false);
  };

  if (!isAuthorized || fetching) return null; // Prevent flicker before redirect

  return (
    <CloudTransition>
      <CloudBackground />
      <Navbar />
      <main suppressHydrationWarning className="min-h-screen pt-24 pb-20 px-4 flex justify-center">
        <div className="w-full max-w-3xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl dark:shadow-[0_0_40px_rgba(0,0,0,0.5)]">

          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-semibold text-slate-800 dark:text-white">✏️ Modify Quest</h1>
            <button type="button" onClick={() => router.back()} className="text-slate-500 hover:text-amber-500 transition-colors cursor-pointer">← Back</button>
          </div>

          {error && <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-800">{error}</div>}

          {project ? (
            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Project Title *</label>
                  <input required defaultValue={project.title} type="text" name="title" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-800 dark:text-white focus:ring-1 focus:ring-amber-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">URL Slug * (e.g., vibe-cart)</label>
                  <input required defaultValue={project.slug} type="text" name="slug" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-800 dark:text-white focus:ring-1 focus:ring-amber-500 outline-none" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Quest Type</label>
                  <select defaultValue={project.quest_type} name="questType" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-800 dark:text-white outline-none cursor-pointer">
                    <option value="✦ MAIN QUEST">✦ MAIN QUEST</option>
                    <option value="✦ SIDE QUEST">✦ SIDE QUEST</option>
                    <option value="✦ MINI GAME">✦ MINI GAME</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Pin to Landing Page 📌</label>
                  <label className="flex items-center space-x-3 cursor-pointer mt-3">
                    <input defaultChecked={project.is_pinned} type="checkbox" name="isPinned" className="w-5 h-5 accent-amber-500 cursor-pointer" />
                    <span className="text-slate-700 dark:text-slate-300 cursor-pointer">Feature this quest on the homepage</span>
                  </label>
                </div>
              </div>


              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Role (e.g., Frontend Developer)</label>
                  <input defaultValue={project.role} type="text" name="role" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-800 dark:text-white focus:ring-1 focus:ring-amber-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Timeline (e.g., 12/06/2026 - 15/06/2026)</label>
                  <input defaultValue={project.timeline} type="text" name="timeline" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-800 dark:text-white focus:ring-1 focus:ring-amber-500 outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Tech Stack Skills (Comma separated)</label>
                <input defaultValue={project.skills ? project.skills.join(', ') : ''} type="text" name="skills" placeholder="Next.js, Tailwind CSS, TypeScript" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-800 dark:text-white focus:ring-1 focus:ring-amber-500 outline-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Quest Lore (Description)</label>
                <textarea defaultValue={project.lore} name="lore" rows={6} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-800 dark:text-white focus:ring-1 focus:ring-amber-500 outline-none resize-none"></textarea>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Live Demo URL</label>
                  <input defaultValue={project.demo_link || ''} type="url" name="demoLink" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-800 dark:text-white outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Frontend GitHub URL</label>
                  <input defaultValue={project.frontend_link || ''} type="url" name="frontendLink" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-800 dark:text-white outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Backend GitHub URL</label>
                  <input defaultValue={project.backend_link || ''} type="url" name="backendLink" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-800 dark:text-white outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Project Image (Leave empty to keep current image)</label>
                {project.image_url && (
                  <div className="mb-2 text-sm text-slate-500">Current image: <a href={project.image_url} target="_blank" rel="noreferrer" className="text-amber-600 hover:underline">View</a></div>
                )}
                <input type="file" name="image" accept="image/*" className="w-full text-slate-700 dark:text-slate-300 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200 dark:file:bg-slate-700 dark:file:text-amber-500 cursor-pointer" />
              </div>

              <hr className="border-slate-200 dark:border-slate-700" />

              <button disabled={loading} type="submit" className="w-full py-4 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                {loading ? 'Modifying Quest...' : 'Update Project in Realm'}
              </button>

            </form>
          ) : null}
        </div>
      </main>
    </CloudTransition>
  );
}

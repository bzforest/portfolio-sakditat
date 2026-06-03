'use client'
import { useState, useEffect } from 'react';
import { verifyPasscode, checkAdminStatus, lockEditMode } from '@/actions/auth';
import { deleteProject } from '@/actions/projects';
import { supabase } from '@/lib/supabase';
import CloudTransition from '@/components/shared/CloudTransition';
import Link from 'next/link';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import MagicParticles from '@/components/shared/MagicParticles';
import CloudBackground from '@/components/map/CloudBackground';

export default function SettingsPage() {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    checkAdminStatus().then((status) => {
      setIsUnlocked(status);
      if (status) fetchProjects();
    });
  }, []);

  const fetchProjects = async () => {
    // Note: 'created_at' does not exist in the database, so we omit .order('created_at') to prevent errors.
    const { data } = await supabase.from('projects').select('*');
    if (data) setProjects(data);
  };

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const result = await verifyPasscode(passcode);
    if (result.success) {
      setIsUnlocked(true);
      setPasscode('');
      fetchProjects();
    } else {
      setError(result.message || 'Error');
    }
  };

  const handleLock = async () => {
    await lockEditMode();
    setIsUnlocked(false);
    setProjects([]);
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    if (window.confirm('Are you sure you want to banish this quest? This cannot be undone.')) {
      const result = await deleteProject(id, imageUrl);
      if (result.success) {
        fetchProjects(); // Refresh list
        alert('Quest deleted permanently.');
      } else {
        alert('Error: ' + result.error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <CloudTransition>
        <CloudBackground />
        <main className="min-h-screen pt-24 pb-20 px-4 flex flex-col items-center relative z-10">

          <div className={`w-full ${isUnlocked ? 'max-w-4xl' : 'max-w-md'} bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl transition-all duration-500`}>

            <div className="mb-6">
              <Link href="/" className="relative group overflow-hidden text-slate-500 hover:text-amber-500 transition-colors cursor-pointer text-sm font-bold flex items-center gap-1 w-fit rounded-lg px-2 py-1">
                <MagicParticles isSubtle />
                <span className="relative z-10">← Back to Home</span>
              </Link>
            </div>

            {isUnlocked ? (
              // --- ADMIN DASHBOARD ---
              <div>
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">🛡️ Guild Master Dashboard</h1>
                    <p className="text-emerald-600 dark:text-emerald-400 font-medium text-sm">System Unlocked</p>
                  </div>
                  <div className="flex gap-3">
                    <Link href="/settings/new-quest" className="relative group overflow-hidden px-4 py-2 bg-amber-600 text-white rounded-xl hover:bg-amber-500 transition-colors text-sm font-bold">
                      <MagicParticles isSubtle />
                      <span className="relative z-10">+ Add New Quest</span>
                    </Link>
                    <button onClick={handleLock} className="relative group overflow-hidden px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors text-sm font-bold cursor-pointer">
                      <MagicParticles isSubtle />
                      <span className="relative z-10">Lock System</span>
                    </button>
                  </div>
                </div>

                {/* Projects List */}
                <div className="space-y-4">
                  {projects.map(project => (
                    <div key={project.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div>
                        <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                          {project.title}
                          {project.is_pinned && <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-2 py-1 rounded-md">Pinned</span>}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{project.quest_type}</p>
                      </div>

                      <div className="flex gap-2">
                        <Link href={`/settings/edit-quest/${project.id}`} className="relative group overflow-hidden px-3 py-1.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors cursor-pointer">
                          <MagicParticles isSubtle />
                          <span className="relative z-10">Edit</span>
                        </Link>
                        <button
                          onClick={() => handleDelete(project.id, project.image_url)}
                          className="relative group overflow-hidden px-3 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors cursor-pointer"
                        >
                          <MagicParticles isSubtle />
                          <span className="relative z-10">Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}

                  {projects.length === 0 && (
                    <p className="text-center text-slate-500 py-8">No quests found in the database.</p>
                  )}
                </div>
              </div>
            ) : (
              // --- LOGIN FORM (Keep exactly as it was) ---
              <div className="text-center">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">⚙️ Guild Master Realm</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">Secure System Settings</p>
                <form onSubmit={handleUnlock} className="flex flex-col gap-5">
                  <input
                    type="password"
                    placeholder="Enter Master Passcode..."
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-center transition-all placeholder-slate-400 dark:placeholder-slate-500"
                  />
                  {error && <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>}
                  <button type="submit" className="relative group overflow-hidden px-6 py-3 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-500 transition-colors shadow-lg shadow-amber-600/20 hover:shadow-amber-600/40 cursor-pointer">
                    <MagicParticles isSubtle />
                    <span className="relative z-10">Unlock Edit Mode</span>
                  </button>
                </form>
              </div>
            )}

          </div>
        </main>
      </CloudTransition>
      <Footer />
    </>
  );
}

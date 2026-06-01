'use client';

import React, { useState } from 'react';

interface Project {
  id: string;
  name: string;
  category: string;
  stars: number;
}

export default function HiddenSettingPage() {
  const [projects, setProjects] = useState<Project[]>([
    { id: '1', name: 'Web RPG Map Engine', category: 'Frontend', stars: 5 },
    { id: '2', name: 'Rive Mascot State Machine', category: 'Interactive Animation', stars: 4 },
  ]);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('Frontend');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    const newProj: Project = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      category,
      stars: 3,
    };
    setProjects([...projects, newProj]);
    setName('');
  };

  const handleDelete = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-100">Project Quest CMS</h2>
        <p className="text-slate-400 text-sm">Add or delete projects displayed as bosses/quests on the landing map.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Add Project Form */}
        <section className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-semibold text-rose-400">Add Project Quest</h3>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-400 font-bold mb-1">Project Title</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Supabase Chat Engine"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-rose-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 font-bold mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-rose-500"
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Fullstack">Fullstack</option>
                <option value="Interactive Animation">Interactive Animation</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-2.5 rounded-lg text-sm transition-all"
            >
              Add Project Quest
            </button>
          </form>
        </section>

        {/* Projects List */}
        <section className="md:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-semibold text-rose-400">Active Quests ({projects.length})</h3>
          <div className="space-y-3">
            {projects.length === 0 ? (
              <p className="text-slate-500 text-sm py-4 text-center">No project quests found. Create some on the left!</p>
            ) : (
              projects.map((p) => (
                <div
                  key={p.id}
                  className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex items-center justify-between hover:border-slate-700 transition-colors"
                >
                  <div>
                    <h4 className="font-bold text-slate-200">{p.name}</h4>
                    <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-md mt-1 inline-block">
                      {p.category}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-xs bg-red-950/50 hover:bg-red-900/50 text-red-400 border border-red-900 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

import { create } from 'zustand';

interface UIState {
  activeSection: string;
  isMascotTalking: boolean;
  activeProjectId: string | null;
  setActiveSection: (section: string) => void;
  setIsMascotTalking: (talking: boolean) => void;
  setActiveProjectId: (id: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeSection: 'map',
  isMascotTalking: false,
  activeProjectId: null,
  setActiveSection: (section) => set({ activeSection: section }),
  setIsMascotTalking: (talking) => set({ isMascotTalking: talking }),
  setActiveProjectId: (id) => set({ activeProjectId: id }),
}));

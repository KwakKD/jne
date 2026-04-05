import { create } from "zustand";

interface CurriDrageState {
    selectedTags: number[]
    toggleSelect: (tag: number) => void
    clearSelection: () => void;
}

export const useCurriDragStore = create<CurriDrageState>((set) => ({
    selectedTags: [],
    toggleSelect: (tag) => set((state) => ({
        selectedTags: state.selectedTags.includes(tag)
            ? state.selectedTags.filter(t => t !== tag)
            : [...state.selectedTags, tag]
    })),
    clearSelection: () => set({ selectedTags: [] })
}))
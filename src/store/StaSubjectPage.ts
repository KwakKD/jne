import { create } from "zustand";

interface SubStaStroeProps {
    selectedSubject: string
    setSelectedSubject: (subject: string) => void
    resetSubject: () => void
    
}

export const useStaSubjectPageStore = create<SubStaStroeProps>((set) => ({
    selectedSubject: '',
    setSelectedSubject: (subject) => set({ selectedSubject: subject }),
    resetSubject: () => set({ selectedSubject: '' }),
}))
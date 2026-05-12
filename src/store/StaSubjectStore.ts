import type { STA_SUBJECTS } from "@/type/curri"
import { create } from "zustand"

interface StaSubjectProps {
    userSubjects: STA_SUBJECTS[]
    setUserSubjects: (newitem: STA_SUBJECTS[]) => void
    isLoaded: boolean
    markLoaded: () => void
    inputUserSubject: (
        year: string,
        sub_type: string,
        sub_isgroup: string,
        sub_name: string,
        sub_grade: number,
        sub_sem: number,
        partial: Partial<STA_SUBJECTS>) => void
}

export const useStaSubjectStore = create<StaSubjectProps>((set) => ({
    userSubjects: [],
    setUserSubjects: (newitem) => set(() => ({
        userSubjects: newitem
    })),
    isLoaded: false,
    markLoaded: () => set({ isLoaded: true }),
    inputUserSubject: (year, sub_type, sub_isgroup, sub_name, sub_grade, sub_sem, partial = {}) =>
        set((state) => {
            const idx = state.userSubjects.findIndex(
                (s) =>
                    s.year === year &&
                    s.sub_type === sub_type &&
                    s.sub_isgroup === sub_isgroup &&
                    s.sub_name === sub_name &&
                    s.sub_grade === sub_grade &&
                    s.sub_sem === sub_sem
            )

            if (idx === -1) return state;

            const next = [...state.userSubjects];
            next[idx] = { ...next[idx], ...partial }

            return { userSubjects: next }
        })
}))
import type { SchoolCurriculumProps } from "@/api/supabaseAPI";
import { create } from "zustand";

interface NaviCurriProps {
    selectedSchool: string
    setSelectedSchool: (newSchool: string) => void
    selectedYear: string
    setSelectedYear: (newYear: string) => void
    curri: SchoolCurriculumProps[]
    setCurri: (newCurri: SchoolCurriculumProps[]) => void
}

export const useNaviCurriStore = create<NaviCurriProps>((set) => ({
    selectedSchool: '',
    setSelectedSchool: (newSchool) => set({ selectedSchool: newSchool }),
    selectedYear: '',
    setSelectedYear: (newYear) => set({ selectedYear: newYear }),
    curri: [],
    setCurri: (newCurri) => set({ curri: newCurri })
}))
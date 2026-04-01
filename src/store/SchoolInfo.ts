import type { SchoolInfo } from "@/type/curri";
import { create } from "zustand";


export type GradeKey = 'grade_1' | 'grade_2' | 'grade_3'

interface SchoolInfoProps {
    schoolinfo: SchoolInfo
    setSchoolInfo: (grade: GradeKey, value: number) => void
}

export const useSchoolInfoStore = create<SchoolInfoProps>((set) => ({
    schoolinfo: {
        grade_1: 0,
        grade_2: 0,
        grade_3: 0,
    },
    setSchoolInfo: (grade, value) => set((state) => ({
        schoolinfo: {
            ...state.schoolinfo,
            [grade]: value
        }
    })),
}))
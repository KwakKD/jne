import type { UnionInfoProps } from "@/api/supabaseAPI";
import { create } from "zustand";

interface UnionSubjectProps {
    unionSubjects: UnionInfoProps[]
    setUnionSubjects: (newitem: UnionInfoProps[]) => void
    unionSelectLocation: string
    unionSelectSchool: string
    setUnionSelectLocation: (newLocation: string) => void
    setUnionSelectSchool: (newSchool: string) => void
}

export const useUnionStaStore = create<UnionSubjectProps>((set) => ({
    unionSubjects: [],
    setUnionSubjects: (newitem) => set(() => ({
        unionSubjects: newitem
    })),
    unionSelectLocation: '',
    unionSelectSchool: '',
    setUnionSelectLocation: (newLocation) => set(() => ({
        unionSelectLocation: newLocation
    })),
    setUnionSelectSchool: (newSchool) => set(() => ({
        unionSelectSchool: newSchool
    }))
}))
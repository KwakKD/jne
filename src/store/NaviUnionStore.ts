import type { UnionInfoProps } from "@/api/supabaseAPI";
import { create } from "zustand";

interface UnionSubjectProps {
    unionSubjects:  UnionInfoProps[]
    setUnionSubjects: (newitem:  UnionInfoProps[]) => void
}

export const useNaviUnionStore = create<UnionSubjectProps>((set)=>({
    unionSubjects: [],
    setUnionSubjects: (newitem) => set(()=>({
        unionSubjects: newitem
    }))
}))
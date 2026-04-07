import type { SubjectType } from "@/type/curri";
import type { StateCreator } from "zustand";
import type { SchoolDataSlice } from "./schooldataSlice";

export interface AddSubjectSlice {
    addSubject: (year: string, item: SubjectType) => void;
    delSubject: (year: string, tag: number) => void; // Tag 기반 삭제가 더 직관적입니다.
}

export const createAddSubjectSlice: StateCreator<
    SchoolDataSlice & AddSubjectSlice,
    [],
    [],
    AddSubjectSlice
> = (set) => ({
    addSubject: (year, item) => set((state) => {
        const currentAddSubjects = state.userData[year]?.AddSubject || [];

        // 이미 같은 Tag를 가진 과목이 있는지 확인 (중복 방지)
        if (currentAddSubjects.some(s => s.Tag === item.Tag)) return state;

        return {
            userData: {
                ...state.userData,
                [year]: {
                    ...state.userData[year],
                    AddSubject: [...currentAddSubjects, item]
                }
            }
        };
    }),

    // 특정 Tag를 가진 과목만 쏙 빼는 로직
    delSubject: (year, tag) => set((state) => ({
        userData: {
            ...state.userData,
            [year]: {
                ...state.userData[year],
                AddSubject: state.userData[year].AddSubject.filter(s => s.Tag !== tag)
            }
        }
    }))
})
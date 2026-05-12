import type { UnionSubjects } from "@/type/curri";
import { create } from "zustand";

interface UnionCurriState {
    // 서버에서 가져온 원본 데이터와 별개로, 현재 화면에서 수정 중인 데이터
    editingSubjects: UnionSubjects[];

    // useQuery로 데이터를 받았을 때 스토어에 세팅
    setEditingSubjects: (subjects: UnionSubjects[]) => void;

    addSubject: (year: string) => void;
    updateSubject: <K extends keyof UnionSubjects>(id: string, field: K, value: UnionSubjects[K]) => void;
    deleteSubject: (id: string) => void;
}

export const useUnionCurriStore = create<UnionCurriState>((set) => ({
    editingSubjects: [],

    setEditingSubjects: (subjects) => set({ editingSubjects: subjects }),

    addSubject: (year) => set((state) => ({
        editingSubjects: [
            ...state.editingSubjects,
            {
                id: crypto.randomUUID(), // 라이브러리 없이 브라우저 내장 함수 사용 가능!
                year: year,
                subjectGroup: '',
                subjectType: '',
                subjectName: '',
                grade: '',
                semester: '1학기',
                start: '',
                end: '',
                time: '',
                credit: 0,
                classroom: '',
                schoolName: '',
                location: '',
                mode: '오프라인',
                memo: '',
                isCustom: false,
                min: 0,
                max: 0
            }
        ]
    })),

    updateSubject: (id, field, value) => set((state) => ({
        editingSubjects: state.editingSubjects.map((sub) =>
            sub.id === id ? { ...sub, [field]: value } : sub
        ),
    })),

    deleteSubject: (id) => set((state) => ({
        editingSubjects: state.editingSubjects.filter((sub) => sub.id !== id),
    })),
}));
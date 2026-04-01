import { create } from "zustand"
import { GET_SUBJECT_GROUP, SUBJECT_LABEL, type SubjectCode } from "@/data/Curri/teacher";
import type { subT } from "@/type/curri";

interface TeacherState {
    teacher: Record<SubjectCode, subT>
    updateTeacherValue: <K extends keyof subT> (subject: SubjectCode, key: K, value: subT[K]) => void
    resetTeacher: (data: Record<SubjectCode, subT>) => void
    getSummary: () => { totalAll: number; totalOut: number; grandTotal: number }
}

const createDefaultSubT = (code: SubjectCode): subT => ({
    Group: GET_SUBJECT_GROUP(code),
    all: 0,
    outQuota: 0,
})

const initialTeacher = (Object.keys(SUBJECT_LABEL) as SubjectCode[]).reduce(
    (acc, code) => {
        acc[code] = createDefaultSubT(code);
        return acc;
    },
    {} as Record<SubjectCode, subT>,
);

export const useTeacherStore = create<TeacherState>((set, get) => ({
    teacher: initialTeacher,
    updateTeacherValue: (subject, key, value) => set((state) => ({
        teacher: {
            ...state.teacher,
            [subject]: {
                ...state.teacher[subject],
                [key]: value,
            }
        }
    })),
    resetTeacher: (data) => set(() => ({
        teacher: data
    })),
    getSummary: () => {
        const teacher = get().teacher;
        return Object.values(teacher).reduce(
            (acc, curr) => ({
                totalAll: acc.totalAll + (Number(curr.all) || 0),
                totalOut: acc.totalOut + (Number(curr.outQuota) || 0),
                grandTotal: acc.grandTotal + (Number(curr.all) || 0) + (Number(curr.outQuota) || 0)
            }),
            { totalAll: 0, totalOut: 0, grandTotal: 0 }
        );
    }
}))
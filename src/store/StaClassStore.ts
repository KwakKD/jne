import type { STA_SUBJECTS } from "@/type/curri";
import { create } from "zustand";

type ClassInfo = Record<
    string, // year
    Record<
        number, // sub_sem
        Record<
            string, // sub_isgroup
            Record<string, number>>>> // sub_name : sub_class
// {
//     '2027' : {
//         '그룹1': {
//             '과목명1' : Number
//             '과목명2' : Number
//             sum: Number
//         },
//         '그룹2' : {
//             '과목명3'
//         }
//     }
// }

// {
//     '2027' : {
//         '그룹1': {
//             '과목명1' : {
//                 allCredit: Number,
//                     subject : [{ subject: 과목명1, credit: Number }, { subject: 과목명2, credit: Number }]
//             }
//         }
//     }
// }

interface StaClassProps {
    classinfo: ClassInfo
    setClassinfo: (newdata: STA_SUBJECTS[]) => void
    changeClassinfo: (year: string, sem: number, groupname: string, subjectname: string, value: number) => void
    getGroupSum: (year: string, sem: number, groupname: string) => number
}

function buildClassInfo(newdata: STA_SUBJECTS[]): ClassInfo {
    const result: ClassInfo = {}

    for (const item of newdata) {
        if (item.sub_isgroup === '지정') continue;

        const year = item.year;
        const sem = item.sub_sem ?? 1;
        const groupname = item.sub_isgroup
        const subjectname = item.sub_name;
        const subClassValue = item.sub_class ?? 0



        result[year] ??= {}
        result[year][sem] ??= {}
        result[year][sem][groupname] ??= {}
        result[year][sem][groupname][subjectname] = subClassValue

    }

    return result;
}

export const useStaClassStore = create<StaClassProps>((set, get) => ({
    classinfo: {},
    setClassinfo: (newdata) => set(() => ({
        classinfo: buildClassInfo(newdata)
    })),
    changeClassinfo: (year, sem, groupname, subjectname, value) => set((state) => ({
        classinfo: {
            ...state.classinfo,
            [year]: {
                ...(state.classinfo[year] ?? {}),
                [sem]: {
                    ...(state.classinfo[year]?.[sem] ?? {}),
                    [groupname]: {
                        ...(state.classinfo[year]?.[sem]?.[groupname] ?? {}),
                        [subjectname]: value
                    }
                }

            }
        }
    })),
    getGroupSum: (year, sem, groupname) => {
        const groupObj = get().classinfo[year]?.[sem]?.[groupname] ?? {};
        return Object.values(groupObj).reduce((acc, n) => acc + (n ?? 0), 0);
    }
}))
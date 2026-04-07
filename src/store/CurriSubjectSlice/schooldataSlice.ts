import { YEARS } from "@/data/data";
import { GROUPDATA, type SchoolJsonDataType } from "@/type/curri";
import type { StateCreator } from "zustand";

export interface SchoolDataSlice {
    year: string;
    setYear: (year: string) => void
    userData: Record<string, SchoolJsonDataType>
    setYearData: (year: string, data: SchoolJsonDataType) => void
}

export const createDefaultYear = (): SchoolJsonDataType => ({
    '학교지정': [],
    '선택과목': [],
    // 중요: GROUPDATA는 객체이므로 반드시 새로운 객체로 복사해야 연도별 간섭이 없습니다.
    'Group': JSON.parse(JSON.stringify(GROUPDATA)),
    'AddSubject': [],
    'CEA': {
        '1-1': 0, '1-2': 0,
        '2-1': 0, '2-2': 0,
        '3-1': 0, '3-2': 0,
    },
});

export const createUserSlice: StateCreator<SchoolDataSlice> = (set) => ({
    year: YEARS[0],
    // 2. 학년도 전환
    setYear: (newYear) => set({ year: newYear }),
    // 3. YEARS 배열을 기반으로 모든 연도의 초기 데이터 생성
    userData: YEARS.reduce((acc, y) => ({
        ...acc,
        [y]: createDefaultYear()
    }), {} as Record<string, SchoolJsonDataType>),
    // 4. 데이터 업데이트 로직
    setYearData: (targetYear, data) =>
        set((state) => ({
            userData: {
                ...state.userData,
                [targetYear]: data,
            },
        })),
})
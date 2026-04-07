import type { GroupCell } from "@/type/curri";
import type { StateCreator } from "zustand";
import type { SchoolDataSlice } from "./schooldataSlice";

export interface GroupUpdateSlice {
    groupUpdate: (year: string, key: string, item: Partial<GroupCell>) => void;
}

export const createGroupUpdateSlice: StateCreator<
    SchoolDataSlice & GroupUpdateSlice, 
    [], 
    [], 
    GroupUpdateSlice
> = (set) => ({
    groupUpdate: (year, key, item) => set((state) => {
        // 해당 연도의 데이터가 있는지 먼저 안전하게 확인
        const yearData = state.userData[year];
        if (!yearData) return state;

        return {
            userData: {
                ...state.userData,
                [year]: {
                    ...yearData,
                    Group: {
                        ...yearData.Group,
                        [key]: {
                            ...yearData.Group[key],
                            ...item // 변경된 필드만 덮어쓰기
                        }
                    }
                }
            }
        };
    })
});
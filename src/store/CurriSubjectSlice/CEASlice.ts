import type { StateCreator } from "zustand";
import type { SchoolDataSlice } from "./schooldataSlice";

export interface CEAChangeSlice {
    changeCEA: (year: string, key: string, credit: number) => void;
}

export const createChangeCEASlice: StateCreator<SchoolDataSlice & CEAChangeSlice, [], [], CEAChangeSlice> = (set) => ({
    changeCEA: (year, key, credit) => set((state) => ({
        userData: {
            ...state.userData,
            [year]: {
                ...state.userData[year],
                CEA: {
                    ...state.userData[year].CEA,
                    [key]: credit
                }
            }
        }
    }))
})
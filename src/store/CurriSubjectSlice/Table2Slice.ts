import type { JsonData } from "@/type/curri"
import type { SchoolDataSlice } from "./schooldataSlice"
import type { StateCreator } from "zustand"

export interface Table2Slice {
    addTable2: (year: string, item: JsonData[]) => void
    inputTable2: (year: string, tag: number, partial: Partial<JsonData>) => void
}

export const createTable2Slice: StateCreator<Table2Slice & SchoolDataSlice, [], [], Table2Slice> = (set) => ({
    addTable2: (year, item) => set((state) => ({
        userData: {
            ...state.userData,
            [year]: {
                ...state.userData[year],
                '선택과목': item
            }
        }
    })),
    inputTable2: (year, tag, partial) => set((state) => ({
        userData: {
            ...state.userData,
            [year]: {
                ...state.userData[year],
                '선택과목': state.userData[year].선택과목.map((item) =>
                    item.Tag === tag ? { ...item, ...partial } : item)
            }
        }
    }))
})
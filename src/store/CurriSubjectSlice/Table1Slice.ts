import type { JsonData } from "@/type/curri"
import type { StateCreator } from "zustand"
import type { SchoolDataSlice } from "./schooldataSlice"

export interface Table1Slice {
    addTable1: (year: string, item: JsonData[]) => void
    inputTable1: (year: string, tag: number, partial: Partial<JsonData>) => void
    deleteTable1: (year: string, Tag: number) => void
}
export const createTable1Slice: StateCreator<
    Table1Slice & SchoolDataSlice,
    [],
    [],
    Table1Slice
> = (set) => ({
    addTable1: (year, item) => set((state) => ({
        userData: {
            ...state.userData,
            [year]: {
                ...state.userData[year],
                '학교지정': item
            }
        }
    })),
    inputTable1: (year, tag, partial) => set((state) => ({
        userData: {
            ...state.userData,
            [year]: {
                ...state.userData[year],
                '학교지정': state.userData[year].학교지정.map((item) =>
                    item.Tag === tag ? { ...item, ...partial } : item)
            }
        }
    })),
    deleteTable1: (year, tag) => set((state) => ({
        userData: {
            ...state.userData,
            [year]: {
                ...state.userData[year],
                '학교지정': state.userData[year].학교지정.filter(sub => sub.Tag !== tag)
            }
        }
    }))
})
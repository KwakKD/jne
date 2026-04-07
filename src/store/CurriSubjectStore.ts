import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createUserSlice, type SchoolDataSlice } from "./CurriSubjectSlice/schooldataSlice";
import { createGroupUpdateSlice, type GroupUpdateSlice } from "./CurriSubjectSlice/GroupUpdateSlice";
import { createAddSubjectSlice, type AddSubjectSlice } from "./CurriSubjectSlice/AddSubjectSliec";
import { createChangeCEASlice, type CEAChangeSlice } from "./CurriSubjectSlice/CEASlice";
import { createTable1Slice, type Table1Slice } from "./CurriSubjectSlice/Table1Slice";
import { createTable2Slice, type Table2Slice } from "./CurriSubjectSlice/Table2Slice";

export type CurriTableStoreState =
    SchoolDataSlice &
    GroupUpdateSlice &
    AddSubjectSlice &
    CEAChangeSlice &
    Table1Slice &
    Table2Slice

export const useCurriTableStore = create<CurriTableStoreState>()(
    persist(
        (...a) => ({
            ...createUserSlice(...a),
            ...createGroupUpdateSlice(...a),
            ...createAddSubjectSlice(...a),
            ...createChangeCEASlice(...a),
            ...createTable1Slice(...a),
            ...createTable2Slice(...a)
        }),
        {
            name: 'schoolJsonData',
            partialize: (state) => ({
                userData: state.userData
            })
        }
    )
)
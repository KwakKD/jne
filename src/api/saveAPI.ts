import { supabase } from "@/lib/supabase"
import type { SchoolInfoProps } from "./supabaseAPI"
import type { FullUserInfo } from "@/hooks/useAuth"
import type { SubjectCode } from "@/data/Curri/teacher"
import type { SchoolJsonDataType, subT } from "@/type/curri"

export const saveSchoolInfo = async (user: FullUserInfo, data: SchoolInfoProps) => {
    const { error } = await supabase
        .from('schoolinfo')
        .upsert({
            user_id: user.id, // 💡 반드시 컬럼 타입이 UUID여야 함
            schoolname: user.schoolname,
            grade_1: data.grade_1,
            grade_2: data.grade_2,
            grade_3: data.grade_3,
            allClass: data.grade_1 + data.grade_2 + data.grade_3,
            location: user.location
        }, { onConflict: 'user_id' })
        .select()

    if (error) throw error
    return true
}

export const saveTeacherInfo = async (user: FullUserInfo, data: Record<SubjectCode, subT>) => {
    const { error } = await supabase
        .from('teacherdata')
        .upsert({
            user_id: user.id,
            schoolname: user.schoolname,
            teacher_info: data
        }, { onConflict: 'user_id' })
        .select()

    if (error) throw error
    return true
}

export const saveCurriData = async (user: FullUserInfo, userData: Record<string, SchoolJsonDataType>) => {
    const rows = (Object.keys(userData) as Array<keyof typeof userData>).map(
        (key) => {
            const insertData = userData[key]
            return {
                user_id: user.id,
                year: key,
                location: user.location,
                schoolname: user.schoolname,
                role: 'admin',
                fix: insertData.학교지정,
                choice: insertData.선택과목,
                groupdata: insertData.Group,
                addsubjects: insertData.AddSubject,
                CEA: insertData.CEA,
            }
        }
    )

    const { error } = await supabase
        .from("schoolsdata")
        .upsert(rows, {
            onConflict: 'user_id,year',
        });

    if (error) throw error
    return true
}
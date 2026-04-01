import type { SubjectCode } from "@/data/Curri/teacher"
import { supabase } from "@/lib/supabase"
import type { subT } from "@/type/curri"

export interface UserInfoProps {
    role: string
    schoolname: string
    location: string
}

export interface SchoolInfoProps {
    grade_1: number
    grade_2: number
    grade_3: number
}

const fetchUser = async (userId: string): Promise<UserInfoProps | null> => {
    const { data: userinfo, error: userinfoError } = await supabase
        .from('userinfo')
        .select('role, schoolname, location')
        .eq('id', userId)
        .single()

    if (userinfoError) throw new Error(userinfoError.message)
    return userinfo
}

const fetchSchoolInfo = async (userId: string): Promise<SchoolInfoProps | null> => {
    const { data: schoolinfo, error: schoolinfoError } = await supabase
        .from('schoolinfo')
        .select('grade_1, grade_2, grade_3')
        .eq('user_id', userId)
        .single()

    if (schoolinfoError) throw new Error(schoolinfoError.message)

    return schoolinfo
}
const fetchTeacherInfo = async (userId: string): Promise<Record<SubjectCode, subT>> => {
    const { data, error } = await supabase
        .from('teacherdata')
        .select('teacher_info')
        .eq('user_id', userId)
        .maybeSingle() // 💡 .single() 대신 .maybeSingle() 권장 (데이터 없을 때 대응)

    if (error) throw new Error(error.message)

    // 데이터가 아예 없는 경우(신규 유저)를 위한 예외 처리
    if (!data || !data.teacher_info) {
        // 이전에 만드신 initialTeacher 값을 반환하거나 빈 객체를 반환
        return {} as Record<SubjectCode, subT>
    }

    // data는 { teacher_info: { ... } } 형태이므로 알맹이만 반환
    return data.teacher_info as Record<SubjectCode, subT>
}

export { fetchUser, fetchSchoolInfo, fetchTeacherInfo }
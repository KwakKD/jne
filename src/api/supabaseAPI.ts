import type { SubjectCode } from "@/data/Curri/teacher"
import { supabase } from "@/lib/supabase"
import type { STA_SUBJECTS, subT } from "@/type/curri"

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

export interface UnionInfoProps {
    id: string
    year: string
    subject_type: string
    subject_name: string
    grade: string
    semester: '1학기' | '여름방학' | '2학기' | '겨울방학'
    start_date: string
    end_date: string
    operating_time: string
    credit: number
    classroom: string
    school_name: string
    location: string
    mode: string
    memo: string
    create_at: string
    user_id: string
    subject_group: string
    custom: boolean
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


const fetchUnionSubInfo = async (userId: string): Promise<UnionInfoProps[]> => {
    const { data: unionData, error } = await supabase
        .from('union_subjects')
        .select('*')
        .eq('user_id', userId)

    if (error) throw new Error(error.message)

    return unionData
}

const fetchStaUnionInfo = async (): Promise<UnionInfoProps[]> => {
    const { data: staUnionData, error } = await supabase
        .from('union_subjects')
        .select('*')

    if (error) throw new Error(error.message)

    return staUnionData
}

const fetchSchoolDataSta = async (userId: string): Promise<STA_SUBJECTS[]> => {
    const { data: schoolDataSta, error } = await supabase
        .from('schoolsdatasta')
        .select('user_id, schoolname, year, sub_type, sub_name, sub_grade, sub_sem, sub_credit, sub_isgroup, sub_class, sub_teach, sub_subgroup, location')
        .eq('user_id', userId)

    if (error) throw new Error(error.message)

    return schoolDataSta
}

const fetchSchoolData = async (userId: string) => {
    const { data: schoolsdata, error: schoolsdataError } = await supabase
        .from('schoolsdata')
        .select('year,fix,choice,groupdata,addsubjects,CEA')
        .eq('user_id', userId)
    if (schoolsdataError) throw new Error(schoolsdataError.message)

    return schoolsdata
}

export { fetchUser, fetchSchoolInfo, fetchTeacherInfo, fetchUnionSubInfo, fetchStaUnionInfo, fetchSchoolDataSta, fetchSchoolData }

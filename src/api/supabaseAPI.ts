import type { SubjectCode } from "@/data/Curri/teacher"
import { YEARS } from "@/data/data"
import { supabase } from "@/lib/supabase"
import type { CEAtype, GroupData, JsonData, SchoolClassDataProps, STA_SUBJECTS, subT } from "@/type/curri"

export interface UserInfoProps {
    role: string
    schoolname: string
    location: string
    name: string
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

export interface SubjectStat {
    location: string;
    schoolname: string;
    year: string;
    sub_type: string;
    sub_name: string;
    sub_grade: number;
    sub_sem: number;
    sub_credit: number;
    sub_isgroup: string;
}

export interface SchoolCurriculumProps {
    fix: JsonData[]
    choice: JsonData[]
    CEA: CEAtype
    groupdata: GroupData
}

export interface SubJectGroupProps {
    location: string;
    schoolname: string;
    year: string;
    sub_type: string;
    sub_name: string;
    sub_grade: number;
    sub_sem: number;
    sub_credit: number;
    sub_isgroup: string;
    sub_class: number | null;
    // sub_teach: TeachProps[] | null
    sub_subgroup: string
}

export interface NoticeProps {
    id?: number
    created_at?: string
    path: string
    type: string
    title: string
    content: string
    important: boolean
    user_id?: string
    disable?: boolean
}

const NOT_IN_DATA_CURRI: SchoolCurriculumProps = {
    fix: [],
    choice: [],
    CEA: {},
    groupdata: {}
}
const NOW_YEAR = [
    { grade: 1, sem: 1, year: YEARS[1] },
    { grade: 1, sem: 2, year: YEARS[1] },
    { grade: 2, sem: 1, year: YEARS[0] },
    { grade: 2, sem: 2, year: YEARS[0] }
]

const NEXT_YEAR = [
    { grade: 1, sem: 1, year: YEARS[2] },
    { grade: 1, sem: 2, year: YEARS[2] },
    { grade: 2, sem: 1, year: YEARS[1] },
    { grade: 2, sem: 2, year: YEARS[1] },
    { grade: 3, sem: 1, year: YEARS[0] },
    { grade: 3, sem: 2, year: YEARS[0] }
]

const fetchUser = async (userId: string): Promise<UserInfoProps | null> => {
    const { data: userinfo, error: userinfoError } = await supabase
        .from('userinfo')
        .select('role, schoolname, location, name')
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
        .maybeSingle()

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

const fetchSubjectStats = async (subjectName: string): Promise<SubjectStat[] | null> => {
    if (!subjectName) return null

    const { data, error } = await supabase
        .from('schoolsdatasta')
        .select('location, schoolname, year, sub_type, sub_name, sub_grade, sub_sem, sub_credit, sub_isgroup')
        .eq('sub_name', subjectName)

    if (error) throw new Error(error.message)
    return data
}

const fetchSchoolCurriculum = async (schoolName: string, year: string): Promise<SchoolCurriculumProps[]> => {

    const { data, error } = await supabase
        .from('schoolsdata')
        .select('fix, choice, CEA, groupdata')
        .eq('schoolname', schoolName)
        .eq('year', year);

    if (error) throw error
    return data || NOT_IN_DATA_CURRI;
}

const fetchAllSchoolInfo = async (): Promise<SchoolClassDataProps[]> => {
    const { data, error } = await supabase
        .from('schoolinfo')
        .select('schoolname, location, grade_1, grade_2, grade_3, allClass');

    if (error) throw new Error(error.message);
    return data || [];
}

const fetchSubjectGroupStats = async (subjectGroup: string, year: string): Promise<SubJectGroupProps[] | null> => {
    if (!subjectGroup) return null

    const nowYearConditions = NOW_YEAR.map(
        item => `and(sub_grade.eq.${item.grade},sub_sem.eq.${item.sem},year.eq."${item.year}")`
    ).join(',');

    const nextYearConditions = NEXT_YEAR.map(
        item => `and(sub_grade.eq.${item.grade},sub_sem.eq.${item.sem},year.eq."${item.year}")`
    ).join(',');

    const { data, error } = await supabase
        .from('schoolsdatasta')
        .select('schoolname, year, sub_type, sub_name, sub_grade, sub_sem, sub_credit, sub_isgroup, sub_class, sub_subgroup, location')
        .eq('sub_subgroup', subjectGroup)
        .in('sub_type', ['지정', '선택'])
        .or(year === YEARS[1] ? nowYearConditions : nextYearConditions)
        .limit(5000)

    if (error) throw new Error(error.message)
    return data
}

const downloadAttachment = async (filePath: string, fileName: string): Promise<void> => {
    try {
        const { data, error } = await supabase
            .storage
            .from('jne-menual')
            .download(filePath)

        if (error) throw error

        const blobUrl = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName;

        document.body.appendChild(link);
        link.click();

        link.remove();
        window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error("Storage 서비스 에러:", error);
        throw error; // 컴포넌트에서 에러 UI를 띄울 수 있도록 에러를 위로 던짐
    }
}

const fetchNavStaSchool = async () => {
    const { data, error } = await supabase
        .from('schoolsdata')
        .select('schoolname')

    if (error) throw new Error(error.message);
    return data || [];
}

// 관라지용 API
const fetchAllUser = async () => {
    const { data, error } = await supabase
        .from('userinfo')
        .select('id, schoolname, location, role, isapproved')
        .order('schoolname', { ascending: true })


    if (error) throw new Error(error.message)
    return data
}

const fetchAdminNotice = async (): Promise<NoticeProps[]> => {
    const { data, error } = await supabase
        .from('notice')
        .select('id, created_at, path, type, title, content, important, user_id, disable')

    if (error) throw new Error(error.message);
    return data
}

// const fetchNavNotice = async (): Promise<NoticeProps[]> => {
//     const { data, error } = await supabase
//         .from('notice')
//         .select('id, created_at, path, type, title, content, important, user_id')
//         .eq('path', 'nav')
//         .order('created_at', { ascending: false })

//     if (error) throw new Error(error.message);
//     return data
// }

// const fetchCurriNotice = async (): Promise<NoticeProps[]> => {
//     const { data, error } = await supabase
//         .from('notice')
//         .select('id, created_at, path, type, title, content, important, user_id')
//         .eq('path', 'curri')
//         .order('created_at', { ascending: false })

//     if (error) throw new Error(error.message);
//     return data
// }

const fetchNoticeByPath = async (path: 'nav' | 'curri'): Promise<NoticeProps[]> => {
    const { data, error } = await supabase
        .from('notice')
        .select('id, created_at, path, type, title, content, important, user_id, disable')
        .eq('path', path)
        .eq('disable', true)
        .order('created_at', { ascending: false })

    if (error) throw new Error(error.message);
    return data
}

const deleteAdminNotice = async (id: number): Promise<void> => {
    const { error } = await supabase
        .from('notice')
        .delete()
        .eq('id', id); // 'id' 컬럼의 값이 전달받은 id와 일치하는 행 삭제

    if (error) {
        throw new Error(error.message);
    }
};

const upsertAdminNotice = async (notice: NoticeProps, userId: string): Promise<void> => {
    // 1. 수정 (notice.id가 있는 경우)
    if (notice.id) {
        const { error } = await supabase
            .from("notice")
            .update({
                path: notice.path,
                type: notice.type,
                title: notice.title,
                content: notice.content,
                important: notice.important,
                disable: notice.disable,
            })
            .eq("id", notice.id);

        if (error) throw new Error(error.message);
        return;
    }

    // 2. 신규 등록 (notice.id가 없는 경우)
    const { error } = await supabase.from("notice").insert([
        {
            path: notice.path,
            type: notice.type,
            title: notice.title,
            content: notice.content,
            important: notice.important,
            user_id: userId, // 전달받은 user_id 저장
            disable: notice.disable ?? true,
        },
    ]);

    if (error) throw new Error(error.message);
};

export {
    fetchUser,
    fetchSchoolInfo,
    fetchTeacherInfo,
    fetchUnionSubInfo,
    fetchStaUnionInfo,
    fetchSchoolDataSta,
    fetchSchoolData,
    fetchSubjectStats,
    fetchSchoolCurriculum,
    fetchAllSchoolInfo,
    fetchSubjectGroupStats,
    downloadAttachment,
    fetchNavStaSchool,
    fetchAllUser,
    fetchNoticeByPath,
    fetchAdminNotice,
    // fetchNavNotice,
    // fetchCurriNotice,
    deleteAdminNotice,
    upsertAdminNotice
}

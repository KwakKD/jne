import { supabase } from "@/lib/supabase"
import type { SchoolInfoProps } from "./supabaseAPI"
import type { FullUserInfo } from "@/hooks/useAuth"
import type { SubjectCode } from "@/data/Curri/teacher"
import type { SchoolInfo, SchoolJsonDataType, STA_SUBJECTS, subT, UnionSubjects } from "@/type/curri"
import { YEARS } from "@/data/data"

const MUST_SELECT_SUBJECT = ['예술', '교양', '기술∙가정/정보', '제2외국어/한문']


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

export const saveCurriData = async (user: FullUserInfo, userData: Record<string, SchoolJsonDataType>, schoolinfo: SchoolInfo) => {
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

    const newitem: STA_SUBJECTS[] = []
    Object.keys(userData).forEach((year) => {
        userData[year].학교지정.forEach(item => {
            if (item.IsGroup === '') {
                const classNumber = year === YEARS[0] ? schoolinfo.grade_3 : (year === YEARS[1] ? schoolinfo.grade_2 : schoolinfo.grade_1)
                const teach = (MUST_SELECT_SUBJECT.includes(item.SubjectGroup)) ?
                    { subject: '', credit: 0 } :
                    { subject: item.SubjectGroup, credit: classNumber * Number(item.Credit) }

                const inItem: STA_SUBJECTS = {
                    user_id: user.id,
                    schoolname: user.schoolname,
                    year: year,
                    sub_type: '지정',
                    sub_name: item.SubjectName,
                    sub_grade: Number(item.Grade),
                    sub_sem: Number(item.Semester),
                    sub_credit: Number(item.Credit),
                    sub_isgroup: '지정',
                    sub_class: classNumber,
                    sub_teach: [teach], //나중에 정보를 입력할 예정임.
                    sub_subgroup: item.SubjectGroup,
                    location: user.location
                }
                newitem.push(inItem)
            } else {
                const teach = (MUST_SELECT_SUBJECT.includes(item.SubjectGroup)) ?
                    { subject: '', credit: 0 } :
                    { subject: item.SubjectGroup, credit: 0 }
                const initem1: STA_SUBJECTS = {
                    user_id: user.id,
                    schoolname: user.schoolname,
                    year: year,
                    sub_type: '지정',
                    sub_name: item.SubjectName,
                    sub_grade: Number(item.Grade),
                    sub_sem: 1,
                    sub_credit: Number(item.Credit),
                    sub_isgroup: item.IsGroup,
                    sub_class: null, //나중에 학교정보에서 가져와야함.
                    sub_teach: [teach], //나중에 정보를 입력할 예정임.
                    sub_subgroup: item.SubjectGroup,
                    location: user.location
                }
                const initem2: STA_SUBJECTS = {
                    user_id: user.id,
                    schoolname: user.schoolname,
                    year: year,
                    sub_type: '지정',
                    sub_name: item.SubjectName,
                    sub_grade: Number(item.Grade),
                    sub_sem: 2,
                    sub_credit: Number(item.Credit),
                    sub_isgroup: item.IsGroup,
                    sub_class: null, //나중에 학교정보에서 가져와야함.
                    sub_teach: [teach], //나중에 정보를 입력할 예정임.
                    sub_subgroup: item.SubjectGroup,
                    location: user.location
                }
                newitem.push(initem1)
                newitem.push(initem2)
            }
        })

        userData[year].선택과목.forEach(item => {
            const teach = (MUST_SELECT_SUBJECT.includes(item.SubjectGroup)) ?
                { subject: '', credit: 0 } :
                { subject: item.SubjectGroup, credit: 0 }
            const initem: STA_SUBJECTS = {
                user_id: user.id,
                schoolname: user.schoolname,
                year: year,
                sub_type: '선택',
                sub_name: item.SubjectName,
                sub_grade: Number(item.Grade),
                sub_sem: Number(item.Semester),
                sub_credit: Number(item.Credit),
                sub_isgroup: item.IsGroup,
                sub_class: null, //나중에 학교정보에서 가져와야함.
                sub_teach: [teach], //나중에 정보를 입력할 예정임.
                sub_subgroup: item.SubjectGroup,
                location: user.location
            }
            newitem.push(initem)
        })
    })

    for (const year of Object.keys(userData)) {
        const itemsForYear = newitem.filter(x => x.year === year);

        const { error } = await supabase.rpc("sync_schoolsdatasta_year", {
            p_schoolname: user.schoolname,
            p_year: year,
            p_subjects: itemsForYear,
        })

        if (error) throw error
    }

    return true
}

export const saveUnionData = async (
    user: FullUserInfo, unionData: UnionSubjects[], year: string
) => {
    const activeIds = unionData
        .filter((sub) => sub.id.length > 20)
        .map((sub) => sub.id)

    try {
        // [STEP 1] 삭제: 현재 연도/학교 데이터 중, activeIds에 포함되지 않은 것들 삭제
        // 만약 activeIds가 비어있다면 해당 연도/학교의 모든 데이터를 삭제하게 됩니다.
        let deleteQuery = supabase
            .from("union_subjects")
            .delete()
            .eq("year", year)
            .eq("school_name", user.schoolname);

        // 유지할 데이터가 있다면 그 데이터들만 제외하고 삭제
        if (activeIds.length > 0) {
            deleteQuery = deleteQuery.not("id", "in", `(${activeIds.join(",")})`);
        }

        const { error: deleteError } = await deleteQuery;
        if (deleteError) throw new Error(`삭제 중 오류 발생: ${deleteError.message}`);

        // [STEP 2] Upsert: 데이터가 하나도 없을 경우(모두 삭제한 경우)는 건너뜀
        if (unionData.length === 0) return [];

        // DB 컬럼명(Snake Case)에 맞춰 데이터 매핑
        const dataToUpsert = unionData.map((sub) => ({
            // UUID가 아니면(새로 추가된 행이면) id를 아예 보내지 않아 DB에서 자동 생성하게 함
            ...(sub.id.length > 20 ? { id: sub.id } : {}),
            year: sub.year,
            subject_type: sub.subjectType,
            subject_name: sub.subjectName,
            grade: sub.grade,
            semester: sub.semester,
            start_date: sub.start,
            end_date: sub.end,
            operating_time: sub.time,
            credit: sub.credit,
            classroom: sub.classroom,
            school_name: user.schoolname,
            location: user.location,
            mode: sub.mode,
            memo: sub.memo,
            created_at: new Date().toISOString(),
            user_id: user.id,
            subject_group: sub.subjectGroup,
            custom: sub.isCustom
        }));

        const { data, error: upsertError } = await supabase
            .from("union_subjects")
            .upsert(dataToUpsert)
            .select();

        if (upsertError) throw new Error(`저장 중 오류 발생: ${upsertError.message}`);

        return data;
    } catch (error) {
        console.error("Critical Save Error:", error);
        throw error;
    }
}

export const saveCreditData = async (user: FullUserInfo, userSubjects: STA_SUBJECTS[]) => {
    // 각 연도별 저장 작업을 Promise 배열로 생성
    const savePromises = YEARS.map(async (y) => {
        const itemsForYear = userSubjects.filter(x => x.year === y);

        // 해당 연도에 데이터가 있을 때만 요청 보냄 (선택 사항)
        if (itemsForYear.length === 0) return null;

        const { error } = await supabase.rpc("sync_schoolsdatasta_year", {
            p_schoolname: user.schoolname,
            p_year: y,
            p_subjects: itemsForYear,
        });

        if (error) {
            console.error(`${y}년도 저장 중 오류 발생:`, error);
            throw error;
        }
    });

    // 모든 요청이 완료될 때까지 대기
    await Promise.all(savePromises);
};
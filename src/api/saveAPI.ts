import { supabase } from "@/lib/supabase"
import type { SchoolInfoProps } from "./supabaseAPI"
import type { FullUserInfo } from "@/hooks/useAuth"
import type { SubjectCode } from "@/data/Curri/teacher"
import type { SchoolInfo, SchoolJsonDataType, STA_SUBJECTS, subT } from "@/type/curri"
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
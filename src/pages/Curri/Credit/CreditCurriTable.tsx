import { Badge, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui"
import { GET_SUBJECT_GROUP, SUBJECT_CODES_IN_ORDER } from "@/data/Curri/teacher"
import { YEARS } from "@/data/data"
import { useCurriTableStore } from "@/store/CurriSubjectStore"
import { useSchoolInfoStore } from "@/store/SchoolInfo"
import { useStaClassStore } from "@/store/StaClassStore"
import { useStaSubjectStore } from "@/store/StaSubjectStore"
import { useTeacherStore } from "@/store/TeacherStore"
import type { JsonData } from "@/type/curri"
import { useMemo, useState } from "react"
import { CreditPopUp } from "./CreditPopUp"

const ERROR_BG = 'rgb(255, 59, 48)'
const SUCCESS_BG = 'rgb(0, 122, 255)'
const OVER_BG = 'rgb(52, 199, 89)'
const MUST_SELECT_SUBJECT = ['예술', '교양', '기술∙가정/정보', '제2외국어/한문']


function CreditCurriTable() {
    const [selectGrade, setSelectGrade] = useState('1학년');
    const [selectSem, setSelectSem] = useState('1학기');
    const schoolinfo = useSchoolInfoStore((state) => state.schoolinfo)
    const teacher = useTeacherStore((state) => state.teacher)
    const classinfo = useStaClassStore((state) => state.classinfo)
    const getGroupSum = useStaClassStore((state) => state.getGroupSum)
    const changeClassinfo = useStaClassStore((state) => state.changeClassinfo)
    const userSubjects = useStaSubjectStore((state) => state.userSubjects)
    const inputUserSubject = useStaSubjectStore((state) => state.inputUserSubject)
    const userData = useCurriTableStore((state) => state.staUserData)
    const [popupConfig, setPopupConfig] = useState({
        isopened: false,
        subName: '',
        subCredit: 0,
        subType: '지정',
        subGroup: '지정'
    })

    const grade_1 = schoolinfo.grade_1
    const grade_2 = schoolinfo.grade_2
    const grade_3 = schoolinfo.grade_3
    console.log(schoolinfo)

    const schoolteacher = (Object.keys(teacher) as Array<keyof typeof teacher>)
        .filter(key => teacher[key].all !== 0 || teacher[key].outQuota !== 0)

    const schoolteacherORDER = SUBJECT_CODES_IN_ORDER
        .filter(sub => schoolteacher.includes(sub))
    // .map(item => SUBJECT_LABEL[item])
    // 콤보박스용 리스트
    const schoolteacherList =
        ['', '직접입력', ...new Set(schoolteacherORDER
            .map(sub => GET_SUBJECT_GROUP(sub)))]

    const currentGradeCount = useMemo(() => {
        const gradeKey = selectGrade === '1학년' ? 'grade_1' : selectGrade === '2학년' ? 'grade_2' : 'grade_3';
        return schoolinfo[gradeKey as keyof typeof schoolinfo];
    }, [selectGrade, schoolinfo]);

    const handleInputChangeFix = (item: JsonData, year: string, sem: number, value: number) => {
        const gradeNumber = Number(selectGrade[0]);
        const semNumber = Number(selectSem[0]);
        const classNumber = gradeNumber === 1 ? grade_1 : (gradeNumber === 2 ? grade_2 : grade_3);
        if (value < 0) return
        if (value > classNumber) return

        const other_sub = Object.keys(classinfo[year][sem][item.IsGroup])
        if (other_sub.length === 0) return

        const other_sub_name = other_sub.filter(sub => !sub.includes(item.SubjectName))[0]

        const otherValue = classNumber - value
        const filterduserSubjects = userSubjects
            .find(sub => sub.year === year &&
                sub.sub_grade === gradeNumber &&
                sub.sub_sem === semNumber &&
                sub.sub_name === item.SubjectName)
        const filterduserOtherSubjects = userSubjects
            .find(sub => sub.year === year &&
                sub.sub_grade === gradeNumber &&
                sub.sub_sem === semNumber &&
                sub.sub_name === other_sub_name)
        if (semNumber === 1) {
            changeClassinfo(year, 1, item.IsGroup, item.SubjectName, value)
            changeClassinfo(year, 2, item.IsGroup, item.SubjectName, otherValue)
            changeClassinfo(year, 1, item.IsGroup, other_sub_name, otherValue)
            changeClassinfo(year, 2, item.IsGroup, other_sub_name, value)
            inputUserSubject(year, "지정", item.IsGroup, item.SubjectName, gradeNumber, 1, { sub_class: value })
            inputUserSubject(year, "지정", item.IsGroup, item.SubjectName, gradeNumber, 2, { sub_class: otherValue })
            inputUserSubject(year, "지정", item.IsGroup, other_sub_name, gradeNumber, 1, { sub_class: otherValue })
            inputUserSubject(year, "지정", item.IsGroup, other_sub_name, gradeNumber, 2, { sub_class: value })

            if (filterduserSubjects?.sub_teach) {
                if (filterduserSubjects.sub_teach.length === 1) {
                    const sub = filterduserSubjects.sub_teach[0].subject
                    inputUserSubject(year, "지정", item.IsGroup, item.SubjectName, gradeNumber, 1, { sub_teach: [{ subject: sub, credit: value * Number(item.Credit) }] })
                    inputUserSubject(year, "지정", item.IsGroup, item.SubjectName, gradeNumber, 2, { sub_teach: [{ subject: sub, credit: otherValue * Number(item.Credit) }] })
                }
            }

            if (filterduserOtherSubjects?.sub_teach) {
                if (filterduserOtherSubjects.sub_teach.length === 1) {
                    const sub = filterduserOtherSubjects.sub_teach[0].subject
                    inputUserSubject(year, "지정", item.IsGroup, other_sub_name, gradeNumber, 1, { sub_teach: [{ subject: sub, credit: otherValue * Number(item.Credit) }] })
                    inputUserSubject(year, "지정", item.IsGroup, other_sub_name, gradeNumber, 2, { sub_teach: [{ subject: sub, credit: value * Number(item.Credit) }] })
                }
            }
        } else {
            changeClassinfo(year, 2, item.IsGroup, item.SubjectName, value)
            changeClassinfo(year, 1, item.IsGroup, item.SubjectName, otherValue)
            changeClassinfo(year, 2, item.IsGroup, other_sub_name, otherValue)
            changeClassinfo(year, 1, item.IsGroup, other_sub_name, value)
            inputUserSubject(year, "지정", item.IsGroup, item.SubjectName, gradeNumber, 2, { sub_class: value })
            inputUserSubject(year, "지정", item.IsGroup, item.SubjectName, gradeNumber, 1, { sub_class: otherValue })
            inputUserSubject(year, "지정", item.IsGroup, other_sub_name, gradeNumber, 2, { sub_class: otherValue })
            inputUserSubject(year, "지정", item.IsGroup, other_sub_name, gradeNumber, 1, { sub_class: value })

            if (filterduserSubjects?.sub_teach) {
                if (filterduserSubjects.sub_teach.length === 1) {
                    const sub = filterduserSubjects.sub_teach[0].subject
                    inputUserSubject(year, "지정", item.IsGroup, item.SubjectName, gradeNumber, 2, { sub_teach: [{ subject: sub, credit: value * Number(item.Credit) }] })
                    inputUserSubject(year, "지정", item.IsGroup, item.SubjectName, gradeNumber, 1, { sub_teach: [{ subject: sub, credit: otherValue * Number(item.Credit) }] })
                }
            }

            if (filterduserOtherSubjects?.sub_teach) {
                if (filterduserOtherSubjects.sub_teach.length === 1) {
                    const sub = filterduserOtherSubjects.sub_teach[0].subject
                    inputUserSubject(year, "지정", item.IsGroup, other_sub_name, gradeNumber, 2, { sub_teach: [{ subject: sub, credit: otherValue * Number(item.Credit) }] })
                    inputUserSubject(year, "지정", item.IsGroup, other_sub_name, gradeNumber, 1, { sub_teach: [{ subject: sub, credit: value * Number(item.Credit) }] })
                }
            }
        }
    }
    // 선택과목 인풋박스 핸들러
    const handleInputChangeChoice = (item: JsonData, year: string, value: number) => {
        const gradeNumber = Number(selectGrade[0]);
        const semNumber = Number(selectSem[0]);
        if (value < 0) return

        changeClassinfo(year, semNumber, item.IsGroup, item.SubjectName, value)
        inputUserSubject(year, "선택", item.IsGroup, item.SubjectName, gradeNumber, semNumber, { sub_class: value })
        const filterduserSubjects = userSubjects
            .find(sub => sub.year === year &&
                sub.sub_grade === gradeNumber &&
                sub.sub_sem === semNumber &&
                sub.sub_name === item.SubjectName)
        if (filterduserSubjects?.sub_teach) {
            if (filterduserSubjects.sub_teach.length === 1) {
                const sub = filterduserSubjects.sub_teach[0].subject
                inputUserSubject(year, "선택", item.IsGroup, item.SubjectName, gradeNumber, semNumber, { sub_teach: [{ subject: sub, credit: value * Number(item.Credit) }] })
            }
        }
    }

    // 학교지정 담당교과 지정 핸들러
    const handleSelectChange = (item: JsonData, year: string, grade: number, sem: number, value: string, Credit: number) => {
        console.log(value)
        const subClassNumber = grade === 1 ? grade_1 : (grade === 2 ? grade_2 : grade_3); //선택된 학년의 학급수
        const classNumber = item.IsGroup === ''
            ? subClassNumber
            : classinfo?.[year]?.[sem]?.[item.IsGroup]?.[item.SubjectName] ?? 0
        const classCredit = Number(item.Credit) * classNumber

        if (value !== '' && value !== '직접입력') {
            console.log(value)
            inputUserSubject(year, "지정", item.IsGroup === '' ? '지정' : item.IsGroup, item.SubjectName, grade, sem, { sub_teach: [{ subject: value, credit: Credit }] })
        } else if (value === '') {
            inputUserSubject(year, '지정', item.IsGroup === '' ? '지정' : item.IsGroup, item.SubjectName, grade, sem, { sub_teach: null })
        } else if (value === '직접입력') {
            // setIsPopupOpen(true)
            // setPopupSubname(item.SubjectName)

            // setpopupSubCredit(classCredit)
            // OpenPopup()
            handleOpenCreditPopup(item, classCredit)
        }
    }

    const handleSelectChangeChoice = (item: JsonData, year: string, grade: number, sem: number, value: string, Credit: number) => {
        console.log(value);
        const subClassNumber = grade === 1 ? grade_1 : (grade === 2 ? grade_2 : grade_3); //선택된 학년의 학급수
        const classNumber = item.IsGroup === ''
            ? subClassNumber
            : classinfo?.[year]?.[sem]?.[item.IsGroup]?.[item.SubjectName] ?? 0
        const classCredit = Number(item.Credit) * classNumber
        if (value !== '' && value !== '직접입력') {
            inputUserSubject(year, '선택', item.IsGroup, item.SubjectName, grade, sem, { sub_teach: [{ subject: value, credit: Credit }] })
        } else if (value === '') {
            inputUserSubject(year, '선택', item.IsGroup, item.SubjectName, grade, sem, { sub_teach: null })
        } else if (value === '직접입력') {
            // setIsPopupOpen(true)
            // setPopupSubname(item.SubjectName)
            // setpopupSubCredit(classCredit)
            // OpenPopup()
            handleOpenCreditPopup(item, classCredit)
        }
    }

    // const ClosePopup = () => {
    //     setPopupConfig({
    //         isopened: false,
    //         subName: '',
    //         subCredit: 0,
    //         subType: '지정',
    //         subGroup: '지정'
    //     })
    // }

    const handleOpenCreditPopup = (item: JsonData, inValue: number) => {
        setPopupConfig({
            isopened: true,
            subName: item.SubjectName,
            subCredit: inValue,
            subType: item.Section === '지정' ? '지정' : '선택',
            subGroup: item.IsGroup === '' ? '지정' : item.IsGroup
        })
    }

    const renderTable = () => {
        const gradeNumber = Number(selectGrade[0]); //선택학년
        const semNumber = Number(selectSem[0]); //선택학기
        const subClassNumber = gradeNumber === 1 ? grade_1 : (gradeNumber === 2 ? grade_2 : grade_3); //선택된 학년의 학급수
        const year = gradeNumber === 1 ? YEARS[2] : (gradeNumber === 2 ? YEARS[1] : YEARS[0]); // 선택된 학년에 따른 학년도 (예시: 1학년 2027)
        const groupData = userData[year].Group //선택된 학년의 그룹데이터
        // 학교지정 과목
        const fixNoGroupUserData = userData[year].학교지정.filter(item => item.Grade === gradeNumber && item.Semester === semNumber && item.IsGroup === '');
        const fixGroupUserData = userData[year].학교지정.filter(item => item.Grade === gradeNumber && item.IsGroup !== '')
        const fixUserData = [...fixNoGroupUserData, ...fixGroupUserData].sort((a, b) => Number(a.IsTable) - Number(b.IsTable))
        // 선택과목
        const choiceUserData = userData[year].선택과목.filter(item => item.Grade === gradeNumber && item.Semester === semNumber);
        // 병합수
        const rowFixSpanNumber = fixUserData.length
        const rowChoiceSpanNumber = choiceUserData.length

        const classNumber = (item: JsonData, year: string, sem: number) => {
            const classSum = getGroupSum(year, semNumber, item.IsGroup)
            const groupChoice = groupData[item.IsGroup].Choice ?? 0
            const groupClassNumber = groupChoice * subClassNumber
            const borderColor = (groupClassNumber < classSum ? OVER_BG : (groupClassNumber === classSum ? SUCCESS_BG : ERROR_BG))
            if (item.Section === '지정') {
                return (
                    <td className="p-1 border-r border-slate-300">
                        <input
                            type='number'
                            value={classinfo[year]?.[sem]?.[item.IsGroup]?.[item.SubjectName] ?? 0}
                            onChange={(e) => handleInputChangeFix(item, year, sem, Number(e.target.value))}
                            className={`w-12 rounded-md px-1 py-1 text-right transition-all outline-none focus:ring-2`}
                            style={{ border: `1.5px solid ${SUCCESS_BG}` }}
                        />
                    </td>
                )
            } else {
                return (
                    <td className="p-1 border-r border-slate-300">
                        <input
                            type='number'
                            value={classinfo[year]?.[sem]?.[item.IsGroup]?.[item.SubjectName] ?? 0}
                            onChange={(e) => handleInputChangeChoice(item, year, Number(e.target.value))}
                            className={`w-12 rounded-md px-1 py-1 text-right transition-all outline-none focus:ring-2`}
                            style={{ border: `1.5px solid ${borderColor}` }}
                        />
                    </td>
                )
            }

        }

        const teach = (item: JsonData, year: string) => {
            const filterduserSubjectsFix = userSubjects.filter(sub =>
                sub.year === year &&
                sub.sub_type === '지정' &&
                sub.sub_grade === gradeNumber &&
                sub.sub_sem === semNumber &&
                sub.sub_name === item.SubjectName
            )[0] ?? []
            const filterduserSubjectsChoice = userSubjects.filter(sub =>
                sub.year === year &&
                sub.sub_type === '선택' &&
                sub.sub_grade === gradeNumber &&
                sub.sub_sem === semNumber &&
                sub.sub_name === item.SubjectName &&
                sub.sub_isgroup === item.IsGroup
            )[0] ?? []
            const subGroup = item.SubjectGroup
            // 개설된 학급수를 나타내는 변수 : 그룹이 아니면 학년 학급수, 그룹이면 개설된 학급수
            const classNumber = item.IsGroup === ''
                ? subClassNumber
                : classinfo?.[year]?.[semNumber]?.[item.IsGroup]?.[item.SubjectName] ?? 0

            if (item.Section === '지정') {
                if (filterduserSubjectsFix.sub_teach?.length === 0 || filterduserSubjectsFix) {
                    const selectValue = (!filterduserSubjectsFix.sub_teach) ?
                        subGroup :
                        (filterduserSubjectsFix.sub_teach?.length === 1 ?
                            filterduserSubjectsFix.sub_teach[0].subject : "직접입력"
                        )
                    const selectMustValue = (!filterduserSubjectsFix.sub_teach) ?
                        subGroup :
                        (filterduserSubjectsFix.sub_teach?.length === 1 ?
                            filterduserSubjectsFix.sub_teach[0].subject :
                            (filterduserSubjectsFix.sub_teach.length > 1 ? '직접입력' : '')
                        )

                    if (MUST_SELECT_SUBJECT.includes(subGroup)) {
                        return (
                            <td className="p-1 border-r border-slate-300">
                                <div>
                                    <select
                                        value={selectMustValue}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-md px-2 py-1 text-xs focus:border-blue-500 outline-none"
                                        onChange={(e) => handleSelectChange(item, year, gradeNumber, semNumber, e.target.value, classNumber * Number(item.Credit))}
                                    >
                                        {schoolteacherList.map((sub, idx) => (
                                            <option key={idx} value={sub}>
                                                {sub}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </td>
                        )
                    } else {
                        return (
                            <td className="p-1 border-r border-slate-300">
                                <div>
                                    <select
                                        value={selectValue}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-md px-2 py-1 text-xs focus:border-blue-500 outline-none"
                                        onChange={(e) => handleSelectChange(item, year, gradeNumber, semNumber, e.target.value, classNumber * Number(item.Credit))}
                                    >
                                        {schoolteacherList.map((sub, idx) => (
                                            <option key={idx} value={sub}>
                                                {sub}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </td>
                        )
                    }
                }
            } else {
                if (filterduserSubjectsFix.sub_teach?.length === 0 || filterduserSubjectsChoice) {
                    const selectValue = (!filterduserSubjectsChoice.sub_teach) ?
                        subGroup :
                        (filterduserSubjectsChoice.sub_teach.length === 1 ?
                            filterduserSubjectsChoice.sub_teach[0].subject : '직접입력'
                        )

                    const selectMustValue = (!filterduserSubjectsChoice.sub_teach) ?
                        subGroup :
                        (filterduserSubjectsChoice.sub_teach.length === 1 ?
                            filterduserSubjectsChoice.sub_teach[0].subject :
                            (filterduserSubjectsChoice.sub_teach.length > 1 ? '직접입력' : '')
                        )

                    if (MUST_SELECT_SUBJECT.includes(subGroup)) {
                        return (
                            <td className="p-1 border-r border-slate-300">
                                <div>
                                    <select
                                        value={selectMustValue}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-md px-2 py-1 text-xs focus:border-blue-500 outline-none"
                                        onChange={(e) => handleSelectChangeChoice(item, year, gradeNumber, semNumber, e.target.value, classNumber * Number(item.Credit))}
                                    >
                                        {schoolteacherList.map((sub, idx) => (
                                            <option key={idx} value={sub}>
                                                {sub}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                            </td>
                        )
                    } else {
                        return (
                            <td className="p-1 border-r border-slate-300">
                                <div>
                                    <select
                                        value={selectValue}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-md px-2 py-1 text-xs focus:border-blue-500 outline-none"
                                        onChange={(e) => handleSelectChangeChoice(item, year, gradeNumber, semNumber, e.target.value, classNumber * Number(item.Credit))}
                                    >
                                        {schoolteacherList.map((sub, idx) => (
                                            <option key={idx} value={sub}>
                                                {sub}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                            </td>
                        )
                    }

                }
            }
        }

        const itemCredit = (item: JsonData, year: string) => {
            const classNumber = item.IsGroup === ''
                ? subClassNumber
                : classinfo?.[year]?.[semNumber]?.[item.IsGroup]?.[item.SubjectName] ?? 0
            const inValue = classNumber * Number(item.Credit)
            const filterduserSubjects = userSubjects
                .find(sub =>
                    sub.year === year &&
                    sub.sub_grade === gradeNumber &&
                    sub.sub_sem === semNumber &&
                    sub.sub_name === item.SubjectName
                )
            // const itemType = item.Section === '학교지정' ? '지정' : '선택'
            // const itemGroup = item.IsGroup === '' ? '지정' : item.IsGroup

            if (!filterduserSubjects?.sub_teach || filterduserSubjects.sub_teach.length === 1) {
                return (
                    <td className="text-center">{inValue}</td>
                )
            } else if (filterduserSubjects.sub_teach.length > 1) {
                return (

                    <td>

                        <button
                        onClick={() => handleOpenCreditPopup(item, inValue)}
                        className="border border-slate-100 p-1 rounded-lg bg-blue-400 text-white hover:bg-blue-600 transition-all"
                        >
                            {inValue}
                        </button>

                    </td>


                )

            }


        }

        if (fixUserData.length === 0 && choiceUserData.length === 0) {
            return (
                <tr>
                    <td colSpan={9}>데이터가 없습니다.</td>
                </tr>
            )
        }

        const tdstyle = "border-r border-slate-300 px-2"

        return (
            <>
                {fixUserData.map((item, idx, data) => {
                    if (idx === 0) {
                        if (item.IsGroup === '') {
                            return (
                                <tr key={idx}>
                                    <td rowSpan={rowFixSpanNumber} className={tdstyle}>지정</td>
                                    <td className={tdstyle}>{item.IsGroup}</td>
                                    <td className={tdstyle}>{item.SubjectGroup}</td>
                                    <td className={tdstyle}>{item.SubjectName}</td>
                                    <td className={tdstyle}>{item.Credit}</td>
                                    <td className={tdstyle}>{subClassNumber}</td>
                                    {teach(item, year)}
                                    {itemCredit(item, year)}
                                </tr>
                            )
                        } else {
                            const groupSpanNumber = groupData[item.IsGroup].Subject.length
                            const groupSelect = Number(groupData[item.IsGroup].Choice)
                            return (
                                <tr key={idx}>
                                    <td rowSpan={rowFixSpanNumber} className={tdstyle}>지정</td>
                                    <td rowSpan={groupSpanNumber} className={tdstyle}>{item.IsGroup}<br />{`[택${groupSelect}]`}</td>
                                    <td className={tdstyle}>{item.SubjectGroup}</td>
                                    <td className={tdstyle}>{item.SubjectName}</td>
                                    <td className={tdstyle}>{item.Credit}</td>
                                    {classNumber(item, year, semNumber)}
                                    {teach(item, year)}
                                    {itemCredit(item, year)}
                                </tr>
                            )
                        }
                    } else {
                        if (item.IsGroup === '') {
                            return (
                                <tr key={idx}>
                                    <td className={tdstyle}>{item.IsGroup}</td>
                                    <td className={tdstyle}>{item.SubjectGroup}</td>
                                    <td className={tdstyle}>{item.SubjectName}</td>
                                    <td className={tdstyle}>{item.Credit}</td>
                                    <td className={tdstyle}>{subClassNumber}</td>
                                    {teach(item, year)}
                                    {itemCredit(item, year)}
                                </tr>
                            )

                        } else {
                            const preGroupName = data[idx - 1].IsGroup // 이전행의 그룹name
                            if (preGroupName === item.IsGroup) {
                                return (
                                    <tr key={idx}>
                                        <td className={tdstyle}>{item.SubjectGroup}</td>
                                        <td className={tdstyle}>{item.SubjectName}</td>
                                        <td className={tdstyle}>{item.Credit}</td>
                                        {classNumber(item, year, semNumber)}
                                        {teach(item, year)}
                                        {itemCredit(item, year)}
                                    </tr>
                                )
                            } else {
                                const groupSpanNumber = groupData[item.IsGroup].Subject.length
                                const groupSelect = Number(groupData[item.IsGroup].Choice)
                                return (
                                    <tr key={idx} >
                                        <td rowSpan={groupSpanNumber} className={tdstyle}>{item.IsGroup}<br />{`[택${groupSelect}]`}</td>
                                        <td className={tdstyle}>{item.SubjectGroup}</td>
                                        <td className={tdstyle}>{item.SubjectName}</td>
                                        <td className={tdstyle}>{item.Credit}</td>
                                        {classNumber(item, year, semNumber)}
                                        {teach(item, year)}
                                        {itemCredit(item, year)}
                                    </tr>
                                )
                            }
                        }
                    }
                })}

                {choiceUserData.map((item, idx, data) => {
                    if (idx === 0) {
                        const groupSpanNumber = groupData[item.IsGroup].Subject.length
                        const groupSelect = Number(groupData[item.IsGroup].Choice)
                        return (
                            <tr key={idx}>
                                <td rowSpan={rowChoiceSpanNumber} className={tdstyle}>선택</td>
                                <td rowSpan={groupSpanNumber} className={tdstyle}>{item.IsGroup}<br />{`[택${groupSelect}]`}</td>
                                <td className={tdstyle}>{item.SubjectGroup}</td>
                                <td className={tdstyle}>{item.SubjectName}</td>
                                <td className={tdstyle}>{item.Credit}</td>
                                {classNumber(item, year, semNumber)}
                                {teach(item, year)}
                                {itemCredit(item, year)}
                            </tr>
                        )
                    } else {
                        const preGroupName = data[idx - 1].IsGroup // 이전행의 그룹name
                        if (preGroupName === item.IsGroup) {
                            return (
                                <tr key={idx}>
                                    <td className={tdstyle}>{item.SubjectGroup}</td>
                                    <td className={tdstyle}>{item.SubjectName}</td>
                                    <td className={tdstyle}>{item.Credit}</td>
                                    {classNumber(item, year, semNumber)}
                                    {teach(item, year)}
                                    {itemCredit(item, year)}
                                </tr>
                            )
                        } else {
                            const groupSpanNumber = groupData[item.IsGroup].Subject.length
                            const groupSelect = Number(groupData[item.IsGroup].Choice)
                            return (
                                <tr key={idx}>
                                    <td rowSpan={groupSpanNumber} className={tdstyle}>{item.IsGroup}<br />{`[택${groupSelect}]`}</td>
                                    <td className={tdstyle}>{item.SubjectGroup}</td>
                                    <td className={tdstyle}>{item.SubjectName}</td>
                                    <td className={tdstyle}>{item.Credit}</td>
                                    {classNumber(item, year, semNumber)}
                                    {teach(item, year)}
                                    {itemCredit(item, year)}
                                </tr>
                            )
                        }
                    }
                })}
            </>
        )
    }


    return (
        <div className="flex flex-col h-full">
            {/* 테이블 컨트롤 바 */}
            <div className="p-4 bg-slate-50/50 border-b flex flex-wrap items-center gap-2 text-sm">
                <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-600">학년:</span>
                    <Select value={selectGrade} onValueChange={setSelectGrade}>
                        <SelectTrigger className="w-20 h-9 bg-white">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1학년">1학년</SelectItem>
                            <SelectItem value="2학년">2학년</SelectItem>
                            <SelectItem value="3학년">3학년</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-600">학기:</span>
                    <Select value={selectSem} onValueChange={setSelectSem}>
                        <SelectTrigger className="w-20 h-9 bg-white">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1학기">1학기</SelectItem>
                            <SelectItem value="2학기">2학기</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-3 ml-auto">
                    <Badge variant="outline" className="bg-white px-3 py-1 border-slate-200">
                        총 학급수: <span className="text-indigo-600 ml-1 font-bold">{currentGradeCount}</span>
                    </Badge>
                    <div className="flex gap-2 text-[11px] font-medium">
                        <span className="flex items-center gap-1"><div className="w-2 h-2 bg-red-500 rounded-full" /> 부족</span>
                        <span className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-full" /> 일치</span>
                        <span className="flex items-center gap-1"><div className="w-2 h-2 bg-green-500 rounded-full" /> 초과</span>
                    </div>
                </div>
            </div>

            {/* 테이블 본체 */}
            <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
                <table className="w-full border-collapse bg-white text-[13px]">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="border border-slate-300 p-1 font-semibold">구분</th>
                            <th className="border border-slate-300 p-1 font-semibold">그룹</th>
                            <th className="border border-slate-300 p-1 font-semibold">교과군</th>
                            <th className="border border-slate-300 p-1 font-semibold">과목명</th>
                            <th className="border border-slate-300 p-1 font-semibold">학점</th>
                            <th className="border border-slate-300 p-1 font-semibold">학급수</th>
                            <th className="border border-slate-300 p-1 font-semibold">담당교과</th>
                            <th className="border border-slate-300 p-1 font-semibold">총<br /> 시수</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-center">
                        {renderTable()}
                    </tbody>
                </table>
                {popupConfig.isopened && (
                    <CreditPopUp
                        onClose={() => setPopupConfig({ ...popupConfig, isopened: false })}
                        subjectName={popupConfig.subName}
                        subjectCredit={popupConfig.subCredit}
                        grade={Number(selectGrade[0])}
                        sem={Number(selectSem[0])}
                        year={Number(selectGrade[0]) === 1 ? YEARS[2] : (Number(selectGrade[0])) === 2 ? YEARS[1] : YEARS[0]}
                        type={popupConfig.subType}
                        isGroup={popupConfig.subGroup}
                    />
                )}
            </div>
        </div>
    );
}

export { CreditCurriTable }
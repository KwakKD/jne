import { ScrollArea, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui"
import { useNaviCurriStore } from "@/store/NaviCurriStore"
import { useState } from "react"

function CurriSubjectGroup() {
    const curri = useNaviCurriStore((state) => state.curri)
    const selectedYear = useNaviCurriStore((state) => state.selectedYear)
    const [selectSubjectGroup, setSelectSubjectGroup] = useState('국어')

    const fixFilteredData = curri[0].fix.filter(item => item.SubjectGroup === selectSubjectGroup)
    const choiceFilteredData = curri[0].choice.filter(item => item.SubjectGroup === selectSubjectGroup)

    // groupInfo 데이터를 안전하게 가져옵니다.
    const groupInfo = curri[0]?.groupdata || {}

    // 2. 지정/선택 데이터를 학년/학기별로 구분하여 객체 형태로 반환하는 헬퍼 함수
    const getSemesterSubjects = (grade: number, sem: number) => {
        const fix = fixFilteredData.filter(item => item.Grade === grade && item.Semester === sem)
        const choice = choiceFilteredData.filter(item => item.Grade === grade && item.Semester === sem)
        return { fix, choice }
    }
    // const groupInfo = curri[0].groupdata

    // const filteredSubjectName = (grade: number, sem: number) => {
    //     return allSubjects
    //         .filter(item => item.Grade === grade && item.Semester === sem)
    //         .map(item => item.SubjectName)
    // }
    // filteredSubject를 활용하여 지정과목과 선택과목을 따로 하고 싶어. 그리고 선택과목이면 groupInfo에서 groupInfo['그룹명'].choice를 찾아 택n을 작성하면 더 좋을 것 같아.

    const subjectGroups = ['국어', '수학', '영어', '사회', '과학', '체육', '예술', '기술∙가정/정보', '제2외국어/한문', '교양']

    return (
        <>
            <div className="space-y-1 pb-0 mb-2">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                    <span className="text-xs font-black text-orange-500 uppercase tracking-wider">Detail view</span>
                    <p className="text-[11px] text-slate-600 font-medium">
                        선택하신 학교의 {selectedYear}학년도 신입생 교과군별 과목 구성안입니다.
                    </p>
                </div>
            </div>
            {/* <div className="p-1 mb-2 bg-slate-300/80 rounded-2xl border border-slate-200/40 grid grid-cols-1 gap-1.5">
                <div className="flex flex-col bg-white/90 p-1 rounded-xl border border-slate-200/30 shadow-sm space-y-1.5">
                    <span className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider ml-1">교과군 선택</span>
                    <div className="flex gap-1">
                        {subjectGroups.map((sub,idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectSubjectGroup(sub)}
                                className={`flex-1 py-1 rounded-lg text-xs font-black transition-all duration-200 ${selectSubjectGroup === sub
                                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 scale-[1.03]"
                                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                                    }`}
                            >
                                {sub}
                            </button>
                        ))}
                    </div>
                </div>
            </div> */}
            <Tabs defaultValue={selectSubjectGroup} onValueChange={setSelectSubjectGroup} className="flex-1 flex flex-col overflow-hidden">
                <div className="px-0 pb-2 border-b bg-white">
                    <ScrollArea className="w-full pb-3">
                        <TabsList className="flex w-full h-14 bg-slate-200/50 py-6 px-2 gap-1">
                            {subjectGroups.map((sub, idx) => (
                                <TabsTrigger
                                    key={idx}
                                    value={sub}
                                    className="px-4 py-4 text-xs font-bold transition-all
                               data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                                >
                                    {sub}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </ScrollArea>
                </div>

                <div className="flex-1 overflow-hidden bg-slate-50/30">
                    <ScrollArea className="h-full">
                        {subjectGroups.map((sub, idx) => (
                            <TabsContent
                                key={idx}
                                value={sub}
                                className="m-0 p-3 focus-visible:outline-none"
                            >
                                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                                    <Table>
                                        <TableHeader className="bg-slate-50/80">
                                            <TableRow className="hover:bg-transparent border-b border-slate-200">
                                                {[1, 2, 3].map((grade, idx) => (
                                                    <TableHead
                                                        key={idx}
                                                        colSpan={2}
                                                        className="text-center font-bold text-slate-800 border-r align-middle py-1"
                                                    >
                                                        <div>{grade}학년</div>
                                                    </TableHead>
                                                ))}
                                            </TableRow>

                                            <TableRow className="hover:bg-transparent">
                                                {[1, 2, 1, 2, 1, 2].map((sem, idx) => (
                                                    <TableHead key={idx} className="text-center font-bold text-slate-700 border-r ">
                                                        <div>{sem}학기</div>
                                                    </TableHead>
                                                ))}
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {(() => {
                                                // 6개 학기의 데이터를 지정/선택으로 각각 분류하여 가져옵니다.
                                                const s1_1 = getSemesterSubjects(1, 1)
                                                const s1_2 = getSemesterSubjects(1, 2)
                                                const s2_1 = getSemesterSubjects(2, 1)
                                                const s2_2 = getSemesterSubjects(2, 2)
                                                const s3_1 = getSemesterSubjects(3, 1)
                                                const s3_2 = getSemesterSubjects(3, 2)

                                                const semesters = [s1_1, s1_2, s2_1, s2_2, s3_1, s3_2]

                                                // 각 학기별로 지정 과목 개수와 선택 과목 개수를 합쳐서 최대 행(Row) 수를 결정합니다.
                                                const maxRows = Math.max(
                                                    s1_1.fix.length + s1_1.choice.length,
                                                    s1_2.fix.length + s1_2.choice.length,
                                                    s2_1.fix.length + s2_1.choice.length,
                                                    s2_2.fix.length + s2_2.choice.length,
                                                    s3_1.fix.length + s3_1.choice.length,
                                                    s3_2.fix.length + s3_2.choice.length
                                                )

                                                if (maxRows === 0) {
                                                    return (
                                                        <TableRow>
                                                            <TableCell colSpan={6} className="text-center py-12 text-xs text-slate-400 font-semibold">
                                                                해당 교과군에 개설된 과목이 없습니다.
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                }

                                                // 🎨 그룹명별로 Tailwind 테마 색상을 일관되게 생성하기 위한 헬퍼 함수
                                                const getGroupTheme = (groupName: string) => {
                                                    if (!groupName) return {
                                                        badge: "bg-slate-50 text-slate-600 border-slate-100",
                                                        text: "text-slate-400"
                                                    }

                                                    // 간단한 문자열 해싱을 통해 그룹명마다 고유한 index 매핑 (항상 같은 그룹명에는 같은 색상 반환)
                                                    let hash = 0
                                                    for (let i = 0; i < groupName.length; i++) {
                                                        hash = groupName.charCodeAt(i) + ((hash << 5) - hash)
                                                    }

                                                    const themes = [
                                                        { // 에메랄드
                                                            badge: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
                                                            text: "text-emerald-600"
                                                        },
                                                        { // 보라 (Purple)
                                                            badge: "bg-purple-50 text-purple-700 border-purple-200/60",
                                                            text: "text-purple-600"
                                                        },
                                                        { //  amber (오렌지/황토)
                                                            badge: "bg-amber-50 text-amber-700 border-amber-200/60",
                                                            text: "text-amber-600"
                                                        },
                                                        { // 핑크/로즈
                                                            badge: "bg-rose-50 text-rose-700 border-rose-200/60",
                                                            text: "text-rose-600"
                                                        },
                                                        { // 청록 (Teal)
                                                            badge: "bg-teal-50 text-teal-700 border-teal-200/60",
                                                            text: "text-teal-600"
                                                        },
                                                        { // 인디고
                                                            badge: "bg-indigo-50 text-indigo-700 border-indigo-200/60",
                                                            text: "text-indigo-600"
                                                        },
                                                        { // 하늘색 (Sky)
                                                            badge: "bg-sky-50 text-sky-700 border-sky-200/60",
                                                            text: "text-sky-600"
                                                        }
                                                    ]

                                                    const index = Math.abs(hash) % themes.length
                                                    return themes[index]
                                                }

                                                return Array.from({ length: maxRows }).map((_, rowIndex) => (
                                                    <TableRow key={rowIndex} className="hover:bg-slate-50/30 border-b border-slate-100">
                                                        {semesters.map((semData, semIdx) => {
                                                            const fixLen = semData.fix.length
                                                            let content = null

                                                            // 1. 지정과목 (기본 테마 적용: Blue)
                                                            if (rowIndex < fixLen) {
                                                                const item = semData.fix[rowIndex]
                                                                content = (
                                                                    <div className="flex flex-col gap-1.5 items-center justify-center">
                                                                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-blue-100 text-blue-600 border border-blue-100">
                                                                            지정
                                                                        </span>
                                                                        <span className="font-semibold text-slate-800 text-[12px] leading-tight text-center">
                                                                            {item.SubjectName}
                                                                        </span>
                                                                    </div>
                                                                )
                                                            }
                                                            // 2. 선택과목 (그룹명 별로 고유 동적 테마 적용)
                                                            else if (rowIndex < fixLen + semData.choice.length) {
                                                                const item = semData.choice[rowIndex - fixLen]
                                                                const choiceCount = groupInfo[item.IsGroup]?.Choice || ""

                                                                // 그룹 맞춤형 색상 정보 획득
                                                                const theme = getGroupTheme(item.IsGroup)

                                                                content = (
                                                                    <div className="flex flex-col gap-1.5 items-center justify-center">
                                                                        <div className="flex items-center gap-2">
                                                                            <span className={`text-[10px] font-semibold max-w-22 truncate ${theme.text}`}>
                                                                                {item.IsGroup}
                                                                            </span>
                                                                            <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-extrabold border ${theme.badge}`}>
                                                                                {choiceCount && `(택 ${choiceCount})`}
                                                                            </span>
                                                                        </div>
                                                                        <span className="font-semibold text-slate-700 text-[13px] leading-tight text-center">
                                                                            {item.SubjectName}
                                                                        </span>

                                                                    </div>
                                                                )
                                                            }

                                                            return (
                                                                <TableCell
                                                                    key={semIdx}
                                                                    className="text-center p-3 border-r align-middle last:border-r-0 min-w-25"
                                                                >
                                                                    {content || <span className="text-slate-300">-</span>}
                                                                </TableCell>
                                                            )
                                                        })}
                                                    </TableRow>
                                                ))
                                            })()}
                                        </TableBody>
                                    </Table>
                                </div>
                            </TabsContent>
                        ))}
                    </ScrollArea>
                </div>
            </Tabs>
        </>
    )
}

export { CurriSubjectGroup }
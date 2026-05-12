import { Badge, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui"
import { TEACHER_SUBJECT_GROUP } from "@/data/Curri/teacher"
import { YEARS } from "@/data/data"
import { useSchoolInfoStore } from "@/store/SchoolInfo"
import { useStaSubjectStore } from "@/store/StaSubjectStore"
import { useMemo, useState } from "react"

const NOW_YEAR = [
    { grade: 1, sem: 1, year: YEARS[2] },
    { grade: 1, sem: 2, year: YEARS[2] },
    { grade: 2, sem: 1, year: YEARS[1] },
    { grade: 2, sem: 2, year: YEARS[1] },
    { grade: 3, sem: 1, year: YEARS[0] },
    { grade: 3, sem: 2, year: YEARS[0] }
]

interface SubRowProps {
    grade: number | null
    sem: number | null
    type: string
    subjectName: string
    credit: number | null
    class: number | string
    Allcredit: number
}

function CreditSubModal() {
    const [selectSub, setSelectSub] = useState<string>('all'); // 기본값을 'all'로 설정 가능

    const userSubjects = useStaSubjectStore((state) => state.userSubjects);
    const schoolinfo = useSchoolInfoStore((state) => state.schoolinfo);

    // 1. 교과(군) 선택 리스트 추출 로직
    const selectList = useMemo(() => {
        const filterSubjects = userSubjects.filter((item) => item.sub_type === '지정' || item.sub_type === '선택')
            .filter((sub) =>
                NOW_YEAR.some(
                    (period) =>
                        sub.sub_grade === period.grade &&
                        sub.sub_sem === period.sem &&
                        sub.year === period.year
                ));

        const uniqueSubjectNames = Array.from(
            new Set(filterSubjects.flatMap((sub) => sub.sub_teach?.map(t => t.subject)))
        ).filter(name => name && name.trim() !== '') as string[];

        return TEACHER_SUBJECT_GROUP.filter(sub => uniqueSubjectNames.includes(sub));
    }, [userSubjects]);

    // 2. 선택된 과목에 따른 로우 데이터 계산
    const rowData = useMemo<SubRowProps[]>(() => {
        if (!selectSub || selectSub === 'all') return [];

        const filterSubjects = userSubjects.filter((sub) => {
            return NOW_YEAR.some(
                (period) =>
                    sub.sub_grade === period.grade &&
                    sub.sub_sem === period.sem &&
                    sub.year === period.year
            );
        });

        return filterSubjects
            .filter(item => item.sub_teach?.some(teach => teach.subject === selectSub))
            .map(item => {
                const gradeKey = `grade_${item.sub_grade}` as keyof typeof schoolinfo;
                const schoolClassNumber = Number(schoolinfo[gradeKey]) || 0;
                const targetTeach = item.sub_teach?.find(t => t.subject === selectSub);
                const teachCredit = Number(targetTeach?.credit) || 0;
                const subCredit = Number(item.sub_credit) || 0;

                let classResult: string | number = 0;
                if (item.sub_isgroup === '지정') {
                    classResult = (subCredit !== 0 && teachCredit / subCredit === schoolClassNumber)
                        ? schoolClassNumber
                        : '직접입력';
                } else {
                    const teachLength = item.sub_teach?.length || 0;
                    classResult = teachLength === 1 ? (item.sub_class || 0) : '직접입력';
                }

                return {
                    grade: item.sub_grade,
                    sem: item.sub_sem,
                    type: item.sub_type,
                    subjectName: item.sub_name,
                    credit: item.sub_credit,
                    class: classResult,
                    Allcredit: teachCredit
                };
            })
            .sort((a, b) => (a.sem !== b.sem ? Number(a.sem) - Number(b.sem) : Number(a.grade) - Number(b.grade)));
    }, [selectSub, userSubjects, schoolinfo]);

    return (
        <div className="space-y-4">
            {/* 셀렉트 영역 */}
            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <label className="text-sm font-bold text-slate-700">교과(군) 선택</label>
                <Select onValueChange={setSelectSub} value={selectSub}>
                    <SelectTrigger className="w-50 bg-white">
                        <SelectValue placeholder="과목을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                        {selectList.map((sub) => (
                            <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {selectSub !== 'all' && (
                    <Badge variant="secondary" className="ml-auto bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
                        {selectSub} 분석 모드
                    </Badge>
                )}
            </div>

            {/* 테이블 영역 */}
            <div className="rounded-md border border-slate-200 overflow-hidden">
                <Table className="text-sm">
                    <TableHeader className="bg-slate-100">
                        <TableRow>
                            <TableHead className="w-16 text-center font-bold">학기</TableHead>
                            <TableHead className="w-16 text-center font-bold">학년</TableHead>
                            <TableHead className="w-20 text-center font-bold">유형</TableHead>
                            <TableHead className="font-bold">과목명</TableHead>
                            <TableHead className="w-20 text-center font-bold">학점</TableHead>
                            <TableHead className="w-24 text-center font-bold">개설학급</TableHead>
                            <TableHead className="w-20 text-center font-bold">총시수</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rowData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-32 text-center text-slate-400">
                                    교과(군)을 선택하면 상세 현황이 표시됩니다.
                                </TableCell>
                            </TableRow>
                        ) : (
                            rowData.map((item, index) => {
                                const isFirstSem = index === 0 || rowData[index - 1].sem !== item.sem;
                                const isFirstGrade = index === 0 || rowData[index - 1].sem !== item.sem || rowData[index - 1].grade !== item.grade;
                                const semSpan = rowData.filter(d => d.sem === item.sem).length;
                                const gradeSpan = rowData.filter(d => d.sem === item.sem && d.grade === item.grade).length;

                                return (
                                    <TableRow key={index} className="hover:bg-slate-50/50">
                                        {isFirstSem && (
                                            <TableCell rowSpan={semSpan} className="text-center font-bold bg-slate-50/30 border-r border-slate-100">
                                                {item.sem}학기
                                            </TableCell>
                                        )}
                                        {isFirstGrade && (
                                            <TableCell rowSpan={gradeSpan} className="text-center font-medium border-r border-slate-100">
                                                {item.grade}학년
                                            </TableCell>
                                        )}
                                        <TableCell className="text-center">
                                            <Badge variant={item.type === '지정' ? 'default' : 'outline'} className="font-normal text-[11px]">
                                                {item.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="font-medium text-slate-700">{item.subjectName}</TableCell>
                                        <TableCell className="text-center">{item.credit}</TableCell>
                                        <TableCell className="text-center">
                                            {item.class === '직접입력' ? (
                                                <span className="text-rose-600 font-bold underline underline-offset-4 decoration-rose-200">
                                                    {item.class}
                                                </span>
                                            ) : (
                                                item.class
                                            )}
                                        </TableCell>
                                        <TableCell className="text-center font-bold text-indigo-600 bg-indigo-50/20">
                                            {item.Allcredit}
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export { CreditSubModal }
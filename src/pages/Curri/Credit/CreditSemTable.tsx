import { Separator, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";
import { TEACHER_SUBJECT_GROUP } from "@/data/Curri/teacher";
import { YEARS } from "@/data/data";
import { useStaSubjectStore } from "@/store/StaSubjectStore";
import { useTeacherStore } from "@/store/TeacherStore";
import { Calculator } from "lucide-react";
import { useMemo } from "react";

const NOW_YEAR = [
    { grade: 1, sem: 1, year: YEARS[2] },
    { grade: 1, sem: 2, year: YEARS[2] },
    { grade: 2, sem: 1, year: YEARS[1] },
    { grade: 2, sem: 2, year: YEARS[1] },
    { grade: 3, sem: 1, year: YEARS[0] },
    { grade: 3, sem: 2, year: YEARS[0] }
]

interface SemesterRow {
    subjectName: string;
    total: number;
    [key: string]: string | number; // 동적 키(sem_0 등)를 허용하기 위한 인덱스 시그니처
}

export function CreditSemTable() {
    const userSubjects = useStaSubjectStore((state) => state.userSubjects)
    const teacher = useTeacherStore((state) => state.teacher)
    // 교사 인원수를 나타냄 (교과 : {all: 숫자, outQuota: 숫자, sum : 합})
    const schoolteacher = Object.values(teacher).reduce<Record<string, { all: number; outQuota: number, sum: number }>>(
        (acc, cur) => {
            const group = cur.Group;

            acc[group] ??= { all: 0, outQuota: 0, sum: 0 };
            acc[group].all += cur.all ?? 0;
            acc[group].outQuota += cur.outQuota ?? 0;
            acc[group].sum += cur.all + cur.outQuota

            return acc
        },
        {}
    )

    const rowData = useMemo<SemesterRow[]>(() => {
        // 해당 년도에 해당되는 과목들만 가져옴.
        const filterSubjects = userSubjects.filter((item) => item.sub_type === '지정' || item.sub_type === '선택')
            .filter((sub) =>
                NOW_YEAR.some(
                    (period) =>
                        sub.sub_grade === period.grade &&
                        sub.sub_sem === period.sem &&
                        sub.year === period.year
                )
            );
        // 유니크한 과목명 추출
        const uniqueSubjectName = Array.from(
            new Set(filterSubjects.flatMap((sub) => sub.sub_teach?.map(t => t.subject)))
        ).filter(name => name && name.trim() !== '')

        const orederSubject = TEACHER_SUBJECT_GROUP.filter(sub => uniqueSubjectName.includes(sub))

        return orederSubject.map((subjectName) => {
            const semesterCredits: { [key: string]: number } = {};
            let total = 0;

            NOW_YEAR.forEach((period, _index) => {
                const key = `${period.grade}-${period.sem}`;

                const match = filterSubjects.filter(
                    (sub) =>
                        sub.sub_grade === period.grade &&
                        sub.sub_sem === period.sem &&
                        sub.year === period.year

                )

                const creditSum = match.reduce((acc, sub) => {
                    const sameSubjectCredits = sub.sub_teach?.filter(t => t.subject === subjectName)
                        .reduce((sum, t) => sum + t.credit, 0)
                    return acc + (sameSubjectCredits ?? 0);
                }, 0)

                semesterCredits[key] = creditSum;

                if (creditSum > 0) {
                    total += creditSum
                }
            })
            return {
                subjectName,
                ...semesterCredits,
                total
            }
        })
    }, [userSubjects])

    const sumCredit = (item: SemesterRow, sem: number) => {
        return (
            Number(item[`1-${sem}`]) + Number(item[`2-${sem}`]) + Number(item[`3-${sem}`])
        )
    }

    const averageCredit = (item: SemesterRow, sem: number) => {
        const teacherInfo = schoolteacher[item.subjectName ?? ''] || { sum: 1 };
        const teachNumber = teacherInfo.sum || 1;
        if (sem === 0) {
            return (
                Number((((sumCredit(item, 1) + sumCredit(item, 2)) / teachNumber) / 2).toFixed(1)) ?? 0
            )
        } else {
            return (
                Number((sumCredit(item, sem) / teachNumber).toFixed(1)) ?? 0
            )
        }
    }

    // 특정 열(key)의 모든 값을 더하는 헬퍼 함수
    const getColumnTotal = (key: keyof SemesterRow) => {
        return rowData.reduce((acc, row) => {
            const value = row[key];
            return acc + (typeof value === 'number' ? value : 0);
        }, 0);
    };

    return (
        <div className="space-y-4 p-1">
            {/* 1. 메인 시수 분포 표 */}
            <section className="space-y-2">
                {/* <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <span className="w-1 h-5 bg-blue-600 rounded-full" />
                        교과별 시수 분포 현황
                    </h3>
                    <Badge variant="outline" className="text-slate-500 font-normal">
                        단위: 학점(시수)
                    </Badge>
                </div> */}

                <div className="rounded-md border border-slate-700 shadow-sm overflow-hidden">
                    <Table className="text-[13px] border-collapse">
                        <TableHeader className="bg-slate-50/80">
                            <TableRow className="hover:bg-transparent">
                                <TableHead rowSpan={2} className="border-r border-slate-200 text-center font-bold text-slate-700 w-32">교과(군)</TableHead>
                                <TableHead rowSpan={2} className="border-r-2 border-slate-300 text-center font-bold text-slate-700 w-16">인원</TableHead>
                                <TableHead colSpan={5} className="border-r-2 border-slate-300 text-center font-bold text-blue-700 bg-blue-50/30">1학기</TableHead>
                                <TableHead colSpan={5} className="border-r-2 border-slate-300 text-center font-bold text-indigo-700 bg-indigo-50/30">2학기</TableHead>
                                <TableHead rowSpan={2} className="text-center font-bold text-slate-900 bg-slate-100/50 w-20">연간<br />평균</TableHead>
                            </TableRow>
                            <TableRow className="hover:bg-transparent">
                                {/* 1학기 서브 헤더 */}
                                <TableHead className="border-r border-slate-200 text-center h-10">1학년</TableHead>
                                <TableHead className="border-r border-slate-200 text-center">2학년</TableHead>
                                <TableHead className="border-r border-slate-200 text-center">3학년</TableHead>
                                <TableHead className="border-r border-slate-200 text-center font-bold bg-slate-50/50">합계</TableHead>
                                <TableHead className="border-r-2 border-slate-300 text-center font-bold text-blue-600">평균</TableHead>
                                {/* 2학기 서브 헤더 */}
                                <TableHead className="border-r border-slate-200 text-center h-10">1학년</TableHead>
                                <TableHead className="border-r border-slate-200 text-center">2학년</TableHead>
                                <TableHead className="border-r border-slate-200 text-center">3학년</TableHead>
                                <TableHead className="border-r border-slate-200 text-center font-bold bg-slate-50/50">합계</TableHead>
                                <TableHead className="border-r-2 border-slate-300 text-center font-bold text-indigo-600">평균</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {rowData.map((item, index) => (
                                <TableRow key={index} className="hover:bg-slate-50/50 transition-colors">
                                    <TableCell className="border-r border-slate-200 font-semibold text-slate-700 text-center">{item?.subjectName}</TableCell>
                                    <TableCell className="border-r-2 border-slate-300 text-center font-medium">{schoolteacher[item?.subjectName ?? ''].sum}</TableCell>

                                    {/* 1학기 데이터 */}
                                    <TableCell className="border-r border-slate-200 text-center">{item['1-1'] || '-'}</TableCell>
                                    <TableCell className="border-r border-slate-200 text-center">{item['2-1'] || '-'}</TableCell>
                                    <TableCell className="border-r border-slate-200 text-center">{item['3-1'] || '-'}</TableCell>
                                    <TableCell className="border-r border-slate-200 text-center font-bold bg-slate-50/30">{sumCredit(item, 1) || '-'}</TableCell>
                                    <TableCell className="border-r-2 border-slate-300 text-center font-bold text-blue-600 bg-blue-50/10">{averageCredit(item, 1) || '-'}</TableCell>

                                    {/* 2학기 데이터 */}
                                    <TableCell className="border-r border-slate-200 text-center">{item['1-2'] || '-'}</TableCell>
                                    <TableCell className="border-r border-slate-200 text-center">{item['2-2'] || '-'}</TableCell>
                                    <TableCell className="border-r border-slate-200 text-center">{item['3-2'] || '-'}</TableCell>
                                    <TableCell className="border-r border-slate-200 text-center font-bold bg-slate-50/30">{sumCredit(item, 2) || '-'}</TableCell>
                                    <TableCell className="border-r-2 border-slate-300 text-center font-bold text-indigo-600 bg-indigo-50/10">{averageCredit(item, 2) || '-'}</TableCell>

                                    {/* 연간 평균 */}
                                    <TableCell className="text-center font-black text-slate-900 bg-slate-100/30">{averageCredit(item, 0) || '-'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </section>

            <Separator className="my-6" />

            {/* 2. 총계 요약 표 */}
            <section className="max-w-4xl space-y-3">
                <h3 className="text-md font-bold text-slate-600 flex items-center gap-2">
                    <Calculator className="h-4 w-4" /> 전체 학년별 총 시수 요약
                </h3>
                <div className="rounded-md border border-slate-200 shadow-sm overflow-hidden">
                    <Table className="text-[13px]">
                        <TableHeader className="bg-slate-800 text-white hover:bg-slate-800">
                            <TableRow className="hover:bg-slate-800">
                                <TableHead className="border-r border-slate-700 text-white text-center font-bold">구분</TableHead>
                                <TableHead colSpan={4} className="border-r border-slate-700 text-white text-center font-bold">1학기</TableHead>
                                <TableHead colSpan={4} className="text-white text-center font-bold">2학기</TableHead>
                            </TableRow>
                            <TableRow className="bg-slate-700/50 text-white hover:bg-slate-700/50">
                                <TableHead className="border-r border-slate-600 text-white text-center h-9">학년</TableHead>
                                <TableHead className="border-r border-slate-600 text-white text-center">1학년</TableHead>
                                <TableHead className="border-r border-slate-600 text-white text-center">2학년</TableHead>
                                <TableHead className="border-r border-slate-600 text-white text-center">3학년</TableHead>
                                <TableHead className="border-r border-slate-500 text-white text-center font-bold bg-slate-600/50">합계</TableHead>
                                <TableHead className="border-r border-slate-600 text-white text-center">1학년</TableHead>
                                <TableHead className="border-r border-slate-600 text-white text-center">2학년</TableHead>
                                <TableHead className="border-r border-slate-600 text-white text-center">3학년</TableHead>
                                <TableHead className="text-white text-center font-bold bg-slate-600/50">합계</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow className="bg-white font-bold text-slate-900">
                                <TableCell className="border-r border-slate-200 text-center bg-slate-50">총 시수 합계</TableCell>
                                <TableCell className="border-r border-slate-100 text-center">{getColumnTotal('1-1')}</TableCell>
                                <TableCell className="border-r border-slate-100 text-center">{getColumnTotal('2-1')}</TableCell>
                                <TableCell className="border-r border-slate-100 text-center">{getColumnTotal('3-1')}</TableCell>
                                <TableCell className="border-r-2 border-slate-200 text-center bg-blue-50 text-blue-700">
                                    {getColumnTotal('1-1') + getColumnTotal('2-1') + getColumnTotal('3-1')}
                                </TableCell>
                                <TableCell className="border-r border-slate-100 text-center">{getColumnTotal('1-2')}</TableCell>
                                <TableCell className="border-r border-slate-100 text-center">{getColumnTotal('2-2')}</TableCell>
                                <TableCell className="border-r border-slate-100 text-center">{getColumnTotal('3-2')}</TableCell>
                                <TableCell className="text-center bg-indigo-50 text-indigo-700">
                                    {getColumnTotal('1-2') + getColumnTotal('2-2') + getColumnTotal('3-2')}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </section>
        </div>
    );
}
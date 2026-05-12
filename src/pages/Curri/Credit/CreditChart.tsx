import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { TEACHER_SUBJECT_GROUP } from "@/data/Curri/teacher";
import { YEARS } from "@/data/data"
import { useStaSubjectStore } from "@/store/StaSubjectStore";
import { BarChart3 } from "lucide-react";
import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const NOW_YEAR = [
    { grade: 1, sem: 1, year: YEARS[2] },
    { grade: 1, sem: 2, year: YEARS[2] },
    { grade: 2, sem: 1, year: YEARS[1] },
    { grade: 2, sem: 2, year: YEARS[1] },
    { grade: 3, sem: 1, year: YEARS[0] },
    { grade: 3, sem: 2, year: YEARS[0] }
]

function CreditChart() {
    const [selectSub, setSelectSub] = useState('국어'); // 기본 선택 교과
    const userSubjects = useStaSubjectStore((state) => state.userSubjects);

    // 1. 교과군 리스트 (전체 제외, 오른쪽 차트 전용)
    const selectList = useMemo(() => {
        const filterSubjects = userSubjects.filter((item) => item.sub_type === '지정' || item.sub_type === '선택')
            .filter((sub) => NOW_YEAR.some(p => sub.sub_grade === p.grade && sub.sub_sem === p.sem && sub.year === p.year));

        const uniqueNames = Array.from(new Set(filterSubjects.flatMap((sub) => sub.sub_teach?.map(t => t.subject))))
            .filter(name => name && name.trim() !== '');

        return TEACHER_SUBJECT_GROUP.filter(sub => uniqueNames.includes(sub));
    }, [userSubjects]);

    // 2. 통합 데이터 생성 로직 (전체와 선택 교과 데이터를 한 번에 계산)
    const chartData = useMemo(() => {
        return NOW_YEAR.map((period) => {
            const semesterSubjects = userSubjects.filter(sub =>
                sub.sub_grade === period.grade && sub.sub_sem === period.sem && sub.year === period.year
            );

            // 전체 학점 계산
            const totalCredit = semesterSubjects.reduce((acc, sub) => {
                const subSum = sub.sub_teach?.reduce((sum, t) => sum + Number(t.credit), 0) || 0;
                return acc + subSum;
            }, 0);

            // 선택 교과 학점 계산
            const subCredit = semesterSubjects.reduce((acc, sub) => {
                const targetTeach = sub.sub_teach?.filter(t => t.subject === selectSub) || [];
                const subSum = targetTeach.reduce((sum, t) => sum + Number(t.credit), 0);
                return acc + subSum;
            }, 0);

            return {
                name: `${period.grade}-${period.sem}`,
                fullName: `${period.grade}학년 ${period.sem}학기`,
                total: totalCredit,
                subject: subCredit,
            };
        });
    }, [userSubjects, selectSub]);

    // 공통 차트 컴포넌트 (내부 재사용)
    const RenderBarChart = ({ dataKey, color, label }: { dataKey: "total" | "subject", color: string, label: string }) => (
        <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 11 }} />
                <Tooltip
                    cursor={{ fill: '#f8fafc', radius: 4 }}
                    content={({ active, payload }) => {
                        if (active && payload?.length) {
                            return (
                                <div className="bg-white p-3 border rounded-lg shadow-lg text-xs">
                                    <p className="font-bold border-b mb-1 pb-1">{payload[0].payload.fullName}</p>
                                    <p className="text-indigo-600">{label}: <span className="font-bold">{payload[0].value}학점</span></p>
                                </div>
                            );
                        }
                        return null;
                    }}
                />
                <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} barSize={24}>
                    <LabelList dataKey={dataKey} position="top" style={{ fill: color, fontSize: '11px', fontWeight: 'bold' }}
                        formatter={(v: any) => v > 0 ? v : ''} />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );

    return (
        <div className="flex flex-col gap-2">
            {/* 셀렉터 영역 */}
            <div className="flex items-center gap-2 justify-between px-2">
                <h2 className="font-bold text-slate-700 text-sm flex items-center gap-2">
                    <BarChart3 size={16} className="text-amber-500" />
                    학년별 시수 균형도
                </h2>
                <span className="text-sm font-medium text-slate-500">비교 교과군:</span>
                <select
                    value={selectSub}
                    onChange={(e) => setSelectSub(e.target.value)}
                    className="text-sm border rounded px-2 py-1 bg-white outline-none focus:ring-2 ring-indigo-500"
                >
                    {selectList.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>

            {/* 2분할 차트 영역 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 왼쪽: 전체 학점 */}
                <Card className="border-slate-200 shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-bold text-slate-600 flex items-center gap-2">
                            <div className="w-2 h-4 bg-indigo-500 rounded-full" />
                            전체 이수 학점 현황
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RenderBarChart dataKey="total" color="#6366f1" label="전체" />
                    </CardContent>
                </Card>

                {/* 오른쪽: 선택 교과 학점 */}
                <Card className="border-slate-200 shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-bold text-slate-600 flex items-center gap-2">
                            <div className="w-2 h-4 bg-emerald-500 rounded-full" />
                            [{selectSub}] 교과 이수 현황
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RenderBarChart dataKey="subject" color="#10b981" label={selectSub} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export { CreditChart }
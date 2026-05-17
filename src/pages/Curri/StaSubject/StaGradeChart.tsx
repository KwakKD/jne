import type { SubjectStat } from "@/api/supabaseAPI"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, ChartContainer, ChartTooltip, ChartTooltipContent, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui"
import type { ChartConfig } from "@/components/ui/chart"
import { YEARS } from "@/data/data"
import { CalendarDays } from "lucide-react"
import { useMemo, useState } from "react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
interface SubGradeChartProps {
    data: SubjectStat[] | null
    onBarClick: (val: string | number) => void
}

// 학년별 세련된 컬러 매핑 (Shadcn 테마 스타일)
const GRADE_COLORS: Record<string, string> = {
    '1': "#4f46e5", // 1학년: 인디고 (Indigo)
    '2': "#10b981", // 2학년: 에메랄드 (Emerald)
    '3': "#f59e0b", // 3학년: 앰버 (Amber)
}

const chartConfig = {
    value: { label: "개설 과목 수" }
} satisfies ChartConfig

export default function SubGradeChart({ data, onBarClick }: SubGradeChartProps) {
    const [selectYearGrade, setSelectYearGrade] = useState('전체')

    const gradeSemData = useMemo(() => {
        if (!data) return []
        const filtered = selectYearGrade !== '전체' ? data.filter(d => d.year === selectYearGrade) : data

        const initialMap: Record<string, number> = {
            "1-1": 0, "1-2": 0,
            "2-1": 0, "2-2": 0,
            "3-1": 0, "3-2": 0
        }

        filtered.forEach(item => {
            const grade = item.sub_grade
            const sem = item.sub_sem
            const key = `${grade}-${sem}`;
            if (initialMap[key] !== undefined) {
                initialMap[key]++
            }
        })

        return Object.entries(initialMap).map(([key, value]) => {
            const grade = key.split('-')[0];
            return {
                name: key,
                displayLabel: `${grade}학년 ${key.split('-')[1]}학기`,
                value: value,
                grade: grade,
                // Recharts의 내장 fill 속성을 타겟팅하기 위해 가공 단계에서 색상 할당
                fill: GRADE_COLORS[grade] || "#64748b"
            };
        });
    }, [data, selectYearGrade])

    // 데이터가 없는 경우 처리
    if (!data || data.length === 0) {
        return (
            <Card className="flex flex-col border-none shadow-none bg-transparent h-55 items-center justify-center text-slate-400 text-xs">
                <CalendarDays size={32} className="mb-2 text-slate-300" />
                <p>개설된 학교 데이터가 존재하지 않습니다.</p>
            </Card>
        )
    }

    return (
        <Card className="flex flex-col border-none shadow-none bg-transparent w-full">
            {/* 상단 타이틀 및 셀렉터 컨트롤 영역 */}
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 px-2">
                <div className="space-y-1">
                    <CardTitle className="text-sm font-bold text-slate-700">학년/학기별 편성 분포</CardTitle>
                    <CardDescription className="text-[11px]">시기별 교육과정 개설 현황</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                    <Select value={selectYearGrade} onValueChange={setSelectYearGrade}>
                        <SelectTrigger className="h-8 text-xs bg-slate-50 border-slate-200 w-32 rounded-lg">
                            <SelectValue placeholder="학년도 선택" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="전체">전체 학년도</SelectItem>
                            {YEARS.slice(0, 3).map((year) => (
                                <SelectItem key={year} value={year}>{year}학년도</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <span className="text-xs font-semibold text-slate-500">입학생 기준</span>
                </div>
            </CardHeader>

            {/* 차트 본문 영역 */}
            <CardContent className="p-0">
                <ChartContainer config={chartConfig} className="mx-auto h-50 w-full">
                    <BarChart
                        data={gradeSemData}
                        margin={{ top: 25, right: 10, left: -25, bottom: 10 }}
                        // [해결 핵심 1] 이벤트를 BarChart 자체에 위임하여 개별 요소의 유출을 막습니다.
                        onClick={(state) => {
                            if (state && state.activeLabel) {
                                // 현재 마우스가 올라가거나 활성화된 x축 라벨 이름을 그대로 부모 필터로 토스합니다.
                                onBarClick(state.activeLabel);
                            }
                        }}
                    >
                        <CartesianGrid strokeDasharray='3 3' vertical={false} stroke="#e2e8f0" />
                        <XAxis
                            dataKey='displayLabel'
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                            fontSize={11}
                            className="font-medium text-slate-500"
                        />
                        <YAxis tickLine={false} axisLine={false} fontSize={11} className="text-slate-400" />

                        <ChartTooltip
                            cursor={{ fill: '#f8fafc', radius: 6 }}
                            content={
                                <ChartTooltipContent
                                    className="bg-white/95 backdrop-blur-xs border border-slate-200 shadow-md p-2 rounded-xl"
                                    labelFormatter={(value) => <span className="font-bold text-slate-800">{value}</span>}
                                />
                            }
                        />

                        {/* [해결 핵심 2] shape를 걷어내고 data Key에 바인딩된 fill 배열 속성을 순수하게 수용합니다. */}
                        <Bar
                            dataKey='value'
                            radius={[6, 6, 0, 0]}
                            barSize={32}
                            className="cursor-pointer transition-opacity hover:opacity-85"
                        >
                            {/* 상단 숫자 라벨링 */}
                            <LabelList
                                dataKey="value"
                                position="top"
                                offset={8}
                                className="fill-slate-700 text-[11px] font-black"
                                formatter={(value: any) => value > 0 ? `${value}개교` : ''}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
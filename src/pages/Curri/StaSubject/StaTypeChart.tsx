import type { SubjectStat } from "@/api/supabaseAPI"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, ChartContainer } from "@/components/ui"
import type { ChartConfig } from "@/components/ui/chart"
import { CalendarDays } from "lucide-react"
import { useMemo, useState } from "react"
import { Legend, Pie, PieChart } from "recharts"

interface SubTypeChartProps {
    data: SubjectStat[] | null
    onSliceClick: (val: string) => void
}

// 이수 유형의 성격에 맞춘 신뢰감 높은 세련된 컬러셋
// (일반/진로/융합/전문교과 등이 뚜렷하게 구분되도록 배치)
const TYPE_COLORS = ['#6366f1', '#06b6d4', '#14b8a6', '#f43f5e', '#64748b']

const chartConfig = {
    value: { label: "편성 강좌 수" }
} satisfies ChartConfig

export default function SubTypeChart({ data, onSliceClick }: SubTypeChartProps) {
    // 마우스 호버 조각 상태 관리
    const [hoveredData, setHoveredData] = useState<{ name: string; value: number; fill: string } | null>(null)

    // 데이터 가공 및 컬러 사전 주입 (DOM 오염 방지)
    const chartData = useMemo(() => {
        if (!data || data.length === 0) return []

        const counts = data.reduce((acc: Record<string, number>, cur) => {
            // 데이터 필드명이 sub_type인 것에 맞춰 매핑
            const label = cur.sub_type || "미분류"
            acc[label] = (acc[label] || 0) + 1
            return acc
        }, {})

        return Object.keys(counts)
            .map((key, index) => ({
                name: key,
                value: counts[key],
                fill: TYPE_COLORS[index % TYPE_COLORS.length]
            }))
            // 수량이 많은 순서대로 정렬하여 차트 시각적 안정성 확보
            .sort((a, b) => b.value - a.value)
    }, [data])

    // 총 합계 계산
    const totalCount = useMemo(() => {
        return chartData.reduce((acc, cur) => acc + cur.value, 0)
    }, [chartData])

    // 예외 처리 (데이터가 없는 경우)
    if (!data || data.length === 0) {
        return (
            <Card className="flex flex-col border-none shadow-none bg-transparent h-55 items-center justify-center text-slate-400 text-xs">
                <CalendarDays size={32} className="mb-2 text-slate-300" />
                <p>편성된 이수 유형 데이터가 존재하지 않습니다.</p>
            </Card>
        )
    }

    return (
        <Card className="flex flex-col border-none shadow-none bg-transparent w-full">
            <CardHeader className="pb-0 px-2">
                <CardTitle className="text-sm font-bold text-slate-700">이수 유형 분포</CardTitle>
                <CardDescription className="text-[11px]">선택 과목 편성 유형 비중</CardDescription>
            </CardHeader>

            <CardContent className="p-0 flex justify-center items-center">
                <ChartContainer config={chartConfig} className="mx-auto h-55 w-full">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={65}
                            outerRadius={85}
                            paddingAngle={4}
                            dataKey="value"
                            nameKey="name"
                            // 안전한 마우스 인터랙션 이벤트 핸들링
                            onMouseEnter={(_, index) => {
                                if (chartData[index]) setHoveredData(chartData[index])
                            }}
                            onMouseLeave={() => setHoveredData(null)}
                            onClick={(entry) => {
                                if (entry && entry.name) onSliceClick(entry.name)
                            }}
                            className="cursor-pointer outline-none"
                        >
                            {/* 도넛 중앙 스코어보드 타이포그래피 */}
                            <text x="50%" y="45%" textAnchor="middle" dominantBaseline="middle">
                                <tspan
                                    x="50%"
                                    dy="-0.2em"
                                    fontSize="24"
                                    className="font-black tracking-tight"
                                    fill={hoveredData ? hoveredData.fill : "#1e293b"}
                                >
                                    {hoveredData ? hoveredData.value : totalCount}
                                </tspan>
                                <tspan
                                    x="50%"
                                    dy="1.5em"
                                    fontSize="11"
                                    className="font-bold uppercase tracking-wider"
                                    fill={hoveredData ? hoveredData.fill : "#64748b"}
                                >
                                    {hoveredData ? hoveredData.name : "총 강좌"}
                                </tspan>
                            </text>
                        </Pie>

                        {/* 커스텀 범례 주입을 통해 Recharts의 DOM Prop 전이 버그 원천 진압 */}
                        <Legend
                            verticalAlign="bottom"
                            height={30}
                            content={() => {
                                return (
                                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] font-semibold text-slate-500">
                                        {chartData.map((item) => (
                                            <div key={item.name} className="flex items-center gap-1.5">
                                                <div
                                                    className="w-2.5 h-2.5 rounded-xs"
                                                    style={{ backgroundColor: item.fill }}
                                                />
                                                <span>{item.name} ({item.value})</span>
                                            </div>
                                        ))}
                                    </div>
                                )
                            }}
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
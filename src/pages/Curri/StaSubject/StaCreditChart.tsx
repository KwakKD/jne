import type { SubjectStat } from "@/api/supabaseAPI"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, ChartContainer, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui"
import type { ChartConfig } from "@/components/ui/chart"
import { YEARS } from "@/data/data"
import { CalendarDays } from "lucide-react"
import { useMemo, useState } from "react"
import { Legend, Pie, PieChart } from "recharts"

// 눈이 편안하면서도 구분이 확실한 테마 컬러 조합
const CREDIT_COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

interface SubCreditChartProps {
    data: SubjectStat[] | null
    onSliceClick: (val: string) => void
}

const chartConfig = {
    value: { label: "편성 강좌 수" }
} satisfies ChartConfig

export default function SubCreditChart({ data, onSliceClick }: SubCreditChartProps) {
    // 마우스 호버 상태 관리
    const [hoveredData, setHoveredData] = useState<{ name: string; value: number; fill: string } | null>(null)
    const [selectYearCredit, setSelectYearCredit] = useState('전체')

    // 데이터 가공 및 색상 사전 주입
    const chartData = useMemo(() => {
        if (!data || data.length === 0) return []

        const filtered = selectYearCredit !== '전체' ? data.filter(d => d.year === selectYearCredit) : data

        const counts = filtered.reduce((acc: Record<string, number>, cur) => {
            const label = `${cur.sub_credit}학점`
            acc[label] = (acc[label] || 0) + 1
            return acc
        }, {})

        return Object.keys(counts)
            .map((key, index) => ({
                name: key,
                value: counts[key],
                // 가공 단계에서 색상을 고정하여 DOM 에러를 원천 차단합니다.
                fill: CREDIT_COLORS[index % CREDIT_COLORS.length]
            }))
            .sort((a, b) => parseInt(a.name) - parseInt(b.name))
    }, [data, selectYearCredit])

    // 총 개수 계산
    const totalCount = useMemo(() => {
        return chartData.reduce((acc, cur) => acc + cur.value, 0)
    }, [chartData])

    // 데이터가 없는 경우 안전하게 렌더링 예외 처리
    if (!data || data.length === 0) {
        return (
            <Card className="flex flex-col border-none shadow-none bg-transparent h-55 items-center justify-center text-slate-400 text-xs">
                <CalendarDays size={32} className="mb-2 text-slate-300" />
                <p>편성된 학점 데이터가 존재하지 않습니다.</p>
            </Card>
        )
    }

    return (
        <Card className="flex flex-col border-none shadow-none bg-transparent w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0 px-2">
                <div className="space-y-1">
                    <CardTitle className="text-sm font-bold text-slate-700">학점 편성 비중</CardTitle>
                    <CardDescription className="text-[11px]">이수 학점별 분포 현황</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                    <Select value={selectYearCredit} onValueChange={setSelectYearCredit}>
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

            <CardContent className="p-0 flex justify-center items-center">
                <ChartContainer config={chartConfig} className="mx-auto h-55 w-full">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={65} // 도넛 라인을 더 슬림하고 세련되게 조정
                            outerRadius={85}
                            paddingAngle={4}
                            dataKey="value"
                            nameKey="name"
                            // [에러 해결] Recharts 공식 사양에 맞추어 마우스 인터랙션을 안전하게 추적합니다.
                            onMouseEnter={(_, index) => {
                                if (chartData[index]) setHoveredData(chartData[index])
                            }}
                            onMouseLeave={() => setHoveredData(null)}
                            onClick={(entry) => {
                                if (entry && entry.name) onSliceClick(entry.name)
                            }}
                            className="cursor-pointer outline-none"
                        >
                            {/* [중앙 텍스트] 마우스 오버에 따라 유연하게 변하는 중앙 타이포그래피 */}
                            <text x="50%" y="45%" textAnchor="middle" dominantBaseline="middle">
                                <tspan
                                    x="50%"
                                    dy="-0.2em"
                                    fontSize="24"
                                    className="font-black tracking-tight"
                                    fill={hoveredData ? hoveredData.fill : "#1e293b"}
                                >
                                    {hoveredData ? hoveredData.value : `${totalCount}`}
                                </tspan>
                                <tspan
                                    x="50%"
                                    dy="1.5em"
                                    fontSize="11"
                                    className="font-bold uppercase tracking-wider"
                                    fill={hoveredData ? hoveredData.fill : "#64748b"}
                                >
                                    {hoveredData ? hoveredData.name : "총 개수"}
                                </tspan>
                            </text>
                        </Pie>

                        {/* [범례 최적화] Recharts 원본 범례를 활용해 DOM 유출 문제를 방지합니다 */}
                        <Legend
                            verticalAlign="bottom"
                            height={30}
                            content={(_props) => {
                                return (
                                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] font-semibold text-slate-500">
                                        {chartData.map((item) => (
                                            <div key={item.name} className="flex items-center gap-1.5">
                                                <div
                                                    className="w-2.5 h-2.5 rounded-xs"
                                                    style={{ backgroundColor: item.fill }}
                                                />
                                                <span>{item.name}</span>
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
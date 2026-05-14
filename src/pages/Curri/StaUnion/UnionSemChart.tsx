import type { UnionInfoProps } from "@/api/supabaseAPI"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui"
import type { ChartConfig } from "@/components/ui/chart"
import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

interface Props {
    data: UnionInfoProps[]
    year: string
}

const chartConfig = {
    count: {
        label: "강좌 수",
        color: "#4f46e5", // 인디고 색상 강조
    },
} satisfies ChartConfig

export function UnionSemChart({ data, year }: Props) {
    const chartData = useMemo(() => {
        // 학기 순서 고정
        const semesterOrder = ["1학기", "여름방학", "2학기", "겨울방학"]
        const counts: Record<string, number> = { "1학기": 0, "여름방학": 0, "2학기": 0, "겨울방학": 0 }

        data.forEach((item) => {
            if (semesterOrder.includes(item.semester)) {
                counts[item.semester]++
            }
        })

        return semesterOrder.map((sem) => ({
            semester: sem,
            count: counts[sem],
        }))
    }, [data])

    return (
        <Card className="flex flex-col border-none shadow-none bg-transparent">
            <CardHeader className="items-center pb-2 text-center">
                <CardTitle className="text-sm font-bold text-slate-700">{year} 학년도 학기별 운영 분포</CardTitle>
                <CardDescription className="text-[11px]">시기별 강좌 개설 현황</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="mx-auto h-[300px] w-full">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis
                            dataKey="semester"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            fontSize={11}
                            tickFormatter={(value) => value}
                        />
                        <YAxis fontSize={11} axisLine={false} tickLine={false} />
                        <ChartTooltip
                            cursor={{ fill: "#f8fafc" }}
                            content={<ChartTooltipContent hideIndicator />}
                        />
                        <Bar
                            dataKey="count"
                            fill="var(--color-count)"
                            radius={[4, 4, 0, 0]}
                            barSize={30}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
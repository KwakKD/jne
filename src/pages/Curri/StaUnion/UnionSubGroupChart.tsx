import type { UnionInfoProps } from "@/api/supabaseAPI"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { useMemo } from "react"
import { Cell, Legend, Pie, PieChart } from "recharts"

interface Props {
    data: UnionInfoProps[]
    year: string
}

const CHART_COLORS = [
    "#4f46e5", // 인디고 (Indigo)
    "#10b981", // 에메랄드 (Emerald)
    "#f59e0b", // 앰버 (Amber)
    "#ef4444", // 레드 (Red)
    "#06b6d4", // 사이언 (Cyan)
    "#8b5cf6", // 바이올렛 (Violet)
    "#f43f5e", // 로즈 (Rose)
    "#84cc16", // 라임 (Lime)
    "#3b82f6", // 블루 (Blue)
    "#64748b", // 슬레이트 (Slate - 미분류/기타용)
];

const chartConfig = {
    count: { label: "강좌 수" },
} satisfies ChartConfig;

export function UnionSubGroupChart({ data, year }: Props) {
    // 2. 데이터 가공 및 색상 직접 할당
    const chartData = useMemo(() => {
        const groups: Record<string, number> = {};
        data.forEach((item) => {
            const group = item.subject_group || "미분류";
            groups[group] = (groups[group] || 0) + 1;
        });

        // 집계된 데이터를 배열로 변환하며 색상 부여
        return Object.entries(groups).map(([name, value], index) => ({
            group: name,
            count: value,
            // 10가지 색상을 순환하며 할당
            fill: CHART_COLORS[index % CHART_COLORS.length],
        }));
    }, [data]);

    return (
        <Card className="flex flex-col border-none shadow-none bg-transparent h-full">
            <CardHeader className="items-center pb-0 text-center">
                <CardTitle className="text-sm font-bold text-slate-700">{year} 학년도 교과군별 개설 비중</CardTitle>
                <CardDescription className="text-[11px]">
                    현재 {data.length}개 강좌 분석됨
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0 pt-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto h-75 w-full"
                >
                    <PieChart margin={{ bottom: 20 }}>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="count"
                            nameKey="group"
                            innerRadius={65} // 도넛 두께 조절
                            outerRadius={85}
                            strokeWidth={3}
                            stroke="#fff" // 조각 간 구분선 (흰색)
                        >
                            {/* 3. Cell 컴포넌트를 통해 직접 지정한 색상 주입 */}
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.fill}
                                    className="hover:opacity-80 transition-opacity"
                                />
                            ))}
                        </Pie>
                        <Legend
                            verticalAlign="bottom"
                            align="center"
                            content={(_props) => {
                                return (
                                    <div className="flex flex-wrap justify-center gap-4 mt-2">
                                        {chartData.map((item) => (
                                            <div key={item.group} className="flex items-center gap-1.5">
                                                <div
                                                    className="w-3 h-3 rounded-sm"
                                                    style={{ backgroundColor: item.fill }}
                                                />
                                                <span className="text-[12px] font-medium text-slate-600">
                                                    {item.group} ({item.count})
                                                </span>
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
    );
}
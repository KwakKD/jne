import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Label, Pie, PieChart } from "recharts";

const chartConfig = {
    kem: {
        label: "국·영·수",
        color: "hsl(var(--chart-1))", // 또는 직접 색상값 "indigo-500"
    },
    others: {
        label: "기타 교과",
        color: "hsl(var(--slate-800))",
    },
} satisfies ChartConfig

export function KEMcheck({min, max, total }: {min:number, max: number, total: number }) {
    const others = Math.max(0, total - max);
    const minPercent = total > 0 ? Math.round((min / total) * 100) : 0;
    const maxPercent = total > 0 ? Math.round((max / total) * 100) : 0;

    // 검사 기준은 항상 '최대치'가 50%를 넘는지 확인
    const isOver = maxPercent > 50;
    const isRange = min !== max;

    // 차트 데이터 구성
    const chartData = [
        { browser: "kem", visitors: max, fill: isOver ? "#f43f5e" : "#6366f1" }, // 과도시 rose-500
        { browser: "others", visitors: others, fill: "#1e293b" }, // 배경 slate-800
    ]
    return (
        <div className="flex flex-col p-6 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-sm">
            <h4 className="text-sm font-bold text-slate-300 mb-2">국·영·수 시수 비중</h4>

            <ChartContainer config={chartConfig} className="mx-auto aspect-square min-h-50">
                <PieChart>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Pie
                        data={chartData}
                        dataKey="visitors"
                        innerRadius={60}
                        strokeWidth={5}
                        stroke="transparent"
                    >
                        <Label
                            content={({ viewBox }) => {
                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                    return (
                                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                            {/* 범위 여부에 따른 텍스트 조건부 렌더링 */}
                                            <tspan
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                className={`${isOver ? "fill-rose-500" : "fill-white"} ${isRange ? "text-xl" : "text-3xl"} font-black`}
                                            >
                                                {isRange ? `${minPercent}% ~ ${maxPercent}%` : `${maxPercent}%`}
                                            </tspan>
                                            <tspan
                                                x={viewBox.cx}
                                                y={(viewBox.cy || 0) + 24}
                                                className="fill-slate-400 text-[12px] font-bold uppercase"
                                            >
                                                국영수 비율
                                            </tspan>
                                        </text>
                                    )
                                }
                            }}
                        />
                    </Pie>
                </PieChart>
            </ChartContainer>

            <div className="mt-4 flex flex-col items-center gap-1">
                <div className="flex flex-col items-center text-xs font-medium text-slate-400">
                    {/* 상세 학점 범위 표시 */}
                    <div className="flex items-center gap-2">
                        <span className="text-slate-200 font-bold">
                            {isRange ? `${min} ~ ${max}학점` : `${max}학점`}
                        </span>
                        <span className="text-slate-600">/</span>
                        <span>권장 {Math.floor(total * 0.5)}학점</span>
                    </div>
                </div>
                
                {isOver && (
                    <p className="text-[11px] text-rose-400 mt-2 font-medium animate-bounce text-center">
                        ⚠️ 최대 비중이 50%를 초과합니다!<br/>시수를 조정하세요.
                    </p>
                )}
            </div>
        </div>
    )
}
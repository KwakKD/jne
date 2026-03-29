"use client";

import * as React from "react";
import { BarChart, CartesianGrid, XAxis, YAxis, Bar, LabelList, Cell } from "recharts";
import { Slider } from "@/components/ui/slider";
import { BarChart3, Users } from "lucide-react";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // 경로 확인

const GRADE_RATIOS = [
    { grade: "1등급", ratio: 0.10, color: "var(--chart-1)", label: "10%" },
    { grade: "2등급", ratio: 0.24, color: "var(--chart-2)", label: "24%" },
    { grade: "3등급", ratio: 0.32, color: "var(--chart-3)", label: "32%" },
    { grade: "4등급", ratio: 0.24, color: "var(--chart-4)", label: "24%" },
    { grade: "5등급", ratio: 0.10, color: "var(--chart-5)", label: "10%" },
];

const chartConfig = {
    count: { label: "인원(명)" },
} satisfies ChartConfig;

export function GradeSimulatorContent() {
    const [studentCount, setStudentCount] = React.useState([100]);

    const currentData = GRADE_RATIOS.map((item, idx, arr) => {
        const count = Math.round(studentCount[0] * item.ratio);
        const cumulative = arr.slice(0, idx + 1).reduce((acc, curr) =>
            acc + Math.round(studentCount[0] * curr.ratio), 0);

        return {
            grade: item.grade,
            count: count,
            cumulative: Math.min(cumulative, studentCount[0]),
            fill: item.color,
            label: item.label
        };
    });

    return (
        <div className="space-y-6">
            {/* 학생 수 설정 카드 */}
            <div className="p-6 bg-white rounded-2xl border shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                    <label className="text-sm font-bold flex items-center gap-2 text-slate-600">
                        <Users size={18} className="text-rose-500" />
                        학생 수 설정  <span className="text-slate-500 font-medium">(마우스나 키보드방향키를 이용해 조절해보세요.)</span>
                    </label>
                    <span className="text-3xl font-black text-rose-600 tracking-tight">
                        {studentCount[0]}<span className="text-lg font-medium text-slate-400 ml-1">명</span>
                    </span>
                </div>
                <Slider
                    value={studentCount}
                    onValueChange={setStudentCount}
                    max={400}
                    min={10}
                    step={1}
                    className="py-4"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 막대 그래프 섹션 */}
                <div className="bg-white p-6 rounded-2xl border shadow-sm flex flex-col">
                    <h4 className="text-sm font-bold text-slate-700 mb-8 flex items-center gap-2">
                        <BarChart3 size={16} className="text-blue-500" /> 등급별 인원 분포
                    </h4>
                    <div className="flex-1 w-full min-h-60">
                        <ChartContainer config={chartConfig} className="h-full w-full">
                            <BarChart data={currentData} margin={{ top: 25, right: 10, left: 10, bottom: 0 }}>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="grade"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748b', fontSize: 13, fontWeight: 600 }}
                                />
                                <YAxis hide />
                                {/* <ChartTooltip content={<ChartTooltipContent hideLabel />} /> */}
                                <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={45}>
                                    {/* 각 막대에 개별 색상 적용 */}
                                    {currentData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                    <LabelList
                                        dataKey="count"
                                        position="top"
                                        offset={12}
                                        className="fill-slate-700 font-bold text-xs"
                                        formatter={(val: unknown) =>
                                            typeof val === 'number' ? `${val}명` : ''
                                        }
                                    />
                                </Bar>
                            </BarChart>
                        </ChartContainer>
                    </div>
                </div>

                {/* 상세 인원 테이블 섹션 */}
                <div className="border rounded-2xl overflow-hidden bg-white shadow-sm h-full">
                    <Table>
                        <TableHeader className="bg-slate-50/50">
                            <TableRow>
                                <TableHead className="text-center font-bold">등급</TableHead>
                                <TableHead className="text-center font-bold">비율</TableHead>
                                <TableHead className="text-center font-bold">인원</TableHead>
                                <TableHead className="text-center font-bold text-blue-600">누적등수</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentData.map((row) => (
                                <TableRow key={row.grade} className="text-center hover:bg-slate-50/30 transition-colors">
                                    <TableCell className="font-bold text-slate-700">{row.grade}</TableCell>
                                    <TableCell className="text-xs text-slate-400 font-medium">{row.label}</TableCell>
                                    <TableCell className="font-semibold">{row.count}명</TableCell>
                                    <TableCell className="font-bold text-blue-600 bg-blue-50/20">~ {row.cumulative}등</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
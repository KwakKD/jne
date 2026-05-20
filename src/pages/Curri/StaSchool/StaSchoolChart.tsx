import { BarChart3 } from "lucide-react"
import { useMemo } from "react"
import { Cell, Label, Pie, PieChart, ResponsiveContainer } from "recharts"

interface Props {
    schoolLists: string[]
    inDataSchool: string[]
}

export default function StaSchoolChart({ schoolLists, inDataSchool }: Props) {
    // 분모 가드 (0 나누기 에러 방지)
    const schoolCount = useMemo(() => {
        if (schoolLists.length === 0) return 1
        return schoolLists.length
    }, [schoolLists])

    const inDataSchoolCount = useMemo(() => {
        return inDataSchool.length
    }, [inDataSchool])

    // 백분율 연산
    const percentage = useMemo(() => {
        return Math.round((inDataSchoolCount / schoolCount) * 100)
    }, [schoolCount, inDataSchoolCount])

    // Recharts 차트 바인딩 데이터
    const chartData = useMemo(() => [
        { name: 'Opened', value: inDataSchoolCount },
        { name: 'Empty', value: Math.max(0, schoolCount - inDataSchoolCount) }
    ], [inDataSchoolCount, schoolCount])

    // 대시보드 톤앤매너에 맞춘 세련된 테마 컬러 정의
    const COLORS = ["#4f46e5", "#f1f5f9"] // 개설: Indigo 600, 미개설: Slate 100

    const hasData = inDataSchool && schoolLists.length > 0;

    return (
        <div className="w-full flex flex-col items-center justify-center min-h-55">
            {hasData ? (
                <div className="w-full flex flex-col items-center">
                    {/* 차트 상단 서브 타이틀 */}
                    <div className="w-full text-left mb-2">
                        <span className="text-[11px] font-bold text-slate-400 tracking-tight block">
                            선택 필터링 범위 내 개설 비율
                        </span>
                    </div>

                    {/* 차트 가상 뷰포트 영역 */}
                    <div className="w-full h-40 relative flex items-center justify-center">
                        <ResponsiveContainer width="100%" height={170}>
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={46} // 도넛 두께의 세련된 비례 조정
                                    outerRadius={62}
                                    startAngle={90}
                                    endAngle={-270}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {/* 고정 컬러값 하드코딩 대신 맵 루프로 인젝션 */}
                                    {chartData.map((_entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                    ))}

                                    {/* 정중앙 백분율 라벨 렌더링 */}
                                    <Label
                                        value={`${percentage}%`}
                                        position="center"
                                        className="font-black text-slate-800 text-xl tracking-tighter"
                                    />
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* 하단 세부 통계 정보 요약바 */}
                    <p className="text-xs font-medium text-slate-500 mt-2 bg-slate-50 border border-slate-150/60 px-3 py-1.5 rounded-xl w-full text-center">
                        대상 학교 <strong className="text-slate-800 font-extrabold">{schoolCount}개교</strong> 중{" "}
                        <strong className="text-indigo-600 font-extrabold">{inDataSchoolCount}개교</strong> 개설 완료
                    </p>
                </div>
            ) : (
                // 데이터 부재 시 보여줄 고도화된 Fallback UI
                <div className="w-full flex flex-col items-center justify-center py-10 text-center gap-2">
                    <div className="p-3 bg-slate-50 rounded-full text-slate-400 border border-slate-100">
                        <BarChart3 size={20} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-700">분석 정보가 부족합니다</p>
                        <p className="text-[11px] text-slate-400 mt-0.5 max-w-45">
                            상단 대분류 교과군 조회 버튼을 먼저 실행해 주세요.
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
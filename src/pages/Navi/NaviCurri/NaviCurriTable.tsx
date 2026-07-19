import type { SchoolCurriculumProps } from "@/api/supabaseAPI"
import { Badge } from "@/components/ui"
import { BookOpen, HelpCircle } from "lucide-react"
import { CurriTable } from "./CurriTable"

interface NaviCurriTableProps {
    data: SchoolCurriculumProps[]
    selectedSchool: string
    selectedYear: string
}

function NaviCurriTable({ data, selectedSchool, selectedYear }: NaviCurriTableProps) {
    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                    <BookOpen className="text-orange-500" size={20} />
                    {selectedSchool !== "선택" && selectedSchool !== "지역을 선택하세요." && selectedYear !== '' ? `${selectedSchool} ${selectedYear}학년도 신입생 교육과정 편성표` : ""} 
                </h2>

                <Badge className="bg-slate-900 text-white rounded-xl border-none font-semibold px-3 py-0.5">
                    {selectedSchool !== "" && selectedSchool !== "지역을 선택하세요." && selectedYear !== '선택' ? `${selectedSchool} ` : "학교를 선택하세요."}
                </Badge>

            </div>
            {data.length > 0 ? (
                <div>
                    <CurriTable data={data}/>
                </div>
            ) : (
                <div className="h-[80%] flex flex-col items-center justify-center text-slate-400 space-y-2">
                    <HelpCircle size={36} className="text-slate-300" />
                    <p className="font-medium text-sm">상단 필터에서 학교를 선택하시면 편성표 목록이 조회됩니다.</p>
                </div>
            )}
        </>
    )
}

export { NaviCurriTable }
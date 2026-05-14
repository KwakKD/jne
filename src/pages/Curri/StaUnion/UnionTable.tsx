import type { UnionInfoProps } from "@/api/supabaseAPI"
import { UnionTableModal } from "./UnionTableModal"
import { Info } from "lucide-react"
import { Badge } from "@/components/ui"
import { cn } from "@/lib/utils"

interface UnionTableProps {
    data: UnionInfoProps[]
    currentPage: number
}

export function UnionTable({ data, currentPage }: UnionTableProps) {
    return (
        <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-slate-50/80 sticky top-0 z-10 backdrop-blur-sm border-b border-slate-200">
                <tr>
                    <th className="px-4 py-3 font-semibold text-slate-600 w-10">연번</th>
                    <th className="px-4 py-3 font-semibold text-slate-600 w-20">학기</th>
                    <th className="px-4 py-3 font-semibold text-slate-600 w-20">지역</th>
                    <th className="px-4 py-3 font-semibold text-slate-600">학년</th>
                    <th className="px-4 py-3 font-semibold text-slate-600">과목명</th>
                    <th className="px-4 py-3 font-semibold text-slate-600">개설학교</th>
                    <th className="px-4 py-3 font-semibold text-slate-600 w-15 text-center">학점</th>
                    <th className="px-4 py-3 font-semibold text-slate-600 w-20 text-center">상세</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
                {data.length > 0 ? (
                    data.map((sub, idx) => (
                        <tr
                            key={sub.id}
                            className={cn(
                                "hover:bg-indigo-50/30 transition-colors cursor-pointer group",
                                // unionSelectSchool === sub.school_name && "bg-indigo-50/50"
                            )}
                        // onClick={() => setUnionSelectSchool(sub.school_name)}
                        >
                            <td className="px-4 py-3 text-slate-500 font-medium">{(currentPage - 1) * 10 + idx + 1}</td>
                            <td className="px-4 py-3">
                                <Badge variant="outline" className="text-[11px] font-medium border-slate-200 bg-slate-50">
                                    {sub.semester}
                                </Badge>
                            </td>
                            <td className="px-4 py-3 text-slate-500 font-medium">{sub.location}</td>
                            <td className="px-4 py-3 text-slate-500 font-medium">{sub.grade}학년</td>
                            <td className="px-4 py-3 font-bold text-slate-900 group-hover:text-indigo-600">
                                {sub.subject_name}
                            </td>
                            <td className="px-4 py-3 text-slate-600">{sub.school_name}</td>
                            <td className="px-4 py-3 text-center font-medium text-slate-500">{sub.credit}</td>
                            <td className="px-4 py-3 text-center font-medium text-slate-500">
                                {UnionTableModal(sub)}
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={6} className="py-20 text-center text-slate-400">
                            <div className="flex flex-col items-center gap-2">
                                <Info size={32} strokeWidth={1.5} className="text-slate-300" />
                                <p>조건에 맞는 강좌가 없습니다.</p>
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}
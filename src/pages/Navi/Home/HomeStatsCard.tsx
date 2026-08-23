import { fetchNavStaSchool } from "@/api/supabaseAPI"
import { Card, CardContent } from "@/components/ui"
import { NAVI_SUBJECT_DATA } from "@/data/nav"
import { useQuery } from "@tanstack/react-query"
import { BookCheck, BookOpen, Building2, FileUser, School } from "lucide-react"

interface SchoolData {
    schoolname: string
}

function HomeStatsCard() {
    const { data: schools } = useQuery<SchoolData[]>({
        queryKey: ['staschool'],
        queryFn: fetchNavStaSchool,
        staleTime: 1000 * 60 * 30
    })
    const schoolNumber = schools && Array.isArray(schools)
        ? new Set(schools.map((item) => item.schoolname)).size
        : 0

    const statsData = [
        { icon: Building2, label: "분석 대상 주요 대학", value: "44", unit: "개교", color: "text-amber-600 bg-amber-50/80 border-amber-200/50" },
        { icon: BookOpen, label: "제공 과목 정보", value: `${NAVI_SUBJECT_DATA.length}`, unit: "과목", color: "text-sky-600 bg-sky-50/80 border-sky-200/50" },
        { icon: School, label: "공동교육과정 개설교", value: "53+", unit: "개교", color: "text-indigo-600 bg-indigo-50/80 border-indigo-200/50" },
        { icon: BookCheck, label: "공동교육과정 개설과목 수", value: "186+", unit: "과목", color: "text-emerald-600 bg-emerald-50/80 border-emerald-200/50" },
        { icon: FileUser, label: "교육과정 편성 제공", value: `${schoolNumber}+`, unit: "개교", color: "text-violet-600 bg-violet-50/80 border-violet-200/50" },
    ]
    return (
        <Card className="lg:col-span-12 border-slate-200/80 bg-white/95 backdrop-blur-md shadow-lg shadow-slate-200/40 rounded-3xl overflow-hidden">
            <CardContent className="p-2 sm:px-3">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {statsData.map((item, idx) => {
                        const IconComponent = item.icon
                        const isLastItem = idx === statsData.length - 1

                        return (
                            <div
                                key={idx}
                                className={`flex items-center gap-3.5 p-2 rounded-2xl bg-slate-50/50 hover:bg-slate-100/80 border border-slate-100 transition-all ${isLastItem ? "col-span-2 md:col-span-1" : "col-span-1"
                                    }`}
                            >
                                <div className={`p-2.5 rounded-xl shrink-0 ${item.color}`}>
                                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[12px] font-semibold text-slate-600 truncate">
                                        {item.label}
                                    </p>
                                    <p className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight flex items-baseline">
                                        {item.value}
                                        <span className="text-xs font-normal text-slate-500 ml-1">
                                            {item.unit}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}

export { HomeStatsCard }
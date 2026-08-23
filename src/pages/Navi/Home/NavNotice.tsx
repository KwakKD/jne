import { fetchNoticeByPath } from "@/api/supabaseAPI"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Badge, Card, CardContent, CardHeader, CardTitle, Skeleton } from "@/components/ui"
import type { NoticeItem } from "@/pages/Admin/Notice/NoticeModal"
import { useQuery } from "@tanstack/react-query"
import { AlertCircle, Bell,  Info } from "lucide-react"
// import { useNavigate } from "react-router-dom"

const getTypeBadgeStyle = (type: string) => {
    switch (type) {
        case "공지":
            return "bg-blue-50 text-blue-600 border-blue-200/60"
        case "행사":
            return "bg-purple-50 text-purple-600 border-purple-200/60"
        case "업데이트":
            return "bg-emerald-50 text-emerald-600 border-emerald-200/60"
        case "제출":
            return "bg-amber-50 text-amber-600 border-amber-200/60"
        default:
            return "bg-slate-100 text-slate-600 border-slate-200/60"
    }
}

function NavNoitce() {
    // const navigate = useNavigate()
    const {
        data: notices = [],
        isLoading,
        isError,
    } = useQuery<NoticeItem[]>({
        queryKey: ['navnotice'],
        queryFn: () => fetchNoticeByPath('nav'),
        staleTime: 1000 * 60 * 30
    })

    return (
        <Card className="border-slate-200/80 shadow-md rounded-2xl bg-white/90 backdrop-blur-md overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-200">
                <CardTitle className="text-base font-bold flex items-center gap-2 text-slate-800">
                    <div className="p-1.5 rounded-lg bg-amber-100 text-amber-600">
                        <Bell className="w-4 h-4" />
                    </div>
                    공지사항
                </CardTitle>
                {/* <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/subject-navigation/help")}
                    className="text-xs font-semibold text-slate-400 hover:text-amber-600 hover:bg-amber-50/50 -mr-2 cursor-pointer"
                >
                    더보기 <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </Button> */}
            </CardHeader>

            <CardContent className="pt-0 px-3 pb-2">
                {/* 1. 로딩 상태 */}
                {isLoading && (
                    <div className="space-y-2 py-1">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="p-2 space-y-2">
                                <div className="flex justify-between items-center">
                                    <Skeleton className="h-4 w-3/4 rounded-md" />
                                    <Skeleton className="h-3 w-12 rounded-md" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 2. 에러 상태 */}
                {isError && (
                    <div className="py-6 text-center text-xs text-rose-500 flex flex-col items-center gap-1.5">
                        <AlertCircle className="w-5 h-5 text-rose-400" />
                        <p>공지사항을 불러오는 중 오류가 발생했습니다.</p>
                    </div>
                )}

                {/* 3. 데이터가 없는 경우 */}
                {!isLoading && !isError && notices.length === 0 && (
                    <div className="py-8 text-center text-xs text-slate-400 flex flex-col items-center gap-1.5">
                        <Info className="w-5 h-5 text-slate-300" />
                        <p>등록된 주요 알림이 없습니다.</p>
                    </div>
                )}

                {/* 4. 데이터 출력 */}
                {!isLoading && !isError && notices.length > 0 && (
                    <div className="max-h-87 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200">
                        <Accordion type="single" collapsible className="w-full">
                            {notices.map((notice, index) => {
                                const formattedDate = notice.created_at
                                    ? notice.created_at.slice(0, 10).replace(/-/g, ".")
                                    : ""

                                return (
                                    <AccordionItem
                                        key={notice.id ?? index}
                                        value={String(notice.id ?? index)}
                                        className="border-b border-slate-100 last:border-none"
                                    >
                                        <AccordionTrigger className="hover:no-underline py-2.5 px-2 rounded-xl hover:bg-slate-50/80 transition-colors [&[data-state=open]]:bg-amber-50/30">
                                            <div className="flex items-center justify-between w-full mr-2 overflow-hidden">
                                                <div className="flex items-center gap-2 overflow-hidden mr-2 min-w-0">


                                                    {/* 🏷️ Type 구분 배지 */}
                                                    {notice.type && (
                                                        <Badge
                                                            variant="outline"
                                                            className={`px-1.5 py-0.5 rounded-md text-[10px] font-semibold shrink-0 border ${getTypeBadgeStyle(notice.type)}`}
                                                        >
                                                            {notice.type}
                                                        </Badge>
                                                    )}
                                                    {/* ✨ 중요 알림 반짝이는 점 (Ping 애니메이션) */}
                                                    {notice.important && (
                                                        <span className="relative flex h-2 w-2 shrink-0 ml-0.5 mr-0.5">
                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                                                        </span>
                                                    )}

                                                    {/* 📝 제목 */}
                                                    <p className="text-xs font-medium text-slate-700 truncate text-left">
                                                        {notice.title}
                                                    </p>
                                                </div>

                                                {/* 📅 날짜 */}
                                                {formattedDate && (
                                                    <span className="text-[11px] text-slate-400 font-mono shrink-0 ml-1">
                                                        {formattedDate}
                                                    </span>
                                                )}
                                            </div>
                                        </AccordionTrigger>

                                        <AccordionContent className="px-3 pt-2 pb-3 text-xs text-slate-600 leading-relaxed bg-slate-50/60 rounded-b-xl mt-0.5">
                                            {/* max-h 지정 및 overflow-y-auto 처리 */}
                                            <div className="whitespace-pre-wrap font-sans text-slate-600 max-h-48 overflow-y-auto pr-1">
                                                {notice.content}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                )
                            })}
                        </Accordion>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export { NavNoitce }
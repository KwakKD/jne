import { fetchNoticeByPath } from "@/api/supabaseAPI";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import type { NoticeItem } from "@/pages/Admin/Notice/NoticeModal";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Inbox, Loader2, Megaphone } from "lucide-react"

function Notice() {
    const {
        data: notices = [],
        isLoading,
        isError,
        error,
    } = useQuery<NoticeItem[]>({
        queryKey: ["notice"],
        queryFn: () => fetchNoticeByPath('curri'),
        staleTime: 1000 * 60 * 30,
    });

    return (
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col h-150">
            {/* 헤더 부분 */}
            <div className="px-6 py-5 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-amber-100 rounded-lg">
                        <Megaphone size={18} className="text-amber-600" />
                    </div>
                    <h3 className="font-bold text-slate-800 tracking-tight">공지사항</h3>
                </div>
            </div>

            {/* 컨텐츠 리스트 영역 (내부 스크롤) */}
            <div className="flex-1 overflow-y-auto">
                {/* 1) 로딩 중 */}
                {isLoading && (
                    <div className="h-full flex flex-col items-center justify-center p-6 text-slate-400 gap-2">
                        <Loader2 size={24} className="animate-spin text-amber-500" />
                        <p className="text-xs">공지사항을 불러오는 중...</p>
                    </div>
                )}

                {/* 2) 에러 발생 시 */}
                {isError && (
                    <div className="h-full flex flex-col items-center justify-center p-6 text-rose-500 gap-2">
                        <AlertCircle size={24} />
                        <p className="text-xs font-medium">
                            불러오기 실패: {error?.message}
                        </p>
                    </div>
                )}

                {/* 3) 데이터가 없을 때 */}
                {!isLoading && !isError && notices.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center p-6 text-slate-400 gap-2">
                        <Inbox size={28} className="text-slate-300" />
                        <p className="text-xs">등록된 공지사항이 없습니다.</p>
                    </div>
                )}

                {/* 4) 아코디언 리스트 */}
                {!isLoading && !isError && notices.length > 0 && (
                    <Accordion type="single" collapsible className="w-full">
                        {notices.map((notice) => (
                            <AccordionItem
                                key={notice.id}
                                value={String(notice.id)}
                                className="px-6 border-b-slate-100 last:border-b-0"
                            >
                                <AccordionTrigger className="hover:no-underline py-5 group">
                                    <div className="flex flex-col items-start gap-2 text-left w-full pr-2">
                                        <div className="flex items-center gap-2">
                                            {notice.important && (
                                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                                            )}
                                            <Badge
                                                variant="secondary"
                                                className={`
                          text-[10px] px-2 py-0 border-none font-bold
                          ${notice.type === "행사"
                                                        ? "bg-purple-50 text-purple-600"
                                                        : notice.type === "업데이트"
                                                            ? "bg-emerald-50 text-emerald-600"
                                                            : notice.type === "제출"
                                                                ? "bg-amber-50 text-amber-600"
                                                                : "bg-indigo-50 text-indigo-600"
                                                    }
                        `}
                                            >
                                                {notice.type || "공지"}
                                            </Badge>
                                            <span className="text-[11px] text-slate-400 font-medium font-mono">
                                                {notice.created_at
                                                    ? new Date(notice.created_at)
                                                        .toLocaleDateString("ko-KR", {
                                                            year: "numeric",
                                                            month: "2-digit",
                                                            day: "2-digit",
                                                        })
                                                        .replace(/\. /g, ".")
                                                        .slice(0, -1)
                                                    : notice.created_at || "-"}
                                            </span>
                                        </div>
                                        <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors line-clamp-1 leading-snug">
                                            {notice.title}
                                        </span>
                                    </div>
                                </AccordionTrigger>

                                <AccordionContent className="pb-6 pt-1">
                                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
                                        <p className="text-sm text-slate-600 leading-relaxed break-keep whitespace-pre-line">
                                            {notice.content}
                                        </p>

                                        <div className="flex items-center justify-between pt-3 border-t border-slate-200/60">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] text-slate-400">
                                                    담당: 관리자
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                )}
            </div>

            {/* 푸터 영역 */}
            <div className="mt-auto px-6 py-4 bg-slate-50/30 text-center border-t border-slate-100 shrink-0">
                <p className="text-[10px] text-slate-400">
                    최근 공지사항 및 안내 내용을 확인하실 수 있습니다.
                </p>
            </div>
        </div>
    );
}

export { Notice };


import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
import {
    // Paperclip,
    Megaphone
} from "lucide-react"

// 샘플 데이터 (나중에 Supabase 등에서 불러오시면 됩니다)
const notices = [
    // {
    //     id: "notice-1",
    //     type: "안내",
    //     title: "2027학년도 고등학교 교육과정 편성, 운영 연수 참석 안내",
    //     date: "2026-06-08",
    //     content: "2027학년도 고등학교 교육과정 편성 운영 연수를 다음과 같이 실시합니다.\n1. 일시: 2026. 6. 12.(금) 14:00 ~ 16:40\n2. 장소: 동신대학교 대정3관 투게더홀(나주시 동신대길 103 대정 3관 218호)\n 3. 대상: 일반고(자유고, 특수목적소 포함) 97교 교감 및 업무담당자(학교별 2명)",
    //     important: true,
    // },
    {
        id: "notice-1",
        type: "업데이트",
        title: "로그인 시스템 안내",
        date: "2026-07-01",
        content: "로그인 화면에서 지역 및 학교를 클릭하신 후, 초기 비밀번호를 입력하시기 바랍니다.\n처음 로그인 하거나 초기비밀번호로 설정된 경우 비밀번호 변경 페이지가 나옵니다.\n비밀번호를 잃어버렸을 때, 관리자에게 문의하시면 비밀번호를 초기화 시켜드립니다.",
        important: true,
    },
    // {
    //     id: "notice-3",
    //     type: "업데이트",
    //     title: "과목 선택 통계 대시보드 기능 추가 안내(예시)",
    //     date: "2026-03-25",
    //     content: "선생님들의 피드백을 반영하여 '학년별 선택과목 수요 조사' 결과를 한눈에 볼 수 있는 그래프 기능이 추가되었습니다. 통계 메뉴에서 확인 가능합니다.",
    //     important: false,
    // },
];

function NoticeItem() {
    return (
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col h-150">
            {/* 헤더 부분 */}
            <div className="px-6 py-5 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-amber-100 rounded-lg">
                        <Megaphone size={18} className="text-amber-600" />
                    </div>
                    <h3 className="font-bold text-slate-800 tracking-tight">공지사항</h3>
                </div>
                {/* <Button variant="ghost" size="sm" className="text-xs text-slate-400 hover:text-indigo-600 font-medium">
                    전체보기
                </Button> */}
            </div>

            {/* 아코디언 리스트 */}
            <Accordion type="single" collapsible className="w-full">
                {notices.map((notice) => (
                    <AccordionItem
                        key={notice.id}
                        value={notice.id}
                        className="px-6 border-b-slate-100 last:border-b-0"
                    >
                        <AccordionTrigger className="hover:no-underline py-5 group">
                            <div className="flex flex-col items-start gap-2 text-left">
                                <div className="flex items-center gap-2">
                                    {notice.important && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                                    )}
                                    <Badge
                                        variant="secondary"
                                        className={`
                      text-[10px] px-2 py-0 border-none font-bold
                      ${notice.type === '지침' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-500'}
                    `}
                                    >
                                        {notice.type}
                                    </Badge>
                                    <span className="text-[11px] text-slate-400 font-medium">{notice.date}</span>
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
                                        <span className="text-[10px] text-slate-400">담당: 관리자</span>
                                    </div>
                                    {/* <Button size="sm" variant="outline" className="h-8 text-xs gap-1.5 rounded-xl bg-white border-slate-200 hover:bg-slate-50">
                                        <Paperclip size={13} className="text-slate-400" />
                                        지침_전문_다운로드.pdf
                                    </Button> */}
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

            {/* 푸터 가이드 (선택 사항) */}
            <div className="mt-auto px-6 py-4 bg-slate-50/30 text-center">
                <p className="text-[10px] text-slate-400">최근 30일 이내의 공지만 표시됩니다.</p>
            </div>
        </div>
    )
}

export { NoticeItem }
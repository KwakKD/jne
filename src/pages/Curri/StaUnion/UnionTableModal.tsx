import type { UnionInfoProps } from "@/api/supabaseAPI";
import { Badge, Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui";
import { CalendarDays, Clock, ExternalLink, MapPin } from "lucide-react";

const UnionTableModal = (sub: UnionInfoProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0 hover:bg-indigo-50 hover:text-indigo-600">
                    <ExternalLink size={14} />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader className="space-y-3">
                    
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none font-medium">
                            {sub.subject_group}
                        </Badge>
                        <Badge variant="outline" className="text-indigo-600 border-indigo-100 bg-indigo-50/50">
                            {sub.subject_type}
                        </Badge>
                        <Badge className="bg-orange-500 hover:bg-orange-600 shadow-none">
                            {sub.credit}학점
                        </Badge>
                    </div>
                    <DialogTitle className="text-xl font-bold text-slate-900 tracking-tight">
                        {sub.subject_name}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-3 py-4 text-[13px]">
                    {/* 정보 그리드 섹션 */}
                    <div className="grid grid-cols-3 gap-2 border-b border-slate-100 pb-2 items-center">
                        <span className="text-slate-400 flex items-center gap-1.5"><CalendarDays size={14} /> 운영정보</span>
                        <span className="col-span-2 font-medium">{sub.year}년 / {sub.semester}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 border-b border-slate-100 pb-2 items-center">
                        <span className="text-slate-400 flex items-center gap-1.5"><MapPin size={14} /> 거점학교</span>
                        <span className="col-span-2 font-medium">{sub.school_name} <span className="text-slate-400 font-normal ml-1">({sub.location})</span></span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 border-b border-slate-100 pb-2 items-center">
                        <span className="text-slate-400 flex items-center gap-1.5"><Clock size={14} /> 운영시간</span>
                        <span className="col-span-2 font-medium">{sub.operating_time}</span>
                    </div>

                    {/* 기존의 나머지 항목들도 동일한 간격으로 배치 */}
                    <div className="grid grid-cols-3 gap-2 border-b border-slate-100 pb-2"><span className="text-slate-400">수업장소</span><span>{sub.classroom}</span></div>
                    <div className="grid grid-cols-3 gap-2 border-b border-slate-100 pb-2"><span className="text-slate-400">운영학년</span><span>{sub.grade}학년</span></div>
                    <div className="grid grid-cols-3 gap-2 border-b border-slate-100 pb-2"><span className="text-slate-400">시작날짜</span><span>{sub.start_date}</span></div>
                    <div className="grid grid-cols-3 gap-2 border-b border-slate-100 pb-2"><span className="text-slate-400">종료날짜</span><span>{sub.end_date}</span></div>

                    <div className="bg-slate-50 p-3 rounded-xl mt-2">
                        <span className="text-[11px] font-bold text-slate-400 uppercase mb-1 block">비고</span>
                        <p className="text-slate-600 leading-relaxed text-xs">
                            {sub.memo || '등록된 비고 사항이 없습니다.'}
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export { UnionTableModal }
import { useNaviCurriStore } from "@/store/NaviCurriStore"
import { BookOpen, CalendarRange, LayoutGrid } from "lucide-react"
import { CurriGrade } from "./CurriGrade"
import { useState } from "react"
import { CurriSubjectGroup } from "./CurriSubjectGroup"

function CurriRight() {
    const curri = useNaviCurriStore((state) => state.curri)
    const [activeTab, setActiveTab] = useState<"timeline" | "subjectGroup">("timeline")

    // 데이터가 아직 존재하지 않을 때 노출되는 플레이스홀더 뷰
    if (!curri || curri.length === 0) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 h-full bg-slate-50/20">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 mb-5 shadow-sm relative">
                    <BookOpen size={24} className="text-orange-500 animate-pulse" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-ping" />
                </div>
                <p className="font-extrabold text-slate-800 text-base">교육과정 미조회</p>
                <p className="text-xs text-slate-400/90 text-center mt-2 max-w-65 leading-relaxed">
                    상단 필터를 지정한 뒤 <span className="text-orange-500 font-bold underline decoration-wavy">조회하기</span> 버튼을 누르면 학년/학기별 편성 상세 정보가 표시됩니다.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full space-y-6">
            <div className="flex p-1 mb-2 bg-slate-100/80 rounded-xl border border-slate-200/30 gap-1">
                <button
                    onClick={() => setActiveTab("timeline")}
                    className={`flex-1 py-2 rounded-lg text-xs font-black flex items-center justify-center gap-1.5 transition-all ${activeTab === "timeline"
                        ? "bg-white text-slate-900 shadow-sm border border-slate-200/30"
                        : "text-slate-500 hover:text-slate-800 hover:bg-white/40"
                        }`}
                >
                    <CalendarRange size={13} className={activeTab === "timeline" ? "text-orange-500" : ""} />
                    학년·학기별 보기
                </button>
                <button
                    onClick={() => setActiveTab("subjectGroup")}
                    className={`flex-1 py-2 rounded-lg text-xs font-black flex items-center justify-center gap-1.5 transition-all ${activeTab === "subjectGroup"
                        ? "bg-white text-slate-900 shadow-sm border border-slate-200/30"
                        : "text-slate-500 hover:text-slate-800 hover:bg-white/40"
                        }`}
                >
                    <LayoutGrid size={13} className={activeTab === "subjectGroup" ? "text-indigo-500" : ""} />
                    교과군별 보기
                </button>
            </div>
            {activeTab === 'timeline' && <CurriGrade />}
            {activeTab === 'subjectGroup' && <CurriSubjectGroup />}

        </div>
    );
}
export { CurriRight }
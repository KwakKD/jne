import { useNaviCurriStore } from "@/store/NaviCurriStore"
import { CheckCircle2, ChevronRight, Layers, Sparkles } from "lucide-react"
import { useState } from "react"

function CurriGrade() {
    const curri = useNaviCurriStore((state) => state.curri)
    const selectedYear = useNaviCurriStore((state) => state.selectedYear)

    const [selectGrade, setSelectGrade] = useState(1)
    const [selectSem, setSelectSem] = useState(1)

    const fixFilteredData = curri[0].fix.filter(item => item.Grade === selectGrade && item.Semester === selectSem)
    const choiceFilteredData = curri[0].choice.filter(item => item.Grade === selectGrade && item.Semester === selectSem)

    const filteredGroupName = [...new Set(choiceFilteredData.map(item => item.IsGroup))]

    const getSubjectGroupBadge = (group: string) => {
        const baseClass = "text-[11px] px-2 py-0.5 rounded-md font-bold tracking-tight ";
        if (!group) return baseClass + "bg-slate-100 text-slate-600";
        if (group.includes("국어") || group.includes("영어") || group.includes("인문")) {
            return baseClass + "bg-indigo-50 text-indigo-600 border border-indigo-100";
        }
        if (group.includes("수학") || group.includes("과학") || group.includes("자연")) {
            return baseClass + "bg-sky-50 text-sky-600 border border-sky-100";
        }
        if (group.includes("사회") || group.includes("생활")) {
            return baseClass + "bg-amber-50 text-amber-600 border border-amber-100";
        }
        return baseClass + "bg-slate-100 text-slate-600 border border-slate-200/50";
    }

    return (
        <>
            <div className="space-y-1 pb-0 mb-2">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                    <span className="text-xs font-black text-orange-500 uppercase tracking-wider">Detail view</span>
                    <p className="text-[11px] text-slate-600 font-medium">
                        선택하신 학교의 {selectedYear}학년도 신입생 학년 및 학기별 학교지정/선택 과목 구성안입니다.
                    </p>
                </div>
            </div>
            {/* 1. 세그먼트식 컨트롤 패널 */}
            <div className="p-1.5 mb-2 bg-slate-200/80 rounded-2xl border border-slate-200/40 grid grid-cols-2 gap-1.5">
                {/* 학년 선택 */}
                <div className="flex flex-col bg-white/90 p-2.5 rounded-xl border border-slate-200/30 shadow-sm space-y-1.5">
                    <span className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider ml-1">학년 설정</span>
                    <div className="flex gap-1">
                        {[1, 2, 3].map((grade) => (
                            <button
                                key={grade}
                                onClick={() => setSelectGrade(grade)}
                                className={`flex-1 py-1 rounded-lg text-xs font-black transition-all duration-200 ${selectGrade === grade
                                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 scale-[1.03]"
                                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                                    }`}
                            >
                                {grade}학년
                            </button>
                        ))}
                    </div>
                </div>

                {/* 학기 선택 */}
                <div className="flex flex-col bg-white/90 p-2.5 rounded-xl border border-slate-200/30 shadow-sm space-y-1.5">
                    <span className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider ml-1">학기 설정</span>
                    <div className="flex gap-1">
                        {[1, 2].map((sem) => (
                            <button
                                key={sem}
                                onClick={() => setSelectSem(sem)}
                                className={`flex-1 py-1 rounded-lg text-xs font-black transition-all duration-200 ${selectSem === sem
                                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/10 scale-[1.03]"
                                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                                    }`}
                            >
                                {sem}학기
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 2. 본문 리스트 영역 */}
            <div className="flex-1 space-y-7 overflow-y-auto pr-1">

                {/* [섹션 A] 지정 과목 영역 (에메랄드/민트 테마) */}
                <div className="space-y-3.5">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                                <CheckCircle2 size={14} className="stroke-[2.5]" />
                            </div>
                            <h3 className="font-extrabold text-slate-800 text-sm tracking-tight">학교 지정 공통 과목</h3>
                        </div>
                        <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2.5 py-0.5 rounded-full font-extrabold border border-emerald-100">
                            총 {fixFilteredData.length}개 과목
                        </span>
                    </div>

                    {fixFilteredData.length === 0 ? (
                        <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                            <p className="text-xs text-slate-400">해당 학기에 지정된 공통 이수 과목이 없습니다.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-2.5">
                            {fixFilteredData.map((item, idx: number) => (
                                <div
                                    key={idx}
                                    className="p-3 bg-emerald-100/20 border-l-4 border-l-emerald-500 border-y border-r border-emerald-500/10 rounded-r-xl rounded-l flex items-center justify-between shadow-[0_2px_6px_rgba(16,185,129,0.03)] hover:shadow-[0_4px_12px_rgba(16,185,129,0.08)] hover:bg-emerald-50/40 transition-all duration-200"
                                >
                                    <div className="space-y-1.5 max-w-[70%]">
                                        <p className="font-extrabold text-emerald-950 text-xs md:text-sm truncate">{item.SubjectName}</p>
                                        <span className={getSubjectGroupBadge(item.SubjectGroup || "")}>
                                            {item.SubjectGroup || "공통교과"}
                                        </span>
                                    </div>
                                    <div className="shrink-0 text-right">
                                        <span className="text-[11px] font-black text-emerald-700 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/10">
                                            {item.Credit}학점
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* [섹션 B] 선택 과목 영역 (피치/오렌지 테마) */}
                <div className="space-y-3.5">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600">
                                <Layers size={14} className="stroke-[2.5]" />
                            </div>
                            <h3 className="font-extrabold text-slate-800 text-sm tracking-tight">학생 선택 과목 그룹</h3>
                        </div>
                        <span className="text-[10px] bg-orange-50 text-orange-600 px-2.5 py-0.5 rounded-full font-extrabold border border-orange-100">
                            총 {filteredGroupName.length}개 그룹
                        </span>
                    </div>

                    {filteredGroupName.length === 0 ? (
                        <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                            <p className="text-xs text-slate-400">해당 학기에 개설된 선택 군이 없습니다.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredGroupName.map((groupName: string, groupIdx: number) => {
                                const groupInfo = curri[0].groupdata[groupName]
                                const groupSubjects = choiceFilteredData.filter((item) => item.IsGroup === groupName);
                                const selectCount = groupInfo?.Choice || 1;
                                const subjectCount = groupInfo.Subject.length

                                return (
                                    <div
                                        key={groupIdx}
                                        className="border border-orange-600  rounded-2xl overflow-hidden shadow-sm bg-white hover:shadow-md transition-shadow duration-200"
                                    >
                                        {/* 선택 그룹 헤더 */}
                                        <div className="bg-orange-50/20 px-4 py-3 border-b border-orange-100/50 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Sparkles size={12} className="text-orange-500 fill-orange-500/20" />
                                                <span className="text-sm font-black text-orange-950 truncate max-w-50">
                                                    선택 그룹 {groupIdx + 1}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[11px] bg-indigo-700 text-white px-2.5 py-0.5 rounded-full font-black shadow-sm shadow-orange-500/15">
                                                    총 {subjectCount}개 과목
                                                </span>
                                                <span className="text-[11px] bg-green-700 text-white px-2.5 py-0.5 rounded-full font-black shadow-sm shadow-orange-500/15">
                                                    택 {selectCount}
                                                </span>
                                            </div>

                                        </div>

                                        {/* 그룹 내 개설 과목 목록 */}
                                        <div className="divide-y divide-slate-100/60 bg-white">
                                            {groupSubjects.map((subject, subIdx: number) => (
                                                <div
                                                    key={subIdx}
                                                    className="px-4 py-3 flex items-center justify-between hover:bg-orange-50/5 transition-colors"
                                                >
                                                    <div className="flex items-center gap-2 max-w-[75%]">
                                                        <ChevronRight size={12} className="text-orange-400 stroke-3" />
                                                        <span className={getSubjectGroupBadge(subject.SubjectGroup || "")}>
                                                            {subject.SubjectGroup || "공통교과"}
                                                        </span>
                                                        <span className="text-sm font-extrabold text-slate-600 truncate">{subject.SubjectName}</span>
                                                    </div>
                                                    <span className="text-[11px] font-black text-orange-600 bg-orange-50 px-2 py-1 rounded border border-orange-100/30">
                                                        {subject.Credit}학점
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export { CurriGrade }
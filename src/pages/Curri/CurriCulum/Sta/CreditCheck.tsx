import { useStatistics } from "@/hooks/curriSta";
import { CheckCircle2 } from "lucide-react";

export function CreditCheck() {
    const { statistics_subjectCreditCheck } = useStatistics();
    const subjectGroupList = ["국어", "수학", "영어", "사회", "과학", "체육", "예술", "생활교양"];
    const leastCredit = [8, 8, 8, 8, 10, 10, 10, 10];

    return (
        <div className="space-y-3 p-2">
            <h4 className="text-sm font-bold text-slate-300 px-2 flex items-center gap-2">
                <div className="w-1 h-4 bg-indigo-500 rounded-full" />
                교과군별 필수학점 점검
            </h4>

            <div className="grid grid-cols-1 gap-2">
                {subjectGroupList.map((item, idx) => {
                    const [min, _max] = statistics_subjectCreditCheck[item] || [0, 0];
                    const isLow = min < leastCredit[idx];

                    return (
                        <div
                            key={item}
                            className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${isLow
                                    ? "bg-rose-500/10 border-rose-500/20 shadow-[inset_0_0_12px_rgba(244,63,94,0.1)]"
                                    : "bg-white/5 border-white/10"
                                }`}
                        >
                            <div className="flex flex-col">
                                <span className={`text-sm font-bold ${isLow ? "text-rose-400" : "text-slate-200"}`}>
                                    {item}
                                </span>
                                <span className="text-[11px] text-slate-300">필수 {leastCredit[idx]}학점</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="text-right">
                                    <span className={`text-sm font-black ${isLow ? "text-rose-500" : "text-indigo-400"}`}>
                                        {min}
                                    </span>
                                    <span className="text-[13px] text-slate-400 ml-1">/ {leastCredit[idx]}</span>
                                </div>
                                {/* 상태 아이콘 */}
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isLow ? "bg-rose-500/20 text-rose-500" : "bg-emerald-500/20 text-emerald-500"}`}>
                                    {isLow ? <span className="text-xs font-bold">!</span> : <CheckCircle2 size={14} />}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
import { Progress } from "@/components/ui"
import { useStatistics } from "@/hooks/curriSta"
import { useCurriTableStore } from "@/store/CurriSubjectStore"

export const CurriAllProgress = () => {
    const { allCredit_1, allCredit_2 } = useStatistics()
    const year = useCurriTableStore((state) => state.year)
    const userData = useCurriTableStore((state) => state.userData)

    // 창의적 체험활동(CEA) 학점 합산
    const CEA = userData[year].CEA
    const CEA_creidt = CEA['1-1'] + CEA['1-2'] + CEA['2-1'] + CEA['2-2'] + CEA['3-1'] + CEA['3-2']

    const total = 192;
    const completed = allCredit_1 + allCredit_2 + CEA_creidt;
    const percent = total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0;

    return (
        <div className="flex flex-col items-end gap-1 min-w-80">
            {/* 상단 수치 표시 */}
            <div className="flex items-baseline gap-1 font-black mr-10">
                <span className="text-xs text-slate-400 mr-1">총 이수 학점</span>
                <span className="text-indigo-700 text-xl tracking-tighter">{completed}</span>
                <span className="text-slate-500 text-sm">/ {total}</span>
            </div>

            {/* 프로그레스 바 영역 */}
            <div className="w-full flex items-center gap-3">
                <Progress
                    value={percent}
                    className="h-2.5 w-full bg-slate-200"
                />
                <span className="text-[15px] font-bold text-indigo-500 w-8 text-right">
                    {percent}%
                </span>
            </div>

            {/* {total - completed > 0 && (
                <p className="text-[10px] text-slate-400 font-medium leading-none">
                    졸업까지 <span className="text-rose-500 font-bold">{total - completed}학점</span> 남음
                </p>
            )} */}
        </div>
    )
}
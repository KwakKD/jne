import type { UnionSubjects } from "@/type/curri"
import { useEffect } from "react"
import { SubjectNameInput } from "./SubjectNameInput"
import { useUnionCurriStore } from "@/store/UnionCurriStore"
import { NAVI_SUBJECT_DATA } from "@/data/nav"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui"

interface SubjectRowProps {
    sub: UnionSubjects
    isDuplicate: boolean; // 중복 상태 추가
}

export const SubjectRow = ({ sub, isDuplicate }: SubjectRowProps) => {
    const updateSubject = useUnionCurriStore((state) => state.updateSubject)

    useEffect(() => {
        if (!sub.isCustom) {
            const standard = NAVI_SUBJECT_DATA.find(d => d.subjectName === sub.subjectName);
            if (standard) {
                // 숫지만 추출하여 min, max 결정 (예: "3 ~ 4" -> [3, 4])
                const creditNumbers = standard.credits.match(/\d+/g)?.map(Number) || [3, 3];
                const minCredit = Math.min(...creditNumbers);
                const maxCredit = Math.max(...creditNumbers);

                updateSubject(sub.id, 'subjectGroup', standard.subjectGroup);
                updateSubject(sub.id, 'subjectType', standard.subjectType);
                updateSubject(sub.id, 'min', minCredit);
                updateSubject(sub.id, 'max', maxCredit);

                // 현재 입력된 학점이 범위를 벗어나면 자동으로 조정 (선택 사항)
                if (sub.credit < minCredit) updateSubject(sub.id, 'credit', minCredit);
                if (sub.credit > maxCredit) updateSubject(sub.id, 'credit', maxCredit);
            }
        } else {
            updateSubject(sub.id, 'min', 1)
            updateSubject(sub.id, 'max', 10)
        }
    }, [sub.subjectName, sub.isCustom, updateSubject]);

    return (
        <td className={`p-3 border-r border-slate-400 align-top transition-colors ${isDuplicate ? 'bg-red-50' : ''}`}>
            {/* 상단: 교과군 / 유형 / 과목명 */}
            <div className="flex items-center gap-2 text-sm mb-3">
                {sub.isCustom ? (
                    <Select value={sub.subjectGroup} onValueChange={(val) => updateSubject(sub.id, 'subjectGroup', val)}>
                        <SelectTrigger className="h-9 text-xs bg-white border-slate-300">
                            <SelectValue placeholder="교과군" />
                        </SelectTrigger>
                        <SelectContent>
                            {["국어", "수학", "영어", "사회", "과학", "체육", "예술", "기술∙가정/정보", "제2외국어/한문", "교양"].map(group => (
                                <SelectItem key={group} value={group}>{group}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                ) : (
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded shrink-0">
                        {sub.subjectGroup || "교과군"}
                    </span>
                )}

                {sub.isCustom ? (
                    <Select value={sub.subjectType} onValueChange={(val) => updateSubject(sub.id, 'subjectType', val)}>
                        <SelectTrigger className="h-9 text-xs bg-white border-slate-300">
                            <SelectValue placeholder="유형" />
                        </SelectTrigger>
                        <SelectContent>
                            {["공통", "일반", "융합", "진로"].map(type => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                ) : (
                    <span className="text-xs font-bold px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full shrink-0">
                        {sub.subjectType || "유형"}
                    </span>
                )}

                <div className="flex-1">
                    <SubjectNameInput
                        value={sub.subjectName}
                        isCustom={sub.isCustom}
                        onChange={(val) => updateSubject(sub.id, 'subjectName', val)}
                        isDuplicate={isDuplicate}
                    />
                </div>
            </div>

            {/* 하단: 대상 학년 / 학점 / 고시외 체크 */}
            <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1">
                    <span className={`font-bold transition-colors ${!sub.grade ? 'text-red-500' : 'text-slate-400'}`}>
                        대상:
                    </span>
                    <input
                        type="number"
                        value={sub.grade || ''} // undefined/null 방지
                        onChange={(e) => updateSubject(sub.id, 'grade', e.target.value)}
                        className={`w-12 p-1 border rounded text-center font-bold outline-none transition-all
                                ${!sub.grade
                                ? 'border-red-400 bg-red-50 text-red-600'
                                : 'border-slate-300 focus:border-indigo-500 text-slate-700'
                            }`}
                        min={1}
                        max={3}
                    />
                    <span className={`transition-colors ${!sub.grade ? 'text-red-500' : 'text-slate-500'}`}>
                        학년
                    </span>
                </div>

                <div className="flex items-center gap-1">
                    <span className="text-slate-400 font-bold ml-1">학점:</span>
                    <input
                        type="number"
                        value={sub.credit || ''}
                        min={sub.min}
                        max={sub.max}
                        onChange={(e) => updateSubject(sub.id, 'credit', Number(e.target.value))}
                        className={`w-10 p-1 font-bold border rounded text-center ${(sub.credit < sub.min || sub.credit > sub.max)
                            ? "border-amber-500 text-amber-600 bg-amber-50"
                            : "border-slate-300 text-indigo-600"
                            }`}
                    />
                    {!sub.isCustom && (
                        <span className="text-[10px] text-slate-400">({sub.min}~{sub.max})</span>
                    )}
                </div>

                <label className="flex items-center gap-1 ml-auto cursor-pointer select-none">
                    <input
                        type="checkbox"
                        checked={sub.isCustom || false}
                        onChange={(e) => updateSubject(sub.id, 'isCustom', e.target.checked)}
                        className="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-[11px] text-slate-500 font-medium">기타</span>
                </label>
            </div>

            {isDuplicate && (
                <p className="text-[10px] text-red-500 mt-1 font-medium">※ 동일 학기에 이미 편성된 과목입니다.</p>
            )}
        </td>
    )
}
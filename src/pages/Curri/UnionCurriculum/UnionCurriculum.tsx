import { YEARS } from "@/data/data";
import { useAuth } from "@/hooks/useAuth";
import { useUnionCurriStore } from "@/store/UnionCurriStore";
import { AlertCircle, ChevronDown, Clock, Loader2, MapPin, MessageCircleMore, Network, Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { SubjectRow } from "./SubjectRow";
import { saveUnionData } from "@/api/saveAPI";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUnionSubInfo } from "@/api/supabaseAPI";
import { NAVI_SUBJECT_DATA } from "@/data/nav";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui";

const UnionCurriculum = () => {
    const queryClient = useQueryClient()
    const { editingSubjects, setEditingSubjects, addSubject, updateSubject, deleteSubject } = useUnionCurriStore()
    const [selectedYear, setSelectedYear] = useState(YEARS[1])
    const [isSaving, setIsSaving] = useState(false)
    const { data: userInfo, isLoading: authLoading } = useAuth()

    const yearOptions = [YEARS[1], YEARS[2]]

    const { data: dbUnionData, isLoading: dbUnionLoading } = useQuery({
        queryKey: ['union-subjects', userInfo?.id],
        queryFn: async () => {
            if (!userInfo?.id) throw new Error('사용자 ID가 없습니다.')
            return fetchUnionSubInfo(userInfo.id)
        },
        select: (rawData) => rawData.map(item => {
            // 1. 표준 데이터에서 학점 범위 계산 로직 수행
            const standard = NAVI_SUBJECT_DATA.find(d => d.subjectName === item.subject_name);

            let minCredit = 2; // 기본 최소 학점
            let maxCredit = 5; // 기본 최대 학점

            if (standard) {
                const creditNumbers = standard.credits.match(/\d+/g)?.map(Number) || [3, 3];
                minCredit = Math.min(...creditNumbers);
                maxCredit = Math.max(...creditNumbers);
            }

            return {
                id: item.id,
                year: item.year,
                subjectGroup: item.subject_group,
                subjectType: item.subject_type,
                subjectName: item.subject_name,
                grade: item.grade,
                semester: item.semester,
                start: item.start_date,
                end: item.end_date,
                time: item.operating_time || '',
                credit: item.credit,
                classroom: item.classroom,
                schoolName: item.school_name,
                location: item.location,
                mode: item.mode,
                memo: item.memo || '',
                isCustom: item.custom,
                min: minCredit,
                max: maxCredit
            }
        }),
        enabled: !!userInfo?.id,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
    })

    useEffect(() => {
        if (dbUnionData) {
            setEditingSubjects(dbUnionData)
        }
    }, [dbUnionData, setEditingSubjects])



    // const hasDuplicateError = useMemo(() => {
    //     return editingSubjects.some(sub => {
    //         if (!sub.subjectName.trim()) return false;
    //         return editingSubjects.some(target =>
    //             target.id !== sub.id &&
    //             target.year === sub.year &&
    //             target.semester === sub.semester &&
    //             target.subjectName.trim() === sub.subjectName.trim()
    //         );
    //     });
    // }, [editingSubjects]);

    const filteredSubjects = useMemo(() => {
        if (!Array.isArray(editingSubjects)) return []
        return editingSubjects.filter(sub => sub.year === selectedYear);
    }, [editingSubjects, selectedYear]);

    // 1. 중복 감지 로직 통합 및 최적화
    const duplicateIds = useMemo(() => {
        const ids = new Set<string>();
        // 현재 선택된 연도의 과목들만 필터링해서 비교
        const currentYearSubs = editingSubjects.filter(s => s.year === selectedYear);

        currentYearSubs.forEach((sub) => {
            if (!sub.subjectName.trim()) return;

            const isDuplicated = currentYearSubs.some((target) =>
                target.id !== sub.id &&
                target.semester === sub.semester &&
                target.subjectName.trim() === sub.subjectName.trim()
            );

            if (isDuplicated) ids.add(sub.id);
        });
        return ids;
    }, [editingSubjects, selectedYear]);

    const hasDateError = filteredSubjects.some(sub =>
        sub.start && sub.end && new Date(sub.start) > new Date(sub.end)
    );

    // const handleSave = async () => {
    //     if (!userInfo) return;

    //     const hasEmptyField = filteredSubjects.some(sub => {
    //         return (
    //             !sub.subjectName?.trim() ||
    //             !sub.grade ||
    //             !sub.credit ||
    //             !sub.start ||
    //             !sub.end ||
    //             !sub.classroom?.trim ||
    //             !sub.time
    //         )
    //     })

    //     if (hasEmptyField) {
    //         toast.error("입력 정보 부족", {
    //             description: "모든 항목(메모 제외)을 채워주셔야 저장이 가능합니다.",
    //         });
    //         return; // 입력되지 않은 항목이 있으면 여기서 중단
    //     }
    //     // 2. 날짜 순서 체크 (추가된 부분)
    //     const hasDateError = filteredSubjects.some(sub =>
    //         sub.start && sub.end && new Date(sub.start) > new Date(sub.end)
    //     );

    //     if (hasDateError) {
    //         toast.warning("날짜 순서 오류", {
    //             description: "시작 날짜가 종료 날짜보다 늦은 과목이 있습니다.",
    //         });
    //         return;
    //         return;
    //     }

    //     // 과목명 공백 체크
    //     if (filteredSubjects.some(s => !s.subjectName.trim())) {
    //         alert("과목명을 입력하지 않은 항목이 있습니다.");
    //         return;
    //     }

    //     // 중복 체크 (Set 크기로 바로 확인)
    //     if (duplicateIds.size > 0) {
    //         toast.error("중복 과목 감지", {
    //             description: "같은 학기에 중복된 과목이 있습니다. 확인 후 수정해 주세요.",
    //         });
    //         return;
    //     }

    //     if (!confirm("저장하시겠습니까? 리스트에서 삭제한 항목은 DB에서도 삭제됩니다.")) return;

    //     try {
    //         setIsSaving(true);
    //         // 필터링된 데이터만 보낼지, 전체를 보낼지는 saveUnionData 설계에 따라 결정
    //         await saveUnionData(userInfo, editingSubjects, selectedYear);
    //         toast.success("저장 성공", {
    //             description: "편성 결과가 안전하게 DB에 저장되었습니다.",
    //         });
    //         queryClient.invalidateQueries({ queryKey: ["union-subjects"] });
    //     } catch (error: any) {
    //         toast.error("저장 실패", {
    //             description: `오류가 발생했습니다: ${error.message}`,
    //         });
    //     } finally {
    //         setIsSaving(false);
    //     }
    // };

    const executeSave = async () => {
        if (!userInfo) return;
        try {
            setIsSaving(true);
            await saveUnionData(userInfo, editingSubjects, selectedYear);
            toast.success("저장 성공", { description: "편성 결과가 안전하게 저장되었습니다." });
            queryClient.invalidateQueries({ queryKey: ["union-subjects"] });
        } catch (error: any) {
            toast.error("저장 실패", { description: error.message });
        } finally {
            setIsSaving(false);
        }
    };

    const preCheckSave = () => {
        // 1. 필수 입력 체크
        const hasEmptyField = filteredSubjects.some(sub => !sub.subjectName?.trim() || !sub.grade || !sub.credit || !sub.start || !sub.end || !sub.classroom?.trim() || !sub.time);
        if (hasEmptyField) {
            toast.error("정보 부족", { description: "모든 항목을 입력해주세요." });
            return false;
        }

        // 2. 날짜/중복 체크
        if (hasDateError || duplicateIds.size > 0) {
            toast.warning("입력 확인", { description: "빨간색으로 표시된 오류 항목을 먼저 수정해주세요." });
            return false;
        }

        return true;
    };



    if (authLoading || dbUnionLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
                <Loader2 className="animate-spin text-blue-600" size={40} />
                <p className="text-slate-500 font-medium">정보를 불러오는 중입니다...</p>
            </div>
        )
    }

    return (
        <div className="p-4 bg-slate-50 min-h-screen font-sans">
            {/* 상단 헤더 섹션 */}
            <div className="max-w-8xl mx-auto mb-8 flex justify-between items-end">
                <div>
                    <div className="flex items-center gap-6 mb-4">
                        {/* 연도 선택 드롭다운 */}
                        <div className="relative inline-block">
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="appearance-none bg-indigo-600 text-white pl-4 pr-10 py-2 rounded-lg font-bold shadow-md focus:ring-2 focus:ring-indigo-300 outline-none cursor-pointer"
                            >
                                {yearOptions.map(year => (
                                    <option key={year} value={year} className="bg-white text-slate-800 font-medium">
                                        {year} 년
                                    </option>
                                ))}
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none" />
                        </div>
                        <span className="bg-indigo-100 text-indigo-700 text-sm font-bold px-2 py-1 rounded">오프라인 공동교육과정 편성</span>
                    </div>
                    <h1 className="text-2xl font-extrabold text-slate-600 tracking-tight flex items-center gap-3">
                        {/* 💡 아이콘 배경 박스: 진한 그린색 */}
                        <div className="p-2.5 bg-green-600 rounded-2xl text-white shadow-sm flex items-center justify-center shrink-0">
                            {/* 아이콘 색상을 흰색으로 바꾸고 크기를 살짝 조절했습니다. */}
                            <Network className="w-6 h-6" strokeWidth={2.5} />
                        </div>

                        <span>
                            <span className="text-green-700">{userInfo?.schoolname}</span> 공동교육과정 과목 편성 현황
                        </span>
                    </h1>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => addSubject(selectedYear)}
                        className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 px-4 py-2.5 rounded-lg hover:bg-slate-50 transition-all font-semibold shadow-sm"
                    >
                        <Plus size={18} /> 과목 추가
                    </button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <button
                                onClick={(e) => {
                                    // 유효성 검사 실패 시 모달이 열리지 않도록 제어
                                    if (!preCheckSave()) {
                                        e.preventDefault();
                                    }
                                }}
                                disabled={isSaving}
                                className={`flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-all font-bold shadow-md ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <Save size={18} /> {isSaving ? '저장 중...' : '편성 결과 저장'}
                            </button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>편성 결과를 저장하시겠습니까?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    현재 {selectedYear}년도에 입력된 {filteredSubjects.length}개의 과목 정보를 저장합니다.
                                    리스트에서 삭제한 항목은 DB에서도 함께 삭제됩니다.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>취소</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={executeSave}
                                    className="bg-indigo-600 hover:bg-indigo-700"
                                >
                                    저장하기
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    {/* <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className={`flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-all font-bold shadow-md ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <Save size={18} /> {isSaving ? '저장 중...' : '편성 결과 저장'}
                    </button> */}
                </div>
            </div>

            {/* 메인 테이블 카드 */}
            <div className="max-w-8xl mx-auto bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="bg-slate-900 text-slate-200 text-sm uppercase tracking-wider">
                                <th className="px-4 py-4 font-bold border-r border-slate-700 w-28">학기</th>
                                <th className="px-4 py-4 font-bold border-r border-slate-700">과목 정보</th>
                                <th className="px-4 py-4 font-bold border-r border-slate-700 w-48">일정 및 시간</th>
                                <th className="px-4 py-4 font-bold border-r border-slate-700 w-44">장소</th>
                                <th className="px-4 py-4 font-bold border-r border-slate-700 w-44">메모</th>
                                <th className="px-4 py-4 font-bold w-16 text-center">관리</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {filteredSubjects.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-24 text-center">
                                        <div className="flex flex-col items-center text-slate-400">
                                            <Plus size={48} className="mb-2 opacity-20" />
                                            <p>아직 편성된 과목이 없습니다.</p>
                                            <button onClick={() => addSubject(selectedYear)} className="text-indigo-600 font-bold mt-2 hover:underline">첫 과목 추가하기</button>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredSubjects.map((sub) => {
                                    const isInvalidDate = sub.start && sub.end && new Date(sub.start) > new Date(sub.end);
                                    return (
                                        <tr key={sub.id} className="hover:bg-indigo-50/30 transition-colors group">
                                            {/* 유형 및 학기 */}
                                            <td className="p-3 border-r border-slate-100 align-center">
                                                <select
                                                    value={sub.semester}
                                                    onChange={(e) => updateSubject(sub.id, 'semester', e.target.value as '1학기' | '여름방학' | '2학기' | '겨울방학')}
                                                    className="w-full p-2 text-sm font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded outline-none"
                                                >
                                                    <option value="1학기">1학기</option>
                                                    <option value="여름방학">여름방학</option>
                                                    <option value="2학기">2학기</option>
                                                    <option value="겨울방학">겨울방학</option>
                                                </select>
                                            </td>

                                            <SubjectRow
                                                sub={sub}
                                                isDuplicate={duplicateIds.has(sub.id)}
                                            />

                                            {/* 일정 및 시간 */}
                                            <td className="p-3 border-r border-slate-100 align-top">
                                                <div className="flex flex-col gap-2">
                                                    {/* 날짜 범위 선택 */}
                                                    <div className="flex items-center gap-1">
                                                        <input
                                                            type="date"
                                                            value={sub.start || ''}
                                                            onChange={(e) => updateSubject(sub.id, 'start', e.target.value)}
                                                            className={`w-full text-[13px] p-1 border rounded transition-all
        ${isInvalidDate ? 'border-red-500 ring-1 ring-red-500/20' : 'border-slate-400'}`}
                                                        />
                                                        <span className={isInvalidDate ? "text-red-500" : "text-slate-400"}>~</span>
                                                        <input
                                                            type="date"
                                                            value={sub.end || ''}
                                                            min={sub.start} // 브라우저 차단
                                                            onChange={(e) => updateSubject(sub.id, 'end', e.target.value)}
                                                            className={`w-full text-[13px] p-1 border rounded transition-all
        ${isInvalidDate ? 'border-red-500 ring-1 ring-red-500/20' : 'border-slate-400'}`}
                                                        />
                                                    </div>
                                                    {isInvalidDate && (
                                                        <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded-sm font-semibold w-fit">
                                                            날짜 순서가 맞지 않습니다
                                                        </span>
                                                    )}

                                                    {/* 운영 시간 입력 */}
                                                    <div className={`flex items-center gap-2 p-1.5 rounded border transition-colors
                                                        ${!sub.time?.trim()
                                                            ? 'bg-red-50 border-red-400'
                                                            : 'bg-slate-50 border-slate-400'
                                                        }`}>
                                                        <Clock size={12} className={!sub.time?.trim() ? 'text-red-500' : 'text-slate-500'} />
                                                        <input
                                                            type="text"
                                                            value={sub.time || ''}
                                                            onChange={(e) => updateSubject(sub.id, 'time', e.target.value)}
                                                            placeholder="운영 시간 (ex: 토 09:00)"
                                                            className="w-full bg-transparent text-xs outline-none"
                                                        />
                                                    </div>
                                                </div>
                                            </td>

                                            {/* 장소 및 학교 */}
                                            <td className="p-3 border-r border-slate-100 align-top">
                                                <div className="flex flex-col gap-3">
                                                    <span className="w-full px-2 py-1 text-sm text-slate-700 border border-slate-400 rounded outline-none focus:ring-1 focus:ring-indigo-500">
                                                        (거점) {userInfo?.schoolname}
                                                    </span>
                                                    <div className="flex items-center gap-2">
                                                        <MapPin size={12} className="text-slate-400" />
                                                        <input
                                                            type="text"
                                                            value={sub.classroom || ''} // null 방지
                                                            onChange={(e) => updateSubject(sub.id, 'classroom', e.target.value)}
                                                            placeholder="수업 장소"
                                                            className={`w-full text-sm outline-none border-b transition-colors
                                                                ${!sub.classroom?.trim()
                                                                    ? 'border-red-400 focus:border-red-600' // 비어있을 때 (경고)
                                                                    : 'border-transparent hover:border-slate-600 focus:border-indigo-700' // 입력되었을 때
                                                                }`}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-3 border-r border-slate-100 align-top">
                                                <div className="flex gap-2">
                                                    <MessageCircleMore size={16} className="text-slate-400 mt-1 shrink-0" />
                                                    <textarea
                                                        value={sub.memo || ''}
                                                        onChange={(e) => updateSubject(sub.id, 'memo', e.target.value)}
                                                        placeholder="참고사항 (간단히)"
                                                        className="w-full text-sm p-1 h-16 border border-transparent hover:border-slate-400 focus:border-indigo-700 rounded resize-none outline-none bg-transparent"
                                                    />
                                                </div>
                                            </td>

                                            {/* 삭제 */}
                                            <td className="p-3 text-center align-middle">
                                                <button
                                                    onClick={() => deleteSubject(sub.id)}
                                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* 하단 요약 바 */}
                <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-between items-center text-sm text-slate-600 font-medium">
                    <div className="flex gap-4">
                        {/* 변경: 전체 개수가 아닌 필터링된 개수를 보여주는 것이 더 직관적일 수 있음 */}
                        <span>{selectedYear}년 과목 수: <b className="text-indigo-600">{filteredSubjects.length}</b></span>
                        <span>합계 학점: <b className="text-indigo-600">{filteredSubjects.reduce((acc, cur) => acc + (cur.credit || 0), 0)}</b></span>
                    </div>
                    <div className="flex items-center gap-2 italic text-slate-400 text-xs">
                        <AlertCircle size={14} />
                        본교({userInfo?.schoolname}) 거점 오프라인 과목만 입력해 주세요.
                    </div>
                </div>
            </div>
        </div>
    );
}

export { UnionCurriculum }
import { SUBJECT_LABEL, GET_SUBJECT_GROUP } from "@/data/Curri/teacher"
import { type SubjectCode } from "@/data/Curri/teacher"
import { Input, Card, Button, CardHeader, CardTitle, CardContent, Separator } from "@/components/ui"
import { Save, School, Users, Info, Loader2 } from "lucide-react"
import { useTeacherStore } from "@/store/TeacherStore"
import { useSchoolInfoStore } from "@/store/SchoolInfo"
import { useAuth } from "@/hooks/useAuth"
import { useQuery } from "@tanstack/react-query"
import { fetchSchoolInfo, fetchTeacherInfo } from "@/api/supabaseAPI"
import { useEffect, useState } from "react"
import type { subT } from "@/type/curri"
import { toast } from "sonner"
import { saveSchoolInfo, saveTeacherInfo } from "@/api/saveAPI"

function TeacherCount() {
    const { data: user, isLoading: authLoading } = useAuth()

    const { teacher, updateTeacherValue, resetTeacher, getSummary } = useTeacherStore()
    const { schoolinfo, setSchoolInfo } = useSchoolInfoStore()
    const { totalAll, totalOut, grandTotal } = getSummary()
    const [isSaving, setIsSaving] = useState(false)

    const { data: dbSchoolData, isLoading: dbschoolLoading } = useQuery({
        queryKey: ['schoolInfo', user?.id],
        queryFn: async () => {
            if (!user?.id) throw new Error("사용자 ID가 없습니다.");
            return fetchSchoolInfo(user.id);
        },
        enabled: !!user?.id,
    })

    const { data: dbTeacherData, isLoading: dbteacherLoading } = useQuery({
        queryKey: ['teacherInfo', user?.id],
        queryFn: async () => {
            if (!user?.id) throw new Error("사용자 ID가 없습니다.");
            return fetchTeacherInfo(user.id);
        },
        enabled: !!user?.id,
    })

    useEffect(() => {
        if (dbSchoolData) {
            setSchoolInfo('grade_1', dbSchoolData.grade_1)
            setSchoolInfo('grade_2', dbSchoolData.grade_2)
            setSchoolInfo('grade_3', dbSchoolData.grade_3)
        }

        if (dbTeacherData) {
            resetTeacher(dbTeacherData as Record<SubjectCode, subT>)
        }
    }, [dbSchoolData, setSchoolInfo, dbTeacherData, resetTeacher])

    if (authLoading || dbschoolLoading || dbteacherLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
                <Loader2 className="animate-spin text-blue-600" size={40} />
                <p className="text-slate-500 font-medium">학교 정보를 불러오는 중입니다...</p>
            </div>
        )
    }
    // 학급 수 총합 계산
    const totalClasses = schoolinfo.grade_1 + schoolinfo.grade_2 + schoolinfo.grade_3

    const handleSave = async () => {
        if (!user?.id) {
            toast.error("사용자 정보를 찾을 수 없습니다.");
            return;
        }

        setIsSaving(true);

        try {
            // 💡 두 개의 API 호출을 동시에 실행하고 모두 완료될 때까지 기다립니다.
            await Promise.all([
                saveSchoolInfo(user, schoolinfo),
                saveTeacherInfo(user, teacher)
            ]);

            toast.success("학교 정보와 교사 현황이 모두 저장되었습니다! 🎉");
        } catch (error: any) {
            console.error("저장 중 오류 발생:", error);

            // 에러 메시지를 구체적으로 보여주면 디버깅이 편합니다.
            const errorMessage = error.message || "알 수 없는 오류가 발생했습니다.";
            toast.error(`저장 실패: ${errorMessage}`);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto pb-20 space-y-2">
            {/* 1. 상단 헤더 & 저장 버튼 */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                        교사 정원 및 학급수 입력
                    </h2>
                    <p className="text-slate-500 text-sm font-medium mt-1">교육과정 편성의 근거가 되는 학교 기본 정보를 입력합니다.</p>
                    <div className="p-4 bg-amber-50 rounded-2xl flex gap-3 border border-amber-100 mt-2">
                        <Info size={18} className="text-amber-600 shrink-0 mt-0.5" />
                        <p className="text-[12px] text-amber-800 leading-relaxed font-medium">
                            학급 수와 과목별 정원은 교과별 수업 시수 계산의 기준이 되므로 정확하게 입력해 주세요.
                        </p>
                    </div>
                </div>
                <Button
                    className="bg-[#005eb8] hover:bg-[#004a91] h-12 px-8 rounded-2xl font-bold shadow-xl shadow-blue-100 transition-all hover:-translate-y-1"
                    disabled={isSaving}
                    onClick={handleSave}
                >
                    <Save className="mr-2" size={18} />
                    {isSaving ? "저장 중..." : "모든 설정 저장하기"}
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* 2. 좌측: 학년별 학급 수 입력 (4컬럼 차지) */}
                <div className="lg:col-span-4 space-y-6 sticky top-6">
                    <Card className="rounded-[2.5rem] border-slate-200 shadow-sm overflow-hidden pt-0">
                        <CardHeader className="bg-slate-400/50 border-b border-slate-100 p-6 ">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-xl shadow-sm text-blue-600">
                                    <School size={20} />
                                </div>
                                <CardTitle className="text-xl font-bold">학년별 학급 수</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="px-8 py-4 space-y-4">
                            {([1, 2, 3] as const).map((grade) => {
                                const key = `grade_${grade}` as const;
                                return (
                                    <div key={grade} className="flex items-center justify-between group">
                                        <label className="text-base font-bold text-slate-700">{grade}학년</label>
                                        <div className="flex items-center gap-4">
                                            <Input
                                                type="number"
                                                value={schoolinfo[key]}
                                                onChange={(e) => {
                                                    const value = Number(e.target.value)
                                                    if (value < 0) return
                                                    setSchoolInfo(key, Number(e.target.value))
                                                }
                                                }
                                                className="w-28 h-12 text-center text-lg font-black rounded-xl border-slate-400 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
                                            />
                                            <span className="text-sm text-slate-500 font-bold w-8">학급</span>
                                        </div>
                                    </div>
                                )
                            })}

                            <div className="pt-2 border-t border-dashed border-slate-200 flex justify-between items-center">
                                <span className="text-sm font-bold text-slate-600">총 학급 수</span>
                                <span className="text-2xl font-black text-[#005eb8]">{totalClasses} <small className="text-sm">Class</small></span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 간이 통계 카드 */}
                    <div className="bg-slate-800 rounded-[2rem] p-8 text-white shadow-2xl">
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Current Summary</p>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-300">정원내</span>
                                <span className="font-bold">{totalAll}명</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-300">정원외</span>
                                <span className="font-bold">{totalOut}명</span>
                            </div>
                            <Separator className="bg-slate-700 my-2" />
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-bold text-blue-400">전체 정원</span>
                                <span className="text-xl font-black text-blue-400">{grandTotal}명</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 우측: 과목별 교사 수 입력 (8컬럼 차지) */}
                <div className="lg:col-span-8">
                    <Card className="rounded-[2.5rem] border-slate-200 shadow-sm bg-white overflow-hidden flex flex-col h-[calc(100vh-200px)] pt-0">
                        {/* 💡 Card에 높이를 주고 flex-col을 설정하여 내부 테이블만 스크롤되게 만듭니다. */}

                        <div className="p-5 bg-slate-400/50 border-b border-slate-100 flex items-center gap-3 shrink-0">
                            <div className="p-2 bg-white rounded-xl shadow-sm text-indigo-600">
                                <Users size={20} />
                            </div>
                            <h3 className="text-xl font-bold">교과별 교사 정원</h3>
                        </div>

                        {/* 💡 스크롤이 발생하는 영역 */}
                        <div className="overflow-y-auto overflow-x-hidden relative flex-1 custom-scrollbar">
                            <table className="w-full text-left border-collapse">
                                {/* 💡 sticky top-0 설정: 테이블 헤더 고정 */}
                                <thead className="sticky top-0 z-10 bg-slate-50/95 backdrop-blur-sm shadow-sm">
                                    <tr>
                                        <th className="px-8 py-2 text-sm font-bold text-slate-600 uppercase tracking-wider">교과군 및 과목</th>
                                        <th className="px-8 py-2 text-sm font-bold text-slate-600 uppercase tracking-wider text-center w-32 border-l border-slate-100">정원내</th>
                                        <th className="px-8 py-2 text-sm font-bold text-slate-600 uppercase tracking-wider text-center w-32 border-l border-slate-100">정원외</th>
                                        <th className="px-8 py-2 text-sm font-bold text-slate-600 uppercase tracking-wider text-center w-24 border-l border-slate-100">계</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-50">
                                    {(Object.keys(SUBJECT_LABEL) as SubjectCode[]).map((code) => {
                                        const group = GET_SUBJECT_GROUP(code)
                                        const label = SUBJECT_LABEL[code]
                                        const data = teacher[code]

                                        return (
                                            <tr key={code} className="hover:bg-blue-50/20 transition-colors group">
                                                <td className="px-10 py-2">
                                                    <div className="flex gap-2">
                                                        <span className="text-[11px] font-bold text-blue-500 mb-0.5">{group}</span>
                                                        <span className="text-[16px] font-bold text-slate-800">{label}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-2 border-l border-slate-50/50">
                                                    <Input
                                                        type="number"
                                                        value={data.all}
                                                        onChange={(e) => {
                                                            const value = Number(e.target.value)
                                                            if (value < 0) return
                                                            updateTeacherValue(code, 'all', Number(e.target.value))
                                                        }
                                                        }
                                                        className="text-right font-black border-transparent bg-transparent hover:bg-white focus:bg-white h-10 rounded-lg transition-all"
                                                    />
                                                </td>
                                                <td className="px-8 py-2 border-l border-slate-50/50">
                                                    <Input
                                                        type="number"
                                                        value={data.outQuota}
                                                        onChange={(e) => {
                                                            const value = Number(e.target.value)
                                                            if (value < 0) return
                                                            updateTeacherValue(code, 'outQuota', Number(e.target.value))
                                                        }
                                                        }
                                                        className="text-right font-black border-transparent bg-transparent hover:bg-white focus:bg-white h-10 rounded-lg transition-all"
                                                    />
                                                </td>
                                                <td className="px-8 py-2 text-right font-bold text-slate-400 border-l border-slate-50/50 bg-slate-50/30">
                                                    <span className={data.all + data.outQuota > 0 ? "text-blue-700 font-black" : ""}>
                                                        {data.all + data.outQuota}
                                                    </span>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export { TeacherCount }
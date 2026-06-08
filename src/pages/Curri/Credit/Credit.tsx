import { fetchSchoolData, fetchSchoolDataSta, fetchSchoolInfo, fetchTeacherInfo } from "@/api/supabaseAPI";
import { Alert, AlertDescription, AlertTitle, Badge, Button, Card, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui"
import { useAuth } from "@/hooks/useAuth";
import { useSchoolInfoStore } from "@/store/SchoolInfo";
import { useStaClassStore } from "@/store/StaClassStore";
import { useStaSubjectStore } from "@/store/StaSubjectStore";
import { useTeacherStore } from "@/store/TeacherStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, FileSpreadsheet, Info, LayoutDashboard, ListChecks, Loader2, Save } from "lucide-react"
import { useEffect } from "react";
import { CreditCurriTable } from "./CreditCurriTable";
import { useCurriTableStore } from "@/store/CurriSubjectStore";
import type { SchoolJsonDataType } from "@/type/curri";
import { CreditSemTable } from "./CreditSemTable";
import { CreditSubModal } from "./CreditSubModal";
import { CreditChart } from "./CreditChart";
import { creditExcel } from "@/utils/Curri/CreditExcel";
import { saveCreditData } from "@/api/saveAPI";
import { toast } from "sonner";
import { YEARS } from "@/data/data";

const Credit = () => {
    const setSchoolInfo = useSchoolInfoStore((state) => state.setSchoolInfo)
    const resetTeacher = useTeacherStore((state) => state.resetTeacher)
    const setClassinfo = useStaClassStore((state) => state.setClassinfo)
    const setUserSubjects = useStaSubjectStore((state) => state.setUserSubjects)
    const userSubjects = useStaSubjectStore((state) => state.userSubjects);
    const setStaUserData = useCurriTableStore((state) => state.setStaUserData)
    const queryClient = useQueryClient();
    const { data: userInfo, isLoading: authLoading } = useAuth()

    const { data: Data, isLoading, isError, error } = useQuery({
        queryKey: ['curriculum', userInfo?.id],
        queryFn: async () => {
            if (!userInfo?.id) {
                throw new Error('사용자 ID가 없습니다.');
            }
            const [schoolInfo, teacherInfo, schoolDataSta, schoolData] = await Promise.all([
                fetchSchoolInfo(userInfo.id),
                fetchTeacherInfo(userInfo.id),
                fetchSchoolDataSta(userInfo.id),
                fetchSchoolData(userInfo.id)
            ]);

            return {
                schoolInfo,
                teacherInfo,
                schoolDataSta,
                schoolData
            }
        },
        enabled: !!userInfo?.id, // userId가 있을 때만 쿼리 실행
        staleTime: 1000 * 60 * 30, // 5분 유지
    })

    const { mutate: handleSave, isPending: isSaving } = useMutation({
        mutationFn: () => saveCreditData(userInfo!, userSubjects),
        onSuccess: () => {
            // 저장 성공 시 데이터 새로고침
            queryClient.invalidateQueries({ queryKey: ['curriculum', userInfo?.id] });
            toast.success("모든 데이터가 성공적으로 저장되었습니다.");
        },
        onError: (err) => {
            toast.error(`저장 중 오류가 발생했습니다: ${err.message}`);
        }
    });

    useEffect(() => {
        if (Data) {
            if (Data.schoolInfo) {
                setSchoolInfo('grade_1', Data.schoolInfo.grade_1)
                setSchoolInfo('grade_2', Data.schoolInfo.grade_2)
                setSchoolInfo('grade_3', Data.schoolInfo.grade_3)
            }

            if (Data.teacherInfo) {
                resetTeacher(Data.teacherInfo)
            }

            if (Data.schoolDataSta && Data.schoolDataSta.length > 0) {
                setUserSubjects(Data.schoolDataSta)
                setClassinfo(Data.schoolDataSta)
            }

            if (Data.schoolData) {
                Data.schoolData.forEach(item => {
                    const inData: SchoolJsonDataType = {
                        '학교지정': item.fix,
                        "선택과목": item.choice,
                        "Group": item.groupdata,
                        "AddSubject": item.addsubjects,
                        "CEA": item.CEA
                    }
                    setStaUserData(String(item.year), inData)
                })
            }
        }
    }, [Data, setSchoolInfo, resetTeacher, setUserSubjects, setClassinfo, setStaUserData])

    if (authLoading || isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
                <Loader2 className="animate-spin text-blue-600" size={40} />
                <p className="text-slate-500 font-medium">정보를 불러오는 중입니다...</p>
            </div>
        )
    }

    // 에러 상태 처리
    if (isError) {
        return (
            <Alert variant="destructive" className="max-w-md mx-auto mt-10">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>오류 발생</AlertTitle>
                <AlertDescription>{(error as Error).message}</AlertDescription>
            </Alert>
        )
    }


    return (
        <div className="flex flex-col min-h-screen bg-slate-50/50 font-sans">
            <header className="sticky top-0 z-20 w-full bg-white border-b border-slate-200 px-6 py-4">
                <div className="max-w-600 mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-indigo-600 rounded-lg text-white">
                            <LayoutDashboard size={24} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900 tracking-tight">{YEARS[2]} 년 과목별 시수 현황</h1>
                            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                <Info size={12} /> 내년에 개설되는 수업 총 시수 및 편성을 할 수 있습니다.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                        {/* 과목별 상세 현황 Dialog 분리 */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="gap-2 border-rose-200 hover:bg-rose-50 text-rose-700">
                                    <ListChecks size={16} />
                                    과목별 상세 현황
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl! max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle>과목별 상세 현황 분석</DialogTitle>
                                </DialogHeader>
                                <div className="py-4">
                                    <CreditSubModal />
                                </div>
                            </DialogContent>
                        </Dialog>

                        <Button variant="outline" className="gap-2" onClick={creditExcel}>
                            <FileSpreadsheet size={16} />
                            엑셀 출력
                        </Button>
                        <Button
                            className="flex-1 md:flex-none gap-2 bg-indigo-600 hover:bg-indigo-700"
                            onClick={() => handleSave()}
                            disabled={isSaving} // 저장 중일 때 버튼 비활성화
                        >
                            {isSaving ? (
                                <Loader2 className="animate-spin" size={16} />
                            ) : (
                                <Save size={16} />
                            )}
                            {isSaving ? "저장 중..." : "저장하기"}
                        </Button>
                    </div>
                </div>
            </header>

            <main className="p-2 max-w-600 mx-auto w-full flex-1 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh-120px)]">

                    {/* [좌측 7컬럼] 메인 입력 영역: 가로 폭 확보 */}
                    <Card className="lg:col-span-6 shadow-sm border-slate-200 flex flex-col">
                        <div className="px-4 py-3 border-b border-slate-100 bg-white flex justify-between items-center">
                            <h2 className="font-bold text-slate-700 flex items-center gap-2">
                                <div className="w-1 h-4 bg-indigo-500 rounded-full" />
                                전학년 교육과정 편성 및 학급 입력
                            </h2>
                        </div>
                        <div className="flex-1 overflow-auto p-2">
                            <CreditCurriTable />
                        </div>
                    </Card>

                    <div className="lg:col-span-6 h-full overflow-y-auto pr-1">
                        <Card className="shadow-sm border-slate-200 flex flex-col h-auto mb-4">
                            {/* 헤더 섹션: sticky가 작동하려면 부모가 overflow-y-auto여야 합니다 */}
                            <div className="px-4 pt-3 pb-3 border-b border-slate-100 bg-white flex items-center justify-between sticky top-0 z-10 rounded-t-xl">
                                <h2 className="font-bold text-slate-700 flex items-center gap-2">
                                    <div className="w-1 h-4 bg-emerald-500 rounded-full" />
                                    교과별 시수 분포 현황
                                </h2>
                                <Badge variant="outline" className="text-slate-500 font-normal">
                                    단위: 학점(시수)
                                </Badge>
                            </div>

                            {/* 테이블 영역: 내용이 많아지면 그대로 아래로 길어짐 */}
                            <div className="p-2 bg-white">
                                <CreditSemTable />
                            </div>


                            {/* 차트 영역 */}
                            <div className="p-4 bg-white flex flex-col gap-4">
                                <div className="w-full h-87 bg-white rounded-xl border border-slate-100 shadow-inner p-4">
                                    <CreditChart />
                                </div>

                                <p className="text-[11px] text-slate-400 text-center italic mb-4">
                                    ※ 왼쪽은 전체 이수 학점, 오른쪽은 선택한 교과의 학기별 분포를 나타냅니다.
                                </p>
                            </div>
                        </Card>
                    </div>

                </div>
            </main>
        </div>
    )
}

export { Credit }
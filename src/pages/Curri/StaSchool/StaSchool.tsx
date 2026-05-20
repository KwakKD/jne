import { AlertCircle, Info, Loader2, School } from "lucide-react"
import { useMemo, useState } from "react"
import { StaSchoolFilter } from "./StaSchoolFilter"
import StaSchoolListTable from "./StaSchoolListTable"
import { useQuery } from "@tanstack/react-query"
import { fetchAllSchoolInfo, fetchSchoolCurriculum } from "@/api/supabaseAPI"
import type { SchoolClassDataProps } from "@/type/curri"
import { Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui"
import { StaModalTable } from "../StaSubject/StaModalTable"
import SchoolStaArea from "./StaSchoolArea"

const StaSchool = () => {
    const [filters, setFilters] = useState({
        minClass: 1,
        maxClass: 30,
        regions: [] as string[]
    })
    const [modalConfig, setModalConfig] = useState({
        school: '',
        year: '',
        modalOpen: false
    })

    const { data: schoolClassData, isLoading, isError, error } = useQuery<SchoolClassDataProps[]>({
        queryKey: ['schoolInfo'], // 캐시 키
        queryFn: fetchAllSchoolInfo,
        staleTime: 1000 * 60 * 5, // 5분 동안은 데이터를 '신선'하다고 판단 (서버 요청 최소화)
    });

    const { data: curriCulumData, isLoading: isCurriculumLoading } = useQuery({
        queryKey: ['schoolCurriculum', modalConfig.school, modalConfig.year],
        queryFn: () => fetchSchoolCurriculum(modalConfig.school, modalConfig.year),
        enabled: !!modalConfig.school && modalConfig.modalOpen,
        staleTime: 1000 * 60 * 5
    })

    const { tabledata, schoolLists } = useMemo(() => {
        if (!schoolClassData) {
            return { tabledata: [], schoolLists: [] };
        }

        const filtered = schoolClassData.filter(item => {
            // regions 배열이 비어있으면 '전체 선택'으로 간주, 값이 있으면 해당 지역 포함 여부 검사
            const matchRegion = filters.regions.length === 0 || filters.regions.includes(item.location);
            // 학급 수 범위 필터링
            const matchClass = item.allClass >= filters.minClass && item.allClass <= filters.maxClass;

            return matchRegion && matchClass;
        });

        const names = filtered.map(item => item.schoolname);

        return { tabledata: filtered, schoolLists: names };
    }, [schoolClassData, filters])

    // 모달 활성화 핸들러
    const openModal = (school: string, year: string) => {
        setModalConfig({
            school: school,
            year: year,
            modalOpen: true
        })
    }

    // 모달 수동 해제 핸들러
    const closeModal = () => {
        setModalConfig(prev => ({
            ...prev,
            modalOpen: false
        }))
    }

    return (
        <div className="flex flex-col min-h-screen bg-slate-50/50 font-sans">
            {/* 1. 상단 타이틀 타이포그래피 영역 */}
            <div className="p-2 pb-2 border-b border-slate-300 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 shadow-sm border border-emerald-100">
                        <School size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                            학교별 편성 통계
                            <span className="text-slate-400 font-medium ml-2 text-lg">교육과정 다각도 분석</span>
                        </h1>
                        <p className="text-slate-500 text-xs mt-1 font-medium">
                            전라남도 내 고등학교의 지역별, 규모별 교과목 개설 및 편성 현황을 비교·분석합니다.
                        </p>
                    </div>
                </div>
                <StaSchoolFilter onFilterChange={(newFilters) => setFilters(newFilters)} />
            </div>
            <div className="p-0 flex-1 min-h-0">
                {isLoading ? (
                    // 데이터 로딩 상태 스켈레톤 대체 뷰
                    <div className="h-96 w-full flex flex-col items-center justify-center gap-3 bg-white rounded-2xl border border-slate-200">
                        <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
                        <p className="text-xs font-bold text-slate-400">전남 고등학교 정보를 불러오는 중입니다...</p>
                    </div>
                ) : isError ? (
                    // 에러 발생 핸들링 내장 뷰
                    <div className="h-96 w-full flex flex-col items-center justify-center gap-3 bg-white rounded-2xl border border-rose-100 p-6 text-center">
                        <AlertCircle className="h-8 w-8 text-rose-500" />
                        <h4 className="text-sm font-bold text-slate-800">데이터 로드에 실패했습니다</h4>
                        <p className="text-xs text-slate-400 max-w-sm">{(error as Error)?.message || "네트워크 연결 상태를 확인해 주세요."}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-12 gap-1 h-full items-start">
                        {/* 왼쪽 레이아웃 테이블 리스트 */}
                        <div className="col-span-12 lg:col-span-5 h-170 overflow-hidden flex flex-col">
                            <StaSchoolListTable data={tabledata} onOpenDatail={openModal} />
                        </div>

                        {/* 오른쪽 영역 (향후 선별된 학교 메인 상세 차트나 대시보드가 안착할 컴포넌트 존) */}
                        <div className="col-span-12 lg:col-span-7 bg-white h-180 rounded-2xl border border-slate-200 shadow-sm p-1 flex items-center justify-center border-dashed">
                            <SchoolStaArea
                                schoolLists={schoolLists}
                                schoolInfo={schoolClassData ?? []}
                            />
                        </div>
                    </div>
                )}
            </div>
            <Dialog
                open={modalConfig.modalOpen}
                onOpenChange={(open) => setModalConfig(prev => ({ ...prev, modalOpen: open }))}
            >
                <DialogContent className="max-w-5xl! h-[90vh] w-full flex flex-col p-0 gap-0 overflow-hidden border-none shadow-2xl">
                    {/* 팝업 헤더 영역 */}
                    <DialogHeader className="p-6 bg-slate-50 border-b border-slate-200">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white rounded-2xl text-indigo-600 shadow-sm border border-slate-200">
                                <School size={24} />
                            </div>
                            <div className="space-y-1">
                                <DialogTitle className="text-xl font-black text-slate-900 tracking-tight">
                                    {modalConfig.school} <span className="text-indigo-600">편성표</span>
                                </DialogTitle>
                                <DialogDescription className="text-sm text-slate-500 font-medium">
                                    {modalConfig.year}학년도 신입생 교육과정 편성표 (입력 데이터 기반)
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    {/* 팝업 본문 영역 (스크롤 가능) */}
                    <div className="flex-1 overflow-y-auto p-8 bg-white custom-scrollbar">
                        {modalConfig.school ? (
                            <div className="space-y-6">
                                {/* 안내 문구 */}
                                <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl border border-amber-100 text-amber-800">
                                    <Info size={16} />
                                    <p className="text-[11px] font-semibold tracking-tight">
                                        해당 데이터는 학교에서 입력한 정보를 바탕으로 제공되며, 실제 공식 편성표와 차이가 있을 수 있습니다.
                                    </p>
                                </div>

                                {/* [여기에 실제 편성표 테이블 컴포넌트가 들어갈 자리입니다] */}
                                <div className="min-h-100 border-2 border-dashed border-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                                    {isCurriculumLoading ? (
                                        <p className="text-sm">편성표 데이터를 불러오는 중...</p>
                                    ) :
                                        <StaModalTable data={curriCulumData ?? []} />
                                    }
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center">
                                <p className="text-slate-400">학교 정보를 불러올 수 없습니다.</p>
                            </div>
                        )}
                    </div>

                    {/* 팝업 하단 푸터 (필요 시) */}
                    <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                        <Button variant="outline" onClick={closeModal} className="rounded-xl px-6 font-bold text-slate-600">
                            닫기
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export { StaSchool }
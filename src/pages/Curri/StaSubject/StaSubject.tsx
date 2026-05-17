import { useStaSubjectPageStore } from "@/store/StaSubjectPage"
import { AsideSubjectList } from "./AsideSubjecList"
import { BookOpen, Filter, Hash, Info, Loader2, School, X } from "lucide-react"
import { SUBJECT } from "@/data/Curri/subject"
import { Badge, Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui"
import { useQuery } from "@tanstack/react-query"
import { fetchSubjectStats, type SubjectStat } from "@/api/supabaseAPI"
import { useMemo, useState } from "react"
import SubTable from "./StaSubTable"
import SubGradeChart from "./StaGradeChart"
import SubCreditChart from "./StaCreditChart"
import SubTypeChart from "./StaTypeChart"

type FilterType = {
    column: 'sub_credit' | 'sub_type' | 'sub_grade_sem';
    value: string | number;
} | null;

const StaSubject = () => {
    const selectedSubject = useStaSubjectPageStore((state) => state.selectedSubject)
    const [activeFilter, setActiveFilter] = useState<FilterType>(null);
    const [selectedSchool, setSelectedSchool] = useState<SubjectStat | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const subjectInfo = SUBJECT.find(s => s.과목명 === selectedSubject);

    const { data: stats, isLoading } = useQuery<SubjectStat[] | null>({
        queryKey: ['subjectStats', selectedSubject], // selectedSubject가 바뀔 때마다 다시 실행
        queryFn: () => fetchSubjectStats(selectedSubject),
        enabled: !!selectedSubject, // 과목이 선택되었을 때만 API 호출 실행
        staleTime: 1000 * 60 * 5 // 5분간 데이터를 신선하게 유지 (캐시 활용)
    })
    // 차트 클릭이벤트
    const handleFilterChange = (column: 'sub_credit' | 'sub_type' | 'sub_grade_sem', value: string | number) => {

        setActiveFilter(prev => {
            // 이미 선택된 필터를 다시 누르면 해제(null), 아니면 새로 적용
            if (prev?.column === column && prev?.value === value) {
                return null;
            }
            return { column, value };
        });
    }

    const openModal = (school: SubjectStat) => {
        setSelectedSchool(school);
        setIsModalOpen(true);
    };
    // 차트 클릭시 필터링 되는 데이터
    const filteredData = useMemo(() => {
        if (!stats) return []
        if (!activeFilter) return stats

        return stats.filter((item) => {
            const { column, value } = activeFilter;

            if (column === 'sub_credit') {
                return item.sub_credit === Number(String(value).replace(/[^0-9]/g, ''));
            }

            if (column === 'sub_type') {
                return item.sub_type === value;
            }

            if (column === 'sub_grade_sem') {
                // "2학년 1학기" 등으로 들어오는 차트 데이터와 매칭
                const itemLabel = `${item.sub_grade}학년 ${item.sub_sem}학기`;
                // const itemLabel = `${item.sub_grade}학년 ${item.sub_sem}학기`;
                return itemLabel === value;
            }
            return true
        })
    }, [stats, activeFilter])

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
                <Loader2 className="animate-spin text-blue-600" size={40} />
                <p className="text-slate-500 font-medium">학교 정보를 불러오는 중입니다...</p>
            </div>
        )
    }
    return (
        // flex-row로 변경하여 aside와 main을 가로로 배치합니다.
        <div className="flex h-screen bg-slate-50/50 font-sans overflow-hidden">

            {/* [좌측] 과목 리스트 피드 */}
            <aside className="w-72 h-full border-r bg-white flex flex-col shrink-0">
                <AsideSubjectList />
            </aside>

            {/* [우측] 메인 대시보드 */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">

                {/* 헤더 영역 */}
                <header className="p-6 bg-white border-b shrink-0">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600 shadow-sm">
                                <BookOpen size={24} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    {selectedSubject && (
                                        <>
                                            <Badge variant="secondary" className="text-[10px] font-bold bg-slate-100 text-slate-500 border-none">
                                                {subjectInfo?.교과군 || "일반"}
                                            </Badge>
                                            <Badge className="text-[10px] font-bold bg-indigo-600 shadow-none">
                                                {subjectInfo?.유형 || "일반선택"}
                                            </Badge>
                                        </>
                                    )}
                                </div>
                                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                                    {selectedSubject || "과목 분석"}
                                    <span className="text-slate-400 font-medium ml-2 text-lg">통계 대시보드</span>
                                </h1>
                            </div>
                        </div>

                        {/* 우측 퀵 통계 (과목 선택 시에만 노출) */}
                        {selectedSubject && (
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col items-end border-r pr-4 border-slate-200">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">편성 학교 수</p>
                                    <div className="flex items-center gap-1.5">
                                        <School size={16} className="text-indigo-500" />
                                        <span className="text-xl font-black text-slate-800">90</span>
                                        <span className="text-xs font-medium text-slate-500">개교</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">평균 이수 학점</p>
                                    <div className="flex items-center gap-1.5">
                                        <Hash size={16} className="text-emerald-500" />
                                        <span className="text-xl font-black text-slate-800">4.2</span>
                                        <span className="text-xs font-medium text-slate-500">학점</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                {/* 메인 컨텐츠 스크롤 영역 */}
                <div className="flex-1 overflow-y-auto p-2">
                    {!selectedSubject ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400 border-2 border-dashed rounded-3xl bg-white/50">
                            <div className="p-4 bg-white rounded-full shadow-sm mb-4">
                                <Info size={32} className="text-slate-300" />
                            </div>
                            <p className="font-medium">왼쪽 리스트에서 분석할 과목을 선택해 주세요.</p>
                            <p className="text-xs text-slate-400 mt-1">과목별 편성 시기, 학점 비중, 학교별 상세 정보를 확인할 수 있습니다.</p>
                        </div>
                    ) : (
                        <div className="max-w-7xl mx-auto space-y-6">
                            {/* 대시보드 메인 본문 그리드 (전체 높이를 고정하여 내부 스크롤 유도) */}
                            <div className="grid grid-cols-12 gap-5 h-[calc(100vh-180px)] min-h-180">

                                {/* [왼쪽] 차트 분석 영역 (col-span-5) */}
                                {/* h-full과 overflow-y-auto를 주어 차트가 많아져도 이 박스 안에서만 스크롤됩니다. */}
                                <div className="col-span-12 lg:col-span-5 bg-white h-full rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col overflow-hidden">
                                    <div className="flex-1 overflow-y-auto pr-1 space-y-6 custom-scrollbar">

                                        {/* 학년/학기 차트 */}
                                        <div className="pb-0 border-b border-slate-100">
                                            <SubGradeChart data={stats ?? []} onBarClick={(val) => handleFilterChange('sub_grade_sem', val)} />
                                        </div>

                                        {/* 학점 기준 차트 */}
                                        <div className="pb-0 border-b border-slate-100">
                                            <SubCreditChart data={stats ?? []} onSliceClick={(val) => handleFilterChange('sub_credit', val)} />
                                        </div>

                                        {/* 이수 유형 차트 */}
                                        <div>
                                            <SubTypeChart data={stats ?? []} onSliceClick={(val) => handleFilterChange('sub_type', val)} />
                                        </div>

                                    </div>
                                </div>

                                {/* [오른쪽] 데이터 테이블 영역 (col-span-7) */}
                                {/* 스크롤 없이 페이지네이션으로만 제어하므로 overflow-hidden 처리 */}
                                <div className="col-span-12 lg:col-span-7 bg-white h-full rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                                    <div className="flex-1 flex flex-col min-h-0">
                                        {activeFilter && (
                                            <div className="flex items-center justify-between px-6 py-3 bg-indigo-50/50 border-b border-indigo-100/60 animate-in fade-in slide-in-from-top-2 duration-200">
                                                <div className="flex items-center gap-2">
                                                    <div className="p-1.5 bg-indigo-100 rounded-lg text-indigo-700">
                                                        <Filter size={13} />
                                                    </div>
                                                    <div className="flex items-center gap-1.5 flex-wrap">
                                                        <span className="text-xs font-medium text-slate-600">적용된 조건:</span>
                                                        <Badge
                                                            variant="secondary"
                                                            className="bg-indigo-600 hover:bg-indigo-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs gap-1"
                                                        >
                                                            {/* 컬럼 유형에 따라 한글 라벨 가독성 처리 */}
                                                            <span className="opacity-75 font-normal text-[10px]">
                                                                {activeFilter.column === 'sub_grade_sem' && '편성 시기'}
                                                                {activeFilter.column === 'sub_credit' && '이수 학점'}
                                                                {activeFilter.column === 'sub_type' && '이수 유형'} :
                                                            </span>
                                                            {activeFilter.value}
                                                        </Badge>
                                                        <span className="text-[11px] text-slate-500 font-medium">학년도는 전체</span>
                                                    </div>
                                                </div>

                                                {/* 필터 즉시 해제 버튼 */}
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setActiveFilter(null)}
                                                    className="h-7 px-2 text-xs text-slate-500 hover:text-rose-600 hover:bg-rose-50/50 rounded-lg gap-1 transition-colors"
                                                >
                                                    <X size={12} />
                                                    <span>필터 해제</span>
                                                </Button>
                                            </div>
                                        )}
                                        <SubTable data={filteredData} onOpenDetail={openModal} />
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-5xl h-[90vh] flex flex-col p-0 gap-0 overflow-hidden border-none shadow-2xl">
                    {/* 팝업 헤더 영역 */}
                    <DialogHeader className="p-6 bg-slate-50 border-b border-slate-200">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white rounded-2xl text-indigo-600 shadow-sm border border-slate-200">
                                <School size={24} />
                            </div>
                            <div className="space-y-1">
                                <DialogTitle className="text-xl font-black text-slate-900 tracking-tight">
                                    {selectedSchool?.schoolname} <span className="text-indigo-600">편성표</span>
                                </DialogTitle>
                                <DialogDescription className="text-xs text-slate-500 font-medium">
                                    {selectedSchool?.year}학년도 신입생 교육과정 편성표 (입력 데이터 기반)
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    {/* 팝업 본문 영역 (스크롤 가능) */}
                    <div className="flex-1 overflow-y-auto p-8 bg-white custom-scrollbar">
                        {selectedSchool ? (
                            <div className="space-y-6">
                                {/* 안내 문구 */}
                                <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl border border-amber-100 text-amber-800">
                                    <Info size={16} />
                                    <p className="text-[11px] font-semibold tracking-tight">
                                        해당 데이터는 학교에서 입력한 정보를 바탕으로 제공되며, 실제 공식 편성표와 차이가 있을 수 있습니다.
                                    </p>
                                </div>

                                {/* [여기에 실제 편성표 테이블 컴포넌트가 들어갈 자리입니다] */}
                                <div className="min-h-[400px] border-2 border-dashed border-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                                    <p className="text-sm">편성표 데이터를 불러오는 중...(개발중)</p>
                                    {/* <SubModalTable school={selectedSchool.schoolname} year={selectedSchool.year} /> */}
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
                        <Button variant="outline" onClick={() => setIsModalOpen(false)} className="rounded-xl px-6 font-bold text-slate-600">
                            닫기
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export { StaSubject }
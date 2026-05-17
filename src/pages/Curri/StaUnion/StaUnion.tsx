import { fetchStaUnionInfo } from "@/api/supabaseAPI"
import { Badge, Card, Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui"
import { YEARS } from "@/data/data"
import { useUnionStaStore } from "@/store/UnionStaStore"
import { useQuery } from "@tanstack/react-query"
import { BookOpen, Info, Loader2, MapPin, PieChartIcon, School, Sun, Users } from "lucide-react"
import React, { useEffect, useMemo, useState } from "react"
import { UnionMapContainer } from "./UnionMapContainer"
import { cn } from "@/lib/utils"
import { UnionSubGroupChart } from "./UnionSubGroupChart"
import { UnionSemChart } from "./UnionSemChart"
import { UnionTable } from "./UnionTable"

const FilterGroup = ({ label, value, onChange, options }: any) => (
    // flex-col 대신 items-center를 추가하여 가로 정렬을 강제합니다.
    <div className="flex items-center gap-3">
        <label className="text-[12px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
            {label}
        </label>
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-50 h-9 rounded-xl border-none bg-slate-100 font-medium text-slate-700 focus:ring-2 focus:ring-orange-500/20 transition-all">
                <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-100">
                <SelectItem value="전체">전체</SelectItem>
                {options.map((opt: string) => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
);

const StatCard = ({ label, value, icon, activeColor, bgColor, textColor }: any) => (
    <Card className={cn(
        "relative overflow-hidden border-none shadow-sm transition-all hover:shadow-md",
        bgColor
    )}>
        {/* 상단 액센트 바 */}
        <div className={cn("absolute top-0 left-0 w-full h-1.5", activeColor)} />

        <div className="px-3 py-1.5">
            <div className="flex justify-between items-center mb-1">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">{label}</p>
                <div className={cn("p-1.5 rounded-lg bg-white shadow-sm", textColor)}>
                    {icon}
                </div>
            </div>
            <p className="text-xl font-black text-slate-800 tracking-tight">{value}</p>
        </div>
    </Card>
);

const ITEMS_PER_PAGE = 10; // 페이지당 표시할 개수

const StaUnion = () => {
    const [selectedYear, setSelectedYear] = useState('전체')
    const [selectedGrade, setSelectedGrade] = useState("전체");
    const [selectedSem, setSelectedSem] = useState("전체");
    const [selectedSubject, setSelectedSubject] = useState("전체");

    const [currentPage, setCurrentPage] = useState(1);

    const setUnionSubjects = useUnionStaStore((state) => state.setUnionSubjects)
    const unionSubjects = useUnionStaStore((state) => state.unionSubjects)
    const unionSelectSchool = useUnionStaStore((state) => state.unionSelectSchool)
    const unionSelectLocation = useUnionStaStore((state) => state.unionSelectLocation)

    const { data: dbStaUnionData, isLoading: dbStaUnionLoading } = useQuery({
        queryKey: ['unionSubjects'],
        queryFn: fetchStaUnionInfo,
        staleTime: 1000 * 60 * 30
    })

    useEffect(() => {
        if (dbStaUnionData) {
            setUnionSubjects(dbStaUnionData)
        }
    }, [dbStaUnionData, setUnionSubjects])

    const filteredSubjects = useMemo(() => {
        const filtered = unionSubjects.filter((sub) => {
            const matchYear = selectedYear === '전체' || sub.year === selectedYear
            const matchGrade = selectedGrade === '전체' || `${sub.grade}학년` === selectedGrade
            const matchSem = selectedSem === "전체" || sub.semester === selectedSem;
            const matchSubject = selectedSubject === "전체" || sub.subject_name === selectedSubject;
            const matchLocation = unionSelectLocation === "" || sub.location === unionSelectLocation;
            const matchSchool = unionSelectSchool === "" || sub.school_name === unionSelectSchool
            return matchYear && matchGrade && matchSem && matchSubject && matchLocation && matchSchool
        });
        setCurrentPage(1); // 필터 변경 시 첫 페이지로 리셋
        return filtered;
    }, [unionSubjects, selectedYear, selectedGrade, selectedSem, selectedSubject, unionSelectLocation, unionSelectSchool]);

    const filteredMapSubjects = useMemo(() => {
        const filtered = unionSubjects.filter((sub) => {
            const matchYear = selectedYear === '전체' || sub.year === selectedYear
            const matchGrade = selectedGrade === '전체' || `${sub.grade}학년` === selectedGrade
            const matchSem = selectedSem === "전체" || sub.semester === selectedSem;
            const matchSubject = selectedSubject === "전체" || sub.subject_name === selectedSubject;

            return matchYear && matchGrade && matchSem && matchSubject
        });
        return filtered
    }, [selectedYear, selectedGrade, selectedSem, unionSubjects, selectedSubject])

    // 페이지네이션 계산
    const totalPages = Math.ceil(filteredSubjects.length / ITEMS_PER_PAGE);
    const paginatedData = filteredSubjects.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );


    const chartData = useMemo(() => {
        const filtered = unionSubjects.filter((sub) => {
            const matchYear = selectedYear === '전체' || sub.year === selectedYear
            return matchYear
        })
        return filtered
    }, [unionSubjects, selectedYear])

    const schoolCount = Array.from(new Set(chartData.map(s => s.school_name))).length
    const subjectOptions = Array.from(new Set(chartData.map(s => s.subject_name)))
    const gradeSubjectCount = useMemo(() => {
        const counts = { '1': 0, '2': 0, '3': 0 };

        chartData.forEach(sub => {
            if (sub.grade === '1') counts['1']++;
            else if (sub.grade === '2') counts['2']++;
            else if (sub.grade === '3') counts['3']++;
        });

        return counts;
    }, [chartData]);

    if (dbStaUnionLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
                <Loader2 className="animate-spin text-blue-600" size={40} />
                <p className="text-slate-500 font-medium">정보를 불러오는 중입니다...</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen bg-slate-50/50 font-sans">
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-2 py-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="pb-0">
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">전라남도 공동교육과정 현황 탐색</h1>
                            <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                                <Info size={14} /> 전라남도 내 개설된 모든 오프라인 공동교육과정을 한눈에 확인하세요.
                            </p>
                        </div>
                        {/* 퀵 통계 요약 */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-1">

                            {/* 개설 학교 수 - 로즈 */}
                            <StatCard
                                label="개설 학교"
                                value={`${schoolCount}개교`}
                                icon={<School size={14} />}
                                activeColor="bg-rose-500"
                                bgColor="bg-rose-50/30"
                                textColor="text-rose-600"
                            />

                            {/* 총 개설 과목 - 블루 */}
                            <StatCard
                                label="총 개설 과목"
                                value={`${chartData.length}개`}
                                icon={<BookOpen size={14} />}
                                activeColor="bg-blue-500"
                                bgColor="bg-blue-50/30"
                                textColor="text-blue-600"
                            />

                            {/* 1학년 - 에메랄드 */}
                            <StatCard
                                label="1학년 과목"
                                value={`${gradeSubjectCount['1']}개`}
                                icon={<Users size={14} />}
                                activeColor="bg-emerald-500"
                                bgColor="bg-emerald-50/30"
                                textColor="text-emerald-600"
                            />

                            {/* 2학년 - 인디고 (앰버 대신 더 세련된 색상 조합 추천) */}
                            <StatCard
                                label="2학년 과목"
                                value={`${gradeSubjectCount['2']}개`}
                                icon={<Sun size={14} />}
                                activeColor="bg-indigo-500"
                                bgColor="bg-indigo-50/30"
                                textColor="text-indigo-600"
                            />

                            {/* 3학년 - 바이올렛 */}
                            <StatCard
                                label="3학년 과목"
                                value={`${gradeSubjectCount['3']}개`}
                                icon={<Sun size={14} />}
                                activeColor="bg-violet-500"
                                bgColor="bg-violet-50/30"
                                textColor="text-violet-600"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Card className="mx-6 mt-1 shadow-sm border-slate-200">
                <div className="px-4 py-1 flex flex-wrap items-center gap-4 bg-white rounded-xl">
                    <FilterGroup label="년도" value={selectedYear} onChange={setSelectedYear} options={[YEARS[1], YEARS[2]]} />
                    <FilterGroup label="학년" value={selectedGrade} onChange={setSelectedGrade} options={["1학년", "2학년", "3학년"]} />
                    <FilterGroup label="학기" value={selectedSem} onChange={setSelectedSem} options={["1학기", "2학기", "여름방학", "겨울방학"]} />
                    <FilterGroup label="과목명" value={selectedSubject} onChange={setSelectedSubject} options={subjectOptions} />
                </div>
            </Card>
            <main className="p-2 grid grid-cols-1 lg:grid-cols-2 gap-3 h-[calc(100vh-100px)] overflow-hidden">

                {/* [좌측: 지도 영역] */}
                <Card className="shadow-sm border-slate-200 overflow-hidden relative flex flex-col">
                    <div className="px-4 py-3 border-b border-slate-100 bg-white flex justify-between items-center">
                        <h2 className="font-bold text-slate-700 flex items-center gap-2">
                            <div className="w-1 h-4 bg-indigo-500 rounded-full" />
                            지역별 개설 현황 지도
                        </h2>
                        <div className="flex items-center gap-4 p-0">
                            <Badge variant="outline" className="text-[12px] font-normal">전라남도 {unionSelectLocation || "전체"}</Badge>
                            {unionSelectSchool && (
                                <Badge className="bg-indigo-600 text-white py-1.5 px-3 shadow-md animate-in zoom-in-95">
                                    <MapPin size={12} className="mr-1" />
                                    {unionSelectSchool}
                                </Badge>
                            )}
                        </div>

                    </div>
                    <div className="flex-1 relative bg-slate-50">
                        <UnionMapContainer unionData={filteredMapSubjects} />
                    </div>
                </Card>

                {/* [우측: 통계 및 데이터 리스트 영역] */}
                <div className="flex flex-col gap-4 h-[calc(100vh-120px)] overflow-y-auto pr-2 custom-scrollbar">
                    <Card className="shrink-0 shadow-sm border-slate-200 flex flex-col overflow-hidden bg-white">
                        <div className="px-4 py-3 border-b border-slate-100 bg-white flex justify-between items-center sticky top-0 z-10">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-4 bg-indigo-600 rounded-full" />
                                <h2 className="font-bold text-slate-700">강좌 상세 목록</h2>
                                <Badge variant="secondary" className="ml-2 bg-slate-100 text-slate-500 font-normal">
                                    {filteredSubjects.length}건
                                </Badge>
                            </div>
                        </div>
                        <div className="flex-1">
                            <UnionTable data={paginatedData} currentPage={currentPage} />
                        </div>
                        {/* 페이지네이션 */}
                        <div className="px-4 py-3 border-t bg-white">
                            <Pagination>
                                <PaginationContent>
                                    {/* 이전 페이지 버튼 */}
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setCurrentPage(p => Math.max(1, p - 1));
                                            }}
                                            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                        />
                                    </PaginationItem>

                                    {/* 페이지 번호 목록 (간단한 구현 예시) */}
                                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                                        .filter(page => {
                                            // 현재 페이지 기준 전후 1페이지만 노출 (데이터가 많을 때 유용)
                                            return page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1;
                                        })
                                        .map((page, index, array) => {
                                            const showEllipsis = index > 0 && page - array[index - 1] > 1;

                                            return (
                                                <React.Fragment key={page}>
                                                    {showEllipsis && (
                                                        <PaginationItem>
                                                            <PaginationEllipsis />
                                                        </PaginationItem>
                                                    )}
                                                    <PaginationItem>
                                                        <PaginationLink
                                                            href="#"
                                                            isActive={currentPage === page}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setCurrentPage(page);
                                                            }}
                                                        >
                                                            {page}
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                </React.Fragment>
                                            );
                                        })}

                                    {/* 다음 페이지 버튼 */}
                                    <PaginationItem>
                                        <PaginationNext
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setCurrentPage(p => Math.min(totalPages, p + 1));
                                            }}
                                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                        <Card className="shrink-0 shadow-sm border-slate-200 p-5 bg-white mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="font-bold text-slate-700 text-sm flex items-center gap-2">
                                    <PieChartIcon size={16} className="text-orange-500" />
                                    데이터 분석 요약
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 items-center">
                                <div className="h-full border-l border-slate-50 pl-0">
                                    <UnionSubGroupChart data={chartData} year={selectedYear} />
                                </div>
                                <div className="flex justify-center pl-0">
                                    <UnionSemChart data={chartData} year={selectedYear} />
                                </div>
                            </div>
                        </Card>
                    </Card>
                </div>
            </main>
        </div>
    )
}

export { StaUnion }
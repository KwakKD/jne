import { fetchStaUnionInfo } from "@/api/supabaseAPI"
import { Badge, Button, Card, Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui"
import { YEARS } from "@/data/data"
import { useUnionStaStore } from "@/store/UnionStaStore"
import { useQuery } from "@tanstack/react-query"
import { BookOpen, ExternalLink, Info, Loader2, School, Sun, Users } from "lucide-react"
import React, { useEffect, useMemo, useState } from "react"
import { UnionMapContainer } from "./UnionMapContainer"
import { cn } from "@/lib/utils"

const FilterGroup = ({ label, value, onChange, options }: any) => (
    // flex-col 대신 items-center를 추가하여 가로 정렬을 강제합니다.
    <div className="flex items-center gap-3">
        <label className="text-[12px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
            {label}
        </label>
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-30 h-9 rounded-xl border-none bg-slate-100 font-medium text-slate-700 focus:ring-2 focus:ring-orange-500/20 transition-all">
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

const ITEMS_PER_PAGE = 10; // 페이지당 표시할 개수

const StaUnion = () => {
    const [selectedYear, setSelectedYear] = useState('전체')
    const [selectedGrade, setSelectedGrade] = useState("전체");
    const [selectedSem, setSelectedSem] = useState("전체");
    const [selectedSubject, setSelectedSubject] = useState("전체");

    const [currentPage, setCurrentPage] = useState(1);

    const setUnionSubjects = useUnionStaStore((state) => state.setUnionSubjects)
    const unionSubjects = useUnionStaStore((state) => state.unionSubjects)

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
            return matchYear && matchGrade && matchSem && matchSubject
        });
        setCurrentPage(1); // 필터 변경 시 첫 페이지로 리셋
        return filtered;
    }, [unionSubjects, selectedYear, selectedGrade, selectedSem, selectedSubject]);

    // 페이지네이션 계산
    const totalPages = Math.ceil(filteredSubjects.length / ITEMS_PER_PAGE);

    const subjectOptions = Array.from(new Set(filteredSubjects.map(s => s.subject_name)))

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
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">전라남도 공동교육과정 현황 탐색</h1>
                            <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                                <Info size={14} /> 전라남도 내 개설된 모든 오프라인 공동교육과정을 한눈에 확인하세요.
                            </p>
                        </div>
                        {/* 퀵 통계 요약 */}
                        <div className="flex gap-4">
                            <Card className="p-4 mb-4 border-l-4 border-l-blue-500 shadow-sm">
                                <div className="flex justify-between items-start gap-3">
                                    <p className="text-xs font-medium text-slate-500">총 개설 과목</p>
                                    <BookOpen size={16} className="text-blue-500" />
                                </div>
                                <p className="text-2xl font-bold mt-0">128개</p>
                            </Card>
                            <Card className="p-4 mb-4 border-l-4 border-l-emerald-500 shadow-sm">
                                <div className="flex justify-between items-start gap-3">
                                    <p className="text-xs font-medium text-slate-500">총 수용 가능 인원</p>
                                    <Users size={16} className="text-emerald-500" />
                                </div>
                                <p className="text-2xl font-bold mt-0">1,840명</p>
                            </Card>

                            <Card className="p-4 mb-4 border-l-4 border-l-amber-500 shadow-sm">
                                <div className="flex justify-between items-start gap-3">
                                    <p className="text-xs font-medium text-slate-500">방학 중 특별강좌</p>
                                    <Sun size={16} className="text-amber-500" />
                                </div>
                                <p className="text-2xl font-bold mt-0">32개</p>
                            </Card>

                            <Card className="p-4 mb-4 border-l-4 border-l-rose-500 shadow-sm">
                                <div className="flex justify-between items-start gap-3">
                                    <p className="text-xs font-medium text-slate-500">참여 학교 수</p>
                                    <School size={16} className="text-rose-500" />
                                </div>
                                <p className="text-2xl font-bold mt-0">64개교</p>
                            </Card>
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
                        {/* <Badge variant="outline" className="text-[11px] font-normal">전라남도 {unionSelectLocation || "전체"}</Badge> */}
                    </div>
                    <div className="flex-1 relative bg-slate-50">
                        <UnionMapContainer unionData={filteredSubjects} />
                    </div>
                </Card>

                {/* [우측: 통계 및 데이터 리스트 영역] */}
                <div className="flex flex-col gap-6 overflow-hidden relative border-slate-600">

                    {/* 우측 상단: 통계 요약 (2x2 Grid) */}
                    {/* <div className="grid grid-cols-2 gap-4">
                        <StatCard title="개설 강좌" value={`${stats.totalCourses}개`} icon={<BookOpen size={16} className="text-blue-500" />} color="blue" />
                <StatCard title="수용 인원" value={`${stats.totalCapacity}명`} icon={<Users size={16} className="text-emerald-500" />} color="emerald" />
                <StatCard title="방학 강좌" value={`${stats.specialCourses}개`} icon={<Sun size={16} className="text-amber-500" />} color="amber" />
                <StatCard title="참여 학교" value={`${stats.totalSchools}개교`} icon={<School size={16} className="text-rose-500" />} color="rose" />
                    </div> */}

                    {/* 우측 하단: 데이터 리스트 (스크롤 가능) */}
                    <Card className="flex-1 shadow-sm border-slate-200 flex flex-col overflow-hidden">
                        {/* 테이블 헤더 영역 */}
                        <div className="px-4 py-3 border-b border-slate-100 bg-white flex justify-between items-center sticky top-0 z-10">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-4 bg-indigo-600 rounded-full" />
                                <h2 className="font-bold text-slate-700">강좌 상세 목록</h2>
                                <Badge variant="secondary" className="ml-2 bg-slate-100 text-slate-500 font-normal">
                                    {filteredSubjects.length}건
                                </Badge>
                            </div>
                        </div>

                        {/* 테이블 본체 */}
                        <div className="flex-1 overflow-auto">
                            <table className="w-full text-sm text-left border-collapse">
                                <thead className="bg-slate-50/80 sticky top-0 z-10 backdrop-blur-sm border-b border-slate-200">
                                    <tr>
                                        <th className="px-4 py-3 font-semibold text-slate-600 w-10">연번</th>
                                        <th className="px-4 py-3 font-semibold text-slate-600 w-20">학기</th>
                                        <th className="px-4 py-3 font-semibold text-slate-600 w-20">지역</th>
                                        <th className="px-4 py-3 font-semibold text-slate-600">학년</th>
                                        <th className="px-4 py-3 font-semibold text-slate-600">과목명</th>
                                        <th className="px-4 py-3 font-semibold text-slate-600">개설학교</th>
                                        <th className="px-4 py-3 font-semibold text-slate-600 w-15 text-center">학점</th>
                                        <th className="px-4 py-3 font-semibold text-slate-600 w-20 text-center">상세</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {filteredSubjects.length > 0 ? (
                                        filteredSubjects.map((sub, idx) => (
                                            <tr
                                                key={sub.id}
                                                className={cn(
                                                    "hover:bg-indigo-50/30 transition-colors cursor-pointer group",
                                                    // unionSelectSchool === sub.school_name && "bg-indigo-50/50"
                                                )}
                                            // onClick={() => setUnionSelectSchool(sub.school_name)}
                                            >
                                                <td className="px-4 py-3 text-slate-500 font-medium">{idx + 1}</td>
                                                <td className="px-4 py-3">
                                                    <Badge variant="outline" className="text-[11px] font-medium border-slate-200 bg-slate-50">
                                                        {sub.semester}
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-3 text-slate-500 font-medium">{sub.location}</td>
                                                <td className="px-4 py-3 text-slate-500 font-medium">{sub.grade}학년</td>
                                                <td className="px-4 py-3 font-bold text-slate-900 group-hover:text-indigo-600">
                                                    {sub.subject_name}
                                                </td>
                                                <td className="px-4 py-3 text-slate-600">{sub.school_name}</td>
                                                <td className="px-4 py-3 text-center font-medium text-slate-500">{sub.credit}</td>
                                                <td className="px-4 py-3 text-center font-medium text-slate-500">
                                                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0 hover:bg-indigo-50 hover:text-indigo-600">
                                                        <ExternalLink size={14} />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="py-20 text-center text-slate-400">
                                                <div className="flex flex-col items-center gap-2">
                                                    <Info size={32} strokeWidth={1.5} className="text-slate-300" />
                                                    <p>조건에 맞는 강좌가 없습니다.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
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
                    </Card>
                </div>
            </main>
        </div>
    )
}

export { StaUnion }
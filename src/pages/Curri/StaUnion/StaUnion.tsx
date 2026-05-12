import { fetchStaUnionInfo } from "@/api/supabaseAPI"
import { Badge, Card, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui"
import { YEARS } from "@/data/data"
import { useUnionStaStore } from "@/store/UnionStaStore"
import { useQuery } from "@tanstack/react-query"
import { BookOpen, Info, Loader2, School, Sun, Users } from "lucide-react"
import { useEffect, useState } from "react"
import { UnionMapContainer } from "./UnionMapContainer"

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

const StaUnion = () => {
    const [selectedYear, setSelectedYear] = useState('전체')
    const [selectedGrade, setSelectedGrade] = useState("전체");
    const [selectedSem, setSelectedSem] = useState("전체");
    const [selectedSubject, setSelectedSubject] = useState("전체");

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

    const filteredSubjects = unionSubjects.filter((sub) => {
        const matchYear = selectedYear === '전체' || sub.year === selectedYear
        const matchGrade = selectedGrade === '전체' || `${sub.grade}학년` === selectedGrade
        const matchSem = selectedSem === "전체" || sub.semester === selectedSem;
        const matchSubject = selectedSubject === "전체" || sub.subject_name === selectedSubject;

        return matchYear && matchGrade && matchSem && matchSubject
    })

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
            <main className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-100px)] overflow-hidden">

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
                <div className="flex flex-col gap-6 overflow-hidden">

                    {/* 우측 상단: 통계 요약 (2x2 Grid) */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* <StatCard title="개설 강좌" value={`${stats.totalCourses}개`} icon={<BookOpen size={16} className="text-blue-500" />} color="blue" />
                <StatCard title="수용 인원" value={`${stats.totalCapacity}명`} icon={<Users size={16} className="text-emerald-500" />} color="emerald" />
                <StatCard title="방학 강좌" value={`${stats.specialCourses}개`} icon={<Sun size={16} className="text-amber-500" />} color="amber" />
                <StatCard title="참여 학교" value={`${stats.totalSchools}개교`} icon={<School size={16} className="text-rose-500" />} color="rose" /> */}
                    </div>

                    {/* 우측 하단: 데이터 리스트 (스크롤 가능) */}
                    <Card className="flex-1 shadow-sm border-slate-200 flex flex-col overflow-hidden">
                        <div className="px-4 py-3 border-b border-slate-100 bg-white flex justify-between items-center sticky top-0 z-10">
                            <h2 className="font-bold text-slate-700 flex items-center gap-2">
                                <div className="w-1 h-4 bg-orange-500 rounded-full" />
                                상세 강좌 목록
                            </h2>
                            <span className="text-xs text-slate-400 font-medium">총 {filteredSubjects.length}건</span>
                        </div>

                        {/* 리스트 본체: 여기가 스크롤되는 영역입니다 */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/30">
                            {filteredSubjects.length > 0 ? (
                                filteredSubjects.map((sub) => (
                                    <div key={sub.id} className="p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 transition-colors shadow-sm">
                                        <div className="flex justify-between items-start mb-2">
                                            <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-100 border-none">{sub.semester}</Badge>
                                            <span className="text-[13px] font-bold text-indigo-600">{sub.school_name}</span>
                                        </div>
                                        <h3 className="font-bold text-slate-800 text-lg mb-1">{sub.subject_name}</h3>
                                        <div className="flex gap-4 text-xs text-slate-500">
                                            <span className="flex items-center gap-1 font-medium text-slate-700 underline decoration-indigo-200 underline-offset-4">{sub.location}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-2 py-20">
                                    <Info size={40} strokeWidth={1} />
                                    <p>선택된 지역에 개설된 강좌가 없습니다.</p>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    )
}

export { StaUnion }
import { Badge, Card, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { ArrowRight, BookOpen, CalendarDays, Clock, Filter, MapPin } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { NaviUnionMap } from "./NaviUnionMap";
import { YEARS } from "@/data/data";
import { useQuery } from "@tanstack/react-query";
import { fetchStaUnionInfo, type UnionInfoProps } from "@/api/supabaseAPI";
import { useNaviUnionStore } from "@/store/NaviUnionStore";

// --- 필터 그룹 컴포넌트 ---
const FilterGroup = ({ label, value, onChange, options }: any) => (
    <div className="space-y-1.5">
        <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider ml-1">{label}</label>
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full h-11 rounded-2xl border-none bg-slate-200 font-medium text-slate-700 focus:ring-2 focus:ring-orange-500/20 transition-all">
                <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-100">
                <SelectItem value="전체">전체 {label}</SelectItem>
                {options.map((opt: string) => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
);

const SubjectCard = ({ data, onDetail }: { data: UnionInfoProps; onDetail: () => void }) => (
    <Card
        onClick={onDetail}
        // 🎯 카드 전체를 클릭해도 상세보기가 작동하도록 세팅 (UX 향상)
        className="p-5 border-none shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group bg-white rounded-[2rem] border border-transparent hover:border-orange-100 relative overflow-hidden cursor-pointer select-none"
    >
        <div className="relative z-10 flex flex-col h-full justify-between">
            {/* 상단: 태그 및 연도/학기 */}
            <div>
                <div className="flex justify-between items-start mb-2">
                    <div className="flex gap-1">
                        <Badge className="bg-indigo-50 text-[12px] text-indigo-600 border-none px-3 py-1 font-semibold">
                            {data.subject_group}
                        </Badge>
                        <Badge className="bg-green-100 text-[12px] text-slate-700 border-none px-3 py-1 font-semibold">
                            {data.subject_type}
                        </Badge>
                    </div>

                    <span className="text-[12px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">
                        {data.year} · {data.semester}
                    </span>
                </div>

                {/* 과목명 */}
                <h4 className="text-lg font-black text-slate-900 mb-1 group-hover:text-orange-600 transition-colors">
                    {data.subject_name}
                </h4>
            </div>

            {/* 하단: 학교 정보 및 학점 + 상세보기 화살표 */}
            <div className="space-y-2 flex justify-between items-end pt-2 border-t border-slate-50/80">
                {/* 학교 위치 정보 */}
                <div className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
                        <MapPin size={18} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-900 leading-none">{data.school_name}</p>
                        <p className="text-[11px] text-slate-500 mt-1">{data.location} · 거점학교</p>
                    </div>
                </div>

                {/* 학년/학점 데이터 + 상세보기 트리거 버튼 인터랙션 */}
                <div className="flex items-center gap-4">
                    <div className="flex gap-3 text-right">
                        <div className="text-center">
                            <p className="text-[11px] text-slate-400 leading-none mb-1">학년</p>
                            <p className="text-xs font-bold text-slate-700">{data.grade}</p>
                        </div>
                        <div className="text-center border-l border-slate-100 pl-3">
                            <p className="text-[11px] text-slate-400 leading-none mb-1">학점</p>
                            <p className="text-xs font-bold text-slate-700">{data.credit}</p>
                        </div>
                    </div>

                    {/* 🎯 [신설] 트렌디한 화살표 상세보기 액션 아이콘 */}
                    <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center transition-all group-hover:bg-orange-600 group-hover:text-white group-hover:translate-x-0.5 shadow-sm">
                        <ArrowRight size={16} />
                    </div>
                </div>
            </div>
        </div>

        {/* 우측 하단 큰 배경 아이콘 */}
        <BookOpen className="absolute -right-4 -bottom-4 text-slate-100 opacity-50 group-hover:text-orange-50 transition-colors" size={100} />
    </Card>
);

function NaviUnion() {
    const [selectedYear, setSelectedYear] = useState("전체");
    const [selectedGrade, setSelectedGrade] = useState("전체");
    const [selectedSem, setSelectedSem] = useState("전체");
    const [selectedSubject, setSelectedSubject] = useState("전체");
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [selectedSchool, setSelectedSchool] = useState("전체");
    const [selectedSubData, setSelectedSubData] = useState<UnionInfoProps | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const setUnionSubjects = useNaviUnionStore((state) => state.setUnionSubjects)
    const unionSubjects = useNaviUnionStore((state) => state.unionSubjects)

    const jnLocations = ["목포시", "여수시", "순천시", "나주시", "광양시", "담양군", "곡성군", "구례군", "고흥군", "보성군", "화순군", "장흥군", "강진군", "해남군", "영암군", "무안군", "함평군", "영광군", "장성군", "완도군", "진도군", "신안군"];

    const { data: dbStaUnionData } = useQuery({
        queryKey: ['unionSubjects'],
        queryFn: fetchStaUnionInfo,
        staleTime: 1000 * 60 * 30
    })

    const toggleLocation = (loc: string) => {
        setSelectedLocations(prev =>
            prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]
        );
    };
    const setAllLocations = (select: boolean) => {
        if (select) {
            setSelectedLocations([...jnLocations]); // 전체 선택
        } else {
            setSelectedLocations([]); // 전체 해제
        }
    };

    useEffect(() => {
        if (dbStaUnionData) {
            setUnionSubjects(dbStaUnionData)
        }
    }, [dbStaUnionData, setUnionSubjects])

    const filteredSubjects = unionSubjects.filter((sub) => {
        const matchYear = selectedYear === '전체' || sub.year === selectedYear
        const matchGrade = selectedGrade === '전체' || `${sub.grade}학년` === selectedGrade
        const matchSem = selectedSem === "전체" || sub.semester === selectedSem;
        const matchName = selectedSubject === "전체" || sub.subject_name === selectedSubject;
        const matchLocation = selectedLocations.length === 0 || selectedLocations.includes(sub.location);
        const matchSchool = selectedSchool === "전체" || sub.school_name === selectedSchool;

        return matchYear && matchGrade && matchSem && matchName && matchLocation && matchSchool;
    })

    const subjectOptions = Array.from(new Set(filteredSubjects.map(s => s.subject_name)));
    const schoolOptions = Array.from(new Set(filteredSubjects.map(s => s.school_name)));

    const locationCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        // 전체 데이터에서 각 지역(location)의 개수를 셉니다.
        filteredSubjects.forEach(sub => {
            counts[sub.location] = (counts[sub.location] || 0) + 1;
        });
        return counts;
    }, [filteredSubjects]);
    return (
        <div className="h-screen bg-slate-50/50 flex flex-col overflow-hidden">
            {/* 1. 히어로 섹션 */}
            <section className="relative h-40 flex items-center justify-center overflow-hidden flex-shrink-0">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1577891729319-66ad7cd7ff31?auto=format&fit=crop&q=80&w=2000"
                        alt="Collaborative Learning"
                        className="w-full h-full object-cover brightness-[0.35]"
                    />
                    <div className="absolute inset-0 z-0 bg-gradient-to-r from-indigo-900/50 via-slate-900/60 to-orange-900/20" />
                </div>

                <div className="relative z-10 text-center text-white space-y-3 px-6">
                    <div className="flex justify-center gap-2 mb-2">
                        <Badge className="bg-orange-500 hover:bg-orange-500 text-white border-none px-4 py-1 shadow-lg shadow-orange-900/20">
                            오프라인 거점형
                        </Badge>
                        <Badge className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-1">
                            학교 간 협력
                        </Badge>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight">
                        오프라인 공동교육과정 <span className="text-orange-400">현황</span>
                    </h1>
                    <p className="text-slate-100 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                        지역별 거점 학교에서 열리는 생생한 대면 수업 정보를 확인하세요.
                    </p>
                </div>
            </section>

            {/* 2. 상단 고정 필터바 (Sticky) */}
            <header className="h-20 flex-shrink-0 bg-white border-b border-slate-200 px-6 flex items-center shadow-sm z-30">
                <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
                    <FilterGroup label="년도" value={selectedYear} onChange={setSelectedYear} options={[YEARS[1], YEARS[2]]} />
                    <FilterGroup label="학년" value={selectedGrade} onChange={setSelectedGrade} options={["1학년", "2학년", "3학년"]} />
                    <FilterGroup label="학기" value={selectedSem} onChange={setSelectedSem} options={["1학기", "2학기", "여름방학", "겨울방학"]} />
                    <FilterGroup label="과목명" value={selectedSubject} onChange={setSelectedSubject} options={subjectOptions} />
                </div>
            </header>

            <main className="flex-1 flex overflow-hidden">
                {/* [고정] 왼쪽: 지도 영역 */}
                <aside className="w-100 lg:w-200 bg-white border-r border-slate-200 flex flex-col shrink-0">
                    {/* aside 내부가 길어질 경우를 대비해 내부 스크롤을 넣되, 기본적으로는 고정된 상태 유지 */}
                    <div className="p-6 overflow-y-auto h-full custom-scrollbar">
                        <div className="mb-4">
                            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <MapPin className="text-orange-500" size={20} /> 전남 지역 선택
                            </h2>

                            <p className="text-xs text-slate-500 mt-1 italic">
                                지역을 클릭하십시오.
                            </p>
                        </div>
                        {/* 선택된 지역 칩 */}
                        <div className="flex flex-wrap gap-2 mb-2">
                            {selectedLocations.map(loc => (
                                <div key={loc} className="relative mt-1 mr-1"> {/* 숫자 배지를 위한 컨테이너 */}
                                    <Badge
                                        variant="secondary"
                                        className="bg-orange-50 text-orange-600 border-orange-100 gap-1.5 px-4 py-2 rounded-full font-bold transition-all"
                                    >
                                        {loc}
                                        <button
                                            onClick={() => toggleLocation(loc)}
                                            className="ml-1 hover:text-rose-500 transition-colors"
                                        >
                                            ×
                                        </button>
                                    </Badge>

                                    {/* 오른쪽 위 숫자 배지 */}
                                    {locationCounts[loc] > 0 && (<span className="absolute -top-2 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1.5 text-[10px] font-black text-white shadow-sm ring-2 ring-white">
                                        {locationCounts[loc]}
                                    </span>)}

                                </div>
                            ))}
                        </div>
                        <div className="mb-8">
                            <NaviUnionMap
                                selectedLocations={selectedLocations}
                                toggleLocation={toggleLocation}
                                setAllLocations={setAllLocations}
                                locationCounts={locationCounts}
                            />
                        </div>
                    </div>
                </aside>

                {/* [스크롤] 오른쪽: 리스트 영역 */}
                <section className="flex-1 overflow-y-auto bg-slate-50/50 custom-scrollbar">
                    <div className="p-6">
                        {/* 리스트 헤더: 여기서 sticky를 쓰면 스크롤 시 이 제목 부분만 상단에 붙습니다 */}
                        <div className="mb-6 flex justify-between items-center sticky top-0 z-20 bg-slate-50/80 backdrop-blur-md py-2">
                            <div className="flex items-center gap-4">
                                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                    <Filter size={16} className="text-slate-400" /> 개설 과목 현황
                                </h3>
                                <Badge className="bg-slate-900 text-white border-none rounded-lg px-2">{filteredSubjects.length}개 강좌</Badge>
                            </div>

                            <div className="w-48">
                                <Select value={selectedSchool} onValueChange={setSelectedSchool}>
                                    <SelectTrigger className="bg-white rounded-xl shadow-sm border-slate-400"><SelectValue placeholder="학교 선택" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="전체">전체 학교</SelectItem>
                                        {schoolOptions.map(school => (
                                            <SelectItem key={school} value={school}>{school}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* 카드 리스트 */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                            {filteredSubjects.length > 0 ? (
                                filteredSubjects.map((subject, idx) => (
                                    <SubjectCard
                                        key={idx}
                                        data={subject}
                                        onDetail={() => {
                                            // 🎯 카드가 클릭되면 이 과목 데이터를 상태에 채우고 모달을 트리거합니다.
                                            setSelectedSubData(subject);
                                            setIsModalOpen(true);
                                        }}
                                    />
                                ))
                            ) : (
                                <div className="col-span-full py-20 text-center text-slate-400 font-medium">
                                    해당 조건에 맞는 과목이 없습니다.
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>

                <DialogContent className="max-w-md rounded-[2rem] border-none shadow-2xl p-6 bg-white">
                    {selectedSubData && (
                        <div className="space-y-4">
                            <DialogHeader className="space-y-3 border-b border-slate-100 pb-3 text-left">
                                <div className="flex flex-wrap items-center gap-2">
                                    <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none font-medium text-xs px-2.5 py-0.5 rounded-md">
                                        {selectedSubData.subject_group}
                                    </Badge>
                                    <Badge variant="outline" className="text-indigo-600 border-indigo-100 bg-indigo-50/50 text-xs px-2.5 py-0.5 rounded-md">
                                        {selectedSubData.subject_type}
                                    </Badge>
                                    <Badge className="bg-orange-500 hover:bg-orange-600 shadow-none text-xs px-2.5 py-0.5 rounded-md text-white border-none">
                                        {selectedSubData.credit}학점
                                    </Badge>
                                </div>
                                {/* 🎯 font-extrabold와 tracking-tight로 시각적 무게감을 더 줍니다. */}
                                <DialogTitle className="text-xl font-extrabold text-slate-900 tracking-tight pt-1">
                                    {selectedSubData.subject_name}
                                </DialogTitle>
                                <DialogDescription className="text-xs text-slate-500">
                                    선택하신 공동교육과정 과목의 상세 운영 정보입니다.
                                </DialogDescription>
                            </DialogHeader>
                            {/* 헤더 파트 */}
                            {/* <div className="space-y-2 border-b border-slate-100 pb-3">
                                <div className="flex flex-wrap items-center gap-2">
                                    <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none font-medium text-xs px-2.5 py-0.5 rounded-md">
                                        {selectedSubData.subject_group}
                                    </Badge>
                                    <Badge variant="outline" className="text-indigo-600 border-indigo-100 bg-indigo-50/50 text-xs px-2.5 py-0.5 rounded-md">
                                        {selectedSubData.subject_type}
                                    </Badge>
                                    <Badge className="bg-orange-500 hover:bg-orange-600 shadow-none text-xs px-2.5 py-0.5 rounded-md text-white border-none">
                                        {selectedSubData.credit}학점
                                    </Badge>
                                </div>
                                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight pt-1">
                                    {selectedSubData.subject_name}
                                </h2>
                            </div> */}

                            {/* 바디 내역 그리드 파트 */}
                            <div className="space-y-2.5 py-1 text-[13px] text-slate-700">
                                <div className="grid grid-cols-3 gap-2 border-b border-slate-100/70 pb-2 items-center">
                                    <span className="text-slate-400 flex items-center gap-1.5 font-medium"><CalendarDays size={14} /> 운영정보</span>
                                    <span className="col-span-2 font-semibold text-slate-800">{selectedSubData.year}년 / {selectedSubData.semester}</span>
                                </div>

                                <div className="grid grid-cols-3 gap-2 border-b border-slate-100/70 pb-2 items-center">
                                    <span className="text-slate-400 flex items-center gap-1.5 font-medium"><MapPin size={14} /> 거점학교</span>
                                    <span className="col-span-2 font-semibold text-slate-800">{selectedSubData.school_name} <span className="text-slate-400 font-normal ml-1">({selectedSubData.location})</span></span>
                                </div>

                                <div className="grid grid-cols-3 gap-2 border-b border-slate-100/70 pb-2 items-center">
                                    <span className="text-slate-400 flex items-center gap-1.5 font-medium"><Clock size={14} /> 운영시간</span>
                                    <span className="col-span-2 font-semibold text-slate-800">{selectedSubData.operating_time}</span>
                                </div>

                                <div className="grid grid-cols-3 gap-2 border-b border-slate-100/70 pb-2 items-center">
                                    <span className="text-slate-400 font-medium pl-5">수업장소</span>
                                    <span className="col-span-2 font-semibold text-slate-800">{selectedSubData.classroom}</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2 border-b border-slate-100/70 pb-2 items-center">
                                    <span className="text-slate-400 font-medium pl-5">운영학년</span>
                                    <span className="col-span-2 font-semibold text-slate-800">{selectedSubData.grade}학년</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2 border-b border-slate-100/70 pb-2 items-center">
                                    <span className="text-slate-400 font-medium pl-5">시작날짜</span>
                                    <span className="col-span-2 font-semibold text-slate-800">{selectedSubData.start_date}</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2 border-b border-slate-100/70 pb-2 items-center">
                                    <span className="text-slate-400 font-medium pl-5">종료날짜</span>
                                    <span className="col-span-2 font-semibold text-slate-800">{selectedSubData.end_date}</span>
                                </div>

                                {/* 비고 상자 */}
                                <div className="bg-slate-50 p-3 rounded-2xl mt-3 border border-slate-100">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase mb-1 block tracking-wider">비고 사항</span>
                                    <p className="text-slate-600 leading-relaxed text-xs">
                                        {selectedSubData.memo || '등록된 비고 사항이 없습니다.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

export { NaviUnion };
import { Badge, Card, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { BookOpen, Filter, MapPin } from "lucide-react";
import { useMemo, useState } from "react";
import { NaviUnionMap } from "./NaviUnionMap";
import { NAV_UNUON_SUBJECTS } from "@/data/navUnion";
import { YEARS } from "@/data/data";
import type { SubjectNavUnion } from "@/type/nav";

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

const SubjectCard = ({ data }: { data: SubjectNavUnion }) => (
    <Card className="p-5 border-none shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group bg-white rounded-[2rem] border border-transparent hover:border-orange-100 relative overflow-hidden">
        <div className="relative z-10">
            <div className="flex justify-between items-start mb-2">
                <Badge className="bg-indigo-50 text-[12px] text-indigo-600 border-none px-3 py-1 font-semibold">
                    {data.sub_subgroup}
                </Badge>
                <span className="text-[12px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">
                    {data.year} · {data.sub_sem}학기
                </span>
            </div>

            <h4 className="text-lg font-black text-slate-900 mb-1 group-hover:text-orange-600 transition-colors">
                {data.sub_name}
            </h4>
            <p className="text- text-slate-500 mb-4 line-clamp-1">
                {data.sub_prop} | {data.sub_type}교육과정
            </p>

            <div className="space-y-2 flex justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                        <MapPin size={20} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-900 leading-none">{data.schoolName}</p>
                        <p className="text-[11px] text-slate-500 mt-1">{data.location} · 거점학교</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="text-center">
                        <p className="text-[12px] text-slate-500 leading-none mb-1">학년</p>
                        <p className="text-xs font-bold text-slate-700">{data.sub_grade}</p>
                    </div>
                    <div className="text-center border-x border-slate-100 px-3">
                        <p className="text-[12px] text-slate-500 leading-none mb-1">학점</p>
                        <p className="text-xs font-bold text-slate-700">{data.sub_credit}</p>
                    </div>
                </div>
            </div>

            {/* <div className="mt-5 pt-0 border-t border-slate-50 flex justify-between items-center">
                <div className="flex gap-3">
                    <div className="text-center">
                        <p className="text-[10px] text-slate-400 leading-none mb-1">학년</p>
                        <p className="text-xs font-bold text-slate-700">{data.sub_grade}</p>
                    </div>
                    <div className="text-center border-x border-slate-100 px-3">
                        <p className="text-[10px] text-slate-400 leading-none mb-1">학점</p>
                        <p className="text-xs font-bold text-slate-700">{data.sub_credit}</p>
                    </div>
                </div>
                <button className="flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-50 px-4 py-2 rounded-xl hover:bg-orange-600 hover:text-white transition-all shadow-sm">
                    상세보기
                </button>
            </div> */}
        </div>
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

    const jnLocations = ["목포시", "여수시", "순천시", "나주시", "광양시", "담양군", "곡성군", "구례군", "고흥군", "보성군", "화순군", "장흥군", "강진군", "해남군", "영암군", "무안군", "함평군", "영광군", "장성군", "완도군", "진도군", "신안군"];

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

    const filteredSubjects = NAV_UNUON_SUBJECTS.filter((sub) => {
        const matchYear = selectedYear === '전체' || sub.year === selectedYear
        const matchGrade = selectedGrade === '전체' || `${sub.sub_grade}학년` === selectedGrade
        const matchSem = selectedSem === "전체" || `${sub.sub_sem}학기` === selectedSem;
        const matchName = selectedSubject === "전체" || sub.sub_name === selectedSubject;
        const matchLocation = selectedLocations.length === 0 || selectedLocations.includes(sub.location);
        const matchSchool = selectedSchool === "전체" || sub.schoolName === selectedSchool;

        return matchYear && matchGrade && matchSem && matchName && matchLocation && matchSchool;
    })

    const subjectOptions = Array.from(new Set(NAV_UNUON_SUBJECTS.map(s => s.sub_name)));
    const schoolOptions = Array.from(new Set(NAV_UNUON_SUBJECTS.map(s => s.schoolName)));

    const locationCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        // 전체 데이터에서 각 지역(location)의 개수를 셉니다.
        NAV_UNUON_SUBJECTS.forEach(sub => {
            counts[sub.location] = (counts[sub.location] || 0) + 1;
        });
        return counts;
    }, []);
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
                    <p className="text-slate-200 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed opacity-90">
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
                                    <span className="absolute -top-2 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1.5 text-[10px] font-black text-white shadow-sm ring-2 ring-white">
                                        {locationCounts[loc] || 0}
                                    </span>
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

                        {/* 지도 버튼 영역 (이전 코드에서 누락된 부분 추가) */}
                        {/* <div className="aspect-[4/5] bg-slate-50 rounded-[2.5rem] relative p-6 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden mb-6">
                            <div className="grid grid-cols-3 gap-2 w-full">
                                {jnLocations.map(loc => (
                                    <button
                                        key={loc}
                                        onClick={() => toggleLocation(loc)}
                                        className={`py-2 px-1 rounded-xl text-[11px] font-bold transition-all border ${selectedLocations.includes(loc)
                                            ? "bg-orange-500 text-white border-orange-600 shadow-lg scale-105 z-10"
                                            : "bg-white text-slate-500 border-slate-100 hover:border-orange-200 hover:text-orange-500"
                                            }`}
                                    >
                                        {loc}
                                    </button>
                                ))}
                            </div>
                        </div> */}


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
                                    <SubjectCard key={idx} data={subject} />
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

            {/* <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-160px)] md:h-[calc(100vh-105px)] overflow-hidden">

                <aside className="
    w-full md:w-100 lg:w-112 
    bg-white border-r border-slate-200 
    flex flex-col shrink-0 
    md:h-[calc(100vh-160px)] 
    md:sticky md:top-10
    z-10
  ">
                    <div className="p-6 overflow-y-auto custom-scrollbar h-full">
                        <div className="mb-6">
                            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <MapPin className="text-orange-500" size={20} /> 전남 지역 선택
                            </h2>
                            <p className="text-xs text-slate-500 mt-1 italic">
                                동네를 클릭하면 해당 지역 과목을 모아볼 수 있습니다.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6 min-h-[32px]">
                            {selectedLocations.length === 0 && (
                                <p className="text-xs text-slate-300 italic">선택된 지역이 없습니다.</p>
                            )}
                            {selectedLocations.map(loc => (
                                <Badge key={loc} variant="secondary" className="bg-orange-50 text-orange-600 border-orange-100 gap-1.5 px-3 py-1.5 rounded-full font-bold animate-in fade-in zoom-in duration-200">
                                    {loc} <button onClick={() => toggleLocation(loc)} className="hover:text-orange-800 ml-1">×</button>
                                </Badge>
                            ))}
                        </div>

                        <div className="aspect-[4/5] bg-slate-50 rounded-[2.5rem] relative p-6 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden">
                            <div className="grid grid-cols-3 gap-2 w-full">
                                {jnLocations.map(loc => (
                                    <button
                                        key={loc}
                                        onClick={() => toggleLocation(loc)}
                                        className={`py-2 px-1 rounded-xl text-[11px] font-bold transition-all border ${selectedLocations.includes(loc)
                                            ? "bg-orange-500 text-white border-orange-600 shadow-lg scale-105 z-10"
                                            : "bg-white text-slate-500 border-slate-100 hover:border-orange-200 hover:text-orange-500"
                                            }`}
                                    >
                                        {loc}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                <section className="flex-1 flex flex-col min-w-0 bg-slate-50/30">
                    <div className="p-6 bg-white/40 backdrop-blur-md border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-20">
                        <div className="flex items-center gap-4">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <Filter size={16} className="text-slate-400" /> 개설 과목 현황
                            </h3>
                            <Badge className="bg-slate-900 text-white border-none rounded-lg px-2">128개 강좌</Badge>
                        </div>
                        <div className="w-full md:w-64">
                            <Select value={selectedSchool} onValueChange={setSelectedSchool}>
                                <SelectTrigger className="rounded-xl border-slate-200 h-10 bg-white">
                                    <SelectValue placeholder="거점 학교 선택" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-slate-100">
                                    <SelectItem value="전체">학교 전체</SelectItem>
                                    <SelectItem value="목포고">목포고등학교</SelectItem>
                                    <SelectItem value="여수고">여수고등학교</SelectItem>
                                    <SelectItem value="순천고">순천고등학교</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                <SubjectCard key={i} />
                            ))}
                        </div>
                    </div>
                </section>
            </div> */}
        </div>
    );
}

export { NaviUnion };
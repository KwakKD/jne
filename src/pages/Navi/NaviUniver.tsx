import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
// import { RegionSidebar } from "./RegionSideBar";
import { NAV_UNIVERSE_DATA } from "@/data/naviUniverse";
import { GraduationCap, Info, Search } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui";
import { UnivIndexSidebar } from "./RegionUniverseBar";


// 한글 초성 추출 함수
const getInitialSound = (str: string) => {
    const initialSounds = [
        'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
    ];
    const code = str.charCodeAt(0) - 0xAC00;
    if (code < 0 || code > 11171) return str[0]; // 한글이 아닌 경우 첫 글자 반환
    return initialSounds[Math.floor(code / 588)];
};

function NaviUniver() {
    // 1. 선택된 지역 상태 관리
    // const [selectedRegion, setSelectedRegion] = useState("all");
    const [selectedIndex, setSelectedIndex] = useState("all");
    const [selectedUniv, setSelectedUniv] = useState<string | null>('가톨릭대'); // 2열: 선택된 대학명
    const [searchQuery, setSearchQuery] = useState("");

    // const handleRegionChange = (id: string) => {
    //     setSelectedRegion(id);
    //     필요 시 여기서 스크롤 상단 이동 로직 추가 가능
    //     window.scrollTo({ top: 50, behavior: 'smooth' });
    // };

    // const selectedRegionName = NAV_UNIVERSE_REGIONS.find(region => region.id === selectedRegion);
    // const regionName = selectedRegionName ? selectedRegionName.name : "전체";
    // [2열용] 초성/검색에 의해 필터링된 "대학 이름" 리스트 (중복 제거)
    const univNames = useMemo(() => {
        const names = Array.from(new Set(NAV_UNIVERSE_DATA.map(u => u.univName)));
        return names.filter(name => {
            const initial = getInitialSound(name);
            const matchesIndex = selectedIndex === "all" || initial === selectedIndex;
            const matchesSearch = name.includes(searchQuery);
            return matchesIndex && matchesSearch;
        }).sort((a, b) => a.localeCompare(b, 'ko'));
    }, [selectedIndex, searchQuery]);

    // 2. 필터링 로직 (지역 + 검색어)
    // const filteredList = useMemo(() => {
    //     const sortedData = [...NAV_UNIVERSE_DATA].sort((a, b) =>
    //         a.univName.localeCompare(b.univName, 'ko')
    //     );
    //     return sortedData.filter((univ) => {
    //         const univInitial = getInitialSound(univ.univName);
    //         const matchesIndex = selectedIndex === "all" || univInitial === selectedIndex;
    //         const matchesSearch = univ.univName.includes(searchQuery) || univ.majorName.includes(searchQuery);
    //         return matchesIndex && matchesSearch;
    //     });
    // }, [selectedIndex, searchQuery]);

    // [3열용] 선택된 대학의 "학과 데이터" 리스트
    const displayData = useMemo(() => {
        if (!selectedUniv) return [];
        return NAV_UNIVERSE_DATA.filter(u => 
            u.univName === selectedUniv && 
            (u.univName.includes(searchQuery) || u.majorName.includes(searchQuery))
        );
    }, [selectedUniv, searchQuery]);

    // 초성이 바뀔 때 선택된 대학 초기화 (선택 사항)
    const handleIndexChange = (id: string) => {
        setSelectedIndex(id);
        setSelectedUniv(null);
    };

    return (
        <div className="min-h-screen bg-slate-50/50">
            <section className="relative h-48 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1523050853021-db983f65051c?auto=format&fit=crop&q=80&w=2000"
                        alt="University Campus"
                        className="w-full h-full object-cover brightness-[0.3] scale-105"
                    />
                    <div className="absolute inset-0 z-10 bg-gradient-to-br from-slate-950 via-blue-950/80 to-slate-900" />
                </div>

                <div className="relative z-20 text-center text-white space-y-4 px-6">
                    <div className="flex justify-center gap-2 mb-2">
                        <Badge className="bg-emerald-500 hover:bg-emerald-500 text-white border-none px-3 py-1 shadow-lg shadow-emerald-500/20">
                            대학 전공 연계
                        </Badge>
                        <Badge className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-3 py-1">
                            학과별 권장 과목
                        </Badge>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                        대학 및 학과별 <span className="text-blue-300">과목 설계</span>
                    </h1>

                    <p className="text-slate-200 text-lg max-w-2xl mx-auto leading-relaxed">
                        목표하는 대학 전공과 커리어에 꼭 필요한 핵심 과목을 확인하세요.
                    </p>
                </div>
            </section>

            <main className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-[280px_280px_1fr] gap-6 items-start">
                    {/* <RegionSidebar onRegionChange={handleRegionChange} /> */}
                    <UnivIndexSidebar onIndexChange={handleIndexChange} />
                    <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm flex flex-col h-[calc(100vh-200px)] sticky top-28 overflow-hidden">
                        <div className="p-4 border-b bg-slate-50/50 shrink-0">
                            <span className="text-xs font-bold text-slate-500">대학 목록</span>
                        </div>
                        <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                            {univNames.map((name) => (
                                <button
                                    key={name}
                                    onClick={() => setSelectedUniv(name)}
                                    className={`w-full text-left px-4 py-3 rounded-xl transition-all font-bold text-sm
                            ${selectedUniv === name
                                            ? "bg-blue-600 text-white shadow-md"
                                            : "hover:bg-slate-50 text-slate-600"}`}
                                >
                                    {name}
                                </button>
                            ))}
                            {univNames.length === 0 && (
                                <p className="text-center py-10 text-xs text-slate-400">검색 결과 없음</p>
                            )}
                        </div>
                    </div>
                    <section className="flex flex-col h-[calc(100vh-200px)]">
                        {/* 검색창 */}
                        <div className="relative mb-6 shrink-0">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="관심 대학이나 학과명을 검색해보세요"
                                className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* 결과 리스트 */}
                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                            {!selectedUniv ? (
                                <div className="h-full flex flex-col items-center justify-center bg-white rounded-[3rem] border-2 border-dashed border-slate-200 text-slate-400">
                                    <GraduationCap size={48} className="mb-4 opacity-10" />
                                    <p className="font-medium">왼쪽에서 대학을 선택하거나 검색해주세요.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="px-2 mb-2">
                                        <h2 className="text-2xl font-black text-slate-900">{selectedUniv}</h2>
                                        <p className="text-slate-500 text-sm">선택하신 대학의 전공별 권장 과목입니다.</p>
                                    </div>
                                    
                                    <Accordion type="single" collapsible className="space-y-4">
                                        {displayData.map((item) => (
                                            <AccordionItem key={item.id} value={item.id} className="border rounded-[2rem] bg-white px-6 shadow-sm border-slate-200 overflow-hidden">
                                                <AccordionTrigger className="hover:no-underline py-6">
                                                    <div className="flex items-center gap-4 text-left w-full pr-4">
                                                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                                                        <GraduationCap size={20} />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-slate-900 text-lg">{item.univName}</h3>
                                                        <p className="text-sm text-slate-500">{item.majorName}</p>
                                                    </div>
                                                </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="pb-6 pt-2 border-t border-slate-50">
                                                    <div className="mt-4">
                                                    {/* 1. 데이터 분류 로직: 'all' 타입이 있는지 확인 */}
                                                    {item.subjects.some(s => s.type === 'all') ? (
                                                        /* 'all' 타입이 존재하는 경우: 통합 뷰 */
                                                        <div className="space-y-3">
                                                            <p className="text-sm font-bold text-indigo-500 flex items-center gap-1">
                                                                <span className="w-1 h-3 bg-indigo-500 rounded-full" /> 핵심 및 권장과목
                                                            </p>
                                                            <div className="flex flex-wrap gap-1.5">
                                                                {item.subjects.map(s => (
                                                                    <Badge key={s.name} variant="secondary" className="bg-indigo-50 text-sm text-indigo-700 border-none">
                                                                        {s.name}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        /* 기존처럼 구분이 있는 경우: 2컬럼 그리드 뷰 */
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <div className="space-y-3">
                                                                <p className="text-sm font-bold text-rose-500 flex items-center gap-1">
                                                                    <span className="w-1 h-3 bg-rose-500 rounded-full" /> 핵심 권장과목
                                                                </p>
                                                                <div className="flex flex-wrap gap-1.5">
                                                                    {item.subjects.filter(s => s.type === 'core').map(s => (
                                                                        <Badge key={s.name} variant="secondary" className="bg-rose-50 text-sm text-rose-700 border-none">{s.name}</Badge>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <div className="space-y-3">
                                                                <p className="text-sm font-bold text-amber-500 flex items-center gap-1">
                                                                    <span className="w-1 h-3 bg-amber-500 rounded-full" /> 일반 권장과목
                                                                </p>
                                                                <div className="flex flex-wrap gap-1.5">
                                                                    {item.subjects.filter(s => s.type === 'recommended').map(s => (
                                                                        <Badge key={s.name} variant="secondary" className="bg-amber-50 text-sm text-amber-700 border-none">{s.name}</Badge>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* 유의사항(note) 영역은 그대로 유지 */}
                                                    {item.note && (
                                                        <div className="mt-6 p-4 bg-slate-50 rounded-2xl flex gap-3 text-sm text-slate-600 border border-slate-100">
                                                            <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
                                                            {item.note}
                                                        </div>
                                                    )}
                                                </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                    
                                    {displayData.length === 0 && (
                                        <div className="py-20 text-center text-slate-400">
                                            <p>검색 조건에 맞는 학과 정보가 없습니다.</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}

export { NaviUniver }
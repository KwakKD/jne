import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
// import { RegionSidebar } from "./RegionSideBar";
import { NAV_UNIVERSE_DATA } from "@/data/naviUniverse";
import { GraduationCap, Info, Search } from "lucide-react";
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui";
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

    const [selectedIndex, setSelectedIndex] = useState("all");
    const [selectedUniv, setSelectedUniv] = useState<string | null>('가톨릭대'); // 2열: 선택된 대학명
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMajorId, setSelectedMajorId] = useState<string | null>(null);

    const univNames = useMemo(() => {
        const names = Array.from(new Set(NAV_UNIVERSE_DATA.map(u => u.univName)));
        return names.filter(name => {
            const initial = getInitialSound(name);
            const matchesIndex = selectedIndex === "all" || initial === selectedIndex;
            const matchesSearch = name.includes(searchQuery);
            return matchesIndex && matchesSearch;
        }).sort((a, b) => a.localeCompare(b, 'ko'));
    }, [selectedIndex, searchQuery]);

    const displayData = useMemo(() => {
        if (!selectedUniv) return [];
        // 1. 필터링 로직
        const filtered = NAV_UNIVERSE_DATA.filter(u =>
            u.univName === selectedUniv &&
            (u.univName.includes(searchQuery) || u.majorName.includes(searchQuery))
        );

        // 2. 정렬 로직 (학과명 기준 가나다순)
        return [...filtered].sort((a, b) =>
            a.majorName.localeCompare(b.majorName, 'ko')
        );
    }, [selectedUniv, searchQuery]);

    useEffect(() => {
        if (displayData.length > 0) {
            setSelectedMajorId(displayData[0].id); // 첫 번째 학과 자동 선택
        } else {
            setSelectedMajorId(null);
        }
    }, [selectedUniv, displayData]);

    const currentMajor = useMemo(() =>
        displayData.find(m => m.id === selectedMajorId),
        [selectedMajorId, displayData]);

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
                <div className="grid grid-cols-1 md:grid-cols-[240px_280px_1fr] gap-6 items-start">
                    <UnivIndexSidebar onIndexChange={handleIndexChange} />
                    <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm flex flex-col h-[calc(100vh-200px)] sticky top-28 overflow-hidden">
                        <div className="p-4 border-b bg-slate-200/50 shrink-0">
                            <span className="text-sm font-bold text-slate-600">대학 목록</span>
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
                        {/* 검색창 영역 */}
                        <div className="relative mb-6 shrink-0">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="학과명을 검색해보세요"
                                className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* 2분할 컨텐츠 영역 */}
                        {!selectedUniv ? (
                            <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-[3rem] border-2 border-dashed border-slate-200 text-slate-400">
                                <GraduationCap size={48} className="mb-4 opacity-10" />
                                <p className="font-medium">왼쪽에서 대학을 선택해주세요.</p>
                            </div>
                        ) : (
                            <div className="flex-1 grid grid-cols-1 lg:grid-cols-[270px_1fr] gap-4 min-h-0">
                                {/* [왼쪽] 학과 목록 (Master) */}
                                <div className="bg-white rounded-[2rem] border border-slate-200 flex flex-col overflow-hidden shadow-sm">
                                    <div className="p-4 border-b bg-slate-50/50 flex justify-between items-center">
                                        <span className="text-sm font-bold text-slate-600">{selectedUniv} 학과</span>
                                        <Badge  className="text-xs">{displayData.length}개 학과</Badge>
                                    </div>
                                    <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                                        {displayData.map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() => setSelectedMajorId(item.id)}
                                                className={`w-full text-left px-4 py-4 rounded-xl transition-all border ${selectedMajorId === item.id
                                                    ? "bg-blue-50 border-blue-200 text-blue-700 ring-1 ring-blue-100"
                                                    : "bg-transparent border-transparent hover:bg-slate-50 text-slate-600"
                                                    }`}
                                            >
                                                <p className="font-bold text-sm leading-tight">{item.majorName}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* [오른쪽] 상세 정보 (Detail) */}
                                <div className="bg-white rounded-[2rem] border border-slate-200 flex flex-col overflow-hidden shadow-sm relative">
                                    {currentMajor ? (
                                        <div className="flex flex-col h-full">
                                            <div className="p-8 border-b bg-gradient-to-r from-blue-50/50 to-transparent">
                                                <div className="flex items-center gap-3 mb-2 text-blue-600">
                                                    <GraduationCap size={20} />
                                                    <span className="text-lg font-bold tracking-wider uppercase">{selectedUniv}</span>
                                                </div>
                                                <h2 className="text-3xl font-black text-slate-900">{currentMajor.majorName}</h2>
                                            </div>

                                            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                                                {/* 과목 카드 섹션 */}
                                                <div className="grid grid-cols-1 gap-6">
                                                    {currentMajor.subjects.some(s => s.type === 'all') ? (
                                                        <div className="space-y-4">
                                                            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">핵심 및 권장 과목</h4>
                                                            <div className="flex flex-wrap gap-2">
                                                                {currentMajor.subjects.map(s => (
                                                                    <Badge key={s.name} className="px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-none text-sm rounded-lg">
                                                                        {s.name}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <div className="space-y-4">
                                                                <h4 className="text-sm font-bold text-rose-500 uppercase tracking-widest flex items-center gap-2">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500" /> 핵심 권장과목
                                                                </h4>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {currentMajor.subjects.filter(s => s.type === 'core').map(s => (
                                                                        <Badge key={s.name} className="px-4 py-2 bg-rose-50 text-rose-700 border-none text-sm rounded-lg font-bold">
                                                                            {s.name}
                                                                        </Badge>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <div className="space-y-4">
                                                                <h4 className="text-sm font-bold text-amber-600 uppercase tracking-widest flex items-center gap-2">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> 일반 권장과목
                                                                </h4>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {currentMajor.subjects.filter(s => s.type === 'recommended').map(s => (
                                                                        <Badge key={s.name} className="px-4 py-2 bg-amber-50 text-amber-700 border-none text-sm rounded-lg font-bold">
                                                                            {s.name}
                                                                        </Badge>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>

                                                {/* 안내문구 */}
                                                {currentMajor.note && (
                                                    <div className="p-6 bg-blue-50/50 rounded-[1.5rem] border border-blue-100/50 flex gap-4">
                                                        <Info className="text-blue-500 shrink-0 mt-1" size={20} />
                                                        <div className="text-sm text-slate-600 leading-relaxed italic whitespace-pre-wrap">
                                                            {currentMajor.note}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="h-full flex flex-col items-center justify-center text-slate-300">
                                            <p>학과를 선택하여 상세 내용을 확인하세요.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </div>
    )
}

export { NaviUniver }
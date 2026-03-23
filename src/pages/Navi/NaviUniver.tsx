import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { RegionSidebar } from "./RegionSideBar";
import { NAV_UNIVERSE_DATA, NAV_UNIVERSE_REGIONS } from "@/data/naviUniverse";
import { GraduationCap, Info, Search } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui";

function NaviUniver() {
    // 1. 선택된 지역 상태 관리
    const [selectedRegion, setSelectedRegion] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const handleRegionChange = (id: string) => {
        setSelectedRegion(id);
        // 필요 시 여기서 스크롤 상단 이동 로직 추가 가능
        // window.scrollTo({ top: 50, behavior: 'smooth' });
    };

    const selectedRegionName = NAV_UNIVERSE_REGIONS.find(region => region.id === selectedRegion);
    const regionName = selectedRegionName ? selectedRegionName.name : "전체";

    // 2. 필터링 로직 (지역 + 검색어)
    const filteredList = useMemo(() => {
        return NAV_UNIVERSE_DATA.filter((univ) => {
            const matchesRegion = selectedRegion === "all" || univ.region === selectedRegion
            const matchesSearch = univ.univName.includes(searchQuery) || univ.majorName.includes(searchQuery);
            return matchesRegion && matchesSearch;
        });
    }, [selectedRegion, searchQuery]);

    return (
        <div className="min-h-screen bg-slate-50/50">
            <section className="relative h-48 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1523050853021-db983f65051c?auto=format&fit=crop&q=80&w=2000"
                        alt="University Campus"
                        className="w-full h-full object-cover brightness-[0.3] scale-105"
                    />
                    <div className="absolute inset-0 z-10 bg-gradient-to-br from-indigo-600/30 via-slate-900/60 to-slate-900/80" />
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
                        대학 및 학과별 <span className="text-blue-400">과목 설계</span>
                    </h1>

                    <p className="text-slate-300 text-lg font-light max-w-2xl mx-auto leading-relaxed">
                        목표하는 대학 전공과 커리어에 꼭 필요한 핵심 과목을 확인하세요.
                    </p>
                </div>
            </section>

            {/* 2. 메인 콘텐츠 영역: 2컬럼 레이아웃 적용 */}
            <main className="container mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-10">
                    <RegionSidebar onRegionChange={handleRegionChange} />
                    <section className="flex-1 min-w-0">
                        {/* 검색창 */}
                        <div className="relative mb-8">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="관심 대학이나 학과명을 검색해보세요"
                                className="w-full pl-12 pr-6 py-4 bg-white border-none rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* 결과 리스트 */}
                        <div className="space-y-4">
                            {filteredList.length > 0 ? (
                                <Accordion type="single" collapsible className="space-y-4">
                                    {filteredList.map((item) => (
                                        <AccordionItem key={item.id} value={item.id} className="border rounded-3xl bg-white px-6 shadow-sm border-slate-200 overflow-hidden">
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
                                                            <p className="text-xs font-bold text-indigo-500 flex items-center gap-1">
                                                                <span className="w-1 h-3 bg-indigo-500 rounded-full" /> 핵심 및 권장과목
                                                            </p>
                                                            <div className="flex flex-wrap gap-1.5">
                                                                {item.subjects.map(s => (
                                                                    <Badge key={s.name} variant="secondary" className="bg-indigo-50 text-indigo-700 border-none">
                                                                        {s.name}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        /* 기존처럼 구분이 있는 경우: 2컬럼 그리드 뷰 */
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <div className="space-y-3">
                                                                <p className="text-xs font-bold text-rose-500 flex items-center gap-1">
                                                                    <span className="w-1 h-3 bg-rose-500 rounded-full" /> 핵심 권장과목
                                                                </p>
                                                                <div className="flex flex-wrap gap-1.5">
                                                                    {item.subjects.filter(s => s.type === 'core').map(s => (
                                                                        <Badge key={s.name} variant="secondary" className="bg-rose-50 text-rose-700 border-none">{s.name}</Badge>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <div className="space-y-3">
                                                                <p className="text-xs font-bold text-amber-500 flex items-center gap-1">
                                                                    <span className="w-1 h-3 bg-amber-500 rounded-full" /> 일반 권장과목
                                                                </p>
                                                                <div className="flex flex-wrap gap-1.5">
                                                                    {item.subjects.filter(s => s.type === 'recommended').map(s => (
                                                                        <Badge key={s.name} variant="secondary" className="bg-amber-50 text-amber-700 border-none">{s.name}</Badge>
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
                            ) : (
                                <div className="py-20 text-center text-slate-400 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                                    <p>해당 조건에 맞는 대학 정보가 아직 없습니다.</p>
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
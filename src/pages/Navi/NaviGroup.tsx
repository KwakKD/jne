import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Input } from "@/components/ui"
import { CATEGORY_MAP, NAV_UNIVERSE_DATA } from "@/data/naviUniverse";
import { ArrowRightLeft, GraduationCap, HelpCircle, Info, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { WordCloudChart } from "./WordCloudChart";

// 계열별 누르면 비교 초기화

const CATEGORIES = [
    { id: 'engineering', name: '공학' },
    { id: 'natural', name: '자연' },
    { id: 'social', name: '사회' },
    { id: 'humanities', name: '인문' },
    { id: 'medical', name: '의학(보건)' },
    { id: 'education', name: '교육' },
    { id: 'arts_sports', name: '예체능' },
    { id: 'agriculture', name: '농림/수산' },
    { id: 'liberal_arts', name: '자유전공' },
];

interface WordData {
    text: string;
    value: number;
    core: number;
    rec: number;
    etc: number;
}


function NaviGroup() {
    const [selectedCategory, setSelectedCategory] = useState("engineering");
    const [selectedMajor, setSelectedMajor] = useState("");
    const [isCompareMode, setIsCompareMode] = useState(false);
    const [compareMajors, setCompareMajors] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    // --- [데이터 집계 로직] ---
    const getProcessedData = useMemo(() => (majorName?: string): WordData[] => {
        const stats: Record<string, WordData> = {};

        // 1. 데이터 필터링 전략 변경
        const filtered = NAV_UNIVERSE_DATA.filter((d) => {
            if (majorName) {
                // 특정 학과가 지정된 경우 (상세/비교 모드), 계열 상관없이 해당 학과 데이터만 추출
                return d.standardMajor === majorName;
            } else {
                // 학과 지정이 없는 경우 (계열 통합 트렌드), 현재 선택된 계열의 데이터 추출
                return d.standardCategory === selectedCategory;
            }
        });
        // 2. 과목별 가중치 및 카운트 합산
        filtered.forEach((univ) => {
            univ.subjects.forEach((sub) => {
                // 안내 문구(isGeneral)나 너무 긴 문장은 제외
                if (sub.isGeneral || sub.name.length > 15) return;

                if (!stats[sub.name]) {
                    stats[sub.name] = { text: sub.name, value: 0, core: 0, rec: 0, etc: 0 };
                }

                if (sub.type === 'core') {
                    stats[sub.name].value += 5;
                    stats[sub.name].core += 1;
                } else if (sub.type === 'recommended') {
                    stats[sub.name].value += 3;
                    stats[sub.name].rec += 1;
                } else {
                    stats[sub.name].value += 1;
                    stats[sub.name].etc += 1;
                }
            });
        });

        return Object.values(stats);
    }, [selectedCategory]);

    // 현재 카테고리의 학과 리스트 추출
    const majorList = useMemo(() => {
        const majors = Array.from(
            new Set(
                NAV_UNIVERSE_DATA
                    .filter(d => d.standardCategory === selectedCategory)
                    .map(d => d.standardMajor)
            )
        ).filter(Boolean);
        return majors.sort();
    }, [selectedCategory]);

    const universityListForMajor = useMemo(() => {
        if (!selectedMajor) return [];

        // 중복 제거를 위해 Map 사용 (대학명 + 학과명 기준)
        return NAV_UNIVERSE_DATA
            .filter(d => d.standardMajor === selectedMajor)
            .map(d => ({
                univName: d.univName,
                majorName: d.majorName,
                region: d.region
            }));
    }, [selectedMajor]);

    const resetSelection = () => {
        setSelectedMajor("");
        setCompareMajors([]);
        setIsCompareMode(false);
        setSearchQuery("");
    };

    return (
        <div className="min-h-screen bg-slate-50/50 pb-20">
            {/* 히어로 섹션 */}
            {/* <section className="relative h-48 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1454165833767-027ffeb99cbe?auto=format&fit=crop&q=80&w=2000"
                        alt="Education Analysis"
                        className="w-full h-full object-cover brightness-[0.3]"
                    />
                    <div className="absolute inset-0 z-10 bg-gradient-to-br from-indigo-600/30 via-slate-900/60 to-slate-900/80" />
                </div>
                <div className="relative z-20 text-center text-white space-y-4 px-6">
                    <div className="flex justify-center gap-2 mb-2">
                        <Badge className="bg-blue-500 text-white border-none px-3 py-1 shadow-lg shadow-blue-500/20">빅데이터 분석</Badge>
                        <Badge className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-3 py-1">계열별 권장과목 트렌드</Badge>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                        계열별 <span className="text-emerald-400">과목 선택</span> 가이드
                    </h1>
                </div>

            </section> */}
            <section className="relative h-48 flex items-center justify-center overflow-hidden"> {/* 높이를 조금 더 키워(h-60) 시원하게 변경 */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1454165833767-027ffeb99cbe?auto=format&fit=crop&q=80&w=2000"
                        alt="Education Analysis"
                        className="w-full h-full object-cover brightness-[0.25]" // 이미지를 조금 더 어둡게 하여 글자 가독성 향상
                    />
                    {/* 그라데이션 오버레이 보강 */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-br from-indigo-600/30 via-slate-900/60 to-slate-900/80" />
                    {/* <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-900/40 via-slate-900/80 to-slate-50/50" /> */}
                </div>

                <div className="relative z-20 text-center text-white space-y-5 px-6 pt-8">
                    <div className="flex justify-center flex-wrap gap-2 mb-2">
                        <Badge className="bg-emerald-500 text-white border-none px-3 py-1 shadow-lg shadow-emerald-500/20">
                            2026학년도 최신 데이터
                        </Badge>
                        <Badge className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-3 py-1">
                            전국 대학 입시요강 전수 분석
                        </Badge>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                            내 전공의 시작, <br className="md:hidden" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                                과목 선택 네비게이션
                            </span>
                        </h1>
                        <p className="text-slate-100 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed opacity-90">
                            복잡한 입시 정보를 데이터로 요약했습니다. <br className="hidden md:block" />
                            희망 학과를 선택하고 대학이 원하는 핵심 권장과목을 실시간으로 확인하세요.
                        </p>
                    </div>
                </div>
            </section>

            {/* 칩 선택 영역 (Sticky) */}
            <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-start lg:justify-center gap-3 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => {
                                    setSelectedCategory(category.id);
                                    // setSelectedMajor("");
                                    // setCompareMajors([]);
                                }}
                                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200
                                    ${selectedCategory === category.id
                                        ? "bg-slate-900 text-white shadow-lg scale-105"
                                        : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-200"}`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 메인 대시보드 레이아웃 */}
            <main className="container mx-auto p-6 lg:p-10">
                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* [좌측 사이드바] 학과 탐색 */}
                    <aside className="w-full lg:w-80 shrink-0 lg:sticky lg:top-28">
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="p-5 border-b border-slate-50 bg-slate-50/50">
                                <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
                                    <Search size={18} className="text-blue-500" />
                                    학과 탐색
                                    {/* 선택된 정보가 있을 때만 초기화 버튼 표시 */}
                                    {(selectedMajor || compareMajors.length > 0) && (
                                        <button
                                            onClick={resetSelection}
                                            className="text-[11px] text-slate-400 hover:text-rose-500 transition-colors flex items-center gap-1"
                                        >
                                            <ArrowRightLeft size={12} className="rotate-45" />
                                            선택 초기화
                                        </button>
                                    )}
                                </h3>
                                <Input
                                    placeholder="학과명을 검색하세요..."
                                    className="bg-white border-slate-200 text-sm h-10 shadow-sm"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="p-2 max-h-[calc(100vh-320px)] overflow-y-auto custom-scrollbar">
                                {majorList.filter(m => m.includes(searchQuery)).map((major) => {
                                    const isActive = isCompareMode ? compareMajors.includes(major) : selectedMajor === major;
                                    return (
                                        <button
                                            key={major}
                                            onClick={() => {
                                                if (isCompareMode) {
                                                    if (compareMajors.includes(major)) setCompareMajors(prev => prev.filter(m => m !== major));
                                                    else if (compareMajors.length < 2) setCompareMajors(prev => [...prev, major]);
                                                } else setSelectedMajor(major);
                                            }}
                                            className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all mb-1 group flex items-center justify-between
                                                ${isActive
                                                    ? "bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600"
                                                    : "hover:bg-slate-50 text-slate-600 border-l-4 border-transparent"}`}
                                        >
                                            {major}
                                            {isCompareMode && compareMajors.includes(major) && (
                                                <span className="bg-blue-600 text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px]">
                                                    {compareMajors.indexOf(major) + 1}
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </aside>

                    {/* [우측] 분석 영역 */}
                    <section className="flex-1 w-full space-y-6">
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                            {/* 카드 1: 계열 통합 트렌드 */}
                            <Card className="border-none shadow-sm overflow-hidden bg-white">
                                <CardHeader className="bg-slate-900 text-white py-4 border-none">
                                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                                        <HelpCircle size={16} className="text-blue-400" />
                                        {CATEGORY_MAP[selectedCategory as keyof typeof CATEGORY_MAP]} 계열 통합 트렌드
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="h-[450px] p-6">
                                    <WordCloudChart words={getProcessedData()} />
                                </CardContent>
                            </Card>

                            {/* 카드 2: 상세 분석 / 비교 */}
                            <Card className={`border-none shadow-xl transition-all duration-500 overflow-hidden ${isCompareMode ? "ring-2 ring-blue-500" : "bg-white"}`}>
                                <CardHeader className="py-4 flex flex-row items-center justify-between border-b border-slate-50">
                                    <CardTitle className="text-sm font-bold text-slate-800">
                                        {isCompareMode ? "학과별 1:1 비교 분석" : (selectedMajor || "학과 상세 데이터")}
                                    </CardTitle>
                                    <Button
                                        variant={isCompareMode ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => { setIsCompareMode(!isCompareMode); setCompareMajors([]); }}
                                        className={isCompareMode ? "bg-blue-600" : "text-blue-600 border-blue-100 hover:bg-blue-50"}
                                    >
                                        <ArrowRightLeft className="w-4 h-4 mr-2" />
                                        {isCompareMode ? "비교 종료" : "학과 비교하기"}
                                    </Button>
                                </CardHeader>
                                <CardContent className="h-[450px] p-6">
                                    {isCompareMode ? (
                                        <div className="grid grid-cols-2 h-full gap-4 divide-x divide-slate-100">
                                            {[0, 1].map(idx => (
                                                <div key={idx} className="flex flex-col h-full">
                                                    <div className="text-center pb-3">
                                                        <Badge variant="outline" className={compareMajors[idx] ? "border-blue-200 text-blue-700 bg-blue-50" : "text-slate-300 border-dashed"}>
                                                            {compareMajors[idx] || `${idx + 1}순위 선택 대기`}
                                                        </Badge>
                                                    </div>
                                                    <div className="flex-1 min-h-0">
                                                        {compareMajors[idx] ? (
                                                            <WordCloudChart words={getProcessedData(compareMajors[idx])} />
                                                        ) : (
                                                            <div className="h-full flex items-center justify-center text-slate-300 text-xs italic">리스트에서 학과를 선택하세요</div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        selectedMajor ? (
                                            <div className="flex flex-col h-full space-y-4">
                                                {/* 상단: 워드클라우드 */}
                                                <div className="flex-[3] min-h-0">
                                                    <WordCloudChart words={getProcessedData(selectedMajor)} />
                                                </div>

                                                {/* 하단: 포함 대학 리스트 (추가된 부분) */}
                                                <div className="flex-1 min-h-0 border-t pt-4 overflow-hidden flex flex-col">
                                                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                                        <GraduationCap size={12} /> 분석 대상 대학 및 모집단위 ({universityListForMajor.length})
                                                    </h4>
                                                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                                                        <div className="grid grid-cols-3 gap-2">
                                                            {universityListForMajor.map((univ, idx) => (
                                                                <div key={idx} className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex flex-col">
                                                                    <span className="text-[13px] font-bold text-slate-700">{univ.univName}</span>
                                                                    <span className="text-[12px] text-slate-600 truncate">{univ.majorName}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center">
                                                <Info size={40} className="mb-4 opacity-10 text-slate-900" />
                                                <p className="text-sm px-10 leading-relaxed text-slate-400">
                                                    왼쪽 리스트에서 상세 분석을 원하는 <br /> 학과를 선택해 주세요.
                                                </p>
                                            </div>
                                        )
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* 가이드 카드 */}
                        <Card className="bg-blue-50/50 border-blue-100 border-dashed">
                            <CardContent className="p-6 flex items-start gap-4 text-sm text-blue-800 leading-relaxed">
                                <div className="bg-blue-100 p-2 rounded-lg text-blue-600 shrink-0">
                                    <Info size={20} />
                                </div>
                                <div>
                                    <p className="font-bold mb-1">데이터 분석 가이드</p>
                                    <p className="opacity-80 italic">
                                        * 워드클라우드의 단어를 클릭하거나 마우스를 올리면 대학별 세부 지정 현황을 볼 수 있습니다.<br />
                                        * <strong>핵심 권장:</strong> 대학에서 해당 전공 이수를 위해 필수적으로 권장하는 과목입니다.<br />
                                        * <strong>권장 과목:</strong> 전공 관련 역량을 높이기 위해 이수를 권장하는 과목입니다.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                </div>
            </main>
        </div>
    );
}

export { NaviGroup };
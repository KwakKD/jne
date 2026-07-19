import { fetchSchoolCurriculum } from "@/api/supabaseAPI";
import { Badge, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui"
import { SCHOOL_LOCATION_DATA } from "@/data/Curri/mapConfig";
import { YEARS } from "@/data/data";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { NaviCurriTable } from "./NaviCurriTable";
import { useNaviCurriStore } from "@/store/NaviCurriStore";
import { CurriRight } from "./CurriRight";

// --- 필터 그룹 컴포넌트 ---
const FilterGroup = ({ label, value, onChange, options }: any) => (
    <div className="space-y-1.5">
        <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider ml-1">{label}</label>
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full h-11 py-5.5 rounded-2xl border-none bg-slate-200 font-medium text-slate-700 focus:ring-2 focus:ring-orange-500/20 transition-all">
                <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-100">
                <SelectItem value="선택">선택</SelectItem>
                {options.map((opt: string) => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
);

function NaviCurri() {
    const selectedSchool = useNaviCurriStore((state) => state.selectedSchool)
    const setSelectedSchool = useNaviCurriStore((state) => state.setSelectedSchool)
    const selectedYear = useNaviCurriStore((state) => state.selectedYear)
    const setSelectedYear = useNaviCurriStore((state) => state.setSelectedYear)
    const curri = useNaviCurriStore((state) => state.curri)
    const setCurri = useNaviCurriStore((state) => state.setCurri)

    const [searchSchoolText, setSearchSchoolText] = useState("");
    const [queryTrigger, setQueryTrigger] = useState({ school: "", year: "" });

    const { data: curriCulumData, isLoading: isCurriculumLoading } = useQuery({
        queryKey: ['NavischoolCurriculum', queryTrigger.school, queryTrigger.year],
        queryFn: () => fetchSchoolCurriculum(queryTrigger.school, queryTrigger.year),
        enabled: !!queryTrigger.school && queryTrigger.school !== "선택" && queryTrigger.school !== "지역을 선택하세요." && !!queryTrigger.year && queryTrigger.year !== "선택",
        staleTime: 1000 * 60 * 5
    });

    useEffect(() => {
        if (curriCulumData) {
            setCurri(curriCulumData);
        } else {
            setCurri([]);
        }
    }, [curriCulumData, setCurri]);

    // 조회 버튼 클릭 핸들러
    const handleSearchSubmit = () => {
        // 인풋창에 입력된 학교명을 스토어 상태에 연동해 준 뒤 조회 쿼리를 트리거합니다.
        const schoolTarget = searchSchoolText.trim();

        if (!schoolTarget) {
            alert("조회할 학교명을 입력하거나 선택해 주세요.");
            return;
        }
        if (!selectedYear || selectedYear === "선택") {
            alert("대상 연도(입학년도)를 선택해 주세요.");
            return;
        }

        // 스토어의 현재 학교명 업데이트
        setSelectedSchool(schoolTarget);
        setQueryTrigger({ school: schoolTarget, year: selectedYear });
    };

    // 데이터가 로드되었을 때 검색어 인풋 초기 상태 맞춤 (원하는 경우 유지)
    useEffect(() => {
        if (selectedSchool) {
            setSearchSchoolText(selectedSchool);
        }
    }, [selectedSchool]);

    return (
        <div className="h-screen bg-slate-50/50 flex flex-col overflow-hidden">
            <section className="relative h-38 flex items-center justify-center overflow-hidden flex-shrink-0">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=2000"
                        alt="Curriculum Planning"
                        className="w-full h-full object-cover brightness-[0.35]"
                    />
                    <div className="absolute inset-0 z-0 bg-gradient-to-r from-indigo-900/50 via-slate-900/60 to-orange-900/20" />
                </div>

                <div className="relative z-10 text-center text-white space-y-3 px-6">
                    <div className="flex justify-center gap-2 mb-2">
                        <Badge className="bg-orange-500 hover:bg-orange-500 text-white border-none px-4 py-1 shadow-lg shadow-orange-900/20">
                            2022 개정 교육과정
                        </Badge>
                        <Badge className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-1">
                            학교별 편성표 검색
                        </Badge>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight">
                        고등학교 <span className="text-orange-400">교육과정 편성표</span>
                    </h1>
                    <p className="text-slate-100 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                        우리 학교가 어떤 과목을 몇 학점 편성했는지 한눈에 비교하고 검색해 보세요.
                    </p>
                </div>
            </section>

            <header className="h-24 flex-shrink-0 bg-white border-b border-slate-200 px-6 flex items-center shadow-sm z-30">
                <div className="container mx-auto flex items-end justify-between pb-2">

                    {/* [왼쪽 영역] 필터 그룹들을 한데 모으고 사이 간격을 줍니다 */}
                    <div className="flex items-end gap-6 max-w-4xl flex-1">

                        {/* 1. 학교 검색 인풋 */}
                        <div className="w-80 space-y-1.5 flex-shrink-0">
                            <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider ml-1">학교 검색</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    list="school-list"
                                    placeholder="학교명 입력..."
                                    value={searchSchoolText}
                                    onChange={(e) => setSearchSchoolText(e.target.value)}
                                    className="w-full h-11 px-4 pr-10 rounded-2xl bg-slate-200 border-none font-medium text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                                />
                                <datalist id="school-list">
                                    {SCHOOL_LOCATION_DATA.map((s) => (
                                        <option key={s.id} value={s.name} label={s.regionId} />
                                    ))}
                                </datalist>
                                <Search size={16} className="absolute right-3.5 top-3.5 text-slate-400" />
                            </div>
                        </div>

                        {/* 2. 대상 연도 선택 셀렉트 */}
                        <div className="w-48 flex-shrink-0">
                            <FilterGroup label="대상연도(입학년도)" value={selectedYear} onChange={setSelectedYear} options={YEARS} />
                        </div>

                    </div>

                    {/* [가운데 여백] justify-between에 의해 자동으로 넓은 공간이 생깁니다 */}

                    {/* [오른쪽 영역] 조회하기 버튼을 우측 끝에 고정합니다 */}
                    <div className="w-36 flex-shrink-0">
                        <button
                            onClick={handleSearchSubmit}
                            className="w-full h-11 rounded-2xl bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white font-black text-sm shadow-md shadow-orange-500/10 transition-all flex items-center justify-center gap-1.5"
                        >
                            {isCurriculumLoading ? (
                                <Loader2 size={16} className="animate-spin" />
                            ) : (
                                <Search size={16} />
                            )}
                            조회하기
                        </button>
                    </div>

                </div>
            </header>

            <main className="flex-1 flex overflow-hidden">
                {/* [왼쪽 분할] 편성표 목록 패널 (50% 너비) */}
                <section className="w-[50%] h-full overflow-y-auto p-6 border-r border-slate-200 custom-scrollbar bg-slate-50/30">
                    <NaviCurriTable data={curri} selectedSchool={selectedSchool} selectedYear={selectedYear} />
                </section>

                {/* [오른쪽 분할] 상세 정보 패널 (50% 너비) */}
                <section className="w-[50%] h-full bg-white p-6 overflow-y-auto custom-scrollbar flex flex-col">
                    <CurriRight />
                </section>
            </main>
        </div>
    )
}

export { NaviCurri }
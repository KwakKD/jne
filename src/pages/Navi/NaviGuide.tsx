import { useEffect, useState } from "react";
import { type SubjectDetail } from "@/type/nav";
import { FileText, LayoutGrid, ChevronRight } from "lucide-react";
import { NAVI_SUBJECT_DATA } from "@/data/nav";
import { Tabs, TabsContent, TabsList, TabsTrigger, Badge } from "@/components/ui";
import { NavSubjectDetail } from "./SubjectDetail";

function NaviGuide() {
    const groups = Array.from(new Set(NAVI_SUBJECT_DATA.map(s => s.subjectGroup)));
    const [activeGroup, setActiveGroup] = useState<string>(groups[0]);
    const [selectedSubject, setSelectedSubject] = useState<SubjectDetail | null>(null);

    // 3. 탭이 바뀌거나 처음 로드될 때 첫 번째 과목 자동 선택
    useEffect(() => {
        const firstSubjectOfGroup = NAVI_SUBJECT_DATA.find(s => s.subjectGroup === activeGroup);
        if (firstSubjectOfGroup) {
            setSelectedSubject(firstSubjectOfGroup);
        }
    }, [activeGroup]); // activeGroup이 변경될 때마다 실행
    return (
        <div className="min-h-screen bg-slate-50/50">
            {/* 1. 상단 히어로 섹션 (이미지 배경) */}
            <section className="relative h-48 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=2000"
                        alt="Background"
                        className="w-full h-full object-cover brightness-[0.3]" // 이미지를 조금 더 어둡게 하여 텍스트 집중도 향상
                    />
                    {/* 신뢰감을 주는 Deep Ocean & Slate 그라데이션 */}
                    <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900/90 via-blue-400/70 to-slate-800/80" />
                </div>

                <div className="relative z-10 text-center text-white space-y-3">
                    {/* 배지 색상도 신뢰감 있는 로얄 블루로 변경 */}
                    <Badge className="bg-indigo-600 hover:bg-indigo-600 text-white border-none px-4 py-1 mb-4 shadow-lg shadow-indigo-500/20">
                        2022 개정 교육과정
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-black drop-shadow-md">
                        교과군별 과목 안내
                    </h1>
                    <p className="text-slate-200 text-lg max-w-xl mx-auto leading-relaxed">
                        나의 꿈과 진로에 맞는 <span className="text-blue-300 font-medium">최적의 과목</span>을 찾아보세요.
                    </p>
                </div>
            </section>

            {/* 2. 메인 콘텐츠 (왼쪽 사이드바 탭 구조) */}
            <main className="container mx-auto px-6 py-12">
                <Tabs
                    value={activeGroup}
                    onValueChange={setActiveGroup}
                    className="grid grid-cols-1 md:grid-cols-[170px_270px_1fr] gap-6 items-start"
                >
                    {/* [1열] 교과군 사이드바 - 기존 유지하되 너비 조절 */}
                    <aside className="w-44 shrink-0 sticky top-32">
                        <div className="flex items-center gap-2 px-2 mb-4 text-blue-950">
                            <LayoutGrid size={14} />
                            <span className="text-[13px] font-bold uppercase tracking-widest">교과군</span>
                        </div>
                        <TabsList className="flex flex-col h-auto w-full bg-transparent p-0 gap-1  items-stretch justify-start">
                            {groups.map(group => (
                                <TabsTrigger
                                    key={group}
                                    value={group}
                                    className="w-full justify-between px-3 py-2.5 text-sm data-[state=active]:bg-white shadow-none border-none"
                                    // onClick={() => setSelectedSubject(null)}
                                >
                                    {group}
                                    <ChevronRight size={14} className="opacity-80" />
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </aside>
                    {/* [2열] 과목 리스트 - flex 구조와 overflow 위치 수정 */}
                    <div className="w-70 shrink-0 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[calc(100vh-150px)] sticky top-24 overflow-hidden">
                        {/* 제목 영역: shrink-0으로 높이 고정 */}
                        <div className="p-4 border-b bg-slate-50/50 shrink-0">
                            <span className="text-sm font-bold text-slate-500">과목 리스트</span>
                        </div>

                        {/* 실제 스크롤이 일어나는 영역: flex-1과 overflow-y-auto 부여 */}
                        <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                            {groups.map(group => (
                                <TabsContent
                                    key={group}
                                    value={group}
                                    className="m-0 border-none shadow-none focus-visible:outline-none"
                                >
                                    {NAVI_SUBJECT_DATA
                                        .filter(s => s.subjectGroup === group)
                                        .map((subject, idx) => {
                                            const isSelected = selectedSubject?.subjectName === subject.subjectName;

                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => setSelectedSubject(subject)}
                                                    className={`
                    w-full text-left px-4 py-3 rounded-xl mb-2 transition-all duration-200
                    flex flex-col gap-1.5 border-2
                    ${isSelected
                                                            ? "bg-blue-50 border-blue-500 shadow-sm ring-1 ring-blue-500/10"
                                                            : "bg-white border-slate-200 hover:border-blue-200 hover:bg-slate-50/80 shadow-[0_2px_4px_rgba(0,0,0,0.02)]"}
                `}
                                                >
                                                    {/* 과목명 */}
                                                    <span className={`font-bold text-[16px] ${isSelected ? "text-blue-700" : "text-slate-700"}`}>
                                                        {subject.subjectName}
                                                    </span>

                                                    {/* 태그 영역 */}
                                                    <div className="flex flex-wrap gap-1.5 items-center">
                                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">
                                                            {subject.subjectType}
                                                        </span>

                                                        {subject.suneung !== '-' && (
                                                            <span className="text-[10px] text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded font-bold border border-rose-100">
                                                                수능
                                                            </span>
                                                        )}

                                                        {subject.achievement !== '' && (
                                                            <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-bold border border-emerald-100">
                                                                성취도 {subject.achievement}
                                                            </span>
                                                        )}

                                                        {subject.rank !== '-' && (
                                                            <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-bold border border-blue-100">
                                                                {subject.rank}
                                                            </span>
                                                        )}
                                                    </div>
                                                </button>
                                            );
                                        })
                                    }
                                </TabsContent>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 h-full overflow-y-auto pr-2">
                        {selectedSubject ? (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                {/* 여기에 기존에 작성하신 상세 카드 컴포넌트 배치 */}
                                <NavSubjectDetail selectedSubject={selectedSubject} />
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400 bg-slate-50/50 rounded-3xl border border-dashed">
                                <FileText size={48} className="mb-4 opacity-20" />
                                <p>왼쪽 리스트에서 과목을 선택해주세요.</p>
                            </div>
                        )}
                    </div>
                </Tabs>
            </main>
        </div>
    );
}

export { NaviGuide }
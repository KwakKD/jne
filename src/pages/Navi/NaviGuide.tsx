import { useState } from "react";
import { type SubjectDetail } from "@/type/nav";
import { GraduationCap, Briefcase, FileText, LayoutGrid, ChevronRight } from "lucide-react";
import { NAVI_SUBJECT_DATA } from "@/data/nav";
import { Card, CardTitle, Tabs, TabsContent, TabsList, TabsTrigger, Badge, Separator } from "@/components/ui";

function NaviGuide() {
    const [selectedSubject, setSelectedSubject] = useState<SubjectDetail | null>(null);
    const groups = Array.from(new Set(NAVI_SUBJECT_DATA.map(s => s.subjectGroup)));

    return (
        <div className="min-h-screen bg-slate-50/50">
            {/* 1. 상단 히어로 섹션 (이미지 배경) */}
            <section className="relative h-48 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=2000"
                        alt="Background"
                        className="w-full h-full object-cover brightness-[0.4]"
                    />
                    <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-600/20 to-slate-900/60" />
                </div>

                <div className="relative z-10 text-center text-white space-y-3">
                    <Badge className="bg-blue-500 hover:bg-blue-500 text-white border-none px-4 py-1 mb-4">
                        2022 개정 교육과정
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight">교과군별 과목 안내</h1>
                    <p className="text-slate-200 text-lg font-light max-w-xl mx-auto">
                        나의 꿈과 진로에 맞는 최적의 과목을 찾아보세요.
                    </p>
                </div>
            </section>

            {/* 2. 메인 콘텐츠 (왼쪽 사이드바 탭 구조) */}
            <main className="container mx-auto px-6 py-12">
                <Tabs defaultValue={groups[0]} className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12 items-start">

                    {/* 왼쪽 사이드바: 텍스트 간격 확보 */}
                    <aside className="sticky top-32">
                        <div className="flex items-center gap-2 px-2 mb-6 text-slate-400 border-b pb-4">
                            <LayoutGrid size={16} />
                            <span className="text-xs font-bold uppercase tracking-widest">교과군 카테고리</span>
                        </div>

                        <TabsList className="flex flex-col h-auto w-full bg-transparent p-0 gap-2 items-stretch justify-start">
                            {groups.map(group => (
                                <TabsTrigger
                                    key={group}
                                    value={group}
                                    onClick={() => setSelectedSubject(null)}
                                    className="
                        w-full justify-between px-4 py-3.5 text-base font-medium border border-transparent 
                        /* 아래 속성들이 핵심: 텍스트가 위로 쏠리지 않게 함 */
                        flex items-center 
                        data-[state=active]:border-slate-200 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all
                    "
                                >
                                    {group}
                                    <ChevronRight size={16} className="opacity-50" />
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </aside>

                    {/* 오른쪽 콘텐츠: 제목 강조 및 카드 정렬 */}
                    <div className="min-w-0">
                        {groups.map(group => (
                            <TabsContent key={group} value={group} className="m-0 focus-visible:outline-none">
                                {/* 선택된 과목이 없을 때: 과목 리스트 보여주기 */}
                                {!selectedSubject || selectedSubject.subjectGroup !== group ? (
                                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="mb-10">
                                            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{group} 교과군</h2>
                                            <p className="text-slate-500 mt-2">안내할 과목을 선택하시면 상세 내용을 확인할 수 있습니다.</p>
                                        </div>

                                        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                                            {NAVI_SUBJECT_DATA.filter(s => s.subjectGroup === group).map((subject, idx) => (
                                                <Card
                                                    key={idx}
                                                    className="group relative hover:border-blue-500 cursor-pointer transition-all bg-white border-slate-200 shadow-sm overflow-hidden"
                                                    onClick={() => setSelectedSubject(subject)}
                                                >
                                                    <div className="flex h-full">
                                                        {/* 1. 왼쪽 포인트 바: p-6 밖으로 빼서 왼쪽 끝에 밀착 */}
                                                        <div className="w-1.5 bg-slate-100 group-hover:bg-green-700 transition-colors shrink-0" />

                                                        <div className="flex-1 p-4">
                                                            <div className="flex justify-between items-center mb-4">
                                                                <div className="flex items-center gap-1.5">
                                                                    <Badge variant="secondary" className="bg-emerald-200 text-slate-600 px-2 py-0.5 text-[10px] font-bold">
                                                                        {subject.subjectType}
                                                                    </Badge>
                                                                    {subject.suneung !== '-' && (
                                                                        <Badge className="bg-orange-100 text-orange-600 border border-orange-200 px-2 py-0.5 text-[10px] font-bold">
                                                                            수능
                                                                        </Badge>
                                                                    )}
                                                                </div>
                                                                <div className="flex items-center gap-1 text-indigo-500 group-hover:text-blue-500 transition-colors">
                                                                    <span className="text-[10px] font-medium mr-1">{subject.credits}학점</span>
                                                                    <ChevronRight size={16} />
                                                                </div>
                                                            </div>

                                                            <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                                                                {subject.subjectName}
                                                            </CardTitle>

                                                            {/* <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                                                                {subject.subjectInfo}
                                                            </p> */}
                                                        </div>
                                                    </div>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    /* 과목이 선택되었을 때: 상세 내용 보여주기 */
                                    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                                        {/* 뒤로가기 버튼 */}
                                        <button
                                            onClick={() => setSelectedSubject(null)}
                                            className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors mb-6 group"
                                        >
                                            <ChevronRight size={20} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                                            <span className="text-sm font-medium">목록으로 돌아가기</span>
                                        </button>

                                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                                            {/* 상세 헤더 */}
                                            <div className="bg-slate-900 p-8 text-white">
                                                {/* 배지 컨테이너: 배지들을 그룹화하고 하단 여백 부여 */}
                                                <div className="flex flex-wrap items-center gap-2 mb-4">
                                                    {/* 1. 과목 유형: 부드러운 하늘색 */}
                                                    <Badge className="bg-sky-500/20 text-sky-300 border border-sky-500/30 hover:bg-sky-500/20 px-2.5 py-0.5 shadow-sm">
                                                        {selectedSubject.subjectType}
                                                    </Badge>

                                                    {/* 2. 성취도: 산뜻한 에메랄드색 */}
                                                    <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20 px-2.5 py-0.5 shadow-sm">
                                                        성취도 {selectedSubject.achievement}
                                                    </Badge>

                                                    {/* 3. 등급: 신뢰감을 주는 인디고(보라)색 */}
                                                    {selectedSubject.rank !== '-' && (
                                                        <Badge className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/20 px-2.5 py-0.5 shadow-sm">
                                                            석차 {selectedSubject.rank}
                                                        </Badge>
                                                    )}

                                                    {/* 4. 수능출제: 시인성이 가장 높은 노란색(Amber) */}
                                                    {selectedSubject.suneung !== '-' && (
                                                        <Badge className="bg-amber-500 text-slate-950 border-none font-black px-2.5 py-0.5 hover:bg-amber-600 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                                                            수능출제
                                                        </Badge>
                                                    )}
                                                </div>

                                                <h2 className="text-4xl font-bold mb-3 tracking-tight">{selectedSubject.subjectName}</h2>
                                                <p className="text-slate-400 font-medium">학점 범위: <span className="text-slate-200">{selectedSubject.credits}학점</span></p>
                                            </div>

                                            {/* 상세 본문 */}
                                            <div className="p-8 space-y-12">
                                                {/* 1. 과목 요약 및 추천 타겟 (Alert 스타일 활용) */}
                                                <section className="space-y-6">
                                                    <div className="space-y-3">
                                                        <div className="flex items-center gap-2 text-slate-900">
                                                            <FileText className="text-blue-600" size={20} />
                                                            <h3 className="text-xl font-bold">과목 상세 개요</h3>
                                                        </div>
                                                        <p className="text-slate-600 leading-relaxed text-lg bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                                                            {selectedSubject.subjectInfo}
                                                        </p>
                                                    </div>

                                                    {/* 추천 타겟: shadcn Alert 스타일 느낌의 카드 */}
                                                    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 flex gap-4 items-start">
                                                        <div className="bg-emerald-500 p-2 rounded-xl shrink-0">
                                                            <GraduationCap className="text-white" size={20} />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-emerald-900 mb-1">이런 학생에게 추천해요!</h4>
                                                            <p className="text-emerald-800/80 text-sm leading-relaxed">
                                                                {selectedSubject.recommand}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </section>

                                                <Separator className="bg-slate-100" />

                                                {/* 2. 학습 내용 (Accordion 또는 깔끔한 리스트 카드) */}
                                                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    <div className="space-y-4">
                                                        <div className="flex items-center gap-2 px-1">
                                                            <div className="w-1 h-5 bg-blue-500 rounded-full" />
                                                            <h4 className="font-bold text-slate-800">핵심 아이디어</h4>
                                                        </div>
                                                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                                            {selectedSubject.coreIdea.split('\n').map((line, i) => (
                                                                <div key={i} className="px-5 py-4 border-b border-slate-50 last:border-none flex gap-3 items-start hover:bg-slate-50 transition-colors">
                                                                    <span className="text-blue-500 font-bold text-xs mt-1">Q{i + 1}</span>
                                                                    <span className="text-sm text-slate-600 font-medium leading-snug">{line}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-4">
                                                        <div className="flex items-center gap-2 px-1">
                                                            <div className="w-1 h-5 bg-indigo-500 rounded-full" />
                                                            <h4 className="font-bold text-slate-800">지식 · 이해</h4>
                                                        </div>
                                                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                                            {selectedSubject.knowledge.split('\n').map((line, i) => (
                                                                <div key={i} className="px-5 py-4 border-b border-slate-50 last:border-none flex gap-3 items-start hover:bg-slate-50 transition-colors">
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                                                                    <span className="text-sm text-slate-600 leading-snug">{line}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </section>

                                                {/* 3. 진로 로드맵 (산뜻한 화이트 & 스카이블루 스타일) */}
                                                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                                                    {/* 관련 학과 및 계열 */}
                                                    <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
                                                        <div className="flex items-center gap-3 mb-8">
                                                            <div className="p-3 bg-slate-100 rounded-2xl">
                                                                <GraduationCap className="text-slate-600" size={22} />
                                                            </div>
                                                            <div>
                                                                <h3 className="text-lg font-bold text-slate-900 leading-none mb-1">관련 학과 및 계열</h3>
                                                                <p className="text-xs text-slate-400">Academic Pathways</p>
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-wrap gap-2">
                                                            {selectedSubject.relatedDept.split(',').map((dept, i) => (
                                                                <span
                                                                    key={i}
                                                                    className="px-4 py-2 bg-slate-50 text-slate-600 rounded-full text-sm font-medium border border-slate-100 hover:border-slate-300 hover:bg-white transition-all cursor-default"
                                                                >
                                                                    {dept.trim()}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* 추천 직업군 */}
                                                    <div className="bg-sky-50/30 rounded-[2.5rem] border border-sky-100 p-8 shadow-sm">
                                                        <div className="flex items-center gap-3 mb-8">
                                                            <div className="p-3 bg-sky-50 rounded-2xl border border-sky-100">
                                                                <Briefcase className="text-sky-600" size={22} />
                                                            </div>
                                                            <div>
                                                                <h3 className="text-lg font-bold text-sky-900 leading-none mb-1">추천 직업군</h3>
                                                                <p className="text-xs text-sky-400">Future Careers</p>
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-wrap gap-2">
                                                            {selectedSubject.relatedJob.split(',').map((job, i) => (
                                                                <span
                                                                    key={i}
                                                                    className="px-4 py-2 bg-white text-sky-700 rounded-full text-sm font-bold border border-sky-200 shadow-sm shadow-sky-100 hover:scale-105 transition-transform cursor-default"
                                                                >
                                                                    # {job.trim()}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                </section>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </TabsContent>
                        ))}
                    </div>
                </Tabs>
            </main>
        </div>
    );
}

export { NaviGuide }
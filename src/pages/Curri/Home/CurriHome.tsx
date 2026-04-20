import { Badge, Button } from "@/components/ui"
import { useAuth } from "@/hooks/useAuth"
import {
    FileBarChart, Users, BarChart3, Activity,
    PieChart, Info, LayoutGrid, Share2,
    Clock, MapPin, School
} from "lucide-react"
import { MenuCardWithDesc } from "./MenuCardWithDesc"
import { NoticeItem } from "./NoticeItem"
import { MiniStatCard } from "./MiniStatCard"

function CurriHome() {
    const { data: user } = useAuth()

    return (
        // <div className="w-full bg-slate-50/50">
        //     <section className="relative overflow-hidden bg-white border-b border-slate-100 pt-0 lg:pt-0">
        //         <div
        //             className="absolute inset-0 z-0 opacity-[0.2] pointer-events-none"
        //             style={{
        //                 backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)',
        //                 backgroundSize: '30px 30px'
        //             }}
        //         />

        //         <div className="container mx-auto px-0 relative z-10">
        //             <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        //                 <div className="flex-1 text-center lg:text-left">
        //                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold mb-6">
        //                         <ShieldCheck size={16} />
        //                         <span>교원 전용 교육과정 관리 시스템</span>
        //                     </div>
        //                     <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.2] mb-6">
        //                         체계적인 <span className="text-indigo-600">학교 교육과정</span>,<br />
        //                         데이터로 완성합니다.
        //                     </h1>
        //                     <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl">
        //                         2022 개정 교육과정 지침에 따른 과목 편성부터 시수 관리, <br className="hidden md:block" />
        //                         그리고 공동교육과정 운영까지 모든 절차를 지원합니다.
        //                     </p>
        //                 </div>

        //                 <div className="flex-1 max-w-xl w-full">
        //                     <div className="relative p-2 rounded-[2.5rem] bg-slate-200/50 shadow-inner">
        //                         <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-white">
        //                             <div className="flex items-center justify-between mb-8">
        //                                 <div className="flex gap-2">
        //                                     <div className="w-3 h-3 rounded-full bg-rose-400" />
        //                                     <div className="w-3 h-3 rounded-full bg-amber-400" />
        //                                     <div className="w-3 h-3 rounded-full bg-emerald-400" />
        //                                 </div>
        //                                 <Badge variant="outline" className="text-indigo-600">Admin Dashboard</Badge>
        //                             </div>
        //                             <div className="space-y-4">
        //                                 <div className="h-4 w-2/3 bg-slate-100 rounded-full animate-pulse" />
        //                                 <div className="grid grid-cols-3 gap-4">
        //                                     <div className="h-20 bg-indigo-50 rounded-2xl flex items-center justify-center">
        //                                         <Settings2 className="text-indigo-400" size={30} />
        //                                     </div>
        //                                     <div className="h-20 bg-emerald-50 rounded-2xl flex items-center justify-center">
        //                                         <FileBarChart className="text-emerald-400" size={30} />
        //                                     </div>
        //                                     <div className="h-20 bg-rose-50 rounded-2xl flex items-center justify-center">
        //                                         <Users className="text-rose-400" size={30} />
        //                                     </div>
        //                                 </div>
        //                                 <div className="h-4 w-full bg-slate-50 rounded-full" />
        //                                 <div className="h-4 w-5/6 bg-slate-50 rounded-full" />
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </section>

        //     <section className="py-12 bg-white border-b border-slate-100">
        //         <div className="container mx-auto px-6">
        //             <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        //                 <StatItem icon={<ClipboardCheck />} label="편성 완료 학교" value="86" unit="%" color="indigo" />
        //                 <StatItem icon={<PlusCircle />} label="공동교육과정" value="245" unit="건" color="emerald" />
        //                 <StatItem icon={<Users />} label="배정 완료 교사" value="1,240" unit="명" color="rose" />
        //                 <StatItem icon={<BarChart3 />} label="누적 편성 데이터" value="18.4" unit="k" color="amber" />
        //             </div>
        //         </div>
        //     </section>

        //     <section className="py-20">
        //         <div className="container mx-auto px-6">
        //             <div className="flex items-center justify-between mb-12">
        //                 <div>
        //                     <h2 className="text-3xl font-bold text-slate-900">편성 및 관리 도구</h2>
        //                     <p className="text-slate-500 mt-2">단계별 교육과정 편성 업무를 선택하세요.</p>
        //                 </div>
        //                 {!user && (
        //                     <Badge variant="destructive" className="h-8 px-4 rounded-full">로그인 후 이용 가능</Badge>
        //                 )}
        //             </div>

        //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        //                 <MenuCard
        //                     title="학교교육과정 편성"
        //                     desc="연도별, 학년별 기본 교과 및 선택 과목 구조를 설계합니다."
        //                     icon={<Settings2 />}
        //                     path="/curriculum/standard"
        //                     active={!!user}
        //                     onClick={handleCardClick}
        //                     color="indigo"
        //                 />
        //                 <MenuCard
        //                     title="공동교육과정 관리"
        //                     desc="학교 간 경계를 넘는 온·오프라인 공동 과목을 편성합니다."
        //                     icon={<PlusCircle />}
        //                     path="/curriculum/joint"
        //                     active={!!user}
        //                     onClick={handleCardClick}
        //                     color="emerald"
        //                 />
        //                 <MenuCard
        //                     title="과목별 교사 배정"
        //                     desc="편성된 과목별 담당 교사와 수업 시수를 매칭합니다."
        //                     icon={<Users />}
        //                     path="/curriculum/teacher"
        //                     active={!!user}
        //                     onClick={handleCardClick}
        //                     color="rose"
        //                 />
        //                 <MenuCard
        //                     title="통계 및 현황"
        //                     desc="학교별 편성 현황 및 과목 선택 통계 데이터를 분석합니다."
        //                     icon={<FileBarChart />}
        //                     path="/curriculum/stats"
        //                     active={!!user}
        //                     onClick={handleCardClick}
        //                     color="amber"
        //                 />
        //             </div>
        //         </div>
        //     </section>
        // </div>
        <div className="w-full min-h-screen bg-[#f8fafc] pt-0 ">
            {/* 1. 상단 섹션: 환영 문구 & 퀵 통계 */}
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-6 py-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 mb-2">
                                <span className="text-indigo-600">{user?.schoolname || '전남고등학교'}</span> 교육과정 업무 대시보드
                            </h1>
                            <p className="text-slate-500 text-sm mt-1 flex items-center gap-6">
                                <Activity size={14} className="text-emerald-500" />
                                2022 개정 교육과정에 맞춘 과목 편성부터 시수 관리, <br className="hidden md:block" />
                                공동교육과정 운영까지 모든 절차를 지원합니다.
                            </p>
                        </div>
                        {/* 퀵 통계 요약 */}
                        <div className="flex gap-4">
                            <MiniStatCard label="우리학교 편성률" value="85%" color="indigo" />
                            <MiniStatCard label="전체참여학교" value="91개교" color="rose" />
                            <MiniStatCard label="공동교육과정 개설교" value="20개교" color="emerald" />
                            <MiniStatCard label="공동교육과정 개설과목 수" value="120과목" color="emerald" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-2 mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* [좌측 영역: 8개 컬럼] - 메뉴 및 인포그래픽 */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* 메뉴 섹션 (상세 설명 포함) */}
                        <section className="relative overflow-hidden bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                            {/* 1. 배경 추상 패턴 SVG (오른쪽 하단 배치) */}
                            <div className="absolute bottom-[-10%] right-[-5%] w-75 h-75 opacity-[0.1] pointer-events-none z-0">
                                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#6366f1" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90.1,-16.3,88.5,-0.9C86.9,14.4,81,28.8,72.9,41.4C64.8,54.1,54.5,65,42,72.9C29.5,80.8,14.7,85.8,-0.1,86C-15,86.1,-29.9,81.5,-43,73.9C-56,66.3,-67.2,55.7,-74.8,42.9C-82.3,30,-86.2,15,-86.6,-0.2C-86.9,-15.4,-83.8,-30.7,-76.2,-43.6C-68.6,-56.4,-56.6,-66.7,-43.1,-74.2C-29.6,-81.7,-14.8,-86.3,-0.1,-86.1C14.6,-86,29.2,-81.1,44.7,-76.4Z" transform="translate(100 100)" />
                                </svg>
                            </div>

                            {/* 2. 타이틀 영역 (SVG 아이콘 및 애니메이션 추가) */}
                            <div className="flex items-center justify-between mb-10 relative z-10">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-3">
                                        {/* 추상적인 설계 아이콘 SVG */}
                                        <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600 shadow-inner">
                                            <LayoutGrid size={22} strokeWidth={2.5} />
                                        </div>
                                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                                            교육과정 설계 및 관리
                                        </h2>
                                        {/* 실시간 상태를 나타내는 미세 애니메이션 SVG (반짝이는 점) */}
                                        <svg width="8" height="8" viewBox="0 0 8 8" className="animate-pulse ml-1 mt-1">
                                            <circle cx="4" cy="4" r="4" fill="#10b981" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* 2단 그리드로 배치하여 시원시원한 레이아웃 구현 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* --- [A. 편성 및 관리 섹션] --- */}
                                <MenuCardWithDesc
                                    title="과목별 교사 수 입력"
                                    desc="학년별 학급 수와 과목별 담당 교사 정원을 설정하여 편성의 기초를 다집니다."
                                    icon={<Users size={28} />}
                                    color="indigo"
                                    path="/high-school/teacher-count"
                                />
                                <MenuCardWithDesc
                                    title="학교 교육과정 편성"
                                    desc="3개년 교과 편제와 이수 학점을 설계합니다."
                                    icon={<LayoutGrid size={28} />}
                                    color="indigo"
                                    path="/high-school/curriculum"
                                />
                                <MenuCardWithDesc
                                    title="공동교육과정 편성"
                                    desc="타교 연계 오프라인 공동 과목을 개설하고 수강 정원 및 거점 학교를 관리합니다."
                                    icon={<Share2 size={28} />}
                                    color="emerald"
                                    path="/high-school/union-curriculum"
                                />
                                <MenuCardWithDesc
                                    title="학교별 시수 관리"
                                    desc="교사별 주간 수업 시수를 실시간으로 점검하고 조정합니다."
                                    icon={<Clock size={28} />}
                                    color="emerald"
                                    path="/curriculum/teacher"
                                />

                                {/* --- [B. 통계 및 현황 섹션] --- */}
                                <MenuCardWithDesc
                                    title="오프라인 공동교육 현황"
                                    desc="현재 운영 중인 오프라인 공동과목 개설 현황을 확인합니다."
                                    icon={<MapPin size={28} />}
                                    color="purple"
                                    path="/curriculum/joint-status"
                                />
                                <MenuCardWithDesc
                                    title="과목별 통계"
                                    desc="선택 과목에 대한 각종 통계자료를 제공합니다."
                                    icon={<BarChart3 size={28} />}
                                    color="amber"
                                    path="/statistics/subjects"
                                />
                                <MenuCardWithDesc
                                    title="학교별 통계"
                                    desc="학교별 교육과정 편성 통계데이터를 제공합니다."
                                    icon={<School size={28} />}
                                    color="rose"
                                    path="/statistics/schools"
                                />
                                {/* <MenuCardWithDesc
                                    title="편성 진척도 리포트"
                                    desc="전체 교육과정 설계 프로세스 중 미진한 항목과 검토가 필요한 오류를 리포팅합니다."
                                    icon={<ClipboardCheck size={28} />}
                                    color="slate" // 혹은 다른 보조색
                                    path="/statistics/report"
                                /> */}
                            </div>
                        </section>

                        {/* 인포그래픽 섹션 (주석으로 처리했던 디자인 복구 및 개선) */}
                        <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden">
                            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                                <div className="flex-1">
                                    <Badge className="bg-indigo-50 text-indigo-600 mb-4 hover:bg-indigo-50 border-none">Visual Analysis</Badge>
                                    <h3 className="text-xl font-bold text-slate-900 mb-4">교육과정 편성 현황 시각화(넣을지 말지 고민중)</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                        현재 편성된 교육과정 편성 현황을 실시간으로 확인하세요. <br />
                                        과목별 균형 있는 배분을 돕습니다.(예시)
                                    </p>
                                </div>

                                {/* 대시보드 프리뷰 인포그래픽 */}
                                <div className="flex-1 w-full max-w-sm">
                                    <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100 relative">
                                        <div className="flex gap-1.5 mb-6">
                                            <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                                        </div>
                                        <div className="space-y-4">
                                            <div className="h-3 w-3/4 bg-white rounded-full" />
                                            <div className="grid grid-cols-3 gap-3">
                                                {[1, 2, 3].map((i) => (
                                                    <div key={i} className="h-16 bg-white rounded-xl border border-slate-100 flex items-center justify-center shadow-sm">
                                                        <PieChart className="text-indigo-200" size={24} />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="h-3 w-full bg-white rounded-full opacity-50" />
                                        </div>
                                        {/* 부유하는 아이콘 데코 */}
                                        <div className="absolute -right-4 -top-4 w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-bounce">
                                            <FileBarChart className="text-indigo-500" size={20} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* [우측 영역: 4개 컬럼] - 공지사항 & 가이드 */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* 공지사항 */}
                        <NoticeItem />

                        {/* 도움말 가이드 */}
                        <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-lg shadow-indigo-200">
                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                                <Info size={20} />
                            </div>
                            <h4 className="font-bold mb-2">도움이 필요하신가요?(만들지 말지 고민중)</h4>
                            <p className="text-indigo-100 text-xs leading-relaxed mb-4">
                                교육과정 편성 지침이나 시스템 사용법에 대한 가이드북을 내려받으실 수 있습니다.
                            </p>
                            <Button className="w-full bg-white text-indigo-600 hover:bg-indigo-50 border-none font-bold text-xs">
                                매뉴얼 다운로드
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { CurriHome }
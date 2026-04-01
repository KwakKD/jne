import { Button } from "@/components/ui"
import { ArrowRight, BookOpen, Building2, Compass, GraduationCap, LayoutGrid, Map, School, Users } from "lucide-react"
import { HomeSubjectStructureDialog } from "./HomeSubjectStructureDialog"
import { HomeGradeMethodDialog } from "./HomeGradeMethodDialog"

function SubjectNavHome() {
    return (
        <div className="w-full">
            <section className="relative overflow-hidden bg-white border-b border-slate-100 min-h-[70vh] lg:min-h-130 flex items-center py-12">
                <div
                    className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                        backgroundSize: '20px 20px' // 'size'를 'backgroundSize'로 수정
                    }}
                />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="flex-1 text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6">
                                <Compass size={16} />
                                <span>2022 개정 교육과정 가이드</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.2] mb-6">
                                나의 꿈을 잇는 <span className="text-blue-600">전라남도 교육과정</span>,<br />
                                당신의 선택을 돕습니다.
                            </h1>
                            <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl">
                                복잡한 과목 선택, 어디서부터 시작해야 할지 고민인가요? <br className="hidden md:block" />
                                교과 영역별 정보부터 진로 계열별 추천 과목까지, 전라남도의 학생들이 자신만의 교육과정을 설계할 수 있도록 모든 정보를 담았습니다.
                            </p>

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                                <HomeSubjectStructureDialog>
                                    <Button
                                        size="lg"
                                        className="h-14 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-100 transition-all hover:-translate-y-0.5"
                                    >
                                        전체 과목 구조 보기
                                    </Button>
                                </HomeSubjectStructureDialog>

                                <HomeGradeMethodDialog>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="h-14 px-8 rounded-2xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all hover:-translate-y-0.5"
                                    >
                                        성적 산출 방식 보기
                                    </Button>
                                </HomeGradeMethodDialog>
                            </div>
                        </div>

                        {/* 행정 서비스용 세련된 타임라인 인포그래픽 */}
                        <div className="flex-1 relative w-full max-w-xl pl-8 mt-12 lg:mt-0">
                            {/* 배경에 흐르는 듯한 부드러운 라인 (Path) - 시선의 흐름을 유도 */}
                            <svg className="absolute left-[-20px] top-0 h-full w-24 opacity-20 pointer-events-none hidden sm:block" viewBox="0 0 100 600">
                                <path d="M50,0 Q80,150 20,300 T50,600" fill="none" stroke="url(#lineGrad)" strokeWidth="4" strokeDasharray="8 8" />
                                <defs>
                                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#3b82f6" />
                                        <stop offset="100%" stopColor="#10b981" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            <div className="space-y-4">
                                {/* Step 1: 교과군별 교과안내 */}
                                <div className="group relative flex items-center gap-6 p-5 rounded-[2rem] transition-all hover:bg-white hover:shadow-2xl hover:shadow-blue-100/50 border border-transparent hover:border-blue-100 cursor-pointer">
                                    <div className="flex-shrink-0 w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100 group-hover:scale-110 transition-transform">
                                        <BookOpen size={28} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">교과군별 교과 안내</h4>
                                        <p className="text-sm text-slate-500 mt-1">2022 개정 교육과정의 과목 체계를 한눈에 확인하세요.</p>
                                    </div>
                                    <ArrowRight className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" size={20} />
                                </div>

                                {/* Step 2: 대학 및 학과 추천 */}
                                <div className="group relative flex items-center gap-6 p-5 rounded-[2rem] transition-all hover:bg-white hover:shadow-2xl hover:shadow-indigo-100/50 border border-transparent hover:border-indigo-100 cursor-pointer">
                                    <div className="flex-shrink-0 w-14 h-14 bg-indigo-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100 group-hover:scale-110 transition-transform">
                                        <GraduationCap size={28} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">대학 및 학과 추천</h4>
                                        <p className="text-sm text-slate-500 mt-1">목표하는 전공에 꼭 필요한 핵심 과목을 제안해 드립니다.</p>
                                    </div>
                                    <ArrowRight className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" size={20} />
                                </div>

                                {/* Step 3: 계열별 과목추천 */}
                                <div className="group relative flex items-center gap-6 p-5 rounded-[2rem] transition-all hover:bg-white hover:shadow-2xl hover:shadow-purple-100/50 border border-transparent hover:border-purple-100 cursor-pointer">
                                    <div className="flex-shrink-0 w-14 h-14 bg-purple-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-purple-100 group-hover:scale-110 transition-transform">
                                        <LayoutGrid size={28} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors">계열별 과목 추천</h4>
                                        <p className="text-sm text-slate-500 mt-1">인문, 사회, 공학 등 진로 계열별 최적의 선택지를 탐색하세요.</p>
                                    </div>
                                    <ArrowRight className="text-slate-300 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" size={20} />
                                </div>

                                {/* Step 4: 오프라인 공동교육과정 (전남 특화) */}
                                <div className="group relative flex items-center gap-6 p-5 rounded-[2rem] transition-all hover:bg-white hover:shadow-2xl hover:shadow-emerald-100/50 border border-transparent hover:border-emerald-100 cursor-pointer">
                                    <div className="flex-shrink-0 w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-100 group-hover:scale-110 transition-transform">
                                        <Map size={28} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h4 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">오프라인 공동교육과정</h4>
                                            {/* <span className="bg-emerald-50 text-emerald-600 text-[10px] px-2 py-0.5 rounded-md font-bold border border-emerald-100">전남 특화</span> */}
                                        </div>
                                        <p className="text-sm text-slate-500 mt-1">우리 학교에 없는 과목, 가까운 거점 학교에서 찾아보세요.</p>
                                    </div>
                                    <ArrowRight className="text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" size={20} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- 2. 카테고리 그리드 영역 (다음 단계) --- */}
            <section className="py-12 bg-slate-50/50 border-b border-slate-100">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">

                        {/* 분석 대학 수 */}
                        <div className="flex flex-col items-center md:items-start space-y-2">
                            <div className="p-3 bg-blue-100 rounded-2xl text-blue-600 mb-2">
                                <Building2 size={24} />
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-black text-slate-900">45</span>
                                <span className="text-slate-500 font-medium">개교(예시)</span>
                            </div>
                            <p className="text-sm text-slate-500 font-medium">분석 대상 주요 대학</p>
                        </div>

                        {/* 개설 학교 수 */}
                        <div className="flex flex-col items-center md:items-start space-y-2">
                            <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600 mb-2">
                                <School size={24} />
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-black text-slate-900">120</span>
                                <span className="text-slate-500 font-medium">+(예시)</span>
                            </div>
                            <p className="text-sm text-slate-500 font-medium">공동교육과정 참여교</p>
                        </div>

                        {/* 개설 과목 수 */}
                        <div className="flex flex-col items-center md:items-start space-y-2">
                            <div className="p-3 bg-indigo-100 rounded-2xl text-indigo-600 mb-2">
                                <BookOpen size={24} />
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-black text-slate-900">850</span>
                                <span className="text-slate-500 font-medium">건(예시)</span>
                            </div>
                            <p className="text-sm text-slate-500 font-medium">제공 과목 정보(예시)</p>
                        </div>

                        {/* 누적 이용자 (예시) */}
                        <div className="flex flex-col items-center md:items-start space-y-2">
                            <div className="p-3 bg-orange-100 rounded-2xl text-orange-600 mb-2">
                                <Users size={24} />
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-black text-slate-900">12.5</span>
                                <span className="text-slate-500 font-medium">k(예시)</span>
                            </div>
                            <p className="text-sm text-slate-500 font-medium">전남 학생/교사 활용(예시)</p>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}

export { SubjectNavHome }
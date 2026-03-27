import { Button } from "@/components/ui"
import { BookOpen, Building2, Compass, FileText, MousePointer2, School, Users } from "lucide-react"
import { HomeSubjectStructureDialog } from "./HomeSubjectStructureDialog"
import { NAVI_SUBJECT_DATA } from "@/data/nav"
import { HomeGradeMethodDialog } from "./HomeGradeMethodDialog"

function SubjectNavHome() {
    return (
        <div className="w-full">
            {/* --- 1. 히어로 섹션 (Hero Section) --- */}
            <section className="relative overflow-hidden bg-white border-b border-slate-100 min-h-[70vh] lg:min-h-130 flex items-center py-12">
                {/* 배경 패턴 (선택사항: 격자 무늬로 정적인 느낌 강조) */}
                <div
                    className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                        backgroundSize: '20px 20px' // 'size'를 'backgroundSize'로 수정
                    }}
                />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">

                        {/* 텍스트 영역 */}
                        <div className="flex-1 text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6">
                                <Compass size={16} />
                                <span>2022 개정 교육과정 가이드</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.2] mb-6">
                                나의 꿈을 잇는 <span className="text-blue-600">전남 교육과정</span>,<br />
                                당신의 선택을 돕습니다.
                            </h1>
                            <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl">
                                복잡한 과목 선택, 어디서부터 시작해야 할지 고민인가요? <br className="hidden md:block" />
                                교과 영역별 정보부터 진로 계열별 추천 과목까지, 전남의 학생들이 자신만의 교육과정을 설계할 수 있도록 모든 정보를 담았습니다.
                            </p>

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                                <HomeSubjectStructureDialog>
                                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-12 rounded-xl shadow-lg shadow-blue-200">
                                        전체 과목 구조 보기
                                    </Button>
                                </HomeSubjectStructureDialog>
                                <HomeGradeMethodDialog>
                                    <Button variant="outline" size="lg" className="px-8 h-12 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900">
                                        성적 산출 방식 보기
                                    </Button>
                                </HomeGradeMethodDialog>
                                <button onClick={() => console.log(NAVI_SUBJECT_DATA[154])}>test</button>
                            </div>
                        </div>

                        {/* 시각화 영역 (인포그래픽 느낌) */}
                        <div className="flex-1 relative max-w-md w-full">
                            <div className="aspect-square rounded-3xl bg-slate-50 border border-slate-100 p-8 flex items-center justify-center relative">
                                {/* 장식용 아이콘들 (중앙 집중형) */}
                                <div className="absolute top-10 right-10 p-4 bg-white rounded-2xl shadow-sm border border-slate-100 animate-bounce transition-all duration-1000">
                                    <FileText className="text-blue-500" size={32} />
                                </div>
                                <div className="absolute bottom-12 left-8 p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                                    <MousePointer2 className="text-indigo-500" size={32} />
                                </div>

                                {/* 중앙 메인 그래픽 (SVG나 큰 아이콘) */}
                                <div className="text-center">
                                    <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-100">
                                        <Compass size={64} className="text-white" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Navigation Center</span>
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
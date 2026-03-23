import { Button } from "@/components/ui"
import { Compass, FileText, MousePointer2 } from "lucide-react"

function SubjectNavHome() {
    return (
        <div className="w-full">
            {/* --- 1. 히어로 섹션 (Hero Section) --- */}
            <section className="relative overflow-hidden bg-white border-b border-slate-100 py-16 md:py-24">
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
                                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-12 rounded-xl shadow-lg shadow-blue-200">
                                    가이드북 다운로드
                                </Button>
                                <Button variant="outline" size="lg" className="px-8 h-12 rounded-xl border-slate-200 text-slate-600">
                                    전체 과목 구조 보기
                                </Button>
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
            {/* 여기에 카테고리 카드들이 들어갈 예정입니다. */}
        </div>
    )
}

export { SubjectNavHome }
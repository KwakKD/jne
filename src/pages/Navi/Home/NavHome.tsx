import { Badge, Button } from "@/components/ui"
import { ArrowRight, BookOpen, Compass, Sparkles } from "lucide-react"
import { HomeSubjectStructureDialog } from "./HomeSubjectStructureDialog"
import { HomeGradeMethodDialog } from "./HomeGradeMethodDialog"
import { HomeStatsCard } from "./HomeStatsCard"
import { NavNoitce } from "./NavNotice"
import { RelatedSites } from "./RelatedSites"

function NavHome() {
    // 관련 사이트 데이터
    const relatedSites = [
        { title: "전남광주통합특별시교육청", desc: "교육청 홈페이지", url: "https://www.jge.go.kr" },
        { title: "고교학점제 종합포털", desc: "온라인 공동교육과정 수강신청", url: "https://hscredit.jge.go.kr" },
        { title: "에듀넷(티클리어)", desc: "교육과정 관련 자료 안내", url: "https://www.edunet.net/main" },
        { title: "학교알리미", desc: "교육정보 공시 서비스", url: "https://www.schoolinfo.go.kr" },
        { title: "대입정보포털 (adiga)", desc: "대입정보포털, 대학입학안내", url: "https://www.adiga.kr" },
        { title: "커리어넷 진로정보", desc: "진로 관련 안내 사이트", url: "https://www.career.go.kr" },
    ]

    return (
        <div className="w-full min-h-screen bg-slate-50/50">
            {/* 1. HERO SECTION */}
            <section className="relative overflow-hidden bg-gradient-to-br from-amber-100/80 via-sky-200/50 to-indigo-200/80 min-h-[70vh] flex  py-10">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-amber-200/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-sky-300/40 rounded-full blur-3xl pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        <div className="lg:col-span-7 max-w-3xl space-y-6">
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="px-3.5 py-4 rounded-full bg-sky-50/80 backdrop-blur-md border-sky-300 text-sky-800 text-xs font-semibold shadow-xs flex items-center gap-1.5 w-fit">
                                    <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                                    <span>전남광주통합특별시교육청 고등학교 교육과정</span>
                                </Badge>

                                <Badge variant="outline" className="px-3.5 py-4 rounded-full bg-teal-50/80 backdrop-blur-md border-teal-300 text-teal-800 text-xs font-semibold shadow-xs flex items-center gap-1.5 w-fit">
                                    <Compass className="w-3.5 h-3.5 text-teal-600" />
                                    <span>2022 개정 교육과정 가이드</span>
                                </Badge>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.3] text-slate-900">
                                나만의 꿈을 완성하는 <br />
                                <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 bg-clip-text text-transparent">
                                    맞춤형 과목선택 내비게이션
                                </span>
                            </h1>

                            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl">
                                복잡한 과목 선택, 어디서부터 시작해야 할지 고민인가요? <br className="hidden sm:inline" />
                                고등학교별 개설 과목과 교과 영역별 정보, 진로 계열별 추천 과목을 확인해보세요.
                            </p>

                            <div className="flex flex-wrap items-center gap-3 pt-2">
                                <HomeSubjectStructureDialog>
                                    <Button
                                        size="lg"
                                        // onClick={() => navigate("/subject-navigation/curri")}
                                        className="h-12 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 hover:from-blue-700 hover:via-sky-600 hover:to-cyan-600 text-white font-bold text-sm shadow-md shadow-sky-500/25 transition-all gap-2"
                                    >
                                        <Compass className="w-4 h-4" />
                                        전체 과목 구조 보기
                                        <ArrowRight className="w-4 h-4 ml-1" />
                                    </Button>
                                </HomeSubjectStructureDialog>
                                <HomeGradeMethodDialog>
                                    <Button
                                        size="lg"
                                        // onClick={() => navigate("/subject-navigation/guide")}
                                        className="h-12 px-6 rounded-xl bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 hover:from-teal-600 hover:via-emerald-600 hover:to-cyan-600 text-white font-bold text-sm shadow-md shadow-teal-500/25 transition-all gap-2"
                                    >
                                        <BookOpen className="w-4 h-4" />
                                        성적 산출 방식 보기
                                    </Button>
                                </HomeGradeMethodDialog>
                            </div>
                        </div>
                        <div className="lg:col-span-5">
                            <NavNoitce />
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. STATS SECTION (통계 수치 대시보드) */}
            <section className="relative z-20 -mt-17 container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <HomeStatsCard />
                </div>

            </section>
            <RelatedSites relatedSites={relatedSites} />

            {/* 3. RELATED SITES SECTION (관련 사이트 배너) */}
            {/* <section className="bg-slate-100/60 border-t border-slate-200/60 py-12">
                <div className="container mx-auto px-6 space-y-4">
                    <div className="flex items-center gap-2">
                        <Globe2 className="w-4 h-4 text-slate-400" />
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">관련 사이트 바로가기</h4>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {relatedSites.map((site, idx) => (
                            <a
                                key={idx}
                                href={site.url}
                                target="_blank"
                                rel="noreferrer"
                                className="block group"
                            >
                                <Card className="h-24 p-4 border-slate-200/80 bg-white hover:border-amber-300 hover:shadow-sm transition-all rounded-xl flex flex-col justify-between">
                                    <div className="flex items-start justify-between">
                                        <span className="font-bold text-sm text-slate-800 group-hover:text-amber-600 transition-colors">
                                            {site.title}
                                        </span>
                                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-500 transition-colors" />
                                    </div>
                                    <p className="text-xs text-slate-400 line-clamp-1">{site.desc}</p>
                                </Card>
                            </a>
                        ))}
                    </div>
                </div>
            </section> */}
        </div>
    )
}

export { NavHome }
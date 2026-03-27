import { Badge, Button } from "@/components/ui"
import { useAuth } from "@/hooks/useAuth"
import {
    FileBarChart, Settings2, PlusCircle, Users,
    ArrowRight, ShieldCheck, ClipboardCheck, BarChart3
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

function CurriHome() {
    const navigate = useNavigate()
    const { data: user } = useAuth()

    const handleCardClick = (path: string, isPrivate: boolean) => {
        if (isPrivate && !user) {
            toast.error("로그인이 필요한 서비스입니다.", {
                description: "로그인 페이지로 이동합니다.",
            })
            setTimeout(() => navigate('/login'), 1500);
            return
        }
        navigate(path)
    }

    return (
        <div className="w-full bg-slate-50/50">
            {/* --- 1. 히어로 섹션 (업무 중심의 신뢰감 있는 톤) --- */}
            <section className="relative overflow-hidden bg-white border-b border-slate-100 py-16 lg:py-24">
                <div
                    className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)',
                        backgroundSize: '30px 30px'
                    }}
                />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="flex-1 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold mb-6">
                                <ShieldCheck size={16} />
                                <span>교원 전용 교육과정 관리 시스템</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.2] mb-6">
                                체계적인 <span className="text-indigo-600">학교 교육과정</span>,<br />
                                데이터로 완성합니다.
                            </h1>
                            <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl">
                                2022 개정 교육과정 지침에 따른 과목 편성부터 시수 관리, <br className="hidden md:block" />
                                그리고 공동교육과정 운영까지 모든 행정 절차를 원스톱으로 지원합니다.
                            </p>

                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                                {user ? (
                                    <Button size="lg" onClick={() => navigate('/curriculum/standard')} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 h-12 rounded-xl shadow-lg shadow-indigo-200">
                                        편성 관리 시작하기
                                    </Button>
                                ) : (
                                    <Button size="lg" onClick={() => navigate('/login')} className="bg-slate-900 hover:bg-slate-800 text-white px-8 h-12 rounded-xl">
                                        교사 인증 후 입장
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* 시각화 영역: 대시보드 프리뷰 느낌 */}
                        <div className="flex-1 max-w-xl w-full">
                            <div className="relative p-2 rounded-[2.5rem] bg-slate-200/50 shadow-inner">
                                <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-white">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-rose-400" />
                                            <div className="w-3 h-3 rounded-full bg-amber-400" />
                                            <div className="w-3 h-3 rounded-full bg-emerald-400" />
                                        </div>
                                        <Badge variant="outline" className="text-indigo-600">Admin Dashboard</Badge>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="h-4 w-2/3 bg-slate-100 rounded-full animate-pulse" />
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="h-20 bg-indigo-50 rounded-2xl flex items-center justify-center">
                                                <Settings2 className="text-indigo-400" size={30} />
                                            </div>
                                            <div className="h-20 bg-emerald-50 rounded-2xl flex items-center justify-center">
                                                <FileBarChart className="text-emerald-400" size={30} />
                                            </div>
                                            <div className="h-20 bg-rose-50 rounded-2xl flex items-center justify-center">
                                                <Users className="text-rose-400" size={30} />
                                            </div>
                                        </div>
                                        <div className="h-4 w-full bg-slate-50 rounded-full" />
                                        <div className="h-4 w-5/6 bg-slate-50 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 2. 통계 섹션 (실제 업무 현황 느낌) --- */}
            <section className="py-12 bg-white border-b border-slate-100">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <StatItem icon={<ClipboardCheck />} label="편성 완료 학교" value="86" unit="%" color="indigo" />
                        <StatItem icon={<PlusCircle />} label="공동교육과정" value="245" unit="건" color="emerald" />
                        <StatItem icon={<Users />} label="배정 완료 교사" value="1,240" unit="명" color="rose" />
                        <StatItem icon={<BarChart3 />} label="누적 편성 데이터" value="18.4" unit="k" color="amber" />
                    </div>
                </div>
            </section>

            {/* --- 3. 메뉴 그리드 (기능적 접근) --- */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900">편성 및 관리 도구</h2>
                            <p className="text-slate-500 mt-2">단계별 교육과정 편성 업무를 선택하세요.</p>
                        </div>
                        {!user && (
                            <Badge variant="destructive" className="h-8 px-4 rounded-full">로그인 후 이용 가능</Badge>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <MenuCard
                            title="학교교육과정 편성"
                            desc="연도별, 학년별 기본 교과 및 선택 과목 구조를 설계합니다."
                            icon={<Settings2 />}
                            path="/curriculum/standard"
                            active={!!user}
                            onClick={handleCardClick}
                            color="indigo"
                        />
                        <MenuCard
                            title="공동교육과정 관리"
                            desc="학교 간 경계를 넘는 온·오프라인 공동 과목을 편성합니다."
                            icon={<PlusCircle />}
                            path="/curriculum/joint"
                            active={!!user}
                            onClick={handleCardClick}
                            color="emerald"
                        />
                        <MenuCard
                            title="과목별 교사 배정"
                            desc="편성된 과목별 담당 교사와 수업 시수를 매칭합니다."
                            icon={<Users />}
                            path="/curriculum/teacher"
                            active={!!user}
                            onClick={handleCardClick}
                            color="rose"
                        />
                        <MenuCard
                            title="통계 및 현황"
                            desc="학교별 편성 현황 및 과목 선택 통계 데이터를 분석합니다."
                            icon={<FileBarChart />}
                            path="/curriculum/stats"
                            active={!!user}
                            onClick={handleCardClick}
                            color="amber"
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}

// 서브 컴포넌트: 통계 아이템
const StatItem = ({ icon, label, value, unit, color }: any) => (
    <div className="flex flex-col items-center lg:items-start">
        <div className={`p-2 rounded-lg mb-3 bg-${color}-50 text-${color}-600`}>
            {icon}
        </div>
        <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-slate-900">{value}</span>
            <span className="text-slate-500 text-sm font-medium">{unit}</span>
        </div>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">{label}</p>
    </div>
)

// 서브 컴포넌트: 메뉴 카드
const MenuCard = ({ title, desc, icon, path, active, onClick, color }: any) => (
    <div
        onClick={() => onClick(path, true)}
        className={`group p-6 rounded-3xl border transition-all duration-300 ${active
                ? `bg-white border-slate-100 hover:border-${color}-200 hover:shadow-xl cursor-pointer`
                : 'bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed'
            }`}
    >
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors ${active ? `bg-${color}-50 text-${color}-600 group-hover:bg-${color}-600 group-hover:text-white` : 'bg-slate-200 text-slate-400'
            }`}>
            {icon}
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-6">{desc}</p>
        <div className={`flex items-center text-sm font-bold gap-1 ${active ? `text-${color}-600` : 'text-slate-400'}`}>
            {active ? '업무 시작' : '권한 필요'} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
    </div>
)

export { CurriHome }
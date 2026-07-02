import { Button } from "@/components/ui"
import { useAuth } from "@/hooks/useAuth"
import {
    Users, BarChart3, Activity, Info, LayoutGrid, Share2, Clock, MapPin, School,
    Loader2, Sparkles, ExternalLink, Milestone, Bookmark,
    Network,
    Globe
} from "lucide-react"
import { MenuCardWithDesc } from "./MenuCardWithDesc"
import { NoticeItem } from "./NoticeItem"
import { MiniStatCard } from "./MiniStatCard"
import { useQuery } from "@tanstack/react-query"
import { downloadAttachment, fetchSchoolData, fetchStaUnionInfo } from "@/api/supabaseAPI"
import { useEffect, useMemo, useState } from "react"
import { useCurriTableStore } from "@/store/CurriSubjectStore"
import type { SchoolJsonDataType } from "@/type/curri"
import { YEARS } from "@/data/data"
import { useStatistics } from "@/hooks/curriSta"

function CurriHome() {
    const setYearData = useCurriTableStore((state) => state.setYearData)
    const { data: user, isLoading: authLoading } = useAuth()
    const [downloadingId, setDownloadingId] = useState(false);
    const { allCredit_1: stats1_1, allCredit_2: stats1_2 } = useStatistics(YEARS[0])
    const { allCredit_1: stats2_1, allCredit_2: stats2_2 } = useStatistics(YEARS[1])
    const { allCredit_1: stats3_1, allCredit_2: stats3_2 } = useStatistics(YEARS[2])

    const userData = useCurriTableStore((state) => state.userData)

    const { data: dbschoolsData, isLoading: dbschoolsdataLoading } = useQuery({
        queryKey: ['schoolsdata', user?.id],
        queryFn: async () => {
            if (!user?.id) throw new Error('사용자 ID가 없습니다.')
            return fetchSchoolData(user.id)
        },
        enabled: !!user?.id,
        staleTime: 1000 * 60 * 30,
        gcTime: 1000 * 60 * 30,
    })

    const { data: dbStaUnionData, isLoading: dbStaUnionLoading } = useQuery({
        queryKey: ['unionSubjects'],
        queryFn: fetchStaUnionInfo,
        staleTime: 1000 * 60 * 30
    })

    const schoolCount = Array.from(new Set(dbStaUnionData?.map(item => item.school_name))).length
    const schoolCountInfo = `${schoolCount} 개교`
    const UnionSubjectNumber = `${dbStaUnionData?.length} 과목`

    useEffect(() => {
        if (dbschoolsData) {
            dbschoolsData.forEach(item => {
                const inData: SchoolJsonDataType = {
                    "학교지정": item.fix,
                    "선택과목": item.choice,
                    "Group": item.groupdata,
                    "AddSubject": item.addsubjects,
                    "CEA": item.CEA
                }
                setYearData(String(item.year), inData)
            })
        }
    }, [setYearData, dbschoolsData])



    const totalPercent = useMemo(() => {
        let totalCompleted = 0;
        const totalTarget = 192 * 3; // 총 목표 학점: 576

        // 1. 3개년도 순회하며 각 개별 학년도의 창체(CEA) 학점 합산
        YEARS.forEach(year => {
            const yearData = userData[year];
            if (!yearData) return;

            const CEA = yearData.CEA || {};
            const CEA_credit =
                (CEA['1-1'] || 0) + (CEA['1-2'] || 0) +
                (CEA['2-1'] || 0) + (CEA['2-2'] || 0) +
                (CEA['3-1'] || 0) + (CEA['3-2'] || 0);

            totalCompleted += CEA_credit;
        });

        // 2. 상단 훅에서 가져온 3개년치 교과 학점(allCredit_1, allCredit_2) 누적 더하기
        totalCompleted += (stats1_1 + stats1_2 + stats2_1 + stats2_2 + stats3_1 + stats3_2);

        // 3. 🎯 3개년 통합 퍼센트 산출 (최대 100% 제한 및 반올림)
        return totalTarget > 0
            ? Math.min(100, Math.round((totalCompleted / totalTarget) * 100))
            : 0;

    }, [userData, stats1_1, stats1_2, stats2_1, stats2_2, stats3_1, stats3_2]);

    if (authLoading || dbschoolsdataLoading || dbStaUnionLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
                <Loader2 className="animate-spin text-blue-600" size={40} />
                <p className="text-slate-500 font-medium">학교 정보를 불러오는 중입니다...</p>
            </div>
        )
    }

    const usefulLinks = [

        {
            name: "전라남도교육청/학교교육과정",
            desc: "도내 학생 맞춤형 선택 과목 안내 및 계열별 탐색 플랫폼",
            url: "https://www.jge.go.kr/sse/na/ntt/selectNttList.do?mi=785&bbsId=378&searchCate3=4",
            color: "text-emerald-600 bg-emerald-50 border-emerald-100",
            icon: <Network size={18} />
        },
        {
            name: "고교학점제 종합포털",
            desc: "2022 개정 교육과정 총론 가이드 및 학점제 매뉴얼 제공",
            url: "https://hscredit.jge.go.kr",
            color: "text-cyan-600 bg-cyan-50 border-cyan-100",
            icon: <Milestone size={18} />
        },
        {
            name: "에듀넷(티클리어)",
            desc: "도내 교육과정 편성 지침 공문 및 주요 고시사항 확인",
            url: "https://www.edunet.net/main",
            color: "text-indigo-600 bg-indigo-50 border-indigo-100",
            icon: <Globe size={18} />
        },
        {
            name: "학교알리미 (개방형 데이터)",
            desc: "타 학교 교과 편제표 및 이수 학점 편성 현황 벤치마킹",
            url: "https://www.schoolinfo.go.kr",
            color: "text-amber-600 bg-amber-50 border-amber-100",
            icon: <School size={18} />
        },
        {
            name: "대입정보포털 (adiga)",
            desc: "최종 확정된 3개년 학교 교육과정 편제 코드 이관 및 입력",
            url: "https://www.adiga.kr", // 권역별 주소 혹은 대표 주소
            color: "text-purple-600 bg-purple-50 border-purple-100",
            icon: <Clock size={18} />
        },
        {
            name: "커리어넷 진로정보",
            desc: "학생 진로·직업 매칭에 따른 융합선택/진로선택 과목 상담 자료",
            url: "https://www.career.go.kr",
            color: "text-rose-600 bg-rose-50 border-rose-100",
            icon: <Users size={18} />
        }
    ];

    const handleDownload = async (filePath: string, fileName: string) => {
        try {
            setDownloadingId(true)
            await downloadAttachment(filePath, fileName)
        } catch (error) {
            alert("파일 다운로드에 실패했습니다. 관리자에게 문의해 주세요.");
        } finally {
            setDownloadingId(false)
        }
    }

    return (
        <div className="w-full min-h-screen bg-[#f8fafc] pt-0 ">
            <div
                className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />
            {/* 1. 상단 섹션: 환영 문구 & 퀵 통계 */}
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-6 py-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-3">
                                <Sparkles size={12} className="text-indigo-600 animate-pulse" />
                                <span>2022 개정 교육과정 지원</span>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600">
                                    {user?.schoolname || '전남고등학교'}
                                </span>
                                <span className="font-medium text-slate-700 text-2xl">교육과정 업무 대시보드</span>
                            </h1>
                            <p className="text-slate-500 text-sm mt-1 flex items-center gap-6">
                                <Activity size={14} className="text-emerald-500 shrink-0" />
                                2022 개정 교육과정에 맞춘 과목 편성부터 시수 관리, <br className="hidden md:block" />
                                공동교육과정 운영까지 모든 절차를 지원합니다.
                            </p>
                        </div>
                        {/* 퀵 통계 요약 */}
                        <div className="flex gap-4">
                            <MiniStatCard label="우리학교 편성률" value={`${totalPercent} %`} color="indigo" />
                            <MiniStatCard label="전체참여학교" value="97 개교" color="rose" />
                            <MiniStatCard label="공동교육과정 개설교" value={schoolCountInfo} color="emerald" />
                            <MiniStatCard label="공동교육과정 개설과목 수" value={UnionSubjectNumber} color="emerald" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-2 mt-2">
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
                                    path="/high-school/credit"
                                />

                                {/* --- [B. 통계 및 현황 섹션] --- */}
                                <MenuCardWithDesc
                                    title="오프라인 공동교육 현황"
                                    desc="현재 운영 중인 오프라인 공동과목 개설 현황을 확인합니다."
                                    icon={<MapPin size={28} />}
                                    color="purple"
                                    path="/stats/union"
                                />
                                <MenuCardWithDesc
                                    title="과목별 통계"
                                    desc="선택 과목에 대한 각종 통계자료를 제공합니다."
                                    icon={<BarChart3 size={28} />}
                                    color="amber"
                                    path="/stats/subject"
                                />
                                <MenuCardWithDesc
                                    title="학교별 통계"
                                    desc="학교별 교육과정 편성 통계데이터를 제공합니다."
                                    icon={<School size={28} />}
                                    color="rose"
                                    path="/stats/schools"
                                />
                            </div>
                        </section>

                        {/* 🔗 [신규 추가: 교육과정 업무 필수 연계 링크 허브] */}
                        <section className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm relative overflow-hidden">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2.5 bg-cyan-50 rounded-xl text-cyan-600 shadow-sm border border-cyan-100">
                                    <Bookmark size={22} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                                        교육과정 관련 홈페이지
                                    </h2>
                                    <p className="text-slate-600 text-xs mt-0.5">교육과정 설계 및 나이스 연계 시 자주 찾는 필수 사이트 모음</p>
                                </div>
                            </div>

                            {/* 3열 카드 링크 레이아웃 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                {usefulLinks.map((link, idx) => (
                                    <a
                                        key={idx}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group bg-slate-50/60 hover:bg-white border border-slate-200/70 hover:border-indigo-400 p-4 rounded-2xl transition-all duration-200 hover:shadow-md flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <div className={`p-1.5 rounded-lg border ${link.color}`}>
                                                        {link.icon}
                                                    </div>
                                                    <span className="font-bold text-sm text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">
                                                        {link.name}
                                                    </span>
                                                </div>
                                                <ExternalLink size={14} className="text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                            </div>
                                            {/* <p className="text-slate-500 text-[11px] leading-normal font-normal">
                                                {link.desc}
                                            </p> */}
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </section>

                    </div>

                    {/* [우측 영역: 4개 컬럼] - 공지사항 & 가이드 */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* 공지사항 */}
                        <NoticeItem />

                        <div className="bg-gradient-to-br from-slate-600 to-indigo-600 rounded-[2rem] p-6 text-white shadow-md relative overflow-hidden group">
                            <div className="absolute -right-4 -bottom-4 text-white/5 pointer-events-none group-hover:scale-110 transition-transform duration-300">
                                <Info size={150} />
                            </div>

                            <div className="w-10 h-10 bg-white/10 border border-white/10 rounded-xl flex items-center justify-center mb-2 text-cyan-300">
                                <Info size={18} />
                            </div>
                            <h4 className="font-bold text-lg tracking-tight mb-2">도움이 필요하신가요?</h4>
                            <p className="text-slate-300 text-sm leading-relaxed mb-5">
                                시스템 사용법에 대한 가이드북을 내려받으실 수 있습니다.
                            </p>
                            <Button
                                className="w-full bg-white hover:bg-slate-100 text-slate-900 border-none font-bold text-xs rounded-xl shadow-sm transition-colors"
                                disabled={downloadingId} // 다운로드 중일 때 버튼 비활성화
                                onClick={() => handleDownload(
                                    "menual_v1.pdf", // 💡 1. Supabase Storage에 올려둔 실제 파일 경로
                                    "교육과정 통합시스템 사용 가이드북.pdf" // 💡 2. 선생님들 컴퓨터에 저장될 한글 파일 이름
                                )}
                            >
                                {downloadingId ? "다운로드 중..." : "매뉴얼 다운로드"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { CurriHome }
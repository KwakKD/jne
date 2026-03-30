import {
    LayoutDashboard,
    UserPlus,      // 과목별 교사 수 입력
    FileEdit,      // 학교 교육과정 편성
    Library,       // 공동(추가)교육과정 편성
    Clock,         // 학교별 시수 관리
    Map,           // 오프라인 현황
    PieChart,      // 과목별 통계
    School,        // 학교별 통계
    CalendarDays,
    LogOut
} from "lucide-react"
import {
    Sidebar, SidebarContent, SidebarFooter, SidebarHeader,
    SidebarGroup, SidebarGroupLabel, SidebarGroupContent,
    SidebarMenu, SidebarMenuItem, SidebarMenuButton
} from "@/components/ui/sidebar"
import { useAuth } from "@/hooks/useAuth"
import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "../ui"

export function AppSidebar() {
    const { data: user } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <Sidebar variant="sidebar" collapsible="icon" className="border-r border-slate-200 bg-white">
            {/* [상단] 시스템 정체성 및 학년도 설정 */}
            <SidebarHeader className="p-4 gap-4">
                <div className="flex items-center gap-3 px-1 cursor-pointer" onClick={() => navigate('/')}>
                    <div className="h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-[#005eb8] p-1.5 flex items-center justify-center shadow-sm">
                        <img src="/logo.png" alt="전남교육청" className="brightness-0 invert object-contain" />
                    </div>
                    <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                        <span className="text-sm font-bold text-slate-900 leading-tight">전남교육청</span>
                        <span className="text-[10px] text-slate-500 font-medium">교육과정 통합시스템</span>
                    </div>
                </div>

                {/* 학년도 선택: 업무의 기준점 */}
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-100 group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:justify-center">
                    <CalendarDays size={16} className="text-[#005eb8] shrink-0" />
                    <select className="bg-transparent text-xs font-bold text-slate-700 focus:outline-none cursor-pointer w-full group-data-[collapsible=icon]:hidden">
                        <option>2026학년도</option>
                        <option>2025학년도</option>
                    </select>
                </div>
            </SidebarHeader>

            {/* [중앙] 핵심 메뉴 구성 */}
            <SidebarContent className="px-2">
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton isActive={location.pathname === '/'} onClick={() => navigate('/')} tooltip="대시보드 홈">
                                <LayoutDashboard />
                                <span className="font-semibold">대시보드 홈</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>

                {/* 1. 편성 및 관리 그룹 */}
                <SidebarGroup>
                    <SidebarGroupLabel className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider group-data-[collapsible=icon]:hidden">
                        편성 및 관리
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {[
                                { title: "과목별 교사 수 입력", icon: UserPlus, path: "/manage/teacher-count" },
                                { title: "학교 교육과정 편성", icon: FileEdit, path: "/manage/curriculum" },
                                { title: "공동(추가)교육과정 편성", icon: Library, path: "/manage/joint" },
                                { title: "학교별 시수 관리", icon: Clock, path: "/manage/hours" },
                            ].map((item) => (
                                <SidebarMenuItem key={item.path}>
                                    <SidebarMenuButton
                                        isActive={location.pathname === item.path}
                                        onClick={() => navigate(item.path)}
                                        tooltip={item.title}
                                        className="active:bg-blue-50 data-[active=true]:bg-blue-50 data-[active=true]:text-[#005eb8]"
                                    >
                                        <item.icon className="shrink-0" />
                                        <span className="text-sm font-medium">{item.title}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* 2. 통계 그룹 */}
                <SidebarGroup className="mt-2">
                    <SidebarGroupLabel className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider group-data-[collapsible=icon]:hidden">
                        통계 분석
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {[
                                { title: "오프라인 공동교육 현황", icon: Map, path: "/stats/offline" },
                                { title: "과목별 통계", icon: PieChart, path: "/stats/subject" },
                                { title: "학교별 통계", icon: School, path: "/stats/school" },
                            ].map((item) => (
                                <SidebarMenuItem key={item.path}>
                                    <SidebarMenuButton
                                        isActive={location.pathname === item.path}
                                        onClick={() => navigate(item.path)}
                                        tooltip={item.title}
                                        className="data-[active=true]:bg-blue-50 data-[active=true]:text-[#005eb8]"
                                    >
                                        <item.icon className="shrink-0" />
                                        <span className="text-sm font-medium">{item.title}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* [하단] 사용자 정보 및 로그아웃 */}
            <SidebarFooter className="p-4 border-t border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-3 px-1 py-1 group-data-[collapsible=icon]:justify-center">
                    <div className="h-8 w-8 shrink-0 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#005eb8] font-bold text-xs shadow-sm">
                        {'T'}
                    </div>
                    <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
                        <p className="text-[11px] font-bold text-slate-900 truncate tracking-tight">{user?.location}</p>
                        <p className="text-[10px] text-slate-400 font-medium truncate">{user?.schoolname} 선생님</p>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-3 h-8 text-slate-400 hover:text-red-600 hover:bg-red-50 group-data-[collapsible=icon]:hidden"
                    onClick={() => {/* 로그아웃 로직 */ }}
                >
                    <LogOut size={14} className="mr-2" />
                    <span className="text-xs font-bold">로그아웃</span>
                </Button>
            </SidebarFooter>
        </Sidebar>
    )
}
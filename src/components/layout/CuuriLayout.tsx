import { AppSidebar } from "@/components/layout/AppSidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Outlet } from "react-router-dom"
import { Separator } from "../ui"

export function CurriLayout() {
    return (
        <TooltipProvider delayDuration={0}>
            <SidebarProvider>
                <div className="flex h-screen w-full overflow-hidden bg-white">
                    {/* 사이드바가 화면 왼쪽 전체(Top to Bottom)를 차지합니다 */}
                    <AppSidebar />

                    <SidebarInset className="flex flex-col flex-1 overflow-hidden bg-slate-50/50">
                        <header className="flex h-12 items-center px-4 border-b bg-white">
                            <SidebarTrigger className="-ml-1" /> {/* 이 버튼 하나로 작업 효율이 달라집니다 */}
                            <Separator orientation="vertical" className="mr-2 h-4" />
                            {/* 현재 메뉴 경로 표시 (Breadcrumb) 등을 옆에 두면 좋습니다 */}
                        </header>
                        {/* 상단 파란 바가 없어졌으므로, 메인 영역에 필요한 경우 트리거(접기 버튼)만 배치 */}
                        <main className="flex-1 overflow-y-auto p-6 md:p-10">
                            <div className="mx-auto max-w-[1400px] w-full">
                                <Outlet />
                            </div>
                        </main>
                    </SidebarInset>
                </div>
            </SidebarProvider>
        </TooltipProvider>
    )
}
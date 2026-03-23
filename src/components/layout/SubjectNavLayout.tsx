import { Outlet } from "react-router-dom";
import { AppFooter, AppHeader, NaviHeader } from "../common";

export function SubjectNavLayout() {
    return (
        <div className="flex min-h-screen flex-col">
            <AppHeader /> {/* 공통 메인 헤더 */}
            <NaviHeader /> {/* 과목선택 전용 메뉴 (예: 교과탐색, 진로추천 등) */}
            <main className="flex-1 bg-slate-50">
                <Outlet />
            </main>
            <AppFooter />
        </div>
    )
}
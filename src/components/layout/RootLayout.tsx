import { Outlet } from "react-router-dom"
import { AppFooter, AppHeader } from "../common"



export function RootLayout() {
    return (
        <div className="flex min-h-screen flex-col">
            <AppHeader />
            <main className="flex-1 w-full bg-slate-50">
                <Outlet />
            </main>
            <AppFooter />
        </div>
    )
}
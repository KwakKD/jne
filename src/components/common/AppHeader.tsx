import { useNavigate } from "react-router-dom"
import { Button } from "../ui"
import { useQueryClient } from "@tanstack/react-query"
import { useAuth } from "@/hooks/useAuth"
import { supabase } from "@/lib/supabase"

function AppHeader() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { data: user, isLoading } = useAuth()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        queryClient.invalidateQueries({ queryKey: ['auth-user'] })
        navigate('/')
    }
    return (
        <header className="w-full flex bg-blue-700 text-white shadow-md py-0.5 px-3 h-14 shrink-0 z-[100]">
            <div className="container mx-auto flex items-center justify-between px-4">
                <div
                    className="flex items-center gap-4 cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    {/* 이미지가 없다면 임시 방편으로 원형 div를 사용하세요 */}
                    {/* <div className="h-12 w-12 overflow-hidden rounded-full bg-white p-1">
                        <img
                            src="/logo.png"
                            alt="전남교육청 로고"
                            className="h-full w-full object-contain"
                        />
                    </div> */}
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-bold leading-tight">전라남도교육청</h1>
                        <p className="text-sm font-light opacity-90">교육과정 통합정보시스템</p>
                    </div>
                </div>


                <div className="flex items-center gap-6">
                    {!isLoading && (
                        user ? (
                            <div className="flex items-center gap-5">
                                <div className="hidden sm:flex items-center gap-2 border-r border-white/20 pr-5">
                                    {/* 지역명 */}
                                    <span className="text-xs opacity-80">
                                        {user.location}
                                    </span>

                                    {/* 가로 구분선 (선택사항: 슬래시나 점) */}
                                    <span className="text-[10px] opacity-40">|</span>

                                    {/* 학교명 */}
                                    <span className="text-sm font-medium whitespace-nowrap">
                                        {user.schoolname}
                                    </span>

                                    {/* 권한 (필요 시 주석 해제) */}
                                    {/* <span className="text-[10px] bg-blue-800/50 px-1.5 py-0.5 rounded border border-white/10 opacity-90">
        {user.role}
    </span> */}
                                </div>

                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="bg-white text-[#005eb8] hover:bg-gray-100 font-semibold h-9"
                                    onClick={handleLogout}
                                >
                                    로그아웃
                                </Button>
                            </div>
                        ) : (
                            <Button
                                variant="secondary"
                                size="sm"
                                className="bg-white text-[#005eb8] hover:bg-gray-100 font-semibold h-9"
                                onClick={() => navigate('/login')}
                            >
                                로그인
                            </Button>
                        )
                    )}
                </div>
            </div>
        </header >
    )
}

export { AppHeader }
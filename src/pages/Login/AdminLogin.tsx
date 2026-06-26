import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label } from "@/components/ui"
import { supabase } from "@/lib/supabase"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function AdminLoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const handleAdminLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            // 🎯 관리자는 직접 설정한 이메일 ID와 비밀번호로 로그인
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password })

            if (authError) throw authError

            if (authData.user) {
                const { data: userInfo, error: dbError } = await supabase
                    .from('userinfo')
                    .select('role')
                    .eq('id', authData.user.id)
                    .single()

                if (dbError) throw dbError

                // 🛑 최고 관리자 권한이 아닌 계정이 이 페이지로 들어온 경우 강제 로그아웃 처리
                if (userInfo?.role !== 'superadmin') {
                    await supabase.auth.signOut()
                    throw new Error("접근 권한이 없습니다. 시스템 총괄 관리자 계정이 아닙니다.")
                }

                // 권한 검증 성공 시 관리자 메인 대시보드로 이동
                queryClient.invalidateQueries({ queryKey: ['auth-user'] })
                navigate('/admin')
            }
        } catch (error: any) {
            alert(error.message || '로그인에 실패했습니다.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-[calc(100vh-90px)] items-center justify-center bg-zinc-900 px-4 py-12">
            {/* 💡 관리자창은 테두리를 어둡고 묵직한 zinc 톤으로 설정 */}
            <Card className="w-full max-w-110 border-zinc-800 bg-zinc-950 shadow-2xl text-zinc-100 rounded-xl">
                <CardHeader className="space-y-2.5 pb-6 pt-8 text-center border-b border-zinc-900">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-2xl border border-zinc-800">
                        🛡️
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight text-zinc-50">
                        시스템 총괄 관리자 로그인
                    </CardTitle>
                    <CardDescription className="text-xs text-zinc-400">
                        본 페이지는 통합 시스템 관리를 위한 전용 통로입니다.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleAdminLogin}>
                    <CardContent className="space-y-4 px-6 py-6">
                        {/* 관리자 이메일 주소 직접 입력 */}
                        <div className="space-y-1.5">
                            <Label htmlFor="email" className="text-xs font-medium text-zinc-200">관리자 이메일 계정</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@jne.go.kr"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-10 rounded-lg bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-zinc-700 focus-visible:border-zinc-500"
                            />
                        </div>

                        {/* 관리자 비밀번호 직접 입력 */}
                        <div className="space-y-1.5">
                            <Label htmlFor="password" className="text-xs font-medium text-zinc-200">비밀번호</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="h-10 rounded-lg bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-zinc-700 focus-visible:border-zinc-500"
                            />
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-4 px-6 pb-8 pt-4">
                        <Button
                            type="submit"
                            className="w-full h-11 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold rounded-lg transition-all active:scale-[0.99]"
                            disabled={isLoading}
                        >
                            {isLoading ? '보안 세션 연결 중...' : '관리자 인증 로그인'}
                        </Button>

                        {/* 보안 경고문구 박스 */}
                        <div className="w-full rounded-lg bg-zinc-900/50 border border-zinc-900 p-3 text-center text-[11px] text-zinc-300 leading-normal">
                            ⚠️ 인가되지 않은 사용자의 접근은 금지되어 있습니다.
                        </div>

                        {/* 일반 로그인으로 돌아가기 */}
                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                            className="text-xs text-zinc-100 hover:text-zinc-300 hover:underline transition-colors mt-2"
                        >
                            ← 일반 교직원 로그인으로 돌아가기
                        </button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

export { AdminLoginPage }
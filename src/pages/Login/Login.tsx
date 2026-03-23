import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label } from '@/components/ui'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()


    const queryClient = useQueryClient()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password })

            if (error) throw error

            // 로그인 성공 시 인증 쿼리 무효화 (최신 유저 정보 패치)
            queryClient.invalidateQueries({ queryKey: ['auth-user'] })
            navigate('/')
        } catch (error: any) {
            alert(error.message || '로그인에 실패했습니다.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-[calc(100vh-(--spacing(14))-(--spacing(16)))] items-center justify-center bg-slate-50 px-4">
            <Card className="w-full max-w-md border-slate-200 shadow-xl">
                <CardHeader className="space-y-2 text-center">
                    <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
                        교직원 로그인
                    </CardTitle>
                    <CardDescription>
                        교육과정 통합정보시스템 서비스 이용을 위해 <br />
                        계정 정보를 입력해 주세요.
                    </CardDescription>
                </CardHeader>
                <form
                 onSubmit={handleLogin}
                >
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">이메일</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="example@jne.go.kr"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="focus-visible:ring-blue-600"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">비밀번호</Label>
                                <button type="button" className="text-xs text-blue-600 hover:underline">
                                    비밀번호 찾기
                                </button>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="focus-visible:ring-blue-600"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button
                            type="submit"
                            className="w-full bg-blue-700 font-semibold hover:bg-blue-800"
                            disabled={isLoading}
                        >
                            {isLoading ? '로그인 중...' : '로그인'}
                        </Button>
                        <p className="text-center text-sm text-slate-500">
                            계정이 없으신가요? <button type="button" className="text-blue-600 hover:underline font-medium">회원가입</button>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

export { LoginPage }
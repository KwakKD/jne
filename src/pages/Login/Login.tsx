import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

const JNE_LOCATIONS = [
    "강진군", "고흥군", "곡성군", "광양시", "구례군", "나주시", "담양군",
    "목포시", "무안군", "보성군", "순천시", "신안군", "여수시", "영광군",
    "영암군", "완도군", "장성군", "장흥군", "진도군", "함평군", "해남군", "화순군"
]

interface SchoolType {
    id: number
    schoolname: string
    location: string
    login_email: string
}

function LoginPage() {
    const [selectedLocation, setSelectedLocation] = useState('')
    const [schools, setSchools] = useState<SchoolType[]>([])
    const [selectedSchoolId, setSelectedSchoolId] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSchoolLoading, setIsSchoolLoading] = useState(false)

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    useEffect(() => {
        if (!selectedLocation) {
            setSchools([])
            setSelectedSchoolId('')
            return
        }

        const loadSchools = async () => {
            setIsSchoolLoading(true)
            try {
                const { data, error } = await supabase
                    .from('schoolid') // 💡 선생님이 만드신 테이블
                    .select('id, schoolname, location, login_email')
                    .eq('location', selectedLocation)
                    .order('schoolname', { ascending: true }) // 🔤 가나다순 정렬

                if (error) throw error
                setSchools(data || [])
                setSelectedSchoolId('') // 지역이 바뀌면 기존 선택 학교 초기화
            } catch (err) {
                console.error("학교 목록 로드 실패:", err)
            } finally {
                setIsSchoolLoading(false)
            }
        }

        loadSchools()
    }, [selectedLocation])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        // 유효성 검사
        if (!selectedSchoolId) {
            alert("학교를 선택해 주세요.")
            return
        }

        setIsLoading(true)

        try {
            // 🎯 3. 선택된 학교의 고유 데이터에서 숨겨진 진짜 이메일(login_email)을 찾아옵니다.
            const targetSchool = schools.find(s => s.id === Number(selectedSchoolId))
            if (!targetSchool) throw new Error("선택한 학교 정보가 올바르지 않습니다.")

            const email = targetSchool.login_email

            // 🎯 4. 화면에서는 학교를 고르고 비밀번호를 쳤지만, 백엔드 엔진엔 이메일과 패스워드로 로그인 처리!
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password
            })

            if (authError) throw authError

            if (authData.user) {
                const { data: userInfo, error: dbError } = await supabase
                    .from('userinfo')
                    .select('role, isapproved') // 💡 기존 필드 체크 추가
                    .eq('id', authData.user.id)
                    .single()

                if (dbError) throw dbError

                // [조건 A] 초기 비밀번호를 사용 중이거나 강제 변경 대상인 경우 ➡️ 변경 페이지 강제 이동
                if (userInfo.isapproved === true) {
                    queryClient.invalidateQueries({ queryKey: ['auth-user'] })
                    navigate('/change-password', { state: { fromLogin: true } })
                    return
                }

                // [조건 B] 관리자(superadmin) 계정인 경우 ➡️ 관리자 메인 패널로 이동
                if (userInfo?.role === 'superadmin') {
                    queryClient.invalidateQueries({ queryKey: ['auth-user'] })
                    navigate('/admin')
                    return
                }

                // 로그인 성공 시 인증 쿼리 무효화 및 대시보드로 이동
                queryClient.invalidateQueries({ queryKey: ['auth-user'] })
                navigate('/')
            }
        } catch (error: any) {
            alert(error.message || '로그인에 실패했습니다. 학교명과 비밀번호를 다시 확인해 주세요.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-[calc(100vh-theme(spacing.14)-theme(spacing.16))] items-center justify-center bg-slate-50/60 px-4 py-12">
            <Card className="w-full max-w-110 border-slate-200/80 bg-white/90 shadow-2xl shadow-slate-100 backdrop-blur-sm rounded-xl">
                <CardHeader className="space-y-2.5 pb-6 pt-8 text-center">
                    <div className="mx-auto flex h-15 w-15 items-center justify-center rounded-full bg-blue-50 text-xl">
                        🏫
                    </div>
                    <CardTitle className="text-3xl font-bold tracking-tight text-slate-700">
                        교직원 로그인
                    </CardTitle>
                    <CardDescription className="text-sm text-slate-500 leading-relaxed">
                        전라남도 통합 교육과정 정보시스템 이용을 위해 <br />
                        소속 학교 정보를 선택해 주세요.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="space-y-5 px-6">

                        {/* 📍 1단계: 시/군 선택 (Shadcn UI 스타일 고도화) */}
                        <div className="space-y-1.5">
                            <Label htmlFor="location" className="text-xs font-semibold text-slate-700 tracking-wide">
                                소속 시/군
                            </Label>
                            <Select
                                value={selectedLocation}
                                onValueChange={(value) => setSelectedLocation(value)}
                            >
                                <SelectTrigger className="w-full h-10 border-slate-200 shadow-sm focus:ring-blue-100 focus:border-blue-600 rounded-lg text-slate-900">
                                    <SelectValue placeholder="시/군을 선택하세요" />
                                </SelectTrigger>
                                <SelectContent className="max-h-75 rounded-lg border-slate-200">
                                    {JNE_LOCATIONS.map((loc) => (
                                        <SelectItem key={loc} value={loc} className="cursor-pointer">
                                            {loc}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* 📍 2단계: 학교명 선택 (Shadcn UI 스타일 고도화) */}
                        <div className="space-y-1.5">
                            <Label htmlFor="school" className="text-xs font-semibold text-slate-700 tracking-wide">
                                학교명
                            </Label>
                            <Select
                                value={selectedSchoolId}
                                onValueChange={(value) => setSelectedSchoolId(value)}
                                disabled={!selectedLocation || isSchoolLoading}
                            >
                                <SelectTrigger className="w-full h-10 border-slate-200 shadow-sm focus:ring-blue-100 focus:border-blue-600 rounded-lg text-slate-900 disabled:bg-slate-50 disabled:text-slate-400">
                                    <SelectValue placeholder={isSchoolLoading ? "학교 데이터를 불러오는 중..." : "학교를 선택하세요"} />
                                </SelectTrigger>
                                <SelectContent className="max-h-75 rounded-lg border-slate-200">
                                    {schools.length > 0 ? (
                                        schools.map((school) => (
                                            <SelectItem key={school.id} value={String(school.id)} className="cursor-pointer">
                                                {school.schoolname}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <div className="p-4 text-center text-xs text-slate-400">
                                            선택 가능한 학교가 없습니다.
                                        </div>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* 🔒 3단계: 비밀번호 입력 */}
                        <div className="space-y-1.5">
                            <Label htmlFor="password" className="text-xs font-semibold text-slate-700 tracking-wide">
                                비밀번호
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="비밀번호를 입력하세요"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="h-10 rounded-lg border-slate-200 shadow-sm focus-visible:ring-2 focus-visible:ring-blue-100 focus-visible:border-blue-600"
                            />
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-5 px-6 pb-8 pt-4">
                        {/* 로그인 버튼 */}
                        <Button
                            type="submit"
                            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md shadow-blue-100 transition-all active:scale-[0.99] disabled:opacity-50"
                            disabled={isLoading}
                        >
                            {isLoading ? '안전하게 로그인 중...' : '로그인'}
                        </Button>

                        {/* 💡 [신설] 첫 로그인 / 비밀번호 초기화 안내 문구 팁 박스 */}
                        <div className="w-full rounded-lg bg-slate-50 border border-slate-100 p-3.5 text-left transition-all">
                            <div className="flex items-start gap-2">
                                <span className="text-sm mt-0.5">💡</span>
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold text-slate-800">
                                        처음 로그인하거나 비밀번호를 초기화하셨나요?
                                    </p>
                                    <p className="text-[12px] text-slate-500 leading-relaxed tracking-tight">
                                        관리자가 지정한 임시 비밀번호로 로그인하시면, 안전한 서비스 이용을 위해 <strong className="text-blue-600 font-medium">비밀번호 변경 페이지로 자동 이동</strong>됩니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-1.5 pt-1 text-xs text-slate-400">
                            <span>시스템 총괄 관리자이신가요?</span>
                            <button
                                type="button"
                                onClick={() => navigate('/admin-login')}
                                className="text-slate-600 font-medium hover:text-blue-600 hover:underline transition-colors"
                            >
                                관리자 로그인 ↗
                            </button>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

export { LoginPage }
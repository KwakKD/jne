import { Badge, Card, CardDescription, CardHeader, CardTitle } from "@/components/ui"
import { useAuth } from "@/hooks/useAuth"
import { CheckCircle2, Compass, GraduationCap, Lock } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"



function Home() {
    const navigate = useNavigate()
    const { data: user } = useAuth() // 로그인 정보 가져오기

    // 카드 클릭 핸들러
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
        <div className="flex min-h-[calc(100vh-120px)] items-center justify-center bg-slate-50 p-6">
            <div className="grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">

                {/* 1. 과목선택 네비게이션 (누구나 이용 가능) */}
                <Card
                    onClick={() => handleCardClick('/subject-navigation', false)}
                    className="group relative cursor-pointer border-2 border-slate-200 transition-all hover:border-blue-600 hover:shadow-xl"
                >
                    <CardHeader className="flex flex-col items-center pt-12 pb-8">
                        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <Compass size={44} />
                        </div>
                        <CardTitle className="text-2xl font-bold text-slate-900">과목선택 네비게이션</CardTitle>
                        <CardDescription className="mt-4 text-center text-base leading-relaxed">
                            나의 적성과 진로에 맞는 <br />
                            최적의 과목을 탐색하고 설계합니다.
                        </CardDescription>
                    </CardHeader>
                </Card>

                {/* 2. 고등학교 교육과정 (로그인 여부에 따라 변화) */}
                <Card
                    onClick={() => handleCardClick('/high-school', true)}
                    className={`group relative cursor-pointer border-2 transition-all hover:shadow-xl ${user ? 'border-slate-200 hover:border-blue-600' : 'border-slate-200 opacity-90'
                        }`}
                >
                    {/* 오른쪽 상단 뱃지 동적 변경 */}
                    <div className="absolute right-4 top-4">
                        {user ? (
                            <Badge className="flex gap-1 bg-green-100 text-green-700 font-medium border-green-200 hover:bg-green-100">
                                <CheckCircle2 size={12} /> 이용 가능
                            </Badge>
                        ) : (
                            <Badge variant="destructive" className="flex gap-1 bg-slate-200 text-slate-500 font-medium hover:bg-slate-200 border-none">
                                <Lock size={12} /> 로그인 필요
                            </Badge>
                        )}
                    </div>

                    <CardHeader className={`flex flex-col items-center pt-12 pb-8 transition-opacity ${!user && 'opacity-70 group-hover:opacity-100'}`}>
                        <div className={`mb-6 flex h-20 w-20 items-center justify-center rounded-2xl transition-all duration-300 ${user ? 'bg-indigo-50 text-indigo-600 group-hover:bg-blue-600 group-hover:text-white' : 'bg-slate-100 text-slate-400'
                            }`}>
                            <GraduationCap size={44} />
                        </div>
                        <CardTitle className="text-2xl font-bold text-slate-900">고등학교 교육과정</CardTitle>
                        <CardDescription className="mt-4 text-center text-base leading-relaxed">
                            2022 개정 교육과정 기반 <br />
                            전남 고등학교 교육과정 정보를 확인하세요.
                        </CardDescription>
                    </CardHeader>
                </Card>

            </div>
        </div>
    )
}

export { Home }
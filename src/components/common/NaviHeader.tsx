import { Compass, Home } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "../ui"

function NaviHeader () {
    const navigate = useNavigate()

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-6">
                
                {/* 왼쪽: 서비스 로고 및 이름 */}
                <div 
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => navigate('/subject-navigation')}
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-blue-200 shadow-lg">
                        <Compass size={22} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h2 className="text-lg font-extrabold text-slate-800 tracking-tight">과목선택 가이드</h2>
                        <p className="text-[10px] text-blue-600 font-semibold uppercase tracking-wider">Information Hub</p>
                    </div>
                </div>

                {/* 중앙: 정적 메뉴 (정보 카테고리) */}
                <nav className="hidden md:flex items-center gap-8">
                    <button 
                        onClick={() => navigate('/subject-navigation/guide')} // <-- 경로 연결
                        className="text-base font-medium text-slate-600 hover:text-blue-600 transition-colors"
                    >
                        교과군별 교과 안내
                    </button>

                    <button 
                        onClick={() => navigate('/subject-navigation/uni')} // <-- 경로 연결
                        className="text-base font-medium text-slate-600 hover:text-blue-600 transition-colors"
                    >
                        대학 및 학과별 추천
                    </button>

                    <button 
                        onClick={() => navigate('/subject-navigation/uniGroup')} // <-- 경로 연결
                        className="text-base font-medium text-slate-600 hover:text-blue-600 transition-colors"
                    >
                        계열별 과목 추천
                    </button>

                    <button 
                        onClick={() => navigate('/subject-navigation/offline')} // <-- 경로 연결
                        className="text-base font-medium text-slate-600 hover:text-blue-600 transition-colors"
                    >
                        오프라인 공동교육과정
                    </button>
                    
                    {/* 나머지 메뉴들도 경로가 있다면 같은 방식으로 추가 */}
                    {['자료실'].map((menu) => (
                        <button 
                            key={menu}
                            className="text-base font-medium text-slate-600 hover:text-blue-600 transition-colors"
                        >
                            {menu}
                        </button>
                    ))}
                </nav>

                {/* 오른쪽: 홈 버튼 */}
                <div className="flex items-center">
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => navigate('/')}
                        className="text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                    >
                        <Home size={20} />
                    </Button>
                </div>
            </div>
        </header>
    )
}

export {NaviHeader}
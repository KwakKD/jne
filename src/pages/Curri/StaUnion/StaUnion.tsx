import { Button, Card, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Separator } from "@/components/ui"
import { BookOpen, Info, RefreshCcw, School, Search, Sun, Users } from "lucide-react"

const StaUnion = () => {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50/50 font-sans">
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-2 py-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">전남 공동교육과정 현황 탐색</h1>
                            <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                                <Info size={14} /> 전라남도 내 개설된 모든 오프라인 공동교육과정을 한눈에 확인하세요.
                            </p>
                        </div>
                        {/* 퀵 통계 요약 */}
                        <div className="flex gap-4">
                            <Card className="p-4 mb-4 border-l-4 border-l-blue-500 shadow-sm">
                                <div className="flex justify-between items-start gap-3">
                                    <p className="text-xs font-medium text-slate-500">총 개설 과목</p>
                                    <BookOpen size={16} className="text-blue-500" />
                                </div>
                                <p className="text-2xl font-bold mt-0">128개</p>
                            </Card>
                            <Card className="p-4 mb-4 border-l-4 border-l-emerald-500 shadow-sm">
                                <div className="flex justify-between items-start gap-3">
                                    <p className="text-xs font-medium text-slate-500">총 수용 가능 인원</p>
                                    <Users size={16} className="text-emerald-500" />
                                </div>
                                <p className="text-2xl font-bold mt-0">1,840명</p>
                            </Card>

                            <Card className="p-4 mb-4 border-l-4 border-l-amber-500 shadow-sm">
                                <div className="flex justify-between items-start gap-3">
                                    <p className="text-xs font-medium text-slate-500">방학 중 특별강좌</p>
                                    <Sun size={16} className="text-amber-500" />
                                </div>
                                <p className="text-2xl font-bold mt-0">32개</p>
                            </Card>

                            <Card className="p-4 mb-4 border-l-4 border-l-rose-500 shadow-sm">
                                <div className="flex justify-between items-start gap-3">
                                    <p className="text-xs font-medium text-slate-500">참여 학교 수</p>
                                    <School size={16} className="text-rose-500" />
                                </div>
                                <p className="text-2xl font-bold mt-0">64개교</p>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            <Card className="mx-6 mt-1 shadow-sm border-slate-200">
                <div className="px-4 py-1 flex flex-wrap items-center gap-4 bg-white rounded-xl">
                    {/* 년도 필터 */}
                    <div className="space-y-1">
                        <span className="text-[11px] font-bold text-slate-400 ml-1">운영년도</span>
                        <Select defaultValue="2026">
                            <SelectTrigger className="w-25 h-9 focus:ring-indigo-500">
                                <SelectValue placeholder="년도" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="2027">2027년</SelectItem>
                                <SelectItem value="2026">2026년</SelectItem>
                                <SelectItem value="2025">2025년</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* 학년 필터 */}
                    <div className="space-y-1.5">
                        <span className="text-[11px] font-bold text-slate-400 ml-1">대상학년</span>
                        <Select defaultValue="전체">
                            <SelectTrigger className="w-[100px] h-9">
                                <SelectValue placeholder="학년" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="전체">전체</SelectItem>
                                <SelectItem value="1">1학년</SelectItem>
                                <SelectItem value="2">2학년</SelectItem>
                                <SelectItem value="3">3학년</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* 학기 필터 */}
                    <div className="space-y-1.5">
                        <span className="text-[11px] font-bold text-slate-400 ml-1">운영학기</span>
                        <Select defaultValue="전체">
                            <SelectTrigger className="w-[120px] h-9">
                                <SelectValue placeholder="학기" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="전체">전체 학기</SelectItem>
                                <SelectItem value="1학기">1학기</SelectItem>
                                <SelectItem value="여름방학">여름방학</SelectItem>
                                <SelectItem value="2학기">2학기</SelectItem>
                                <SelectItem value="겨울방학">겨울방학</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Separator orientation="vertical" className="h-15 mx-2 hidden md:block" />

                    {/* 과목명 검색 필터 */}
                    <div className="flex-1 min-w-[200px] space-y-1.5">
                        <span className="text-[11px] font-bold text-slate-400 ml-1">과목명 검색</span>
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="찾으시는 과목명을 입력하세요..."
                                className="pl-9 h-9 border-slate-200 focus-visible:ring-indigo-500"
                            />
                        </div>
                    </div>

                    <Button className="mt-5 h-9 bg-slate-900 hover:bg-slate-800 gap-2 px-6">
                        <RefreshCcw size={14} />
                        필터 초기화
                    </Button>
                </div>
            </Card>
        </div>
    )
}

export { StaUnion }
import { fetchSubjectGroupStats } from "@/api/supabaseAPI";
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { SUBJECT } from "@/data/Curri/subject";
import { YEARS } from "@/data/data";
import type { SchoolClassDataProps, SchoolStaAreaTableProps } from "@/type/curri";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Calendar, HelpCircle, Layers, Loader2, Search } from "lucide-react";
import { useMemo, useState } from "react";
import StaSchoolChart from "./StaSchoolChart";
import StaSchoolAreaPanel from "./StaSchoolAreaPanel";
import StaSchoolAreaTable from "./StaSchoolAreaTable";

interface SchoolStaAreaProps {
    schoolLists: string[]
    schoolInfo: SchoolClassDataProps[]
}

const SUBJECT_TYPES = ["국어", "수학", "영어", "사회", "과학", "체육", "예술", "기술∙가정/정보", "제2외국어/한문", "교양"]


export default function SchoolStaArea({ schoolLists, schoolInfo }: SchoolStaAreaProps) {
    // 안전한 가드 연도 매핑
    const yearList = [YEARS[1], YEARS[2]]

    const [selectSubjectGroup, setSelectSubjectGroup] = useState('국어')
    const [selectYear, setSelectYear] = useState(yearList[0])
    const [selectSubject, setSelectSubject] = useState('공통국어1')

    // [Query] 교과군 통계 데이터 비동기 호출
    const { data: subjectGroupStats, refetch, isFetching } = useQuery({
        queryKey: ['subjectGroupStats', selectSubjectGroup],
        queryFn: () => fetchSubjectGroupStats(selectSubjectGroup, selectYear),
        enabled: false, // 상위 페이지 동기화 안정성을 위해 수동 refetch 유지
        staleTime: 1000 * 60 * 5
    })

    const handleSearch = () => {
        refetch()
    }

    // 선택된 교과군에 따른 소속 과목 실시간 필터링
    const subjectList = useMemo(() => {
        return SUBJECT
            .filter(item => item.교과군 === selectSubjectGroup)
            .map(sub => sub.과목명)
    }, [selectSubjectGroup])

    // [로직 백업] 원본 데이터 가공 파이프라인
    const tableData = useMemo<SchoolStaAreaTableProps[]>(() => {
        if (!subjectGroupStats) return []

        const schoolMap = new Map(schoolInfo.map(s => [s.schoolname, s]))

        return subjectGroupStats.map(item => {
            const info = schoolMap.get(item.schoolname)

            return {
                ...item,
                allClass: info ? info.allClass : 0,
                grade_1: info ? info.grade_1 : 0,
                grade_2: info ? info.grade_2 : 0,
                grade_3: info ? info.grade_3 : 0
            }
        })
    }, [schoolInfo, subjectGroupStats]).filter(item => item.sub_name === selectSubject)

    // 왼쪽 필터 바에서 살아남은 학교들만 필터링
    const filteredData = tableData.filter(item => schoolLists.includes(item.schoolname))

    // 이 과목을 개설한 학교명 유니크 배열 생성
    const inDataSchool = useMemo(() => {
        return [...new Set(tableData.map(item => item.schoolname))]
    }, [tableData])

    // [로직 백업] 미개설 학교 차집합 정밀 연산
    const unOpenedData = useMemo(() => {
        const openedSet = new Set(inDataSchool)
        return schoolLists
            .filter(name => !openedSet.has(name))
            .map(name => {
                const info = schoolInfo.find(s => s.schoolname === name)
                return {
                    schoolname: name,
                    location: info?.location || '미확인',
                    allClass: info?.allClass || 0
                }
            })
    }, [schoolLists, inDataSchool, schoolInfo])

    console.log(unOpenedData)

    return (
        <div className="w-full h-full flex flex-col gap-3 bg-white rounded-2xl border border-slate-200 p-1 shadow-xs overflow-hidden select-none">

            {/* [1] 상단 다차원 서치 패널 카드 */}
            <Card className="bg-slate-50/50 border-slate-200/60 rounded-xl shadow-2xs shrink-0">
                <CardContent className="py-0 flex flex-wrap items-end justify-between gap-4">

                    <div className="flex items-center flex-wrap gap-4 flex-1">

                        {/* 학년도 선택 */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                                <Calendar size={12} className="text-slate-400" />
                                분석 학년도
                            </label>
                            <Select value={selectYear} onValueChange={setSelectYear}>
                                <SelectTrigger className="h-9 text-xs w-24 bg-white border-slate-200 rounded-lg shadow-2xs font-semibold text-slate-700">
                                    <SelectValue placeholder="학년도 선택" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    {yearList.map((year) => (
                                        <SelectItem key={year} value={year} className="text-xs rounded-lg">{year}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* 교과군 선택 */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                                <Layers size={12} className="text-slate-400" />
                                대분류 교과군
                            </label>
                            <Select value={selectSubjectGroup} onValueChange={(val) => {
                                setSelectSubjectGroup(val)
                                // 교과군이 바뀌면 하위 첫 과목으로 안전하게 가드 처리해 주는 센스
                                const items = SUBJECT.filter(item => item.교과군 === val)
                                if (items.length > 0) setSelectSubject(items[0].과목명)
                            }}>
                                <SelectTrigger className="h-9 text-xs w-30 bg-white border-slate-200 rounded-lg shadow-2xs font-semibold text-slate-700">
                                    <SelectValue placeholder="교과군 선택" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl max-h-56">
                                    {[...SUBJECT_TYPES].map((group) => (
                                        <SelectItem key={group} value={group} className="text-xs rounded-lg">{group}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        {/* 세부 교과목 선택 (조회 이후 선택 유도) */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                                <BookOpen size={12} className="text-slate-400" />
                                세부 교과목
                            </label>
                            <Select value={selectSubject} onValueChange={setSelectSubject}>
                                <SelectTrigger className="h-9 text-xs w-48 bg-white border-slate-200 rounded-lg shadow-2xs font-black text-indigo-600 border-indigo-100">
                                    <SelectValue placeholder="과목 선택" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl max-h-56">
                                    {subjectList.map((subject) => (
                                        <SelectItem key={subject} value={subject} className="text-xs rounded-lg">{subject}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        {/* 데이터 패치용 대형 조회 버튼 */}
                        <Button
                            size="sm"
                            onClick={handleSearch}
                            disabled={isFetching}
                            className="h-9 rounded-lg px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs gap-1.5 shadow-sm transition-colors"
                        >
                            {isFetching ? (
                                <Loader2 size={13} className="animate-spin" />
                            ) : (
                                <Search size={13} />
                            )}
                            <span>{isFetching ? '조회 중...' : '통계 조회'}</span>
                        </Button>
                        {/* 도움말 배치 밴드 */}
                        <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400 bg-white border px-3 py-1 rounded-xl border-slate-200/60 shadow-2xs my-0">
                            <HelpCircle size={13} className="text-amber-500" />
                            <span>통계 조회 후 세부 과목을 정교화하세요.</span>
                        </div>

                    </div>


                </CardContent>
            </Card>

            {/* [2] 하단 결과 리포트 섹션 그리드 배치 (고정 높이 및 overflow 가드 적용) */}
            <div className="flex-1 grid grid-cols-12 gap-0 overflow-hidden min-h-0 h-[680px]">

                {/* 2-A: 왼쪽 레이어 (시각화 차트 패널 + 미개설 학교 분석 리스트) */}
                {/* 변경 포인트: h-full과 overflow-y-auto를 통해 내부 요소가 넘칠 때만 깔끔하게 독립 스크롤 생성 */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-4 overflow-y-auto pr-1 h-full min-h-0 custom-scrollbar">

                    {/* 차트 피드 보드 (고정 높이 유지하여 스크롤 흐름 안정화) */}
                    <Card className="border-slate-200/70 shadow-2xs rounded-xl overflow-hidden shrink-0">
                        <CardHeader className="py-0 px-4 bg-slate-50/50 border-b border-slate-100">
                            <CardTitle className="text-xs font-black text-slate-600">개설 분포 비율</CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 py-0 bg-white">
                            <StaSchoolChart
                                schoolLists={schoolLists}
                                inDataSchool={inDataSchool}
                            />
                        </CardContent>
                    </Card>

                    {/* 미개설 분석 보드 (남은 스페이스를 유연하게 채우되 shrink를 막아 최소 스크롤 영역 보장) */}
                    <Card className="border-slate-200/70 shadow-2xs rounded-xl overflow-hidden flex-1 min-h-[340px] flex flex-col">
                        <CardHeader className="py-0 px-4 bg-slate-50/50 border-b border-slate-100 flex flex-row items-center justify-between shrink-0">
                            <CardTitle className="text-xs font-black text-slate-600">미개설 학교</CardTitle>
                            <Badge variant="destructive" className="bg-rose-50 border-rose-100 hover:bg-rose-50 text-rose-600 font-bold text-[10px] rounded-md">
                                미개설 {unOpenedData.length}개교
                            </Badge>
                        </CardHeader>
                        {/* 내부 패널 자체 스크롤 인프라 바인딩 */}
                        <CardContent className="p-0 bg-white flex-1 overflow-hidden min-h-0">
                            <StaSchoolAreaPanel
                                unOpenedData={unOpenedData}
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* 2-B: 오른쪽 레이어 (상세 편성 데이터 매트릭스 테이블) */}
                <div className="col-span-12 lg:col-span-8 border border-slate-200 rounded-xl overflow-hidden flex flex-col bg-white shadow-2xs min-h-0 h-full">
                    <div className="py-3 px-4 bg-slate-50/50 border-b border-slate-200/60 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-2">
                            <Badge className="bg-indigo-50 border border-indigo-100 hover:bg-indigo-50 text-indigo-600 font-black text-[10px] rounded-md px-2 py-0.5">
                                {selectSubject}
                            </Badge>
                            <span className="text-xs font-black text-slate-600">학교별 학년별 학점/시수</span>
                        </div>
                        <span className="text-[11px] font-bold text-slate-400">매칭 데이터: {filteredData.length}건</span>
                    </div>
                    <div className="flex-1 overflow-auto min-h-0">
                        <StaSchoolAreaTable
                            data={filteredData}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}
import { Badge, Card, CardContent, CardHeader, CardTitle, ScrollArea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui"
import { SUBJECT } from "@/data/Curri/subject"
import { cn } from "@/lib/utils"
import { useCurriTableStore } from "@/store/CurriSubjectStore"
import { Save, Settings } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"

export const GroupControl = ({ year }: { year: string }) => {
    const userData = useCurriTableStore((state) => state.userData)
    const groupUpdate = useCurriTableStore((state) => state.groupUpdate)
    const inputTable2 = useCurriTableStore((state) => state.inputTable2)

    const currentYearData = userData[year]
    const Groups = currentYearData?.Group ?? {}
    const GroupNames = Object.keys(Groups)
    const UnionSubject = [...SUBJECT, ...userData[year].AddSubject]

    // const [selectGroup, setSelectGroup] = useState(GroupNames[0] ?? '')
    // 데이터가 존재하는 그룹만 필터링
    const activeGroupNames = GroupNames.filter((groupName) => {
        const groupData = Groups[groupName]
        return (groupData?.Subject?.length || 0) > 0
    })

    const [selectGroup, setSelectGroup] = useState(activeGroupNames[0] ?? GroupNames[0] ?? '')
    const [relatedGroups, setRelatedGroups] = useState<string[]>([])
    const [editGroupCredit, setEditGroupCredit] = useState(Groups[GroupNames[0]].Credit ?? 3)
    const [editGroupChoice, setEditGroupChoice] = useState(Groups[GroupNames[0]].Choice ?? 1)

    const selectedGroupData = Groups[selectGroup]

    const availableCredits = useMemo(() => {
        if (!selectedGroupData?.Subject || selectedGroupData.Subject.length === 0) {
            return [3] //기본값
        }

        const groupSubjects = selectedGroupData.Subject
            .map((subId) => UnionSubject.find((s) => s.Tag === subId))
            .filter(Boolean)

        if (groupSubjects.length === 0) return [1, 2, 3, 4, 5]

        const minCredits = groupSubjects.map((item) => item?.최소학점 ?? 2)
        const maxCredits = groupSubjects.map((item) => item?.최대학점 ?? 9)

        const maxOfMins = Math.max(...minCredits)
        const minOfMaxs = Math.min(...maxCredits)

        const credits: number[] = []
        for (let i = maxOfMins; i <= minOfMaxs; i++) {
            credits.push(i)
        }

        return credits.length > 0 ? credits : [maxOfMins]
    }, [selectedGroupData, UnionSubject])

    const availableChoice = useMemo(() => {
        if (!selectedGroupData?.Subject || selectedGroupData.Subject.length === 0) {
            return [1] //기본값
        }

        const maxChoice = selectedGroupData.Subject.length - 1
        const choiceNumbers: number[] = []

        for (let i = 1; i <= maxChoice; i++) {
            choiceNumbers.push(i)
        }
        return choiceNumbers.length > 0 ? choiceNumbers : [1]
    }, [selectedGroupData])
    // 선택된 그룹이 바뀔 때 수정 폼 상태 동기화
    useEffect(() => {
        if (selectGroup && Groups[selectGroup]) {
            const group = Groups[selectGroup]
            setEditGroupChoice(group.Choice ?? 1)
            setEditGroupCredit(group.Credit ?? 4)
        }
    }, [selectGroup, Groups])

    useEffect(() => {
        if (!selectGroup || !Groups[selectGroup]) {
            setRelatedGroups([])
            return
        }

        const currentSubjects: number[] = Groups[selectGroup].Subject ?? []

        // 공통 과목 번호가 하나라도 겹치는 그룹들을 모두 찾기
        const matched = GroupNames.filter((groupName) => {
            const targetSubjects: number[] = Groups[groupName]?.Subject ?? []
            return targetSubjects.some((sub) => currentSubjects.includes(sub))
        })

        setRelatedGroups(matched)
    }, [selectGroup, Groups])

    const handleUpdateGroup = () => {
        if (relatedGroups.length === 0) return

        relatedGroups.forEach((group) => {
            groupUpdate(year, group, { Credit: editGroupCredit, Choice: editGroupChoice })

            Groups[group].Subject.forEach((tag) => {
                inputTable2(year, tag, { Credit: editGroupCredit })
            })
        })

        toast.success('그룹 정보가 성공적으로 변경되었습니다.')
    }

    return (
        <Card className="w-full max-w-full h-[60vh] shadow-sm border border-border m-0">
            <CardHeader className="pb-4 border-b">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Settings className="w-5 h-5 text-indigo-600" />
                    {year}학년도 신입생 교육과정 그룹 학점 관리
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative">

                    {/* 왼쪽: 그룹 선택 목록 (너비 축소 및 활성 그룹만 스크롤) */}
                    <div className="md:col-span-5 space-y-3 flex flex-col">
                        <div className="flex items-center justify-between px-1">
                            <label className="text-sm font-semibold text-foreground">그룹 선택</label>
                            <Badge variant="secondary" className="text-[11px]">활성 그룹 {activeGroupNames.length}개</Badge>
                        </div>
                        <div className="border rounded-2xl p-2 bg-slate-50/50">
                            <ScrollArea className="h-80 pr-2">
                                <div className="space-y-2">
                                    {GroupNames.map((groupName) => {
                                        const groupData = Groups[groupName]
                                        const subjectCount = groupData?.Subject?.length || 0
                                        const subjectProps = groupData?.Zone
                                        const subjectGrade = groupData?.Grade
                                        const subjectSem = groupData?.Semester
                                        const hasData = subjectCount > 0 && groupData.Zone === '선택'
                                        const isMainSelected = selectGroup === groupName
                                        const isRelated = relatedGroups.includes(groupName)

                                        return (
                                            <button
                                                key={groupName}
                                                disabled={!hasData}
                                                onClick={() => setSelectGroup(groupName)}
                                                className={cn(
                                                    "w-full flex items-center gap-2.5 p-2.5 rounded-xl transition-all duration-200 text-left group border",
                                                    !hasData && "opacity-40 cursor-not-allowed bg-slate-100",
                                                    isMainSelected
                                                        ? "bg-indigo-200 border-indigo-300 shadow-sm"
                                                        : isRelated
                                                            ? "bg-indigo-200 border-indigo-300"
                                                            : "bg-transparent border-transparent hover:bg-white hover:border-slate-200 hover:shadow-xs"
                                                )}
                                            >
                                                <div className={cn(
                                                    "w-1 h-5 rounded-full transition-all",
                                                    isMainSelected ? "bg-indigo-600" : "bg-slate-200 group-hover:bg-slate-300",
                                                    isRelated ? "bg-indigo-600" : "bg-slate-200 group-hover:bg-slate-300",
                                                )} />
                                                <div className="flex items-center justify-between min-w-0 flex-1">
                                                    <p className={cn(
                                                        "text-xs font-bold truncate",
                                                        isMainSelected ? "text-indigo-900" : "text-slate-700"
                                                    )}>
                                                        {groupName}
                                                    </p>
                                                    {isRelated && !isMainSelected && (
                                                        <span className="text-[9px] px-1 py-0.2 bg-indigo-100 text-indigo-700 rounded font-semibold">연관</span>
                                                    )}
                                                    <div className="flex items-center gap-1.5">
                                                        {subjectProps && (
                                                            <span className="text-[9px] font-bold text-slate-400 uppercase">
                                                                {subjectProps}
                                                            </span>
                                                        )}
                                                        {subjectGrade && (
                                                            <span className="text-[9px] px-1.5 py-0.5 rounded-md font-medium bg-slate-100 text-slate-500">
                                                                {subjectGrade}학년
                                                            </span>
                                                        )}
                                                        {subjectSem && (
                                                            <span className="text-[9px] px-1.5 py-0.5 rounded-md font-medium bg-slate-100 text-slate-500">
                                                                {subjectSem}학기
                                                            </span>
                                                        )}
                                                        {subjectCount > 0 && (
                                                            <span className={cn(
                                                                "text-[9px] px-1.5 py-0.5 rounded-md font-medium",
                                                                isMainSelected ? "bg-indigo-50 text-indigo-600" : "bg-slate-100 text-slate-500"
                                                            )}>
                                                                {subjectCount}과목
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </button>
                                        )
                                    })}
                                </div>
                            </ScrollArea>
                        </div>
                    </div>

                    {/* 오른쪽: 선택된 그룹 정보 확인 및 수정 영역 */}
                    <div className="md:col-span-7 space-y-4 border-t md:border-t-0 md:border-l md:pl-6 pt-4 md:pt-0">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-semibold text-foreground">그룹 상세 정보 및 수정</label>
                            <div className="flex gap-2">
                                {selectGroup && (
                                    relatedGroups.map((item) => {
                                        return (
                                            <Badge variant="outline" className="text-xs text-indigo-600 border-indigo-200">
                                                {item}
                                            </Badge>
                                        )

                                    })

                                )}
                            </div>
                        </div>

                        {selectedGroupData ? (
                            <div className="space-y-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                                <label className="text-xs font-medium text-slate-500">선택하신 그룹의 학점과 과목선택수를 바꿀 수 있습니다.</label>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-slate-500">선택된 그룹명</label>
                                    <div className="flex gap-4">
                                        {selectGroup && (
                                            relatedGroups.map((item) => {
                                                return (
                                                    <Badge variant="outline" className="text-xs text-white bg-indigo-700 border-indigo-200">
                                                        {item}
                                                    </Badge>
                                                )
                                            })
                                        )}
                                    </div>

                                </div>


                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                        <span className="text-[11px] text-slate-400 block font-medium">학년 / 학기</span>
                                        <span className="text-xs font-bold text-slate-700">
                                            {selectedGroupData.Grade || '-'}학년 {selectedGroupData.Semester || '-'}학기
                                        </span>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                        <span className="text-[11px] text-slate-400 block font-medium">등록된 과목 수</span>
                                        <span className="text-xs font-bold text-indigo-600">
                                            {selectedGroupData.Subject?.length || 0} 과목
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <div className="grid grid-cols-2 relative gap-4">
                                        <div className="col-span-1">
                                            <label className="text-xs font-medium text-slate-500">학점</label>
                                            <Select value={String(editGroupCredit)} onValueChange={(e) => setEditGroupCredit(Number(e))}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder='학점 선택' />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {availableCredits.map((credit) => (
                                                        <SelectItem key={credit} value={String(credit)}>
                                                            <span className="font-bold text-indigo-900">{credit}학점</span>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="col-span-1">
                                            <label className="text-xs font-medium text-slate-500">선택과목수</label>
                                            <Select value={String(editGroupChoice)} onValueChange={(e) => setEditGroupChoice(Number(e))}>
                                                <SelectTrigger className="w-full" disabled={true}>
                                                    <SelectValue placeholder='선택과목수' />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {availableChoice.map((num) => (
                                                        <SelectItem key={num} value={String(num)}>
                                                            <span className="font-bold text-indigo-900">{num}</span>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-2">
                                    <button
                                        onClick={handleUpdateGroup}
                                        className="
                                        flex items-center gap-1.5 px-4 py-2 
                                        bg-indigo-400 hover:bg-indigo-900 text-white text-xs font-semibold 
                                        rounded-xl transition-all shadow-sm
                                        "
                                    >
                                        <Save className="w-3.5 h-3.5" />
                                        변경사항 적용
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="h-70 flex items-center justify-center border border-dashed border-slate-200 rounded-2xl text-slate-400 text-xs">
                                왼쪽 목록에서 그룹을 선택해주세요.
                            </div>
                        )}
                    </div>

                </div>
            </CardContent>
        </Card>
    )
}
// 수정
// 기존 그룹에서 그룹 정보 수정함. JsonData업데이트 해야 함.
// 복사
// 새로운 그룹을 생성 이미 검증된 자료이기 때문에 검증은 필요없고, 그룹추가, inaddTable2를 실행해야 함.
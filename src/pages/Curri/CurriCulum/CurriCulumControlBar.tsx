import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Separator } from "@/components/ui";
import { YEARS } from "@/data/data";
import { useCurriTableStore } from "@/store/CurriSubjectStore";
import { BookOpen, CalendarDays, GraduationCap, Layers } from "lucide-react";
import { useEffect } from "react";
//그룹명
const SUBJECT_GROUPS = [...Array.from({ length: 50 }, (_, i) => `그룹 ${i + 1}`)];
// 학년학기
const SUBJECT_SEMESTERS = [
    { label: '학기 선택', value: "0-0" },
    { label: "1학년 1학기", value: "1-1" },
    { label: "1학년 2학기", value: "1-2" },
    { label: "2학년 1학기", value: "2-1" },
    { label: "2학년 2학기", value: "2-2" },
    { label: "3학년 1학기", value: "3-1" },
    { label: "3학년 2학기", value: "3-2" },
]

export type configProps = {
    group: string
    grade: number
    sem: number
    choice: number
    credit: number
}

interface ControlBarProps {
    config: configProps;
    onConfigChange: (newConfig: configProps) => void;
}

export const CurriculumControlBar = ({ config, onConfigChange }: ControlBarProps) => {
    const year = useCurriTableStore((state) => state.year)
    const setYear = useCurriTableStore((state) => state.setYear)
    const userData = useCurriTableStore((state) => state.userData);

    const currentGroups = userData[year].Group
    const schoolFixedCount = userData[year].학교지정.filter(item => item.IsGroup === '').length

    // 헬퍼 함수: 특정 키값만 업데이트하여 부모로 전달
    const updateConfig = (updates: Partial<configProps>) => {
        onConfigChange({ ...config, ...updates });
    };

    useEffect(() => {
        // 1. '학교지정'이거나 그룹명이 없는 경우는 제외
        if (!config.group || config.group === '학교지정') return;

        // 2. 현재 선택된 그룹의 상세 데이터 가져오기
        const selectedGroupData = userData[year]?.Group?.[config.group];

        // 3. 그룹 데이터가 존재하고, 실제로 설정된 값이 있는 경우에만 업데이트
        // (Zone이 null이 아니거나 Grouptag가 있는 등 '설정됨'의 기준을 체크)
        if (selectedGroupData && selectedGroupData.Zone !== null) {
            onConfigChange({
                ...config,
                grade: selectedGroupData.Grade || 0,
                sem: selectedGroupData.Semester || 0,
                choice: selectedGroupData.Choice || 1,
                credit: selectedGroupData.Credit || 2,
            });
        } else {
            onConfigChange({
                ...config,
                grade: 0,
                sem: 0,
                choice: 1,
                credit: 2,
            })
        }
    }, [config.group, year]); // 그룹명이나 연도가 바뀔 때마다 실행

    return (
        <div className="sticky top-0 z-30 flex items-center gap-4 p-3 bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-sm mb-4">
            {/* 1. 입학 연도 설정 (전역 기준) */}
            <div className="flex items-center gap-2 px-2">
                <CalendarDays className="w-4 h-4 text-slate-400" />
                <Select defaultValue={YEARS[0]} value={year} onValueChange={setYear}>
                    <SelectTrigger className="w-34 h-9 border-none bg-transparent font-bold text-slate-700 focus:ring-0">
                        <SelectValue placeholder="연도" />
                    </SelectTrigger>
                    <SelectContent>
                        {YEARS.map((year) => (
                            <SelectItem key={year} value={year}>
                                {year}학년도
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Separator orientation="vertical" className="h-6" />

            {/* 2. 그룹 설정 (선택과목용) */}
            <div className="flex items-center gap-5 flex-1">
                <div className="flex items-center gap-2 min-w-40">
                    <Layers className="w-4 h-4 text-indigo-500" />
                    {/* <Input
                        placeholder="그룹명 (예: 기초영역 택 1)"
                        className="h-9 border-slate-200 bg-slate-50/50 focus-visible:ring-indigo-500"
                    /> */}
                    <Select
                        value={config.group}
                        onValueChange={(val) => updateConfig({ group: val })}
                    >
                        <SelectTrigger className="w-35 h-9 border-slate-200 bg-white">
                            <SelectValue placeholder="그룹명 선택" />
                        </SelectTrigger>

                        {/* ✨ 핵심: max-h를 설정하고 overflow-y-auto를 부여합니다. */}
                        <SelectContent className="max-h-80 overflow-y-auto">
                            <SelectItem key='학교지정' value="학교지정">
                                <div className="flex items-center justify-between w-full gap-4">
                                    <span>학교지정</span>
                                    {schoolFixedCount > 0 && (
                                        <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full font-medium">
                                            {schoolFixedCount}
                                        </span>
                                    )}
                                </div>
                            </SelectItem>

                            <Separator className="my-1" />

                            {SUBJECT_GROUPS.map((groupName) => {
                                const groupData = currentGroups[groupName];
                                const subjectCount = groupData?.Subject?.length || 0;
                                const subjectProps = groupData?.Zone; // "선택", "지정" 등
                                const hasData = subjectCount > 0;

                                return (
                                    <SelectItem key={groupName} value={groupName}>
                                        <div className="flex items-center justify-between w-full gap-3">
                                            <div className="flex items-center gap-2">
                                                {/* 1. 그룹 이름 (데이터 유무에 따라 강조) */}
                                                <span className={hasData ? "font-bold text-indigo-600" : "text-slate-600"}>
                                                    {groupName}
                                                </span>

                                                {/* 2. Zone 정보 (subjectProps) 표시 - 데이터가 있을 때만 작은 텍스트로 표시 */}
                                                {hasData && subjectProps && (
                                                    <span className={`text-[10px] px-1 rounded border ${subjectProps === '선택'
                                                        ? "text-blue-500 border-blue-100 bg-blue-50"
                                                        : "text-slate-400 border-slate-100 bg-slate-50"
                                                        }`}>
                                                        {subjectProps}
                                                    </span>
                                                )}
                                            </div>

                                            {/* 3. 과목 수 배지 */}
                                            {hasData && (
                                                <span className="text-[10px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded-md border border-indigo-100 font-bold">
                                                    {subjectCount}
                                                </span>
                                            )}
                                        </div>
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-slate-400" />
                    <Select
                        value={`${config.grade}-${config.sem}`}
                        onValueChange={(val) => {
                            const [g, s] = val.split('-').map(Number);
                            updateConfig({ grade: g, sem: s });
                        }}
                    >
                        <SelectTrigger className="w-35 h-9 border-slate-200 bg-white">
                            <SelectValue placeholder="대상 학기" />
                        </SelectTrigger>
                        <SelectContent>
                            {SUBJECT_SEMESTERS.map((sem) => (
                                <SelectItem key={sem.value} value={sem.value}>
                                    {sem.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-slate-400" />
                    <div className="flex items-center bg-white border border-slate-200 rounded-md px-2 focus-within:ring-1 focus-within:ring-indigo-500">
                        <span className="text-[11px] font-bold text-slate-700 mr-1">택</span>
                        <Input
                            type="number"
                            value={config.choice}
                            onChange={(e) => updateConfig({ choice: Number(e.target.value) })}
                            min={1}
                            max={10}
                            className="w-10 h-8 border-none p-0 text-center focus-visible:ring-0 font-bold"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-700">과목당</span>
                    <Input
                        type="number"
                        value={config.credit}
                        onChange={(e) => updateConfig({ credit: Number(e.target.value) })}
                        min={2}
                        max={10}
                        className="w-12 h-9 border-slate-200 text-center font-bold"
                    />
                    <span className="text-[11px] font-bold text-slate-700">학점</span>
                </div>
            </div>
        </div>
    );
};
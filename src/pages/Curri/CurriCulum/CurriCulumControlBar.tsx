import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Separator } from "@/components/ui";
import { YEARS } from "@/data/data";
import { useCurriTableStore } from "@/store/CurriSubjectStore";
import { BookOpen, CalendarDays, GraduationCap, Layers} from "lucide-react";
//그룹명
const SUBJECT_GROUPS = [...Array.from({ length: 50 }, (_, i) => `그룹 ${i + 1}`)];
// 학년학기
const SUBJECT_SEMESTERS = [
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
    // 헬퍼 함수: 특정 키값만 업데이트하여 부모로 전달
    const updateConfig = (updates: Partial<configProps>) => {
        onConfigChange({ ...config, ...updates });
    };

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
                        <SelectContent className="max-h-20 overflow-y-auto [&>div]:p-1">
                            {SUBJECT_GROUPS.map((group) => (
                                <SelectItem key={group} value={group}>
                                    {group}
                                </SelectItem>
                            ))}
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
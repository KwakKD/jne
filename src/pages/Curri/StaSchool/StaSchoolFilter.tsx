import { Button, Checkbox, Popover, PopoverContent, PopoverTrigger } from "@/components/ui";
import { ChevronDown, MapPin, RotateCcw, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider" // 양 끝값 조절용 듀얼 슬라이더
import { JNE_REGIONS } from "@/data/data";

interface StaSchoolHeaderProps {
    onFilterChange: (filters: { minClass: number; maxClass: number; regions: string[] }) => void
}

export function StaSchoolFilter({ onFilterChange }: StaSchoolHeaderProps) {
    // 1. 학급 수 슬라이더 상태 (최소 1학급 ~ 최대 30학급 기준 가정)
    const [classRange, setClassRange] = useState<[number, number]>([1, 30])

    // 2. 지역 선택 상태 (복수 선택을 위해 배열로 관리)
    const [selectedRegions, setSelectedRegions] = useState<string[]>([])

    // 학급 수 변경 핸들러
    const handleRangeChange = (values: number[]) => {
        const newRange: [number, number] = [values[0], values[1]]
        setClassRange(newRange)
        onFilterChange({ minClass: newRange[0], maxClass: newRange[1], regions: selectedRegions })
    }

    // 지역 체크박스 변경 핸들러
    const handleRegionToggle = (region: string) => {
        let updated: string[] = []
        if (region === "전체") {
            updated = [] // 전체 선택 시 개별 필터 비움
        } else {
            updated = selectedRegions.includes(region)
                ? selectedRegions.filter((r) => r !== region)
                : [...selectedRegions, region]
        }
        setSelectedRegions(updated)
        onFilterChange({ minClass: classRange[0], maxClass: classRange[1], regions: updated })
    }

    // 필터 초기화
    const handleReset = () => {
        setClassRange([1, 30])
        setSelectedRegions([])
        onFilterChange({ minClass: 1, maxClass: 30, regions: [] })
    }

    return (
        <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-8">
            <div className="flex items-center gap-8 flex-1">

                {/* 조건 검색 타이틀 레이블 */}
                <div className="flex items-center gap-1.5 text-slate-500 font-bold text-xs pr-4 border-r border-slate-200 shrink-0">
                    <SlidersHorizontal size={13} className="text-slate-400" />
                    <span>조건 필터</span>
                </div>

                {/* [왼쪽 필터] 학급 수 양 끝값 Slider 영역 */}
                <div className="flex flex-col gap-1.5 w-72 shrink-0">
                    <div className="flex justify-between items-center">
                        <label className="text-[11px] font-bold text-slate-500">
                            학급 수 규모 범위
                        </label>
                        <span className="text-[11px] font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                            {classRange[0]}학급 ~ {classRange[1]}학급
                        </span>
                    </div>
                    {/* Radix UI의 듀얼 요소를 커스텀한 양 끝값 조절 슬라이더 */}
                    <SliderPrimitive.Root
                        className="relative flex items-center select-none touch-none w-full h-5 cursor-pointer"
                        value={classRange}
                        max={30}
                        min={1}
                        step={1}
                        onValueChange={handleRangeChange}
                    >
                        <SliderPrimitive.Track className="bg-slate-200 relative flex-1 h-1.5 rounded-full">
                            <SliderPrimitive.Range className="absolute bg-indigo-600 h-full rounded-full" />
                        </SliderPrimitive.Track>
                        {/* 최소값 조절 손잡이 */}
                        <SliderPrimitive.Thumb className="block w-4 h-4 bg-white border-2 border-indigo-600 rounded-full shadow-md hover:scale-110 transition-transform focus:outline-none" />
                        {/* 최대값 조절 손잡이 */}
                        <SliderPrimitive.Thumb className="block w-4 h-4 bg-white border-2 border-indigo-600 rounded-full shadow-md hover:scale-110 transition-transform focus:outline-none" />
                    </SliderPrimitive.Root>
                </div>

                {/* [오른쪽 필터] 지역 체크박스 Popover 영역 */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                        <MapPin size={12} className="text-slate-400" />
                        소속 지역 분류
                    </label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-8.5 rounded-xl border-slate-200 text-xs font-semibold text-slate-700 bg-white shadow-2xs min-w-40 justify-between gap-2"
                            >
                                <span>
                                    {selectedRegions.length === 0
                                        ? "전체 지역"
                                        : `선택된 지역 (${selectedRegions.length})`}
                                </span>
                                <ChevronDown size={14} className="text-slate-400 shrink-0" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-60 p-2 max-h-72 overflow-y-auto rounded-xl shadow-xl border border-slate-200" align="start">
                            <div className="space-y-1">
                                {/* 전체 선택 토글 버튼 스타일 */}
                                <div
                                    className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-lg cursor-pointer text-xs font-semibold"
                                    onClick={() => handleRegionToggle("전체")}
                                >
                                    <Checkbox checked={selectedRegions.length === 0} />
                                    <span className={selectedRegions.length === 0 ? "text-indigo-600 font-bold" : "text-slate-700"}>
                                        전체 지역 선택
                                    </span>
                                </div>
                                <div className="h-px bg-slate-100 my-1" />
                                {/* 전남 시군 체크박스 리스트 */}
                                {JNE_REGIONS.filter(r => r !== "전체 지역").map((region) => (
                                    <div
                                        key={region}
                                        className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-lg cursor-pointer text-xs font-medium"
                                        onClick={() => handleRegionToggle(region)}
                                    >
                                        <Checkbox checked={selectedRegions.includes(region)} />
                                        <span className={selectedRegions.includes(region) ? "text-indigo-600 font-bold" : "text-slate-600"}>
                                            {region}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>

            </div>

            {/* 필터 초기화 버튼 */}
            {/* {(classRange[0] !== 1 || classRange[1] !== 30 || selectedRegions.length > 0) && ( */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleReset}
                    className="h-8 text-xs text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl gap-1.5 font-bold transition-all shrink-0 animate-in fade-in zoom-in-95"
                >
                    <RotateCcw size={12} />
                    <span>필터 초기화</span>
                </Button>
            {/* )} */}
        </div>
    )
}
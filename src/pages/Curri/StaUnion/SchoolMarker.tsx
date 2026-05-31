import { cn } from "@/lib/utils";
import React from "react";

export const SchoolMarker = React.memo(({
    school,
    schoolCount,
    isSelected,
    dynamicFontSize,
    onClick
}: {
    school: any;
    schoolCount: number;
    isSelected: boolean;
    dynamicFontSize: number;
    onClick: () => void;
}) => {
    const wrapperWidth = dynamicFontSize * 10;
    const wrapperHeight = dynamicFontSize * 5;

    return (
        <foreignObject
            x={school.x - (wrapperWidth / 2)}
            y={school.y - wrapperHeight}
            width={wrapperWidth}
            height={wrapperHeight}
            className="overflow-visible"
            style={{ contentVisibility: 'auto' as any }}
        >
            <div
                onClick={onClick}
                className="w-full h-full flex flex-col items-center justify-end cursor-pointer group select-none"
                style={{ fontSize: `${dynamicFontSize}px` }}
            >
                {/* 1. 상단 미니 포인트 마커 (과목 수가 들어가는 작은 원형 핀) */}
                {schoolCount > 0 && (
                    <div
                        className={cn(
                            "relative flex items-center justify-center font-black rounded-full shadow-md border transition-all duration-200",
                            // 💡 크기를 기존보다 컴팩트하게 조절 ([1.8em])
                            "w-[2.2em] h-[2.2em] text-[1em]",
                            isSelected
                                ? "bg-indigo-600 border-indigo-700 text-white scale-110 z-10 animate-bounce"
                                : "bg-orange-500 border-orange-600 text-white group-hover:bg-indigo-500 group-hover:border-indigo-600"
                        )}
                    >
                        {/* 과목 수 노출 */}
                        <span className="text-[0.85em]">{schoolCount}</span>

                        {/* 선택되었을 때만 마커 뒤에서 은은하게 퍼지는 펄스(Pulse) 레이더 효과 */}
                        {isSelected && (
                            <span className="absolute inset-0 rounded-full bg-indigo-600/40 animate-ping pointer-events-none" />
                        )}
                        {/* 2. 작은 삼각형 앵커 (핀 모양을 잡아주는 디테일) */}
                        <div
                            className={cn(
                                "w-0 h-0 border-l-[0.3em] border-l-transparent border-r-[0.3em] border-r-transparent border-t-[0.4em] -mt-[1px] mb-[0.2em] transition-colors duration-200",
                                isSelected ? "border-t-indigo-600" : "border-t-orange-500 group-hover:border-t-indigo-500"
                            )}
                        />
                    </div>
                )}




                {/* 3. 하단 학교명 텍스트 레이어 (말풍선 테두리를 빼고 텍스트만 깔끔하게) */}
                <div
                    className={cn(
                        "px-[0.4em] py-[0.1em] rounded-md transition-all duration-200 whitespace-nowrap font-bold tracking-tight text-[1.2em]",
                        isSelected
                            ? "text-indigo-600 bg-indigo-50/90 shadow-sm"
                            : "text-slate-700 group-hover:text-indigo-600"
                    )}
                >
                    {/* 학교 이름이 너무 길어 부딪히는 것을 방지 */}
                    <span className="block truncate max-w-[8em]">
                        {school.name.replace("고등학교", "고")}
                    </span>
                </div>
            </div>
        </foreignObject>
    );
});

SchoolMarker.displayName = 'SchoolMarker';
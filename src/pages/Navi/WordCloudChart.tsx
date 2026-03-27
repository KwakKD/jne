import { Info } from "lucide-react";
import { useMemo } from "react";
import { Wordcloud } from "@visx/wordcloud";
import { ParentSize } from "@visx/responsive";
import { useTooltip, useTooltipInPortal, defaultStyles } from "@visx/tooltip";
import { scaleLog } from "@visx/scale";
import { localPoint } from "@visx/event";

// 데이터 구조 업데이트: 툴팁에 표시할 상세 카운트 추가
interface WordData {
    text: string;
    value: number;
    core?: number;
    rec?: number;
    etc?: number;
}

const tooltipStyles = {
    ...defaultStyles,
    backgroundColor: "rgba(15, 23, 42, 0.95)", // slate-900 계열
    color: "white",
    padding: "12px",
    borderRadius: "12px",
    fontSize: "12px",
    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3)",
    border: "1px solid rgba(255,255,255,0.1)",
    zIndex: 100,
    lineHeight: "1.5",
};

interface WordCloudProps {
    words: WordData[]
    onWordClick?: (word: WordData) => void
}

const WordCloudChart = ({ words, onWordClick }: WordCloudProps) => {
    // 툴팁 훅 사용
    const {
        tooltipOpen,
        showTooltip,
        hideTooltip,
        tooltipData,
        tooltipLeft,
        tooltipTop,
    } = useTooltip<WordData>();

    // 포탈을 사용하여 툴팁이 부모 컨테이너에 잘리지 않도록 함
    const { TooltipInPortal } = useTooltipInPortal({
        scroll: true,
        detectBounds: true,
    });

    const fontScale = useMemo(() => {
        if (words.length === 0) return null;
        const values = words.map((w) => w.value);
        return scaleLog({
            domain: [Math.min(...values), Math.max(...values)],
            range: [16, 48],
        });
    }, [words]);

    if (words.length === 0 || !fontScale) {
        return (
            <div className="flex h-full flex-col items-center justify-center text-slate-300 italic">
                <Info size={32} className="mb-2 opacity-20" />
                <p className="text-sm">데이터가 충분하지 않습니다.</p>
            </div>
        );
    }

    return (
        <div className="w-full h-full relative">
            <ParentSize>
                {({ width, height }) => (
                    <Wordcloud
                        words={words}
                        width={width}
                        height={height}
                        fontSize={(w) => fontScale(w.value)}
                        font={"Pretendard, sans-serif"}
                        padding={4}
                        spiral="archimedean"
                        rotate={0}
                        random={() => 0.5}
                    >
                        {(cloudWords) =>
                            cloudWords.map((w, i) => (
                                <text
                                    key={`${w.text}-${i}`}
                                    fill={i % 3 === 0 ? "#3b82f6" : i % 3 === 1 ? "#10b981" : "#6366f1"}
                                    textAnchor="middle"
                                    transform={`translate(${w.x}, ${w.y})`}
                                    className="font-bold transition-all duration-300 hover:opacity-60 cursor-pointer"
                                    style={{ fontSize: w.size }}
                                    // 마우스 이벤트 처리
                                    onClick={()=>{
                                        if (onWordClick) onWordClick(w as unknown as WordData)
                                            window.scrollTo({top:800, behavior: 'smooth'})
                                    }}
                                    onMouseMove={(event) => {
                                        const coords = localPoint(event) || { x: 0, y: 0 };
                                        showTooltip({
                                            tooltipData: w as unknown as WordData, // visx 내부 객체를 WordData로 캐스팅
                                            tooltipLeft: coords.x + 15,
                                            tooltipTop: coords.y - 15,
                                        });
                                    }}
                                    onMouseOut={hideTooltip}
                                >
                                    {w.text}
                                </text>
                            ))
                        }
                    </Wordcloud>
                )}
            </ParentSize>

            {/* 툴팁 렌더링 영역 */}
            {tooltipOpen && tooltipData && (
                <TooltipInPortal top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
                    <div className="flex flex-col gap-2 min-w-[150px]">
                        <div className="border-b border-slate-700 pb-2 mb-1">
                            <span className="text-sm font-bold text-white tracking-tight">
                                {tooltipData.text}
                            </span>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-[11px]">
                                <div className="flex items-center gap-1.5 text-rose-400 font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                    핵심 권장
                                </div>
                                <span className="text-white font-mono">{tooltipData.core || 0}개 학과</span>
                            </div>

                            <div className="flex items-center justify-between text-[11px]">
                                <div className="flex items-center gap-1.5 text-blue-400 font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    권장 과목
                                </div>
                                <span className="text-white font-mono">{tooltipData.rec || 0}개 학과</span>
                            </div>

                            <div className="flex items-center justify-between text-[11px]">
                                <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                                    기타/공통
                                </div>
                                <span className="text-white font-mono">{tooltipData.etc || 0}개 학과</span>
                            </div>
                        </div>

                        <div className="mt-2 pt-2 border-t border-slate-700/50">
                            <p className="text-[10px] text-emerald-400 leading-relaxed italic">
                                {Number(tooltipData.core) > 0
                                    ? `✨ 해당 학과에서 가장 중시하는 핵심 과목입니다.`
                                    : `💡 대학별 권장 지표를 참고하여 선택하세요.`}
                            </p>
                        </div>
                    </div>
                </TooltipInPortal>
            )}
        </div>
    );
};

export { WordCloudChart };
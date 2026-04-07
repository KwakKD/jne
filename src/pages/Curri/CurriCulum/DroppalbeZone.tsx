import { useDroppable } from "@dnd-kit/core";

interface Props {
    id: string;
    title: string;
}

export const DroppableZone = ({ id, title }: Props) => {
    // 1. active: 현재 전체 앱 내에서 무언가 드래그 중인 아이템이 있는지 확인
    const { setNodeRef, isOver, active } = useDroppable({ id });

    // 드래그 중인 아이템이 있을 때(active !== null)를 감지합니다.
    const isDraggingAny = active !== null;

    return (
        <div
            ref={setNodeRef}
            className={`
                relative flex-1 min-h-10 p-2 border-2 border-dashed rounded-[2.5rem] transition-all duration-300
                flex flex-col items-center justify-center text-center
                
                ${isOver 
                    ? 'border-indigo-500 bg-indigo-50/80 scale-[1.03] shadow-xl shadow-indigo-100/50' // 3단계: 마우스가 영역 위로 올라옴 (Hover)
                    : isDraggingAny
                        ? 'border-indigo-300 bg-indigo-50/30 animate-pulse scale-[1.01]' // 2단계: 드래그가 시작됨 (가이드 표시)
                        : 'border-slate-200 bg-white/50 hover:border-slate-300' // 1단계: 평상시
                }
            `}
        >
            {/* 배경 아이콘 효과 (isDraggingAny일 때만 살짝 등장) */}
            {isDraggingAny && !isOver && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                    <div className="w-12 h-12 rounded-full border-4 border-indigo-200 border-t-transparent animate-spin" />
                </div>
            )}

            <h4 className={`
                text-[13px] font-black mb-1 transition-colors
                ${isOver ? 'text-indigo-600' : isDraggingAny ? 'text-indigo-400' : 'text-slate-500'}
            `}>
                {title}
            </h4>
            
            <p className={`
                text-[11px] font-bold transition-opacity duration-300
                ${isOver ? 'text-indigo-400 opacity-100' : isDraggingAny ? 'text-indigo-300 opacity-100' : 'opacity-0'}
            `}>
                {isOver ? "놓아서 편성하기" : "여기에 드롭하세요"}
            </p>

            {/* 여기에 나중에 편성된 과목 리스트를 렌더링합니다 */}
        </div>
    );
};
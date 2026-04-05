import { useDroppable } from "@dnd-kit/core";

interface Props {
    id: string; // 'fixed', 'select', 'student' 등
    title: string;
}

export const DroppableZone = ({ id, title }: Props) => {
    const { setNodeRef, isOver } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            className={`
        flex-1 min-h-40 p-6 border-2 border-dashed rounded-[2.5rem] transition-all
        /* 마우스가 영역 위로 올라오면(isOver) 색상 변경 */
        ${isOver ? 'border-indigo-500 bg-indigo-50/50 scale-[1.02]' : 'border-slate-200 bg-white/50'}
      `}
        >
            <h4 className={`text-xs font-bold mb-4 ${isOver ? 'text-indigo-600' : 'text-slate-400'}`}>
                {title}
            </h4>
            {/* 여기에 나중에 편성된 과목 리스트를 렌더링합니다 */}
        </div>
    );
};
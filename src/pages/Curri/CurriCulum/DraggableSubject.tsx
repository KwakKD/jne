import { useCurriDragStore } from '@/store/CurriDragStroe';
import type { SubjectType } from '@/type/curri';
import { useDraggable } from '@dnd-kit/core';
import { GripVertical } from 'lucide-react';

interface Props {
    subject: SubjectType;
}

export const DraggableSubject = ({ subject }: Props) => {
    const { selectedTags, toggleSelect } = useCurriDragStore();
    const isSelected = selectedTags.includes(subject.Tag);

    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: subject.Tag,
        data: subject,
    });

    const style = transform ? {
        // transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 100,
    } : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            // 1. 드래그 센서(listeners)와 속성(attributes)을 가장 바깥 div로 이동
            {...listeners}
            {...attributes}
            // 2. 카드 전체 클릭 시 선택 토글
            onClick={() => toggleSelect(subject.Tag)}
            className={`
                group relative flex items-center gap-3 px-3.5 py-1.5 rounded-xl border transition-all
                /* cursor-pointer 대신 드래그 가능함을 알리는 cursor-grab 사용 */
                cursor-grab active:cursor-grabbing
                ${isSelected
                    ? 'border-indigo-500 bg-indigo-50/50 shadow-md ring-1 ring-indigo-500'
                    : 'border-slate-200 bg-white hover:border-indigo-300 shadow-sm'}
                ${isDragging ? 'opacity-50 shadow-2xl scale-105' : ''}
            `}
        >
            {/* 드래그 핸들 아이콘 (이제 단순 시각용) */}
            <div className="p-1 rounded">
                <GripVertical size={14} className={isSelected ? 'text-indigo-500' : 'text-slate-400'} />
            </div>

            <div className="flex flex-col gap-1 min-w-0 flex-1">
                <span className={`text-[10px] font-bold ${isSelected ? 'text-indigo-600' : 'text-slate-500'}`}>
                    {subject.교과군}
                </span>
                <p className={`text-sm font-bold truncate ${isSelected ? 'text-indigo-900' : 'text-slate-800'}`}>
                    {subject.과목명}
                </p>
            </div>

            {/* 선택 시 우측 상단에 작은 체크 표시 (시각적 피드백) */}
            {isSelected && (
                <div className="absolute top-2 right-2 w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-2.5 border-r-2 border-b-2 border-white rotate-45 mb-0.5" />
                </div>
            )}
        </div>
    );
};
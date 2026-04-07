// import { ChevronRight, Home, Layout } from "lucide-react";
import { SubjectLibrary } from "./SubjectList";
import { useCurriDragStore } from "@/store/CurriDragStroe";
import { useState } from "react";
import type { SubjectType } from "@/type/curri";
import { DndContext, DragOverlay, PointerSensor, pointerWithin, useSensor, useSensors, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";
import { SUBJECT } from "@/data/Curri/subject";
import { DroppableZone } from "./DroppalbeZone";
import { DraggableSubject } from "./DraggableSubject";
import { CurriculumControlBar, type configProps } from "./CurriCulumControlBar";
import { useCurriTableStore } from "@/store/CurriSubjectStore";
import { CurriculumPreview } from "./CurriCulumPreview";

// 드롭존이 아닌 부분에 드롭이 된 경우 생각함.

const Curriculum = () => {
    const selectedTags = useCurriDragStore((state) => state.selectedTags);
    const clearSelection = useCurriDragStore((state) => state.clearSelection);
    const toggleSelect = useCurriDragStore((state) => state.toggleSelect);
    const [activeSubject, setActiveSubject] = useState<SubjectType | null>(null);
    const year = useCurriTableStore((state) => state.year)

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
    );

    const [config, setConfig] = useState<configProps>({
        group: '그룹 1',
        grade: 1,
        sem: 1,
        choice: 1,
        credit: 2
    });

    const handleConfigChange = (newConfig: configProps) => {
        setConfig(newConfig);
    };

    // 드래그 시작 시 호출
    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const dragged = SUBJECT.find(s => s.Tag === active.id);
        if (dragged) setActiveSubject(dragged);
    };
    const handleDragEnd = (event: DragEndEvent) => {
        const { over, active } = event;

        // over가 null이 아니면 유효한 드롭존에 떨어진 것임
        if (over) {
            const zoneId = over.id as string; // 'fixed' 등
            const draggedTag = active.id as number; // 드래그한 과목의 Tag

            // 여기서 '편성 Store'의 함수를 호출하여 데이터를 넘겨주면 됩니다!
            console.log(`과목 ${draggedTag}번을 ${zoneId} 영역에 편성합니다.`);
            console.log(selectedTags)
            clearSelection()
            // 예시: addSubjectToPlan(zoneId, isMulti ? selectedTags : [draggedTag]);
        }

        // 드래그 종료 후 상태 초기화
        setActiveSubject(null);

    };


    return (
        <DndContext
            sensors={sensors}
            collisionDetection={pointerWithin}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="relative min-h-screen bg-slate-50 overflow-hidden">
                {/* 2. 페이지 상단 네비게이션 바 */}
                {/* <header className="relative z-10 flex items-center justify-between px-8 pt-0 pb-4 bg-white/70 backdrop-blur-md border-b border-slate-200">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                            <Home size={16} />
                            <ChevronRight size={14} />
                            <span className="font-medium text-slate-600">교육과정 편성</span>
                            <ChevronRight size={14} />
                            <span className="font-bold text-indigo-600">학교 교육과정 편성</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors">
                            도움말
                        </button>
                        <button className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
                            최종 저장하기
                        </button>
                    </div>
                </header> */}

                {/* 3. 메인 콘텐츠 영역 (사이드바 + 중앙 캔버스) */}
                <main className="relative z-10 flex h-[calc(100vh)] p-0 gap-6">

                    {/* [좌측] 과목 보관함 컴포넌트 */}
                    <div className="flex-shrink-0 h-full">
                        <SubjectLibrary />
                    </div>

                    {/* [중앙/우측] 앞으로 채워나갈 작업 영역 (Placeholder) */}
                    <div className="flex-1 h-full flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar">
                        {/* 상단 타이틀 안내 */}
                        <div className="flex flex-col gap-1 mb-2">
                            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                                <span className="text-indigo-700">{year}학년도</span> 신입생 교육과정 편성표 설계
                            </h2>
                            <p className="text-slate-500 text-sm">좌측 과목리스트에서 과목을 클릭 후 드래그하여 아래 영역에 배치하세요.</p>
                        </div>

                        <CurriculumControlBar
                            config={config}
                            onConfigChange={handleConfigChange}
                        />
                        {/* ✨ [신규] 선택된 과목 표시 바 */}
                        {selectedTags.length > 0 && (
                            <div className="sticky top-0 z-20 flex items-center justify-between gap-4 p-3 bg-indigo-600 shadow-lg shadow-indigo-100 rounded-2xl animate-in slide-in-from-top-4 ">
                                <div className="flex-1 relative overflow-hidden">
                                    <div
                                        className="flex items-center gap-3 overflow-x-auto no-scrollbar"
                                        style={{
                                            WebkitMaskImage: 'linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent)',
                                            maskImage: 'linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent)'
                                        }}
                                    >
                                        <span className="flex-shrink-0 ml-2 text-xs font-black text-indigo-100 uppercase tracking-wider">
                                            Selected ({selectedTags.length})
                                        </span>
                                        <div className="flex gap-2">
                                            {selectedTags.map(tag => {
                                                const subject = SUBJECT.find(s => s.Tag === tag);
                                                return (
                                                    <div key={tag} className="flex-shrink-0 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[11px] font-bold text-white border border-white/10 flex items-center gap-1.5">
                                                        {subject?.과목명}
                                                        <button
                                                            onClick={() => toggleSelect(tag)}
                                                            className="hover:text-indigo-200"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={clearSelection}
                                    className="flex-shrink-0 mr-2 px-3 py-1.5 bg-white text-indigo-600 text-[11px] font-black rounded-xl hover:bg-indigo-50 transition-colors"
                                >
                                    전체 해제
                                </button>
                            </div>
                        )}

                        {/* 4. 드롭존 영역: 별도 컴포넌트로 구현 (id 필수) */}
                        <div className="grid grid-cols-3 gap-4 min-h-10">
                            <DroppableZone id="fixed" title="학교 지정 영역" />
                            <DroppableZone id="fixed-select" title="학교 지정(선택) 영역" />
                            <DroppableZone id="student" title="학생 선택 영역" />
                        </div>

                        {/* 실시간 편성표 미리보기 (나중에 구현할 곳) */}
                        <div className="flex-1 min-h-0 bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col overflow-hidden">
                            {/* flex-1: 남은 공간을 다 차지함
       min-h-0: flex 자식 요소가 콘텐츠 크기만큼 늘어나는 것을 방지 (스크롤의 핵심)
       overflow-hidden: 내부 컴포넌트의 둥근 모서리 밖으로 내용이 나가는 것 방지
    */}
                            <CurriculumPreview />
                        </div>
                    </div>
                </main>
            </div>
            {/* 5. 드래그 오버레이: 다시 깔끔한 단일 카드 + 숫자 배지 조합 */}
            <DragOverlay dropAnimation={null}>
                {activeSubject ? (
                    <div className="relative w-64 opacity-90 shadow-2xl scale-105 cursor-grabbing rotate-1 transition-transform">
                        {/* 실제로 내가 잡은 그 과목 카드 하나만 보여줌 */}
                        <DraggableSubject subject={activeSubject} />

                        {/* 다중 선택된 상태에서 드래그할 때만 우측 상단에 숫자 표시 */}
                        {selectedTags.length > 1 && selectedTags.includes(activeSubject.Tag) && (
                            <div className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center ring-2 ring-white shadow-lg animate-in zoom-in duration-200">
                                {selectedTags.length}개
                            </div>
                        )}
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};

export { Curriculum }
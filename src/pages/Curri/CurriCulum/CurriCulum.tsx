// import { ChevronRight, Home, Layout } from "lucide-react";
import { SubjectLibrary } from "./SubjectList";
import { useCurriDragStore } from "@/store/CurriDragStroe";
import { useState } from "react";
import type { GroupCell, SubjectType } from "@/type/curri";
import { DndContext, DragOverlay, PointerSensor, pointerWithin, useSensor, useSensors, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";
import { SUBJECT } from "@/data/Curri/subject";
import { DroppableZone } from "./DroppalbeZone";
import { DraggableSubject } from "./DraggableSubject";
import { CurriculumControlBar, type configProps } from "./CurriCulumControlBar";
import { useCurriTableStore } from "@/store/CurriSubjectStore";
import { CurriculumPreview } from "./CurriCulumPreview";
import { toast } from "sonner";
import { duplicateSuject_1, duplicateSuject_2, inJsonData1, inJsonData3 } from "@/utils/Curri/AfterDrop";
import { FileSpreadsheet, FolderOpen, PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen, Save } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui";
import { CurriAllProgress } from "./CurriAllProgress";
import { KEMcheck } from "./Sta/KEMcheck";
import { CreditCheck } from "./Sta/CreditCheck";
import { useStatistics } from "@/hooks/curriSta";
import { exprotToExcel } from "@/utils/Curri/ExportExcel";
import { useAuth } from "@/hooks/useAuth";
import { CurriDataManageModal } from "./CurriDataManageModal";

// 드롭존이 아닌 부분에 드롭이 된 경우 생각함.

const Curriculum = () => {
    const selectedTags = useCurriDragStore((state) => state.selectedTags);
    const clearSelection = useCurriDragStore((state) => state.clearSelection);
    const toggleSelect = useCurriDragStore((state) => state.toggleSelect);
    const [activeSubject, setActiveSubject] = useState<SubjectType | null>(null);
    const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true)
    const [isRightSidebarOpen, setIsRighttSidebarOpen] = useState(false)
    const [isDataModalOpen, setIsDataModalOpen] = useState(false);

    const year = useCurriTableStore((state) => state.year)
    const userData = useCurriTableStore((state) => state.userData)
    const groupUpdate = useCurriTableStore((state) => state.groupUpdate)
    const addTable1 = useCurriTableStore((state) => state.addTable1)
    const addTable2 = useCurriTableStore((state) => state.addTable2)
    const Data = userData[year]
    const totalSubjects = [...SUBJECT, ...Data.AddSubject]
    const { data: loginUser } = useAuth()

    const { statistics_KEM } = useStatistics()

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
    );

    const [config, setConfig] = useState<configProps>({
        group: '학교지정',
        grade: 0,
        sem: 0,
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
            const dropSubs = selectedTags
                .map(sub => totalSubjects.find(item => item.Tag === sub)?.과목명)
                .filter((sub): sub is string => sub !== undefined)
            // droppedMap : 나중에 함수의 인자로 쓰일 예정
            const droppedMap: Map<number, string> = new Map(dropSubs.map((key, index) => [selectedTags[index], key]))
            // selectedTags : 드래그된 과목의 태그.
            if (selectedTags.length === 0) return

            //선택과목이거나 학교지정(선택)인 경우
            if (zoneId !== "fixed") {
                if (config.group === '학교지정') {
                    toast.error('그룹을 먼저 선택하세요.')
                    return
                }
                if (config.grade === 0 || config.sem === 0) {
                    toast.error('학년 및 학기를 선택하세요.')
                    return
                }

                for (const sub of selectedTags) {
                    const subjectCreditInfo = totalSubjects.find(s => s.Tag === sub)
                    const subjectName = subjectCreditInfo?.과목명 ?? ''
                    const min = subjectCreditInfo?.최소학점 ?? 1
                    const max = subjectCreditInfo?.최대학점 ?? 20
                    if (config.credit < min || config.credit > max) {
                        toast.error(`${subjectName} 과목의 유효한 학점은 ${min}에서 ${max}사이입니다.`);
                        return;
                    }
                }

                const groupitem: GroupCell = {
                    Zone: zoneId === 'fixed-select' ? '지정' : '선택',
                    Subject: [],
                    Grouptag: null,
                    Credit: config.credit,
                    Grade: config.grade,
                    Semester: config.sem,
                    Choice: config.choice
                }

                const GroupData = Data.Group[config.group]
                if (!GroupData) return;

                if (GroupData.Subject.length === 0) {
                    groupitem.Subject = [...selectedTags]
                } else {
                    groupitem.Subject = [...GroupData.Subject, ...selectedTags]
                }

                if (zoneId === 'fixed-select') {
                    if (GroupData.Zone === '선택') {
                        toast.error(`선택하신 ${config.group}은 이미 "선택과목"에 있습니다.`)
                    }
                    if (GroupData.Credit !== null) {
                        if (GroupData.Credit !== config.credit) {
                            toast.error(`선택하신 그룹 "${config.group}"은 이미 ${config.credit}학점으로 구성되어 있습니다.`);
                            return
                        }
                    }
                    if (config.choice !== 1) {
                        toast.error('학교지정(선택)은 "택1"으로만 선택할 수 있습니다.');
                        return
                    }
                    if (GroupData.Subject.length + selectedTags.length > 2) {
                        toast.error('학교지정(선택)은 "2과목"으로만 구성되어야 합니다.');
                        return
                    }

                    if (duplicateSuject_1(year, droppedMap)) {
                        groupitem.Subject.sort((a, b) => a - b)
                        groupitem.Grouptag = groupitem.Subject[0]
                        groupUpdate(year, config.group, groupitem)
                        addTable1(year, inJsonData1(selectedTags, config.group, config.grade, config.sem, config.credit, year))
                        toast.success(`${selectedTags.length}개 과목이 성공적으로 등록되었습니다.`)
                    } else {
                        return
                    }
                } else {
                    if (GroupData.Zone === '지정') {
                        toast.error(`선택하신 "${config.group}"은 이미 "학교지정"에 있습니다.`);
                        return
                    }

                    if (GroupData.Credit !== null) {
                        if (GroupData.Credit !== config.credit) {
                            toast.error(`선택하신 그룹 "${config.group}"은 이미 ${GroupData.Credit}학점으로 구성되어 있습니다.`);
                            return
                        }
                    }

                    if (Data.선택과목) {
                        for (const sub of dropSubs) {
                            const choiceSubjects = Data.선택과목.filter(item => item.SubjectName === sub)
                            for (let i = 0; i <= choiceSubjects.length - 1; i++) {
                                if (choiceSubjects[i].Credit !== config.credit) {
                                    toast.error(`"${sub}"과목은 "${choiceSubjects[i].IsGroup}"에서 이미 ${choiceSubjects[i].Credit}학점으로 편성되었습니다.`)
                                    return
                                }
                            }
                        }
                    }

                    if (duplicateSuject_2(droppedMap, config.grade, config.sem, year)) {
                        groupitem.Subject.sort((a, b) => a - b)
                        groupitem.Grouptag = groupitem.Subject[0]
                        groupUpdate(year, config.group, groupitem)
                        addTable2(year, inJsonData3(selectedTags, config.group, config.grade, config.sem, config.credit, year))
                        toast.success(`${selectedTags.length}개 과목이 성공적으로 등록되었습니다.`)
                    } else {
                        return
                    }
                }
            } else {
                if (config.group !== '학교지정') {
                    toast.error('학교지정은 그룹을 "학교지정"으로 설정해야 합니다.');
                    return
                }
                if (duplicateSuject_1(year, droppedMap)) {
                    console.log({ selectedTags }, '과목등록')
                    addTable1(year, inJsonData1(selectedTags, '', null, null, null, year))
                    toast.success(`${selectedTags.length}개 과목이 성공적으로 등록되었습니다.`)
                } else {
                    return
                }
            }

            // 여기서 '편성 Store'의 함수를 호출하여 데이터를 넘겨주면 됩니다!
            console.log(`과목 ${draggedTag}번을 ${zoneId} 영역에 편성합니다.`);
            console.log(selectedTags)

            clearSelection()
        }

        // 드래그 종료 후 상태 초기화
        setActiveSubject(null);
        setConfig({
            group: '학교지정',
            grade: 0,
            sem: 0,
            choice: 1,
            credit: 2
        })

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
                <main className="relative z-10 flex h-[calc(100vh-20px)] p-4 gap-4 overflow-hidden">

                    {/* [좌측] 과목 보관함 컴포넌트 */}
                    <aside className={`bg-white transition-all duration-300 ease-in-out border-r ${isLeftSidebarOpen ? "w-66" : "w-0 opacity-0"}`}>
                        <div className="flex flex-col shrink-0 h-full">
                            <SubjectLibrary />
                        </div>
                    </aside>


                    {/* [중앙/우측] 앞으로 채워나갈 작업 영역 (Placeholder) */}
                    <section className="flex-1 flex flex-col gap-2 overflow-y-auto custom-scrollbar">
                        <TooltipProvider>
                            {/* [좌측 버튼] */}
                            <div className="absolute top-0 left-0 z-40">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button
                                            onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
                                            className="p-2.5 bg-white hover:bg-indigo-600 text-indigo-600 hover:text-white shadow-md rounded-xl border border-indigo-100 transition-all duration-200 group"
                                        >
                                            {isLeftSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent side="right" className="bg-slate-900 text-white border-none">
                                        <p>{isLeftSidebarOpen ? "과목 보관함 접기" : "과목 보관함 펼치기"}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>

                            {/* [우측 버튼] */}
                            <div className="absolute top-0 right-0 z-40">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button
                                            onClick={() => setIsRighttSidebarOpen(!isRightSidebarOpen)}
                                            className="p-2.5 bg-white hover:bg-indigo-600 text-indigo-600 hover:text-white shadow-md rounded-xl border border-indigo-100 transition-all duration-200 group"
                                        >
                                            {isRightSidebarOpen ? <PanelRightClose size={20} /> : <PanelRightOpen size={20} />}
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent side="left" className="bg-slate-900 text-white border-none">
                                        <p>{isRightSidebarOpen ? "통계 창 접기" : "통계 창 펼치기"}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        </TooltipProvider>
                        <div className="flex items-center justify-between gap-4 mb-2">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                                    <span className="text-indigo-700">{year}학년도</span> 신입생 교육과정 편성표
                                </h2>
                                <p className="text-slate-500 text-sm">좌측 과목리스트에서 과목을 클릭 후 <br /> <span className="font-bold text-indigo-500">드래그</span>하여 아래 영역에 배치하세요.</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsDataModalOpen(true)}
                                    className="flex items-center gap-2 px-2 py-2 bg-white hover:bg-slate-50 text-slate-600 text-[12px] font-bold rounded-xl border border-slate-200 shadow-sm transition-all active:scale-95"
                                >
                                    <FolderOpen size={18} className="text-slate-400" />
                                    자료 관리
                                </button>
                                <button
                                    onClick={() => { /* 저장 로직 */ toast.success("현재 편성이 저장되었습니다.") }}
                                    className="flex items-center gap-2 px-2 py-2.5 bg-white text-slate-700 text-[12px] font-bold rounded-xl border border-slate-200 shadow-sm transition-all duration-200 
                                            hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 hover:shadow-md 
                                            active:scale-95 group"
                                >
                                    <Save size={18} className="text-slate-500" />
                                    저장
                                </button>

                                <button
                                    onClick={() => exprotToExcel(loginUser?.schoolname ?? '')}
                                    className="flex items-center gap-2 px-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-bold rounded-xl shadow-lg shadow-emerald-100 transition-all active:scale-95"
                                >
                                    <FileSpreadsheet size={18} />
                                    엑셀 출력
                                </button>

                                <div className="h-8 w-px bg-slate-200 mx-2" />
                                {/* 구분선 */}

                                <CurriAllProgress />
                            </div>
                        </div>

                        <CurriculumControlBar
                            config={config}
                            onConfigChange={handleConfigChange}
                        />
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

                        <div className="grid grid-cols-3 gap-2 min-h-10">
                            <DroppableZone id="fixed" title="학교 지정 영역" />
                            <DroppableZone id="fixed-select" title="학교 지정(선택) 영역" />
                            <DroppableZone id="student" title="학생 선택 영역" />
                        </div>

                        <div className="flex-1 bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
                            <CurriculumPreview />
                        </div>
                    </section>
                    <aside className={`bg-slate-900 transition-all duration-300 ease-in-out ${isRightSidebarOpen ? "w-80" : "w-0 opacity-0 overflow-hidden"}`}>
                        {/* 패널 내부 컨테이너 */}
                        <div className="h-full w-80 bg-slate-900 rounded-[2.5rem] p-6 text-white shadow-2xl overflow-y-auto custom-scrollbar">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <div className="w-1.5 h-5 bg-indigo-500 rounded-full" />
                                편성 결과 분석
                            </h3>

                            {/* 사이드바가 열려있을 때만 실제 컨텐츠 렌더링 */}
                            {isRightSidebarOpen && (
                                <div className="flex flex-col gap-6">
                                    {/* 섹션 1: 국영수 비중 차트 */}
                                    <KEMcheck min={statistics_KEM['min']} max={statistics_KEM['max']} total={174} />

                                    {/* 섹션 2: 필수학점 점검 (여기에 추가) */}
                                    <CreditCheck />
                                </div>
                            )}
                        </div>
                    </aside>
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
            <CurriDataManageModal
                isOpen={isDataModalOpen}
                onClose={() => setIsDataModalOpen(false)}
            />
        </DndContext>
    );
};

export { Curriculum }
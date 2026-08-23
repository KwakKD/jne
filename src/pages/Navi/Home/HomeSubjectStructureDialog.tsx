import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, ScrollArea, ScrollBar, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { NAVI_SUBJECT_DATA } from "@/data/nav";
import { BookOpen } from "lucide-react";
import type { ReactNode } from "react";

interface SubjectStructureDialogProps {
    children: ReactNode; // 트리거가 될 버튼을 외부에서 주입받음
}


function HomeSubjectStructureDialog({ children }: SubjectStructureDialogProps) {
    // 1. 데이터에서 중복 없는 '교과군(subjectGroup)' 리스트 추출 (국어, 수학 등)
    const limitedData = NAVI_SUBJECT_DATA.slice(0, 155);

    const subjectGroups = Array.from(
        new Set(limitedData.map((item) => item.subjectGroup))
    );

    // 2. 특정 교과군의 과목들을 Type별로 분류하는 함수
    const getSubjectsByType = (group: string, type: string) => {
        return limitedData.filter(
            (item) => item.subjectGroup === group && item.subjectType === type
        );
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="!max-w-[1000px] !w-[95vw] h-[80vh] flex flex-col p-0 overflow-hidden rounded-2xl border-none shadow-2xl">

                <DialogHeader className="p-6 bg-white shrink-0">
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2 text-slate-900">
                        <div className="p-2 bg-blue-600 rounded-lg text-white shadow-md">
                            <BookOpen size={24} />
                        </div>
                        2022 개정 교육과정 교과 구조표
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                        2022 개정 교육과정에 따른 과목별 공통, 일반 선택, 진로 선택, 융합 선택 과목 구조를 보여주는 표입니다.
                    </DialogDescription>
                </DialogHeader>

                {/* 첫 번째 교과군을 기본값으로 설정 */}
                <Tabs defaultValue={subjectGroups[0]} className="flex-1 flex flex-col overflow-hidden">

                    {/* 상단 교과군 선택 버튼 (가로 스크롤 가능하도록 설정) */}
                    <div className="px-6 pb-2 border-b bg-white">
                        <ScrollArea className="w-full pb-3">
                            <TabsList className="flex w-max h-14 bg-slate-200/50 py-6 px-2 gap-1">
                                {subjectGroups.map((group) => (
                                    <TabsTrigger
                                        key={group}
                                        value={group}
                                        className="px-6 py-4 text-sm font-bold transition-all
                               data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                                    >
                                        {group}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>

                    {/* 하단 과목 표 영역 */}
                    <div className="flex-1 overflow-hidden bg-slate-50/30">
                        <ScrollArea className="h-full">
                            {subjectGroups.map((group) => (
                                <TabsContent
                                    key={group}
                                    value={group}
                                    className="m-0 p-6 focus-visible:outline-none"
                                >
                                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                                        <Table>
                                            <TableHeader className="bg-slate-50/80">
                                                {/* 첫 번째 헤더 줄 */}
                                                <TableRow className="hover:bg-transparent border-b border-slate-200">
                                                    <TableHead
                                                        rowSpan={2}
                                                        className="text-center font-bold text-slate-800 border-r w-1/4 align-middle"
                                                    >
                                                        <div>공통과목</div>
                                                        <div className="text-[12px] font-normal text-slate-500">(기초소양)</div>
                                                    </TableHead>
                                                    <TableHead
                                                        colSpan={3}
                                                        className="text-center font-bold text-slate-800 h-10 bg-slate-100/50"
                                                    >
                                                        선택 과목
                                                    </TableHead>
                                                </TableRow>

                                                {/* 두 번째 헤더 줄 (선택 과목 하위 항목) */}
                                                <TableRow className="hover:bg-transparent">
                                                    {/* 공통과목은 rowSpan으로 인해 여기서 생략됨 */}
                                                    <TableHead className="text-center font-bold text-slate-700 border-r w-1/4 h-12">
                                                        <div>일반 선택</div>
                                                        <div className="text-[12px] font-normal text-slate-400">(학문별 주요내용)</div>
                                                    </TableHead>
                                                    <TableHead className="text-center font-bold text-slate-700 border-r w-1/4 h-12">
                                                        <div>진로 선택</div>
                                                        <div className="text-[12px] font-normal text-slate-400">(심화과목)</div>
                                                    </TableHead>
                                                    <TableHead className="text-center font-bold text-slate-700 w-1/4 h-12">
                                                        <div>융합 선택</div>
                                                        <div className="text-[12px] font-normal text-slate-400">(교과융합, 실생활응용)</div>
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow className="divide-x divide-slate-100 hover:bg-transparent">
                                                    {/* 각 타입별 셀 렌더링 */}
                                                    {["공통", "일반", "진로", "융합"].map((type) => (
                                                        <TableCell key={type} className="p-4 align-top">
                                                            <div className="flex flex-col gap-2 min-h-[150px]">
                                                                {getSubjectsByType(group, type).map((sub) => (
                                                                    <span
                                                                        key={sub.subjectName}
                                                                        className={`px-2 py-2.5 rounded-lg text-[14px] font-bold text-center border shadow-sm transition-colors
                                      ${type === '공통' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                                                type === '일반' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                                                    type === '진로' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                                                                        'bg-purple-50 text-purple-700 border-purple-100'}`}
                                                                    >
                                                                        {sub.subjectName}
                                                                    </span>
                                                                ))}
                                                                {/* 해당 타입 과목이 없을 때 표시 (선택사항) */}
                                                                {getSubjectsByType(group, type).length === 0 && (
                                                                    <span className="text-[11px] text-slate-300 text-center mt-2 italic">해당 없음</span>
                                                                )}
                                                            </div>
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>
                                </TabsContent>
                            ))}
                        </ScrollArea>
                    </div>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
export { HomeSubjectStructureDialog };
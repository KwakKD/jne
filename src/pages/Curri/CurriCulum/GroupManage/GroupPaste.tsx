import { Badge, Button, Card, CardContent, CardFooter, CardHeader, CardTitle, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { SUBJECT } from "@/data/Curri/subject";
import { useCurriTableStore } from "@/store/CurriSubjectStore";
import type { GroupCell } from "@/type/curri";
import { inJsonData3 } from "@/utils/Curri/AfterDrop";
import { ArrowRight, Copy } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

interface GroupPasteProps {
    year: string;
}

export const GroupPaste = ({ year }: GroupPasteProps) => {
    const userData = useCurriTableStore((state) => state.userData);
    const groupUpdate = useCurriTableStore((state) => state.groupUpdate);
    const addTable2 = useCurriTableStore((state) => state.addTable2);

    const currentYearData = userData[year];
    const Groups = currentYearData?.Group ?? {};
    const GroupNames = Object.keys(Groups);

    // 복사할 원본 그룹 (Source) & 붙여넣을 대상 그룹 (Target)
    const [sourceGroup, setSourceGroup] = useState<string>(GroupNames[0] ?? "");
    const [targetGroup, setTargetGroup] = useState<string>("");

    const subjectMap = useMemo(() => {
        const unionSubject = [...(currentYearData?.AddSubject ?? []), ...SUBJECT];
        return new Map(unionSubject.map((item) => [item.Tag, item]));
    }, [currentYearData]);

    const selectedSource = Groups[sourceGroup];
    const selectedTarget = Groups[targetGroup];
    const duplicate = currentYearData.선택과목.filter(item => item.Grade === selectedSource.Grade)

    const isSameGroup = sourceGroup === targetGroup;
    const isSourceEmpty = (selectedSource?.Subject?.length ?? 0) === 0;

    const isDuplicate = () => {
        const tagCounts = duplicate.reduce((acc: Record<string, number>, item) => {
            acc[item.Tag] = (acc[item.Tag] || 0) + 1;
            return acc;
        }, {});

        // 2. 2개 이상 등장한 Tag들만 모아서 Set으로 만듭니다.
        const duplicateTags = new Set(
            Object.entries(tagCounts)
                .filter(([_tag, count]) => count > 1)
                .map(([tag]) => tag)
        );

        // 3. selectedSource.Subject 중 해당 Set에 포함된(2개 이상 존재하는) 태그가 있는지 확인합니다.
        return selectedSource.Subject.some(tag => duplicateTags.has(String(tag)));
    }

    // 복사 버튼 클릭 핸들러
    const handleCopy = () => {
        if (isSameGroup || !sourceGroup || !targetGroup || isDuplicate()) return;

        const newTags = selectedSource.Subject
        const groupConfig: GroupCell = {
            Zone: '선택',
            Subject: newTags,
            Grouptag: selectedSource.Grouptag,
            Grade: selectedSource.Grade,
            Semester: selectedSource.Semester === 1 ? 2 : 1,
            Credit: selectedSource.Credit,
            Choice: selectedSource.Choice
        }

        groupUpdate(year, targetGroup, groupConfig)
        addTable2(year, inJsonData3(newTags, targetGroup, selectedSource.Grade, selectedSource.Semester === 1 ? 2 : 1, selectedSource.Credit, year))
        toast.success(`${sourceGroup}이 ${targetGroup}으로 복사되었습니다.`)
    };

    // 그룹 상세 정보 렌더링 헬퍼 함수
    const renderGroupDetails = (groupKey: string, groupData: any) => {
        if (!groupData) {
            return (
                <div className="p-8 text-center text-sm text-muted-foreground border rounded-lg border-dashed">
                    선택된 그룹 정보가 없습니다.
                </div>
            );
        }

        const config = {
            Zone: groupData.Zone || "미지정",
            Grade: groupData.Grade ? `${groupData.Grade}학년` : "미배정",
            Sem: groupData.Semester || "미배정",
            Credit: groupData.Credit ? `${groupData.Credit}학점` : "미배정",
            Choice: groupData.Choice ? `${groupData.Choice}개 과목` : "미배정",
            Subjects: groupData.Subject ?? [],
        };

        return (
            <div className="space-y-4 rounded-lg border bg-muted/80 p-3 min-h-[32vh]">
                <div className="flex items-center justify-between border-b pb-3">
                    <span className="text-base font-semibold">{groupKey}</span>
                    <Badge variant="outline">{config.Zone}</Badge>
                </div>

                {/* 주요 설정 정보 */}
                <div className="flex gap-4">
                    <Badge>{config.Grade}</Badge>
                    <Badge>{config.Sem}학기</Badge>
                    <Badge>{config.Credit}</Badge>
                    <Badge>{config.Choice} 선택</Badge>
                </div>

                {/* 구성 과목 목록 */}
                <div className="pt-2 border-t border-border/50">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-semibold text-muted-foreground">구성 과목 목록</p>
                        {isDuplicate() &&
                            <span className="text-[10px] text-red-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                                ⚠️ 빨간색: 이미 {selectedSource.Grade}학년 {selectedSource.Semester === 1 ? 2 : 1}학기에 편성됨.
                            </span>
                        }

                    </div>
                    {config.Subjects.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5 max-h-30 overflow-y-auto pr-1">
                            {config.Subjects.map((tag: number) => {
                                const subject = subjectMap.get(tag);
                                if (duplicate.filter((item) => item.Tag === tag).length === 1) {
                                    return (
                                        <div
                                            key={tag}
                                            className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-background border text-[11px] shadow-xs"
                                        >
                                            <Badge variant="secondary" className="px-1 py-0 text-[9px]">
                                                {subject?.교과군 ?? "기타"}
                                            </Badge>
                                            <span className="font-medium text-foreground">{subject?.과목명 ?? tag}</span>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div
                                            key={tag}
                                            className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 border-amber-300 text-red-700 text-[11px] shadow-xs"
                                        >
                                            <Badge variant="secondary" className="px-1 py-0 text-[9px]">
                                                {subject?.교과군 ?? "기타"}
                                            </Badge>
                                            <span className="font-medium">{subject?.과목명 ?? tag}</span>
                                        </div>
                                    )
                                }

                            })}
                        </div>
                    ) : (
                        <p className="text-xs text-muted-foreground italic">선택된 과목이 없습니다.</p>
                    )}
                </div>
            </div>
        );
    };

    const renderGroupPaste = (groupKey: string, groupData: GroupCell) => {
        if (!groupData) {
            return (
                <div className="p-8 text-center text-sm text-muted-foreground border rounded-lg border-dashed">
                    선택된 그룹 정보가 없습니다.
                </div>
            );
        }

        if (isDuplicate()) {
            return (
                <div className="p-8 text-center text-sm text-muted-foreground border rounded-lg border-dashed">
                    <span className="font-bold text-blue-700">
                        {selectedSource.Grade}학년 {selectedSource.Semester === 1 ? 2 : 1}학기
                    </span>
                    에 편성되어 있는 과목이 있습니다.
                </div >
            )
        }

        return (
            <div className="space-y-4 rounded-lg border bg-muted/80 p-4 min-h-[32vh]">
                <div className="flex items-center justify-between border-b pb-3">
                    <span className="text-base font-semibold">{groupKey}</span>
                    <Badge variant="outline">선택</Badge>
                </div>

                {/* 주요 설정 정보 */}
                <div className="flex gap-4">
                    <Badge>{selectedSource.Grade}학년</Badge>
                    <Badge>{selectedSource.Semester === 1 ? 2 : 1}학기</Badge>
                    <Badge>{selectedSource.Credit}학점</Badge>
                    <Badge>{selectedSource.Choice}개 과목 선택</Badge>
                </div>

                {/* 구성 과목 목록 */}
                <div className="pt-2 border-t border-border/50">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">예상 구성 과목 목록</p>
                    {selectedSource.Subject.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5 max-h-30 overflow-y-auto pr-1">
                            {selectedSource.Subject.map((tag: number) => {
                                const subject = subjectMap.get(tag);
                                return (
                                    <div
                                        key={tag}
                                        className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-background border text-[11px] shadow-xs"
                                    >
                                        <Badge variant="secondary" className="px-1 py-0 text-[9px]">
                                            {subject?.교과군 ?? "기타"}
                                        </Badge>
                                        <span className="font-medium text-foreground">{subject?.과목명 ?? tag}</span>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-xs text-muted-foreground italic">선택된 과목이 없습니다.</p>
                    )}
                </div>
            </div>
        );
    }

    // Select 목록의 각 Item 렌더링 헬퍼 함수
    const renderSelectItems = () =>
        GroupNames.map((groupName) => {
            const groupData = Groups[groupName];
            const subjectCount = groupData?.Subject?.length || 0;
            const subjectProps = groupData?.Zone;
            const hasData = subjectCount > 0;
            if (hasData && subjectProps && groupData.Zone === '선택') {
                return (
                    <SelectItem key={groupName} value={groupName}>
                        <div className="flex items-center justify-between w-full gap-3">
                            <div className="flex items-center gap-2">
                                <span className={hasData ? "font-bold text-indigo-600" : "text-slate-600"}>
                                    {groupName}
                                </span>
                                {hasData && subjectProps && (
                                    <span
                                        className={`text-[10px] px-1 rounded border ${subjectProps === "선택"
                                            ? "text-blue-500 border-blue-100 bg-blue-50"
                                            : "text-slate-400 border-slate-100 bg-slate-50"
                                            }`}
                                    >
                                        {subjectProps}
                                    </span>
                                )}
                            </div>
                            {hasData && (
                                <span className="text-[10px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded-md border border-indigo-100 font-bold">
                                    {subjectCount}과목
                                </span>
                            )}
                        </div>
                    </SelectItem>
                );
            }


        });

    return (
        <Card className="w-full max-w-full shadow-sm border border-border">
            <CardHeader className="pb-4 border-b">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Copy className="w-5 h-5 text-indigo-600" />
                    그룹 데이터 복사 및 적용
                </CardTitle>
            </CardHeader>

            <CardContent className="pt-1 space-y-6">
                {/* 2컬럼 레이아웃 (좌: 복사 원본, 우: 붙여넣기 대상) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative">
                    {/* 1. 복사할 원본 그룹 (Source) */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-semibold text-foreground">1. 복사할 그룹 (원본)</label>
                            <Badge variant="secondary" className="text-[11px]">복사</Badge>
                        </div>
                        <Select value={sourceGroup} onValueChange={setSourceGroup}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="원본 그룹 선택" />
                            </SelectTrigger>
                            <SelectContent>{renderSelectItems()}</SelectContent>
                        </Select>

                        {renderGroupDetails(sourceGroup, selectedSource)}
                    </div>

                    {/* 데스크톱 중앙 이동 화살표 (디자인 장식) */}
                    <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-background border rounded-full p-1.5 shadow-sm text-muted-foreground">
                        <ArrowRight className="w-4 h-4" />
                    </div>

                    {/* 2. 붙여넣을 대상 그룹 (Target) */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-semibold text-foreground">2. 덮어쓸 그룹 (대상)</label>
                            <Badge variant="outline" className="text-[11px] border-indigo-200 text-indigo-600">붙여넣기</Badge>
                        </div>
                        <div className="flex gap-4">
                            <Select value={targetGroup} onValueChange={setTargetGroup}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="대상 그룹 선택" />
                                </SelectTrigger>
                                <SelectContent>
                                    {GroupNames.map((groupName) => {
                                        const groupData = Groups[groupName];
                                        const subjectCount = groupData?.Subject?.length || 0;
                                        const hasData = subjectCount > 0;
                                        if (subjectCount === 0) {
                                            return (
                                                <SelectItem key={groupName} value={groupName}>
                                                    <div className="flex items-center justify-between w-full gap-3">
                                                        <div className="flex items-center gap-2">
                                                            <span className={hasData ? "font-bold text-indigo-600" : "text-slate-600"}>
                                                                {groupName}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </SelectItem>
                                            )
                                        }

                                    })}
                                </SelectContent>
                            </Select>
                        </div>


                        {renderGroupPaste(targetGroup, selectedTarget)}
                    </div>
                </div>

                {/* 에러 및 경고 메시지 */}
                {isSameGroup && (
                    <p className="text-xs text-amber-600 font-medium text-center bg-amber-50 py-2 rounded-md border border-amber-200">
                        ⚠️ 원본 그룹과 대상 그룹이 동일합니다. 서로 다른 그룹을 선택해 주세요.
                    </p>
                )}
            </CardContent>

            <CardFooter className="flex justify-end gap-3 border-t pt-4 bg-muted/10">
                <Button
                    onClick={handleCopy}
                    disabled={isSameGroup || isSourceEmpty || !sourceGroup || !targetGroup || isDuplicate()}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2"
                >
                    <Copy className="w-4 h-4" />
                    {sourceGroup} 데이터 → {targetGroup}에 복사하기
                </Button>
            </CardFooter>
        </Card>
    );
};
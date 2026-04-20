import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, Progress, ScrollArea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { YEARS } from "@/data/data";
import { useCurriTableStore } from "@/store/CurriSubjectStore";
import { AlertCircle, ArrowRight, Copy, Database, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface CurriDataManageModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SELECT_PLACEHOLDER = "학년도 선택";

const getInitialYearData = () => ({
    학교지정: [],
    선택과목: [],
    추가교육과정: [],
    공동교육과정: [],
    AddSubject: [],
    CEA: { "1-1": 0, "1-2": 0, "2-1": 0, "2-2": 0, "3-1": 0, "3-2": 0 },
    Group: Array.from({ length: 50 }, (_, i) => `그룹 ${i + 1}`).reduce((acc, name) => {
        acc[name] = { Zone: null, Subject: [], Grouptag: null, Credit: null, Grade: null, Semester: null, Choice: null };
        return acc;
    }, {} as any)
});

export function CurriDataManageModal({ isOpen, onClose }: CurriDataManageModalProps) {
    const [copyYear, setCopyYear] = useState<string>(SELECT_PLACEHOLDER);
    const [pasteYear, setPasteYear] = useState<string>(SELECT_PLACEHOLDER);

    const userData = useCurriTableStore((state) => state.userData);
    const setYearData = useCurriTableStore((state) => state.setYearData);

    const getCEA = (year: string) => {
        const cea = userData[year]?.CEA || {};
        return Object.values(cea).reduce((sum, val) => sum + (val as number), 0);
    };

    const getStatsFix = (year: string) => {
        const group = userData[year]?.Group || {};
        const fixedData = userData[year]?.학교지정 || [];
        let fixCredit = 0;

        Object.values(group).forEach((g: any) => {
            if (g.Zone === '학교지정') fixCredit += (g.Credit ?? 0) * 2;
        });

        const noGroupCredit = fixedData
            .filter((item: any) => item.IsGroup === '')
            .reduce((sum: number, item: any) => sum + Number(item.Credit), 0);

        return fixCredit + noGroupCredit;
    };

    const getStatsChoice = (year: string) => {
        const group = userData[year]?.Group || {};
        let choiceCredit = 0;
        Object.values(group).forEach((g: any) => {
            if (g.Zone === '선택과목') {
                choiceCredit += (g.Credit ?? 0) * (g.Choice ?? 0);
            }
        });
        return choiceCredit;
    };

    const getAllCredit = (year: string) => getStatsFix(year) + getStatsChoice(year) + getCEA(year);
    const getPercent = (year: string) => Math.min(100, Math.round((getAllCredit(year) / 192) * 100));

    const handleCopy = () => {
        if (copyYear === SELECT_PLACEHOLDER || pasteYear === SELECT_PLACEHOLDER) return;
        if (window.confirm(`${copyYear}학년도 데이터를 ${pasteYear}학년도로 덮어씌우시겠습니까?`)) {
            setYearData(pasteYear, userData[copyYear]);
            alert('데이터 복사가 완료되었습니다.');
        }
    };

    const handleDelete = (year: string) => {
        if (window.confirm(`${year}학년도의 모든 데이터를 삭제하고 초기화하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`)) {
            setYearData(year, getInitialYearData());
            alert(`${year}학년도 데이터가 초기화되었습니다.`);
        }
    };

    // --- 선택 로직 동기화 (공백 버그 방지를 위해 변수 사용) ---
    useEffect(() => {
        if (copyYear !== SELECT_PLACEHOLDER && pasteYear !== SELECT_PLACEHOLDER) {
            if (copyYear === pasteYear) {
                setPasteYear(SELECT_PLACEHOLDER);
            }
        }
        if (copyYear === SELECT_PLACEHOLDER) {
            setPasteYear(SELECT_PLACEHOLDER);
        }
    }, [copyYear]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[850px]! w-[95vw] h-[90vh] flex flex-col p-0 overflow-hidden bg-white border-none shadow-2xl">
                <DialogHeader className="p-6 pb-2">
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2 text-slate-800">
                        <Database className="text-indigo-600" size={24} />
                        교육과정 데이터 관리
                    </DialogTitle>
                    <DialogDescription className="text-slate-500">
                        학년도별 편성 현황을 확인하고 데이터를 복사하거나 초기화할 수 있습니다.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-hidden flex flex-col px-6 gap-6">
                    {/* 1. 현황 테이블 영역 */}
                    <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/30">
                        <div className="grid grid-cols-8 bg-slate-100 p-3 text-[11px] font-bold text-slate-600 border-b border-slate-200 text-center uppercase tracking-wider">
                            <div className="col-span-1">학년도</div>
                            <div>학교지정</div>
                            <div>선택과목</div>
                            <div>추가과목</div>
                            <div>그룹수</div>
                            <div className="col-span-2">이수학점(%)</div>
                            <div>관리</div>
                        </div>
                        <ScrollArea className="h-64 bg-white">
                            {YEARS.map((y) => {
                                const data = userData[y];
                                if (!data) return null;
                                const p = getPercent(y);
                                return (
                                    <div key={y} className="grid grid-cols-8 p-3 text-sm border-b border-slate-100 last:border-0 text-center items-center hover:bg-slate-50 transition-colors">
                                        <div className="font-bold text-slate-700">{y}</div>
                                        <div className="text-slate-500">{data.학교지정.length}</div>
                                        <div className="text-slate-500">{data.선택과목.length}</div>
                                        <div className="text-slate-500">{data.AddSubject?.length || 0}</div>
                                        <div className="text-slate-500 font-medium">
                                            {Object.values(data.Group).filter((g: any) => g.Zone !== null).length}
                                        </div>
                                        <div className="col-span-2 px-4">
                                            <div className="flex flex-col gap-1.5">
                                                <div className="flex justify-between text-[10px] font-bold">
                                                    <span className="text-indigo-600">{getAllCredit(y)} / 192</span>
                                                    <span className="text-slate-400">{p}%</span>
                                                </div>
                                                <Progress value={p} className="h-1.5 bg-slate-100" />
                                            </div>
                                        </div>
                                        <div className="flex justify-center">
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-slate-300 hover:text-red-500 hover:bg-red-50"
                                                    >
                                                        <Trash2 size={16} />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle className="text-red-600">정말 삭제하시겠습니까?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            {y}학년도의 모든 교육과정 데이터가 초기화됩니다.
                                                            이 작업은 실행 후 되돌릴 수 없습니다.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>취소</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            className="bg-red-600 hover:bg-red-700"
                                                            onClick={() => handleDelete(y)}
                                                        >
                                                            데이터 삭제
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </div>
                                );
                            })}
                        </ScrollArea>
                    </div>

                    {/* 2. 데이터 복사 도구 영역 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch mb-6">
                        <div className="bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100 relative overflow-hidden flex flex-col justify-between">
                            <div className="absolute -top-2 -right-2 p-4 opacity-5 pointer-events-none">
                                <Copy size={100} className="text-indigo-600" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-indigo-900 mb-4 flex items-center gap-2">
                                    <Copy size={16} /> 데이터 복제
                                </h3>
                                <div className="flex flex-col sm:flex-row items-center gap-3">
                                    <div className="w-full space-y-1.5">
                                        <label className="text-[11px] font-bold text-slate-500 ml-1">원본 (From)</label>
                                        <Select value={copyYear} onValueChange={setCopyYear}>
                                            <SelectTrigger className="bg-white border-slate-200">
                                                <SelectValue placeholder={SELECT_PLACEHOLDER} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value={SELECT_PLACEHOLDER}>{SELECT_PLACEHOLDER}</SelectItem>
                                                {YEARS.map(y => <SelectItem key={y} value={y}>{y}학년도</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <ArrowRight className="text-slate-300 hidden sm:block mt-5 shrink-0" size={20} />
                                    <div className="w-full space-y-1.5">
                                        <label className="text-[11px] font-bold text-slate-500 ml-1">대상 (To)</label>
                                        <Select
                                            value={pasteYear}
                                            onValueChange={setPasteYear}
                                            disabled={copyYear === SELECT_PLACEHOLDER}
                                        >
                                            <SelectTrigger className="bg-white border-slate-200">
                                                <SelectValue placeholder={SELECT_PLACEHOLDER} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value={SELECT_PLACEHOLDER}>{SELECT_PLACEHOLDER}</SelectItem>
                                                {YEARS.filter(y => y !== copyYear).map(y => (
                                                    <SelectItem key={y} value={y}>{y}학년도</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 font-bold shadow-md shadow-indigo-100 transition-all"
                                        disabled={copyYear === SELECT_PLACEHOLDER || pasteYear === SELECT_PLACEHOLDER}
                                    >
                                        데이터 복사 실행
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle className="flex items-center gap-4">
                                            <Copy className="text-indigo-600" size={20} />
                                            데이터를 덮어씌우시겠습니까?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription className="bg-slate-50 p-6 rounded-lg border border-slate-100 mt-2">
                                            <div className="flex items-center justify-center gap-4 text-slate-700 font-bold">
                                                <span className="text-indigo-600">{copyYear}학년도 데이터</span>
                                                <ArrowRight size={16} className="text-slate-400" />
                                                <span className="text-red-600">{pasteYear}학년도 데이터</span>
                                            </div>
                                            <p className="text-center mt-3 text-xs text-slate-600">
                                                대상 학년도({pasteYear})의 기존 데이터는 <span className="text-red-500 font-bold">모두 삭제</span>되며,<br />
                                                복사 후에는 이전 상태로 되돌릴 수 없습니다.
                                            </p>
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>취소</AlertDialogCancel>
                                        <AlertDialogAction
                                            className="bg-indigo-600 hover:bg-indigo-700"
                                            onClick={handleCopy}
                                        >
                                            확인, 복사 실행
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-center">
                            <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                                <AlertCircle size={16} className="text-amber-500" /> 주의사항
                            </h3>
                            <ul className="text-xs text-slate-500 space-y-2.5 leading-relaxed">
                                <li className="flex gap-2">
                                    <span className="text-amber-600 font-bold">•</span>
                                    <span><strong>데이터 복사</strong>를 실행하면 대상 학년도의 기존 기록은 즉시 삭제됩니다.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-amber-600 font-bold">•</span>
                                    <span>휴지통 아이콘 클릭 시 해당 학년도의 모든 설정이 <strong>공백 상태</strong>로 리셋됩니다.</span>
                                </li>
                                <li className="flex gap-2 text-[11px] bg-white p-2 rounded border border-slate-100 mt-2">
                                    <span className="text-indigo-500">TIP:</span>
                                    <span>작업 완료 후 반드시 <strong>저장</strong> 버튼을 눌러 변경사항을 확정하세요.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="p-4 flex justify-end gap-3 bg-slate-50 border-t mt-auto">
                    <Button variant="outline" onClick={onClose} className="font-bold px-8 border-slate-200 hover:bg-white transition-all">
                        닫기
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
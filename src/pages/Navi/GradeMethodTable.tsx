import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2 } from "lucide-react";

const StatusMark = ({ mark }: { mark: string }) => {
    if (mark === "O") return <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto" />;
    return <span className="text-slate-300 font-mono text-xl">-</span>;
};

export function GradeMethodTable() {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <Table className="border-collapse w-full">
                <TableHeader className="bg-slate-50/80">
                    <TableRow className="border-b border-slate-200 hover:bg-transparent">
                        <TableHead rowSpan={3} className="text-center font-bold text-slate-950 border-r w-1/4 align-middle">구 분</TableHead>
                        <TableHead colSpan={2} className="text-center font-bold text-slate-900 h-11 border-r bg-slate-100/50">절대평가</TableHead>
                        <TableHead className="text-center font-bold text-slate-900 h-11 border-r bg-slate-100/50">상대평가</TableHead>
                        <TableHead colSpan={3} className="text-center font-bold text-slate-900 h-11 bg-slate-100/50">통계정보</TableHead>
                    </TableRow>
                    <TableRow className="border-b border-slate-200 hover:bg-transparent">
                        <TableHead rowSpan={2} className="text-center font-bold text-slate-700 border-r w-[10%] h-10">원점수</TableHead>
                        <TableHead rowSpan={2} className="text-center font-bold text-slate-700 border-r w-[10%] h-10">성취도</TableHead>
                        <TableHead rowSpan={2} className="text-center font-bold text-slate-700 border-r w-[10%] h-10">석차등급</TableHead>
                        <TableHead rowSpan={2} className="text-center font-bold text-slate-700 border-r w-[15%] h-10 align-middle">
                            <div>성취도별</div><div className="text-[11px] font-normal text-slate-500">분포비율</div>
                        </TableHead>
                        <TableHead className="text-center font-bold text-slate-700 border-r w-[15%] h-10">과목평균</TableHead>
                        <TableHead className="text-center font-bold text-slate-700 w-[15%] h-10">수강자수</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* 보통교과 군 */}
                    <TableRow className="divide-x divide-slate-100 hover:bg-slate-50/30">
                        <TableCell className="p-5 font-bold text-slate-900 border-r-2 bg-white">보통교과</TableCell>
                        <TableCell className="p-4 text-center"><StatusMark mark="O" /></TableCell>
                        <TableCell className="p-4 text-center font-mono text-sm">A·B·C·D·E</TableCell>
                        <TableCell className="p-4 text-center font-medium text-blue-600">5등급</TableCell>
                        <TableCell className="p-4 text-center"><StatusMark mark="O" /></TableCell>
                        <TableCell className="p-4 text-center"><StatusMark mark="O" /></TableCell>
                        <TableCell className="p-4 text-center"><StatusMark mark="O" /></TableCell>
                    </TableRow>
                    {/* 융합선택 군 */}
                    <TableRow className="divide-x divide-slate-100 hover:bg-slate-50/30">
                        <TableCell className="p-5 font-bold text-slate-900 border-r-2 bg-white">사회·과학 융합선택</TableCell>
                        <TableCell className="p-4 text-center"><StatusMark mark="O" /></TableCell>
                        <TableCell className="p-4 text-center font-mono text-sm text-rose-700 bg-rose-50/30">A·B·C·D·E</TableCell>
                        <TableCell className="p-4 text-center"><StatusMark mark="-" /></TableCell>
                        <TableCell className="p-4 text-center"><StatusMark mark="O" /></TableCell>
                        <TableCell className="p-4 text-center"><StatusMark mark="O" /></TableCell>
                        <TableCell className="p-4 text-center"><StatusMark mark="O" /></TableCell>
                    </TableRow>
                    {/* 체육예술/교양 생략 (동일 패턴) */}
                    <TableRow className="divide-x divide-slate-100 hover:bg-slate-50/50">
                        <TableCell
                            className="p-5 font-bold text-slate-900 align-middle border-r-2 border-slate-200 bg-white"
                        >
                            체육 · 예술/과학탐구실험
                        </TableCell>
                        <TableCell className="p-4 text-center border-t border-slate-100">
                            <StatusMark mark="-" />
                        </TableCell>
                        <TableCell className="p-4 text-center font-mono text-sm text-slate-700 border-t border-slate-100 ">
                            A·B·C
                        </TableCell>
                        <TableCell className="p-4 text-center border-t border-slate-100">
                            <StatusMark mark="-" />
                        </TableCell>
                        <TableCell className="p-4 text-center border-t border-slate-100">
                            <StatusMark mark="-" />
                        </TableCell>
                        <TableCell className="p-4 text-center border-t border-slate-100">
                            <StatusMark mark="-" />
                        </TableCell>
                        <TableCell className="p-4 text-center border-t border-slate-100">
                            <StatusMark mark="-" />
                        </TableCell>
                    </TableRow>
                    <TableRow className="divide-x divide-slate-100 hover:bg-slate-50/50">
                        <TableCell
                            className="p-5 font-bold text-slate-900 align-middle border-r-2 border-slate-200 bg-white"
                        >
                            교양
                        </TableCell>
                        <TableCell className="p-4 text-center border-t border-slate-100">
                            <StatusMark mark="-" />
                        </TableCell>
                        <TableCell className="p-4 text-center font-mono text-sm text-slate-700 border-t border-slate-100 ">
                            P
                        </TableCell>
                        <TableCell className="p-4 text-center border-t border-slate-100">
                            <StatusMark mark="-" />
                        </TableCell>
                        <TableCell className="p-4 text-center border-t border-slate-100">
                            <StatusMark mark="-" />
                        </TableCell>
                        <TableCell className="p-4 text-center border-t border-slate-100">
                            <StatusMark mark="-" />
                        </TableCell>
                        <TableCell className="p-4 text-center border-t border-slate-100">
                            <StatusMark mark="-" />
                        </TableCell>
                    </TableRow>
                    <TableRow className="divide-x divide-slate-100 hover:bg-slate-50/50">
                        <TableCell
                            className="p-5 font-bold text-slate-900 align-middle border-r-2 border-slate-200 bg-white"
                        >
                            전문교과
                        </TableCell>
                        <TableCell className="p-4 text-center">
                            <StatusMark mark="O" />
                        </TableCell>
                        <TableCell className="p-4 text-center font-mono text-sm text-slate-700">A·B·C·D·E</TableCell>
                        <TableCell className="p-4 text-center font-medium text-blue-600">5등급</TableCell>
                        <TableCell className="p-4 text-center">
                            <StatusMark mark="O" />
                        </TableCell>
                        <TableCell className="p-4 text-center">
                            <StatusMark mark="O" />
                        </TableCell>
                        <TableCell className="p-4 text-center">
                            <StatusMark mark="O" />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}
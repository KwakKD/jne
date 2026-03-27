import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ClipboardList, CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";

interface GradeMethodDialogProps {
    children: ReactNode;
}

// 이미지의 'O'와 '-'를 일관성 있게 표시하기 위한 컴포넌트
const StatusMark = ({ mark }: { mark: string }) => {
    if (mark === "O") {
        return <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto" />;
    }
    return <span className="text-slate-300 font-mono text-xl">-</span>;
};

function HomeGradeMethodDialog({ children }: GradeMethodDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            {/* 팝업 너비를 max-w-5xl로 설정하여 표가 잘 보이게 합니다. */}
            <DialogContent className="!max-w-[1100px] !w-[95vw] h-[80vh] flex flex-col p-0 overflow-hidden rounded-2xl border-none shadow-2xl">
                <DialogHeader className="p-6 bg-white shrink-0">
                    <DialogTitle className="text-2xl font-extrabold flex items-center gap-2 text-slate-950">
                        <div className="p-2.5 bg-rose-600 rounded-xl text-white shadow-md">
                            <ClipboardList size={26} />
                        </div>
                        과목별 성적 산출 및 대학 제공 방식(확정)
                    </DialogTitle>
                    <DialogDescription className="text-slate-500 mt-1">
                        2022 개정 교육과정에 따른 과목 유형별 성적 산출 방식과 대입 제공 정보입니다.
                    </DialogDescription>
                </DialogHeader>

                {/* 표 영역: ScrollArea는 DialogContent 내부에 자동으로 적용됨 */}
                <div className="flex-1 overflow-auto bg-slate-50/50 p-6">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <Table className="border-collapse w-full">
                            <TableHeader className="bg-slate-50/80">
                                {/* 헤더 1단: 대분류 */}
                                <TableRow className="border-b border-slate-200 hover:bg-transparent">
                                    <TableHead
                                        rowSpan={3}
                                        className="text-center font-bold text-lg text-slate-950 border-r border-slate-200 w-1/4 align-middle"
                                    >
                                        구 분
                                    </TableHead>
                                    <TableHead colSpan={2} className="text-center font-bold text-slate-900 h-11 border-r border-slate-200 bg-slate-100/50">
                                        절대평가
                                    </TableHead>
                                    <TableHead className="text-center font-bold text-slate-900 h-11 border-r border-slate-200 bg-slate-100/50">
                                        상대평가
                                    </TableHead>
                                    <TableHead colSpan={3} className="text-center font-bold text-slate-900 h-11 bg-slate-100/50">
                                        통계정보
                                    </TableHead>
                                </TableRow>

                                {/* 헤더 2단: 중분류 */}
                                <TableRow className="border-b border-slate-200 hover:bg-transparent">
                                    <TableHead rowSpan={2} className="text-center font-bold text-slate-700 border-r border-slate-200 w-[10%] h-10">
                                        원점수
                                    </TableHead>
                                    <TableHead rowSpan={2} className="text-center font-bold text-slate-700 border-r border-slate-200 w-[10%] h-10">
                                        성취도
                                    </TableHead>
                                    <TableHead rowSpan={2} className="text-center font-bold text-slate-700 border-r border-slate-200 w-[10%] h-10">
                                        석차등급
                                    </TableHead>
                                    <TableHead rowSpan={2} className="text-center font-bold text-slate-700 border-r border-slate-200 w-[15%] h-10 align-middle">
                                        <div>성취도별</div>
                                        <div className="text-[11px] font-normal text-slate-500">분포비율</div>
                                    </TableHead>
                                    <TableHead className="text-center font-bold text-slate-700 border-r border-slate-200 w-[15%] h-10">
                                        과목평균
                                    </TableHead>
                                    <TableHead className="text-center font-bold text-slate-700 w-[15%] h-10">
                                        수강자수
                                    </TableHead>
                                </TableRow>

                                {/* 헤더 3단: 비어있음 (rowSpan들 때문에 자동 생략됨) */}
                            </TableHeader>

                            <TableBody>
                                {/* 1. 보통교과 행군 (rowSpan 적용) */}
                                <TableRow className="divide-x divide-slate-100">
                                    <TableCell
                                        className="p-5 font-bold text-slate-900 align-middle border-r-2 border-slate-200 bg-white"
                                    >
                                        보통교과
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

                                {/* 보통교과 하위 행들: 구분 칸 생략 */}
                                <TableRow className="divide-x divide-slate-100 hover:bg-slate-50/50">
                                    <TableCell
                                        className="p-5 font-bold text-slate-900 align-middle border-r-2 border-slate-200 bg-white"
                                    >
                                        사회 · 과학 융합선택
                                    </TableCell>
                                    <TableCell className="p-4 text-center border-t border-slate-100">
                                        <StatusMark mark="O" />
                                    </TableCell>
                                    <TableCell className="p-4 text-center font-mono text-sm text-rose-700 border-t border-slate-100 bg-rose-50/30">
                                        A·B·C·D·E
                                    </TableCell>
                                    <TableCell className="p-4 text-center border-t border-slate-100">
                                        <StatusMark mark="-" />
                                    </TableCell>
                                    <TableCell className="p-4 text-center border-t border-slate-100">
                                        <StatusMark mark="O" />
                                    </TableCell>
                                    <TableCell className="p-4 text-center border-t border-slate-100">
                                        <StatusMark mark="O" />
                                    </TableCell>
                                    <TableCell className="p-4 text-center border-t border-slate-100">
                                        <StatusMark mark="O" />
                                    </TableCell>
                                </TableRow>
                                {/* 추가 행들... (체육·예술, 교양 등) */}
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
                </div>
            </DialogContent>
        </Dialog>
    );
}

export { HomeGradeMethodDialog }
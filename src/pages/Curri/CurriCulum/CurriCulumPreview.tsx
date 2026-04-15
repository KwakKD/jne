import { Table1 } from "./Table/Table1";
import { Table2 } from "./Table/Table2";
import { Table3 } from "./Table/Table3";

export const CurriculumPreview = () => {

    return (
        <div className="flex-1 flex flex-col h-full p-4 overflow-hidden">
            {/* 1. 실제 스크롤이 발생하는 컨테이너 */}
            <div className="flex-1 overflow-y-auto border rounded-xl border-slate-200 bg-white custom-scrollbar relative">

                <table className="w-full border-separate border-spacing-0">
                    <thead className="relative z-20">
                        {/* 첫 번째 헤더 줄 */}
                        <tr className="bg-slate-50">
                            {/* h-12 (48px) 정도로 높이를 고정하여 두 번째 줄의 top 값을 계산하기 쉽게 합니다. */}
                            <th rowSpan={2} className="sticky top-0 z-30 w-12 h-6 border-b border-r bg-slate-50 px-4 text-center text-sm font-bold text-slate-700 first:rounded-tl-xl">구분</th>
                            <th rowSpan={2} className="sticky top-0 z-30 w-16 h-6 border-b border-r bg-slate-50 px-4 text-center text-sm font-bold text-slate-700 first:rounded-tl-xl">그룹</th>
                            <th rowSpan={2} className="sticky top-0 z-30 w-24 h-6 border-b border-r bg-slate-50 px-4 text-center text-sm font-bold text-slate-700 first:rounded-tl-xl">교과군</th>
                            <th rowSpan={2} className="sticky top-0 z-30 w-12 h-6 border-b border-r bg-slate-50 px-4 text-center text-sm font-bold text-slate-700 first:rounded-tl-xl">유형</th>
                            <th rowSpan={2} className="sticky top-0 z-30 w-30 h-6 border-b border-r bg-slate-50 px-4 text-center text-sm font-bold text-slate-700 first:rounded-tl-xl">과목명</th>
                            <th rowSpan={2} className="sticky top-0 z-30 w-14 h-6 border-b border-r bg-slate-50 px-4 text-center text-sm font-bold text-slate-700 first:rounded-tl-xl">기준<br/>학점</th>
                            <th rowSpan={2} className="sticky top-0 z-30 w-14 h-6 border-b border-r bg-slate-50 px-4 text-center text-sm font-bold text-slate-700 first:rounded-tl-xl">운영<br/>학점</th>
                            <th colSpan={2} className="sticky top-0 z-30 w-20 h-6 border-b border-r bg-slate-50 px-4 text-center text-sm font-bold text-slate-700">1학년</th>
                            <th colSpan={2} className="sticky top-0 z-30 w-20 h-6 border-b border-r bg-slate-50 px-4 text-center text-sm font-bold text-slate-700">2학년</th>
                            <th colSpan={2} className="sticky top-0 z-30 w-20 h-6 border-b border-r bg-slate-50 px-4 text-center text-sm font-bold text-slate-700">3학년</th>
                            <th rowSpan={2} className="sticky top-0 z-30 w-12 h-6 border-b bg-slate-50 px-4 text-center text-sm font-bold text-slate-700 last:rounded-tr-xl">삭제</th>
                        </tr>

                        {/* 두 번째 헤더 줄 (학기 표시) */}
                        <tr className="bg-slate-50">
                            {/* 첫 번째 줄의 높이가 48px(h-12)이므로 top-[48px]를 줍니다. */}
                            {[1, 2, 1, 2, 1, 2].map((sem, idx) => (
                                <th key={idx} className="sticky top-6 z-30 w-10 h-6 border-b border-r bg-slate-50 px-2 text-center text-[11px] font-bold text-slate-700">
                                    {sem}학기
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="bg-white">
                        <Table1/>
                        <Table2/>
                        <Table3/>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
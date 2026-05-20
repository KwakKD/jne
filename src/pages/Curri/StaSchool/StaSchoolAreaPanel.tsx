import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, ClipboardX } from "lucide-react";
import { useMemo } from "react";

interface unOpenProps {
    schoolname: string
    location: string
    allClass: number
}

interface Props {
    unOpenedData: unOpenProps[]
}

const columnHelper = createColumnHelper<unOpenProps>();

export default function StaSchoolAreaPanel({ unOpenedData }: Props) {

    // TanStack 테이블 컬럼 데피니션 최적화
    const columns = useMemo(() => [
        columnHelper.accessor('location', {
            header: '지역',
            size: 70,
            cell: info => <span className="text-slate-500 font-medium">{info.getValue()}</span>
        }),
        columnHelper.accessor('schoolname', {
            header: '학교명',
            size: 110,
            cell: info => <span className="text-slate-900 font-bold tracking-tight">{info.getValue()}</span>
        }),
        // columnHelper.accessor('allClass', {
        //     header: '전체학급',
        //     size: 100,
        //     cell: info => (
        //         <div className="text-center pr-4">
        //             <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md text-[11px] font-bold">
        //                 {info.getValue()}학급
        //             </span>
        //         </div>
        //     )
        // })
    ], [])

    const table = useReactTable({
        data: unOpenedData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    const hasData = unOpenedData && unOpenedData.length > 0;

    return (
        <div className="w-full flex flex-col h-80 bg-white rounded-xl overflow-hidden select-none">
            {hasData ? (
                // 1. 실제 미개설 고등학교 리스트 테이블 데이터 레이어
                <div className="flex-1 overflow-y-auto border border-slate-100 rounded-xl min-h-0 custom-scrollbar relative">
                    <table className="w-full text-left border-collapse table-fixed">
                        {/* 스티키 고정 테이블 헤더 */}
                        <thead className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        const isSorted = header.column.getIsSorted();
                                        return (
                                            <th
                                                key={header.id}
                                                onClick={header.column.getToggleSortingHandler()}
                                                className="py-2.5 px-4 text-[11px] font-black text-slate-500 cursor-pointer hover:bg-slate-100/85 hover:text-slate-800 transition-colors select-none"
                                                style={{ width: header.column.columnDef.size }}
                                            >
                                                <div className="flex items-center gap-1.5">
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                    {/* 정렬 상태에 따른 정밀 텍스트/아이콘 분기 가이딩 */}
                                                    {isSorted === "asc" && <ArrowUp size={12} className="text-indigo-600" />}
                                                    {isSorted === "desc" && <ArrowDown size={12} className="text-indigo-600" />}
                                                    {!isSorted && <ArrowUpDown size={11} className="text-slate-300 group-hover:text-slate-400" />}
                                                </div>
                                            </th>
                                        );
                                    })}
                                </tr>
                            ))}
                        </thead>

                        {/* 스크롤 본문 컴포넌트 데이터 바디 */}
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className="hover:bg-slate-50/50 transition-colors group"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td
                                            key={cell.id}
                                            className="py-2.5 px-4 text-xs align-middle"
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                // 2. 미개설 학교가 0개일 때 (즉, 필터 대상 모든 학교가 해당 과목을 개설했을 때) 공백 피드백 UI
                <div className="flex-1 w-full flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-xl bg-slate-50/30 p-6 text-center gap-2">
                    <div className="p-3 bg-emerald-50 text-emerald-500 border border-emerald-100 rounded-full shadow-2xs">
                        <ClipboardX size={18} />
                    </div>
                    <div>
                        <p className="text-xs font-black text-slate-700">미개설 학교가 없습니다</p>
                        <p className="text-[10px] text-slate-400 mt-0.5 max-w-50">
                            현재 설정된 범위 내 모든 고등학교가 본 교과목을 정상 편성하고 있습니다.
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
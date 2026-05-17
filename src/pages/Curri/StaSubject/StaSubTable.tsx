import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import type { SubjectStat } from "@/api/supabaseAPI";
import { Badge, Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";
import { ArrowUpDown, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { useMemo } from "react";


const columnHelper = createColumnHelper<SubjectStat>();

interface SubTableProps {
    data: SubjectStat[];
    onOpenDetail: (school: SubjectStat) => void;
}

export default function SubTable({ data, onOpenDetail }: SubTableProps) {
    const columns = useMemo(() => [
        columnHelper.accessor('year', {
            header: '년도',
            cell: ({ getValue }) => <span className="text-slate-500 font-medium">{getValue()}</span>
        }),
        columnHelper.accessor('schoolname', {
            header: '학교명',
            cell: ({ getValue }) => <span className="font-bold text-slate-900">{getValue()}</span>
        }),
        columnHelper.accessor('sub_type', {
            header: '유형',
            cell: ({ getValue }) => (
                <Badge variant="outline" className="text-[11px] border-slate-200 bg-slate-50/50 text-slate-600 font-normal">
                    {getValue()}
                </Badge>
            )
        }),
        columnHelper.accessor('sub_grade', {
            header: '학년',
            cell: ({ getValue }) => <span className="text-slate-600">{getValue()}학년</span>
        }),
        columnHelper.accessor('sub_sem', {
            header: '학기',
            cell: ({ getValue }) => <span className="text-slate-600">{getValue()}학기</span>
        }),
        columnHelper.accessor('sub_credit', {
            header: '학점',
            cell: ({ getValue }) => <span className="font-semibold text-indigo-600">{getValue()}학점</span>
        }),
        columnHelper.display({
            id: 'actions',
            header: '편성표',
            cell: ({ row }) => (
                <Button
                    variant="secondary"
                    size="sm"
                    className="h-7 text-xs gap-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 rounded-lg border border-transparent hover:border-indigo-100 transition-colors"
                    onClick={() => onOpenDetail(row.original)}
                >
                    <Eye size={12} />
                    보기
                </Button>
            )
        }),
    ], [onOpenDetail])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        initialState: {
            pagination: { pageSize: 8 } // 대시보드 우측 컴팩트한 배치를 위해 8개 행 권장
        }
    })

    return (
        <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* 테이블 몸체 스크롤 영역 */}
            <div className="flex-1 overflow-auto min-h-0">
                <Table>
                    <TableHeader className="bg-slate-50/70 sticky top-0 z-10 backdrop-blur-xs border-b border-slate-200">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="hover:bg-transparent">
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="text-xs font-bold text-slate-500 py-3 cursor-pointer select-none"
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        <div className="flex items-center gap-1">
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            {header.column.getCanSort() && (
                                                <ArrowUpDown size={12} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
                                            )}
                                        </div>
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    className="hover:bg-slate-50/50 border-b border-slate-100 transition-colors group"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="text-xs py-2.5">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-40 text-center text-slate-400 text-xs">
                                    편성된 학교 데이터가 없습니다.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* 페이지네이션 하단 고정 바 */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-white shrink-0">
                <span className="text-[11px] font-medium text-slate-500">
                    총 <span className="font-bold text-slate-700">{data.length}</span>건 중{" "}
                    <span className="font-bold text-slate-700">
                        {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
                        {Math.min(
                            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                            data.length
                        )}
                    </span>
                    표시
                </span>

                <div className="flex items-center gap-1.5">
                    <Button
                        variant="outline"
                        size="icon"
                        className="w-7 h-7 border-slate-200 text-slate-600 disabled:opacity-40"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft size={14} />
                    </Button>
                    <div className="text-xs font-semibold text-slate-700 min-w-9 text-center bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                        {table.getState().pagination.pageIndex + 1} / {table.getPageCount() || 1}
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        className="w-7 h-7 border-slate-200 text-slate-600 disabled:opacity-40"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronRight size={14} />
                    </Button>
                </div>
            </div>
        </div>
    )
}
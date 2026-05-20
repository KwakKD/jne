import { Badge, Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";
import { YEARS } from "@/data/data";
import type { SchoolClassDataProps } from "@/type/curri";
import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { ArrowUpDown, ChevronLeft, ChevronRight, Eye, ListFilter } from "lucide-react";
import { useMemo, useState } from "react";

const columnHelper = createColumnHelper<SchoolClassDataProps>();

interface SchoolStaTableProps {
    data: SchoolClassDataProps[]
    onOpenDatail: (school: string, year: string) => void
}

export default function StaSchoolListTable({ data, onOpenDatail }: SchoolStaTableProps) {
    // 행별 선택된 학년도 상태 매핑
    const [rowYears, setRowYears] = useState<Record<string, string>>({});

    const columns = useMemo(() => [
        columnHelper.accessor('schoolname', { 
            header: '학교명',
            cell: ({ getValue }) => <span className="font-bold text-slate-900 tracking-tight">{getValue()}</span>
        }),
        columnHelper.accessor('location', { 
            header: '지역',
            size:200,
            cell: ({ getValue }) => (
                <Badge variant="outline" className="text-[11px] border-slate-200 bg-slate-50 text-slate-600 font-medium px-2 py-0.5 rounded-md">
                    {getValue()}
                </Badge>
            )
        }),
        columnHelper.accessor('grade_1', { 
            header: '1학년',
            cell: ({ getValue }) => <span className="text-slate-600 font-medium">{getValue()}학급</span>
        }),
        columnHelper.accessor('grade_2', { 
            header: '2학년',
            cell: ({ getValue }) => <span className="text-slate-600 font-medium">{getValue()}학급</span>
        }),
        columnHelper.accessor('grade_3', { 
            header: '3학년',
            cell: ({ getValue }) => <span className="text-slate-600 font-medium">{getValue()}학급</span>
        }),
        columnHelper.accessor('allClass', { 
            header: '총 학급 수',
            cell: ({ getValue }) => <span className="font-extrabold text-indigo-600">{getValue()}학급</span>
        }),
        columnHelper.display({
            id: 'actions',
            header: '교육과정 편성표 조회',
            cell: ({ row }) => {
                const currentYear = rowYears[row.id] || YEARS[0];

                return (
                    <div className="flex items-center gap-2">
                        {/* Shadcn UI 기본 Select 컴포넌트 연동 (기존 ComboBox 대체) */}
                        <Select
                            value={currentYear} 
                            onValueChange={(val) => setRowYears(prev => ({ ...prev, [row.id]: val }))}
                        >
                            <SelectTrigger className="h-8 text-xs w-20 bg-white border-slate-200 rounded-lg shadow-2xs font-medium text-slate-700">
                                <SelectValue placeholder="학년도 선택" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                {YEARS.map((year) => (
                                    <SelectItem key={year} value={year} className="text-xs rounded-lg">
                                        {year}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* 보기 액션 버튼 */}
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => onOpenDatail(row.original.schoolname, currentYear)}
                            className="h-8 text-xs font-bold gap-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 rounded-lg border border-transparent hover:border-indigo-100 transition-colors shrink-0"
                        >
                            <Eye size={12} />
                            <span>조회</span>
                        </Button>
                    </div>
                )
            }
        })
    ], [rowYears, onOpenDatail])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        initialState: {
            pagination: { pageSize: 10 }
        }
    })

    return (
        <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            {/* 상단 미니 인포바 */}
            <div className="px-6 py-3.5 bg-slate-50/60 border-b border-slate-200/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <ListFilter size={14} className="text-slate-400" />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">조회된 고등학교 목록</span>
                </div>
                <Badge variant="secondary" className="bg-indigo-50 hover:bg-indigo-50 text-indigo-700 text-xs font-bold px-2.5 py-0.5 border border-indigo-100 rounded-lg">
                    총 {data.length}개교
                </Badge>
            </div>

            {/* 테이블 테이블 스크롤 바디 컨테이너 */}
            <div className="flex-1 overflow-auto min-h-0">
                <Table>
                    <TableHeader className="bg-slate-50/50 sticky top-0 z-10 backdrop-blur-xs border-b border-slate-200">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="hover:bg-transparent">
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id} 
                                        className="text-xs font-black text-slate-500 py-3 cursor-pointer select-none"
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        <div className="flex items-center gap-1">
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            {header.column.getCanSort() && (
                                                <ArrowUpDown size={12} className="text-slate-400 transition-colors" />
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
                                    className="hover:bg-slate-50/40 border-b border-slate-100 transition-colors"
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
                                <TableCell colSpan={columns.length} className="h-48 text-center text-slate-400 text-xs font-medium">
                                    설정된 조건에 매칭되는 학교가 존재하지 않습니다.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* 하단 페이지네이션 바 고정 */}
            <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-100 bg-white shrink-0">
                <span className="text-[11px] font-semibold text-slate-400 tracking-tight">
                    현재 페이지 노출 건수: {" "}
                    <span className="font-bold text-slate-700">
                        {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
                        {Math.min(
                            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                            data.length
                        )}
                    </span>
                    개교 (전체 {data.length}개교)
                </span>
                
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="w-8 h-8 border-slate-200 text-slate-600 rounded-lg disabled:opacity-40"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft size={14} />
                    </Button>
                    <div className="text-xs font-black text-slate-700 min-w-20 text-center bg-slate-50 px-2 py-1.5 rounded-lg border border-slate-150">
                        {table.getState().pagination.pageIndex + 1} / {table.getPageCount() || 1}
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        className="w-8 h-8 border-slate-200 text-slate-600 rounded-lg disabled:opacity-40"
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
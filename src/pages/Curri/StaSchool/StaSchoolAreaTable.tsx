import { Badge, Button } from "@/components/ui";
import type { SchoolStaAreaTableProps } from "@/type/curri";
import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight, Inbox } from "lucide-react";
import { useMemo } from "react";

const columnHelper = createColumnHelper<SchoolStaAreaTableProps>();

interface Props {
    data: SchoolStaAreaTableProps[]
}

export default function StaSchoolAreaTable({ data }: Props) {

    // 1. 컬럼 매트릭스 정의 및 디자인 토큰 매핑
    const columns = useMemo(() => [
        columnHelper.accessor('location', {
            header: '지역',
            size: 68,
            cell: info => <span className="text-slate-500 font-medium text-[11px]">{info.getValue()}</span>
        }),
        columnHelper.accessor('schoolname', {
            header: '학교명',
            size: 130,
            cell: info => <span className="text-slate-900 font-black tracking-tight">{info.getValue()}</span>
        }),
        columnHelper.accessor('sub_name', {
            header: '과목명',
            size: 100,
            cell: info => <span className="text-indigo-600 font-bold">{info.getValue()}</span>
        }),
        columnHelper.accessor('sub_type', {
            header: '유형',
            size: 68,
            cell: info => {
                const val = info.getValue();
                const isCommon = val?.includes('공통') || val?.includes('필수');
                return (
                    <Badge variant="outline" className={`text-[10px] px-1.5 py-0 rounded-md font-medium tracking-tight whitespace-nowrap ${isCommon ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-blue-50/60 border-blue-100 text-blue-600'
                        }`}>
                        {val}
                    </Badge>
                )
            }
        }),
        columnHelper.accessor('sub_grade', {
            header: '학년',
            size: 68,
            cell: info => <span className="font-extrabold text-slate-700">{info.getValue()}학년</span>
        }),
        columnHelper.accessor('sub_sem', {
            header: '학기',
            size:68,
            cell: info => <span className="text-slate-600 font-semibold">{info.getValue()}학기</span>
        }),
        // columnHelper.accessor('allClass', {
        //     header: '학급',
        //     size:68,
        //     cell: info => <span className="text-slate-400 font-medium text-[11px]">{info.getValue()}반</span>
        // }),

        // [동적 로직 A] 해당 학년 학급수 추출
        columnHelper.accessor((row) => {
            const grade = row.sub_grade
            if (grade === 1) return row.grade_1;
            if (grade === 2) return row.grade_2;
            if (grade === 3) return row.grade_3;
            return null;
        }, {
            id: 'gradeInfo',
            header: `학년학급`,
            size:68,
            cell: (info) => {
                const val = info.getValue();
                return val !== null ? <span className="text-slate-600 font-bold">{val}개</span> : <span className="text-slate-300">-</span>
            }
        }),

        // [동적 로직 B] 지정/선택 분반 스위칭 추출
        columnHelper.accessor((row) => {
            const grade = row.sub_grade;
            let gradeClassCount = null;
            if (grade === 1) gradeClassCount = row.grade_1;
            else if (grade === 2) gradeClassCount = row.grade_2;
            else if (grade === 3) gradeClassCount = row.grade_3;

            return row.sub_isgroup === '지정' ? gradeClassCount : row.sub_class;
        }, {
            id: 'classDisplay',
            header: '운영 분반',
            size: 70,
            cell: (info) => {
                const val = info.getValue();
                return val !== null ? (
                    <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-100 font-black text-[11px] px-2 py-0.5 rounded-md hover:bg-emerald-50">
                        {val}반
                    </Badge>
                ) : <span className="text-slate-300">-</span>
            }
        })
    ], [])

    // 2. 탠스택 엔진 초기화 및 페이지네이션 기본값(10개) 셋업
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

    const hasData = data && data.length > 0;

    return (
        <div className="w-full h-full flex flex-col justify-between bg-white overflow-hidden min-h-0">
            {hasData ? (
                <>
                    {/* [A] 스크롤 유연 보장 테이블 본체 레이어 */}
                    <div className="flex-1 overflow-y-auto min-h-0 relative custom-scrollbar">
                        <table className="w-full text-left border-collapse table-fixed">
                            {/* 상단 스티키 헤더 영역 */}
                            <thead className="sticky top-0 z-20 bg-slate-50 border-b border-slate-200 shadow-2xs">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            const isSorted = header.column.getIsSorted();
                                            return (
                                                <th
                                                    key={header.id}
                                                    onClick={header.column.getToggleSortingHandler()}
                                                    className="py-3 px-4 text-[11px] font-black text-slate-500 cursor-pointer hover:bg-slate-100 hover:text-slate-800 transition-colors select-none"
                                                    style={{ width: header.column.columnDef.size }}
                                                >
                                                    <div className="flex items-center gap-1">
                                                        <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                                                        {isSorted === "asc" && <ArrowUp size={11} className="text-indigo-600" />}
                                                        {isSorted === "desc" && <ArrowDown size={11} className="text-indigo-600" />}
                                                        {!isSorted && <ArrowUpDown size={11} className="text-slate-300 opacity-60" />}
                                                    </div>
                                                </th>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </thead>

                            {/* 데이터 매트릭스 바디 */}
                            <tbody className="divide-y divide-slate-100 bg-white">
                                {table.getRowModel().rows.map((row) => (
                                    <tr
                                        key={row.id}
                                        className="hover:bg-slate-50/40 transition-colors group"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className="py-2.5 px-4 text-xs align-middle">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* [B] 하단 페이지네이션 제어판 컨트롤 밴드 */}
                    <div className="p-3 bg-slate-50/80 border-t border-slate-200/60 flex items-center justify-between shrink-0">
                        <span className="text-[11px] font-bold text-slate-400">
                            총 {data.length}개 편성 라인업 중 현재 페이지
                        </span>

                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                                className="h-8 rounded-lg px-2.5 border-slate-200 bg-white shadow-2xs hover:bg-slate-50 disabled:opacity-40 text-slate-600"
                            >
                                <ChevronLeft size={14} className="mr-0.5" />
                                <span className="text-[11px] font-bold">이전</span>
                            </Button>

                            <span className="text-xs font-black text-slate-700 bg-white px-3 py-1 rounded-md border border-slate-200/60 shadow-2xs min-w-14 text-center">
                                {table.getState().pagination.pageIndex + 1} <span className="text-slate-300 mx-0.5">/</span> {table.getPageCount()}
                            </span>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                                className="h-8 rounded-lg px-2.5 border-slate-200 bg-white shadow-2xs hover:bg-slate-50 disabled:opacity-40 text-slate-600"
                            >
                                <span className="text-[11px] font-bold">다음</span>
                                <ChevronRight size={14} className="ml-0.5" />
                            </Button>
                        </div>
                    </div>
                </>
            ) : (
                // 3. 데이터가 잡히지 않았을 때 띄워줄 Fallback 빈 화면
                <div className="w-full flex flex-col items-center justify-center py-24 text-center gap-2">
                    <div className="p-3 bg-slate-50 text-slate-400 border border-slate-100 rounded-full shadow-2xs">
                        <Inbox size={20} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-700">편성 정보가 존재하지 않습니다</p>
                        <p className="text-[10px] text-slate-400 mt-0.5 max-w-[220px]">
                            현재 필터링된 학교들 중에서 해당 세부 과목을 개설한 학교가 없습니다.
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
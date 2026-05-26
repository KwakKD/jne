import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui";
import { useStatistics } from "@/hooks/curriSta";
import { useCurriTableStore } from "@/store/CurriSubjectStore"
import type { GroupCell, JsonData } from "@/type/curri"
import { set_sort3 } from "@/utils/Curri/AfterDrop"
import { Globe, GlobeLock, Trash2 } from "lucide-react";
import { useCallback } from "react";
import { toast } from "sonner";

const ERROR_BG = "rgba(255, 165, 165, 1)";

export const Table2 = () => {
    const { year, userData, groupUpdate, addTable2, inputTable2 } = useCurriTableStore()
    const table2Data = userData[year].선택과목
    const groupInfo = userData[year].Group
    const { statistics_2, allCredit_2 } = useStatistics()

    table2Data.sort(
        (a, b) =>
            (a.IsTable !== b.IsTable && a.IsTable && b.IsTable) ? a.IsTable - b.IsTable :
                (a.Grade !== b.Grade) ? Number(a.Grade) - Number(b.Grade) :
                    Number(a.Semester) - Number(b.Semester)
    )

    const rows = (item: JsonData, idx: number, data: JsonData[]) => {
        const spanNumber = groupInfo[item.IsGroup].Subject.length;
        const spanSubject = data.filter(sub => sub.IsGroup === item.IsGroup);
        const rowNumber = data.length;
        const classname = "text-center align-middle font-bold text-[12px] text-slate-600 bg-indigo-50/30 border border-slate-300 last:border-r-0 px-1"

        if (idx !== rowNumber - 1) {
            if (item.IsTable !== data[idx + 1].IsTable) {
                if (item.Tag === spanSubject[0].Tag) {
                    const insertText = `[택${groupInfo[item.IsGroup].Choice}]\n${(groupInfo[item.IsGroup].Choice ?? 0) * (groupInfo[item.IsGroup].Credit ?? 0)}`
                    return (
                        (item.Grade === 1 && item.Semester === 1)
                            ?
                            <>
                                <td className={classname} rowSpan={spanNumber} style={{ whiteSpace: 'pre-line' }}>{insertText}</td>
                                <td className={classname}></td>
                                <td className={classname}></td>
                                <td className={classname}></td>
                                <td className={classname}></td>
                                <td className={classname}></td>
                            </>
                            : (item.Grade === 1 && item.Semester === 2)
                                ?
                                <>
                                    <td className={classname}></td>
                                    <td className={classname} rowSpan={spanNumber} style={{ whiteSpace: 'pre-line' }}>{insertText}</td>
                                    <td className={classname}></td>
                                    <td className={classname}></td>
                                    <td className={classname}></td>
                                    <td className={classname}></td>
                                </>
                                : (item.Grade === 2 && item.Semester === 1)
                                    ?
                                    <>
                                        <td className={classname}></td>
                                        <td className={classname}></td>
                                        <td className={classname} rowSpan={spanNumber} style={{ whiteSpace: 'pre-line' }}>{insertText}</td>
                                        <td className={classname}></td>
                                        <td className={classname}></td>
                                        <td className={classname}></td>
                                    </>
                                    : (item.Grade === 2 && item.Semester === 2)
                                        ?
                                        <>
                                            <td className={classname}></td>
                                            <td className={classname}></td>
                                            <td className={classname}></td>
                                            <td className={classname} rowSpan={spanNumber} style={{ whiteSpace: 'pre-line' }}>{insertText}</td>
                                            <td className={classname}></td>
                                            <td className={classname}></td>
                                        </>
                                        : (item.Grade === 3 && item.Semester === 1)
                                            ?
                                            <>
                                                <td className={classname}></td>
                                                <td className={classname}></td>
                                                <td className={classname}></td>
                                                <td className={classname}></td>
                                                <td className={classname} rowSpan={spanNumber} style={{ whiteSpace: 'pre-line' }}>{insertText}</td>
                                                <td className={classname}></td>
                                            </>
                                            :
                                            <>
                                                <td className={classname}></td>
                                                <td className={classname}></td>
                                                <td className={classname}></td>
                                                <td className={classname}></td>
                                                <td className={classname}></td>
                                                <td className={classname} rowSpan={spanNumber} style={{ whiteSpace: 'pre-line' }}>{insertText}</td>
                                            </>
                    )
                } else {
                    return (
                        <>
                            <td className={classname}></td>
                            <td className={classname}></td>
                            <td className={classname}></td>
                            <td className={classname}></td>
                            <td className={classname}></td>
                        </>
                    )
                }
            } else if (item.IsTable === data[idx + 1].IsTable) {
                const spanNumber_1 = groupInfo[data[idx + 1].IsGroup].Subject.length;
                const spanSubject_1 = data.filter(sub => sub.IsGroup === data[idx + 1].IsGroup)
                if (item.Tag === spanSubject[0].Tag && data[idx + 1].Tag === spanSubject_1[0].Tag) {
                    const insertText_1 = `[택${groupInfo[item.IsGroup].Choice}]\n${(groupInfo[item.IsGroup].Choice ?? 0) * (groupInfo[item.IsGroup].Credit ?? 0)}`
                    const insertText_2 = `[택${groupInfo[data[idx + 1].IsGroup].Choice}]\n${(groupInfo[data[idx + 1].IsGroup].Choice ?? 0) * (groupInfo[data[idx + 1].IsGroup].Credit ?? 0)}`
                    return (
                        item.Grade === 1
                            ?
                            <>
                                <td className={classname} rowSpan={spanNumber} style={{ whiteSpace: 'pre-line' }}>{insertText_1}</td>
                                <td className={classname} rowSpan={spanNumber_1} style={{ whiteSpace: 'pre-line' }}>{insertText_2}</td>
                                <td className={classname}></td>
                                <td className={classname}></td>
                                <td className={classname}></td>
                                <td className={classname}></td>
                            </>
                            : item.Grade === 2
                                ?
                                <>
                                    <td className={classname}></td>
                                    <td className={classname}></td>
                                    <td className={classname} rowSpan={spanNumber} style={{ whiteSpace: 'pre-line' }}>{insertText_1}</td>
                                    <td className={classname} rowSpan={spanNumber_1} style={{ whiteSpace: 'pre-line' }}>{insertText_2}</td>
                                    <td className={classname}></td>
                                    <td className={classname}></td>
                                </>
                                :
                                <>
                                    <td className={classname}></td>
                                    <td className={classname}></td>
                                    <td className={classname}></td>
                                    <td className={classname}></td>
                                    <td className={classname} rowSpan={spanNumber} style={{ whiteSpace: 'pre-line' }}>{insertText_1}</td>
                                    <td className={classname} rowSpan={spanNumber_1} style={{ whiteSpace: 'pre-line' }}>{insertText_2}</td>
                                </>
                    )
                } else if (item.Tag !== spanSubject[0].Tag && data[idx + 1].Tag === spanSubject_1[0].Tag) {
                    const insertText_2 = `[택${groupInfo[data[idx + 1].IsGroup].Choice}]\n${(groupInfo[data[idx + 1].IsGroup].Choice ?? 0) * (groupInfo[data[idx + 1].IsGroup].Credit ?? 0)}`
                    return (
                        item.Grade === 1
                            ?
                            <>
                                <td className={classname} rowSpan={spanNumber_1} style={{ whiteSpace: 'pre-line' }}>{insertText_2}</td>
                                <td className={classname}></td>
                                <td className={classname}></td>
                                <td className={classname}></td>
                                <td className={classname}></td>
                            </>
                            : item.Grade === 2
                                ?
                                <>
                                    <td className={classname}></td>
                                    <td className={classname}></td>
                                    <td className={classname} rowSpan={spanNumber_1} style={{ whiteSpace: 'pre-line' }}>{insertText_2}</td>
                                    <td className={classname}></td>
                                    <td className={classname}></td>
                                </>
                                :
                                <>
                                    <td className={classname}></td>
                                    <td className={classname}></td>
                                    <td className={classname}></td>
                                    <td className={classname}></td>
                                    <td className={classname} rowSpan={spanNumber_1} style={{ whiteSpace: 'pre-line' }}>{insertText_2}</td>
                                </>
                    )
                } else if (item.Tag !== spanSubject[0].Tag && data[idx + 1].Tag !== spanSubject_1[0].Tag) {
                    return (
                        <>
                            <td className={classname}></td>
                            <td className={classname}></td>
                            <td className={classname}></td>
                            <td className={classname}></td>
                        </>
                    )
                }
            }
        } else if (idx === 0) {
            const insertText = `[택${groupInfo[item.IsGroup].Choice}]\n${(groupInfo[item.IsGroup].Choice ?? 0) * (groupInfo[item.IsGroup].Credit ?? 0)}`
            return (
                (item.Grade === 1 && item.Semester === 1)
                    ?
                    <>
                        <td className={classname} style={{ whiteSpace: 'pre-line' }}>{insertText}</td>
                        <td className={classname}></td>
                        <td className={classname}></td>
                        <td className={classname}></td>
                        <td className={classname}></td>
                        <td className={classname}></td>
                    </>
                    : (item.Grade === 1 && item.Semester === 2)
                        ?
                        <>
                            <td className={classname}></td>
                            <td className={classname} style={{ whiteSpace: 'pre-line' }}>{insertText}</td>
                            <td className={classname}></td>
                            <td className={classname}></td>
                            <td className={classname}></td>
                            <td className={classname}></td>
                        </>
                        : (item.Grade === 2 && item.Semester === 1)
                            ?
                            <>
                                <td className={classname}></td>
                                <td className={classname}></td>
                                <td className={classname} style={{ whiteSpace: 'pre-line' }}>{insertText}</td>
                                <td className={classname}></td>
                                <td className={classname}></td>
                                <td className={classname}></td>
                            </>
                            : (item.Grade === 2 && item.Semester === 2)
                                ?
                                <>
                                    <td className={classname}></td>
                                    <td className={classname}></td>
                                    <td className={classname}></td>
                                    <td className={classname} style={{ whiteSpace: 'pre-line' }}>{insertText}</td>
                                    <td className={classname}></td>
                                    <td className={classname}></td>
                                </>
                                : (item.Grade === 3 && item.Semester === 1)
                                    ?
                                    <>
                                        <td className={classname}></td>
                                        <td className={classname}></td>
                                        <td className={classname}></td>
                                        <td className={classname}></td>
                                        <td className={classname} style={{ whiteSpace: 'pre-line' }}>{insertText}</td>
                                        <td className={classname}></td>
                                    </>
                                    :
                                    <>
                                        <td className={classname}></td>
                                        <td className={classname}></td>
                                        <td className={classname}></td>
                                        <td className={classname}></td>
                                        <td className={classname}></td>
                                        <td className={classname} style={{ whiteSpace: 'pre-line' }}>{insertText}</td>
                                    </>
            )
        } else {
            if (data[idx - 1].IsTable !== item.IsTable) {
                if (data[idx - 1].IsGroup === item.IsGroup) {
                    return (
                        <>
                            <td className={classname}></td>
                            <td className={classname}></td>
                            <td className={classname}></td>
                            <td className={classname}></td>
                            <td className={classname}></td>
                        </>
                    )
                } else {
                    const insertText = `[택${groupInfo[item.IsGroup].Choice}]\n${(groupInfo[item.IsGroup].Choice ?? 0) * (groupInfo[item.IsGroup].Credit ?? 0)}`
                    return (
                        (item.Grade === 1 && item.Semester === 1)
                            ?
                            <>
                                <td className={classname} style={{ whiteSpace: 'pre-line' }}>{insertText}</td>
                                <td className={classname}></td>
                                <td className={classname}></td>
                                <td className={classname}></td>
                                <td className={classname}></td>
                                <td className={classname}></td>
                            </>
                            : (item.Grade === 1 && item.Semester === 2)
                                ?
                                <>
                                    <td className={classname}></td>
                                    <td className={classname} style={{ whiteSpace: 'pre-line' }}>{insertText}</td>
                                    <td className={classname}></td>
                                    <td className={classname}></td>
                                    <td className={classname}></td>
                                    <td className={classname}></td>
                                </>
                                : (item.Grade === 2 && item.Semester === 1)
                                    ?
                                    <>
                                        <td className={classname}></td>
                                        <td className={classname}></td>
                                        <td className={classname} style={{ whiteSpace: 'pre-line' }}>{insertText}</td>
                                        <td className={classname}></td>
                                        <td className={classname}></td>
                                        <td className={classname}></td>
                                    </>
                                    : (item.Grade === 2 && item.Semester === 2)
                                        ?
                                        <>
                                            <td className={classname}></td>
                                            <td className={classname}></td>
                                            <td className={classname}></td>
                                            <td className={classname} style={{ whiteSpace: 'pre-line' }}>{insertText}</td>
                                            <td className={classname}></td>
                                            <td className={classname}></td>
                                        </>
                                        : (item.Grade === 3 && item.Semester === 1)
                                            ?
                                            <>
                                                <td className={classname}></td>
                                                <td className={classname}></td>
                                                <td className={classname}></td>
                                                <td className={classname}></td>
                                                <td className={classname} style={{ whiteSpace: 'pre-line' }}>{insertText}</td>
                                                <td className={classname}></td>
                                            </>
                                            :
                                            <>
                                                <td className={classname}></td>
                                                <td className={classname}></td>
                                                <td className={classname}></td>
                                                <td className={classname}></td>
                                                <td className={classname}></td>
                                                <td className={classname} style={{ whiteSpace: 'pre-line' }}>{insertText}</td>
                                            </>
                    )
                }

            }
        }
    }
    const groupRendering = (item: JsonData, idx: number, data: JsonData[]) => {
        const joinGroupText = item.IsGroup + ',' + data[idx + 1]?.IsGroup.slice(3)
        const soloGroupText = item.IsGroup;
        const choice1 = groupInfo[item.IsGroup].Choice ?? 0
        const choice2 = groupInfo[data[idx + 1]?.IsGroup]?.Choice ?? 0
        const subjectNumber1 = groupInfo[item.IsGroup].Subject.length
        const subjectNumber2 = groupInfo[data[idx + 1]?.IsGroup]?.Subject.length ?? 0
        const tdstyle = "px-2 py-0 text-center text-[12px] font-slate-700 border border-slate-300"

        if (data.length === 1) {
            return (
                <td
                    className={tdstyle}
                    style={{ background: ERROR_BG }}>{soloGroupText}</td>
            )
        } else {
            if (idx !== data.length - 1) {
                if (item.IsTable === data[idx + 1].IsTable) {
                    if (choice1 < subjectNumber1 && choice2 < subjectNumber2) {
                        return (
                            <td
                                className={tdstyle}
                            >{joinGroupText}</td>
                        )
                    } else {
                        return (
                            <td
                                className={tdstyle}
                                style={{ background: ERROR_BG }}>{joinGroupText}</td>
                        )
                    }
                } else {
                    if (choice1 < subjectNumber1) {
                        return <td
                            className={tdstyle}
                        >{soloGroupText}</td>
                    } else {
                        return <td
                            className={tdstyle}
                            style={{ background: ERROR_BG }}>{soloGroupText}</td>
                    }
                }
            } else {
                if (data[idx - 1].IsTable !== item.IsTable) {
                    if (choice1 < subjectNumber1) {
                        return <td
                            className={tdstyle}
                        >{soloGroupText}</td>
                    } else {
                        return <td
                            className={tdstyle}
                            style={{ background: ERROR_BG }}>{soloGroupText}</td>
                    }
                }
            }
        }
    }

    const handleContext = useCallback(
        (sub: JsonData) => {
            const currentSubject = sub.SubjectName;
            let nextSubjectName = currentSubject;

            // 1. '(온)'으로 시작하면 제거, 아니면 앞에 추가
            if (currentSubject.startsWith("(온)")) {
                // '(온)' 글자(3글자)를 제외한 나머지 문자열만 잘라냄
                nextSubjectName = currentSubject.slice(3).trim();
            } else {
                nextSubjectName = `(온) ${currentSubject}`;
            }

            // 2. 상태 업데이트 함수 호출 (기존 inputTable1 구조에 맞게 인자 전달)
            // 세 번째 인자로 변경할 새로운 과목명 객체를 넘겨줍니다.
            inputTable2(year, sub.Tag, {
                ...sub, // 기존 데이터 유지보수를 위해 스프레드 연산자 권장
                SubjectName: nextSubjectName
            });
        },
        [year, inputTable2] // 의존성 배열에 내부에서 사용하는 상태/함수 추가
    );

    const handleDelete = (item: JsonData) => {
        const deleteindex = item.IsTable;
        const deleteTag = item.Tag;
        const deleteItem = table2Data.filter(sub => sub.IsTable === deleteindex)
        const deleteGroup = deleteItem.map(sub => sub.IsGroup);

        deleteGroup.forEach(group => {
            const handleGroupInfo = groupInfo[group];

            if (handleGroupInfo.Subject.length === 1) {
                const resetGroupCell: GroupCell = {
                    Zone: null,
                    Subject: [],
                    Grouptag: null,
                    Credit: null,
                    Grade: null,
                    Semester: null,
                    Choice: null
                };
                groupUpdate(year, group, resetGroupCell);
                addTable2(year, set_sort3(table2Data.filter(sub => sub.Tag !== deleteTag)))
            } else {
                const newSubject = handleGroupInfo.Subject.filter(sub => sub !== deleteTag).sort((a, b) => a - b)
                const newGroupCell: GroupCell = {
                    ...handleGroupInfo,
                    Subject: newSubject,
                    Grouptag: newSubject[0]
                }
                groupUpdate(year, group, newGroupCell);
                addTable2(year, set_sort3(table2Data.filter(sub => sub.Tag !== deleteTag)))
            }
        })
        toast.success(`"${item.SubjectName}"과목이 삭제되었습니다.`)
    }

    return (
        <>
            {table2Data.length > 0 && (
                table2Data.map((item, idx, data) => (
                    (item.IsTable !== data[idx + 1]?.IsTable && idx > 0 && item.IsTable === data[idx - 1].IsTable)
                        ? null
                        :
                        <ContextMenu key={idx}>
                            <ContextMenuTrigger asChild>
                                <tr
                                    key={idx}
                                    // style={{ border: '1px solid #ddd' }}
                                    className="group hover:bg-blue-50/30 transition-colors border-b border-slate-300"
                                >
                                    <td
                                        className="px-2 py-1.5 text-center text-[12px] text-slate-700 border border-slate-300 uppercase tracking-tighter"
                                    >
                                        {item.Section}
                                    </td>
                                    {groupRendering(item, idx, data)}
                                    <td
                                        className="px-3 py-0 text-center text-[12px] text-slate-700 border border-slate-300 leading-tight"
                                    >
                                        {item.SubjectGroup}
                                    </td>
                                    <td
                                        className="px-2 py-0 text-center text-[12px] text-slate-700 border border-slate-300"
                                    >
                                        {item.SubjectProperty}
                                    </td>
                                    <td
                                        className="px-4 py-1.5 text-left text-[12px] font-semibold text-slate-900 border border-slate-300"
                                    >
                                        {item.SubjectName}
                                    </td>
                                    <td
                                        className="px-2 py-0 text-center text-[12px] text-slate-700 border border-slate-300"
                                    >
                                        {item.BasicCredit}
                                    </td>
                                    <td
                                        className="px-2 py-0 text-center text-[12px] font-bold text-indigo-700 border border-slate-300 bg-indigo-50/20"
                                    >
                                        {item.Credit}
                                    </td>
                                    {rows(item, idx, data)}
                                    {/* <td className="px-2 py-0 text-center border-l border-slate-200">
                                <button
                                    onClick={() => handleDelete(item)}
                                    className="p-1 rounded-md hover:bg-red-50 text-slate-300 hover:text-red-500 transition-colors"
                                >
                                    <span className="text-xs">❌</span>
                                </button>
                            </td> */}
                                    <td className="px-2 py-0 text-center border border-slate-200">
                                        <button
                                            onClick={() => handleDelete(item)}
                                            className="p-1.5 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all"
                                            title="과목 삭제"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            </ContextMenuTrigger>
                            {/* 3. 우클릭 시 렌더링될 실제 메뉴 구성 (행의 item 데이터를 직접 참조 가능) */}
                            <ContextMenuContent className="w-64 rounded-xl p-1.5 shadow-md border border-slate-200 bg-white/95 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/95">

                                {/* 1. 메뉴 헤더 (현재 선택된 과목명 표시) */}
                                <ContextMenuLabel className="px-2.5 py-2 text-[12px] font-medium text-slate-500 dark:text-slate-500 uppercase tracking-wider select-none">
                                    과목 설정 — <span className="text-slate-700 dark:text-slate-300 font-bold">{item.SubjectName}</span>
                                </ContextMenuLabel>

                                <ContextMenuSeparator className="my-1 bg-slate-100 dark:bg-slate-800" />

                                {/* 2. 온라인학교 토글 메뉴 아이템 */}
                                <ContextMenuItem
                                    onClick={() => handleContext(item)}
                                    className="flex items-center justify-between px-2.5 py-2 text-[13px] rounded-md cursor-pointer transition-colors focus:bg-slate-50 dark:focus:bg-slate-900"
                                >
                                    {item.SubjectName.startsWith("(온)") ? (
                                        <>
                                            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-medium">
                                                <GlobeLock className="h-4 w-4 stroke-[2.2]" />
                                                <span>온라인학교 과목 지정 취소</span>
                                            </div>
                                            <span className="text-[10px] text-slate-500 tracking-widest pl-4">OFF</span>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium">
                                                <Globe className="h-4 w-4 stroke-[2.2]" />
                                                <span>온라인학교 과목으로 지정</span>
                                            </div>
                                            <span className="text-[10px] text-slate-500 tracking-widest pl-4">ON</span>
                                        </>
                                    )}
                                </ContextMenuItem>

                                <ContextMenuSeparator className="my-1 bg-slate-100 dark:bg-slate-800" />

                                {/* 3. 과목 삭제 아이템 (위험 구역 스타일링) */}
                                <ContextMenuItem
                                    onClick={() => handleDelete(item)}
                                    className="flex items-center justify-between px-2.5 py-2 text-[13px] rounded-md cursor-pointer transition-colors text-red-600 dark:text-red-400 focus:text-red-600 focus:bg-red-50/60 dark:focus:bg-red-950/30"
                                >
                                    <div className="flex items-center gap-2 font-medium">
                                        <Trash2 className="h-4 w-4 stroke-[2.2]" />
                                        <span>과목 삭제하기</span>
                                    </div>
                                    <span className="text-[10px] text-red-500/70 tracking-widest pl-4">DEL</span>
                                </ContextMenuItem>

                            </ContextMenuContent>
                        </ContextMenu>
                ))
            )}
            {/* {table2Data.length > 0 && (
                <tr className="px-4 py-3 text-center text-sm text-slate-700 border-r border-slate-200">
                    <td colSpan={5} >선택과목 소계</td>
                    <td className="border-r border-slate-200 bg-slate-100/50"></td>
                    <td className="border-r border-slate-200 bg-slate-100/50"></td>
                    <td className="px-2 py-1 text-center font-bold text-sm text-indigo-700 border-r border-slate-200 bg-indigo-50/30">{statistics_2["1-1"]}</td>
                    <td className="px-2 py-1 text-center font-bold text-sm text-indigo-700 border-r border-slate-200 bg-indigo-50/30">{statistics_2["1-2"]}</td>
                    <td className="px-2 py-1 text-center font-bold text-sm text-indigo-700 border-r border-slate-200 bg-indigo-50/30">{statistics_2["2-1"]}</td>
                    <td className="px-2 py-1 text-center font-bold text-sm text-indigo-700 border-r border-slate-200 bg-indigo-50/30">{statistics_2["2-2"]}</td>
                    <td className="px-2 py-1 text-center font-bold text-sm text-indigo-700 border-r border-slate-200 bg-indigo-50/30">{statistics_2["3-1"]}</td>
                    <td className="px-2 py-1 text-center font-bold text-sm text-indigo-700 border-r border-slate-200 bg-indigo-50/30">{statistics_2["3-2"]}</td>
                    <td className="px-2 py-1 text-center font-bold text-sm text-indigo-700 border-r border-slate-200 bg-indigo-50/30">{allCredit_2}</td>
                </tr>
            )} */}
            {table2Data.length > 0 && (
                <tr className="bg-slate-100/80 shadow-sm">
                    <td colSpan={5} className="px-4 py-2.5 text-center border border-slate-300 font-bold text-[12px] text-slate-600 tracking-tight">
                        선택과목 과목 학점 소계
                    </td>
                    <td className="border border-slate-300"></td>
                    <td className="border border-slate-300"></td>
                    {["1-1", "1-2", "2-1", "2-2", "3-1", "3-2"].map((key) => (
                        <td key={key} className="px-2 py-2 text-center font-black text-[13px] text-indigo-800 border border-slate-300 bg-indigo-100/30">
                            {statistics_2[key] || 0}
                        </td>
                    ))}
                    <td className="px-2 py-2 text-center font-black text-[13px] text-white bg-indigo-600 border border-indigo-700">
                        {allCredit_2}
                    </td>
                </tr>
            )}
        </>
    )
}
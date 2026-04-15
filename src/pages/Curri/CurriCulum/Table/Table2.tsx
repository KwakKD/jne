import { useStatistics } from "@/hooks/curriSta";
import { useCurriTableStore } from "@/store/CurriSubjectStore"
import type { GroupCell, JsonData } from "@/type/curri"
import { set_sort3 } from "@/utils/Curri/AfterDrop"
import { toast } from "sonner";

const ERROR_BG = "rgba(255, 165, 165, 1)";

export const Table2 = () => {
    const { year, userData, groupUpdate, addTable2 } = useCurriTableStore()
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
        const classname = "text-center align-middle font-bold text-[12px] text-indigo-600 bg-indigo-50/30 border-r border-slate-200 last:border-r-0 px-1"

        if (idx !== rowNumber - 1) {
            if (item.IsTable !== data[idx + 1].IsTable) {
                if (item.Tag === spanSubject[0].Tag) {
                    const insertText = `[택${groupInfo[item.IsGroup].Choice}]\n${(groupInfo[item.IsGroup].Choice ?? 0) * (groupInfo[item.IsGroup].Credit ?? 0)}`
                    return (
                        (item.Grade === 1 && item.Semester === 1)
                            ?
                            <>
                                <td className={classname} rowSpan={spanNumber} style={{ whiteSpace: 'pre-line' }}>{insertText}</td>
                                <td></td><td></td><td></td><td></td><td></td>
                            </>
                            : (item.Grade === 1 && item.Semester === 2)
                                ?
                                <>
                                    <td></td>
                                    <td className={classname} rowSpan={spanNumber} style={{ whiteSpace: 'pre-line' }}>{insertText}</td>
                                    <td></td><td></td><td></td><td></td>
                                </>
                                : (item.Grade === 2 && item.Semester === 1)
                                    ?
                                    <>
                                        <td></td><td></td>
                                        <td className={classname} rowSpan={spanNumber} style={{ whiteSpace: 'pre-line' }}>{insertText}</td>
                                        <td></td><td></td><td></td>
                                    </>
                                    : (item.Grade === 2 && item.Semester === 2)
                                        ?
                                        <>
                                            <td></td><td></td><td></td>
                                            <td className={classname} rowSpan={spanNumber} style={{ whiteSpace: 'pre-line' }}>{insertText}</td>
                                            <td></td><td></td>
                                        </>
                                        : (item.Grade === 3 && item.Semester === 1)
                                            ?
                                            <>
                                                <td></td><td></td><td></td><td></td>
                                                <td className={classname} rowSpan={spanNumber} style={{ whiteSpace: 'pre-line' }}>{insertText}</td>
                                                <td></td>
                                            </>
                                            :
                                            <>
                                                <td></td><td></td><td></td><td></td><td></td>
                                                <td className={classname} rowSpan={spanNumber} style={{ whiteSpace: 'pre-line' }}>{insertText}</td>
                                            </>
                    )
                } else {
                    return (
                        <>
                            <td></td><td></td><td></td><td></td><td></td>
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
                                <td></td><td></td><td></td><td></td>
                            </>
                            : item.Grade === 2
                                ?
                                <>
                                    <td></td><td></td>
                                    <td className={classname} rowSpan={spanNumber} style={{ whiteSpace: 'pre-line' }}>{insertText_1}</td>
                                    <td className={classname} rowSpan={spanNumber_1} style={{ whiteSpace: 'pre-line' }}>{insertText_2}</td>
                                    <td></td><td></td>
                                </>
                                :
                                <>
                                    <td></td><td></td><td></td><td></td>
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
                                <td></td><td></td><td></td><td></td>
                            </>
                            : item.Grade === 2
                                ?
                                <>
                                    <td></td><td></td>
                                    <td className={classname} rowSpan={spanNumber_1} style={{ whiteSpace: 'pre-line' }}>{insertText_2}</td>
                                    <td></td><td></td>
                                </>
                                :
                                <>
                                    <td></td><td></td><td></td><td></td>
                                    <td className={classname} rowSpan={spanNumber_1} style={{ whiteSpace: 'pre-line' }}>{insertText_2}</td>
                                </>
                    )
                } else if (item.Tag !== spanSubject[0].Tag && data[idx + 1].Tag !== spanSubject_1[0].Tag) {
                    return (
                        <>
                            <td></td><td></td><td></td><td></td>
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
                        <td></td><td></td><td></td><td></td><td></td>
                    </>
                    : (item.Grade === 1 && item.Semester === 2)
                        ?
                        <>
                            <td></td>
                            <td className={classname} style={{ whiteSpace: 'pre-line' }}>{insertText}</td>
                            <td></td><td></td><td></td><td></td>
                        </>
                        : (item.Grade === 2 && item.Semester === 1)
                            ?
                            <>
                                <td></td><td></td>
                                <td className={classname} style={{ whiteSpace: 'pre-line' }}>{insertText}</td>
                                <td></td><td></td><td></td>
                            </>
                            : (item.Grade === 2 && item.Semester === 2)
                                ?
                                <>
                                    <td></td><td></td><td></td>
                                    <td className={classname} style={{ whiteSpace: 'pre-line' }}>{insertText}</td>
                                    <td></td><td></td>
                                </>
                                : (item.Grade === 3 && item.Semester === 1)
                                    ?
                                    <>
                                        <td></td><td></td><td></td><td></td>
                                        <td className={classname} style={{ whiteSpace: 'pre-line' }}>{insertText}</td>
                                        <td></td>
                                    </>
                                    :
                                    <>
                                        <td></td><td></td><td></td><td></td><td></td>
                                        <td className={classname} style={{ whiteSpace: 'pre-line' }}>{insertText}</td>
                                    </>
            )
        } else {
            if (data[idx - 1].IsTable !== item.IsTable) {
                if (data[idx - 1].IsGroup === item.IsGroup) {
                    return (
                        <>
                            <td></td><td></td><td></td><td></td><td></td>
                        </>
                    )
                } else {
                    const insertText = `[택${groupInfo[item.IsGroup].Choice}]\n${(groupInfo[item.IsGroup].Choice ?? 0) * (groupInfo[item.IsGroup].Credit ?? 0)}`
                    return (
                        (item.Grade === 1 && item.Semester === 1)
                            ?
                            <>
                                <td className={classname} style={{ whiteSpace: 'pre-line' }}>{insertText}</td>
                                <td></td><td></td><td></td><td></td><td></td>
                            </>
                            : (item.Grade === 1 && item.Semester === 2)
                                ?
                                <>
                                    <td></td>
                                    <td className={classname} style={{ whiteSpace: 'pre-line' }}>{insertText}</td>
                                    <td></td><td></td><td></td><td></td>
                                </>
                                : (item.Grade === 2 && item.Semester === 1)
                                    ?
                                    <>
                                        <td></td><td></td>
                                        <td className={classname} style={{ whiteSpace: 'pre-line' }}>{insertText}</td>
                                        <td></td><td></td><td></td>
                                    </>
                                    : (item.Grade === 2 && item.Semester === 2)
                                        ?
                                        <>
                                            <td></td><td></td><td></td>
                                            <td className={classname} style={{ whiteSpace: 'pre-line' }}>{insertText}</td>
                                            <td></td><td></td>
                                        </>
                                        : (item.Grade === 3 && item.Semester === 1)
                                            ?
                                            <>
                                                <td></td><td></td><td></td><td></td>
                                                <td className={classname} style={{ whiteSpace: 'pre-line' }}>{insertText}</td>
                                                <td></td>
                                            </>
                                            :
                                            <>
                                                <td></td><td></td><td></td><td></td><td></td>
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

        if (data.length === 1) {
            return (
                <td
                    className="px-2 py-0 text-center text-xs font-medium border-r border-slate-200"
                    style={{ background: ERROR_BG }}>{soloGroupText}</td>
            )
        } else {
            if (idx !== data.length - 1) {
                if (item.IsTable === data[idx + 1].IsTable) {
                    if (choice1 < subjectNumber1 && choice2 < subjectNumber2) {
                        return (
                            <td
                                className="px-2 py-0 text-center text-xs font-medium border-r border-slate-200"
                            >{joinGroupText}</td>
                        )
                    } else {
                        return (
                            <td
                                className="px-2 py-0 text-center text-xs font-medium border-r border-slate-200"
                                style={{ background: ERROR_BG }}>{joinGroupText}</td>
                        )
                    }
                } else {
                    if (choice1 < subjectNumber1) {
                        return <td
                            className="px-2 py-0 text-center text-xs font-medium border-r border-slate-200"
                        >{soloGroupText}</td>
                    } else {
                        return <td
                            className="px-2 py-0 text-center text-xs font-medium border-r border-slate-200"
                            style={{ background: ERROR_BG }}>{soloGroupText}</td>
                    }
                }
            } else {
                if (data[idx - 1].IsTable !== item.IsTable) {
                    if (choice1 < subjectNumber1) {
                        return <td
                            className="px-2 py-0 text-center text-xs font-medium border-r border-slate-200"
                        >{soloGroupText}</td>
                    } else {
                        return <td
                            className="px-2 py-0 text-center text-xs font-medium border-r border-slate-200"
                            style={{ background: ERROR_BG }}>{soloGroupText}</td>
                    }
                }
            }
        }
    }

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
                        <tr key={idx} style={{ border: '1px solid #ddd' }}>
                            <td
                                className="px-4 py-0 text-center text-xs text-slate-500 border-r border-slate-200 bg-slate-50/30"
                            >
                                {item.Section}
                            </td>
                            {groupRendering(item, idx, data)}
                            <td
                                className="px-3 py-0 text-center text-sm border-r border-slate-200"
                            >
                                {item.SubjectGroup}
                            </td>
                            <td
                                className="px-2 py-0 text-center text-[11px] text-slate-500 border-r border-slate-200"
                            >
                                {item.SubjectProperty}
                            </td>
                            <td
                                className="px-4 py-0 text-left text-sm font-bold text-slate-800 border-r border-slate-200"
                            >
                                {item.SubjectName}
                            </td>
                            <td
                                className="px-2 py-0 text-center text-sm text-slate-400 border-r border-slate-200"
                            >
                                {item.BasicCredit}
                            </td>
                            <td
                                className="px-2 py-0 text-center text-sm font-semibold text-indigo-600 border-r border-slate-200"
                            >
                                {item.Credit}
                            </td>
                            {rows(item, idx, data)}
                            <td className="px-2 py-0 text-center border-l border-slate-200">
                                <button
                                    onClick={() => handleDelete(item)}
                                    className="p-1 rounded-md hover:bg-red-50 text-slate-300 hover:text-red-500 transition-colors"
                                >
                                    <span className="text-xs">❌</span>
                                </button>
                            </td>
                        </tr>
                ))
            )}
            {table2Data.length > 0 && (
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
            )}
        </>
    )
}
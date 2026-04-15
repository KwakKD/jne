import { SUBJECT } from "@/data/Curri/subject"
import { useStatistics } from "@/hooks/curriSta"
import { useCurriTableStore } from "@/store/CurriSubjectStore"
import type { GroupCell, JsonData } from "@/type/curri"
import { set_sort1 } from "@/utils/Curri/AfterDrop"
import { useCallback, useMemo, useState, type ChangeEvent } from "react"
import { toast } from "sonner"

const COLUMN = [
    { name: "col1", grade: 1, semester: 1, idx: 0 },
    { name: "col2", grade: 1, semester: 2, idx: 1 },
    { name: "col3", grade: 2, semester: 1, idx: 2 },
    { name: "col4", grade: 2, semester: 2, idx: 3 },
    { name: "col5", grade: 3, semester: 1, idx: 4 },
    { name: "col6", grade: 3, semester: 2, idx: 5 },
]

const DEFAULT_BG = "rgb(205, 222, 255)";
const SUCCESS_BG = "#ffffff";
const ERROR_BG = "rgba(255, 165, 165, 1)";

export const Table1 = () => {
    const { year, userData, addTable1, inputTable1, groupUpdate } = useCurriTableStore()
    const Data = userData[year]
    const AddSubject = Data.AddSubject
    const Group = Data.Group

    const table1Data = useMemo(() => set_sort1(Data.학교지정), [Data.학교지정])
    const totalSubjects = useMemo(() => [...SUBJECT, ...AddSubject], [AddSubject])
    const [tempValue, setTempValue] = useState<boolean>(true);
    const [inputValue, setInputValue] = useState<number>(0)
    const { statistics_1, allCredit_1 } = useStatistics()

    /** ----------------------------
     *  학점 입력 핸들러
     * ---------------------------- */
    const handleInputChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>, sub: JsonData, grade: number, sem: number) => {
            setTempValue(true)
            setInputValue(0)
            const inputSubject = totalSubjects.find((s) => s.Tag === sub.Tag);
            if (!inputSubject) return;

            const min = inputSubject.최소학점 ?? 1;
            const max = inputSubject.최대학점 ?? 20;
            const basic = inputSubject.기준학점 ?? 1;
            const num = Number(e.target.value);

            console.log(inputValue)
            if (Number.isNaN(num)) return;

            if (min >= 10 || max >= 10 || basic >= 10) {
                setInputValue(num)
                if (num < min || num > max) {
                    toast.error(`학점은 최소 ${min}에서 ${max} 사이여야 합니다.`)
                    setTempValue(false)
                } else {
                    inputTable1(year, inputSubject.Tag, { Credit: num, Grade: grade, Semester: sem });
                    setTempValue(true)
                }
            } else {
                if (num < min || num > max) {
                    toast.error(`학점은 최소 ${min}에서 ${max} 사이여야 합니다.`);
                    return;
                } else {
                    inputTable1(year, inputSubject.Tag, { Credit: num, Grade: grade, Semester: sem });
                    setTempValue(true)
                }
            }
        },
        [totalSubjects, inputTable1, inputValue]
    );

    /** ----------------------------
     *  배경색 처리
     * ---------------------------- */
    const getBackgroundColor = useCallback((item: JsonData, col: (typeof COLUMN)[number]) => {
        const inputSubject = totalSubjects.find((s) => s.Tag === item.Tag);
        if (!inputSubject) return;
        const min = inputSubject.최소학점 ?? 1;
        const max = inputSubject.최대학점 ?? 20;
        const basic = inputSubject.기준학점 ?? 1;
        if (col.grade === item.Grade && col.semester === item.Semester) {
            return SUCCESS_BG
        } else if (min >= 10 || max >= 10 || basic >= 10) {
            if (inputValue !== 0) {
                if (min > inputValue || max < inputValue || !tempValue) {
                    return ERROR_BG
                } else {
                    return DEFAULT_BG
                }
            } else {
                return DEFAULT_BG
            }

        } else {
            return DEFAULT_BG
        }
    }, [inputValue, tempValue]);

    /** ----------------------------
     *  그룹 렌더링 처리
     * ---------------------------- */
    const renderGroup = useCallback(
        (item: JsonData) => {
            const group = Group[item.IsGroup];
            if (!group) return null;

            const spanNumber = group.Subject.length;
            const insertText = `[택${group.Choice}]\n${(group.Credit ?? 0) * (group.Choice ?? 0)}`;
            const isFirst = group.Subject[0] === item.Tag;

            if (!isFirst) return null;

            const td = (idx: number, content?: string) => (
                <td
                    key={idx}
                    rowSpan={spanNumber}
                    className="text-center align-middle font-bold text-[12px] text-indigo-600 bg-indigo-50/30 border-r border-slate-200 last:border-r-0 px-1"
                    style={{ whiteSpace: "pre-line" }} // pre 대신 pre-line 권장 (자동 줄바꿈 방지)
                >
                    {content ?? ""}
                </td>
            );

            switch (item.Grade) {
                case 1:
                    return (
                        <>
                            {td(0, insertText)}
                            {td(1, insertText)}
                            {td(2)}
                            {td(3)}
                            {td(4)}
                            {td(5)}
                        </>
                    );
                case 2:
                    return (
                        <>
                            {td(0)}
                            {td(1)}
                            {td(2, insertText)}
                            {td(3, insertText)}
                            {td(4)}
                            {td(5)}
                        </>
                    );
                default:
                    return (
                        <>
                            {td(0)}
                            {td(1)}
                            {td(2)}
                            {td(3)}
                            {td(4, insertText)}
                            {td(5, insertText)}
                        </>
                    );
            }
        },
        [Group]
    );

    /** ----------------------------
     *  value 값 처리
     * ---------------------------- */
    const handleValue = (item: JsonData, col: (typeof COLUMN)[number]) => {
        const inputSubject = totalSubjects.find((s) => s.Tag === item.Tag);
        if (!inputSubject) return;

        const min = inputSubject.최소학점 ?? 1;
        const max = inputSubject.최대학점 ?? 20;
        const basic = inputSubject.기준학점 ?? 1;

        if (min >= 10 || max >= 10 || basic >= 10) {
            if (tempValue) {
                if (col.grade === item.Grade && col.semester === item.Semester) {
                    return String(item.Credit)
                } else {
                    return ""
                }
            }
        } else {
            if (col.grade === item.Grade && col.semester === item.Semester) {
                return String(item.Credit)
            } else {
                return ""
            }
        }
    }

    const handleDelete = (item: JsonData) => {
        if (item.IsGroup === "") {
            console.log(table1Data)
            console.log(table1Data.filter(sub => sub.Tag !== item.Tag))
            addTable1(year, set_sort1(table1Data.filter(sub => sub.Tag !== item.Tag)));

            return;
        }

        const handleGroupInfo = Group[item.IsGroup];
        if (!handleGroupInfo) return;

        if (handleGroupInfo.Subject.length === 1) {
            const resetGroupCell: GroupCell = {
                Zone: null,
                Subject: [],
                Grouptag: null,
                Credit: null,
                Grade: null,
                Semester: null,
                Choice: null,
            };
            groupUpdate(year, item.IsGroup, resetGroupCell);
            addTable1(year, set_sort1(table1Data.filter(sub => sub.Tag !== item.Tag)));
        } else {
            const newSubject = handleGroupInfo.Subject.filter((sub) => sub !== item.Tag).sort();
            const newGroupCell: GroupCell = {
                ...handleGroupInfo,
                Subject: newSubject,
                Grouptag: newSubject[0],
            };
            groupUpdate(year, item.IsGroup, newGroupCell);
            addTable1(year, set_sort1(table1Data.filter(sub => sub.Tag !== item.Tag)));
            // deleteTable1(item.Tag);
            // const newJson = table1Data.filter(sub => sub.Tag !==item.Tag);
            // addTable1(set_sort1(newJson));
        }
        toast.success(`"${item.SubjectName}"과목이 삭제되었습니다.`)
    }
    return (
        <>
            {table1Data.map((item) => (
                <tr
                    key={item.Tag}
                    className="group hover:bg-slate-50/50 transition-colors border-b border-slate-200"
                >
                    <td className="px-4 py-0 text-center text-xs text-slate-500 border-r border-slate-200 bg-slate-50/30">{item.Section}</td>
                    <td
                        className="px-2 py-0 text-center text-xs font-medium border-r border-slate-200"
                        style={item.IsGroup && Group[item.IsGroup]?.Subject.length < 2 ? { background: ERROR_BG } : {}}
                    >
                        {item.IsGroup}
                    </td>
                    <td className="px-3 py-0 text-center text-sm border-r border-slate-200">{item.SubjectGroup}</td>
                    <td className="px-2 py-0 text-center text-[11px] text-slate-500 border-r border-slate-200">{item.SubjectProperty}</td>
                    <td className="px-4 py-0 text-left text-sm font-bold text-slate-800 border-r border-slate-200">{item.SubjectName}</td>
                    <td className="px-2 py-0 text-center text-sm text-slate-400 border-r border-slate-200">{item.BasicCredit}</td>
                    <td className="px-2 py-0 text-center text-sm font-semibold text-indigo-600 border-r border-slate-200">{item.Credit}</td>

                    {item.IsGroup === "" ? (
                        COLUMN.map((col) => (
                            <td
                                key={col.name}
                                className="p-0 border-r border-slate-200 last:border-r-0 h-2 w-10"
                            >
                                <input
                                    className="w-full h-full text-center text-sm font-bold focus:outline-none focus:bg-indigo-50/50 focus:ring-1 focus:ring-inset focus:ring-indigo-500 transition-all"
                                    name={col.name}
                                    type="text"
                                    inputMode="numeric"
                                    style={{ background: getBackgroundColor(item, col) }}
                                    value={handleValue(item, col)}
                                    onFocus={(e) => e.target.select()}
                                    onChange={(e) => handleInputChange(e, item, col.grade, col.semester)}
                                />
                            </td>
                        ))
                    ) : (
                        renderGroup(item)
                    )}

                    <td className="px-2 py-0 text-center border-l border-slate-200">
                        <button
                            onClick={() => handleDelete(item)}
                            className="p-1 rounded-md hover:bg-red-50 text-slate-300 hover:text-red-500 transition-colors"
                        >
                            <span className="text-xs">❌</span>
                        </button>
                    </td>
                </tr>
            ))}
            {table1Data.length > 0 && (
                <tr className="px-4 py-3 text-center text-sm text-slate-700 border-r border-slate-200">
                    <td colSpan={5} >학교지정 과목 소계</td>
                    <td className="border-r border-slate-200 bg-slate-100/50"></td>
                    <td className="border-r border-slate-200 bg-slate-100/50"></td>
                    <td className="px-2 py-1 text-center font-bold text-sm text-indigo-700 border-r border-slate-200 bg-indigo-50/30">{statistics_1["1-1"]}</td>
                    <td className="px-2 py-1 text-center font-bold text-sm text-indigo-700 border-r border-slate-200 bg-indigo-50/30">{statistics_1["1-2"]}</td>
                    <td className="px-2 py-1 text-center font-bold text-sm text-indigo-700 border-r border-slate-200 bg-indigo-50/30">{statistics_1["2-1"]}</td>
                    <td className="px-2 py-1 text-center font-bold text-sm text-indigo-700 border-r border-slate-200 bg-indigo-50/30">{statistics_1["2-2"]}</td>
                    <td className="px-2 py-1 text-center font-bold text-sm text-indigo-700 border-r border-slate-200 bg-indigo-50/30">{statistics_1["3-1"]}</td>
                    <td className="px-2 py-1 text-center font-bold text-sm text-indigo-700 border-r border-slate-200 bg-indigo-50/30">{statistics_1["3-2"]}</td>
                    <td className="px-2 py-1 text-center font-bold text-sm text-indigo-700 border-r border-slate-200 bg-indigo-50/30">{allCredit_1}</td>
                </tr>
            )}

        </>
    )
}
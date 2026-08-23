import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui"
import { SUBJECT } from "@/data/Curri/subject"
import { SPECIAL_HIGHSHCOOL } from "@/data/data"
import { useStatistics } from "@/hooks/curriSta"
import { useAuth } from "@/hooks/useAuth"
import { useCurriTableStore } from "@/store/CurriSubjectStore"
import type { GroupCell, JsonData } from "@/type/curri"
import { set_sort1 } from "@/utils/Curri/AfterDrop"
import { Globe, GlobeLock, Trash2 } from "lucide-react"
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

const DEFAULT_BG = "rgba(205, 222, 255,0.6)";
const SUCCESS_BG = "#ffffff";
const ERROR_BG = "rgba(255, 165, 165, 1)";

export const Table1 = () => {
    const { data: user } = useAuth()
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
            const isSpecialSchoolAndTagRange =
                user?.schoolname &&
                SPECIAL_HIGHSHCOOL.includes(user.schoolname) &&
                Number(sub.Tag) >= 171 &&
                Number(sub.Tag) <= 231;
            const min = isSpecialSchoolAndTagRange
                ? 1
                : (inputSubject.최소학점 ?? 2);
            const max = isSpecialSchoolAndTagRange
                ? 20
                : (inputSubject.최대학점 ?? 10);

            // const min = inputSubject.최소학점 ?? 1;
            // const max = inputSubject.최대학점 ?? 20;
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
        [totalSubjects, inputTable1, inputValue, user]
    );

    const handleInputBlur = useCallback(
        (val: string, sub: JsonData, grade: number, sem: number) => {
            const inputSubject = totalSubjects.find((s) => s.Tag === sub.Tag);
            if (!inputSubject) return;

            const isSpecialSchoolAndTagRange =
                user?.schoolname &&
                SPECIAL_HIGHSHCOOL.includes(user.schoolname) &&
                Number(sub.Tag) >= 171 &&
                Number(sub.Tag) <= 231;

            const min = isSpecialSchoolAndTagRange
                ? 1
                : (inputSubject.최소학점 ?? 2);

            const max = isSpecialSchoolAndTagRange
                ? 20
                : (inputSubject.최대학점 ?? 10);

            const num = Number(val);

            // 빈 값이거나 숫자가 아닌 경우
            if (val === "" || Number.isNaN(num)) {
                setTempValue(false);
                return;
            }

            // 범위 검증
            if (num < min || num > max) {
                toast.error(`학점은 최소 ${min}에서 ${max} 사이여야 합니다.`);
                setTempValue(false);
                return;
            }

            // 통과 시 최종 스토어/테이블 저장
            inputTable1(year, inputSubject.Tag, { Credit: num, Grade: grade, Semester: sem });
            setTempValue(true);
        },
        [totalSubjects, inputTable1, year, user]
    );

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
            inputTable1(year, sub.Tag, {
                ...sub, // 기존 데이터 유지보수를 위해 스프레드 연산자 권장
                SubjectName: nextSubjectName
            });
        },
        [year, inputTable1] // 의존성 배열에 내부에서 사용하는 상태/함수 추가
    );
    /** ----------------------------
     *  배경색 처리
     * ---------------------------- */
    const getBackgroundColor = useCallback((item: JsonData, col: (typeof COLUMN)[number]) => {
        const inputSubject = totalSubjects.find((s) => s.Tag === item.Tag);
        if (!inputSubject) return;
        const isSpecialSchoolAndTagRange =
            user?.schoolname &&
            SPECIAL_HIGHSHCOOL.includes(user.schoolname) &&
            Number(item.Tag) >= 171 &&
            Number(item.Tag) <= 231;
        const min = isSpecialSchoolAndTagRange
            ? 1
            : (inputSubject.최소학점 ?? 2);
        const max = isSpecialSchoolAndTagRange
            ? 20
            : (inputSubject.최대학점 ?? 10);
        // const min = inputSubject.최소학점 ?? 1;
        // const max = inputSubject.최대학점 ?? 20;
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
                    className="text-center align-middle font-bold text-[12px] text-slate-600 bg-indigo-50/30 border border-slate-300 last:border-r-0 px-1"
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

        const isSpecialSchoolAndTagRange =
            user?.schoolname &&
            SPECIAL_HIGHSHCOOL.includes(user.schoolname) &&
            Number(item.Tag) >= 171 &&
            Number(item.Tag) <= 231;
        const min = isSpecialSchoolAndTagRange
            ? 1
            : (inputSubject.최소학점 ?? 2);
        const max = isSpecialSchoolAndTagRange
            ? 20
            : (inputSubject.최대학점 ?? 10);
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
                <ContextMenu key={item.Tag}>
                    <ContextMenuTrigger asChild>
                        <tr
                            // key={item.Tag}
                            className="group hover:bg-blue-50/30 transition-colors border-b border-slate-300"
                        >
                            <td className="px-2 py-1.5 text-center text-[12px] text-slate-700 border border-slate-300 uppercase tracking-tighter">{item.Section}</td>
                            <td
                                className="px-2 py-0 text-center text-[12px] font-slate-700 border border-slate-300"
                                style={item.IsGroup && Group[item.IsGroup]?.Subject.length < 2 ? { background: ERROR_BG, color: 'white' } : { color: '#94a3b8' }}
                            >
                                {item.IsGroup}
                            </td>
                            <td className="px-3 py-0 text-center text-[12px] text-slate-700 border border-slate-300 leading-tight">{item.SubjectGroup}</td>
                            <td className="px-2 py-0 text-center text-[12px] text-slate-700 border border-slate-300">{item.SubjectProperty}</td>
                            <td className="px-4 py-1.5 text-left text-[12px] font-semibold text-slate-900 border border-slate-300">{item.SubjectName}</td>
                            <td className="px-2 py-0 text-center text-[12px] text-slate-700 border border-slate-300">{item.BasicCredit}</td>
                            <td className="px-2 py-0 text-center text-[12px] font-bold text-indigo-700 border border-slate-300 bg-indigo-50/20">{item.Credit}</td>

                            {item.IsGroup === "" ? (
                                COLUMN.map((col) => (
                                    <td
                                        key={col.name}
                                        className="p-0 border border-slate-300 last:border-r-0 h-2 w-10"
                                    >
                                        <input
                                            // className="w-full h-full text-center text-sm font-bold focus:outline-none focus:bg-indigo-50/50 focus:ring-1 focus:ring-inset focus:ring-indigo-500 transition-all"
                                            className="w-full h-full text-center text-[12px] font-medium focus:outline-none focus:bg-white focus:ring-1 focus:ring-inset focus:ring-indigo-400 transition-all placeholder:text-slate-200"
                                            name={col.name}
                                            type="text"
                                            inputMode="numeric"
                                            style={{ background: getBackgroundColor(item, col) }}
                                            value={handleValue(item, col)}
                                            onFocus={(e) => e.target.select()}
                                            onChange={(e) => handleInputChange(e, item, col.grade, col.semester)}
                                            onBlur={(e) => handleInputBlur(e.target.value, item, col.grade, col.semester)}
                                        />
                                    </td>
                                ))
                            ) : (
                                renderGroup(item)
                            )}

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
            ))}
            {/* {table1Data.length > 0 && (
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
            )} */}
            {table1Data.length > 0 && (
                <tr className="bg-slate-100/80 shadow-sm">
                    <td colSpan={5} className="px-4 py-2.5 text-center border border-slate-300 font-bold text-[12px] text-slate-600 tracking-tight">
                        학교지정 과목 학점 소계
                    </td>
                    <td className="border border-slate-300"></td>
                    <td className="border border-slate-300"></td>
                    {["1-1", "1-2", "2-1", "2-2", "3-1", "3-2"].map((key) => (
                        <td key={key} className="px-2 py-2 text-center font-black text-[13px] text-indigo-800 border border-slate-300 bg-indigo-100/30">
                            {statistics_1[key] || 0}
                        </td>
                    ))}
                    <td className="px-2 py-2 text-center font-black text-[13px] text-white bg-indigo-600 border border-indigo-700">
                        {allCredit_1}
                    </td>
                </tr>
            )}

        </>
    )
}
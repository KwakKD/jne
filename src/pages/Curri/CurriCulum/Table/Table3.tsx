import { useStatistics } from "@/hooks/curriSta";
import { useCurriTableStore } from "@/store/CurriSubjectStore";
import type { ChangeEvent } from "react";

const CEA_COLUMN = [
    { name: '1-1', grade: 1, semester: 1 },
    { name: '1-2', grade: 1, semester: 2 },
    { name: '2-1', grade: 2, semester: 1 },
    { name: '2-2', grade: 2, semester: 2 },
    { name: '3-1', grade: 3, semester: 1 },
    { name: '3-2', grade: 3, semester: 2 }
]

const DEFAULT_BG = "rgba(205, 222, 255, 0.6)";
const SUCCESS_BG = "#ffffff";

export const Table3 = () => {
    const { statistics_1, statistics_2, allCredit_1, allCredit_2, statistics_subjectNumber } = useStatistics()
    const allCredit = allCredit_1 + allCredit_2
    const { year, changeCEA, userData } = useCurriTableStore()
    const CEA = userData[year].CEA

    const handelInputCEA = (e: ChangeEvent<HTMLInputElement>) => {
        const keyname = e.target.name
        const num = Number(e.target.value);
        if (Number.isNaN(num)) return
        changeCEA(year, keyname, num)
    }
    const allCEA = () => {
        return Object.values(CEA).reduce((sum, val) => sum + val, 0)
    }
    const getBackgroundColor = (credit: number | string) => {
        if (credit === 0 || credit === '') {
            return DEFAULT_BG
        }
        return SUCCESS_BG
    }
    const trStyle = "bg-slate-100/80 font-bold border border-slate-300"
    const titlesyle = "px-4 py-2 text-center text-[12px] text-slate-700 border border-slate-300"
    const blankStyle = "px-4 py-2 border border-slate-300 bg-slate-100/50"
    const style = "px-2 py-2 text-center text-sm text-indigo-700 border border-slate-300 bg-indigo-50/30"
    return (
        <>
            <tr className={trStyle}>
                <td colSpan={5} className={titlesyle}>이수 학점 소계</td>
                <td colSpan={2} className={blankStyle}></td>
                <td className={style}>{statistics_1['1-1'] + statistics_2['1-1']}</td>
                <td className={style}>{statistics_1['1-2'] + statistics_2['1-2']}</td>
                <td className={style}>{statistics_1['2-1'] + statistics_2['2-1']}</td>
                <td className={style}>{statistics_1['2-2'] + statistics_2['2-2']}</td>
                <td className={style}>{statistics_1['3-1'] + statistics_2['3-1']}</td>
                <td className={style}>{statistics_1['3-2'] + statistics_2['3-2']}</td>
                <td className={style}>{allCredit}</td>
            </tr>
            <tr className={trStyle}>
                <td colSpan={5} className={titlesyle}>창의적 체험활동</td>
                <td colSpan={2} className={blankStyle}></td>
                {CEA_COLUMN.map((col) => (
                    <td
                        key={col.name}
                        className="p-0 border border-slate-300 last:border-r-0 h-2 w-10"
                    >
                        <input
                            className="w-full h-full text-center text-[12px] font-medium focus:outline-none focus:bg-white focus:ring-1 focus:ring-inset focus:ring-indigo-400 transition-all placeholder:text-slate-200"
                            name={col.name}
                            type="text"
                            inputMode='numeric'
                            onChange={(e) => handelInputCEA(e)}
                            aria-label={`학년 ${col.grade}, 학기 ${col.semester} 학점 입력`}
                            onKeyDown={(e) => {
                                if (!/[0-9]/.test(e.key) && !["Backspace", "Tab", "ArrowLeft", "ArrowRight"].includes(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            value={CEA[col.name] === 0 ? '' : CEA[col.name]}
                            style={{ background: (getBackgroundColor(CEA[col.name])) }}
                        />
                    </td>
                ))}
                <td className={style}>{allCEA()}</td>
            </tr>
            <tr className={trStyle}>
                <td colSpan={5} className={titlesyle}>학기별 총 이수학점</td>
                <td colSpan={2} className={blankStyle}></td>
                <td className={style}>{statistics_1['1-1'] + statistics_2['1-1'] + CEA['1-1']}</td>
                <td className={style}>{statistics_1['1-2'] + statistics_2['1-2'] + CEA['1-2']}</td>
                <td className={style}>{statistics_1['2-1'] + statistics_2['2-1'] + CEA['2-1']}</td>
                <td className={style}>{statistics_1['2-2'] + statistics_2['2-2'] + CEA['2-2']}</td>
                <td className={style}>{statistics_1['3-1'] + statistics_2['3-1'] + CEA['3-1']}</td>
                <td className={style}>{statistics_1['3-2'] + statistics_2['3-2'] + CEA['3-2']}</td>

                <td className={style}>{allCredit_1 + allCredit_2 + allCEA()}</td>
            </tr>
            <tr className={trStyle}>
                <td colSpan={5} className={titlesyle}>학기당 과목 수</td>
                <td colSpan={2} className={blankStyle}></td>
                <td className={style}>{statistics_subjectNumber['1-1']}</td>
                <td className={style}>{statistics_subjectNumber['1-2']}</td>
                <td className={style}>{statistics_subjectNumber['2-1']}</td>
                <td className={style}>{statistics_subjectNumber['2-2']}</td>
                <td className={style}>{statistics_subjectNumber['3-1']}</td>
                <td className={style}>{statistics_subjectNumber['3-2']}</td>
                <td></td>
            </tr>
            <tr className={trStyle}>
                <td colSpan={5} className={titlesyle}>학년별 총 이수 학점</td>
                <td colSpan={2} className={blankStyle}></td>
                <td colSpan={2} className={style}>{statistics_1['1-1'] + statistics_2['1-1'] + CEA['1-1'] + statistics_1['1-2'] + statistics_2['1-2'] + CEA['1-2']}</td>
                <td colSpan={2} className={style}>{statistics_1['2-1'] + statistics_2['2-1'] + CEA['2-1'] + statistics_1['2-2'] + statistics_2['2-2'] + CEA['2-2']}</td>
                <td colSpan={2} className={style}>{statistics_1['3-1'] + statistics_2['3-1'] + CEA['3-1'] + statistics_1['3-2'] + statistics_2['3-2'] + CEA['3-2']}</td>
                <td className={style}>{allCredit_1 + allCredit_2 + allCEA()}</td>
            </tr>
        </>
    )
}
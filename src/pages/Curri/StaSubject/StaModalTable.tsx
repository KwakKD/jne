"use client"

import type { SchoolCurriculumProps } from "@/api/supabaseAPI";
import type { JsonData } from "@/type/curri";
import { useMemo } from "react";

interface SubMoalTableProps {
    data: SchoolCurriculumProps[]
}

export function StaModalTable({ data }: SubMoalTableProps) {
    // 기존 가공 로직 엄격하게 유지
    const fixData = data[0].fix
    const choiceData = data[0].choice
    const CEAData = data[0].CEA
    const groupData = data[0].groupdata
    const choiceData_1 = choiceData.filter(item => item.Grade === 1) ?? []
    const choiceData_2 = choiceData.filter(item => item.Grade === 2) ?? []
    const choiceData_3 = choiceData.filter(item => item.Grade === 3) ?? []

    const choiceSpan_1 = [...new Set(choiceData_1.map(item => item.SubjectName))]
    const choiceSpan_2 = [...new Set(choiceData_2.map(item => item.SubjectName))]
    const choiceSpan_3 = [...new Set(choiceData_3.map(item => item.SubjectName))]

    // td 스타일 통일을 위한 스타일 클래스 묶음
    const cellClass = "border border-slate-200 px-3 py-2 text-center align-middle text-slate-700 font-medium tracking-tight whitespace-nowrap";
    const textLeftClass = "border border-slate-200 px-4 py-2 text-left align-middle font-bold text-slate-800 tracking-tight";
    const choiceCellClass = "border border-slate-200 px-2 py-2 text-center align-middle bg-amber-50/60 font-black text-amber-700 leading-tight text-[11px]";

    const renderFixCredit = (item: JsonData) => {
        const credits = Array(6).fill("");
        const index = (Number(item.Grade) - 1) * 2 + (Number(item.Semester) - 1);
        credits[index] = item.Credit;

        return (
            <>
                {credits.map((c, i) => (
                    <td key={i} className={cn(cellClass, c && "bg-indigo-50/40 text-indigo-600 font-extrabold")}>
                        {c}
                    </td>
                ))}
            </>
        );
    };

    const renderFixChoiceCredit = (item: JsonData) => {
        const group = groupData[item.IsGroup];
        if (!group) return null;

        const isFirst = group.Subject[0] === item.Tag;
        if (!isFirst) return null;

        const spanNumber = group.Subject.length;
        const insertText = `[택${group.Choice}]\n${(group.Credit ?? 0) * (group.Choice ?? 0)}`;

        const credits = Array(6).fill("");
        const gradeIdx = (Number(item.Grade) - 1) * 2;
        credits[gradeIdx] = insertText;
        credits[gradeIdx + 1] = insertText;

        return (
            <>
                {credits.map((c, i) => (
                    <td key={i} rowSpan={spanNumber} className={cn(choiceCellClass, !c && "bg-transparent border-slate-200")}>
                        {c}
                    </td>
                ))}
            </>
        );
    };

    const renderChoiceCredit = (item: JsonData, idx: number, data: JsonData[]) => {
        const spanNumber = groupData[item.IsGroup].Subject.length;
        const spanSubject = data.filter(sub => sub.IsGroup === item.IsGroup);
        const rowNumber = data.length;

        if (idx !== rowNumber - 1) {
            if (item.IsTable !== data[idx + 1].IsTable) {
                if (item.Tag === spanSubject[0].Tag) {
                    const insertText = `[택${groupData[item.IsGroup].Choice}]\n${(groupData[item.IsGroup].Choice ?? 0) * (groupData[item.IsGroup].Credit ?? 0)}`
                    return (
                        (item.Grade === 1 && item.Semester === 1)
                            ?
                            <>
                                <td rowSpan={spanNumber} className={choiceCellClass}>{insertText}</td>
                                <td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td>
                            </>
                            : (item.Grade === 1 && item.Semester === 2)
                                ?
                                <>
                                    <td className={cellClass}></td>
                                    <td rowSpan={spanNumber} className={choiceCellClass}>{insertText}</td>
                                    <td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td>
                                </>
                                : (item.Grade === 2 && item.Semester === 1)
                                    ?
                                    <>
                                        <td className={cellClass}></td><td className={cellClass}></td>
                                        <td rowSpan={spanNumber} className={choiceCellClass}>{insertText}</td>
                                        <td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td>
                                    </>
                                    : (item.Grade === 2 && item.Semester === 2)
                                        ?
                                        <>
                                            <td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td>
                                            <td rowSpan={spanNumber} className={choiceCellClass}>{insertText}</td>
                                            <td className={cellClass}></td><td className={cellClass}></td>
                                        </>
                                        : (item.Grade === 3 && item.Semester === 1)
                                            ?
                                            <>
                                                <td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td>
                                                <td rowSpan={spanNumber} className={choiceCellClass}>{insertText}</td>
                                                <td className={cellClass}></td>
                                            </>
                                            :
                                            <>
                                                <td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td>
                                                <td rowSpan={spanNumber} className={choiceCellClass}>{insertText}</td>
                                            </>
                    )
                } else {
                    return (
                        <>
                            <td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td>
                        </>
                    )
                }
            } else if (item.IsTable === data[idx + 1].IsTable) {
                const spanNumber_1 = groupData[data[idx + 1].IsGroup].Subject.length;
                const spanSubject_1 = data.filter(sub => sub.IsGroup === data[idx + 1].IsGroup)
                if (item.Tag === spanSubject[0].Tag && data[idx + 1].Tag === spanSubject_1[0].Tag) {
                    const insertText_1 = `[택${groupData[item.IsGroup].Choice}]\n${(groupData[item.IsGroup].Choice ?? 0) * (groupData[item.IsGroup].Credit ?? 0)}`
                    const insertText_2 = `[택${groupData[data[idx + 1].IsGroup].Choice}]\n${(groupData[data[idx + 1].IsGroup].Choice ?? 0) * (groupData[data[idx + 1].IsGroup].Credit ?? 0)}`
                    return (
                        item.Grade === 1
                            ?
                            <>
                                <td rowSpan={spanNumber} className={choiceCellClass}>{insertText_1}</td>
                                <td rowSpan={spanNumber_1} className={choiceCellClass}>{insertText_2}</td>
                                <td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td>
                            </>
                            : item.Grade === 2
                                ?
                                <>
                                    <td className={cellClass}></td><td className={cellClass}></td>
                                    <td rowSpan={spanNumber} className={choiceCellClass}>{insertText_1}</td>
                                    <td rowSpan={spanNumber_1} className={choiceCellClass}>{insertText_2}</td>
                                    <td className={cellClass}></td><td className={cellClass}></td>
                                </>
                                :
                                <>
                                    <td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td>
                                    <td rowSpan={spanNumber} className={choiceCellClass}>{insertText_1}</td>
                                    <td rowSpan={spanNumber_1} className={choiceCellClass}>{insertText_2}</td>
                                </>
                    )
                } else if (item.Tag !== spanSubject[0].Tag && data[idx + 1].Tag === spanSubject_1[0].Tag) {
                    const insertText_2 = `[택${groupData[data[idx + 1].IsGroup].Choice}]\n${(groupData[data[idx + 1].IsGroup].Choice ?? 0) * (groupData[data[idx + 1].IsGroup].Credit ?? 0)}`
                    return (
                        item.Grade === 1
                            ?
                            <>
                                <td rowSpan={spanNumber_1} className={choiceCellClass}>{insertText_2}</td>
                                <td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td>
                            </>
                            : item.Grade === 2
                                ?
                                <>
                                    <td className={cellClass}></td><td className={cellClass}></td>
                                    <td rowSpan={spanNumber_1} className={choiceCellClass}>{insertText_2}</td>
                                    <td className={cellClass}></td><td className={cellClass}></td>
                                </>
                                :
                                <>
                                    <td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td>
                                    <td rowSpan={spanNumber_1} className={choiceCellClass}>{insertText_2}</td>
                                </>
                    )
                } else if (item.Tag !== spanSubject[0].Tag && data[idx + 1].Tag !== spanSubject_1[0].Tag) {
                    return (
                        <>
                            <td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td>
                        </>
                    )
                }
            }
        } else if (idx === 0) {
            const insertText = `[택${groupData[item.IsGroup].Choice}]\n${(groupData[item.IsGroup].Choice ?? 0) * (groupData[item.IsGroup].Credit ?? 0)}`
            return (
                (item.Grade === 1 && item.Semester === 1)
                    ?
                    <>
                        <td className={choiceCellClass}>{insertText}</td>
                        <td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td>
                    </>
                    : (item.Grade === 1 && item.Semester === 2)
                        ?
                        <>
                            <td className={cellClass}></td>
                            <td className={choiceCellClass}>{insertText}</td>
                            <td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td>
                        </>
                        : (item.Grade === 2 && item.Semester === 1)
                            ?
                            <>
                                <td className={cellClass}></td><td className={cellClass}></td>
                                <td className={choiceCellClass}>{insertText}</td>
                                <td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td>
                            </>
                            : (item.Grade === 2 && item.Semester === 2)
                                ?
                                <>
                                    <td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td>
                                    <td className={choiceCellClass}>{insertText}</td>
                                    <td className={cellClass}></td><td className={cellClass}></td>
                                </>
                                : (item.Grade === 3 && item.Semester === 1)
                                    ?
                                    <>
                                        <td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td>
                                        <td className={choiceCellClass}>{insertText}</td>
                                        <td className={cellClass}></td>
                                    </>
                                    :
                                    <>
                                        <td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td>
                                        <td className={choiceCellClass}>{insertText}</td>
                                    </>
            )
        } else {
            if (data[idx - 1].IsTable !== item.IsTable) {
                if (data[idx - 1].IsGroup === item.IsGroup) {
                    return (
                        <>
                            <td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td>
                        </>
                    )
                } else {
                    const insertText = `[택${groupData[item.IsGroup].Choice}]\n${(groupData[item.IsGroup].Choice ?? 0) * (groupData[item.IsGroup].Credit ?? 0)}`
                    return (
                        (item.Grade === 1 && item.Semester === 1)
                            ?
                            <>
                                <td className={choiceCellClass}>{insertText}</td>
                                <td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td>
                            </>
                            : (item.Grade === 1 && item.Semester === 2)
                                ?
                                <>
                                    <td className={cellClass}></td>
                                    <td className={choiceCellClass}>{insertText}</td>
                                    <td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td>
                                </>
                                : (item.Grade === 2 && item.Semester === 1)
                                    ?
                                    <>
                                        <td className={cellClass}></td><td className={cellClass}></td>
                                        <td className={choiceCellClass}>{insertText}</td>
                                        <td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td>
                                    </>
                                    : (item.Grade === 2 && item.Semester === 2)
                                        ?
                                        <>
                                            <td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td>
                                            <td className={choiceCellClass}>{insertText}</td>
                                            <td className={cellClass}></td><td className={cellClass}></td>
                                        </>
                                        : (item.Grade === 3 && item.Semester === 1)
                                            ?
                                            <>
                                                <td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td>
                                                <td className={choiceCellClass}>{insertText}</td>
                                                <td className={cellClass}></td>
                                            </>
                                            :
                                            <>
                                                <td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td><td className={cellClass}></td>
                                                <td className={choiceCellClass}>{insertText}</td>
                                            </>
                    )
                }
            }
        }
    }

    // 통계 연산 로직 엄격하게 보존
    const fixSta_1 = useMemo<Record<string, number>>(() => {
        const cache: Record<string, number> = {};
        if (!fixData || !groupData) return cache

        for (let grade = 1; grade <= 3; grade++) {
            for (let sem = 1; sem <= 2; sem++) {
                let fixNoGroup = 0;
                let fixIsGroup = 0;

                Object.keys(groupData).forEach((key) => {
                    const g = groupData[key];
                    if (g.Zone === '지정' && g.Grade === grade) {
                        fixIsGroup += g.Credit ?? 0;
                    }
                });

                fixNoGroup = fixData
                    .filter((item) => item.Grade === grade && item.Semester === sem && item.IsGroup === '')
                    .reduce((sum, item) => sum + Number(item.Credit), 0)

                cache[`${grade}-${sem}`] = fixIsGroup + fixNoGroup;
            }
        }
        return cache
    }, [fixData, groupData])

    const allCredit_1 = useMemo(() => {
        return Object.values(fixSta_1).reduce((sum, val) => sum + val, 0);
    }, [fixSta_1])

    const choiceSta = useMemo<Record<string, number>>(() => {
        const cache: Record<string, number> = {};
        for (let grade = 1; grade <= 3; grade++) {
            for (let sem = 1; sem <= 2; sem++) {
                let choiceCredit = 0;
                Object.keys(groupData).forEach((key) => {
                    const g = groupData[key];
                    if (g.Zone === '선택' && g.Grade === grade && g.Semester === sem) {
                        choiceCredit += (g.Credit ?? 0) * (g.Choice ?? 0);
                    }
                });
                cache[`${grade}-${sem}`] = choiceCredit;
            }
        }
        return cache;
    }, [choiceData, groupData])

    const allCreidt_2 = useMemo(() => {
        return Object.values(choiceSta).reduce((sum, val) => sum + val, 0);
    }, [choiceSta])

    // 유틸리티 클래스 바인딩 컴포넌트
    function cn(...inputs: any[]) {
        return inputs.filter(Boolean).join(" ");
    }

    return (
        <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full border-collapse text-xs text-left">
                <colgroup>
                    <col className="w-[8%]" />
                    <col className="w-[14%]" />
                    <col className="w-[8%]" />
                    <col className="w-[24%]" />
                    <col className="w-[6%]" />
                    <col className="w-[6%]" />
                    <col className="w-[5%]" />
                    <col className="w-[5%]" />
                    <col className="w-[5%]" />
                    <col className="w-[5%]" />
                    <col className="w-[5%]" />
                    <col className="w-[5%]" />
                </colgroup>

                {/* 헤더 디자인 고도화 (Sticky 및 배색 처리) */}
                <thead>
                    <tr className="bg-slate-900 text-white font-bold text-center">
                        <th className="p-2.5 border border-slate-800">구분</th>
                        <th className="p-2.5 border border-slate-800">교과군</th>
                        <th className="p-2.5 border border-slate-800">유형</th>
                        <th className="p-2.5 border border-slate-800 text-left pl-4">과목명</th>
                        <th className="p-2.5 border border-slate-800">기준</th>
                        <th className="p-2.5 border border-slate-800">운영</th>
                        <th className="p-2.5 border border-slate-800 bg-indigo-900/50">1-1</th>
                        <th className="p-2.5 border border-slate-800 bg-indigo-900/50">1-2</th>
                        <th className="p-2.5 border border-slate-800 bg-emerald-900/50">2-1</th>
                        <th className="p-2.5 border border-slate-800 bg-emerald-900/50">2-2</th>
                        <th className="p-2.5 border border-slate-800 bg-amber-900/50">3-1</th>
                        <th className="p-2.5 border border-slate-800 bg-amber-900/50">3-2</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                    {/* 1. 학교 지정 데이터 행 */}
                    {fixData.map((item, index) => (
                        <tr key={`fix-${index}`} className="hover:bg-slate-50/50 transition-colors">
                            {index === 0 && (
                                <td rowSpan={fixData.length} className="border border-slate-200 text-center font-black bg-slate-50 text-slate-800 px-2 py-3 tracking-tight">
                                    학교지정
                                </td>
                            )}
                            <td className={cellClass}>{item.SubjectGroup}</td>
                            <td className={cellClass}>{item.SubjectProperty}</td>
                            <td className={textLeftClass}>{item.SubjectName}</td>
                            <td className={cn(cellClass, "text-slate-400")}>{item.BasicCredit}</td>
                            <td className={cn(cellClass, "text-slate-900 font-bold")}>{item.Credit}</td>
                            {item.IsGroup === '' ? renderFixCredit(item) : renderFixChoiceCredit(item)}
                        </tr>
                    ))}

                    {/* 학교지정 소계 */}
                    <tr className="bg-indigo-50/40 text-slate-800 font-extrabold text-center">
                        <td colSpan={6} className="border border-slate-200 px-4 py-2.5 text-left text-indigo-900 font-black">
                            학교지정 소계 <span className="text-xs font-normal text-slate-500 ml-1">(합계: {allCredit_1}학점)</span>
                        </td>
                        <td className="border border-slate-200 p-2 text-indigo-700">{fixSta_1['1-1']}</td>
                        <td className="border border-slate-200 p-2 text-indigo-700">{fixSta_1['1-2']}</td>
                        <td className="border border-slate-200 p-2 text-indigo-700">{fixSta_1['2-1']}</td>
                        <td className="border border-slate-200 p-2 text-indigo-700">{fixSta_1['2-2']}</td>
                        <td className="border border-slate-200 p-2 text-indigo-700">{fixSta_1['3-1']}</td>
                        <td className="border border-slate-200 p-2 text-indigo-700">{fixSta_1['3-2']}</td>
                    </tr>

                    {/* 2. 선택과목 데이터 행들 (1학년) */}
                    {choiceData_1.map((item, idx, data) => (
                        (item.IsTable !== data[idx + 1]?.IsTable && idx > 0 && item.IsTable === data[idx - 1].IsTable) ? null :
                            <tr key={`choice1-${idx}`} className="hover:bg-slate-50/50 transition-colors">
                                {idx === 0 && <td rowSpan={choiceSpan_1.length} className="border border-slate-200 text-center font-black bg-amber-50/40 text-amber-900 px-2 py-3 leading-tight">선택과목<br /><span className="text-[10px] font-bold text-amber-600">(1학년)</span></td>}
                                <td className={cellClass}>{item.SubjectGroup}</td>
                                <td className={cellClass}>{item.SubjectProperty}</td>
                                <td className={textLeftClass}>{item.SubjectName}</td>
                                <td className={cn(cellClass, "text-slate-400")}>{item.BasicCredit}</td>
                                <td className={cn(cellClass, "text-slate-900 font-bold")}>{item.Credit}</td>
                                {renderChoiceCredit(item, idx, data)}
                            </tr>
                    ))}

                    {/* 3. 선택과목 데이터 행들 (2학년) */}
                    {choiceData_2.map((item, idx, data) => (
                        (item.IsTable !== data[idx + 1]?.IsTable && idx > 0 && item.IsTable === data[idx - 1].IsTable) ? null :
                            <tr key={`choice2-${idx}`} className="hover:bg-slate-50/50 transition-colors">
                                {idx === 0 && <td rowSpan={choiceSpan_2.length} className="border border-slate-200 text-center font-black bg-emerald-50/30 text-emerald-900 px-2 py-3 leading-tight">선택과목<br /><span className="text-[10px] font-bold text-emerald-600">(2학년)</span></td>}
                                <td className={cellClass}>{item.SubjectGroup}</td>
                                <td className={cellClass}>{item.SubjectProperty}</td>
                                <td className={textLeftClass}>{item.SubjectName}</td>
                                <td className={cn(cellClass, "text-slate-400")}>{item.BasicCredit}</td>
                                <td className={cn(cellClass, "text-slate-900 font-bold")}>{item.Credit}</td>
                                {renderChoiceCredit(item, idx, data)}
                            </tr>
                    ))}

                    {/* 4. 선택과목 데이터 행들 (3학년) */}
                    {choiceData_3.map((item, idx, data) => (
                        (item.IsTable !== data[idx + 1]?.IsTable && idx > 0 && item.IsTable === data[idx - 1].IsTable) ? null :
                            <tr key={`choice3-${idx}`} className="hover:bg-slate-50/50 transition-colors">
                                {idx === 0 && <td rowSpan={choiceSpan_3.length} className="border border-slate-200 text-center font-black bg-sky-50/40 text-sky-900 px-2 py-3 leading-tight">선택과목<br /><span className="text-[10px] font-bold text-sky-600">(3학년)</span></td>}
                                <td className={cellClass}>{item.SubjectGroup}</td>
                                <td className={cellClass}>{item.SubjectProperty}</td>
                                <td className={textLeftClass}>{item.SubjectName}</td>
                                <td className={cn(cellClass, "text-slate-400")}>{item.BasicCredit}</td>
                                <td className={cn(cellClass, "text-slate-900 font-bold")}>{item.Credit}</td>
                                {renderChoiceCredit(item, idx, data)}
                            </tr>
                    ))}

                    {/* 선택과목 소계 */}
                    <tr className="bg-emerald-50/30 text-slate-800 font-extrabold text-center">
                        <td colSpan={6} className="border border-slate-200 px-4 py-2.5 text-left text-emerald-900 font-black">
                            선택과목 소계 <span className="text-xs font-normal text-slate-500 ml-1">(합계: {allCreidt_2}학점)</span>
                        </td>
                        <td className="border border-slate-200 p-2 text-emerald-700">{choiceSta['1-1']}</td>
                        <td className="border border-slate-200 p-2 text-emerald-700">{choiceSta['1-2']}</td>
                        <td className="border border-slate-200 p-2 text-emerald-700">{choiceSta['2-1']}</td>
                        <td className="border border-slate-200 p-2 text-emerald-700">{choiceSta['2-2']}</td>
                        <td className="border border-slate-200 p-2 text-emerald-700">{choiceSta['3-1']}</td>
                        <td className="border border-slate-200 p-2 text-emerald-700">{choiceSta['3-2']}</td>
                    </tr>
                    {/* 선택과목 소계 */}
                    <tr className="bg-emerald-50/30 text-slate-800 font-extrabold text-center">
                        <td colSpan={6} className="border border-slate-200 px-4 py-2.5 text-left text-emerald-900 font-black">
                            교과학점 소계 <span className="text-xs font-normal text-slate-500 ml-1">(합계: {allCredit_1 + allCreidt_2}학점)</span>
                        </td>
                        <td className="border border-slate-200 p-2 text-red-700">{choiceSta['1-1'] + fixSta_1['1-1']}</td>
                        <td className="border border-slate-200 p-2 text-red-700">{choiceSta['1-2'] + fixSta_1['1-2']}</td>
                        <td className="border border-slate-200 p-2 text-red-700">{choiceSta['2-1'] + fixSta_1['2-1']}</td>
                        <td className="border border-slate-200 p-2 text-red-700">{choiceSta['2-2'] + fixSta_1['2-2']}</td>
                        <td className="border border-slate-200 p-2 text-red-700">{choiceSta['3-1'] + fixSta_1['3-1']}</td>
                        <td className="border border-slate-200 p-2 text-red-700">{choiceSta['3-2'] + fixSta_1['3-2']}</td>
                    </tr>

                    {/* 창체 활동 행 */}
                    <tr className="bg-slate-50/70 text-slate-700 font-bold text-center">
                        <td colSpan={6} className="border border-slate-200 px-4 py-2.5 text-left font-black text-slate-800">
                            창의적 체험활동
                        </td>
                        <td className="border border-slate-200 p-2">{CEAData['1-1']}</td>
                        <td className="border border-slate-200 p-2">{CEAData['1-2']}</td>
                        <td className="border border-slate-200 p-2">{CEAData['2-1']}</td>
                        <td className="border border-slate-200 p-2">{CEAData['2-2']}</td>
                        <td className="border border-slate-200 p-2">{CEAData['3-1']}</td>
                        <td className="border border-slate-200 p-2">{CEAData['3-2']}</td>
                    </tr>

                    {/* 전체 총계 가시성 극대화 극세사 마감 */}
                    <tr className="bg-slate-900 text-white font-black text-center text-xs shadow-inner">
                        <td colSpan={6} className="border border-slate-800 px-4 py-3 text-left tracking-wider uppercase bg-slate-950">
                            총 결성 이수 학점 (전체 합계: {allCredit_1 + allCreidt_2 + Object.values(CEAData).reduce((s, v) => s + v, 0)}학점)
                        </td>
                        <td className="border border-slate-800 bg-indigo-950 p-2.5 text-indigo-300 font-black">{fixSta_1['1-1'] + choiceSta['1-1'] + CEAData['1-1']}</td>
                        <td className="border border-slate-800 bg-indigo-950 p-2.5 text-indigo-300 font-black">{fixSta_1['1-2'] + choiceSta['1-2'] + CEAData['1-2']}</td>
                        <td className="border border-slate-800 bg-emerald-950 p-2.5 text-emerald-300 font-black">{fixSta_1['2-1'] + choiceSta['2-1'] + CEAData['2-1']}</td>
                        <td className="border border-slate-800 bg-emerald-950 p-2.5 text-emerald-300 font-black">{fixSta_1['2-2'] + choiceSta['2-2'] + CEAData['2-2']}</td>
                        <td className="border border-slate-800 bg-amber-950 p-2.5 text-amber-300 font-black">{fixSta_1['3-1'] + choiceSta['3-1'] + CEAData['3-1']}</td>
                        <td className="border border-slate-800 bg-amber-950 p-2.5 text-amber-300 font-black">{fixSta_1['3-2'] + choiceSta['3-2'] + CEAData['3-2']}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
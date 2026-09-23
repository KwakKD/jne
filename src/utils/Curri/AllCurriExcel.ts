import { SUBJECT } from "@/data/Curri/subject";
import { YEARS } from "@/data/data";
import { useCurriTableStore } from "@/store/CurriSubjectStore";
import type { JsonData } from "@/type/curri";
import ExcelJs, { type CellFormulaValue } from 'exceljs'
import { toast } from "sonner";

export async function exportAllCurriToExcel(schoolname: string) {
    const year = YEARS[2]
    const workbook = new ExcelJs.Workbook()
    const sheet = workbook.addWorksheet('worksheet');
    const user = useCurriTableStore.getState().userData

    const user1 = user[YEARS[2]]
    const user2 = user[YEARS[1]]
    const user3 = user[YEARS[0]]

    const union = [...SUBJECT, ...user1.AddSubject, ...user2.AddSubject, ...user3.AddSubject]
    const noGradeSubject = union
        .filter(item => (item.교과군 === '교양') ||
            (item.교과군 === '사회' && item.유형 === '융합' && item.Tag <= 155) ||
            (item.교과군 === '과학' && item.유형 === '융합' && item.Tag <= 155) ||
            (item.교과군 === '예술' && item.Tag <= 155) ||
            (item.교과군 === '체육' && item.Tag <= 155) ||
            ['과학탐구실험1', '과학탐구실험2'].includes(item.과목명))
        .map(item => item.Tag);

    const user1_fix = user1.학교지정.filter(item => item.Grade === 1)
    const user2_fix = user2.학교지정.filter(item => item.Grade === 2)
    const user3_fix = user3.학교지정.filter(item => item.Grade === 3)
    const fix = [...user1_fix, ...user2_fix, ...user3_fix]
    function setSort(newItem: JsonData[]) {
        interface groupedListType {
            type: string
            tag: number
            subject: number[]
        }
        const groupedList: groupedListType[] = [];
        const soloData: number[] = [];
        newItem.forEach((item) => {
            if (item.IsGroup === '' || item.IsGroup === null) soloData.push(item.Tag);
        });
        (Object.keys(user1.Group) as Array<keyof typeof user1.Group>).forEach((key) => {
            if (user1.Group[key].Zone === '지정') {
                if (user1.Group[key].Grouptag) {
                    groupedList.push({ type: key, tag: user1.Group[key].Grouptag, subject: user1.Group[key].Subject })
                }
            }
        });
        (Object.keys(user2.Group) as Array<keyof typeof user2.Group>).forEach((key) => {
            if (user2.Group[key].Zone === '지정') {
                if (user2.Group[key].Grouptag) {
                    groupedList.push({ type: key, tag: user2.Group[key].Grouptag, subject: user2.Group[key].Subject })
                }
            }
        });
        (Object.keys(user3.Group) as Array<keyof typeof user3.Group>).forEach((key) => {
            if (user3.Group[key].Zone === '지정') {
                if (user3.Group[key].Grouptag) {
                    groupedList.push({ type: key, tag: user3.Group[key].Grouptag, subject: user3.Group[key].Subject })
                }
            }
        })

        const combine = [...soloData.map(item => ({ type: '', tag: item, subject: Array(item) })), ...groupedList];
        combine.sort((a, b) => a.tag - b.tag)

        const result = new Map()

        for (const item of combine) {
            if (item.type === '') {
                result.set(item.tag, item.type)
            } else {
                item.subject.forEach(data => result.set(data, item.type))
            }
        }

        const newData: JsonData[] = []
        let index = 1;

        for (const [data, group] of result) {
            const arritem = newItem.filter(searchtag => searchtag.Tag === data)[0]
            newData.push(
                {
                    Section: '지정',
                    IsGroup: group,
                    SubjectGroup: arritem.SubjectGroup,
                    SubjectProperty: arritem.SubjectProperty,
                    SubjectName: arritem.SubjectName,
                    BasicCredit: arritem.BasicCredit,
                    Tag: data,
                    Grade: arritem.Grade,
                    Semester: arritem.Semester,
                    Credit: arritem.Credit,
                    IsTable: index
                }
            )
            index++
        }
        return newData
    }
    const user_fix = setSort(fix)

    const user1_choice = user1.선택과목.filter(item => item.Grade === 1)
    const user2_choice = user2.선택과목.filter(item => item.Grade === 2)
    const user3_choice = user3.선택과목.filter(item => item.Grade === 3)

    const alignCenter: Partial<ExcelJs.Alignment> = {
        horizontal: 'center',
        vertical: 'middle',
    };

    const alignRight: Partial<ExcelJs.Alignment> = {
        horizontal: 'right',
        vertical: 'middle'
    }

    const baseBorder: Partial<ExcelJs.Borders> = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
    };


    function excelStatistics_1(year: string): Record<string, number> {
        const cache: Record<string, number> = {};
        const { 학교지정: data, Group: group } = useCurriTableStore.getState().userData[year];
        if (!data || !group) return cache

        for (let grade = 1; grade <= 3; grade++) {
            for (let sem = 1; sem <= 2; sem++) {
                let fixNoGroup = 0;
                let fixIsGroup = 0;

                Object.keys(group).forEach((key) => {
                    const g = group[key];
                    if (g.Zone === '지정' && g.Grade === grade) {
                        fixIsGroup += g.Credit ?? 0;
                    }
                });

                fixNoGroup = data
                    .filter(
                        (item) =>
                            item.Grade === grade &&
                            item.Semester === sem &&
                            item.IsGroup === ''
                    )
                    .reduce((sum, item) => sum + Number(item.Credit), 0)

                cache[`${grade}-${sem}`] = fixIsGroup + fixNoGroup;
            }

        }
        return cache
    }

    function excelStatistics_3(year: string): Record<string, number> {
        const cache: Record<string, number> = {};
        const { 선택과목: data, Group: group } = useCurriTableStore.getState().userData[year];
        if (!data || !group) return cache
        for (let grade = 1; grade <= 3; grade++) {
            for (let sem = 1; sem <= 2; sem++) {
                let choiceCredit = 0;
                Object.keys(group).forEach((key) => {
                    const g = group[key]
                    if (g.Zone === '선택' && g.Grade === grade && g.Semester === sem) {
                        const sumCredit = (g.Credit ?? 0) * (g.Choice ?? 0)
                        choiceCredit += sumCredit;
                    }
                });
                cache[`${grade}-${sem}`] = choiceCredit;
            }
        }
        return cache
    }

    function excelSubjectNumber(year: string): Record<string, string | number> {
        const cache: Record<string, string | number> = {};
        const { 학교지정: data, Group: group } = useCurriTableStore.getState().userData[year];

        for (let grade = 1; grade <= 3; grade++) {
            for (let sem = 1; sem <= 3; sem++) {
                let subjectnumber: string | number = 0
                let subjectIn = 0;
                let subjectOut = 0
                subjectIn = data.filter(item => item.Grade === grade && item.Semester === sem && item.IsGroup === '' && !noGradeSubject.includes(item.Tag)).length;
                subjectOut = data.filter(item => item.Grade === grade && item.Semester === sem && item.IsGroup === '' && noGradeSubject.includes(item.Tag)).length;

                Object.keys(group).forEach(key => {
                    if (group[key].Zone === '지정' && group[key].Grade === grade) {
                        const queryData = group[key].Subject.filter(tag => !noGradeSubject.includes(tag)).length
                        if (queryData === 0) {
                            subjectOut = subjectOut + 1
                        } else {
                            subjectIn = subjectIn + 1
                        }
                    } else if (group[key].Zone === '선택' && group[key].Grade === grade && group[key].Semester === sem) {
                        const queryData = group[key].Subject.filter(tag => !noGradeSubject.includes(tag)).length
                        if (queryData === 0) {
                            subjectOut = subjectOut + Number(group[key].Choice)
                        } else if (queryData >= Number(group[key].Choice)) {
                            subjectIn = subjectIn + Number(group[key].Choice)
                        } else if (queryData < Number(group[key].Choice)) {
                            subjectIn = subjectIn + queryData
                            subjectOut = Number(group[key].Choice) - queryData
                        }
                    }
                })
                if (subjectOut === 0) {
                    subjectnumber = subjectIn
                } else {
                    subjectnumber = subjectIn + ' (' + subjectOut + ')'
                }
                cache[`${grade}-${sem}`] = subjectnumber
            }
        }
        return cache
    }

    const statistics_1_1 = excelStatistics_1(YEARS[2])
    const statistics_1_2 = excelStatistics_1(YEARS[1])
    const statistics_1_3 = excelStatistics_1(YEARS[0])
    const statistics_3_1 = excelStatistics_3(YEARS[2])
    const statistics_3_2 = excelStatistics_3(YEARS[1])
    const statistics_3_3 = excelStatistics_3(YEARS[0])
    const statistics_subjectNumber_1 = excelSubjectNumber(YEARS[2])
    const statistics_subjectNumber_2 = excelSubjectNumber(YEARS[1])
    const statistics_subjectNumber_3 = excelSubjectNumber(YEARS[0])

    sheet.mergeCells('A1:N1')
    const excelTitle = sheet.getCell('A1');
    excelTitle.value = `${year}학년도 전학년 교육과정 편성표`
    excelTitle.alignment = alignCenter
    excelTitle.font = { bold: true, size: 16 }
    const headersTop = {
        A3: '구분',
        B3: '교과군',
        C3: '유형',
        D3: '세부과목',
        E3: '기준학점',
        F3: '운영학점',
        G3: '1학년',
        I3: '2학년',
        K3: '3학년',
        M3: '총 이수학점',
        N3: '필수 이수학점',
    };

    Object.entries(headersTop).forEach(([cell, value]) => {
        sheet.getCell(cell).value = value;
    });

    // 2단 헤더
    const headersBottom = {
        G4: '1학기',
        H4: '2학기',
        I4: '1학기',
        J4: '2학기',
        K4: '1학기',
        L4: '2학기',
    };

    Object.entries(headersBottom).forEach(([cell, value]) => {
        sheet.getCell(cell).value = value;
    });

    // 병합
    const merges = [
        'A3:A4', 'B3:B4', 'C3:C4', 'D3:D4', 'E3:E4', 'F3:F4',
        'M3:M4', 'N3:N4',
        'G3:H3', 'I3:J3', 'K3:L3', 'M2:N2'
    ];
    merges.forEach(range => sheet.mergeCells(range));

    const excelSchoolName = sheet.getCell('M2');
    excelSchoolName.value = schoolname
    excelSchoolName.alignment = alignRight

    // 🧱 헤더 스타일 통일
    for (let r = 3; r <= 4; r++) {
        const row = sheet.getRow(r);
        row.eachCell((cell) => {
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
            cell.font = { size: 10 };
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFf2f2f2' },
            };
            cell.border = baseBorder;
        });
    }


    // 📏 열 너비 설정 (가독성)
    const colWidths = [8, 14, 6, 24, 8, 8, 8, 8, 8, 8, 8, 8, 12, 12];
    colWidths.forEach((w, i) => (sheet.getColumn(i + 1).width = w));
    // 학교지정 입력하기
    if (user_fix.length !== 0) {
        const startRow = 5
        if (user_fix.length === 1) {
            sheet.getCell(5, 1).value = '학교지정'
        } else {
            sheet.mergeCells(5, 1, user_fix.length + 4, 1)
            sheet.getCell(5, 1).value = '학교지정'
        }
        sheet.getCell(5, 1).alignment = alignCenter
        for (let i = 0; i <= user_fix.length - 1; i++) {
            const row = startRow + i
            sheet.getCell(row, 1).value = user_fix[i].Section
            sheet.getCell(row, 2).value = user_fix[i].SubjectGroup
            sheet.getCell(row, 3).value = user_fix[i].SubjectProperty
            sheet.getCell(row, 4).value = user_fix[i].SubjectName
            sheet.getCell(row, 5).value = user_fix[i].BasicCredit
            sheet.getCell(row, 6).value = user_fix[i].Credit
            if (user_fix[i].IsGroup === '') {
                if (user_fix[i].Grade === 1) {
                    if (user_fix[i].Semester === 1) {
                        sheet.getCell(row, 7).value = user_fix[i].Credit
                    } else {
                        sheet.getCell(row, 8).value = user_fix[i].Credit
                    }
                } else if (user_fix[i].Grade === 2) {
                    if (user_fix[i].Semester === 1) {
                        sheet.getCell(row, 9).value = user_fix[i].Credit
                    } else {
                        sheet.getCell(row, 10).value = user_fix[i].Credit
                    }
                } else {
                    if (user_fix[i].Semester === 1) {
                        sheet.getCell(row, 11).value = user_fix[i].Credit
                    } else {
                        sheet.getCell(row, 12).value = user_fix[i].Credit
                    }
                }
            } else {
                const groupGrade = user_fix[i].Grade
                const groupname = user_fix[i].IsGroup
                const groupinfo = (groupGrade === 1 ? user[YEARS[2]].Group : (groupGrade === 2 ? user[YEARS[1]].Group : user[YEARS[0]].Group))
                const inGroupSubject = groupinfo[groupname].Subject;
                const inGroupGrade = groupinfo[groupname].Grade;
                const inGroupChoice = groupinfo[groupname].Choice;
                const inGroupCredit = groupinfo[groupname].Credit;
                if (user_fix[i].Tag === inGroupSubject[0]) {
                    if (inGroupGrade === 1) {
                        if (inGroupSubject.length > 1) {
                            sheet.mergeCells(row, 7, row + 1, 7);
                            const cell7 = sheet.getCell(row, 7);
                            cell7.value = { formula: `="[택${inGroupChoice}]" & CHAR(10) & "${inGroupCredit}"` } as CellFormulaValue;;
                            cell7.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };

                            sheet.mergeCells(row, 8, row + 1, 8);
                            const cell8 = sheet.getCell(row, 8);
                            cell8.value = {
                                richText: [
                                    { text: `[택${inGroupChoice}]` },
                                    { text: '\n' },
                                    { text: `${inGroupCredit}` },
                                ],
                            };
                            cell8.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                        } else { //과목이 1개만 있는 경우는 병합을 하지 않음.
                            const cell7 = sheet.getCell(row, 7);
                            cell7.value = { formula: `="[택${inGroupChoice}]" & CHAR(10) & "${inGroupCredit}"` } as CellFormulaValue;;
                            cell7.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };

                            const cell8 = sheet.getCell(row, 8);
                            cell8.value = {
                                richText: [
                                    { text: `[택${inGroupChoice}]` },
                                    { text: '\n' },
                                    { text: `${inGroupCredit}` },
                                ],
                            };
                            cell8.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                        }
                    } else if (inGroupGrade === 2) {
                        if (inGroupSubject.length > 1) {
                            sheet.mergeCells(row, 9, row + 1, 9);
                            const cell9 = sheet.getCell(row, 9);
                            cell9.value = { formula: `="[택${inGroupChoice}]" & CHAR(10) & "${inGroupCredit}"` } as CellFormulaValue;;
                            cell9.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };

                            sheet.mergeCells(row, 10, row + 1, 10);
                            const cell10 = sheet.getCell(row, 10);
                            cell10.value = {
                                richText: [
                                    { text: `[택${inGroupChoice}]` },
                                    { text: '\n' },
                                    { text: `${inGroupCredit}` },
                                ],
                            };
                            cell10.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                        } else {
                            const cell9 = sheet.getCell(row, 9);
                            cell9.value = { formula: `="[택${inGroupChoice}]" & CHAR(10) & "${inGroupCredit}"` } as CellFormulaValue;;
                            cell9.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };

                            const cell10 = sheet.getCell(row, 10);
                            cell10.value = {
                                richText: [
                                    { text: `[택${inGroupChoice}]` },
                                    { text: '\n' },
                                    { text: `${inGroupCredit}` },
                                ],
                            };
                        }
                    } else {
                        if (inGroupSubject.length > 1) {
                            sheet.mergeCells(row, 11, row + 1, 11);
                            const cell11 = sheet.getCell(row, 11);
                            cell11.value = { formula: `="[택${inGroupChoice}]" & CHAR(10) & "${inGroupCredit}"` } as CellFormulaValue;;
                            cell11.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };

                            sheet.mergeCells(row, 12, row + 1, 12);
                            const cell12 = sheet.getCell(row, 12);
                            cell12.value = {
                                richText: [
                                    { text: `[택${inGroupChoice}]` },
                                    { text: '\n' },
                                    { text: `${inGroupCredit}` },
                                ],
                            };
                        } else {
                            const cell11 = sheet.getCell(row, 11);
                            cell11.value = { formula: `="[택${inGroupChoice}]" & CHAR(10) & "${inGroupCredit}"` } as CellFormulaValue;;
                            cell11.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };

                            const cell12 = sheet.getCell(row, 12);
                            cell12.value = {
                                richText: [
                                    { text: `[택${inGroupChoice}]` },
                                    { text: '\n' },
                                    { text: `${inGroupCredit}` },
                                ],
                            };
                        }
                    }
                }
            }
        }

        for (let r = startRow; r <= user_fix.length + 4; r++) {
            const row = sheet.getRow(r)
            row.eachCell({ includeEmpty: true }, (cell) => {
                cell.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                cell.font = { size: 10 };
                cell.border = baseBorder;
            })
        }

        sheet.mergeCells(user_fix.length + 5, 1, user_fix.length + 5, 4)
        const statistics1 = sheet.getCell(user_fix.length + 5, 1)
        statistics1.value = '학교지정 소계'
        statistics1.alignment = alignCenter
        statistics1.border = baseBorder
        statistics1.font = { size: 10 }
        statistics1.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFf2f2f2' },
        }

        for (let j = 7; j <= 13; j++) {
            const cell = sheet.getCell(user_fix.length + 5, j)
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFf2f2f2' },
            }
        }
        sheet.getCell(user_fix.length + 5, 7).value = statistics_1_1['1-1']
        sheet.getCell(user_fix.length + 5, 8).value = statistics_1_1['1-2']
        sheet.getCell(user_fix.length + 5, 9).value = statistics_1_2['2-1']
        sheet.getCell(user_fix.length + 5, 10).value = statistics_1_2['2-2']
        sheet.getCell(user_fix.length + 5, 11).value = statistics_1_3['3-1']
        sheet.getCell(user_fix.length + 5, 12).value = statistics_1_3['3-2']
        sheet.getCell(user_fix.length + 5, 13).value = statistics_1_1['1-1'] + statistics_1_1['1-2'] + statistics_1_2['2-1'] + statistics_1_2['2-2'] + statistics_1_3['3-1'] + statistics_1_3['3-2']
    }

    sheet.mergeCells(5, 13, user_fix.length + 4, 13)
    sheet.mergeCells(5, 14, user_fix.length + 4, 14)

    //학교지정 통계 입력하기


    // 선택과목 입력하기

    let choiceColumn1 = user_fix.length + 6

    const table2_Grade1 = [...new Set(user1_choice.map(sub => sub.SubjectName))]
    const table2_Grade2 = [...new Set(user2_choice.map(sub => sub.SubjectName))]
    const table2_Grade3 = [...new Set(user3_choice.map(sub => sub.SubjectName))]

    const choiceStartRow_1 = user_fix.length + 6
    const choiceStartRow_2 = choiceStartRow_1 + table2_Grade1.length
    const choiceStartRow_3 = choiceStartRow_2 + table2_Grade2.length

    if (table2_Grade1.length !== 0) {
        if (table2_Grade1.length === 1) {
            const choiceGrade1 = sheet.getCell(choiceColumn1, 1)
            choiceGrade1.value = {
                richText: [
                    { text: '학생선택' },
                    { text: '\n' },
                    { text: '(1학년)' },
                ],
            };
            choiceGrade1.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
            choiceGrade1.font = { size: 10 }
            choiceGrade1.border = baseBorder
        } else {
            sheet.mergeCells(choiceColumn1, 1, choiceColumn1 + table2_Grade1.length - 1, 1)
            const choiceGrade1 = sheet.getCell(choiceColumn1, 1)
            choiceGrade1.value = {
                richText: [
                    { text: '학생선택' },
                    { text: '\n' },
                    { text: '(1학년)' },
                ],
            };
            choiceGrade1.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
            choiceGrade1.font = { size: 10 }
            choiceGrade1.border = baseBorder
        }
        choiceColumn1 = choiceColumn1 + table2_Grade1.length
    }
    if (table2_Grade2.length !== 0) {
        if (table2_Grade2.length === 1) {
            const choiceGrade2 = sheet.getCell(choiceColumn1, 1)
            choiceGrade2.value = {
                richText: [
                    { text: '학생선택' },
                    { text: '\n' },
                    { text: '(2학년)' },
                ],
            };
            choiceGrade2.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
            choiceGrade2.font = { size: 10 }
            choiceGrade2.border = baseBorder
        } else {
            sheet.mergeCells(choiceColumn1, 1, choiceColumn1 + table2_Grade2.length - 1, 1)
            const choiceGrade2 = sheet.getCell(choiceColumn1, 1)
            choiceGrade2.value = {
                richText: [
                    { text: '학생선택' },
                    { text: '\n' },
                    { text: '(2학년)' },
                ],
            };
            choiceGrade2.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
            choiceGrade2.font = { size: 10 }
            choiceGrade2.border = baseBorder
        }
        choiceColumn1 = choiceColumn1 + table2_Grade2.length
    }
    if (table2_Grade3.length !== 0) {
        if (table2_Grade3.length === 1) {
            const choiceGrade3 = sheet.getCell(choiceColumn1, 1)
            choiceGrade3.value = {
                richText: [
                    { text: '학생선택' },
                    { text: '\n' },
                    { text: '(3학년)' },
                ],
            };
            choiceGrade3.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
            choiceGrade3.font = { size: 10 }
            choiceGrade3.border = baseBorder
        } else {
            sheet.mergeCells(choiceColumn1, 1, choiceColumn1 + table2_Grade3.length - 1, 1)
            const choiceGrade3 = sheet.getCell(choiceColumn1, 1)
            choiceGrade3.value = {
                richText: [
                    { text: '학생선택' },
                    { text: '\n' },
                    { text: '(3학년)' },
                ],
            };
            choiceGrade3.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
            choiceGrade3.font = { size: 10 }
            choiceGrade3.border = baseBorder
        }
        choiceColumn1 = choiceColumn1 + table2_Grade1.length
    }
    let rowIndex_1 = 0
    user1_choice.forEach((item, idx, data) => {
        if (item.IsTable !== data[idx + 1]?.IsTable && idx > 0 && item.IsTable === data[idx - 1].IsTable) {
            idx++
        } else {
            const groupinfo = user[YEARS[2]].Group
            const groupKey = item.IsGroup
            const spanNumber = groupinfo[groupKey].Subject.length;
            const spanSubject = data.filter(sub => sub.IsGroup === groupKey)
            const rowNumber = data.length;
            sheet.getCell(choiceStartRow_1 + rowIndex_1, 2).value = user1_choice[idx].SubjectGroup
            sheet.getCell(choiceStartRow_1 + rowIndex_1, 3).value = user1_choice[idx].SubjectProperty
            sheet.getCell(choiceStartRow_1 + rowIndex_1, 4).value = user1_choice[idx].SubjectName
            sheet.getCell(choiceStartRow_1 + rowIndex_1, 5).value = user1_choice[idx].BasicCredit
            sheet.getCell(choiceStartRow_1 + rowIndex_1, 6).value = user1_choice[idx].Credit
            if (idx !== rowNumber - 1) {
                if (item.IsTable !== data[idx + 1].IsTable) {
                    if (item.Tag === spanSubject[0].Tag) {
                        const insertText = `[택${groupinfo[groupKey].Choice}]\n${(groupinfo[groupKey].Choice ?? 0) * (groupinfo[groupKey].Credit ?? 0)}`
                        if (item.Semester === 1) {
                            sheet.mergeCells(choiceStartRow_1 + rowIndex_1, 7, choiceStartRow_1 + rowIndex_1 + spanNumber - 1, 7)
                            const cell7 = sheet.getCell(choiceStartRow_1 + rowIndex_1, 7)
                            cell7.value = insertText;
                            cell7.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                            cell7.font = { size: 10 }
                            cell7.border = baseBorder
                        } else {
                            sheet.mergeCells(choiceStartRow_1 + rowIndex_1, 8, choiceStartRow_1 + rowIndex_1 + spanNumber - 1, 8)
                            const cell8 = sheet.getCell(choiceStartRow_1 + rowIndex_1, 8)
                            cell8.value = insertText;
                            cell8.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                            cell8.font = { size: 10 }
                            cell8.border = baseBorder
                        }
                    }
                } else if (item.IsTable === data[idx + 1].IsTable) {
                    const spanNumber_1 = groupinfo[data[idx + 1].IsGroup].Subject.length
                    const spanSubject_1 = data.filter(sub => sub.IsGroup === data[idx + 1].IsGroup)
                    if (item.Tag === spanSubject[0].Tag && data[idx + 1].Tag === spanSubject_1[0].Tag) {
                        const insertText_1 = `[택${groupinfo[item.IsGroup].Choice}]\n${(groupinfo[item.IsGroup].Choice ?? 0) * (groupinfo[item.IsGroup].Credit ?? 0)}`
                        const insertText_2 = `[택${groupinfo[data[idx + 1].IsGroup].Choice}]\n${(groupinfo[data[idx + 1].IsGroup].Choice ?? 0) * (groupinfo[data[idx + 1].IsGroup].Credit ?? 0)}`
                        sheet.mergeCells(choiceStartRow_1 + rowIndex_1, 7, choiceStartRow_1 + rowIndex_1 + spanNumber - 1, 7)
                        const cell7 = sheet.getCell(choiceStartRow_1 + rowIndex_1, 7)
                        cell7.value = insertText_1;
                        cell7.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                        cell7.font = { size: 10 }
                        cell7.border = baseBorder
                        sheet.mergeCells(choiceStartRow_1 + rowIndex_1, 8, choiceStartRow_1 + rowIndex_1 + spanNumber_1 - 1, 8)
                        const cell8 = sheet.getCell(choiceStartRow_1 + rowIndex_1, 8)
                        cell8.value = insertText_2;
                        cell8.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                        cell8.font = { size: 10 }
                        cell8.border = baseBorder
                    } else if (item.Tag !== spanSubject[0].Tag && data[idx + 1].Tag === spanSubject_1[0].Tag) {
                        const insertText_2 = `[택${groupinfo[data[idx + 1].IsGroup].Choice}]\n${(groupinfo[data[idx + 1].IsGroup].Choice ?? 0) * (groupinfo[data[idx + 1].IsGroup].Credit ?? 0)}`
                        sheet.mergeCells(choiceStartRow_1 + rowIndex_1, 8, choiceStartRow_1 + rowIndex_1 + spanNumber_1 - 1, 8)
                        const cell8 = sheet.getCell(choiceStartRow_1 + rowIndex_1, 8)
                        cell8.value = insertText_2;
                        cell8.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                        cell8.font = { size: 10 }
                        cell8.border = baseBorder
                    } else if (item.Tag === spanSubject[0].Tag && data[idx + 1].Tag !== spanSubject_1[0].Tag) {
                        const insertText_2 = `[택${groupinfo[item.IsGroup].Choice}]\n${(groupinfo[item.IsGroup].Choice ?? 0) * (groupinfo[item.IsGroup].Credit ?? 0)}`

                        sheet.mergeCells(choiceStartRow_1 + rowIndex_1, 7, choiceStartRow_1 + rowIndex_1 + spanNumber - 1, 7)
                        const cell8 = sheet.getCell(choiceStartRow_1 + rowIndex_1, 7)
                        cell8.value = insertText_2;
                        cell8.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                        cell8.font = { size: 10 }
                        cell8.border = baseBorder
                    }
                }
            } else if (idx === 0) {
                const insertText = `[택${groupinfo[item.IsGroup].Choice}]\n${(groupinfo[item.IsGroup].Choice ?? 0) * (groupinfo[item.IsGroup].Credit ?? 0)}`
                if (item.Semester === 1) {
                    const cell7 = sheet.getCell(choiceStartRow_1 + rowIndex_1, 7)
                    cell7.value = insertText;
                    cell7.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                    cell7.font = { size: 10 }
                    cell7.border = baseBorder
                } else {
                    const cell8 = sheet.getCell(choiceStartRow_1 + rowIndex_1, 8)
                    cell8.value = insertText;
                    cell8.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                    cell8.font = { size: 10 }
                    cell8.border = baseBorder
                }
            } else {
                if (data[idx - 1].IsTable !== item.IsTable) {
                    if (data[idx - 1].IsGroup !== item.IsGroup) {
                        const insertText = `[택${groupinfo[item.IsGroup].Choice}]\n${(groupinfo[item.IsGroup].Choice ?? 0) * (groupinfo[item.IsGroup].Credit ?? 0)}`
                        if (item.Semester === 1) {
                            const cell7 = sheet.getCell(choiceStartRow_1 + rowIndex_1, 7)
                            cell7.value = insertText;
                            cell7.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                            cell7.font = { size: 10 }
                            cell7.border = baseBorder
                        } else {
                            const cell8 = sheet.getCell(choiceStartRow_1 + rowIndex_1, 8)
                            cell8.value = insertText;
                            cell8.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                            cell8.font = { size: 10 }
                            cell8.border = baseBorder
                        }
                    }
                }
            }
            rowIndex_1++
        }
    })
    let rowIndex_2 = 0
    user2_choice.forEach((item, idx, data) => {
        if (item.IsTable !== data[idx + 1]?.IsTable && idx > 0 && item.IsTable === data[idx - 1].IsTable) {
            idx++
        } else {
            const groupinfo = user[YEARS[1]].Group
            const groupKey = item.IsGroup
            const spanNumber = groupinfo[groupKey].Subject.length;
            const spanSubject = data.filter(sub => sub.IsGroup === groupKey)
            const rowNumber = data.length;
            sheet.getCell(choiceStartRow_2 + rowIndex_2, 2).value = user2_choice[idx].SubjectGroup
            sheet.getCell(choiceStartRow_2 + rowIndex_2, 3).value = user2_choice[idx].SubjectProperty
            sheet.getCell(choiceStartRow_2 + rowIndex_2, 4).value = user2_choice[idx].SubjectName
            sheet.getCell(choiceStartRow_2 + rowIndex_2, 5).value = user2_choice[idx].BasicCredit
            sheet.getCell(choiceStartRow_2 + rowIndex_2, 6).value = user2_choice[idx].Credit
            if (idx !== rowNumber - 1) {
                if (item.IsTable !== data[idx + 1].IsTable) {
                    if (item.Tag === spanSubject[0].Tag) {
                        const insertText = `[택${groupinfo[groupKey].Choice}]\n${(groupinfo[groupKey].Choice ?? 0) * (groupinfo[groupKey].Credit ?? 0)}`
                        if (item.Semester === 1) {
                            sheet.mergeCells(choiceStartRow_2 + rowIndex_2, 9, choiceStartRow_2 + rowIndex_2 + spanNumber - 1, 9)
                            const cell9 = sheet.getCell(choiceStartRow_2 + rowIndex_2, 9)
                            cell9.value = insertText;
                            cell9.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                            cell9.font = { size: 10 }
                            cell9.border = baseBorder
                        } else {
                            sheet.mergeCells(choiceStartRow_2 + rowIndex_2, 10, choiceStartRow_2 + rowIndex_2 + spanNumber - 1, 10)
                            const cell10 = sheet.getCell(choiceStartRow_2 + rowIndex_2, 10)
                            cell10.value = insertText;
                            cell10.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                            cell10.font = { size: 10 }
                            cell10.border = baseBorder
                        }
                    }
                } else if (item.IsTable === data[idx + 1].IsTable) {
                    const spanNumber_1 = groupinfo[data[idx + 1].IsGroup].Subject.length
                    const spanSubject_1 = data.filter(sub => sub.IsGroup === data[idx + 1].IsGroup)
                    if (item.Tag === spanSubject[0].Tag && data[idx + 1].Tag === spanSubject_1[0].Tag) {
                        const insertText_1 = `[택${groupinfo[item.IsGroup].Choice}]\n${(groupinfo[item.IsGroup].Choice ?? 0) * (groupinfo[item.IsGroup].Credit ?? 0)}`
                        const insertText_2 = `[택${groupinfo[data[idx + 1].IsGroup].Choice}]\n${(groupinfo[data[idx + 1].IsGroup].Choice ?? 0) * (groupinfo[data[idx + 1].IsGroup].Credit ?? 0)}`
                        sheet.mergeCells(choiceStartRow_2 + rowIndex_2, 9, choiceStartRow_2 + rowIndex_2 + spanNumber - 1, 9)
                        const cell9 = sheet.getCell(choiceStartRow_2 + rowIndex_2, 9)
                        cell9.value = insertText_1;
                        cell9.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                        cell9.font = { size: 10 }
                        cell9.border = baseBorder
                        sheet.mergeCells(choiceStartRow_2 + rowIndex_2, 10, choiceStartRow_2 + rowIndex_2 + spanNumber_1 - 1, 10)
                        const cell10 = sheet.getCell(choiceStartRow_2 + rowIndex_2, 10)
                        cell10.value = insertText_2;
                        cell10.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                        cell10.font = { size: 10 }
                        cell10.border = baseBorder
                    } else if (item.Tag !== spanSubject[0].Tag && data[idx + 1].Tag === spanSubject_1[0].Tag) {
                        const insertText_2 = `[택${groupinfo[data[idx + 1].IsGroup].Choice}]\n${(groupinfo[data[idx + 1].IsGroup].Choice ?? 0) * (groupinfo[data[idx + 1].IsGroup].Credit ?? 0)}`
                        sheet.mergeCells(choiceStartRow_2 + rowIndex_2, 10, choiceStartRow_2 + rowIndex_2 + spanNumber_1 - 1, 10)
                        const cell10 = sheet.getCell(choiceStartRow_2 + rowIndex_2, 10)
                        cell10.value = insertText_2;
                        cell10.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                        cell10.font = { size: 10 }
                        cell10.border = baseBorder
                    } else if (item.Tag === spanSubject[0].Tag && data[idx + 1].Tag !== spanSubject_1[0].Tag) {
                        const insertText_2 = `[택${groupinfo[item.IsGroup].Choice}]\n${(groupinfo[item.IsGroup].Choice ?? 0) * (groupinfo[item.IsGroup].Credit ?? 0)}`

                        sheet.mergeCells(choiceStartRow_2 + rowIndex_2, 9, choiceStartRow_2 + rowIndex_2 + spanNumber - 1, 9)
                        const cell9 = sheet.getCell(choiceStartRow_2 + rowIndex_2, 9)
                        cell9.value = insertText_2;
                        cell9.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                        cell9.font = { size: 10 }
                        cell9.border = baseBorder
                    }
                }
            } else if (idx === 0) {
                const insertText = `[택${groupinfo[item.IsGroup].Choice}]\n${(groupinfo[item.IsGroup].Choice ?? 0) * (groupinfo[item.IsGroup].Credit ?? 0)}`
                if (item.Semester === 1) {
                    const cell9 = sheet.getCell(choiceStartRow_2 + rowIndex_2, 9)
                    cell9.value = insertText;
                    cell9.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                    cell9.font = { size: 10 }
                    cell9.border = baseBorder
                } else {
                    const cell10 = sheet.getCell(choiceStartRow_2 + rowIndex_2, 10)
                    cell10.value = insertText;
                    cell10.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                    cell10.font = { size: 10 }
                    cell10.border = baseBorder
                }
            } else {
                if (data[idx - 1].IsTable !== item.IsTable) {
                    if (data[idx - 1].IsGroup !== item.IsGroup) {
                        const insertText = `[택${groupinfo[item.IsGroup].Choice}]\n${(groupinfo[item.IsGroup].Choice ?? 0) * (groupinfo[item.IsGroup].Credit ?? 0)}`
                        if (item.Semester === 1) {
                            const cell9 = sheet.getCell(choiceStartRow_2 + rowIndex_2, 9)
                            cell9.value = insertText;
                            cell9.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                            cell9.font = { size: 10 }
                            cell9.border = baseBorder
                        } else {
                            const cell10 = sheet.getCell(choiceStartRow_2 + rowIndex_2, 10)
                            cell10.value = insertText;
                            cell10.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                            cell10.font = { size: 10 }
                            cell10.border = baseBorder
                        }
                    }
                }
            }
            rowIndex_2++
        }
    })
    let rowIndex_3 = 0
    user3_choice.forEach((item, idx, data) => {
        if (item.IsTable !== data[idx + 1]?.IsTable && idx > 0 && item.IsTable === data[idx - 1].IsTable) {
            idx++
        } else {
            const groupinfo = user[YEARS[0]].Group
            const groupKey = item.IsGroup
            const spanNumber = groupinfo[groupKey].Subject.length;
            const spanSubject = data.filter(sub => sub.IsGroup === groupKey)
            const rowNumber = data.length;
            sheet.getCell(choiceStartRow_3 + rowIndex_3, 2).value = user3_choice[idx].SubjectGroup
            sheet.getCell(choiceStartRow_3 + rowIndex_3, 3).value = user3_choice[idx].SubjectProperty
            sheet.getCell(choiceStartRow_3 + rowIndex_3, 4).value = user3_choice[idx].SubjectName
            sheet.getCell(choiceStartRow_3 + rowIndex_3, 5).value = user3_choice[idx].BasicCredit
            sheet.getCell(choiceStartRow_3 + rowIndex_3, 6).value = user3_choice[idx].Credit
            if (idx !== rowNumber - 1) {
                if (item.IsTable !== data[idx + 1].IsTable) {
                    if (item.Tag === spanSubject[0].Tag) {
                        const insertText = `[택${groupinfo[groupKey].Choice}]\n${(groupinfo[groupKey].Choice ?? 0) * (groupinfo[groupKey].Credit ?? 0)}`
                        if (item.Semester === 1) {
                            sheet.mergeCells(choiceStartRow_3 + rowIndex_3, 11, choiceStartRow_3 + rowIndex_3 + spanNumber - 1, 11)
                            const cell11 = sheet.getCell(choiceStartRow_3 + rowIndex_3, 11)
                            cell11.value = insertText;
                            cell11.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                            cell11.font = { size: 10 }
                            cell11.border = baseBorder
                        } else {
                            sheet.mergeCells(choiceStartRow_3 + rowIndex_3, 12, choiceStartRow_3 + rowIndex_3 + spanNumber - 1, 12)
                            const cell12 = sheet.getCell(choiceStartRow_3 + rowIndex_3, 12)
                            cell12.value = insertText;
                            cell12.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                            cell12.font = { size: 10 }
                            cell12.border = baseBorder
                        }
                    }
                } else if (item.IsTable === data[idx + 1].IsTable) {
                    const spanNumber_1 = groupinfo[data[idx + 1].IsGroup].Subject.length
                    const spanSubject_1 = data.filter(sub => sub.IsGroup === data[idx + 1].IsGroup)
                    if (item.Tag === spanSubject[0].Tag && data[idx + 1].Tag === spanSubject_1[0].Tag) {
                        const insertText_1 = `[택${groupinfo[item.IsGroup].Choice}]\n${(groupinfo[item.IsGroup].Choice ?? 0) * (groupinfo[item.IsGroup].Credit ?? 0)}`
                        const insertText_2 = `[택${groupinfo[data[idx + 1].IsGroup].Choice}]\n${(groupinfo[data[idx + 1].IsGroup].Choice ?? 0) * (groupinfo[data[idx + 1].IsGroup].Credit ?? 0)}`
                        sheet.mergeCells(choiceStartRow_3 + rowIndex_3, 11, choiceStartRow_3 + rowIndex_3 + spanNumber - 1, 11)
                        const cell11 = sheet.getCell(choiceStartRow_3 + rowIndex_3, 11)
                        cell11.value = insertText_1;
                        cell11.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                        cell11.font = { size: 10 }
                        cell11.border = baseBorder
                        sheet.mergeCells(choiceStartRow_3 + rowIndex_3, 12, choiceStartRow_3 + rowIndex_3 + spanNumber_1 - 1, 12)
                        const cell12 = sheet.getCell(choiceStartRow_3 + rowIndex_3, 12)
                        cell12.value = insertText_2;
                        cell12.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                        cell12.font = { size: 10 }
                        cell12.border = baseBorder
                    } else if (item.Tag !== spanSubject[0].Tag && data[idx + 1].Tag === spanSubject_1[0].Tag) {
                        const insertText_2 = `[택${groupinfo[data[idx + 1].IsGroup].Choice}]\n${(groupinfo[data[idx + 1].IsGroup].Choice ?? 0) * (groupinfo[data[idx + 1].IsGroup].Credit ?? 0)}`
                        sheet.mergeCells(choiceStartRow_3 + rowIndex_3, 12, choiceStartRow_3 + rowIndex_3 + spanNumber_1 - 1, 12)
                        const cell12 = sheet.getCell(choiceStartRow_3 + rowIndex_3, 12)
                        cell12.value = insertText_2;
                        cell12.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                        cell12.font = { size: 10 }
                        cell12.border = baseBorder
                    } else if (item.Tag === spanSubject[0].Tag && data[idx + 1].Tag !== spanSubject_1[0].Tag) {
                        const insertText_2 = `[택${groupinfo[item.IsGroup].Choice}]\n${(groupinfo[item.IsGroup].Choice ?? 0) * (groupinfo[item.IsGroup].Credit ?? 0)}`

                        sheet.mergeCells(choiceStartRow_3 + rowIndex_3, 11, choiceStartRow_3 + rowIndex_3 + spanNumber - 1, 11)
                        const cell11 = sheet.getCell(choiceStartRow_3 + rowIndex_3, 11)
                        cell11.value = insertText_2;
                        cell11.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                        cell11.font = { size: 10 }
                        cell11.border = baseBorder
                    }
                }
            } else if (idx === 0) {
                const insertText = `[택${groupinfo[item.IsGroup].Choice}]\n${(groupinfo[item.IsGroup].Choice ?? 0) * (groupinfo[item.IsGroup].Credit ?? 0)}`
                if (item.Semester === 1) {
                    const cell11 = sheet.getCell(choiceStartRow_3 + rowIndex_3, 11)
                    cell11.value = insertText;
                    cell11.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                    cell11.font = { size: 10 }
                    cell11.border = baseBorder
                } else {
                    const cell12 = sheet.getCell(choiceStartRow_3 + rowIndex_3, 12)
                    cell12.value = insertText;
                    cell12.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                    cell12.font = { size: 10 }
                    cell12.border = baseBorder
                }
            } else {
                if (data[idx - 1].IsTable !== item.IsTable) {
                    if (data[idx - 1].IsGroup !== item.IsGroup) {
                        const insertText = `[택${groupinfo[item.IsGroup].Choice}]\n${(groupinfo[item.IsGroup].Choice ?? 0) * (groupinfo[item.IsGroup].Credit ?? 0)}`
                        if (item.Semester === 1) {
                            const cell11 = sheet.getCell(choiceStartRow_3 + rowIndex_3, 11)
                            cell11.value = insertText;
                            cell11.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                            cell11.font = { size: 10 }
                            cell11.border = baseBorder
                        } else {
                            const cell12 = sheet.getCell(choiceStartRow_3 + rowIndex_3, 12)
                            cell12.value = insertText;
                            cell12.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                            cell12.font = { size: 10 }
                            cell12.border = baseBorder
                        }
                    }
                }
            }
            rowIndex_3++
        }
    })
    // 선택과목 통계 입력하기
    const startStaticsRow = choiceStartRow_3 + rowIndex_3
    sheet.mergeCells(startStaticsRow, 1, startStaticsRow, 4)
    sheet.mergeCells(startStaticsRow + 1, 1, startStaticsRow + 1, 4)
    sheet.mergeCells(startStaticsRow + 2, 1, startStaticsRow + 2, 4)
    sheet.mergeCells(startStaticsRow + 3, 1, startStaticsRow + 3, 4)
    sheet.mergeCells(startStaticsRow + 4, 1, startStaticsRow + 4, 4)
    sheet.mergeCells(startStaticsRow + 5, 1, startStaticsRow + 5, 4)
    const choiceStatics = sheet.getCell(startStaticsRow, 1)
    choiceStatics.value = '선택과목 소계'
    choiceStatics.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
    choiceStatics.font = { size: 10 }
    choiceStatics.border = baseBorder
    choiceStatics.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFf2f2f2' },
    };
    sheet.getCell(startStaticsRow, 7).value = statistics_3_1['1-1']
    sheet.getCell(startStaticsRow, 8).value = statistics_3_1['1-2']
    sheet.getCell(startStaticsRow, 9).value = statistics_3_2['2-1']
    sheet.getCell(startStaticsRow, 10).value = statistics_3_2['2-2']
    sheet.getCell(startStaticsRow, 11).value = statistics_3_3['3-1']
    sheet.getCell(startStaticsRow, 12).value = statistics_3_3['3-2']
    sheet.getCell(startStaticsRow, 13).value = statistics_3_1['1-1'] + statistics_3_1['1-2'] + statistics_3_2['2-1'] + statistics_3_2['2-2'] + statistics_3_3['3-1'] + statistics_3_3['3-2']
    // 통계 자료 입력하기
    const allSubStatics = sheet.getCell(startStaticsRow + 1, 1)
    allSubStatics.value = '이수학점 소계'
    allSubStatics.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
    allSubStatics.font = { size: 10 }
    allSubStatics.border = baseBorder
    allSubStatics.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFf2f2f2' },
    };
    sheet.getCell(startStaticsRow + 1, 7).value = statistics_1_1['1-1'] + statistics_3_1['1-1']
    sheet.getCell(startStaticsRow + 1, 8).value = statistics_1_1['1-2'] + statistics_3_1['1-2']
    sheet.getCell(startStaticsRow + 1, 9).value = statistics_1_2['2-1'] + statistics_3_2['2-1']
    sheet.getCell(startStaticsRow + 1, 10).value = statistics_1_2['2-2'] + statistics_3_2['2-2']
    sheet.getCell(startStaticsRow + 1, 11).value = statistics_1_3['3-1'] + statistics_3_3['3-1']
    sheet.getCell(startStaticsRow + 1, 12).value = statistics_1_3['3-2'] + statistics_3_3['3-2']
    sheet.getCell(startStaticsRow + 1, 13).value = statistics_1_1['1-1'] + statistics_3_1['1-1'] + statistics_1_1['1-2'] + statistics_3_1['1-2'] + statistics_1_2['2-1'] + statistics_3_2['2-1'] + statistics_1_2['2-2'] + statistics_3_2['2-2'] + statistics_1_3['3-1'] + statistics_3_3['3-1'] + statistics_1_3['3-2'] + statistics_3_3['3-2']

    const CEAStatics = sheet.getCell(startStaticsRow + 2, 1)
    CEAStatics.value = '창의적 체험활동'
    CEAStatics.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
    CEAStatics.font = { size: 10 }
    CEAStatics.border = baseBorder
    CEAStatics.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFf2f2f2' },
    };

    const CEA1 = user[YEARS[2]].CEA
    const CEA2 = user[YEARS[1]].CEA
    const CEA3 = user[YEARS[0]].CEA
    sheet.getCell(startStaticsRow + 2, 7).value = CEA1['1-1']
    sheet.getCell(startStaticsRow + 2, 8).value = CEA1['1-2']
    sheet.getCell(startStaticsRow + 2, 9).value = CEA2['2-1']
    sheet.getCell(startStaticsRow + 2, 10).value = CEA2['2-2']
    sheet.getCell(startStaticsRow + 2, 11).value = CEA3['3-1']
    sheet.getCell(startStaticsRow + 2, 12).value = CEA3['3-2']
    sheet.getCell(startStaticsRow + 2, 13).value = CEA1['1-1'] + CEA1['1-2'] + CEA2['2-1'] + CEA2['2-2'] + CEA3['3-1'] + CEA3['3-2']

    const allSemstatics = sheet.getCell(startStaticsRow + 3, 1)
    allSemstatics.value = '학기별 총 이수학점'
    allSemstatics.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
    allSemstatics.font = { size: 10 }
    allSemstatics.border = baseBorder
    allSemstatics.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFf2f2f2' },
    };
    sheet.getCell(startStaticsRow + 3, 7).value = statistics_1_1['1-1'] + statistics_3_1['1-1'] + CEA1['1-1']
    sheet.getCell(startStaticsRow + 3, 8).value = statistics_1_1['1-2'] + statistics_3_1['1-2'] + CEA1['1-2']
    sheet.getCell(startStaticsRow + 3, 9).value = statistics_1_2['2-1'] + statistics_3_2['2-1'] + CEA2['2-1']
    sheet.getCell(startStaticsRow + 3, 10).value = statistics_1_2['2-2'] + statistics_3_2['2-2'] + CEA2['2-2']
    sheet.getCell(startStaticsRow + 3, 11).value = statistics_1_3['3-1'] + statistics_3_3['3-1'] + CEA3['3-1']
    sheet.getCell(startStaticsRow + 3, 12).value = statistics_1_3['3-2'] + statistics_3_3['3-2'] + CEA3['3-2']
    sheet.getCell(startStaticsRow + 3, 13).value = statistics_1_1['1-1'] + statistics_3_1['1-1'] + statistics_1_1['1-2'] + statistics_3_1['1-2'] + statistics_1_2['2-1'] + statistics_3_2['2-1'] + statistics_1_2['2-2'] + statistics_3_2['2-2'] + statistics_1_3['3-1'] + statistics_3_3['3-1'] + statistics_1_3['3-2'] + statistics_3_3['3-2'] + CEA1['1-1'] + CEA1['1-2'] + CEA2['2-1'] + CEA2['2-2'] + CEA3['3-1'] + CEA3['3-2']

    const subjectNumberstatics = sheet.getCell(startStaticsRow + 4, 1)
    subjectNumberstatics.value = '학기당 과목수'
    subjectNumberstatics.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
    subjectNumberstatics.font = { size: 10 }
    subjectNumberstatics.border = baseBorder
    subjectNumberstatics.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFf2f2f2' },
    };
    sheet.getCell(startStaticsRow + 4, 7).value = statistics_subjectNumber_1['1-1']
    sheet.getCell(startStaticsRow + 4, 8).value = statistics_subjectNumber_1['1-2']
    sheet.getCell(startStaticsRow + 4, 9).value = statistics_subjectNumber_2['2-1']
    sheet.getCell(startStaticsRow + 4, 10).value = statistics_subjectNumber_2['2-2']
    sheet.getCell(startStaticsRow + 4, 11).value = statistics_subjectNumber_3['3-1']
    sheet.getCell(startStaticsRow + 4, 12).value = statistics_subjectNumber_3['3-2']

    const AllGradestatics = sheet.getCell(startStaticsRow + 5, 1)
    AllGradestatics.value = '학년별 총 이수 학점'
    AllGradestatics.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
    AllGradestatics.font = { size: 10 }
    AllGradestatics.border = baseBorder
    AllGradestatics.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFf2f2f2' },
    };
    sheet.mergeCells(startStaticsRow + 5, 7, startStaticsRow + 5, 8)
    sheet.mergeCells(startStaticsRow + 5, 9, startStaticsRow + 5, 10)
    sheet.mergeCells(startStaticsRow + 5, 11, startStaticsRow + 5, 12)
    sheet.getCell(startStaticsRow + 5, 7).value = statistics_1_1['1-1'] + statistics_1_1['1-2'] + statistics_3_1['1-1'] + statistics_3_1['1-2'] + CEA1['1-1'] + CEA1['1-2']
    sheet.getCell(startStaticsRow + 5, 9).value = statistics_1_2['2-1'] + statistics_1_2['2-2'] + statistics_3_2['2-1'] + statistics_3_2['2-2'] + CEA2['2-1'] + CEA2['2-2']
    sheet.getCell(startStaticsRow + 5, 11).value = statistics_1_3['3-1'] + statistics_1_3['3-2'] + statistics_3_3['3-1'] + statistics_3_3['3-2'] + CEA3['3-1'] + CEA3['3-2']
    sheet.getCell(startStaticsRow + 5, 13).value = statistics_1_1['1-1'] + statistics_3_1['1-1'] + statistics_1_1['1-2'] + statistics_3_1['1-2'] + statistics_1_2['2-1'] + statistics_3_2['2-1'] + statistics_1_2['2-2'] + statistics_3_2['2-2'] + statistics_1_3['3-1'] + statistics_3_3['3-1'] + statistics_1_3['3-2'] + statistics_3_3['3-2'] + CEA1['1-1'] + CEA1['1-2'] + CEA2['2-1'] + CEA2['2-2'] + CEA3['3-1'] + CEA3['3-2']

    for (let r = 5; r <= startStaticsRow + 5; r++) {
        for (let j = 1; j <= 14; j++) {
            const cell = sheet.getCell(r, j)
            cell.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
            cell.font = { size: 10 }
            cell.border = baseBorder
        }
    }
    for (let r = startStaticsRow; r <= startStaticsRow + 5; r++) {
        for (let j = 7; j <= 13; j++) {
            const cell = sheet.getCell(r, j)
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFf2f2f2' },
            }
        }
    }
    for (let r = 3; r <= startStaticsRow + 5; r++) {
        for (let j = 6; j <= 12; j = j + 2) {
            const cell = sheet.getCell(r, j)
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'double' },
                bottom: { style: 'thin' }
            }
        }
    }
    // 파일을 Blob 형태로 변환
    const buffer = await workbook.xlsx.writeBuffer();

    // 브라우저에서 다운로드 트리거
    const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${year}학년도 전학년 교육과정 편성표.xlsx`;
    link.click();
    URL.revokeObjectURL(link.href);

    toast.info("엑셀 파일 생성이 생성되었습니다.")
}
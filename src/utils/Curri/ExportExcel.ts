import { SUBJECT } from '@/data/Curri/subject'
import { useCurriTableStore } from '@/store/CurriSubjectStore'
import ExcelJs from 'exceljs'
import { toast } from 'sonner'

const year = useCurriTableStore.getState().year
const addsubject = useCurriTableStore.getState().userData[year].AddSubject
const union = [...SUBJECT, ...addsubject]
const noGradeSubject = union
    .filter(item => (item.교과군 === '교양') ||
        (item.교과군 === '사회' && item.유형 === '융합' && item.Tag <= 155) ||
        (item.교과군 === '과학' && item.유형 === '융합' && item.Tag <= 155) ||
        (item.교과군 === '예술' && item.Tag <= 155) ||
        (item.교과군 === '체육' && item.Tag <= 155) ||
        ['과학탐구실험1', '과학탐구실험2'].includes(item.과목명))
    .map(item => item.Tag);

const etc = ['기술∙가정/정보', '제2외국어/한문', '교양'];
const subjectGroupList = ['국어', '수학', '영어', '사회', '과학', '체육', '예술', '생활교양'];

export function excelStatistics_1(): Record<string, number> {
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

export function excelAllCredit_1(): number {
    return Object.values(excelStatistics_1()).reduce((sum, val) => sum + val, 0)
}

export function excelStatistics_3(): Record<string, number> {
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

export function excelAllCredit_3(): number {
    return Object.values(excelStatistics_3()).reduce((sum, val) => sum + val, 0)
}

function excelSubjectNumber(): Record<string, string | number> {
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

function excelSubjectCredit(): Record<string, number> {
    const cache: Record<string, number> = {}
    const { 학교지정: data } = useCurriTableStore.getState().userData[year];
    subjectGroupList.forEach(sub => {
        const subItem = data.filter(item => item.SubjectGroup === sub)
        const subcredit = subItem.reduce((sum, item) => sum + Number(item.Credit), 0)
        cache[`${sub}`] = subcredit
    })
    return cache
}

function excelETCCredit() {
    const { 학교지정: data } = useCurriTableStore.getState().userData[year];
    const subItme = data.filter(item => etc.includes(item.SubjectGroup))
    const subcredit = subItme.reduce((sum, item) => sum + Number(item.Credit), 0)
    return subcredit
}

export async function exprotToExcel(schoolname: string) {
    const workbook = new ExcelJs.Workbook()
    const sheet = workbook.addWorksheet('worksheet');
    const user = useCurriTableStore.getState().userData[year];
    const groupinfo = useCurriTableStore.getState().userData[year].Group

    const statistics_1 = excelStatistics_1();
    const statistics_3 = excelStatistics_3();
    const statistics_subjectNumber = excelSubjectNumber()
    const table1_credit = excelSubjectCredit()
    const table1_ETC_credit = excelETCCredit()
    const alignCenter: Partial<ExcelJs.Alignment> = {
        horizontal: 'center',
        vertical: 'middle',
    };

    const baseBorder: Partial<ExcelJs.Borders> = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
    };
    //헤더 작성
    sheet.mergeCells('A1:N1');
    const excelTitle = sheet.getCell('A1')
    excelTitle.value = `${year}학년도 신입생 교육과정 편성표`
    excelTitle.alignment = alignCenter
    excelTitle.font = { bold: true, size: 16 }

    const excelSchoolName = sheet.getCell('N2');
    excelSchoolName.value = schoolname

    // 🟨 헤더 (3~4행)
    // 1단 헤더
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
        'G3:H3', 'I3:J3', 'K3:L3',
    ];
    merges.forEach(range => sheet.mergeCells(range));

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
    const table1 = user.학교지정
    if (table1.length !== 0) {
        const startRow = 5
        if (table1.length === 1) {
            sheet.getCell(5, 1).value = '학교지정'
        } else {
            sheet.mergeCells(5, 1, table1.length + 4, 1)
            sheet.getCell(5, 1).value = '학교지정'
        }
        sheet.getCell(5, 1).alignment = alignCenter
        for (let i = 0; i <= table1.length - 1; i++) {
            const row = startRow + i;
            sheet.getCell(row, 1).value = table1[i].Section
            sheet.getCell(row, 2).value = table1[i].SubjectGroup
            sheet.getCell(row, 3).value = table1[i].SubjectProperty
            sheet.getCell(row, 4).value = table1[i].SubjectName
            sheet.getCell(row, 5).value = table1[i].BasicCredit
            sheet.getCell(row, 6).value = table1[i].Credit
            if (table1[i].IsGroup === '') {
                if (table1[i].Grade === 1) {
                    if (table1[i].Semester === 1) {
                        sheet.getCell(row, 7).value = table1[i].Credit;
                    } else {
                        sheet.getCell(row, 8).value = table1[i].Credit;
                    }
                } else if (table1[i].Grade === 2) {
                    if (table1[i].Semester === 1) {
                        sheet.getCell(row, 9).value = table1[i].Credit;
                    } else {
                        sheet.getCell(row, 10).value = table1[i].Credit;
                    }
                } else {
                    if (table1[i].Semester === 1) {
                        sheet.getCell(row, 11).value = table1[i].Credit;
                    } else {
                        sheet.getCell(row, 12).value = table1[i].Credit;
                    }
                }
            } else {
                const groupname = table1[i].IsGroup;
                const inGroupSubject = groupinfo[groupname].Subject;
                const inGroupGrade = groupinfo[groupname].Grade;
                const inGroupChoice = groupinfo[groupname].Choice;
                const inGroupCredit = groupinfo[groupname].Credit;
                if (table1[i].Tag === inGroupSubject[0]) {
                    if (inGroupGrade === 1) {
                        sheet.mergeCells(row, 7, row + 1, 7);
                        const cell7 = sheet.getCell(row, 7);
                        cell7.value = { formula: `="[택${inGroupChoice}]" & CHAR(10) & "${inGroupCredit}"` };
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
                    } else if (inGroupGrade === 2) {
                        sheet.mergeCells(row, 9, row + 1, 9);
                        const cell9 = sheet.getCell(row, 9);
                        cell9.value = { formula: `="[택${inGroupChoice}]" & CHAR(10) & "${inGroupCredit}"` };
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
                    } else {
                        sheet.mergeCells(row, 11, row + 1, 11);
                        const cell11 = sheet.getCell(row, 11);
                        cell11.value = { formula: `="[택${inGroupChoice}]" & CHAR(10) & "${inGroupCredit}"` };
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
                    }
                }
            }
        }
        // 스타일 지정 바꿔야함.
        for (let r = startRow; r <= table1.length + 4; r++) {
            const row = sheet.getRow(r)
            row.eachCell({ includeEmpty: true }, (cell) => {
                cell.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                cell.font = { size: 10 };
                cell.border = baseBorder;
            })
        }

        sheet.mergeCells(table1.length + 5, 1, table1.length + 5, 4)
        const statistics1 = sheet.getCell(table1.length + 5, 1)
        statistics1.value = '학교지정 소계'
        statistics1.alignment = alignCenter
        statistics1.border = baseBorder;
        statistics1.font = { size: 10 }
        statistics1.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFf2f2f2' },
        };
        sheet.getCell(table1.length + 5, 7).value = statistics_1['1-1']
        sheet.getCell(table1.length + 5, 8).value = statistics_1['1-2']
        sheet.getCell(table1.length + 5, 9).value = statistics_1['2-1']
        sheet.getCell(table1.length + 5, 10).value = statistics_1['2-2']
        sheet.getCell(table1.length + 5, 11).value = statistics_1['3-1']
        sheet.getCell(table1.length + 5, 12).value = statistics_1['3-2']
        sheet.getCell(table1.length + 5, 13).value = excelAllCredit_1()
        for (let j = 7; j <= 13; j++) {
            const cell = sheet.getCell(table1.length + 5, j)
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFf2f2f2' },
            }
        }
    }
    // 13, 14열 채우기 작업
    const table1_kor = [...new Set(table1
        .filter(item => item.SubjectGroup === '국어' && item.Tag <= 155)
        .map(item => item.Tag))]
    const table1_math = [...new Set(table1
        .filter(item => item.SubjectGroup === '수학' && item.Tag <= 155)
        .map(item => item.Tag))]
    const table1_english = [...new Set(table1
        .filter(item => item.SubjectGroup === '영어' && item.Tag <= 155)
        .map(item => item.Tag))]
    const table1_history = table1.filter(item => item.SubjectName === '한국사1' || item.SubjectName === '한국사2')
    const table1_society = [...new Set(table1
        .filter(item => item.SubjectGroup === '사회' && item.Tag <= 155 && item.SubjectName !== '한국사1' && item.SubjectName !== '한국사2')
        .map(item => item.Tag))]
    const table1_science = [...new Set(table1
        .filter(item => item.SubjectGroup === '과학' && item.Tag <= 155)
        .map(item => item.Tag))]
    const table1_phy = [...new Set(table1
        .filter(item => item.SubjectGroup === '체육' && item.Tag <= 155)
        .map(item => item.Tag))]
    const table1_art = [...new Set(table1
        .filter(item => item.SubjectGroup === '예술' && item.Tag <= 155)
        .map(item => item.Tag))]
    const table1_etc = [...new Set(table1
        .filter(item => etc.includes(item.SubjectGroup) && item.Tag <= 155)
        .map(item => item.Tag))]
    let creditRow = 5
    if (table1_kor.length !== 0) {
        if (table1_kor.length === 1) {
            const korCell = sheet.getCell(creditRow, 13)
            korCell.value = table1_credit['국어']
            korCell.alignment = alignCenter
            korCell.font = { size: 10 }
            korCell.border = baseBorder
            const korCredit = sheet.getCell(creditRow, 14)
            korCredit.value = 8
            korCredit.alignment = alignCenter
            korCredit.font = { size: 10 }
            korCredit.border = baseBorder
        } else {
            sheet.mergeCells(creditRow, 13, creditRow + table1_kor.length - 1, 13)
            const korCell = sheet.getCell(creditRow, 13)
            korCell.value = table1_credit['국어']
            korCell.alignment = alignCenter
            korCell.font = { size: 10 }
            korCell.border = baseBorder
            sheet.mergeCells(creditRow, 14, creditRow + table1_kor.length - 1, 14)
            const korCredit = sheet.getCell(creditRow, 14)
            korCredit.value = 8
            korCredit.alignment = alignCenter
            korCredit.font = { size: 10 }
            korCredit.border = baseBorder
        }
        creditRow = creditRow + table1_kor.length
    }
    if (table1_math.length !== 0) {
        if (table1_math.length === 1) {
            const mathCell = sheet.getCell(creditRow, 13)
            mathCell.value = table1_credit['수학']
            mathCell.alignment = alignCenter
            mathCell.font = { size: 10 }
            mathCell.border = baseBorder
            const mathCredit = sheet.getCell(creditRow, 14)
            mathCredit.value = 8
            mathCredit.alignment = alignCenter
            mathCredit.font = { size: 10 }
            mathCredit.border = baseBorder
        } else {
            sheet.mergeCells(creditRow, 13, creditRow + table1_math.length - 1, 13)
            const mathCell = sheet.getCell(creditRow, 13)
            mathCell.value = table1_credit['수학']
            mathCell.alignment = alignCenter
            mathCell.font = { size: 10 }
            mathCell.border = baseBorder
            sheet.mergeCells(creditRow, 14, creditRow + table1_math.length - 1, 14)
            const mathCredit = sheet.getCell(creditRow, 14)
            mathCredit.value = 8
            mathCredit.alignment = alignCenter
            mathCredit.font = { size: 10 }
            mathCredit.border = baseBorder
        }
        creditRow = creditRow + table1_math.length
    }
    if (table1_english.length !== 0) {
        if (table1_english.length === 1) {
            const englishCell = sheet.getCell(creditRow, 13)
            englishCell.value = table1_credit['영어']
            englishCell.alignment = alignCenter
            englishCell.font = { size: 10 }
            englishCell.border = baseBorder
            const englishCredit = sheet.getCell(creditRow, 14)
            englishCredit.value = 8
            englishCredit.alignment = alignCenter
            englishCredit.font = { size: 10 }
            englishCredit.border = baseBorder
        } else {
            sheet.mergeCells(creditRow, 13, creditRow + table1_english.length - 1, 13)
            const englishCell = sheet.getCell(creditRow, 13)
            englishCell.value = table1_credit['영어']
            englishCell.alignment = alignCenter
            englishCell.font = { size: 10 }
            englishCell.border = baseBorder
            sheet.mergeCells(creditRow, 14, creditRow + table1_english.length - 1, 14)
            const englishCredit = sheet.getCell(creditRow, 14)
            englishCredit.value = 8
            englishCredit.alignment = alignCenter
            englishCredit.font = { size: 10 }
            englishCredit.border = baseBorder
        }
        creditRow = creditRow + table1_english.length
    }
    if (table1_history.length !== 0) {
        if (table1_history.length === 1) {
            const historyCell = sheet.getCell(creditRow, 13)
            historyCell.value = 3
            historyCell.alignment = alignCenter
            historyCell.font = { size: 10 }
            historyCell.border = baseBorder
            const historyCrdeit = sheet.getCell(creditRow, 14)
            historyCrdeit.value = 6
            historyCrdeit.alignment = alignCenter
            historyCrdeit.font = { size: 10 }
            historyCrdeit.border = baseBorder
        } else {
            sheet.mergeCells(creditRow, 13, creditRow + table1_history.length - 1, 13)
            const historyCell = sheet.getCell(creditRow, 13)
            historyCell.value = 6
            historyCell.alignment = alignCenter
            historyCell.font = { size: 10 }
            historyCell.border = baseBorder
            sheet.mergeCells(creditRow, 14, creditRow + table1_history.length - 1, 14)
            const historyCrdeit = sheet.getCell(creditRow, 14)
            historyCrdeit.value = 6
            historyCrdeit.alignment = alignCenter
            historyCrdeit.font = { size: 10 }
            historyCrdeit.border = baseBorder
        }
        creditRow = creditRow + table1_history.length
    }
    if (table1_society.length !== 0) {
        const history = table1_history.length === 0 ? 0 : (table1_history.length === 1 ? 3 : 6)
        if (table1_society.length === 1) {
            const societyCell = sheet.getCell(creditRow, 13)
            societyCell.value = table1_credit['사회'] - history
            societyCell.alignment = alignCenter
            societyCell.font = { size: 10 }
            societyCell.border = baseBorder
            const societyCrdeit = sheet.getCell(creditRow, 14)
            societyCrdeit.value = 8
            societyCrdeit.alignment = alignCenter
            societyCrdeit.font = { size: 10 }
            societyCrdeit.border = baseBorder
        } else {
            sheet.mergeCells(creditRow, 13, creditRow + table1_society.length - 1, 13)
            const societyCell = sheet.getCell(creditRow, 13)
            societyCell.value = table1_credit['사회'] - history
            societyCell.alignment = alignCenter
            societyCell.font = { size: 10 }
            societyCell.border = baseBorder
            sheet.mergeCells(creditRow, 14, creditRow + table1_society.length - 1, 14)
            const societyCrdeit = sheet.getCell(creditRow, 14)
            societyCrdeit.value = 8
            societyCrdeit.alignment = alignCenter
            societyCrdeit.font = { size: 10 }
            societyCrdeit.border = baseBorder
        }
        creditRow = creditRow + table1_society.length
    }
    if (table1_science.length !== 0) {
        if (table1_science.length === 1) {
            const scienceCell = sheet.getCell(creditRow, 13)
            scienceCell.value = table1_credit['과학']
            scienceCell.alignment = alignCenter
            scienceCell.font = { size: 10 }
            scienceCell.border = baseBorder
            const scienceCredit = sheet.getCell(creditRow, 14)
            scienceCredit.value = 10
            scienceCredit.alignment = alignCenter
            scienceCredit.font = { size: 10 }
            scienceCredit.border = baseBorder
        } else {
            sheet.mergeCells(creditRow, 13, creditRow + table1_science.length - 1, 13)
            const scienceCell = sheet.getCell(creditRow, 13)
            scienceCell.value = table1_credit['과학']
            scienceCell.alignment = alignCenter
            scienceCell.font = { size: 10 }
            scienceCell.border = baseBorder
            sheet.mergeCells(creditRow, 14, creditRow + table1_science.length - 1, 14)
            const scienceCredit = sheet.getCell(creditRow, 14)
            scienceCredit.value = 10
            scienceCredit.alignment = alignCenter
            scienceCredit.font = { size: 10 }
            scienceCredit.border = baseBorder
        }
        creditRow = creditRow + table1_science.length
    }
    if (table1_phy.length !== 0) {
        if (table1_phy.length === 1) {
            const phyCell = sheet.getCell(creditRow, 13)
            phyCell.value = table1_credit['체육']
            phyCell.alignment = alignCenter
            phyCell.font = { size: 10 }
            phyCell.border = baseBorder
            const phyCredit = sheet.getCell(creditRow, 14)
            phyCredit.value = 10
            phyCredit.alignment = alignCenter
            phyCredit.font = { size: 10 }
            phyCredit.border = baseBorder
        } else {
            sheet.mergeCells(creditRow, 13, creditRow + table1_phy.length - 1, 13)
            const phyCell = sheet.getCell(creditRow, 13)
            phyCell.value = table1_credit['체육']
            phyCell.alignment = alignCenter
            phyCell.font = { size: 10 }
            phyCell.border = baseBorder
            sheet.mergeCells(creditRow, 14, creditRow + table1_phy.length - 1, 14)
            const phyCredit = sheet.getCell(creditRow, 14)
            phyCredit.value = 10
            phyCredit.alignment = alignCenter
            phyCredit.font = { size: 10 }
            phyCredit.border = baseBorder
        }
        creditRow = creditRow + table1_phy.length
    }
    if (table1_art.length !== 0) {
        if (table1_art.length === 1) {
            const artCell = sheet.getCell(creditRow, 13)
            artCell.value = table1_credit['예술']
            artCell.alignment = alignCenter
            artCell.font = { size: 10 }
            artCell.border = baseBorder
            const artCredit = sheet.getCell(creditRow, 14)
            artCredit.value = 10
            artCredit.alignment = alignCenter
            artCredit.font = { size: 10 }
            artCredit.border = baseBorder
        } else {
            sheet.mergeCells(creditRow, 13, creditRow + table1_art.length - 1, 13)
            const artCell = sheet.getCell(creditRow, 13)
            artCell.value = table1_credit['예술']
            artCell.alignment = alignCenter
            artCell.font = { size: 10 }
            artCell.border = baseBorder
            sheet.mergeCells(creditRow, 14, creditRow + table1_art.length - 1, 14)
            const artCredit = sheet.getCell(creditRow, 14)
            artCredit.value = 10
            artCredit.alignment = alignCenter
            artCredit.font = { size: 10 }
            artCredit.border = baseBorder
        }
        creditRow = creditRow + table1_art.length
    }
    if (table1_etc.length !== 0) {
        if (table1_etc.length === 1) {
            const etcCell = sheet.getCell(creditRow, 13)
            etcCell.value = table1_ETC_credit
            etcCell.alignment = alignCenter
            etcCell.font = { size: 10 }
            etcCell.border = baseBorder
            const etcCredit = sheet.getCell(creditRow, 14)
            etcCredit.value = 10
            etcCredit.alignment = alignCenter
            etcCredit.font = { size: 10 }
            etcCredit.border = baseBorder
        } else {
            sheet.mergeCells(creditRow, 13, creditRow + table1_etc.length - 1, 13)
            const etcCell = sheet.getCell(creditRow, 13)
            etcCell.value = table1_ETC_credit
            etcCell.alignment = alignCenter
            etcCell.font = { size: 10 }
            etcCell.border = baseBorder
            sheet.mergeCells(creditRow, 14, creditRow + table1_etc.length - 1, 14)
            const etcCredit = sheet.getCell(creditRow, 14)
            etcCredit.value = 10
            etcCredit.alignment = alignCenter
            etcCredit.font = { size: 10 }
            etcCredit.border = baseBorder
        }
        creditRow = creditRow + table1_etc.length
    }
    const choiceStartRow = table1.length + 6
    let choiceColumn1 = table1.length + 6

    const table2 = user.선택과목
    const table2_Grade1 = [...new Set(table2.filter(item => item.Grade === 1))]
    const table2_Grade2 = [...new Set(table2.filter(item => item.Grade === 2))]
    const table2_Grade3 = [...new Set(table2.filter(item => item.Grade === 3))]

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
    let rowIndex = 0
    table2.forEach((item, idx, data) => {
        if (item.IsTable !== data[idx + 1]?.IsTable && idx > 0 && item.IsTable === data[idx - 1].IsTable) {
            idx++
        } else {
            const groupKey = item.IsGroup
            const spanNumber = groupinfo[groupKey].Subject.length;
            const spanSubject = data.filter(sub => sub.IsGroup === groupKey);
            const rowNumber = data.length;
            sheet.getCell(choiceStartRow + rowIndex, 2).value = table2[idx].SubjectGroup
            sheet.getCell(choiceStartRow + rowIndex, 3).value = table2[idx].SubjectProperty
            sheet.getCell(choiceStartRow + rowIndex, 4).value = table2[idx].SubjectName
            sheet.getCell(choiceStartRow + rowIndex, 5).value = table2[idx].BasicCredit
            sheet.getCell(choiceStartRow + rowIndex, 6).value = table2[idx].Credit
            if (idx !== rowNumber - 1) {
                if (item.IsTable !== data[idx + 1].IsTable) {
                    if (item.Tag === spanSubject[0].Tag) {
                        const insertText = `[택${groupinfo[groupKey].Choice}]\n${(groupinfo[groupKey].Choice ?? 0) * (groupinfo[groupKey].Credit ?? 0)}`
                        if (item.Grade === 1 && item.Semester === 1) {
                            sheet.mergeCells(choiceStartRow + rowIndex, 7, choiceStartRow + rowIndex + spanNumber - 1, 7)
                            const cell7 = sheet.getCell(choiceStartRow + rowIndex, 7)
                            cell7.value = insertText;
                            cell7.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                            cell7.font = { size: 10 }
                            cell7.border = baseBorder
                        } else if (item.Grade === 1 && item.Semester === 2) {
                            sheet.mergeCells(choiceStartRow + rowIndex, 8, choiceStartRow + rowIndex + spanNumber - 1, 8)
                            const cell8 = sheet.getCell(choiceStartRow + rowIndex, 8)
                            cell8.value = insertText;
                            cell8.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                            cell8.font = { size: 10 }
                            cell8.border = baseBorder
                        } else if (item.Grade === 2 && item.Semester === 1) {
                            sheet.mergeCells(choiceStartRow + rowIndex, 9, choiceStartRow + rowIndex + spanNumber - 1, 9)
                            const cell9 = sheet.getCell(choiceStartRow + rowIndex, 9)
                            cell9.value = insertText;
                            cell9.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                            cell9.font = { size: 10 }
                            cell9.border = baseBorder
                        } else if (item.Grade === 2 && item.Semester === 2) {
                            sheet.mergeCells(choiceStartRow + rowIndex, 10, choiceStartRow + rowIndex + spanNumber - 1, 10)
                            const cell10 = sheet.getCell(choiceStartRow + rowIndex, 10)
                            cell10.value = insertText;
                            cell10.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                            cell10.font = { size: 10 }
                            cell10.border = baseBorder
                        } else if (item.Grade === 3 && item.Semester === 1) {
                            sheet.mergeCells(choiceStartRow + rowIndex, 11, choiceStartRow + rowIndex + spanNumber - 1, 11)
                            const cell11 = sheet.getCell(choiceStartRow + rowIndex, 11)
                            cell11.value = insertText;
                            cell11.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                            cell11.font = { size: 10 }
                            cell11.border = baseBorder
                        } else if (item.Grade === 3 && item.Semester === 2) {
                            sheet.mergeCells(choiceStartRow + rowIndex, 12, choiceStartRow + rowIndex + spanNumber - 1, 12)
                            const cell12 = sheet.getCell(choiceStartRow + rowIndex, 12)
                            cell12.value = insertText;
                            cell12.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                            cell12.font = { size: 10 }
                            cell12.border = baseBorder
                        }
                    }
                } else if (item.IsTable === data[idx + 1].IsTable) {
                    const spanNumber_1 = groupinfo[data[idx + 1].IsGroup].Subject.length;
                    const spanSubject_1 = data.filter(sub => sub.IsGroup === data[idx + 1].IsGroup)
                    if (item.Tag === spanSubject[0].Tag && data[idx + 1].Tag === spanSubject_1[0].Tag) {
                        const insertText_1 = `[택${groupinfo[item.IsGroup].Choice}]\n${(groupinfo[item.IsGroup].Choice ?? 0) * (groupinfo[item.IsGroup].Credit ?? 0)}`
                        const insertText_2 = `[택${groupinfo[data[idx + 1].IsGroup].Choice}]\n${(groupinfo[data[idx + 1].IsGroup].Choice ?? 0) * (groupinfo[data[idx + 1].IsGroup].Credit ?? 0)}`
                        if (item.Grade === 1) {
                            sheet.mergeCells(choiceStartRow + rowIndex, 7, choiceStartRow + rowIndex + spanNumber - 1, 7)
                            const cell7 = sheet.getCell(choiceStartRow + rowIndex, 7)
                            cell7.value = insertText_1;
                            cell7.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                            cell7.font = { size: 10 }
                            cell7.border = baseBorder
                            sheet.mergeCells(choiceStartRow + rowIndex, 8, choiceStartRow + rowIndex + spanNumber_1 - 1, 8)
                            const cell8 = sheet.getCell(choiceStartRow + rowIndex, 8)
                            cell8.value = insertText_2;
                            cell8.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                            cell8.font = { size: 10 }
                            cell8.border = baseBorder
                        } else if (item.Grade === 2) {
                            sheet.mergeCells(choiceStartRow + rowIndex, 9, choiceStartRow + rowIndex + spanNumber - 1, 9)
                            const cell9 = sheet.getCell(choiceStartRow + rowIndex, 9)
                            cell9.value = insertText_1;
                            cell9.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                            cell9.font = { size: 10 }
                            cell9.border = baseBorder
                            sheet.mergeCells(choiceStartRow + rowIndex, 10, choiceStartRow + rowIndex + spanNumber_1 - 1, 10)
                            const cell10 = sheet.getCell(choiceStartRow + rowIndex, 10)
                            cell10.value = insertText_2;
                            cell10.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                            cell10.font = { size: 10 }
                            cell10.border = baseBorder
                        } else if (item.Grade === 3) {
                            sheet.mergeCells(choiceStartRow + rowIndex, 11, choiceStartRow + rowIndex + spanNumber - 1, 11)
                            const cell11 = sheet.getCell(choiceStartRow + rowIndex, 11)
                            cell11.value = insertText_1;
                            cell11.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                            cell11.font = { size: 10 }
                            cell11.border = baseBorder
                            sheet.mergeCells(choiceStartRow + rowIndex, 12, choiceStartRow + rowIndex + spanNumber_1 - 1, 12)
                            const cell12 = sheet.getCell(choiceStartRow + rowIndex, 12)
                            cell12.value = insertText_2;
                            cell12.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                            cell12.font = { size: 10 }
                            cell12.border = baseBorder
                        }
                    } else if (item.Tag !== spanSubject[0].Tag && data[idx + 1].Tag === spanSubject_1[0].Tag) {
                        const insertText_2 = `[택${groupinfo[data[idx + 1].IsGroup].Choice}]\n${(groupinfo[data[idx + 1].IsGroup].Choice ?? 0) * (groupinfo[data[idx + 1].IsGroup].Credit ?? 0)}`
                        if (item.Grade === 1) {
                            sheet.mergeCells(choiceStartRow + rowIndex, 8, choiceStartRow + rowIndex + spanNumber_1 - 1, 8)
                            const cell8 = sheet.getCell(choiceStartRow + rowIndex, 8)
                            cell8.value = insertText_2;
                            cell8.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                            cell8.font = { size: 10 }
                            cell8.border = baseBorder
                        } else if (item.Grade === 2) {
                            sheet.mergeCells(choiceStartRow + rowIndex, 10, choiceStartRow + rowIndex + spanNumber_1 - 1, 10)
                            const cell10 = sheet.getCell(choiceStartRow + rowIndex, 10)
                            cell10.value = insertText_2;
                            cell10.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                            cell10.font = { size: 10 }
                            cell10.border = baseBorder
                        } else if (item.Grade === 3) {
                            sheet.mergeCells(choiceStartRow + rowIndex, 12, choiceStartRow + rowIndex + spanNumber_1 - 1, 12)
                            const cell12 = sheet.getCell(choiceStartRow + rowIndex, 12)
                            cell12.value = insertText_2;
                            cell12.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                            cell12.font = { size: 10 }
                            cell12.border = baseBorder
                        }
                    }
                }
            } else if (idx === 0) {
                const insertText = `[택${groupinfo[item.IsGroup].Choice}]\n${(groupinfo[item.IsGroup].Choice ?? 0) * (groupinfo[item.IsGroup].Credit ?? 0)}`
                if (item.Grade === 1 && item.Semester === 1) {
                    // sheet.mergeCells(choiceStartRow + idx, 7, choiceStartRow + idx + spanNumber - 1, 7)
                    const cell7 = sheet.getCell(choiceStartRow + rowIndex, 7)
                    cell7.value = insertText;
                    cell7.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                    cell7.font = { size: 10 }
                    cell7.border = baseBorder
                } else if (item.Grade === 1 && item.Semester === 2) {
                    // sheet.mergeCells(choiceStartRow + idx, 8, choiceStartRow + idx + spanNumber - 1, 8)
                    const cell8 = sheet.getCell(choiceStartRow + rowIndex, 8)
                    cell8.value = insertText;
                    cell8.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                    cell8.font = { size: 10 }
                    cell8.border = baseBorder
                } else if (item.Grade === 2 && item.Semester === 1) {
                    // sheet.mergeCells(choiceStartRow + idx, 9, choiceStartRow + idx + spanNumber - 1, 9)
                    const cell9 = sheet.getCell(choiceStartRow + rowIndex, 9)
                    cell9.value = insertText;
                    cell9.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                    cell9.font = { size: 10 }
                    cell9.border = baseBorder
                } else if (item.Grade === 2 && item.Semester === 2) {
                    // sheet.mergeCells(choiceStartRow + idx, 10, choiceStartRow + idx + spanNumber - 1, 10)
                    const cell10 = sheet.getCell(choiceStartRow + rowIndex, 10)
                    cell10.value = insertText;
                    cell10.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                    cell10.font = { size: 10 }
                    cell10.border = baseBorder
                } else if (item.Grade === 3 && item.Semester === 1) {
                    // sheet.mergeCells(choiceStartRow + idx, 11, choiceStartRow + idx + spanNumber - 1, 11)
                    const cell11 = sheet.getCell(choiceStartRow + rowIndex, 11)
                    cell11.value = insertText;
                    cell11.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                    cell11.font = { size: 10 }
                    cell11.border = baseBorder
                } else if (item.Grade === 3 && item.Semester === 2) {
                    // sheet.mergeCells(choiceStartRow + idx, 12, choiceStartRow + idx + spanNumber - 1, 12)
                    const cell12 = sheet.getCell(choiceStartRow + rowIndex, 12)
                    cell12.value = insertText;
                    cell12.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                    cell12.font = { size: 10 }
                    cell12.border = baseBorder
                }
            } else {
                if (data[idx - 1].IsTable !== item.IsTable) {
                    if (data[idx - 1].IsGroup !== item.IsGroup) {
                        const insertText = `[택${groupinfo[item.IsGroup].Choice}]\n${(groupinfo[item.IsGroup].Choice ?? 0) * (groupinfo[item.IsGroup].Credit ?? 0)}`
                        if (item.Grade === 1 && item.Semester === 1) {
                            const cell7 = sheet.getCell(choiceStartRow + rowIndex, 7)
                            cell7.value = insertText;
                            cell7.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                            cell7.font = { size: 10 }
                            cell7.border = baseBorder
                        } else if (item.Grade === 1 && item.Semester === 2) {
                            const cell8 = sheet.getCell(choiceStartRow + rowIndex, 8)
                            cell8.value = insertText;
                            cell8.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                            cell8.font = { size: 10 }
                            cell8.border = baseBorder
                        } else if (item.Grade === 2 && item.Semester === 1) {
                            const cell9 = sheet.getCell(choiceStartRow + rowIndex, 9)
                            cell9.value = insertText;
                            cell9.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                            cell9.font = { size: 10 }
                            cell9.border = baseBorder
                        } else if (item.Grade === 2 && item.Semester === 2) {
                            const cell10 = sheet.getCell(choiceStartRow + rowIndex, 10)
                            cell10.value = insertText;
                            cell10.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                            cell10.font = { size: 10 }
                            cell10.border = baseBorder
                        } else if (item.Grade === 3 && item.Semester === 1) {
                            const cell11 = sheet.getCell(choiceStartRow + rowIndex, 11)
                            cell11.value = insertText;
                            cell11.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                            cell11.font = { size: 10 }
                            cell11.border = baseBorder
                        } else if (item.Grade === 3 && item.Semester === 2) {
                            const cell12 = sheet.getCell(choiceStartRow + rowIndex, 12)
                            cell12.value = insertText;
                            cell12.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                            cell12.font = { size: 10 }
                            cell12.border = baseBorder
                        }
                    }
                }
            }
            rowIndex++
        }
    })

    const startStaticsRow = table1.length + rowIndex + 6;
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
    sheet.getCell(startStaticsRow, 7).value = statistics_3['1-1']
    sheet.getCell(startStaticsRow, 8).value = statistics_3['1-2']
    sheet.getCell(startStaticsRow, 9).value = statistics_3['2-1']
    sheet.getCell(startStaticsRow, 10).value = statistics_3['2-2']
    sheet.getCell(startStaticsRow, 11).value = statistics_3['3-1']
    sheet.getCell(startStaticsRow, 12).value = statistics_3['3-2']
    sheet.getCell(startStaticsRow, 13).value = excelAllCredit_3()
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
    sheet.getCell(startStaticsRow + 1, 7).value = statistics_1['1-1'] + statistics_3['1-1']
    sheet.getCell(startStaticsRow + 1, 8).value = statistics_1['1-2'] + statistics_3['1-2']
    sheet.getCell(startStaticsRow + 1, 9).value = statistics_1['2-1'] + statistics_3['2-1']
    sheet.getCell(startStaticsRow + 1, 10).value = statistics_1['2-2'] + statistics_3['2-2']
    sheet.getCell(startStaticsRow + 1, 11).value = statistics_1['3-1'] + statistics_3['3-1']
    sheet.getCell(startStaticsRow + 1, 12).value = statistics_1['3-2'] + statistics_3['3-2']
    sheet.getCell(startStaticsRow + 1, 13).value = excelAllCredit_3() + excelAllCredit_3()
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
    const CEA = user.CEA
    sheet.getCell(startStaticsRow + 2, 7).value = CEA['1-1']
    sheet.getCell(startStaticsRow + 2, 8).value = CEA['1-2']
    sheet.getCell(startStaticsRow + 2, 9).value = CEA['2-1']
    sheet.getCell(startStaticsRow + 2, 10).value = CEA['2-2']
    sheet.getCell(startStaticsRow + 2, 11).value = CEA['3-1']
    sheet.getCell(startStaticsRow + 2, 12).value = CEA['3-2']
    sheet.getCell(startStaticsRow + 2, 13).value = CEA['1-1'] + CEA['1-2'] + CEA['2-1'] + CEA['2-2'] + CEA['3-1'] + CEA['3-2']
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
    sheet.getCell(startStaticsRow + 3, 7).value = statistics_1['1-1'] + statistics_3['1-1'] + CEA['1-1']
    sheet.getCell(startStaticsRow + 3, 8).value = statistics_1['1-2'] + statistics_3['1-2'] + CEA['1-2']
    sheet.getCell(startStaticsRow + 3, 9).value = statistics_1['2-1'] + statistics_3['2-1'] + CEA['2-1']
    sheet.getCell(startStaticsRow + 3, 10).value = statistics_1['2-2'] + statistics_3['2-2'] + CEA['2-2']
    sheet.getCell(startStaticsRow + 3, 11).value = statistics_1['3-1'] + statistics_3['3-1'] + CEA['3-1']
    sheet.getCell(startStaticsRow + 3, 12).value = statistics_1['3-2'] + statistics_3['3-2'] + CEA['3-2']
    sheet.getCell(startStaticsRow + 3, 13).value = excelAllCredit_3() + excelAllCredit_3() + CEA['1-1'] + CEA['1-2'] + CEA['2-1'] + CEA['2-2'] + CEA['3-1'] + CEA['3-2']
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
    sheet.getCell(startStaticsRow + 4, 7).value = statistics_subjectNumber['1-1']
    sheet.getCell(startStaticsRow + 4, 8).value = statistics_subjectNumber['1-2']
    sheet.getCell(startStaticsRow + 4, 9).value = statistics_subjectNumber['2-1']
    sheet.getCell(startStaticsRow + 4, 10).value = statistics_subjectNumber['2-2']
    sheet.getCell(startStaticsRow + 4, 11).value = statistics_subjectNumber['3-1']
    sheet.getCell(startStaticsRow + 4, 12).value = statistics_subjectNumber['3-2']
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
    sheet.getCell(startStaticsRow + 5, 7).value = statistics_1['1-1'] + statistics_1['1-2'] + statistics_3['1-1'] + statistics_3['1-2'] + CEA['1-1'] + CEA['1-2']
    sheet.getCell(startStaticsRow + 5, 9).value = statistics_1['2-1'] + statistics_1['2-2'] + statistics_3['2-1'] + statistics_3['2-2'] + CEA['2-1'] + CEA['2-2']
    sheet.getCell(startStaticsRow + 5, 11).value = statistics_1['3-1'] + statistics_1['3-2'] + statistics_3['3-1'] + statistics_3['3-2'] + CEA['3-1'] + CEA['3-2']
    sheet.getCell(startStaticsRow + 5, 13).value = excelAllCredit_3() + excelAllCredit_3() + CEA['1-1'] + CEA['1-2'] + CEA['2-1'] + CEA['2-2'] + CEA['3-1'] + CEA['3-2']

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
    link.download = '편성표.xlsx';
    link.click();
    URL.revokeObjectURL(link.href);

    toast.info("엑셀 파일 생성이 생성되었습니다.")
}
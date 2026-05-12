import ExcelJs from 'exceljs'
import { TEACHER_SUBJECT_GROUP } from "@/data/Curri/teacher";
import { YEARS } from "@/data/data";
import { useSchoolInfoStore } from "@/store/SchoolInfo";
import { useStaSubjectStore } from "@/store/StaSubjectStore";
import { useTeacherStore } from "@/store/TeacherStore";

const NOW_YEAR = [
    { grade: 1, sem: 1, year: YEARS[2] },
    { grade: 1, sem: 2, year: YEARS[2] },
    { grade: 2, sem: 1, year: YEARS[1] },
    { grade: 2, sem: 2, year: YEARS[1] },
    { grade: 3, sem: 1, year: YEARS[0] },
    { grade: 3, sem: 2, year: YEARS[0] }
]

interface SemesterRow {
    subjectName: string;
    total: number;
    [key: string]: string | number; // 동적 키(sem_0 등)를 허용하기 위한 인덱스 시그니처
}

interface SubRowProps {
    grade: number | null
    sem: number | null
    type: string
    subjectName: string
    credit: number | null
    class: number | string
    Allcredit: number
}

export async function creditExcel() {
    const userSubjects = useStaSubjectStore.getState().userSubjects
    const teacher = useTeacherStore.getState().teacher
    const schoolinfo = useSchoolInfoStore.getState().schoolinfo

    const rowData1 = (): SemesterRow[] => {
        const filterSubjects = userSubjects.filter((item) => item.sub_type === '지정' || item.sub_type === '선택')
            .filter((sub) =>
                NOW_YEAR.some(
                    (period) =>
                        sub.sub_grade === period.grade &&
                        sub.sub_sem === period.sem &&
                        sub.year === period.year
                )
            );
        // 유니크한 과목명 추출
        const uniqueSubjectName = Array.from(
            new Set(filterSubjects.flatMap((sub) => sub.sub_teach?.map(t => t.subject)))
        ).filter(name => name && name.trim() !== '')

        const orederSubject = TEACHER_SUBJECT_GROUP.filter(sub => uniqueSubjectName.includes(sub))

        return orederSubject.map((subjectName) => {
            const semesterCredits: { [key: string]: number } = {};
            let total = 0;

            NOW_YEAR.forEach((period, _index) => {
                const key = `${period.grade}-${period.sem}`;

                const match = filterSubjects.filter(
                    (sub) =>
                        sub.sub_grade === period.grade &&
                        sub.sub_sem === period.sem &&
                        sub.year === period.year

                )

                const creditSum = match.reduce((acc, sub) => {
                    const sameSubjectCredits = sub.sub_teach?.filter(t => t.subject === subjectName)
                        .reduce((sum, t) => sum + t.credit, 0)
                    return acc + (sameSubjectCredits ?? 0);
                }, 0)

                semesterCredits[key] = creditSum;

                if (creditSum > 0) {
                    total += creditSum
                }
            })
            return {
                subjectName,
                ...semesterCredits,
                total
            }
        })
    }


    const schoolteacher = Object.values(teacher).reduce<Record<string, { all: number; outQuota: number, sum: number }>>(
        (acc, cur) => {
            const group = cur.Group;

            acc[group] ??= { all: 0, outQuota: 0, sum: 0 };
            acc[group].all += cur.all ?? 0;
            acc[group].outQuota += cur.outQuota ?? 0;
            acc[group].sum += cur.all + cur.outQuota

            return acc
        },
        {}
    )

    const sumCredit = (item: SemesterRow, sem: number) => {
        return (
            Number(item[`1-${sem}`]) + Number(item[`2-${sem}`]) + Number(item[`3-${sem}`])
        )
    }

    const averageCredit = (item: SemesterRow, sem: number) => {
        const teacherInfo = schoolteacher[item.subjectName ?? ''] || { sum: 1 };
        const teachNumber = teacherInfo.sum || 1;
        if (sem === 0) {
            return (
                Number((((sumCredit(item, 1) + sumCredit(item, 2)) / teachNumber) / 2).toFixed(1)) ?? 0
            )
        } else {
            return (
                Number((sumCredit(item, sem) / teachNumber).toFixed(1)) ?? 0
            )
        }
    }

    const workbook = new ExcelJs.Workbook()
    const sheet1 = workbook.addWorksheet('전체')
    const sheet2 = workbook.addWorksheet('과목별')

    const alignCenter: Partial<ExcelJs.Alignment> = {
        horizontal: 'center',
        vertical: 'middle',
    };

    // 전체 시트
    sheet1.mergeCells('A1:M1')
    const excelTitle1 = sheet1.getCell('A1')
    excelTitle1.value = `${YEARS[2]}년 전체 시수`
    excelTitle1.alignment = alignCenter
    excelTitle1.font = { bold: true, size: 14 }

    sheet1.mergeCells('A3:A4');
    sheet1.mergeCells('B3:B4');
    sheet1.getCell('A3').value = '교과(군)'
    sheet1.getCell('B3').value = '인원'
    sheet1.mergeCells('C3:G3')
    sheet1.mergeCells('H3:L3')
    sheet1.mergeCells('M3:M4')
    sheet1.getCell('C3').value = '1학기'
    sheet1.getCell('H3').value = '2학기'
    sheet1.getCell('M3').value = '평균'
    sheet1.getCell('C4').value = '1학년'
    sheet1.getCell('D4').value = '2학년'
    sheet1.getCell('E4').value = '3학년'
    sheet1.getCell('F4').value = '합계'
    sheet1.getCell('G4').value = '평균'
    sheet1.getCell('H4').value = '1학년'
    sheet1.getCell('I4').value = '2학년'
    sheet1.getCell('J4').value = '3학년'
    sheet1.getCell('K4').value = '합계'
    sheet1.getCell('L4').value = '평균'

    const data = rowData1()
    data.forEach((item, index) => {
        const rowIndex = 5 + index;
        const teacherInfo = schoolteacher[item.subjectName] || { sum: 0 };

        // A: 교과군, B: 인원
        sheet1.getCell(`A${rowIndex}`).value = item.subjectName;
        sheet1.getCell(`B${rowIndex}`).value = teacherInfo.sum;

        // 1학기 데이터 (C~G)
        sheet1.getCell(`C${rowIndex}`).value = item['1-1'] || 0;
        sheet1.getCell(`D${rowIndex}`).value = item['2-1'] || 0;
        sheet1.getCell(`E${rowIndex}`).value = item['3-1'] || 0;
        sheet1.getCell(`F${rowIndex}`).value = sumCredit(item, 1); // 학기 합계
        sheet1.getCell(`G${rowIndex}`).value = averageCredit(item, 1); // 학기 평균

        // 2학기 데이터 (H~L)
        sheet1.getCell(`H${rowIndex}`).value = item['1-2'] || 0;
        sheet1.getCell(`I${rowIndex}`).value = item['2-2'] || 0;
        sheet1.getCell(`J${rowIndex}`).value = item['3-2'] || 0;
        sheet1.getCell(`K${rowIndex}`).value = sumCredit(item, 2); // 학기 합계
        sheet1.getCell(`L${rowIndex}`).value = averageCredit(item, 2); // 학기 평균

        // M: 연간 평균
        sheet1.getCell(`M${rowIndex}`).value = averageCredit(item, 0);
    });

    // --- 스타일 일괄 적용 (표 테두리 및 정렬) ---
    const lastRow = 4 + data.length;
    for (let i = 1; i <= lastRow; i++) {
        const row = sheet1.getRow(i);
        row.eachCell((cell) => {
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            cell.alignment = alignCenter;
        });
    }

    // 헤더 색상 추가 (선택 사항)
    ['A3', 'B3', 'C3', 'H3', 'M3', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4', 'I4', 'J4', 'K4', 'L4'].forEach(key => {
        sheet1.getCell(key).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFF2F2F2' }
        };
    });

    // sheet2 start!
    const groupedData: Record<string, SubRowProps[]> = {}

    TEACHER_SUBJECT_GROUP.forEach(groupName => {
        const filterSubjects = userSubjects.filter((sub) =>
            NOW_YEAR.some(p => sub.sub_grade === p.grade && sub.sub_sem === p.sem && sub.year === p.year)
        );

        const matchData = filterSubjects.filter(item =>
            item.sub_teach?.some(teach => teach.subject === groupName)
        ).map(item => {
            const schoolClassNumber = Number(schoolinfo[`grade_${item.sub_grade}` as keyof typeof schoolinfo]) || 0;
            const targetTeach = item.sub_teach?.find(t => t.subject === groupName);
            const teachCredit = Number(targetTeach?.credit) || 0;

            let classResult: string | number = 0;
            if (item.sub_isgroup === '지정') {
                classResult = (Number(item.sub_credit) !== 0 && teachCredit / Number(item.sub_credit) === schoolClassNumber)
                    ? schoolClassNumber : '직접입력';
            } else {
                classResult = (item.sub_teach?.length === 1) ? (item.sub_class || 0) : '직접입력';
            }

            return {
                grade: item.sub_grade,
                sem: item.sub_sem,
                type: item.sub_type,
                subjectName: item.sub_name,
                credit: item.sub_credit,
                class: classResult,
                Allcredit: teachCredit
            };
        })

        if (matchData.length > 0) {
            // 학기 > 학년 순으로 정렬하여 저장
            groupedData[groupName] = matchData.sort((a, b) =>
                a.sem !== b.sem ? Number(a.sem) - Number(b.sem) : Number(a.grade) - Number(b.grade)
            );
        }


    })
    sheet2.mergeCells('A1:H1')
    const excelTitle2 = sheet2.getCell('A1')
    excelTitle2.value = `${YEARS[2]}년 과목별 학기별 전체 과목 시수 현황`
    excelTitle2.alignment = alignCenter
    excelTitle2.font = { bold: true, size: 14 }

    sheet2.getRow(3).values = ['과목(군)', '학기', '학년', '유형', '과목명', '학점', '개설학급', '총시수'];
    let currentRow = 4; // 데이터 시작 행

    Object.entries(groupedData).forEach(([groupName, rows]) => {
        const groupStartRow = currentRow;

        rows.forEach((row, _index) => {
            sheet2.addRow([
                groupName,
                `${row.sem}학기`,
                `${row.grade}학년`,
                row.type,
                row.subjectName,
                row.credit,
                row.class,
                row.Allcredit
            ]);
            currentRow++;
        });

        // --- 그룹별 병합 처리 ---
        // 1. 과목(군) 병합 (A열)
        if (rows.length > 1) {
            sheet2.mergeCells(`A${groupStartRow}:A${currentRow - 1}`);
        }

        // 2. 학기/학년 병합 (B, C열)은 그룹 내부에서 별도로 계산
        let semStart = groupStartRow;
        rows.forEach((row, index) => {
            const isLast = index === rows.length - 1;
            const nextRow = rows[index + 1];

            // 학기 병합 조건 (B열)
            if (isLast || row.sem !== nextRow.sem) {
                if (semStart !== groupStartRow + index) {
                    sheet2.mergeCells(`B${semStart}:B${groupStartRow + index}`);
                }
                semStart = groupStartRow + index + 1;
            }
        });
    });

    sheet2.getColumn(5).width = 25
    sheet2.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return; // 헤더 제외
        if (row.number === 2) {
            row.height = 10
        } else {
            row.height = 40
        }
        row.eachCell((cell) => {
            cell.alignment = alignCenter;
            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

            if (cell.value === '직접입력') {
                cell.font = { color: { argb: 'FFFF0000' }, bold: true };
            }
        });
    });
    const buffer = await workbook.xlsx.writeBuffer();

    const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })

    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = '시수표.xlsx'
    link.click()

    URL.revokeObjectURL(link.href);
}
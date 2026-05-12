import { Badge, Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui"
import { GET_SUBJECT_GROUP, SUBJECT_CODES_IN_ORDER } from "@/data/Curri/teacher"
import { useStaSubjectStore } from "@/store/StaSubjectStore"
import { useTeacherStore } from "@/store/TeacherStore"
import { BookOpen, Plus, Save, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

type CreditPopupProps = {
    onClose: () => void
    subjectName: string | null
    subjectCredit: number | null
    grade: number | null
    sem: number | null
    year: string
    type: string
    isGroup: string
}

interface RowData {
    id: number;
    subject: string
    credit: number
}

const initialData: RowData[] = [
    { id: 1, subject: '', credit: 0 }
]

export function CreditPopUp({ onClose, subjectName, subjectCredit, grade, sem, year, type, isGroup }: CreditPopupProps) {
    const userSubjects = useStaSubjectStore((state) => state.userSubjects)
    const inputUserSubject = useStaSubjectStore((state) => state.inputUserSubject)
    const teacher = useTeacherStore((state) => state.teacher)
    const [rows, setRows] = useState<RowData[]>(initialData)

    const schoolteacher = (Object.keys(teacher) as Array<keyof typeof teacher>)
        .filter(key => teacher[key].all !== 0 || teacher[key].outQuota !== 0)

    const schoolteacherORDER = SUBJECT_CODES_IN_ORDER
        .filter(sub => schoolteacher.includes(sub))
    // .map(item => SUBJECT_LABEL[item])
    // 콤보박스용 리스트
    const ALLTEACHER =
        ['', ...new Set(schoolteacherORDER
            .map(sub => GET_SUBJECT_GROUP(sub)))]
    // const ALLTEACHER = ['', ...new Set(SUBJECT_CODES_IN_ORDER.map(sub => getSubjectGroup(sub)))]
    const filterduserSubjects = userSubjects
        .filter(item =>
            item.year === year &&
            item.sub_grade === grade &&
            item.sub_sem === sem &&
            item.sub_name === subjectName)[0]

    useEffect(() => {
        if (!filterduserSubjects.sub_teach || filterduserSubjects.sub_teach.length === 0) {
            setRows(initialData)
        } else {
            let inData: RowData[] = []
            filterduserSubjects.sub_teach.map((item, idx) => {
                const row = { id: idx + 1, subject: item.subject, credit: item.credit }
                inData.push(row)
            })
            setRows(inData)
        }
    }, [])

    const handleSelectChange = (id: number, value: string) => {
        const isDuplicate = rows.some(row => row.id !== id && row.subject === value && value !== '')

        if (isDuplicate) {
            toast.error(`"${value}" 교과는 이미 목록에 있습니다.`)
            return
        }

        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === id ? { ...row, ['subject']: value } : row
            )
        )
    }

    const handleInputChange = (id: number, value: number) => {
        if (value < 0) return
        const otherRowsCredit = rows
            .filter(row => row.id !== id)
            .reduce((acc, cur) => acc + (Number(cur.credit) || 0), 0);
        const expectedTotal = otherRowsCredit + value;

        if (expectedTotal > Number(subjectCredit)) {
            toast.error(`학점은 ${subjectCredit}학점을 넘을 수 없습니다.`)
            return
        }
        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === id ? { ...row, ['credit']: value } : row
            )
        )
    }

    const totalCredit = rows.reduce((acc, cur) => {
        return acc + Number(cur.credit) || 0
    }, 0)

    const addRow = () => {
        const newRow: RowData = {
            id: rows.length + 1,
            subject: '',
            credit: 0
        }

        setRows([...rows, newRow])
    }

    const deleteRow = (deleteId: number) => {
        if (rows.length > 1) {
            const filteredRows = rows.filter(row => row.id !== deleteId);
            const reindexedRows = filteredRows.map((row, index) => ({
                ...row,
                id: index + 1 // 1부터 시작하는 새 ID 부여
            }));
            setRows(reindexedRows);

        } else {
            setRows(initialData)
        }
    }

    const saveData = () => {
        if (totalCredit !== Number(subjectCredit)) {
            toast.error(`설정 학점(${totalCredit})이 목표 학점(${subjectCredit})과 일치해야 합니다.`)
            return
        }

        const hasEmptySubject = rows.some(item => item.subject.trim() === '');
        if (hasEmptySubject) {
            toast.error('모든 행의 과목을 선택해주세요.');
            return; // 전체 함수 실행 중단
        }

        const teachData = rows.map(({ id, ...rest }) => rest) ?? []
        inputUserSubject(year, type, isGroup, subjectName ?? '', grade ?? 0, sem ?? 0, { sub_teach: teachData })
        toast.success('성공적으로 입력되었습니다.')
        onClose()
    }

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl p-6">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                        과목 상세 설정: {subjectName}
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                        해당 과목의 학점을 배분하고 담당 교과를 설정하는 화면입니다.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* 상단 학점 요약 정보 */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col items-center justify-center rounded-lg border bg-slate-50 p-4">
                            <span className="text-sm text-muted-foreground">목표 학점수</span>
                            <span className="text-2xl font-bold text-slate-900">{subjectCredit}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center rounded-lg border bg-blue-50 p-4">
                            <span className="text-sm text-blue-600 font-medium">설정 학점수</span>
                            <div className="flex items-center gap-2">
                                <span className={`text-2xl font-bold ${totalCredit === subjectCredit ? 'text-green-600' : 'text-orange-600'}`}>
                                    {totalCredit}
                                </span>
                                {totalCredit === subjectCredit && <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">일치</Badge>}
                            </div>
                        </div>
                    </div>

                    {/* 메인 설정 테이블 */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader className="bg-slate-50">
                                <TableRow>
                                    <TableHead className="w-6 text-center">번호</TableHead>
                                    <TableHead className="w-37 text-center">교과 선택</TableHead>
                                    <TableHead className="w-40">학점 배분</TableHead>
                                    <TableHead className="w-6"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow key={row.id}>
                                        <TableCell className="text-center font-medium text-muted-foreground">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>
                                            <Select
                                                value={row.subject}
                                                onValueChange={(value) => handleSelectChange(row.id, value)}
                                            >
                                                <SelectTrigger className="w-37">
                                                    <SelectValue placeholder="교과를 선택하세요" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {ALLTEACHER.filter(t => t !== '').map((t) => (
                                                        <SelectItem key={t} value={t}>{t}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell>
                                            <div className="relative">
                                                <Input
                                                    type="number"
                                                    value={row.credit}
                                                    onChange={(e) => handleInputChange(row.id, Number(e.target.value))}
                                                    className="pr-7 w-18"
                                                />
                                                <span className="absolute right-3 top-2 text-xs text-muted-foreground">학점</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => deleteRow(row.id)}
                                                className="text-slate-400 hover:text-destructive transition-colors"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <Button
                        variant="outline"
                        className="w-full border-dashed py-6 hover:bg-indigo-50 transition-all"
                        onClick={addRow}
                    >
                        <Plus className="mr-2 h-4 w-4" /> 행 추가하기
                    </Button>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="ghost" onClick={onClose}>
                        취소
                    </Button>
                    <Button
                        onClick={saveData}
                        className="bg-blue-600 hover:bg-blue-700 shadow-md"
                        disabled={totalCredit !== subjectCredit}
                    >
                        <Save className="mr-2 h-4 w-4" /> 설정 저장하기
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
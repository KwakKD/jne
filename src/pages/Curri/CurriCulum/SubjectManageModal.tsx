import { Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, Input, ScrollArea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { SUBJECT } from "@/data/Curri/subject";
import { useCurriTableStore } from "@/store/CurriSubjectStore";
import { Calendar, Info, List, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SubjectManagerModalProps {
    isOpen: boolean;           // 열림 상태 (불리언)
    onClose: () => void;      // 닫기 함수 (매개변수 없고 리턴값 없는 함수)
}

export const SubjectManagerModal = ({ isOpen, onClose }: SubjectManagerModalProps) => {
    const year = useCurriTableStore((state) => state.year);
    const userData = useCurriTableStore((state) => state.userData);
    const addSubject = useCurriTableStore((state) => state.addSubject);
    const delSubject = useCurriTableStore((state) => state.delSubject)

    const [activeTab, setActiveTab] = useState("add"); // 탭 제어를 위한 상태
    const [newSubject, setNewSubject] = useState({
        과목종류: '고시외',
        과목명: '',
        교과군: '',
        유형: '진로',
        기준학점: 4,
        최소학점: 2,
        최대학점: 6
    });

    const handleAdd = () => {
        const maxTag = Math.max(0, ...userData[year].AddSubject.map(s => s.Tag), SUBJECT.length);
        const tagNumber = maxTag + 1;

        if (!newSubject.과목명 || !newSubject.교과군) {
            toast.error("과목명과 교과군을 모두 입력해주세요.");
            return;
        } else {
            const duplicateSubject = [...SUBJECT.map(item => item.과목명), ...userData[year].AddSubject.map(item => item.과목명)]
            if (duplicateSubject.includes(newSubject.과목명)) {
                toast.error(`"${newSubject.과목명}" 과목은 이미 존재하는 과목명입니다.`)
                return
            }
        }

        if (newSubject.최대학점 < newSubject.최소학점) {
            toast.error('최소학점이 최대학점보다 클 수 없습니다.')
            return
        }
        if (newSubject.기준학점 < newSubject.최소학점 || newSubject.기준학점 > newSubject.최대학점) {
            toast.error('기준학점은 최소와 최대 사이에 있어야 합니다.')
            return
        }

        const subProps = newSubject.과목종류 === '고시외' ? '고시외' : (newSubject.과목종류 === '특목고' ? '특' : '전문')

        const newName = `(${subProps})${newSubject.과목명}`

        const newItem = {
            "과목명": newName,
            "교과군": newSubject.교과군,
            "유형": '진로',
            "기준학점": newSubject.기준학점,
            "Tag": tagNumber,
            "최소학점": newSubject.최소학점,
            "최대학점": newSubject.최대학점
        }

        addSubject(year, newItem)

        // 1. 과목 추가 실행
        // addCustomSubject(year, newSubject);

        // 2. 입력 폼 초기화
        setNewSubject({
            과목종류: '고시외',
            과목명: '',
            교과군: '',
            유형: '진로',
            기준학점: 4,
            최소학점: 2,
            최대학점: 6
        });

        toast.success("새 과목이 리스트에 추가되었습니다.");
        setActiveTab("manage"); // 추가 후 조회 탭으로 이동
    };

    const handleDel = (SubjectTag: number) => {

        // 1. 현재 편성표(학교지정 + 선택과목)에 사용 중인 데이터 수집
        const AllData = [...userData[year].학교지정, ...userData[year].선택과목];
        const AllDataTags = AllData.map(item => item.Tag);

        // 2. 편성표 사용 여부 확인 (사용 중이면 삭제 불가)
        if (AllDataTags.includes(SubjectTag)) {
            const findData = AllData.find(item => item.Tag === SubjectTag);
            const sectionName = findData?.Section === '지정' ? '학교지정' : '선택과목';

            toast.error(`"${findData?.SubjectName}" 과목은 이미 ${sectionName}에 포함되어 있습니다. 편성표에서 먼저 삭제해주세요.`);
            return;
        }
        delSubject(year, SubjectTag)
        toast.success("과목이 삭제되었습니다.");
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-150! w-[95vw]! h-175 flex flex-col p-2 overflow-hidden">
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle className="text-xl font-bold flex items-center gap-2">
                        <Plus className="text-indigo-600" size={22} />
                        과목 관리
                    </DialogTitle>
                    <DialogDescription className="sr-only">과목 관리 설명</DialogDescription>
                </DialogHeader>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                    <div className="px-6 pb-3 border-b items-center flex">
                        <TabsList className="flex w-full max-w-md h-24 bg-slate-100 p-1 rounded-xl gap-2">
                            <TabsTrigger value="add" className="flex items-center gap-2 font-bold h-full">
                                <Plus size={18} /> 과목 신규 추가
                            </TabsTrigger>
                            <TabsTrigger value="manage" className="flex items-center gap-2 font-bold h-full">
                                <List size={18} /> 추가과목 조회 및 삭제
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="add" className="flex-1 p-8 mt-0 overflow-y-auto">
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 gap-8">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">과목 종류</label>
                                    <Select value={newSubject.과목종류} onValueChange={(v) => setNewSubject({ ...newSubject, 과목종류: v })}>
                                        <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="특목고">특목고 과목</SelectItem>
                                            <SelectItem value="전문교과">전문교과</SelectItem>
                                            <SelectItem value="고시외">고시외 과목</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">과목명</label>
                                    <Input
                                        value={newSubject.과목명}
                                        placeholder="예: 로봇 소프트웨어 개발"
                                        className="bg-white"
                                        onChange={(e) => setNewSubject({ ...newSubject, 과목명: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">교과군</label>
                                    <Select onValueChange={(v) => setNewSubject({ ...newSubject, 교과군: v })}>
                                        <SelectTrigger className="bg-white"><SelectValue placeholder="선택" /></SelectTrigger>
                                        <SelectContent>
                                            {["국어", "수학", "영어", "사회", "과학", "체육", "예술", "기술∙가정/정보", "제2외국어/한문", "교양"].map(g => (
                                                <SelectItem key={g} value={g}>{g}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">유형 (고정)</label>
                                    <Input value="진로" disabled className="bg-slate-50 border-dashed" />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                {[['기준', '기준학점'], ['최소', '최소학점'], ['최대', '최대학점']].map(([label, key]) => (
                                    <div key={key} className="space-y-2 text-center">
                                        <label className="text-xs font-bold text-slate-500">{label}학점</label>
                                        <Input
                                            type="number"
                                            min={1}
                                            value={newSubject[key as keyof typeof newSubject]}
                                            onChange={(e) => setNewSubject({ ...newSubject, [key]: Number(e.target.value) })}
                                            className="bg-white text-center font-bold"
                                        />
                                    </div>
                                ))}
                            </div>

                            <Button onClick={handleAdd} className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-base font-bold shadow-lg shadow-indigo-100">
                                과목 리스트에 등록하기
                            </Button>
                            {/* 안내 문구 추가 */}
                            <p className="text-[12px] text-slate-600 text-center flex items-center justify-center gap-1">
                                <Info size={12} /> 추가된 과목은 편성표상의 가장 하단에 표시됩니다.
                            </p>
                        </div>
                    </TabsContent>

                    <TabsContent value="manage" className="flex-1 p-0 mt-0 overflow-hidden flex flex-col">
                        {/* 상단에 현재 연도 표시 섹션 추가 */}
                        <div className="px-6 py-3 bg-slate-50/50 border-b flex justify-between items-center">
                            <span className="text-sm font-bold text-slate-500 flex items-center gap-1">
                                <Calendar size={14} className="text-indigo-500" /> {year}학년도 교육과정
                            </span>
                            <span className="text-[13px] text-slate-600">
                                총 {userData[year].AddSubject.length}개 과목
                            </span>
                        </div>
                        <ScrollArea className="flex-1 px-6">
                            <div className="py-6 space-y-3">
                                {userData[year].AddSubject.length === 0 ? (
                                    <div className="text-center py-20 text-slate-400">등록된 추가 과목이 없습니다.</div>
                                ) : (
                                    userData[year].AddSubject.map((subject) => {
                                        // 1. 과목명에서 (구분) 추출 및 순수 과목명 분리
                                        const match = subject.과목명.match(/^\((.*?)\)(.*)$/);
                                        const categoryRaw = match ? match[1] : ""; // '고시외', '특', '전문' 추출
                                        const pureSubjectName = match ? match[2] : subject.과목명; // 실제 과목명 추출

                                        // 2. '특' -> '특목고', '전문' -> '전문교과' 등으로 표시용 텍스트 변환
                                        const displayCategory =
                                            categoryRaw === '고시외' ? '고시외' :
                                                categoryRaw === '특' ? '특목고' :
                                                    categoryRaw === '전문' ? '전문교과' : '기타';

                                        return (
                                            <div key={subject.Tag} className="flex items-center justify-between p-4 bg-white border rounded-xl hover:border-indigo-200 transition-all group">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        {/* 첫 번째 span: 구분 명칭 */}
                                                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-md border border-indigo-100 whitespace-nowrap">
                                                            {displayCategory}
                                                        </span>
                                                        {/* 두 번째 span: 순수 과목명 */}
                                                        <span className="font-bold text-slate-800">
                                                            {pureSubjectName}
                                                        </span>
                                                    </div>
                                                    <div className="text-xs text-slate-500">
                                                        {subject.교과군} | {subject.유형} | 기준 {subject.기준학점}학점 ({subject.최소학점}~{subject.최대학점})
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleDel(subject.Tag)}
                                                    className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </ScrollArea>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};
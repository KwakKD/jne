import { useState, useMemo } from 'react';
import { Search, Library, Settings2 } from 'lucide-react';
import { SUBJECT } from '@/data/Curri/subject';
import { Input, ScrollArea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { DraggableSubject } from './DraggableSubject';
import { useCurriTableStore } from '@/store/CurriSubjectStore';
import { SubjectManagerModal } from './SubjectManageModal';

const SubjectLibrary = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("all");
    const [selectedType, setSelectedType] = useState("all");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const year = useCurriTableStore((state) => state.year)
    const userData = useCurriTableStore((state) => state.userData)
    const addSubjects = userData[year].AddSubject
    const totalSubject = [...SUBJECT, ...addSubjects]

    const filteredSubjects = useMemo(() => {
        return totalSubject.filter(subject => {
            const matchesSearch = subject.과목명.includes(searchTerm);
            const matchesGroup = selectedGroup === "all" || subject.교과군 === selectedGroup;
            const matchesType = selectedType === "all" || subject.유형 === selectedType;
            return matchesSearch && matchesGroup && matchesType;
        });
    }, [searchTerm, selectedGroup, selectedType]);

    return (
        // <aside className="w-66 bg-white border-r border-slate-200 flex flex-col h-full overflow-hidden">
        <>
            <div className="flex-none p-5 border-b border-slate-100 space-y-4 bg-white">
                <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-indigo-600 rounded-lg text-white shadow-sm">
                        <Library size={18} />
                    </div>
                    <h3 className="font-bold text-slate-900">과목 리스트</h3>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-200 hover:bg-indigo-100 text-slate-600 hover:text-indigo-600 rounded-lg text-xs font-bold transition-all group"
                    >
                        <Settings2 size={14} className="group-hover:rotate-45 transition-transform" />
                        과목 관리
                    </button>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10" size={14} />
                    <Input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="과목명 검색..."
                        className="pl-9 bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-all"
                    />
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                        <SelectTrigger className="h-9 text-xs bg-slate-50 border-none">
                            <SelectValue placeholder="교과군" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">모든 교과군</SelectItem>
                            <SelectItem value="국어">국어</SelectItem>
                            <SelectItem value="수학">수학</SelectItem>
                            <SelectItem value="영어">영어</SelectItem>
                            <SelectItem value="사회">사회</SelectItem>
                            <SelectItem value="과학">과학</SelectItem>
                            <SelectItem value="체육">체육</SelectItem>
                            <SelectItem value="예술">예술</SelectItem>
                            <SelectItem value="기술∙가정/정보">기술∙가정/정보</SelectItem>
                            <SelectItem value="제2외국어/한문">제2외국어/한문</SelectItem>
                            <SelectItem value="교양">교양</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={selectedType} onValueChange={setSelectedType}>
                        <SelectTrigger className="h-9 text-xs bg-slate-50 border-none">
                            <SelectValue placeholder="유형" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">모든 유형</SelectItem>
                            <SelectItem value="공통">공통</SelectItem>
                            <SelectItem value="일반">일반</SelectItem>
                            <SelectItem value="융합">융합</SelectItem>
                            <SelectItem value="진로">진로</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex-1 min-h-0">
                <ScrollArea className="h-full bg-slate-50/30">
                    <div className="p-4 space-y-2">
                        <div className="flex justify-between items-center px-1 mb-3">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                Results: {filteredSubjects.length}
                            </span>
                        </div>

                        {filteredSubjects.map((subject) => (
                            <div key={subject.Tag} className="flex items-center gap-2 group">

                                <div className="flex-1">
                                    <DraggableSubject
                                        subject={subject}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>
            <SubjectManagerModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
        // </aside>
    );
};

export { SubjectLibrary }
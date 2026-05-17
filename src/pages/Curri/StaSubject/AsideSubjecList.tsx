import { Input, ScrollArea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { SUBJECT } from "@/data/Curri/subject";
import { cn } from "@/lib/utils";
import { useStaSubjectPageStore } from "@/store/StaSubjectPage";
import { Library, Search } from "lucide-react"
import { useMemo, useState } from "react";

const AsideSubjectList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("all");
    const [selectedType, setSelectedType] = useState("all");
    const selectedSubject = useStaSubjectPageStore((state)=>state.selectedSubject)
    const setSelectedSubject = useStaSubjectPageStore((state)=>state.setSelectedSubject)

    const filteredSubjects = useMemo(() => {
        return SUBJECT.filter(sub => {
            const matchesSearch = sub.과목명.includes(searchTerm);
            const matchesGroup = selectedGroup === "all" || sub.교과군 === selectedGroup;
            const matchesType = selectedType === "all" || sub.유형 === selectedType;
            return matchesSearch && matchesGroup && matchesType;
        })
    }, [searchTerm, selectedGroup, selectedType])


    return (
        <>
            <div className="flex-none p-5 border-b border-slate-100 space-y-4 bg-white">
                <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-indigo-600 rounded-lg text-white shadow-sm">
                        <Library size={18} />
                    </div>
                    <h3 className="font-bold text-slate-900">과목 리스트</h3>
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
            <div className="flex-1 min-h-0 relative">
                <ScrollArea className="h-full bg-slate-50/30">
                    <div className="p-4 space-y-2">
                        <div className="flex justify-between items-center px-1 mb-3">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                Results: {filteredSubjects.length}
                            </span>
                        </div>
                        {filteredSubjects.map((subject) => {
                            const isSelected = selectedSubject === subject.과목명;

                            return (
                                <button
                                    key={subject.Tag}
                                    onClick={() => setSelectedSubject(subject.과목명)}
                                    className={cn(
                                        "w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left group border",
                                        isSelected
                                            ? "bg-white border-indigo-200 shadow-md translate-x-1"
                                            : "bg-transparent border-transparent hover:bg-white hover:border-slate-200 hover:shadow-sm"
                                    )}
                                >
                                    {/* 왼쪽 인디케이터 바 */}
                                    <div className={cn(
                                        "w-1 h-6 rounded-full transition-all",
                                        isSelected ? "bg-indigo-600" : "bg-slate-200 group-hover:bg-slate-300"
                                    )} />

                                    <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className={cn(
                                                "text-[10px] font-bold uppercase tracking-tight",
                                                isSelected ? "text-indigo-500" : "text-slate-400"
                                            )}>
                                                {subject.교과군}
                                            </span>
                                            {/* 유형 뱃지 추가 */}
                                            <span className={cn(
                                                "text-[9px] px-1.5 py-0.5 rounded-md font-medium",
                                                isSelected ? "bg-indigo-50 text-indigo-600" : "bg-slate-100 text-slate-500"
                                            )}>
                                                {subject.유형}
                                            </span>
                                        </div>
                                        <p className={cn(
                                            "text-sm font-bold truncate",
                                            isSelected ? "text-indigo-900" : "text-slate-700"
                                        )}>
                                            {subject.과목명}
                                        </p>
                                    </div>

                                    {/* 오른쪽 선택 표시 아이콘 */}
                                    <div className={cn(
                                        "transition-all duration-300 transform",
                                        isSelected ? "opacity-100 scale-100" : "opacity-0 scale-50"
                                    )}>
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(79,70,229,0.6)]" />
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </ScrollArea>
            </div>
        </>
    )

}

export { AsideSubjectList }
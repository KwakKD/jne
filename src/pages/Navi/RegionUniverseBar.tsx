import { GraduationCap } from "lucide-react"; // 아이콘 변경 추천
import { useState } from "react";
import { UNIV_INDEX_LIST } from "@/data/naviUniverse";

interface UnivIndexSidebarProps {
    onIndexChange: (id: string) => void
}

export function UnivIndexSidebar({ onIndexChange }: UnivIndexSidebarProps) {
    const [activeId, setActiveId] = useState("all");

    const handleSelect = (id: string) => {
        setActiveId(id);
        onIndexChange?.(id);
    };

    return (
        <aside className="w-full lg:w-64 shrink-0">
            <div className="sticky top-24 bg-white rounded-[2.5rem] p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-6 px-1">
                    <GraduationCap size={20} className="text-blue-600" />
                    <h3 className="font-black text-slate-900 text-lg">대학명 찾기</h3>
                </div>

                {/* 3열 그리드 레이아웃 (글자가 짧으므로 3열이 더 예쁩니다) */}
                <div className="grid grid-cols-3 gap-2">
                    {UNIV_INDEX_LIST.map((idx) => (
                        <button
                            key={idx.id}
                            onClick={() => handleSelect(idx.id)}
                            className={`
                                py-3 rounded-2xl text-sm font-bold transition-all
                                ${activeId === idx.id
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "bg-slate-50 text-slate-500 hover:bg-slate-100 border border-transparent"
                                }
                                ${idx.id === "all" ? "col-span-3" : ""} 
                            `}
                        >
                            {idx.name}
                        </button>
                    ))}
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100">
                    <p className="text-[12px] text-slate-400 leading-relaxed px-1">
                        * 대학명의 첫 글자를 선택하시면 해당 초성으로 시작하는 대학 목록을 확인할 수 있습니다.
                    </p>
                </div>
            </div>
        </aside>
    );
}
import { NAV_UNIVERSE_REGIONS } from "@/data/naviUniverse";
import { MapPin } from "lucide-react";
import { useState } from "react";

interface RegionSidebarProps {
    onRegionChange: (id: string) => void
}

export function RegionSidebar({ onRegionChange }:RegionSidebarProps) {
    const [activeId, setActiveId] = useState("all");

    const handleSelect = (id: string) => {
        setActiveId(id);
        onRegionChange?.(id); // 부모 컴포넌트(NaviUniver)로 선택된 지역 전달
    };

    return (
        <aside className="w-full lg:w-72 shrink-0">
            <div className="sticky top-24 bg-white rounded-[2.5rem] p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-6 px-1">
                    <MapPin size={20} className="text-blue-600" />
                    <h3 className="font-black text-slate-900 text-lg">지역 선택</h3>
                </div>

                {/* 2열 그리드 레이아웃 */}
                <div className="grid grid-cols-2 gap-2">
                    {NAV_UNIVERSE_REGIONS.map((region) => (
                        <button
                            key={region.id}
                            onClick={() => handleSelect(region.id)}
                            className={`
                py-3 px-2 rounded-2xl text-sm font-bold transition-all
                ${activeId === region.id
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "bg-slate-50 text-slate-500 hover:bg-slate-100 border border-transparent"
                                }
                ${region.id === "all" ? "col-span-2" : ""} // '전체' 버튼은 가로로 길게
              `}
                        >
                            {region.name}
                        </button>
                    ))}
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100">
                    <p className="text-[12px] text-slate-400 leading-relaxed px-1">
                        * 지역을 선택하면 해당 지역 소재 대학의 권장과목 데이터를 확인하실 수 있습니다.
                    </p>
                </div>
            </div>
        </aside>
    );
}
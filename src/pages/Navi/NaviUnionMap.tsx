import mapImage from './map.png'

const jnLocations = ["목포시", "여수시", "순천시", "나주시", "광양시", "담양군", "곡성군", "구례군", "고흥군", "보성군", "화순군", "장흥군", "강진군", "해남군", "영암군", "무안군", "함평군", "영광군", "장성군", "완도군", "진도군", "신안군"];

const locationCoords: Record<string, { top: string; left: string }> = {
    "목포시": { top: '55.4%', left: '29.1%' },
    "여수시": { top: '57.2%', left: '86.9%' },
    "순천시": { top: '40.9%', left: '74.2%' },
    "나주시": { top: '41.3%', left: '43.1%' },
    "무안군": { top: '46.9%', left: '31.1%' },
    "신안군": { top: '48.4%', left: '11.0%' },
    "진도군": { top: '84.1%', left: '20.4%' },
    "완도군": { top: '90.9%', left: '41%' },
    "장성군": { top: '15.3%', left: '45.2%' },
    "영광군": { top: '20.4%', left: '31%' },
    "함평군": { top: '30.4%', left: '34.6%' },
    "영암군": { top: '58.9%', left: '37.1%' },
    "해남군": { top: '75%', left: '34.9%' },
    "강진군": { top: '66.4%', left: '45.3%' },
    "장흥군": { top: '60.6%', left: '52%' },
    "화순군": { top: '39.4%', left: '57%' },
    "보성군": { top: '55%', left: '63.8%' },
    "고흥군": { top: '71.2%', left: '69.8%' },
    "구례군": { top: '22.0%', left: '79.4%' },
    "곡성군": { top: '22%', left: '67.7%' },
    "담양군": { top: '16%', left: '55.6%' },
    "광양시": { top: '38.2%', left: '86.3%' },

    // ... 나머지 지역들도 이런 식으로 추가
};

interface MapProps {
    selectedLocations: string[]
    toggleLocation: (loc: string) => void;
    setAllLocations: (select: boolean) => void;
    locationCounts: Record<string, number>;
}

function NaviUnionMap({ selectedLocations, toggleLocation, setAllLocations, locationCounts }: MapProps) {
    const isAllSelected = selectedLocations.length === jnLocations.length;
    return (
        <div className="relative w-full bg-slate-50 rounded-[2.5rem] border-2 border-slate-100 overflow-hidden group shadow-inner">
            <img
                src={mapImage}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                alt="전라남도 지도"
            // onClick={(e) => {
            //     const rect = e.currentTarget.getBoundingClientRect();
            //     const x = ((e.clientX - rect.left) / rect.width) * 100;
            //     const y = ((e.clientY - rect.top) / rect.height) * 100;
            //     console.log(`left: "${x.toFixed(1)}%", top: "${y.toFixed(1)}%"`);
            // }}
            />
            <div className="absolute top-4 left-4 z-30">
                <button
                    onClick={() => setAllLocations(!isAllSelected)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-black transition-all shadow-lg border flex items-center gap-1.5
                        ${isAllSelected
                            ? "bg-slate-800 text-white border-slate-900 hover:bg-slate-700"
                            : "bg-white/90 backdrop-blur-sm text-slate-700 border-slate-200 hover:border-orange-500 hover:text-orange-600"
                        }`}
                >
                    <div className={`w-2 h-2 rounded-full ${isAllSelected ? "bg-orange-400 animate-pulse" : "bg-slate-300"}`} />
                    {isAllSelected ? "전체 해제" : "전체 선택"}
                </button>
            </div>
            {jnLocations.map((loc) => {
                const coords = locationCoords[loc] || { top: '50%', left: '50%' };
                const isActive = selectedLocations.includes(loc);
                const count = locationCounts[loc] || 0;

                return (
                    <button
                        key={loc}
                        onClick={() => toggleLocation(loc)}
                        style={{ top: coords.top, left: coords.left }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-xl text-[10px] font-black transition-all shadow-md border whitespace-nowrap
              ${isActive
                                ? "bg-orange-500 text-white border-orange-600 scale-110 z-20 shadow-orange-200"
                                : "bg-orange-100 text-slate-600 border-slate-100 hover:text-orange-600 hover:border-orange-200 z-10"
                            }`}
                    >
                        {loc}
                        {count > 0 && (
                            <span className={`absolute -top-2 -right-2 flex h-4 min-w-[1rem] items-center justify-center rounded-full px-1 text-[9px] font-bold shadow-sm ring-1 ring-white
                                ${isActive ? "bg-slate-900 text-white" : "bg-orange-500 text-white"}
                            `}>
                                {count}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    )
}

export { NaviUnionMap }
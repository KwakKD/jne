const MiniStatCard = ({ label, value, color }: { label: string, value: string, color: string }) => {
    // 테마별 색상 조합 (그라데이션 및 강조색)
    const colorConfigs: any = {
        emerald: {
            bar: "bg-emerald-500",
            light: "bg-emerald-50",
            text: "text-emerald-600",
            shadow: "shadow-emerald-100/50"
        },
        rose: {
            bar: "bg-rose-500",
            light: "bg-rose-50",
            text: "text-rose-600",
            shadow: "shadow-rose-100/50"
        },
        indigo: {
            bar: "bg-indigo-500",
            light: "bg-indigo-50",
            text: "text-indigo-600",
            shadow: "shadow-indigo-100/50"
        },
    };

    const config = colorConfigs[color] || colorConfigs.indigo;

    return (
        <div className={`
            group relative flex items-center gap-4 p-4 
            bg-white rounded-[2rem] border border-slate-100 
            shadow-sm hover:shadow-xl hover:${config.shadow} 
            transition-all duration-300 cursor-default
        `}>
            {/* 좌측 액센트 바 + 배경 장식 */}
            <div className="relative flex flex-col items-center">
                <div className={`w-1.5 h-10 ${config.bar} rounded-full transition-transform group-hover:scale-y-110`} />
                {/* 배경에 살짝 비치는 동그란 원형 장식 (디테일) */}
                <div className={`absolute -z-10 w-8 h-8 ${config.light} rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
            </div>

            <div className="flex-1">
                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-0.5">
                    {label}
                </p>
                <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black text-slate-900 tracking-tighter">
                        {value}
                    </span>
                    {/* 수치 변화가 있다면 추가될 작은 인디케이터 (데코용) */}
                    <span className={`text-[10px] font-bold ${config.text} opacity-0 group-hover:opacity-100 transition-opacity`}>
                        Live
                    </span>
                </div>
            </div>

            {/* 마우스 오버 시 우측 상단에 살짝 나타나는 광택 효과 */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/20 to-transparent rounded-tr-[2rem] pointer-events-none" />
        </div>
    );
};

export { MiniStatCard }
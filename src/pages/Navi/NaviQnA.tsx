
function NaviQnA() {
    return (
        <div className="h-screen bg-slate-50/50 flex flex-col overflow-hidden">
            <section className="relative h-52 flex items-center justify-center overflow-hidden bg-slate-700">
                {/* 백그라운드 추상화 패턴 (이미지 대신 그라데이션 강조) */}
                <div className="absolute inset-0 opacity-40">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] rounded-full bg-blue-600/20 blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] rounded-full bg-emerald-600/10 blur-[120px]" />
                </div>

                <div className="relative z-20 text-center px-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Help & Support</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
                        자주하는 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">질문</span>
                    </h1>

                    <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto font-medium leading-relaxed">
                        원하는 답변을 찾지 못하셨나요? <br />
                        핵심적인 궁금증을 카테고리별로 정리해 두었습니다.
                    </p>
                </div>
            </section>
        </div>
    )
}

export { NaviQnA }
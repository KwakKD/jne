
export const CurriculumPreview = () => {

    // 데이터 생략 (동일)
    const exampleData = Array.from({ length: 20 }, (_, i) => ({
        category: i % 2 === 0 ? "기초" : "탐구",
        subject: i % 2 === 0 ? `과목 ${i + 1}` : `선택 과목 ${i + 1}`,
        unit: 4,
        grade1: "4",
        grade2: "",
        grade3: ""
    }));

    return (
        <div className="flex-1 flex flex-col h-full p-10 overflow-hidden">
            {/* 1. 실제 스크롤이 발생하는 컨테이너 */}
            <div className="flex-1 overflow-y-auto border rounded-xl border-slate-200 bg-white custom-scrollbar relative">

                <table className="w-full border-separate border-spacing-0">
                    <thead className="relative z-20">
                        {/* 첫 번째 헤더 줄 */}
                        <tr className="bg-slate-50">
                            {/* h-12 (48px) 정도로 높이를 고정하여 두 번째 줄의 top 값을 계산하기 쉽게 합니다. */}
                            <th className="sticky top-0 z-30 h-12 border-b border-r bg-slate-50 px-4 text-center text-sm font-bold text-slate-700 first:rounded-tl-xl">구분</th>
                            <th className="sticky top-0 z-30 h-12 border-b border-r bg-slate-50 px-4 text-center text-sm font-bold text-slate-700">교과(군)</th>
                            <th className="sticky top-0 z-30 h-12 border-b border-r bg-slate-50 px-4 text-center text-sm font-bold text-slate-700">단위</th>
                            <th colSpan={2} className="sticky top-0 z-30 h-12 border-b border-r bg-slate-50 px-4 text-center text-sm font-bold text-slate-700">1학년</th>
                            <th colSpan={2} className="sticky top-0 z-30 h-12 border-b border-r bg-slate-50 px-4 text-center text-sm font-bold text-slate-700">2학년</th>
                            <th colSpan={2} className="sticky top-0 z-30 h-12 border-b bg-slate-50 px-4 text-center text-sm font-bold text-slate-700 last:rounded-tr-xl">3학년</th>
                        </tr>

                        {/* 두 번째 헤더 줄 (학기 표시) */}
                        <tr className="bg-slate-50">
                            {/* 첫 번째 줄의 높이가 48px(h-12)이므로 top-[48px]를 줍니다. */}
                            <th className="sticky top-12 z-30 h-10 border-b border-r bg-slate-50 px-2"></th>
                            <th className="sticky top-12 z-30 h-10 border-b border-r bg-slate-50 px-2"></th>
                            <th className="sticky top-12 z-30 h-10 border-b border-r bg-slate-50 px-2"></th>
                            {[1, 2, 1, 2, 1, 2].map((sem, idx) => (
                                <th key={idx} className="sticky top-12 z-30 h-10 border-b border-r last:border-r-0 bg-slate-50 px-2 text-center text-[11px] font-bold text-indigo-500">
                                    {sem}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="bg-white">
                        {exampleData.map((item, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                <td className="border-b border-r p-3 text-center text-[11px] text-slate-500">{item.category}</td>
                                <td className="border-b border-r p-3 text-center font-bold text-slate-800">{item.subject}</td>
                                <td className="border-b border-r p-3 text-center text-slate-600">{item.unit}</td>
                                <td className="border-b border-r p-3 text-center bg-indigo-50/10">{item.grade1}</td>
                                <td className="border-b border-r p-3 text-center bg-indigo-50/10">{item.grade1}</td>
                                <td className="border-b border-r p-3 text-center">{item.grade2}</td>
                                <td className="border-b border-r p-3 text-center">{item.grade2}</td>
                                <td className="border-b border-r p-3 text-center">{item.grade3}</td>
                                <td className="border-b p-3 text-center">{item.grade3}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
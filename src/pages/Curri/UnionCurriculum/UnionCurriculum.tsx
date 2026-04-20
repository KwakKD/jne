import { Plus, Save, Trash2 } from "lucide-react";

const jointSubjects = [
    {
        id: '1234',
        category: '거점형',
        subjectName: '예시1과목',
        grade: '1',
        semester: '1',
        credit: 3,
        location: '우리학교'
    }
]

const UnionCurriculum = () => {
    return (
        <div className="p-6 bg-white min-h-screen">
            {/* 페이지 헤더 */}
            <div className="flex justify-between items-end mb-6 border-b-2 border-slate-800 pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">공동교육과정 편성 관리</h1>
                    <p className="text-sm text-slate-500 mt-1">우리 학교에서 운영하거나 타교와 연계된 공동교육과정을 입력하세요.</p>
                </div>
                <button
                    // onClick={addSubject}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-all text-sm font-bold shadow-sm"
                >
                    <Plus size={16} /> 과목 추가
                </button>
            </div>

            {/* 입력 테이블 */}
            <div className="overflow-hidden border border-slate-300 rounded-sm shadow-sm">
                <table className="w-full border-collapse bg-white text-sm">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-300 text-slate-700">
                            <th className="px-3 py-3 border-r border-slate-200 w-32 font-semibold">운영 유형</th>
                            <th className="px-3 py-3 border-r border-slate-200 font-semibold">과목명</th>
                            <th className="px-3 py-3 border-r border-slate-200 w-24 font-semibold">대상학년</th>
                            <th className="px-3 py-3 border-r border-slate-200 w-28 font-semibold">학기</th>
                            <th className="px-3 py-3 border-r border-slate-200 w-20 font-semibold">학점</th>
                            <th className="px-3 py-3 border-r border-slate-200 font-semibold">운영교/장소</th>
                            <th className="px-3 py-3 w-16 font-semibold">관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jointSubjects.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="py-20 text-center text-slate-400 italic bg-slate-50/30">
                                    등록된 과목이 없습니다. '과목 추가' 버튼을 눌러 입력을 시작하세요.
                                </td>
                            </tr>
                        ) : (
                            jointSubjects.map((sub) => (
                                <tr key={sub.id} className="border-b border-slate-200 hover:bg-indigo-50/20 transition-colors">
                                    {/* 유형 선택 */}
                                    <td className="p-0 border-r border-slate-200">
                                        <select
                                            value={sub.category}
                                            // onChange={(e) => updateSubject(sub.id, 'category', e.target.value)}
                                            className="w-full h-10 px-2 bg-transparent focus:outline-none focus:bg-white focus:ring-1 focus:ring-inset focus:ring-indigo-500"
                                        >
                                            <option value="">선택</option>
                                            <option value="거점형">거점형</option>
                                            <option value="연합형">연합형</option>
                                            <option value="온라인">온라인</option>
                                            <option value="지역사회">지역사회</option>
                                        </select>
                                    </td>
                                    {/* 과목명 입력 */}
                                    <td className="p-0 border-r border-slate-200">
                                        <input
                                            type="text"
                                            value={sub.subjectName}
                                            // onChange={(e) => updateSubject(sub.id, 'subjectName', e.target.value)}
                                            placeholder="과목명을 입력하세요"
                                            className="w-full h-10 px-3 bg-transparent focus:outline-none focus:bg-white focus:ring-1 focus:ring-inset focus:ring-indigo-500 font-medium"
                                        />
                                    </td>
                                    {/* 대상 학년 */}
                                    <td className="p-0 border-r border-slate-200">
                                        <select
                                            value={sub.grade}
                                            // onChange={(e) => updateSubject(sub.id, 'grade', e.target.value)}
                                            className="w-full h-10 px-2 bg-transparent text-center focus:outline-none focus:bg-white"
                                        >
                                            <option value="">학년</option>
                                            <option value="1">1학년</option>
                                            <option value="2">2학년</option>
                                            <option value="3">3학년</option>
                                            <option value="공통">공통</option>
                                        </select>
                                    </td>
                                    {/* 학기 */}
                                    <td className="p-0 border-r border-slate-200">
                                        <select
                                            value={sub.semester}
                                            // onChange={(e) => updateSubject(sub.id, 'semester', e.target.value)}
                                            className="w-full h-10 px-2 bg-transparent text-center focus:outline-none focus:bg-white"
                                        >
                                            <option value="">학기</option>
                                            <option value="1">1학기</option>
                                            <option value="2">2학기</option>
                                            <option value="여름">여름방학</option>
                                            <option value="겨울">겨울방학</option>
                                        </select>
                                    </td>
                                    {/* 학점 */}
                                    <td className="p-0 border-r border-slate-200">
                                        <input
                                            type="number"
                                            value={sub.credit || ''}
                                            // onChange={(e) => updateSubject(sub.id, 'credit', Number(e.target.value))}
                                            className="w-full h-10 px-2 bg-transparent text-center focus:outline-none focus:bg-white font-bold text-indigo-600"
                                        />
                                    </td>
                                    {/* 운영 장소 */}
                                    <td className="p-0 border-r border-slate-200">
                                        <input
                                            type="text"
                                            value={sub.location}
                                            // onChange={(e) => updateSubject(sub.id, 'location', e.target.value)}
                                            placeholder="학교명 또는 장소"
                                            className="w-full h-10 px-3 bg-transparent focus:outline-none focus:bg-white text-slate-600"
                                        />
                                    </td>
                                    {/* 삭제 버튼 */}
                                    <td className="text-center">
                                        <button
                                            // onClick={() => 
                                            //     deleteSubject(sub.id)
                                            // }
                                            className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* 하단 요약 및 저장 */}
            <div className="mt-6 flex justify-between items-center bg-slate-50 p-4 rounded-sm border border-slate-200">
                <div className="text-sm text-slate-600">
                    총 <span className="font-bold text-indigo-600">
                        {/* {jointSubjects.length} */}
                        </span>개 과목 편성됨
                </div>
                <button className="flex items-center gap-2 bg-slate-800 text-white px-6 py-2 rounded-md hover:bg-slate-900 transition-all font-bold">
                    <Save size={18} /> 편성 결과 저장
                </button>
            </div>
        </div>
    );
}

export { UnionCurriculum }
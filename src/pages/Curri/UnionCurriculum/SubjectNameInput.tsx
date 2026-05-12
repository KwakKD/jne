import { NAVI_SUBJECT_DATA } from "@/data/nav";

interface SubjectNameInputProps {
    value: string
    onChange: (value: string) => void
    isCustom: boolean
    isDuplicate: boolean
}

export const SubjectNameInput = ({ value, onChange, isCustom, isDuplicate }: SubjectNameInputProps) => {
    return (
        <>
            <input
                list={isCustom ? undefined : "navi-subjects"}
                value={value || ''} // undefined 방어
                onChange={(e) => onChange(e.target.value)}
                placeholder={isCustom ? "직접 입력하세요" : "과목명 검색 (ex: 물리학 실험)"}
                className={`w-70 p-1 font-bold border-b-2 outline-none transition-all
                        ${isDuplicate || (!value?.trim())
                        ? "border-red-500 bg-red-50 text-red-700" // 중복이거나 비어있을 때
                        : "border-transparent focus:border-indigo-500 text-slate-800" // 정상일 때
                    }`}
            />
            {!isCustom && (
                <datalist id="navi-subjects">
                    {NAVI_SUBJECT_DATA.map((d) => (
                        <option key={d.subjectName} value={d.subjectName}>
                            {d.subjectGroup}
                        </option>
                    ))}
                </datalist>
            )}
        </>
    );
};
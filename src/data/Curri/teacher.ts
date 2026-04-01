const TEACHER_SUBJECT_GROUP = [
    '국어', '수학', '영어',
    '사회', '과학',
    '체육', '음악', '미술',
    '기술', '가정', '정보',
    '독일어', '프랑스어', '스페인어', '중국어', '일본어',
    '한문', '교육학', '환경', '기타',
    '진로전담',
    '특수', '보건', '영양', '사서', '전문상담'
]

const SUBJECT_LABEL = {
    kor: "국어",
    math: "수학",
    eng: "영어",

    ethics: "도덕",
    history: "역사",
    geography: "지리",
    socialStudies: "일반사회",

    physics: "물리",
    chemistry: "화학",
    biology: "생물",
    earthScience: "지구과학",

    pe: "체육",
    music: "음악",
    art: "미술",

    tech: "기술",
    homeEconomics: "가정",
    info: "정보",

    german: "독일어",
    french: "프랑스어",
    spanish: "스페인어",
    chinese: "중국어",
    japanese: "일본어",

    classics: "한문",
    // military: "교련",
    education: "교육학",
    environment: "환경",
    etc: "기타",

    career: "진로전담",

    specialEd: "특수",
    health: "보건",
    nutrition: "영양",
    librarian: "사서",
    counselor: "전문상담",
} as const;

// ✅ SubjectCode 타입 (영어 코드 유니온)
export type SubjectCode = keyof typeof SUBJECT_LABEL;

const SUBJECT_GROUP_OVERRIDES: Partial<Record<SubjectCode, string>> = {
    // 사회 계열
    ethics: "사회",
    history: "사회",
    geography: "사회",
    socialStudies: "사회",

    // 과학 계열
    physics: "과학",
    chemistry: "과학",
    biology: "과학",
    earthScience: "과학",
};

const GET_SUBJECT_GROUP = (code: SubjectCode): string => {
    if (SUBJECT_GROUP_OVERRIDES[code]) return SUBJECT_GROUP_OVERRIDES[code]!;
    return SUBJECT_LABEL[code]

}

const SUBJECT_CODES_IN_ORDER: SubjectCode[] = [
    "kor",
    "math",
    "eng",
    "ethics",
    "history",
    "geography",
    "socialStudies",
    "physics",
    "chemistry",
    "biology",
    "earthScience",
    "pe",
    "music",
    "art",
    "tech",
    "homeEconomics",
    "info",
    "german",
    "french",
    "spanish",
    "chinese",
    "japanese",
    "classics",
    // "military",
    "education",
    "environment",
    "etc",
    "career",
    "specialEd",
    "health",
    "nutrition",
    "librarian",
    "counselor",
] as const

const TEACHER_SUBJECT = SUBJECT_CODES_IN_ORDER.map(
    (code) => SUBJECT_LABEL[code]
)

export { TEACHER_SUBJECT_GROUP, SUBJECT_LABEL, GET_SUBJECT_GROUP, TEACHER_SUBJECT }
// 교과목 안내에 들어갈 타입들
interface SubjectDetail {
    subjectGroup: string;      // 국어, 수학 등
    subjectType: string;       // 공통, 일반선택, 진로선택 등
    subjectName: string;       // 과목명 (예: 공통국어1)
    subjectInfo: string;       // 과목 소개/목적
    recommand: string;        // 추천 대상/사유
    achievement: string;       // 성취도 (예: 5단계)
    rank: string;              // 석차등급 (예: 5등급)
    suneung: string;           // 수능 관련 정보
    coreIdea: string;          // 핵심 아이디어
    relatedDept: string;       // 관련 학과
    relatedJob: string;        // 관련 직업
    credits: string;           // 이수 학점 (3~4)
    knowledge: string;         // 지식·이해 (세부 학습 내용)
}

// 공동교육과정에 들어갈 타입
interface SubjectNavUnion {
    // schoolName: string
    // location: string
    // year: string
    // sub_type: string
    // sub_prop: string
    // sub_name: string
    // sub_grade: number
    // sub_sem: number
    // sub_credit: number
    // sub_subgroup: string
    id: string // 고유 id
    year: string // 운영 년도
    subjectGroup: string //교과군
    subjectType: string // 과목 유형(ex 진로, 융합)
    subjectName: string // 과목 이름
    grade: string // 운영 학년
    semester: '1학기' | '여름방학' | '2학기' | '겨울방학' // 운영학기 (1학기, 2학기, 여름방학, 겨울방학)
    start: string // 예상 시작 날짜
    end: string // 예상 종료 날짜
    time: string // 운영 시간
    credit: number // 학점
    classroom: string // 수정장소(본교 또는 다른 장소)
    schoolName: string // 학교이름(개설학교)
    location: string // 지역명
    mode: string // 운영방식(오프라인, 온라인 등)
    memo: string // 비고
    isCustom: boolean //고시외 여부
    user_id?: string // userid
    min: number
    max: number
}
export type StandardCategoryType =
    | 'humanities'       // 인문
    | 'social'           // 사회
    | 'natural'          // 자연
    | 'engineering'      // 공학
    | 'medical'          // 의학(보건)
    | 'education'        // 교육(사범)
    | 'arts_sports'      // 예체능
    | 'agriculture'      // 농림/수산
    | 'liberal_arts';     // 자유전공(융합)

type SubjectType = 'core' | 'recommended' | 'all'

interface Subject {
    group: string // 교과군
    name: string // 과목명
    type: SubjectType // 권장구분
    isGeneral : boolean //false이면 구체적 과목, true이면 교과군형태
}
interface UniverseType {
    id: string
    region: string
    univName: string
    category: string
    standardCategory: StandardCategoryType
    majorName: string
    standardMajor: string
    subjects: Subject[]
    note: string
}

export { type SubjectDetail, type SubjectNavUnion, type UniverseType }
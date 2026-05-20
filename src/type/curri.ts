export type subT = {
    Group: string // 교과군
    all: number // 전체인원
    outQuota: number // 정원외
}

export interface SchoolInfo {
    grade_1: number;
    grade_2: number;
    grade_3: number;
}

export interface SubjectType {
    "과목명": string
    "교과군": string
    "유형": string
    "기준학점": number
    "Tag": number
    "최소학점": number
    "최대학점": number
}

export type JsonData = {
    Section: '지정' | '선택',
    IsGroup: string,
    SubjectGroup: string,
    SubjectProperty: string,
    SubjectName: string,
    BasicCredit: number,
    Tag: number,
    Grade: number | null,
    Semester: number | null,
    Credit: number | null,
    IsTable: number | null
}

export type CEAtype = Record<string, number>;

export type SchoolJsonDataType = {
    '학교지정': JsonData[],
    "선택과목": JsonData[],
    "Group": GroupData,
    "AddSubject": SubjectType[],
    "CEA": CEAtype
}

export interface GroupCell {
    Zone: '지정' | '선택' | null;
    Subject: number[]; // 문자열 배열
    Grouptag: number | null
    Credit: number | null;
    Grade: number | null;
    Semester: number | null;
    Choice: number | null;
}

export type GroupData = Record<string, GroupCell>;

export const GROUPDATA: GroupData = {};

for (let i = 1; i <= 50; i++) {
    const groupname = `그룹 ${i}`;
    const groupCell = {
        Zone: null,
        Subject: [],
        Grouptag: null,
        Credit: null,
        Grade: null,
        Semester: null,
        Choice: null
    };
    GROUPDATA[groupname] = groupCell;
}

export type STA_SUBJECTS = {
    user_id: string
    schoolname: string
    year: string
    sub_type: string
    sub_name: string
    sub_grade: number | null
    sub_sem: number | null
    sub_credit: number | null
    sub_isgroup: string
    sub_class: number | null
    sub_teach: TeachProps[] | null
    sub_subgroup: string | null
    location: string
}

export interface SchoolClassDataProps {
    schoolname: string
    location: string
    grade_1: number
    grade_2: number
    grade_3: number
    allClass: number
    selectedYear?: string
}

export type TeachProps = {
    subject: string
    credit: number
}

export type UnionSubjects = {
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

export interface SchoolStaAreaTableProps {
    location: string;
    schoolname: string;
    year: string;
    sub_type: string;
    sub_name: string;
    sub_grade: number;
    sub_sem: number;
    sub_credit: number;
    sub_isgroup: string;
    sub_class: number | null;
    sub_subgroup: string
    allClass: number
    grade_1: number
    grade_2: number
    grade_3: number
}
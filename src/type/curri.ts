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


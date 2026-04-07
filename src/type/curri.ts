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
    SubjectProperty: '공통' | '일반' | '진로' | '융합',
    SubjectName: string,
    BasicCredit: number,
    Tag: number,
    Grade: 1 | 2 | 3 | null,
    Semester: 1 | 2 | null,
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
    Grade: 1 | 2 | 3 | null;
    Semester: 1 | 2 | null;
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
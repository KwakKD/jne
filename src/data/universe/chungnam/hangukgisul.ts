import type { UniverseType } from "@/type/nav";

interface subprops {
    group: string
    name: string
    type: 'all'
    isGeneral: boolean
}

const sub_0: subprops[] = [
    { group: '국어', name: '국어', type: 'all', isGeneral: false },
    { group: '수학', name: '수학', type: 'all', isGeneral: false },
    { group: '영어', name: '영어', type: 'all', isGeneral: false },
    { group: '사회', name: '사회', type: 'all', isGeneral: false },
]

const sub_1: subprops[] = [
    { group: '국어', name: '국어', type: 'all', isGeneral: false },
    { group: '수학', name: '수학', type: 'all', isGeneral: false },
    { group: '영어', name: '영어', type: 'all', isGeneral: false },
    { group: '과학', name: '과학', type: 'all', isGeneral: false },
]

const HANGUKGISUL: UniverseType[] = [
    {
        id: 'hangukgisul_0',
        region: 'chungnam',
        univName: '한국기술교육대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '기계공학부',
        standardMajor: '기계공학',
        subjects: sub_1,
        note: '-'
    },
    {
        id: 'hangukgisul_1',
        region: 'chungnam',
        univName: '한국기술교육대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '메카트로닉스공학부',
        standardMajor: '메카트로닉스공학',
        subjects: sub_1,
        note: '-'
    },
    {
        id: 'hangukgisul_2',
        region: 'chungnam',
        univName: '한국기술교육대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '디자인공학과',
        standardMajor: '디자인공학',
        subjects: sub_1,
        note: '-'
    },
    {
        id: 'hangukgisul_3',
        region: 'chungnam',
        univName: '한국기술교육대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '건축공학과',
        standardMajor: '건축공학',
        subjects: sub_1,
        note: '-'
    },
    {
        id: 'hangukgisul_4',
        region: 'chungnam',
        univName: '한국기술교육대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '에너지신소재공학전공',
        standardMajor: '에너지신소재공학',
        subjects: sub_1,
        note: '-'
    },
    {
        id: 'hangukgisul_5',
        region: 'chungnam',
        univName: '한국기술교육대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '화학생명공학전공',
        standardMajor: '화학생명공학',
        subjects: sub_1,
        note: '-'
    },
    {
        id: 'hangukgisul_6',
        region: 'chungnam',
        univName: '한국기술교육대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '전기공학전공',
        standardMajor: '전기공학',
        subjects: sub_1,
        note: '-'
    },
    {
        id: 'hangukgisul_7',
        region: 'chungnam',
        univName: '한국기술교육대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '전자공학전공',
        standardMajor: '전자공학',
        subjects: sub_1,
        note: '-'
    },
    {
        id: 'hangukgisul_8',
        region: 'chungnam',
        univName: '한국기술교육대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: 'AI정보통신공학전공',
        standardMajor: 'AI정보통신공학',
        subjects: sub_1,
        note: '-'
    },
    {
        id: 'hangukgisul_9',
        region: 'chungnam',
        univName: '한국기술교육대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '컴퓨터공학전공',
        standardMajor: '컴퓨터공학',
        subjects: sub_1,
        note: '-'
    },
    {
        id: 'hangukgisul_10',
        region: 'chungnam',
        univName: '한국기술교육대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: 'AI∙소프트웨어공학전공',
        standardMajor: 'AI∙소프트웨어공학',
        subjects: sub_1,
        note: '-'
    },
    {
        id: 'hangukgisul_11',
        region: 'chungnam',
        univName: '한국기술교육대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '융합경영전공',
        standardMajor: '융합경영학',
        subjects: sub_0,
        note: '-'
    },
    {
        id: 'hangukgisul_12',
        region: 'chungnam',
        univName: '한국기술교육대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '데이터경영전공',
        standardMajor: '데이터경영학',
        subjects: sub_0,
        note: '-'
    },
    {
        id: 'hangukgisul_13',
        region: 'chungnam',
        univName: '한국기술교육대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '고용서비스정책학과',
        standardMajor: '고용서비스정책학',
        subjects: sub_0,
        note: '-'
    },
]

export { HANGUKGISUL }
import type { UniverseType } from "@/type/nav";

interface subprops {
    group: string
    name: string
    type: 'all'
    isGeneral: boolean
}

const sub: subprops[] = [
    { group: '국어', name: '국어', type: 'all', isGeneral: true },
    { group: '영어', name: '영어', type: 'all', isGeneral: true },
    { group: '수학', name: '수학', type: 'all', isGeneral: true },
    { group: '사회', name: '사회(역사/도덕 포함)', type: 'all', isGeneral: true },
    { group: '과학', name: '과학', type: 'all', isGeneral: true },
]

const HANLA: UniverseType[] = [
    {
        id: 'hanla_0',
        region: 'gangwon',
        univName: '한라대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '기계자동차공학과',
        standardMajor: '기계자동차공학',
        subjects: sub,
        note: '-'
    },
    {
        id: 'hanla_1',
        region: 'gangwon',
        univName: '한라대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '미래모빌리티공학과',
        standardMajor: '미래모빌리티공학',
        subjects: sub,
        note: '-'
    },
    {
        id: 'hanla_2',
        region: 'gangwon',
        univName: '한라대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '도시인프라공학과',
        standardMajor: '도시인프라공학',
        subjects: sub,
        note: '-'
    },
    {
        id: 'hanla_3',
        region: 'gangwon',
        univName: '한라대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '컴퓨터공학과',
        standardMajor: '컴퓨터공학',
        subjects: sub,
        note: '-'
    },
    {
        id: 'hanla_4',
        region: 'gangwon',
        univName: '한라대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: 'IT소프트웨어학과',
        standardMajor: 'IT소프트웨어학',
        subjects: sub,
        note: '-'
    },
    {
        id: 'hanla_5',
        region: 'gangwon',
        univName: '한라대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '전기전자공학과',
        standardMajor: '전기전자공학',
        subjects: sub,
        note: '-'
    },
    {
        id: 'hanla_6',
        region: 'gangwon',
        univName: '한라대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: 'AI정보보안학과',
        standardMajor: 'AI정보보안학',
        subjects: sub,
        note: '-'
    },
    {
        id: 'hanla_7',
        region: 'gangwon',
        univName: '한라대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '철도운전시스템학과',
        standardMajor: '철도운전시스템학',
        subjects: sub,
        note: '-'
    },
    {
        id: 'hanla_8',
        region: 'gangwon',
        univName: '한라대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '미디어광고콘텐츠학과',
        standardMajor: '미디어광고콘텐츠학',
        subjects: sub,
        note: '-'
    },
    {
        id: 'hanla_9',
        region: 'gangwon',
        univName: '한라대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '영상제작학과',
        standardMajor: '영상제작학',
        subjects: sub,
        note: '-'
    },
    {
        id: 'hanla_10',
        region: 'gangwon',
        univName: '한라대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '건축학과',
        standardMajor: '건축학',
        subjects: sub,
        note: '-'
    },
    {
        id: 'hanla_11',
        region: 'gangwon',
        univName: '한라대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '소방안전학과',
        standardMajor: '소방안전학',
        subjects: sub,
        note: '-'
    },
    {
        id: 'hanla_12',
        region: 'gangwon',
        univName: '한라대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '사회복지학과',
        standardMajor: '사회복지학',
        subjects: sub,
        note: '-'
    },
    {
        id: 'hanla_13',
        region: 'gangwon',
        univName: '한라대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '경찰행정학과',
        standardMajor: '경찰행정학',
        subjects: sub,
        note: '-'
    },
    {
        id: 'hanla_14',
        region: 'gangwon',
        univName: '한라대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '경영학과',
        standardMajor: '경영학',
        subjects: sub,
        note: '-'
    },
    {
        id: 'hanla_15',
        region: 'gangwon',
        univName: '한라대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '호텔항공외식경영학과',
        standardMajor: '호텔항공외식경영학',
        subjects: sub,
        note: '-'
    },
    {
        id: 'hanla_16',
        region: 'gangwon',
        univName: '한라대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '문화관광경영학과',
        standardMajor: '문화관광경영학',
        subjects: sub,
        note: '-'
    },
    {
        id: 'hanla_17',
        region: 'gangwon',
        univName: '한라대',
        category: '예체능계열',
        standardCategory: 'arts_sports',
        majorName: '뷰티디자인학과',
        standardMajor: '뷰티디자인학',
        subjects: sub,
        note: '-'
    },
    {
        id: 'hanla_18',
        region: 'gangwon',
        univName: '한라대',
        category: '예체능계열',
        standardCategory: 'arts_sports',
        majorName: '스포츠학과',
        standardMajor: '스포츠학',
        subjects: sub,
        note: '-'
    },
    {
        id: 'hanla_19',
        region: 'gangwon',
        univName: '한라대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '미래경영학과',
        standardMajor: '미래경영학',
        subjects: sub,
        note: '-'
    },
    {
        id: 'hanla_20',
        region: 'gangwon',
        univName: '한라대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '문화예술학과',
        standardMajor: '문화예술학',
        subjects: sub,
        note: '-'
    },
    {
        id: 'hanla_21',
        region: 'gangwon',
        univName: '한라대',
        category: '예체능계열',
        standardCategory: 'arts_sports',
        majorName: '골프산업학과',
        standardMajor: '골프산업학',
        subjects: sub,
        note: '-'
    },
    {
        id: 'hanla_22',
        region: 'gangwon',
        univName: '한라대',
        category: '자유계열',
        standardCategory: 'liberal_arts',
        majorName: '자유전공학부',
        standardMajor: '자유전공학',
        subjects: sub,
        note: '-'
    },
]

export { HANLA }
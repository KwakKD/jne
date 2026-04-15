import type { UniverseType } from "@/type/nav";

const note = '교과(군)별 과목의 위계를 따라 일반 선택과목을 우선 이수하고, 진로와 적성에 맞게 진로 선택 과목과 융합 선택 과목 이수 권장'
const sub_0 = '계열 구분 없이 희망하는 진로 및 적성을 고려하여 교과목 선택 이수'
const sub_1 = '인문사회계열 진로 및 적성을 고려하여 교과목 선택 이수'
const sub_2 = '공학계열 진로 및 적성을 고려하여 교과목 선택 이수'

const SUNGGYUL: UniverseType[] = [
    {
        id: 'sunggyul_0',
        region: 'gyounggi',
        univName: '성결대',
        category: '자유계열',
        standardCategory: 'liberal_arts',
        majorName: '자율정공학부',
        standardMajor: '자율전공학부',
        subjects: [
            { group: '', name: sub_0, type: 'all', isGeneral: true },
        ],
        note: note
    },
    {
        id: 'sunggyul_1',
        region: 'gyounggi',
        univName: '성결대',
        category: '자유계열',
        standardCategory: 'liberal_arts',
        majorName: '인문사회계열 자율전공학부(성결대)',
        standardMajor: '인문사회계열 자율전공학부(성결대)',
        subjects: [
            { group: '', name: sub_1, type: 'all', isGeneral: true },
        ],
        note: note
    },
    {
        id: 'sunggyul_2',
        region: 'gyounggi',
        univName: '성결대',
        category: '자유계열',
        standardCategory: 'liberal_arts',
        majorName: '공학계열 자율전공학부(성결대)',
        standardMajor: '공학계열 자율전공학부(성결대)',
        subjects: [
            { group: '', name: sub_2, type: 'all', isGeneral: true },
        ],
        note: note
    },
    {
        id: 'sunggyul_3',
        region: 'gyounggi',
        univName: '성결대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '국어국문학과',
        standardMajor: '국어국문학',
        subjects: [
            { group: '', name: sub_1, type: 'all', isGeneral: true },
        ],
        note: note
    },
    {
        id: 'sunggyul_4',
        region: 'gyounggi',
        univName: '성결대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '영어영문학과',
        standardMajor: '영어영문학',
        subjects: [
            { group: '', name: sub_1, type: 'all', isGeneral: true },
        ],
        note: note
    },
    {
        id: 'sunggyul_5',
        region: 'gyounggi',
        univName: '성결대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '중어중문학과',
        standardMajor: '중어중문학',
        subjects: [
            { group: '', name: sub_1, type: 'all', isGeneral: true },
        ],
        note: note
    },
    {
        id: 'sunggyul_6',
        region: 'gyounggi',
        univName: '성결대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '국제개발협력학과',
        standardMajor: '국제개발협력학과',
        subjects: [
            { group: '', name: sub_1, type: 'all', isGeneral: true },
        ],
        note: note
    },
    {
        id: 'sunggyul_7',
        region: 'gyounggi',
        univName: '성결대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '행정학부',
        standardMajor: '행정학',
        subjects: [
            { group: '', name: sub_1, type: 'all', isGeneral: true },
        ],
        note: note
    },
    {
        id: 'sunggyul_8',
        region: 'gyounggi',
        univName: '성결대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '사회복지학과',
        standardMajor: '사회복지학',
        subjects: [
            { group: '', name: sub_1, type: 'all', isGeneral: true },
        ],
        note: note
    },
    {
        id: 'sunggyul_9',
        region: 'gyounggi',
        univName: '성결대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '관광학과',
        standardMajor: '관광학',
        subjects: [
            { group: '', name: sub_1, type: 'all', isGeneral: true },
        ],
        note: note
    },
    {
        id: 'sunggyul_10',
        region: 'gyounggi',
        univName: '성결대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '경영학과',
        standardMajor: '경영학',
        subjects: [
            { group: '', name: sub_1, type: 'all', isGeneral: true },
        ],
        note: note
    },
    {
        id: 'sunggyul_11',
        region: 'gyounggi',
        univName: '성결대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '글로벌물류학과',
        standardMajor: '글로벌물류학',
        subjects: [
            { group: '', name: sub_1, type: 'all', isGeneral: true },
        ],
        note: note
    },
    {
        id: 'sunggyul_12',
        region: 'gyounggi',
        univName: '성결대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '산업경영공학과',
        standardMajor: '산업경영공학',
        subjects: [
            { group: '', name: sub_2, type: 'all', isGeneral: true },
        ],
        note: note
    },
    {
        id: 'sunggyul_13',
        region: 'gyounggi',
        univName: '성결대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '컴퓨터공학과',
        standardMajor: '컴퓨터공학',
        subjects: [
            { group: '', name: sub_2, type: 'all', isGeneral: true },
        ],
        note: note
    },
    {
        id: 'sunggyul_14',
        region: 'gyounggi',
        univName: '성결대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '정보통신공학과',
        standardMajor: '정보통신공학',
        subjects: [
            { group: '', name: sub_2, type: 'all', isGeneral: true },
        ],
        note: note
    },
    {
        id: 'sunggyul_15',
        region: 'gyounggi',
        univName: '성결대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '미디어소프트웨어학과',
        standardMajor: '미디어소프트웨어학',
        subjects: [
            { group: '', name: sub_2, type: 'all', isGeneral: true },
        ],
        note: note
    },
    {
        id: 'sunggyul_16',
        region: 'gyounggi',
        univName: '성결대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '도시디자인정보공학과',
        standardMajor: '도시디자인정보공학',
        subjects: [
            { group: '', name: sub_2, type: 'all', isGeneral: true },
        ],
        note: note
    },
]

export { SUNGGYUL }
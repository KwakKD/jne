import type { UniverseType } from "@/type/nav";

const note = '일반 선택 과목 이수 후 진로와 적성에 맞게 진로 선택 과목, 융합 선택 과목을 이수할 것'

const DANGUK: UniverseType[] = [
    {
        id: 'danguk_1',
        region: 'gyounggi',
        univName: '단국대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '인문계열광역',
        standardMajor: '인문계열광역(단국대)',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'danguk_2',
        region: 'gyounggi',
        univName: '단국대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '사회계열광역',
        standardMajor: '사회계열광역(단국대)',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'danguk_3',
        region: 'gyounggi',
        univName: '단국대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '문과대학',
        standardMajor: '문과대학(단국대)',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'danguk_4',
        region: 'gyounggi',
        univName: '단국대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '법과대학',
        standardMajor: '법과대학(단국대)',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'danguk_5',
        region: 'gyounggi',
        univName: '단국대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '사회과학대학',
        standardMajor: '사회과학대학(단국대)',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'danguk_6',
        region: 'gyounggi',
        univName: '단국대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '경영경제대학',
        standardMajor: '경영경제대학(단국대)',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'danguk_7',
        region: 'gyounggi',
        univName: '단국대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '프리무스국제대학',
        standardMajor: '프리무스국제대학(단국대)',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'danguk_8',
        region: 'gyounggi',
        univName: '단국대',
        category: '교육계열',
        standardCategory: 'education',
        majorName: '사범대학(인문)',
        standardMajor: '사범대학(인문, 단국대)',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'danguk_9',
        region: 'gyounggi',
        univName: '단국대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '공학계열광역',
        standardMajor: '공학계열광역(단국대)',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '과학', name: '과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'danguk_10',
        region: 'gyounggi',
        univName: '단국대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: 'SW융합계열광역',
        standardMajor: 'SW융합계열광역(단국대)',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '과학', name: '과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'danguk_11',
        region: 'gyounggi',
        univName: '단국대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '공과대학',
        standardMajor: '공과대학(단국대)',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '과학', name: '과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'danguk_12',
        region: 'gyounggi',
        univName: '단국대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: 'SW융합대학',
        standardMajor: 'SW융합대학(단국대)',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '과학', name: '과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'danguk_13',
        region: 'gyounggi',
        univName: '단국대',
        category: '교육계열',
        standardCategory: 'education',
        majorName: '사범대학(자연)',
        standardMajor: '사범대학(자연, 단국대)',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '과학', name: '과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
]

export { DANGUK }
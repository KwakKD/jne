import type { UniverseType } from "@/type/nav";

const note = "인문/예체능, 자연/공학 계열별로 사회, 과학 이수 과목 수 지정 관심분야 일반 선택 과목 우선 이수 권장"

const GYOUNGGI: UniverseType[] = [
    {
        id: 'gyounggi_0',
        region: 'gyounggi',
        univName: '경기대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '수학과',
        standardMajor: '수학과',
        subjects: [
            { group: '국어', name: '국어', type: 'core', isGeneral: false },
            { group: '영어', name: '영어', type: 'core', isGeneral: false },
            { group: '수학', name: '수학', type: 'core', isGeneral: false },
            { group: '과학', name: '과학', type: 'core', isGeneral: false },
            { group: '사회', name: '한국사', type: 'core', isGeneral: false },
            { group: '수학', name: '기하', type: 'recommended', isGeneral: false },
            { group: '수학', name: '미적분Ⅱ', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'gyounggi_1',
        region: 'gyounggi',
        univName: '경기대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '인문/예체능(경기대)',
        standardMajor: '인문(경기대)',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '사회', name: '사회(2과목)', type: 'all', isGeneral: false },
            { group: '과학', name: '과학', type: 'all', isGeneral: false },
            { group: '사회', name: '한국사', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'gyounggi_2',
        region: 'gyounggi',
        univName: '경기대',
        category: '예체능계열',
        standardCategory: 'arts_sports',
        majorName: '인문/예체능(경기대)',
        standardMajor: '예체능(경기대)',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '사회', name: '사회(2과목)', type: 'all', isGeneral: false },
            { group: '과학', name: '과학', type: 'all', isGeneral: false },
            { group: '사회', name: '한국사', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'gyounggi_3',
        region: 'gyounggi',
        univName: '경기대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '자연/공학(수학과 제외)',
        standardMajor: '자연계열(경기대, 수학과 제외)',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
            { group: '과학', name: '과학(3과목)', type: 'all', isGeneral: false },
            { group: '사회', name: '한국사', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'gyounggi_4',
        region: 'gyounggi',
        univName: '경기대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '자연/공학(수학과 제외)',
        standardMajor: '공학계열(경기대)',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
            { group: '과학', name: '과학(3과목)', type: 'all', isGeneral: false },
            { group: '사회', name: '한국사', type: 'all', isGeneral: false },
        ],
        note: note
    },
]

export { GYOUNGGI }
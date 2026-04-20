import type { UniverseType } from "@/type/nav";

const GYOUNGSUNG: UniverseType[] = [
    {
        id: 'gyoungsung_0',
        region: 'busan',
        univName: '경성대',
        category: '보건계열',
        standardCategory: 'medical',
        majorName: '약학과',
        standardMajor: '약학과',
        subjects: [
            { group: '과학', name: '화학', type: 'core', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'core', isGeneral: false },
            { group: '수학', name: ' 미적분Ⅱ', type: 'recommended', isGeneral: false },
            { group: '수학', name: ' 기하', type: 'recommended', isGeneral: false },
        ],
        note: '과학 진로선택 3과목 이상 이수 권장'
    },
    {
        id: 'gyoungsung_1',
        region: 'busan',
        univName: '경성대',
        category: '자유계열',
        standardCategory: 'liberal_arts',
        majorName: '전 모집단위(약학과 제외)',
        standardMajor: '전 모집단위(경성대)',
        subjects: [
            { group: '', name: '전 과목', type: 'all', isGeneral: true },
        ],
        note: '진로와 적성에 따라 선택 과목 이수 권장'
    },
]

export { GYOUNGSUNG }
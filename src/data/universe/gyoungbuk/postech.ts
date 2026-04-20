import type { UniverseType } from "@/type/nav";

const POSTECH: UniverseType[] = [
    {
        id: 'postech_0',
        region: 'gyoungbuk',
        univName: 'POSTECH',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '반도체공학과',
        standardMajor: '반도체공학',
        subjects: [
            { group: '', name: '국어, 수학, 영어, 과목 전 과목', type: 'all', isGeneral: true },
        ],
        note: '-'
    }
]

export { POSTECH }

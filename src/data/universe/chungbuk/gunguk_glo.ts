import type { UniverseType } from "@/type/nav";

const GUNGUK_GLO: UniverseType[] = [
    {
        id: 'gunguk_glo_0',
        region: 'chungbuk',
        univName: '건국대(글로컬)',
        category: '의약계열',
        standardCategory: 'medical',
        majorName: '의예과',
        standardMajor: '의예과',
        subjects: [
            { group: '수학', name: '대수', type: 'all', isGeneral: false },
            { group: '수학', name: '미적분Ⅰ', type: 'all', isGeneral: false },
            { group: '수학', name: '확률과 통계', type: 'all', isGeneral: false },
            { group: '수학', name: '미적분Ⅱ', type: 'all', isGeneral: false },
            { group: '수학', name: '기하', type: 'all', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
            { group: '과학', name: '세포와 물질대사', type: 'all', isGeneral: false },
            { group: '과학', name: '생물의 유전', type: 'all', isGeneral: false },
        ],
        note: '수학 과목 중 4과목 이상, 과학 과목 중 생명과학, 세포와 물질대사, 생물의 유전을 포함하여 3과목 이상'
    },
]

export { GUNGUK_GLO }
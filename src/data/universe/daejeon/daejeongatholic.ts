import type { UniverseType } from "@/type/nav";

const DAEJEONGATHOLIC: UniverseType[] = [
    {
        id: 'daejeongatholic_0',
        region: 'daejeon',
        univName: '대전가톨릭대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '신학과',
        standardMajor: '신학',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
            { group: '과학', name: '과학', type: 'all', isGeneral: false },
            { group: '한국사', name: '한국사', type: 'all', isGeneral: false },
        ],
        note: '* 반영교과 : 공통과목, 일반선택, 진로선택, 전문교과'
    },
]

export { DAEJEONGATHOLIC }
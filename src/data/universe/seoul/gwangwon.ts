import type { UniverseType } from "@/type/nav";

const GWANGWON: UniverseType[] = [
    {
        id: 'gwangwon_',
        region: 'seoul',
        univName: '광운대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '수학과',
        standardMajor: '수학',
        subjects: [
            { group: '수학', name: '대수', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅰ', type: 'core', isGeneral: false },
            { group: '수학', name: '확률과 통계', type: 'core', isGeneral: false },
            { group: '수학', name: '물리학', type: 'core', isGeneral: false },
            { group: '수학', name: '화학', type: 'core', isGeneral: false },
            { group: '수학', name: '생명과학', type: 'core', isGeneral: false },
            { group: '수학', name: '기하', type: 'recommended', isGeneral: false },
            { group: '수학', name: '미적분Ⅱ', type: 'recommended', isGeneral: false },
            { group: '과학', name: '역학과 에너지', type: 'recommended', isGeneral: false },
            { group: '과학', name: '전자기와 양자', type: 'recommended', isGeneral: false },
            { group: '과학', name: '물질과 에너지', type: 'recommended', isGeneral: false },
            { group: '과학', name: '화학반응의 세계', type: 'recommended', isGeneral: false },
            { group: '과학', name: '세포와 물질대사', type: 'recommended', isGeneral: false },
            { group: '과학', name: '생물의 유전', type: 'recommended', isGeneral: false },
        ],
        note: '융합 선택 과목: 실용통계, 수학과제 탐구, 융합과학 탐구'
    },
]

export { GWANGWON }
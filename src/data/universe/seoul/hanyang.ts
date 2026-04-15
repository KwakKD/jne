import type { UniverseType } from "@/type/nav";

const HANYANG: UniverseType[] = [
    {
        id: 'hanyang_0',
        region: 'seoul',
        univName: '한양대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '자연계열',
        standardMajor: '자연계열(한양대)',
        subjects: [
            { group: '', name: '미적분Ⅱ 또는 기하, 물리학/화학/생명과학 중 1과목 이상', type: 'all', isGeneral: true },
            { group: '', name: '과학 진로 선택 과목 2과목 이상', type: 'all', isGeneral: true },
        ],
        note: "진로 선택 과목은 계열과 교과 위계에 맞게 선택하는 것을 권장함."
    },
]

export { HANYANG }
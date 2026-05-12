import type { UniverseType } from "@/type/nav";

interface subprops {
    group: string
    name: string
    type: 'all'
    isGeneral: boolean
}

const sub_0: subprops[] = [
    { group: '수학', name: '대수', type: 'all', isGeneral: false },
    { group: '수학', name: '미적분Ⅰ', type: 'all', isGeneral: false },
    { group: '수학', name: '미적분Ⅱ', type: 'all', isGeneral: false },
    { group: '수학', name: '기하', type: 'all', isGeneral: false },
    { group: '수학', name: '확률과 통계', type: 'all', isGeneral: false },
    { group: '과학', name: '화학', type: 'all', isGeneral: false },
    { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
    { group: '과학', name: '물질과 에너지', type: 'all', isGeneral: false },
    { group: '과학', name: '화학 반응의 세계', type: 'all', isGeneral: false },
    { group: '과학', name: '세포와 물질대사', type: 'all', isGeneral: false },
    { group: '과학', name: '생물의 유전', type: 'all', isGeneral: false },
]

const sub_1: subprops[] = [
    { group: '수학', name: '대수', type: 'all', isGeneral: false },
    { group: '수학', name: '미적분Ⅰ', type: 'all', isGeneral: false },
    { group: '수학', name: '확률과 통계', type: 'all', isGeneral: false },
    { group: '과학', name: '화학', type: 'all', isGeneral: false },
    { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
]

const sub_2: subprops[] = [
    { group: '수학', name: '대수', type: 'all', isGeneral: false },
    { group: '수학', name: '미적분Ⅰ', type: 'all', isGeneral: false },
    { group: '수학', name: '확률과 통계', type: 'all', isGeneral: false },
    { group: '과학', name: '화학', type: 'all', isGeneral: false },
    { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
    { group: '과학', name: '물질과 에너지', type: 'all', isGeneral: false },
    { group: '과학', name: '화학 반응의 세계', type: 'all', isGeneral: false },
    { group: '과학', name: '세포와 물질대사', type: 'all', isGeneral: false },
    { group: '과학', name: '생물의 유전', type: 'all', isGeneral: false },
]

const note = '원광대학교는 의약학계열 모집단위 교과 이수 권장과목에 대해서만 발표함. 다른 모집단위에 대한 교과이수 권장과목에 대해서는 발표한 내용 없음.'

const WONGWANG: UniverseType[] = [
    {
        id: 'wongwang_0',
        region: 'jeonbuk',
        univName: '원광대',
        category: '의약계열',
        standardCategory: 'medical',
        majorName: '의예과',
        standardMajor: '의예과',
        subjects: sub_0,
        note: note
    },
    {
        id: 'wongwang_1',
        region: 'jeonbuk',
        univName: '원광대',
        category: '의약계열',
        standardCategory: 'medical',
        majorName: '치의예과(자연)',
        standardMajor: '치의예과',
        subjects: sub_0,
        note: note
    },
    {
        id: 'wongwang_2',
        region: 'jeonbuk',
        univName: '원광대',
        category: '의약계열',
        standardCategory: 'medical',
        majorName: '한의예과(자연)',
        standardMajor: '한의예과',
        subjects: sub_0,
        note: note
    },
    {
        id: 'wongwang_3',
        region: 'jeonbuk',
        univName: '원광대',
        category: '의약계열',
        standardCategory: 'medical',
        majorName: '약학과',
        standardMajor: '약학과',
        subjects: sub_0,
        note: note
    },
    {
        id: 'wongwang_4',
        region: 'jeonbuk',
        univName: '원광대',
        category: '의약계열',
        standardCategory: 'medical',
        majorName: '한약학과',
        standardMajor: '한약학과',
        subjects: sub_0,
        note: note
    },
    {
        id: 'wongwang_5',
        region: 'jeonbuk',
        univName: '원광대',
        category: '의약계열',
        standardCategory: 'medical',
        majorName: '치의예과(인문)',
        standardMajor: '치의예과',
        subjects: sub_1,
        note: note
    },
    {
        id: 'wongwang_6',
        region: 'jeonbuk',
        univName: '원광대',
        category: '의약계열',
        standardCategory: 'medical',
        majorName: '한의예과(인문)',
        standardMajor: '한의예과',
        subjects: sub_1,
        note: note
    },
    {
        id: 'wongwang_7',
        region: 'jeonbuk',
        univName: '원광대',
        category: '의약계열',
        standardCategory: 'medical',
        majorName: '간호학과',
        standardMajor: '간호학과',
        subjects: sub_2,
        note: '대수, 미적분Ⅰ, 확률과 통계, 화학, 생명과학, 물질과 에너지, 화학 반응의 세계, 세포와 물질대사, 생물의 유전 중 2과목 이상'
    },
]

export { WONGWANG }
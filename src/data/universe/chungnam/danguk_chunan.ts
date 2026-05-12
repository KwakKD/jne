import type { UniverseType } from "@/type/nav";

interface subprops {
    group: string
    name: string
    type: 'all'
    isGeneral: boolean
}

const sub_0: subprops[] = [
    { group: '국어', name: '국어', type: 'all', isGeneral: false },
    { group: '수학', name: '수학', type: 'all', isGeneral: false },
    { group: '영어', name: '영어', type: 'all', isGeneral: false },
    { group: '사회', name: '사회', type: 'all', isGeneral: false },
]

const sub_1: subprops[] = [
    { group: '국어', name: '국어', type: 'all', isGeneral: false },
    { group: '수학', name: '수학', type: 'all', isGeneral: false },
    { group: '영어', name: '영어', type: 'all', isGeneral: false },
    { group: '과학', name: '과학', type: 'all', isGeneral: false },
]

const note = '일반 선택 과목 이수 후 진로와 적성에 맞게 진로 선택 과목, 융합 선택 과목을 이수할 것'

const DANGUK_CHUNAN: UniverseType[] = [
    {
        id: 'danguk_chunan_0',
        region: 'chungnam',
        univName: '단국대(천안)',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '인문사회대학',
        standardMajor: '인문사회대학(단국대-천안)',
        subjects: sub_0,
        note: note
    },
    {
        id: 'danguk_chunan_1',
        region: 'chungnam',
        univName: '단국대(천안)',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '외국어대학',
        standardMajor: '외국어대학(단국대-천안)',
        subjects: sub_0,
        note: note
    },
    {
        id: 'danguk_chunan_2',
        region: 'chungnam',
        univName: '단국대(천안)',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '공공인재대학',
        standardMajor: '공공인재대학(단국대-천안)',
        subjects: sub_0,
        note: note
    },
    {
        id: 'danguk_chunan_3',
        region: 'chungnam',
        univName: '단국대(천안)',
        category: '의약계열',
        standardCategory: 'medical',
        majorName: '보건과학대학',
        standardMajor: '보건과학대학(단국대-천안)',
        subjects: sub_0,
        note: note
    },
    {
        id: 'danguk_chunan_4',
        region: 'chungnam',
        univName: '단국대(천안)',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '자연대학',
        standardMajor: '자연대학(단국대-천안)',
        subjects: sub_1,
        note: note
    },
    {
        id: 'danguk_chunan_5',
        region: 'chungnam',
        univName: '단국대(천안)',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '공학대학',
        standardMajor: '공학대학(단국대-천안)',
        subjects: sub_1,
        note: note
    },
    {
        id: 'danguk_chunan_6',
        region: 'chungnam',
        univName: '단국대(천안)',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '과학기술대학',
        standardMajor: '과학기술대학(단국대-천안)',
        subjects: sub_1,
        note: note
    },
    {
        id: 'danguk_chunan_7',
        region: 'chungnam',
        univName: '단국대(천안)',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '바이오융합대학',
        standardMajor: '바이오융합대학(단국대-천안)',
        subjects: sub_1,
        note: note
    },
    {
        id: 'danguk_chunan_8',
        region: 'chungnam',
        univName: '단국대(천안)',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '의과대학',
        standardMajor: '의과대학(단국대-천안)',
        subjects: sub_1,
        note: note
    },
    {
        id: 'danguk_chunan_9',
        region: 'chungnam',
        univName: '단국대(천안)',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '치과대학',
        standardMajor: '치과대학(단국대-천안)',
        subjects: sub_1,
        note: note
    },
    {
        id: 'danguk_chunan_10',
        region: 'chungnam',
        univName: '단국대(천안)',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '약학대학',
        standardMajor: '약학대학(단국대-천안)',
        subjects: sub_1,
        note: note
    },
]

export { DANGUK_CHUNAN }
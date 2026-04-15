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
    { group: '수학', name: '확률과 통계', type: 'all', isGeneral: false },
    { group: '수학', name: '미적분Ⅱ', type: 'all', isGeneral: false },
    { group: '수학', name: '기하', type: 'all', isGeneral: false },
]

const sub_1: subprops[] = [
    { group: '수학', name: '수학', type: 'all', isGeneral: false },
    { group: '수학', name: '미적분Ⅰ', type: 'all', isGeneral: false },
    { group: '수학', name: '확률과 통계', type: 'all', isGeneral: false },
]

const note = '과학은 일반 선택 과목 먼저 이수 후, 진로와 적성에 맞게 진로 선택 과목 이수'

const HANGUKHANGGONG: UniverseType[] = [
    {
        id: 'hanhukhanggong_0',
        region: 'gyounggi',
        univName: '한국항공대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '공과대학(항공대)',
        standardMajor: '공과대학(항공대)',
        subjects: sub_0,
        note: note
    },
    {
        id: 'hanhukhanggong_1',
        region: 'gyounggi',
        univName: '한국항공대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: 'AI융합대학(항공대)',
        standardMajor: 'AI융합대학(항공대)',
        subjects: sub_0,
        note: note
    },
    {
        id: 'hanhukhanggong_2',
        region: 'gyounggi',
        univName: '한국항공대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '스마트드론공학과(항공대)',
        standardMajor: '스마트드론공학과(항공대)',
        subjects: sub_0,
        note: note
    },
    {
        id: 'hanhukhanggong_3',
        region: 'gyounggi',
        univName: '한국항공대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: 'AI자율주행시스템공학과(항공대)',
        standardMajor: 'AI자율주행시스템공학과(항공대)',
        subjects: sub_0,
        note: note
    },
    {
        id: 'hanhukhanggong_4',
        region: 'gyounggi',
        univName: '한국항공대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '항공경영대학(이학적성, 항공대)',
        standardMajor: '항공경영대학(이학적성, 항공대)',
        subjects: sub_1,
        note: note
    },
    {
        id: 'hanhukhanggong_5',
        region: 'gyounggi',
        univName: '한국항공대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '항공운항학과(항공대)',
        standardMajor: '항공운항학과(항공대)',
        subjects: sub_1,
        note: note
    },
    {
        id: 'hanhukhanggong_6',
        region: 'gyounggi',
        univName: '한국항공대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '항공경영대학(사회적성, 항공대)',
        standardMajor: '항공경영대학(사회적성, 항공대)',
        subjects: sub_1,
        note: note
    },
]

export { HANGUKHANGGONG }

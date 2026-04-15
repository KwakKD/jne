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
    { group: '수학', name: '사회/과학', type: 'all', isGeneral: false },
]

const sub_1: subprops[] = [
    { group: '수학', name: '수학', type: 'all', isGeneral: false },
    { group: '수학', name: '사회/과학', type: 'all', isGeneral: false },
]

const note = '수학: 일반 선택 과목 이수 후, 진로와 적성에 맞게 진로 선택 과목 이수 \n사회/과학: 과학 관련 일반 선택 과목 이수 후, 진로와 적성에 맞게 진로 선택 과목 이수'
const note_1 = '수학: 진로와 적성에 맞게 과목 이수 \n 사회/과학: 진로와 적성에 맞게 과목 이수'

const AJU: UniverseType[] = [
    {
        id: 'aju_0',
        region: 'gyounggi',
        univName: '아주대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '기계공학과',
        standardMajor: '기계공학',
        subjects: sub_0,
        note: note
    },
    {
        id: 'aju_1',
        region: 'gyounggi',
        univName: '아주대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '산업공학과',
        standardMajor: '산업공학',
        subjects: sub_0,
        note: note
    },
    {
        id: 'aju_2',
        region: 'gyounggi',
        univName: '아주대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '화학공학과',
        standardMajor: '화학공학',
        subjects: sub_0,
        note: note
    },
    {
        id: 'aju_3',
        region: 'gyounggi',
        univName: '아주대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '첨단신소재공학과',
        standardMajor: '첨단신소재공학',
        subjects: sub_0,
        note: note
    },
    {
        id: 'aju_4',
        region: 'gyounggi',
        univName: '아주대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '응용화학과',
        standardMajor: '응용화학',
        subjects: sub_0,
        note: note
    },
    {
        id: 'aju_5',
        region: 'gyounggi',
        univName: '아주대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '환경안전공학과',
        standardMajor: '환경안전공학',
        subjects: sub_0,
        note: note
    },
    {
        id: 'aju_6',
        region: 'gyounggi',
        univName: '아주대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '건설시스템공학과',
        standardMajor: '건설시스템공학',
        subjects: sub_0,
        note: note
    },
    {
        id: 'aju_7',
        region: 'gyounggi',
        univName: '아주대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '교통시스템공학과',
        standardMajor: '교통시스템공학',
        subjects: sub_0,
        note: note
    },
    {
        id: 'aju_8',
        region: 'gyounggi',
        univName: '아주대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '건축학과',
        standardMajor: '건축학',
        subjects: sub_0,
        note: note
    },
    {
        id: 'aju_9',
        region: 'gyounggi',
        univName: '아주대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '전자공학과',
        standardMajor: '전자공학',
        subjects: sub_0,
        note: note
    },
    {
        id: 'aju_10',
        region: 'gyounggi',
        univName: '아주대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '지능형반도체공학과',
        standardMajor: '지능형반도체공학',
        subjects: sub_0,
        note: note
    },
    {
        id: 'aju_11',
        region: 'gyounggi',
        univName: '아주대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '미래모빌리티공학과',
        standardMajor: '미래모빌리티공학',
        subjects: sub_0,
        note: note
    },
    {
        id: 'aju_12',
        region: 'gyounggi',
        univName: '아주대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '소프트웨어학과',
        standardMajor: '소프트웨어학',
        subjects: sub_0,
        note: note
    },
    {
        id: 'aju_13',
        region: 'gyounggi',
        univName: '아주대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '사이버보안학과',
        standardMajor: '사이버보안학',
        subjects: sub_0,
        note: note
    },
    {
        id: 'aju_14',
        region: 'gyounggi',
        univName: '아주대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '디지털미디어학과',
        standardMajor: '디지털미디어학과',
        subjects: sub_0,
        note: note
    },
    {
        id: 'aju_15',
        region: 'gyounggi',
        univName: '아주대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '국방디지털융합학과',
        standardMajor: '국방디지털융합학과',
        subjects: sub_0,
        note: note
    },
    {
        id: 'aju_16',
        region: 'gyounggi',
        univName: '아주대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '수학과',
        standardMajor: '수학과',
        subjects: sub_0,
        note: note
    },
    {
        id: 'aju_17',
        region: 'gyounggi',
        univName: '아주대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '프런티어과학학부',
        standardMajor: '프런티어과학학부',
        subjects: sub_0,
        note: note
    },
    {
        id: 'aju_18',
        region: 'gyounggi',
        univName: '아주대',
        category: '의약계열',
        standardCategory: 'medical',
        majorName: '의학과',
        standardMajor: '의예과',
        subjects: sub_0,
        note: note
    },
    {
        id: 'aju_19',
        region: 'gyounggi',
        univName: '아주대',
        category: '의약계열',
        standardCategory: 'medical',
        majorName: '간호학과',
        standardMajor: '간호학과',
        subjects: sub_0,
        note: note
    },
    {
        id: 'aju_20',
        region: 'gyounggi',
        univName: '아주대',
        category: '의약계열',
        standardCategory: 'medical',
        majorName: '약학과',
        standardMajor: '약학과',
        subjects: sub_0,
        note: note
    },
    {
        id: 'aju_21',
        region: 'gyounggi',
        univName: '아주대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '첨단바이오융합대학',
        standardMajor: '첨단바이오융합',
        subjects: sub_0,
        note: note
    },
    {
        id: 'aju_22',
        region: 'gyounggi',
        univName: '아주대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '경영학과',
        standardMajor: '경영학',
        subjects: sub_0,
        note: note
    },
    {
        id: 'aju_23',
        region: 'gyounggi',
        univName: '아주대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '경영인텔리전스학과',
        standardMajor: '경영인텔리전스학',
        subjects: sub_0,
        note: note
    },
    {
        id: 'aju_24',
        region: 'gyounggi',
        univName: '아주대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '국어국문학과',
        standardMajor: '국어국문학',
        subjects: sub_1,
        note: note_1
    },
    {
        id: 'aju_25',
        region: 'gyounggi',
        univName: '아주대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '영어영문학과',
        standardMajor: '영어영문학',
        subjects: sub_1,
        note: note_1
    },
    {
        id: 'aju_26',
        region: 'gyounggi',
        univName: '아주대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '불어불문학과',
        standardMajor: '불어불문학',
        subjects: sub_1,
        note: note_1
    },
    {
        id: 'aju_27',
        region: 'gyounggi',
        univName: '아주대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '사학과',
        standardMajor: '사학과',
        subjects: sub_1,
        note: note_1
    },
    {
        id: 'aju_28',
        region: 'gyounggi',
        univName: '아주대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '문화콘텐츠학과',
        standardMajor: '문화콘텐츠학과',
        subjects: sub_1,
        note: note_1
    },
    {
        id: 'aju_29',
        region: 'gyounggi',
        univName: '아주대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '행정학과',
        standardMajor: '행정학',
        subjects: sub_0,
        note: note
    },
    {
        id: 'aju_30',
        region: 'gyounggi',
        univName: '아주대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '심리학과',
        standardMajor: '심리학',
        subjects: sub_0,
        note: note
    },
    {
        id: 'aju_31',
        region: 'gyounggi',
        univName: '아주대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '경제정치사회융합학부',
        standardMajor: '경제정치사회융합학부',
        subjects: sub_0,
        note: note
    },
]

export { AJU }
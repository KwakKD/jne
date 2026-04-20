import type { UniverseType } from "@/type/nav";

interface subprops {
    group: string
    name: string
    type: 'all'
    isGeneral: boolean
}

const sub_0: subprops[] = [
    { group: '수학', name: '수학', type: 'all', isGeneral: false },
    { group: '과학', name: '과학', type: 'all', isGeneral: false },
]

const sub_1: subprops[] = [
    { group: '국어', name: '국어', type: 'all', isGeneral: false },
    { group: '영어', name: '영어', type: 'all', isGeneral: false },
]

const sub_2: subprops[] = [
    { group: '영어', name: '영어', type: 'all', isGeneral: false },
    { group: '사회', name: '사회', type: 'all', isGeneral: false },
]

const note_0 = '* 관련 교과(군)을 제시하지 않은 모집단위(융합자율대학, 야간학과)는 계열 상관없이 학생의 진로와 적성에 따라 과목 선택하여 이수하도록 권장함.'

const HANBAT: UniverseType[] = [
    {
        id: 'hanbat_0',
        region: 'daejeon',
        univName: '국립한밭대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '기계공학과',
        standardMajor: '기계공학',
        subjects: sub_0,
        note: note_0
    },
    {
        id: 'hanbat_1',
        region: 'daejeon',
        univName: '국립한밭대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '산업경영공학과',
        standardMajor: '산업경영공학',
        subjects: sub_0,
        note: note_0
    },
    {
        id: 'hanbat_2',
        region: 'daejeon',
        univName: '국립한밭대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '건축설비시스템공학과',
        standardMajor: '건축설비시스템공학',
        subjects: sub_0,
        note: note_0
    },
    {
        id: 'hanbat_3',
        region: 'daejeon',
        univName: '국립한밭대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '신소재공학과',
        standardMajor: '신소재공학',
        subjects: sub_0,
        note: note_0
    },
    {
        id: 'hanbat_4',
        region: 'daejeon',
        univName: '국립한밭대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '우주국방첨단융합학과',
        standardMajor: '우주국방첨단융합학',
        subjects: sub_0,
        note: note_0
    },
    {
        id: 'hanbat_5',
        region: 'daejeon',
        univName: '국립한밭대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '창의융합학과',
        standardMajor: '창의융합학',
        subjects: sub_0,
        note: note_0
    },
    {
        id: 'hanbat_6',
        region: 'daejeon',
        univName: '국립한밭대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '화학생명공학과',
        standardMajor: '화학생명공학',
        subjects: sub_0,
        note: note_0
    },
    {
        id: 'hanbat_7',
        region: 'daejeon',
        univName: '국립한밭대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '모바일융합공학과',
        standardMajor: '모바일융합공학',
        subjects: sub_0,
        note: note_0
    },
    {
        id: 'hanbat_8',
        region: 'daejeon',
        univName: '국립한밭대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '반도체시스템공학과',
        standardMajor: '반도체시스템공학',
        subjects: sub_0,
        note: note_0
    },
    {
        id: 'hanbat_9',
        region: 'daejeon',
        univName: '국립한밭대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '빅데이터헬스케어융합학과',
        standardMajor: '빅데이터헬스케어융합학',
        subjects: sub_0,
        note: note_0
    },
    {
        id: 'hanbat_10',
        region: 'daejeon',
        univName: '국립한밭대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '인공지능소프트웨어학과',
        standardMajor: '인공지능소프트웨어학',
        subjects: sub_0,
        note: note_0
    },
    {
        id: 'hanbat_11',
        region: 'daejeon',
        univName: '국립한밭대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '전기공학과',
        standardMajor: '전기공학',
        subjects: sub_0,
        note: note_0
    },
    {
        id: 'hanbat_12',
        region: 'daejeon',
        univName: '국립한밭대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '전자공학과',
        standardMajor: '전자공학',
        subjects: sub_0,
        note: note_0
    },
    {
        id: 'hanbat_13',
        region: 'daejeon',
        univName: '국립한밭대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '정보통신공학과',
        standardMajor: '정보통신공학',
        subjects: sub_0,
        note: note_0
    },
    {
        id: 'hanbat_14',
        region: 'daejeon',
        univName: '국립한밭대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '지능미디어공학과',
        standardMajor: '지능미디어공학',
        subjects: sub_0,
        note: note_0
    },
    {
        id: 'hanbat_15',
        region: 'daejeon',
        univName: '국립한밭대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '컴퓨터공학과',
        standardMajor: '컴퓨터공학',
        subjects: sub_0,
        note: note_0
    },
    {
        id: 'hanbat_16',
        region: 'daejeon',
        univName: '국립한밭대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '건축공학과',
        standardMajor: '건축공학',
        subjects: sub_0,
        note: note_0
    },
    {
        id: 'hanbat_17',
        region: 'daejeon',
        univName: '국립한밭대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '건축학과(5년제)',
        standardMajor: '건축학',
        subjects: sub_0,
        note: note_0
    },
    {
        id: 'hanbat_18',
        region: 'daejeon',
        univName: '국립한밭대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '도시공학과',
        standardMajor: '도시공학',
        subjects: sub_0,
        note: note_0
    },
    {
        id: 'hanbat_19',
        region: 'daejeon',
        univName: '국립한밭대',
        category: '예체능계열',
        standardCategory: 'arts_sports',
        majorName: '산업디자인학과',
        standardMajor: '산업디자인학',
        subjects: sub_1,
        note: note_0
    },
    {
        id: 'hanbat_20',
        region: 'daejeon',
        univName: '국립한밭대',
        category: '예체능계열',
        standardCategory: 'arts_sports',
        majorName: '시각·영상디자인학과',
        standardMajor: '시각·영상디자인학',
        subjects: sub_1,
        note: note_0
    },
    {
        id: 'hanbat_21',
        region: 'daejeon',
        univName: '국립한밭대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '공공행정학과',
        standardMajor: '공공행정학',
        subjects: sub_2,
        note: note_0
    },
    {
        id: 'hanbat_22',
        region: 'daejeon',
        univName: '국립한밭대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '영어영문학과',
        standardMajor: '영어영문학',
        subjects: sub_2,
        note: note_0
    },
    {
        id: 'hanbat_23',
        region: 'daejeon',
        univName: '국립한밭대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '일본어과',
        standardMajor: '일본어과',
        subjects: sub_2,
        note: note_0
    },
    {
        id: 'hanbat_24',
        region: 'daejeon',
        univName: '국립한밭대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '중국어과',
        standardMajor: '중국어과',
        subjects: sub_2,
        note: note_0
    },
    {
        id: 'hanbat_25',
        region: 'daejeon',
        univName: '국립한밭대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '경제학과',
        standardMajor: '경제학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note_0
    },
    {
        id: 'hanbat_26',
        region: 'daejeon',
        univName: '국립한밭대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '융합경영학과',
        standardMajor: '융합경영학',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note_0
    },
    {
        id: 'hanbat_27',
        region: 'daejeon',
        univName: '국립한밭대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '회계사무학과',
        standardMajor: '회계사무학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note_0
    },
]

export { HANBAT }
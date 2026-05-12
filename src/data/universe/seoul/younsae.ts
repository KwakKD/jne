import type { UniverseType } from "@/type/nav";

interface subprops {
    group: string
    name: string
    type: 'all'
    isGeneral: boolean
}

const sub_0: subprops[] = [
    { group: '', name: '전공연계과목 미제시', type: 'all', isGeneral: true },
]

const sub_1: subprops[] = [
    { group: '수학', name: '기하', type: 'all', isGeneral: false },
    { group: '수학', name: '미적분Ⅱ', type: 'all', isGeneral: false },
    { group: '과학', name: '과학', type: 'all', isGeneral: false },
]
const sub_2: subprops[] = [
    { group: '수학', name: '기하', type: 'all', isGeneral: false },
    { group: '수학', name: '미적분Ⅱ', type: 'all', isGeneral: false },
    { group: '과학', name: '물리학', type: 'all', isGeneral: false },
]
const sub_3: subprops[] = [
    { group: '수학', name: '기하', type: 'all', isGeneral: false },
    { group: '수학', name: '미적분Ⅱ', type: 'all', isGeneral: false },
    { group: '과학', name: '화학', type: 'all', isGeneral: false },
]
const sub_4: subprops[] = [
    { group: '수학', name: '기하', type: 'all', isGeneral: false },
    { group: '수학', name: '미적분Ⅱ', type: 'all', isGeneral: false },
    { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
]
const sub_5: subprops[] = [
    { group: '수학', name: '기하', type: 'all', isGeneral: false },
    { group: '수학', name: '미적분Ⅱ', type: 'all', isGeneral: false },
    { group: '과학', name: '지구과학', type: 'all', isGeneral: false },
]

const note_0 = '자신의 진로와 적성에 따라 과목 선택 및 이수 권장'
const note_1 = '과학 진로 선택 3과목 이상'


const YOUNSAE: UniverseType[] = [
    {
        id: 'younsae_0',
        region: 'seou;',
        univName: '연세대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '문과대학',
        standardMajor: '문과대학(연세대)',
        subjects: sub_0,
        note: note_0
    },
    {
        id: 'younsae_1',
        region: 'seou;',
        univName: '연세대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '상경대학',
        standardMajor: '상경대학(연세대)',
        subjects: sub_0,
        note: note_0
    },
    {
        id: 'younsae_2',
        region: 'seou;',
        univName: '연세대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '경영대학',
        standardMajor: '경영대학(연세대)',
        subjects: sub_0,
        note: note_0
    },
    {
        id: 'younsae_3',
        region: 'seou;',
        univName: '연세대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '신과대학',
        standardMajor: '신과대학(연세대)',
        subjects: sub_0,
        note: note_0
    },
    {
        id: 'younsae_4',
        region: 'seou;',
        univName: '연세대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '사회과학대학',
        standardMajor: '사회과학대학(연세대)',
        subjects: sub_0,
        note: note_0
    },
    {
        id: 'younsae_5',
        region: 'seou;',
        univName: '연세대',
        category: '예체능계열',
        standardCategory: 'arts_sports',
        majorName: '음악대학',
        standardMajor: '음악대학(연세대)',
        subjects: sub_0,
        note: note_0
    },
    {
        id: 'younsae_6',
        region: 'seou;',
        univName: '연세대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '생활과학대학',
        standardMajor: '생활과학대학(연세대)',
        subjects: sub_0,
        note: note_0
    },
    {
        id: 'younsae_7',
        region: 'seou;',
        univName: '연세대',
        category: '교육계열',
        standardCategory: 'education',
        majorName: '교육과학대학',
        standardMajor: '교육과학대학(연세대)',
        subjects: sub_0,
        note: note_0
    },
    {
        id: 'younsae_8',
        region: 'seou;',
        univName: '연세대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '언더우드국제대학',
        standardMajor: '언더우드국제대학(연세대)',
        subjects: sub_0,
        note: note_0
    },
    {
        id: 'younsae_9',
        region: 'seou;',
        univName: '연세대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '글로벌인제대학',
        standardMajor: '글로벌인제대학(연세대)',
        subjects: sub_0,
        note: note_0
    },
    {
        id: 'younsae_10',
        region: 'seou;',
        univName: '연세대',
        category: '의약계열',
        standardCategory: 'medical',
        majorName: '간호대학',
        standardMajor: '간호대학(연세대)',
        subjects: sub_0,
        note: note_0
    },
    {
        id: 'younsae_11',
        region: 'seou;',
        univName: '연세대',
        category: '자유계열',
        standardCategory: 'liberal_arts',
        majorName: '진리자유학부(인문)',
        standardMajor: '진리자유학부(연세대)',
        subjects: sub_0,
        note: note_0
    },
    {
        id: 'younsae_12',
        region: 'seou;',
        univName: '연세대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '수학과',
        standardMajor: '수학과',
        subjects: sub_1,
        note: note_1
    },
    {
        id: 'younsae_13',
        region: 'seou;',
        univName: '연세대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '물리학과',
        standardMajor: '물리학',
        subjects: sub_2,
        note: note_1
    },
    {
        id: 'younsae_14',
        region: 'seou;',
        univName: '연세대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '화학과',
        standardMajor: '화학',
        subjects: sub_3,
        note: note_1
    },
    {
        id: 'younsae_15',
        region: 'seou;',
        univName: '연세대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '지구시스템과학과',
        standardMajor: '지구시스템과학',
        subjects: sub_5,
        note: note_1
    },
    {
        id: 'younsae_16',
        region: 'seou;',
        univName: '연세대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '천문우주학과',
        standardMajor: '천문우주학',
        subjects: sub_5,
        note: note_1
    },
    {
        id: 'younsae_17',
        region: 'seou;',
        univName: '연세대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '대기과학과',
        standardMajor: '대기과학',
        subjects: sub_5,
        note: note_1
    },
    {
        id: 'younsae_18',
        region: 'seou;',
        univName: '연세대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '화공생명공학부',
        standardMajor: '화공생명공학',
        subjects: sub_3,
        note: note_1
    },
    {
        id: 'younsae_19',
        region: 'seou;',
        univName: '연세대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '전기전자공학부',
        standardMajor: '전기전자공학',
        subjects: sub_2,
        note: note_1
    },
    {
        id: 'younsae_20',
        region: 'seou;',
        univName: '연세대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '건측공학과',
        standardMajor: '건측공학',
        subjects: sub_1,
        note: note_1
    },
    {
        id: 'younsae_21',
        region: 'seou;',
        univName: '연세대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '도시공학과',
        standardMajor: '도시공학',
        subjects: sub_1,
        note: note_1
    },
    {
        id: 'younsae_22',
        region: 'seou;',
        univName: '연세대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '사회환경시스템공학부',
        standardMajor: '사회환경시스템공학',
        subjects: sub_1,
        note: note_1
    },
    {
        id: 'younsae_23',
        region: 'seou;',
        univName: '연세대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '기계공학부',
        standardMajor: '기계공학',
        subjects: sub_2,
        note: note_1
    },
    {
        id: 'younsae_24',
        region: 'seou;',
        univName: '연세대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '신소재공학부',
        standardMajor: '신소재공학',
        subjects: sub_3,
        note: note_1
    },
    {
        id: 'younsae_25',
        region: 'seou;',
        univName: '연세대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '산업공학과',
        standardMajor: '산업공학',
        subjects: sub_1,
        note: note_1
    },
    {
        id: 'younsae_26',
        region: 'seou;',
        univName: '연세대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '시스템반도체공학과',
        standardMajor: '시스템반도체공학',
        subjects: sub_2,
        note: note_1
    },
    {
        id: 'younsae_27',
        region: 'seou;',
        univName: '연세대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '디스플레이융합공학과',
        standardMajor: '디스플레이융합공학',
        subjects: sub_2,
        note: note_1
    },
    {
        id: 'younsae_28',
        region: 'seou;',
        univName: '연세대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '생명과학부',
        standardMajor: '생명과학',
        subjects: sub_4,
        note: note_1
    },
    {
        id: 'younsae_29',
        region: 'seou;',
        univName: '연세대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '시스템생물학과',
        standardMajor: '시스템생물학',
        subjects: sub_4,
        note: note_1
    },
    {
        id: 'younsae_30',
        region: 'seoul',
        univName: '연세대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '생화학과',
        standardMajor: '생화학',
        subjects: sub_4,
        note: note_1
    },
    {
        id: 'younsae_31',
        region: 'seoul',
        univName: '연세대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '생명공학과',
        standardMajor: '생명공학',
        subjects: sub_4,
        note: note_1
    },
    {
        id: 'younsae_32',
        region: 'seoul',
        univName: '연세대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '컴퓨터과학과',
        standardMajor: '컴퓨터과학',
        subjects: sub_1,
        note: note_1
    },
    {
        id: 'younsae_33',
        region: 'seoul',
        univName: '연세대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '인공지능학과',
        standardMajor: '인공지능학',
        subjects: sub_1,
        note: note_1
    },
    {
        id: 'younsae_34',
        region: 'seoul',
        univName: '연세대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '인공지능시스템학과',
        standardMajor: '인공지능시스템학',
        subjects: sub_1,
        note: note_1
    },
    {
        id: 'younsae_35',
        region: 'seoul',
        univName: '연세대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: 'IT융합공학전공',
        standardMajor: 'IT융합공학',
        subjects: sub_1,
        note: note_1
    },
    {
        id: 'younsae_36',
        region: 'seoul',
        univName: '연세대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '지능형반도체전공',
        standardMajor: '지능형반도체학',
        subjects: sub_1,
        note: note_1
    },
    {
        id: 'younsae_37',
        region: 'seoul',
        univName: '연세대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '모빌리티시스템전공',
        standardMajor: '모빌리티시스템학',
        subjects: sub_1,
        note: note_1
    },
    {
        id: 'younsae_38',
        region: 'seoul',
        univName: '연세대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '언더우드학부(생명과학공학)',
        standardMajor: '생명과학공학',
        subjects: sub_1,
        note: note_1
    },
    {
        id: 'younsae_39',
        region: 'seoul',
        univName: '연세대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '융합과학공학부(ISE))',
        standardMajor: '융합과학공학',
        subjects: sub_1,
        note: note_1
    },
    {
        id: 'younsae_40',
        region: 'seoul',
        univName: '연세대',
        category: '자유계열',
        standardCategory: 'liberal_arts',
        majorName: '진지자유학부(자연)',
        standardMajor: '진리자유학부(연세대)',
        subjects: [
            { group: '수학', name: '기하', type: 'all', isGeneral: true },
            { group: '수학', name: '미적분Ⅱ', type: 'all', isGeneral: true },
            { group: '과학', name: '과학', type: 'all', isGeneral: true },
        ],
        note: note_1
    },
    {
        id: 'younsae_41',
        region: 'seoul',
        univName: '연세대',
        category: '의약계열',
        standardCategory: 'medical',
        majorName: '의예과',
        standardMajor: '의예과',
        subjects: sub_4,
        note: note_1
    },
    {
        id: 'younsae_42',
        region: 'seoul',
        univName: '연세대',
        category: '의약계열',
        standardCategory: 'medical',
        majorName: '치의예과',
        standardMajor: '치의예과',
        subjects: [
            { group: '수학', name: '기하', type: 'all', isGeneral: false },
            { group: '수학', name: '미적분Ⅱ', type: 'all', isGeneral: false },
            { group: '과학', name: '물리학', type: 'all', isGeneral: false },
            { group: '과학', name: '화학', type: 'all', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
        ],
        note: '물리학, 화학, 생명과학 중 택1\n과학 진로 선택 과목 중 3과목 이상'
    },
    {
        id: 'younsae_43',
        region: 'seoul',
        univName: '연세대',
        category: '의약계열',
        standardCategory: 'medical',
        majorName: '약학과',
        standardMajor: '약학과',
        subjects: [
            { group: '수학', name: '기하', type: 'all', isGeneral: false },
            { group: '수학', name: '미적분Ⅱ', type: 'all', isGeneral: false },
            { group: '과학', name: '화학', type: 'all', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
        ],
        note: note_1
    },
    {
        id: 'younsae_44',
        region: 'seoul',
        univName: '연세대',
        category: '의약계열',
        standardCategory: 'medical',
        majorName: '첨단약과학과',
        standardMajor: '첨단약과학과',
        subjects: [
            { group: '수학', name: '기하', type: 'all', isGeneral: false },
            { group: '수학', name: '미적분Ⅱ', type: 'all', isGeneral: false },
            { group: '과학', name: '화학', type: 'all', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
        ],
        note: note_1
    },
]

export { YOUNSAE }
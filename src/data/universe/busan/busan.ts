import type { UniverseType } from "@/type/nav";

interface subprops {
    group: string
    name: string
    type: 'all'
    isGeneral: boolean
}

const sub_0: subprops[] = [
    { group: '수학', name: '기하', type: 'all', isGeneral: false },
    { group: '수학', name: '미적분Ⅱ', type: 'all', isGeneral: false },
    { group: '과학', name: '물리학', type: 'all', isGeneral: false },
    { group: '과학', name: '화학', type: 'all', isGeneral: false },
]

const sub_1: subprops[] = [
    { group: '수학', name: '확률과 통계', type: 'all', isGeneral: false },
    { group: '수학', name: '기하', type: 'all', isGeneral: false },
    { group: '수학', name: '미적분Ⅱ', type: 'all', isGeneral: false },
]

const sub_2: subprops[] = [
    { group: '과학', name: '화학', type: 'all', isGeneral: false },
    { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
]
const sub_3: subprops[] = [
    { group: '과학', name: '물리학', type: 'all', isGeneral: false },
    { group: '과학', name: '화학', type: 'all', isGeneral: false },
    { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
]

const note_0 = '제시 과목 관련 일반 선택 과목 및 진로 선택 과목 중 3과목 이상 이수\n-화학 관련 과목: 화학, 물질과 에너지, 화학 반응의 세계\n-생명과학 관련 과목: 생명과학, 세포와 물질대사, 생물의 유전'
const note_1 = '제시 과목 관련 일반 선택 과목 및 진로 선택 과목 중 1과목 이상 이수\n-물리학 관련 과목: 물리학, 역학과 에너지, 전자기와 양자\n-지구과학 관련 과목: 지구과학, 지구시스템과학, 행성우주과학'
const note_2 = '기하, 미적분Ⅱ 중 1과목 이상 이수, 물리학, 화학 관련 일반 선택 과목 및 진로 선택 과목 중 3과목 이상 이수'
const note_3 = '제시 과목 관련 일반 선택 과목 및 진로 선택 과목 중 1과목 이상 이수\n-물리학 관련 과목: 물리학, 역학과 에너지, 전자기와 양자\n-화학 관련 과목: 화학, 물질과 에너지, 화학 반응의 세계\n-생명과학 관련 과목: 생명과학, 세포와 물질대사, 생물의 유전'


const BUSAN: UniverseType[] = [
    {
        id: 'busan_0',
        region: 'busan',
        univName: '부산대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '경제학부',
        standardMajor: '경제학',
        subjects: [
            { group: '수학', name: '확률과 통계', type: 'all', isGeneral: false },
            { group: '수학', name: '미적분Ⅰ', type: 'all', isGeneral: false },
            { group: '수학', name: '미적분Ⅱ', type: 'all', isGeneral: false },
        ],
        note: '제시 과목 중, 1과목 이상 이수'
    },
    {
        id: 'busan_1',
        region: 'busan',
        univName: '부산대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '경영학과',
        standardMajor: '경영학',
        subjects: [
            { group: '수학', name: '확률과 통계', type: 'all', isGeneral: false },
            { group: '수학', name: '미적분Ⅰ', type: 'all', isGeneral: false },
            { group: '수학', name: '미적분Ⅱ', type: 'all', isGeneral: false },
        ],
        note: '제시 과목 중, 1과목 이상 이수'
    },
    {
        id: 'busan_2',
        region: 'busan',
        univName: '부산대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '수학과',
        standardMajor: '수학과',
        subjects: [
            { group: '수학', name: '확률과 통계', type: 'all', isGeneral: false },
            { group: '수학', name: '기하', type: 'all', isGeneral: false },
            { group: '수학', name: '미적분Ⅱ', type: 'all', isGeneral: false },
        ],
        note: '제시 과목 중, 2과목 이상 이수'
    },
    {
        id: 'busan_3',
        region: 'busan',
        univName: '부산대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '통계학과',
        standardMajor: '통계학',
        subjects: [
            { group: '수학', name: '확률과 통계', type: 'all', isGeneral: false },
            { group: '수학', name: '기하', type: 'all', isGeneral: false },
            { group: '수학', name: '미적분Ⅱ', type: 'all', isGeneral: false },
        ],
        note: '제시 과목 중, 2과목 이상 이수'
    },
    {
        id: 'busan_4',
        region: 'busan',
        univName: '부산대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '화학과',
        standardMajor: '화학',
        subjects: [
            { group: '과학', name: '화학', type: 'all', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
        ],
        note: note_0
    },
    {
        id: 'busan_5',
        region: 'busan',
        univName: '부산대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '생명과학과',
        standardMajor: '생명과학',
        subjects: [
            { group: '과학', name: '화학', type: 'all', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
        ],
        note: note_0
    },
    {
        id: 'busan_6',
        region: 'busan',
        univName: '부산대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '미생물학과',
        standardMajor: '미생물학',
        subjects: [
            { group: '과학', name: '화학', type: 'all', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
        ],
        note: note_0
    },
    {
        id: 'busan_7',
        region: 'busan',
        univName: '부산대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '분자생물학과',
        standardMajor: '분자생물학',
        subjects: [
            { group: '과학', name: '화학', type: 'all', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
        ],
        note: note_0
    },
    {
        id: 'busan_8',
        region: 'busan',
        univName: '부산대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '물리학과',
        standardMajor: '물리학',
        subjects: [
            { group: '수학', name: '기하', type: 'all', isGeneral: false },
            { group: '수학', name: '미적분Ⅱ', type: 'all', isGeneral: false },
            { group: '과학', name: '물리학', type: 'all', isGeneral: false },
            { group: '과학', name: '화학', type: 'all', isGeneral: false },
        ],
        note: '기하, 미적분Ⅱ 중 1과목 이상 이수, 물리학, 화학 관련 일반 선택 과목 및 진로 선택 과목 중 3과목 이상 이수 \n-물리학 관련 과목: 물리학, 역학과 에너지, 전자기와 양자\n-화학 관련 과목: 화학, 물질과 에너지, 화학 반응의 세계'
    },
    {
        id: 'busan_9',
        region: 'busan',
        univName: '부산대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '지질환경과학과',
        standardMajor: '지질환경과학',
        subjects: [
            { group: '과학', name: '물리학', type: 'all', isGeneral: false },
            { group: '과학', name: '지구과학', type: 'all', isGeneral: false },
        ],
        note: note_1
    },
    {
        id: 'busan_10',
        region: 'busan',
        univName: '부산대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '해양학과',
        standardMajor: '해양학',
        subjects: [
            { group: '과학', name: '물리학', type: 'all', isGeneral: false },
            { group: '과학', name: '지구과학', type: 'all', isGeneral: false },
        ],
        note: note_1
    },
    {
        id: 'busan_11',
        region: 'busan',
        univName: '부산대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '대기환경과학과',
        standardMajor: '대기환경과학',
        subjects: [
            { group: '과학', name: '물리학', type: 'all', isGeneral: false },
            { group: '과학', name: '지구과학', type: 'all', isGeneral: false },
        ],
        note: note_1
    },
    {
        id: 'busan_12',
        region: 'busan',
        univName: '부산대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '산업공학과',
        standardMajor: '산업공학',
        subjects: [
            { group: '수학', name: '확률과 통계', type: 'all', isGeneral: false },
            { group: '수학', name: '기하', type: 'all', isGeneral: false },
            { group: '수학', name: '미적분Ⅱ', type: 'all', isGeneral: false },
        ],
        note: '제시 과목 중, 2과목 이상 이수'
    },
    {
        id: 'busan_13',
        region: 'busan',
        univName: '부산대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '기계공학부',
        standardMajor: '기계공학',
        subjects: sub_0,
        note: note_2
    },
    {
        id: 'busan_14',
        region: 'busan',
        univName: '부산대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '고분자공학과',
        standardMajor: '고분자공학',
        subjects: sub_0,
        note: note_2
    },
    {
        id: 'busan_15',
        region: 'busan',
        univName: '부산대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '유기소재시스템공학과',
        standardMajor: '유기소재시스템공학',
        subjects: sub_0,
        note: note_2
    },
    {
        id: 'busan_16',
        region: 'busan',
        univName: '부산대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '화공생명공학과',
        standardMajor: '화공생명공학',
        subjects: sub_0,
        note: note_2
    },
    {
        id: 'busan_17',
        region: 'busan',
        univName: '부산대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '환경공학과',
        standardMajor: '환경공학',
        subjects: sub_0,
        note: note_2
    },
    {
        id: 'busan_18',
        region: 'busan',
        univName: '부산대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '재료공학과',
        standardMajor: '재료공학',
        subjects: sub_0,
        note: note_2
    },
    {
        id: 'busan_19',
        region: 'busan',
        univName: '부산대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '전자전기공학부(전기공학전공)',
        standardMajor: '전기공학',
        subjects: sub_0,
        note: note_2
    },
    {
        id: 'busan_20',
        region: 'busan',
        univName: '부산대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '건축공학과',
        standardMajor: '건축공학',
        subjects: sub_0,
        note: note_2
    },
    {
        id: 'busan_21',
        region: 'busan',
        univName: '부산대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '전자전기공학부(전자공학전공)',
        standardMajor: '전자공학',
        subjects: sub_0,
        note: note_2
    },
    {
        id: 'busan_22',
        region: 'busan',
        univName: '부산대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '전자전기공학부(반도체공학전공)',
        standardMajor: '반도체공학',
        subjects: sub_0,
        note: note_2
    },
    {
        id: 'busan_23',
        region: 'busan',
        univName: '부산대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '사회시스템공학과',
        standardMajor: '사회시스템공학',
        subjects: sub_0,
        note: note_2
    },
    {
        id: 'busan_24',
        region: 'busan',
        univName: '부산대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '항공우주공학과',
        standardMajor: '항공우주공학',
        subjects: sub_0,
        note: note_2
    },
    {
        id: 'busan_25',
        region: 'busan',
        univName: '부산대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '조선·해양공학과',
        standardMajor: '조선·해양공학',
        subjects: sub_0,
        note: note_2
    },
    {
        id: 'busan_26',
        region: 'busan',
        univName: '부산대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '첨단IT자율전공',
        standardMajor: '첨단IT자율전공',
        subjects: sub_0,
        note: note_2
    },
    {
        id: 'busan_27',
        region: 'busan',
        univName: '부산대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '첨단소재자율전공',
        standardMajor: '첨단소재자율전공',
        subjects: sub_0,
        note: note_2
    },
    {
        id: 'busan_28',
        region: 'busan',
        univName: '부산대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '첨단모빌리티자율전공',
        standardMajor: '첨단모빌리티자율전공',
        subjects: sub_0,
        note: note_2
    },
    {
        id: 'busan_29',
        region: 'busan',
        univName: '부산대',
        category: '교육계열',
        standardCategory: 'education',
        majorName: '수학교육과',
        standardMajor: '수학교육과',
        subjects: sub_1,
        note: '제시 과목 중, 2과목 이상 이수'
    },
    {
        id: 'busan_30',
        region: 'busan',
        univName: '부산대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '정보컴퓨터공학부(컴퓨터공학전공)',
        standardMajor: '컴퓨터공학',
        subjects: sub_1,
        note: '제시 과목 중, 2과목 이상 이수'
    },
    {
        id: 'busan_31',
        region: 'busan',
        univName: '부산대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '정보컴퓨터공학부(인공지능전공)',
        standardMajor: '인공지능학',
        subjects: sub_1,
        note: '제시 과목 중, 2과목 이상 이수'
    },
    {
        id: 'busan_32',
        region: 'busan',
        univName: '부산대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '정보컴퓨터공학부(디자인테크놀로지전공)',
        standardMajor: '디자인테크놀로지',
        subjects: sub_1,
        note: '제시 과목 중, 2과목 이상 이수'
    },
    {
        id: 'busan_33',
        region: 'busan',
        univName: '부산대',
        category: '교육계열',
        standardCategory: 'education',
        majorName: '생물교육과',
        standardMajor: '생물교육과',
        subjects: [
            { group: '과학', name: '화학', type: 'all', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
        ],
        note: note_0
    },
    {
        id: 'busan_34',
        region: 'busan',
        univName: '부산대',
        category: '교육계열',
        standardCategory: 'education',
        majorName: '물리교육과',
        standardMajor: '물리교육과',
        subjects: sub_0,
        note: note_2
    },
    {
        id: 'busan_35',
        region: 'busan',
        univName: '부산대',
        category: '교육계열',
        standardCategory: 'education',
        majorName: '화학교육과',
        standardMajor: '화학교육과',
        subjects: sub_0,
        note: note_2
    },
    {
        id: 'busan_36',
        region: 'busan',
        univName: '부산대',
        category: '교육계열',
        standardCategory: 'education',
        majorName: '지구과학교육과',
        standardMajor: '지구과학교육과',
        subjects: [
            { group: '과학', name: '물리학', type: 'all', isGeneral: false },
            { group: '과학', name: '지구과학', type: 'all', isGeneral: false },
        ],
        note: note_1
    },
    {
        id: 'busan_37',
        region: 'busan',
        univName: '부산대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '식품영양학과',
        standardMajor: '식품영양학',
        subjects: sub_2,
        note: note_0
    },
    {
        id: 'busan_38',
        region: 'busan',
        univName: '부산대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '원예생명과학과',
        standardMajor: '원예생명과학',
        subjects: sub_2,
        note: note_0
    },
    {
        id: 'busan_39',
        region: 'busan',
        univName: '부산대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '식품공학과',
        standardMajor: '식품공학',
        subjects: sub_2,
        note: note_0
    },
    {
        id: 'busan_40',
        region: 'busan',
        univName: '부산대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '생명환경화학과',
        standardMajor: '생명환경화학',
        subjects: sub_2,
        note: note_0
    },
    {
        id: 'busan_41',
        region: 'busan',
        univName: '부산대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '바이오소재과학과',
        standardMajor: '바이오소재과학',
        subjects: sub_2,
        note: note_0
    },
    {
        id: 'busan_42',
        region: 'busan',
        univName: '부산대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '바이오환경에너지학과',
        standardMajor: '바이오환경에너지학',
        subjects: sub_2,
        note: note_0
    },
    {
        id: 'busan_43',
        region: 'busan',
        univName: '부산대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '조경학과',
        standardMajor: '조경학',
        subjects: sub_2,
        note: note_0
    },
    {
        id: 'busan_44',
        region: 'busan',
        univName: '부산대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '바이오산업기계공학과',
        standardMajor: '바이오산업기계공학',
        subjects: sub_0,
        note: note_2
    },
    {
        id: 'busan_45',
        region: 'busan',
        univName: '부산대',
        category: '의약계열',
        standardCategory: 'medical',
        majorName: '간호학과',
        standardMajor: '간호학과',
        subjects: sub_2,
        note: note_0
    },
    {
        id: 'busan_46',
        region: 'busan',
        univName: '부산대',
        category: '의약계열',
        standardCategory: 'medical',
        majorName: '약학부',
        standardMajor: '약학과',
        subjects: sub_2,
        note: note_0
    },
    {
        id: 'busan_47',
        region: 'busan',
        univName: '부산대',
        category: '의약계열',
        standardCategory: 'medical',
        majorName: '의예과',
        standardMajor: '의예과',
        subjects: sub_2,
        note: note_0
    },
    {
        id: 'busan_48',
        region: 'busan',
        univName: '부산대',
        category: '의약계열',
        standardCategory: 'medical',
        majorName: '치의예과',
        standardMajor: '치의예과',
        subjects: sub_2,
        note: note_0
    },
    {
        id: 'busan_49',
        region: 'busan',
        univName: '부산대',
        category: '의약계열',
        standardCategory: 'medical',
        majorName: '한의학전문대학원학·석사통학과정',
        standardMajor: '한의학전문대학원학·석사통학과정',
        subjects: sub_2,
        note: note_0
    },
    {
        id: 'busan_50',
        region: 'busan',
        univName: '부산대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '의생명융합공학부',
        standardMajor: '의생명융합공학',
        subjects: sub_3,
        note: note_3
    },
    {
        id: 'busan_51',
        region: 'busan',
        univName: '부산대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '응용생명융합학부',
        standardMajor: '응용생명융합학',
        subjects: sub_3,
        note: note_3
    },
    {
        id: 'busan_52',
        region: 'busan',
        univName: '부산대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '첨단융합학부',
        standardMajor: '첨단융합학',
        subjects: sub_0,
        note: note_2
    },
]

export { BUSAN }
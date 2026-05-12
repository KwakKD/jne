import type { UniverseType } from "@/type/nav";

const note = '- 지리: 세계시민과 지리, 한국지리 탐구, 도시의 미래 탐구\n- 역사: 세계사, 동아시아 역사기행\n- 일반사회: 사회와 문화, 정치, 법과 사회, 경제, 국제관계의 이해 \n - 윤리: 현대사회와 윤리, 윤리와 사상, 인문학과 윤리\n - 사회: 상기 지리, 역사, 일반사회, 윤리 전 과목\n - 물리학: 물리학, 역학과 에너지, 전자기와 양자\n - 화학: 화학, 물질과 에너지, 화학반응의 세계\n- 생명과학: 생명과학, 세포와 물질대사, 생물의 유전 \n - 지구과학: 지구과학, 지구시스템과학, 행성우주과학\n - 과학: 상기 물리학, 화학, 생명과학, 지구과학 전 과목'

const JEONNAM: UniverseType[] = [
    {
        id: 'jeonnam_0',
        region: 'gwangju',
        univName: '전남대',
        category: '의약계열',
        standardCategory: 'medical',
        majorName: '간호학과',
        standardMajor: '간호학과',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_1',
        region: 'gwangju',
        univName: '전남대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '경영학부',
        standardMajor: '경영학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_2',
        region: 'gwangju',
        univName: '전남대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '경제학부',
        standardMajor: '경제학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_3',
        region: 'gwangju',
        univName: '전남대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '건축학부',
        standardMajor: '건축학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_4',
        region: 'gwangju',
        univName: '전남대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '토목공학과',
        standardMajor: '토목공학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '물리학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_5',
        region: 'gwangju',
        univName: '전남대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '기계공학과',
        standardMajor: '기계공학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '물리학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_6',
        region: 'gwangju',
        univName: '전남대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '전자컴퓨터공학부',
        standardMajor: '전자컴퓨터공학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '물리학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_7',
        region: 'gwangju',
        univName: '전남대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '전기공학과',
        standardMajor: '전기공학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '물리학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_8',
        region: 'gwangju',
        univName: '전남대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '환경에너지공학과',
        standardMajor: '환경에너지공학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '화학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_9',
        region: 'gwangju',
        univName: '전남대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '고분자융합소재공학부',
        standardMajor: '고분자융합소재공학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '화학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_10',
        region: 'gwangju',
        univName: '전남대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '에너지자원공학과',
        standardMajor: '에너지자원공학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '물리학', type: 'all', isGeneral: false },
            { group: '과학', name: '화학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_11',
        region: 'gwangju',
        univName: '전남대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '신소재공학부',
        standardMajor: '신소재공학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '물리학', type: 'all', isGeneral: false },
            { group: '과학', name: '화학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_12',
        region: 'gwangju',
        univName: '전남대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '화학공학부',
        standardMajor: '화학공학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '물리학', type: 'all', isGeneral: false },
            { group: '과학', name: '화학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_13',
        region: 'gwangju',
        univName: '전남대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '산업공학과',
        standardMajor: '산업공학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_14',
        region: 'gwangju',
        univName: '전남대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '생물공학과',
        standardMajor: '생물공학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '화학', type: 'all', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_15',
        region: 'gwangju',
        univName: '전남대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '응용식물학과',
        standardMajor: '응용식물학',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '과학', name: '화학', type: 'all', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_16',
        region: 'gwangju',
        univName: '전남대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '원예생명공학과',
        standardMajor: '원예생명공학',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '과학', name: '화학', type: 'all', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_17',
        region: 'gwangju',
        univName: '전남대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '응용생물학과',
        standardMajor: '응용생물학',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '과학', name: '화학', type: 'all', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_18',
        region: 'gwangju',
        univName: '전남대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '산림자원학과',
        standardMajor: '산림자원학',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '과학', name: '화학', type: 'all', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_19',
        region: 'gwangju',
        univName: '전남대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '농업생명화학과',
        standardMajor: '농업생명화학',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '과학', name: '화학', type: 'all', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_20',
        region: 'gwangju',
        univName: '전남대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '식품공학과',
        standardMajor: '식품공학',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '과학', name: '화학', type: 'all', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_21',
        region: 'gwangju',
        univName: '전남대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '분자생명공학과',
        standardMajor: '분자생명공학',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '과학', name: '화학', type: 'all', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_22',
        region: 'gwangju',
        univName: '전남대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '동물자원학부',
        standardMajor: '동물자원학',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '과학', name: '화학', type: 'all', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_23',
        region: 'gwangju',
        univName: '전남대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '임산공학과',
        standardMajor: '임산공학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_24',
        region: 'gwangju',
        univName: '전남대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '조경학과',
        standardMajor: '조경학',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
            { group: '과학', name: '지구과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_25',
        region: 'gwangju',
        univName: '전남대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '지역·바이오시스템공학과',
        standardMajor: '지역·바이오시스템공학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '물리학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_26',
        region: 'gwangju',
        univName: '전남대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '바이오에너지공학과',
        standardMajor: '바이오에너지공학',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '과학', name: '화학', type: 'all', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_27',
        region: 'gwangju',
        univName: '전남대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '농업경제학과',
        standardMajor: '농업경제학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_28',
        region: 'gwangju',
        univName: '전남대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '융합바이오시스템기계공학과',
        standardMajor: '융합바이오시스템기계공학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '물리학', type: 'all', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_29',
        region: 'gwangju',
        univName: '전남대',
        category: '교육계열',
        standardCategory: 'education',
        majorName: '국어교육과',
        standardMajor: '국어교육과',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_30',
        region: 'gwangju',
        univName: '전남대',
        category: '교육계열',
        standardCategory: 'education',
        majorName: '영어교육과',
        standardMajor: '영어교육과',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_31',
        region: 'gwangju',
        univName: '전남대',
        category: '교육계열',
        standardCategory: 'education',
        majorName: '교육학과',
        standardMajor: '교육학과',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_32',
        region: 'gwangju',
        univName: '전남대',
        category: '교육계열',
        standardCategory: 'education',
        majorName: '유아교육과',
        standardMajor: '유아교육과',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_33',
        region: 'gwangju',
        univName: '전남대',
        category: '교육계열',
        standardCategory: 'education',
        majorName: '지리교육과',
        standardMajor: '지리교육과',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '사회', name: '지리', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_34',
        region: 'gwangju',
        univName: '전남대',
        category: '교육계열',
        standardCategory: 'education',
        majorName: '역사교육과',
        standardMajor: '역사교육과',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '사회', name: '역사', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_35',
        region: 'gwangju',
        univName: '전남대',
        category: '교육계열',
        standardCategory: 'education',
        majorName: '윤리교육과',
        standardMajor: '윤리교육과',
        subjects: [
            { group: '사회', name: '윤리', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_36',
        region: 'gwangju',
        univName: '전남대',
        category: '교육계열',
        standardCategory: 'education',
        majorName: '수학교육과',
        standardMajor: '수학교육과',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_37',
        region: 'gwangju',
        univName: '전남대',
        category: '교육계열',
        standardCategory: 'education',
        majorName: '물리교육과',
        standardMajor: '물리교육과',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '물리학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_38',
        region: 'gwangju',
        univName: '전남대',
        category: '교육계열',
        standardCategory: 'education',
        majorName: '화학교육과',
        standardMajor: '화학교육과',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '화학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_39',
        region: 'gwangju',
        univName: '전남대',
        category: '교육계열',
        standardCategory: 'education',
        majorName: '생물교육과',
        standardMajor: '생물교육과',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_40',
        region: 'gwangju',
        univName: '전남대',
        category: '교육계열',
        standardCategory: 'education',
        majorName: '지구과학교육과',
        standardMajor: '지구과학교육과',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '물리학', type: 'all', isGeneral: false },
            { group: '과학', name: '지구과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_41',
        region: 'gwangju',
        univName: '전남대',
        category: '교육계열',
        standardCategory: 'education',
        majorName: '가정교육과',
        standardMajor: '가정교육과',
        subjects: [
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
            { group: '과학', name: '화학', type: 'all', isGeneral: false },
            { group: '기술·가정/정보', name: '기술·가정/정보', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_42',
        region: 'gwangju',
        univName: '전남대',
        category: '교육계열',
        standardCategory: 'education',
        majorName: '특수교육학부',
        standardMajor: '특수교육과',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
            { group: '사회', name: '윤리', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_43',
        region: 'gwangju',
        univName: '전남대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '정치외교학과',
        standardMajor: '정치외교학',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_44',
        region: 'gwangju',
        univName: '전남대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '사회학과',
        standardMajor: '사회학',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_45',
        region: 'gwangju',
        univName: '전남대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '심리학과',
        standardMajor: '심리학',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_46',
        region: 'gwangju',
        univName: '전남대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '행정학과',
        standardMajor: '행정학',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_47',
        region: 'gwangju',
        univName: '전남대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '정치외교학과',
        standardMajor: '정치외교학',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_48',
        region: 'gwangju',
        univName: '전남대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '문헌정보학과',
        standardMajor: '문헌정보학',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_49',
        region: 'gwangju',
        univName: '전남대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '미디어커뮤니케이션학과',
        standardMajor: '미디어커뮤니케이션학',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_50',
        region: 'gwangju',
        univName: '전남대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '지리학과',
        standardMajor: '지리학',
        subjects: [
            { group: '사회', name: '지리', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_51',
        region: 'gwangju',
        univName: '전남대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '문화인류고고학과',
        standardMajor: '문화인류고고학',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
            { group: '사회', name: '역사', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_52',
        region: 'gwangju',
        univName: '전남대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '생활복지학과',
        standardMajor: '생활복지학',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_53',
        region: 'gwangju',
        univName: '전남대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '식품영양과학부',
        standardMajor: '식품영양학',
        subjects: [
            { group: '과학', name: '화학', type: 'all', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_54',
        region: 'gwangju',
        univName: '전남대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '의류학과',
        standardMajor: '의류학',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '과학', name: '화학', type: 'all', isGeneral: false },
            { group: '기술·가정/정보', name: '기술·가정/정보', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_55',
        region: 'gwangju',
        univName: '전남대',
        category: '의약계열',
        standardCategory: 'medical',
        majorName: '수의예과',
        standardMajor: '수의예과',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '과학', name: '화학', type: 'all', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_56',
        region: 'gwangju',
        univName: '전남대',
        category: '의약계열',
        standardCategory: 'medical',
        majorName: '약학부',
        standardMajor: '약학과',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '화학', type: 'all', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_57',
        region: 'gwangju',
        univName: '전남대',
        category: '의약계열',
        standardCategory: 'medical',
        majorName: '의학과',
        standardMajor: '의예과',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_58',
        region: 'gwangju',
        univName: '전남대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '국어국문학과',
        standardMajor: '국어국문학',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_59',
        region: 'gwangju',
        univName: '전남대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '영어영문학과',
        standardMajor: '영어영문학',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_60',
        region: 'gwangju',
        univName: '전남대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '독일언어문학과',
        standardMajor: '독일언어문학',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '제2외국어/한문', name: '독일어', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_61',
        region: 'gwangju',
        univName: '전남대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '불어불문학과',
        standardMajor: '불어불문학',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '제2외국어/한문', name: '프랑스어', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_62',
        region: 'gwangju',
        univName: '전남대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '중어중문학과',
        standardMajor: '중어중문학',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '제2외국어/한문', name: '중국어', type: 'all', isGeneral: false },
            { group: '제2외국어/한문', name: '한문', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_63',
        region: 'gwangju',
        univName: '전남대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '일어일문학과',
        standardMajor: '일어일문학',
        subjects: [
            { group: '제2외국어/한문', name: '일본어', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_64',
        region: 'gwangju',
        univName: '전남대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '사학과',
        standardMajor: '사학과',
        subjects: [
            { group: '사회', name: '역사', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_65',
        region: 'gwangju',
        univName: '전남대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '철학과',
        standardMajor: '철학',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '사회', name: '윤리', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_66',
        region: 'gwangju',
        univName: '전남대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '수학과',
        standardMajor: '수학과',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '물리학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_67',
        region: 'gwangju',
        univName: '전남대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '통계학과',
        standardMajor: '통계학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_68',
        region: 'gwangju',
        univName: '전남대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '물리학과',
        standardMajor: '물리학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '과학', name: '물리학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_69',
        region: 'gwangju',
        univName: '전남대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '지구환경과학부',
        standardMajor: '지구환경과학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '물리학', type: 'all', isGeneral: false },
            { group: '과학', name: '지구과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_70',
        region: 'gwangju',
        univName: '전남대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '생물학과',
        standardMajor: '생물학',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '과학', name: '화학', type: 'all', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_71',
        region: 'gwangju',
        univName: '전남대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '화학과',
        standardMajor: '화학',
        subjects: [
            { group: '과학', name: '화학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_72',
        region: 'gwangju',
        univName: '전남대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '생명과학기술학부',
        standardMajor: '생명과학기술학',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '과학', name: '화학', type: 'all', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_73',
        region: 'gwangju',
        univName: '전남대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '인공지능학부',
        standardMajor: '인공지능학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_74',
        region: 'gwangju',
        univName: '전남대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '빅데이터융합학과',
        standardMajor: '빅데이터융합학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_75',
        region: 'gwangju',
        univName: '전남대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '미래모빌리티학과',
        standardMajor: '미래모빌리티학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '물리학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_76',
        region: 'gwangju',
        univName: '전남대',
        category: '자유계열',
        standardCategory: 'liberal_arts',
        majorName: '자율전공학부(4년)',
        standardMajor: '자율전공학',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: true },
            { group: '영어', name: '영어', type: 'all', isGeneral: true },
        ],
        note: note
    },
    {
        id: 'jeonnam_77',
        region: 'gwangju',
        univName: '전남대',
        category: '의약계열',
        standardCategory: 'medical',
        majorName: '치의학전문대학원(학석사통합과정)',
        standardMajor: '치의학전문대학원(전남대)',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '화학', type: 'all', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
]

export { JEONNAM }
import type { UniverseType } from "@/type/nav";

const note = '과목 선택 시 모집단위별 관련 교과(군)이나 과목군의 일반 선택 과목을 먼저 이수할 것을 권장'

const JOSUN: UniverseType[] = [
    {
        id: 'josun_0',
        region: 'gwangju',
        univName: '조선대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '국어국문학부_국어국문학전공',
        standardMajor: '국어국문학',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_1',
        region: 'gwangju',
        univName: '조선대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '문예창작학과',
        standardMajor: '문예창작학',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_2',
        region: 'gwangju',
        univName: '조선대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '영어영문학과',
        standardMajor: '영어영문학',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_3',
        region: 'gwangju',
        univName: '조선대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '역사문화학과',
        standardMajor: '역사문화학',
        subjects: [
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
            { group: '사회', name: '한국사1', type: 'all', isGeneral: false },
            { group: '사회', name: '한국사2', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_4',
        region: 'gwangju',
        univName: '조선대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '일본어과',
        standardMajor: '일본어과',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_5',
        region: 'gwangju',
        univName: '조선대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '아시아언어문화학부_중국어문화학전공',
        standardMajor: '중국어문화학',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_6',
        region: 'gwangju',
        univName: '조선대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '글로벌비지니스커뮤니케이션학과',
        standardMajor: '글로벌비지니스커뮤니케이션학',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_7',
        region: 'gwangju',
        univName: '조선대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: 'K-컬쳐공연·기획학과',
        standardMajor: 'K-컬쳐공연·기획학',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_8',
        region: 'gwangju',
        univName: '조선대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '반도체화학과',
        standardMajor: '반도체화학',
        subjects: [
            { group: '과학', name: '과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_9',
        region: 'gwangju',
        univName: '조선대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '생명과학과',
        standardMajor: '생명과학',
        subjects: [
            { group: '과학', name: '과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_10',
        region: 'gwangju',
        univName: '조선대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '의생명과학부',
        standardMajor: '의생명과학',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '과학', name: '과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_11',
        region: 'gwangju',
        univName: '조선대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '식품영양학과',
        standardMajor: '식품영양학',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '과학', name: '과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_12',
        region: 'gwangju',
        univName: '조선대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '경찰행정학과',
        standardMajor: '경찰행정학',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_13',
        region: 'gwangju',
        univName: '조선대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '상담심리학과',
        standardMajor: '상담심리학',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_14',
        region: 'gwangju',
        univName: '조선대',
        category: '의약계열',
        standardCategory: 'medical',
        majorName: '언어치료학과',
        standardMajor: '언어치료학',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_15',
        region: 'gwangju',
        univName: '조선대',
        category: '의약계열',
        standardCategory: 'medical',
        majorName: '작업치료학과',
        standardMajor: '작업치료학과',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_16',
        region: 'gwangju',
        univName: '조선대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '소방재난관리학과',
        standardMajor: '소방재난관리학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_17',
        region: 'gwangju',
        univName: '조선대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '법학과',
        standardMajor: '법학과',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_18',
        region: 'gwangju',
        univName: '조선대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '공공인재법무학과',
        standardMajor: '공공인재법무학',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_19',
        region: 'gwangju',
        univName: '조선대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '미디어커뮤니케이션학과',
        standardMajor: '미디어커뮤니케이션학',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_20',
        region: 'gwangju',
        univName: '조선대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '행벙복지학부',
        standardMajor: '행벙복지학',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_21',
        region: 'gwangju',
        univName: '조선대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '정치외교학과',
        standardMajor: '정치외교학',
        subjects: [
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_22',
        region: 'gwangju',
        univName: '조선대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '경영학부',
        standardMajor: '경영학',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_23',
        region: 'gwangju',
        univName: '조선대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '경제학과',
        standardMajor: '경제학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_24',
        region: 'gwangju',
        univName: '조선대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '무역학과',
        standardMajor: '무역학',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_25',
        region: 'gwangju',
        univName: '조선대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '건축공학과',
        standardMajor: '건축공학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_26',
        region: 'gwangju',
        univName: '조선대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '건축학과',
        standardMajor: '건축학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_27',
        region: 'gwangju',
        univName: '조선대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '기계공학과',
        standardMajor: '기계공학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_28',
        region: 'gwangju',
        univName: '조선대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '항공우주공학과',
        standardMajor: '항공우주공학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_29',
        region: 'gwangju',
        univName: '조선대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '선박해양공학과',
        standardMajor: '선박해양공학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_30',
        region: 'gwangju',
        univName: '조선대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '생명화학공학과',
        standardMajor: '생명화학공학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_31',
        region: 'gwangju',
        univName: '조선대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '신소재공학과',
        standardMajor: '신소재공학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_32',
        region: 'gwangju',
        univName: '조선대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '전기공학과',
        standardMajor: '전기공학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_33',
        region: 'gwangju',
        univName: '조선대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '환경공학과',
        standardMajor: '환경공학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_34',
        region: 'gwangju',
        univName: '조선대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '전자공학과',
        standardMajor: '전자공학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_35',
        region: 'gwangju',
        univName: '조선대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '토목공학과',
        standardMajor: '토목공학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_36',
        region: 'gwangju',
        univName: '조선대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '컴퓨터공학전공',
        standardMajor: '컴퓨터공학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_37',
        region: 'gwangju',
        univName: '조선대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '정보통신공학전공',
        standardMajor: '정보통신공학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_38',
        region: 'gwangju',
        univName: '조선대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '정보보안전공',
        standardMajor: '정보보안학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_39',
        region: 'gwangju',
        univName: '조선대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '모빌리티SW전공',
        standardMajor: '모빌리티SW학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_40',
        region: 'gwangju',
        univName: '조선대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '인공지능공학전공',
        standardMajor: '인공지능공학',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_41',
        region: 'gwangju',
        univName: '조선대',
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
        id: 'josun_42',
        region: 'gwangju',
        univName: '조선대',
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
        id: 'josun_43',
        region: 'gwangju',
        univName: '조선대',
        category: '교육계열',
        standardCategory: 'education',
        majorName: '특수교육과',
        standardMajor: '특수교육과',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_44',
        region: 'gwangju',
        univName: '조선대',
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
        id: 'josun_45',
        region: 'gwangju',
        univName: '조선대',
        category: '교육계열',
        standardCategory: 'education',
        majorName: '물리교육과',
        standardMajor: '물리교육과',
        subjects: [
            { group: '과학', name: '과학', type: 'all', isGeneral: false },
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_46',
        region: 'gwangju',
        univName: '조선대',
        category: '교육계열',
        standardCategory: 'education',
        majorName: '화학교육과',
        standardMajor: '화학교육과',
        subjects: [
            { group: '과학', name: '과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_47',
        region: 'gwangju',
        univName: '조선대',
        category: '교육계열',
        standardCategory: 'education',
        majorName: '생물교육과',
        standardMajor: '생물교육과',
        subjects: [
            { group: '과학', name: '과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_48',
        region: 'gwangju',
        univName: '조선대',
        category: '교육계열',
        standardCategory: 'education',
        majorName: '지구과학교육과',
        standardMajor: '지구과학교육과',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_49',
        region: 'gwangju',
        univName: '조선대',
        category: '교육계열',
        standardCategory: 'education',
        majorName: '교육학과',
        standardMajor: '교육학과',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_50',
        region: 'gwangju',
        univName: '조선대',
        category: '의약계열',
        standardCategory: 'medical',
        majorName: '의예과',
        standardMajor: '의예과',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_51',
        region: 'gwangju',
        univName: '조선대',
        category: '의약계열',
        standardCategory: 'medical',
        majorName: '간호학과',
        standardMajor: '간호학과',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '과학', name: '과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_52',
        region: 'gwangju',
        univName: '조선대',
        category: '의약계열',
        standardCategory: 'medical',
        majorName: '치의예과',
        standardMajor: '치의예과',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_53',
        region: 'gwangju',
        univName: '조선대',
        category: '의약계열',
        standardCategory: 'medical',
        majorName: '약학과',
        standardMajor: '약학과',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_54',
        region: 'gwangju',
        univName: '조선대',
        category: '예체능계열',
        standardCategory: 'arts_sports',
        majorName: '현대조형미디어전공',
        standardMajor: '현대조형미디어',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_55',
        region: 'gwangju',
        univName: '조선대',
        category: '예체능계열',
        standardCategory: 'arts_sports',
        majorName: '가구·도자기디자인전공',
        standardMajor: '가구·도자기디자인',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_56',
        region: 'gwangju',
        univName: '조선대',
        category: '예체능계열',
        standardCategory: 'arts_sports',
        majorName: '시각문화큐레이터전공',
        standardMajor: '시각문화큐레이터',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_57',
        region: 'gwangju',
        univName: '조선대',
        category: '예체능계열',
        standardCategory: 'arts_sports',
        majorName: '섬유·패션디자인전공',
        standardMajor: '섬유·패션디자인',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_58',
        region: 'gwangju',
        univName: '조선대',
        category: '예체능계열',
        standardCategory: 'arts_sports',
        majorName: '디자인공학과',
        standardMajor: '디자인공학',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_59',
        region: 'gwangju',
        univName: '조선대',
        category: '예체능계열',
        standardCategory: 'arts_sports',
        majorName: '체육학과',
        standardMajor: '체육학과',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_60',
        region: 'gwangju',
        univName: '조선대',
        category: '예체능계열',
        standardCategory: 'arts_sports',
        majorName: '스포츠산업학과',
        standardMajor: '스포츠산업학과',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_61',
        region: 'gwangju',
        univName: '조선대',
        category: '예체능계열',
        standardCategory: 'arts_sports',
        majorName: '태권도학과',
        standardMajor: '태권도학과',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'josun_62',
        region: 'gwangju',
        univName: '조선대',
        category: '자유계열',
        standardCategory: 'liberal_arts',
        majorName: '자유전공학부',
        standardMajor: '자유전공학부',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: true },
        ],
        note: note
    },
]

export { JOSUN }
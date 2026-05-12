import type { UniverseType } from "@/type/nav";

const note = '교과군 또는 과목군을 제시하고 있음.\n - 지리:  세계시민과 지리, 한국지리 탐구, 도시의 미래 탐구\n - 역사: 세계사, 동아시아 역사기행\n- 일반사회: 사회와 문화, 정치, 법과 사회, 경제, 국제관계의 이해\n - 윤리: 현대사회와 윤리, 윤리와 사상, 인문학과 윤리\n - 사회: 상기 지리, 역사, 일반 사회, 윤리 전 과목\n - 물리학: 물리학, 역학과 에너지, 전자기와 양자\n - 화학: 물질과 에너지, 화학 반응의 세계\n - 생명과학 : 생명과학, 세포와 물질대사, 생물의 유전\n - 지구과학 : 지구과학, 지구시스템과학, 행성우주과학\n - 과학 : 물리학, 화학, 생명과학, 지구과학 전 과목\n *평가활용: 일반 및 진로 선택 과목을 위주로 평가에 활용, 모집단위별 관련교과(군)이나 과목군의 일반 선택 과목을 먼저 이수할 것을 권장함.' 

const JEONNAM_1: UniverseType[] = [
    {
        id: 'jeonnam_1_0',
        region: 'jeonnam',
        univName: '전남대(여수캠퍼스)',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '공학계열',
        standardMajor: '공학계열(전남대 여수캠퍼스)',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '물리학', type: 'all', isGeneral: false },
            { group: '과학', name: '화학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_1_1',
        region: 'jeonnam',
        univName: '전남대(여수캠퍼스)',
        category: '예체능계열',
        standardCategory: 'arts_sports',
        majorName: '건축디자인학과',
        standardMajor: '건축디자인학',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_1_2',
        region: 'jeonnam',
        univName: '전남대(여수캠퍼스)',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '의공학부',
        standardMajor: '의공학부',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_1_3',
        region: 'jeonnam',
        univName: '전남대(여수캠퍼스)',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '석유화학소재공학과',
        standardMajor: '석유화학소재공학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '화학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_1_4',
        region: 'jeonnam',
        univName: '전남대(여수캠퍼스)',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '국제학부(영어학전공)',
        standardMajor: '영어영문학',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_1_5',
        region: 'jeonnam',
        univName: '전남대(여수캠퍼스)',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '국제학부(일본학전공)',
        standardMajor: '일본학과',
        subjects: [
            { group: '제2외국어/한문', name: '일본어', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_1_6',
        region: 'jeonnam',
        univName: '전남대(여수캠퍼스)',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '국제학부(중국학전공)',
        standardMajor: '중국학과',
        subjects: [
            { group: '제2외국어/한문', name: '중국어', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_1_7',
        region: 'jeonnam',
        univName: '전남대(여수캠퍼스)',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '글로벌비지니스학부',
        standardMajor: '글로벌비지니스학',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_1_8',
        region: 'jeonnam',
        univName: '전남대(여수캠퍼스)',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '물류교통학과',
        standardMajor: '물류교통학',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_1_9',
        region: 'jeonnam',
        univName: '전남대(여수캠퍼스)',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '문화콘텐츠학부',
        standardMajor: '문화콘텐츠학',
        subjects: [
            { group: '국어', name: '국어', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_1_10',
        region: 'jeonnam',
        univName: '전남대(여수캠퍼스)',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '문화관광경영학과',
        standardMajor: '문화관광경영학',
        subjects: [
            { group: '사회', name: '사회', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_1_11',
        region: 'jeonnam',
        univName: '전남대(여수캠퍼스)',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '해양수산광역',
        standardMajor: '해양수산광역',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
            { group: '과학', name: '지구과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_1_12',
        region: 'jeonnam',
        univName: '전남대(여수캠퍼스)',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '기관시스템공학과',
        standardMajor: '기관시스템공학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_1_13',
        region: 'jeonnam',
        univName: '전남대(여수캠퍼스)',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '조선해양공학과',
        standardMajor: '조선해양공학',
        subjects: [
            { group: '영어', name: '영어', type: 'all', isGeneral: false },
            { group: '과학', name: '물리학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_1_14',
        region: 'jeonnam',
        univName: '전남대(여수캠퍼스)',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '수산생명의학과',
        standardMajor: '수산생명의학과',
        subjects: [
            { group: '과학', name: '화학', type: 'all', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_1_15',
        region: 'jeonnam',
        univName: '전남대(여수캠퍼스)',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '스마트수산관리자원관리학과',
        standardMajor: '스마트수산관리자원관리학과',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'all', isGeneral: false },
            { group: '과학', name: '지구과학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_1_16',
        region: 'jeonnam',
        univName: '전남대(여수캠퍼스)',
        category: '자유계열',
        standardCategory: 'liberal_arts',
        majorName: '창의융합학부',
        standardMajor: '창의융합학부',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: true },
            { group: '영어', name: '영어', type: 'all', isGeneral: true },
            { group: '사회', name: '사회', type: 'all', isGeneral: true },
        ],
        note: note
    },
    {
        id: 'jeonnam_1_17',
        region: 'jeonnam',
        univName: '전남대(여수캠퍼스)',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '스마트응용설계학과',
        standardMajor: '스마트응용설계학과',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '물리학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_1_18',
        region: 'jeonnam',
        univName: '전남대(여수캠퍼스)',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '스마트ICT융합공학과',
        standardMajor: '스마트ICT융합공학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '물리학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_1_19',
        region: 'jeonnam',
        univName: '전남대(여수캠퍼스)',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '스마트전기제어공학과',
        standardMajor: '스마트전기제어공학',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '물리학', type: 'all', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'jeonnam_1_20',
        region: 'jeonnam',
        univName: '전남대(여수캠퍼스)',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '디지털융합정보학과',
        standardMajor: '디지털융합정보학과',
        subjects: [
            { group: '수학', name: '수학', type: 'all', isGeneral: false },
            { group: '과학', name: '물리학', type: 'all', isGeneral: false },
        ],
        note: note
    },
]

export { JEONNAM_1 }
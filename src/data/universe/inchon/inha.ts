import type { UniverseType } from "@/type/nav";

const note = "* 교과 선택의 영향력이 큰 자연계열 모집단위에 대해서 우선권장교과영역(핵심과목)과 권장교과영역(권장과목)으로 분류. \n * 교과 영역은 내용 상위계가 뚜렷한 특성을 지닌 과학교과영역을 중심으로 안내함. \n * 수학 교과: 대수, 미적분Ⅰ, 확률과 통계 교과목 이수를 권장하며, 공과대학의 경우 기하 교과목도 포함하여 이수할 것을 권장함. \n * 권장 교과 영역을 제시하지 않은 자연계열 일부 학과 및 인문⋅예체능계열의 경우는 학생 개개인의 진로와 적성을 고려하여 자유롭게 이수하기를 권장함."
const INHA: UniverseType[] = [
    {
        id: 'inha_0',
        region: 'inchon',
        univName: '인하대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '기계공학과',
        standardMajor: '기계공학',
        subjects: [
            { group: '과학', name: '물리학', type: 'core', isGeneral: false },
            { group: '과학', name: '화학', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'inha_1',
        region: 'inchon',
        univName: '인하대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '전기전자공학부',
        standardMajor: '전기전자공학',
        subjects: [
            { group: '과학', name: '물리학', type: 'core', isGeneral: false },
            { group: '과학', name: '화학', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'inha_2',
        region: 'inchon',
        univName: '인하대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '반도체시스템공학과',
        standardMajor: '반도체시스템공학',
        subjects: [
            { group: '과학', name: '물리학', type: 'core', isGeneral: false },
            { group: '과학', name: '화학', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'inha_3',
        region: 'inchon',
        univName: '인하대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '항공우주공학과',
        standardMajor: '항공우주공학',
        subjects: [
            { group: '과학', name: '물리학', type: 'core', isGeneral: false },
            { group: '과학', name: '화학', type: 'recommended', isGeneral: false },
            { group: '과학', name: '지구과학', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'inha_4',
        region: 'inchon',
        univName: '인하대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '조선해양공학과',
        standardMajor: '조선해양공학',
        subjects: [
            { group: '과학', name: '물리학', type: 'core', isGeneral: false },
            { group: '과학', name: '화학', type: 'recommended', isGeneral: false },
            { group: '과학', name: '지구과학', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'inha_5',
        region: 'inchon',
        univName: '인하대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '사회인프라공학과',
        standardMajor: '사회인프라공학',
        subjects: [
            { group: '과학', name: '물리학', type: 'core', isGeneral: false },
            { group: '과학', name: '화학', type: 'recommended', isGeneral: false },
            { group: '과학', name: '지구과학', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'inha_6',
        region: 'inchon',
        univName: '인하대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '건축학부',
        standardMajor: '건축학',
        subjects: [
            { group: '과학', name: '물리학', type: 'core', isGeneral: false },
            { group: '과학', name: '화학', type: 'recommended', isGeneral: false },
            { group: '과학', name: '지구과학', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'inha_7',
        region: 'inchon',
        univName: '인하대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '화학공학과',
        standardMajor: '화학공학',
        subjects: [
            { group: '과학', name: '화학', type: 'core', isGeneral: false },
            { group: '과학', name: '물리학', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'inha_8',
        region: 'inchon',
        univName: '인하대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '고분자공학과',
        standardMajor: '고분자공학',
        subjects: [
            { group: '과학', name: '화학', type: 'core', isGeneral: false },
            { group: '과학', name: '물리학', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'inha_9',
        region: 'inchon',
        univName: '인하대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '신소재공학과',
        standardMajor: '신소재공학',
        subjects: [
            { group: '과학', name: '화학', type: 'core', isGeneral: false },
            { group: '과학', name: '물리학', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'inha_10',
        region: 'inchon',
        univName: '인하대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '이차전지융합학과',
        standardMajor: '이차전지융합학과',
        subjects: [
            { group: '과학', name: '화학', type: 'core', isGeneral: false },
            { group: '과학', name: '물리학', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'inha_11',
        region: 'inchon',
        univName: '인하대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '환경공학과',
        standardMajor: '환경공학',
        subjects: [
            { group: '과학', name: '화학', type: 'core', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'inha_12',
        region: 'inchon',
        univName: '인하대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '에너지자원공학과',
        standardMajor: '에너지자원공학',
        subjects: [
            { group: '과학', name: '물리학', type: 'recommended', isGeneral: false },
            { group: '과학', name: '화학', type: 'recommended', isGeneral: false },
            { group: '과학', name: '지구과학', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'inha_13',
        region: 'inchon',
        univName: '인하대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '산업경영공학과',
        standardMajor: '산업경영공학',
        subjects: [
        ],
        note: note
    },
    {
        id: 'inha_14',
        region: 'inchon',
        univName: '인하대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '공간정보공학과',
        standardMajor: '공간정보공학',
        subjects: [
        ],
        note: note
    },
    {
        id: 'inha_15',
        region: 'inchon',
        univName: '인하대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '스마트모빌리티공학과',
        standardMajor: '스마트모빌리티공학',
        subjects: [
            { group: '과학', name: '물리학', type: 'core', isGeneral: false },
            { group: '과학', name: '화학', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'inha_16',
        region: 'inchon',
        univName: '인하대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '컴퓨터공학과',
        standardMajor: '컴퓨터공학',
        subjects: [

        ],
        note: note
    },
    {
        id: 'inha_17',
        region: 'inchon',
        univName: '인하대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '인공지능학과',
        standardMajor: '인공지능학',
        subjects: [

        ],
        note: note
    },
    {
        id: 'inha_18',
        region: 'inchon',
        univName: '인하대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '데이터사이언스학과',
        standardMajor: '데이터사이언스학',
        subjects: [

        ],
        note: note
    },
    {
        id: 'inha_19',
        region: 'inchon',
        univName: '인하대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '디자인테크놀로지학과',
        standardMajor: '디자인테크놀로지학',
        subjects: [

        ],
        note: note
    },
    {
        id: 'inha_20',
        region: 'inchon',
        univName: '인하대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '물리학과',
        standardMajor: '물리학',
        subjects: [
            { group: '과학', name: '물리학', type: 'core', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'inha_21',
        region: 'inchon',
        univName: '인하대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '화학과',
        standardMajor: '화학',
        subjects: [
            { group: '과학', name: '화학', type: 'core', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'inha_22',
        region: 'inchon',
        univName: '인하대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '해양과학과',
        standardMajor: '해양과학과',
        subjects: [
            { group: '과학', name: '화학', type: 'recommended', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'recommended', isGeneral: false },
            { group: '과학', name: '지구과학', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'inha_23',
        region: 'inchon',
        univName: '인하대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '식품영양학과',
        standardMajor: '식품영양학',
        subjects: [
            { group: '과학', name: '생명과학', type: 'core', isGeneral: false },
            { group: '과학', name: '화학', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'inha_24',
        region: 'inchon',
        univName: '인하대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '수학과',
        standardMajor: '수학과',
        subjects: [
        ],
        note: note
    },
    {
        id: 'inha_25',
        region: 'inchon',
        univName: '인하대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '통계학과',
        standardMajor: '통계학',
        subjects: [
        ],
        note: note
    },
    {
        id: 'inha_26',
        region: 'inchon',
        univName: '인하대',
        category: '의약계열',
        standardCategory: 'medical',
        majorName: '의예과',
        standardMajor: '의예과',
        subjects: [
            { group: '과학', name: '생명과학', type: 'core', isGeneral: false },
            { group: '과학', name: '화학', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'inha_27',
        region: 'inchon',
        univName: '인하대',
        category: '의약계열',
        standardCategory: 'medical',
        majorName: '간호학과',
        standardMajor: '간호학과',
        subjects: [
            { group: '과학', name: '생명과학', type: 'core', isGeneral: false },
            { group: '과학', name: '화학', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'inha_28',
        region: 'inchon',
        univName: '인하대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '생명공학과',
        standardMajor: '생명공학',
        subjects: [
            { group: '과학', name: '생명과학', type: 'core', isGeneral: false },
            { group: '과학', name: '화학', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'inha_29',
        region: 'inchon',
        univName: '인하대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '생명과학과',
        standardMajor: '생명과학',
        subjects: [
            { group: '과학', name: '생명과학', type: 'core', isGeneral: false },
            { group: '과학', name: '화학', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'inha_30',
        region: 'inchon',
        univName: '인하대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '첨단바이오의약학과',
        standardMajor: '첨단바이오의약학과',
        subjects: [
            { group: '과학', name: '생명과학', type: 'core', isGeneral: false },
            { group: '과학', name: '화학', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'inha_31',
        region: 'inchon',
        univName: '인하대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '바이오식품공학과',
        standardMajor: '바이오식품공학과',
        subjects: [
            { group: '과학', name: '생명과학', type: 'core', isGeneral: false },
            { group: '과학', name: '화학', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
]

export { INHA }
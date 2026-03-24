import type { StandardCategoryType, UniverseType } from "@/type/nav";

const NAV_UNIVERSE_REGIONS = [
    { id: "all", name: "전체" }, { id: "seoul", name: "서울" },
    { id: "incheon", name: "인천" }, { id: "gyeonggi", name: "경기" },
    { id: "busan", name: "부산" }, { id: "daegu", name: "대구" },
    { id: "gyeongbuk", name: "경북" }, { id: "gyeongnam", name: "경남" },
    { id: "daejeon", name: "대전" }, { id: "gangwon", name: "강원" },
    { id: "chungbuk", name: "충북" }, { id: "chungnam", name: "충남" },
    { id: "gwangju", name: "광주" }, { id: "jeonbuk", name: "전북" },
    { id: "jeonnam", name: "전남" }, { id: "jeju", name: "제주" },
];

export const UNIV_INDEX_LIST = [
    { id: "all", name: "전체" },
    { id: "ㄱ", name: "ㄱ" }, { id: "ㄴ", name: "ㄴ" }, { id: "ㄷ", name: "ㄷ" },
    { id: "ㄹ", name: "ㄹ" }, { id: "ㅁ", name: "ㅁ" }, { id: "ㅂ", name: "ㅂ" },
    { id: "ㅅ", name: "ㅅ" }, { id: "ㅇ", name: "ㅇ" }, { id: "ㅈ", name: "ㅈ" },
    { id: "ㅊ", name: "ㅊ" }, { id: "ㅋ", name: "ㅋ" }, { id: "ㅌ", name: "ㅌ" },
    { id: "ㅍ", name: "ㅍ" }, { id: "ㅎ", name: "ㅎ" }
];

export const CATEGORY_MAP: Record<StandardCategoryType, string> = {
    humanities: "인문",
    social: "사회",
    natural: "자연",
    engineering: "공학",
    medical: "의학(보건)",
    education: "교육",
    arts_sports: "예체능",
    agriculture: "농림/수산",
    liberal_arts: "자유전공",
};

const NAV_UNIVERSE_DATA: UniverseType[] = [
    {
        id: 'gatholic_0',
        region: 'seoul',
        univName: '가톨릭대',
        category: '자유전공',
        standardCategory: 'liberal_arts',
        majorName: '자유전공학부',
        standardMajor: '자유전공',
        subjects: [{ group: '', name: '계열 구분 없이 자신의 진로 및 적성을 고려하여 교과목 선택 이수', type: 'all', isGeneral: true }],
        note: ''
    },
    {
        id: 'gatholic_1',
        region: 'seoul',
        univName: '가톨릭대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '국어국문학과',
        standardMajor: '국어국문',
        subjects: [{ group: '', name: '인문사회계열 진로 및 적성을 고려하여 교과목 선택 이수', type: 'all', isGeneral: true }],
        note: ''
    },
    {
        id: 'gatholic_2',
        region: 'seoul',
        univName: '가톨릭대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '철학과',
        standardMajor: '철학',
        subjects: [{ group: '', name: '인문사회계열 진로 및 적성을 고려하여 교과목 선택 이수', type: 'all', isGeneral: true }],
        note: ''
    },
    {
        id: 'gatholic_3',
        region: 'seoul',
        univName: '가톨릭대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '국사학과',
        standardMajor: '국사',
        subjects: [{ group: '', name: '인문사회계열 진로 및 적성을 고려하여 교과목 선택 이수', type: 'all', isGeneral: true }],
        note: ''
    },

    {
        id: 'gyounghwe_0',
        region: 'seoul',
        univName: '경희대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '수학과',
        standardMajor: '수학',
        subjects: [
            { group: '수학', name: '대수', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅰ', type: 'core', isGeneral: false },
            { group: '수학', name: '확률과 통계', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅱ', type: 'core', isGeneral: false },
            { group: '수학', name: '기하', type: 'core', isGeneral: false },
        ],
        note: `※핵심과목: 필수적 이수를 권장하는 과목
※권장과목: 가급적 이수를 권장하는 과목`
    },
    {
        id: 'gyounghwe_1',
        region: 'seoul',
        univName: '경희대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '응용수학과',
        standardMajor: '응용수학',
        subjects: [
            { group: '수학', name: '대수', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅰ', type: 'core', isGeneral: false },
            { group: '수학', name: '확률과 통계', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅱ', type: 'core', isGeneral: false },
            { group: '수학', name: '기하', type: 'core', isGeneral: false },
        ],
        note: `※핵심과목: 필수적 이수를 권장하는 과목
※권장과목: 가급적 이수를 권장하는 과목`
    },
    {
        id: 'gyounghwe_2',
        region: 'seoul',
        univName: '경희대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '소프트웨어융합학과',
        standardMajor: '소프트웨어융합학',
        subjects: [
            { group: '수학', name: '대수', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅰ', type: 'core', isGeneral: false },
            { group: '수학', name: '확률과 통계', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅱ', type: 'core', isGeneral: false },
            { group: '수학', name: '기하', type: 'core', isGeneral: false },
            { group: '수학', name: '인공지능 수학', type: 'recommended', isGeneral: false },
        ],
        note: `※핵심과목: 필수적 이수를 권장하는 과목
※권장과목: 가급적 이수를 권장하는 과목`
    },
    {
        id: 'gyounghwe_3',
        region: 'seoul',
        univName: '경희대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '인공지능학과',
        standardMajor: '인공지능학',
        subjects: [
            { group: '수학', name: '대수', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅰ', type: 'core', isGeneral: false },
            { group: '수학', name: '확률과 통계', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅱ', type: 'core', isGeneral: false },
            { group: '수학', name: '기하', type: 'core', isGeneral: false },
            { group: '수학', name: '인공지능 수학', type: 'recommended', isGeneral: false },
        ],
        note: `※핵심과목: 필수적 이수를 권장하는 과목
※권장과목: 가급적 이수를 권장하는 과목`
    },
    {
        id: 'gyounghwe_4',
        region: 'seoul',
        univName: '경희대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '컴퓨터공학과',
        standardMajor: '컴퓨터공학',
        subjects: [
            { group: '수학', name: '대수', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅰ', type: 'core', isGeneral: false },
            { group: '수학', name: '확률과 통계', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅱ', type: 'core', isGeneral: false },
            { group: '수학', name: '기하', type: 'core', isGeneral: false },
            { group: '수학', name: '인공지능 수학', type: 'recommended', isGeneral: false },
        ],
        note: `※핵심과목: 필수적 이수를 권장하는 과목
※권장과목: 가급적 이수를 권장하는 과목`
    },
    {
        id: 'gyounghwe_5',
        region: 'seoul',
        univName: '경희대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '산업경영공학과',
        standardMajor: '산업경영공학',
        subjects: [
            { group: '수학', name: '대수', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅰ', type: 'core', isGeneral: false },
            { group: '수학', name: '확률과 통계', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅱ', type: 'core', isGeneral: false },
        ],
        note: `※핵심과목: 필수적 이수를 권장하는 과목
※권장과목: 가급적 이수를 권장하는 과목`
    },
    {
        id: 'gyounghwe_6',
        region: 'seoul',
        univName: '경희대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '물리학과',
        standardMajor: '물리학',
        subjects: [
            { group: '수학', name: '대수', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅰ', type: 'core', isGeneral: false },
            { group: '수학', name: '확률과 통계', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅱ', type: 'core', isGeneral: false },
            { group: '과학', name: '물리학', type: 'core', isGeneral: false },
            { group: '과학', name: '역학과 에너지', type: 'core', isGeneral: false },
            { group: '과학', name: '전자기와 양자', type: 'core', isGeneral: false },
            { group: '과학', name: '화학', type: 'recommended', isGeneral: false },
            { group: '과학', name: '물질과 에너지', type: 'recommended', isGeneral: false },
        ],
        note: `※핵심과목: 필수적 이수를 권장하는 과목
※권장과목: 가급적 이수를 권장하는 과목`
    },
    {
        id: 'gyounghwe_7',
        region: 'seoul',
        univName: '경희대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '응용물리학과',
        standardMajor: '응용물리학',
        subjects: [
            { group: '수학', name: '대수', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅰ', type: 'core', isGeneral: false },
            { group: '수학', name: '확률과 통계', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅱ', type: 'core', isGeneral: false },
            { group: '과학', name: '물리학', type: 'core', isGeneral: false },
            { group: '과학', name: '역학과 에너지', type: 'core', isGeneral: false },
            { group: '과학', name: '전자기와 양자', type: 'core', isGeneral: false },
            { group: '과학', name: '화학', type: 'recommended', isGeneral: false },
            { group: '과학', name: '물질과 에너지', type: 'recommended', isGeneral: false },
        ],
        note: `※핵심과목: 필수적 이수를 권장하는 과목
※권장과목: 가급적 이수를 권장하는 과목`
    },
    {
        id: 'gyounghwe_8',
        region: 'seoul',
        univName: '경희대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '기계공학부',
        standardMajor: '기계공학',
        subjects: [
            { group: '수학', name: '대수', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅰ', type: 'core', isGeneral: false },
            { group: '수학', name: '확률과 통계', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅱ', type: 'core', isGeneral: false },
            { group: '수학', name: '기하', type: 'core', isGeneral: false },
            { group: '과학', name: '물리학', type: 'core', isGeneral: false },
            { group: '과학', name: '역학과 에너지', type: 'core', isGeneral: false },
            { group: '과학', name: '전자기와 양자', type: 'core', isGeneral: false },
            { group: '과학', name: '화학', type: 'core', isGeneral: false },
            { group: '과학', name: '물질과 에너지', type: 'recommended', isGeneral: false },
            { group: '과학', name: '화학 반응의 세계', type: 'recommended', isGeneral: false },
        ],
        note: `※핵심과목: 필수적 이수를 권장하는 과목
※권장과목: 가급적 이수를 권장하는 과목`
    },

    {
        id: 'goryu_0',
        region: 'seoul',
        univName: '고려대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '생명과학부',
        standardMajor: '생명과학',
        subjects: [
            { group: '수학', name: '미적분Ⅱ', type: 'recommended', isGeneral: false },
            { group: '과학', name: '물질과 에너지', type: 'recommended', isGeneral: false },
            { group: '과학', name: '화학 반응의 세계', type: 'recommended', isGeneral: false },
            { group: '과학', name: '세포와 물질대사', type: 'recommended', isGeneral: false },
            { group: '과학', name: '생물의 유전', type: 'recommended', isGeneral: false },
        ],
        note: '과학 교과 권장 과목 중 2과목 이상 권장'
    },
    {
        id: 'goryu_1',
        region: 'seoul',
        univName: '고려대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '생명공학부',
        standardMajor: '생명공학',
        subjects: [
            { group: '수학', name: '미적분Ⅱ', type: 'recommended', isGeneral: false },
            { group: '과학', name: '물질과 에너지', type: 'recommended', isGeneral: false },
            { group: '과학', name: '화학 반응의 세계', type: 'recommended', isGeneral: false },
            { group: '과학', name: '세포와 물질대사', type: 'recommended', isGeneral: false },
            { group: '과학', name: '생물의 유전', type: 'recommended', isGeneral: false },
        ],
        note: '과학 교과 권장 과목 중 2과목 이상 권장'
    },
    {
        id: 'goryu_2',
        region: 'seoul',
        univName: '고려대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '식품공학부',
        standardMajor: '식품공학',
        subjects: [
            { group: '수학', name: '미적분Ⅱ', type: 'recommended', isGeneral: false },
            { group: '과학', name: '물질과 에너지', type: 'recommended', isGeneral: false },
            { group: '과학', name: '화학 반응의 세계', type: 'recommended', isGeneral: false },
            { group: '과학', name: '세포와 물질대사', type: 'recommended', isGeneral: false },
            { group: '과학', name: '생물의 유전', type: 'recommended', isGeneral: false },
        ],
        note: '과학 교과 권장 과목 중 2과목 이상 권장'
    },
    {
        id: 'goryu_3',
        region: 'seoul',
        univName: '고려대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '환경생태공학부',
        standardMajor: '환경생태공학',
        subjects: [
            { group: '수학', name: '미적분Ⅱ', type: 'recommended', isGeneral: false },
            { group: '과학', name: '물질과 에너지', type: 'recommended', isGeneral: false },
            { group: '과학', name: '화학 반응의 세계', type: 'recommended', isGeneral: false },
            { group: '과학', name: '세포와 물질대사', type: 'recommended', isGeneral: false },
            { group: '과학', name: '생물의 유전', type: 'recommended', isGeneral: false },
        ],
        note: '과학 교과 권장 과목 중 2과목 이상 권장'
    },
    {
        id: 'goryu_4',
        region: 'seoul',
        univName: '고려대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '수학과',
        standardMajor: '수학',
        subjects: [
            { group: '수학', name: '미적분Ⅱ', type: 'recommended', isGeneral: false },
            { group: '수학', name: '기하', type: 'recommended', isGeneral: false },
        ],
        note: '-'
    },
    {
        id: 'goryu_5',
        region: 'seoul',
        univName: '고려대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '물리학과',
        standardMajor: '물리학',
        subjects: [
            { group: '수학', name: '미적분Ⅱ', type: 'recommended', isGeneral: false },
            { group: '과학', name: '역학과 에너지', type: 'recommended', isGeneral: false },
            { group: '과학', name: '전자기와 양자', type: 'recommended', isGeneral: false },
        ],
        note: '-'
    },
    {
        id: 'goryu_6',
        region: 'seoul',
        univName: '고려대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '화학과',
        standardMajor: '화학',
        subjects: [
            { group: '수학', name: '미적분Ⅱ', type: 'recommended', isGeneral: false },
            { group: '과학', name: '물질과 에너지', type: 'recommended', isGeneral: false },
            { group: '과학', name: '화학 반응의 세계', type: 'recommended', isGeneral: false },
        ],
        note: '-'
    },
    {
        id: 'goryu_7',
        region: 'seoul',
        univName: '고려대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '지구환경과학과',
        standardMajor: '지구환경과학',
        subjects: [
            { group: '수학', name: '미적분Ⅱ', type: 'recommended', isGeneral: false },
            { group: '과학', name: '지구시스템과학', type: 'recommended', isGeneral: false },
            { group: '과학', name: '행성우주과학', type: 'recommended', isGeneral: false },
        ],
        note: '-'
    },
    {
        id: 'goryu_8',
        region: 'seoul',
        univName: '고려대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '공과대학(전공자율)',
        standardMajor: '공과대학(전공자율)',
        subjects: [
            { group: '수학', name: '미적분Ⅱ', type: 'recommended', isGeneral: false },
            { group: '과학', name: '역학과 에너지', type: 'recommended', isGeneral: false },
            { group: '과학', name: '전자기와 양자', type: 'recommended', isGeneral: false },
            { group: '과학', name: '물질과 에너지', type: 'recommended', isGeneral: false },
            { group: '과학', name: '화학반응의 세계', type: 'recommended', isGeneral: false },
            { group: '과학', name: '세포와 물질대사', type: 'recommended', isGeneral: false },
            { group: '과학', name: '생물의 유전', type: 'recommended', isGeneral: false },
        ],
        note: '과학 교과 권장 과목 중 2과목 이상 권장'
    },
    {
        id: 'goryu_9',
        region: 'seoul',
        univName: '고려대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '화공생명공학과',
        standardMajor: '화공생명공학',
        subjects: [
            { group: '수학', name: '미적분Ⅱ', type: 'recommended', isGeneral: false },
            { group: '수학', name: '기하', type: 'recommended', isGeneral: false },
            { group: '과학', name: '역학과 에너지', type: 'recommended', isGeneral: false },
            { group: '과학', name: '전자기와 양자', type: 'recommended', isGeneral: false },
            { group: '과학', name: '물질과 에너지', type: 'recommended', isGeneral: false },
            { group: '과학', name: '화학반응의 세계', type: 'recommended', isGeneral: false },
        ],
        note: '과학 교과 권장 과목 중 2과목 이상 권장'
    },
    {
        id: 'goryu_10',
        region: 'seoul',
        univName: '고려대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '신소재공학부',
        standardMajor: '신소재공학',
        subjects: [
            { group: '수학', name: '미적분Ⅱ', type: 'recommended', isGeneral: false },
            { group: '과학', name: '역학과 에너지', type: 'recommended', isGeneral: false },
            { group: '과학', name: '전자기와 양자', type: 'recommended', isGeneral: false },
            { group: '과학', name: '물질과 에너지', type: 'recommended', isGeneral: false },
            { group: '과학', name: '화학반응의 세계', type: 'recommended', isGeneral: false },
            { group: '과학', name: '세포와 물질대사', type: 'recommended', isGeneral: false },
            { group: '과학', name: '생물의 유전', type: 'recommended', isGeneral: false },
        ],
        note: '과학 교과 권장 과목 중 2과목 이상 권장'
    },
    {
        id: 'goryu_11',
        region: 'seoul',
        univName: '고려대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '건축사회환경공학부',
        standardMajor: '건축사회환경공학',
        subjects: [
            { group: '수학', name: '미적분Ⅱ', type: 'recommended', isGeneral: false },
            { group: '과학', name: '역학과 에너지', type: 'recommended', isGeneral: false },
        ],
        note: '-'
    },
    {
        id: 'goryu_12',
        region: 'seoul',
        univName: '고려대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '건축학과',
        standardMajor: '건축학',
        subjects: [
            { group: '수학', name: '미적분Ⅱ', type: 'recommended', isGeneral: false },
        ],
        note: '-'
    },
    {
        id: 'goryu_13',
        region: 'seoul',
        univName: '고려대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '기계공학부',
        standardMajor: '기계공학',
        subjects: [
            { group: '수학', name: '미적분Ⅱ', type: 'recommended', isGeneral: false },
            { group: '과학', name: '역학과 에너지', type: 'recommended', isGeneral: false },
            { group: '과학', name: '전자기와 양자', type: 'recommended', isGeneral: false },
        ],
        note: '-'
    },
    {
        id: 'goryu_14',
        region: 'seoul',
        univName: '고려대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '산업경영공학부',
        standardMajor: '산업경영공학',
        subjects: [
            { group: '수학', name: '미적분Ⅱ', type: 'recommended', isGeneral: false },
        ],
        note: '-'
    },
    {
        id: 'goryu_15',
        region: 'seoul',
        univName: '고려대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '전기전자공학과',
        standardMajor: '전기전자공학',
        subjects: [
            { group: '수학', name: '미적분Ⅱ', type: 'recommended', isGeneral: false },
            { group: '수학', name: '기하', type: 'recommended', isGeneral: false },
            { group: '과학', name: '역학과 에너지', type: 'recommended', isGeneral: false },
            { group: '과학', name: '전자기와 양자', type: 'recommended', isGeneral: false },
            { group: '과학', name: '물질과 에너지', type: 'recommended', isGeneral: false },
            { group: '과학', name: '화학반응의 세계', type: 'recommended', isGeneral: false },
        ],
        note: '과학 교과 권장 과목 중 2과목 이상 권장'
    },
    {
        id: 'goryu_16',
        region: 'seoul',
        univName: '고려대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '반도체공학과',
        standardMajor: '반도체공학',
        subjects: [
            { group: '수학', name: '미적분Ⅱ', type: 'recommended', isGeneral: false },
            { group: '과학', name: '역학과 에너지', type: 'recommended', isGeneral: false },
            { group: '과학', name: '전자기와 양자', type: 'recommended', isGeneral: false },
        ],
        note: '-'
    },
    {
        id: 'goryu_17',
        region: 'seoul',
        univName: '고려대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '융합에너지공학과',
        standardMajor: '융합에너지공학',
        subjects: [
            { group: '수학', name: '미적분Ⅱ', type: 'recommended', isGeneral: false },
            { group: '과학', name: '역학과 에너지', type: 'recommended', isGeneral: false },
            { group: '과학', name: '전자기와 양자', type: 'recommended', isGeneral: false },
            { group: '과학', name: '물질과 에너지', type: 'recommended', isGeneral: false },
            { group: '과학', name: '화학반응의 세계', type: 'recommended', isGeneral: false },
            { group: '과학', name: '세포와 물질대사', type: 'recommended', isGeneral: false },
            { group: '과학', name: '생물의 유전', type: 'recommended', isGeneral: false },
        ],
        note: '과학 교과 권장 과목 중 2과목 이상 권장'
    },
    {
        id: 'goryu_18',
        region: 'seoul',
        univName: '고려대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '차세대통신학과',
        standardMajor: '차세대통신학',
        subjects: [
            { group: '수학', name: '미적분Ⅱ', type: 'recommended', isGeneral: false },
            { group: '과학', name: '역학과 에너지', type: 'recommended', isGeneral: false },
            { group: '과학', name: '전자기와 양자', type: 'recommended', isGeneral: false },
        ],
        note: '-'
    },

    {
        id: 'gwangwon_',
        region: 'seoul',
        univName: '광운대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '수학과',
        standardMajor: '수학',
        subjects: [
            { group: '수학', name: '대수', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅰ', type: 'core', isGeneral: false },
            { group: '수학', name: '확률과 통계', type: 'core', isGeneral: false },
            { group: '수학', name: '물리학', type: 'core', isGeneral: false },
            { group: '수학', name: '화학', type: 'core', isGeneral: false },
            { group: '수학', name: '생명과학', type: 'core', isGeneral: false },
            { group: '수학', name: '기하', type: 'recommended', isGeneral: false },
            { group: '수학', name: '미적분Ⅱ', type: 'recommended', isGeneral: false },
            { group: '과학', name: '역학과 에너지', type: 'recommended', isGeneral: false },
            { group: '과학', name: '전자기와 양자', type: 'recommended', isGeneral: false },
            { group: '과학', name: '물질과 에너지', type: 'recommended', isGeneral: false },
            { group: '과학', name: '화학반응의 세계', type: 'recommended', isGeneral: false },
            { group: '과학', name: '세포와 물질대사', type: 'recommended', isGeneral: false },
            { group: '과학', name: '생물의 유전', type: 'recommended', isGeneral: false },
        ],
        note: '융합 선택 과목: 실용통계, 수학과제 탐구, 융합과학 탐구'
    },
]

export { NAV_UNIVERSE_REGIONS, NAV_UNIVERSE_DATA }
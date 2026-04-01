import type { UniverseType } from "@/type/nav";

const GUKMIN: UniverseType[] = [
    {
        id: 'gukmin_0',
        region: 'seoul',
        univName: '국민대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '중어중문학과',
        standardMajor: '중어중문학',
        subjects: [
            { group: '제2외국어/한문', name: '중국어', type: 'core', isGeneral: false },
            { group: '제2외국어/한문', name: '중국어 회화', type: 'recommended', isGeneral: false },
            { group: '제2외국어/한문', name: '한문 고전 읽기', type: 'recommended', isGeneral: false },
        ],
        note: '교과를 제시하지 않은 모집단위는 학생의 진로와 적성을 고려하여 교과목을 선택 이수할 것'
    },
    {
        id: 'gukmin_1',
        region: 'seoul',
        univName: '국민대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '한문역사학과',
        standardMajor: '한문역사학',
        subjects: [
            { group: '사회', name: '한국사', type: 'core', isGeneral: false },
            { group: '사회', name: '동아시아 역사 기행', type: 'core', isGeneral: false },
            { group: '사회', name: '세계사', type: 'recommended', isGeneral: false },
            { group: '사회', name: '한국지리 탐구', type: 'recommended', isGeneral: false },
            { group: '제2외국어/한문', name: '한문', type: 'recommended', isGeneral: false },
        ],
        note: '교과를 제시하지 않은 모집단위는 학생의 진로와 적성을 고려하여 교과목을 선택 이수할 것'
    },
    {
        id: 'gukmin_2',
        region: 'seoul',
        univName: '국민대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '정치외교학과',
        standardMajor: '정치외교학',
        subjects: [
            { group: '사회', name: '사회와 문화', type: 'core', isGeneral: false },
            { group: '사회', name: '정치', type: 'recommended', isGeneral: false },
            { group: '사회', name: '법과 사회', type: 'recommended', isGeneral: false },
            { group: '사회', name: '국제 관계의 이해', type: 'recommended', isGeneral: false },
            { group: '수학', name: '확률과 통계', type: 'recommended', isGeneral: false },
        ],
        note: '교과를 제시하지 않은 모집단위는 학생의 진로와 적성을 고려하여 교과목을 선택 이수할 것'
    },
    {
        id: 'gukmin_3',
        region: 'seoul',
        univName: '국민대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '미디어광고학부 미디어전공',
        standardMajor: '미디어학',
        subjects: [
            { group: '수학', name: '확률과 통계', type: 'recommended', isGeneral: false },
        ],
        note: '교과를 제시하지 않은 모집단위는 학생의 진로와 적성을 고려하여 교과목을 선택 이수할 것'
    },
    {
        id: 'gukmin_4',
        region: 'seoul',
        univName: '국민대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '미디어광고학부 공고홍보학전공',
        standardMajor: '광고홍보학',
        subjects: [
            { group: '국어', name: '문학과 영상', type: 'recommended', isGeneral: false },
            { group: '영어', name: '영어 발표와 토론', type: 'recommended', isGeneral: false },
        ],
        note: '교과를 제시하지 않은 모집단위는 학생의 진로와 적성을 고려하여 교과목을 선택 이수할 것'
    },
    {
        id: 'gukmin_5',
        region: 'seoul',
        univName: '국민대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '동아시아국제학부',
        standardMajor: '동아시아국제학',
        subjects: [
            { group: '국어', name: '화법과 언어', type: 'core', isGeneral: false },
            { group: '사회', name: '동아시아 역사 기행', type: 'recommended', isGeneral: false },
            { group: '사회', name: '국제 관계의 이해', type: 'recommended', isGeneral: false },
        ],
        note: '교과를 제시하지 않은 모집단위는 학생의 진로와 적성을 고려하여 교과목을 선택 이수할 것'
    },
    {
        id: 'gukmin_6',
        region: 'seoul',
        univName: '국민대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '경제학과',
        standardMajor: '경제학',
        subjects: [
            { group: '수학', name: '미적분Ⅰ or 확률과 통계', type: 'core', isGeneral: false },
            { group: '수학', name: '경제수학 or 경제', type: 'recommended', isGeneral: false },
        ],
        note: '교과를 제시하지 않은 모집단위는 학생의 진로와 적성을 고려하여 교과목을 선택 이수할 것'
    },
    {
        id: 'gukmin_7',
        region: 'seoul',
        univName: '국민대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '국제통상학과',
        standardMajor: '국제통상학',
        subjects: [
            { group: '수학', name: '미적분Ⅰ or 확률과 통계', type: 'core', isGeneral: false },
        ],
        note: '교과를 제시하지 않은 모집단위는 학생의 진로와 적성을 고려하여 교과목을 선택 이수할 것'
    },
    {
        id: 'gukmin_8',
        region: 'seoul',
        univName: '국민대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '경영학부',
        standardMajor: '경영학',
        subjects: [
            { group: '수학', name: '확률과 통계', type: 'core', isGeneral: false },
            { group: '수학', name: '경제수학', type: 'recommended', isGeneral: false },
        ],
        note: '교과를 제시하지 않은 모집단위는 학생의 진로와 적성을 고려하여 교과목을 선택 이수할 것'
    },
    {
        id: 'gukmin_9',
        region: 'seoul',
        univName: '국민대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '경영정보학부',
        standardMajor: '경영정보학',
        subjects: [
            { group: '수학', name: '확률과 통계', type: 'core', isGeneral: false },
        ],
        note: '교과를 제시하지 않은 모집단위는 학생의 진로와 적성을 고려하여 교과목을 선택 이수할 것'
    },
    {
        id: 'gukmin_10',
        region: 'seoul',
        univName: '국민대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: 'AI빅데이터융합경영학',
        standardMajor: 'AI빅데이터융합경영학',
        subjects: [
            { group: '수학', name: '확률과 통계', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅰ', type: 'recommended', isGeneral: false },
        ],
        note: '교과를 제시하지 않은 모집단위는 학생의 진로와 적성을 고려하여 교과목을 선택 이수할 것'
    },
    {
        id: 'gukmin_11',
        region: 'seoul',
        univName: '국민대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '경영정보학부',
        standardMajor: '경영정보학',
        subjects: [
            { group: '수학', name: '확률과 통계', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅰ', type: 'recommended', isGeneral: false },
        ],
        note: '교과를 제시하지 않은 모집단위는 학생의 진로와 적성을 고려하여 교과목을 선택 이수할 것'
    },
    {
        id: 'gukmin_12',
        region: 'seoul',
        univName: '국민대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: 'AI빅데이터융합경영학',
        standardMajor: 'AI빅데이터융합경영학',
        subjects: [
            { group: '수학', name: '확률과 통계', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅰ', type: 'recommended', isGeneral: false },
        ],
        note: '교과를 제시하지 않은 모집단위는 학생의 진로와 적성을 고려하여 교과목을 선택 이수할 것'
    },
    {
        id: 'gukmin_13',
        region: 'seoul',
        univName: '국민대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '신소재공학부',
        standardMajor: '신소재공학',
        subjects: [
            { group: '수학', name: '미적분Ⅰ', type: 'core', isGeneral: false },
            { group: '과학', name: '물리학', type: 'core', isGeneral: false },
            { group: '과학', name: '화학', type: 'core', isGeneral: false },
            { group: '수학', name: '기하', type: 'recommended', isGeneral: false },
            { group: '과학', name: '역학과 에너지', type: 'recommended', isGeneral: false },
            { group: '과학', name: '물질과 에너지', type: 'recommended', isGeneral: false },
        ],
        note: '교과를 제시하지 않은 모집단위는 학생의 진로와 적성을 고려하여 교과목을 선택 이수할 것'
    },
    {
        id: 'gukmin_14',
        region: 'seoul',
        univName: '국민대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '기계공학부',
        standardMajor: '기계공학',
        subjects: [
            { group: '수학', name: '미적분Ⅰ', type: 'core', isGeneral: false },
            { group: '과학', name: '물리학', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅱ', type: 'recommended', isGeneral: false },
            { group: '수학', name: '기하', type: 'recommended', isGeneral: false },
            { group: '과학', name: '역학과 에너지', type: 'recommended', isGeneral: false },
        ],
        note: '교과를 제시하지 않은 모집단위는 학생의 진로와 적성을 고려하여 교과목을 선택 이수할 것'
    },
    {
        id: 'gukmin_15',
        region: 'seoul',
        univName: '국민대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '건설시스템공학부',
        standardMajor: '건설시스템공학',
        subjects: [
            { group: '수학', name: '대수', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅰ', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅱ', type: 'core', isGeneral: false },
            { group: '과학', name: '물리학', type: 'core', isGeneral: false },
            { group: '수학', name: '확률과 통계', type: 'recommended', isGeneral: false },
            { group: '과학', name: '화학', type: 'recommended', isGeneral: false },
        ],
        note: '교과를 제시하지 않은 모집단위는 학생의 진로와 적성을 고려하여 교과목을 선택 이수할 것'
    },
    {
        id: 'gukmin_16',
        region: 'seoul',
        univName: '국민대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '전자공학부',
        standardMajor: '전자공학',
        subjects: [
            { group: '수학', name: '대수', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅰ', type: 'core', isGeneral: false },
            { group: '과학', name: '물리학', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅱ', type: 'recommended', isGeneral: false },
        ],
        note: '교과를 제시하지 않은 모집단위는 학생의 진로와 적성을 고려하여 교과목을 선택 이수할 것'
    },
    {
        id: 'gukmin_17',
        region: 'seoul',
        univName: '국민대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '소프트웨어학부',
        standardMajor: '소프트웨어학',
        subjects: [
            { group: '수학', name: '확률과 통계', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅰ', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅱ', type: 'recommended', isGeneral: false },
            { group: '수학', name: '기하', type: 'recommended', isGeneral: false },
        ],
        note: '교과를 제시하지 않은 모집단위는 학생의 진로와 적성을 고려하여 교과목을 선택 이수할 것'
    },
    {
        id: 'gukmin_18',
        region: 'seoul',
        univName: '국민대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '인공지능학부',
        standardMajor: '인공지능학',
        subjects: [
            { group: '수학', name: '확률과 통계', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅰ', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅱ', type: 'recommended', isGeneral: false },
            { group: '수학', name: '기하', type: 'recommended', isGeneral: false },
        ],
        note: '교과를 제시하지 않은 모집단위는 학생의 진로와 적성을 고려하여 교과목을 선택 이수할 것'
    },
    {
        id: 'gukmin_19',
        region: 'seoul',
        univName: '국민대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '자동차융합대학',
        standardMajor: '자동차융합대학',
        subjects: [
            { group: '수학', name: '미적분Ⅰ', type: 'core', isGeneral: false },
            { group: '과학', name: '물리학', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅱ', type: 'recommended', isGeneral: false },
            { group: '수학', name: '기하', type: 'recommended', isGeneral: false },
        ],
        note: '교과를 제시하지 않은 모집단위는 학생의 진로와 적성을 고려하여 교과목을 선택 이수할 것'
    },
    {
        id: 'gukmin_20',
        region: 'seoul',
        univName: '국민대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '미래모빌리티학과',
        standardMajor: '미래모빌리티학',
        subjects: [
            { group: '수학', name: '미적분Ⅰ', type: 'core', isGeneral: false },
            { group: '과학', name: '물리학', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅱ', type: 'recommended', isGeneral: false },
            { group: '수학', name: '기하', type: 'recommended', isGeneral: false },
        ],
        note: '교과를 제시하지 않은 모집단위는 학생의 진로와 적성을 고려하여 교과목을 선택 이수할 것'
    },
    {
        id: 'gukmin_21',
        region: 'seoul',
        univName: '국민대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '임산생명공학과',
        standardMajor: '임산생명공학',
        subjects: [
            { group: '수학', name: '확률과 통계', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅰ', type: 'core', isGeneral: false },
            { group: '과학', name: '화학', type: 'core', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅱ', type: 'recommended', isGeneral: false },
            { group: '과학', name: '세포와 물질대사', type: 'recommended', isGeneral: false },
            { group: '과학', name: '화학반응의 세계', type: 'recommended', isGeneral: false },
            { group: '과학', name: '생물의 유전', type: 'recommended', isGeneral: false },
        ],
        note: '교과를 제시하지 않은 모집단위는 학생의 진로와 적성을 고려하여 교과목을 선택 이수할 것'
    },
    {
        id: 'gukmin_22',
        region: 'seoul',
        univName: '국민대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '나노전자물리학과',
        standardMajor: '나노전자물리학',
        subjects: [
            { group: '수학', name: '대수', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅰ', type: 'core', isGeneral: false },
            { group: '과학', name: '물리학', type: 'core', isGeneral: false },
            { group: '과학', name: '역학과 에너지', type: 'recommended', isGeneral: false },
            { group: '과학', name: '전자기와 양자', type: 'recommended', isGeneral: false },
        ],
        note: '교과를 제시하지 않은 모집단위는 학생의 진로와 적성을 고려하여 교과목을 선택 이수할 것'
    },
    {
        id: 'gukmin_23',
        region: 'seoul',
        univName: '국민대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '응용화학부-나노소재전공',
        standardMajor: '응용화학부-나노소재전공',
        subjects: [
            { group: '수학', name: '미적분Ⅰ', type: 'core', isGeneral: false },
            { group: '과학', name: '화학', type: 'core', isGeneral: false },
            { group: '수학', name: '인공지능 수학', type: 'recommended', isGeneral: false },
            { group: '과학', name: '물질과 에너지', type: 'recommended', isGeneral: false },
            { group: '과학', name: '화학 반응의 세계', type: 'recommended', isGeneral: false },
        ],
        note: '교과를 제시하지 않은 모집단위는 학생의 진로와 적성을 고려하여 교과목을 선택 이수할 것'
    },
    {
        id: 'gukmin_24',
        region: 'seoul',
        univName: '국민대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '응용화학부-바이오의약전공',
        standardMajor: '응용화학부-바이오의약전공',
        subjects: [
            { group: '과학', name: '화학', type: 'core', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'core', isGeneral: false },
            { group: '과학', name: '세포와 물질대사', type: 'recommended', isGeneral: false },
            { group: '과학', name: '생물의 유전', type: 'recommended', isGeneral: false },
            { group: '과학', name: '화학 반응의 세계', type: 'recommended', isGeneral: false },
        ],
        note: '교과를 제시하지 않은 모집단위는 학생의 진로와 적성을 고려하여 교과목을 선택 이수할 것'
    },
    {
        id: 'gukmin_25',
        region: 'seoul',
        univName: '국민대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '정보보안암호수학과',
        standardMajor: '정보보안암호수학과',
        subjects: [
            { group: '수학', name: '대수', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅰ', type: 'core', isGeneral: false },
            { group: '수학', name: '확률과 통계', type: 'core', isGeneral: false },
            { group: '수학', name: '기하', type: 'recommended', isGeneral: false },
            { group: '수학', name: '미적분Ⅱ', type: 'recommended', isGeneral: false },
        ],
        note: '교과를 제시하지 않은 모집단위는 학생의 진로와 적성을 고려하여 교과목을 선택 이수할 것'
    },
    {
        id: 'gukmin_26',
        region: 'seoul',
        univName: '국민대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '건축학부',
        standardMajor: '건축학',
        subjects: [
            { group: '수학', name: '대수', type: 'core', isGeneral: false },
            { group: '수학', name: '미적분Ⅰ', type: 'core', isGeneral: false },
            { group: '과학', name: '물리학', type: 'core', isGeneral: false },
            { group: '수학', name: '기하', type: 'recommended', isGeneral: false },
            { group: '수학', name: '미적분Ⅱ', type: 'recommended', isGeneral: false },
        ],
        note: '교과를 제시하지 않은 모집단위는 학생의 진로와 적성을 고려하여 교과목을 선택 이수할 것'
    },
]

export { GUKMIN }
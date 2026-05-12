import type { UniverseType } from "@/type/nav";

const note = "- 역량영역 과목 : 핵심과목, 소양영역 과목 : 권장과목\n- 수학 ①, ② 일반 선택 과목: 대수, 미적분Ⅰ, 확률과 통계\n- 수학 ① 진로 선택 과목: 미적분Ⅱ, 경제수학\n- 수학 ② 진로 선택 과목: 미적분Ⅱ, 기하, 인공지능 수학\n- 수학 ①, ② 융합 선택 과목: 수학과 문화, 실용 통계, 수학과제 탐구\n- 계열 특성에 따라 수학 및 과학 역량이 기초 학업 역량이자 전공 수학 역량임.\n- 기초 학업 역량을 기반으로 한 전공 관련 역량 및 소양이 필요함에 따라 사회 교과의 관심 있는 과목이수를 추천함.\n- 과학 교과의 역량영역은 동국대 기준 교과 영역별 일반 선택 과목 이수 후 진로 선택 1과목 이상 이수 권장.\n(예시: 정보통신공학과 물리학 영역은 물리학 이수 후, 진로 선택 과목인 「물리학」 이수 후 「역학과 에너지」 또는 「전자기와 양자」학습 권장)"

const DONGGUK: UniverseType[] = [
    {
        id: 'dongguk_0',
        region: 'seoul',
        univName: '동국대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '불교학부',
        standardMajor: '불교학',
        subjects: [
            { group: '사회', name: '역사', type: 'core', isGeneral: false },
            { group: '사회', name: '윤리', type: 'core', isGeneral: false },
            { group: '사회', name: '지리', type: 'recommended', isGeneral: false },
            { group: '사회', name: '일반사회', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_1',
        region: 'seoul',
        univName: '동국대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '문화유산학과',
        standardMajor: '문화유산학',
        subjects: [
            { group: '사회', name: '역사', type: 'core', isGeneral: false },
            { group: '사회', name: '일반사회', type: 'core', isGeneral: false },
            { group: '제2괴국어/한문', name: '한문', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_2',
        region: 'seoul',
        univName: '동국대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '국어국문·문예창작학부',
        standardMajor: '국어국문학',
        subjects: [
            { group: '국어', name: '국어', type: 'core', isGeneral: false },
            { group: '사회', name: '역사', type: 'recommended', isGeneral: false },
            { group: '사회', name: '일반사회', type: 'recommended', isGeneral: false },
            { group: '제2외국어/한문', name: '한문', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_3',
        region: 'seoul',
        univName: '동국대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '국어국문·문예창작학부',
        standardMajor: '문예창작학',
        subjects: [
            { group: '국어', name: '국어', type: 'core', isGeneral: false },
            { group: '사회', name: '역사', type: 'recommended', isGeneral: false },
            { group: '사회', name: '일반사회', type: 'recommended', isGeneral: false },
            { group: '제2외국어/한문', name: '한문', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_4',
        region: 'seoul',
        univName: '동국대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '영어영문학부',
        standardMajor: '영어영문학',
        subjects: [
            { group: '국어', name: '국어', type: 'core', isGeneral: false },
            { group: '영어', name: '영어', type: 'core', isGeneral: false },
            { group: '사회', name: '일반사회', type: 'recommended', isGeneral: false },
            { group: '사회', name: '역사', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_5',
        region: 'seoul',
        univName: '동국대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '일본학과',
        standardMajor: '일본학과',
        subjects: [
            { group: '국어', name: '국어', type: 'core', isGeneral: false },
            { group: '제2외국서/한문', name: '일본어', type: 'core', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_6',
        region: 'seoul',
        univName: '동국대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '중어중문학과',
        standardMajor: '중어중문학',
        subjects: [
            { group: '국어', name: '국어', type: 'core', isGeneral: false },
            { group: '제2외국서/한문', name: '중국어', type: 'core', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_7',
        region: 'seoul',
        univName: '동국대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '철학과',
        standardMajor: '철학',
        subjects: [
            { group: '국어', name: '국어', type: 'core', isGeneral: false },
            { group: '사회', name: '윤리', type: 'core', isGeneral: false },
            { group: '교양', name: '교양', type: 'recommended', isGeneral: false },
            { group: '제2외국서/한문', name: '한문', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_8',
        region: 'seoul',
        univName: '동국대',
        category: '인문계열',
        standardCategory: 'humanities',
        majorName: '사학과',
        standardMajor: '사학과',
        subjects: [
            { group: '국어', name: '국어', type: 'core', isGeneral: false },
            { group: '사회', name: '역사', type: 'core', isGeneral: false },
            { group: '사회', name: '일반사회', type: 'recommended', isGeneral: false },
            { group: '사회', name: '지리', type: 'recommended', isGeneral: false },
            { group: '사회', name: '윤리', type: 'recommended', isGeneral: false },
            { group: '제2외국서/한문', name: '한문', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_9',
        region: 'seoul',
        univName: '동국대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '법학과',
        standardMajor: '법학과',
        subjects: [
            { group: '국어', name: '국어', type: 'core', isGeneral: false },
            { group: '사회', name: '일반사회', type: 'core', isGeneral: false },
            { group: '사회', name: '윤리', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_10',
        region: 'seoul',
        univName: '동국대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '정치외교학전공',
        standardMajor: '정치외교학',
        subjects: [
            { group: '사회', name: '일반사회', type: 'core', isGeneral: false },
            { group: '사회', name: '역사', type: 'recommended', isGeneral: false },
            { group: '사회', name: '윤리', type: 'recommended', isGeneral: false },
            { group: '사회', name: '지리', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_11',
        region: 'seoul',
        univName: '동국대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '행정학전공',
        standardMajor: '행정학',
        subjects: [
            { group: '사회', name: '일반사회', type: 'core', isGeneral: false },
            { group: '사회', name: '역사', type: 'recommended', isGeneral: false },
            { group: '사회', name: '윤리', type: 'recommended', isGeneral: false },
            { group: '사회', name: '지리', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_12',
        region: 'seoul',
        univName: '동국대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '북한학전공',
        standardMajor: '북한학',
        subjects: [
            { group: '사회', name: '일반사회', type: 'core', isGeneral: false },
            { group: '사회', name: '역사', type: 'recommended', isGeneral: false },
            { group: '사회', name: '윤리', type: 'recommended', isGeneral: false },
            { group: '사회', name: '지리', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_13',
        region: 'seoul',
        univName: '동국대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '광고홍보학전공',
        standardMajor: '광고홍보학',
        subjects: [
            { group: '사회', name: '일반사회', type: 'core', isGeneral: false },
            { group: '사회', name: '역사', type: 'recommended', isGeneral: false },
            { group: '사회', name: '윤리', type: 'recommended', isGeneral: false },
            { group: '사회', name: '지리', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_14',
        region: 'seoul',
        univName: '동국대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '미디어커뮤니케이션학전공',
        standardMajor: '미디어커뮤니케이션학',
        subjects: [
            { group: '사회', name: '일반사회', type: 'core', isGeneral: false },
            { group: '사회', name: '역사', type: 'recommended', isGeneral: false },
            { group: '사회', name: '윤리', type: 'recommended', isGeneral: false },
            { group: '사회', name: '지리', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_15',
        region: 'seoul',
        univName: '동국대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '경찰행정학부',
        standardMajor: '경찰행정학',
        subjects: [
            { group: '수학', name: '수학①', type: 'core', isGeneral: true },
            { group: '사회', name: '일반사회', type: 'core', isGeneral: false },
            { group: '사회', name: '역사', type: 'recommended', isGeneral: false },
            { group: '사회', name: '윤리', type: 'recommended', isGeneral: false },
            { group: '사회', name: '지리', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_16',
        region: 'seoul',
        univName: '동국대',
        category: '사회계열',
        standardCategory: 'social',
        majorName: '경영대학(광역화)',
        standardMajor: '경영학',
        subjects: [
            { group: '수학', name: '수학①', type: 'core', isGeneral: true },
            { group: '영어', name: '영어', type: 'core', isGeneral: false },
            { group: '사회', name: '일반사회', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_17',
        region: 'seoul',
        univName: '동국대',
        category: '교육계열',
        standardCategory: 'education',
        majorName: '교육학과',
        standardMajor: '교육학과',
        subjects: [
            { group: '사회', name: '일반사회', type: 'core', isGeneral: false },
            { group: '사회', name: '역사', type: 'recommended', isGeneral: false },
            { group: '사회', name: '윤리', type: 'recommended', isGeneral: false },
            { group: '사회', name: '지리', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_18',
        region: 'seoul',
        univName: '동국대',
        category: '교육계열',
        standardCategory: 'education',
        majorName: '국어교육과',
        standardMajor: '국어교육과',
        subjects: [
            { group: '국어', name: '국어', type: 'core', isGeneral: false },
            { group: '사회', name: '일반사회', type: 'recommended', isGeneral: false },
            { group: '사회', name: '역사', type: 'recommended', isGeneral: false },
            { group: '사회', name: '윤리', type: 'recommended', isGeneral: false },
            { group: '사회', name: '지리', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_19',
        region: 'seoul',
        univName: '동국대',
        category: '교육계열',
        standardCategory: 'education',
        majorName: '역사교육과',
        standardMajor: '역사교육과',
        subjects: [
            { group: '사회', name: '역사', type: 'core', isGeneral: false },
            { group: '사회', name: '일반사회', type: 'recommended', isGeneral: false },
            { group: '사회', name: '지리', type: 'recommended', isGeneral: false },
            { group: '사회', name: '윤리', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_20',
        region: 'seoul',
        univName: '동국대',
        category: '교육계열',
        standardCategory: 'education',
        majorName: '지리교육과',
        standardMajor: '지리교육과',
        subjects: [
            { group: '사회', name: '역사', type: 'core', isGeneral: false },
            { group: '사회', name: '일반사회', type: 'recommended', isGeneral: false },
            { group: '사회', name: '지리', type: 'recommended', isGeneral: false },
            { group: '사회', name: '윤리', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_21',
        region: 'seoul',
        univName: '동국대',
        category: '교육계열',
        standardCategory: 'education',
        majorName: '수학교육과',
        standardMajor: '수학교육과',
        subjects: [
            { group: '수학', name: '수학②', type: 'core', isGeneral: true },

        ],
        note: note
    },
    {
        id: 'dongguk_22',
        region: 'seoul',
        univName: '동국대',
        category: '교육계열',
        standardCategory: 'education',
        majorName: '가정교육과',
        standardMajor: '가정교육과',
        subjects: [
            { group: '과학', name: '화학', type: 'core', isGeneral: false },
            { group: '기술·가정/정보', name: '기술·가정', type: 'core', isGeneral: false },
            { group: '사회', name: '일반사회', type: 'recommended', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'recommended', isGeneral: false },
            { group: '기술·가정/정보', name: '정보', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_23',
        region: 'seoul',
        univName: '동국대',
        category: '예체능계열',
        standardCategory: 'arts_sports',
        majorName: '연극학부',
        standardMajor: '연극학',
        subjects: [
            { group: '사회', name: '일반사회', type: 'recommended', isGeneral: false },
            { group: '사회', name: '역사', type: 'recommended', isGeneral: false },
            { group: '사회', name: '윤리', type: 'recommended', isGeneral: false },
            { group: '사회', name: '지리', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_24',
        region: 'seoul',
        univName: '동국대',
        category: '예체능계열',
        standardCategory: 'arts_sports',
        majorName: '영화영상학과',
        standardMajor: '영화영상학',
        subjects: [
            { group: '사회', name: '일반사회', type: 'recommended', isGeneral: false },
            { group: '사회', name: '역사', type: 'recommended', isGeneral: false },
            { group: '사회', name: '윤리', type: 'recommended', isGeneral: false },
            { group: '사회', name: '지리', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_25',
        region: 'seoul',
        univName: '동국대',
        category: '자유계열',
        standardCategory: 'liberal_arts',
        majorName: '열린전공학부(인문)',
        standardMajor: '열린전공학부',
        subjects: [
            { group: '국어', name: '국어', type: 'core', isGeneral: true },
            { group: '영어', name: '영어', type: 'core', isGeneral: true },
            { group: '사회', name: '일반사회', type: 'recommended', isGeneral: true },
            { group: '사회', name: '역사', type: 'recommended', isGeneral: true },
            { group: '사회', name: '윤리', type: 'recommended', isGeneral: true },
            { group: '사회', name: '지리', type: 'recommended', isGeneral: true },
            { group: '제2외국어/한문', name: '제2외국어', type: 'recommended', isGeneral: true },
        ],
        note: note
    },
    {
        id: 'dongguk_26',
        region: 'seoul',
        univName: '동국대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '수학과',
        standardMajor: '수학과',
        subjects: [
            { group: '수학', name: '수학②', type: 'core', isGeneral: true },

        ],
        note: note
    },
    {
        id: 'dongguk_27',
        region: 'seoul',
        univName: '동국대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '통계학과',
        standardMajor: '통계학',
        subjects: [
            { group: '수학', name: '수학②', type: 'core', isGeneral: true },

        ],
        note: note
    },
    {
        id: 'dongguk_28',
        region: 'seoul',
        univName: '동국대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '화학과',
        standardMajor: '화학',
        subjects: [
            { group: '수학', name: '수학②', type: 'core', isGeneral: true },
            { group: '과학', name: '물리학', type: 'core', isGeneral: false },
            { group: '과학', name: '화학', type: 'core', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'recommended', isGeneral: false },

        ],
        note: note
    },
    {
        id: 'dongguk_29',
        region: 'seoul',
        univName: '동국대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '물리학과',
        standardMajor: '물리학',
        subjects: [
            { group: '수학', name: '수학②', type: 'core', isGeneral: true },
            { group: '과학', name: '물리학', type: 'core', isGeneral: false },
            { group: '과학', name: '화학', type: 'core', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'recommended', isGeneral: false },

        ],
        note: note
    },
    {
        id: 'dongguk_30',
        region: 'seoul',
        univName: '동국대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '바이오시스템대학',
        standardMajor: '바이오시스템학',
        subjects: [
            { group: '수학', name: '수학②', type: 'core', isGeneral: true },
            { group: '과학', name: '화학', type: 'core', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'core', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_31',
        region: 'seoul',
        univName: '동국대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '식품바이오융합공학과',
        standardMajor: '식품바이오융합공학',
        subjects: [
            { group: '수학', name: '수학②', type: 'core', isGeneral: true },
            { group: '과학', name: '화학', type: 'core', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'core', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_32',
        region: 'seoul',
        univName: '동국대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '융합환경과학과',
        standardMajor: '융합환경과학',
        subjects: [
            { group: '수학', name: '수학②', type: 'core', isGeneral: true },
            { group: '과학', name: '화학', type: 'core', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'core', isGeneral: false },
            { group: '과학', name: '지구과학', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_33',
        region: 'seoul',
        univName: '동국대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '생명과학과',
        standardMajor: '생명과학',
        subjects: [
            { group: '수학', name: '수학②', type: 'core', isGeneral: true },
            { group: '과학', name: '화학', type: 'core', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'core', isGeneral: false },
            { group: '과학', name: '물리학', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_34',
        region: 'seoul',
        univName: '동국대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '의생명공학과',
        standardMajor: '의생명공학',
        subjects: [
            { group: '수학', name: '수학②', type: 'core', isGeneral: true },
            { group: '과학', name: '물리학', type: 'core', isGeneral: false },
            { group: '과학', name: '화학', type: 'core', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_35',
        region: 'seoul',
        univName: '동국대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '전자전기공학부',
        standardMajor: '전자전기공학',
        subjects: [
            { group: '수학', name: '수학②', type: 'core', isGeneral: true },
            { group: '과학', name: '물리학', type: 'core', isGeneral: false },
            { group: '과학', name: '화학', type: 'core', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_36',
        region: 'seoul',
        univName: '동국대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '기계로봇에너지공학과',
        standardMajor: '기계로봇에너지공학',
        subjects: [
            { group: '수학', name: '수학②', type: 'core', isGeneral: true },
            { group: '과학', name: '물리학', type: 'core', isGeneral: false },
            { group: '과학', name: '화학', type: 'core', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_37',
        region: 'seoul',
        univName: '동국대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '에너지신소재공학과',
        standardMajor: '에너지신소재공학',
        subjects: [
            { group: '수학', name: '수학②', type: 'core', isGeneral: true },
            { group: '과학', name: '물리학', type: 'core', isGeneral: false },
            { group: '과학', name: '화학', type: 'core', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_38',
        region: 'seoul',
        univName: '동국대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '정보통신공학과',
        standardMajor: '정보통신공학',
        subjects: [
            { group: '수학', name: '수학②', type: 'core', isGeneral: true },
            { group: '과학', name: '물리학', type: 'core', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_39',
        region: 'seoul',
        univName: '동국대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '건축공학부',
        standardMajor: '건축공학',
        subjects: [
            { group: '수학', name: '수학②', type: 'core', isGeneral: true },
            { group: '과학', name: '물리학', type: 'core', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_40',
        region: 'seoul',
        univName: '동국대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '건설환경공학과',
        standardMajor: '건설환경공학',
        subjects: [
            { group: '수학', name: '수학②', type: 'core', isGeneral: true },
            { group: '과학', name: '물리학', type: 'core', isGeneral: false },
            { group: '과학', name: '화학', type: 'core', isGeneral: false },
            { group: '과학', name: '지구과학', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_41',
        region: 'seoul',
        univName: '동국대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '화공생물공학과',
        standardMajor: '화공생물공학',
        subjects: [
            { group: '수학', name: '수학②', type: 'core', isGeneral: true },
            { group: '과학', name: '물리학', type: 'core', isGeneral: false },
            { group: '과학', name: '화학', type: 'core', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_42',
        region: 'seoul',
        univName: '동국대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '산업시스템공학과',
        standardMajor: '산업시스템공학',
        subjects: [
            { group: '수학', name: '수학②', type: 'core', isGeneral: true },
            { group: '과학', name: '물리학', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_43',
        region: 'seoul',
        univName: '동국대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '컴퓨터·AI학부',
        standardMajor: '컴퓨터학과',
        subjects: [
            { group: '수학', name: '수학②', type: 'core', isGeneral: true },
        ],
        note: note
    },
    {
        id: 'dongguk_44',
        region: 'seoul',
        univName: '동국대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '컴퓨터·AI학부',
        standardMajor: 'AI학과',
        subjects: [
            { group: '수학', name: '수학②', type: 'core', isGeneral: true },
        ],
        note: note
    },
    {
        id: 'dongguk_45',
        region: 'seoul',
        univName: '동국대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '시스템반도체학부',
        standardMajor: '시스템반도체학',
        subjects: [
            { group: '수학', name: '수학②', type: 'core', isGeneral: true },
            { group: '과학', name: '물리학', type: 'core', isGeneral: false },
            { group: '과학', name: '화학', type: 'core', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_46',
        region: 'seoul',
        univName: '동국대',
        category: '공학계열',
        standardCategory: 'engineering',
        majorName: '의료인공지능공학과',
        standardMajor: '의료인공지능공학',
        subjects: [
            { group: '수학', name: '수학②', type: 'core', isGeneral: true },
            { group: '과학', name: '물리학', type: 'core', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_47',
        region: 'seoul',
        univName: '동국대',
        category: '자연계열',
        standardCategory: 'natural',
        majorName: '지능형네트워크융합학과',
        standardMajor: '지능형네트워크융합학',
        subjects: [
            { group: '수학', name: '수학②', type: 'core', isGeneral: true },
            { group: '과학', name: '물리학', type: 'core', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_48',
        region: 'seoul',
        univName: '동국대',
        category: '의약계열',
        standardCategory: 'medical',
        majorName: '약학과',
        standardMajor: '약학과',
        subjects: [
            { group: '수학', name: '수학②', type: 'core', isGeneral: true },
            { group: '과학', name: '화학', type: 'core', isGeneral: false },
            { group: '과학', name: '생명과학', type: 'core', isGeneral: false },
            { group: '과학', name: '물리학', type: 'recommended', isGeneral: false },
        ],
        note: note
    },
    {
        id: 'dongguk_49',
        region: 'seoul',
        univName: '동국대',
        category: '자유계열',
        standardCategory: 'liberal_arts',
        majorName: '열린전공학부(자연)',
        standardMajor: '열린전공학부',
        subjects: [
            { group: '수학', name: '수학②', type: 'core', isGeneral: true },
            { group: '과학', name: '물리학', type: 'recommended', isGeneral: true },
            { group: '과학', name: '화학', type: 'recommended', isGeneral: true },
        ],
        note: note
    },
]

export { DONGGUK }
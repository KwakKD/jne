import type { StandardCategoryType, UniverseType } from "@/type/nav";
import { GATHOLIC, GORYU, GUKMIN, GUNGUK, GWANGWON, GYOUNGHWE } from "./universe";

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

const NAV_UNIVERSE_DATA: UniverseType[] = [...GATHOLIC, ...GORYU, ...GUNGUK, ...GWANGWON,...GYOUNGHWE,...GUKMIN]

export { NAV_UNIVERSE_REGIONS, NAV_UNIVERSE_DATA }
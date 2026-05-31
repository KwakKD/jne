import type { UnionInfoProps } from "@/api/supabaseAPI";
import { Badge, Button } from "@/components/ui";
import { JNE_HIGH_SCHOOLS, regions, type Region } from "@/data/Curri/mapConfig";
import { cn } from "@/lib/utils";
import { useUnionStaStore } from "@/store/UnionStaStore";
import { Minus, Navigation, Plus, RefreshCcw } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CustomOverlayMap, Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";

interface KaKaoMapContainerProps {
    unionData: UnionInfoProps[];
}

export default function KaKaoMap({ unionData }: KaKaoMapContainerProps) {
    const [kakaoReady, setKakaoReady] = useState(false);
    const [mapInstance, setMapInstance] = useState<kakao.maps.Map | null>(null);
    const [currentLevel, setCurrentLevel] = useState(11);

    const {
        unionSelectLocation,
        unionSelectSchool,
        setUnionSelectLocation,
        setUnionSelectSchool
    } = useUnionStaStore();

    // 💡 1. 순수 데이터 집계 (리액트가 화면을 그리기 위한 데이터 가공)
    const counts = useMemo(() => {
        const regionMap: Record<string, number> = {};
        const schoolMap: Record<string, number> = {};

        unionData.forEach((item) => {
            regionMap[item.location] = (regionMap[item.location] || 0) + 1;
            schoolMap[item.school_name] = (schoolMap[item.school_name] || 0) + 1;
        });

        // 🎯 [추가] 각 학교별로 '가장 가까운 다른 학교와의 거리'를 대략적으로 계산
        // 카카오맵 레벨별 기준: LV 9(약 500m 반경 묶임), LV 8(약 250m 반경 묶임)
        const getDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
            return Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lng1 - lng2, 2));
        };

        const nearbyThresholds: Record<string, number> = {};
        JNE_HIGH_SCHOOLS.forEach((s1) => {
            let minInterSchoolDist = Infinity;
            JNE_HIGH_SCHOOLS.forEach((s2) => {
                if (s1.id === s2.id) return;
                const dist = getDistance(s1.lat, s1.lng, s2.lat, s2.lng);
                if (dist < minInterSchoolDist) minInterSchoolDist = dist;
            });
            // 가장 가까운 학교와의 거리를 저장 (위경도 좌표 차이 기준)
            nearbyThresholds[s1.name] = minInterSchoolDist;
        });

        return { regionMap, schoolMap, nearbyThresholds };
    }, [unionData]);

    // 카카오 스크립트 로드 확인
    useEffect(() => {
        if (window.kakao && window.kakao.maps) {
            window.kakao.maps.load(() => {
                setKakaoReady(true);
            });
        }
    }, []);

    // 💡 2. 시·군 라벨 클릭 핸들러 (지도 인스턴스를 직접 조종)
    const handleRegionClick = useCallback((region: Region) => {
        if (!mapInstance) return;

        // 🚨 좌표 축 교정: 카카오맵은 LatLng(위도, 경도) 순서 ➡️ (region.y, region.x)
        const moveLatLon = new window.kakao.maps.LatLng(region.x, region.y);
        const targetLevel = region.id === "mokpo_si" ? 5 : 8;

        // 리액트 상태를 거치지 않고 지도 객체에 직접 명령 전달
        mapInstance.setLevel(targetLevel);
        mapInstance.panTo(moveLatLon);

        // 상단 인디케이터 텍스트 변경을 위한 전역 상태 업데이트
        setUnionSelectLocation(region.name);
    }, [mapInstance, setUnionSelectLocation]);

    // 💡 3. 초기화(리셋) 핸들러
    const handleReset = useCallback(() => {
        if (!mapInstance) return;

        const defaultLatLon = new window.kakao.maps.LatLng(34.506, 126.891);

        mapInstance.setLevel(11);
        mapInstance.panTo(defaultLatLon);

        setUnionSelectLocation("");
        setUnionSelectSchool("");
    }, [mapInstance, setUnionSelectLocation, setUnionSelectSchool]);

    // 💡 4. 고등학교 마커 클릭 핸들러
    const handleMarkerClick = (schoolName: string) => {
        const isSame = unionSelectSchool === schoolName;
        setUnionSelectSchool(isSame ? "" : schoolName);

        const targetSchool = JNE_HIGH_SCHOOLS.find((item) => item.name === schoolName);
        if (!isSame && targetSchool && mapInstance) {
            // const schoolLatLon = new window.kakao.maps.LatLng(targetSchool.lat, targetSchool.lng);

            // mapInstance.setLevel(7);
            // mapInstance.panTo(schoolLatLon);

            setUnionSelectLocation(targetSchool.city);
        } else if (isSame) {
            setUnionSelectLocation("");
        }
    };

    // 💡 5. 우측 플로팅 줌 컨트롤러 버튼 액션
    const handleZoomIn = () => {
        if (mapInstance) {
            mapInstance.setLevel(mapInstance.getLevel() - 1, { animate: true });
        }
    };

    const handleZoomOut = () => {
        if (mapInstance) {
            const nextLevel = mapInstance.getLevel() + 1;
            mapInstance.setLevel(nextLevel, { animate: true });

            if (nextLevel >= 11) {
                handleReset();
            }
        }
    };

    if (!kakaoReady) {
        return (
            <div className="w-full h-188 bg-slate-950 flex items-center justify-center text-cyan-400 font-medium">
                지도를 안전하게 불러오는 중입니다...
            </div>
        );
    }

    // const currentSelectedSchoolData = JNE_HIGH_SCHOOLS.find(s => s.name === unionSelectSchool);

    return (
        <div className="w-full flex flex-col items-center justify-center p-2 bg-slate-900 text-slate-100 h-180 rounded-2xl">
            <div className="mb-3 text-center">
                <h1 className="text-2xl font-bold text-cyan-400 mb-2">전라남도 고등학교 공동교육과정 개설 현황</h1>
                <p className="text-sm text-slate-400">
                    시·군 라벨을 클릭하거나 지도를 확대하시면 세부 학교 인프라 마커가 활성화됩니다.
                </p>
            </div>

            <div className="relative w-full max-w-300 h-187.5 rounded-2xl overflow-hidden border border-slate-750 shadow-2xl bg-slate-850">

                {/* 상단 왼쪽 전체보기 리셋 버튼 */}
                {unionSelectLocation && (
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleReset}
                        className="absolute top-6 left-6 z-50 shadow-md bg-slate-900/90 hover:bg-slate-800 text-slate-100 border-slate-700 gap-2 rounded-full px-4 animate-in fade-in slide-in-from-left-4"
                    >
                        <RefreshCcw size={14} className="text-cyan-400" />
                        <span className="font-semibold">전체보기</span>
                    </Button>
                )}

                {/* 상단 오른쪽 위치 인디케이터 배지 */}
                <div className="absolute top-6 right-6 z-50 flex flex-col items-end gap-2 pointer-events-none">
                    <Badge variant="outline" className="bg-slate-900/90 backdrop-blur-sm border-slate-700 text-slate-100 py-1.5 px-3 shadow-md flex gap-2">
                        <Navigation size={12} className="text-cyan-400" />
                        {unionSelectLocation || "전라남도 전체"}
                    </Badge>
                </div>

                {/* 우측 하단 플로팅 줌 컨트롤 컨트롤러 */}
                <div className="absolute bottom-6 right-6 z-50 flex flex-col gap-2 items-center">
                    <div className="bg-slate-950/90 text-cyan-400 text-[11px] font-black px-2 py-1 rounded-md shadow-md border border-slate-800 tracking-wider min-w-12 text-center">
                        LV {currentLevel}
                    </div>

                    <div className="flex flex-col gap-1.5 bg-slate-900/90 backdrop-blur-sm p-1.5 rounded-xl border border-slate-700 shadow-lg">
                        <button
                            onClick={handleZoomIn}
                            className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-300 hover:bg-slate-800 active:bg-slate-700 transition-colors"
                            title="확대"
                        >
                            <Plus size={18} />
                        </button>
                        <div className="w-full h-px bg-slate-700" />
                        <button
                            onClick={handleZoomOut}
                            className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-300 hover:bg-slate-800 active:bg-slate-700 transition-colors"
                            title="축소"
                        >
                            <Minus size={18} />
                        </button>
                        <div className="w-full h-px bg-slate-700" />
                        <button
                            onClick={handleReset}
                            className="flex items-center justify-center w-8 h-8 rounded-lg text-rose-400 hover:bg-rose-950/50 active:bg-rose-900 transition-colors"
                            title="초기화"
                        >
                            <RefreshCcw size={14} />
                        </button>
                    </div>
                </div>

                {/* 진짜 지도 코어 엔진 컴포넌트 */}
                <Map
                    // 💡 타입스크립트 필수 제약을 맞추기 위해 초기값만 리터럴로 선언합니다.
                    // 리액트 State가 아니므로, 리렌더링이 일어나도 스크롤 위치가 튕겨 나가지 않습니다.
                    center={{ lat: 34.506, lng: 126.891 }}
                    style={{ width: "100%", height: "100%" }}
                    level={11}
                    onCreate={(map) => setMapInstance(map)}
                    onZoomChanged={(map) => setCurrentLevel(map.getLevel())}
                >
                    {/* 시군 배지 레이어 (레벨 10 이상 원거리) */}
                    {currentLevel >= 10 &&
                        regions.map((region) => {
                            const regionCount = counts.regionMap[region.name] || 0;
                            return (
                                <CustomOverlayMap
                                    key={region.id}
                                    position={{ lat: region.x, lng: region.y }}
                                    clickable={true}
                                >
                                    <div
                                        onClick={() => handleRegionClick(region)}
                                        className="flex items-center justify-center bg-indigo-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-indigo-500/50 shadow-xl cursor-pointer transition-all hover:-translate-y-0.5 hover:bg-indigo-600 group select-none text-white"
                                    >
                                        <span className="text-sm font-bold tracking-tight text-indigo-200 group-hover:text-white">
                                            {region.name}
                                        </span>
                                        {regionCount > 0 && (
                                            <span className="ml-2 flex items-center justify-center bg-orange-500 text-white text-xs font-black w-5 h-5 rounded-full shadow-sm ring-1 ring-orange-400">
                                                {regionCount}
                                            </span>
                                        )}
                                    </div>
                                </CustomOverlayMap>
                            );
                        })}

                    {/* 세부 학교 레이어 (레벨 10 미만 근거리) */}
                    {currentLevel < 10 && (
                        <>
                            {/* 📍 A 구역: 순수한 마커들만 클러스터러에 담아서 카카오 엔진에게 전달 */}
                            <MarkerClusterer
                                averageCenter={true}
                                minLevel={1}
                                disableClickZoom={false}
                                styles={[{
                                    width: '46px',
                                    height: '46px',
                                    background: 'rgba(249, 115, 22, 0.95)',
                                    borderRadius: '50%',
                                    color: '#fff',
                                    textAlign: 'center',
                                    lineHeight: '46px',
                                    fontSize: '12px',
                                    fontWeight: 'black',
                                    border: '2px solid #fff',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)'
                                }]}
                            >
                                {JNE_HIGH_SCHOOLS.map((school) => {
                                    const schoolCount = counts.schoolMap[school.name] || 0;
                                    const isSelected = unionSelectSchool === school.name;
                                    const hasClasses = schoolCount > 0;

                                    let markerImageUrl = "https://t1.daumcdn.net/mapjsapi/images/2x/marker.png";
                                    if (isSelected) {
                                        markerImageUrl = "https://t1.daumcdn.net/localimg/localimages/07/2012/img/marker_p.png";
                                    } else if (hasClasses) {
                                        markerImageUrl = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
                                    }

                                    return (
                                        <MapMarker
                                            key={`marker-${school.id}`}
                                            position={{ lat: school.lat, lng: school.lng }}
                                            onClick={() => handleMarkerClick(school.name)}
                                            image={{
                                                src: markerImageUrl,
                                                size: { width: 24, height: 35 },
                                            }}
                                            opacity={!hasClasses && !isSelected ? 0.9 : 1.0}
                                        />
                                    );
                                })}
                            </MarkerClusterer>

                            {/* 🏷️ B 구역: 항상 노출될 학교 이름 라벨들은 클러스터러 외부에 따로 맵핑 */}
                            {JNE_HIGH_SCHOOLS.map((school) => {
                                const schoolCount = counts.schoolMap[school.name] || 0;
                                const isSelected = unionSelectSchool === school.name;
                                const hasClasses = schoolCount > 0;

                                // 🎯 줌 레벨에 따라 주변 학교와 겹쳐서 클러스터링되어 있을지 판별하는 마법의 공식
                                // 목포, 순천, 여수 등 시내 중심가 밀집 지역(좌표 차 0.015 미만)은 LV 7 이하에서만 라벨을 보여줍니다.
                                const closestDist = counts.nearbyThresholds[school.name] || 0;

                                let shouldShowLabel = true;
                                if (currentLevel === 9) {
                                    // 9레벨에서는 서로 아주 멀리 떨어진 외곽 학교(군 단위 농어촌 고교 등)만 라벨 표시
                                    shouldShowLabel = closestDist > 0.04;
                                } else if (currentLevel === 8) {
                                    // 8레벨에서는 적당히 떨어진 학교들까지 라벨 표시 (시내 중심가는 아직 클러스터 내부에 있으므로 숨김)
                                    shouldShowLabel = closestDist > 0.015;
                                }
                                // 7레벨 이하로 내려가면 클러스터가 완전히 해제되므로 모든 학교 라벨을 보여줍니다.
                                // 내가 클릭해서 선택한 학교는 레벨과 상관없이 무조건 라벨을 보여줍니다.
                                const finalVisibility = shouldShowLabel || isSelected;

                                if (!finalVisibility) return null; // 클러스터러에 묶여있을 대는 라벨을 그리지 않고 증발시킴!

                                return (
                                    <CustomOverlayMap
                                        key={`label-${school.id}`}
                                        position={{ lat: school.lat, lng: school.lng }}
                                        yAnchor={2.2}
                                    >
                                        <div
                                            onClick={() => handleMarkerClick(school.name)}
                                            className={cn(
                                                "px-2.5 py-1 rounded-md text-[13px] font-bold border whitespace-nowrap tracking-tight shadow-lg cursor-pointer transition-all select-none pointer-events-auto animate-in fade-in duration-200",
                                                isSelected
                                                    ? "bg-amber-500 border-amber-400 text-slate-950 scale-105 font-black"
                                                    : hasClasses
                                                        ? "bg-slate-900/95 border-slate-700 text-slate-100"
                                                        : "bg-slate-950/70 border-slate-800 text-slate-400 font-medium"
                                            )}
                                        >
                                            {school.name}
                                            {hasClasses && (
                                                <span className="ml-1 text-orange-400 font-black">({schoolCount})</span>
                                            )}
                                        </div>
                                    </CustomOverlayMap>
                                );
                            })}
                        </>
                    )}
                </Map>

                {/* 하단 세부 정보 노출 카드 */}
                {/* {unionSelectSchool && currentSelectedSchoolData && (
                    <div className="absolute bottom-6 left-6 z-20 w-80 bg-slate-900/95 border border-cyan-500/40 rounded-xl p-4 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <span className="text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-800 px-2 py-0.5 rounded font-bold">
                                    {currentSelectedSchoolData.city}
                                </span>
                                <h3 className="text-base font-bold text-white mt-1">{unionSelectSchool}</h3>
                            </div>
                            <button
                                onClick={() => setUnionSelectSchool("")}
                                className="text-slate-400 hover:text-white text-xs transition-colors"
                            >
                                닫기
                            </button>
                        </div>
                        <p className="text-xs text-slate-400 mb-3">
                            선택하신 고등학교에서 현재 개설 승인된 연계 수강 정보 총 {counts.schoolMap[unionSelectSchool] || 0}건이 매핑되었습니다.
                        </p>
                        <button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white text-xs py-2 rounded-lg font-semibold transition-colors shadow-md shadow-cyan-950">
                            학교 교육과정 네비게이션 이동
                        </button>
                    </div>
                )} */}
            </div>
        </div>
    );
}
import type { UnionInfoProps } from "@/api/supabaseAPI";
import { Badge, Button } from "@/components/ui";
import { JNE_HIGH_SCHOOLS, regions, type Region } from "@/data/Curri/mapConfig";
import { cn } from "@/lib/utils";
import { useUnionStaStore } from "@/store/UnionStaStore";
import { Minus, Navigation, Plus, RefreshCcw } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { CustomOverlayMap, Map, MapMarker, MarkerClusterer, useKakaoLoader } from "react-kakao-maps-sdk";

interface KaKaoMapContainerProps {
    unionData: UnionInfoProps[];
}

export default function KaKaoMap({ unionData }: KaKaoMapContainerProps) {
    const [mapInstance, setMapInstance] = useState<kakao.maps.Map | null>(null);
    const [currentLevel, setCurrentLevel] = useState(11);

    const {
        unionSelectLocation,
        unionSelectSchool,
        setUnionSelectLocation,
        setUnionSelectSchool
    } = useUnionStaStore();

    const [loading, error] = useKakaoLoader({
        appkey: "42a27bac0d221a5a88f6f3c88a09bd01", // 보낸주신 AppKey 매칭
        libraries: ["services", "clusterer"], // 사용할 라이브러리 지정
    });

    // 순수 데이터 집계
    const counts = useMemo(() => {
        const regionMap: Record<string, number> = {};
        const schoolMap: Record<string, number> = {};

        unionData.forEach((item) => {
            regionMap[item.location] = (regionMap[item.location] || 0) + 1;
            schoolMap[item.school_name] = (schoolMap[item.school_name] || 0) + 1;
        });

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
            nearbyThresholds[s1.name] = minInterSchoolDist;
        });

        return { regionMap, schoolMap, nearbyThresholds };
    }, [unionData]);

    // 카카오 스크립트 로드 확인
    // useEffect(() => {
    //     if (window.kakao && window.kakao.maps) {
    //         window.kakao.maps.load(() => {
    //             setKakaoReady(true);
    //         });
    //     }
    // }, []);

    // 💡 1. 줌 체인지 이벤트 핸들러 분리 및 보정
    // 코드로 레벨을 바꿀 때 발생하는 비동기 이벤트를 안전하게 처리합니다.
    const handleZoomChanged = (map: kakao.maps.Map) => {
        const level = map.getLevel();
        setCurrentLevel(level);

        // 사용자가 스크롤이나 드래그로 직접 11레벨 이상 멀어졌을 때도 자연스럽게 상태 리셋
        if (level >= 11 && (unionSelectLocation || unionSelectSchool)) {
            setUnionSelectLocation("");
            setUnionSelectSchool("");
        }
    };

    // 💡 2. 시·군 라벨 클릭 핸들러
    const handleRegionClick = useCallback((region: Region) => {
        if (!mapInstance) return;

        const moveLatLon = new window.kakao.maps.LatLng(region.x, region.y);
        const targetLevel = region.id === "mokpo_si" ? 5 : 8;

        mapInstance.setLevel(targetLevel);
        mapInstance.panTo(moveLatLon);
        setCurrentLevel(targetLevel); // 상태 즉시 동기화

        setUnionSelectLocation(region.name);
    }, [mapInstance, setUnionSelectLocation]);

    // 💡 3. 초기화(리셋) 핸들러 (애니메이션 제거 및 확실한 즉시 이동)
    const handleReset = useCallback(() => {
        if (!mapInstance) return;

        const defaultLatLon = new window.kakao.maps.LatLng(34.506, 126.891);

        // 🚨 중요: 상태를 먼저 11로 바꿔 조건부 렌더링으로 클러스터러를 리액트 트리에서 즉시 파괴합니다.
        setCurrentLevel(11);

        // 🚨 panTo(부드러운 이동) 대신 setCenter(즉시 이동)를 사용하여 
        // 카카오맵 내부 엔진이 이전 마커 그리기를 즉시 중단하도록 만듭니다.
        mapInstance.setLevel(11, { animate: false });
        mapInstance.setCenter(defaultLatLon);

        setUnionSelectLocation("");
        setUnionSelectSchool("");
    }, [mapInstance, setUnionSelectLocation, setUnionSelectSchool]);

    // 고등학교 마커 클릭 핸들러
    const handleMarkerClick = (schoolName: string) => {
        const isSame = unionSelectSchool === schoolName;
        setUnionSelectSchool(isSame ? "" : schoolName);

        const targetSchool = JNE_HIGH_SCHOOLS.find((item) => item.name === schoolName);
        if (!isSame && targetSchool && mapInstance) {
            setUnionSelectLocation(targetSchool.city);
        } else if (isSame) {
            setUnionSelectLocation("");
        }
    };

    // 우측 플로팅 줌 컨트롤러 버튼 액션
    const handleZoomIn = () => {
        if (mapInstance) {
            const nextLevel = mapInstance.getLevel() - 1;
            mapInstance.setLevel(nextLevel, { animate: true });
            setCurrentLevel(nextLevel);
        }
    };

    const handleZoomOut = () => {
        if (mapInstance) {
            const nextLevel = mapInstance.getLevel() + 1;
            if (nextLevel >= 11) {
                handleReset();
            } else {
                mapInstance.setLevel(nextLevel, { animate: true });
                setCurrentLevel(nextLevel);
            }
        }
    };

    // if (!kakaoReady) {
    //     return (
    //         <div className="w-full h-188 bg-slate-950 flex items-center justify-center text-cyan-400 font-medium">
    //             지도를 안전하게 불러오는 중입니다...
    //         </div>
    //     );
    // }

    if (loading) return <div className="flex items-center justify-center h-full text-slate-500">지도를 불러오는 중입니다...</div>;
    if (error) return <div className="text-red-500">지도 로드 중 오류가 발생했습니다.</div>;

    return (
        <div className="w-full flex flex-col items-center justify-center p-2 bg-slate-50/50 text-slate-800 h-180 rounded-2xl">
            {/* 상단 타이틀 헤더 영역 */}
            <div className="mb-4 text-center">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-1.5 flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                    전라남도 고등학교 공동교육과정 개설 현황
                </h1>
                <p className="text-sm text-slate-500 font-medium tracking-tight">
                    시·군 라벨을 클릭하거나 지도를 확대하시면 세부 학교 인프라 마커가 활성화됩니다.
                </p>
            </div>

            {/* 지도 메인 컨테이너 */}
            <div className="relative w-full max-w-300 h-187.5 rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    className="absolute top-6 left-6 z-50 shadow-md bg-white/90 backdrop-blur-sm hover:bg-slate-50 text-slate-700 border-slate-200 gap-2 rounded-full px-4 transition-all hover:scale-102"
                >
                    <RefreshCcw size={13} className="text-indigo-600" />
                    <span className="font-bold text-xs tracking-tight">전체보기</span>
                </Button>
                {/* [상단 왼쪽] 전체보기 리셋 버튼 */}
                {/* {unionSelectLocation && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleReset}
                        className="absolute top-6 left-6 z-50 shadow-md bg-white/90 backdrop-blur-sm hover:bg-slate-50 text-slate-700 border-slate-200 gap-2 rounded-full px-4 transition-all hover:scale-102"
                    >
                        <RefreshCcw size={13} className="text-indigo-600" />ㄸ
                        <span className="font-bold text-xs tracking-tight">전체보기</span>
                    </Button>
                )} */}

                {/* [상단 오른쪽] 위치 인디케이터 배지 */}
                <div className="absolute top-6 right-6 z-50 flex flex-col items-end gap-2 pointer-events-none">
                    <Badge className="bg-white/95 backdrop-blur-sm border border-slate-200 text-slate-800 font-bold py-1.5 px-3.5 shadow-md flex gap-2 rounded-full tracking-tight">
                        <Navigation size={12} className="text-indigo-600 fill-indigo-600/10" />
                        {unionSelectLocation || "전라남도 전체"}
                    </Badge>
                </div>

                {/* [우측 하단] 플로팅 줌 컨트롤 컨트롤러 */}
                <div className="absolute bottom-6 right-6 z-50 flex flex-col gap-2 items-center">
                    <div className="bg-slate-900 text-white text-[10px] font-black px-2.5 py-1 rounded-md shadow-md tracking-wider min-w-12 text-center">
                        LV {currentLevel}
                    </div>

                    <div className="flex flex-col gap-1 bg-white/95 backdrop-blur-sm p-1.5 rounded-xl border border-slate-200 shadow-lg">
                        <button
                            onClick={handleZoomIn}
                            className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 hover:bg-slate-100 active:bg-slate-200 transition-colors"
                            title="확대"
                        >
                            <Plus size={18} />
                        </button>
                        <div className="w-full h-px bg-slate-100" />
                        <button
                            onClick={handleZoomOut}
                            className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 hover:bg-slate-100 active:bg-slate-200 transition-colors"
                            title="축소"
                        >
                            <Minus size={18} />
                        </button>
                        <div className="w-full h-px bg-slate-100" />
                        <button
                            onClick={handleReset}
                            className="flex items-center justify-center w-8 h-8 rounded-lg text-rose-500 hover:bg-rose-50 active:bg-rose-100 transition-colors"
                            title="초기화"
                        >
                            <RefreshCcw size={13} />
                        </button>
                    </div>
                </div>

                {/* 진짜 지도 코어 엔진 컴포넌트 */}
                <Map
                    center={{ lat: 34.506, lng: 126.891 }}
                    style={{ width: "100%", height: "100%" }}
                    level={11}
                    onCreate={(map) => setMapInstance(map)}
                    onZoomChanged={handleZoomChanged}
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
                                        className="flex items-center justify-center bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200 shadow-lg cursor-pointer transition-all hover:-translate-y-0.5 hover:bg-indigo-600 hover:border-indigo-600 group select-none text-slate-800 hover:text-white"
                                    >
                                        <span className="text-xs font-extrabold tracking-tight text-slate-700 group-hover:text-white">
                                            {region.name}
                                        </span>
                                        {regionCount > 0 && (
                                            <span className="ml-2 flex items-center justify-center bg-indigo-600 text-white text-[10px] font-black min-w-5 h-5 px-1.5 rounded-full shadow-sm group-hover:bg-white group-hover:text-indigo-600 border border-indigo-500/20 group-hover:border-white transition-colors">
                                                {regionCount}
                                            </span>
                                        )}
                                    </div>
                                </CustomOverlayMap>
                            );
                        })}

                    {/* 세부 학교 레이어 (레벨 10 미만 근거리) */}
                    {currentLevel < 10 && mapInstance && mapInstance.getLevel() < 10 && (
                        <>
                            <MarkerClusterer
                                key={`clusterer-lvl-${currentLevel}-${unionSelectLocation}`}
                                averageCenter={true}
                                minLevel={1}
                                disableClickZoom={false}
                                styles={[{
                                    width: '46px',
                                    height: '46px',
                                    background: 'rgba(79, 70, 229, 0.95)',
                                    borderRadius: '50%',
                                    color: '#fff',
                                    textAlign: 'center',
                                    lineHeight: '46px',
                                    fontSize: '12px',
                                    fontWeight: '900',
                                    border: '2px solid #fff',
                                    boxShadow: '0 4px 14px rgba(79, 70, 229, 0.3)'
                                }]}
                            >
                                {JNE_HIGH_SCHOOLS.map((school) => {
                                    return (
                                        <MapMarker
                                            key={`hidden-marker-${school.id}`}
                                            position={{ lat: school.lat, lng: school.lng }}
                                            onClick={() => handleMarkerClick(school.name)}
                                            image={{
                                                src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
                                                size: { width: 1, height: 1 },
                                            }}
                                        />
                                    );
                                })}
                            </MarkerClusterer>

                            {JNE_HIGH_SCHOOLS.map((school) => {
                                const schoolCount = counts.schoolMap[school.name] || 0;
                                const isSelected = unionSelectSchool === school.name;
                                const hasClasses = schoolCount > 0;
                                const closestDist = counts.nearbyThresholds[school.name] || 0;

                                let shouldShowLabel = true;
                                if (currentLevel === 9) {
                                    shouldShowLabel = closestDist > 0.04;
                                } else if (currentLevel === 8) {
                                    shouldShowLabel = closestDist > 0.02;
                                }
                                const finalVisibility = shouldShowLabel || isSelected;

                                return (
                                    <CustomOverlayMap
                                        key={`combined-overlay-${school.id}`}
                                        position={{ lat: school.lat, lng: school.lng }}
                                        yAnchor={0.5}
                                        zIndex={isSelected ? 50 : hasClasses ? 20 : 10}
                                    >
                                        <div className="flex flex-col items-center justify-center select-none pointer-events-auto">

                                            {finalVisibility && (
                                                <div
                                                    onClick={() => handleMarkerClick(school.name)}
                                                    className={cn(
                                                        "mb-1.5 px-2.5 py-1 rounded-md text-sm font-bold border whitespace-nowrap tracking-tight shadow-md cursor-pointer transition-all",
                                                        isSelected
                                                            ? "bg-indigo-600 border-indigo-500 text-white scale-105 font-black shadow-lg shadow-indigo-200/50"
                                                            : hasClasses
                                                                ? "bg-white border-indigo-200 text-slate-800 font-extrabold shadow-lg shadow-indigo-950 ring-1 ring-slate-100"
                                                                : "bg-slate-50/70 border-slate-200 text-slate-400 font-medium"
                                                    )}
                                                >
                                                    {school.name}
                                                    {hasClasses && (
                                                        <span className={cn(
                                                            "ml-1 text-[12px] font-black",
                                                            isSelected ? "text-indigo-200" : "text-indigo-600"
                                                        )}>
                                                            ({schoolCount})
                                                        </span>
                                                    )}
                                                </div>
                                            )}

                                            {finalVisibility && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleMarkerClick(school.name)}
                                                    className={cn(
                                                        "relative flex items-center justify-center w-7 h-7 rounded-full border-2 shadow-md transition-all duration-200 cursor-pointer",
                                                        isSelected
                                                            ? "bg-indigo-600 border-white text-white scale-110 shadow-indigo-300 animate-bounce"
                                                            : hasClasses
                                                                ? "bg-amber-400 border-white text-gray-950 font-bold"
                                                                : "bg-white border-slate-300 text-slate-500 opacity-85 hover:opacity-100"
                                                    )}
                                                >
                                                    <span className="text-xs">
                                                        {isSelected ? '📍' : hasClasses ? '⭐' : '🏫'}
                                                    </span>

                                                    {isSelected && (
                                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-t-4 border-t-indigo-600 border-x-4 border-x-transparent" />
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                    </CustomOverlayMap>
                                );
                            })}
                        </>
                    )}

                    {/* {currentLevel < 10 && mapInstance && mapInstance.getLevel() < 10 && (
                        <>
                            <MarkerClusterer
                                key={`clusterer-lvl-${currentLevel}-${unionSelectLocation}`}
                                averageCenter={true}
                                minLevel={1}
                                disableClickZoom={false}
                                styles={[{
                                    width: '46px',
                                    height: '46px',
                                    background: 'rgba(79, 70, 229, 0.95)',
                                    borderRadius: '50%',
                                    color: '#fff',
                                    textAlign: 'center',
                                    lineHeight: '46px',
                                    fontSize: '12px',
                                    fontWeight: '900',
                                    border: '2px solid #fff',
                                    boxShadow: '0 4px 14px rgba(79, 70, 229, 0.3)'
                                }]}
                            >
                                {JNE_HIGH_SCHOOLS.map((school) => {
                                    const schoolCount = counts.schoolMap[school.name] || 0;
                                    const isSelected = unionSelectSchool === school.name;
                                    const hasClasses = schoolCount > 0;

                                    let markerImageUrl = "https://t1.daumcdn.net/mapjsapi/images/2x/marker.png";
                                    if (isSelected) {
                                        markerImageUrl = "https://t1.daumcdn.net/localimg/localimages/07/2012/img/marker_r.png";
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
                                            opacity={!hasClasses && !isSelected ? 0.8 : 1.0}
                                        />
                                    );
                                })}
                            </MarkerClusterer>

                            {JNE_HIGH_SCHOOLS.map((school) => {
                                const schoolCount = counts.schoolMap[school.name] || 0;
                                const isSelected = unionSelectSchool === school.name;
                                const hasClasses = schoolCount > 0;
                                const closestDist = counts.nearbyThresholds[school.name] || 0;

                                let shouldShowLabel = true;
                                if (currentLevel === 9) {
                                    shouldShowLabel = closestDist > 0.04;
                                } else if (currentLevel === 8) {
                                    shouldShowLabel = closestDist > 0.02;
                                }
                                const finalVisibility = shouldShowLabel || isSelected;

                                if (!finalVisibility) return null;

                                return (
                                    <CustomOverlayMap
                                        key={`label-${school.id}`}
                                        position={{ lat: school.lat, lng: school.lng }}
                                        yAnchor={2.2}
                                    >
                                        <div
                                            onClick={() => handleMarkerClick(school.name)}
                                            className={cn(
                                                "px-2.5 py-1 rounded-md text-sm font-bold border whitespace-nowrap tracking-tight shadow-md cursor-pointer transition-all select-none pointer-events-auto",
                                                isSelected
                                                    ? "bg-indigo-600 border-indigo-500 text-white scale-105 font-black shadow-lg shadow-indigo-200/50"
                                                    : hasClasses
                                                        ? "bg-white border-indigo-200 text-slate-800 font-extrabold shadow-lg shadow-indigo-950 ring-1 ring-slate-100"
                                                        : "bg-slate-50/70 border-slate-200 text-slate-400 font-medium"
                                            )}
                                        >
                                            {school.name}
                                            {hasClasses && (
                                                <span className={cn(
                                                    "ml-1 text-[12px] font-black",
                                                    isSelected ? "text-indigo-200" : "text-indigo-600"
                                                )}>
                                                    ({schoolCount})
                                                </span>
                                            )}
                                        </div>
                                    </CustomOverlayMap>
                                );
                            })}
                        </>
                    )} */}
                </Map>
            </div>
        </div>
    );
}

{/* 하단 세부 정보 노출 카드 */ }
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
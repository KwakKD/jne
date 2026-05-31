import type { UnionInfoProps } from "@/api/supabaseAPI";
import { TransformComponent, TransformWrapper, type ReactZoomPanPinchRef } from "react-zoom-pan-pinch"
import { useMemo, useRef, useState } from "react";
import { useUnionStaStore } from "@/store/UnionStaStore";
import { Badge, Button } from "@/components/ui";
import { Minus, Navigation, Plus, RefreshCcw } from "lucide-react";
import { regions, SCHOOL_LOCATION_DATA } from "@/data/Curri/mapConfig";
import { cn } from "@/lib/utils";
import UnionMap from "./UnionMap";
import { SchoolMarker } from "./SchoolMarker";

interface UnionMapContainerProps {
    unionData: UnionInfoProps[]
}

const ZOOM_STYLES: Record<string, { fontSize: number }> = {
    "목포시": { fontSize: 1.4 },
    default: { fontSize: 4.5 }
};

const UnionMapContainer = ({ unionData }: UnionMapContainerProps) => {
    const transformRef = useRef<ReactZoomPanPinchRef>(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const [currentScale, setCurrentScale] = useState(1);

    const {
        unionSelectLocation,
        unionSelectSchool,
        setUnionSelectLocation,
        setUnionSelectSchool
    } = useUnionStaStore();

    const counts = useMemo(() => {
        const regionMap: Record<string, number> = {};
        const schoolMap: Record<string, number> = {};

        unionData.forEach(item => {
            regionMap[item.location] = (regionMap[item.location] || 0) + 1;
            schoolMap[item.school_name] = (schoolMap[item.school_name] || 0) + 1;
        });
        return { regionMap, schoolMap };
    }, [unionData]);

    const handleRegionClick = (region: any) => {
        if (transformRef.current) {
            const zoomLevel = region.id === 'mokpo_si' ? 18 : (region.id === 'shinan_gun' ? 3 : 4.5);

            transformRef.current.zoomToElement(`label-${region.id}`, zoomLevel, 800);
            setIsZoomed(true);
            setUnionSelectLocation(region.name);
        }
    };

    const handleReset = () => {
        if (transformRef.current) {
            transformRef.current.resetTransform();
            setIsZoomed(false);
            setCurrentScale(1); // 💡 배율 상태 초기화
            setUnionSelectLocation('');
            setUnionSelectSchool('');
        }
    };

    const handleMarkerClick = (schoolName: string) => {
        setUnionSelectSchool(unionSelectSchool === schoolName ? '' : schoolName)
        const region = SCHOOL_LOCATION_DATA.find(item => item.name === schoolName)?.regionId ?? ''
        setUnionSelectLocation(unionSelectSchool === schoolName ? '' : region)
    }

    // 💡 개별 버튼 제어를 위한 핸들러
    const handleZoomIn = () => {
        if (transformRef.current) {
            transformRef.current.zoomIn(0.3); // 클릭 시 0.3 배율씩 확대
            setIsZoomed(true);
        }
    };

    const handleZoomOut = () => {
        if (transformRef.current) {
            transformRef.current.zoomOut(0.3); // 0.3 배율씩 축소

            // 💡 실시간으로 업데이트되는 리액트 상태(State) 변수를 활용해 안전하게 비교!
            if (currentScale <= 1.4) {
                handleReset(); // 1.3 배율 이하로 내려가면 전체 지도로 부드럽게 리셋
            }
        }
    };

    return (
        <div className="relative w-full h-150 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-inner">

            {/* [UI] 전체보기 버튼 */}
            {isZoomed && (
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleReset}
                    className="absolute top-6 left-6 z-50 shadow-md bg-white/90 backdrop-blur-sm border-slate-200 hover:bg-white gap-2 rounded-full px-4 animate-in fade-in slide-in-from-left-4"
                >
                    <RefreshCcw size={14} className="text-slate-500" />
                    <span className="font-semibold text-slate-700">전체보기</span>
                </Button>
            )}

            {/* [UI] 현재 위치 인디케이터 */}
            <div className="absolute top-6 right-6 z-50 flex flex-col items-end gap-2 pointer-events-none">
                <Badge variant="outline" className="bg-white/90 backdrop-blur-sm border-slate-200 text-slate-900 py-1.5 px-3 shadow-sm flex gap-2">
                    <Navigation size={12} className="text-indigo-500" />
                    {unionSelectLocation || "전라남도 전체"}
                </Badge>
            </div>

            {/* 💡 [UI] 우측 하단 플로팅 줌 컨트롤 버튼 */}
            <div className="absolute bottom-6 right-6 z-50 flex flex-col gap-2 items-center">

                {/* 배율 표시기 배지 */}
                <div className="bg-slate-900/90 text-white text-[11px] font-black px-2 py-1 rounded-md shadow-md backdrop-blur-sm tracking-wider animate-in fade-in zoom-in-95 min-w-[45px] text-center">
                    {currentScale.toFixed(1)}x
                </div>

                {/* 줌 버튼 그룹 */}
                <div className="flex flex-col gap-1.5 bg-white/90 backdrop-blur-sm p-1.5 rounded-xl border border-slate-200 shadow-lg">
                    <button
                        onClick={handleZoomIn}
                        className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 hover:bg-slate-100 active:bg-slate-200 transition-colors"
                        title="확대"
                    >
                        <Plus size={18} />
                    </button>
                    <div className="w-full h-[1px] bg-slate-200" />
                    <button
                        onClick={handleZoomOut}
                        className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 hover:bg-slate-100 active:bg-slate-200 transition-colors"
                        title="축소"
                    >
                        <Minus size={18} />
                    </button>
                    <div className="w-full h-[1px] bg-slate-200" />
                    <button
                        onClick={handleReset}
                        className="flex items-center justify-center w-8 h-8 rounded-lg text-rose-500 hover:bg-rose-50 active:bg-rose-100 transition-colors"
                        title="초기화"
                    >
                        <RefreshCcw size={14} />
                    </button>
                </div>
            </div>

            <TransformWrapper
                ref={transformRef}
                initialScale={1}
                centerOnInit={true}
                minScale={0.8}
                maxScale={22}
                // 💡 핵심: 마우스 휠을 통한 확대/축소를 완전히 방지합니다.
                wheel={{ disabled: true }}
                // 더블 클릭 확대도 방지하여 버튼으로만 온전히 제어하게 하려면 아래 속성도 해제 가능합니다.
                doubleClick={{ disabled: true }}
                onTransform={(ref) => {
                    // 라이브러리에 따라 ref 내부 구조가 다를 수 있으므로 
                    // 안전하게 ref.state?.scale 또는 ref.instance?.transformState?.scale 등을 받아옵니다.
                    const scale = ref.state?.scale || 1;
                    setCurrentScale(scale);
                }}
            >
                <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
                    <svg
                        width="1200" height="900" viewBox="0 0 1200 900"
                        fill="none" xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full bg-[#fffbfb] transition-all cursor-grab active:cursor-grabbing"
                        onContextMenu={(e) => e.preventDefault()}
                    >
                        {/* 지도 배경 레이어 */}
                        <g id="map-layer">
                            <UnionMap />
                        </g>
                        {/* 시군 지역 라벨 레이어 */}
                        <g
                            className={cn(
                                "transition-opacity duration-500",
                                // 💡 기존의 isZoomed 조건에 [currentScale >= 2] 조건을 추가합니다.
                                // 배율이 2배 이상이 되거나 이미 줌인 상태라면 라벨을 부드럽게 숨깁니다.
                                (currentScale >= 2) ? "opacity-0 pointer-events-none" : "opacity-100"
                            )}
                        >
                            {regions.map((region) => {
                                const regionCount = counts.regionMap[region.name] || 0;
                                return (
                                    <foreignObject
                                        key={region.id}
                                        id={`label-${region.id}`}
                                        x={region.x - 55}
                                        y={region.y - 20}
                                        width="110"
                                        height="40"
                                        className="overflow-visible"
                                    >
                                        <div
                                            onClick={() => handleRegionClick(region)}
                                            // 💡 디자인 변경: 배경을 투명한 밀크 인디고(bg-indigo-50/90)로 채워 흰 땅 위에서 확실히 보이게 만듭니다.
                                            className="flex items-center justify-center bg-indigo-300/30 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-indigo-200 shadow-md cursor-pointer transition-all hover:-translate-y-0.5 hover:bg-indigo-600 hover:border-indigo-700 group select-none"
                                        >
                                            {/* 글자색은 깊은 네이비 톤(text-indigo-950)으로 가독성 확보 */}
                                            <span className="text-[16px] font-bold tracking-tight text-indigo-950 group-hover:text-white transition-colors">
                                                {region.name}
                                            </span>

                                            {regionCount > 0 && (
                                                // 호버 시 배경이 진해지므로 링 컬러를 센스있게 대응
                                                <span className="ml-2 flex items-center justify-center bg-orange-500 text-white text-[16px] font-black w-7 h-7 rounded-full ring-1 ring-indigo-50/90 shadow-sm group-hover:ring-indigo-600 transition-all">
                                                    {regionCount}
                                                </span>
                                            )}
                                        </div>
                                    </foreignObject>
                                );
                            })}
                        </g>

                        {/* 학교 마커 레이어 */}
                        <g
                            className={cn(
                                "transition-opacity duration-400",
                                currentScale >= 2 ? "opacity-100" : "opacity-0 pointer-events-none"
                            )}
                            // 💡 하드웨어 가속유도 및 화면 밖 엘리먼트 렌더링 최적화 스타일 주입
                            style={{
                                transform: 'translateZ(0)',
                                willChange: 'opacity',
                                contentVisibility: 'auto' as any
                            }}
                        >
                            {SCHOOL_LOCATION_DATA
                                // .filter(school => school.regionId === unionSelectLocation)
                                .map((school) => {
                                    const schoolCount = counts.schoolMap[school.name] || 0;
                                    const config = ZOOM_STYLES[unionSelectLocation] || ZOOM_STYLES.default;
                                    const isSelected = unionSelectSchool === school.name;

                                    // 💡 [개선] 지도가 확대(2배 ~ 22배)됨에 따라 핀 마커가 화면을 다 가리지 않도록 
                                    // 현재 배율(currentScale)을 나누어 폰트 크기를 황금 비율로 역산 조절합니다.
                                    const dynamicFontSize = Math.max(1.2, config.fontSize / (currentScale * 0.25));

                                    return (
                                        <SchoolMarker
                                            key={school.id}
                                            school={school}
                                            schoolCount={schoolCount}
                                            isSelected={isSelected}
                                            dynamicFontSize={dynamicFontSize}
                                            onClick={() => handleMarkerClick(school.name)} // 💡 handleMarkerClick은 컴포넌트 상단에서 useCallback 처리 권장
                                        />
                                    );
                                })}
                        </g>
                    </svg>
                </TransformComponent>
            </TransformWrapper>
        </div>
    );
};

export { UnionMapContainer }
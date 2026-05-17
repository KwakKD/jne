import type { UnionInfoProps } from "@/api/supabaseAPI";
import { TransformComponent, TransformWrapper, type ReactZoomPanPinchRef } from "react-zoom-pan-pinch"
import { useMemo, useRef, useState } from "react";
import { useUnionStaStore } from "@/store/UnionStaStore";
import { Badge, Button } from "@/components/ui";
import { Navigation, RefreshCcw } from "lucide-react";
import { regions, SCHOOL_LOCATION_DATA } from "@/data/Curri/mapConfig";
import { cn } from "@/lib/utils";
import UnionMap from "./UnionMap";

interface UnionMapContainerProps {
    unionData: UnionInfoProps[]
}

const ZOOM_STYLES = {
    mokpo: {
        fontSize: 1.3,    // 18배 확대되므로 수치를 아주 작게
        badgeSize: 0.3,
        width: 15,
        padding: '1px 1px 0.5px',
        badgefontSize: 1.6,
        badgeheight: 2.2,
        badgepadding: '0.3px 1px 0.3px 1px',
        top: '-1.8px',
        right: '-1.5px',
        height: 1.2
    },
    default: {
        fontSize: 5,      // 3~5배 확대되므로 목포보다 크게
        badgeSize: 4,
        width: 59,
        padding: '2px 4px',
        badgefontSize: 5,
        badgeheight: 9,
        badgepadding: '0 3px',
        top: '-6px',
        right: '-5px',
        height: 7
    }
};

const UnionMapContainer = ({ unionData }: UnionMapContainerProps) => {
    const transformRef = useRef<ReactZoomPanPinchRef>(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const [_currentScale, setCurrentScale] = useState(1);
    const { unionSelectLocation, unionSelectSchool, setUnionSelectLocation, setUnionSelectSchool } = useUnionStaStore();

    // 지역별/학교별 카운트 계산 최적화
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
            const zoomLevel = region.id === 'mokpo_si' ? 18 : (region.id === 'shinan_gun' ? 4 : 5);
            transformRef.current.zoomToElement(`label-${region.id}`, zoomLevel, 800);
            setIsZoomed(true);
            setUnionSelectLocation(region.name);
        }
    };

    const handleReset = () => {
        if (transformRef.current) {
            transformRef.current.resetTransform();
            setIsZoomed(false);
            setUnionSelectLocation('');
            setUnionSelectSchool('');
        }
    };

    const getRegionSubjectsCount = (locationName: string) => {
        return unionData.filter(item => item.location === locationName).length
    }

    const handleMarkerClick = (schoolName: string) => {
        setUnionSelectSchool(unionSelectSchool === schoolName ? '' : schoolName)
    }

    return (
        <div className="relative w-full h-150 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-inner">

            {/* [UI] 전체보기 버튼 (Shadcn UI) */}
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

            {/* [UI] 현재 위치 인디케이터 (Breadcrumb 스타일) */}
            <div className="absolute top-6 right-6 z-50 flex flex-col items-end gap-2 pointer-events-none">
                <Badge variant="outline" className="bg-white/90 backdrop-blur-sm border-slate-200 text-slate-900 py-1.5 px-3 shadow-sm flex gap-2">
                    <Navigation size={12} className="text-indigo-500" />
                    {unionSelectLocation || "전라남도 전체"}
                </Badge>
            </div>

            <TransformWrapper
                ref={transformRef}
                onTransform={(ref) => setCurrentScale(ref.state.scale)}
                initialScale={1}
                centerOnInit={true}
                minScale={0.5}
                maxScale={20}
            >
                <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
                    <svg
                        width="1200" height="800" viewBox="0 0 1200 800"
                        fill="none" xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full bg-[#fffbfb] transition-all cursor-grab active:cursor-grabbing"
                        onContextMenu={(e) => e.preventDefault()}
                    >
                        {/* 지도 레이어 */}
                        <g id="map-layer">
                            <UnionMap />
                        </g>

                        {/* 시군 지역 라벨 레이어 */}
                        <g className={cn("transition-opacity duration-500", isZoomed ? "opacity-0 pointer-events-none" : "opacity-100")}>
                            {regions.map((region) => (
                                <foreignObject
                                    key={region.id}
                                    id={`label-${region.id}`}
                                    x={region.x - 50}
                                    y={region.y - 20}
                                    width="100"
                                    height="40"
                                    className="overflow-visible"
                                >
                                    <div
                                        onClick={() => handleRegionClick(region)}
                                        className="flex items-center justify-center bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-slate-200 shadow-sm cursor-pointer transition-all hover:-translate-y-0.5 hover:border-indigo-400 hover:text-indigo-600 group"
                                    >
                                        <span className="text-[13px] font-bold tracking-tight">{region.name}</span>
                                        {/* {(counts.regionMap[region.name] || 0) > 0 && ( */}
                                        {(counts.regionMap[region.name] || 0) > 0 && (
                                            <span className="ml-2 flex items-center justify-center bg-orange-500 text-white text-[10px] font-black w-5 h-5 rounded-full ring-2 ring-white shadow-sm group-hover:bg-indigo-500 transition-colors">
                                                {counts.regionMap[region.name]}
                                            </span>
                                        )}
                                    </div>
                                </foreignObject>
                            ))}
                        </g>

                        {/* 학교 마커 레이어 (확대 시 노출) */}
                        <g className={cn("transition-opacity duration-500", isZoomed ? "opacity-100" : "opacity-0 pointer-events-none")}>
                            {SCHOOL_LOCATION_DATA
                                .filter(school => school.regionId === unionSelectLocation)
                                .map((school) => {
                                    const count = counts.schoolMap[school.name] || 0;
                                    const isMokpo = unionSelectLocation === '목포시';
                                    const config = isMokpo ? ZOOM_STYLES.mokpo : ZOOM_STYLES.default;

                                    return (
                                        <foreignObject
                                            key={school.id}
                                            x={school.x - (config.width / 2)}
                                            y={school.y - config.height}
                                            width={config.width}
                                            height={config.height}
                                            className="overflow-visible"
                                        >
                                            <div
                                                onClick={() => handleMarkerClick(school.name)}
                                                className={cn(
                                                    "relative flex items-center justify-center bg-indigo-600 text-white rounded shadow-lg cursor-pointer hover:bg-indigo-700 transition-all active:scale-95",
                                                    unionSelectSchool === school.name && "ring-2 ring-white ring-offset-2 ring-offset-indigo-600"
                                                )}
                                                style={{
                                                    fontSize: `${config.fontSize}px`,
                                                    padding: `${config.padding}`,
                                                    height: `${config.height}px`
                                                }}
                                            >
                                                <span className="font-bold truncate">{school.name}</span>
                                                <span
                                                    className="absolute bg-white text-indigo-700 rounded-full flex items-center justify-center font-black shadow-sm"
                                                    style={{
                                                        fontSize: `${config.badgefontSize}px`,
                                                        width: `${config.badgeSize}px`,
                                                        height: `${config.badgeheight}px`,
                                                        top: `${config.top}`,
                                                        right: `${config.right}`,
                                                        padding: `${config.badgepadding}`
                                                    }}
                                                >{count}</span>
                                            </div>
                                        </foreignObject>
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
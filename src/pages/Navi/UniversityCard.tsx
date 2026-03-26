import { Badge } from "@/components/ui/badge"; // 설치된 UI 라이브러리에 맞게 수정

interface UniversityCardProps {
    item: {
        univName: string;
        majorName: string;
        type?: string; // 'core' | 'rec' | 'etc'
    };
}

const UniversityCard = ({ item }: UniversityCardProps) => {
  // 1. 타입별 스타일 및 텍스트 설정 로직
  const getStatusConfig = (type?: string) => {
    switch (type) {
      case "core":
        return {
          label: "핵심",
          container: "bg-rose-50/50 border-rose-300 hover:border-rose-200",
          badge: "bg-rose-500 text-white",
          bar: "bg-rose-400",
        };
      case "recommended":
        return {
          label: "권장",
          container: "bg-blue-50/50 border-blue-300 hover:border-blue-200",
          badge: "bg-blue-500 text-white",
          bar: "bg-blue-400",
        };
      default: // 'etc' 또는 데이터가 없을 때
        return {
          label: "기타/공통",
          container: "bg-slate-50/50 border-slate-300 hover:border-slate-200",
          badge: "bg-slate-500 text-white",
          bar: "bg-slate-400",
        };
    }
  };

  const config = getStatusConfig(item.type);

  return (
    <div
      className={`
        group relative p-4 rounded-xl border transition-all duration-200 hover:shadow-md
        ${config.container}
      `}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="font-bold text-slate-900 tracking-tight">
          {item.univName}
        </span>
        <Badge
          variant="secondary"
          className={`
            text-[12px] px-2 py-0 border-none whitespace-nowrap
            ${config.badge}
          `}
        >
          {config.label}
        </Badge>
      </div>

      <div className="text-sm text-slate-600 leading-snug line-clamp-2">
        {item.majorName}
      </div>

      {/* 하단 강조선 애니메이션 */}
      <div
        className={`
          absolute bottom-0 left-0 h-1 rounded-b-xl transition-all duration-300 group-hover:w-full w-0
          ${config.bar}
        `}
      />
    </div>
  );
};

export { UniversityCard };
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type ColorTheme = "purple" | "indigo" | "emerald" | "amber" | "rose" | "slate";

interface MenuCardProps {
    title: string;        // 메뉴 제목
    desc: string;         // 메뉴 상세 설명
    icon: ReactNode;      // Lucide 아이콘 등 리액트 컴포넌트
    color: ColorTheme;    // 정의된 색상 테마 중 하나
    path: string;         // 이동할 경로
}

const MenuCardWithDesc = ({ title, desc, icon, color, path }: MenuCardProps) => {
    const navigate = useNavigate();

    // 테마별 스타일 정의 (배경, 테두리, 그림자, 텍스트 색상)
    const themeConfigs: Record<ColorTheme, { card: string; iconBox: string; text: string }> = {
        purple: {
            card: "hover:border-purple-100 hover:shadow-purple-100/50",
            iconBox: "bg-purple-500 shadow-purple-100",
            text: "group-hover:text-purple-600"
        },
        indigo: {
            card: "hover:border-indigo-100 hover:shadow-indigo-100/50",
            iconBox: "bg-indigo-500 shadow-indigo-100",
            text: "group-hover:text-indigo-600"
        },
        emerald: {
            card: "hover:border-emerald-100 hover:shadow-emerald-100/50",
            iconBox: "bg-emerald-500 shadow-emerald-100",
            text: "group-hover:text-emerald-600"
        },
        amber: {
            card: "hover:border-amber-100 hover:shadow-amber-100/50",
            iconBox: "bg-amber-500 shadow-amber-100",
            text: "group-hover:text-amber-600"
        },
        rose: {
            card: "hover:border-rose-100 hover:shadow-rose-100/50",
            iconBox: "bg-rose-500 shadow-rose-100",
            text: "group-hover:text-rose-600"
        },
        slate: {
            card: "hover:border-slate-100 hover:shadow-slate-100/50",
            iconBox: "bg-slate-500 shadow-slate-100",
            text: "group-hover:text-slate-600"
        }
    };

    const theme = themeConfigs[color];

    return (
        <div
            className={`
                group relative flex items-center gap-6 p-5 
                rounded-[2rem] transition-all bg-transparent 
                hover:bg-white border border-transparent 
                cursor-pointer hover:shadow-2xl ${theme.card}
            `}
            onClick={() => navigate(path)}
        >
            {/* 아이콘 박스 */}
            <div className={`
                flex-shrink-0 w-14 h-14 text-white rounded-2xl 
                flex items-center justify-center shadow-lg 
                transition-transform group-hover:scale-110 ${theme.iconBox}
            `}>
                {icon}
            </div>

            {/* 텍스트 영역 */}
            <div className="flex-1">
                <h4 className={`text-lg font-bold text-slate-900 transition-colors ${theme.text}`}>
                    {title}
                </h4>
                <p className="text-sm text-slate-500 mt-1 leading-snug break-keep">
                    {desc}
                </p>
            </div>

            {/* 화살표 아이콘 */}
            <ArrowRight
                className={`text-slate-300 transition-all group-hover:translate-x-1 ${theme.text}`}
                size={20}
            />
        </div>
    );
};

export { MenuCardWithDesc };
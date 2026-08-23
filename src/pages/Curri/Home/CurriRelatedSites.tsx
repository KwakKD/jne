import { ArrowUpRight, Globe2 } from "lucide-react"
import { useState } from "react"

interface RelatedSite {
    title: string
    url: string
    desc?: string
}

function CurriRelatedSites() {
    const relatedSites = [
        { title: "전남광주통합특별시교육청", desc: "교육청 홈페이지(학교교육과정)", url: "https://www.jge.go.kr/sse/na/ntt/selectNttList.do?mi=785&bbsId=378&searchCate3=4" },
        { title: "고교학점제 종합포털", desc: "온라인 공동교육과정 수강신청", url: "https://hscredit.jge.go.kr" },
        { title: "에듀넷(티클리어)", desc: "교육과정 관련 자료 안내", url: "https://www.edunet.net/main" },
        { title: "학교알리미", desc: "교육정보 공시 서비스", url: "https://www.schoolinfo.go.kr" },
        { title: "대입정보포털 (adiga)", desc: "대입정보포털, 대학입학안내", url: "https://www.adiga.kr" },
        { title: "커리어넷 진로정보", desc: "진로 관련 안내 사이트", url: "https://www.career.go.kr" },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {relatedSites.map((site, idx) => (
                <SiteCard key={idx} site={site} />
            ))}
        </div>
    )
}

function SiteCard({ site }: { site: RelatedSite }) {
    const [imgError, setImgError] = useState(false)

    // 안전하게 도메인 추출
    const getDomain = (url: string) => {
        try {
            return new URL(url).hostname
        } catch {
            return ""
        }
    }

    const domain = getDomain(site.url)
    // sz=64로 설정하여 고해상도 모니터에서도 선명하게 표시 (메모리 사용량 매우 적음)
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`

    return (
        <a
            href={site.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 p-3 bg-white border border-slate-200/80 rounded-2xl hover:border-amber-300 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 group"
        >
            {/* 아이콘 컨테이너 */}
            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 p-1.5 flex items-center justify-center shrink-0 group-hover:bg-amber-50/50 transition-colors">
                {!imgError ? (
                    <img
                        src={faviconUrl}
                        alt=""
                        loading="lazy" // 뷰포트 접근 시 로딩하여 메모리 절약
                        onError={() => setImgError(true)} // 로드 실패 시 파비콘 대신 기본 아이콘으로 대체
                        className="w-9 h-9 object-contain"
                    />
                ) : (
                    <Globe2 className="w-4 h-4 text-slate-400" />
                )}
            </div>

            {/* 텍스트 컨테이너 */}
            <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                    <p className="font-bold text-xs sm:text-sm text-slate-700 group-hover:text-amber-600 truncate transition-colors">
                        {site.title}
                    </p>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-slate-400 group-hover:text-amber-500 transition-colors" />
                </div>
                {site.desc && (
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {site.desc}
                    </p>
                )}
            </div>
        </a>
    )
}

export { CurriRelatedSites }
import { ArrowUpRight, Globe2 } from "lucide-react"
import { useState } from "react"

interface RelatedSite {
    title: string
    url: string
    desc?: string
}

function RelatedSites({ relatedSites }: { relatedSites: RelatedSite[] }) {
    return (
        <section className="bg-slate-100/60 border-t border-slate-200/60 py-10">
            <div className="container mx-auto px-6 space-y-4">
                <div className="flex items-center gap-2">
                    <Globe2 className="w-4 h-4 text-slate-400" />
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        관련 사이트 바로가기
                    </h4>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {relatedSites.map((site, idx) => (
                        <SiteCard key={idx} site={site} />
                    ))}
                </div>
            </div>
        </section>
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

export { RelatedSites }
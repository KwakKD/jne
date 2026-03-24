import { Badge, Separator } from "@/components/ui";
import type { SubjectDetail } from "@/type/nav";
import {Briefcase, FileText, GraduationCap } from "lucide-react";

interface Props {
    selectedSubject: SubjectDetail
}

export function NavSubjectDetail({ selectedSubject }: Props) {
    return (
        <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                {/* 상세 헤더 */}
                <div className="bg-slate-900 p-8 text-white">
                    {/* 배지 컨테이너: 배지들을 그룹화하고 하단 여백 부여 */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        {/* 1. 과목 유형: 부드러운 하늘색 */}
                        <Badge className="bg-sky-500/20 text-sky-300 border border-sky-500/30 hover:bg-sky-500/20 px-2.5 py-0.5 shadow-sm">
                            {selectedSubject.subjectType}
                        </Badge>

                        {/* 2. 성취도: 산뜻한 에메랄드색 */}
                        <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20 px-2.5 py-0.5 shadow-sm">
                            성취도 {selectedSubject.achievement}
                        </Badge>

                        {/* 3. 등급: 신뢰감을 주는 인디고(보라)색 */}
                        {selectedSubject.rank !== '-' && (
                            <Badge className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/20 px-2.5 py-0.5 shadow-sm">
                                석차 {selectedSubject.rank}
                            </Badge>
                        )}

                        {/* 4. 수능출제: 시인성이 가장 높은 노란색(Amber) */}
                        {selectedSubject.suneung !== '-' && (
                            <Badge className="bg-amber-500 text-slate-950 border-none font-black px-2.5 py-0.5 hover:bg-amber-600 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                                수능출제
                            </Badge>
                        )}
                    </div>

                    <h2 className="text-4xl font-bold mb-3 tracking-tight">{selectedSubject.subjectName}</h2>
                    <p className="text-slate-400 font-medium">학점 범위: <span className="text-slate-200">{selectedSubject.credits}학점</span></p>
                </div>

                {/* 상세 본문 */}
                <div className="p-8 space-y-12">
                    {/* 1. 과목 요약 및 추천 타겟 (Alert 스타일 활용) */}
                    <section className="space-y-6">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-slate-900">
                                <FileText className="text-blue-600" size={20} />
                                <h3 className="text-xl font-bold">과목 상세 개요</h3>
                            </div>
                            <p className="text-slate-600 leading-relaxed text-lg bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                                {selectedSubject.subjectInfo}
                            </p>
                        </div>

                        {/* 추천 타겟: shadcn Alert 스타일 느낌의 카드 */}
                        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 flex gap-4 items-start">
                            <div className="bg-emerald-500 p-2 rounded-xl shrink-0">
                                <GraduationCap className="text-white" size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-emerald-900 mb-1">이런 학생에게 추천해요!</h4>
                                <p className="text-emerald-800/80 text-sm leading-relaxed">
                                    {selectedSubject.recommand}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* <Separator className="bg-slate-100" /> */}
                    <Separator className="bg-slate-100 "/>

                    {/* 2. 학습 내용 (Accordion 또는 깔끔한 리스트 카드) */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 px-1">
                                <div className="w-1 h-5 bg-blue-500 rounded-full" />
                                <h4 className="font-bold text-slate-800">핵심 아이디어</h4>
                            </div>
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                {selectedSubject.coreIdea.split('\n').map((line, i) => (
                                    <div key={i} className="px-5 py-4 border-b border-slate-50 last:border-none flex gap-3 items-start hover:bg-slate-50 transition-colors">
                                        <span className="text-blue-500 font-bold text-xs mt-1">Q{i + 1}</span>
                                        <span className="text-sm text-slate-600 font-medium leading-snug">{line}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2 px-1">
                                <div className="w-1 h-5 bg-indigo-500 rounded-full" />
                                <h4 className="font-bold text-slate-800">지식 · 이해</h4>
                            </div>
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                {selectedSubject.knowledge.split('\n').map((line, i) => (
                                    <div key={i} className="px-5 py-4 border-b border-slate-50 last:border-none flex gap-3 items-start hover:bg-slate-50 transition-colors">
                                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                                        <span className="text-sm text-slate-600 leading-snug">{line}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* 3. 진로 로드맵 (산뜻한 화이트 & 스카이블루 스타일) */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* 관련 학과 및 계열 */}
                        <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 bg-slate-100 rounded-2xl">
                                    <GraduationCap className="text-slate-600" size={22} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 leading-none mb-1">관련 학과 및 계열</h3>
                                    <p className="text-xs text-slate-400">Academic Pathways</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {selectedSubject.relatedDept.split(',').map((dept, i) => (
                                    <span
                                        key={i}
                                        className="px-4 py-2 bg-slate-50 text-slate-600 rounded-full text-sm font-medium border border-slate-100 hover:border-slate-300 hover:bg-white transition-all cursor-default"
                                    >
                                        {dept.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* 추천 직업군 */}
                        <div className="bg-sky-50/30 rounded-[2.5rem] border border-sky-100 p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 bg-sky-50 rounded-2xl border border-sky-100">
                                    <Briefcase className="text-sky-600" size={22} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-sky-900 leading-none mb-1">추천 직업군</h3>
                                    <p className="text-xs text-sky-400">Future Careers</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {selectedSubject.relatedJob.split(',').map((job, i) => (
                                    <span
                                        key={i}
                                        className="px-4 py-2 bg-white text-sky-700 rounded-full text-sm font-bold border border-sky-200 shadow-sm shadow-sky-100 hover:scale-105 transition-transform cursor-default"
                                    >
                                        # {job.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
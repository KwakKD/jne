import { useState } from "react";
import { Plus, Search, Trash2, Pin, AlertCircle, FileText, Loader2, Edit2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteAdminNotice, fetchAdminNotice, upsertAdminNotice } from "@/api/supabaseAPI";
import { NoticeModal, type NoticeItem } from "./NoticeModal";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, Badge, Button, Input, Switch, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
function AdminNotice() {
    const queryClient = useQueryClient();
    const { data: user } = useAuth();

    // 1. 데이터 조회
    const { data: dbNoticeData = [], isLoading, isError, error } = useQuery<NoticeItem[]>({
        queryKey: ["notice"],
        queryFn: fetchAdminNotice,
        staleTime: 1000 * 60 * 30,
    });

    // 2. 게시 상태(disable) 변경 Mutation
    const toggleDisableMutation = useMutation({
        mutationFn: (notice: NoticeItem) =>
            upsertAdminNotice(
                { ...notice, disable: !notice.disable }, // 기존 NoticeItem 정보 유지하며 disable만 반전
                user?.id ?? ''
            ),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notice"] });
        },
        onError: (err: Error) => {
            alert(`상태 변경 실패: ${err.message}`);
        },
    });

    // 3. 삭제 Mutation
    const deleteMutation = useMutation({
        mutationFn: deleteAdminNotice,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notice"] });
            setDeletingItem(null);
        },
        onError: (err: Error) => {
            alert(`삭제 실패: ${err.message}`);
        },
    });

    // UI 및 모달 상태 관리
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("전체");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNotice, setEditingNotice] = useState<NoticeItem | null>(null);
    const [deletingItem, setDeletingItem] = useState<{ id: number; title: string } | null>(null);

    const handleOpenCreateModal = () => {
        setEditingNotice(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (notice: NoticeItem) => {
        setEditingNotice(notice);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (deletingItem) {
            deleteMutation.mutate(deletingItem.id);
        }
    };

    // disable 토글 핸들러
    const handleToggleDisable = (notice: NoticeItem) => {
        toggleDisableMutation.mutate(notice);
    };

    // 필터링 목록
    const filteredNotices = dbNoticeData.filter((item) => {
        const matchesSearch =
            item.title.includes(searchTerm) || (item.content && item.content.includes(searchTerm));
        const matchesCategory =
            selectedCategory === "전체" || item.path === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="w-full min-h-screen bg-slate-50/50 p-6 lg:p-10 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                        <FileText className="text-orange-500" size={26} />
                        공지사항 관리
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        전라남도교육청 고등학교 교육과정 안내 공지사항을 관리합니다.
                    </p>
                </div>

                <Button onClick={handleOpenCreateModal} className="bg-orange-500 hover:bg-orange-600 gap-2">
                    <Plus size={18} />
                    새 공지 작성
                </Button>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    {["전체", "nav", "curri"].map((cat) => (
                        <Button
                            key={cat}
                            variant={selectedCategory === cat ? "default" : "secondary"}
                            size="sm"
                            onClick={() => setSelectedCategory(cat)}
                            className="text-xs font-bold"
                        >
                            {cat}
                        </Button>
                    ))}
                </div>

                <div className="relative w-full md:w-72">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <Input
                        type="text"
                        placeholder="제목 또는 내용 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 h-10 bg-slate-50/50 border-slate-200"
                    />
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead className="w-16 text-center font-bold">연번</TableHead>
                            <TableHead className="w-24 font-bold">분류</TableHead>
                            <TableHead className="w-56 font-bold">제목</TableHead>
                            <TableHead className="font-bold">내용</TableHead>
                            <TableHead className="w-20 text-center font-bold">중요</TableHead>

                            {/* 🔥 게시 여부 조작 열 추가 */}
                            <TableHead className="w-28 text-center font-bold">게시 상태</TableHead>

                            <TableHead className="w-28 text-center font-bold">작성날짜</TableHead>
                            <TableHead className="w-28 text-center font-bold">관리</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {/* 1. 로딩 상태 (colSpan=8) */}
                        {isLoading && (
                            <TableRow>
                                <TableCell colSpan={8} className="h-48 text-center text-slate-400">
                                    <Loader2 size={28} className="animate-spin mx-auto mb-2 text-orange-500" />
                                    데이터를 불러오는 중입니다...
                                </TableCell>
                            </TableRow>
                        )}

                        {/* 2. 에러 상태 (colSpan=8) */}
                        {isError && (
                            <TableRow>
                                <TableCell colSpan={8} className="h-48 text-center text-rose-500">
                                    <AlertCircle size={32} className="mx-auto mb-2" />
                                    불러오기 오류: {error?.message}
                                </TableCell>
                            </TableRow>
                        )}

                        {/* 3. 데이터 목록 */}
                        {!isLoading && !isError && filteredNotices.length > 0 && (
                            filteredNotices.map((notice, idx) => (
                                <TableRow
                                    key={notice.id ?? idx}
                                    className={notice.important ? "bg-orange-50/40 hover:bg-orange-50/60" : ""}
                                >
                                    <TableCell className="text-center font-medium">{idx + 1}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                notice.type === "공지"
                                                    ? "default"
                                                    : notice.type === "행사"
                                                        ? "secondary"
                                                        : "outline"
                                            }
                                        >
                                            {notice.type || "공지"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="max-w-50">
                                        <div className="font-semibold text-slate-800 line-clamp-1 truncate" title={notice.title}>
                                            {notice.title}
                                        </div>
                                    </TableCell>

                                    <TableCell className="max-w-md">
                                        <div className="text-slate-600 line-clamp-1 truncate" title={notice.content}>
                                            {notice.content}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {notice.important ? (
                                            <span className="inline-flex p-1.5 rounded-lg bg-orange-100 text-orange-500">
                                                <Pin size={16} className="fill-orange-500" />
                                            </span>
                                        ) : (
                                            <span className="text-slate-300">-</span>
                                        )}
                                    </TableCell>

                                    {/* 🔥 게시 상태 토글 셀 */}
                                    <TableCell className="text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <Switch
                                                checked={notice.disable}
                                                onCheckedChange={() => handleToggleDisable(notice)}
                                                disabled={toggleDisableMutation.isPending}
                                            />
                                            <span className={`text-xs font-semibold ${notice.disable ? "text-emerald-600" : "text-slate-400"}`}>
                                                {notice.disable ? "게시 중" : "미게시"}
                                            </span>
                                        </div>
                                    </TableCell>

                                    <TableCell className="text-center text-xs text-slate-500 font-mono">
                                        {notice.created_at
                                            ? new Date(notice.created_at).toLocaleDateString("ko-KR", {
                                                year: "numeric",
                                                month: "2-digit",
                                                day: "2-digit",
                                            }).replace(/\. /g, ".").slice(0, -1)
                                            : "-"}
                                    </TableCell>

                                    <TableCell className="text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleOpenEditModal(notice)}
                                                className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                                            >
                                                <Edit2 size={16} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => notice.id && setDeletingItem({ id: notice.id, title: notice.title })}
                                                className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}

                        {/* 4. 빈 목록 상태 (colSpan=8) */}
                        {!isLoading && !isError && filteredNotices.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={8} className="h-48 text-center text-slate-400">
                                    <AlertCircle size={32} className="mx-auto mb-2 text-slate-300" />
                                    등록되었거나 검색된 공지사항이 없습니다.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* 공지 생성 / 수정 모달 */}
            <NoticeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialData={editingNotice}
            />

            {/* 삭제 확인 AlertDialog */}
            <AlertDialog open={!!deletingItem} onOpenChange={(open) => !open && setDeletingItem(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>공지사항 삭제 확인</AlertDialogTitle>
                        <AlertDialogDescription>
                            &quot;{deletingItem?.title}&quot; 공지사항을 정말로 삭제하시겠습니까? 이 작업은 취소할 수 없습니다.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>취소</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirmDelete}
                            disabled={deleteMutation.isPending}
                            className="bg-rose-600 hover:bg-rose-700 text-white"
                        >
                            {deleteMutation.isPending ? "삭제 중..." : "삭제하기"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export { AdminNotice };
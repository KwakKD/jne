// components/NoticeModal.tsx
import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Checkbox, Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { upsertAdminNotice, type NoticeProps } from "@/api/supabaseAPI";

export interface NoticeItem {
    id?: number;
    created_at?: string
    title: string;
    content: string;
    type: string;
    path: string;
    important: boolean;
    disable?: boolean
}

interface NoticeModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData: NoticeItem | null;
}

export function NoticeModal({ isOpen, onClose, initialData }: NoticeModalProps) {
    const { data: user } = useAuth();
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState<NoticeItem>({
        title: "",
        content: "",
        type: "공지",
        path: "nav",
        important: false,
        disable: true
    });

    const upsertMutation = useMutation({
        mutationFn: (data: NoticeProps) => {
            if (!user?.id) {
                throw new Error("로그인 정보가 없습니다.");
            }
            return upsertAdminNotice(data, user.id);
        },
        onSuccess: () => {
            // 캐시 무효화로 목록 새로고침
            queryClient.invalidateQueries({ queryKey: ["notice"] });
            onClose();
        },
        onError: (err: Error) => {
            alert(`저장 실패: ${err.message}`);
        },
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                title: "",
                content: "",
                type: "공지",
                path: "nav",
                important: false,
                disable: true
            });
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        upsertMutation.mutate(formData);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{initialData ? "공지사항 수정" : "새 공지사항 작성"}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-2">
                    {/* 경로(path) 및 유형(type) 선택 필드 */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* 1. 경로 선택 (path) */}
                        <div className="space-y-1.5">
                            <Label htmlFor="path">게시 위치 (경로)</Label>
                            <Select
                                value={formData.path || "nav"}
                                onValueChange={(value) => setFormData({ ...formData, path: value })}
                            >
                                <SelectTrigger id="path" className="w-full">
                                    <SelectValue placeholder="경로 선택" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="nav">과목선택 (nav)</SelectItem>
                                    <SelectItem value="curri">교육과정 (curri)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* 2. 유형 선택 (type) */}
                        <div className="space-y-1.5">
                            <Label htmlFor="type">공지 유형</Label>
                            <Select
                                value={formData.type || "공지"}
                                onValueChange={(value) => setFormData({ ...formData, type: value })}
                            >
                                <SelectTrigger id="type" className="w-full">
                                    <SelectValue placeholder="유형 선택" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="공지">공지</SelectItem>
                                    <SelectItem value="행사">행사</SelectItem>
                                    <SelectItem value="업데이트">업데이트</SelectItem>
                                    <SelectItem value="제출">제출</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* 제목 */}
                    <div className="space-y-1.5">
                        <Label htmlFor="title">제목</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="공지 제목을 입력하세요"
                            required
                        />
                    </div>

                    {/* 내용 */}
                    <div className="space-y-1.5">
                        <Label htmlFor="content">내용</Label>
                        <Textarea
                            id="content"
                            rows={5}
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            placeholder="공지 내용을 입력하세요"
                            required
                        />
                    </div>

                    {/* 상단 고정 여부 */}
                    <div className="flex items-center space-x-2 pt-2">
                        <Checkbox
                            id="important"
                            checked={formData.important}
                            onCheckedChange={(checked) =>
                                setFormData({ ...formData, important: Boolean(checked) })
                            }
                        />
                        <Label htmlFor="important" className="cursor-pointer text-sm font-medium">
                            중요 공지
                        </Label>
                    </div>

                    {/* 하단 버튼 */}
                    <DialogFooter className="pt-4">
                        <Button type="button" variant="outline" onClick={onClose}>
                            취소
                        </Button>
                        <Button
                            type="submit"
                            disabled={upsertMutation.isPending}
                            className="bg-orange-500 hover:bg-orange-600"
                        >
                            {upsertMutation.isPending ? "저장 중..." : "저장"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui";
import { Layers, Settings2 } from "lucide-react";
import { useState } from "react";

interface GroupManagementDialogProps {
    year: string;
}

export const GroupManageDialog = ({ year }: GroupManagementDialogProps) => {
    const [open, setOpen] = useState(false);

    const handleSave = () => {
        // TODO: 그룹 저장 로직 수행
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-indigo-600 text-white px-4 text-xs hover:bg-indigo-500 gap-1.5 shadow-sm">
                    <Settings2 className="w-3.5 h-3.5" />
                    그룹관리
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-slate-800">
                        <Layers className="w-5 h-5 text-indigo-600" />
                        교육과정 선택그룹 관리 ({year}학년도)
                    </DialogTitle>
                    <DialogDescription>
                        그룹에서 과목을 관리, 복사, 학점을 조정할 수 있습니다.
                    </DialogDescription>
                </DialogHeader>

                {/* 모달 내부 내용 영역 */}
                <div className="py-4 space-y-3 max-h-[60vh] overflow-y-auto px-1">
                    <div className="p-4 border border-dashed rounded-xl bg-slate-50 text-sm text-slate-500 text-center">
                        업데이트 예정입니다.
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                    >
                        취소
                    </Button>
                    <Button
                        className="bg-indigo-600 hover:bg-indigo-500 text-white"
                        onClick={handleSave}
                    >
                        저장하기
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
import { Button, Dialog, DialogContent, DialogDescription,  DialogHeader, DialogTitle, DialogTrigger, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { Layers, Settings2 } from "lucide-react";
import { useState } from "react";
import { GroupPaste } from "./GroupManage/GroupPaste";
import { GroupControl } from "./GroupManage/GroupControl";
import { GroupChoice } from "./GroupManage/GroupChoice";

interface GroupManagementDialogProps {
    year: string;
}

export const GroupManage = ({ year }: GroupManagementDialogProps) => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-indigo-600 text-white px-4 text-xs hover:bg-indigo-500 gap-1.5 shadow-sm">
                    <Settings2 className="w-3.5 h-3.5" />
                    그룹관리
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-280 w-full h-[85vh] flex flex-col p-3 bg-white">
                <DialogHeader className="flex-shrink-0">
                    <DialogTitle className="flex items-center gap-2 text-slate-800">
                        <Layers className="w-5 h-5 text-indigo-600" />
                        교육과정 선택그룹 관리 ({year}학년도)
                    </DialogTitle>
                    <DialogDescription>
                        그룹에서 과목을 관리, 복사, 학점을 조정할 수 있습니다.
                    </DialogDescription>
                </DialogHeader>

                {/* 모달 내부 컨텐츠 영역 (유연한 스크롤 영역) */}
                <div className="flex-1 overflow-y-auto my-4 min-h-0">
                    <Tabs defaultValue="method" className="h-full flex flex-col">
                        <div className="flex justify-center pb-4 flex-shrink-0">
                            <TabsList className="grid w-full max-w-lg grid-cols-3 h-11 bg-slate-100 p-1 rounded-xl">
                                <TabsTrigger value="method" className="rounded-lg font-bold data-[state=active]:shadow-sm">
                                    그룹 복사
                                </TabsTrigger>
                                <TabsTrigger value="simulator" className="rounded-lg font-bold data-[state=active]:shadow-sm">
                                    그룹 학점 관리
                                </TabsTrigger>
                                <TabsTrigger value="choice" className="rounded-lg font-bold data-[state=active]:shadow-sm">
                                    그룹 선택(n) 관리
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <div className="flex-1 overflow-y-auto bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                            <TabsContent value="method" className="m-0 focus-visible:outline-none">
                                <GroupPaste year={year} />
                            </TabsContent>

                            <TabsContent value="simulator" className="m-0 focus-visible:outline-none">
                                <GroupControl year={year} />
                            </TabsContent>

                            <TabsContent value="choice" className="m-0 focus-visible:outline-none">
                                <GroupChoice year={year} />
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </DialogContent>
        </Dialog>
    );
};
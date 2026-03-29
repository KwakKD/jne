import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardList } from "lucide-react";
import { GradeMethodTable } from "./GradeMethodTable";
import { GradeSimulatorContent } from "./GradeSimulatorContent";
import type { ReactNode } from "react";

export function HomeGradeMethodDialog({ children }: { children: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="!max-w-[1100px] !w-[95vw] h-[88vh] flex flex-col p-0 overflow-hidden rounded-3xl border-none shadow-2xl">

        <DialogHeader className="px-8 pt-8 bg-white shrink-0">
          <DialogTitle className="text-3xl font-black flex items-center gap-3 text-slate-950">
            <div className="p-3 bg-rose-600 rounded-2xl text-white shadow-lg shadow-rose-100">
              <ClipboardList size={28} />
            </div>
            내신 평가 체계 및 5등급제 안내
          </DialogTitle>
          <DialogDescription className="text-base text-slate-500 mt-2">
            2022 개정 교육과정 확정안에 따른 과목별 성적 산출 방식과 등급별 인원을 확인하세요.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="method" className="flex-1 flex flex-col overflow-hidden ">
          <div className="px-8 pb-4">
            <TabsList className="grid w-full max-w-md grid-cols-2 h-12 bg-slate-100 p-1 rounded-xl">
              <TabsTrigger value="method" className="rounded-lg font-bold data-[state=active]:shadow-md">성적 산출 방식</TabsTrigger>
              <TabsTrigger value="simulator" className="rounded-lg font-bold data-[state=active]:shadow-md">5등급 인원 시뮬레이터</TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-auto bg-slate-50/50 p-8 pt-2">
            <TabsContent value="method" className="m-0 focus-visible:outline-none">
              <GradeMethodTable />
            </TabsContent>

            <TabsContent value="simulator" className="m-0 focus-visible:outline-none">
              <GradeSimulatorContent />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
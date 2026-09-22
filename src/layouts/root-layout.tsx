import { Outlet } from "react-router";

import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { currentUser } from "@/lib/mock-data";

export default function RootLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="flex min-h-screen flex-col">
        <header className="flex h-14 w-full items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-4" />
            <span className="text-sm font-medium">ระบบลงทะเบียนเรียน</span>
          </div>
          <ModeToggle />
        </header>

        <main className="flex-1 w-full p-6 md:p-8">
          <div className="mx-auto max-w-4xl w-full">
            <Outlet />
          </div>
        </main>

        <footer className="w-full border-t py-4 text-center text-xs text-muted-foreground">
          จัดทำโดย {currentUser.name} รหัสนักศึกษา {currentUser.studentId}
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}

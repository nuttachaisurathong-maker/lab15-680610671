import { BookOpen, Home } from "lucide-react";
import { Link, useLocation } from "react-router";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { currentUser } from "@/lib/mock-data";

const items = [
  { title: "หน้าแรก", url: "/", icon: Home },
  { title: "ลงทะเบียนเรียน", url: "/enrollment", icon: BookOpen },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-2 py-1 text-sm font-semibold">CPE & ISNE</div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>เมนูหลัก</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={location.pathname === item.url}
                    render={<Link to={item.url} />}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <div className="flex items-center gap-3 px-1 py-1">
          <Avatar className="h-9 w-9 border">
            <AvatarImage src={currentUser.avatar} alt={currentUser.nickname} />
            <AvatarFallback>
              {currentUser.nickname
                ? currentUser.nickname.slice(0, 2).toUpperCase()
                : "U"}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col items-start gap-1 overflow-hidden">
            <span className="text-sm font-medium leading-none truncate">
              {currentUser.nickname}
            </span>
            <Badge
              variant="outline"
              className="px-1.5 py-0 text-[10px] font-semibold uppercase"
            >
              {currentUser.role}
            </Badge>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

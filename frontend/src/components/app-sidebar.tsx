import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"
import { Link, useNavigate } from "react-router"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Menu",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
        },
        {
          title: "Users",
          url: "/users",
        },
        {
          title: "Posts",
          url: "/posts",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();
  return (
    <Sidebar {...props} className="border-r border-border/50">
      <SidebarContent className="p-4">
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent className="mt-4">
              <SidebarMenu className="gap-2">
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="hover:bg-accent/50 transition-colors">
                      <Link to={item.url} className="font-medium">
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter className="p-4 border-t border-border/50">
        <Button 
          variant="secondary" 
          className="w-full justify-start gap-2 hover:bg-destructive/10 hover:text-destructive transition-colors"
          onClick={() =>{
            localStorage.clear();
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}

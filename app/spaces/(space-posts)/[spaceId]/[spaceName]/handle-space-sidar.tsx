"use client";

import { ClientSpaceSidebar } from "@/features/space-sidebar/components/client-space-sidebar";
import { SidebarCollapse } from "@/features/space-sidebar/components/sidebar-collapse";

export function HandleSpaceSidebar() {
  return (
    <SidebarCollapse>
      <ClientSpaceSidebar />
    </SidebarCollapse>
  );
}

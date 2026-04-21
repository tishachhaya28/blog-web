import React from 'react'
import { UserList } from './UserList'
import { SidebarProvider } from './ui/sidebar'
import { AppSidebar } from './app-sidebar'
import { Blog7 } from './blog7'

function User() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <UserList />
    </SidebarProvider>
  )
}

export default User
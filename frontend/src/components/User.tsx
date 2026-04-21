import { UserList } from './UserList'
import { SidebarProvider } from './ui/sidebar'
import { AppSidebar } from './app-sidebar'

function User() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <UserList />
    </SidebarProvider>
  )
}

export default User
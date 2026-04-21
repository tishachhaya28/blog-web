import { SidebarProvider } from './ui/sidebar'
import { AppSidebar } from './app-sidebar'
import { Blog7 } from './blog7'

function Posts() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <Blog7 />
    </SidebarProvider>
  )
}

export default Posts
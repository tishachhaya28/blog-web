import { AppSidebar } from './app-sidebar'
import { SidebarProvider } from './ui/sidebar'

function Dashboard() {
  return (
    <>
        <SidebarProvider>
            <h1>HEY</h1>
            <AppSidebar />
        </SidebarProvider>
    </>
  )
}

export default Dashboard
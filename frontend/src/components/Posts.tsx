import { SidebarProvider } from './ui/sidebar'
import { AppSidebar } from './app-sidebar'
import { Blog7 } from './blog7'
import Ads from './Ads'

function Posts() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="flex flex-col lg:flex-row gap-8 p-6 lg:p-10 max-w-[1600px] mx-auto">
          <div className="flex-1 min-w-0">
            <Ads type="banner" />
            <Blog7 />
            <Ads type="footer" />
          </div>
          <aside className="hidden lg:block w-64 shrink-0">
            <Ads type="side" />
          </aside>
        </div>
      </main>
    </SidebarProvider>
  )
}

export default Posts
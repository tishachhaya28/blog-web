import { SidebarProvider } from './ui/sidebar'
import { AppSidebar } from './app-sidebar'
import { Blog7 } from './blog7'
import Ads from './Ads'

function Posts() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background overflow-x-hidden">
        <AppSidebar />
        <main className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 p-4 lg:p-8">
            <div className="max-w-6xl mx-auto space-y-8">
              <Ads type="banner" />
              
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 min-w-0">
                  <Blog7 className="py-0" />
                </div>
                
                <aside className="hidden xl:block w-72 shrink-0">
                  <div className="sticky top-8">
                    <Ads type="side" />
                  </div>
                </aside>
              </div>

              <Ads type="footer" />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Posts
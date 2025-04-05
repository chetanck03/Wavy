import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarFooter,
  useSidebar
} from "@/components/ui/sidebar";
import { Sun, Gauge, Settings, CloudSun, Lightbulb, ThermometerSun } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const DashboardSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { isMobile, openMobile, setOpenMobile } = useSidebar();
  
  // When a menu item is clicked on mobile, close the sidebar
  const handleMenuClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };
  
  return (
    <Sidebar variant={isMobile ? "floating" : "sidebar"} collapsible={isMobile ? "offcanvas" : "none"}>
      <SidebarHeader className="py-6">
        <div className="flex items-center gap-2 px-4">
          <Sun className="h-8 w-8 text-solar-yellow animate-spin-slow" />
          <div>
            <h1 className="text-xl font-bold">आदित्य</h1>
            <p className="text-xs text-muted-foreground">Optimizer</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="gap-3" isActive={currentPath === "/"} onClick={handleMenuClick}>
                  <Link to="/">
                    <Gauge className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="gap-3" isActive={currentPath === "/monitoring"} onClick={handleMenuClick}>
                  <Link to="/monitoring">
                    <CloudSun className="h-5 w-5" />
                    <span>Monitoring</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="gap-3" isActive={currentPath === "/maintenance"} onClick={handleMenuClick}>
                  <Link to="/maintenance">
                    <ThermometerSun className="h-5 w-5" />
                    <span>Maintenance</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="gap-3" isActive={currentPath === "/microgrid"} onClick={handleMenuClick}>
                  <Link to="/microgrid">
                    <Lightbulb className="h-5 w-5" />
                    <span>Microgrid</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="gap-3" isActive={currentPath === "/settings"} onClick={handleMenuClick}>
                  <Link to="/settings">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="py-4">
        <div className="px-4 text-xs text-muted-foreground">
          <p>आदित्य Optimizer v1.0</p>
          <p>© 2025 आदित्य</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;

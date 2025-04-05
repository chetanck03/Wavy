import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider, SignIn, SignUp } from "@clerk/clerk-react";
import Index from "./pages/Index";
import Monitoring from "./pages/Monitoring";
import Maintenance from "./pages/Maintenance";
import Microgrid from "./pages/Microgrid";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import DashboardHeader from "./components/DashboardHeader";
import DashboardSidebar from "./components/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import RequireAuth from "./components/RequireAuth";

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const clerkAppearance = {
  elements: {
    rootBox: "flex items-center justify-center min-h-screen bg-white w-full",
    header: "text-slate-900",
    socialButtonsBlockButton: "text-slate-900",
    formButtonPrimary: "bg-blue-500 hover:bg-blue-600 text-white",
    footerActionLink: "text-blue-500 hover:text-blue-600",
    formFieldInput: "border-slate-200 focus:border-blue-500 focus:ring-blue-500",
    pageScrollBox: "bg-white",
    card: "bg-white shadow-none",
    headerTitle: "text-slate-900",
    headerSubtitle: "text-slate-600",
    dividerLine: "bg-slate-200",
    dividerText: "text-slate-600",
    formFieldLabel: "text-slate-700",
    formFieldHintText: "text-slate-600",
    formFieldInputShowPasswordButton: "text-slate-600",
    footerActionText: "text-slate-600",
    identityPreviewText: "text-slate-600",
    formResendCodeLink: "text-blue-500 hover:text-blue-600",
    alert: "bg-white border-slate-200 text-slate-900",
    alertText: "text-slate-600",
    avatarBox: "bg-white",
    modalBackdrop: "bg-white/80",
    modalContent: "bg-white",
  },
  layout: {
    socialButtonsPlacement: "bottom" as const,
    socialButtonsVariant: "blockButton" as const,
    privacyPageUrl: "https://clerk.com/privacy",
    termsPageUrl: "https://clerk.com/terms",
    shimmer: false
  }
};

const App = () => (
  <React.StrictMode>
    <ClerkProvider 
      publishableKey={CLERK_PUBLISHABLE_KEY}
      appearance={clerkAppearance}
    >
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route 
                path="/sign-in/*" 
                element={
                  <div className="min-h-screen bg-white flex items-center justify-center w-full">
                    <SignIn routing="path" path="/sign-in" />
                  </div>
                }
              />
              <Route 
                path="/sign-up/*" 
                element={
                  <div className="min-h-screen bg-white flex items-center justify-center w-full">
                    <SignUp routing="path" path="/sign-up" />
                  </div>
                }
              />
              <Route path="/" element={
                <RequireAuth>
                  <SidebarProvider>
                    <div className="flex flex-col md:flex-row h-screen w-full">
                      <DashboardSidebar />
                      <div className="flex flex-col flex-1 min-h-0">
                        <DashboardHeader />
                        <div className="flex-1 overflow-auto">
                          <Index />
                        </div>
                      </div>
                    </div>
                  </SidebarProvider>
                </RequireAuth>
              } />
              <Route path="/monitoring" element={
                <RequireAuth>
                  <SidebarProvider>
                    <div className="flex flex-col md:flex-row h-screen w-full">
                      <DashboardSidebar />
                      <div className="flex flex-col flex-1 min-h-0">
                        <DashboardHeader />
                        <div className="flex-1 overflow-auto">
                          <Monitoring />
                        </div>
                      </div>
                    </div>
                  </SidebarProvider>
                </RequireAuth>
              } />
              <Route path="/maintenance" element={
                <RequireAuth>
                  <SidebarProvider>
                    <div className="flex flex-col md:flex-row h-screen w-full">
                      <DashboardSidebar />
                      <div className="flex flex-col flex-1 min-h-0">
                        <DashboardHeader />
                        <div className="flex-1 overflow-auto">
                          <Maintenance />
                        </div>
                      </div>
                    </div>
                  </SidebarProvider>
                </RequireAuth>
              } />
              <Route path="/microgrid" element={
                <RequireAuth>
                  <SidebarProvider>
                    <div className="flex flex-col md:flex-row h-screen w-full">
                      <DashboardSidebar />
                      <div className="flex flex-col flex-1 min-h-0">
                        <DashboardHeader />
                        <div className="flex-1 overflow-auto">
                          <Microgrid />
                        </div>
                      </div>
                    </div>
                  </SidebarProvider>
                </RequireAuth>
              } />
              <Route path="/settings" element={
                <RequireAuth>
                  <SidebarProvider>
                    <div className="flex flex-col md:flex-row h-screen w-full">
                      <DashboardSidebar />
                      <div className="flex flex-col flex-1 min-h-0">
                        <DashboardHeader />
                        <div className="flex-1 overflow-auto">
                          <Settings />
                        </div>
                      </div>
                    </div>
                  </SidebarProvider>
                </RequireAuth>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ClerkProvider>
  </React.StrictMode>
);

export default App;

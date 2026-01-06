'use client'

import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import Sidebar from "../components/layout/Sidebar";
import SearchBar from "../components/layout/SearchBar";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store} >
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <SidebarWrapper />
        <main className="w-screen flex-1 overflow-y-auto md:ml-56 transition duration-300">
          <SearchBar />
          {children}
          </main>
      </div>
    </SidebarProvider>
    </Provider>
  );
}

function SidebarWrapper() {
  const { open, closeSidebar } = useSidebar();

  return (
    <>
      <Sidebar open={open} onClose={closeSidebar} />

      {/* Overlay */}
      <div
        onClick={closeSidebar}
        className={`fixed inset-0 bg-black/40 z-30 md:hidden transition-opacity
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />
    </>
  )}
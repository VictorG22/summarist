"use client";

import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import Sidebar from "../components/layout/Sidebar";
import SearchBar from "../components/layout/SearchBar";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { useParams, usePathname } from "next/navigation";
import AudioPlayer from "../components/player/AudioPlayer";
import { useGetBookByIdQuery } from "@/services/books";
import { TextSizeProvider } from "../context/TextSizeContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AppLayoutInner>{children}</AppLayoutInner>
    </Provider>
  );
}

function AppLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPlayerPage = pathname.startsWith("/player/");

  const params = useParams();
  const bookId = Array.isArray(params.id) ? params.id[0] : (params.id ?? "");

  const { data, isLoading } = useGetBookByIdQuery(bookId, {
    skip: !isPlayerPage || !bookId,
  });

  return (
    <TextSizeProvider>
      <SidebarProvider>
        <div className="flex h-screen overflow-hidden">
          <SidebarWrapper />

          <main
            className={`flex-1 overflow-y-auto md:ml-56 transition ${
              isPlayerPage ? "pb-20" : ""
            }`}
          >
            <SearchBar />
            {children}
          </main>

          {isPlayerPage && (
            <div className="fixed bottom-0 left-0 w-screen z-50">
              {isLoading ? (
                <div className="p-4">Loading…</div>
              ) : (
                data && <AudioPlayer data={data} />
              )}
            </div>
          )}
        </div>
      </SidebarProvider>
    </TextSizeProvider>
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
  );
}

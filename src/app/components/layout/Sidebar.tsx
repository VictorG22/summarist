"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BiBookmark,
  BiHelpCircle,
  BiHome,
  BiLogOut,
  BiSearch,
} from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import Image from "next/image";
import { BsHighlighter } from "react-icons/bs";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  const topLinks = [
    {
      disabled: false,
      href: "/for-you",
      label: "For you",
      icon: <BiHome className="w-full h-full" />,
    },
    {
      disabled: false,
      href: "/library",
      label: "My Library",
      icon: <BiBookmark className="w-full h-full" />,
    },
    {
      disabled: true,
      href: "",
      label: "Highlights",
      icon: <BsHighlighter className="w-full h-full" />,
    },
    {
      disabled: true,
      href: "",
      label: "Search",
      icon: <BiSearch className="w-full h-full" />,
    },
  ];

  const bottomLinks = [
    {
      disabled: false,
      href: "/settings",
      label: "Settings",
      icon: <CiSettings className="w-full h-full" />,
    },
    {
      disabled: true,
      href: "",
      label: "Help & Support",
      icon: <BiHelpCircle className="w-full h-full" />,
    },
    {
      disabled: false,
      href: "/logout",
      label: "Logout",
      icon: <BiLogOut className="w-full h-full" />,
    },
  ];

  return (
<aside
  className={`
    bg-[#f7faf9] border-r border-gray-200
    w-56
    fixed inset-y-0 left-0
    flex flex-col
    transition-transform duration-300 ease-in-out
    z-40
    ${open ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
  `}
>
  {/* Logo — never scrolls */}
  <div className="flex items-center justify-center py-5 shrink-0">
    <Image
      src="/logo.png"
      alt="logo"
      width={160}
      height={40}
      className="h-10 w-auto"
    />
  </div>

  {/* Nav — scroll container */}
  <nav className="flex-1 overflow-y-auto">
    {/* This wrapper allows separation until overflow */}
    <div className="flex flex-col min-h-full">
      
      {/* Top links */}
      <div>
        {topLinks.map((link) => {
          const isActive = pathname === link.href;

          if (link.disabled) {
            return (
              <div
                key={link.label}
                className="flex items-center h-14 text-[#032b41] cursor-not-allowed"
              >
                <div className="w-1.5 h-full mr-4 rounded-r-sm bg-transparent" />
                <div className="w-6 h-6 mr-2">{link.icon}</div>
                <span className="text-lg">{link.label}</span>
              </div>
            );
          }

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="flex items-center h-14 text-[#032b41] hover:bg-[#e6f7f9]"
            >
              <div
                className={`w-1.5 h-full mr-4 rounded-r-sm ${
                  isActive ? "bg-[#2bd97c]" : "bg-transparent"
                }`}
              />
              <div
                className={`w-6 h-6 mr-2 ${
                  isActive ? "text-[#2bd97c]" : "text-[#032b41]"
                }`}
              >
                {link.icon}
              </div>
              <span className="text-lg">{link.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Bottom links — pushed down unless overflow */}
      <div className="mt-auto mb-4">
        {bottomLinks.map((link) => {
          const isActive = pathname === link.href;

          if (link.disabled) {
            return (
              <div
                key={link.href}
                className="flex items-center h-14 text-[#032b41] cursor-not-allowed"
              >
                <div className="w-1.5 h-full mr-4 rounded-r-sm bg-transparent" />
                <div className="w-6 h-6 mr-2">{link.icon}</div>
                <span className="text-lg">{link.label}</span>
              </div>
            );
          }

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="flex items-center h-14 text-[#032b41] hover:bg-[#e6f7f9]"
            >
              <div
                className={`w-1.5 h-full mr-4 rounded-r-sm ${
                  isActive ? "bg-[#2bd97c]" : "bg-transparent"
                }`}
              />
              <div
                className={`w-6 h-6 mr-2 ${
                  isActive ? "text-[#2bd97c]" : "text-[#032b41]"
                }`}
              >
                {link.icon}
              </div>
              <span className="text-lg">{link.label}</span>
            </Link>
          );
        })}
      </div>

    </div>
  </nav>
</aside>

  );
}

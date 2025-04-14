"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { IoBarChartSharp } from "react-icons/io5";
import { useSession } from "next-auth/react";

export default function TabBar() {
  const pathname = usePathname();
  const { status } = useSession();

  if (!pathname || status === "loading") return null;

  if (
    pathname.includes("login") ||
    pathname.includes("signup") ||
    pathname.includes("auth")
  ) {
    return null;
  }

  const tabs = [
    { href: "/", label: "Home", icon: <AiFillHome size={24} /> },
    {
      href: "/quickvest",
      label: "QuickVest",
      icon: <IoBarChartSharp size={22} />,
    },
    { href: "/invites", label: "Invites", icon: <FiUsers size={22} /> },
    { href: "/profile", label: "Profile", icon: <CgProfile size={22} /> },
  ];

  return (
    <nav className="fixed bottom-5 left-0 right-0 z-50 rounded-full border-t border-gray-200 shadow-sm px-6 p-2 py-2 flex justify-between items-center max-w-2xl mx-auto">
      {tabs.map((tab) => {
        const isActive =
          tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex flex-col items-center text-xs mt-1 transition-all ${
              isActive
                ? "text-green-600 font-semibold"
                : "text-gray-600 hover:text-green-500"
            }`}>
            {tab.icon}
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

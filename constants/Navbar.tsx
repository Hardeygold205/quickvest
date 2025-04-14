"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MdForwardToInbox } from "react-icons/md";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { useSession } from "next-auth/react";
import SignOutButton from "@/constants/SignOutButton";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <div className="navbar bg-base-300 shadow-md rounded-b-xl px-2">
      <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
        <Link
          href="/"
          className="relative inline-flex items-center w-fit after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-gradient-to-r after:from-transparent after:via-green-500 after:to-green-500 after:transition-all after:duration-300 duration-300 hover:after:via-green-700 hover:after:to-green-700">
          <Image
            src="/QuickVest.png"
            alt="Logo"
            width={50}
            height={50}
            className="inline-block"
          />
          <span className="font-extrabold text-md lg:text-2xl ml-1">
            QuickVest
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          {status !== "authenticated" && (
            <Link
              href="/login"
              className="btn bg-green-700 hover:scale-95 transition-all duration-300 border border-[#e5e5e5] text-white">
              <svg
                aria-label="Email icon"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="white">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              Login <span className="hidden md:flex">with Email</span>
            </Link>
          )}

          {status === "authenticated" && session?.user && (
            <>
              <div className="dropdown dropdown-end relative">
                <div
                  tabIndex={0}
                  role="button"
                  className="avatar indicator hover:scale-95 transition-all duration-300 cursor-pointer">
                  <span className="indicator-item badge badge-xs bg-green-600 border-none"></span>
                  <div className="w-10 h-10 rounded-lg overflow-hidden">
                    <Image
                      className="w-full h-full object-cover"
                      width={40}
                      height={40}
                      alt="user avatar"
                      src={session.user.image || "/user_avatar.webp"}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[999] menu bg-base-100 rounded-box w-44 p-2 shadow-md mt-2">
                  <li>
                    <Link href="/profile">Go to Profile</Link>
                  </li>
                  <li>
                    <SignOutButton />
                  </li>
                </ul>
              </div>
              <div className="indicator cursor-pointer">
                <span className="indicator-item badge-xs rounded-xl bg-green-600 text-[0.35em] border-none">
                  12
                </span>
                <MdForwardToInbox className="text-2xl" />
              </div>
            </>
          )}

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              className="cursor-pointer text-xl hover:text-green-600 transition-all">
              <HiOutlineGlobeAlt />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

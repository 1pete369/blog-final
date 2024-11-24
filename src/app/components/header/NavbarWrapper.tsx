"use client"

import React, { useState } from "react"
import Navbar from "./Navbar"
import { useUserContext } from "@/app/context/UserDataProviderContext"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import Image from "next/image"
import Link from "next/link"
import ToggleTheme from "../theme/Toggle-theme"

export default function NavbarWrapper() {
  const { user } = useUserContext()
  const [isMenuOpen, setIsMenuOpen] = useState(false) // State for handling mobile menu
  const { handleLogout } = useUserContext()

  return (
    <header className="top-0 z-40 sticky bg-light-navbarBg dark:bg-dark-navbarBg py-4 p-4">
      {/* Header left */}
      <div className="flex justify-between items-center mx-auto container">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle mobile menu
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="font-bold text-2xl">My Blog</div>
          <ToggleTheme />
        </div>
        <Navbar isMenuOpen={isMenuOpen} />
        {user !== null && (
          <Popover>
            <PopoverTrigger>
              <Image
                src={user.personalInfo.photoURL}
                alt="user"
                width={30}
                height={30}
                className="shadow-lg rounded-full"
              />
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-2 bg-light-bodyBg dark:bg-dark-bodyBg mr-2">
              <p>{user.personalInfo.email}</p>
              <p>{user.personalInfo.displayName}</p>
              <div className="flex justify-between">
                <button
                  onClick={handleLogout}
                  className="bg-blue-600 hover:bg-blue-500 px-5 py-1.5 rounded-lg text-white"
                >
                  Sign Out
                </button>
                {user.personalInfo.email ===
                  process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
                  <Link
                    href={"/admin/create-blog"}
                    className="bg-emerald-600 hover:bg-emerald-600 px-5 py-1.5 rounded-lg text-white"
                  >
                    Create blog
                  </Link>
                )}
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </header>
  )
}

"use client"

import React, { useState } from "react"
import Navbar from "./Navbar"
import { useUserContext } from "@/app/context/UserDataProviderContext"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { CircleUser, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ToggleTheme from "../theme/Toggle-theme"

export default function NavbarWrapper() {
  const { user } = useUserContext()
  const [isMenuOpen, setIsMenuOpen] = useState(false) // State for handling mobile menu
  const { handleLogout } = useUserContext()

  return (
    <header className="sticky top-0 py-4 p-4 dark:bg-dark-navbarBg bg-light-navbarBg ">
      {/* Header left */}
      <div className="container mx-auto flex justify-between items-center">
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
          <div className="text-2xl font-bold">My Blog</div>
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
                className="rounded-full shadow-lg"
              />
            </PopoverTrigger>
            <PopoverContent className="mr-2 flex flex-col gap-2 bg-light-bodyBg dark:bg-dark-bodyBg">
              <p>{user.personalInfo.email}</p>
              <p>{user.personalInfo.displayName}</p>
              <div className="flex justify-between">
                <button
                  onClick={handleLogout}
                  className="bg-blue-600 text-white py-1.5 px-5 rounded-lg hover:bg-blue-500"
                >
                  Sign Out
                </button>
                {user.personalInfo.email ===
                  process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
                  <Link
                    href={"/admin/create-blog"}
                    className="bg-emerald-600 text-white  py-1.5 px-5 rounded-lg hover:bg-emerald-600"
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

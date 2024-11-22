"use client"
import { useUserContext } from "@/app/context/UserDataProviderContext"
import Link from "next/link"
import { usePathname } from "next/navigation" // Import usePathname from next/navigation
import React, { useEffect, useState } from "react"

export default function Navbar({ isMenuOpen }: { isMenuOpen: boolean }) {
  const [path, setPath] = useState<string | null>(null)
  const pathname = usePathname() // Get the current path using usePathname
  const { user } = useUserContext()

  useEffect(() => {
    const pathName = pathname.split("/")[1] // Get the first segment of the path
    setPath(pathName)
  }, [pathname]) // Re-run the effect when pathname changes

  // Add/remove overflow-hidden class when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden" // Disable scrolling
    } else {
      document.body.style.overflow = "auto" // Re-enable scrolling
    }
    // Cleanup to reset the overflow when the component unmounts
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isMenuOpen])

  return (
    <div className="mx-auto flex justify-between items-center">
      <div className="md:flex items-center space-x-8 hidden">
        <ul className="flex space-x-8 items-center bg-light-navbarBg dark:bg-dark-navbarBg h-full">
          <li>
            <Link
              className={`p-2 ${path === "" && "text-blue-600 underline"}`}
              href={"/"}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={`p-2 ${path === "blogs" && "text-blue-600 underline"}`}
              href={"/blog"}
            >
              Blogs
            </Link>
          </li>
          <li>
            <Link
              className={`p-2 ${
                path === "pricing" && "text-blue-600 underline"
              }`}
              href={"/pricing"}
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              className={`p-2 ${path === "about" && "text-blue-600 underline"}`}
              href={"/about"}
            >
              About
            </Link>
          </li>
          {user === null && (
            <li>
              <a
                href="/auth/signup"
                className="bg-blue-600 text-white md:block hidden py-2 px-6 rounded-lg hover:bg-blue-500"
              >
                Sign Up
              </a>
            </li>
          )}
        </ul>
      </div>

      {/* Mobile Hamburger Menu Button */}
      {/* Add a button to toggle the mobile menu */}

      {/* Mobile Menu */}
      {isMenuOpen && (
  <div
    className="fixed inset-0 top-16 z-50 bg-light-navbarBg dark:bg-dark-navbarBg h-screen w-full overflow-y-auto shadow-lg space-y-4"
  >
    <ul className="space-y-4 text-center py-8">
      <li>
        <Link
          className={`block p-2 ${
            path === "" && "text-blue-600 underline"
          }`}
          href={"/"}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          className={`block p-2 ${
            path === "blog" && "text-blue-600 underline"
          }`}
          href={"/blog"}
        >
          Blogs
        </Link>
      </li>
      <li>
        <Link
          className={`block p-2 ${
            path === "pricing" && "text-blue-600 underline"
          }`}
          href={"/pricing"}
        >
          Pricing
        </Link>
      </li>
      <li>
        <Link
          className={`block p-2 ${
            path === "about" && "text-blue-600 underline"
          }`}
          href={"/about"}
        >
          About
        </Link>
      </li>
      {user === null && (
        <li>
          <a
            href="/auth/signup"
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-500"
          >
            Sign Up
          </a>
        </li>
      )}
    </ul>
  </div>
)}

    </div>
  )
}

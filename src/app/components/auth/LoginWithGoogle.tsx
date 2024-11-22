"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { redirect } from "next/navigation"
import { useUserContext } from "@/app/context/UserDataProviderContext"

export default function Page() {
  const [isLoading, setIsLoading] = useState(false) // State to manage loading status

  const { user, handleGoogleLogin } = useUserContext()

  const handleLoginClick = async () => {
    setIsLoading(true)
    await handleGoogleLogin()
    if (user !== null) {
      setIsLoading(false)
    }
  }

  useEffect(()=>{
    if(user!==null){
      redirect('/')
    }
  },[user])

  return (
    <>
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center dark:bg-black">
        <div className="w-full max-w-sm p-8 bg-white dark:bg-slate-800 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-4">
            Sign in to Your Account
          </h2>
          <div className="text-center">
            {/* {error && <p className="text-red-500">{error}</p>} Display error message */}
            <button
              className="mx-auto flex dark:bg-slate-700 bg-slate-800 max-w-[240px] min-w-[240px] px-2 py-1.5 rounded text-white text-lg text-center shadow-md gap-2 items-center"
              onClick={handleLoginClick} // Use handleLoginClick to manage login logic
              disabled={isLoading} // Disable button during loading
            >
              <Image
                src={"/google.svg"}
                alt="Google Logo"
                width={20}
                height={20}
              />{" "}
              <span>
                {isLoading ? "Logging in..." : "Continue with Google"}
              </span>{" "}
              {/* Change button text based on loading state */}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

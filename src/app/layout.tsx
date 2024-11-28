import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import NavbarWrapper from "./components/header/NavbarWrapper"
import { UserProvider } from "./context/UserDataProviderContext"
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: {
    default : "Productivity hub blog",
    template : "%s - Productivity hub blog"
  },
  description: "Discover tips on productivity, self-improvement, and lifestyle growth at Productivity Hub Blog. Boost your personal development with expert advice and actionable strategies."
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
      {/* <link rel="icon" href="/favicon.ico" sizes="48x48" /> */}
      {/* <link rel="icon" href="/favicon.ico" sizes="any" /> */}
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>
            <NavbarWrapper />
            <main className=" mx-auto dark:bg-dark-bodyBg">{children}</main>
          </UserProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

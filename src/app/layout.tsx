import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import NavbarWrapper from "./components/header/NavbarWrapper"
import { UserProvider } from "./context/UserDataProviderContext"

export const metadata: Metadata = {
  title: "My Blog App",
  description: "A self-improvement and productivity blog."
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
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
      </body>
    </html>
  )
}

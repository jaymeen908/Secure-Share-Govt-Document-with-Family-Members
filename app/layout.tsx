import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Secure & Share Govt Documents",
  description: "A platform for securely storing and sharing government documents",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 text-gray-900`}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-blue-600 text-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold">Secure & Share Docs</h1>
              <nav>
                <ul className="flex space-x-4">
                  <li>
                    <a href="/" className="hover:text-blue-200">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/dashboard" className="hover:text-blue-200">
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a href="/profile" className="hover:text-blue-200">
                      Profile
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
          <footer className="bg-gray-200 text-gray-600">
            <div className="container mx-auto px-4 py-4 text-center">
              &copy; 2025 Secure & Share Govt Documents. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}


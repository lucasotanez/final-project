import './globals.css'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import Navbar from './Navbar'

const os = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Grocery Tracker',
  description: 'By CS201 Group 6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={os.className}>
        <Navbar/>
        {children}
      </body>
    </html>
  )
}

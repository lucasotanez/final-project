"use client"
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-green-600 text-6xl font-extrabold mt-10">Shop Like a Chef</h1>

      <div className="flex flex-col h-36 mb-10">
        <Link href="/signup">
          <button className="green-button">Get Started</button>
        </Link>
        <Link href="/login">
          <button className="green-button">Login</button>
        </Link>
      </div>
    </main>
  )
}

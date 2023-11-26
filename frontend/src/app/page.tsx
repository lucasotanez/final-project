"use client"
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Page() {

  function LoginButtonUI() {
    let sid = sessionStorage.getItem("SID");
    if (sid) {
      return (
        <div className="flex flex-col h-36 mb-10">
          <Link href="/dashboard">
            <button className="green-button">Dashboard</button>
          </Link>
        </div>
      )
    } else return (
      <div className="flex flex-col h-36 mb-10">
        <Link href="/signup">
          <button className="green-button">Get Started</button>
        </Link>
        <Link href="/login">
          <button className="green-button">Login</button>
        </Link>
      </div>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <img src='/home.png' alt='background image' className="absolute -z-10 top-12 bottom-0 w-full overflow-hidden max-h-full object-cover"></img>
      <h1 className="text-white text-7xl font-extrabold mt-10 backdrop-blur-md rounded-xl px-8 py-4">Shop Like a Chef</h1>

      < LoginButtonUI />

    </main>
  )
}

'use client'
import Link from 'next/link'

export default function Navbar() {

  function Links() {
    let userSID = sessionStorage.getItem("SID");
    if (userSID) { return (
      <div id="otherlinks" className="hidden md:block mr-32">
        <Link href='/dashboard' className="ml-16 hover:text-gray-600">Dashboard</Link>
        <Link href='/' className="ml-16 text-green-400 hover:text-green-300" onClick={logout}>Logout</Link>
      </div>
    )} else { return (
      <div id="otherlinks" className="hidden md:block mr-32">
        <Link href='/signup' className="ml-16 hover:text-gray-600">Sign Up</Link>
        <Link href='/login' className="ml-16 text-green-400 hover:text-green-300">Login</Link>
      </div>
    )}
  }

  function logout() {
    console.log("logout");
    sessionStorage.removeItem("SID");
    window.location.reload();
  }

  return (
    <div>
      <div id='navbar' className="fixed z-50 w-full text-mint-cream text-lg
          h-16 items-center text-center flex px-0 shadow-md bg-gray-50">
        <div className="flex flex-col ml-16">
          <Link href='/' className="flex flex-row items-center justify-center hover:text-gray-600">
            <p className="ml-4 hidden md:block font-bold text-xl">Grocery App</p>
          </Link>
        </div>

        <div id="space" className="text-left ml-0 mr-auto align-right"></div>

        < Links />

        <div id="drop-btn" className="duration-100 hover:drop-shadow-nav md:hidden flex flex-col items-center justify-center text-white mx-10 px-2" >
          <svg id="btn-svg" className="duration-300 ease-in-out" width="30" height="30" viewBox="0 0 184 89" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M92 39L184 0.865234V50.8652L92 89L0 50.8652V0.865234L92 39Z" fill="#ffffff"/>
          </svg>
        </div>

      </div>
    </div>
  )
}

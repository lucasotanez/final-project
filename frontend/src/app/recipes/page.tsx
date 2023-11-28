"use client"
import { useRouter } from 'next/navigation'

export default function Recipes() {

  const router = useRouter();

  if (!sessionStorage.getItem("SID")) {
    router.push("/");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">

    <h2 className="text-green-600 text-6xl font-extrabold mt-10">Discover Recipes</h2>

    <form onClick={ (e) => e.preventDefault() } className="w-full flex flex-col items-center">
      <input type="text" placeholder="Search here..." id="search" className="px-10 py-6 rounded-md
        border-none outline-none hover:bg-gray-300 focus:outline-none w-5/6 bg-gray-200
        duration-300 my-12 shadow-sm"/>
    </form>
  
    <div id="recipe-results" className="w-1/2 flex flex-col justify-left">

      <h2>Just For You</h2>
      <img src='/home.png' alt='background image' className="w-full h-64 object-cover
        rounded-xl my-8 shadow-xl hover:shadow-2xl duration-200">
      </img>

      <h2 className="mt-10">Other Recipes Based On Your Groceries</h2>
      <img src='/home.png' alt='background image' className="w-1/3 h-64 object-cover
        rounded-xl my-8 shadow-xl hover:shadow-2xl duration-200">
      </img>

    </div>
      
    </main>
  )
}

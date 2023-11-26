"use client"
import { useRouter } from 'next/navigation'

export default function Dashboard() {

  const router = useRouter();

  if (!sessionStorage.getItem("SID")) {
    router.push("/");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24 w-full">
      <h2 className="text-green-600 text-6xl font-extrabold mt-10">Dashboard</h2>

      <form onClick={ (e) => e.preventDefault() } className="w-full flex flex-col items-center">
        <input type="text" placeholder="Search here..." id="search" className="px-10 py-6 rounded-md
          border-none outline-none hover:bg-gray-300 focus:outline-none w-5/6 bg-gray-200
          duration-300 my-12 shadow-sm"/>
      </form>

      <div id="grocery-list" className="w-5/6">

        <table>
          <tr>
            <th className="border-none"></th>
            <th>Grocery Item</th>
            <th>Expiration Date</th>
            <th>Count</th>
          </tr>
          <tr>
          {/*
            <td><button className="rounded w-8 h-8 border-purple-700
              bg-purple-300 border-2 font-extrabold text-purple-700">&#9148;</button></td>
            <td>Carrot</td>
            <td>22/12</td>
            <td>4</td>
            */}
          </tr>
          <tr>
            <td><button className="rounded w-8 h-8 border-purple-700
              bg-purple-300 border-2 font-extrabold text-purple-700">&#9148;</button></td>
            <td>Carrot</td>
            <td>2023-8-12</td>
            <td>4</td>
          </tr>
          <tr>
            <td><button className="rounded w-8 h-8 border-purple-700
              bg-purple-300 border-2 font-extrabold text-purple-700">&#9148;</button></td>
            <td className="item">Pancake Mix</td>
            <td>2023-8-14</td>
            <td>1</td>
          </tr>
        </table>

      </div>

    </main>
  )
}

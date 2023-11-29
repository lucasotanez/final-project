"use client"
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Dashboard() {

  const router = useRouter();

  const [ addWindow, setAddWindow ] = useState<boolean>(false);
  const [ groceryList, setGroceryList ] = useState<JSX.Element[]>([])

  if (!sessionStorage.getItem("SID")) {
    router.push("/");
    router.refresh();
  }

  function ItemWindow() {
    if (addWindow) {
      return (
        <form onSubmit={(e) => e.preventDefault() } className="flex flex-row justify-center mb-8">
          <input id="item-input" type="text" placeholder="Grocery Item" name="grocery_name" className="px-4 py-2 outline outline-1
            rounded mx-2 focus:outline-2 focus:outline-green-600 duration-100"></input>
          <input id="date-input" type="text" placeholder="Expiration Date" name="expiration_date" className="px-4 py-2 outline outline-1
            mx-2 focus:outline-2 focus:outline-green-600 rounded duration-100 w-40"
            onFocus={() => (document.getElementById("date-input") as HTMLInputElement).type = "date"}></input>
          <input id="count-input" type="number" placeholder="Count" name="count" min="1" step="1" pattern="[0-9]" className="appearance-none
            px-4 py-2 outline outline-1 focus:outline-2 focus:outline-green-600 rounded
            mx-2 w-20 duration-100"></input>
          <button id="add-item-btn" className="mx-2 bg-purple-300 px-4 py-2 font-bold
            text-white rounded-md border-2 border-purple-700" onClick={() => addItem()}>Add</button>
        </form>
      )
    } else {
      return (
        <></>
      )
    }
  }

  function ItemEntry(name : string, date : string, count : string) {

    let removeBtn : JSX.Element;
    let dateEntry : JSX.Element;

    // Check if items are expired and choose UI (colors) accordingly
    if (new Date().getTime() > new Date(date).getTime()) {
      // Color date & remove button red
      removeBtn = 
        (<button className="rounded w-8 h-8 border-red-700
        bg-red-300 border-2 font-extrabold text-red-700"
        onClick={ (e) => removeItem(e.currentTarget) }>&#9148;</button>);
      dateEntry = (<td className="text-red-700">{date}</td>);
    } else {
      // Color remove button default
      removeBtn = 
        (<button className="rounded w-8 h-8 border-purple-700
        bg-purple-300 border-2 font-extrabold text-purple-700"
        onClick={ (e) => removeItem(e.currentTarget) }>&#9148;</button>);
      dateEntry = (<td>{date}</td>);
    }

    return (
      <tr>
        <td>{removeBtn}</td>
        <td>{name}</td>
        { dateEntry }
        <td>{count}</td>
      </tr>
    )
  }

  async function removeItem(e : HTMLElement) {
    let username = sessionStorage.getItem("SID");
    let grocery_name = (e.parentNode?.nextSibling as HTMLElement)?.innerHTML;
    let expiration_date = (e.parentNode?.nextSibling?.nextSibling as HTMLElement)?.innerHTML;
    let count = (e.parentNode?.nextSibling?.nextSibling?.nextSibling as HTMLElement)?.innerHTML;
    await fetch("http://localhost:8080/server/DeleteGrocery?username=" + username + "&item=" + grocery_name + "&expiration_date=" + expiration_date + "&count=" + count, { next: { revalidate: 10 } })
    .then( response => response.json() )
    .then( response => {
      if (response) {
        getItems();
      } else {
        // Couldn't add item
        return;
      }
    });
  }

  useEffect( () => {
    getItems();
  }, []);

  async function addItem() {
    let username : string | null = sessionStorage.getItem("SID");
    if (!username) return;
    let grocery_name : string = (document.getElementById("item-input") as HTMLInputElement)?.value;
    if (!grocery_name || grocery_name == "") {
      // Display error
      return
    }
    let expiration_date : string = (document.getElementById("date-input") as HTMLInputElement)?.value;
    if (!expiration_date || expiration_date == "") {
      // Display error
      return
    }
    let count : string = (document.getElementById("count-input") as HTMLInputElement)?.value;
    if (!count || count == "") {
      // Display error
      return
    }

    await fetch("http://localhost:8080/server/AddGrocery?username=" + username + "&item=" + grocery_name + "&expiration_date=" + expiration_date + "&count=" + count, { next: { revalidate: 10 } })
    .then( response => response.json() )
    .then( response => {
      if (response) {
        setAddWindow(false);
        getItems();
      } else {
        // Couldn't add item
        return;
      }
    });
    // END addItem()
  }

  async function getItems() {
    let username : string | null = sessionStorage.getItem("SID");
    if (!username) return;

    await fetch("http://localhost:8080/server/GetGroceryList?username=" + username, { next: { revalidate: 10 } })
    .then( response => response.json() )
    .then( response => {
      if (response) {
        let i = 0;
        let temp : JSX.Element[] = []
        while (response[i]) {
          temp.push(ItemEntry(response[i].grocery_name, response[i].expiration_date, response[i].count));
          i++;
        }
        setGroceryList(temp);
      } else {
        // Couldn't get items
        return;
      }
    });
    // END getItems()
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24 w-full">
      <h2 className="text-green-600 text-6xl font-extrabold mt-10 mb-12 drop-shadow-md">Dashboard</h2>

      <div id="grocery-list" className="w-5/6">
        <table>
          <tr>
            <th className="border-none w-6"></th>
            <th>Grocery Item</th>
            <th>Expiration Date</th>
            <th>Count</th>
          </tr>
          { groceryList }
        </table>
      </div>

      <button className="green-button drop-shadow-md" onClick={() => { addWindow ? setAddWindow(false) : setAddWindow(true) }}>Add Item</button>
      <ItemWindow />

      <Link href='/recipes' className="text-gray-400 hover:text-gray-500 
        hover:underline duration-100">Discover Recipes Based on These Ingredients! &rArr;</Link>

    </main>
  )
}

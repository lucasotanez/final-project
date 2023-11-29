"use client"
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'

class recipeResult {
  recipeId : number = -1;
  recipeTitle : string = "";
  matchingIngredientsCount : number = -1;
}

export default function Recipes() {

  const router = useRouter();

  let username : string | null = sessionStorage.getItem("SID");

  if (!username) {
    router.push("/");
    router.refresh();
  }

  let initialResults : recipeResult[] = new Array<recipeResult>(20);
  // need to initalize each element for default values
  for (let i = 0; i < 20; i++) {
    initialResults[i] = new recipeResult();
  }

  const [ recipeResults, setRecipeResults ] = useState(initialResults);
  const [ resultsEmpty, setResultsEmpty ] = useState(true)

  console.log(recipeResults[0]);

  async function getRecipeResults() {
    await fetch("http://localhost:8080/server/GetRecipeList?username=" + username)
    .then( response => response.json() )
    .then( response => {
      // store our results 
      if (response.noResult) setResultsEmpty(true);
      else {
        setResultsEmpty(false);
        setRecipeResults(response);
      }
    })
  }
  
  useEffect( () => {
    getRecipeResults();
  }, [])

  function HighlightedRecipe() {
    if (resultsEmpty) return (<h1 className="text-red-600 m-4">No recipes found! Consider buying more groceries.</h1>)
    return (
      <Link href={{pathname:'/recipe', 
        query: {
          id: recipeResults[0].recipeId,
        }}} className="w-full h-64 bg-zinc-950 text-white p-6 flex flex-col
        rounded-xl my-8 shadow-xl hover:shadow-2xl duration-200 hover:scale-105">
        <h1>{recipeResults[0].recipeTitle}</h1>
        <div className="mb-auto min-w-20"></div>
        <p className="my-1 text-lg">Ingredients Owned: <b>{recipeResults[0].matchingIngredientsCount}</b></p>
        <p className="my-1 text-lg">Recipe ID: <b>{recipeResults[0].recipeId}</b></p>
      </Link>
    )
  }

  function OtherRecipes() {
    if (resultsEmpty) return (<h1 className="text-red-600 m-4">No recipes found</h1>)
    let res : JSX.Element[] = new Array(19);
    for (let i = 1; i < 20; i++) {
      res[i] = (
        <Link href={{pathname:'/recipe', 
          query: {
            id: recipeResults[i].recipeId,
          }}} className="my-2 p-6 bg-gray-200 rounded-xl hover:scale-105 flex flex-row
          duration-100 items-center shadow-lg">
          <h3>{recipeResults[i].recipeTitle}</h3>
          <div className="mr-auto"></div>
          <div className="flex flex-col text-right">
            <p>Ing. Owned: <b>{recipeResults[i].matchingIngredientsCount}</b></p>
            <p>ID: <b>{recipeResults[i].recipeId}</b></p>
          </div>
        </Link>
      )
    }

    return res;
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">

    <h2 className="text-green-600 text-6xl font-extrabold mt-10 drop-shadow-md">Discover Recipes</h2>

    <form onClick={ (e) => e.preventDefault() } className="w-full flex flex-col items-center">
      <input type="text" placeholder="Search here..." id="search" className="px-10 py-6 rounded-md
        border-none outline-none hover:bg-gray-300 focus:outline-none w-5/6 bg-gray-200
        duration-300 my-12 shadow-sm"/>
    </form>
  
    <div id="recipe-results" className="w-1/2 flex flex-col justify-left">

      <h2>Just For You</h2>
      <HighlightedRecipe />

      <h2 className="my-10">Other Recipes Based On Your Groceries</h2>
      <OtherRecipes />

    </div>
      
    </main>
  )
}

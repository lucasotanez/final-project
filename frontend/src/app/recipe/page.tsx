"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'

class recipeClass {
  recipeId : number = -1;
  recipeTitle : string = "";
  recipeIngredients : string = "";
  recipeDirections : string = "";

}

export default function Recipe() {

  const router = useRouter();

  let username : string | null = sessionStorage.getItem("SID");

  if (!username) {
    router.push("/");
    router.refresh();
  }

  const recipe_id = useSearchParams().get('id');

  const [ recipe, setRecipe ] = useState(new recipeClass());
  // need to initalize each element for default values

  async function getRecipe() {
    await fetch("http://localhost:8080/server/GetRecipeItem?recipe_id=" + recipe_id)
    .then( response => response.json() )
    .then( response => {
      // store our results 
      console.log(response);
      setRecipe(response);
    })
  }
  
  useEffect( () => {
    getRecipe();
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center p-24">

    <div className="w-2/3 mt-10">

      <div className="pl-32 flex flex-row items-center relative">
        <div className="left-0 absolute rounded-full bg-zinc-950 h-24 w-24 flex flex-col
          justify-center items-center text-2xl font-bold text-gray-100">
          {recipe_id}
        </div>
        <h1 className="text-zinc-950">{recipe.recipeTitle}</h1>
      </div>

      <div className="my-12">
        <h2>Ingredients:</h2>
        <div className="mt-4 py-4 px-6 bg-gray-200 rounded-lg">
          <p>{recipe.recipeIngredients}</p>
        </div>
      </div>

      <div className="my-12">
        <h2>Directions:</h2>
        <div className="mt-4 py-4 px-6 bg-gray-200 rounded-lg">
          <p>{recipe.recipeDirections}</p>
        </div>
      </div>

    </div>
      
    </main>
  )
}

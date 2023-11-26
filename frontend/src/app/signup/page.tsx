"use client"
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react';

export default function Signup() {


  const router = useRouter();


  async function createAccount() {

    let user = (document.getElementById("username") as HTMLInputElement).value;
    if (!user || user == "") return;
    let password = (document.getElementById("password") as HTMLInputElement).value;
    if (!password || password == "") return;

    // Call Java servlet and store new user data in MySQL
    // await fetch("")
    
    await fetch("http://localhost:8080/server/Signup?username=" + user + "&password=" + password, { next: { revalidate: 10 } })
    .then( response => response.json() )
    .then( response => {
      if (response) {
        sessionStorage.setItem("SID", user)
        router.replace("/dashboard");
        router.refresh();
      } else {
        // Username is already in use
        return;
      }
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="align-left">
        <h1>Let's Get Started!</h1>
        <h3>Provide a Username & Password</h3>
      </div>

      <form onClick={ (e) => e.preventDefault() } className="flex flex-col items-center">
        <input type="text" placeholder="Username" id="username" className="input1" required />
        <input type="password" placeholder="Password" id="password" className="input1" required />
        <button className="green-button" onClick={createAccount} id="create-account">Create Account</button>
      </form>
      <Link href="/login" className="hover:underline text-green-500 duration-100">Already have an account?</Link>
    </main>
  )
}

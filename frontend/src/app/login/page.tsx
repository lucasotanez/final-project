"use client"
import { useRouter } from 'next/navigation'

export default function Login() {

  const router = useRouter();

  async function authenticate() {
    console.log( (document.getElementById("username") as HTMLInputElement).value );
    sessionStorage.setItem("SID", (document.getElementById("username") as HTMLInputElement).value)

    // Check if login is valid.
    // If not valid, return from this function and show an error message

    router.replace("/dashboard");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="align-left">
        <h1>Welcome Back!</h1>
        <h3>Enter Your Username & Password</h3>
      </div>

      <form onClick={ (e) => e.preventDefault() } className="flex flex-col items-center">
        <input type="text" placeholder="Username" id="username" className="input1" required />
        <input type="password" placeholder="Password" id="password" className="input1" required />
        <button className="green-button" onClick={authenticate}>Login</button>
      </form>
    </main>
  )
}

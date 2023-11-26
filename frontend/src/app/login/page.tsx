"use client"
import { useRouter } from 'next/navigation'

export default function Login() {

  const router = useRouter();

  async function authenticate() {
    let user = (document.getElementById("username") as HTMLInputElement).value;
    if (!user || user == "")  return;
    let password = (document.getElementById("password") as HTMLInputElement).value;
    if (!password || password == "") return;

    // Check if login is valid.
    // If not valid, return from this function and show an error message
    let response = await fetch("http://localhost:8080/server/Login?username=" + user + "&password=" + password, { cache: "no-store" });
    let parsed = await response.json();
    console.log(parsed);

    if (parsed) {
      sessionStorage.setItem("SID", user)
      router.replace("/dashboard");
      router.refresh();
    } else {
      // authentication failed
      return;
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="align-left">
        <h1>Welcome Back!</h1>
        <h3>Enter Your Username & Password</h3>
      </div>

      <form onClick={ (e) => e.preventDefault() } className="flex flex-col items-center pt-14">
        <input type="text" placeholder="Username" id="username" className="input1" required />
        <input type="password" placeholder="Password" id="password" className="input1" required />
        <button className="green-button" onClick={authenticate}>Login</button>
      </form>
    </main>
  )
}

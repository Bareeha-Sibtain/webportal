import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth"; // Import signIn method
import { auth } from "../firebase/firebase"; // Make sure you have the correct path

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in successfully");
      // Redirect to another page or dashboard
      router("/home")
    } catch (error) {
      console.error("Failed to login:", error.message);
      alert("Failed to login: " + error.message); // Display error message to the user
    }
  };

  return (
    <main className='h-96 w-96 mx-auto mt-24 rounded shadow'>
      <div className=' rounded shadow p-10 border-2 text-center'>
        <h3 className='font-bold text-3xl'>Login</h3>
        <div className='p-4 bg-black rounded mt-6'>
          <form className='bg-white p-3 mt-6 rounded-md shadow' onSubmit={handleLogin}>
            <div className='flex flex-col items-start p-2 mt-4'>
              <input type='email' placeholder='Email' autoComplete='off' className='outline-none border-b-2 w-full text-xs text-[#000]' required onChange={(e)=> setEmail(e.target.value)}  /> 
            </div>
            <div className='flex flex-col items-start p-2 mt-4'>
              <input type='password' placeholder='Password' autoComplete='off' className='outline-none border-b-2 w-full text-xs text-[#000]' required onChange={(e)=> setPassword(e.target.value)}  /> 
            </div>
            <button type='submit' className='bg-blue-600 w-24 text-white rounded-sm'>Login</button>
            <NavLink to='/signup' className='text-blue-400 text-xs mt-3 block'>Don't have an Account?</NavLink>
          </form>
        </div>
      </div>
    </main>
  )
}

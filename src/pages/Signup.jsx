import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../firebase/firebase";
import { setDoc, doc } from "firebase/firestore"; // Import addDoc and collection
import { NavLink } from "react-router-dom";
import logo from '../assets/image/logo.jpeg' 
import { toast } from "react-toastify";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
     if(email === '' || password === '' || phone === '' || location === '' || name === ''){
      toast.error("Required All Fields")
     } else{
       // 1. Create user with email and password
       const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update the user's display name
      await updateProfile(user, {
        displayName: name,
      });

      // Store additional user information in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: name,
        phone: phone,
        location: location,
      });
      toast.success("Registeration Successfully Done")
     }

      // Optionally, you can redirect the user to another page after signup
      // window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error signing up:", error.message);
      toast.error("Registration Failed",error)
    }
  };

  return (
    <main className="h-96 w-96 mx-auto mt-24 ">
      <div className="p-10  text-center">
      <div className="flex flex-col justify-center items-center mx-auto">
      <img src={logo} alt="logo" width={80} height={80} />
        <span className="text-sm md:text-xl text-black capitalize fontFamily">TheftGuard</span>
      </div>
        <h3 className="font-bold text-3xl mt-4 mb-2">Signup</h3>
        <div className="">
          <form
            className="bg-white p-3 mt-6 rounded-md shadow"
            onSubmit={handleSignup}
          >
            <div className="flex flex-col items-start p-2 mt-4">
              <input
                type="text"
                placeholder="Name"
                autoComplete="off"
                className="outline-none border-b-2 w-full text-xs text-[#000]"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start p-2 mt-4">
              <input
                type="email"
                placeholder="Email"
                autoComplete="off"
                className="outline-none border-b-2 w-full text-xs text-[#000]"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start p-2 mt-4">
              <input
                type="password"
                placeholder="Password"
                autoComplete="off"
                className="outline-none border-b-2 w-full text-xs text-[#000]"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start p-2 mt-4">
              <input
                type="text"
                placeholder="Phone"
                autoComplete="off"
                className="outline-none border-b-2 w-full text-xs text-[#000]"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start p-2 mt-4">
              <input
                type="text"
                placeholder="Location"
                autoComplete="off"
                className="outline-none border-b-2 w-full text-xs text-[#000]"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 w-24 text-white rounded-sm"
            >
              Signup
            </button>
            <NavLink to="/" className="text-blue-400 text-xs mt-3 block">
              Already Account?
            </NavLink>
          </form>
        </div>
      </div>
    </main>
  );
}

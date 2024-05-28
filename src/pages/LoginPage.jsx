import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import logo from '../assets/image/logo.jpeg' 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const { setCurrentUser, setUserRole } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      if (email === "" || password === "") {
        toast.warning("Required all Fields");
      } else {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        setCurrentUser(user);
        if (email === "admin@mail.com") {
          setUserRole("admin");
          navigate("/admin");
          toast.success("Admin Login Successfully");
        } else {
          setUserRole("user");
          navigate("/user");
          toast.success("User Login Successfully");
        }
      }
    } catch (error) {
      console.error("Failed to login:", error.message);
      toast.error(`Login Failed ${error}`);
    }
  };

  return (
    <>
      <div className="w-85 flex flex-col justify-center items-center mx-auto h-[100vh] border-2 text-center">
        <img src={logo} alt="logo" width={80} height={80} />
        <span className="text-sm md:text-xl text-black capitalize fontFamily">TheftGuard</span>
        <h3 className="font-bold text-3xl mt-5 mb-2">Login</h3>
        <div className="p-4 w-72 rounded">
          <form
            className="bg-white p-3 w-72 mt-6 rounded-md shadow-md"
            onSubmit={handleLogin}
          >
            <div className="flex flex-col items-start p-2 mt-4">
              <input
                type="email"
                placeholder="Email"
                autoComplete="off"
                className="outline-none border-b-2 w-full text-xs text-[#000]"
                required
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
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 w-24 text-white rounded-sm"
            >
              Login
            </button>
            <NavLink to="/signup" className="text-blue-400 text-xs mt-3 block">
              Don't have an Account?
            </NavLink>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;

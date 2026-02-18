import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

  try {

    // ✅ VERY IMPORTANT: clear old token first
    localStorage.clear();

    const res = await API.post("/auth/login", {

      emailorMobile: email,
      password

    });

    console.log("NEW TOKEN:", res.data.token);

    // ✅ save new token
    localStorage.setItem("token", res.data.token);

    navigate("/dashboard");

  } catch {

    alert("Invalid credentials");

  }

};


  return (

    <div className="flex h-screen">

      {/* Left Side */}
      <div className="w-1/2 bg-blue-600 flex flex-col justify-center items-center text-white">

        <h1 className="text-4xl font-bold mb-4">
          Recordent
        </h1>

        <p className="text-lg">
          Manage your buyers easily
        </p>

      </div>


      {/* Right Side */}
      <div className="w-1/2 flex justify-center items-center">

        <div className="w-80">

          <h2 className="text-2xl font-semibold mb-6">

            Sign In

          </h2>


          <input

            type="text"

            placeholder="Email or Mobile"

            className="w-full border p-2 mb-4 rounded"

            onChange={(e) => setEmail(e.target.value)}

          />


          <input

            type="password"

            placeholder="Password"

            className="w-full border p-2 mb-4 rounded"

            onChange={(e) => setPassword(e.target.value)}

          />


          <button

            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"

            onClick={handleLogin}

          >

            Login

          </button>


          <p className="mt-4 text-sm">

            Don't have account?

            <span

              className="text-blue-600 cursor-pointer ml-1"

              onClick={() => navigate("/register")}

            >

              Register

            </span>

          </p>

        </div>

      </div>

    </div>

  );

}

export default Login;

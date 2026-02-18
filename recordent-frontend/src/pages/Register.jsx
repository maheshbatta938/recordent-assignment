import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [mobile, setMobile] = useState("");

  const [password, setPassword] = useState("");


  const handleRegister = async () => {

    try {

      await API.post("/auth/register", {

        name,
        email,
        mobile,
        password

      });

      alert("Registration successful");

      navigate("/");

    } catch {

      alert("Registration failed");

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

          Create your account

        </p>

      </div>


      {/* Right Side */}

      <div className="w-1/2 flex justify-center items-center">

        <div className="w-80">

          <h2 className="text-2xl font-semibold mb-6">

            Register

          </h2>


          <input

            type="text"

            placeholder="Name"

            className="w-full border p-2 mb-3 rounded"

            onChange={(e) => setName(e.target.value)}

          />


          <input

            type="text"

            placeholder="Email"

            className="w-full border p-2 mb-3 rounded"

            onChange={(e) => setEmail(e.target.value)}

          />


          <input

            type="text"

            placeholder="Mobile"

            className="w-full border p-2 mb-3 rounded"

            onChange={(e) => setMobile(e.target.value)}

          />


          <input

            type="password"

            placeholder="Password"

            className="w-full border p-2 mb-4 rounded"

            onChange={(e) => setPassword(e.target.value)}

          />


          <button

            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"

            onClick={handleRegister}

          >

            Register

          </button>


          <p className="mt-4 text-sm">

            Already have account?

            <span

              className="text-blue-600 cursor-pointer ml-1"

              onClick={() => navigate("/")}

            >

              Login

            </span>

          </p>

        </div>

      </div>

    </div>

  );

}

export default Register;

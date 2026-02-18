import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };

  return (

    <div className="flex">

      {/* Sidebar */}

      <div className="w-64 h-screen bg-blue-600 text-white">

        <h1 className="text-2xl font-bold p-4 border-b">

          Recordent

        </h1>

        <button

          onClick={() => navigate("/dashboard")}

          className="block w-full text-left p-4 hover:bg-blue-700"

        >

          Dashboard

        </button>


        <button

          onClick={() => navigate("/upload")}

          className="block w-full text-left p-4 hover:bg-blue-700"

        >

          Upload Buyers

        </button>


        <button

          onClick={() => navigate("/view")}

          className="block w-full text-left p-4 hover:bg-blue-700"

        >

          View Buyers

        </button>


        <button

          onClick={logout}

          className="block w-full text-left p-4 hover:bg-red-600"

        >

          Logout

        </button>

      </div>


      {/* Main Content */}

      <div className="flex-1 p-10">

        <h2 className="text-3xl font-bold">

          Welcome to Dashboard

        </h2>

        <p className="mt-4">

          Manage your buyers easily.

        </p>

      </div>

    </div>

  );

}

export default Dashboard;

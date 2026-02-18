import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function ViewBuyers() {

  const navigate = useNavigate();

  const [buyers, setBuyers] = useState([]);

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");


  const fetchBuyers = async () => {

    try {

      const res = await API.get(

        `/buyer/view?page=${page}&limit=5&search=${search}`,

        {

          headers: {

            Authorization:

              "Bearer " + localStorage.getItem("token")

          }

        }

      );

      console.log(res.data); // DEBUG

      setBuyers(res.data.data || []);

    }

    catch (error) {

      console.log("ERROR:", error);

    }

  };


  useEffect(() => {

    fetchBuyers();

  }, [page, search]);


  return (

    <div className="flex">

      {/* Sidebar */}

      <div className="w-64 h-screen bg-blue-600 text-white">

        <h1 className="text-2xl font-bold p-4">

          Recordent

        </h1>

        <button

          onClick={() => navigate("/dashboard")}

          className="p-4 block"

        >

          Dashboard

        </button>

      </div>


      {/* Table */}

      <div className="flex-1 p-10">

        <h2 className="text-2xl font-bold mb-4">

          Buyers

        </h2>


        {/* Search */}

        <input

          placeholder="Search"

          className="border p-2 mb-4"

          onChange={(e) => setSearch(e.target.value)}

        />


        <table className="w-full border">

          <thead>

            <tr className="bg-blue-600 text-white">

              <th className="p-2">Name</th>

              <th>Email</th>

              <th>Mobile</th>

            </tr>

          </thead>

          <tbody>

            {buyers.length > 0 ? (

              buyers.map((b, i) => (

                <tr key={i}>

                  <td className="p-2">{b.name}</td>

                  <td>{b.email}</td>

                  <td>{b.mobile}</td>

                </tr>

              ))

            ) : (

              <tr>

                <td colSpan="3" className="text-center p-4">

                  No buyers found

                </td>

              </tr>

            )}

          </tbody>

        </table>


        {/* Pagination */}

        <div className="mt-4">

          <button

            onClick={() => setPage(page - 1)}

            disabled={page === 1}

            className="bg-gray-300 px-3 py-1 mr-2"

          >

            Prev

          </button>


          <button

            onClick={() => setPage(page + 1)}

            className="bg-gray-300 px-3 py-1"

          >

            Next

          </button>

        </div>

      </div>

    </div>

  );

}

export default ViewBuyers;

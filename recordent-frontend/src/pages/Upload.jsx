import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Upload() {

  const navigate = useNavigate();

  const [file, setFile] = useState(null);


  const uploadFile = async () => {

    if (!file) {

      alert("Please select file");

      return;

    }

    const formData = new FormData();

    formData.append("file", file);

    try {

      await API.post(

        "/buyer/upload",

        formData,

        {

          headers: {

            Authorization:

              "Bearer " + localStorage.getItem("token"),

          },

        }

      );

      alert("File uploaded successfully");

    } catch {

      alert("Upload failed");

    }

  };


  return (

    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}

      <div className="w-64 bg-blue-600 text-white">

        <h1 className="text-2xl font-bold p-4 border-b">

          Recordent

        </h1>

        <button

          onClick={() => navigate("/dashboard")}

          className="block p-4 hover:bg-blue-700 w-full text-left"

        >

          Dashboard

        </button>

      </div>


      {/* Center Content */}

      <div className="flex flex-1 justify-center items-center">

        <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">


          <h2 className="text-2xl font-bold mb-6">

            Upload Buyers CSV

          </h2>


          {/* Upload Box */}

          <label className="border-2 border-dashed border-gray-300 p-6 block rounded cursor-pointer hover:border-blue-500">

            <input

              type="file"

              onChange={(e) => setFile(e.target.files[0])}

              className="hidden"

            />

            <p className="text-gray-500">

              Click to select CSV file

            </p>

          </label>


          {/* File Name */}

          {file && (

            <p className="mt-3 text-green-600">

              {file.name}

            </p>

          )}


          {/* Upload Button */}

          <button

            onClick={uploadFile}

            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full"

          >

            Upload File

          </button>


        </div>

      </div>

    </div>

  );

}

export default Upload;

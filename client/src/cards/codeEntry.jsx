import React, { useState } from "react";
import axios from "axios";
import CopyButton from "./copyButton";

function CodeEntry() {
  const [codeInput, setCodeInput] = useState("");
  const [retrievedData, setRetrievedData] = useState("");

  const handleRetrieval = async () => {
    try {
      let num = parseInt(codeInput);
      const response = await axios.get("http://localhost:5000/get-data", {
        params: { id: num },
      });
      setRetrievedData(response.data[0].content);
    } catch (err) {
      console.log("error while handling get data : " + err);
    }
  };
  return (
    <div className="max-w-7xl">
      <div className="bg-white max-w-lg mx-auto shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
        <input
          className="p-4 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter PIN to retrieve"
          onChange={(e) => setCodeInput(e.target.value)}
          value={codeInput}
        />
        <button
          onClick={handleRetrieval}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Retrieve Data
        </button>
      </div>
      {retrievedData && (
        <div className="mt-4 flex flex-col justify-end p-4 rounded-lg shadow-inner overflow-x-scroll ">
          <div className="border border-black p-1 ml-auto rounded w-auto sticky top-0">
            {/* setCopyText({retrievedData}) */}
            <CopyButton copyText={retrievedData} />
          </div>

          {retrievedData && (
            <pre>
              <p
                style={{ textAlign: "initial" }}
                className="h-screen overflow-y-scroll w-[90%]"
              >
                <span className="font-medium ">{retrievedData}</span>
              </p>
            </pre>
          )}
        </div>
      )}
    </div>
  );
}

export default CodeEntry;

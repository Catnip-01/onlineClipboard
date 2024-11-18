import React, { useState } from "react";
import axios from "axios";
import CopyButton from "./copyButton";
import "../App.css";
import "../index.css";

function CodeEntry() {
  const [codeInput, setCodeInput] = useState("");
  const [retrievedData, setRetrievedData] = useState("");

  const handleRetrieval = async () => {
    try {
      let num = parseInt(codeInput);
      const response = await axios.get(
        "https://onlineclipboard-kkaz.onrender.com/get-data",
        {
          params: { id: num },
        }
      );
      setRetrievedData(response.data[0].content);
    } catch (err) {
      console.log("error while handling get data : " + err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="bg-objectBg max-w-lg w-full mx-auto shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
        <input
          className="p-4 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-white bg-objectBg text-gray-200 w-full"
          placeholder="Enter PIN to retrieve"
          onChange={(e) => setCodeInput(e.target.value)}
          value={codeInput}
        />
        <button
          onClick={handleRetrieval}
          className="mt-4 px-6 py-2 bg-gptGray-900 text-white rounded-lg hover:bg-gptGray-400 transition w-full sm:w-auto"
        >
          Retrieve Data
        </button>
      </div>
      {retrievedData && (
        <div className="mt-4 flex flex-col text-white bg-objectBg justify-end p-4 rounded-lg shadow-inner w-full max-w-auto mx-auto">
          <div className="flex justify-end mb-2 sticky top-0">
            <CopyButton copyText={retrievedData} />
          </div>
          <pre className="text-sm sm:text-base w-full whitespace-pre-wrap overflow-x-auto">
            <span className="font-medium">{retrievedData}</span>
          </pre>
        </div>
      )}
    </div>
  );
}

export default CodeEntry;

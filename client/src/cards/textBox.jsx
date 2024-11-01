import React, { useState } from "react";
import axios from "axios";
import CodeEntry from "./codeEntry";

function TextBox() {
  const [inputValue, setInputValue] = useState("");
  const [codeValue, setCodeValue] = useState("");

  const handleTextEntry = async () => {
    console.log("entered text : " + inputValue);
    try {
      const response = await axios.post(
        "https://onlineclipboard-kkaz.onrender.com/accept-req",
        {
          text: inputValue,
        }
      );
      setCodeValue(response.data.code);
      console.log("");
    } catch (err) {
      console.log("error during backend req : " + err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 text-gray-800">
      {/* Header */}
      <header className="bg-blue-600 w-full py-4 text-white text-center shadow-lg">
        <h1 className="text-2xl font-semibold">Clipboard Manager</h1>
        <p className="text-sm">Save and Retrieve Text Easily</p>
      </header>

      {/* Main Content */}
      <div className="flex flex-col md:flex-col max-w-7xl text-start items-center py-10 w-full gap-8 px-4">
        {/* Upload Section */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full flex flex-col items-center">
          <textarea
            rows="6"
            placeholder="Enter data to save"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            className="w-full p-4 border border-gray-300 rounded-lg text-start focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          ></textarea>
          <button
            onClick={handleTextEntry}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Upload to Clipboard
          </button>
          {codeValue && (
            <p className="mt-5 text-gray-600 border-2 border-black p-3 rounded w-full">
              Your code: <span className="font-bold">{codeValue}</span>
            </p>
          )}
        </div>
        <CodeEntry />
      </div>

      {/* Footer */}
      <footer className="bg-blue-600 w-full py-4 text-white text-center mt-auto shadow-inner">
        <p className="text-sm">
          &copy; Shantanu Pandey {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

export default TextBox;

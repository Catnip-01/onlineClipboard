import React, { useState } from "react";
import axios from "axios";
import CopyButton from "./copyButton";
import { motion, AnimatePresence } from "framer-motion";
import "../App.css";
import "../index.css";

function CodeEntry() {
  const [codeInput, setCodeInput] = useState("");
  const [retrievedData, setRetrievedData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRetrieval = async () => {
    if (!codeInput.trim()) {
      setError("Please enter a PIN to retrieve.");
      setRetrievedData("");
      return;
    }
    setIsLoading(true);
    setError(null);
    setRetrievedData("");

    try {
      let num = parseInt(codeInput, 10);
      if (isNaN(num)) {
        setError("Invalid PIN. Please enter a numeric code.");
        setIsLoading(false);
        return;
      }

      const response = await axios.get(
        "https://onlineclipboard-kkaz.onrender.com/get-data",
        {
          params: { id: num },
        }
      );
      if (response.data && response.data.length > 0 && response.data[0].content) {
        setRetrievedData(response.data[0].content);
      } else {
        setError("No data found for this PIN.");
        setRetrievedData("");
      }
    } catch (err) {
      console.log("error while handling get data : " + err);
      if (err.response) {
        setError(err.response.data.message || "Failed to retrieve data. Check PIN.");
      } else if (err.request) {
        setError("Network error or server is down. Please try again later.");
      } else {
        setError("An unexpected error occurred.");
      }
      setRetrievedData("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      className="max-w-7xl mx-auto px-4 w-full"
    >
      {/* Input and button section - REMOVED max-w-lg from here */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
        className="bg-zinc-900 w-full mx-auto shadow-xl rounded-xl p-8 flex flex-col items-center justify-center border border-neutral-800"
        // ^^^ max-w-lg was removed from this line ^^^
      >
        <motion.input
          className="p-4 border bg-neutral-900 text-neutral-300 border-neutral-700 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-neutral-500 font-mono w-full"
          placeholder="Enter PIN to retrieve"
          onChange={(e) => setCodeInput(e.target.value)}
          value={codeInput}
          whileFocus={{ scale: 1.01, borderColor: "#a78bfa" }}
          transition={{ duration: 0.2 }}
        />
        <motion.button
          onClick={handleRetrieval}
          disabled={isLoading || !codeInput.trim()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className={`mt-6 px-8 py-3 bg-gradient-to-r from-blue-700 to-cyan-700 text-white rounded-full font-semibold shadow-lg w-full sm:w-auto
            ${
              isLoading || !codeInput.trim()
                ? "opacity-60 cursor-not-allowed"
                : "hover:from-blue-600 hover:to-cyan-600 transition duration-300"
            }`}
        >
          {isLoading ? "Retrieving..." : "Retrieve Data"}
        </motion.button>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-400 mt-4 text-center font-medium"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {retrievedData && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="mt-8 flex flex-col bg-zinc-900 text-neutral-200 p-6 rounded-xl shadow-xl w-full mx-auto border border-blue-600"
          >
            <div className="flex justify-end mb-4 sticky top-0 z-10 bg-zinc-900 pb-2">
              <CopyButton copyText={retrievedData} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-neutral-100">Retrieved Content:</h3>
            <pre className="text-sm sm:text-base w-full whitespace-pre-wrap overflow-x-auto max-h-96 overflow-y-auto p-3 bg-neutral-800 rounded-md border border-neutral-700">
              <span className="font-mono text-neutral-300">{retrievedData}</span>
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default CodeEntry;
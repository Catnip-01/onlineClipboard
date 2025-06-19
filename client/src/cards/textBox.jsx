import React, { useState } from "react";
import axios from "axios";
import CodeEntry from "./codeEntry"; // Assuming this component exists
import CopyButton from "./copyButton"; // Assuming this component exists
import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence

function TextBox() {
  const [inputValue, setInputValue] = useState("");
  const [codeValue, setCodeValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // To disable button during submission

  const handleTextEntry = async () => {
    if (!inputValue.trim()) return; // Prevent submission of empty input
    setIsSubmitting(true);
    console.log("entered text : " + inputValue);
    try {
      const response = await axios.post(
        "https://onlineclipboard-kkaz.onrender.com/accept-req",
        {
          text: inputValue,
        }
      );
      setCodeValue(response.data.code);
      console.log("Response received:", response.data);
    } catch (err) {
      console.log("error during backend req : " + err);
      // Optionally, set an error message here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-neutral-950 text-neutral-200 min-w-fit">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.2 }}
        className="bg-zinc-900 w-full py-4 text-white text-center shadow-lg border-b border-neutral-800"
      >
        <h1 className="text-3xl font-bold tracking-wide">
          Clipboard Manager
        </h1>
        <p className="text-sm text-neutral-400 mt-1">Save and Retrieve Text Effortlessly</p>
      </motion.header>

      {/* Main Content */}
      <div className="flex flex-col md:flex-col bg-inherit max-w-7xl text-start items-center py-10 w-full gap-10 px-4">
        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
          className="bg-zinc-900 shadow-xl rounded-xl p-8 w-full flex flex-col items-center border border-neutral-800"
        >
          <motion.textarea
            rows="8"
            placeholder="Enter data to save..."
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            whileFocus={{ scale: 1.01, borderColor: "#a78bfa" }} // Purple border on focus
            transition={{ duration: 0.2 }}
            className="w-full p-4 border bg-neutral-900 text-neutral-300 border-neutral-700 rounded-lg text-start focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none placeholder-neutral-500 font-mono"
          ></motion.textarea>
          <motion.button
            onClick={handleTextEntry}
            disabled={isSubmitting || !inputValue.trim()} // Disable if submitting or input is empty
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className={`mt-6 px-8 py-3 bg-gradient-to-r from-purple-700 to-indigo-700 text-white rounded-full font-semibold shadow-lg
              ${
                isSubmitting || !inputValue.trim()
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:from-purple-600 hover:to-indigo-600 transition duration-300"
              }`}
          >
            {isSubmitting ? "Uploading..." : "Upload to Clipboard"}
          </motion.button>

          <AnimatePresence>
            {codeValue && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="text-neutral-300 items-center mt-6 border border-purple-600 rounded-xl flex flex-row justify-between lg:w-5/12 sm:w-fit p-3 bg-zinc-800 shadow-md"
              >
                <p className="text-lg font-light flex-grow">
                  Your code: <span className="font-bold text-purple-400 select-all">{codeValue}</span>
                </p>
                <CopyButton copyText={codeValue} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Code Entry Section - Assuming CodeEntry is for retrieving code */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
          className="w-full"
        >
          <CodeEntry />
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.8 }}
        className="bg-zinc-900 w-full py-4 text-neutral-400 text-center mt-auto shadow-inner border-t border-neutral-800"
      >
        <p className="text-sm">
          &copy; Shantanu Pandey {new Date().getFullYear()}
        </p>
      </motion.footer>
    </div>
  );
}

export default TextBox;
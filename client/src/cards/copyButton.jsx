import React, { useState } from "react";

const CopyButton = ({ copyText }) => {
  const [copyButtonText, setCopyButtonText] = useState("copy");

  const copy = () => {
    navigator.clipboard.writeText(copyText).then(() => {
      try {
        console.log("text copied!");
        setCopyButtonText("copied!");
        setTimeout(() => {
          setCopyButtonText("copy");
        }, 2000);
      } catch (err) {
        console.log("error while copying text : " + err);
      }
    });
  };
  return (
    <div className=" px-5 py-2 m-2 text-white rounded-xl hover:rounded-full mr-2 bg-gptGray-900 hover:bg-gptGray-400 transition duration-300">
      <button onClick={copy}>{copyButtonText}</button>
    </div>
  );
};

export default CopyButton;

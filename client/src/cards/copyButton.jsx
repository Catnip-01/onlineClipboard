import React, { useState } from "react";

const CopyButton = ({ copyText }) => {
  const [copyButtonText, setCopyButtonText] = useState("copy");

  const copy = () => {
    navigator.clipboard.writeText(copyText).then(() => {
      try {
        console.log("text copied!");
        setCopyButtonText("copied!");
      } catch (err) {
        console.log("error while copying text : " + err);
      }
    });
  };
  return (
    <div>
      <button onClick={copy}>{copyButtonText}</button>
    </div>
  );
};

export default CopyButton;

import React, { useState, useRef } from "react";
import "./App.css";
import JoditEditor from "jodit-react";

import Reader from "./Reader.jsx";

function App() {
  const [content, setContent] = useState("");

  const editor = useRef(null);

  console.log(content, "content");
  return (
    <div className="App">
      <h1> File Editor</h1>

      <JoditEditor
        ref={editor}
        value={content}
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => {}}
      />

      <Reader pdfText={content} setPdfText={setContent} />
    </div>
  );
}

export default App;

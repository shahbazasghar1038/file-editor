import React from "react";
import { useDropzone } from "react-dropzone";

window.pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js";

const PdfTextExtractor = (props) => {
  const extractText = async (url) => {
    let alltext = [];
    let pdf = await window.pdfjsLib.getDocument(url).promise;
    let pages = pdf.numPages; // Get the total number of pages in the PDF
    for (let i = 1; i <= pages; i++) {
      let page = await pdf.getPage(i); // Get the page object for each page
      let txt = await page.getTextContent(); // Get the text content of the page
      let text = txt.items.map((s) => s.str).join(""); // Concatenate the text items into a single string
      alltext.push(text); // Add the extracted text to the array
    }
    props?.setPdfText(alltext.join(""));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        if (file) {
          let ext = file.name.split(".");
          let fr = new FileReader();
          if (ext[1] === "pdf") {
            fr.readAsDataURL(file); // Read the file as data URL
            fr.onload = () => {
              let res = fr.result; // Get the result of file reading
              extractText(res, false); // Extract text without a password
            };
          }
          if (ext[1] === "txt") {
            fr.readAsText(file);
            fr.onload = function (oFREvent) {
              props?.setPdfText(oFREvent.target.result);
            };
          }
        }
      }
    },
  });

  return (
    <div {...getRootProps()} className="file-uploader">
      <input {...getInputProps()} />
      <p>Drag & drop a file here, or click to select a file</p>
    </div>
  );
};

export default PdfTextExtractor;

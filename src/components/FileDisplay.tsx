import config from "../config";
import "./SongDisplay.css";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const csrfToken = document.cookie
  .split("; ")
  .find((row) => row.startsWith("CSRF-TOKEN"))
  ?.split("=")[1];

const axiosConfig = {
  withCredentials: true,
  headers: { "X-CSRF-TOKEN": csrfToken },
  timeout: 15000,
};

interface PagesProps {
  page: number;
}

const getFile = async (setFile: Function, setMessage: Function) => {
  const id = document.URL.split("/").reverse()[0];
  try {
    const res = await axios.get(
      `${config.API_ROOT}/songs/files/${id}`,
      axiosConfig
    );
    const file = res.data;
    console.log(file);
    setFile(file.file);
  } catch (err) {
    setMessage("We can't retrieve the file right now. Sorry!");
    console.log(err);
  }
};

const FileDisplay: React.FC<PagesProps> = ({ page }) => {
  const [file, setFile] = useState<File | undefined>();
  const [numPages, setNumPages] = useState(1);
  const [message, setMessage] = useState("Fetching file...");

  useEffect(() => {
    getFile(setFile, setMessage);
  }, []);

  const onDocumentLoadSuccess = (numPages: any) => {
    setNumPages(numPages._pdfInfo.numPages);
  };

  return (
    <div>
      {file && (
        <Document
          file={`data:application/pdf;base64,${file.toString()}`}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page
            pageNumber={page <= numPages ? page : page - page}
            renderAnnotationLayer={false}
            width={500}
          />
        </Document>
      )}
      {!file && <div className="loading">{message}</div>}
    </div>
  );
};

export default FileDisplay;

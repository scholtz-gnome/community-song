import "../App.css";
import "./SongDisplay.css";
import Song from "../interfaces/SongInterface";
import { useEffect, useState } from "react";
import config from "../config";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const getSong = async (setSongs: Function) => {
  const id = document.URL.split("/").reverse()[0];
  try {
    const res = await axios.get(`${config.API_ROOT}/songs/${id}`);
    const song = res.data;
    setSongs(song);
  } catch (err) {
    console.log(err);
  }
};

const SongDisplay: React.FC = () => {
  const [song, setSong] = useState<Song | undefined>();

  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess(numPages: any) {
    setNumPages(numPages._pdfInfo.numPages);
  }

  useEffect(() => {
    getSong(setSong);
  }, []);

  return (
    <div>
      <header>
        <h1>{song?.title}</h1>
        <h3>{song?.artist}</h3>
      </header>
      <main className="outline">
        {song && (
          <div className="song">
            <div className="songInfo">
              <p>Title: {song.title}</p>
              <p>Artist: {song.artist}</p>
              <p>Added by: {song.first_name}</p>
              <img src={song.profile_pic} alt={song.first_name} />
              <p>
                Page: {pageNumber} of {numPages}
              </p>
              <div className="buttons">
                <button
                  className="button"
                  onClick={() =>
                    pageNumber > 1
                      ? setPageNumber(pageNumber - 1)
                      : setPageNumber(1)
                  }
                >
                  -
                </button>
                <button
                  className="button"
                  onClick={() =>
                    pageNumber < numPages
                      ? setPageNumber(pageNumber + 1)
                      : setPageNumber(numPages)
                  }
                >
                  +
                </button>
              </div>
            </div>
            <Document
              file={`data:application/pdf;base64,${song.file.toString()}`}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page
                pageNumber={pageNumber}
                renderAnnotationLayer={false}
                loading={<div className="loading"></div>}
              />
            </Document>
          </div>
        )}
      </main>
    </div>
  );
};

export default SongDisplay;

import "../App.css";
import "./SongDisplay.css";
import "./info.css";
import "./side-panel.css";
import Song from "../interfaces/Song";
import UserProps from "../interfaces/UserProps";
import { useEffect, useState } from "react";
import config from "../config";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
import SkeletonDisplaySong from "../skeletons/SkeletonDisplaySong";
import SkeletonTitle from "../skeletons/SkeletonTitle";
import Create from "./Create";

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

const SongDisplay: React.FC<UserProps> = ({ user }) => {
  const [song, setSong] = useState<Song | undefined>();

  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [field, setField] = useState("view");

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
        {!song && <SkeletonTitle />}
      </header>
      <main className="outline">
        {!song && <SkeletonDisplaySong />}
        {song && (
          <div className="side-panel">
            <div className="info">
              <p>Title: {song.title}</p>
              <p>Artist: {song.artist}</p>
              <p>Added by: {song.firstName}</p>
              <img src={song.profilePic} alt={song.firstName} />
              {song.file && (
                <div>
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
              )}
              {song.email === user?.email && (
                <div>
                  {field === "view" && (
                    <div className="edit" onClick={() => setField("edit")}>
                      <p>Edit</p>
                    </div>
                  )}
                  {field === "edit" && (
                    <div className="edit" onClick={() => setField("view")}>
                      <p>View</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            {field === "view" && (
              <div>
                {song.file && (
                  <Document
                    file={`data:application/pdf;base64,${song.file.toString()}`}
                    onLoadSuccess={onDocumentLoadSuccess}
                  >
                    <Page
                      pageNumber={pageNumber}
                      renderAnnotationLayer={false}
                      width={500}
                    />
                  </Document>
                )}
                {!song.file && (
                  <div className="loading">
                    There doesn't seem to be a file associated with this song.
                  </div>
                )}
              </div>
            )}
            {field === "edit" && (
              <div>
                <Create />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default SongDisplay;

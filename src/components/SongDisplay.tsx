import config from "../config";
import "../App.css";
import "./SongDisplay.css";
import "./info.css";
import "./side-panel.css";
import Song from "../interfaces/Song";
import UserProps from "../interfaces/UserProps";
import { useEffect, useState } from "react";
import axios from "axios";
import SkeletonDisplaySong from "../skeletons/SkeletonDisplaySong";
import SkeletonTitle from "../skeletons/SkeletonTitle";
import Create from "./Create";
import ProfilePic from "./ProfilePic";
import FileDisplay from "./FileDisplay";

const csrfToken = document.cookie
  .split("; ")
  .find((row) => row.startsWith("CSRF-TOKEN"))
  ?.split("=")[1];

const axiosConfig = {
  withCredentials: true,
  headers: { "X-CSRF-TOKEN": csrfToken },
};

const getSong = async (setSongs: Function) => {
  const id = document.URL.split("/").reverse()[0];
  try {
    const res = await axios.get(`${config.API_ROOT}/songs/${id}`, axiosConfig);
    const song = res.data;
    console.log(song);
    setSongs(song);
  } catch (err) {
    console.log(err);
  }
};

const SongDisplay: React.FC<UserProps> = ({ user }) => {
  const [song, setSong] = useState<Song | undefined>();
  const [field, setField] = useState("view");
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    getSong(setSong);
  }, []);

  const deleteFile = async (songId: number) => {
    try {
      const res = await axios.delete(
        `${config.API_ROOT}/files/${songId}`,
        axiosConfig
      );
      console.log(res.data);
      getSong(setSong);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(song);
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
              <ProfilePic
                picture={song.profilePic}
                color="dark"
                size="small"
                email={song.email}
              />
              {song.email === user?.email && (
                <div>
                  {field === "view" && (
                    <div>
                      <div>
                        {song.url && (
                          <div>
                            <p>Page: {pageNumber}</p>
                            <div className="buttons">
                              <button
                                className="button"
                                onClick={() =>
                                  setPageNumber(
                                    pageNumber <= 1
                                      ? pageNumber
                                      : pageNumber - 1
                                  )
                                }
                              >
                                -
                              </button>
                              <button
                                className="button"
                                onClick={() => setPageNumber(pageNumber + 1)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                      <div>
                        <button onClick={() => deleteFile(song.id)}>
                          DELETE FILE
                        </button>
                      </div>
                      <div className="edit" onClick={() => setField("edit")}>
                        <p>Edit</p>
                      </div>
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
                <FileDisplay page={pageNumber} />
              </div>
            )}
            {field === "edit" && <Create />}
          </div>
        )}
      </main>
    </div>
  );
};

export default SongDisplay;

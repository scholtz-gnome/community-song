import "./form.css";
import "./file-item.css";
import { BaseSyntheticEvent, useState } from "react";
import axios from "axios";
import config from "../config";

const Create: React.FC = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");
  const [songName, setSongName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [message, setMessage] = useState("");
  const [isOpened, setIsOpened] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [submitButtonColor, setSubmitButtonColor] = useState("grey");

  const splitType = (str: string) => str.split("/")[1];

  const onTitleChange = (e: BaseSyntheticEvent) =>
    setTitle(e.target.value.trim());

  const onArtistChange = (e: BaseSyntheticEvent) =>
    setArtist(e.target.value.trim());

  const onSongChange = async (e: BaseSyntheticEvent) => {
    setSong(e.target.files[0]);
    setSongName(e.target.files[0].name);
    setFileSize(e.target.files[0].size);
    const fileSize = e.target.files[0].size;

    if (
      e.target.files[0].type !== "application/pdf" &&
      e.target.files[0].type !== "text/plain"
    ) {
      setMessage(
        `File type ${splitType(e.target.files[0].type)} not supported.`
      );
      setSubmitButtonColor("grey");
      setIsOpened(false);
    } else if (fileSize > 10 * 1024 * 1024) {
      setMessage("File size exceeded. Cannot exceed 10MB.");
      setSubmitButtonColor("grey");
      setIsOpened(false);
    } else {
      setMessage("");
      setFileSize(Math.round((fileSize / 1024 / 1024) * 10) / 10);
      setIsOpened(true);
      setSubmitButtonColor("live");
    }
  };

  const onSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("file", song);

    const url = `${config.API_ROOT}/songs`;
    const axiosConfig = {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent: ProgressEvent) => {
        setIsUploading(true);
        setUploadPercentage(
          Math.round((progressEvent.loaded * 100) / progressEvent.total)
        );
        setMessage("Nearly there...");
      },
    };

    if (message === "") {
      if (title !== "" && artist !== "") {
        try {
          const res = await axios.post(url, formData, axiosConfig);
          setMessage(res.data.message);
        } catch (err) {
          setMessage("Server error");
        }
      } else {
        setMessage("Don't leave those inputs empty.");
      }
    }
  };

  return (
    <div>
      <header>
        <h1>Create</h1>
        <h3>Create a song and upload it to community song</h3>
      </header>
      <main className="outline">
        <form onSubmit={onSubmit}>
          <div>
            <label className="labelName">Song title</label>
            <input
              type="text"
              name="title"
              required
              autoFocus
              onChange={onTitleChange}
            />
          </div>
          <div>
            <label className="labelName">Artist</label>
            <input
              type="text"
              name="artist"
              required
              onChange={onArtistChange}
            />
          </div>
          <div>
            <label className="labelName">File</label>
            <label htmlFor="upload" className="upload">
              Choose File
            </label>
            <input
              id="upload"
              type="file"
              name="song"
              required
              onChange={onSongChange}
            />
          </div>
          {isOpened && (
            <div className="file-item">
              {songName}
              <div>{fileSize}MB</div>
            </div>
          )}
          <div>
            <button className={submitButtonColor}>Create</button>
          </div>
          {isUploading && (
            <div
              className="uploadPercentage"
              style={{ width: `${uploadPercentage}%` }}
            >
              {uploadPercentage}%
            </div>
          )}
          <div className="message">{message}</div>
        </form>
      </main>
    </div>
  );
};

export default Create;

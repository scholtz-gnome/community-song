import "./form.css";
import "./file-item.css";
import { BaseSyntheticEvent, useState } from "react";
import axios from "axios";
import config from "../config";

const splitType = (str: string) => str.split("/")[1];
const csrfToken = document.cookie
  .split("; ")
  .find((row) => row.startsWith("CSRF-TOKEN"))
  ?.split("=")[1];

const Create: React.FC = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("unknown artist");
  const [song, setSong] = useState("");
  const [songName, setSongName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [message, setMessage] = useState("");
  const [isOpened, setIsOpened] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [submitButtonColor, setSubmitButtonColor] = useState("grey");

  const onTitleChange = (e: BaseSyntheticEvent) => {
    const trimmedTitle: string = e.target.value.trim();
    setTitle(trimmedTitle);
    if (trimmedTitle) {
      setSubmitButtonColor("live");
    } else {
      setSubmitButtonColor("grey");
    }
  };

  const onArtistChange = (e: BaseSyntheticEvent) => {
    const trimmedArtist: string = e.target.value.trim();
    if (!trimmedArtist) {
      setArtist("unknown artist");
    } else {
      setArtist(trimmedArtist);
    }
  };

  const onSongChange = async (e: BaseSyntheticEvent) => {
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
      setSong(e.target.files[0]);
      setSongName(e.target.files[0].name);
      setFileSize(Math.round((fileSize / 1024 / 1024) * 10) / 10);
      setMessage("");
      setIsOpened(true);
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
      headers: {
        "Content-Type": "multipart/form-data",
        "X-CSRF-TOKEN": csrfToken,
      },
      onUploadProgress: (progressEvent: ProgressEvent) => {
        setIsUploading(true);
        setUploadPercentage(
          Math.round((progressEvent.loaded * 100) / progressEvent.total)
        );
        setMessage("Nearly there...");
      },
    };

    if (message === "") {
      if (title !== "") {
        try {
          const res = await axios.post(url, formData, axiosConfig);
          setMessage(res.data.message);
        } catch (err) {
          setMessage("Server error");
        }
      } else {
        setMessage("You must at least provide a title");
      }
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label className="labelName">Song title</label>
          <input type="text" name="title" required onInput={onTitleChange} />
        </div>
        <div>
          <label className="labelName">Artist</label>
          <input type="text" name="artist" onChange={onArtistChange} />
        </div>
        <div>
          <label className="labelName">File</label>
          <label htmlFor="upload" className="upload">
            Choose File
          </label>
          <input id="upload" type="file" name="song" onInput={onSongChange} />
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
    </div>
  );
};

export default Create;

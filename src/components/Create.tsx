import "./Create.css";
import { BaseSyntheticEvent, useState } from "react";
import "./form.css";
import axios from "axios";

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

  const splitType = (str: string) => {
    return str.split("/")[1];
  };

  const onTitleChange = (e: BaseSyntheticEvent) => {
    setTitle(e.target.value.trim());
  };

  const onArtistChange = (e: BaseSyntheticEvent) => {
    setArtist(e.target.value.trim());
  };

  const onSongChange = (e: BaseSyntheticEvent) => {
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
    } else if (fileSize > 10 * 1024 * 1024) {
      setMessage("File size exceeded. Cannot exceed 10MB.");
    } else {
      setMessage("");
      setFileSize(Math.round((fileSize / 1024 / 1024) * 10) / 10);
      setIsOpened(true);
    }
  };

  const onSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("file", song);

    const url = "https://community-song-api.herokuapp.com/songs/";
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent: ProgressEvent) => {
        setIsUploading(true);
        setUploadPercentage(
          Math.round((progressEvent.loaded * 100) / progressEvent.total)
        );
      },
    };

    if (title !== "" && artist !== "") {
      try {
        const res = await axios.post(url, formData, config);
        setMessage(res.data.message);
      } catch (err) {
        setMessage("Server error");
      }
    } else {
      setMessage("Don't leave those inputs empty.");
    }
  };

  return (
    <div className="create outline">
      <header>
        <h1>Create</h1>
        <h3>Create a song and upload it to community song</h3>
      </header>
      <form onSubmit={onSubmit}>
        <div>
          <label>Song title</label>
          <input
            type="text"
            name="title"
            required
            autoFocus
            onChange={onTitleChange}
          />
        </div>
        <div>
          <label>Artist</label>
          <input type="text" name="artist" required onChange={onArtistChange} />
        </div>
        <div>
          <label>Upload</label>
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
          <div className="files">
            <div>
              {songName}
              <div>{fileSize}MB</div>
            </div>
          </div>
        )}
        <div>{message}</div>
        <div>
          <button>Create</button>
        </div>
        {isUploading && (
          <div
            className="uploadPercentage"
            style={{ width: `${uploadPercentage}%` }}
          >
            {uploadPercentage}%
          </div>
        )}
      </form>
    </div>
  );
};

export default Create;

import "./Create.css";
import { useState } from "react";
import "./form.css";

const Create: React.FC = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");
  const [songName, setSongName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [message, setMessage] = useState("");
  const [isOpened, setIsOpened] = useState(false);

  const onTitleChange = (e: any) => {
    setTitle(e.target.value.trim());
  };

  const onArtistChange = (e: any) => {
    setArtist(e.target.value);
  };

  const onSongChange = (e: any) => {
    setIsOpened(true);
    setSong(e.target.files[0]);
    setSongName(e.target.files[0].name);
    const fileSize = e.target.files[0].size;
    setFileSize(Math.round((fileSize / 1024 / 1024) * 10) / 10);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("file", song);

    if (title !== "" && artist !== "") {
      try {
        const res = await fetch("http://localhost:4000/songs/", {
          method: "POST",
          body: formData,
        });

        const json = await res.json();
        setMessage(json.message);
        console.log(song);
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
      </form>
    </div>
  );
};

export default Create;

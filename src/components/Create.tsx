import "./Create.css";
import { useState } from "react";

const Create: React.FC = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");

  const onTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const onArtistChange = (e: any) => {
    setArtist(e.target.value);
  };

  const onSongChange = (e: any) => {
    setSong(e.target.files[0]);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("file", song);

    const res = await fetch("http://localhost:4000/songs/", {
      method: "POST",
      body: formData,
    });

    const json = await res.json();
    console.log(json);
  };

  return (
    <div className="create">
      <h1>Create</h1>
      <h3>Create a song and upload it to community song</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label>Song title</label>
          <input type="text" name="title" required onChange={onTitleChange} />
        </div>
        <div>
          <label>Artist</label>
          <input type="text" name="artist" required onChange={onArtistChange} />
        </div>
        <div>
          <label>Song</label>
          <input type="file" name="song" required onChange={onSongChange} />
        </div>
        <div>
          <button>Create</button>
        </div>
      </form>
    </div>
  );
};

export default Create;

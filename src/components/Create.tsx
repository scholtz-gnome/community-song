import { useState } from "react";
import "./Create.css";
export interface CreateProps {}

const Create: React.FC<CreateProps> = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");

  return (
    <div className="create">
      <h1>Create</h1>
      <h3>Create a song and upload it to community song</h3>
      <form>
        <div>
          <label>Song title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Artist</label>
          <input
            type="text"
            required
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
        </div>
        <div>
          <label>Upload</label>
          <input type="file" required />
        </div>
      </form>
    </div>
  );
};

export default Create;

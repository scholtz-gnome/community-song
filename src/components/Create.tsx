import "./Create.css";
export interface CreateProps {}

const Create: React.FC<CreateProps> = () => {
  return (
    <div className="create">
      <h1>Create</h1>
      <h3>Create a song and upload it to community song</h3>
      <form>
        <div>
          <label>Song name</label>
          <input type="text" required />
        </div>
        <div>
          <label>Artist</label>
          <input type="text" required />
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

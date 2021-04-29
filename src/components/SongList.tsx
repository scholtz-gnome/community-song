import "../App.css";
import "./file-item.css";
import SkeletonSong from "../skeletons/SkeletonSong";
import Song from "../interfaces/Song";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import config from "../config";
import axios from "axios";

const getSongs = async (setSongs: Function) => {
  try {
    const res = await axios.get(`${config.API_ROOT}/songs`, {
      withCredentials: true,
    });
    const songs = res.data.songs;
    console.log(res.data);
    setSongs(songs);
  } catch (err) {
    console.log(err);
  }
};

const SongList: React.FC = () => {
  const [songs, setSongs] = useState<Song[] | undefined>(undefined);

  useEffect(() => {
    getSongs(setSongs);
  }, []);

  return (
    <div>
      <div className="file-item">
        <Link to="/create">
          <div>
            <p>Create</p>
          </div>
        </Link>
      </div>
      {!songs && [1, 2, 3, 4, 5].map((i) => <SkeletonSong key={i} />)}
      {songs &&
        songs.map((song, index) => (
          <div className="file-item" key={index}>
            <Link to={`/songs/${song.id}`}>
              <p>Title: {song.title}</p>
              <p>Artist: {song.artist}</p>
              <p>Added by: {song.firstName}</p>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default SongList;

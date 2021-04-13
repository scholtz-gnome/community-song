import "./SongList.css";
import "../App.css";
import Song from "../interfaces/SongInterface";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import config from "../config";
import axios from "axios";

const getSongs = async (setSongs: Function) => {
  try {
    const res = await axios.get(`${config.API_ROOT}/songs`);
    const songs = res.data;
    setSongs(songs);
  } catch (err) {
    console.log(err);
  }
};

const SongList: React.FC = () => {
  const [songs, setSongs] = useState<Song[] | undefined>([]);

  useEffect(() => {
    getSongs(setSongs);
  }, []);

  return (
    <div className="outline">
      <ul>
        {songs &&
          songs.map((song, index) => (
            <li className="song-item" key={index}>
              <div className="song-box">
                <Link to={`/songs/${index + 1}`}>
                  <p>Title: {song.title}</p>
                  <p>Artist: {song.artist}</p>
                  <p>Added by: {song.first_name}</p>
                </Link>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SongList;

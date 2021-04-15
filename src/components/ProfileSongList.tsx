import "../App.css";
import "./file-item.css";
import Song from "../interfaces/SongInterface";
import User from "../interfaces/UserInterface";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import config from "../config";
import axios from "axios";

interface UserProps {
  user: User | undefined;
}

const getProfileSongs = async (
  setSongs: Function,
  email: string | undefined
) => {
  try {
    const res = await axios.get(
      `${config.API_ROOT}/songs/profileSongs/${email}`
    );
    const profileSongs = res.data;
    setSongs(profileSongs);
  } catch (err) {
    console.log(err);
  }
};

const ProfileSongList: React.FC<UserProps> = ({ user }) => {
  const [songs, setSongs] = useState<Song[] | undefined>(undefined);

  useEffect(() => {
    getProfileSongs(setSongs, user?.email);
  }, [user]);

  const deleteSong = (songId: number, title: string) => {
    try {
      axios.delete(`${config.API_ROOT}/songs/${songId}`);
      const newList = songs?.filter((song) => {
        return song.title !== title;
      });
      setSongs(newList);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="file-item">
        <Link to="/create">
          <div>
            <p>Create</p>
          </div>
        </Link>
      </div>
      {songs &&
        songs.map((song, index) => (
          <div key={index}>
            {user?.email === song.email && (
              <div className="file-item">
                <Link to={`/songs/${song.id}`}>
                  <div>
                    <p>Title: {song.title}</p>
                    <p>Artist: {song.artist}</p>
                    <p>Added by: {song.first_name}</p>
                  </div>
                </Link>
                <div>
                  <button onClick={() => deleteSong(song.id, song.title)}>
                    DELETE
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default ProfileSongList;

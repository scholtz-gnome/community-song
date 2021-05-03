import "../App.css";
import "./file-item.css";
import SkeletonProfileSong from "../skeletons/SkeletonProfileSong";
import Song from "../interfaces/Song";
import UserProps from "../interfaces/UserProps";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import config from "../config";
import axios from "axios";

const csrfToken = document.cookie
  .split("; ")
  .find((row) => row.startsWith("CSRF-TOKEN"))
  ?.split("=")[1];
const axiosConfig = {
  withCredentials: true,
  headers: { "X-CSRF-TOKEN": csrfToken },
};
const getProfileSongs = async (
  setSongs: Function,
  email: string | undefined
) => {
  try {
    const res = await axios.get(
      `${config.API_ROOT}/songs/profileSongs/${email}`,
      axiosConfig
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

  const deleteSong = async (songId: number, title: string) => {
    try {
      const res = await axios.delete(
        `${config.API_ROOT}/songs/song/${songId}`,
        axiosConfig
      );
      const newList = songs?.filter((song) => {
        return song.title !== title;
      });
      console.log(res.data);
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
      {!songs && [1, 2, 3].map((i) => <SkeletonProfileSong key={i} />)}
      {songs &&
        songs.map((song, index) => (
          <div key={index}>
            {user?.email === song.email && (
              <div className="file-item">
                <Link to={`/songs/${song.id}`}>
                  <div>
                    <p>Title: {song.title}</p>
                    <p>Artist: {song.artist}</p>
                    <p>Added by: {song.firstName}</p>
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

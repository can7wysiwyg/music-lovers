import { GlobalState } from "../../GlobalState";
import { useContext, useState } from "react";
import axios from "axios";

function UploadSongHere({ item }) {
  const state = useContext(GlobalState);
  const [token] = state.token;
  let toMusic = item._id;
  let [track, setTrack] = useState({
    artistname: "",
    songArtwork: "",
    songGenre: "",
    song: false,
    songTitle: "",
    songTag: "",
    released: "",
  });

  

  const handleChange = (event) => {
    if (event.target.name === "song") {
      setTrack({ [event.target.name]: event.target.files[0] });
    } else {
      const { name, value } = event.target;
      setTrack({ ...track, [name]: value });
    }
  };



  const handleSubmit = async (event) => {
    event.preventDefault();

    let formData = new FormData();
    

    formData.append("artistName", track.artistName);
    formData.append("songArtwork", track.songArtwork = toMusic);
    formData.append("song", track.song);
    formData.append("songGenre", track.songGenre);
    formData.append("songTitle", track.songTitle);
    formData.append("songTag", track.songTag);
    formData.append("released", track.released);

    const res = await axios.post("/music/upload", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert(res.data.msg);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row">
        <input type="file" name="song" onChange={handleChange} />
        </div>
        <div className="row">
        <input
          type="text"
          name="artistName"
          value={track.artistname}
          onChange={handleChange}
          id="artistName"
          placeholder="Artist Name"
          required
        />
        </div>
        <div className="row">

        <input
          type="text"
          name="songGenre"
          value={track.songGenre}
          onChange={handleChange}
          id="songGenre"
          placeholder="song genre"
          required
        />

        </div>
        <div className="row">
        
        <input
          type="text"
          name="songTitle"
          value={track.songTitle}
          onChange={handleChange}
          id="songTitle"
          placeholder="song title"
          required
        />
        </div>
        <div className="row">
        
        <input
          type="text"
          name="songTag"
          value={track.songTag}
          onChange={handleChange}
          id="songTag"
          placeholder="song tag"
          required
        />
        </div>



<div className="row">
        
        <input
          type="text"
          name="released"
          value={track.released}
          onChange={handleChange}
          id="released"
          placeholder="song release date"
          required
        />
        </div>

<button type="submit">Create</button>

      </form>
    </div>
  );
}

export default UploadSongHere;

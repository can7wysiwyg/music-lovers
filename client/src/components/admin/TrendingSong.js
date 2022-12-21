import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import { Row, Col, Panel, FlexboxGrid, Button, ButtonToolbar } from "rsuite";

function TrendingSong() {
  const { id } = useParams();
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [toCompare, setToCompare] = useState([]);
  const [songIdentify, setSongIdentify] = useState([]);
  const [songIdentifier, setSongIdentifier] = useState("");
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    const getWork = async () => {
      const res = await axios.get("/artwork/show_all");

      setImages(res.data.results);
    };

    getWork();
  }, []);

  useEffect(() => {
    if (songIdentify.songArtwork) {
      images.forEach((image) => {
        if (image._id === songIdentify.songArtwork) setNewImages(image);
      });
    }
  }, [images, songIdentify.songArtwork]);

  useEffect(() => {
    const getSongsToCompare = async () => {
      const res = await axios.get("/trending/show_songs");

      setToCompare(res.data.results);
    };

    getSongsToCompare();
  }, []);

  useEffect(() => {
    if (id) {
      toCompare.forEach((twin) => {
        if (twin._id === id) {
          setSongIdentify(twin);
          setSongIdentifier(songIdentify._id);
        }
      });
    }
  }, [id, toCompare, songIdentify._id]);

  if (newImages.length === 0) return null;

  const picture = newImages.songArtwork.data.data;

  const base64StringPhoto = window.btoa(
    new Uint8Array(picture).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );

  const trendingSongCreate = async (event) => {
    event.preventDefault();

    const res = await axios.post(
      "/trending/create_trending_song",
      { songIdentifier },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(res.data.msg);

    window.location.href = "/trending_tracks";
  };

  const jam = songIdentify.song.data.data;

  const base64String = window.btoa(
    new Uint8Array(jam).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );

  return (
    <>
      <div className="news">
        <Row className="features p-0 mx-6 mx-md-auto">
          <div className="heading mb-3 w-75 mx-auto">
            <p>Create Trending Song</p>

            <hr />
          </div>
          <FlexboxGrid justify="center">
            <Col xs={24} md={12} className="p-0 p-md-3 feature">
              <Panel className="mb-3 news-card" shaded>
                <img
                  src={`data:image/jpg;base64, ${base64StringPhoto}`}
                  width="37%"
                  alt={songIdentify.artistName}
                />
                <div className="news-card-body">
                  <h3>{songIdentify.artistName}</h3>
                  <h3>{songIdentify.songGenre}</h3>
                  <h3>{songIdentify.songTitle}</h3>
                  <h3>{songIdentify.released}</h3>
                  <audio
                    src={`data:audio/mp3;base64, ${base64String}`}
                    controls
                  />
                      
      <button  onClick={trendingSongCreate} className="text-center btn btn-warning" >
      create trending song
      </button>
      

                </div>
              </Panel>
            </Col>
          </FlexboxGrid>
        </Row>
      </div>

      {/* 


 */}
    </>
  );
}

export default TrendingSong;

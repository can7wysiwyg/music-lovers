import { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Panel } from "rsuite";
import { Link } from "react-router-dom";

function Music() {
  // const[songs, setSongs] = useState([])

  // useEffect(() => {
  //     const getSongs = async() => {
  //         const res = await axios.get('/music/show_all')

  //         setSongs(res.data.music)

  //     }

  //     getSongs()

  // }, [])

  return (
    <div>
      <div className="news">
        <Row className="features p-0 mx-4 mx-md-auto">
          <div className="heading mb-3 w-75 mx-auto">
            <h3> Music</h3>
            <p>
              The Best Music In The Land!!
            </p>
            <hr />
          </div>
          <TrapMusic />
          <HipHopMusic />
          <DanceHallMusic />
        </Row>
      </div>
    </div>
  );
}

const TrapMusic = () => {
  const [showTrap, setShowTrap] = useState([]);

  useEffect(() => {
    const showTrapMusic = async () => {
      const res = await axios.get("/music/show_trap");

      setShowTrap(res.data.results);
    };

    showTrapMusic();
  }, []);

  return (
    <>
      {showTrap?.map((trapSong, index) => {
        return <TrapSong key={index} trapSong={trapSong} />;
      })}
    </>
  );
};

const TrapSong = ({ trapSong }) => {
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
    if (trapSong.songArtwork) {
      images.forEach((image) => {
        if (image._id === trapSong.songArtwork) setNewImages(image);
      });
    }
  }, [images, trapSong.songArtwork]);

  if (newImages.length === 0) return null;

  const picture = newImages.songArtwork.data.data;

  const base64StringPhoto = window.btoa(
    new Uint8Array(picture).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );

  
  return (
    <>
      <Col xs={24} md={8} className="p-0 p-md-3 feature">
        <Panel className="mb-3 news-card" shaded>
          <img
            src={`data:image/jpg;base64, ${base64StringPhoto}`}
            width="100%"
            alt={trapSong.artistName}
          />
          <div className="news-card-body">
            <h4>
              <small>artist</small>: {trapSong.artistName}
            </h4>
            <h4>
              <small>song</small> :{" "}
              <Link to={`/single_new_song/${trapSong._id}`}>
                {" "}
                {trapSong.songTitle}{" "}
              </Link>
            </h4>
          </div>
        </Panel>
      </Col>
    </>
  );
};

const HipHopMusic = () => {

    const[showHipHop, setShowHipHop] = useState([])

    useEffect(() => {

        const showHipHopMusic = async() => {
            const res = await axios.get('/music/show_hip_hop')

            setShowHipHop(res.data.results);

        }

        showHipHopMusic()


    }, [])


    return(<>

{
    showHipHop?.map((hipHopSong, index) => {
        return <HipHopSong key={index} hipHopSong={hipHopSong} />
    })
}

    
    
    </>)
}

const HipHopSong = ({hipHopSong}) => {

    const[images, setImages] = useState([])
    const[newImages, setNewImages] = useState([])

    useEffect(() => {

        const getWork = async () => {

            const res = await axios.get("/artwork/show_all")

            setImages(res.data.results);

        }

        getWork()


 
    }, [])

    useEffect(() => {

        if(hipHopSong.songArtwork) {
            images.forEach((image) => {
                if(image._id === hipHopSong.songArtwork) setNewImages(image)

            })

        }


    }, [images, hipHopSong.songArtwork])

    if(newImages.length === 0) return null

    
  const picture = newImages.songArtwork.data.data



   const base64StringPhoto =  window.btoa(
    new Uint8Array(picture)
      .reduce((data, byte) => data + String.fromCharCode(byte), '')
  );

 
    return(<>
    <Col xs={24} md={8} className="p-0 p-md-3 feature">
        <Panel className="mb-3 news-card" shaded>
          <img
            src={`data:image/jpg;base64, ${base64StringPhoto}`}
            width="100%"
            alt={hipHopSong.artistName}
          />
          <div className="news-card-body">
            <h4>
              <small>artist</small>: {hipHopSong.artistName}
            </h4>
            <h4>
              <small>song</small> :{" "}
              <Link to={`/single_new_song/${hipHopSong._id}`}>
                {" "}
                {hipHopSong.songTitle}{" "}
              </Link>
            </h4>
          </div>
        </Panel>
      </Col>
    
    
    
    </>)
}

const DanceHallMusic = () => {
    const[showDancehall, setShowDancehall] = useState([])

    useEffect(() => {

        const showDancehallMusic = async() => {
            const res = await axios.get('/music/show_dancehall')

            setShowDancehall(res.data.results);

        }

        showDancehallMusic()


    }, [])




return(<>

{
    showDancehall?.map((dancehallSong, index) => {
        return <DancehallSong key={index} dancehallSong={dancehallSong} />
    })
}

    
    
    </>)
}

const DancehallSong = ({dancehallSong}) => {

    console.log(dancehallSong);

    const[images, setImages] = useState([])
    const[newImages, setNewImages] = useState([])

    useEffect(() => {

        const getWork = async () => {

            const res = await axios.get("/artwork/show_all")

            setImages(res.data.results);

        }

        getWork()


 
    }, [])

    useEffect(() => {

        if(dancehallSong.songArtwork) {
            images.forEach((image) => {
                if(image._id === dancehallSong.songArtwork) setNewImages(image)

            })

        }


    }, [images, dancehallSong.songArtwork])

    if(newImages.length === 0) return null

    
  const picture = newImages.songArtwork.data.data



   const base64StringPhoto =  window.btoa(
    new Uint8Array(picture)
      .reduce((data, byte) => data + String.fromCharCode(byte), '')
  );

 
    return(<>

<Col xs={24} md={8} className="p-0 p-md-3 feature">
        <Panel className="mb-3 news-card" shaded>
          <img
            src={`data:image/jpg;base64, ${base64StringPhoto}`}
            width="100%"
            alt={dancehallSong.artistName}
          />
          <div className="news-card-body">
            <h4>
              <small>artist</small>: {dancehallSong.artistName}
            </h4>
            <h4>
              <small>song</small> :{" "}
              <Link to={`/single_new_song/${dancehallSong._id}`}>
                {" "}
                {dancehallSong.songTitle}{" "}
              </Link>
            </h4>
          </div>
        </Panel>
      </Col>
 
    
    
    
    </>)

}


export default Music;

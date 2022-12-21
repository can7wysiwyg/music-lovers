import { useEffect, useState } from "react"
import axios from 'axios'
import { Row, Col, Panel } from 'rsuite'
import {Link} from "react-router-dom"

function NewMusic() {
    return(
    <>
    <div className="news">
                <Row className="features p-0 mx-4 mx-md-auto">
                    <div className="heading mb-3 w-75 mx-auto">
                        <h3>New Music</h3>
                        <p>Check Out The Just Released Songs By The Best Malawian Artists!!!</p>
                        <hr />
                    </div>
                    <NewsContent />
                </Row>
            </div>

                
   </>
        
    
    
    )
}


const NewsContent = () => {
    const[newTracks, setNewTracks] = useState([])
 
    useEffect(() => {

        const getNewTracks = async() => {
            const res = await axios.get('/new_song/show')

            setNewTracks(res.data.results)

        }

        getNewTracks()


    }, [])






    return(<>

        
    
    {
    newTracks?.map((newTrack, index) => {

        return <NewSongsContent key={index} newTrack={newTrack} />

    })
}

    
    
    </>)
}


const NewSongsContent = ({newTrack}) => {
    const [allSongs, setAllSongs] = useState([])
    const [newAllSongs, setNewAllSongs] = useState([])

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

       const getAllSongs = async () => {

        const res = await axios.get('/music/show_all')

        setAllSongs(res.data.music);

       }

       getAllSongs()



    }, [])

    useEffect(() => {

        if(newTrack.newSongIdentifier) {

            allSongs.forEach((allSong) => {
                if(allSong._id === newTrack.newSongIdentifier) setNewAllSongs(allSong)
            })

        }


    }, [allSongs, newTrack.newSongIdentifier])


    useEffect(() => {

        if(newAllSongs.songArtwork) {
            images.forEach((image) => {
                if(image._id === newAllSongs.songArtwork) setNewImages(image)

            })

        }


    }, [images, newAllSongs.songArtwork])



if(newImages.length === 0) return null
    

    const picture = newImages.songArtwork.data.data



    const base64StringPhoto =  window.btoa(
     new Uint8Array(picture)
       .reduce((data, byte) => data + String.fromCharCode(byte), '')
   );
 


    return(<>
    
    <Col xs={24} md={8} className="p-0 p-md-3 feature" >
                            <Panel className="mb-3 news-card" shaded>
                            <img src={`data:image/jpg;base64, ${base64StringPhoto}`} width="100%"  alt={newAllSongs.artistName} />
                                <div className="news-card-body">
                                    <h4><small>artist</small>: {newAllSongs.artistName}</h4>
                                    <h4><small>song</small> : <Link to={`/single_new_song/${newAllSongs._id}`}> {newAllSongs.songTitle} </Link></h4>
                                   
                                </div>
                            </Panel>
                        </Col>

    
    
    
    </>)
}





export default NewMusic
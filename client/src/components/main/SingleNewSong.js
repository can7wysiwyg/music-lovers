import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { Row, Col, Panel, FlexboxGrid } from 'rsuite'


function SingleNewSong() {
    const {id} = useParams()
    const[songs, setSongs] = useState([])
    const [newAllSongs, setNewAllSongs] = useState([])


    useEffect(() => {
        const getSongs = async() => {
            const res = await axios.get('/music/show_all')

            setSongs(res.data.music)

        }

        getSongs()


    }, [])


useEffect(() => {

    if(id) {
        songs.forEach((song) => {
            if(song._id === id) setNewAllSongs(song)

        })
    }

}, [id, songs] )



    return(<>
<div className="news">
    
                <Row className="features p-0 mx-6 mx-md-auto">
                    <div className="heading mb-3 w-75 mx-auto">
                        
                        <hr />
                    </div>
                    <FlexboxGrid justify="center">
                    <Single newAllSongs={newAllSongs} />

                    </FlexboxGrid>
                </Row>
            
            </div>



    
    
    </>)
}


const Single = ({newAllSongs}) => {

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

        if(newAllSongs.songArtwork) {

            images.forEach((image) => {
                if(image._id === newAllSongs.songArtwork) setNewImages(image)
            })

        }


    }, [newAllSongs.songArtwork, images])


    if(newImages.length === 0) return null
    

    const picture = newImages.songArtwork.data.data



    const base64StringPhoto =  window.btoa(
     new Uint8Array(picture)
       .reduce((data, byte) => data + String.fromCharCode(byte), '')
   );


   if(newAllSongs.length === 0) return null

   const jam = newAllSongs.song.data.data

   const base64String =  window.btoa(
     new Uint8Array(jam)
       .reduce((data, byte) => data + String.fromCharCode(byte), '')
   )
 

   





    return(<>
    <Col xs={24} md={12} className="p-0 p-md-3 feature" >
                            <Panel className="mb-3 news-card" shaded>
                            <img src={`data:image/jpg;base64, ${base64StringPhoto}`} width="100%"  alt={newAllSongs.artistName} />
                                <div className="news-card-body">
                                    <h4><small>artist</small>: {newAllSongs.artistName}</h4>
                                    <h4> <small>genre</small>: {newAllSongs.songGenre}</h4>
                                    <h4><small>song</small>  {newAllSongs.songTitle} </h4>
                                    <h4> <small>released</small>: {newAllSongs.released}</h4>
                                    <audio src={`data:audio/mp3;base64, ${base64String}`} controls/>

                                   
                                </div>
                            </Panel>
                        </Col>

    
    
    
    </>)
}




export default SingleNewSong
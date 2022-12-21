import {useState, useEffect} from "react"
import axios from "axios"
import {  Col, FlexboxGrid, Panel } from 'rsuite'




function TrendingTrack({trendingSong}) {
    const[songItems, setSongItems] = useState([])
    const[newSongItems, setNewSongItems] = useState([])
    const[images, setImages] = useState([])
    const[newImages, setNewImages] = useState([])



    useEffect(() => {

        const getTracksFromTrending = async() => {

            const res = await axios.get('/trending/show_songs')

            setSongItems(res.data.results);



        }

        getTracksFromTrending()


    }, [])

    useEffect(() => {
        if(trendingSong.songIdentifier) {
            songItems.forEach((songItem) => {
                if(songItem._id === trendingSong.songIdentifier) setNewSongItems(songItem)
            })
        }


    }, [songItems, trendingSong.songIdentifier])

    useEffect(() => {

        const getWork = async () => {

            const res = await axios.get("/artwork/show_all")

            setImages(res.data.results);

        }

        getWork()


 
    }, [])


    useEffect(() => {

        if(newSongItems.songArtwork) {
            images.forEach((image) => {
                if(image._id === newSongItems.songArtwork) setNewImages(image)

            })

        }


    }, [images, newSongItems.songArtwork])

if(newImages.length === 0) return null
const picture = newImages.songArtwork.data.data



const base64StringPhoto =  window.btoa(
 new Uint8Array(picture)
   .reduce((data, byte) => data + String.fromCharCode(byte), '')
);



if(newSongItems.length === 0) return null

    const jam = newSongItems.song.data.data

    const base64String =  window.btoa(
      new Uint8Array(jam)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    )
  

    



    return(<>

<FlexboxGrid justify="center">

<Col xs={24} md={9} className="p-0 p-md-3 feature" >
                            <Panel className="mb-3 news-card" shaded>
                            <img src={`data:image/jpg;base64, ${base64StringPhoto}`} width="70%"  alt={newSongItems.artistName} />
                                <div className="news-card-body">
                                <h4> <small>artist: </small> {newSongItems.artistName}</h4>
                                <h4> <small>song: </small> {newSongItems.songTitle}</h4>
                                <h4><small>genre</small> {newSongItems.songGenre}</h4>
                              <audio src={`data:audio/mp3;base64, ${base64String}`} controls/>
                                    
                             </div> 
                             </Panel>
                         </Col>

</FlexboxGrid>

    </>)
}

export default TrendingTrack
import axios from "axios"
import {useState, useEffect} from "react"
import TrendingTrack from "./TrendingTrack"
import { Row} from 'rsuite'

function TrendingTracks() {
 const[trendingSongs, setTrendingSongs] = useState([])

 useEffect(() => {

    const getTrendingSongs = async() => {

        const res = await axios.get('/trending/show_trending')

        setTrendingSongs(res.data.results);

    }

    getTrendingSongs()

 }, [])





    return(<>

<div className="news">
                <Row className="features p-0 mx-4 mx-md-auto">
                    <div className="heading mb-3 w-75 mx-auto">
                        <h3>Trending  Music</h3>
                        <p>The Hottest Tracks In The Land At The Moment...</p>
                        <hr />
                    </div>
                    

                    {
            trendingSongs?.map((trendingSong, index) => {
        
                
              return  <TrendingTrack key={index} trendingSong={trendingSong} />
            

            })
        }
        
                    
                </Row>
            </div>

        
    

        

    </>)
}


export default TrendingTracks
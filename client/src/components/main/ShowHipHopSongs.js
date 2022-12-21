import {useState, useEffect} from "react"
import axios from "axios"
import ShowHipHopSong from "./ShowHipHopSong"



function ShowHipHopSongs() {
    const[showHipHop, setShowHipHop] = useState([])

    useEffect(() => {

        const showHipHopMusic = async() => {
            const res = await axios.get('/music/show_hip_hop')

            setShowHipHop(res.data.results);

        }

        showHipHopMusic()


    }, [])

    
    return(<div>

{
    showHipHop?.map((hipHopSong, index) => {
        return <ShowHipHopSong key={index} hipHopSong={hipHopSong} />
    })
}

    </div>)
}

export default ShowHipHopSongs
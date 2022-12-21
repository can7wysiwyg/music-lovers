import {useState, useEffect} from "react"
import axios from "axios"
import ShowDancehallSong from "./ShowDancehallSong"



function ShowDancehallSongs() {
    const[showDancehall, setShowDancehall] = useState([])

    useEffect(() => {

        const showDancehallMusic = async() => {
            const res = await axios.get('/music/show_dancehall')

            setShowDancehall(res.data.results);

        }

        showDancehallMusic()


    }, [])

    
    return(<div>

{
    showDancehall?.map((dancehallSong, index) => {
        return <ShowDancehallSong key={index} dancehallSong={dancehallSong} />
    })
}

    </div>)
}

export default ShowDancehallSongs
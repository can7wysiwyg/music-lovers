import {useState, useEffect} from "react"
import axios from "axios"
import ShowRnbSong from "./ShowRnbSong"



function ShowRnbSongs() {
    const[showRnb, setShowRnb] = useState([])

    useEffect(() => {

        const showRnbMusic = async() => {
            const res = await axios.get('/music/show_rnb')

            setShowRnb(res.data.results);

        }

        showRnbMusic()


    }, [])

    
    return(<div>

{
    showRnb?.map((rnbSong, index) => {
        return <ShowRnbSong key={index} rnbSong={rnbSong} />
    })
}

    </div>)
}

export default ShowRnbSongs
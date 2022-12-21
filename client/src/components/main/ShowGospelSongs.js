import {useState, useEffect} from "react"
import axios from "axios"
import ShowGospelSong from "./ShowGospelSong"



function ShowGospelSongs() {
    const[showGospel, setShowGospel] = useState([])

    useEffect(() => {

        const showDancehallMusic = async() => {
            const res = await axios.get('/music/show_gospel')

            setShowGospel(res.data.results);

        }

        showDancehallMusic()


    }, [])

    
    return(<div>

{
    showGospel?.map((gospelSong, index) => {
        return <ShowGospelSong key={index} gospelSong={gospelSong} />
    })
}

    </div>)
}

export default ShowGospelSongs
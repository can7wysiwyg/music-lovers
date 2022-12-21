import {useState, useEffect} from "react"
import axios from "axios"
import ShowAfroPopSong from "./ShowAfroPopSong"



function ShowAfroPopSongs() {
    const[showAfroPop, setShowAfroPop] = useState([])

    useEffect(() => {

        const showAfroMusic = async() => {
            const res = await axios.get('/music/show_afro_pop')

            setShowAfroPop(res.data.results);

        }

        showAfroMusic()


    }, [])

    
    return(<div>

{
    showAfroPop?.map((afropopSong, index) => {
        return <ShowAfroPopSong key={index} afropopSong={afropopSong} />
    })
}

    </div>)
}

export default ShowAfroPopSongs
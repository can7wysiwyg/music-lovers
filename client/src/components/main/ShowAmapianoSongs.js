import {useState, useEffect} from "react"
import axios from "axios"
import ShowAmapianoSong from "./ShowAmapianoSong"



function ShowAmapianoSongs() {
    const[showAmapiano, setShowAmapiano] = useState([])

    useEffect(() => {

        const showAmapianoMusic = async() => {
            const res = await axios.get('/music/show_amapiano')

            setShowAmapiano(res.data.results);

        }

        showAmapianoMusic()


    }, [])

    
    return(<div>

{
    showAmapiano?.map((amapianoSong, index) => {
        return <ShowAmapianoSong key={index} amapianoSong={amapianoSong} />
    })
}

    </div>)
}

export default ShowAmapianoSongs
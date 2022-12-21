import {useState, useEffect} from "react"
import axios from "axios"
import ShowReggaeSong from "./ShowReggaeSong"



function ShowReggaeSongs() {
    const[showReggae, setShowReggae] = useState([])

    useEffect(() => {

        const showReggaeMusic = async() => {
            const res = await axios.get('/music/show_reggae')

            setShowReggae(res.data.results);

        }

        showReggaeMusic()


    }, [])

    
    return(<div>

{
    showReggae?.map((reggaeSong, index) => {
        return <ShowReggaeSong key={index} reggaeSong={reggaeSong} />
    })
}

    </div>)
}

export default ShowReggaeSongs
import {useState, useEffect} from "react"
import axios from "axios"
import ShowTrapSong from "./ShowTrapSong"



function ShowTrapSongs() {
    const[showTrap, setShowTrap] = useState([])

    useEffect(() => {

        const showTrapMusic = async() => {
            const res = await axios.get('/music/show_trap')

            setShowTrap(res.data.results);

        }

        showTrapMusic()


    }, [])

    
    return(<div>

{
    showTrap?.map((trapSong, index) => {
        return <ShowTrapSong key={index} trapSong={trapSong} />
    })
}

    </div>)
}

export default ShowTrapSongs
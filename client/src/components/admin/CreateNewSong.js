import {useState, useEffect} from "react"
import axios from "axios"
import NewSong from "./NewSong"

function CreateNewSong() {
  
     const[lastSongs, setLastSong] = useState([])

     useEffect(() => {

        const getLastAddedSong = async() => {

            const res = await axios.get('/new_song/all')

            setLastSong(res.data.results)

        }

        getLastAddedSong()

     }, [])

    return(<div>

        {
            lastSongs?.map((lastSong, index) => {
                return <NewSong key={index} lastSong={lastSong} />
            })
        }
        
    </div>)
}

export default CreateNewSong
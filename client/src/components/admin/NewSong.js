import { useContext } from "react"
import axios from "axios"
import { GlobalState } from "../../GlobalState"

function NewSong({lastSong}) {
    const state = useContext(GlobalState)
    const[token] = state.token
    const newSongIdentifier = lastSong._id

    


    const createNewSong = async(event) => {
        const res = await axios.post('/new_song/create', {newSongIdentifier}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        alert(res.data.msg)
    }


 
    

    return(<div>
        <button onClick={createNewSong}>create new song</button>
    </div>)
}

export default NewSong
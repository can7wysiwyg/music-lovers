import { useContext,  useState } from "react"
import axios from "axios"
import { GlobalState } from "../../GlobalState"
import "./createproduct.css"

function UploadPhoto() {
    const state = useContext(GlobalState)
    const [token] = state.token

    let [songArtwork, setSongArtwork] = useState()

    

    const handleSubmit = async (event) => {
        event.preventDefault()

        let formData = new FormData()

        formData.append('songArtwork', songArtwork)

        let res = await axios.post('/artwork/upload', formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

alert(res.data.msg);

window.location.href ="/upload_song"

    }
  


    return(<div className="create_product">
        <h1 className="text-center">upload song artwork</h1>

    <form onSubmit={handleSubmit} encType="multipart/form-data">
    <input type="file" accept=".jpg"   onChange={ (event) => {
        songArtwork = event.target.files[0]
        setSongArtwork(songArtwork)
    } }    />
    <button type="submit">upload artwork</button>
               
    </form>
    
    
    </div>)
}

export default UploadPhoto
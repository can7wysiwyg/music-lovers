import {  useState, useEffect } from "react"
import axios from "axios"
import "./createproduct.css"

import UploadSongHere from "./UploadSongHere"

function UploadSong() {
    
    const [art, setArt] = useState([])

    useEffect(() => {
        const getLastArtwork = async() => {
            const res = await axios.get('/artwork/show_last')

            setArt(res.data.results);
        }

        getLastArtwork()

    }, [])

    return(<div className="create_product">
        <h1 className="text-center">upload a song</h1>

        {
            art.map((item, index) => {
                return <UploadSongHere key={index} item={item} />
            })
        }

 


    </div>)
}

export default UploadSong
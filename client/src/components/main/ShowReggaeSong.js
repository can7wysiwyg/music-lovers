import {useEffect, useState} from "react"
import axios from "axios"

function ShowReggaeSong({reggaeSong}) {

    const[images, setImages] = useState([])
    const[newImages, setNewImages] = useState([])

    useEffect(() => {

        const getWork = async () => {

            const res = await axios.get("/artwork/show_all")

            setImages(res.data.results);

        }

        getWork()


 
    }, [])

    useEffect(() => {

        if(reggaeSong.songArtwork) {
            images.forEach((image) => {
                if(image._id === reggaeSong.songArtwork) setNewImages(image)

            })

        }


    }, [images, reggaeSong.songArtwork])

    if(newImages.length === 0) return null

    
  const picture = newImages.songArtwork.data.data



   const base64StringPhoto =  window.btoa(
    new Uint8Array(picture)
      .reduce((data, byte) => data + String.fromCharCode(byte), '')
  );

 





    const jam = reggaeSong.song.data.data

    const base64String =  window.btoa(
      new Uint8Array(jam)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    )
  
  
    return(<div>

<img src={`data:image/jpg;base64, ${base64StringPhoto}`} width="34%"  alt={reggaeSong.artistName} />


        <p>{reggaeSong.artistName}</p>
        <p>{reggaeSong.songGenre}</p>
        <p>{reggaeSong.songTitle}</p>
        <p>{reggaeSong.released}</p>

        <audio src={`data:audio/mp3;base64, ${base64String}`} controls/>


        
    </div>)
}

export default ShowReggaeSong
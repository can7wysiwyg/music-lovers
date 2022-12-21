import axios from "axios"
import { useEffect, useState } from "react"

function AllSongs({songItem}) {
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

        if(songItem.songArtwork) {
            images.forEach((image) => {
                if(image._id === songItem.songArtwork) setNewImages(image)

            })

        }


    }, [images, songItem.songArtwork])



    if(newImages.length === 0) return null

    
  const picture = newImages.songArtwork.data.data



   const base64StringPhoto =  window.btoa(
    new Uint8Array(picture)
      .reduce((data, byte) => data + String.fromCharCode(byte), '')
  );

 


  const jam = songItem.song.data.data

  const base64String =  window.btoa(
    new Uint8Array(jam)
      .reduce((data, byte) => data + String.fromCharCode(byte), '')
  )

  



    return(<div>

<img src={`data:image/jpg;base64, ${base64StringPhoto}`} width="34%"  alt={songItem.artistName} />

        <p>{songItem.artistName}</p>
        <p>{songItem.songGenre}</p>
        <p>{songItem.songTitle}</p>
        <p>{songItem.released}</p>

        <audio src={`data:audio/mp3;base64, ${base64String}`} controls/>



    </div>)
}

export default AllSongs
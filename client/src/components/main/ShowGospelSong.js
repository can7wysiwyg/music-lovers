import {useEffect, useState} from "react"
import axios from "axios"

function ShowGospelSong({gospelSong}) {

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

        if(gospelSong.songArtwork) {
            images.forEach((image) => {
                if(image._id === gospelSong.songArtwork) setNewImages(image)

            })

        }


    }, [images, gospelSong.songArtwork])

    if(newImages.length === 0) return null

    
  const picture = newImages.songArtwork.data.data



   const base64StringPhoto =  window.btoa(
    new Uint8Array(picture)
      .reduce((data, byte) => data + String.fromCharCode(byte), '')
  );

 





    const jam = gospelSong.song.data.data

    const base64String =  window.btoa(
      new Uint8Array(jam)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    )
  
  
    return(<div>

<img src={`data:image/jpg;base64, ${base64StringPhoto}`} width="34%"  alt={gospelSong.artistName} />


        <p>{gospelSong.artistName}</p>
        <p>{gospelSong.songGenre}</p>
        <p>{gospelSong.songTitle}</p>
        <p>{gospelSong.released}</p>

        <audio src={`data:audio/mp3;base64, ${base64String}`} controls/>


        
    </div>)
}

export default ShowGospelSong
import {useEffect, useState} from "react"
import axios from "axios"

function ShowRnbSong({rnbSong}) {

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

        if(rnbSong.songArtwork) {
            images.forEach((image) => {
                if(image._id === rnbSong.songArtwork) setNewImages(image)

            })

        }


    }, [images, rnbSong.songArtwork])

    if(newImages.length === 0) return null

    
  const picture = newImages.songArtwork.data.data



   const base64StringPhoto =  window.btoa(
    new Uint8Array(picture)
      .reduce((data, byte) => data + String.fromCharCode(byte), '')
  );

 





    const jam = rnbSong.song.data.data

    const base64String =  window.btoa(
      new Uint8Array(jam)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    )

    
  
    return(<div>

<img src={`data:image/jpg;base64, ${base64StringPhoto}`} width="34%"  alt={rnbSong.artistName} />


        <p>{rnbSong.artistName}</p>
        <p>{rnbSong.songGenre}</p>
        <p>{rnbSong.songTitle}</p>
        <p>{rnbSong.released}</p>

        <audio src={`data:audio/mp3;base64, ${base64String}`} controls/>


        
    </div>)
}

export default ShowRnbSong
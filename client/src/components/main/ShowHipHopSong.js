import {useEffect, useState} from "react"
import axios from "axios"

function ShowHipHopSong({hipHopSong}) {

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

        if(hipHopSong.songArtwork) {
            images.forEach((image) => {
                if(image._id === hipHopSong.songArtwork) setNewImages(image)

            })

        }


    }, [images, hipHopSong.songArtwork])

    if(newImages.length === 0) return null

    
  const picture = newImages.songArtwork.data.data



   const base64StringPhoto =  window.btoa(
    new Uint8Array(picture)
      .reduce((data, byte) => data + String.fromCharCode(byte), '')
  );

 





    const jam = hipHopSong.song.data.data

    const base64String =  window.btoa(
      new Uint8Array(jam)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    )
  
  
    return(<div>

<img src={`data:image/jpg;base64, ${base64StringPhoto}`} width="34%"  alt={hipHopSong.artistName} />


        <p>{hipHopSong.artistName}</p>
        <p>{hipHopSong.songGenre}</p>
        <p>{hipHopSong.songTitle}</p>
        <p>{hipHopSong.released}</p>

        <audio src={`data:audio/mp3;base64, ${base64String}`} controls/>


        
    </div>)
}

export default ShowHipHopSong
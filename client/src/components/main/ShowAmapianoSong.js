import {useEffect, useState} from "react"
import axios from "axios"

function ShowAmapianoSong({amapianoSong}) {

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

        if(amapianoSong.songArtwork) {
            images.forEach((image) => {
                if(image._id === amapianoSong.songArtwork) setNewImages(image)

            })

        }


    }, [images, amapianoSong.songArtwork])

    if(newImages.length === 0) return null

    
  const picture = newImages.songArtwork.data.data



   const base64StringPhoto =  window.btoa(
    new Uint8Array(picture)
      .reduce((data, byte) => data + String.fromCharCode(byte), '')
  );

 





    const jam = amapianoSong.song.data.data

    const base64String =  window.btoa(
      new Uint8Array(jam)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    )

    if(amapianoSong.length === 0) {
        return <h2 style={{textAlign: "center", fontSize: "5rem"}}>no amapiano songs</h2>
    }
  
  
    return(<div>

<img src={`data:image/jpg;base64, ${base64StringPhoto}`} width="34%"  alt={amapianoSong.artistName} />


        <p>{amapianoSong.artistName}</p>
        <p>{amapianoSong.songGenre}</p>
        <p>{amapianoSong.songTitle}</p>
        <p>{amapianoSong.released}</p>

        <audio src={`data:audio/mp3;base64, ${base64String}`} controls/>


        
    </div>)
}

export default ShowAmapianoSong
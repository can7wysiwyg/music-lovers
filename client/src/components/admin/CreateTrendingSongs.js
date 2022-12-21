import {useState, useEffect} from "react"
import axios from "axios"
import { Link } from "react-router-dom"



function CreateTrendingSongs() {
   
  const[songs, setSongs] = useState([])
  const [query, setQuery] = useState("")
  

  useEffect(() => {

   const getSongsToFilter = async() => {

        const res = await axios.get('/trending/show_songs')

        setSongs(res.data.results);

    }

    getSongsToFilter()


  }, [])


  const handleChange = (event) => {

    setQuery(event.target.value)

  }
  

    return(<>
    

<div className="container">
 <br />
<input type="search...." value={query} className="search form-control" onChange={handleChange} placeholder="search for songs" />
<div className="text-center">
{songs.filter((songRes) => songRes.songTag.includes(query)).map((songRes) => (
            <p key={songRes._id}><Link to={`/trending_song/${songRes._id}`}>  {songRes.songTag} </Link></p>

        ))}

</div>

</div>



    </>)
}

export default CreateTrendingSongs
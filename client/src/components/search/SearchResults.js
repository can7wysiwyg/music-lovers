import { useState, useEffect } from "react";
import {  Link } from "react-router-dom"
import axios from "axios";

function SearchResults() {

    // let locale = useLocation()
    const[songs, setSongs] = useState([])
    const[query, setQuery] = useState("")

    

    useEffect(() => {
        const getSongsToFilter = async() => {
     
            const res = await axios.get('/trending/show_songs')
    
            setSongs(res.data.results);
    
        }

        getSongsToFilter()


    }, [])


    const onSubmito = async() => {

        const res = await axios.get('/trending/show_songs')
    
        setSongs(res.data.results);


    }
       
     
       const handleChange = (event) => {
     
         setQuery(event.target.value)
       }
       
     

    
    
    return(<div className="container">
        
        <br />

        <input type="search...." value={query} className="search form-control" onChange={handleChange} />
      <br />
      <div className="text-center">
     <button className="btn btn-warning " onClick={onSubmito}>search song</button>
     </div>

<div className="text-center">
{songs.filter((songRes) => songRes.songTag.includes(query)).map((songRes) => (
            <p key={songRes._id}><Link to={`/single_new_song/${songRes._id}`}>  {songRes.songTag} </Link></p>

        ))}



        </div>



    </div>)
}

export default SearchResults
import {Link} from "react-router-dom"

function DiscoverSongs() {
    
    return(<div>
<ul>
    <li>
        <Link to="/show_reggae">reggae music</Link>
    </li>
    <li>
        <Link to="/show_gospel">gospel music</Link>
    </li>
    <li>
        <Link to="/show_dancehall">dancehall music</Link>
    </li>
    <li>
        <Link to="/show_hip_hop">hip hop  music</Link>
    </li>
    <li>
        <Link to="/show_trap">trap music</Link>
    </li>
    <li>
        <Link to="/show_amapiano">amapiano music</Link>
    </li>
    <li>
        <Link to="/show_rnb">rnb music</Link>
    </li>
    <li>
        <Link to="/show_afro_pop">afro pop music</Link>
    </li>




</ul>


    </div>)
}

export default DiscoverSongs
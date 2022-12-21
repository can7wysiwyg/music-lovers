import React from "react";
import { useContext } from "react"
import axios from "axios";
import { Navbar } from 'rsuite'
import Nav from "@rsuite/responsive-nav";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";


const NavLink = React.forwardRef((props, ref) => {
    const { href, as, ...rest } = props;
    return (
      <Link to={href} as={as}>
        <a ref={ref} {...rest} aria-hidden="true" />
      </Link>
    );
  });



function Header() {
    const state = useContext(GlobalState)
  const [isLogged] = state.userApi.isLogged;
  const [token] = state.token

  const LogoutUser = async () => {
    await axios.get("/auth/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    localStorage.removeItem("firstLogin");
    localStorage.removeItem("cart")

    window.location.href = "/";
  };

  const loggedRouter = () => {
    return (
      <>
      <Nav.Item as={NavLink} href="/upload_photo">upload song art</Nav.Item>
      <Nav.Item as={NavLink} href="/upload_song" >upload music</Nav.Item>
      <Nav.Item as={NavLink} href="/create_new_song" >create new songs</Nav.Item>
      <Nav.Item as={NavLink} href="/create_trending_song"> create trending songs</Nav.Item>
      <Nav.Item as={NavLink} href="/" onClick={LogoutUser}>logout</Nav.Item>
        
        
      </>
    );
  };





  

 

  return (

      <>
                  <Navbar>
                <Navbar.Brand >
                 <h4 className="py-1 px-1"> Music Lovers</h4> 
                </Navbar.Brand>
                
                    <Nav pullRight>
                        <Nav.Item as={NavLink} href="/">Home</Nav.Item>
                        <Nav.Item as={NavLink} href="/trending_tracks">Trending Songs</Nav.Item>
                        <Nav.Item as={NavLink} href="/find_songs">Search Music</Nav.Item>


                        {
                    isLogged ? loggedRouter() : <Nav.Item as={NavLink} href="/music"> Music</Nav.Item>
                }



                    </Nav>
                
            </Navbar>

        
      </>

  );
}

export default Header;

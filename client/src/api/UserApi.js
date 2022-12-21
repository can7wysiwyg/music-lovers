import { useEffect, useState } from "react"
import axios from "axios"

function UserApi(token) {
    const [isLogged, setIsLogged] = useState(false)
    


    useEffect(() => {

        if(token) {
            const getUser = async() => {
            try{
             await axios.get('/auth/user', {
                    headers: {Authorization: `Bearer ${token}`}
                })
                setIsLogged(true)
            
        

        
        }

            catch(err) {
                console.log(err);
            }
            }


            getUser()

            

        }


    }, [token])


    
    return{

isLogged: [isLogged, setIsLogged],

    
    
    
    }
}

export default UserApi
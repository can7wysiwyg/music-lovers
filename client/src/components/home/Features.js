import { Panel, Row, Col, Avatar } from 'rsuite'
import {Icon} from "@rsuite/icons"
import { FileDownload, CheckOutline ,  } from "@rsuite/icons"
import {ImMusic} from "react-icons/im"
import {GiGuitar} from "react-icons/gi"


function Features() {
    return(
        <div className="my-5">
        <Row className="features p-0 mx-4 mx-md-auto">
            <div className="heading mb-3 w-75 mx-auto">
                <h3>Our Speciality</h3>
                <p>Here's what we have got for you!</p>
                <hr />
            </div>
            <FeatureContent />
        </Row>
    </div>
)
}

const FeatureContent = () => {
const features = [
    {
        id: 1,
        title: "Access Anywhere",
        icon: CheckOutline,
        text: "You can access our content everywhere you are in the world."
    },
    {
        id: 2,
        title: "Download Music",
        icon: FileDownload,
        text: "Download songs from your favourite artists for free"
    },
    {
        id: 3,
        title: "Feel On the Go!",
        icon: ImMusic,
        text: "Bump to the vibes of the best music in the land.."
    },
    {
        id: 4,
        title: "Non-Stop Melody",
        icon: GiGuitar,
        text: "Nothing but the best unchained melodies.."
    },

]
return (
    <>
        {
            features.map(feature => {
                return (

           <Col xs={24} sm={12} lg={6} className="py-2 feature" key={feature.id}  >
                        

               <Panel className="py-2" shaded>
                            <h4>{feature.title}</h4>
                            <Avatar className="feature-icon mb-3" size="lg" circle><Icon as={feature.icon} /></Avatar>
                            <p>{feature.text}</p>
                        </Panel> 
                       
                    </Col>
                    
                   
                )
            })
        }
    </>

    )
}

export default Features
import { Row, Col, Footer, Input } from 'rsuite'
import {  Icon } from '@rsuite/icons'
import A from "./assets/1.jpg"
import B from "./assets/2.jpg"
import C from "./assets/3.jpg"
import D from "./assets/4.jpg"
import PhoneIcon from '@rsuite/icons/Phone';
import { ImWhatsapp } from 'react-icons/im'


function FooterBar() {
    return(<>
    <Footer>
            <div className="news-letter">
        
            </div>
            <div className="footer-band">
                <Row className="w-75 py-4 p-md-4 mx-auto">
                    <Col xs={24} md={8} lg={7} className="py-3 p-md-4"> 
                        <h4>Contact Us</h4> 
                        <address>
                            <Icon icon="map-marker" size="1x" /> Limbe, Blantyre, Malawi <br />
                            <Icon as={PhoneIcon} size="1x" /> <a href="tel:+265998642957" style={{color: "white"}}> click to call us </a>  <br />
                            <Icon as={ ImWhatsapp } size="1x" style={{width: 20}}/> <a href='http://wa.me/265998642957' style={{color: "white"}}>click for whatsapp</a>
                        </address>
                    </Col>
                    <Col xs={24} md={8} lg={11} className="py-3 p-md-4">
                        <h4>Email Us</h4>
                        <Input placeholder="Enter Your Name" type="text" /><br />
                        <Input placeholder="Enter Your Email" type="email" /><br />
                        <Input placeholder="Enter Your Message" type="text" componentClass="textarea" rows={3} />
                        <button className="get-in-touch">Submit</button>
                    </Col>
                    <Col xs={24} md={8} lg={6} className="py-3 p-md-4">
                        <h4>Check Out!</h4>
                        <Row className="footer-gal">
                            <Col xs={12}>  
                                <img src={A} alt={A} width="100%"/>
                            </Col>
                            <Col xs={12}>
                                <img src={B} alt={B}  width="100%"/>
                            </Col>
                            <Col xs={12}>
                                <img src={C} alt={C}  width="100%"/>
                            </Col>
                            <Col xs={12}>
                                <img src={D} alt={D}  width="100%"/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </Footer>
    
    </>)
}

export default FooterBar
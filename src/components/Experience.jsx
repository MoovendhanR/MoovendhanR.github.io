
import { Zoom, Fade } from 'react-awesome-reveal'

import ca from '../media/nordstrom.jpg'
import mariott from '../media/mariott.jpg'
import anthro from '../media/anthro.png'
import expedia from '../media/expedia.png'
import Sephora from '../media/sephora.jpg'
import snapdeal from '../media/snapdeal.jpg'







import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/esm/Button'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Card from 'react-bootstrap/esm/Card'


const Experience = ({ darkMode }) => {

    return (
        <div data-theme={darkMode ? "dark" : "light"}>
            <br></br>
            <Fade>
                <Container>
                    <br></br>
                    <h2 className="lead" align="center"><b>My recent works</b></h2>
                    <br></br>
                    <h3 className="lead" align="center">Here are a few projects I've worked on recently.</h3>
                    <br></br>
                    <Zoom>
                        {/* 1 */}
                        <Row>

                            <Col lg={4} sm={12}>
                                <Card align="center" className="exp" data-theme={darkMode ? "dark" : "light"}>
                                    <br></br>
                                    <center>
                                        <div class="flip-card">
                                            <div class="flip-card-inner">
                                                <div className="flip-card-front">
                                                    <Card.Img variant="top" src={ca} style={{ height: '16rem' }} />
                                                    <Card.Body>
                                                        <Card.Title align="center">Clone of the Nordstrom.com</Card.Title>
                                                        {/* <Card.Text>
                                                            <p align="center">it's is an online e-commerce website, A leading fashion retailer offering compelling clothing, shoes, and accessories for men, women, and kids.</p>
                                                        </Card.Text> */}
                                                    </Card.Body>
                                                </div>
                                                <div className="flip-card-back">
                                                    <p>Nordstrom is an online e-commerce website. It's a leading fashion retailer offering compelling clothing, shoes, and accessories for men, women, and kids. We are five person team worked on this project for six days. My Participation This Project has a Header and Footer for all page. We Mainly focused in this project only frentend.
                                                        <br></br>Tech Stacks - HTML, CSS, JavaScript, Dom ,Local Storage.
                                                        <br></br>DATABASE : Local Storage.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </center>
                                    <br></br>
                                    <div>
                                        <a href="/https://vibrantachintya.github.io/nordstrom/" target="_blank" rel="noreferrer noopener">
                                            <Button className='a' variant={darkMode ? "outline-light" : "outline-dark"}>View Project</Button>
                                        </a>
                                        <a href="https://github.com/vibrantachintya/nordstrom" target="_blank" rel="noreferrer noopener">
                                            <Button className='a' variant={darkMode ? "outline-light" : "outline-dark"} >View Github Repo</Button>
                                        </a>
                                    </div>
                                    <br></br>
                                </Card>
                            </Col>
                            {/* 2 */}
                            <Col lg={4} sm={12}>
                                <Card align="center" className="exp" data-theme={darkMode ? "dark" : "light"}>
                                    <br></br>
                                    <center>
                                        <div class="flip-card">
                                            <div class="flip-card-inner">
                                                <div className="flip-card-front">
                                                    <Card.Img variant="top" src={mariott} style={{ height: '16rem' }}/>
                                                    <Card.Body>
                                                        <Card.Title align="center">Clone of the Mariott.com</Card.Title>
                                                        {/* <Card.Text>
                                                            <p align="center" >Mariott Bonvoy is an online application that acts as a Multi-National Hotel Booking Platform for people to Book Hotels.</p>
                                                        </Card.Text> */}
                                                        
                                                    </Card.Body>
                                                </div>
                                                <div className="flip-card-back">
                                                    <p>Mariott Bonvoy is an online application that acts as a Multi-National Hotel Booking Platform for people to Book Hotels. We were a five-person team that worked on this project for five days. My Participation This Project has a Header, Footer for all page and user authendication. We developed only frontend in this project.
                                                        <br></br>TECH-STACKS : HTML, CSS, DOM, JavaScript
                                                        <br></br>
                                                    </p>DATABASE : Local Storage
                                                </div>
                                            </div>
                                        </div>
                                    </center>
                                    <br></br>

                                    <div >
                                        <a href="https://masai-marriott-com.vercel.app/" target="_blank" rel="noreferrer noopener" >
                                            <Button className='a' variant={darkMode ? "outline-light" : "outline-dark"}>View Project</Button>
                                        </a>
                                        <a href="https://github.com/AmbaliyaDhruv/Marriott_Bonvoy_clone.github.io" target="_blank" rel="noreferrer noopener">
                                            <Button className='a' variant={darkMode ? "outline-light" : "outline-dark"} >View Github Repo</Button>
                                        </a>
                                    </div>
                                    <br></br>
                                </Card>
                            </Col>
                            <br></br>
                            {/* 3 */}

                            <Col lg={4} sm={12}>
                                <Card align="center" className="exp" data-theme={darkMode ? "dark" : "light"}>
                                    <br></br>
                                    <center>
                                        <div class="flip-card">
                                            <div class="flip-card-inner">
                                                <div className="flip-card-front">
                                                    <Card.Img variant="top" src={snapdeal} style={{ height: '16rem' }} />
                                                    <Card.Body>
                                                        <Card.Title align="center">Clone of the Snapdeal.com</Card.Title>
                                                        {/* <Card.Text>
                                                            <p align="center">It is an e-commerce web application that allows users to buy all items in online.</p>
                                                        </Card.Text> */}
                                                    </Card.Body>
                                                </div>
                                                <div className="flip-card-back">
                                                    <p> It is an e-commerce web application that allows users to buy all items in online. We were a five-person team that worked on this project for five days. The Payment page & Sorting Features is my contribution to this project. We have built a complete e-commerce flow and we used both Frendend and Backend.
                                                        <br></br>TECH-STACKS: EJS, CSS, mongoDb, ES6 JS, Express.js, Node.js.
                                                        <br></br>DATABASE : MongoDb Atlas
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </center>
                                    <br></br>
                                    <div>
                                        <a href="https://friendly-sable-65643a.netlify.app/" target="_blank" rel="noreferrer noopener">
                                            <Button className='a' variant={darkMode ? "outline-light" : "outline-dark"}>View Project</Button>
                                        </a>
                                        <a href="https://github.com/kirankumar3117/snapdeal-unit4" target="_blank" rel="noreferrer noopener">
                                            <Button className='a' variant={darkMode ? "outline-light" : "outline-dark"} >View Github Repo</Button>
                                        </a>
                                    </div>
                                    <br></br>
                                </Card>
                            </Col>
                            <br></br>
                            {/* 4 */}

                            <Col lg={4} sm={12} >
                                <Card align="center" className="exp" data-theme={darkMode ? "dark" : "light"}>
                                    <br></br>
                                    <center>
                                        <div class="flip-card">
                                            <div class="flip-card-inner">
                                                <div className="flip-card-front">
                                                    <Card.Img variant="top" src={Sephora} style={{ height: '16rem' }} />
                                                    <Card.Body>
                                                        <Card.Title align="center">Clone of the Sephora.com</Card.Title>
                                                        {/* <Card.Text>
                                                            <p align="center">abhibus.com is online ticketing company that facilitates online booking of bus and train tickets to travellers all over India.</p>
                                                        </Card.Text> */}
                                                    </Card.Body>
                                                </div>
                                                <div className="flip-card-back">
                                                    <p>Makeup, Skincare, Fragrance, Hair & Beauty Products | Sephora is an online application that acts as an e-commerce platform for people to purchase various Makeup items. An Individual project developed within a week. I mainly focused on developing Frontend in this project.

                                                        <br></br>TECH-STACKS : HTML, CSS, DOM, ES6 JS, localStorage concept
                                                        <br></br> DATABASE : Local Storage
                                                        </p>
                                                </div>
                                            </div>
                                        </div>
                                    </center>
                                    <br></br>
                                    <div>
                                        <a href="https://peaceful-kare-8f9905.netlify.app/" target="_blank" rel="noreferrer noopener">
                                            <Button className='a' variant={darkMode ? "outline-light" : "outline-dark"}>View Project</Button>
                                        </a>
                                        <a href="https://github.com/MoovendhanR/project-sephora.com" target="_blank" rel="noreferrer noopener">
                                            <Button className='a' variant={darkMode ? "outline-light" : "outline-dark"} >View Github Repo</Button>
                                        </a>
                                    </div>
                                    <br></br>
                                </Card>
                            </Col>
                               
                            <br></br>
                            {/* 5 */}

                            <Col lg={4} sm={12}>
                                <Card align="center" className="exp" data-theme={darkMode ? "dark" : "light"}>
                                    <br></br>
                                    <center>
                                        <div class="flip-card">
                                            <div class="flip-card-inner">
                                                <div className="flip-card-front">
                                                    <Card.Img variant="top" src={expedia} style={{ height: '16rem' }} />
                                                    <Card.Body>
                                                        <Card.Title align="center">Clone of the Expedia.com</Card.Title>
                                                        {/* <Card.Text>
                                                            <p align="center">abhibus.com is online ticketing company that facilitates online booking of bus and train tickets to travellers all over India.</p>
                                                        </Card.Text> */}
                                                    </Card.Body>
                                                </div>
                                                <div className="flip-card-back">
                                                    <p>Expedia.co.in is an online travel agency owned by Expedia Group, an Indian online travel shopping company based in Place. The website and mobile app can be used to book airline tickets, hotel reservations, car rentals, cruise ships, and vacation packages.
                                                        <br></br>TECH-STACKS: ReactJS,Redux,Chakra UI,NodeJS,ExpressJS,MongoDB.

                                                        <br></br> DATABASE : MongoDb Atlas
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </center>
                                    <br></br>
                                    <div>
                                        <a href="https://project-expedia-clone.vercel.app/" target="_blank" rel="noreferrer noopener">
                                            <Button className='a' variant={darkMode ? "outline-light" : "outline-dark"}>View Project</Button>
                                        </a>
                                        <a href="https://github.com/MoovendhanR/project-expedia-clone" target="_blank" rel="noreferrer noopener">
                                            <Button className='a' variant={darkMode ? "outline-light" : "outline-dark"} >View Github Repo</Button>
                                        </a>
                                    </div>
                                    <br></br>
                                </Card>
                            </Col>
                               
                          {/* 6 */}
                            <Col lg={4} sm={12}>
                                <Card align="center" className="exp" data-theme={darkMode ? "dark" : "light"}>
                                    <br></br>
                                    <center>
                                        <div class="flip-card">
                                            <div class="flip-card-inner">
                                                <div className="flip-card-front">
                                                    <Card.Img variant="top" src={anthro} style={{ height: '15rem' }} />
                                                    <Card.Body>
                                                        <Card.Title align="center">Clone of the Anthropologie.com</Card.Title>
                                                        {/* <Card.Text>
                                                            <p align="center">abhibus.com is online ticketing company that facilitates online booking of bus and train tickets to travellers all over India.</p>
                                                        </Card.Text> */}
                                                    </Card.Body>
                                                </div>
                                                <div className="flip-card-back">
                                                    <p>Anthropologie is an American clothing retailer with approximately 200 stores across the U.S., Canada, and UK that offers an assortment of clothing, jewelry, home furniture, decoration, beauty products, and gifts. Anthropologie is part of URBN brands, which includes Urban Outfitters, Free People, BHLDN, and Terrain.
                                                        <br></br> TECH-STACKS: Reactjs, Node js, Expressjs, Heroku .

                                                        <br></br>DATABASE : MongoDb Atlas .
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </center>
                                    <br></br>
                                    <div>
                                        <a href="https://anthropologie-clone.vercel.app/" target="_blank" rel="noreferrer noopener">
                                            <Button className='a' variant={darkMode ? "outline-light" : "outline-dark"}>View Project</Button>
                                        </a>
                                        <a href="https://github.com/Aniketkushwaha80/anthropologie-clone" target="_blank" rel="noreferrer noopener">
                                            <Button className='a' variant={darkMode ? "outline-light" : "outline-dark"} >View Github Repo</Button>
                                        </a>
                                    </div>
                                    <br></br>
                                </Card>
                            </Col>

                        </Row>
                    </Zoom>
                    <br></br>
                </Container>
            </Fade>
            <br></br>
            <hr></hr>
            <br></br>
        </div>
    )
}

export default Experience

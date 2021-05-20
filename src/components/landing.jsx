import React from 'react';
import {Carousel, Jumbotron, Container, Row, Col} from 'react-bootstrap';
import { Transition } from 'react-transition-group';

class Landing extends React.Component {
    render() {
        const defaultStyle = {
            opacity: 0
        };
    
        const transitionStyles = {
            entering: { opacity: 0},
            entered: { opacity: 1}
        };
        return (
            <div>
                <Carousel className="homeslider">
                    <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={'assets/images/home/rocket1.jpg'}
                        alt="First slide"
                    />
                    </Carousel.Item>
                    <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={'assets/images/home/rocket-launch-693192_1280.jpg'}
                        alt="Second slide"
                    />
                    </Carousel.Item>
                </Carousel>
                <Jumbotron fluid className="landing">
                    <Container className="text-center">
                    <Row>
                        <Col>
                        <Transition in={true} timeout={900} appear>

                                        {(state) => (
                                        
                                        <Col xl={12} xs={12} className="border rounded p-3" style={{
                                            ...defaultStyle,
                                            ...transitionStyles[state],
                                            transition: `900ms ease-in`
                                        }}>
                                            
                                            <div className="bg-white rounded shadow-sm py-5 px-4">
                                                <h6 className="text-center text-uppercase">Overview</h6>
                                                <hr className="dashed"></hr>
                                                <p className="p-2 justify-content">
                                                Our Cansat is built to perform multiple tasks as per the mission statement. The Cansat consists of two parts: carrier and science payload. The science payload further separates into two parts; heatshield and probe. The carrier is the backbone of the cansat. It safely deploys the science payload and also acts like a medium for the probe to relay data to the ground station. The heatshield is designed to reduce the descent rate of the science payload. While the probe is the brain of the cansat; it collects local weather data and sends it to the carrier. The probe also encloses a hen’s egg which shouldn’t crack during the course of the mission.
                                                The main objectives our Cansat has to accomplish are:</p>
                                                <hr className="dashed"></hr>
                                                <p className="p-2 justify-content">Our Cansat will be loaded inside a sounding rocket and launched. The Cansat would then be ejected from the rocket at 2000m from ground. The carrier (consisting of the science payload) has to maneuver helically downward for 500m upon release. The helical maneuver would be performed with foldable wings attached on the carrier. During this the maneuver, the carrier would also collect data such as mission time, altitude, orientation and GPS coordinates and transmit it to the ground station.</p>
                                                <hr className="dashed"></hr>
                                                <p className="p-2 justify-content"> Once the carrier attains altitude of 1500m, it starts its powered flight using a propeller attached on the tip of the nose cone to move 300m east.Once the carrier reaches its destination it releases the science payload. The science payload then descends at a rate of approximately 15m/s for 1000m with the help of a specially designed heat shield. The probe in the science payload collects local weather data such as air temperature, altitude and air speed and also protects the hen’s egg.</p>
                                                <hr className="dashed"></hr>
                                                <p className="p-2 justify-content">Once the science payload reaches 500m from the ground, the heatshield separates from the probe. The probe then descends at 5m/s using a parachute.
                                                The carrier stops its powered flight and lands being in a gliding state.</p>
                                                <hr className="dashed"></hr>
                                                <p className="p-2 justify-content">Additional objectives:
                                                <li>The carrier, heatshield, probe and the egg should be located and retrieved.</li>
                                                <li>The data received should be plotted in real time and recorded in the ground station.</li>
                                                </p>
                                                </div>
                                                <br />
                                                <div className="bg-white rounded shadow-sm py-5 px-4">


                                                <Row className="mt-4 p-3">
                                                    <Col xs={12}>
                                                    <h6 className="text-center text-uppercase">CONOPS</h6>
                                                        <img alt="images"  src={'./assets/images/home/conops.jpeg'} height="60%" width="100%" className="p-4 shadow-lg m-3 border border-dark"/>
                                                    </Col>
                                                    <Col xs={12}>
                                                        <video className="videocs" controls>
                                                            <source src={'./assets/video/animation.mp4'} type="video/mp4"></source>
                                                        </video>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    )}
                                    </Transition>
                        </Col>
                    </Row>
                    
                    
                    </Container>

                </Jumbotron>
                
                <br/>
                
            </div>
        );
    }
}
export default Landing;
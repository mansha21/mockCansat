import React from 'react';
import { Jumbotron, Container, Row, Col } from 'react-bootstrap';
import { Transition } from 'react-transition-group';
import { science, heatsh, probe } from '../constants/science';

class Carrierview extends React.Component {
    render() {
        const duration = 800;

        const defaultStyle = {
            transition: `all ${duration}ms ease`,
            opacity: 0,
            padding: 20,
            display: "inline-block",
            position: "absolute",
        };

        const transitionStyles = {
            entering: { opacity: 0, left: '0px' },
            entered: { opacity: 1, left: '10%' }
        };

        return (
            <div>
                <Jumbotron fluid className="payload">
                    <Container className="text-center">
                        <Transition in={true} timeout={duration} appear>
                            {(state) => (
                                <div
                                    style={{
                                        ...defaultStyle,
                                        ...transitionStyles[state]
                                    }}
                                >
                                    <h3>Payload Subsystem Design</h3>
                                </div>
                            )}
                        </Transition>

                        <br />

                    </Container>


                </Jumbotron>
                <Container>
                    <h4 className="text-center text-uppercase m-4">science Payload</h4>
                    <Row>
                        {
                            science.map((link) =>
                                <Col xs={4} className={link.class}>
                                    <div className="bg-white rounded shadow-sm py-3 px-4 mb-4">
                                        <img alt="images"  src={link.img} className="img-fluid rounded" />
                                        <div className="text-center m-2"><b>{link.title}</b></div>
                                    </div>
                                </Col>
                            )
                        }
                    </Row>
                
                    <Row>
                        <Col xs={12}>
                            <div className="py-3 px-4 mb-4">
                                <h5 className="text-center">The science payload consists of the probe and heat shield</h5>
                                <hr className="dashed"></hr>
                            </div>
                        </Col>
                    </Row>
                                <Row>
                        <div className="bg-white rounded shadow-lg py-3 px-4 mb-4">
                            {
                                heatsh.map((hs) =>
                                    <Col xs={12} className={hs.class}>
                                        <h6 className="text-center m-2">{hs.title}</h6>
                                        <img alt="images"  src={hs.img} className="img-fluid rounded heatimg" />
                                        <div className="text-center m-2 p-4"><p className="justify-content">{hs.text1}</p></div>
                                        <div className="text-center m-2"><p className="justify-content">{hs.text2}</p></div>
                                    </Col>
                                )
                            }
                        </div>
                        </Row>
                    <Row>
                        <div className="bg-white rounded shadow-sm py-3 px-4 mb-4">
                            <Col xs={12}>

                                <Row>
                                    {
                                        probe.map((ps) =>

                                            <Col xs={4} className={ps.class}>
                                                <h6 className="text-center m-2">{ps.title}</h6>
                                                <img alt="images"  src={ps.img} className="img-fluid rounded scienceimg" />
                                            </Col>

                                        )
                                    }
                                </Row>
                                <div className="text-center m-2 shadow-lg ">
                                    <p className="justify-content p-4">
                                        The probe plays the most important role in the CANSAT. After the science payload is deployed at 1500 meters, the probe in it collects the local weather data till it lands on the ground. The probe is also tasked with carrying a delicate egg without breaking it. After the probe reaches an altitude of 500 meters, the probe detaches from the heatshield and further descends at a rate of 5 m/s using a parachute.
                                        </p>
                                    <p className="justify-content p-4">
                                        Our probe’s chassis is supported by carbon spars; the base plates are made from ABS while the cover from PLA. All in all, the structure is built to withstand large forces to safely collect data and protect the egg.
                                        </p>
                                </div>
                            </Col>
                        </div>

                    </Row>

                </Container>

            </div>
        );
    }
}
export default Carrierview;
import React from 'react';
import { Jumbotron, Container, Row, Col, Card, Carousel } from 'react-bootstrap';
import { Transition } from 'react-transition-group';
import { elecomp, batteries, elecompaccess, pcb } from '../constants/subsystems';

class Electricalcomp extends React.Component {
    render() {
        const duration = 800;

        const defaultStyle = {
            transition: `all ${duration}ms ease`,
            opacity: 0
        };

        const transitionStyles = {
            entering: { opacity: 0 ,left:"0px"},
            entered: { opacity: 1 ,left:"10%"}
        };

        return (
            <div>
                <Jumbotron fluid className="electrical">
                    <Container className="text-center">
                        <Transition in={true} timeout={duration} appear id="trans1">
                            {(state) => (
                                <div
                                    style={{
                                        ...defaultStyle,
                                        ...transitionStyles[state]
                                    }}
                                >
                                    <h3 className="p-5 bg-light shadow-lg border border-dark rounded-pill">Electrical Component Subsystem</h3>
                                </div>
                            )}
                        </Transition>
                        <br />
                    </Container>
                </Jumbotron>
                <Container>
                    <Row>

                        <Col xl={12} xs={12} className="border rounded p-3 mb-3">
                            <div className="bg-white rounded shadow-lg py-3 px-4 mb-4">
                                <h4 className="text-center text-uppercase">Microcontroller </h4>
                                <hr className="dashed"></hr>
                                <Row>

                                    <Col xs={12} className="mb-3 d-flex">
                                        <Row className="border m-2 p-4">
                                            <Col xs={8} className="p-2">
                                                <h5 className="pl-4 pb-3 ">Arduino nano</h5>
                                                <p className="p-4 justify-content ">The Arduino Nano is a small, complete, and breadboard-friendly board based on the ATmega328 (Arduino Nano 3.x). It has more or less the same functionality of the Arduino Duemilanove, but in a different package. It lacks only a DC power jack, and works with a Mini-B USB cable instead of a standard one.</p>
                                            </Col>
                                            <Col xs={4}>
                                                <img alt="image" src={'./assets/images/project/arduino.jpg'} />
                                            </Col>

                                        </Row>
                                    </Col>
                                </Row>
                            </div>

                            <div className="bg-white rounded shadow-lg py-3 px-4 mb-4">
                                <h4 className="text-center text-uppercase">Sensor Subsystem</h4>
                                <hr className="dashed"></hr>
                                <Carousel id="multi-item-example">

                                    {
                                        elecomp.map((link) =>
                                            <div className="carousel-item">
                                                <Row className="border m-2 p-4">
                                                    <Col xs={3}>
                                                        <img alt="image" src={link.icon} className="float-right" />
                                                    </Col>
                                                    <Col xs={8}>
                                                        <h5 className="p-2">{link.name}</h5>
                                                        <p className="p-2 justify-content">{link.text} </p>
                                                    </Col>
                                                </Row>
                                            </div>
                                        )
                                    }

                                </Carousel>


                            </div>

                            <div className="bg-white rounded shadow-lg py-3 px-4 mb-4">
                                <h4 className="text-center text-uppercase">Batteries </h4>
                                <hr className="dashed"></hr>
                                <Row>
                                    {
                                        batteries.map((link) =>
                                            <Col xs={6} className="mb-3 d-flex">
                                                <Row className="border m-2">
                                                    <Col xs={4} className="p-2 rounded mt-4">
                                                        <img alt="image" src={link.icon} />
                                                    </Col>
                                                    <Col xs={8}>
                                                        <h6 className="p-2">{link.name}</h6>
                                                        <p className="p-2 justify-content">{link.text}</p>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        )
                                    }
                                </Row>
                            </div>

                            <div className="bg-white rounded py-3 px-4 mb-4">
                                <h4 className="text-center text-uppercase">Actuator</h4>
                                <hr className="dashed"></hr>
                                <Row>
                                    {
                                        elecompaccess.map((link) =>
                                            <Col xs={6} className="mb-3 d-flex">
                                                <Card className="flex-fill subcardimg shadow-lg">
                                                    <Card.Img variant="top" src={link.icon} className="img-fluid" />
                                                    <Card.Body>
                                                        <Card.Title>{link.name}</Card.Title>
                                                        <Card.Text className="p-2 justify-content">{link.text}</Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        )
                                    }
                                </Row>
                            </div>
                            <div className="bg-white rounded  py-3 px-4 mb-4">
                                <h4 className="text-center text-uppercase">PCB design</h4>
                                <hr className="dashed"></hr>
                                <Row>
                                    {
                                        pcb.map((link) =>
                                            <Col xs={6} className="mb-3 d-flex shadow-lg">
                                                <Card className="flex-fill subcardimg">
                                                    <Card.Img variant="top" src={link.icon} className="img-fluid"  />
                                                    <Card.Body>
                                                        <Card.Title className="text-center">{link.name}</Card.Title>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        )
                                    }
                                </Row>
                            </div>



                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
export default Electricalcomp;
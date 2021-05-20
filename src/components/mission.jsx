import React from 'react';
import {Jumbotron, Container, Row, Col, Card} from 'react-bootstrap';
import missionconst from '../constants/missiondata';

import { Transition } from 'react-transition-group';
class Mission extends React.Component {
    render() {
        const defaultStyle = {
            opacity: 0
        };
    
        const transitionStyles = {
            entering: { opacity: 0,top: "0px"},
            entered: { opacity: 1, top: "5%"}
        };
        return (
            <div>
                <Jumbotron fluid className="mission">
                </Jumbotron>

                <Container className="text-center mt-5">
                    <h4 class="text-center text-uppercase">Our Mission</h4><hr class="dashed"></hr>
                    <Row>
                        {
                            missionconst.map((data) => 
                            <Transition in={true} timeout={900} appear>
                                {(state) => (
                                    <Col xl={4} xs={4} className={`d-flex p-3 ${data.class}`} style={{
                                        ...defaultStyle,
                                        ...transitionStyles[state],
                                        transition: `900ms ease-in`
                                    }}>
                                        <Card className="flex-fill shadow-lg">
                                            <Card.Body>
                                                <Card.Title><h6 class="text-center text-uppercase">{data.title}</h6><hr class="dashed"></hr></Card.Title>
                                                <Card.Text>
                                                    <p className="para">{data.text}</p>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )}
                            </Transition>
                            )
                        }
                    </Row>
                </Container>

            </div>
        );
    }
}
export default Mission;
import React from 'react';
import { Jumbotron, Container, Row, Col } from 'react-bootstrap';
import { Transition } from 'react-transition-group';
import { carrier } from '../constants/science';

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
                                    <h3>Carrier Subsystem Design</h3>
                                </div>
                            )}
                        </Transition>

                        <br />

                    </Container>


                </Jumbotron>
                <Container>
                    <h4 className="text-center text-uppercase m-4 ">Carrier</h4>
                        <div className="bg-white rounded  py-3 px-4 mb-4">
                            {
                                carrier.map((hs) =>
                                <Row>
                                    <Col xs={12} className="m-4 shadow-lg" >
                                        <h6 className="text-center m-4">{hs.title}</h6>
                                        <img alt="image" alt="image" src={hs.img} className="img-fluid rounded heatimg" />
                                        <div className="text-center m-2 p-4 "><p className="justify-content">{hs.text1}</p></div>
                                    </Col>
                                    </Row>
                                )
                            }
                        </div>
                    
                </Container>

            </div>
        );
    }
}
export default Carrierview;
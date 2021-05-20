import React from 'react';
import { Card, Row , Col} from 'react-bootstrap';
import {carriermain} from "../constants/subsytemlist";

class Carrier extends React.Component {
    render() {

        const list = carriermain.map((link) =>
            <Col xs={12} className="mb-3">
                <Card>
                    <Card.Img variant="top" src={link.icon} />
                    <Card.Body>
                        <Card.Title>{link.name}</Card.Title>
                        <Card.Text>
                            {link.text}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        );


        return (
            <Row>
             <h1 className="text-center text-uppercase">Carrier</h1>
                {list}
            </Row>
        );
    }
}
export default Carrier;
import React from 'react';
import { Card, Row , Col} from 'react-bootstrap';
import subsystemlist from "../constants/subsytemlist";

class Subsystemview extends React.Component {
    render() {
        const list = subsystemlist.map((link) =>
            <Col xs={6} className="mb-3">
                <Card>
                    <Card.Img variant="top" src={link.imgURL} />
                    <Card.Body>
                        <Card.Title>{link.name}</Card.Title>
                        <Card.Text>
                            {link.info}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        );

        return (
            <Row>
                {list}
            </Row>
        );
    }
}
export default Subsystemview;
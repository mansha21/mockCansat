import React from 'react';
import { Row, Col} from 'react-bootstrap';
import members from '../constants/contacts';
import { Transition } from 'react-transition-group';


class Teamview extends React.Component {
    render() {
        let duration = 800;

        const defaultStyle = {
            opacity: 0
        };

        const transitionStyles = {
            entering: { opacity: 0},
            entered: { opacity: 1}
        };
        let delay_index = 0;

        const listItems = members.map((data) => {
            return(
                <Col xs={12} className="col-12 border rounded p-3">
                    <div className="text-center mb-3">
                        <h2>{data.title}</h2>
                    </div>
                    <Row>
                        { 
                            data.list.map((link) => {
            delay_index += 2;
            const delay = Math.max(0, delay_index*300);

            return (
            <Transition in={true} timeout={duration} appear>
            {(state) => (
                
                <Col xl={3} xs={3} className="mb-3 d-flex" style={{
                    ...defaultStyle,
                    ...transitionStyles[state],
                    transition: `${delay}ms ease-in`
                }}>
                    <div className="bg-white rounded shadow-sm py-5 px-4 flex-fill img-hover-zoom--quick-zoom">
                        <img alt="images"  src={link.img} className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"/>
                        <h5 className="mb-0">{link.name}</h5>
                        <span className="small text-uppercase text-muted">{link.number}</span>
                        <ul className="social mb-0 list-inline mt-3">
                            <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-facebook-f"></i></a></li>
                            <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-twitter"></i></a></li>
                            <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-instagram"></i></a></li>
                            <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-linkedin"></i></a></li>
                        </ul>
                    </div>
                </Col>
            )}
            </Transition>
            )
                            })
                        }
                    </Row>
                </Col>
            )});
        return (
                    <Row className="text-center">
                        
                                {listItems}
                        
                    </Row>
        );
    }
}
export default Teamview;
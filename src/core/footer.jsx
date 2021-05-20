import React from 'react';
import { Navbar} from 'react-bootstrap';

class Footer extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" className="flex-column" >
            <p className="d-inline ">© Copyright 2021. All Rights Reserved by Team A</p>
            <br />
                
                <div className="text-center d-inline">
                    <ul className="social mb-0 list-inline mt-3" >
                        <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-facebook-f"></i></a></li>
                        <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-twitter"></i></a></li>
                        <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-instagram"></i></a></li>
                        <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-linkedin"></i></a></li>
                    </ul>
                </div>
            </Navbar>
        );
    }
}
export default Footer;
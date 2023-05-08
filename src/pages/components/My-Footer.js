import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const MyFooter = () => {
  return (
    <div className="bg-dark mt-auto">
        <footer>
        <Container className="p-3">
            <p className="text-center text-white">Thank you for visiting this website</p>
            <p className="text-center mt-5 text-white">Follow us on social media:</p>
            <Row>
            <Col className="text-center">
                <Link to="/">Instagram</Link>
            </Col>
            <Col className="text-center">
                <a href="/">Facebook</a>
            </Col>
            <Col className="text-center">
                <a href="/">Twitter</a>
            </Col>
            </Row>
        </Container>
        </footer>
    </div>
  );
};

export default MyFooter;

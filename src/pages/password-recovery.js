// PasswordRecovery.js
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, CardHeader, CardFooter, Form, FormGroup, Button } from 'reactstrap';

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setMessage('');
    const res = await fetch(`${process.env.REACT_APP_API_ADDRESS}passwordRecovery.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      const { message } = await res.json();
      setMessage(message);
    } else {
      const { message } = await res.json();
      setError(message);
    }
  };

  return (
    <section className="vh-100 gradient-custom">
      <Container className="py-5 h-100">
        <Row className="d-flex justify-content-center align-items-center h-100">
          <Col className="col-12 col-md-8 col-lg-6 col-xl-4">
            <Card className="card bg-dark text-white text-center" style={{ borderRadius: '0.5rem' }}>
              <CardHeader>
                <h2 className="fw-bold mb-0 text-uppercase">Recuperar senha</h2>
              </CardHeader>
              <CardBody className="p-4">
                <Form onSubmit={handleSubmit}>
                  <FormGroup className="form-floating  mb-3">
                    <input
                      type="email"
                      className="form-control form-control-sm"
                      id="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <label htmlFor="email" className="text-secondary">
                      Email
                    </label>
                  </FormGroup>
                  <Button className="w-100 btn btn-lg btn-primary" type="submit">
                    Enviar link de recuperação
                  </Button>
                  {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}
                  {message && <div className="alert alert-success mt-3" role="alert">{message}</div>}
                </Form>
              </CardBody>
              <CardFooter>
                <p className="mb-0">
                  Lembrei da senha! <Link className="text-white-50 fw-bold" to="/login">Login</Link>
                </p>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PasswordRecovery;

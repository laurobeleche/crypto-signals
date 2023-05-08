//login.js
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, CardHeader, CardFooter, Form, FormGroup, Button } from 'reactstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    const res = await fetch(`${process.env.REACT_APP_API_ADDRESS}login.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const { token, decoded } = await res.json(); // Obter o token da resposta
      localStorage.setItem('token', token); // Armazenar o token no localStorage
      localStorage.setItem('decoded', decoded); // Armazenar o token no localStorage
      navigate('/dashboard');
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
            <CardHeader><h2 className="fw-bold mb-0 text-uppercase">Login</h2></CardHeader>
              <CardBody className="p-4">
                <Form onSubmit={handleSubmit}>
                  <FormGroup className="form-floating  mb-3">
                    <input type="email" className="form-control form-control-sm" id="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <label htmlFor="email" className="text-secondary">Email</label>
                  </FormGroup>
                  <FormGroup className="form-floating  mb-3">
                    <input type="password" className="form-control form-control-sm" id="password" placeholder="****" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <label htmlFor="password" className="text-secondary">Password</label>
                  </FormGroup>
                  <p className="small mb-2 pb-lg-2"><Link className="text-white-50" to='/forgot'>Forgot password?</Link></p>
                  <Button className="w-100 btn btn-lg btn-primary" type="submit">Login</Button>
                  {error && <div className="alert alert-danger" role="alert">{error}</div>}
                </Form>
              </CardBody>
              <CardFooter>
                <p className="mb-0">Don't have an account? <Link className="text-white-50 fw-bold" to="/signup">Sign Up</Link></p>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;

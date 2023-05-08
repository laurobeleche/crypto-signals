// resetPassword.js
import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, CardHeader, CardFooter, Form, FormGroup, Button } from 'reactstrap';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  // Adicione esta linha para obter o objeto 'location'
  const location = useLocation();

  // Adicione esta função para analisar os parâmetros de consulta
  const getQueryParams = (query) => {
    const queryParams = new URLSearchParams(query);
    return {
      hash: queryParams.get('hash'),
    };
  };

  // Obtenha os parâmetros de consulta usando a função 'getQueryParams'
  const { hash } = getQueryParams(location.search);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== repeatPassword) {
      setError('As senhas não correspondem.');
      return;
    }

    setError('');
    setMessage('');
    const res = await fetch(`${process.env.REACT_APP_API_ADDRESS}resetPassword.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ hash, newPassword }),
    });

    if (res.ok) {
      const { message } = await res.json();
      setMessage(message);
      setTimeout(() => navigate('/login'), 3000);
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
                <h2 className="fw-bold mb-0 text-uppercase">Redefinir senha</h2>
              </CardHeader>
              <CardBody className="p-4">
                <Form onSubmit={handleSubmit}>
                  <FormGroup className="form-floating  mb-3">
                    <input
                      type="password"
                      className="form-control form-control-sm"
                      id="newPassword"
                      placeholder="******"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    <label htmlFor="newPassword" className="text-secondary">
                      Nova senha
                    </label>
                  </FormGroup>
                  <FormGroup className="form-floating  mb-3">
                    <input
                      type="password"
                      className="form-control form-control-sm"
                      id="repeatPassword"
                      placeholder="******"
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                      required
                    />
                    <label htmlFor="repeatPassword" className="text-secondary">
                      Repetir senha
                    </label>
                  </FormGroup>
                  <Button className="w-100 btn btn-lg btn-primary" type="submit">
                    Redefinir senha
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

export default ResetPassword;
         

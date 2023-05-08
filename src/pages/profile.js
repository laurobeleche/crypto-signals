// pages/profile.js
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { Container, Form, FormGroup, Label, Input, Button, Card, CardBody, CardHeader, Row, Col } from 'reactstrap';
import axios from 'axios';
import withAuth from '../hoc/withAuth'; // Importe o HOC
import MyToast from './components/My-Toast';
import StatusAlert from './components/Status-Alert'; // Importe o componente StatusAlert

function Profile(props) {
  const [user, setUser] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastTitle, setToastTitle] = useState('');
  const [toastText, setToastText] = useState('');
  const [bgClass, setBgClass] = useState('');
  const { userStatus } = props; // Obtenha o userStatus das props

  // Define a função para esconder o Toast automaticamente
  const hideToast = () => setShowToast(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswordForm({ ...passwordForm, [name]: value });
  };

  const isPasswordMatch = () => {
    return (
      passwordForm.newPassword === passwordForm.confirmPassword &&
      passwordForm.newPassword.length >= 6
    );
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    try {
      passwordForm.token = localStorage.getItem('token');
      const response = await axios.put(`${process.env.REACT_APP_API_ADDRESS}updatePass.php`, passwordForm);
      
      setShowToast(true);
      setTimeout(hideToast, 3000); // Fechar o toast após 3 segundos
      setToastTitle('Sucesso');
      setToastText(response.data.message);
      setBgClass('bg-success');

    } catch (error) {
      setShowToast(true);
      setTimeout(hideToast, 3000); // Fechar o toast após 3 segundos
      setToastTitle('Erro');
      setToastText(error.response.data.message);
      setBgClass('bg-danger');
    }
  };

  useEffect(() => {
    async function fetchUser() {
      const response = await axios.get(`${process.env.REACT_APP_API_ADDRESS}getUser.php?token=${localStorage.getItem('token')}`);
      setUser(response.data.user);
      
    }
    fetchUser();
  }, [showToast]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      user.token = localStorage.getItem('token');
      const response = await axios.put(`${process.env.REACT_APP_API_ADDRESS}updateUser.php`, user);
      
      setShowToast(true);
      setTimeout(hideToast, 3000); // Fechar o toast após 3 segundos
      setToastTitle('Sucesso');
      setToastText(response.data.message);
      setBgClass('bg-success');

    } catch (error) {
      setShowToast(true);
      setTimeout(hideToast, 3000); // Fechar o toast após 3 segundos
      setToastTitle('Erro');
      setToastText(error.response.data.message);
      setBgClass('bg-danger');
    }
  };
  

  return (
    <div style={{backgroundColor: '#dddddd', paddingBottom: 20}}>
      <Navbar />
      <MyToast isOpen={showToast} title={toastTitle} message={toastText} bgClass={bgClass}/>
      <Container className="mt-4">
        <StatusAlert userStatus={userStatus} />
        <Row>
          <Col>
            <Card>
              <CardHeader><h2>Profile</h2></CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="name"><b>Nome</b></Label>
                    <Input type="text" name="nome" id="nome" value={user.nome || ''} onChange={handleInputChange} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="telegram"><b>Telegram</b></Label>
                    <Input type="text" name="telegram" id="telegram" value={user.telegram || ''} onChange={handleInputChange} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="apiKey"><b>API Key</b></Label>
                    <Input type="text" name="apikey" id="apikey" value={user.apikey || ''} onChange={handleInputChange} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="apiSecret"><b>API Secret</b></Label>
                    <Input type="text" name="secret" id="secret" value={user.secret || ''} onChange={handleInputChange} />
                  </FormGroup>
                  <Button type="submit" color="primary">Salvar</Button>
                </Form>

              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardHeader>
                <h2>Password</h2>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handlePasswordSubmit}>
                  <FormGroup>
                    <Label for="currentPassword">
                      <b>Senha Atual</b>
                    </Label>
                    <Input
                      type="password"
                      name="currentPassword"
                      id="currentPassword"
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="newPassword">
                      <b>Nova Senha</b>
                    </Label>
                    <Input
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="confirmPassword">
                      <b>Repita a Senha</b>
                    </Label>
                    <Input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange}
                    />
                  </FormGroup>
                  <Button type="submit" color="primary" disabled={!isPasswordMatch()}>
                    Salvar
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default withAuth(Profile);

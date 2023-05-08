// components/StatusAlert.js
import { React, useState } from 'react';
import { Alert, Button } from 'reactstrap';
import axios from 'axios';
import MyToast from './My-Toast';

const StatusAlert = ({ userStatus }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastTitle, setToastTitle] = useState('');
  const [toastText, setToastText] = useState('');
  const [bgClass, setBgClass] = useState('');
  // Define a função para esconder o Toast automaticamente
  const hideToast = () => setShowToast(false);
  const handleResendEmail = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_ADDRESS}enviarEmail.php`, { token: localStorage.getItem('token') });
      
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
  if (userStatus === 0) {
    return (
      <Alert color="warning">
        <MyToast isOpen={showToast} title={toastTitle} message={toastText} bgClass={bgClass}/>
        Sua conta ainda não foi verificada, por favor verifique sua conta.{' '}
        <Button onClick={handleResendEmail} style={{ textDecoration: 'underline' }}>
          Envie o e-mail novamente
        </Button>
      </Alert>
    );
  } else {
    return null;
  }
};

export default StatusAlert;

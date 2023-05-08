// ativarConta.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function AtivarConta() {
  const [message, setMessage] = useState('');
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

  useEffect(() => {
    async function activateAccount() {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_ADDRESS}activateAccount.php`, { hash });

        if (response.data.success) {
          setMessage(response.data.message);
        } else {
          setMessage(response.data.message);
        }
      } catch (error) {
        console.error(error);
        setMessage('Ocorreu um erro ao tentar ativar sua conta. Por favor, tente novamente.');
      }
    }

    activateAccount();
  }, [hash]);

  return (
    <div>
      <h2>Ativação da conta</h2>
      <p>{message}</p>
    </div>
  );
}

export default AtivarConta;

// hoc/withAdminAuth.js
import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const withAdminAuth = (WrappedComponent) => {
  const AdminAuth = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const checkAdminStatus = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_ADDRESS}checkAdminStatus.php?token=${localStorage.getItem('token')}`);
          
          if (!response.data.isAdmin) {
            navigate('/dashboard'); // Redirecionar para a dashboard normal se o usuário não for um administrador
          }
        } catch (error) {
          console.error(error);
          navigate('/'); // Redirecionar para a página inicial em caso de erro
        }
      };
      checkAdminStatus();
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };

  return AdminAuth;
};

export default withAdminAuth;

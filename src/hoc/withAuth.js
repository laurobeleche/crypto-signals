import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();
    const [userStatus, setUserStatus] = useState(null);

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        setUserStatus(decodedToken.status); // Adicionado: armazenar o status do usuário no estado
        if (decodedToken.exp < Date.now() / 1000) {
          navigate('/login');
        }
      } catch (error) {
        navigate('/login');
      }
    }, [navigate]);
    
    return <WrappedComponent {...props} userStatus={userStatus} />; // Adicionado: passar o status do usuário como uma prop
  };
};

export default withAuth;

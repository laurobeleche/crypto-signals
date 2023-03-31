import { useState } from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Input, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Cookiess from "cookie";
import Cookies from "js-cookie";

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
      
        if (response.ok) {
          // Armazene o token de autenticação como um cookie, se necessário
          const data = await response.json();
          Cookies.set('authToken', data.token);

          // Redireciona para a dashboard
          router.push('/dashboard');
        } else {
          // Exiba uma mensagem de erro ou atualize o estado do componente com o erro
        }
    };
    
  return (
    <Flex alignItems="center" justifyContent="center" minHeight="100vh">
      <Box width="400px">
        <Text fontSize="2xl" mb={4}>Login</Text>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Senha</FormLabel>
              <Input
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormControl>
            <Button type="submit" colorScheme="blue">
              Entrar
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const { authToken } = Cookiess.parse(req.headers.cookie || "");

  if (authToken) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

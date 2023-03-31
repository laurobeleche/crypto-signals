import { useState } from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Input, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Cookies from "cookie";

export default function Signup() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        
        if (response.ok) {
            // Redirecionar para a página de sucesso ou atualizar o estado do componente
            router.push('/login');
        } else {
            // Exibir mensagem de erro
        }
    };
      

  return (
    <Flex alignItems="center" justifyContent="center" minHeight="100vh">
      <Box width="400px">
        <Text fontSize="2xl" mb={4}>Cadastre-se</Text>
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
              Cadastrar
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const { authToken } = Cookies.parse(req.headers.cookie || "");

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
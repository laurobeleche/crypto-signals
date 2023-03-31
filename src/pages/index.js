import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';

export default function Home() {
  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <Box textAlign="center" mb={4}>
        <Heading as="h1" size="2xl">Crypto Signals</Heading>
        <Text>Apresentação e venda do serviço</Text>
      </Box>
      <Button as="a" href="/signup" colorScheme="blue" mr={4}>
        Cadastre-se
      </Button>
      <Button as="a" href="/login" variant="outline" colorScheme="blue">
        Login
      </Button>
    </Flex>
  );
}
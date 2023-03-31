import Head from "next/head";
import { useRouter } from "next/router";
import { Button, Container, Flex, Heading, Icon, Link, Stack, Text } from "@chakra-ui/react";
import { FiLogOut, FiHome, FiUsers, FiSettings, FiHelpCircle } from "react-icons/fi";
import Cookies from "cookie";

export default function Dashboard({ userEmail }) {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    router.push("/login");
  };

  return (
    <>
      <Head>
        <title>Dashboard - Crypto Signals</title>
        <meta name="description" content="Dashboard page for Crypto Signals" />
      </Head>
      <Flex minH="100vh" direction="column">
        {/* Header */}
        <Flex bg="blue.900" color="white" align="center" px="4" py="3">
          <Heading size="md" mr="6">
            Crypto Signals
          </Heading>
          <Button leftIcon={<FiLogOut />} variant="link" onClick={handleLogout}>
            Logout
          </Button>
        </Flex>
        {/* Body */}
        <Flex flex="1" direction="row">
          {/* Sidebar */}
          <Flex bg="gray.100" w="64" direction="column" p="6">
            <Stack spacing="4">
              <Link href="/" display="flex" alignItems="center" fontWeight="semibold">
                <Icon as={FiHome} mr="2" />
                Dashboard
              </Link>
              <Link href="/users" display="flex" alignItems="center" fontWeight="semibold">
                <Icon as={FiUsers} mr="2" />
                Users
              </Link>
              <Link href="/settings" display="flex" alignItems="center" fontWeight="semibold">
                <Icon as={FiSettings} mr="2" />
                Settings
              </Link>
              <Link href="/help" display="flex" alignItems="center" fontWeight="semibold">
                <Icon as={FiHelpCircle} mr="2" />
                Help
              </Link>
            </Stack>
          </Flex>
          {/* Main content */}
          <Flex flex="1" direction="column" p="6">
            <Container maxW="container.md">
              <Text fontSize="xl" mb="4">
                Olá {userEmail}, seja bem-vindo!
              </Text>
              <Text fontSize="md">
                Bem-vindo à sua dashboard do Crypto Signals. Aqui você pode gerenciar suas preferências de sinalização,
                configurar notificações e ver informações sobre o seu histórico de negociação.
              </Text>
            </Container>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const { authToken } = Cookies.parse(req.headers.cookie || "");

  if (!authToken) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const response = await fetch("http://localhost:3000/api/getUserEmail", {
    headers: {
      Authorization: authToken,
    },
  });
  /*
  if (!response.ok) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }*/

  const { userEmail } = await response.json();

  return {
    props: {
      userEmail,
    },
  };
}

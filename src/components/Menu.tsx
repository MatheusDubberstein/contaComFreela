import { HStack, Image, Button, Flex, Link, Text, Box } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { PiSignIn } from "react-icons/pi";
import { checkAuth, getUser } from "../scripts/auth";
import { useState } from "react";
import { getUserData } from "../scripts/user";
import logoImage from "../assets/logo.svg";
function getSelectedRouteColor(selected: boolean) {
  return selected
    ? { color: "#1C1C1C", weight: "700" }
    : { color: "#808080", weight: "400" };
}

export default function Menu() {
  const [user] = useState(() => getUser());
  const [userData] = useState(() => getUserData());
  const location = useLocation();
  return (
    <HStack
      paddingX="150px"
      my="20px"
      height="60px"
      justifyContent="space-between"
    >
      <Image src={logoImage} h="42px" />
      <Flex gap="48px">
        <Link
          as={RouterLink}
          to={"/"}
          fontSize="18px"
          fontWeight={getSelectedRouteColor(location.pathname === "/").weight}
          color={getSelectedRouteColor(location.pathname === "/").color}
        >
          Home
        </Link>
        <Link
          as={RouterLink}
          to={"/criar-freela"}
          fontSize="18px"
          fontWeight={
            getSelectedRouteColor(location.pathname === "/criar-freela").weight
          }
          color={
            getSelectedRouteColor(location.pathname === "/criar-freela").color
          }
        >
          Criar um freela
        </Link>
        <Link
          as={RouterLink}
          to={"/encontrar-freela"}
          fontSize="18px"
          fontWeight={
            getSelectedRouteColor(location.pathname === "/encontrar-freela")
              .weight
          }
          color={
            getSelectedRouteColor(location.pathname === "/encontrar-freela")
              .color
          }
        >
          Encontrar um freela
        </Link>
        <Link
          as={RouterLink}
          to={"/sobre"}
          fontSize="18px"
          fontWeight={
            getSelectedRouteColor(location.pathname === "/sobre").weight
          }
          color={getSelectedRouteColor(location.pathname === "/sobre").color}
        >
          Sobre a gente
        </Link>
      </Flex>
      <Flex>
        {checkAuth() ? (
          <Link as={RouterLink} to="/perfil">
            <Flex alignItems="center" justifyContent="center" gap="20px">
              <Text fontWeight="700">{userData.name}</Text>
              {user.photoURL ? (
                <Image src={user.photoURL} h="50px" borderRadius="100%" />
              ) : (
                <Box w="50px" bg="#38A169" h="50px" borderRadius="100%" />
              )}
            </Flex>
          </Link>
        ) : (
          <Button
            leftIcon={<PiSignIn />}
            color="cyan.100"
            background="cyan.600"
            _hover={{ bg: "cyan.400" }}
            as={RouterLink}
            to="/logar"
          >
            Entrar
          </Button>
        )}
      </Flex>
    </HStack>
  );
}

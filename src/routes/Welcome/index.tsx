import Menu from "../../components/Menu";
import backgroundUrl from "../../assets/background.png";
import guy from "../../assets/guy.png";
import waveWelcome from "../../assets/waveWelcome.svg";
import play from "../../assets/play.svg";
import pin from "../../assets/pin.svg";
import pin2 from "../../assets/pin2.svg";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import Qualification from "../../components/Qualification";
import { useEffect, useState } from "react";
import { getCompanyList, getUserList } from "../../scripts/user";
import { getJobList } from "../../scripts/jobs";
import Jobs from "../../components/Jobs";

export default function Welcome() {
  const [companyCount, setCompanyCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [jobsCount, setJobsCount] = useState(0);
  async function getCompanyListCount() {
    const companyList = await getCompanyList();
    setCompanyCount(companyList.length);
  }
  async function getUserListCount() {
    const userList = await getUserList();
    setUserCount(userList.length);
  }
  async function getJobsListCount() {
    const jobList = await getJobList();
    setJobsCount(jobList.length);
  }

  useEffect(() => {
    getCompanyListCount();
    getUserListCount();
    getJobsListCount();
  }, []);

  return (
    <>
      <Menu />
      <Grid
        h="100%"
        w="100%"
        gridTemplateRows="calc(100% - 262px) 162px "
        pos="relative"
      >
        <Flex alignItems="center" justifyContent="center" pos="relative">
          <Flex
            w="698px"
            flexDirection="column"
            mr="300px"
            gap="36px"
            zIndex={1}
          >
            <Text fontSize="52px" fontWeight="700" color="#1C1C1C">
              Um novo modo de se trabalhar como{" "}
              <Text as="b" fontWeight="900" color="#38A169">
                Contador
              </Text>{" "}
              de qualquer lugar e fácil!
            </Text>
            <Text color="#808080" fontSize="15px" w="480px">
              O Conta com o Freela é uma plataforma que veio para revolucionar o
              modo de trabalho de um contador tradicional, trazendo
              flexibilidade e agilidade no dia a dia.
            </Text>

            <Flex alignItems="center" justifyContent="center" gap="48px">
              <Button
                h="48px"
                bg="#00B5D8"
                color="white"
                _hover={{ opacity: "90%" }}
              >
                procurar um Freela
              </Button>
              <Link>
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  gap="8px"
                  fontWeight="700"
                >
                  <Image src={play} /> Como que funciona?
                </Flex>
              </Link>
            </Flex>
          </Flex>

          <Image
            src={waveWelcome}
            pos="absolute"
            zIndex={0}
            h="554px"
            right="290px"
          />
          <Image
            src={guy}
            pos="absolute"
            zIndex={0}
            right="320px"
            bottom="0"
            width="300px"
          />
          <Image
            src={pin}
            pos="absolute"
            zIndex={0}
            left="-75px"
            top="0"
            w="140px"
          />
          <Image
            src={pin2}
            pos="absolute"
            zIndex={0}
            bottom="50px"
            right="620px"
            w="80px"
          />
        </Flex>
        <Flex
          h="100%"
          w="100%"
          pos="relative"
          bgGradient="linear(to-r, #0BC5EA, #2E3899)"
          align="center"
          justifyContent="center"
        >
          <Image
            src={backgroundUrl}
            opacity="4%"
            pos="absolute"
            height="162px"
            width="100%"
            objectFit="cover"
            zIndex="0"
            top="0"
            right="0"
            bgRepeat="repeat"
          />
          <Flex>
            <VStack color="white" px="84px">
              <Text fontSize="48px" fontWeight="900">
                {jobsCount}+
              </Text>
              <Text mt="-20px">Freelas</Text>
            </VStack>
            <VStack
              color="white"
              px="84px"
              borderLeft="1px"
              borderColor="rgba(255,255,255,0.3)"
            >
              <Text fontSize="48px" fontWeight="900">
                {companyCount}
              </Text>
              <Text mt="-20px">Empresas</Text>
            </VStack>
            <VStack
              color="white"
              px="84px"
              borderLeft="1px"
              borderColor="rgba(255,255,255,0.3)"
            >
              <Text fontSize="48px" fontWeight="900">
                {userCount}
              </Text>
              <Text mt="-20px">Usuários</Text>
            </VStack>
          </Flex>
        </Flex>
        <Box
          h="124px"
          w="124px"
          bg="#38A169"
          pos="absolute"
          right="-62px"
          bottom="204px"
          borderRadius="100%"
        ></Box>
        <Box
          h="162px"
          w="162px"
          bg="#38A169"
          pos="absolute"
          left="-62px"
          bottom="20px"
          borderRadius="100%"
        ></Box>
      </Grid>
      <Qualification />
      <Flex mt="36px" w="100%" flexDirection="column" justifyContent="center">
        <Heading textAlign="center">
          Os trabalhos selecionados para você
        </Heading>
        <Jobs />
      </Flex>
    </>
  );
}

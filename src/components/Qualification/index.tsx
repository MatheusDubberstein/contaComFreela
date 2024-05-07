import {
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

import digitalPlataform from "../../assets/digitalPlataform.png";
import interation from "../../assets/interation.png";
import flexibleTime from "../../assets/flexibleTime.png";
export default function Qualification() {
  return (
    <VStack>
      <Flex fontSize="40px" color="#1c1c1c">
        <Text color="#38A169" fontWeight="700">
          Por que somos os melhores
        </Text>
        &nbsp; em relação aos outros?
      </Flex>
      <Text mt="16px" mb="32px">
        Somos uma plataforma totalmente digital onde você conduz todo o processo
        de comunicação e interação com seus futuros clientes.
      </Text>
      <Grid
        gridTemplateColumns="repeat(3, 360px)"
        gridTemplateRows="236px"
        gridGap="20px"
      >
        <GridItem border="1px solid rgba(82,95,255,0.16)" borderRadius="16px">
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            h="100%"
          >
            <Image src={digitalPlataform} h="100px" w="100px" />
            <Heading fontSize="22px" color="#1c1c1c">
              Plataforma Digital
            </Heading>
            <Text color="#4D4D4D" fontSize="14px" textAlign="center">
              Uma plataforma totalmente online, excluindo a necessidade de
              interações físicas
            </Text>
          </Flex>
        </GridItem>
        <GridItem border="1px solid rgba(82,95,255,0.16)" borderRadius="16px">
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            h="100%"
          >
            <Image src={interation} h="100px" w="100px" />
            <Heading fontSize="22px" color="#1c1c1c">
              Interação Efetiva
            </Heading>
            <Text color="#4D4D4D" fontSize="14px" textAlign="center">
              Você totalmente no comando na interação com o cliente
            </Text>
          </Flex>
        </GridItem>
        <GridItem border="1px solid rgba(82,95,255,0.16)" borderRadius="16px">
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            h="100%"
          >
            <Image src={flexibleTime} h="100px" w="100px" />
            <Heading fontSize="22px" color="#1c1c1c">
              Tempo Flexivel
            </Heading>
            <Text color="#4D4D4D" fontSize="14px" textAlign="center">
              Você que faz toda a sua carga horária
            </Text>
          </Flex>
        </GridItem>
      </Grid>
    </VStack>
  );
}

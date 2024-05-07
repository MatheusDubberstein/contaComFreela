import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Link,
  Tag,
  Text,
} from "@chakra-ui/react";
import { JobProps } from "../../routes/CreateJob";
import { useEffect, useState } from "react";
import { getJobList } from "../../scripts/jobs";
import { checkAuth } from "../../scripts/auth";
import { getUserById } from "../../scripts/user";
import { FaWhatsapp } from "react-icons/fa";
type JobPropsList = JobProps & {
  userName: string;
};

export default function Jobs() {
  const [jobsList, setJobsList] = useState<JobPropsList[]>([]);
  const isAuthenticated = checkAuth();
  async function getData() {
    const jobsList = await getJobList();
    const data: JobPropsList[] = [];
    for (let i = 0; i < jobsList.length; i++) {
      const user = await getUserById(jobsList[i].personId);
      data.push({ ...jobsList[i], userName: user.name });
    }
    setJobsList(data);
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <Flex direction="column" w="100%" gap="16px" alignItems="center">
      <Grid gridTemplateColumns="repeat(3, 344px)" gap="16px" my="32px">
        {jobsList.map((job, index) => (
          <GridItem
            p="16px"
            borderRadius="16px"
            boxShadow="2xl"
            minH="250px"
            key={index}
          >
            <Flex h="100%" direction="column" justifyContent="space-between">
              <Box>
                <Heading color="#1c1c1c" fontSize="24px">
                  {job.title}
                </Heading>
                <Text mb="16px">{job.userName}</Text>
                {job.tags && (
                  <Flex gap="4px">
                    {job.tags.map((tag, index) => (
                      <Tag key={index}>{tag}</Tag>
                    ))}
                  </Flex>
                )}
                <Box
                  p="10px"
                  dangerouslySetInnerHTML={{ __html: job.description }}
                />
              </Box>
              <Flex flexDirection="column">
                <Text fontWeight="700">R${job.price}</Text>
                {isAuthenticated && (
                  <Button
                    as={Link}
                    target="_blank"
                    href={`https://wa.me/${job.phone.replace(
                      /[^0-9]/g,
                      ""
                    )}?text=Tenho%20interesse%20no%20${job.title.replace(
                      / /g,
                      "%20"
                    )}`}
                    colorScheme="whatsapp"
                    w="100%"
                    leftIcon={<FaWhatsapp />}
                  >
                    Entrar em contato
                  </Button>
                )}
              </Flex>
            </Flex>
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
}

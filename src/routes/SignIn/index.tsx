import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  Flex,
  InputGroup,
  InputLeftElement,
  Icon,
  Text,
  Grid,
  GridItem,
  Box,
  Image,
  FormControl,
  FormErrorMessage,
  useToast,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Form, Field, Formik, FieldProps } from "formik";
import { MdEmail, MdPassword } from "react-icons/md";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import * as Yup from "yup";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../../main";
import { ProfileProps } from "../Profile";
import { getUserList, updateUserList } from "../../scripts/user";
import { useEffect } from "react";
type FormProps = {
  email: string;
  password: string;
};

export default function SignIn() {
  const auth = getAuth();
  const toast = useToast();
  const db = getFirestore(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  auth.languageCode = "pt-br";

  useEffect(() => {
    window.localStorage.clear();
  }, []);

  function signInWithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          const user = result.user;
          window.localStorage.setItem("user", JSON.stringify(user));
          getUserList().then((users) => {
            const userExists = users.find((u) => u.uid === user.uid);
            if (!userExists) {
              addDoc(collection(db, "people"), {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
              }).then(() => {
                updateUserList();
                toast({
                  title: "Conta criada com sucesso",
                  description: `Parabéns ${user.displayName} agora você tem uma conta no maior site de freelance de contabilidade do Brasil.`,
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
                navigate("/");
              });
            } else {
              updateUserList();
              window.localStorage.setItem(
                "userData",
                JSON.stringify(userExists)
              );
              toast({
                title: "Login realizado com sucesso",
                description: `Bem-vindo de volta ${user.displayName}, sentimos a sua falta.`,
                status: "success",
                duration: 9000,
                isClosable: true,
              });
              navigate("/");
            }
          });
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.log({ errorCode, errorMessage, email, credential });
        return;
      });
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("E-mail invalido!")
      .required("O e-mail é obrigatório!"),
    password: Yup.string().required("A senha é obrigatória."),
  });

  return (
    <Grid
      templateColumns="1fr 1fr"
      alignItems="center"
      justifyContent="center"
      h="100vh"
      w="100vw"
    >
      <GridItem>
        <Flex h="100vh" w="100%" alignItems="center" justifyContent="center">
          <Flex direction="column" w="364px" gap="20px">
            <Text as="h1" fontWeight="700" fontSize="5xl" textAlign="center">
              ENTRAR
            </Text>
            <Formik
              initialValues={
                { email: "", password: "", newUser: false } as FormProps
              }
              validationSchema={validationSchema}
              onSubmit={(values, actions) => {
                signInWithEmailAndPassword(auth, values.email, values.password)
                  .then((userCredential) => {
                    const user = userCredential.user;

                    getDocs(collection(db, "people")).then((querySnapshot) => {
                      querySnapshot.forEach((doc) => {
                        const data = doc.data() as ProfileProps;
                        if (data.uid === user.uid) {
                          toast({
                            title: "Login realizado com sucesso",
                            description: `Bem-vindo de volta ${data.name}, sentimos a sua falta.`,
                            status: "success",
                            duration: 9000,
                            isClosable: true,
                          });
                          window.localStorage.setItem(
                            "user",
                            JSON.stringify(user)
                          );
                          navigate("/");
                        }
                      });
                    });
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log({ errorCode, errorMessage });
                  });
                actions.setSubmitting(false);
              }}
            >
              {(props) => (
                <>
                  <Form>
                    <Flex direction="column" w="364px" gap="20px">
                      <Field name="email">
                        {({ field, form }: FieldProps<"email", FormProps>) => (
                          <FormControl
                            isInvalid={Boolean(
                              form.errors.email && form.touched.email
                            )}
                          >
                            <InputGroup>
                              <InputLeftElement pointerEvents="none">
                                <Icon as={MdEmail} color="gray.600" mt="8px" />
                              </InputLeftElement>
                              <Input
                                bg="#F4FDFF"
                                border="none"
                                size="lg"
                                width="100%"
                                borderRadius="16px"
                                placeholder="Digite seu e-mail"
                                {...field}
                              />
                            </InputGroup>
                            <FormErrorMessage>
                              {form.errors.email}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="password">
                        {({ field, form }: FieldProps<string, FormProps>) => (
                          <FormControl
                            isInvalid={Boolean(
                              form.errors.password && form.touched.password
                            )}
                          >
                            <InputGroup>
                              <InputLeftElement pointerEvents="none">
                                <Icon
                                  as={MdPassword}
                                  color="gray.600"
                                  mt="8px"
                                />
                              </InputLeftElement>
                              <Input
                                bg="#F4FDFF"
                                border="none"
                                placeholder="Digite sua senha"
                                size="lg"
                                width="100%"
                                borderRadius="16px"
                                type="password"
                                {...field}
                              />
                            </InputGroup>
                            <FormErrorMessage>
                              {form.errors.password}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Button
                        h="52px"
                        color="white"
                        fontWeight="700"
                        bgGradient="linear(to-tr, #0BC5EA, #5038ED)"
                        borderRadius="16px"
                        isLoading={props.isSubmitting}
                        type="submit"
                        _hover={{
                          opacity: "90%",
                        }}
                      >
                        ENTRAR
                      </Button>
                    </Flex>
                  </Form>
                </>
              )}
            </Formik>
            <ChakraLink as={Link} to="/criar-conta">
              Criar Conta
            </ChakraLink>
            <Flex alignItems="center" justifyContent="center" pos="relative">
              <Box
                bg="#F0EDFF"
                w="100%"
                h="1px"
                pos="absolute"
                top="13px"
                zIndex={0}
              />
              <Text bg="white" zIndex={1} px="50px" color="#525252">
                OU
              </Text>
            </Flex>
            <Button
              borderRadius="16px"
              border="1px solid #F0EDFF"
              h="56px"
              bg="transparent"
              onClick={signInWithGoogle}
            >
              <Image src="./src/assets/google.png" mr="10px" />
              <Text fontWeight="300">
                Entrar com o <Text as="b">google</Text>
              </Text>
            </Button>
          </Flex>
        </Flex>
      </GridItem>
      <GridItem>
        <Flex
          bgGradient="linear(to-bl, #319795, #5038ED)"
          h="100vh"
          w="100%"
          pos="relative"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src="./src/assets/background.png"
            opacity="4%"
            pos="absolute"
            zIndex="0"
            top="0"
            right="0"
            bgRepeat="repeat"
          />
          <Box
            width="512px"
            h="624px"
            bg="white"
            bgColor="rgba(255,255,255,0.5)"
            padding="20px"
            borderRadius="46px"
            pos="relative"
            zIndex="2"
            border="2px solid #fff"
          >
            <Text fontSize="42px" fontWeight="700" color="white">
              Novos <br /> desafios te <br /> aguardam aqui.
            </Text>
            <Box
              h="80px"
              w="80px"
              bg="white"
              pos="absolute"
              left="-40px"
              bottom="90px"
              borderRadius="100%"
            ></Box>
            <Image
              src="./src/assets/women.png"
              pos="absolute"
              right="-38px"
              bottom="0"
            />
          </Box>
        </Flex>
      </GridItem>
    </Grid>
  );
}

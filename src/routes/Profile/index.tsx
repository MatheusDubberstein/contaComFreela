import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import Menu from "../../components/Menu";
import { getUser } from "../../scripts/auth";

import * as Yup from "yup";
import { Field, FieldProps, Form, Formik } from "formik";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { app } from "../../main";
import { getUserData, updateUserList } from "../../scripts/user";
import { useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";

export type ProfileProps = {
  name: string;
  age?: string;
  city?: string;
  country?: string;
  crc?: string;
  email: string;
  gener?: string;
  uid: string;
  dbId?: string;
  phone: string;
  state?: string;
  isCompany: boolean;
};

export default function Home() {
  const db = getFirestore(app);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    updateUserList();
  }, []);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("O Nome é obrigatório!"),
    email: Yup.string()
      .email("E-mail invalido!")
      .required("O E-mail é obrigatório!"),
    age: Yup.string(),
    gener: Yup.string(),
    city: Yup.string(),
    country: Yup.string(),
    crc: Yup.string(),
    uid: Yup.string(),
    dbId: Yup.string(),
    phone: Yup.string().required("O Telefone é obrigatório!"),
    state: Yup.string(),
    isCompany: Yup.bool(),
  });
  const userData = getUserData();
  const user = getUser();
  const initialValues: ProfileProps = {
    name: userData.name || user.displayName,
    email: userData.email || user.email,
    age: userData?.age || "",
    gener: userData?.gener || "",
    phone: userData?.phone || "",
    city: userData?.city || "",
    state: userData?.state || "",
    country: userData?.country || "",
    crc: userData?.crc || "",
    uid: userData?.uid || user.uid,
    dbId: userData?.dbId || "",
    isCompany: userData?.isCompany || false,
  };

  function logout() {
    window.localStorage.clear();
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        return navigate("/logar");
      })
      .catch((error) => {
        console.log({ error });
      });
    return navigate("/logar");
  }
  return (
    <>
      <Menu />
      <Flex direction="column" alignItems="center" w="100%" h="100%">
        <Image
          src={user.photoURL}
          h="100px"
          width="100px"
          borderRadius="100%"
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            if (values.dbId) {
              const userRef = doc(db, "people", values.dbId);
              updateDoc(userRef, values)
                .then(() => {
                  updateUserList();
                  toast({
                    title: "Perfil atualizado com sucesso",
                    description: `Muito obrigado por atualizar os seus dados.`,
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                })
                .catch((e) => {
                  console.log("erro ao atualizar", e);
                });
            } else {
              console.log("Não posso atualizar sem o dbId");
            }
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <Form style={{ width: "100%", maxWidth: "400px" }}>
              <Field name="name">
                {({ field, form }: FieldProps<"name", ProfileProps>) => (
                  <FormControl isInvalid={Boolean(form.errors.name)}>
                    <FormLabel>Nome:</FormLabel>
                    <Input {...field} />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="email">
                {({ field, form }: FieldProps<"email", ProfileProps>) => (
                  <FormControl isInvalid={Boolean(form.errors.email)}>
                    <FormLabel>Email:</FormLabel>
                    <Input {...field} />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="phone">
                {({ field, form }: FieldProps<"phone", ProfileProps>) => (
                  <FormControl isInvalid={Boolean(form.errors.phone)}>
                    <FormLabel>Telefone:</FormLabel>
                    <Input
                      as={InputMask}
                      mask="(99) 99999-9999"
                      maskChar={null}
                      {...field}
                    />
                    <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="age">
                {({ field, form }: FieldProps<"age", ProfileProps>) => (
                  <FormControl isInvalid={Boolean(form.errors.age)}>
                    <FormLabel>Idade:</FormLabel>
                    <Input {...field} />
                    <FormErrorMessage>{form.errors.age}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="gener">
                {({ field, form }: FieldProps<"gener", ProfileProps>) => (
                  <FormControl isInvalid={Boolean(form.errors.gener)}>
                    <FormLabel>Genero:</FormLabel>
                    <Input {...field} />
                    <FormErrorMessage>{form.errors.gener}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="crc">
                {({ field, form }: FieldProps<"crc", ProfileProps>) => (
                  <FormControl isInvalid={Boolean(form.errors.crc)}>
                    <FormLabel>CRC:</FormLabel>
                    <Input {...field} />
                    <FormErrorMessage>{form.errors.crc}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="city">
                {({ field, form }: FieldProps<"city", ProfileProps>) => (
                  <FormControl isInvalid={Boolean(form.errors.city)}>
                    <FormLabel>Cidade:</FormLabel>
                    <Input {...field} />
                    <FormErrorMessage>{form.errors.city}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="state">
                {({ field, form }: FieldProps<"state", ProfileProps>) => (
                  <FormControl isInvalid={Boolean(form.errors.state)}>
                    <FormLabel>Estado:</FormLabel>
                    <Input {...field} />
                    <FormErrorMessage>{form.errors.state}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="country">
                {({ field, form }: FieldProps<"country", ProfileProps>) => (
                  <FormControl isInvalid={Boolean(form.errors.country)}>
                    <FormLabel>Pais:</FormLabel>
                    <Input {...field} />
                    <FormErrorMessage>{form.errors.country}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="isCompany">
                {({ field, form }: FieldProps<"isCompany", ProfileProps>) => (
                  <FormControl
                    mt={4}
                    isInvalid={Boolean(form.errors.isCompany)}
                  >
                    <Checkbox isChecked={Boolean(field.value)} {...field}>
                      Pessoa Juridica
                    </Checkbox>
                  </FormControl>
                )}
              </Field>
              <Stack direction="row" spacing={4} mt={4}>
                <Button
                  h="52px"
                  w="100%"
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
                  Atualizar
                </Button>
                <Button
                  h="52px"
                  w="100%"
                  colorScheme="red"
                  fontWeight="700"
                  borderRadius="16px"
                  type="button"
                  onClick={logout}
                  _hover={{
                    opacity: "90%",
                  }}
                >
                  Sair
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Flex>
    </>
  );
}

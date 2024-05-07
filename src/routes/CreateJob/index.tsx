import { Field, FieldProps, Form, Formik } from "formik";
import Menu from "../../components/Menu";
import * as Yup from "yup";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Tag,
  useToast,
} from "@chakra-ui/react";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { app } from "../../main";
import { getUserData } from "../../scripts/user";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";

export type JobProps = {
  title: string;
  description: string;
  phone: string;
  personId: string;
  price: number;
  tags?: string[];
};

const tags = [
  "ECD",
  "ECF",
  "Folha de pagamento",
  "Digitalização de documentos",
  "Abertura e alteração de contrato",
];
export default function CreateJob() {
  const db = getFirestore(app);
  const toast = useToast();
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("O Titulo é obrigatório!"),
    description: Yup.string().required("A descrição é obrigatória."),
    phone: Yup.string().required("O Telefone é obrigatório."),
    personId: Yup.string().required("PersonId é obrigatório."),
    price: Yup.number().required("O valor é obrigatório."),
    tags: Yup.array(),
  });
  const userData = getUserData();
  const initialValues: JobProps = {
    description: "",
    personId: userData.uid || "",
    phone: "",
    price: 0,
    title: "",
    tags: [],
  };
  return (
    <>
      <Menu />
      <Flex mx="100px" justifyContent="center" direction="column">
        <Heading>Criando um novo freela</Heading>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            addDoc(collection(db, "jobs"), values)
              .then(() => {
                actions.setSubmitting(false);
                toast({
                  title: "Freela criado com sucesso!",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
                navigate("/");
              })
              .catch((e) => {
                console.error("Error adding document: ", e);
              });
          }}
        >
          {(props) => (
            <Form>
              <Field name="title">
                {({ field, form }: FieldProps<string, JobProps>) => (
                  <FormControl isInvalid={Boolean(form.errors.title)}>
                    <FormLabel>Titulo:</FormLabel>
                    <Input {...field} />
                    <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="tags">
                {({ field, form }: FieldProps<string[], JobProps>) => (
                  <FormControl>
                    <FormLabel>Etiquetas:</FormLabel>
                    <Flex gap="16px">
                      {tags.map((tag) => (
                        <Tag
                          variant={
                            field.value.includes(tag) ? "subtle" : "outline"
                          }
                          onClick={() =>
                            form.setFieldValue(
                              field.name,
                              field.value.includes(tag)
                                ? field.value.filter((item) => item !== tag)
                                : [...field.value, tag]
                            )
                          }
                          cursor="pointer"
                          colorScheme="blue"
                          key={tag}
                        >
                          {tag}
                        </Tag>
                      ))}
                    </Flex>
                  </FormControl>
                )}
              </Field>
              <Field name="description">
                {({ field, form }: FieldProps<string, JobProps>) => (
                  <FormControl isInvalid={Boolean(form.errors.description)}>
                    <FormLabel>Descrição:</FormLabel>
                    <ReactQuill
                      theme="snow"
                      value={field.value}
                      onChange={(e) => form.setFieldValue(field.name, e)}
                    />
                    <FormErrorMessage>
                      {form.errors.description}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="price">
                {({ field, form }: FieldProps<string, JobProps>) => (
                  <FormControl isInvalid={Boolean(form.errors.price)}>
                    <FormLabel>Preço:</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color="gray.300"
                        fontSize="1.2em"
                      >
                        R$
                      </InputLeftElement>
                      <Input type="number" {...field} />
                    </InputGroup>
                    <FormErrorMessage>{form.errors.price}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="phone">
                {({ field, form }: FieldProps<string, JobProps>) => (
                  <FormControl isInvalid={Boolean(form.errors.phone)}>
                    <FormLabel>Telefone:</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color="gray.300"
                        fontSize="1.2em"
                      >
                        +55
                      </InputLeftElement>
                      <Input
                        as={InputMask}
                        mask="(99) 99999-9999"
                        maskChar={null}
                        {...field}
                      />
                    </InputGroup>
                    <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Button
                h="52px"
                w="100%"
                color="white"
                fontWeight="700"
                bgGradient="linear(to-tr, #0BC5EA, #5038ED)"
                borderRadius="16px"
                isLoading={props.isSubmitting}
                type="submit"
                mt="16px"
                _hover={{
                  opacity: "90%",
                }}
              >
                CRIAR
              </Button>
            </Form>
          )}
        </Formik>
      </Flex>
    </>
  );
}

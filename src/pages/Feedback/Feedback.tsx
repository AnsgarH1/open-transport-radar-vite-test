import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Button, FormControl, FormLabel, FormErrorMessage,
  FormHelperText, Heading, Input, Textarea, Select, VStack, Flex, Box, useColorModeValue
} from '@chakra-ui/react'
import Layout from '../../components/Layout/Layout';
import { Field, Form, Formik, FormikProps } from "formik";
import { CSSTransition } from 'react-transition-group';
import { ValidationSchema } from './ValidationSchema';
import { IFormInputs } from './IFormInputs';
import "./Feedback.css";
import S from "./Feedback.module.css";


function Feedback() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<IFormInputs>(); // initialise the hook
  const formSubmitHandler: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
    console.log(data);
  };

  const [showForm, setShowForm] = useState(true);
  const [showMessage, setShowMessage] = useState(false)

  const initialValues: IFormInputs = {
    firstname: '',
    lastname: '',
    email: '',
    issue: '',
    text: ''
  }

  const standard = useColorModeValue("light", "dark")
  const btn = useColorModeValue("brand.sec", "brand.sec")
  const formCol = useColorModeValue("white", "gray.900")


  return (
    <Layout>
      <Flex bg={standard} align="center" justify="center" h="100vh">


        <CSSTransition
          in={showMessage}
          timeout={600}
          classNames={`${S.thankyouMessage}`}
          unmountOnExit
        >
          <Heading as='h2' data-testid='response-message' size={["md", "xl", "2xl"]}>Vielen Dank für dein Feedback!</Heading>
        </CSSTransition>

        <CSSTransition
          in={showForm}
          timeout={600}
          classNames={`${S.contactForm}`}
          appear
          unmountOnExit
          onExited={() => setShowMessage(true)}
        >
          <Box
            w={["full", 'md']}
            bg={formCol}
            p={[9, 10]}
            mt={[20, '10vh']}
            mx='3'
            boxShadow="xl"
            rounded="lg"
          // overflowY="scroll"
          >
            <Heading as='h2' size={["lg", "xl"]}>Kontaktformular</Heading><br />
            <Formik
              initialValues={initialValues}
              onSubmit={() => { console.log; setShowForm(false) }}
              validationSchema={ValidationSchema}
            >

              {({ errors, touched }) => (

                <Form data-testid="feedback-form">
                  <VStack spacing={4} align={['flex-start', 'center']} w='full'>

                    <FormControl isRequired>
                      <FormLabel htmlFor='firstname'>Vorname</FormLabel>
                      <Field
                        as={Input}
                        id='firstname'
                        placeholder='Vorname'
                        name='firstname'
                      />
                      {errors.firstname && touched.firstname && <span className={S.error}>{errors.firstname}</span>}
                    </FormControl>


                    <FormControl isRequired >
                      <FormLabel htmlFor='lastname'>Nachname</FormLabel>
                      <Field
                        as={Input}
                        id='lastname'
                        name='lastname'
                        placeholder='Nachname'
                      />
                      {errors.lastname && touched.lastname && <span className={S.error}>{errors.lastname}</span>}
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel htmlFor='email'>Email</FormLabel>
                      <Field as={Input}
                        id='email'
                        name='email'
                        type='email'
                      />
                      {errors.email && touched.email && <span className={S.error}>{errors.email}</span>}
                    </FormControl>


                    <FormControl>
                      <FormLabel htmlFor='issue'>Anliegen</FormLabel>
                      <Field as={Select} id='issue' name='issue'>
                        {/* <option disabled selected>Was ist dein Anliegen?</option> */}
                        <option value="opt-1">Es fehlen Verkerhrslinien bei mir</option>
                        <option value="opt-2">Die ÖPNV Daten stimmen nicht</option>
                        <option value="opt-3">Keine Ahnung tbh</option>
                      </Field>
                      {errors.issue && <span className={S.error}>{errors.issue}</span>}
                    </FormControl>

                    <FormControl>
                      <Field as={Textarea}
                        name='text'
                        id='text'
                        placeholder='Schreibe uns dein Feedback'
                        size='md'
                      />
                      {errors.text && touched.text && <span className={S.error}>{errors.text}</span>}


                      <Button
                        w={['full', 'auto']}
                        bgColor={btn}
                        color="light"
                        boxShadow="lg"
                        size='md'
                      />
                      {errors.text && touched.text && <FormHelperText>{errors.text}</FormHelperText>}

                    </FormControl>

                    <Button
                      data-testid='submit-btn'
                      w={['full', 'auto']}
                      alignSelf='right'
                      bgColor={sec}
                      color={prime}
                      boxShadow="lg"
                      size={['md', 'lg']}
                      type="submit"
                    >
                      Senden
                    </Button>
                  </VStack>
                </Form>
              )}
            </Formik>
          </Box>
        </CSSTransition>
      </Flex>
    </Layout >
  );
}

export default Feedback;
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

  const prime = useColorModeValue("primary", "secondary")
  const sec = useColorModeValue("secondary", "primary")


  return (
    <Layout>
      <Flex bg={useColorModeValue("tertiary", "quartiary")} align="center" justify="center" h="full">

        <CSSTransition
          in={showMessage}
          timeout={600}
          classNames="thankyou-message"
          unmountOnExit
        >
          <Heading as='h2' size={["md", "xl", "2xl"]}>Vielen Dank für dein Feedback!</Heading>
        </CSSTransition>

        <CSSTransition
          in={showForm}
          timeout={600}
          classNames={'contact-form'}
          appear
          unmountOnExit
          onExited={() => setShowMessage(true)}
        >
          <Box
            className="formBox"
            w={["full", 'lg']}
            h={["full", "auto"]}
            bg={prime}
            p={[6, 10]}
            // mt={[5, 0]}
            mx='3'
            boxShadow="lg"
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

                <Form>
                  <VStack spacing={[2,4]} align='flex-start' w='full' h="auto">

                    <FormControl isRequired>
                      <FormLabel htmlFor='firstname'>Vorname</FormLabel>
                      <Field
                        as={Input}
                        id='firstname'
                        placeholder='Vorname'
                        name='firstname'
                      />
                      {errors.firstname && touched.firstname && <FormHelperText>{errors.firstname}</FormHelperText>}
                    </FormControl>


                    <FormControl isRequired >
                      <FormLabel htmlFor='lastname'>Nachname</FormLabel>
                      <Field
                        as={Input}
                        id='lastname'
                        name='lastname'
                        placeholder='Nachname'
                      />
                      {errors.lastname && touched.lastname && <FormHelperText>{errors.lastname}</FormHelperText>}
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel htmlFor='email'>Email</FormLabel>
                      <Field as={Input}
                        id='email'
                        name='email'
                        type='email'
                      />
                      {errors.email && touched.email && <div>{errors.email}</div>}
                    </FormControl>


                    <FormControl>
                      <FormLabel htmlFor='issue'>Anliegen</FormLabel>
                      <Field as={Select} id='issue' name='issue'>
                        <option disabled selected>Was ist dein Anliegen?</option>
                        <option>Es fehlen Verkerhrslinien bei mir</option>
                        <option>Die ÖPNV Daten stimmen nicht</option>
                        <option>Keine Ahnung tbh</option>
                      </Field>
                      {errors.issue && touched.issue && <FormHelperText>{errors.issue}</FormHelperText>}
                    </FormControl>

                    <FormControl>
                      <Field as={Textarea}
                        name='text'
                        id='text'
                        placeholder='Schreibe uns dein Feedback'
                        size='md'
                      />
                      {errors.text && touched.text && <FormHelperText>{errors.text}</FormHelperText>}

                    </FormControl>

                    <Button
                      w={['full', 'auto']}
                      alignSelf='right'
                      bgColor={sec}
                      color={prime}
                      boxShadow="lg"
                      size={['md','lg']}
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
    </Layout>
  );
}

export default Feedback;
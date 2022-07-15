import * as React from "react"
import {useState} from "react"
import { Box, ControlBox, Text, Heading, Container, DrawerHeader, DrawerBody, Input, DrawerFooter, Button, FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText } from "@chakra-ui/react"

export default function LoginPage({onClose}) {

    return (
        <Container centerContent maxWidth='4xl' width='4xl' >
            <DrawerHeader>Login to your account</DrawerHeader>

            <DrawerBody>
                {/* <Input placeholder='Type here...' /> */}
                <LoginForm />
            </DrawerBody>

            <DrawerFooter>
                <Button colorScheme='blue'>Save</Button>
                <Button variant='outline' mr={3} onClick={onClose}>Cancel</Button>
            </DrawerFooter>
        </Container>

    )
}

function LoginForm() {
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
        email: "",
        password: "",
      })

    const handleOnInputChange = (event) => {
        if (event.target.name === "email") {
            if (event.target.value.indexOf("@") === -1) {
              setErrors((error) => ({ ...error, email: "Please enter a valid email." }))
            } else {
              setErrors((error) => ({ ...error, email: null }))
            }
          }
        setForm((form) => ({ ...form, [event.target.name]: event.target.value }))
      }
  
    // const isError = form === ''
    return (
        <FormControl isRequired >
        <FormLabel htmlFor='email'>Email</FormLabel>
        <Input
          id='email'
          type='email'
          value={form.email.value}
          onChange={handleOnInputChange}
        />
        {/* {!form.email ? (
          <FormHelperText>
            Enter your email.
          </FormHelperText>
        ) : (
          <FormErrorMessage>Email is required.</FormErrorMessage>
        )} */}

        <FormLabel htmlFor='password'>Password</FormLabel>
        <Input
          id='password'
          type='password'
          value={form.password.value}
          onChange={handleOnInputChange}
        />
        {/* {!form.password ? (
          <FormHelperText>
            Enter your password
          </FormHelperText>
        ) : (
          <FormErrorMessage>Password is required.</FormErrorMessage>
        )} */}

      </FormControl>
      
    )
}
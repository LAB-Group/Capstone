import * as React from "react"
import {useState} from "react"
import { Box, ControlBox, Text, Heading, Container, DrawerHeader, DrawerBody, Input, DrawerFooter, Button, FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText } from "@chakra-ui/react"

export default function LoginPage({onClose}) {
  const [errors, setErrors] = useState({})
  const [loginForm, setLoginForm] = useState({
      email: "",
      password: "",
    })

    return (
        <Container centerContent maxWidth='4xl' width='4xl' >
            <DrawerHeader>Login to your account</DrawerHeader>

            <DrawerBody>
                {/* <Input placeholder='Type here...' /> */}
                <LoginForm loginForm={loginForm} setLoginForm={setLoginForm} setErrors={setErrors} />
            </DrawerBody>

            <DrawerFooter>
                <Button colorScheme='blue' mr={3} onClick={console.log("LOGIN FORM", loginForm)} >Save</Button>
                <Button variant='outline' onClick={onClose}>Cancel</Button>
            </DrawerFooter>
        </Container>

    )
}

function LoginForm({ loginForm, setLoginForm, setErrors }) {

    const handleOnInputChange = (event) => {
        if (event.target.name === "email") {
            if (event.target.value.indexOf("@") === -1) {
              setErrors((error) => ({ ...error, email: "Please enter a valid email." }))
            } else {
              setErrors((error) => ({ ...error, email: null }))
            }
          }
        setLoginForm((form) => ({ ...form, [event.target.name]: event.target.value }))
      }
  
    // const isError = form === ''
    return (
        <FormControl isRequired >
        <FormLabel htmlFor='email'>Email</FormLabel>
        <Input
          id='email' name="email" type='email'
          value={loginForm.email}
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
          id='password' name="password" type='password'
          value={loginForm.password}
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
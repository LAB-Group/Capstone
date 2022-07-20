import * as React from "react"
import {useState, useEffect} from "react"
import apiClient from "../../services/apiClient"
import  { useAuthContext } from "../../contexts/auth"
import { Box, ControlBox, Text, Heading, Container, DrawerHeader, DrawerBody, Input, DrawerFooter, Button, FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText, 
    useDisclosure} from "@chakra-ui/react"

export default function LoginPage({onClose}) {
  const { user, setUser } = useAuthContext()
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [loginForm, setLoginForm] = useState({
      email: "",
      password: "",
    })

    const handleOnSubmit = async (event) => {
      event.preventDefault()
      setIsLoading(true)
      setErrors((error) => ({ ...error, form: null }))

      const {data, error} = await apiClient.loginUser({ email: loginForm.email, password:loginForm.password})
      if(error) setErrors((e) => ({ ...e, form: error}))
      if(data?.user) {
        setUser(data.user)
        apiClient.setToken(data.token)
        onClose()
      }
      setIsLoading(false)

    }

    return (
        <Container centerContent maxWidth='4xl' width='4xl' >
            <DrawerHeader>Login to your account</DrawerHeader>

            <DrawerBody>
                {/* <Input placeholder='Type here...' /> */}
                <LoginForm user={user} loginForm={loginForm} setLoginForm={setLoginForm} setErrors={setErrors} />
            </DrawerBody>

            <DrawerFooter>
                <Button colorScheme='blue' mr={3} onClick={handleOnSubmit} >Submit</Button>
                <Button variant='outline' onClick={onClose}>Cancel</Button>
            </DrawerFooter>
        </Container>

    )
}

function LoginForm({ user, loginForm, setLoginForm, setErrors }) {

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
          defaultValue={loginForm.email}
          onChange={handleOnInputChange}
        />
        {!loginForm.email ? (
          <FormHelperText>
            Enter your email.
          </FormHelperText>
        ) : (
          <FormErrorMessage>Email is required.</FormErrorMessage>
        )}

        <FormLabel htmlFor='password'>Password</FormLabel>
        <Input
          id='password' name="password" type='password'
          defaultValue={loginForm.password}
          onChange={handleOnInputChange}
        />
        {!loginForm.password ? (
          <FormHelperText>
            Enter your password
          </FormHelperText>
        ) : (
          <FormErrorMessage>Password is required.</FormErrorMessage>
        )}

      </FormControl>
      
    )
}
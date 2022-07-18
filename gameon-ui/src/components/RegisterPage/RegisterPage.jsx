import * as React from "react"
import {useState, useEffect} from "react"
import { useNavigate, Link } from "react-router-dom"
import apiClient from "../../services/apiClient"
import  { useAuthContext } from "../../contexts/auth"
import { Box, ControlBox, Text, Heading, Container, DrawerHeader, DrawerBody, Input, DrawerFooter, Button, FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText } from "@chakra-ui/react"

export default function RegisterPage({onClose}) {
  const { user, setUser } = useAuthContext()
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [registerForm, setRegisterForm] = useState({
      email: "",
      password: "",
      passwordConfirm: "",
      username: "",
      firstName: "",
      lastName: "",
      imageUrl: ""
    })

    const handleOnSubmit = async () => {
      setIsLoading(true)
      setErrors((error) => ({ ...error, form: null }))
  
      if (registerForm.passwordConfirm !== registerForm.password) {
        setErrors((error) => ({ ...error, passwordConfirm: "Passwords do not match." }))
        setIsLoading(false)
        return
      } else {
        setErrors((error) => ({ ...error, passwordConfirm: null }))
      }
      console.log("USER: ",registerForm.username)
      const {data, error} = await apiClient.signupUser({ email: registerForm.email, password: registerForm.password, username: registerForm.username, 
                                                          firstName: registerForm.firstName, lastName: registerForm.lastName, imageUrl: registerForm.imageUrl})
      if(error) setErrors((e) => ({ ...e, form: error}))
      if(data?.user) {
        
        setUser(data.user)
        apiClient.setToken(data.token)
      }
      setIsLoading(false)
    }

    return (
        <Container centerContent maxWidth='4xl' width='4xl' >
            <DrawerHeader>Create your account</DrawerHeader>

            <DrawerBody>
                {/* <Input placeholder='Type here...' /> */}
                <RegisterForm user={user} registerForm={registerForm} setRegisterForm={setRegisterForm} setErrors={setErrors} />
            </DrawerBody>

            <DrawerFooter>
                <Button colorScheme='blue' mr={3} onClick={handleOnSubmit} >Submit</Button>
                <Button variant='outline' onClick={onClose}>Cancel</Button>
            </DrawerFooter>
        </Container>

    )
}

function RegisterForm({ user, registerForm, setRegisterForm, setErrors }) {
  const navigate = useNavigate()

  useEffect(() => {
    // redirect if user is logged in
    if (user?.email) {
      navigate("/")
    }
  }, [user, navigate])

    const handleOnInputChange = (event) => {
        if (event.target.name === "email") {
            if (event.target.value.indexOf("@") === -1) {
              setErrors((error) => ({ ...error, email: "Please enter a valid email." }))
            } else {
              setErrors((error) => ({ ...error, email: null }))
            }
          }
        setRegisterForm((form) => ({ ...form, [event.target.name]: event.target.value }))
      }
  
    // const isError = form === ''
    return (
        <FormControl isRequired>
        <FormLabel htmlFor='email'>Email</FormLabel>
        <Input id='email' name="email" type='email'
          value={registerForm.email}
          onChange={handleOnInputChange}
        />

        <FormLabel htmlFor='password'>Password</FormLabel>
        <Input id='password' name="password" type='password'
          value={registerForm.password}
          onChange={handleOnInputChange}
        />

        <FormLabel htmlFor='passwordConfirm'>Confirm Password</FormLabel>
        <Input id='passwordConfirm' name="passwordConfirm" type='password'
          value={registerForm.passwordConfirm}
          onChange={handleOnInputChange}
        />

        <FormLabel htmlFor='username'>Username</FormLabel>
        <Input id='username' name="username" type='text'
          value={registerForm.username}
          onChange={handleOnInputChange}
        />

        <FormLabel htmlFor='firstName'>First Name</FormLabel>
        <Input id='firstName' name="firstName" type='text'
          value={registerForm.firstName}
          onChange={handleOnInputChange}
        />

        <FormLabel htmlFor='lastName'>Last Name</FormLabel>
        <Input id='lastName' name="lastName" type='text'
          value={registerForm.lastName}
          onChange={handleOnInputChange}
        />

        <FormLabel htmlFor='imageUrl'>Image URL</FormLabel>
        <Input id='imageUrl' name="imageUrl" type='text'
          value={registerForm.imageUrl}
          onChange={handleOnInputChange}
        />

      </FormControl>
      
    )
}
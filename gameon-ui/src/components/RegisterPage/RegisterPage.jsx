import * as React from "react"
import {useState} from "react"
import { Box, ControlBox, Text, Heading, Container, DrawerHeader, DrawerBody, Input, DrawerFooter, Button, FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText } from "@chakra-ui/react"

export default function RegisterPage({onClose}) {
  const [errors, setErrors] = useState({})
  const [registerForm, setRegisterForm] = useState({
      email: "",
      password: "",
      username: "",
      handle: "",
      firstname: "",
      lastname: "",
      imageurl: ""
    })

    return (
        <Container centerContent maxWidth='4xl' width='4xl' >
            <DrawerHeader>Create your account</DrawerHeader>

            <DrawerBody>
                {/* <Input placeholder='Type here...' /> */}
                <RegisterForm registerForm={registerForm} setRegisterForm={setRegisterForm} setErrors={setErrors} />
            </DrawerBody>

            <DrawerFooter>
                <Button colorScheme='blue' mr={3} onClick={console.log("LOGIN FORM", registerForm)} >Save</Button>
                <Button variant='outline' onClick={onClose}>Cancel</Button>
            </DrawerFooter>
        </Container>

    )
}

function RegisterForm({ registerForm, setRegisterForm, setErrors }) {

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
        <FormControl>
        <FormLabel htmlFor='email'>Email</FormLabel>
        <Input isRequired
          id='email' name="email" type='email'
          value={registerForm.email}
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
        <Input isRequired
          id='password' name="password" type='password'
          value={registerForm.password}
          onChange={handleOnInputChange}
        />
        {/* {!form.password ? (
          <FormHelperText>
            Enter your password
          </FormHelperText>
        ) : (
          <FormErrorMessage>Password is required.</FormErrorMessage>
        )} */}

        <FormLabel htmlFor='username'>Username</FormLabel>
        <Input isRequired
          id='username' name="username" type='text'
          value={registerForm.username}
          onChange={handleOnInputChange}
        />

        <FormLabel htmlFor='handle'>Handle</FormLabel>
        <Input
          id='handle' name="handle" type='text'
          value={registerForm.handle}
          onChange={handleOnInputChange}
        />

        <FormLabel htmlFor='firstname'>First Name</FormLabel>
        <Input isRequired
          id='firstname' name="firstname" type='text'
          value={registerForm.firstname}
          onChange={handleOnInputChange}
        />

        <FormLabel htmlFor='lastname'>Last Name</FormLabel>
        <Input isRequired
          id='lastname' name="lastname" type='text'
          value={registerForm.lastName}
          onChange={handleOnInputChange}
        />

        <FormLabel htmlFor='imageurl'>Image URL</FormLabel>
        <Input
          id='imageurl' name="imageurl" type='text'
          value={registerForm.imageurl}
          onChange={handleOnInputChange}
        />

      </FormControl>
      
    )
}
import * as React from "react"
import {useState} from "react"
import { Link } from "@chakra-ui/react"
import apiClient from "../../services/apiClient"
import  { useAuthContext } from "../../contexts/auth"

import { Container, Text,  DrawerHeader, DrawerBody, Input, DrawerFooter, Button, FormControl,ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
    FormLabel,
    HStack,
    VStack,
  ChakraProvider, extendTheme, InputGroup, InputRightElement, FormErrorMessage} from "@chakra-ui/react"

    const activeLabelStyles = {
      transform: "scale(0.85) translateY(-24px)"
      
    };
    export const theme = extendTheme({
      components: {
        Form: {
          variants: {
            floating: {
              container: {
                _focusWithin: {
                  label: {
                    ...activeLabelStyles
                  }
                },
                "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label": {
                  ...activeLabelStyles
                },
                label: {
                  top: 0,
                  left: 0,
                  zIndex: 2,
                  position: "absolute",
                  backgroundColor: "white",
                  pointerEvents: "none",
                  mx: 3,
                  px: 1,
                  my: 2,
                  transformOrigin: "left top"
                }
              }
            }
          }
        }
      }
    });

export default function RegisterPage({onClose}) {
  const { user, setUser } = useAuthContext()
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmit,setIsSubmit]=useState()
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

      const {data, error} = await apiClient.signupUser({ email: registerForm.email, password: registerForm.password, username: registerForm.username.toLowerCase(), 
                                                          firstName: registerForm.firstName, lastName: registerForm.lastName, imageUrl: registerForm.imageUrl})
      if(error) setErrors((e) => ({ ...e, form: error}))
      
      if(data?.user) {
        
        setUser(data.user)
        apiClient.setToken(data.token)
        onClose()
      }

      setIsSubmit(true)
      setIsLoading(false)


    }

    return (
      <Container centerContent >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create your account</ModalHeader>
      
        <ModalCloseButton />
        <ModalBody>
        <RegisterForm user={user} registerForm={registerForm} setRegisterForm={setRegisterForm} setErrors={setErrors} errors={errors} isSubmit={isSubmit}/>
        </ModalBody>

        <ModalFooter display={'flex'} justifyContent={'center'}>
         <VStack>
         <Button colorScheme='purple' w="300px" onClick={handleOnSubmit}>Create Account</Button>
             
        <HStack><Text fontSize='sm'>Already have an account? </Text><Link><Text fontSize='sm' color='purple.400'>Sign In</Text></Link></HStack>
        </VStack>
        </ModalFooter>
      </ModalContent>
    </Container>
    )
}

function RegisterForm({ user, registerForm, setRegisterForm, setErrors, isSubmit, errors }) {
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

  const handleClick = () => setShowPassword(!showPassword)
  const handleClicks = () => setShowPasswordConfirm(!showPasswordConfirm)
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
      <ChakraProvider theme={theme}>
         {/* To adjust form add padding here */}
       <VStack spacing={5}>
        <FormControl variant="floating" isInvalid={(!registerForm.email.length>0&&isSubmit) || (errors.form && isSubmit) ?true:false}>
        {registerForm.email.length>0?
        <FormLabel transform="scale(0.85) translateY(-21px)">Email</FormLabel>
         : 
         <FormLabel htmlFor='email'>Email</FormLabel>}
            <Input id='email' name="email" type='email' focusBorderColor='purple.400'
              defaultValue={registerForm.email}
              onChange={handleOnInputChange}
            />
           {(!registerForm.email.length>0&&isSubmit) || (errors.form && isSubmit)?<FormErrorMessage>{errors.form}</FormErrorMessage>:null}
        </FormControl>

      <HStack>
        <FormControl variant="floating"isInvalid={!registerForm.firstName.length>0&&isSubmit?true:false} >
        {registerForm.firstName.length>0?
        <FormLabel transform="scale(0.85) translateY(-21px)">First Name</FormLabel>
         : 
         <FormLabel>First Name</FormLabel>}
        
        <Input id='firstName' name="firstName" type='text' focusBorderColor='purple.400'
              defaultValue={registerForm.firstName}
              onChange={handleOnInputChange}
            />
            {!registerForm.firstName.length>0&&isSubmit?<FormErrorMessage>First Name is required.</FormErrorMessage>:null}
        </FormControl>

        <FormControl variant="floating" isInvalid={!registerForm.lastName.length>0&&isSubmit?true:false}>
        {registerForm.lastName.length>0?
        <FormLabel transform="scale(0.85) translateY(-21px)">Last Name</FormLabel>
         :<FormLabel>Last Name</FormLabel>}
        
        <Input id='lastName' name="lastName" type='text' focusBorderColor='purple.400'
              defaultValue={registerForm.lastName}
              onChange={handleOnInputChange}
            />
            {!registerForm.lastName.length>0&&isSubmit?<FormErrorMessage>Last Name is required.</FormErrorMessage>:null}
        </FormControl>
      </HStack>

        <FormControl variant="floating" isInvalid={!registerForm.username.length>0&&isSubmit?true:false}>
        {registerForm.username.length>0?
        <FormLabel transform="scale(0.85) translateY(-21px)">Username</FormLabel>
         :<FormLabel>Username</FormLabel>}
          
          <Input id='username' name="username" type='text'  focusBorderColor='purple.400' bg={"white"} textTransform={'lowercase'} maxLength={'15'}
              defaultValue={registerForm.username.toLowerCase()}
              onChange={handleOnInputChange}
          /> 
          {!registerForm.username.length>0&&isSubmit?<FormErrorMessage>Username is required.</FormErrorMessage>:null}
        </FormControl>
        <FormControl variant="floating" isInvalid={!registerForm.password.length>0&&isSubmit?true:false}>
          {registerForm.password.length>0?
        <FormLabel transform="scale(0.85) translateY(-21px)">Password</FormLabel>
         :<FormLabel>Password</FormLabel>}
        <InputGroup>
          <Input id='password' name="password" type={showPassword ? 'text' : 'password'} focusBorderColor='purple.400'
              defaultValue={registerForm.password}
              onChange={handleOnInputChange}
            />
            
         <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
              {showPassword ? 'Hide' : 'Show'}
            </Button>
        </InputRightElement>
        </InputGroup>
        {!registerForm.password.length>0&&isSubmit?<FormErrorMessage>Password is required.</FormErrorMessage>:null}
        </FormControl>

    
      <FormControl variant="floating" isInvalid={!registerForm.passwordConfirm.length>0&&isSubmit?true:false}>
      {registerForm.passwordConfirm.length>0?
        <FormLabel transform="scale(0.85) translateY(-21px)">Confirm Password</FormLabel>
         :<FormLabel>Confirm Password</FormLabel>}
      
      <InputGroup>
      <Input id='passwordConfirm' name="passwordConfirm" type={showPasswordConfirm ? 'text' : 'password'} focusBorderColor='purple.400'
          defaultValue={registerForm.passwordConfirm}
          onChange={handleOnInputChange}
        />
        <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClicks}>
              {showPasswordConfirm ? 'Hide' : 'Show'}
            </Button>
        </InputRightElement>
        </InputGroup>
        {!registerForm.passwordConfirm.length>0&&isSubmit?<FormErrorMessage>Password is required.</FormErrorMessage>:null}
      </FormControl>

     
      <FormControl variant="floating">
      {registerForm.imageUrl.length>0?
        <FormLabel transform="scale(0.85) translateY(-21px)">Image URL</FormLabel>
         :<FormLabel>Image URL</FormLabel>}
     
          <Input id='imageUrl' name="imageUrl" type='text' focusBorderColor='purple.400'
              defaultValue={registerForm.imageUrl}
              onChange={handleOnInputChange}/>
      </FormControl>
      
      </VStack>
    </ChakraProvider>)
}
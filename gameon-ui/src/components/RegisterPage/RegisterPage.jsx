import * as React from "react"
import {useState} from "react"
import { Link } from "@chakra-ui/react"
import apiClient from "../../services/apiClient"
import  { useAuthContext } from "../../contexts/auth"

import { Container, Text,  DrawerHeader, DrawerBody, Input, DrawerFooter, Button, FormControl,
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
  const [isEmail,setIsEmail]=useState(false)
  const [isPassword,setIsPassword]=useState(false)
  const [isPasswordConfirm,setIsPasswordConfirm]=useState(false)
  const [isUsername,setIsUsername]=useState(false)
  const [isLastName,setIsLastName]=useState(false)
  const [isFirstName,setIsFirstName]=useState(false)
  const [isImageUrl,setIsImageUrl]=useState(false)
  const [registerForm, setRegisterForm] = useState({
      email: "",
      password: "",
      passwordConfirm: "",
      username: "",
      firstName: "",
      lastName: "",
      imageUrl: ""
    })
    console.log(errors)
    

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

      const {data, error} = await apiClient.signupUser({ email: registerForm.email, password: registerForm.password, username: registerForm.username, 
                                                          firstName: registerForm.firstName, lastName: registerForm.lastName, imageUrl: registerForm.imageUrl})
      if(error) setErrors((e) => ({ ...e, form: error}))
      if(data?.user) {
        
        setUser(data.user)
        apiClient.setToken(data.token)
        onClose()
      }
      setIsLoading(false)

      if(!registerForm.email>0){
        setIsEmail(true)
      }else{
        setIsEmail(false)
      }

      if(!registerForm.password>0){
        setIsPassword(true)
      }else{
        setIsPassword(false)
      }
      
      if(!registerForm.passwordConfirm>0){
        setIsPasswordConfirm(true)
      }else{
        setIsPasswordConfirm(false)

        }
      if(!registerForm.firstName>0){
      setIsFirstName(true)
      }else{
      setIsFirstName(false)
      }
      if(!registerForm.lastName>0){
        setIsLastName(true)
      }else{
        setIsLastName(false)

        }
      if(!registerForm.username>0){
      setIsUsername(true)
      }else{
      setIsUsername(false)
      }

    }

    return (
        <Container centerContent maxWidth='4xl' >
            <DrawerHeader>Create your account</DrawerHeader>
            <Text fontSize='sm' color='red.500' p={0}>{errors.form}</Text>

            <DrawerBody >
                {/* <Input placeholder='Type here...' /> */}
                <RegisterForm user={user} registerForm={registerForm} setRegisterForm={setRegisterForm} setErrors={setErrors} isEmail={isEmail} isFristName={isFirstName} isLastName={isLastName} isPassword={isPassword} isPasswordConfirm={isPasswordConfirm} isUsername={isUsername}
              />
            </DrawerBody>

            <DrawerFooter>
              <VStack>
                <Button colorScheme='purple' w="300px" onClick={handleOnSubmit}>Create Account</Button>
              
               <HStack><Text fontSize='sm'>Already have an account? </Text><Link><Text fontSize='sm' color='purple.400'>Sign In</Text></Link></HStack>
                </VStack>
                {/* <Button colorScheme='purple' variant='outline' onClick={onClose}>Cancel</Button> */}
            </DrawerFooter>
        </Container>

    )
}

function RegisterForm({ user, registerForm, setRegisterForm, setErrors, isEmail,isFristName,isLastName,isPassword,isPasswordConfirm,isUsername }) {
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
       <VStack spacing={5}>
        <FormControl variant="floating" isInvalid={isEmail}>
        {registerForm.email.length>0?
        <FormLabel transform="scale(0.85) translateY(-21px)">Email</FormLabel>
         : 
         <FormLabel htmlFor='email'>Email</FormLabel>}
            <Input id='email' name="email" type='email' focusBorderColor='purple.400'
              defaultValue={registerForm.email}
              onChange={handleOnInputChange}
            />
           {isEmail?<FormErrorMessage>Email is required.</FormErrorMessage>:null
        }
        </FormControl>

      <HStack>
        <FormControl variant="floating"isInvalid={isFristName} >
        {registerForm.firstName.length>0?
        <FormLabel transform="scale(0.85) translateY(-21px)">First Name</FormLabel>
         : 
         <FormLabel>First Name</FormLabel>}
        
        <Input id='firstName' name="firstName" type='text' focusBorderColor='purple.400'
              defaultValue={registerForm.firstName}
              onChange={handleOnInputChange}
            />
            {isFristName?<FormErrorMessage>Email is required.</FormErrorMessage>:null
        }
        </FormControl>

        <FormControl variant="floating" isInvalid={isLastName}>
        {registerForm.lastName.length>0?
        <FormLabel transform="scale(0.85) translateY(-21px)">Last Name</FormLabel>
         :<FormLabel>Last Name</FormLabel>}
        
        <Input id='lastName' name="lastName" type='text' focusBorderColor='purple.400'
              defaultValue={registerForm.firstName}
              onChange={handleOnInputChange}
            />
            {isLastName?<FormErrorMessage>Email is required.</FormErrorMessage>:null
        }
        </FormControl>
      </HStack>

        <FormControl variant="floating" isInvalid={isUsername}>
        {registerForm.username.length>0?
        <FormLabel transform="scale(0.85) translateY(-21px)">Username</FormLabel>
         :<FormLabel>Username</FormLabel>}
          
          <Input id='username' name="username" type='text'  focusBorderColor='purple.400' bg={"white"}
              defaultValue={registerForm.username}
              onChange={handleOnInputChange}
          /> 
          {isUsername?<FormErrorMessage>Email is required.</FormErrorMessage>:null
        }
        </FormControl>
        <FormControl variant="floating" isInvalid={isPassword}>
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
        {isPassword?<FormErrorMessage>Email is required.</FormErrorMessage>:null
            }
        </FormControl>

    
      <FormControl variant="floating" isInvalid={isPasswordConfirm}>
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
        {isPasswordConfirm?<FormErrorMessage>Email is required.</FormErrorMessage>:null
        }
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
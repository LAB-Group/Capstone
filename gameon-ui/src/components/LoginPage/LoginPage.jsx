import * as React from "react"
import {useState} from "react"
import { Link } from "@chakra-ui/react"
import apiClient from "../../services/apiClient"
import  { useAuthContext } from "../../contexts/auth"
import { ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,Text, Container, DrawerHeader, DrawerBody, Input, DrawerFooter, Button, FormControl,
    FormLabel,
    FormErrorMessage,
    extendTheme,ChakraProvider, VStack, InputGroup, InputRightElement, HStack} from "@chakra-ui/react"
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

export default function LoginPage({onClose}) {
  const { user, setUser } = useAuthContext()
  const [errors, setErrors] = useState({})
  const [isSubmit,setIsSubmit]=useState()
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
      setIsSubmit(true)
      setIsLoading(false)

     
    }

    return (
      <Container centerContent >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login to your account</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <LoginForm user={user} loginForm={loginForm} setLoginForm={setLoginForm} setErrors={setErrors} isSubmit={isSubmit}/>
        </ModalBody>

        <ModalFooter display={'flex'} justifyContent={'center'}>
             <VStack >
               <Button colorScheme='purple' w="250px" onClick={handleOnSubmit} >Login</Button>
               <HStack>
               <Text fontSize='sm'>Don't have an account?</Text><Link><Text fontSize='sm' color='purple.400'>Sign Up</Text></Link></HStack>
             </VStack>
        </ModalFooter>
      </ModalContent>
    </Container>
  )
}

function LoginForm({ user, loginForm, setLoginForm, setErrors, isSubmit}) {
    const [showPassword, setShowPassword] = useState(false)
  
    const handleClick = () => setShowPassword(!showPassword)

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
      <ChakraProvider theme={theme}> 
       {/* To adjust form add padding here */}
      <VStack spacing={5}>
        
        <FormControl variant="floating" isInvalid={!loginForm.email.length>0&&isSubmit?true:false}>
        {loginForm.email.length>0?
        <FormLabel transform="scale(0.85) translateY(-21px)">Email</FormLabel>
         : 
         <FormLabel htmlFor='email'>Email</FormLabel>}
       
        <Input
          id='email' name="email" type='email' focusBorderColor='purple.400' 
          defaultValue={loginForm.email}
          onChange={handleOnInputChange}
        /> 
        {!loginForm.email.length>0&&isSubmit?<FormErrorMessage>Email is required.</FormErrorMessage>:null
        }
        </FormControl>

        <FormControl variant="floating"  isInvalid={!loginForm.password.length>0&&isSubmit?true:false}>
              {loginForm.password.length>0?
        <FormLabel transform="scale(0.85) translateY(-21px)">Password</FormLabel>
         : 
        <FormLabel>Password</FormLabel>}
        <InputGroup>
        
        <Input 
          id='password' name="password" type={showPassword ? 'text' : 'password'} focusBorderColor='purple.400'
          defaultValue={loginForm.password}
          onChange={handleOnInputChange}
        /> 
       
        <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
              {showPassword ? 'Hide' : 'Show'}
            </Button>
        </InputRightElement>
        
        </InputGroup>
        {!loginForm.password.length>0&&isSubmit?<FormErrorMessage>password is required.</FormErrorMessage>:null}
        </FormControl>
        </VStack>

      </ChakraProvider>
    )
}
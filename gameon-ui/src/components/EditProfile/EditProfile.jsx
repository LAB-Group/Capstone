import * as React from "react"
import  { useAuthContext } from "../../contexts/auth"
import {useState} from "react"
import apiClient from "../../services/apiClient"
import {
    Container, FormControl, FormErrorMessage, FormLabel, Input,
    ModalOverlay, ModalContent, ModalHeader,
    ModalFooter, ModalBody, ModalCloseButton, Button, extendTheme,VStack, ChakraProvider
  } from '@chakra-ui/react'
import Search from "../Search/Search"
import { COLORS } from "../colors"

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
 
export default function EditProfile({onClose}){
  const { user, setUser } = useAuthContext()
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmit,setIsSubmit]=useState()
  const [selectedGames, setSelectedGames] = useState([])
  const [selectedGamesNames, setSelectedGamesNames] = useState([])
  const [selectedGamesSummary, setSelectedGamesSummary] = useState([])
  const [selectedGamesPic, setSelectedGamesPic] = useState([])
  const [profileForm, setProfileForm] = useState({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
      email: user.email,
      gameList: user.gameList,
      location: user.location
    })

    const handleOnSubmit = async () => {
      setIsLoading(true)
      setErrors((error) => ({ ...error, form: null }))
  
      console.log("USER: ",profileForm)

      const {data, error} = await apiClient.editUserProfile({ username: profileForm.username.toLowerCase(), firstName: profileForm.firstName, lastName: profileForm.lastName,
                                                             imageUrl: profileForm.imageUrl, email: user.email, gameList: [...user.gameList, ...selectedGames], location: user.location})
      for (let i=0;i<selectedGames.length;i++) {
        const { test } = await apiClient.addGamesToLocalDB({gameId:selectedGames[i],gameName:selectedGamesNames[i],gameSummary:selectedGamesSummary[i],gameImageUrl:selectedGamesPic[i]})
      }
      if(error) setErrors((e) => ({ ...e, form: error}))
      if(data?.user) {
        
        setUser(data.user)
        onClose()
        // window.location.reload();
        setIsSubmit(true)
        window.location = document.URL;
      }
      setIsLoading(false)
    }

 return(
    <Container>
        <ModalOverlay width={'100%'} />
          <ModalContent maxWidth={'80%'}>
            <ModalHeader>Edit Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <EditProfileForm user={user} profileForm={profileForm} setProfileForm={setProfileForm} isSubmit={isSubmit} errors={errors} setErrors={setErrors} selectedGames={selectedGames} setSelectedGames={setSelectedGames} selectedGamesNames={selectedGamesNames}
        setSelectedGamesNames={setSelectedGamesNames}
        selectedGamesSummary={selectedGamesSummary}
        setSelectedGamesSummary={setSelectedGamesSummary}
        selectedGamesPic={selectedGamesPic}
        setSelectedGamesPic={setSelectedGamesPic} />
            </ModalBody>
  
            <ModalFooter>
            <Button mx={1} background={"hsl(271, 70%, 60%)"} 
            color={"hsl(0, 0%, 100%)"} 
            _hover={{
              "background":COLORS.ultraViolet,
              "color": COLORS.offWhite
            }} onClick={handleOnSubmit}>Submit</Button>
            <Button mx={1} borderColor={COLORS.ultraViolet}
            background={"white"} 
            color={COLORS.ultraViolet}
            variant={'outline'}
            _hover={{
              "background":COLORS.ultraViolet,
              "color": COLORS.offWhite
            }} mr={3} onClick={onClose}>Cancel</Button>
              
            </ModalFooter>
          </ModalContent>
             
    </Container>
   )
}

function EditProfileForm({ user, profileForm, setProfileForm, isSubmit, errors, setErrors, selectedGames, setSelectedGames, selectedGamesNames, setSelectedGamesNames, selectedGamesSummary, setSelectedGamesSummary, selectedGamesPic, setSelectedGamesPic }) {

    const handleOnInputChange = (event) => {

        setProfileForm((form) => ({ ...form, [event.target.name]: event.target.value }))
      }
    // const isError = form === ''
    return (
      <ChakraProvider theme={theme}>
        <VStack spacing={5} fontFamily={"mono, sans-serif"} color={COLORS.indigo}>
        <FormControl variant="floating" isInvalid={(!profileForm.username.length>0)  || (errors.form) ?true:false}>
        {profileForm.username.length>0?
        <FormLabel transform="scale(0.85) translateY(-21px)">Username</FormLabel>
        :<FormLabel >Username</FormLabel>}
        <Input id='username' name="username" type='text' textTransform={'lowercase'} maxLength={'15'}
          defaultValue={user.username.toLowerCase()} focusBorderColor='purple.400' 
          onChange={handleOnInputChange}
        />
        {/* {(errors.form)?<FormErrorMessage>Username already taken.</FormErrorMessage>:null} */}
        {(!profileForm.username.length>0) || (errors.form)?<FormErrorMessage>{errors.form}</FormErrorMessage>:null}
        </FormControl>
        <FormControl variant="floating">
        {profileForm.firstName.length>0?
        <FormLabel transform="scale(0.85) translateY(-21px)">First Name</FormLabel>
        :<FormLabel >First Name</FormLabel>}
        <Input id='firstName' name="firstName" type='text'
          defaultValue={user.firstName} focusBorderColor='purple.400' 
          onChange={handleOnInputChange}
        /></FormControl>
        <FormControl variant="floating">
        {profileForm.firstName.length>0?
        <FormLabel transform="scale(0.85) translateY(-21px)">Last Name</FormLabel>
        :<FormLabel >Last Name</FormLabel>}
       
        <Input id='lastName' name="lastName" type='text'
          defaultValue={user.lastName} focusBorderColor='purple.400' 
          onChange={handleOnInputChange}
        /></FormControl>

        <FormControl variant="floating">
        {profileForm.location?.length>0?
        <FormLabel transform="scale(0.85) translateY(-21px)">Location</FormLabel>
        :<FormLabel >Location</FormLabel>}
        <Input id='location' name="location" type='text' maxLength={'20'}
          defaultValue={profileForm.location} focusBorderColor='purple.400' 
          onChange={handleOnInputChange}
        />
        </FormControl>

        <FormControl variant="floating">
        {profileForm.firstName.length>0?
        <FormLabel transform="scale(0.85) translateY(-21px)">Image URL</FormLabel>
        :<FormLabel >Image URL</FormLabel>}
        <Input  id='imageUrl' name="imageUrl" type='text'
          defaultValue={user.imageUrl} focusBorderColor='purple.400' 
          onChange={handleOnInputChange}
        /></FormControl>

        {/* <FormLabel htmlFor='gameList'>Games Played</FormLabel> */}
        <Search selectedGames={selectedGames} setSelectedGames={setSelectedGames} selectedGamesNames={selectedGamesNames}
         setSelectedGamesNames={setSelectedGamesNames} selectedGamesSummary={selectedGamesSummary} setSelectedGamesSummary={setSelectedGamesSummary}
         selectedGamesPic={selectedGamesPic} setSelectedGamesPic={setSelectedGamesPic} userGameList={user.gameList} />

      </VStack>
      </ChakraProvider>
    )
}
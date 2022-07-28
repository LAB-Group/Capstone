import * as React from "react"
import  { useAuthContext } from "../../contexts/auth"
import {useState} from "react"
import apiClient from "../../services/apiClient"
import {
    Container, FormControl, FormLabel, Input,
    ModalOverlay, ModalContent, ModalHeader,
    ModalFooter, ModalBody, ModalCloseButton, Button
  } from '@chakra-ui/react'
import Search from "../Search/Search"

 
export default function EditProfile({onClose}){
  const { user, setUser } = useAuthContext()
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [selectedGames, setSelectedGames] = useState([])
  const [profileForm, setProfileForm] = useState({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
      email: user.email,
      gameList: user.gameList
    })

    const handleOnSubmit = async () => {
      setIsLoading(true)
      setErrors((error) => ({ ...error, form: null }))
  
      const {data, error} = await apiClient.editUserProfile({ username: profileForm.username, firstName: profileForm.firstName, lastName: profileForm.lastName,
                                                             imageUrl: profileForm.imageUrl, email: user.email, gameList: selectedGames})
      if(error) setErrors((e) => ({ ...e, form: error}))
      if(data?.user) {
        
        setUser(data.user)
        onClose()
      }
      setIsLoading(false)
    }

 return(
    <Container>
        <ModalOverlay width={'100%'} />
          <ModalContent maxWidth={'50rem'}>
            <ModalHeader>Edit Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <EditProfileForm user={user} profileForm={profileForm} setProfileForm={setProfileForm} setErrors={setErrors} selectedGames={selectedGames} setSelectedGames={setSelectedGames} />
            </ModalBody>
  
            <ModalFooter>
            <Button colorScheme='purple' variant='ghost' onClick={handleOnSubmit}>Submit</Button>
              <Button colorScheme='purple' mr={3} onClick={onClose}>Cancel</Button>
              
            </ModalFooter>
          </ModalContent>
             
    </Container>
   )
}

function EditProfileForm({ user, profileForm, setProfileForm, setErrors, selectedGames, setSelectedGames }) {

    const handleOnInputChange = (event) => {

        setProfileForm((form) => ({ ...form, [event.target.name]: event.target.value }))
      }
  
    // const isError = form === ''
    return (
        <FormControl>

        <FormLabel htmlFor='username'>Username</FormLabel>
        <Input id='username' name="username" type='text'
          defaultValue={user.username}
          onChange={handleOnInputChange}
        />

        <FormLabel htmlFor='firstName'>First Name</FormLabel>
        <Input id='firstName' name="firstName" type='text'
          defaultValue={user.firstName}
          onChange={handleOnInputChange}
        />

        <FormLabel htmlFor='lastName'>Last Name</FormLabel>
        <Input id='lastName' name="lastName" type='text'
          defaultValue={user.lastName}
          onChange={handleOnInputChange}
        />

        <FormLabel htmlFor='imageUrl'>Image URL</FormLabel>
        <Input id='imageUrl' name="imageUrl" type='text'
          defaultValue={user.imageUrl}
          onChange={handleOnInputChange}
        />

        {/* <FormLabel htmlFor='gameList'>Games Played</FormLabel> */}
        <Search selectedGames={selectedGames} setSelectedGames={setSelectedGames} />

      </FormControl>
      
    )
}
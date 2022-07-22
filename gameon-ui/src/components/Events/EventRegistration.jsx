import * as React from "react"
import {useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import apiClient from "../../services/apiClient"
import  { useAuthContext } from "../../contexts/auth"
import { Box, ControlBox, Text, Heading, Container, DrawerHeader, DrawerBody, Input, DrawerFooter, Button, FormControl,
    FormLabel, FormErrorMessage, FormHelperText } from "@chakra-ui/react"
import Search from "../Search/Search"

export default function EventPage(){
  const { user, setUser } = useAuthContext()
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [eventRegistrationForm, setEventRegistrationForm] = useState({
      eventGame: []
    })

    let { eventId } = useParams()
    console.log(eventId)

    const handleOnInputChange = (event) => {
        setEventRegistrationForm((form) => ({ ...form, [event.target.name]: event.target.value }))
      }

    const handleOnSubmit = async () => {

      setErrors((error) => ({ ...error, form: null }))

      const {data, error} = await apiClient.registerForEvent({ eventId: eventId, eventGame: [1,2,3] //  eventGame: eventRegistrationForm.eventGame
                                                      })
      if(error) setErrors((e) => ({ ...e, form: error}))

    }
    
    return(
        <Container>
            <FormControl isRequired>
            <FormLabel htmlFor="eventGame">Event Game</FormLabel>
        {/* need to search from game DB and add to an array of games for event */}
        <Input
          id="eventGame"
          name="eventGame"
          type="text"
          defaultValue={eventRegistrationForm.eventGame}
          onChange={handleOnInputChange}
        />
            </FormControl>

            <Search/>

            <Button margin={2} colorScheme="purple" mr={3} onClick={handleOnSubmit}>
          Register
        </Button>
        </Container>
    )
}
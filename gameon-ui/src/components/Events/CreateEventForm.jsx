import * as React from "react"
import {useState} from "react"
import { Heading, Container, Button, FormControl, Select,
    FormLabel, FormErrorMessage, FormHelperText, Input } from "@chakra-ui/react"

export default function CreateEventForm() {
    const [errors, setErrors] = useState({})
    const [createEventForm, setCreateEventForm] = useState({
        eventname: "",
        eventtype: "",
        location: "",
        eventgame: "",
        eventdetails: "",
        eventimage: "",
      })

      const handleOnInputChange = (event) => {
        setCreateEventForm((createEventForm) => ({ ...createEventForm, [event.target.name]: event.target.value }))
      }
      
      const handleOnSubmit = async () => {
        console.log("CREATE EVENT FORM: ",createEventForm)
      }


    //   add stream/video link so we can embed player?

    return (
        <Container>
            <FormControl isRequired >
                <FormLabel htmlFor='eventname'>Event Name</FormLabel>
                <Input
                id='eventname' type='text' name="eventname"
                value={createEventForm.eventname}
                onChange={handleOnInputChange}
                />

                <FormLabel htmlFor='eventtype'>Event Type</FormLabel>
                <Select id='eventtype' name="eventtype" placeholder='Select Event Type'
                value={createEventForm.eventtype}
                onChange={handleOnInputChange}>
                    <option>Meet-up</option>
                    <option>Tournament</option>
                </Select>

                <FormLabel htmlFor='location'>Location</FormLabel>
                {/* Need to cycle if online or offline, if offline, enter address? */}
                <Input
                id='location' name="location" type='text'
                value={createEventForm.location}
                onChange={handleOnInputChange}
                />

                <FormLabel htmlFor='eventgame'>Event Game</FormLabel>
                {/* need to search from game DB and add to an array of games for event */}
                <Input
                id='eventgame' name="eventgame" type='text'
                value={createEventForm.eventgame}
                onChange={handleOnInputChange}
                />

                <FormLabel htmlFor='eventdetails'>Event Details</FormLabel>
                {/* Should be a body of text with more event info. Might need to break down into other form elements? */}
                <Input
                id='eventdetails' name="eventdetails" type='text'
                value={createEventForm.eventdetails}
                onChange={handleOnInputChange}
                />

                <FormLabel htmlFor='eventimage'>Event Image</FormLabel>
                {/* Possibility to add uploaded images? */}
                <Input
                id='eventimage' name="eventimage" type='url'
                value={createEventForm.eventimage}
                onChange={handleOnInputChange}
                />

                <Button colorScheme='blue' mr={3} onClick={handleOnSubmit} >Create</Button>
                <Button variant='outline' >Cancel</Button>

            </FormControl>
        </Container>

    )
}
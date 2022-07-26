import * as React from 'react';
import { useState } from 'react';
import apiClient from '../../services/apiClient';
import {
  Heading,
  Container,
  Button,
  FormControl,
  Select,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Badge,
  Input,
  extendTheme,
  ChakraProvider,
  VStack,
  useOutsideClick,
  Textarea,
  Text
} from '@chakra-ui/react';
import Search from '../Search/Search';

// import { Calendar } from '@natscale/react-calendar';

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

export default function CreateEventForm({ onClose }) {
  const [errors, setErrors] = useState({});
  const [games, setGames] = useState([])
  const [createEventForm, setCreateEventForm] = useState({
    eventName: '',
    eventDate: '',
    eventType: '',
    eventLocation: '',
    eventGame: [...games],
    eventDetails: '',
    eventImageUrl: '',
  });
  const handleOnInputChange = event => {
    setCreateEventForm(createEventForm => ({
      ...createEventForm,
      [event.target.name]: event.target.value,
    }));
  };

  const handleOnSubmit = async () => {
    setErrors(error => ({ ...error, form: null }));

    const { data, error } = await apiClient.createEvent({
      eventName: createEventForm.eventName,
      eventDate: createEventForm.eventDate,
      eventType: createEventForm.eventType,
      eventLocation: createEventForm.eventLocation,
      eventGame: games, //createEventForm.eventGame,
      eventDetails: createEventForm.eventDetails,
      eventImageUrl: createEventForm.eventImageUrl,
    });
    if (error) setErrors(e => ({ ...e, form: error }));
    onClose();
    window.location.reload();
  };
  const ref = React.useRef()
  const [showTimeDate, setShowTimeDate] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const handleClick = () => setShowPassword(!showPassword)
  
  
  useOutsideClick({
    ref: ref,
    handler: () =>{ if(!createEventForm.eventDate.length>0){setShowTimeDate(false)}},
    
    
  })

  // const handleClick = () => setShowPassword(!showPassword)
  //   add stream/video link so we can embed player?

  return (
    <ChakraProvider theme={theme}>
      <Container centerContent maxWidth='4xl' p={3}>
        <VStack spacing={5} w="700px">
        <Text fontSize='xl'><b>Create Event</b></Text>
      <FormControl variant="floating" >
      {createEventForm.eventName.length>0?
        <FormLabel transform="scale(0.85) translateY(-21px)">Event Name</FormLabel>
         : 
        <FormLabel>Event Name</FormLabel>}
        
        <Input
          id="eventName"
          type="text"
          focusBorderColor='purple.400' 
          name="eventName"
          defaultValue={createEventForm.eventName}
          onChange={handleOnInputChange}
        />
      </FormControl>

        <FormControl variant="floating">
        {createEventForm.eventDate.length>0?
        <FormLabel transform="scale(0.85) translateY(-21px)">Event Date</FormLabel>
         : 
       <FormLabel htmlFor="eventDate">Event Date</FormLabel>}
        
        <Input
          id="eventDate"
          name="eventDate"
          focusBorderColor='purple.400' 
          onClick={() => setShowTimeDate(true)}
          ref={ref}
          type={showTimeDate?"datetime-local":"text"}
          value={createEventForm.eventDate}
          onChange={handleOnInputChange}
        />
        </FormControl>
        <FormControl variant="floating">
        {createEventForm.eventType.length>0?
        <FormLabel transform="scale(0.85) translateY(-21px)">Event Type</FormLabel>
         : 
       <FormLabel htmlFor="eventType">Event Type</FormLabel>}
        
        <Select
          id="eventType"
          name="eventType"
          onClick={handleClick}
          focusBorderColor='purple.400' 
          value={createEventForm.eventType}
          onChange={handleOnInputChange}
        >
          <option>Meet-up</option>
          <option>Tournament</option>
          <option>Speedrunning</option>
        </Select>
        </FormControl>

        <FormControl variant="floating">
        {createEventForm.eventLocation.length>0?
        <FormLabel transform="scale(0.85) translateY(-21px)">Event Location</FormLabel>
         : 
        <FormLabel htmlFor="eventLocation">Event Location</FormLabel>}
        
       
        {/* Need to cycle if online or offline, if offline, enter address? */}
        <Input
          id="eventLocation"
          name="eventLocation"
          type="text"
          focusBorderColor='purple.400' 
          defaultValue={createEventForm.eventLocation}
          onChange={handleOnInputChange}
        />
        </FormControl>
        
        
      
        <Search games={games} setGames={setGames} />
    
        <FormControl variant="floating">
        {createEventForm.eventDetails.length>0?
        <FormLabel transform="scale(0.85) translateY(-21px)">Event Details</FormLabel>
         : 
        <FormLabel htmlFor="eventDetails">Event Details</FormLabel>}
        
        {/* Should be a body of text with more event info. Might need to break down into other form elements? */}
        <Textarea
          id="eventDetails"
          name="eventDetails"
          type="text"
          focusBorderColor='purple.400' 
          defaultValue={createEventForm.eventDetails}
          onChange={handleOnInputChange}
        />
        </FormControl>
        <FormControl variant="floating">
        {createEventForm.eventImageUrl.length>0?
        <FormLabel transform="scale(0.85) translateY(-21px)">Event Image</FormLabel>
         : 
        <FormLabel htmlFor="eventImageUrl">Event Image</FormLabel>}
        
        {/* Possibility to add uploaded images? */}
        <Input
          id="eventImageUrl"
          name="eventImageUrl"
          type="url"
          defaultValue={createEventForm.eventImageUrl}
          focusBorderColor='purple.400' 
          onChange={handleOnInputChange}
        />
        </FormControl>
        <Button colorScheme="purple" mt={1}  w="350px"onClick={handleOnSubmit}>
          Create
        </Button>
        {/* <Button colorScheme="purple" variant="outline" onClick={onClose}>
          Cancel
       </Button> */}
      
      </VStack>
     </Container>
    </ChakraProvider>
  );
}

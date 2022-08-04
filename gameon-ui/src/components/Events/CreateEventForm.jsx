import * as React from 'react';
import { useState } from 'react';
import apiClient from '../../services/apiClient';
import { ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Container,
  Button,
  FormControl,
  Select,
  FormLabel,
  Input,
  extendTheme,
  ChakraProvider,
  VStack,
  useOutsideClick,
  Textarea,
  Text, FormErrorMessage, HStack
} from '@chakra-ui/react';
import Search from '../Search/Search';
import {COLORS} from "../colors"
import axios from 'axios';
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
  const [selectedGames, setSelectedGames] = useState([])
  const [selectedGamesNames, setSelectedGamesNames] = useState([])
  const [selectedGamesSummary, setSelectedGamesSummary] = useState([])
  const [selectedGamesPic, setSelectedGamesPic] = useState([])
  const [isSubmit,setIsSubmit]=useState()
  const [selectedImage, setSelectedImage] = useState(null);
 
  const date = new Date()
  let today = date.toISOString().split('T')[0]

  const [createEventForm, setCreateEventForm] = useState({
    eventName: '',
    eventStartDate: '',
    eventEndDate: '',
    eventType: '',
    eventLocation: '',
    eventGame: [...selectedGames],
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
      eventStartDate: createEventForm.eventStartDate,
      eventEndDate: createEventForm.eventEndDate,
      eventType: createEventForm.eventType,
      eventLocation: createEventForm.eventLocation,
      eventGame: selectedGames, //createEventForm.eventGame,
      eventDetails: createEventForm.eventDetails,
      eventImageUrl: createEventForm.eventImageUrl,
    });
    for (let i=0;i<selectedGames.length;i++) {
        const { test } = await apiClient.addGamesToLocalDB({gameId:selectedGames[i],gameName:selectedGamesNames[i],gameSummary:selectedGamesSummary[i],gameImageUrl:selectedGamesPic[i]})
    }
    if (error) setErrors(e => ({ ...e, form: error }));
    setIsSubmit(true)
   
     if(createEventForm.eventName.length>0&&createEventForm.eventStartDate.length>0&&createEventForm.eventEndDate.length>0&&createEventForm.eventType.length>0&&createEventForm.eventLocation.length>0&&createEventForm.eventDetails.length>0){
          onClose();
          window.location.reload();
     }    
  };


  const ref = React.useRef()
  const [showTimeDate, setShowTimeDate] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const handleClick = () => setShowPassword(!showPassword)
  
  //How is below being used? Add Event End Date?
  // useOutsideClick({
  //   ref: ref,
  //   handler: () =>{ if(!createEventForm.eventStartDate.length>0){setShowTimeDate(false)}},
    
    
  // })

  // const handleClick = () => setShowPassword(!showPassword)
  //   add stream/video link so we can embed player?

  // const onFileChange = event => {
  //   this.setState({ selectedFile: event.target.files[0] });
  // };

  // const onFileUpload = () => {
  //   const formData = new FormData();
  
  //   formData.append(
  //     "myFile",
  //     this.state.selectedFile,
  //     this.state.selectedFile.name
  //   );

  //   axios.post("api/uploadfile", formData);
  // };



  return (
    <ChakraProvider theme={theme}>
    <Container centerContent  >
    <ModalOverlay />
    <ModalContent maxWidth={'100rem'} width={'90%'} maxHeight={'85%'} overflowY={'auto'}
                                      css={{
                                        '&::-webkit-scrollbar': {
                                          width: '8px',
                                        },
                                        '&::-webkit-scrollbar-track': {
                                          width: '10px',
                                        },
                                        '&::-webkit-scrollbar-thumb': {
                                          background: '#805AD5',
                                          borderRadius: '24px',
                                        },}} >
      <ModalHeader>Create Event</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
         {/* To adjust form add padding here */}
        <VStack spacing={5}>
       <FormControl color={COLORS.indigo} variant="floating"  isInvalid={!createEventForm.eventName.length>0&&isSubmit?true:false}>
       {createEventForm.eventName.length>0?
        <FormLabel transform="scale(0.85) translateY(-21px)">Event Name</FormLabel>
         : 
        <FormLabel>Event Name</FormLabel>}
        
        <Input
          id="eventName"
          type="text"
          focusBorderColor={COLORS.ultraViolet} 
          name="eventName"
          defaultValue={createEventForm.eventName}
          onChange={handleOnInputChange}
        />
        {!createEventForm.eventName.length>0&&isSubmit?<FormErrorMessage>Event Name is required.</FormErrorMessage>:null}
      </FormControl>

<HStack width={'100%'}>


        {/* EVENT START DATE */}
        <FormControl variant="floating" isInvalid={((!createEventForm.eventStartDate.length>0)||(today > createEventForm.eventStartDate))&&isSubmit?true:false}>
        {createEventForm.eventStartDate.length>0?
        <FormLabel transform="scale(0.85) translateY(-21px)">Start Date</FormLabel>
         : 
       <FormLabel htmlFor="eventStartDate">Start Date</FormLabel>}
        
        <Input
          id="eventStartDate"
          name="eventStartDate"
          focusBorderColor={COLORS.ultraViolet} 
          onClick={() => setShowTimeDate(true)}
          ref={ref}
          type={showTimeDate?"date":"text"}
          value={createEventForm.eventStartDate}
          onChange={handleOnInputChange}
        />
        {/* {!createEventForm.eventStartDate.length>0&&isSubmit?<FormErrorMessage>Start Date is required.</FormErrorMessage>:null} */}
        {((!createEventForm.eventStartDate.length>0)||(today > createEventForm.eventStartDate))&&isSubmit?<FormErrorMessage>Start Date not valid</FormErrorMessage>:null}
        </FormControl>

        {/* EVENT END DATE */}
        <FormControl variant="floating" isInvalid={((!createEventForm.eventEndDate.length>0) || (createEventForm.eventEndDate < createEventForm.eventStartDate))&&isSubmit?true:false}>
        {createEventForm.eventEndDate.length>0?
        <FormLabel transform="scale(0.85) translateY(-21px)">End Date</FormLabel>
         : 
       <FormLabel htmlFor="eventEndDate">End Date</FormLabel>}
        
        <Input
          id="eventEndDate"
          name="eventEndDate"
          focusBorderColor={COLORS.ultraViolet} 
          onClick={() => setShowTimeDate(true)}
          ref={ref}
          type={showTimeDate?"date":"text"}
          value={createEventForm.eventEndDate}
          onChange={handleOnInputChange}
        />
        {((!createEventForm.eventEndDate.length>0) || (createEventForm.eventEndDate < createEventForm.eventStartDate))&&isSubmit?<FormErrorMessage>End Date not valid</FormErrorMessage>:null}
        </FormControl>
        </HStack>

        <FormControl variant="floating" isInvalid={!createEventForm.eventType.length>0&&isSubmit?true:false}>
        {createEventForm.eventType.length>0?
        <FormLabel transform="scale(0.85) translateY(-21px)">Event Type</FormLabel>
         : 
       <FormLabel htmlFor="eventType">Event Type</FormLabel>}
        
        <Select
          id="eventType"
          name="eventType"
          onClick={handleClick}
          focusBorderColor={COLORS.ultraViolet} 
          value={createEventForm.eventType}
          placeholder="Select..."
          onChange={handleOnInputChange}
        >
          <option>Meet-up</option>
          <option>Casuals</option>
          <option>Tournament</option>
          <option>Speedrunning</option>
        </Select>
        {!createEventForm.eventType.length>0&&isSubmit?<FormErrorMessage>Event Type is required.</FormErrorMessage>:null
        }
        </FormControl>

        <FormControl variant="floating" isInvalid={!createEventForm.eventLocation.length>0&&isSubmit?true:false}>
        {createEventForm.eventLocation.length>0?
        <FormLabel transform="scale(0.85) translateY(-21px)">Event Location</FormLabel>
         : 
        <FormLabel htmlFor="eventLocation">Event Location</FormLabel>}
       
        {/* Need to cycle if online or offline, if offline, enter address? */}
        <Input
          id="eventLocation"
          name="eventLocation"
          type="text"
          focusBorderColor={COLORS.ultraViolet}
          defaultValue={createEventForm.eventLocation}
          onChange={handleOnInputChange}
        />
        {!createEventForm.eventLocation.length>0&&isSubmit?<FormErrorMessage>Event Location is required.</FormErrorMessage>:null
        }
        
        </FormControl>
        
        
      
        <Search selectedGames={selectedGames}
         setSelectedGames={setSelectedGames}
         selectedGamesNames={selectedGamesNames}
         setSelectedGamesNames={setSelectedGamesNames}
         selectedGamesSummary={selectedGamesSummary}
         setSelectedGamesSummary={setSelectedGamesSummary}
         selectedGamesPic={selectedGamesPic}
         setSelectedGamesPic={setSelectedGamesPic}
         />
    
        <FormControl variant="floating" isInvalid={!createEventForm.eventDetails.length>0&&isSubmit?true:false}>
        {createEventForm.eventDetails.length>0?
        <FormLabel transform="scale(0.85) translateY(-21px)">Event Details</FormLabel>
         : 
        <FormLabel htmlFor="eventDetails">Event Details</FormLabel>}
        
        {/* Should be a body of text with more event info. Might need to break down into other form elements? */}
        <Textarea
          id="eventDetails"
          name="eventDetails"
          type="text"
          focusBorderColor={COLORS.ultraViolet}
          overflowY={'auto'}
          defaultValue={createEventForm.eventDetails}
          onChange={handleOnInputChange}
        />
        </FormControl>
        <FormControl variant="floating"  isInvalid={!createEventForm.eventImageUrl.length>0&&isSubmit?true:false}>
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
          focusBorderColor={COLORS.ultraViolet}
          onChange={handleOnInputChange}
        />
        {!createEventForm.eventImageUrl.length>0&&isSubmit?<FormErrorMessage>Image URL is required.</FormErrorMessage>:null
            }

        {/* <Input type={"file"} accept={".jpg, .jpeg, .png, .gif"} onChange={onFileChange} placeholder={"Select File"}></Input>
        <Button onClick={onFileUpload}>Upload</Button> */}
        
        </FormControl> 
          
            {/* Add image */}
              {/* <Flex
                mt={1}
                justify="center"
                px={6}
                pt={5}
                pb={6}
                w='700px'
                borderWidth={2}
                _dark={{
                  color: "gray.500",
                }}
                borderStyle="dashed"
                rounded="md"
              >
                <Stack spacing={1} textAlign="center">
                  <Icon
                    mx="auto"
                    boxSize={12}
                    color="gray.400"
            
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Icon>
                  <Flex
                    fontSize="sm"
                    color="gray.600"
                    _dark={{
                      color: "gray.400",
                    }}
                    alignItems="baseline"
                  >
                    <chakra.label
                      htmlFor="file-upload"
                      cursor="pointer"
                      rounded="md"
                      fontSize="md"
                      color="brand.600"
                     
                    >
                      <span>Upload a file</span>
                      <VisuallyHidden>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          defaultValue={createEventForm.eventImageUrl}
                          focusBorderColor='purple.400' 
                          onChange={handleOnInputChange}
                        />
                      </VisuallyHidden>
                    </chakra.label>
                    <Text pl={1}>or drag and drop</Text>
                  </Flex>
                  <Text
                    fontSize="xs"
                    color="gray.500"
                    _dark={{
                      color: "gray.50",
                    }}
                  >
                    PNG, JPG, GIF up to 10MB
                  </Text>
                </Stack>
              </Flex> */}

        {/* <Button colorScheme="purple" variant="outline" onClick={onClose}>
          Cancel
       </Button> */}
      
      </VStack>
      </ModalBody>
      <ModalFooter display={'flex'} justifyContent={'center'}>
      <Button 
      background={"hsl(271, 70%, 60%)"} 
      color={"hsl(0, 0%, 100%)"} 
      _hover={{
        "background":COLORS.ultraViolet,
        "color": COLORS.offWhite
      }} 
      marginTop={1}
      width="250px"
      onClick={handleOnSubmit}>Create</Button>
      </ModalFooter>
    </ModalContent>
  </Container></ChakraProvider>
)
}

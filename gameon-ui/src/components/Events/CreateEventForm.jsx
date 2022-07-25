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
  Input
} from '@chakra-ui/react';
import Search from '../Search/Search';

// import { Calendar } from '@natscale/react-calendar';

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
  console.log("GAMES FORM", games)
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

  //   add stream/video link so we can embed player?

  return (
    <Container>
      <FormControl isRequired>
        <FormLabel htmlFor="eventName">Event Name</FormLabel>
        <Input
          id="eventName"
          type="text"
          name="eventName"
          defaultValue={createEventForm.eventName}
          onChange={handleOnInputChange}
        />

        <FormLabel htmlFor="eventDate">Event Date</FormLabel>
        <Input
          id="eventDate"
          name="eventDate"
          placeholder="Select Event Date"
          type="datetime-local"
          value={createEventForm.eventDate}
          onChange={handleOnInputChange}
        />

        <FormLabel htmlFor="eventType">Event Type</FormLabel>
        <Select
          id="eventType"
          name="eventType"
          placeholder="Select Event Type"
          value={createEventForm.eventType}
          onChange={handleOnInputChange}
        >
          <option>Meet-up</option>
          <option>Tournament</option>
          <option>Speedrunning</option>
        </Select>

        <FormLabel htmlFor="eventLocation">Event Location</FormLabel>
        {/* Need to cycle if online or offline, if offline, enter address? */}
        <Input
          id="eventLocation"
          name="eventLocation"
          type="text"
          defaultValue={createEventForm.eventLocation}
          onChange={handleOnInputChange}
        />

        <FormLabel htmlFor="eventGame">Event Game</FormLabel>
        {/* need to search from game DB and add to an array of games for event */}
        {/* <Input
          id="eventGame"
          name="eventGame"
          type="text"
          defaultValue={createEventForm.eventGame}
          onChange={handleOnInputChange}
        /> */}
        <Search games={games} setGames={setGames} />

        <FormLabel htmlFor="eventDetails">Event Details</FormLabel>
        {/* Should be a body of text with more event info. Might need to break down into other form elements? */}
        <Input
          id="eventDetails"
          name="eventDetails"
          type="text"
          defaultValue={createEventForm.eventDetails}
          onChange={handleOnInputChange}
        />

        <FormLabel htmlFor="eventImageUrl">Event Image</FormLabel>
        {/* Possibility to add uploaded images? */}
        <Input
          id="eventImageUrl"
          name="eventImageUrl"
          type="url"
          defaultValue={createEventForm.eventImageUrl}
          onChange={handleOnInputChange}
        />

        <Button colorScheme="purple" mr={3} onClick={handleOnSubmit}>
          Create
        </Button>
        <Button colorScheme="purple" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </FormControl>
    </Container>
  );
}

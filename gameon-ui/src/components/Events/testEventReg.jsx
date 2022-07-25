import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../../services/apiClient';
import { useAuthContext } from '../../contexts/auth';
import {
  Box,
  ControlBox,
  Text,
  Heading,
  Container,
  DrawerHeader,
  DrawerBody,
  Input,
  DrawerFooter,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Checkbox,
  CheckboxGroup,
} from '@chakra-ui/react';
import Search from '../Search/Search';

export default function EventPage({ event }) {
  const { user, setUser } = useAuthContext();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [eventGames, setEventGames] = useState([])

  const [eventRegistrationForm, setEventRegistrationForm] = useState({
    eventGame: [],
  });

  let { eventId } = useParams();

  const handleOnInputChange = event => {
    setEventRegistrationForm(form => ({
      ...form,
      [event.target.name]: event.target.value,
    }));
  };

  // const getEventGames = async () => {
  //   setErrors(error => ({ ...error, form: null }))

  //   const { data, error } = await apiClient.searchGame({searched:searchInput})

  //   console.log("SEARCHINPUT",searchInput)
  //   setEventGames([...data.games])
  //   console.log("LIST GAMES",data.games)
  // }

  const handleOnSubmit = async () => {
    setErrors(error => ({ ...error, form: null }));
    const { data, error } = await apiClient.registerForEvent({
      eventId: eventId,
      eventGame: [1, 2, 3], //  eventGame: eventRegistrationForm.eventGame
    });
    if (error) setErrors(e => ({ ...e, form: error }));
  };

  // console.log("LENGTH: ",event.eventGame.length)

  useEffect(() => {
    const getGameDetails = async () => {
      const { data, error } = await apiClient.getGameDetails({gameId:event.eventGame[0]})
      console.log("DATA",data)
      if(data) setEventGames(...data)
      // console.log("STATE",eventGames)
        // for (let i=0;i<event?.eventGame.length;i++) {
        //   const { data, error } = await apiClient.getGameDetails({gameId:event.eventGame[i]})
        //   if(data) setEventGames(...data)
        //   // console.log("DATA",data.games[0].name)
        //   if (error) setErrors(error)
        // }
    }
    getGameDetails()
  },[])

  // useEffect(() => {
  // const getGameDetails = async (game) => {
  //   setErrors(error => ({ ...error, form: null }));
  //   const { data, error } = await apiClient.getGameDetails(game)
  //   if (error) setErrors(e => ({ ...e, form: error }));

  //   console.log("DATA",data.games[0].name)
  //   // return data
  //   setEventGames(data.games[0].name)
  // }
  // },[])
  // getGameDetails({gameId:125764})

  return (
    <Container>
      {/* <FormControl isRequired> */}
        <FormLabel htmlFor="eventGame">Event Registration</FormLabel>
        {/* need to search from game DB and add to an array of games for event */}
        {/* <Input
          id="eventGame"
          name="eventGame"
          type="text"
          defaultValue={eventRegistrationForm.eventGame}
          onChange={handleOnInputChange}
        />
      </FormControl> */}

      <CheckboxGroup>
        {/* {event.eventGame?.map((game, index) => (
          // <Checkbox key={index}>{game}</Checkbox>
          <Checkbox key={index}>{eventGames}</Checkbox>
        ))} */}
        {eventGames?.map((game, index) => (
          // <Checkbox key={index}>{game}</Checkbox>
          <Checkbox key={index}>{game.name}</Checkbox>
        ))}
      </CheckboxGroup>

      <Button margin={2} colorScheme="purple" mr={3} onClick={handleOnSubmit}>
        Register
      </Button>
    </Container>
  );
}

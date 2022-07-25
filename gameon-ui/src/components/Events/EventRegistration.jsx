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

export default function EventRegistration({ event, eventGames }) {
  const { user, setUser } = useAuthContext();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  const handleOnSubmit = async () => {
    setErrors(error => ({ ...error, form: null }));
    const { data, error } = await apiClient.registerForEvent({
      eventId: eventId,
      eventGame: [1, 2, 3], //  eventGame: eventRegistrationForm.eventGame
    });
    if (error) setErrors(e => ({ ...e, form: error }));
  };
  return (
    <Container>

      <FormLabel htmlFor="eventGame">Event Registration</FormLabel>

      <CheckboxGroup>
        {event.eventGame?.map((game, index) => (
          
          <Checkbox margin={2} key={index}>{game}</Checkbox>
        ))}
      </CheckboxGroup>

      <Button margin={2} colorScheme="purple" mr={3} onClick={handleOnSubmit}>
        Register
      </Button>
    </Container>
  );
}

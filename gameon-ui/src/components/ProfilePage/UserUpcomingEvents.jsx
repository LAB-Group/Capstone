import * as React from 'react';
import {
  Box,
  Image,
  Center,
  Text,
  VStack,
  Divider,
  HStack,
  Stack,
  Badge,
  Heading,
  Button,
  Container,
  useDisclosure,
  Modal,
  SimpleGrid,
} from '@chakra-ui/react';
import { Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import EventCard from '../Events/EventCard';

export default function UserUpcomingEvents({ user, futureEvents }) {

  return (
    <>
      <Text fontSize="3xl">Upcoming Events</Text>
      <SimpleGrid
        minWidth="80vw"
        justifyContent={'center'}
        alignItems={'center'}
        minChildWidth={'320px'}
        rowGap="20px"
        className="WRAP"
      >
        {futureEvents.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
        {!futureEvents?.length ? (
          <Box>
            <Text>No Events available</Text>
          </Box>
        ) : null}
      </SimpleGrid>
    </>
  );
}

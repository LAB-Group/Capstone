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

export default function UserPreviousEvents({ user, prevEvents }) {

  return (
    <>
      <Text fontSize="3xl">Previous Events</Text>
      <SimpleGrid
        minWidth="80vw"
        justifyContent={'center'}
        alignItems={'center'}
        minChildWidth={'320px'}
        rowGap="20px"
        className="WRAP"
      >
        {prevEvents.map((event, index) => (
            <EventCard key={index} event={event} />
        ))}
        {!prevEvents?.length ? (
          <Box>
            <Text>No Events available</Text>
          </Box>
        ) : null}
      </SimpleGrid>
    </>
  );
}

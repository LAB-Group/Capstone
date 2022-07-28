import * as React from 'react';
import { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';
import {
  Input,
  Textarea,
  Image,
  Container,
  Spacer,
  FormControl,
  FormLabel,
  Button,
  extendTheme,
  VStack,Stack,
  Text, Box, Heading
} from '@chakra-ui/react';
import Posts from './Posts';

export default function PostsFeed({ eventId, posts }) {


  return (
    <VStack>
    <Stack alignContent=''>
      <Heading p={3}>Event Comments</Heading>
    </Stack>
  
    <Container centerContent minWidth="85vw">
      <VStack>
        {posts?.map((post, index) => (
          <Posts key={index} post={post} eventId={eventId} />
        ))}
        {/* {posts?.length ? (
          <Box>
            <Text>No Posts available</Text>
          </Box>
        ) : null} */}
      </VStack>
    </Container>
    </VStack>
  );
}

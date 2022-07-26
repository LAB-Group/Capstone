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
  VStack,
  Text, Box
} from '@chakra-ui/react';
import Posts from './Posts';

export default function PostsFeed({ eventId, posts }) {


  return (
    <Container centerContent minWidth="85vw">
      <VStack>
        {posts?.map((post, index) => (
          <Posts key={index} post={post} />
        ))}
        {/* {posts?.length ? (
          <Box>
            <Text>No Posts available</Text>
          </Box>
        ) : null} */}
      </VStack>
    </Container>
  );
}

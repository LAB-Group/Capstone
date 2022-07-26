import * as React from 'react';
import { useState } from 'react';
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
  HStack,
  Text, Box
} from '@chakra-ui/react';
import Posts from './Posts';

export default function PostsFeed({event}) {
  return (
    <Container centerContent minWidth="95vw">
      <HStack>
        {events?.map(event => (
          <Posts/>
        ))}
        {!events?.length ? (
          <Box>
            <Text>No Events available</Text>
          </Box>
        ) : null}
      </HStack>
    </Container>
  );
}

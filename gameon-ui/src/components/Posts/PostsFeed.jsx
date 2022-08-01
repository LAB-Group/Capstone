import * as React from 'react';
import { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';
import { Container, VStack, Stack, Heading } from '@chakra-ui/react';
import Posts from './Posts';
import { COLORS } from "../colors"
export default function PostsFeed({ eventId, posts }) {


  return (
    <VStack style={{"backdropFilter": "blur(9px)"}}>
    <Stack display={'flex'} justifyContent='flex-start'>
      <Heading color={COLORS.offWhite} p={3}>Event Comments</Heading>
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

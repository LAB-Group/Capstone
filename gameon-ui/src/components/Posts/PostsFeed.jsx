import * as React from 'react';
import { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';
import { Text, Container, VStack, Stack, Heading, Box } from '@chakra-ui/react';
import Posts from './Posts';
import { COLORS } from "../colors"

export default function PostsFeed({ eventId, posts }) {


  return (
    <>
    <VStack>
    <Stack display={'flex'} justifyContent='flex-start'>
      <Text position={"relative"} fontSize={"3xl"} fontWeight={300} textTransform={'uppercase'} mb={4}>Comments</Text>
    </Stack>
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
    </VStack>
    </>
  );
}

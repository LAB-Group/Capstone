import * as React from 'react';
import { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';
import { Text, Container, HStack, VStack, Stack, Heading, Box } from '@chakra-ui/react';
import Posts from './Posts';
import { COLORS } from "../colors"

export default function PostsFeed({ eventId, posts }) {


  return (
    <Box position={"relative"} py={"25px"}>
        <Stack spacing={{ base: 4, sm: 6 }} direction={"column"}>
        <Box textAlign={"left"} mx={5}>
      <Text marginLeft={5} fontFamily={"Roboto, sans-serif"} alignItems={"left"} position={"relative"} fontSize={"3xl"} fontWeight={300} textTransform={'uppercase'} mb={4}>Comments</Text>
      </Box>
      </Stack>
      <VStack>
         {posts?.map((post, index) => (
          <Posts key={index} post={post} eventId={eventId} />
        ))}
        {posts?.length ? (
          <Box>
            <Text fontFamily={"mono, sans-serif"}>No Posts available</Text>
          </Box>
        ) : null}
      </VStack>
    </Box>


                                        
    // <>
    // <VStack>
    // <Stack display={'flex'} justifyContent='flex-start'>
    //   <Text alignItems={"left"} position={"relative"} fontSize={"3xl"} fontWeight={300} textTransform={'uppercase'} mb={4}>Comments</Text>
    // </Stack>
    //   <VStack>
    //     {posts?.map((post, index) => (
    //       <Posts key={index} post={post} eventId={eventId} />
    //     ))}
    //     {/* {posts?.length ? (
    //       <Box>
    //         <Text>No Posts available</Text>
    //       </Box>
    //     ) : null} */}
    //   </VStack>
    // </VStack>
    // </>
  );
}

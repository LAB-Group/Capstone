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
  Text, Box, Heading, VStack
} from '@chakra-ui/react';

export default function Posts({post}) {
    let date = post.postCreatedAt
    let newDate = new Date(date)
    let postDate = newDate.toLocaleDateString('en-US')
    let time = newDate.toLocaleTimeString("en-US")


  return (
    <Container centerContent minWidth="65vw"  >
        <HStack>
            <VStack>
                <Text fontWeight={'bold'} >{post.creatorUsername}</Text>
                <Image borderRadius={'lg'} w='80px' h='80px' borderWidth='9px' src={post.creatorImageUrl} />
                <Text>{postDate}</Text>
                <Text>{time}</Text>
            </VStack>
            <VStack>
                <Heading as={'h3'} size='md' display={'flex'} >{post.postTitle}</Heading>
                <Text>{post.postContent}</Text>
            </VStack>
        </HStack>
    </Container>
  );
}

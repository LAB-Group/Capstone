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

export default function PostReply({postReply}) {
    let date = postReply.replyCreatedAt
    let newDate = new Date(date)
    let replyDate = newDate.toLocaleDateString('en-US')
    let time = newDate.toLocaleTimeString("en-US")


  return (
    <Container centerContent minWidth="65vw"  >
        <HStack>
            <VStack>
                <Text fontWeight={'bold'} >{postReply.creatorUsername}</Text>
                <Image borderRadius={'lg'} w='80px' h='80px' borderWidth='9px' src={postReply.creatorImageUrl} />
                <Text>{replyDate}</Text>
                <Text>{time}</Text>
            </VStack>
            <VStack>
                {/* <Heading as={'h3'} size='md' display={'flex'} >{postReply.postTitle}</Heading> */}
                <Text>{postReply.replyContent}</Text>
            </VStack>
        </HStack>
    </Container>
  );
}

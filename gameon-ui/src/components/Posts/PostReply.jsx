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
  Text, Box, Heading, VStack, Stack,Badge,Divider, Flex
} from '@chakra-ui/react';

export default function PostReply({postReply}) {
    let date = postReply.replyCreatedAt
    let newDate = new Date(date)
    let replyDate = newDate.toLocaleDateString('en-US')
    let time = newDate.toLocaleTimeString("en-US")


  return (
    <Box
              key="1"
              borderWidth="1px"
              shadow="md"
              bg="#fbfdff"
              position="relative"
              rounded="md"
              borderRadius="5px"
              maxW='900px'
              
              ml='175px'
              mb={30}
              mt={2}
              minH='150px'
            >
         
              <Stack isInline justifyContent="space-between"mt={2} pl={5} pr={5}>
                <Box minW="100%">
                  
                  <Stack isInline align="center" marginBottom="5px">
                  
                      <HStack>
                    <Flex
                      justifyContent={{
                        base: "center",
                        md: "end",
                      }}
                      mt={-16}>
                      <Image  w={20} mt={8} borderRadius="50%" src={postReply.creatorImageUrl}/>
                    </Flex>
                    <HStack spacing={400}>
                    <Text fontWeight={'bold'} >@{postReply.creatorUsername}</Text>
                    
                       <HStack>
                     <Badge variant='subtle' colorScheme='purple'>
                   {replyDate}
                    </Badge>
                    <Badge variant='subtle' colorScheme='purple'>
                    {time}
                    </Badge>
                    </HStack></HStack></HStack>
                  </Stack>
                  
                  
                 
               
                  
                  <Divider  w="750px"/>
                  <Box pl={1.5}>
                    
                    <Stack spacing={2} mt={1} isInline alignItems="center">
                      <Text  m={2} height="14px" width="80%">{postReply.replyContent}</Text>
                    </Stack>
                  </Box>
                </Box>
              </Stack>
            </Box>
    // <Container centerContent minWidth="65vw"  >
    //     <HStack>

    //         <VStack>
    //             <Text fontWeight={'bold'} >{postReply.creatorUsername}</Text>
    //             <Image borderRadius={'lg'} w='80px' h='80px' borderWidth='9px' src={postReply.creatorImageUrl} />
    //             <Text>{replyDate}</Text>
    //             <Text>{time}</Text>
    //         </VStack>
    //         <VStack>
    //             {/* <Heading as={'h3'} size='md' display={'flex'} >{postReply.postTitle}</Heading> */}
    //             <Text>{postReply.replyContent}</Text>
    //         </VStack>
    //     </HStack>
    // </Container>
  );
}

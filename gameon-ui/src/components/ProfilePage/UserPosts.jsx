import * as React from 'react';
import {
  Image,
  Container,
  HStack,
  Text,
  Box,
  Heading,
  VStack, Stack, Divider, Badge,Flex
} from '@chakra-ui/react';

export default function Posts({ post, key }) {
  let date = post.postCreatedAt;
  let newDate = new Date(date);
  let postDate = newDate.toLocaleDateString('en-US');
  let time = newDate.toLocaleTimeString('en-US');

  return (
    <Container centerContent>
      <Box
              key={key}
              borderWidth="1px"
              shadow="md"
              bg="#fbfdff"
              position="relative"
              rounded="md"
              borderRadius="5px"
              minW='1000px'
              pb={2}
              m={8}
             
            >
         
              <Stack isInline justifyContent="space-between" mt={2} pl={5} pr={5}>
                <Box minW="100%">
                  
                  <Stack isInline align="center" marginBottom="5px">
                    <HStack spacing={3}>
                    <Flex
                      justifyContent={{
                        base: "center",
                        md: "end",
                      }}
                      mt={-16}>
                      <Image  w={20} mt={8} borderRadius="50%" src={post.creatorImageUrl}/>
                    </Flex>
                    <Text fontWeight={'bold'} >@{post.creatorUsername}</Text>

                    </HStack>
                    
                  </Stack>
          
                  
                  
                  <Box pl="10px">
                    <Stack direction="row">
                    <Heading height="16px"  pb={10} width="100%">{post.postTitle}</Heading>
                    <HStack>
                   <Badge variant='subtle' colorScheme='purple'>
                   {postDate}
                    </Badge>
                    <Badge variant='subtle' colorScheme='purple'>
                    {time}
                    </Badge>
                    </HStack>
                    </Stack>
                    <Divider w="950px"/>
                    
                      <Box ma>
                      <Text  mt={2} minH="14px" width="80%">{post.postContent}</Text>
                    </Box>
                  </Box>
                </Box>
              </Stack>
            </Box>
        <Divider w='1200px'/>
        <VStack>
      </VStack>
    </Container>
  );
}

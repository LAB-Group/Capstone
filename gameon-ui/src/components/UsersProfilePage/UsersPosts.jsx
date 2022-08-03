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

export default function UsersPosts({ post, key }) {
  let date = post.postCreatedAt;
  let newDate = new Date(date);
  let postDate = newDate.toLocaleDateString('en-US');
  let time = newDate.toLocaleTimeString('en-US');

  return (
    <>
      <Box
              key={key}
              borderWidth="1px"
              shadow="md"
              bg="#fbfdff"
              position="relative"
              rounded="md"
              borderRadius="5px"
              width='600px'
              pb={2}          
            >
         
              <Stack isInline justifyContent="space-between" mt={2} pl={5} pr={5}>
                <Box minWidth="100%">
                <Stack isInline display="flex" justifyContent='space-between 'mb={2}>
                    <HStack spacing={4}>
                        <Flex
                          justifyContent={{
                            base: "center",
                            md: "end",
                          }}
                          mt={[-16]}>
                          <Image  w={[10,20]} h={[10,20]} mt={8} borderRadius="50%" src={post.creatorImageUrl}/>
                        </Flex>
                        <Text fontWeight={'bold'} >@{post.creatorUsername}</Text>
                      </HStack>
                      <HStack>
                        <Badge variant='subtle' colorScheme='purple'>{postDate}</Badge>
                        <Badge variant='subtle'colorScheme='purple'>{time}</Badge>
                      </HStack>
                    </Stack>
                    <Stack>
                        <Heading height="16px"  pb={10} width="100%">{post.postTitle}</Heading>
                        {/* <Divider w={['325px','450px','650px','800px','950px']}/> */}
                        <Text p={2} mt={2} minH="14px" >{post.postContent}</Text>
                    </Stack>
                    <Box/>
                </Box>
              </Stack>
            </Box>
        {/* <Divider w='1200px'/> */}
        <VStack>
      </VStack>
    </>
  );
}

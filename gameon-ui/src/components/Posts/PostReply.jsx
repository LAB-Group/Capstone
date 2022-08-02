import * as React from 'react';
import { Link } from "react-router-dom"
import {
  Image,
  HStack,
  Text, Box, Stack,Badge,Divider, Flex
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
              // maxW='100%'
              // w={['300px','450px','600px','750px', '900px']}
              w={['250px','350px','500px', '675px', '800px']}
              ml={'100px'}
              // ml={['0px','175px', '300px']}
              mb={30}
              mt={2}
              minH='150px'
            >
         
              <Stack isInline justifyContent="space-between"mt={2} pl={5} pr={5}>
                <Box minW="100%">
                  <Stack isInline display="flex" justifyContent='space-between 'mb={6}>
                    <HStack spacing={4}>
                        <Flex
                          justifyContent={{
                            base: "center",
                            md: "end",
                          }}
                          mt={-16}>
                          <Image  w={20} h={20} mt={8} borderRadius="50%" src={postReply.creatorImageUrl}/>
                        </Flex>
                        <Link to={`/user/${postReply.creatorId}/profile`}  ><Text fontWeight={'bold'} >@{postReply.creatorUsername}</Text></ Link>
                      </HStack>
                      <HStack>
                        <Badge variant='subtle'  colorScheme='purple'>{replyDate}</Badge>
                        <Badge variant='subtle'  colorScheme='purple'>{time}</Badge>
                      </HStack>
                    </Stack>
                  <Divider   w={['150px','300px','450px','600px','750px']}/>
                  <Box pl={1.5}>
                    
                    <Stack spacing={2} mt={1} isInline alignItems="center">
                      <Text  m={2} height="14px" width="80%">{postReply.replyContent}</Text>
                    </Stack>
                  </Box>
                </Box>
              </Stack>
            </Box>
  );
}

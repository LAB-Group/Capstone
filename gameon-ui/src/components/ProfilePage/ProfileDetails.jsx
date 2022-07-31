import * as React from "react"
import EditProfile from "../EditProfile/EditProfile"
import { Box, Image, Center, Text, VStack, Divider, HStack, Stack, Badge, Heading, Button, Container, useDisclosure, Modal, SimpleGrid, Wrap,Flex, Tag, TagLabel} from "@chakra-ui/react"
import { Routes, Route, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  
  faFacebookSquare,
  faTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";

export default function ProfileDetails({ user, onOpen, onClose, isOpen, games }) {
    const [loading, setLoading] = useState(true)

    return (
        <>
        <Routes>
            <Route path="/profile/edit-profile" element={
                <EditProfile />
            } />
        </Routes>

        <Center>
        <Stack
          borderWidth="1px"
          rounded="md"
          borderRadius="5px"
          w= "1200px"
          bg="#fbfdff"
          height={{ sm: '476px', md: '20rem' }}
          direction={{ base: 'column', md: 'row' }}
          display='flex'
          justifyContent={"space-between"}
              
        
          padding={4}>
          <Box>
            <Image
            mr={9}
               borderWidth="1px"
               rounded="md"
               position={"relative"}
               borderRadius="5px"
              objectFit="cover"
              boxSize="100%"
              src={user.imageUrl}
              />
          </Box>
          <Box w={900} >
          <Stack
            flex={1}
            flexDirection="column"
            m={30}
            p={1} 
            
            pt={2}>
            <Heading fontSize={'2xl'} fontFamily={'body'}>{user.firstName} {user.lastName}</Heading>
            <Stack direction={'row'} display={"flex"} justifyContent= "space-between">
            <Text fontWeight={600} color={'gray.500'} size="sm" >@{user.username.toLowerCase()}</Text>
            <HStack>
                <FontAwesomeIcon icon={faFacebookSquare} />
                <FontAwesomeIcon icon={faTwitter} />
                <FontAwesomeIcon icon={faInstagram}/>
               </HStack> 
            </Stack>
            <Stack
            display={"flex"}
            mt={0}
           >
              <Wrap display={'flex'} H={'70px'} overflowY={'auto'}
                                      css={{
                                        '&::-webkit-scrollbar': {
                                          width: '8px',
                                        },
                                        '&::-webkit-scrollbar-track': {
                                          width: '10px',
                                        },
                                        '&::-webkit-scrollbar-thumb': {
                                          background: '#805AD5',
                                          borderRadius: '24px',
                                        },}}
                                >
              {games?.map((game, index) => (
                                    // <Text display={'flex'} maxWidth={'1000px'} key={index}>{game.name},</Text>
                                  <Tag
                                    
                                    variant="subtle"
                                    key={index}
                                   
                                    colorScheme="purple"
                                  >
                                    <TagLabel>{game.gameName}</TagLabel>
                                    
                                  </Tag>

                                ))}</Wrap>
                                </Stack>
                                
                             
                            <Link to="/profile/edit-profile">
                                <Button w='800px' h='30px'mt={3} borderRadius='sm' colorScheme='purple' variant='outline' onClick={onOpen} >Edit Profile</Button>
                            </Link>

                            <Modal isOpen={isOpen} onClose={onClose}><EditProfile onClose={onClose} /></Modal>

          
          </Stack>
          </Box>
        </Stack>
      </Center>




        {/* <Box w="1200px" h='300px' p={4} borderRadius='sm'>
                <HStack spacing='24px'>
                    <Box borderWidth='1px' borderRadius={'lg'} boxShadow={'md'}>
                        <Image borderRadius={'lg'} w='260px' h='260px' borderWidth='9px' src={user.imageUrl} />
                    </Box>
                    <Box w='1000px' h='200px'>
                        <VStack p={5} spacing={4} >
                            <Box w='810px' h='30px' >Username: {user.username}</Box>
                            <Divider orientation='horizontal' />
                            <Box w='810px' h='30px' >Name: {user.firstName} {user.lastName}</Box>
                            <Divider orientation='horizontal' />
                            {/* <Box w='810px' h='30px' >Location</Box>
                            <Divider orientation='horizontal' /> */}
                            {/* <Box w='810px' h='70px'  >
                                <Text>Games played:</Text>
                                <Wrap display={'flex'} maxH={'50px'} overflowY={'auto'}
                                      css={{
                                        '&::-webkit-scrollbar': {
                                          width: '8px',
                                        },
                                        '&::-webkit-scrollbar-track': {
                                          width: '10px',
                                        },
                                        '&::-webkit-scrollbar-thumb': {
                                          background: '#805AD5',
                                          borderRadius: '24px',
                                        },}}
                                >
                                {games.game?.map((game, index) => (
                                    <Text display={'flex'} maxWidth={'1000px'} key={index}>{game.name},</Text>

                                ))}
                                </Wrap>
                             </Box>
                            <Link to="/profile/edit-profile">
                                <Button w='810px' h='30px' borderRadius='sm' colorScheme='purple' variant='outline' onClick={onOpen} >Edit Profile</Button>
                            </Link>

                            <Modal isOpen={isOpen} onClose={onClose}><EditProfile onClose={onClose} /></Modal>

                        </VStack>
                    </Box>
                </HStack>
            </Box> */} 

</>
    )

}
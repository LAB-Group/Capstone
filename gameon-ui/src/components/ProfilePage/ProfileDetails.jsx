import * as React from "react"
import EditProfile from "../EditProfile/EditProfile"
import { Box, Image, Text, 
         HStack, Stack, Heading, 
         Button, Modal, Wrap, 
         Flex, Tag, TagLabel } from "@chakra-ui/react"
import { Routes, Route, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  
  faFacebookSquare,
  faTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";
import { COLORS } from "../colors"

export default function ProfileDetails({ user, onOpen, onClose, isOpen, games }) {
    const [loading, setLoading] = useState(true)

    return (
        <>
        <Routes>
            <Route path="/profile/edit-profile" element={
                <EditProfile />
            } />
        </Routes>
        <Box width={"1200px"}>

        <Stack
          // borderWidth="1px"
          borderRadius="lg"
          width={"100%"}
          background={"rgba(113, 57, 166, 0.9)"} 
          height={"auto"}
          direction={{ base: 'column', md: 'row' }}
          display='flex'
          justifyContent={"space-between"}
          padding={4}>
          <Flex flex={1}>
            <Image
              borderWidth="1px"
              rounded="md"
              borderRadius="5px"
              objectFit="cover"
              // boxSize="100%"
              src={user.imageUrl}
              />
          </Flex>
          <Box w={"70%"} >
          <Stack
            flex={1}
            flexDirection="column"
            m={30}
            p={1}
            pt={2}>
            <Heading fontSize={'2xl'} fontFamily={'body'} color={COLORS.offWhite}>{user.firstName} {user.lastName}</Heading>
            <Stack direction={'row'} display={"flex"} justifyContent= "space-between">
              <Text fontWeight={600} color={"	hsl(0, 0%, 60%)"} fontSize="lg">@{user.username.toLowerCase()}</Text>
              <HStack color={COLORS.indigo}>
                <FontAwesomeIcon icon={faFacebookSquare} />
                <FontAwesomeIcon icon={faTwitter} />
                <FontAwesomeIcon icon={faInstagram}/>
              </HStack> 
            </Stack>
            <Stack display={"flex"} marginTop={0}>
              <Wrap display={"flex"} height={"60px"} overflowY={"auto"}
                  css={{
                      '&::-webkit-scrollbar': {width: '8px'},
                      '&::-webkit-scrollbar-track': {width: '10px'},
                      '&::-webkit-scrollbar-thumb': {
                          backgroundColor: "hsl(304, 50%, 45%)",
                          borderRadius: "30px",
                      }
                    }}
              >
              {games?.map((game, index) => (                      
              // <Text display={'flex'} maxWidth={'1000px'} key={index}>{game.name},</Text>
                <Tag 
                key={index} 
                width={"180px"}
                height={"50px"}
                borderRadius={"30px"}
                border={"1px"}
                wordBreak={"break-all"}
                borderColor={COLORS.darkAmethyst}
                backgroundColor={"hsl(304, 45%, 50%)"}>
                  <TagLabel textAlign={"center"} width={"100%"} color={"hsl(0,0%,80%)"} fontSize={"sm"}>{game.gameName}</TagLabel>
                </Tag>
              ))}
              </Wrap>
            </Stack>
            <Link to="/profile/edit-profile">
              {/* FIXME: Restyle the button hovering */}
              <Button 
              marginStart={"32%"} width='300px' height='30px' 
              mt={3} borderRadius={"8px"} border={"2px"} borderColor={"hsl(271, 50%, 40%)"}
              backgroundColor={"hsl(271, 49%, 52%)"} color={COLORS.offWhite} 
              style={{
                "transition": "backgroundColor 1s, color 1s"
              }}
              _hover={{
                "background":"rgba(160, 61, 154, 1)",
                "color": COLORS.indigo 
              }}onClick={onOpen}>Edit Profile</Button>
            </Link>
            <Modal isCentered isOpen={isOpen} onClose={onClose}><EditProfile onClose={onClose} /></Modal>
          </Stack>
          </Box>
        </Stack>
        </Box>
                                
                             


          




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
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

export default function ProfileDetails({ user, onOpen, onClose, isOpen }) {
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)
    let string = ""
    if(user.gameList !== undefined) {
        for(let i = 0; i < user.gameList?.length; i++) {
            if(i === user.gameList.length - 1) {
                string += user.gameList[i]
                break
            }
            string += user.gameList[i] + ", "
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
          }, 100)
        const getGames = async () => {      
            try {
              const response = await axios.post(`http://localhost:3001/games/id`, {
                gameId: string
              })
              const gameData = response.data

              setGames(gameData)
            } catch(error) {
              return(error)
            }
          }
          getGames()  
    },[string])

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
            <Text fontWeight={600} color={'gray.500'} size="sm" >@{user.username}</Text>
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
              {games.game?.map((game, index) => (
                                    // <Text display={'flex'} maxWidth={'1000px'} key={index}>{game.name},</Text>
                                  <Tag
                                    
                                    variant="subtle"
                                    key={index}
                                   
                                    colorScheme="purple"
                                  >
                                    <TagLabel>{game.name}</TagLabel>
                                    
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
</>
    )

}
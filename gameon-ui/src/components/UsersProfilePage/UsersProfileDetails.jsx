import * as React from "react"
import EditProfile from "../EditProfile/EditProfile"
import { useAuthContext } from "../../contexts/auth"
import { Box, SimpleGrid, Image, Center, Text, HStack, Stack, Heading, Button, Modal, Wrap, Tag, Icon, TagLabel} from "@chakra-ui/react"
import { Routes, Route, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { HiLocationMarker } from "react-icons/hi"
import axios from "axios";
import apiClient from '../../services/apiClient';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  
  faFacebookSquare,
  faTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";
import { COLORS } from "../colors"

export default function UsersProfileDetails({ viewedUser, onOpen, onClose, isOpen }) {
  const { user } = useAuthContext()
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)
    let string = ""
    if(viewedUser.gameList !== undefined) {
        for(let i = 0; i < viewedUser.gameList?.length; i++) {
            if(i === viewedUser.gameList.length - 1) {
                string += viewedUser.gameList[i]
                break
            }
            string += viewedUser.gameList[i] + ", "
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
          }, 100)
        const getGames = async () => {      
            try {
              const response = await axios.post(`https://ujrghthizhcxglkqtotu.supabase.co/games/id`, {
              // const response = await axios.post(`http://localhost:3001/games/id`, {
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
        <Box width={"100%"} padding={6} >
          <Routes>
              <Route path="/profile/edit-profile" element={
                 <EditProfile />
              } />
          </Routes>
          <SimpleGrid 

          >
            <Stack  
              borderWidth="1px"
              rounded="md"
              borderRadius="24px"
              width="100%"
              background={"rgb(255,255,255)"}
              height={{ sm: '550px', md: '20rem' }}
              direction={{ base: 'column', md: 'row' }}
              display='flex'
              justifyContent={"space-between"}    
              padding={3}
            >
             
              <Image display={"block"} marginX={"auto"}
                borderRadius="25px" objectFit="cover" 
                 width={{sm:"600px" ,md:"300px"}} 
                 height={{sm:"300px", md:"auto"}} 
                 src={viewedUser.imageUrl}
                alt={"profile pic"}/>
              <Stack flex={1} flexDirection="column" margin={30} padding={1} pt={2}>
                <Heading color={COLORS.indigo} fontSize={'2xl'} fontFamily={"Roboto, sans-serif"}>@{viewedUser.username}</Heading>
                <Stack direction={'row'} display={"flex"} justifyContent= "space-between">
                  <Text fontFamily={"Open Sans, sans-serif"} fontWeight={600} color={"hsl(255, 12%, 50%)"} size="sm" >{viewedUser.firstName} {viewedUser.lastName}</Text>
                  <HStack color={"hsl(255, 12%, 50%)"}>
                    <FontAwesomeIcon icon={faFacebookSquare} />
                    <FontAwesomeIcon icon={faTwitter} />
                    <FontAwesomeIcon icon={faInstagram}/>
                  </HStack> 
                </Stack>
                <HStack>
                <Icon my={1} as={HiLocationMarker} color={COLORS.ultraViolet}/><Text fontFamily={"Open Sans, sans-serif"} fontWeight={600} color={"hsl(255, 12%, 50%)"} size="sm" >Bronx, NY</Text>
                </HStack>
                


                <Stack display={"flex"} mt={0}>
                  <Wrap height={'70px'} overflowY={'auto'}
                      css={{
                        '&::-webkit-scrollbar': {width: '8px'},
                        '&::-webkit-scrollbar-track': {width: '10px'},
                        '&::-webkit-scrollbar-thumb': { background: "hsl(271, 43%, 56%)", borderRadius: '24px'}
                      }}>
                    {games.game?.map((game, index) => (
                      <Tag key={index} 
                      rounded={"20px"}
                      backgroundColor={"hsla(271, 43%, 56%, 0.9)"}>
                          <TagLabel fontFamily={"Open Sans, sans-serif"} color={"rgb(255,255,255)"} fontSize={"sm"}>{game.name}</TagLabel>
                      </Tag>
                    ))}
                  </Wrap>
                </Stack>
                <Link to={`/user/${user.id}/profile/edit-profile`}>
                {viewedUser.userId === user.id ? 
                <Button width="25%" height='30px' 
                mt={{base:3, md:20}} ml={{base:0, md:"70%"}} fontFamily={"Open Sans, sans-serif"} borderRadius={"8px"}
                backgroundColor={"hsl(271, 49%, 52%)"} color={COLORS.offWhite} 
                style={{
                  "transition": "backgroundColor 1s, color 1s"
                }}
                _hover={{
                  "background":"hsla(304, 49%, 50%, 0.8)",
                  "color": COLORS.offWhite 
                }} onClick={onOpen}>Edit Profile</Button> : null
                        }
                </Link>
                <Modal isOpen={isOpen} onClose={onClose}><EditProfile onClose={onClose}/></Modal>
              </Stack>
            </Stack>

          </SimpleGrid>
        </Box>
    )
    
  }

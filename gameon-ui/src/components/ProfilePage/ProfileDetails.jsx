import * as React from "react"
import EditProfile from "../EditProfile/EditProfile"
import { Box, Image, Center, Text, VStack, Divider, HStack, Stack, Badge, Heading, Button, Container, useDisclosure, Modal } from "@chakra-ui/react"
import { Routes, Route, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios";

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
              console.log(error)
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

        <Box w="1200px" h='300px' p={4} borderRadius='sm'>
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
                            <Box w='810px' h='50px' >
                                <Text>Games played:</Text>
                                {games.game?.map((game, index) => (
                                    <Text key={index}>{game.name}</Text>

                                ))}
                             </Box>
                            <Link to="/profile/edit-profile">
                                <Button w='810px' h='30px' borderRadius='sm' colorScheme='purple' variant='outline' onClick={onOpen} >Edit Profile</Button>
                            </Link>

                            <Modal isOpen={isOpen} onClose={onClose}><EditProfile onClose={onClose} /></Modal>

                        </VStack>
                    </Box>
                </HStack>
            </Box>

</>
    )

}
import * as React from "react"
import { Box, Image, Center, Text, VStack, Divider, HStack, Stack, Badge, Heading, Button, Container, useDisclosure, Modal } from "@chakra-ui/react"
import { Routes, Route, Link } from "react-router-dom"
import profile from "../../media/elmo-burning.gif"
import evo from "../../media/evo.jpg"
import EditProfile from "../EditProfile/EditProfile"
import { useAuthContext } from "../../contexts/auth"
import ProfileDetails from "./ProfileDetails"
import { useState, useEffect } from "react"
import apiClient from "../../services/apiClient"

// FIXME: Need to refactor below code and turn into different components
export default function ProfilePage() {
    const { user } = useAuthContext()
    console.log("user: ", user)
    console.log("userId: ", user.id)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [posts, setPosts] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchUsersPosts = async () => {
            const { data, error } = await apiClient.listAllPostsByUserId(user.id)
            if (data) {
                console.log("data: ", data)
            }
            if (error) setError(error)
        }

        fetchUsersPosts()
    }, [user.id])

    return (

        <Container centerContent padding={6}>

            <Stack direction='column' spacing={7} align='stretch'>
                <ProfileDetails user={user} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
                
                <Divider orientation='horizontal' />

                <Text fontSize='3xl'>Upcoming Events</Text>

                    <Box w='300px' borderWidth='1px' borderRadius='lg' overflow='hidden' boxShadow={'md'}>
                        <Image src={evo} objectFit={"cover"} height="200px" />
                        <Box p='6'>
                            <Box display='flex' alignItems='baseline'>
                                <HStack spacing='56px'>
                                    <Heading size='md'>Event Title</Heading>
                                    <Badge borderRadius='full' px='2' colorScheme='teal'>
                                        event date
                                    </Badge>
                                </HStack>
                            </Box>
                        </Box>
                    </Box>



                <Divider orientation='horizontal' />
                <Text fontSize='3xl'>Previous Events</Text>

                    <Box w='300px' borderWidth='1px' borderRadius='lg' overflow='hidden' boxShadow={'md'}>
                        <Image src={profile} />
                        <Box p='6'>
                            <Box display='flex' alignItems='baseline'>
                                <HStack spacing='56px'>
                                    <Heading size='md'>Event Title</Heading>
                                    <Badge borderRadius='full' px='2' colorScheme='red'>
                                        event date
                                    </Badge>
                                </HStack>
                            </Box>


                        </Box>
                    </Box>
                
                <Divider orientation='horizontal' />
                <Text fontSize='3xl'>Post</Text>
                <Box h='700px' borderRadius='sm'>

                    <Center h='100px'>
                        <Text fontSize='3xl'>No Post Found</Text>
                    </Center>
                </Box>

            </Stack>
        </Container>
    )
}

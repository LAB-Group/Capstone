import * as React from "react"
import { Box, Image, Center, Text, VStack, Divider, HStack, Stack, Badge, Heading, Button, Container, useDisclosure, Modal } from "@chakra-ui/react"
import { Routes, Route, Link } from "react-router-dom"
import profile from "../../media/elmo-burning.gif"
import evo from "../../media/evo.jpg"
import EditProfile from "../EditProfile/EditProfile"
import { useAuthContext } from "../../contexts/auth"

// FIXME: Need to refactor below code and turn into different components
export default function ProfilePage() {
    const { user } = useAuthContext()
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (

        <Container className="TEST" centerContent padding={6}>


            <Routes>
                <Route path="/profile/edit-profile" element={
                    <EditProfile />
                } />
            </Routes>

            <Stack direction='column' spacing={7} align='stretch'>
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
                                <Box w='810px' h='50px' >Games played: Waiting for API... </Box>
                                <Link to="/profile/edit-profile">
                                    <Button w='810px' h='30px' borderRadius='sm' colorScheme='purple' variant='outline' onClick={onOpen} >Edit Profile</Button>
                                </Link>

                                <Modal isOpen={isOpen} onClose={onClose}><EditProfile onClose={onClose} /></Modal>

                            </VStack>
                        </Box>
                    </HStack>
                </Box>



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

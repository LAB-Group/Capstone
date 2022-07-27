import * as React from "react"
import EditProfile from "../EditProfile/EditProfile"
import { Box, Image, Center, Text, VStack, Divider, HStack, Stack, Badge, Heading, Button, Container, useDisclosure, Modal } from "@chakra-ui/react"
import { Routes, Route, Link } from "react-router-dom"

export default function ProfileDetails({ user, onOpen, onClose, isOpen }) {

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
                            <Box w='810px' h='50px' >Games played: Waiting for API... </Box>
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
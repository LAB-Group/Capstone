import * as React from "react"
// import {Link, useNavigate} from "react-router-dom"
import {HashLink as Link } from 'react-router-hash-link'
import { Box, Heading, Container, Text, Spacer, Button, ButtonGroup, Flex, Drawer,
    DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure } from "@chakra-ui/react"
import { ColorModeSwitcher } from "../../ColorModeSwitcher"
import LoginPage from "../LoginPage/LoginPage"
import RegisterPage from "../RegisterPage/RegisterPage"
import CreateEventForm from "../Events/CreateEventForm"
import { useRef } from "react"
import apiClient from "../../services/apiClient"
import { useAuthContext } from "../../contexts/auth"

export default function NavBar() {
    const { user, setUser, setError } = useAuthContext()
    const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure()
    const { isOpen: isRegisterOpen, onOpen: onRegisterOpen, onClose: onRegisterClose } = useDisclosure()
    const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure()

    const btnRef = useRef()

    const handleLogout = async () => {
        await apiClient.logoutUser()
        setUser({})
        setError(null)
        
    }

    return (
        // This makes the navbar scrollable
        // Need to figure out how to position navbar in front of hero
        //  <Container bg="blackAlpha.700" minHeight="50px" width="100%" maxW={'9000px'} position='sticky' top='0'>
        <Container minHeight="50px" width="100%" maxW={'9000px'} position='relative' backgroundColor={"purple.100"}>
            <Flex minWidth='max-content' alignItems='center' gap='2' paddingTop={'2'}>
                <Box p='2'>
                    <Link to="/">
                    <Heading size='md'>Game On!</Heading>
                    </Link>
                </Box>
                <Spacer />
                
                {user?.email? 
                    <ButtonGroup gap='2'>
                        <Button colorScheme='purple' onClick={onCreateOpen}>Create Event</Button>
                        <Link to ="/profile"><Button variant="outline" colorScheme='purple'>Profile</Button></Link>
                        <Link smooth to="#about"><Button variant="ghost" colorScheme='purple'>About</Button></Link>
                        <Button variant="link" colorScheme='purple' onClick={handleLogout}>Logout</Button>
                        <ColorModeSwitcher justifySelf="flex-end" />
                    </ButtonGroup>
                    :
                    <ButtonGroup gap='2'>
                        <Button colorScheme='purple' onClick={onLoginOpen}>Log in</Button>
                        <Button variant="outline" colorScheme='purple' onClick={onRegisterOpen}>Sign Up</Button>
                        <Link smooth to="#about"><Button variant="ghost" colorScheme='purple'>About</Button></Link>
                        <ColorModeSwitcher justifySelf="flex-end" />
                    </ButtonGroup>
                }
                <Drawer
                    isOpen={isLoginOpen}
                    placement='top'
                    onClose={onLoginClose}
                    finalFocusRef={btnRef}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <LoginPage onClose={onLoginClose} />
                    </DrawerContent>
                </Drawer>
                <Drawer
                    isOpen={isRegisterOpen}
                    placement='top'
                    onClose={onRegisterClose}
                    finalFocusRef={btnRef}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <RegisterPage onClose={onRegisterClose} />
                    </DrawerContent>
                </Drawer>
                <Drawer
                    isOpen={isCreateOpen}
                    placement='top'
                    onClose={onCreateClose}
                    finalFocusRef={btnRef}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <CreateEventForm onClose={onCreateClose} />
                    </DrawerContent>
                </Drawer>
            </Flex>
        </Container>
    )
}
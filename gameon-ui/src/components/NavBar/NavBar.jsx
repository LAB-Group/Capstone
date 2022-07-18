import * as React from "react"
import {Link} from "react-router-dom"
import { Box, Heading, Container, Spacer, Button, ButtonGroup, Flex, Drawer,
    DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure } from "@chakra-ui/react"
import { ColorModeSwitcher } from "../../ColorModeSwitcher"
import LoginPage from "../LoginPage/LoginPage"
import RegisterPage from "../RegisterPage/RegisterPage"
import CreateEventForm from "../Events/CreateEventForm"
import { useRef } from "react"

export default function NavBar() {
    const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure()
    const { isOpen: isRegisterOpen, onOpen: onRegisterOpen, onClose: onRegisterClose } = useDisclosure()
    const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure()

    const btnRef = useRef()

    return (
         <Container minHeight="50px" width="100%" maxW={'9000px'} position='relative' >
            <Flex minWidth='max-content' alignItems='center' gap='2' paddingTop={'2'}>
                <Box p='2'>
                    <Link to="/">
                    <Heading size='md'>Game On!</Heading>
                    </Link>
                </Box>
                <Spacer />
                {/* Created this button so I can see how the profile looks :) */}
                
                <ButtonGroup gap='2'>
                    {/* below button should only display if user is logged in */}
                    <Link to ="/profile">
                        <Button colorScheme='purple'>Profile</Button>
                    </Link>
                    <Button colorScheme='purple' onClick={onCreateOpen}>Create Event</Button>
                    <Button colorScheme='purple' onClick={onLoginOpen}>Log in</Button>
                    <Button colorScheme='purple' onClick={onRegisterOpen}>Sign Up</Button>
                    <ColorModeSwitcher justifySelf="flex-end" />
                </ButtonGroup>
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
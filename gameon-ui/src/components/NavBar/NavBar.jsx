import * as React from "react"
import {Link} from "react-router-dom"
import { Box, Heading, Container, Spacer, Button, ButtonGroup, Flex, Drawer,
    DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure } from "@chakra-ui/react"
import { ColorModeSwitcher } from "../../ColorModeSwitcher"
import LoginPage from "../LoginPage/LoginPage"

export default function NavBar() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

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
                <Link to ="/profile">
                <Button colorScheme='purple'>Profile</Button>
                </Link>
                <ButtonGroup gap='2'>
                    <Button colorScheme='purple' onClick={onOpen}>Log in</Button>
                    <Button colorScheme='purple' onClick={onOpen}>Sign Up</Button>
                    <ColorModeSwitcher justifySelf="flex-end" />
                </ButtonGroup>
                <Drawer
                    isOpen={isOpen}
                    placement='top'
                    onClose={onClose}
                    finalFocusRef={btnRef}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <LoginPage onClose={onClose} />
                    </DrawerContent>
                </Drawer>
            </Flex>
        </Container>
    )
}
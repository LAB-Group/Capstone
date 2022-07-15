import * as React from "react"
import { Box, Input, ControlBox, Text, Heading, Container, Stack, VStack, HStack, Spacer, Button, ButtonGroup, Flex, Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton, useDisclosure } from "@chakra-ui/react"
import { ColorModeSwitcher } from "../../ColorModeSwitcher"
import LoginPage from "../LoginPage/LoginPage"

export default function NavBar() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    return (
        <Container height="50px" width="100%" maxW={'9000px'} position='absolute' >
            {/* <HStack>
                <Box >
                    <Heading as='h1' size='xl' >Game On!</Heading>
                </Box>

            </HStack> */}
            <Flex minWidth='max-content' alignItems='center' gap='2' paddingTop={'2'}>
                <Box p='2'>
                    <Heading size='md'>Game On!</Heading>
                </Box>
                <Spacer />
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
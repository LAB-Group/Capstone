import * as React from "react"
// import {Link, useNavigate} from "react-router-dom"
import {HashLink as Link } from 'react-router-hash-link'
import { Box, Heading, Text, Spacer, Button, ButtonGroup, Image, Flex, Drawer,
    List, ListItem,
    DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Icon, useMediaQuery } from "@chakra-ui/react"
import {GiHamburgerMenu} from "react-icons/gi"
import logo from "../../media/Logo.png"
import { ColorModeSwitcher } from "../../ColorModeSwitcher"
import {COLORS} from "../colors"
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

    // Using media query to make navbar responsive 
    // const [isLessthan780] = useMediaQuery('(max-width: 780px)')

    return (
        // This makes the navbar scrollable
        <Box zIndex={10000} position="sticky" top={0} width="100%" height="auto" backgroundColor={COLORS.indigo}>
            <Flex minWidth='max-content' alignItems='center' gap='2' paddingTop={'2'}>
                <Box>
                    <Link to="/">
                    <Image width={"100px"} height={"50px"} objectFit={"cover"} src={logo}/>
                    </Link>
                </Box>
                <List display={"block"}>
                    <ListItem float={"left"} marginRight={"2rem"}>
                <Link smooth to="#about">
                    <Text color={COLORS.offWhite} fontWeight={700} 
                    style={{
                        "transition": "font-size 1s, border-bottom 1s, border-style 1s, border-color 1s"}}
                    _hover={{
                        "font-size": "20px", 
                        "border-bottom": "4px",
                        "border-style": "solid",
                        "border-color": COLORS.darkAmethyst}}>About</Text></Link>
                    </ListItem>
                    <ListItem float={"left"} marginRight={"2rem"}>
                <Link smooth to="#events"><Text color={COLORS.offWhite} fontWeight={700} 
                    style={{
                        "transition": "font-size 1s, border-bottom 1s, border-style 1s, border-color 1s"}}
                    _hover={{
                        "font-size": "20px", 
                        "border-bottom": "4px",
                        "border-style": "solid",
                        "border-color": COLORS.darkAmethyst}}>Events</Text></Link>
                    </ListItem>
                </List>
                <Spacer />
                {/* Navbar responsive hamburger icon */}
                {/* {isLessthan780 ?     
                        <Button colorScheme={"purple"} display={"block"}>
                            <Icon as={GiHamburgerMenu} display={"block"}/>
                        </Button>
                        :
                        <Button colorScheme={"purple"} display={"none"}>
                            <Icon as={GiHamburgerMenu} display={"none"}/>
                        </Button>
                } */}


                {user?.email? 
                    <ButtonGroup gap='2'>
                        <Button backgroundColor={COLORS.ultraViolet} color={COLORS.offWhite} onClick={onCreateOpen}
                        style={{"transition": "background-color 1s, color 1s"}} _hover={{"background-color": COLORS.offWhite, "color": COLORS.indigo}}>Create Event</Button>
                        <Link to ="/profile">
                            <Button backgroundColor={COLORS.ultraViolet} color={COLORS.offWhite} onClick={onCreateOpen}
                            style={{"transition": "background-color 1s, color 1s"}} _hover={{"background-color": COLORS.offWhite, "color": COLORS.indigo}}>Profile</Button>
                        </Link>
                        {/* <Link smooth to="#about"><Button variant="ghost" colorScheme='purple'>About</Button></Link>
                        <Link smooth to="#events"><Button variant="ghost" colorScheme='purple'>Events</Button></Link> */}
                        <Button variant="link" colorScheme='purple' marginRight={"1em"} onClick={handleLogout}>Logout</Button>
                        
                        {/* Commented out the Light/Dark mode */}
                        {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
                    </ButtonGroup>
                    :
                    <ButtonGroup gap='2'>
                        <Button colorScheme='purple' onClick={onLoginOpen}>Log in</Button>
                        <Button variant="outline" colorScheme='purple' onClick={onRegisterOpen}>Sign Up</Button>
                        {/* <Link smooth to="#about"><Button variant="ghost" colorScheme='purple'>About</Button></Link>
                        <Link smooth to="#events"><Button variant="ghost" colorScheme='purple'>Events</Button></Link> */}
                        {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
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
        </Box>
    )
}
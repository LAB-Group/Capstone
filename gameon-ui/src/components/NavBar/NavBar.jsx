import * as React from "react"
// import {Link, useNavigate} from "react-router-dom"
import {HashLink as Link } from 'react-router-hash-link'
import { Box, Heading, Text, Spacer, Button, ButtonGroup, Image, Flex, Drawer,
    DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Icon, useMediaQuery, List, ListItem } from "@chakra-ui/react"
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
        <Box fontFamily={"Roboto, sans-serif"} zIndex={10000} position="sticky" top={0} width="100%" height="70px" backgroundColor={COLORS.indigo} fontSize={{ "base":"lg","md":"lg", "lg":"xl"}}>
            <Flex minWidth='max-content' alignItems='center' gap='2'>
                <Box maxWidth={"100px"} height={"auto"}>
                    <Link to="/">
                    <Image maxWidth={"100%"} height={"100px"} objectFit={"fill"} src={logo}/>
                    </Link>
                </Box>
                <List marginBottom={"1.5rem"}>
                    <ListItem marginRight={6} float={"left"} display={"block"}>
                <Link smooth to="#about">
                    <Text color={COLORS.offWhite} fontWeight={700} 
                    style={{
                        "transition": "fontSize 0.8s, borderBottom 0.8s, borderStyle 0.8s, borderColor 0.8s"}}
                    _hover={{
                        "fontSize": "24px", 
                        "borderBottom": "4px",
                        "borderStyle": "solid",
                        "borderColor": COLORS.darkAmethyst}}>About</Text></Link>
                    </ListItem>
                    <ListItem float={"left"} display={"block"}>
                <Link smooth to="#events">
                    <Text color={COLORS.offWhite} fontWeight={700} 
                    style={{
                        "transition": "fontSize 0.8s, borderBottom 0.8s, borderStyle 0.8s, borderColor 0.8s"}}
                    _hover={{
                        "fontSize": "24px", 
                        "borderBottom": "4px",
                        "borderStyle": "solid",
                        "borderColor": COLORS.darkAmethyst}}>Events</Text></Link>
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
                    <ButtonGroup gap='2' paddingBottom={"2rem"}>
                        <Button fontSize={{ "base":"lg","md":"lg", "lg":"xl"}} backgroundColor={COLORS.ultraViolet} color={COLORS.offWhite} onClick={onCreateOpen}
                        style={{"transition": "backgroundColor 0.5s, color 0.5s"}} _hover={{"backgroundColor": COLORS.offWhite, "color": COLORS.indigo}}>Create Event</Button>
                        <Box border={"2px"} borderStyle={"solid"} borderRadius={"5px"} borderColor={COLORS.darkAmethyst} 
                            paddingStart={"1rem"} paddingEnd={"1rem"} paddingTop={"0.2rem"} paddingBottom={"0.2rem"}
                            style={{"transition": "backgroundColor 0.5s"}} _hover={{"backgroundColor": COLORS.offWhite}}>
                        <Link to ="/profile">
                            <Text 
                            fontSize={{ "base":"lg","md":"lg", "lg":"xl"}} color={COLORS.offWhite}
                            style={{"transition": "color 0.5s"}} _hover={{"color": COLORS.indigo}}>Profile</Text>
                        </Link>
                        </Box>
                        {/* <Link smooth to="#about"><Button variant="ghost" colorScheme='purple'>About</Button></Link>
                        <Link smooth to="#events"><Button variant="ghost" colorScheme='purple'>Events</Button></Link> */}
                        
                        {/* Log out transition * Needs a revisit on the transition*/}
                        <Text 
                        paddingTop={"0.4rem"}
                        color={COLORS.darkAmethyst}
                        style={{
                            "transition": "padding 0.5s, color 0.1s, border 0.1s, borderSize 0.1s, borderStyle 0.1s, borderRadius 0.5s, borderColor 0.5s, transform 0.5s"
                            }} 
                        _hover={{
                            "cursor": "pointer",
                            "transform": "scale(1)",
                            "border":"2px", 
                        "borderStyle":"solid", 
                        "borderRadius":"20%", 
                        "borderColor":COLORS.darkAmethyst, 
                        "padding":"2px 2px 2px 0px", 
                        "color":"hsl(271, 49%, 60%)"  
                        }} marginRight={"1em"} onClick={handleLogout}>Logout</Text>
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
                    paddingTop={"10rem"}
                    
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
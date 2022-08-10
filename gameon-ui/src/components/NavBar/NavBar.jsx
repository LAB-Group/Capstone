import * as React from "react"
import { useNavigate} from "react-router-dom"
import {HashLink as Link } from 'react-router-hash-link'
import { Box, Text, Spacer, Button, ButtonGroup, Image, Stack, HStack, Flex, Modal,
    useDisclosure } from "@chakra-ui/react"
import {GiHamburgerMenu} from "react-icons/gi"
import logo from "../../contexts/media/Logo-fixed.png"
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
    const navigate = useNavigate()
    const btnRef = useRef()

    const handleLogout = async () => {
        await apiClient.logoutUser()
        setUser({})
        setError(null)
        navigate("/")
        // window.location.reload();
        window.location = document.URL;
    }

    const handleProfile = async () => {
        navigate(`/user/${user.id}/profile`)
        // window.location = document.URL;
        window.location.reload();
    }

    // Using media query to make navbar responsive 
    // const [isLessthan780] = useMediaQuery('(max-width: 780px)')

    return (
        // This makes the navbar scrollable

        <Box  overflow={"hidden"} fontFamily={"Roboto, sans-serif"} zIndex={1} position="sticky" top={0} width="100%" height="50px" backgroundColor={COLORS.indigo} fontSize={{ "base":"lg","md":"lg", "lg":"xl"}} >
            <Flex width={"90%"} alignItems="center" gap='1'>
                {/* FIXME: Image revisit */}
                <Box width={"100px"} ml={"11%"} display={"inline-flex"}>
                    <Link to="/" >
                        <Image width={"35px"} height={"40px"} margin={0} objectFit={"cover"} src={logo}/>
                    </Link>
                </Box>
                <Stack>
                    <HStack justifyContent={"space-between"} gap={4}>
                <Link smooth to="#about">
                    <Text color={COLORS.offWhite} fontWeight={400} 
                    style={{
                        "transition": " borderBottom 0.8s, borderStyle 0.8s, borderColor 0.8s"}}
                    _hover={{ 
                        "borderBottom": "3px",
                        "borderStyle": "solid",
                        "borderColor": COLORS.darkAmethyst
                    }}>About</Text></Link>
                    <Link smooth to="#events">
                    <Text color={COLORS.offWhite} fontWeight={400} 
                    style={{
                        "transition": "borderBottom 0.8s, borderStyle 0.8s, borderColor 0.8s"}}
                    _hover={{
                        "borderBottom": "3px",
                        "borderStyle": "solid",
                        "borderColor": COLORS.darkAmethyst}}>Events</Text></Link>
                    </HStack>

                    {/* FIXME: Reroute Events when user is on event details */}
                    {/* <ListItem float={"left"} display={"block"} hidden>
                <Link smooth to="#events">
                    <Text color={COLORS.offWhite} fontWeight={700} 
                    style={{
                        "transition": "fontSize 0.8s, borderBottom 0.8s, borderStyle 0.8s, borderColor 0.8s"}}
                    _hover={{
                        "fontSize": "24px", 
                        "borderBottom": "4px",
                        "borderStyle": "solid",
                        "borderColor": COLORS.darkAmethyst}}>Events</Text></Link>
                    </ListItem> */}
               
                </Stack>
                
                    <Spacer/>
                
                
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
                    <ButtonGroup gap='2' marginRight={"1rem"} >
                        <Button  fontSize={{ "base":"lg","md":"lg", "lg":"xl"}} backgroundColor={COLORS.ultraViolet} color={COLORS.offWhite} onClick={onCreateOpen}
                        style={{"transition": "backgroundColor 0.5s, color 0.5s"}} _hover={{"backgroundColor": COLORS.offWhite, "color": COLORS.indigo}}>Create Event</Button>
                        {/* <Box border={"2px"} borderStyle={"solid"} borderRadius={"5px"} borderColor={COLORS.darkAmethyst} 
                            paddingStart={"1rem"} paddingEnd={"1rem"} paddingTop={"0.2rem"} paddingBottom={"0.2rem"}

                        style={{"transition": "backgroundColor 0.5s"}} _hover={{"backgroundColor": COLORS.offWhite}}> */}
                        {/* <Link to={`/user/${user.id}/profile`}> */}
                        <Button onClick={handleProfile} fontSize={{ "base":"lg","md":"lg", "lg":"xl"}} backgroundColor={COLORS.indigo} color={COLORS.offWhite}
                        border={"2px"} borderColor={COLORS.ultraViolet} borderStyle={"solid"}
                        style={{"transition": "backgroundColor 0.5s, color 0.5s, borderColor 0.5s"}} _hover={{"backgroundColor":COLORS.offWhite,"color": COLORS.indigo, "borderColor": COLORS.offWhite}}>Profile</Button>
                        {/* </Link> */}
                        
                        {/* </Box> */}
                        {/* <Link smooth to="#about"><Button variant="ghost" colorScheme='purple'>About</Button></Link>
                        <Link smooth to="#events"><Button variant="ghost" colorScheme='purple'>Events</Button></Link> */}
                        
                        {/* FIXME: Log out transition * Needs a revisit on the transition*/}
                        
                        <Button  fontSize={{ "base":"lg","md":"lg", "lg":"xl"}} backgroundColor={COLORS.indigo} color={COLORS.offWhite}
                        border={"2px"} borderColor={COLORS.indigo} borderStyle={"solid"}
                        style={{"transition": "borderColor 0.8s"}} _hover={{"borderColor": COLORS.darkAmethyst}} onClick={handleLogout}>Logout</Button>
                        
                        {/* Commented out the Light/Dark mode */}
                        {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
                    </ButtonGroup>
                    :
                    <ButtonGroup gap='2' >
                         <Button fontSize={{ "base":"lg","md":"lg", "lg":"xl"}} backgroundColor={COLORS.ultraViolet} color={COLORS.offWhite} onClick={onLoginOpen}
                        style={{"transition": "backgroundColor 0.5s, color 0.5s"}} _hover={{"backgroundColor": COLORS.offWhite, "color": COLORS.indigo}}>Log in</Button>
                        {/* <Button colorScheme='purple' onClick={onLoginOpen}>Log in</Button> */}
                        <Button fontSize={{ "base":"lg","md":"lg", "lg":"xl"}} backgroundColor={COLORS.indigo} color={COLORS.offWhite}
                        border={"2px"} borderColor={COLORS.darkAmethyst} borderStyle={"solid"}
                        style={{"transition": "backgroundColor 0.5s, color 0.5s"}} _hover={{"backgroundColor":COLORS.offWhite,"color": COLORS.indigo}} onClick={onRegisterOpen}>Sign Up</Button>
                        {/* <Button variant="outline" colorScheme='purple' onClick={onRegisterOpen}>Sign Up</Button> */}
                    </ButtonGroup>
                }

                <Modal isCentered isOpen={isLoginOpen} onClose={onLoginClose} finalFocusRef={btnRef}><LoginPage onClose={onLoginClose} isOpen={isLoginOpen} finalFocusRef={btnRef} /></Modal>
                
                <Modal isCentered isOpen={isRegisterOpen} onClose={onRegisterClose} finalFocusRef={btnRef}><RegisterPage onClose={onRegisterClose} /></Modal>

                <Modal isCentered isOpen={isCreateOpen} onClose={onCreateClose} finalFocusRef={btnRef}><CreateEventForm onClose={onCreateClose} /></Modal>

            </Flex>
        </Box>
    )
}
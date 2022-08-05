import * as React from "react"
import {Box, Heading, Container, SimpleGrid, Stack, StackDivider, Flex,  VStack, HStack, Image, Text, Highlight} from "@chakra-ui/react"
import { COLORS } from "../colors"
import pic from "../../contexts/media/Logo.png"
// import { Link } from "react-router-dom"

export default function About(){
    return (
       <Box width={"100%"} height={"auto"} background={"hsla(255, 50%, 21%, 0.8)"}>
        <Container centerContainer minWidth={"80%"}>
        <Heading marginX={6} paddingY={2} color={COLORS.offWhite} fontFamily={"Roboto, sans-serif"}>A gaming hub created for all gamers.</Heading>
        <Box marginX={"20px"}>
        <Text paddingBottom={2} whiteSpace={"pre-line"} fontFamily={"Open Sans, sans-serif"} fontSize={"xl"} color={COLORS.offWhite}>
        <Image float={"left"} width={"300px"} src={pic} marginRight={"-2rem"} marginBottom={"-5rem"}/>
        GameOn! is a community hub for all gamers looking to attend events. 
        Our mission is to have gamers of all ages and different backgrounds to attend these events. 
        Not only do we want gamers, but also event coordinators. 
        Our site allows users to create and host their own events whether competitive or casual. 
        We grew up playing video games and noticed how playing with other people can bring us together. 
        Whether playing with our younger siblings, or someone we just met at a convention. 
        We hope to encourage all gamers to have that same experience with our site.
        </Text>
        </Box>
        </Container>
       </Box>

    )
}
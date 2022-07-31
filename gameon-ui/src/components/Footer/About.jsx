import * as React from "react"
import {Box, Heading, Text} from "@chakra-ui/react"
import { COLORS } from "../colors"
// import { Link } from "react-router-dom"

export default function About(){
    return (
        <Box 
        position={"relative"} 
        // style={{
        //     "transform": "translateY(2rem)", 
        //     "opacity":0, 
        //     "transition": "2s all ease"
        // }} 
        // _active={{
        //     "transform": "translateY(0)", 
        //     "opacity": 1
        //     }}
        >
        <Heading fontFamily={"Roboto, sans-serif"} color={COLORS.offWhite} marginBottom={"1em"} textAlign={"center"} fontSize={["xl", "3xl", "4xl"]}>About</Heading>
        <Text color={COLORS.offWhite} display={"flex"} flexDirection={"column"} fontSize='sm'>
        Video games are a huge market across the globe, where anyone in your family could be a gamer, young or old. Because of this, gaming can be used to bring people together and there is a need to facilitate that growth and also allow others to find like-minded individuals.
        </Text>
        </Box>
    )
}
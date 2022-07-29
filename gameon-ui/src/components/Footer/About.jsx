import * as React from "react"
import {Box, Heading, Text} from "@chakra-ui/react"
// import { Link } from "react-router-dom"

export default function About(){
    return (
        <Box>
        <Heading as='h4' size='md'>About</Heading>
        <Text fontSize='sm'>
        Video games are a huge market across the globe, where anyone in your family could be a gamer, young or old. Because of this, gaming can be used to bring people together and there is a need to facilitate that growth and also allow others to find like-minded individuals.
        </Text>
        </Box>
    )
}
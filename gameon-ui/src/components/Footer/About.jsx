import * as React from "react"
import {Box, Heading, Text} from "@chakra-ui/react"
import { Link } from "react-router-dom"

export default function About(){
    return (
        <Box>
        <Heading as='h4' size='md'>About</Heading>
        <Text fontSize='sm'>
           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum dolores blanditiis aspernatur beatae eius praesentium, impedit perferendis officiis quibusdam quis libero laborum tempora facilis asperiores qui, quae incidunt minus dolore.
        </Text>
        </Box>
    )
}
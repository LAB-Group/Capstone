import * as React from "react"
import { Box, ControlBox, Text, Heading } from "@chakra-ui/react"
import pic from "../../media/evo.jpg"

import { Container } from '@chakra-ui/react'

export default function Hero() {

    return (
        <Container centerContent maxW="1200px" height="360px" bgImage={pic} bgPosition="center" objectFit={'cover'} bgSize="100%" >
            <Box >
                <Heading as='h1' size='3xl' textColor='white' >Lorem Ipsum</Heading>
            </Box>
        </Container>

    )
}
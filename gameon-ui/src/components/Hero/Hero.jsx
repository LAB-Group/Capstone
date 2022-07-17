import * as React from "react"
import { Box, Heading } from "@chakra-ui/react"
import pic from "../../media/evo.jpg"

import { Container } from '@chakra-ui/react'

export default function Hero() {

    return (
        <Container centerContent maxW="1200px" height="360px" bgImage={pic} bgPosition="center" objectFit={'cover'} bgSize="100%" bgRepeat="no-repeat">
                <Heading as='h1' size='2xl' textColor='white' position="absolute" textAlign="center" top="4em">Lorem Ipsum</Heading>
        </Container>

    )
}
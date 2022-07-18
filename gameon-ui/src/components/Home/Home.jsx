import * as React from "react"
import Hero from "../Hero/Hero"
import EventPage from "../Events/EventPage"
import { Container, Flex, Box } from "@chakra-ui/react"

export default function Home(){
    return (
        // Need to fix container in Hero
        <Container>
            <Hero/>
            <Box>
                <EventPage/>
            </Box>
        </Container>
    )
}
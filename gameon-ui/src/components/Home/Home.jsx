import * as React from "react"
import Hero from "../Hero/Hero"
import EventPage from "../Events/EventPage"
import { Box, Container, Spacer } from "@chakra-ui/react"

export default function Home(){
    return (
    
            <Container maxWidth="1200px" maxHeight="960px" >
            <Hero />
            <Spacer/>
            <EventPage />
            </Container>
            
        
    )
}
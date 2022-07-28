import * as React from "react"
import Hero from "../Hero/Hero"
import EventFeed from "../Events/EventFeed"
import { Image, Container, Spacer, Box } from "@chakra-ui/react"

export default function Home(){
    return (
    
            <Container centerContent minWidth="98vw">
                <Hero />
                <Spacer/>
                <EventFeed />
            </Container>
            
        
    )
}
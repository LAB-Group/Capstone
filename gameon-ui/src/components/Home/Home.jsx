import * as React from "react"
import Hero from "../Hero/Hero"
import EventFeed from "../Events/EventFeed"
import { Image, Container, Spacer, Box } from "@chakra-ui/react"

export default function Home(){
    return (
            // Removed container from home to prevent spacing on the ends
            // <Container centerContent minWidth="98vw">

            // Blur filter for the background
            // This doesn't effect the foreground
                <Box style={{"backdrop-filter": "blur(10px)"}}>
                <Hero />
                <Spacer/>
                <EventFeed />
                </Box>
            //</Container>
            
        
    )
}
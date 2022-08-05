import * as React from "react"
import Hero from "../Hero/Hero"
import EventFeed from "../Events/EventFeed"
import About from "../Footer/About"
import { Box } from "@chakra-ui/react"
export default function Home(){
    return (
            // Removed container from home to prevent spacing on the ends
            // <Container centerContent minWidth="98vw">

            // Blur filter for the background
            // This doesn't effect the foreground
                <Box overflow={"hidden"} style={{"backdropFilter": "blur(10px)", "background":"rgba(48, 43, 63, .4)"}}>
                <Hero />

                {/* Why is this here? */}
                {/* <Spacer/> */}
                <EventFeed />

                <Box id="about" marginTop={"2rem"}>
                    <About/>
                </Box>
                </Box>
        
    )
}
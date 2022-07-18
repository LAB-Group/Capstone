import * as React from "react"
import Hero from "../Hero/Hero"
import EventPage from "../Events/EventPage"
import { Spacer } from "@chakra-ui/react"

export default function Home(){
    return (
    
            <>
            <Hero />
            <Spacer/>
            <EventPage />
            </>
            
        
    )
}
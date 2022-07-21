import { Container, Divider } from "@chakra-ui/react"
import * as React from "react"
import EventDetails from "./EventDetails"
import EventRegistration from "./EventRegistration"

export default function EventPage(){
    return(
        <Container>
            <EventDetails/>
            <Divider orientation='horizontal' />
            <EventRegistration />
        </Container>
    )
}
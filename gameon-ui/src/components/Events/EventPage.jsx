import * as React from "react"
import { Container, Text, Divider } from "@chakra-ui/react"
import { useEventContext } from "../../contexts/event"
import EventFeed from "./EventFeed"
export default function EventPage(){
    const { events } = useEventContext()

    return(
        <Container maxW="1200px" maxH="960px" position="relative">
            <Divider orientation='horizontal' />
            <Text fontSize='3xl'>Events</Text>
            <EventFeed events={events} />
        </Container>
    )
}
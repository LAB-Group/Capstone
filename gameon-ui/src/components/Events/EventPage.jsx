import { Container, Text } from "@chakra-ui/react"
import EventFeed from "../Events/EventFeed"

export default function EventPage(){
    return(
        <Container maxW="1200px" maxH="960px" position="relative">
            <Text>Events</Text>
            <EventFeed/>
        </Container>
    )
}
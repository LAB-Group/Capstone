import * as React from "react"

import { Container, Text, Divider, Image } from "@chakra-ui/react"
import { useEventContext } from "../../contexts/event"


export default function EventDetails({event}) {

    return(
        <Container maxW="1200px" maxH="960px" position="relative">
            
            <Image src={event.eventImageUrl}/>
            <Text marginBottom={6} fontSize='3xl'>{event.eventDate}</Text>
            <Text marginBottom={6} fontSize='3xl'>{event.eventType}</Text>
            <Text marginBottom={6} fontSize='3xl'>{event.eventLocation}</Text>
            <Text marginBottom={6} fontSize='3xl'>{event.eventDetails}</Text>
            <Text marginBottom={6} fontSize='3xl'>{event.eventGame}</Text>

        </Container>
    )
}
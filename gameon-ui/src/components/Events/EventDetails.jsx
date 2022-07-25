import * as React from "react"
import EventRegistration from "../Events/EventRegistration"
import { 
    Container, Box, Text, Divider,
    Flex, Spacer,
    Image, FormControl, FormLabel, 
    Heading, Input 
} from "@chakra-ui/react"
import { useEventContext } from "../../contexts/event"


export default function EventDetails({event}) {

    return(
        <Container position="relative" >
            <Flex direction="column">
                    <Box>
                    {/* Image */}
                        <Image src={event.eventImageUrl}/>
                    {/* Date */}
                        <Text marginBottom={6} fontSize="3xl">{event.eventDate}</Text>
                    {/* Type */}
                        <Text marginBottom={6} fontSize="3xl">{event.eventType}</Text>
                    {/* Location */}
                        <Text marginBottom={6} fontSize="3xl">{event.eventLocation}</Text>
                    {/* Details */}
                        <Text marginBottom={6} fontSize="3xl">{event.eventDetails}</Text>
                    {/* Game */}
                        <Text marginBottom={6} fontSize="3xl">{event.eventGame}</Text>
                    {/* Event Registration */}
                        <EventRegistration event={event} />
                    </Box>
            </Flex>

        </Container>
    )
}
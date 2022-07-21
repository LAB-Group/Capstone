import * as React from "react"
import { Grid, GridItem, Box, Text, SimpleGrid, Container, Wrap, Divider  } from "@chakra-ui/react"
import EventCard from "./EventCard"
import { useAuthContext } from "../../contexts/auth"
import { useEventContext } from "../../contexts/event"

export default function EventFeed({ isFetching }){
    const { user } = useAuthContext()
    const { events } = useEventContext()
    
    return(
        <Container maxW="1200px" maxH="960px" position="relative">
            <Divider orientation='horizontal' backgroundColor={'purple.100'} marginTop={6} marginBottom={6} />
            <Text marginBottom={6} fontSize='3xl'>Events</Text>
            <SimpleGrid justifyContent={"center"} alignItems={"center"} minChildWidth={'320px'} rowGap='20px' className="WRAP">
                
                {events?.map((event) => (
                        <EventCard key={event.id} event={event}/>
                ))}
                {!events?.length ? (
                    <Box><Text>No Events available</Text></Box>
                ):null}
            </SimpleGrid>
            </Container>
    )
}


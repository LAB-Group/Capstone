import * as React from "react"
import { Grid, GridItem, Box, Text, SimpleGrid, Container, Wrap } from "@chakra-ui/react"
import EventCard from "../EventsCard/EventCard"
import { useAuthContext } from "../../contexts/auth"

export default function EventFeed({events, isFetching}){
    const { user } = useAuthContext()
    
    return(
            <SimpleGrid justifyContent={"center"} alignItems={"center"} minChildWidth={'320px'} rowGap='20px' className="WRAP">
                
                {events?.map((event) => (
                        <EventCard key={event.id} event={event}/>
                ))}
                {!events?.length ? (
                    <Box><Text>No Events available</Text></Box>
                ):null}
            </SimpleGrid>

    )
}


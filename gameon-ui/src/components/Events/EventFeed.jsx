import * as React from "react"
import { Grid, GridItem, Box, Text } from "@chakra-ui/react"
import EventCard from "../EventsCard/EventCard"
import { useAuthContext } from "../../contexts/auth"

export default function EventFeed({events, isFetching}){
    const { user } = useAuthContext()
    
    return(
        <Grid gridTemplateColumns='auto' columnGap='20px' rowGap='20px'>
            <GridItem>
                {events?.map((event) => (
                <EventCard key={event.id} event={event}/>
                ))}
                {!events?.length ? (
                    <Box><Text>No Events available</Text></Box>
                ):null}
                {/* <EventCard /> */}
            </GridItem>
        </Grid>

    )
}


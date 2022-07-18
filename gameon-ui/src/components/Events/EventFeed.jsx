import * as React from "react"
import { Grid, GridItem, Flex, Text, Square } from "@chakra-ui/react"
import EventCard from "../EventsCard/EventCard"

export default function EventFeed(){
    
    let num = 0;           
    while(num < 10){
    return(
        <Grid gridTemplateColumns='auto' columnGap='20px' rowGap='20px'>
            <GridItem>
                <EventCard/>
            </GridItem>
        </Grid>
                // <Flex flexWrap='wrap' flexDirection='row'>
                // </Flex>

    )
}

}
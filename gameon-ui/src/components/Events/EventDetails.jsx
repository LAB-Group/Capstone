import * as React from "react"
import EventRegistration from "../Events/EventRegistration"
import { 
    Container, Box, Text,SimpleGrid, Flex, 
    Image, List, VStack,Heading, Stack, 
    StackDivider, ListItem, Icon, useColorModeValue 
} from "@chakra-ui/react"

import {HiLocationMarker} from "react-icons/hi"

import { useEventContext } from "../../contexts/event"


export default function EventDetails({event}) {
    const noEventImage = "https://cdn.cheapoguides.com/wp-content/uploads/sites/2/2013/07/no-event-image-1024x600.jpg"
    let date = event.eventDate
    let newDate = new Date(date)
    let myDate = newDate.toDateString() 
    return(
        <Container maxW={"7xl"}>
            <SimpleGrid 
            column={{base:1, lg:2}}
            spacing={{base:8, md: 10}}
            py={{base:18, md:24}}
            >
            <Flex>
                {/* Image */}
                <Image 
                rounded= {"md"} 
                src={event.eventImageUrl} 
                alt={noEventImage}
                fit={"cover"}
                align={"center"}
                width={"100%"}
                height={{base:"100%", sm:"400px", lg:"500px"}}/>
            </Flex>
            <Stack spacing={{base:6, md:10}}>
                <Box as={"header"}>
                    {/* Type */}
                    <Text
                        color={useColorModeValue("gray.900", "gray.400")}
                        fontWeight={300}
                        fontSize={"2xl"}
                    >{
                        event.eventType
                    }</Text>

                    {/* Event Name */}
                    <Heading
                        lineHeight={1.1}
                        fontWeight={600}
                        fontSize={{base:"2xl", sm:"4xl", lg:"5xl"}}
                        textTransform={"uppercase"}
                    >{event.eventName}
                    </Heading>

                    {/* Date */}
                    <Text
                        color={useColorModeValue("gray.900", "gray.400")}
                        fontWeight={300}
                        fontSize={"2xl"}
                    >{
                        myDate
                    }</Text>

                    {/* Location */}
                    <Text
                        color={useColorModeValue("gray.900", "gray.400")}
                        fontWeight={300}
                        fontSize={"2xl"}
                    > 
                    <Icon as={HiLocationMarker}/>
                        {
                        event.eventLocation
                        }
                    </Text>
                </Box>
            </Stack>
            </SimpleGrid>
                {/* Event */}

                {/* Divides/Spaces */}
                <Stack spacing={{ base: 4, sm: 6 }} direction={"column"} divider={
                    <StackDivider borderColor={useColorModeValue("gray.200", "gray.600")}/>
                }>
                    
                    {/* Details */}
                    <VStack spacing={{ base: 4, sm: 6 }}>
                        <Text color={useColorModeValue("gray.500", "gray.400")} fontSize={"2xl"} fontWeight={300}>
                            Description:
                        </Text>
                        <Text fontSize={"lg"}>{event.eventDetails}</Text>
                    </VStack>
                </Stack>

                <Box>
                    {/* Game */}
                    <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    color={useColorModeValue("yellow.500", "yellow.300")}
                    fontWeight={'500'}
                    textTransform={'uppercase'}
                    mb={'4'}>
                        Games:
                    </Text>

                    <SimpleGrid columns={{base:1, md:2}} spacing={10}>
                        <List spacing={2}>
                            <ListItem>
                                <Text as={"span"} fontWeight={"bold"}>{event.eventGame}</Text>
                            </ListItem>
                        </List>
                    </SimpleGrid>

                {/* Registration Button */}
                <EventRegistration event={event} />
                </Box>
                    
        </Container>
    )
}
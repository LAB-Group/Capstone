import * as React from "react"
import { useState, useEffect } from "react"
import {  Box, Text, SimpleGrid, Divider, Flex, Skeleton, VStack, Heading, Input, Link, Button, useDisclosure } from "@chakra-ui/react"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/scrollbar"
import EventCard from "./EventCard"
import { useAuthContext } from "../../contexts/auth"
import { useEventContext } from "../../contexts/event"
import { Pagination, Scrollbar } from "swiper"
import SearchedEvents from "./SearchedEvents";
import { COLORS } from "../colors";
export default function EventFeed({ isFetching }){
    const { user } = useAuthContext()
    const { events } = useEventContext()
    const [loading, setLoading] = useState(true)
    const { isOpen, onOpen, onClose } = useDisclosure()

    let tournamentEvents = events?.filter(event => {return event.eventType === "Tournament"})
    let speedEvents = events?.filter(event => {return event.eventType === "Speedrunning"})
    let meetEvents = events?.filter(event => {return event.eventType === "Meet-up"})    
   
        return(
            // Created margintop space out the EventFeed and Hero
            // Might comeback and make this a paddingTop
            <Flex marginTop={"2rem"} flexDirection='column' justifyContent='center' alignItems='center' minWidth="95vw" position="relative">
                {/* <Divider orientation='horizontal' backgroundColor={'purple.100'} marginTop={6} minWidth="95vw" marginBottom={6} /> */}
                <Heading id="events" color={"#e6e6e6"} mb={"10"} textAlign={"center"} fontSize={["xl", "3xl", "4xl"]}>Events</Heading>
                <Button variant="outline" colorScheme='purple' onClick={onOpen} style={{"transition":"background-color 2s, color 2s"}} _hover={{"background-color": COLORS.ultraViolet, "color": COLORS.offWhite}}>Search All Events</Button>

                {isOpen? <SearchedEvents events={events} isOpen={isOpen} onOpen={onOpen} onClose={onClose} /> :<></>}
                
                
                <SimpleGrid minWidth="80vw" justifyContent={"center"} alignItems={"center"} minChildWidth={'320px'} rowGap='20px' className="WRAP">
                <VStack css={{
                ".swiper-pagination-bullet-active": {
                    "background-color": "#B794F4"
                  }
            }}>

                <Box maxW={"1000px"} width={"100%"}>
                    <Heading color={"#e6e6e6"}>Tournaments</Heading>
                
                <Box backgroundColor={"purple.300"} padding={"1em"}  borderRadius={"20px"}>
                {tournamentEvents?.length ? 
                    <Swiper
                    slidesPerView={3}
                    spaceBetween={10}
                    slidesPerGroup={3}
                    scrollbar={{
                      hide: true,
                    }}
                    pagination={{
                        clickable:true
                    }
                    }
                    modules={[Scrollbar, Pagination]}
                    loop={true}
                    loopFillGroupWithBlank={true}
                    className="mySwiper"
                  >
                        {tournamentEvents?.map((event, index) => (
                        <SwiperSlide key={index}>
                            <EventCard event={event}/>         
                        </SwiperSlide>
                            ))}
                    </Swiper>
                    :<Box><Text>No Events available</Text></Box>}
                </Box>
                </Box> 

                <Box maxW={"1000px"} width={"100%"}>
                    <Heading color={"#e6e6e6"}>Speedrunning</Heading>
                    <Box backgroundColor={"purple.300"} padding={"1em"} borderRadius={"20px"}>

                        {speedEvents?.length ? 
                            <Swiper
                                slidesPerView={3}
                                spaceBetween={10}
                                slidesPerGroup={3}
                                scrollbar={{
                                    hide:true
                                }}
                                modules={[Pagination, Scrollbar]}
                                pagination={{
                                    clickable: true,
                                }}
                                loop={true}
                                loopFillGroupWithBlank={true}
                                className="mySwiper"
                            >
                        {speedEvents?.map((event, index) => (
                                <SwiperSlide key={index}>
                                    <EventCard event={event}/>         
                                </SwiperSlide>
                            ))}
                    </Swiper>
                    :<Box><Text>No Events available</Text></Box>}
                    </Box>
                </Box>

                <Box maxW={"1000px"} width={"100%"}>
                    <Heading color={"#e6e6e6"}>Meet-ups</Heading>
                    <Box backgroundColor={"purple.300"} padding={"1em"} borderRadius={"20px"}>

                        {meetEvents?.length ? 
                        <Swiper
                            slidesPerView={3}
                            spaceBetween={10}
                            slidesPerGroup={3}
                            scrollbar={{
                                hide:true
                            }}
                            modules={[Pagination, Scrollbar]}
                            pagination={{
                                clickable: true,
                            }}
                            loop={true}
                            loopFillGroupWithBlank={true}
                            className="mySwiper"
                        >
                            {meetEvents?.map((event, index) => (
                                <SwiperSlide key={index}>
                                    <EventCard event={event}/>         
                                </SwiperSlide>
                            ))}
                    </Swiper>
                    :<Box><Text>No Events available</Text></Box>}
                    </Box>
                </Box>
                </VStack>
            {/* {events?.map((event) => (
                // Set Skeleton here
                <EventCard key={event.id} event={event}/>         
                
                    ))}
                {!events?.length ? (<Box><Text>No Events available</Text></Box>):null} */}
                </SimpleGrid>
                
                </Flex>
                )
                
            }
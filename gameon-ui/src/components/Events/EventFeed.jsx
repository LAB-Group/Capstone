import * as React from "react"
import { useState, useEffect } from "react"
import {  Box, Text, SimpleGrid, Divider, Flex, Skeleton, Slider, SliderTrack, SliderFilledTrack, SliderThumb, VStack, Heading  } from "@chakra-ui/react"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/scrollbar"
import EventCard from "./EventCard"
import { useAuthContext } from "../../contexts/auth"
import { useEventContext } from "../../contexts/event"
import { Pagination, Scrollbar } from "swiper"
export default function EventFeed({ isFetching }){
    const { user } = useAuthContext()
    const { events } = useEventContext()
    const [loading, setLoading] = useState(true)

    let tournamentEvents = events?.filter(event => {return event.eventType === "Tournament"})
    let speedEvents = events?.filter(event => {return event.eventType === "Speedrunning"})
    let meetEvents = events?.filter(event => {return event.eventType === "Meet-up"})
   
        return(
            
            <Flex flexDirection='column' justifyContent='center' alignItems='center' minWidth="95vw" position="relative">
                <Divider orientation='horizontal' backgroundColor={'purple.100'} marginTop={6} minWidth="95vw" marginBottom={6} />
                <Heading mb={"10"} textAlign={"center"}>Events</Heading>
                
                <Box width={"100%"}>
                <SimpleGrid minWidth="80vw" justifyContent={"center"} alignItems={"center"} minChildWidth={'320px'} rowGap='20px' className="WRAP">
                <VStack>

                <Box maxW={"1000px"}>
                    <Heading>Tournaments</Heading>
                {tournamentEvents?.length ? 
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
                        {tournamentEvents?.map((event, index) => (
                        <SwiperSlide key={index}>
                            <EventCard event={event}/>         
                        </SwiperSlide>
                            ))}
                    </Swiper>
                    :<Box><Text>No Events available</Text></Box>}
                </Box> 

                <Box maxW={"1000px"}>
                <Heading>Speedrunning</Heading>
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

                <Box maxW={"1000px"}>
                <Heading>Meet-ups</Heading>
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
                </VStack>
            {/* {events?.map((event) => (
                // Set Skeleton here
                <EventCard key={event.id} event={event}/>         
                
                ))}
            {!events?.length ? (<Box><Text>No Events available</Text></Box>):null} */}
                </SimpleGrid>
            </Box>
                
                </Flex>
                )
                
            }
            
            
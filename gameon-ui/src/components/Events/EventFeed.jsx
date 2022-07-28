import * as React from "react"
import {  Box, Text, SimpleGrid, Divider, Flex, Skeleton } from "@chakra-ui/react"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/scrollbar"
import EventCard from "./EventCard"
import { useAuthContext } from "../../contexts/auth"
import { useEventContext } from "../../contexts/event"
import {  Scrollbar } from "swiper"
export default function EventFeed({ isFetching }){
    const { user } = useAuthContext()
    const { events } = useEventContext()
    
   
        return(
            
            <Flex flexDirection='column' justifyContent='center' alignItems='center' minWidth="95vw" position="relative">
                <Divider orientation='horizontal' backgroundColor={'purple.100'} marginTop={6} minWidth="95vw" marginBottom={6} />
                <Text mb={"10"} textAlign={"center"} fontSize='3xl'>Events</Text>
                
                <Box width={"100%"}>
                <SimpleGrid minWidth="80vw" justifyContent={"center"} alignItems={"center"} minChildWidth={'320px'} rowGap='20px' className="WRAP">
                <Box maxWidth={"900px"} minWidth={"405px"}>
                {events?.length ? 
                    <Swiper
                    slidesPerView={4}
                    spaceBetween={300}
                    slidesPerGroup={4}
                    scrollbar={{
                        hide:true
                    }}
                    loop={true}
                    loopFillGroupWithBlank={true}
                    modules={[ Scrollbar ]}
                    className="mySwiper"
                    >
                        {events?.map((event) => (
                            <SwiperSlide key={event.id}>
                            <EventCard event={event}/>         
                        </SwiperSlide>
                            ))}
                    </Swiper>
                    :<Box><Text>No Events available</Text></Box>}
                </Box>
                
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
            
            
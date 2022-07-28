import * as React from "react"
import {  Box, Text, SimpleGrid, Divider, Flex, Slider, SliderTrack, SliderFilledTrack, SliderThumb  } from "@chakra-ui/react"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import EventCard from "./EventCard"
import { useAuthContext } from "../../contexts/auth"
import { useEventContext } from "../../contexts/event"
import { Pagination, Navigation } from "swiper"
export default function EventFeed({ isFetching }){
    const { user } = useAuthContext()
    const { events } = useEventContext()

    return(
        <Flex flexDirection='column' justifyContent='center' alignItems='center' minWidth="95vw" position="relative">
            <Divider orientation='horizontal' backgroundColor={'purple.100'} marginTop={6} minWidth="95vw" marginBottom={6} />
            <Text mb={"10"} textAlign={"center"} fontSize='3xl'>Events</Text>
            
            <SimpleGrid minWidth="80vw" justifyContent={"center"} alignItems={"center"} minChildWidth={'320px'} rowGap='20px' className="WRAP">
            {/* {events?.length ? 
            <Swiper
                slidesPerView={3}
                spaceBetween={10}
                slidesPerGroup={3}
                effect={"fade"}
                fadeEffect={
                    {crossFade: true}
                }
                loop={true}
                loopFillGroupWithBlank={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {events?.map((event) => (
                <SwiperSlide key={event.id}>
                    <EventCard event={event}/>         
                </SwiperSlide>
                    ))}
            </Swiper> */}
                {/* } */}
                {/* <Box><Text>No Events available</Text></Box> */}
            {events?.map((event) => (
                
                    <EventCard key={event.id} event={event}/>         
                
                    ))}
                {!events?.length ? (<Box><Text>No Events available</Text></Box>):null}
            </SimpleGrid>
            
        </Flex>
    )
}


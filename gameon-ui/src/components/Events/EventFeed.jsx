import * as React from "react"
import {  Box, Text, SimpleGrid, Divider, Flex, Slider, SliderTrack, SliderFilledTrack, SliderThumb  } from "@chakra-ui/react"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"
import "swiper/css/pagination"
import EventCard from "./EventCard"
import { useAuthContext } from "../../contexts/auth"
import { useEventContext } from "../../contexts/event"
import { Pagination } from "swiper"
export default function EventFeed({ isFetching }){
    const { user } = useAuthContext()
    const { events } = useEventContext()
    
    return(
        <Flex flexDirection='column' justifyContent='center' alignItems='center' minWidth="95vw" position="relative">
            <Divider orientation='horizontal' backgroundColor={'purple.100'} marginTop={6} minWidth="95vw" marginBottom={6} />
            <Text margin={"20px 0 0 6px"} textAlign={"center"} fontSize='3xl'>Events</Text>
            
            <SimpleGrid minWidth="80vw" justifyContent={"center"} alignItems={"center"} minChildWidth={'320px'} rowGap='20px' className="WRAP">
            
            <Swiper
        slidesPerView={4}
        spaceBetween={300}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        >
            {events?.map((event) => (
          <SwiperSlide>
                        <EventCard key={event.id} event={event}/>
                        
                </SwiperSlide>
                ))}
        {!events?.length ? (
                    <Box><Text>No Events available</Text></Box>
                ):null}
      </Swiper>
    
            </SimpleGrid>
            
        </Flex>
    )
}


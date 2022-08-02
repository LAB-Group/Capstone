import * as React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar } from "swiper"
import {
  Box,
  Text,
  Heading
} from '@chakra-ui/react';
import EventCard from '../Events/EventCard';

export default function UsersPreviousEvents({ user, prevEvents }) {

  return (
    <>
      <Box maxW={"1000px"}>
                    <Heading mb={2} color="white">Previous Events</Heading>
                {prevEvents?.length ? 
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
                        {prevEvents?.map((event, index) => (
                        <SwiperSlide key={index}>
                            <EventCard event={event}/>         
                        </SwiperSlide>
                            ))}
                    </Swiper>
                    :<Box><Text color="white">No Events available</Text></Box>}
                </Box> 
    </>
  );
}

import * as React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar } from "swiper"
import {
  Box,
  Text,
  Heading
} from '@chakra-ui/react';
import EventCard from '../Events/EventCard';

export default function UserPreviousEvents({ user, prevEvents }) {

  return (
    <>
      <Text fontSize="3xl">Previous Events</Text>
      <Box maxW={"1000px"}>
                    <Heading>Tournaments</Heading>
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
                    :<Box><Text>No Events available</Text></Box>}
                </Box> 
    </>
  );
}

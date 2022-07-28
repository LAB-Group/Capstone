import * as React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar } from "swiper"
import {
  Box,
  Text,
  Heading
} from '@chakra-ui/react';
import EventCard from '../Events/EventCard';

export default function UserUpcomingEvents({ user, futureEvents }) {

  return (
    <>
      <Text fontSize="3xl">Upcoming Events</Text>
      <Box maxW={"1000px"}>
                    <Heading>Tournaments</Heading>
                {futureEvents?.length ? 
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
                        {futureEvents?.map((event, index) => (
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

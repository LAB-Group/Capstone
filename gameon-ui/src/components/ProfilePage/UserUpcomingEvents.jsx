import * as React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar } from "swiper"
import {
  Box,
  Text,
  Heading
} from '@chakra-ui/react';
import EventCard from '../Events/EventCard';
import { COLORS } from '../colors';

export default function UserUpcomingEvents({ user, futureEvents }) {

  return (
    
      <Box width={"1200px"} >
                    <Heading color={COLORS.offWhite}>Upcoming Events</Heading>
          <Box marginTop={"0.5rem"} style={{"background":"rgba(113, 57, 166, .6)"}} padding={"1em"} borderRadius={"20px"}>
                {futureEvents?.length ? 
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={30}
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
                    :<Box><Text color={COLORS.offWhite}>No Events available</Text></Box>}
                </Box> 
          </Box>
    
  );
}

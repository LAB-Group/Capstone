import * as React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar } from "swiper"
import {
  Box,
  Text,
  Heading
} from '@chakra-ui/react';
import EventCard from '../Events/EventCard';
import {COLORS} from "../colors"

export default function UsersPreviousEvents({ user, prevEvents }) {

  return (
    <Box width={"100%"}>
    <Box marginTop={"0.5rem"}
        css={{
            ".swiper-pagination-bullet-active": {
                "backgroundColor": COLORS.ultraViolet
             },
            ".swiperContainer":{
               "width":"100%"
            },
            "@media screen and (min-width: 640px)":{
                ".swiperContainer":{
                    "width":"100%"
                }
            },
           "@media screen and (min-width: 768px)":{
               ".swiperContainer":{
                   "width":"100%"
               }
           },
           "@media screen and (min-width: 890px)":{
               ".swiperContainer":{
                   "width":"100%"
                }
            },
        }}>
        <Heading fontFamily={"Roboto, sans-serif"} marginLeft={4} mb={2} color={COLORS.offWhite}>Previous Events</Heading>
        <Box className="swiperContainer" position={"static"} marginTop={"0.5rem"} style={{"background":"rgba(232, 232, 232, 0)"}} padding={"2em"} borderRadius={"20px"}> 
          {prevEvents?.length ? 
            <Swiper
              breakpoints={{
                640:{
                     width: 640,
                     slidesPerView:1,
                    slidesPerGroup:1,
                    spaceBetween:40
                },
                768:{
                    width: 768,
                    slidesPerView:2,
                    slidesPerGroup:2,
                    spaceBetween:40
                },
              }}
              scrollbar={{
                hide: true,
              }}
              pagination={{
                clickable:true
              }}
              modules={[Scrollbar, Pagination]}
              loop={false}
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
    </Box>
  </Box>

    // <>
    //   <Box maxW={"1000px"}>
    //                 <Heading mb={2} color="white">Previous Events</Heading>
    //             {prevEvents?.length ? 
    //                 <Swiper
    //                     slidesPerView={3}
    //                     spaceBetween={10}
    //                     slidesPerGroup={3}
    //                     scrollbar={{
    //                         hide:true
    //                     }}
    //                     modules={[Pagination, Scrollbar]}
    //                     pagination={{
    //                         clickable: true,
    //                       }}
    //                     loop={true}
    //                     loopFillGroupWithBlank={true}
    //                     className="mySwiper"
    //                 >
    //                     {prevEvents?.map((event, index) => (
    //                     <SwiperSlide key={index}>
    //                         <EventCard event={event}/>         
    //                     </SwiperSlide>
    //                         ))}
    //                 </Swiper>
    //                 :<Box><Text color="white">No Events available</Text></Box>}
    //             </Box> 
    // </>
  );
}

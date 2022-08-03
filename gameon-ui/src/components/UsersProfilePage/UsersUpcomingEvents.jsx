import * as React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar } from "swiper"
import { Box, Text, Heading } from '@chakra-ui/react';
import EventCard from '../Events/EventCard';
import { COLORS } from '../colors';

export default function UsersUpcomingEvents({ user, futureEvents }) {

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
          <Heading fontFamily={"Roboto, sans-serif"} marginLeft={4} mb={2} color={COLORS.offWhite}>Upcoming Events</Heading>
          <Box className="swiperContainer" position={"static"} marginTop={"0.5rem"} style={{"background":"rgba(232, 232, 232, 0)"}} padding={"2em"} borderRadius={"20px"}> 
            {futureEvents?.length ? 
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
              {futureEvents?.map((event, index) => (
                <SwiperSlide key={index}>
                    <EventCard event={event}/>         
                </SwiperSlide>
                            ))}
              </Swiper>
            :<Box><Text fontFamily={"Open Sans, sans-serif"} color={COLORS.offWhite}>No Events available</Text></Box>}
          </Box> 
      </Box>
    </Box>
  )
}

{/*  <Box width={"100%"}> */}
                
{/* <Box marginTop={"0.5rem"}
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
    <Heading fontFamily={"Roboto, sans-serif"} color={COLORS.offWhite}>Tournaments</Heading>

<Box 
className="swiperContainer" 
position={"static"} 
marginTop={"0.5rem"} 
style={{"background":"rgba(113, 57, 166, .6)"}} 
padding={"2em"} borderRadius={"20px"}
> 
{tournamentEvents?.length ? 
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
        // 890:{
        //     width: 890,
        //     slidesPerView:3,
        //     slidesPerGroup:3,
        //     spaceBetween:20
        // },

    }}
    // slidesPerView={4}
    // spaceBetween={20}
    // slidesPerGroup={4}
    scrollbar={{
      hide: true,
    }}
    pagination={{
        clickable:true
    }
    }
    modules={[Scrollbar, Pagination]}
    loop={false}
    loopFillGroupWithBlank={true}
    className="mySwiper"
  > 
        {tournamentEvents?.map((event, index) => (
        <SwiperSlide key={index}>
            <EventCard key={index} event={event}/>         
        </SwiperSlide>
            ))}
    </Swiper>
    :<Box><Text>No Events available</Text></Box>}
</Box>
</Box>  */}

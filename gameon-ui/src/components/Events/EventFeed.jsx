import * as React from "react"
import { useState, useEffect } from "react"
import {  Box, Text, SimpleGrid, Flex, Button, Center, Skeleton, VStack, Heading, useDisclosure } from "@chakra-ui/react"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/scrollbar"
import EventCard from "./EventCard"
import { useAuthContext } from "../../contexts/auth"
import { useEventContext } from "../../contexts/event"
import { Pagination, Scrollbar } from "swiper"
import SearchedEvents from "./SearchedEvents";
import { COLORS } from "../colors";
export default function EventFeed({ isFetching }){
    const { user } = useAuthContext()
    const { events } = useEventContext()
    const [loading, setLoading] = useState(true)
    const { isOpen, onOpen, onClose } = useDisclosure()

    let tournamentEvents = events?.filter(event => {return event.eventType === "Tournament"})
    let speedEvents = events?.filter(event => {return event.eventType === "Speedrunning"})
    let meetEvents = events?.filter(event => {return event.eventType === "Meet-up"})    
   
        return(
            // Created margintop space out the EventFeed and Hero
            // Might comeback and make this a paddingTop
            <Flex marginTop={"2rem"} flexDirection='column' justifyContent='center' alignItems='center' minWidth="95vw" position="relative">
                {/* <Divider orientation='horizontal' backgroundColor={'purple.100'} marginTop={6} minWidth="95vw" marginBottom={6} /> */}
                {/* font-family: 'Roboto', sans-serif for headings */}
                <Heading id="events" fontFamily={"Roboto, sans-serif"} color={COLORS.offWhite} marginBottom={"1em"} textAlign={"center"} fontSize={["xl", "3xl", "4xl"]}>Events</Heading>
                <Button onClick={onOpen} 
                fontFamily={"mono, sans-serif"}
                fontSize={{ "base":"lg","md":"lg", "lg":"xl"}} 
                background={"rgba(0,0,0,0)"} 
                color={COLORS.offWhite}
                border={"2px"} borderColor={COLORS.ultraViolet} borderStyle={"solid"}
                style={{"transition": "backgroundColor 0.5s, color 0.5s, borderColor 0.5s"}}
                 _hover={{"backgroundColor":COLORS.offWhite,"color": COLORS.indigo, "borderColor": COLORS.offWhite}}>Search All Events</Button>
                
                
                {/* <Text onClick={onOpen} style={{
                    "color":"hsl(0, 0%, 90%)",
                    "backgroundColor":"none",
                    "border":"2px",
                    "borderColor":COLORS.ultraViolet,
                    "borderStyle":"solid", 
                    "borderRadius":"5px",
                    "padding":"1em",
                    "transition":"borderColor 0.8s, backgroundColor 0.8s"
                    }} 
                    _hover={{
                        "cursor":"pointer",
                        "borderColor":COLORS.darkAmethyst,
                        "backgroundColor": COLORS.darkAmethyst, 
                    }}>Search All Events</Text> */}

                {isOpen? <SearchedEvents events={events} isOpen={isOpen} onOpen={onOpen} onClose={onClose} /> :<></>}
                
                
                <SimpleGrid marginTop={"1rem"} minWidth="80vw" justifyContent={"center"} alignItems={"center"} minChildWidth={'320px'} rowGap='20px' className="WRAP">
                <VStack>
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
                </Box> 
                
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
                    <Heading fontFamily={"Roboto, sans-serif"} color={COLORS.offWhite}>Speedrunning</Heading>
                
                <Box 
                className="swiperContainer" 
                position={"static"} 
                marginTop={"0.5rem"} 
                style={{"background":"rgba(113, 57, 166, .6)"}} 
                padding={"2em"} borderRadius={"20px"}
                > 
                {speedEvents?.length ? 
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
                    }
                    }
                    modules={[Scrollbar, Pagination]}
                    loop={false}
                    loopFillGroupWithBlank={true}
                    className="mySwiper"
                  > 
                        {speedEvents?.map((event, index) => (
                        <SwiperSlide key={index}>
                            <EventCard key={index} event={event}/>         
                        </SwiperSlide>
                            ))}
                    </Swiper>
                    :<Box><Text>No Events available</Text></Box>}
                </Box>
                </Box> 
                
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
                    <Heading fontFamily={"Roboto, sans-serif"} color={COLORS.offWhite}>Meet-Ups</Heading>
                
                <Box 
                className="swiperContainer"  
                marginTop={"0.5rem"} 
                style={{"background":"rgba(113, 57, 166, .6)"}} 
                padding={"2em"} borderRadius={"20px"}
                > 
                {meetEvents?.length ? 
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
                        {meetEvents?.map((event, index) => (
                        <SwiperSlide key={index}>
                            <EventCard key={index} event={event}/>         
                        </SwiperSlide>
                            ))}
                    </Swiper>
                    :<Box><Text>No Events available</Text></Box>}
                </Box>
                </Box> 

                {/* <Box marginTop={"0.5rem"} width={"100%"}>
                    <Heading fontFamily={"Roboto"} color={COLORS.offWhite}>Speedrunning</Heading>
                    <Box 
                    
                    position={"static"} marginTop={"0.5rem"} style={{"background":"rgba(113, 57, 166, .6)"}} padding={"1em"} borderRadius={"20px"}>

                        {speedEvents?.length ? 
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
                        {speedEvents?.map((event, index) => (
                                <SwiperSlide key={index}>
                                    <EventCard key={index} event={event}/>         
                                </SwiperSlide>
                            ))}
                    </Swiper>
                    :<Box><Text>No Events available</Text></Box>}
                    </Box>
                </Box> */}
                
                {/* <Box marginTop={"0.5rem"} width={"100%"} maxWidth={"80em"} flexGrow={1} flexShrink={1} flexBasis={"auto"}>
                    <Heading fontFamily={"Roboto, sans-serif"} color={COLORS.offWhite}>Meet-ups</Heading>
                    <Box marginTop={"0.5rem"} style={{"background":"rgba(113, 57, 166, .6)"}} padding={"1em"} borderRadius={"20px"}>

                        {meetEvents?.length ? 
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
                            {meetEvents?.map((event, index) => (
                                <SwiperSlide key={index}>
                                    <EventCard key={index} event={event}/>         
                                </SwiperSlide>
                            ))}
                    </Swiper>
                    :<Box><Text>No Events available</Text></Box>}
                    </Box>
                </Box> */}
                {/* </VStack> */}
                </Box>
                </VStack>
            {/* {events?.map((event) => (
                // Set Skeleton here
                <EventCard key={event.id} event={event}/>         
                
                    ))}
                {!events?.length ? (<Box><Text>No Events available</Text></Box>):null} */}
                </SimpleGrid>
                
                </Flex>
                )
                
            }
import * as React from "react"
import apiClient from "../../services/apiClient"
import { useState, useEffect } from "react"
import {  Box, Text, Wrap, SimpleGrid, Flex, Button, Center, Skeleton, VStack, Heading, useDisclosure, Input, HStack, Container, ButtonGroup, color } from "@chakra-ui/react"
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
    const { events, userEvents } = useEventContext()
    const [loading, setLoading] = useState(true)
    const [currentEventType, setCurrentEventType] = useState("")
    const [error, setError] = useState(null)

    const [searchInput, setSearchInput] = useState("")
    let handleOnSearchChange = (event) => {
        setSearchInput(event.target.value)
      }

      const searchedEvents = events.filter(event => {
        return (event.eventName.toLowerCase().includes(searchInput.toLowerCase()))}).filter(event => {
            if(currentEventType === "") {
              return true
            }
            return (event.eventType === currentEventType)
      })

      let handleEventType = (eventType) => {
        setCurrentEventType(eventType)
      }

      let date = new Date()
      let todaysDate = date.toISOString().split('T')[0]
      date.setDate(date.getDate() * 4.5)
      let futureDate = date.toISOString().split('T')[0] //Date.now() + (6.048e+8 * 2) is 2 weeks from today
   
        return(
            // Created margintop space out the EventFeed and Hero
            // Might comeback and make this a paddingTop
            <Flex marginTop={"2rem"} flexDirection='column' justifyContent='center' alignItems='center' minWidth="95vw" position="relative">
                {/* <Divider orientation='horizontal' backgroundColor={'purple.100'} marginTop={6} minWidth="95vw" marginBottom={6} /> */}
                {/* font-family: 'Roboto', sans-serif for headings */}


                {/* TEST */}
                <Heading id="events" fontFamily={"Roboto, sans-serif"} color={COLORS.offWhite} marginBottom={"1em"} textAlign={"left"} fontSize={["xl", "3xl", "4xl"]}>Your Upcoming Events</Heading>
                {/* <Text position={"relative"} fontSize={"3xl"} fontFamily={"Roboto, sans-serif"} fontWeight={300} textTransform={'uppercase'} mb={4}>Details:</Text> */}

                {user ? 
                <SimpleGrid minWidth="80%" maxW={'80%'} justifyContent={"center"} alignItems={"center"} minChildWidth={'350px'} gap='20px'>
                <Box  marginX={"1rem"} marginTop={"0.5rem"}
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
                <Box className="swiperContainer" my={2} mb={8} position={'static'}>
                    <Swiper
                                        breakpoints={{
                                            // 640:{
                                            //     width: 640,
                                            //     slidesPerView:1,
                                            //     slidesPerGroup:1,
                                            //     spaceBetween:40
                                            // },
                                            // 768:{
                                            //     width: 768,
                                            //     slidesPerView:2,
                                            //     slidesPerGroup:2,
                                            //     spaceBetween:40
                                            // },
                                            890:{
                                                width: 890,
                                                slidesPerView:3,
                                                slidesPerGroup:3,
                                                spaceBetween:200
                                            },
                    
                                        }}
                            scrollbar={{
                                hide:true
                            }}
                            modules={[Pagination, Scrollbar]}
                            pagination={{
                                clickable: true,
                            }}
                        >
                {userEvents?.map((event, index) => (
                    (event.eventStartDate >= todaysDate && event.eventStartDate <= futureDate) ?
                            <SwiperSlide key={index}>
                                <EventCard event={event} key={index} />         
                            </SwiperSlide>
                        :
                        null
                ))}
                </Swiper>
                
                </Box>
                </Box>
                </SimpleGrid>
                :null}
                
                
                {/* TEST */}

                <Heading id="events" fontFamily={"Roboto, sans-serif"} color={COLORS.offWhite} marginBottom={"1em"} textAlign={"center"} fontSize={["xl", "3xl", "4xl"]}>Events</Heading>
                
                {/* All Events Feed */}
                <Container centerContent minWidth={"80%"}>
                <HStack>
                    <ButtonGroup variant={'outline'} color={'white'} >
                        <Button _focus={{"backgroundColor": COLORS.darkAmethyst, "borderColor": COLORS.darkAmethyst}} _hover={{"backgroundColor": COLORS.darkAmethyst}} border={"2px"} borderColor={COLORS.ultraViolet} onClick={() => handleEventType("")}>All Events</Button>
                        <Button _focus={{"backgroundColor": COLORS.darkAmethyst, "borderColor": COLORS.darkAmethyst}} _hover={{"backgroundColor": COLORS.darkAmethyst}} border={"2px"} borderColor={COLORS.ultraViolet} onClick={() => handleEventType("Tournament")}>Tournaments</Button>
                        <Button _focus={{"backgroundColor": COLORS.darkAmethyst, "borderColor": COLORS.darkAmethyst}} _hover={{"backgroundColor": COLORS.darkAmethyst}} border={"2px"} borderColor={COLORS.ultraViolet} onClick={() => handleEventType("Casuals")}>Casuals</Button>
                        <Button _focus={{"backgroundColor": COLORS.darkAmethyst, "borderColor": COLORS.darkAmethyst}} _hover={{"backgroundColor": COLORS.darkAmethyst}} border={"2px"} borderColor={COLORS.ultraViolet} onClick={() => handleEventType("Speedrunning")}>Speedrunning</Button>
                        <Button _focus={{"backgroundColor": COLORS.darkAmethyst, "borderColor": COLORS.darkAmethyst}} _hover={{"backgroundColor": COLORS.darkAmethyst}} border={"2px"} borderColor={COLORS.ultraViolet} onClick={() => handleEventType("Meet-up")}>Meet-ups</Button>
                    </ButtonGroup>
                </HStack>
                <Input margin={'1rem'} defaultValue="" focusBorderColor={COLORS.ultraViolet} color={'white'} placeholder="Search events..." onChange={handleOnSearchChange}></Input>
                <SimpleGrid minWidth="80%" justifyContent={"center"} alignItems={"center"} minChildWidth={'350px'} gap='20px' className="WRAP">
                {searchedEvents?.map((event, index) => (
                            <EventCard key={index} event={event}/>         
                ))}
                </SimpleGrid>
                </Container>
                
                </Flex>
                )
                
            }
import * as React from "react"
import EventRegistration from "../Events/EventRegistration"
import { useState, useEffect } from "react"
import { 
    Container, Box, Text, SimpleGrid, Flex, 
    Image, VStack,Heading, Stack, 
    StackDivider, Icon, HStack, useColorModeValue 
} from "@chakra-ui/react"
import { CalendarIcon } from "@chakra-ui/icons"
import { HiLocationMarker } from "react-icons/hi"
import axios from "axios";


import { useEventContext } from "../../contexts/event"

export default function EventDetails({event}) {
    const noImage = "https://image.shutterstock.com/shutterstock/photos/571752970/display_1500/stock-photo-no-game-sign-on-white-background-571752970.jpg"
    let date = event.eventDate
    let newDate = new Date(date)
    let myDate = newDate.toDateString()
    let time = newDate.toLocaleTimeString("en-US")

    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)

    let string = ""
    if(event.eventGame !== undefined) {
        for(let i = 0; i < event.eventGame.length; i++) {
            if(i === event.eventGame.length - 1) {
                string += event.eventGame[i]
                break
            }
            string += event.eventGame[i] + ", "
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
          }, 100)
        const getGames = async () => {      
            try {
              const response = await axios.post(`http://localhost:3001/games/id`, {
                gameId: string
              })
              const gameData = response.data
              setGames(gameData)
            } catch(error) {
              return(error)
            }
          }
          getGames()  
    },[string])

    return(
        <Container maxWidth={"7xl"}>
            {/* Need to resize image */}
            {/* Image */}
            <Box width={"100%"} height={"400px"} backgroundImage={event?.eventImageUrl}
            backgroundPosition={"center"}
            backgroundSize={"contain"}
            backgroundRepeat={"no-repeat"}>
            </Box>
            
            <>
            <SimpleGrid 
            column={{base:1, lg:2}}
            spacing={{base:8, md: 10}}
            py={{base:18, md:24}}
            >
            
            <Stack spacing={{base:6, md:10}} justifyContent={"center"}>
                <Flex minW={0} alignItems={"flex-start"} flexGrow={1} flexDirection={"row"}>
                    <Image 
                    src={event?.eventImageUrl} 
                    width={"54px"} height={"54px"} 
                    alignItems={"center"} 
                    flexGrow={0} flexShrink={0} flexBasis={"auto"}
                    />
                <Box flexGrow={1} flexShrink={1} flexBasis={"auto"}>
                    {/* Type */}
                    <Text
                        color={useColorModeValue("gray.900", "gray.400")}
                        fontWeight={300}
                        fontSize={{base:"xl", sm:"lg", lg:"2xl"}}
                        textTransform={"uppercase"}
                    >{
                        event.eventType
                    }</Text>
                    {/* Event Name */}
                    <Heading
                        lineHeight={1.1}
                        fontWeight={600}
                        fontSize={{base:"2xl", sm:"lg", lg:"4xl"}}
                        textTransform={"uppercase"}
                    >{event.eventName}
                    </Heading>
                    
                    <HStack spacing={"10px"} >
                    {/* Date */}
                    <Icon as={CalendarIcon}/>    
                    <Text
                        color={useColorModeValue("gray.900", "gray.400")}
                        fontWeight={300}
                        fontSize={"md"}
                    >
                    {
                        myDate
                    }</Text>
                    {/* Time */}
                    <Text
                        color={useColorModeValue("gray.900", "gray.400")}
                        fontWeight={300}
                        fontSize={"md"}
                    >{
                        time
                    }</Text>
                    </HStack>
                    {/* Location */}
                    <HStack>
                    <Icon as={HiLocationMarker}/>
                    <Text
                        color={useColorModeValue("gray.900", "gray.400")}
                        fontWeight={300}
                        fontSize={"md"}
                    > 
                        {
                            event.eventLocation
                        }
                    </Text>

                    </HStack>
                </Box>
                </Flex>


            </Stack>
            </SimpleGrid>
            </>

            
                {/* Event */}
                <Box position={"relative"} pt={"25px"} pb={"25px"} pl={"0"} pr={0} backgroundColor={"purple.500"} borderRadius={"3xl"}>
                    {/* Divides/Spaces */}
                <Stack spacing={{ base: 4, sm: 6 }} direction={"column"} divider={
                    <StackDivider borderColor={useColorModeValue("gray.200", "gray.600")}/>
                }>
                <Box>
                
                    <HStack>
                    {/* Details */}
                    <VStack spacing={{ base: 4, sm: 6 }}>
                        <Text position={"relative"} color={useColorModeValue("whiteAlpha.600", "whiteAlpha.700")} fontSize={"3xl"} fontWeight={300}>
                            Description
                        </Text>
                        <Box alignContent={"center"} backgroundColor={"whiteAlpha.900"} width={"98%"} borderRadius={"3xl"}>
                        <Text whiteSpace= "pre-wrap" fontSize={"lg"} padding={"4px"}>{event.eventDetails}</Text>
                        </Box>
                    </VStack>
                    </HStack>
                </Box>
                </Stack>

                </Box>
                <Stack>
                    <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    color={useColorModeValue("yellow.500", "yellow.300")}
                    fontWeight={'500'}
                    textTransform={'uppercase'}
                    mb={'4'}>
                        Games:
                    </Text>
                    <HStack spacing="24px">
                    {/* Game */}
                    <SimpleGrid columns={{base:2, md:3}} spacing={10}>  
                        {games.game?.map((game, index) => (
                            <HStack key={index} spacing={"20px"} position={"relative"}>
                                <Box width={"400px"} borderWidth='1px' borderRadius='lg' pl={"10px"} overflow='hidden' boxShadow={'md'}>
                                    <Image boxSize={"300px"} position={"relative"} alignContent={"center"} fit={"contain"} borderTopRadius={"lg"} src={game.cover?.url.replace("thumb", "cover_small_2x")} alt={noImage}/>
                                    <Box p='6'>
                                        <Box display='flex' alignItems='baseline'>
                                            <Heading textAlign={"center"} size='md'>{game.name}</Heading>
                                        </Box>
                                    </Box>
                                </Box>
                            </HStack>
                        ))}
                        
                    </SimpleGrid>

                    </HStack>
                </Stack>

            
                
                <Stack>

                <VStack position={"relative"} p={"20px"}>
                        {/* Registration Button */}
                    <EventRegistration event={event} games={games}/>
                </VStack>
                </Stack>

                {/* Used for later */}
                {/* Other events */}
                 {/* <Box>
                    <EventFeed/>
                 </Box> */}

        </Container>
    )
}
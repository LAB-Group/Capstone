import * as React from "react"
import EventFeed from "../Events/EventFeed"
import EventRegistration from "../Events/EventRegistration"
import { useState, useEffect } from "react"
import { 
    Container, Box, Text, SimpleGrid, Flex, 
    Image, List, VStack,Heading, Stack, 
    StackDivider, ListItem, Icon, Center, HStack, Badge, useColorModeValue, Spacer 
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
              console.log(error)
            }
          }
          getGames()  
    },[string])

    return(
        <Container maxW={"7xl"}>
            {/* Need to resize image */}
            {/* Image */}
            <Box width={"100%"} height={"400px"} backgroundImage={event.eventImageUrl}
            backgroundPosition={"center"}
            backgroundSize={"contain"}
            backgroundRepeat={"no-repeat"}>
            {/* <Center>
            <Image 
            src={event.eventImageUrl} 
            alt={noImage}
            maxWidth={"100%"}
            height={"auto"}/>
            </Center> */}
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
                    src={event.eventImageUrl} 
                    width={"54px"} height={"54px"} 
                    alignItems={"center"} 
                    flexGrow={0} flexShrink={0} flexBasis={"auto"}
                    />
                <Box flexGrow={1} flexShrink={1} flexBasis={"auto"}>
                    {/* Type */}
                    <Text
                        color={useColorModeValue("gray.900", "gray.400")}
                        fontWeight={300}
                        fontSize={{base:"lg", sm:"md", lg:"xl"}}
                        textTransform={"uppercase"}
                    >{
                        event.eventType
                    }</Text>
                    {/* Event Name */}
                    <Heading
                        lineHeight={1.1}
                        fontWeight={600}
                        fontSize={{base:"lg", sm:"md", lg:"2xl"}}
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
                <Box borderColor={"purple.400"} borderStyle={"solid"}>
                    {/* Divides/Spaces */}
                <Stack spacing={{ base: 4, sm: 6 }} direction={"column"} divider={
                    <StackDivider borderColor={useColorModeValue("gray.200", "gray.600")}/>
                }>
                    
                    {/* Details */}
                    <VStack spacing={{ base: 4, sm: 6 }}>
                        <Text color={useColorModeValue("gray.500", "gray.400")} fontSize={"2xl"} fontWeight={300}>
                            Description:
                        </Text>
                        <Text fontSize={"lg"}>{event.eventDetails}</Text>
                    </VStack>
                </Stack>

                </Box>

                <Box>
                    {/* Game */}
                    <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    color={useColorModeValue("yellow.500", "yellow.300")}
                    fontWeight={'500'}
                    textTransform={'uppercase'}
                    mb={'4'}>
                        Games:
                    </Text>

                    <SimpleGrid columns={{base:1, md:2}} spacing={10}>
                        <List spacing={2}>
                        {games.game?.map((game, index) => (
                            <HStack spacing>
                            <ListItem>
                                <Box width={"300px"} borderWidth='1px' borderRadius='lg' overflow='hidden' boxShadow={'md'}>
                                    <Image position={"relative"} left={"70px"} objectFit={"cover"} height={"200px"} src={game.cover.url.replace("thumb", "cover_small_2x")} alt={noImage}/>
                                <Box p='6'>
                                    <Box display='flex' alignItems='baseline'>
                                        <Heading textAlign={"center"} size='md'>{game.name}</Heading>
                                    </Box>
                                </Box>
                            </Box>
                            </ListItem>
                            </HStack>
                        ))}
                        </List>
                    </SimpleGrid>

                {/* Registration Button */}
                <EventRegistration event={event} games={games}/>
                </Box>

                {/* Used for later */}
                {/* Other events */}
                 {/* <Box>
                    <EventFeed/>
                 </Box> */}

        </Container>
    )
}
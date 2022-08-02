import * as React from "react"
import EventRegistration from "../Events/EventRegistration"
import { useState } from "react"
import { 
    Container, Box, Text, SimpleGrid, Flex, 
    Image, VStack,Heading, Stack, 
    StackDivider, Icon, HStack, useColorModeValue, ColorModeScript, Center 
} from "@chakra-ui/react"
import { CalendarIcon } from "@chakra-ui/icons"
import { HiLocationMarker } from "react-icons/hi"
import {COLORS} from "../colors"

export default function EventDetails({event, games}) {
    const noImage = "https://image.shutterstock.com/shutterstock/photos/571752970/display_1500/stock-photo-no-game-sign-on-white-background-571752970.jpg"
    let date = event.eventDate
    let newDate = new Date(date)
    let myDate = newDate.toDateString()
    let time = newDate.toLocaleTimeString("en-US")
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
      setIsHovering(true);
    };
  
    const handleMouseOut = () => {
      setIsHovering(false);
    };

    return(
        <Box style={{"backdropFilter": "blur(6px)"}}>
            {/* Need to resize image */}
            {/* Image */}
{/*             
            <Box width={"100%"} height={"400px"} backgroundImage={event?.eventImageUrl}
            backgroundPosition={"center"}
            backgroundSize={"contain"}
            backgroundRepeat={"no-repeat"}>
            </Box> */}
            
            <Center>
            <Box width={"960px"} backgroundColor={COLORS.offWhite} rounded={"20px"}>

            <SimpleGrid 
            column={{base:1, lg:2}}
            spacing={{base:8, md: 10}}
            py={{base:18, md:24}}
            >
            
            <Stack spacing={{base:6, md:10}}>
                <Flex paddingLeft={"1rem"} borderRadius={"15px"} background={"rgba(230, 230, 230, 0.9)"} minW={0} alignItems={"flex-start"} flexGrow={1} flexDirection={"row"}>
                    <Image
                    src={event?.eventImageUrl} 
                    boxSize={"80px"} 
                    alignItems={"center"} 
                    flexGrow={0} flexShrink={0} flexBasis={"auto"}
                    />
                <Box marginLeft={2} flexGrow={1} flexShrink={1} flexBasis={"auto"}>
                    {/* Type */}
                    <Text
                        color={"hsl(0,0%,50%)"}
                        fontWeight={400}
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
                    <Icon as={CalendarIcon} color={COLORS.darkAmethyst}/>    
                    <Text
                        color={"hsl(255, 23%, 10%)"}
                        fontWeight={300}
                        fontSize={"md"}
                    >
                    {
                        myDate
                    }</Text>
                    </HStack>
                    {/* Location */}
                    <HStack>
                    <Icon as={HiLocationMarker} color={COLORS.darkAmethyst}/>
                    <Text
                        color={"hsl(255, 23%, 10%)"}
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
            

            
                {/* Event */}
                <Box position={"relative"} pt={"25px"} pb={"25px"} pl={"0"} pr={0} background={"rgba(113, 57, 166, 0.8)"}>
                    {/* Divides/Spaces */}
                <Stack spacing={{ base: 4, sm: 6 }} direction={"column"}>
                <Box textAlign={"center"}>
                
                    
                    {/* Details */}
                    <VStack spacing={{ base: 4, sm: 6 }}>
                        <Text position={"relative"} color={useColorModeValue("whiteAlpha.600", "whiteAlpha.700")} fontSize={"3xl"} fontWeight={300}>
                            Description
                        </Text>
                        <Box backgroundColor={"whiteAlpha.900"} width={"98%"} borderRadius={"3xl"}>
                        <Text whiteSpace= "pre-wrap" fontSize={{}} padding={"4px"}>{event.eventDetails}</Text>
                        </Box>
                    </VStack>
                    
                </Box>
                </Stack>

                </Box>
                <Stack>
                    <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    color={COLORS.indigo}
                    fontWeight={'500'}
                    textTransform={'uppercase'}
                    mb={'4'}>
                        Featured Games:
                    </Text>
                    <HStack justifyContent={"space-evenly"}>
                    {/* Game */}
                    <Flex justifyContent={"center"} flexDirection={"row"} flexWrap={"wrap"} gap={6}>

                    {games?.map((game, index) => (
                    <Box
                    background={"rgba(113, 57, 166, 0.7)"}
                    display={"block"}
                    // width={"300px"} 
                    // height={"300px"} 
                    alignItems={"center"}  
                    borderRadius='lg' 
                    overflow='hidden' 
                    boxShadow={'md'} 
                    _hover={{"transform": "scale3d(1.05, 1.05, 1)" }}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    >   
                    {isHovering? 
                        <Box >
                            <Box borderRadius={"lg"} zIndex={1} padding={2} width={"264px"} height={"354px"} opacity={10} backgroundColor={'blackAlpha.700'} textColor={"white"} position={'absolute'} overflowY={'auto'}
                                      css={{
                                        '&::-webkit-scrollbar': {
                                          width: '6px',
                                        },
                                        '&::-webkit-scrollbar-track': {
                                          width: '8px',
                                        },
                                        '&::-webkit-scrollbar-thumb': {
                                          background: '#805AD5',
                                          borderRadius: '24px',
                                        },}}>
                                            <Heading color={COLORS.offWhite} textAlign={"center"} size='sm'>{game?.gameName}</Heading>
                                            <Text >{game?.gameSummary}</Text></Box>
                            <Box zIndex={0} position={'relative'} _hover={{bg:"black"}} >
                            <Image
                            display={"block"}
                            marginLeft={"auto"}
                            marginRight={"auto"}
                            objectFit={"fill"} 
                            borderTopRadius={"lg"}
                            
                            src={game?.gameImageUrl?.replace("thumb", "cover_big")} 
                            alt={noImage}
                            />
                            </Box>
                        </Box> 
                        :
                        <Box >
                            <Image 
                            display={"block"}
                            marginLeft={"auto"}
                            marginRight={"auto"}
                            objectFit={"fill"} 
                            borderTopRadius={"lg"} 
                            src={game?.gameImageUrl?.replace("thumb", "cover_big")} 
                            alt={noImage}/>
                        </Box>
                            }

                                
                    </Box>
                    ))}
                    </Flex>


                    {/* <SimpleGrid columns={{base:2, md:3}} spacing={10}>  
                        {games?.map((game, index) => (
                            <HStack key={index} spacing={"20px"} position={"relative"}>
                                <Box width={"400px"} borderWidth='1px' borderRadius='lg' pl={"10px"} overflow='hidden' boxShadow={'md'}>
                                    <Image boxSize={"300px"} position={"relative"} alignContent={"center"} fit={"contain"} borderTopRadius={"lg"} src={game.gameImageUrl.replace("thumb", "cover_small_2x")} alt={noImage}/>
                                    <Box p='6'>
                                        <Box display='flex' alignItems='baseline'>
                                            <Heading textAlign={"center"} size='md'>{game.gameName}</Heading>
                                        </Box>
                                    </Box>
                                </Box>
                            </HStack>
                        ))}
                        
                    </SimpleGrid> */}

                    </HStack>
                </Stack>

            
                
                <Stack paddingTop={"1rem"}>

                <VStack position={"relative"}>
                        {/* Registration Button */}
                    <EventRegistration event={event} games={games}/>
                </VStack>
                </Stack>
                </Box>
            </Center>
                {/* Used for later */}
                {/* Other events */}
                 {/* <Box>
                    <EventFeed/>
                 </Box> */}

        </Box>
    )
}
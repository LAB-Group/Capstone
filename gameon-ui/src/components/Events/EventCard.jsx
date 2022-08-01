import { Image, Box,Stack, HStack, Heading, Badge, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { COLORS } from "../colors"

export default function EventCard({event}){

    const timestamp = Date.parse(event.eventDate)
    const date = new Date(timestamp).toLocaleDateString('en-US')
    const time = new Date(timestamp).toLocaleTimeString('en-US')

    return (
        //FIXME: Need to prevent card squishing
        <Box 
        display={"block"} 
        // maxWidth={"400px"} 
        // minWidth={"50px"} 
        // width={"100%"} 
        height={"auto"} 
        alignItems={"center"} 
        borderWidth='1px' 
        borderRadius='lg' 
        overflow='hidden' 
        backgroundColor={COLORS.offWhite} 
        boxShadow={'md'} 
        _hover={{"transform": "scale3d(1.05, 1.05, 1)" }} >
            <Link to={`/events/${event.id}`}  >
            <Image position={"static"} src={event.eventImageUrl} objectFit={"contain"} width={"40rem"} height={"10rem"}/>
            <Box paddingTop={"0.5em"} paddingBottom={"0.5em"}>
                <Stack display="flex-start" alignItems="center">
                    <HStack spacing='56px'>
                        <Heading 
                            whiteSpace={"pre-wrap"}
                            fontSize={"sm"}
                            paddingStart={"1em"} 
                            // paddingBottom={"1rem"}
                            // fontSize={{"base":"md", "sm":"md", "lg":"lg"}} 
                            textAlign={'center'} width={'130px'}
                        >{event.eventName}</Heading>
                        <VStack width={'130px'} paddingLeft={"2rem"}>
                            <Badge borderRadius='full' px='2' style={{"background":"rgba(160, 61, 154, .2)"}} color={COLORS.indigo}>{event.eventType}</Badge>
                            <Badge borderRadius='full' px='2' style={{"background":"rgba(160, 61, 154, .2)"}} color={COLORS.indigo}>{date}</Badge>
                            <Badge borderRadius='full' px='2' style={{"background":"rgba(160, 61, 154, .2)"}} color={COLORS.indigo}>{time}</Badge>
                        </VStack>   
                    </HStack>
                </Stack>
            </Box>
            </Link>
        </Box>
    )
}
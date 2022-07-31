import { Image, Box,Stack, HStack, Heading, Badge, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { COLORS } from "../colors"

export default function EventCard({event}){

    const timestamp = Date.parse(event.eventDate)
    const date = new Date(timestamp).toLocaleDateString('en-US')
    const time = new Date(timestamp).toLocaleTimeString('en-US')

    return (
        // Need to prevent card squishing
        <Box flex={"none"} maxWidth={"400px"} minWidth={"50px"} width={"100%"} height={"auto"} 
        alignItems={"center"} 
        flexGrow={0} flexShrink={0} flexBasis={"auto"} borderWidth='1px' borderRadius='lg' overflow='hidden' backgroundColor={COLORS.offWhite} boxShadow={'md'} _hover={{"transform": "scale3d(1.05, 1.05, 1)" }} >
            <Link to={`/events/${event.id}`}  >
            <Image src={event.eventImageUrl} objectFit={"contain"} minW={"10rem"} width={"40rem"} height={"10rem"}/>
            <Box paddingTop={"1rem"}>
                <Stack display="flex-start" alignItems="center">
                    <HStack flexGrow={0} flexShrink={1} flexBasis={"0"} display='flex' flexDir={'row'} alignItems={'center'} justifyContent={'flex-start'} spacing='56px'>
                        <Heading paddingLeft={"1rem"} whiteSpace={"pre-wrap"} fontSize={{"base":"md", "sm":"md", "lg":"lg"}} textAlign={'center'} width={'100px'}>{event.eventName}</Heading>
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
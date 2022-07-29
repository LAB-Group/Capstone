import { Image, Box,Stack, HStack, Heading, Badge, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"

export default function EventCard({event}){

    const timestamp = Date.parse(event.eventDate)
    const date = new Date(timestamp).toLocaleDateString('en-US')
    const time = new Date(timestamp).toLocaleTimeString('en-US')

    return (

        <Box maxWidth={'960px'} minWidth={"10em"} borderWidth='1px' borderRadius='lg' overflow='hidden' backgroundColor={"whiteAlpha.900"} boxShadow={'md'} _hover={{transform: "scale3d(1.05, 1.05, 1)" }} >
            <Link to={`/events/${event.id}`}  >
            <Image src={event.eventImageUrl} objectFit={"contain"} minW={"10em"} width={"20em"} height={"10em"}/>
            <Box p='6'>
                <Stack display="flex-end" alignItems="baseline" >
                    <HStack display='flex' flexDir={'row'} alignItems={'center'} justifyContent={'flex-start'} spacing='56px'>
                        <Heading size='sm' textAlign={'center'} width={'100px'}>{event.eventName}</Heading>
                        <VStack maxW={'130px'}>
                            <Badge borderRadius='full' px='2' colorScheme='purple'>{event.eventType}</Badge>
                            <Badge borderRadius='full' px='2' colorScheme='purple'>{date}</Badge>
                            <Badge borderRadius='full' px='2' colorScheme='purple'>{time}</Badge>
                        </VStack>   
                    </HStack>
                </Stack>
            </Box>
            </Link>
        </Box>
    )
}